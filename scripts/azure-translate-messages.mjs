// Azure Translator-based UI strings translation
// Translates messages/en.json → messages/vi.json and messages/zh.json
//
// Usage:
//   node scripts/azure-translate-messages.mjs                # both vi + zh
//   node scripts/azure-translate-messages.mjs --locale=zh    # just Chinese
//   node scripts/azure-translate-messages.mjs --force        # overwrite existing translations
//
// Companion to scripts/azure-translate.mjs (which handles src/content/<locale>/*.json).
// Reuses the same .env.local: AZURE_TRANSLATOR_KEY_FREE, _FREE_2, _PAID, ...

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

// Brand/product/cert names that must NOT be translated.
// Azure honors these via <mstrans:dictionary> markup or by skipping strings that
// are exactly one of these. We use a simpler approach: post-process to restore
// these tokens if Azure translates them.
const BRAND_TOKENS = [
  "XinYuan",
  "Xinyuan",
  "Jinhao",
  "Jinhao Xinyuan",
  "Jinhao Xinyuan Group",
  "FSC",
  "FSC®",
  "ISO 9001",
  "ISO 9001:2015",
  "ISO 14001",
  "SMETA",
  "G7",
  "G7®",
  "GMI",
  "ISTA",
  "Heidelberg",
  "Komori",
  "Bobst",
  "KBA",
  "KURZ",
  "Sakurai",
  "Vega",
  "Jagenberg",
  "Bac Ninh",
  "Dongguan",
  "Hai Phong",
  "Shenzhen",
  "Guangzhou",
  "Vietnam Xinyuanjia",
];

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
    push(
      process.env[`AZURE_TRANSLATOR_KEY_FREE_${i}`],
      process.env[`AZURE_TRANSLATOR_REGION_FREE_${i}`],
      `free-${i}`,
    );
  }
  push(process.env.AZURE_TRANSLATOR_KEY_PAID, process.env.AZURE_TRANSLATOR_REGION_PAID, "paid-1");
  for (let i = 2; i <= MAX_KEYS_PER_TIER; i++) {
    push(
      process.env[`AZURE_TRANSLATOR_KEY_PAID_${i}`],
      process.env[`AZURE_TRANSLATOR_REGION_PAID_${i}`],
      `paid-${i}`,
    );
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
    return { ok: false, quotaHit: isQuotaError(res.status, bodyText), status: res.status, error: bodyText };
  }

  let data;
  try {
    data = JSON.parse(bodyText);
  } catch {
    return { ok: false, error: `Parse error: ${bodyText.slice(0, 200)}` };
  }

  return { ok: true, translations: data.map((item) => item?.translations?.[0]?.text ?? "") };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Per-key char budget to stay under Azure F0's ~33K chars/min throughput cap.
const F0_CHARS_PER_MIN = 30_000;
const sentLog = {};

function recordSend(label, chars) {
  const now = Date.now();
  const log = (sentLog[label] ||= []);
  log.push({ ts: now, chars });
  while (log.length && now - log[0].ts > 60_000) log.shift();
}

function charsInLastMinute(label) {
  const now = Date.now();
  const log = sentLog[label] || [];
  while (log.length && now - log[0].ts > 60_000) log.shift();
  return log.reduce((s, e) => s + e.chars, 0);
}

async function throttleIfNeeded(label, isFreeTier, plannedChars) {
  if (!isFreeTier) return;
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
  if (candidates.length === 0) {
    throw new Error("No AZURE_TRANSLATOR_KEY_* credentials configured");
  }

  // Azure: max 100 elements per request, 50k chars per request, 5000 per element.
  const results = [];
  for (let i = 0; i < texts.length; i += 50) {
    const chunk = texts
      .slice(i, i + 50)
      .map((t) => (t.length > AZURE_MAX_CHARS ? t.slice(0, AZURE_MAX_CHARS) : t));
    const chunkChars = chunk.reduce((s, t) => s + t.length, 0);

    let lastError = null;
    let success = false;

    for (const cred of candidates) {
      const isFree = cred.label.startsWith("free");
      await throttleIfNeeded(cred.label, isFree, chunkChars);

      let attempt = 0;
      const maxAttempts = isFree ? 3 : 1;
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
          const backoff = 30_000 * attempt;
          console.log(`    ⏳ ${cred.label} rate-limited (status ${r.status}) — sleeping ${backoff / 1000}s and retrying`);
          await sleep(backoff);
          continue;
        }

        bumpStat(cred.label, "failures");
        lastError = `[${cred.label}] status=${r.status} error=${String(r.error).slice(0, 150)}`;
        break;
      }
      if (success) break;
    }

    if (!success) {
      console.error(`  ✗ chunk ${i}: ${lastError}`);
      results.push(...chunk);
    }
  }

  return results;
}

// Skip strings that should never be translated (URLs, emails, single tokens like "FSC®").
function shouldSkip(value) {
  if (typeof value !== "string") return true;
  if (value.length === 0) return true;
  // URL / email / phone-like
  if (/^https?:\/\//i.test(value)) return true;
  if (/^mailto:/i.test(value)) return true;
  if (/^tel:/i.test(value)) return true;
  if (/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(value)) return true;
  if (/^\+?[\d\s().-]{6,}$/.test(value)) return true;
  // Pure number / measurement
  if (/^[\d,.\s%mMgGkK²³+]+$/.test(value)) return true;
  // Single emoji or flag
  if (/^[\u{1F1E6}-\u{1F1FF}]{2}$/u.test(value)) return true;
  // Pure brand token (will be preserved anyway, but skip to save quota)
  if (BRAND_TOKENS.includes(value.trim())) return true;
  return false;
}

// Walk a JSON tree, collect leaf strings + their paths.
function collectStrings(obj, path = []) {
  const items = [];
  if (typeof obj === "string") {
    if (!shouldSkip(obj)) items.push({ path, value: obj });
    return items;
  }
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => items.push(...collectStrings(v, [...path, i])));
    return items;
  }
  if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      items.push(...collectStrings(v, [...path, k]));
    }
  }
  return items;
}

function setAtPath(obj, path, value) {
  let cur = obj;
  for (let i = 0; i < path.length - 1; i++) cur = cur[path[i]];
  cur[path[path.length - 1]] = value;
}

// Restore brand tokens that Azure may have transliterated.
// For each known brand, if it appeared in the source, ensure it appears verbatim
// in the output. We do a case-insensitive search-and-replace using the original
// brand spelling.
function restoreBrands(source, translated) {
  let out = translated;
  for (const brand of BRAND_TOKENS) {
    if (!source.includes(brand)) continue;
    // Find similar tokens in translated and replace.
    // Simple heuristic: replace any case-variant of the brand with the canonical form.
    const re = new RegExp(brand.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    out = out.replace(re, brand);
  }
  return out;
}

const LOCALE_TO_AZURE = {
  vi: "vi",
  zh: "zh-Hans",
};

async function translateMessagesFile(targetLocale, options) {
  const srcPath = path.join(projectRoot, "messages/en.json");
  const outPath = path.join(projectRoot, `messages/${targetLocale}.json`);

  const src = JSON.parse(await fs.readFile(srcPath, "utf-8"));

  let existing = {};
  try {
    existing = JSON.parse(await fs.readFile(outPath, "utf-8"));
  } catch {
    /* fresh */
  }

  // Determine which strings need translation.
  const items = collectStrings(src);
  const toTranslate = [];
  const indexMap = [];

  for (const { path: p, value } of items) {
    let existingValue;
    try {
      let cur = existing;
      for (const seg of p) cur = cur?.[seg];
      existingValue = cur;
    } catch {
      existingValue = undefined;
    }

    // Skip if already translated and not forcing.
    // "Already translated" = exists in target, is a string, and is different from source.
    // (If it equals source, we treat it as a stub that needs translation.)
    const alreadyTranslated =
      typeof existingValue === "string" && existingValue.length > 0 && existingValue !== value;

    if (!options.force && alreadyTranslated) continue;

    toTranslate.push(value);
    indexMap.push(p);
  }

  const totalChars = toTranslate.reduce((s, t) => s + t.length, 0);
  console.log(
    `  messages/en.json → ${targetLocale}: ${toTranslate.length}/${items.length} strings (${totalChars} chars)`,
  );

  if (toTranslate.length === 0) {
    console.log(`  ✓ already up to date`);
    return;
  }

  const azureCode = LOCALE_TO_AZURE[targetLocale];
  if (!azureCode) {
    throw new Error(`Unknown target locale: ${targetLocale}`);
  }

  const translated = await translateBatch(toTranslate, "en", azureCode);

  // Build output: deep clone source, then layer existing translations and new ones on top.
  const out = JSON.parse(JSON.stringify(src));

  // Layer existing first (preserves anything already translated even if not in src)
  for (const item of collectStrings(existing)) {
    try {
      setAtPath(out, item.path, item.value);
    } catch {
      /* ignore stale paths */
    }
  }

  // Apply new translations
  for (let i = 0; i < indexMap.length; i++) {
    const v = translated[i];
    if (!v) continue;
    const restored = restoreBrands(toTranslate[i], v);
    setAtPath(out, indexMap[i], restored);
  }

  await fs.writeFile(outPath, JSON.stringify(out, null, 2) + "\n");
  console.log(`  ✓ wrote ${outPath}`);
}

async function main() {
  const args = process.argv.slice(2);
  const localeArg = args.find((a) => a.startsWith("--locale="));
  const force = args.includes("--force");
  const onlyLocale = localeArg ? localeArg.split("=")[1] : null;

  const candidates = buildCandidates();
  if (candidates.length === 0) {
    console.error("No Azure Translator credentials in .env.local");
    process.exit(1);
  }
  console.log(`Azure Translator candidates: ${candidates.map((c) => c.label).join(", ")}\n`);

  const locales = onlyLocale ? [onlyLocale] : ["vi", "zh"];

  for (const locale of locales) {
    console.log(`\n=== ${locale === "zh" ? "Chinese (Simplified)" : "Vietnamese"} ===`);
    try {
      await translateMessagesFile(locale, { force });
    } catch (err) {
      console.error(`  ✗ ${locale}:`, err.message);
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
