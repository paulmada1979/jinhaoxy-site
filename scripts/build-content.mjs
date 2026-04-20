// Convert extracted WordPress pages to structured JSON blocks
// Reads: D:/vault/projects/jinhao-migration/extracted/pages.json
// Writes: src/content/en/<slug>.json + src/content/vi/<slug>.json + src/content/zh/<slug>.json

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const EXTRACTED = "D:/vault/projects/jinhao-migration/extracted";

const pages = JSON.parse(await fs.readFile(path.join(EXTRACTED, "pages.json"), "utf-8"));
const viDict = JSON.parse(await fs.readFile(path.join(EXTRACTED, "translations-vi.json"), "utf-8"));
const zhDict = JSON.parse(await fs.readFile(path.join(EXTRACTED, "translations-zh.json"), "utf-8"));

console.log(`Processing ${pages.length} pages...`);
console.log(`VI dict: ${Object.keys(viDict).length} strings`);
console.log(`ZH dict: ${Object.keys(zhDict).length} strings`);

// Decode HTML entities
function decodeEntities(s) {
  if (!s) return "";
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Rewrite WP image URL to local path under /media
function normalizeImage(src) {
  if (!src) return null;
  // Strip domain + /wp-content/uploads/YYYY/MM/
  const match = src.match(/\/wp-content\/uploads\/(?:\d{4}\/\d{2}\/)?(.+?)(\?.*)?$/);
  if (match) {
    return "/media/" + match[1];
  }
  return src;
}

function extractBlocks(html, title) {
  const blocks = [];

  if (!html || html.trim().length < 50) return blocks;

  const $ = cheerio.load(html, { decodeEntities: false });

  // Remove noise: SVGs inline (icons), scripts, styles, empty elements
  $("svg, script, style, noscript").remove();

  // Walk top-level DOM in order
  const collected = new Set();
  const seenImages = new Set();

  function pushText(text) {
    const cleaned = decodeEntities(text);
    if (!cleaned || cleaned.length < 3) return;
    if (cleaned.toLowerCase() === title.toLowerCase()) return;
    if (collected.has(cleaned)) return;
    collected.add(cleaned);
    blocks.push({ type: "text", text: cleaned });
  }

  function pushHeading(level, text) {
    const cleaned = decodeEntities(text);
    if (!cleaned || cleaned.length < 2) return;
    if (collected.has("H:" + cleaned)) return;
    collected.add("H:" + cleaned);
    blocks.push({ type: "heading", level, text: cleaned });
  }

  function pushImage(src, alt, width, height) {
    const normalized = normalizeImage(src);
    if (!normalized || seenImages.has(normalized)) return;
    seenImages.add(normalized);
    blocks.push({
      type: "image",
      src: normalized,
      alt: alt || "",
      width: width ? parseInt(width, 10) : undefined,
      height: height ? parseInt(height, 10) : undefined,
    });
  }

  // Walk in document order
  $("*").each((_, el) => {
    const tag = el.tagName?.toLowerCase();
    if (!tag) return;

    if (/^h[1-6]$/.test(tag)) {
      const level = parseInt(tag[1], 10);
      const text = $(el).text().trim();
      if (text && !$(el).find("h1,h2,h3,h4,h5,h6").length) {
        pushHeading(level, text);
      }
    } else if (tag === "p") {
      const text = $(el).text().trim();
      pushText(text);
    } else if (tag === "li") {
      // Only bare text list items (not nav links)
      const text = $(el).clone().children("a,svg,img").remove().end().text().trim();
      if (text && text.length > 3) pushText("• " + text);
    } else if (tag === "img") {
      const src = $(el).attr("src");
      const alt = $(el).attr("alt");
      const width = $(el).attr("width");
      const height = $(el).attr("height");
      if (src) pushImage(src, alt, width, height);
    }
  });

  return blocks;
}

// Translation lookup — match by original text
function translateBlock(block, dict) {
  if (block.type === "text" || block.type === "heading") {
    const t = dict[block.text] || dict[block.text.replace(/^• /, "")];
    if (t) {
      const prefix = block.text.startsWith("• ") ? "• " : "";
      return { ...block, text: prefix + t };
    }
  }
  if (block.type === "image") {
    // Image alt might be translated separately
    const t = block.alt ? dict[block.alt] : null;
    if (t) return { ...block, alt: t };
  }
  return block;
}

await fs.mkdir(path.join(projectRoot, "src/content/en"), { recursive: true });
await fs.mkdir(path.join(projectRoot, "src/content/vi"), { recursive: true });
await fs.mkdir(path.join(projectRoot, "src/content/zh"), { recursive: true });

const manifest = { en: [], vi: [], zh: [] };

for (const page of pages) {
  const title = decodeEntities(page.title);
  const blocks = extractBlocks(page.content, title);
  if (blocks.length === 0) {
    console.log(`  skip (empty): ${page.slug}`);
    continue;
  }

  // Detect FAQ section: bare text (question) followed by <p>...</p> (answer)
  // These arrive as consecutive text blocks where odd items end with "?"
  const faqs = [];
  if (page.content && page.content.includes("Frequently Asked")) {
    // Parse raw HTML: find "Frequently Asked" then alternating question/answer pattern
    const faqHtml = page.content.slice(page.content.indexOf("Frequently Asked"));
    // Match: whitespace + question text ending in ? + <p>answer</p>
    const faqRegex = /\s{2,}([^<\n]{10,200}\?)\s*<p>([\s\S]+?)<\/p>/g;
    let m;
    while ((m = faqRegex.exec(faqHtml)) !== null) {
      faqs.push({
        q: decodeEntities(m[1]),
        a: decodeEntities(m[2].replace(/<[^>]+>/g, " ")),
      });
    }
  }

  const enData = { slug: page.slug, title, parent: page.parent, menu_order: page.menu_order, blocks, faqs };

  // Create translated versions
  const viData = {
    ...enData,
    title: viDict[title] || title,
    blocks: blocks.map((b) => translateBlock(b, viDict)),
    faqs: faqs.map((f) => ({ q: viDict[f.q] || f.q, a: viDict[f.a] || f.a })),
  };
  const zhData = {
    ...enData,
    title: zhDict[title] || title,
    blocks: blocks.map((b) => translateBlock(b, zhDict)),
    faqs: faqs.map((f) => ({ q: zhDict[f.q] || f.q, a: zhDict[f.a] || f.a })),
  };

  await fs.writeFile(
    path.join(projectRoot, "src/content/en", `${page.slug}.json`),
    JSON.stringify(enData, null, 2)
  );
  await fs.writeFile(
    path.join(projectRoot, "src/content/vi", `${page.slug}.json`),
    JSON.stringify(viData, null, 2)
  );
  await fs.writeFile(
    path.join(projectRoot, "src/content/zh", `${page.slug}.json`),
    JSON.stringify(zhData, null, 2)
  );

  manifest.en.push({ slug: page.slug, title, blocks: blocks.length });
  manifest.vi.push({ slug: page.slug, title: viData.title, blocks: blocks.length });
  manifest.zh.push({ slug: page.slug, title: zhData.title, blocks: blocks.length });

  console.log(`  ✓ ${page.slug} (${blocks.length} blocks)`);
}

await fs.writeFile(
  path.join(projectRoot, "src/content/manifest.json"),
  JSON.stringify(manifest, null, 2)
);

console.log(`\nDone. ${manifest.en.length} pages × 3 locales written to src/content/`);
