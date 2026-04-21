// Azure Translator-based content translation
// Adapted from D:\insperium-dashboard\workers\shared\azure-config.js
//
// Usage:
//   node scripts/azure-translate.mjs                         # translates EN → VI + ZH for all pages
//   node scripts/azure-translate.mjs --only=home             # just home
//   node scripts/azure-translate.mjs --locale=zh             # just Chinese
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

async function translateBatch(texts, from, to) {
  if (!texts || texts.length === 0) return [];
  const candidates = buildCandidates();
  if (candidates.length === 0) throw new Error("No AZURE_TRANSLATOR_KEY_* credentials configured");

  // Azure limit: 100 elements per request, or 50k chars per request, or 5000 per element
  // We'll chunk defensively at 50 elements
  const results = [];
  for (let i = 0; i < texts.length; i += 50) {
    const chunk = texts.slice(i, i + 50).map((t) => (t.length > AZURE_MAX_CHARS ? t.slice(0, AZURE_MAX_CHARS) : t));

    let lastError = null;
    let success = false;

    for (const cred of candidates) {
      const r = await callTranslate(chunk, from, to, cred);
      if (r.ok) {
        bumpStat(cred.label, "calls");
        stats[cred.label].chars += chunk.reduce((sum, t) => sum + t.length, 0);
        results.push(...r.translations);
        success = true;
        break;
      }
      bumpStat(cred.label, "failures");
      lastError = `[${cred.label}] status=${r.status} error=${String(r.error).slice(0, 150)}`;
    }

    if (!success) {
      console.error(`  ✗ chunk ${i}: ${lastError}`);
      // Fallback: keep original English for failed chunk
      results.push(...chunk);
    }
  }

  return results;
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

  // Verify we have credentials
  const candidates = buildCandidates();
  if (candidates.length === 0) {
    console.error("No Azure Translator credentials found in env");
    console.error("Set AZURE_TRANSLATOR_KEY_FREE + AZURE_TRANSLATOR_REGION_FREE in .env.local");
    process.exit(1);
  }
  console.log(`Azure Translator candidates: ${candidates.map((c) => c.label).join(", ")}\n`);

  const srcDir = path.join(projectRoot, "src/content/en");
  const files = (await fs.readdir(srcDir)).filter((f) => f.endsWith(".json"));
  const slugs = onlySlug ? [onlySlug] : files.map((f) => f.replace(/\.json$/, ""));
  const locales = onlyLocale ? [onlyLocale] : ["vi", "zh"];

  console.log(`Translating ${slugs.length} pages × ${locales.length} locales\n`);

  for (const locale of locales) {
    console.log(`\n=== ${locale === "zh" ? "Chinese" : "Vietnamese"} ===`);
    for (const slug of slugs) {
      try {
        await translateFile(slug, locale);
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
