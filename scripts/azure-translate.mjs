// Azure Translator-based content translation
// Adapted from D:\insperium-dashboard\workers\shared\azure-config.js
//
// Usage:
//   node scripts/azure-translate.mjs                              # translates EN → VI + ZH for all PAGES
//   node scripts/azure-translate.mjs --only=home                  # just one page slug
//   node scripts/azure-translate.mjs --locale=zh                  # just Chinese
//   node scripts/azure-translate.mjs --blog                       # translates ALL blog articles
//   node scripts/azure-translate.mjs --blog --only=section-301-…  # one blog slug
//   node scripts/azure-translate.mjs --blog --locale=vi           # blog, just Vietnamese
//
// Reads env from .env.local (AZURE_TRANSLATOR_KEY_FREE, _FREE_2, _PAID, ...)

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

// Load .env.local
try {
  const envText = await fs.readFile(path.join(projectRoot, ".env.local"), "utf-8");
  for (const line of envText.split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch {
  // No .env.local, rely on process env
}

const TRANSLATOR_ENDPOINT = "https://api.cognitive.microsofttranslator.com";
const AZURE_MAX_CHARS = 5000;
const MAX_KEYS_PER_TIER = 10;

const stats = {};

function bumpStat(label, field) {
  if (!stats[label]) stats[label] = { calls: 0, failures: 0, chars: 0 };
  stats[label][field]++;
}

function isQuotaError(status, bodyText) {
  if (status === 403 || status === 429) return true;
  const s = String(bodyText || "").toLowerCase();
  return s.includes("f0transactionlimitexceeded") || s.includes("quota") || s.includes("rate limit");
}

function buildCandidates() {
  const candidates = [];
  const push = (key, region, label) => {
    if (key && region) candidates.push({ key, region, label });
  };

  push(process.env.AZURE_TRANSLATOR_KEY_FREE, process.env.AZURE_TRANSLATOR_REGION_FREE, "free-1");
  for (let i = 2; i <= MAX_KEYS_PER_TIER; i++) {
    push(process.env[`AZURE_TRANSLATOR_KEY_FREE_${i}`], process.env[`AZURE_TRANSLATOR_REGION_FREE_${i}`], `free-${i}`);
  }
  push(process.env.AZURE_TRANSLATOR_KEY_PAID, process.env.AZURE_TRANSLATOR_REGION_PAID, "paid-1");
  for (let i = 2; i <= MAX_KEYS_PER_TIER; i++) {
    push(process.env[`AZURE_TRANSLATOR_KEY_PAID_${i}`], process.env[`AZURE_TRANSLATOR_REGION_PAID_${i}`], `paid-${i}`);
  }
  return candidates;
}

async function callTranslate(texts, from, to, cred) {
  const url = `${TRANSLATOR_ENDPOINT}/translate?api-version=3.0&from=${from}&to=${to}`;
  const body = texts.map((t) => ({ Text: t }));

  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": cred.key,
        "Ocp-Apim-Subscription-Region": cred.region,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (e) {
    return { ok: false, error: `Network error: ${e.message}` };
  }

  const bodyText = await res.text();
  if (!res.ok) {
    const quotaHit = isQuotaError(res.status, bodyText);
    return { ok: false, quotaHit, status: res.status, error: bodyText };
  }

  let data;
  try {
    data = JSON.parse(bodyText);
  } catch {
    return { ok: false, error: `Parse error: ${bodyText.slice(0, 200)}` };
  }

  const translated = data.map((item) => item?.translations?.[0]?.text ?? "");
  return { ok: true, translations: translated };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Per-key char budget to stay under Azure F0's ~33K chars/min throughput cap.
// We track chars sent per key in a 60-second sliding window and sleep before
// breaching the cap, instead of bouncing to the next candidate.
const F0_CHARS_PER_MIN = 30_000; // safe margin under the 33,300 limit
const sentLog = {}; // label → [{ ts, chars }]

function recordSend(label, chars) {
  const now = Date.now();
  const log = (sentLog[label] ||= []);
  log.push({ ts: now, chars });
  // drop entries older than 60s
  while (log.length && now - log[0].ts > 60_000) log.shift();
}

function charsInLastMinute(label) {
  const now = Date.now();
  const log = sentLog[label] || [];
  while (log.length && now - log[0].ts > 60_000) log.shift();
  return log.reduce((s, e) => s + e.chars, 0);
}

async function throttleIfNeeded(label, isFreeTier, plannedChars) {
  if (!isFreeTier) return; // paid keys have no per-minute cap we care about
  while (charsInLastMinute(label) + plannedChars > F0_CHARS_PER_MIN) {
    const log = sentLog[label] || [];
    const oldest = log[0]?.ts ?? Date.now();
    const waitMs = Math.max(1000, 60_000 - (Date.now() - oldest) + 500);
    console.log(`    … throttling ${label} for ${(waitMs / 1000).toFixed(1)}s (would exceed ${F0_CHARS_PER_MIN}/min)`);
    await sleep(waitMs);
  }
}

async function translateBatch(texts, from, to) {
  if (!texts || texts.length === 0) return [];
  const candidates = buildCandidates();
  if (candidates.length === 0) throw new Error("No AZURE_TRANSLATOR_KEY_* credentials configured");

  // Azure limit: 100 elements per request, or 50k chars per request, or 5000 per element.
  // Chunk at 50 elements to stay safely under all three.
  const results = [];
  for (let i = 0; i < texts.length; i += 50) {
    const chunk = texts.slice(i, i + 50).map((t) => (t.length > AZURE_MAX_CHARS ? t.slice(0, AZURE_MAX_CHARS) : t));
    const chunkChars = chunk.reduce((s, t) => s + t.length, 0);

    let lastError = null;
    let success = false;

    for (const cred of candidates) {
      const isFree = cred.label.startsWith("free");

      // For free keys, wait if this chunk would push us over the per-minute cap.
      await throttleIfNeeded(cred.label, isFree, chunkChars);

      let attempt = 0;
      const maxAttempts = isFree ? 3 : 1; // retry rate-limits on free; don't waste time on paid
      while (attempt < maxAttempts && !success) {
        attempt++;
        const r = await callTranslate(chunk, from, to, cred);
        if (r.ok) {
          bumpStat(cred.label, "calls");
          stats[cred.label].chars += chunkChars;
          recordSend(cred.label, chunkChars);
          results.push(...r.translations);
          success = true;
          break;
        }

        if (r.quotaHit && isFree && attempt < maxAttempts) {
          // Rate limit on free tier — wait and retry the SAME key, don't fall over.
          const backoff = 30_000 * attempt; // 30s, 60s, 90s
          console.log(`    ⏳ ${cred.label} rate-limited (status ${r.status}) — sleeping ${backoff / 1000}s and retrying`);
          await sleep(backoff);
          continue;
        }

        bumpStat(cred.label, "failures");
        lastError = `[${cred.label}] status=${r.status} error=${String(r.error).slice(0, 150)}`;
        break; // try next candidate
      }
      if (success) break;
    }

    if (!success) {
      console.error(`  ✗ chunk ${i}: ${lastError}`);
      // Fallback: keep original English for failed chunk
      results.push(...chunk);
    }
  }

  return results;
}

// --- Blog article translation --------------------------------------------
//
// Schema is richer than pages — see src/types/blog.ts. We walk every block
// type and collect translatable strings, then re-attach them by index.
// Slugs, hrefs, src URLs, dates, and author names are NOT translated.

function collectBlogStrings(data) {
  const toTranslate = [];
  const indexMap = [];
  const push = (text, m) => {
    if (typeof text === "string" && text.length > 0) {
      toTranslate.push(text);
      indexMap.push(m);
    }
  };

  push(data.title, { kind: "title" });
  push(data.description, { kind: "description" });
  push(data.coverAlt, { kind: "coverAlt" });
  push(data.category, { kind: "category" });
  push(data.author, { kind: "author" });

  for (let i = 0; i < (data.blocks || []).length; i++) {
    const b = data.blocks[i];
    switch (b.type) {
      case "heading":
      case "text":
        push(b.text, { kind: "block.text", i });
        break;
      case "list":
        for (let j = 0; j < (b.items || []).length; j++) {
          push(b.items[j], { kind: "block.list.item", i, j });
        }
        break;
      case "image":
        push(b.alt, { kind: "block.image.alt", i });
        push(b.caption, { kind: "block.image.caption", i });
        break;
      case "callout":
        push(b.title, { kind: "block.callout.title", i });
        push(b.body, { kind: "block.callout.body", i });
        break;
      case "table":
        for (let j = 0; j < (b.headers || []).length; j++) {
          push(b.headers[j], { kind: "block.table.header", i, j });
        }
        for (let r = 0; r < (b.rows || []).length; r++) {
          for (let c = 0; c < (b.rows[r] || []).length; c++) {
            push(b.rows[r][c], { kind: "block.table.cell", i, r, c });
          }
        }
        push(b.caption, { kind: "block.table.caption", i });
        break;
      case "quote":
        push(b.text, { kind: "block.quote.text", i });
        push(b.attribution, { kind: "block.quote.attribution", i });
        break;
      case "cta":
        push(b.title, { kind: "block.cta.title", i });
        push(b.body, { kind: "block.cta.body", i });
        // href is a URL — never translated
        break;
      default:
        break;
    }
  }

  for (let i = 0; i < (data.faqs || []).length; i++) {
    push(data.faqs[i].q, { kind: "faq.q", i });
    push(data.faqs[i].a, { kind: "faq.a", i });
  }

  for (let i = 0; i < (data.related || []).length; i++) {
    push(data.related[i].label, { kind: "related.label", i });
    // slug + kind are stable identifiers — never translated
  }

  return { toTranslate, indexMap };
}

function applyBlogTranslations(out, indexMap, translated) {
  for (let idx = 0; idx < indexMap.length; idx++) {
    const m = indexMap[idx];
    const v = translated[idx];
    if (!v) continue;
    switch (m.kind) {
      case "title":
        out.title = v;
        break;
      case "description":
        out.description = v;
        break;
      case "coverAlt":
        out.coverAlt = v;
        break;
      case "category":
        out.category = v;
        break;
      case "author":
        out.author = v;
        break;
      case "block.text":
        out.blocks[m.i].text = v;
        break;
      case "block.list.item":
        out.blocks[m.i].items[m.j] = v;
        break;
      case "block.image.alt":
        out.blocks[m.i].alt = v;
        break;
      case "block.image.caption":
        out.blocks[m.i].caption = v;
        break;
      case "block.callout.title":
        out.blocks[m.i].title = v;
        break;
      case "block.callout.body":
        out.blocks[m.i].body = v;
        break;
      case "block.table.header":
        out.blocks[m.i].headers[m.j] = v;
        break;
      case "block.table.cell":
        out.blocks[m.i].rows[m.r][m.c] = v;
        break;
      case "block.table.caption":
        out.blocks[m.i].caption = v;
        break;
      case "block.quote.text":
        out.blocks[m.i].text = v;
        break;
      case "block.quote.attribution":
        out.blocks[m.i].attribution = v;
        break;
      case "block.cta.title":
        out.blocks[m.i].title = v;
        break;
      case "block.cta.body":
        out.blocks[m.i].body = v;
        break;
      case "faq.q":
        out.faqs[m.i].q = v;
        break;
      case "faq.a":
        out.faqs[m.i].a = v;
        break;
      case "related.label":
        out.related[m.i].label = v;
        break;
      default:
        break;
    }
  }
}

async function translateBlogFile(slug, targetLocale) {
  const srcPath = path.join(projectRoot, "src/content/blog/en", `${slug}.json`);
  const outDir = path.join(projectRoot, `src/content/blog/${targetLocale}`);
  const outPath = path.join(outDir, `${slug}.json`);

  const data = JSON.parse(await fs.readFile(srcPath, "utf-8"));
  const { toTranslate, indexMap } = collectBlogStrings(data);

  const totalChars = toTranslate.reduce((s, t) => s + t.length, 0);
  console.log(`  blog/${slug} → ${targetLocale}: ${toTranslate.length} strings (${totalChars} chars)`);

  const azureCode = targetLocale === "zh" ? "zh-Hans" : targetLocale;
  const translated = await translateBatch(toTranslate, "en", azureCode);

  const out = JSON.parse(JSON.stringify(data));
  applyBlogTranslations(out, indexMap, translated);

  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(outPath, JSON.stringify(out, null, 2));
  console.log(`  ✓ wrote ${outPath}`);
}

async function translateFile(slug, targetLocale) {
  const srcPath = path.join(projectRoot, "src/content/en", `${slug}.json`);
  const outPath = path.join(projectRoot, `src/content/${targetLocale}`, `${slug}.json`);

  const data = JSON.parse(await fs.readFile(srcPath, "utf-8"));

  const toTranslate = [];
  const indexMap = [];

  toTranslate.push(data.title);
  indexMap.push({ kind: "title" });

  for (let i = 0; i < data.blocks.length; i++) {
    const b = data.blocks[i];
    if ((b.type === "heading" || b.type === "text") && b.text) {
      toTranslate.push(b.text);
      indexMap.push({ kind: "block", i });
    } else if (b.type === "image" && b.alt) {
      toTranslate.push(b.alt);
      indexMap.push({ kind: "alt", i });
    }
  }

  if (data.faqs) {
    for (let i = 0; i < data.faqs.length; i++) {
      toTranslate.push(data.faqs[i].q);
      indexMap.push({ kind: "faqQ", i });
      toTranslate.push(data.faqs[i].a);
      indexMap.push({ kind: "faqA", i });
    }
  }

  const totalChars = toTranslate.reduce((s, t) => s + t.length, 0);
  console.log(`  ${slug} → ${targetLocale}: ${toTranslate.length} strings (${totalChars} chars)`);

  // Azure locale codes: "vi" and "zh-Hans" (Simplified Chinese)
  const azureCode = targetLocale === "zh" ? "zh-Hans" : targetLocale;
  const translated = await translateBatch(toTranslate, "en", azureCode);

  const out = JSON.parse(JSON.stringify(data));
  for (let idx = 0; idx < indexMap.length; idx++) {
    const m = indexMap[idx];
    const v = translated[idx];
    if (!v) continue;
    if (m.kind === "title") out.title = v;
    else if (m.kind === "block") out.blocks[m.i].text = v;
    else if (m.kind === "alt") out.blocks[m.i].alt = v;
    else if (m.kind === "faqQ") out.faqs[m.i].q = v;
    else if (m.kind === "faqA") out.faqs[m.i].a = v;
  }

  await fs.writeFile(outPath, JSON.stringify(out, null, 2));
  console.log(`  ✓ wrote ${outPath}`);
}

async function main() {
  const args = process.argv.slice(2);
  const onlyArg = args.find((a) => a.startsWith("--only="));
  const localeArg = args.find((a) => a.startsWith("--locale="));
  const onlySlug = onlyArg ? onlyArg.split("=")[1] : null;
  const onlyLocale = localeArg ? localeArg.split("=")[1] : null;
  const blogMode = args.includes("--blog");

  // Verify we have credentials
  const candidates = buildCandidates();
  if (candidates.length === 0) {
    console.error("No Azure Translator credentials found in env");
    console.error("Set AZURE_TRANSLATOR_KEY_FREE + AZURE_TRANSLATOR_REGION_FREE in .env.local");
    process.exit(1);
  }
  console.log(`Azure Translator candidates: ${candidates.map((c) => c.label).join(", ")}\n`);

  const srcDir = blogMode
    ? path.join(projectRoot, "src/content/blog/en")
    : path.join(projectRoot, "src/content/en");
  const files = (await fs.readdir(srcDir)).filter((f) => f.endsWith(".json"));
  const slugs = onlySlug ? [onlySlug] : files.map((f) => f.replace(/\.json$/, ""));
  const locales = onlyLocale ? [onlyLocale] : ["vi", "zh"];
  const kindLabel = blogMode ? "blog articles" : "pages";

  console.log(`Translating ${slugs.length} ${kindLabel} × ${locales.length} locales\n`);

  const fn = blogMode ? translateBlogFile : translateFile;

  for (const locale of locales) {
    console.log(`\n=== ${locale === "zh" ? "Chinese" : "Vietnamese"} ===`);
    for (const slug of slugs) {
      try {
        await fn(slug, locale);
      } catch (err) {
        console.error(`  ✗ ${slug} → ${locale}:`, err.message);
      }
    }
  }

  console.log("\n=== Key usage ===");
  for (const [label, s] of Object.entries(stats)) {
    console.log(`  ${label}: ${s.calls} calls, ${s.chars} chars, ${s.failures} failures`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
