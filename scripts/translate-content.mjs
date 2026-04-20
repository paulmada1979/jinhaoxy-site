// Translate content JSON files from English to Vietnamese and Chinese using Claude.
// Usage: ANTHROPIC_API_KEY=sk-ant-... node scripts/translate-content.mjs [--locale=vi|zh] [--only=home]
//
// Reads:  src/content/en/*.json
// Writes: src/content/vi/*.json  and  src/content/zh/*.json
// Preserves block structure (heading/text/image). Only translates text fields.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Anthropic from "@anthropic-ai/sdk";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const SRC = path.join(projectRoot, "src/content/en");
const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  console.error("ANTHROPIC_API_KEY env var required");
  process.exit(1);
}

const args = process.argv.slice(2);
const onlyArg = args.find((a) => a.startsWith("--only="));
const localeArg = args.find((a) => a.startsWith("--locale="));
const onlySlug = onlyArg ? onlyArg.split("=")[1] : null;
const onlyLocale = localeArg ? localeArg.split("=")[1] : null;

const LOCALE_CONFIG = {
  vi: {
    name: "Vietnamese",
    instructions: "Use natural, professional Vietnamese suitable for a B2B corporate website. Keep brand names (Jinhao, Xinyuan, XinYuan, FSC, ISO, Bamboologic) untranslated. Keep product codes, measurements, and numbers as-is.",
  },
  zh: {
    name: "Simplified Chinese",
    instructions: "Use natural, professional Simplified Chinese (简体中文) suitable for a B2B corporate website. Keep brand names (Jinhao, Xinyuan, XinYuan, FSC, ISO, Bamboologic) untranslated. Keep product codes, measurements, and numbers as-is. Use mainland China conventions.",
  },
};

const client = new Anthropic({ apiKey });

async function translateBatch(strings, targetLocale) {
  const cfg = LOCALE_CONFIG[targetLocale];
  const prompt = `Translate the following JSON array of strings to ${cfg.name}.

${cfg.instructions}

Return ONLY the translated JSON array, no markdown fences, no explanations. Same number of items, same order.

Input:
${JSON.stringify(strings, null, 2)}`;

  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 8000,
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "[]";
  const cleaned = text.replace(/^```(?:json)?\n?|\n?```$/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    console.error("Failed to parse translation response:", cleaned.slice(0, 300));
    return strings; // fallback to original
  }
}

async function translateFile(slug, targetLocale) {
  const srcPath = path.join(SRC, `${slug}.json`);
  const outPath = path.join(projectRoot, `src/content/${targetLocale}`, `${slug}.json`);

  const data = JSON.parse(await fs.readFile(srcPath, "utf-8"));

  // Collect all translatable strings
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

  console.log(`  ${slug} → ${targetLocale}: ${toTranslate.length} strings`);

  // Chunk by count to stay within 8k output tokens (~2-3k strings safe)
  const CHUNK_SIZE = 40;
  const translated = [];
  for (let i = 0; i < toTranslate.length; i += CHUNK_SIZE) {
    const chunk = toTranslate.slice(i, i + CHUNK_SIZE);
    const t = await translateBatch(chunk, targetLocale);
    if (t.length !== chunk.length) {
      console.warn(`  ⚠ chunk ${i / CHUNK_SIZE} size mismatch: expected ${chunk.length} got ${t.length}`);
      // fallback: use original
      translated.push(...chunk);
    } else {
      translated.push(...t);
    }
  }

  // Rebuild data with translations
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
  const files = (await fs.readdir(SRC)).filter((f) => f.endsWith(".json"));
  const slugs = onlySlug ? [onlySlug] : files.map((f) => f.replace(/\.json$/, ""));
  const locales = onlyLocale ? [onlyLocale] : ["vi", "zh"];

  console.log(`Translating ${slugs.length} pages × ${locales.length} locales\n`);

  for (const locale of locales) {
    console.log(`\n=== ${LOCALE_CONFIG[locale].name} ===`);
    for (const slug of slugs) {
      try {
        await translateFile(slug, locale);
      } catch (err) {
        console.error(`  ✗ ${slug} → ${locale}:`, err.message);
      }
    }
  }

  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
