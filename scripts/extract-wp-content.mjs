// Extract WordPress content from SQL dump
// Usage: node scripts/extract-wp-content.mjs <path-to-sql-dump>

import fs from "node:fs/promises";
import path from "node:path";

const sqlPath = process.argv[2];
if (!sqlPath) {
  console.error("Usage: node scripts/extract-wp-content.mjs <sql-file>");
  process.exit(1);
}

const sql = await fs.readFile(sqlPath, "utf-8");
console.log(`Loaded ${(sql.length / 1024 / 1024).toFixed(1)} MB SQL dump`);

// Find ghv_posts inserts
// Each INSERT looks like: INSERT INTO `ghv_posts` VALUES (1,1,'2024-...','...','<content>','title',...)
// We need to robustly split on ),( boundaries while respecting quoted strings

function extractInsertValues(tableName, sqlText) {
  // INSERT format: INSERT INTO `table` (...columns...) VALUES (row1),(row2),...;
  // Or: INSERT INTO `table` VALUES (row1),...;
  const prefix = `INSERT INTO \`${tableName}\``;
  const rows = [];
  let idx = 0;

  while (true) {
    const start = sqlText.indexOf(prefix, idx);
    if (start === -1) break;

    // Skip past prefix, optional column list, and "VALUES"
    const valuesIdx = sqlText.indexOf("VALUES", start);
    if (valuesIdx === -1) break;

    let pos = valuesIdx + "VALUES".length;
    // Skip whitespace and newlines
    while (pos < sqlText.length && /\s/.test(sqlText[pos])) pos++;

    let depth = 0;
    let inString = false;
    let escape = false;
    let rowStart = pos;

    while (pos < sqlText.length) {
      const ch = sqlText[pos];
      if (escape) {
        escape = false;
      } else if (inString) {
        if (ch === "\\") escape = true;
        else if (ch === "'") inString = false;
      } else {
        if (ch === "'") inString = true;
        else if (ch === "(") {
          if (depth === 0) rowStart = pos + 1;
          depth++;
        } else if (ch === ")") {
          depth--;
          if (depth === 0) {
            rows.push(sqlText.slice(rowStart, pos));
          }
        } else if (ch === ";" && depth === 0) {
          break;
        }
      }
      pos++;
    }
    idx = pos;
  }

  return rows;
}

function parseRow(rowStr) {
  // Parse a comma-separated list of values, respecting quoted strings
  const values = [];
  let current = "";
  let inString = false;
  let escape = false;

  for (let i = 0; i < rowStr.length; i++) {
    const ch = rowStr[i];
    if (escape) {
      current += ch === "n" ? "\n" : ch === "t" ? "\t" : ch === "r" ? "\r" : ch;
      escape = false;
    } else if (inString) {
      if (ch === "\\") escape = true;
      else if (ch === "'") {
        inString = false;
      } else {
        current += ch;
      }
    } else {
      if (ch === "'") inString = true;
      else if (ch === ",") {
        values.push(parseValue(current));
        current = "";
      } else if (ch !== " " || current) {
        current += ch;
      }
    }
  }
  if (current) values.push(parseValue(current));
  return values;
}

function parseValue(v) {
  const trimmed = v.trim();
  if (trimmed === "NULL") return null;
  if (/^-?\d+$/.test(trimmed)) return parseInt(trimmed, 10);
  return v;
}

// ghv_posts columns (standard WordPress):
// ID, post_author, post_date, post_date_gmt, post_content, post_title,
// post_excerpt, post_status, comment_status, ping_status, post_password,
// post_name, to_ping, pinged, post_modified, post_modified_gmt,
// post_content_filtered, post_parent, guid, menu_order, post_type,
// post_mime_type, comment_count
const POST_COLS = [
  "ID", "post_author", "post_date", "post_date_gmt", "post_content",
  "post_title", "post_excerpt", "post_status", "comment_status",
  "ping_status", "post_password", "post_name", "to_ping", "pinged",
  "post_modified", "post_modified_gmt", "post_content_filtered",
  "post_parent", "guid", "menu_order", "post_type", "post_mime_type",
  "comment_count",
];

console.log("Extracting ghv_posts rows...");
const postRows = extractInsertValues("ghv_posts", sql);
console.log(`Found ${postRows.length} posts/pages`);

const posts = postRows.map((row) => {
  const values = parseRow(row);
  const obj = {};
  POST_COLS.forEach((col, i) => {
    obj[col] = values[i];
  });
  return obj;
}).filter((p) => p.post_status === "publish");

console.log(`Published: ${posts.length}`);

// Group by type
const byType = {};
for (const p of posts) {
  byType[p.post_type] = (byType[p.post_type] || 0) + 1;
}
console.log("By type:", byType);

// Only pages and posts
const pages = posts.filter((p) => p.post_type === "page");
const blogPosts = posts.filter((p) => p.post_type === "post");

// Strip Elementor JSON shortcodes, keep readable content
function cleanContent(html) {
  if (!html) return "";
  return html
    .replace(/\[et_pb_\w+[^\]]*\]/g, "")
    .replace(/\[\/et_pb_\w+\]/g, "")
    .trim();
}

// Output
const outDir = path.join(path.dirname(sqlPath), "extracted");
await fs.mkdir(outDir, { recursive: true });

await fs.writeFile(
  path.join(outDir, "pages.json"),
  JSON.stringify(
    pages.map((p) => ({
      id: p.ID,
      slug: p.post_name,
      title: p.post_title,
      content: cleanContent(p.post_content),
      excerpt: p.post_excerpt,
      parent: p.post_parent,
      menu_order: p.menu_order,
      modified: p.post_modified,
      guid: p.guid,
    })),
    null,
    2
  )
);

await fs.writeFile(
  path.join(outDir, "posts.json"),
  JSON.stringify(
    blogPosts.map((p) => ({
      id: p.ID,
      slug: p.post_name,
      title: p.post_title,
      content: cleanContent(p.post_content),
      excerpt: p.post_excerpt,
      modified: p.post_modified,
    })),
    null,
    2
  )
);

// Extract TranslatePress dictionaries
console.log("\nExtracting translations...");
const viRows = extractInsertValues("ghv_trp_dictionary_en_us_vi", sql);
const zhRows = extractInsertValues("ghv_trp_dictionary_en_us_zh_cn", sql);
console.log(`VI translations: ${viRows.length} batches`);
console.log(`ZH translations: ${zhRows.length} batches`);

// TRP dictionary columns: id, original, translated, status, block_type,
// original_id, created_at
const TRP_COLS = ["id", "original", "translated", "status", "block_type", "original_id", "created_at"];

function parseTrpDict(rows) {
  const out = {};
  for (const row of rows) {
    const values = parseRow(row);
    const obj = {};
    TRP_COLS.forEach((c, i) => (obj[c] = values[i]));
    if (obj.original && obj.translated && obj.status == 2) {
      out[obj.original] = obj.translated;
    }
  }
  return out;
}

const viDict = parseTrpDict(viRows);
const zhDict = parseTrpDict(zhRows);
console.log(`VI translated strings: ${Object.keys(viDict).length}`);
console.log(`ZH translated strings: ${Object.keys(zhDict).length}`);

await fs.writeFile(
  path.join(outDir, "translations-vi.json"),
  JSON.stringify(viDict, null, 2)
);
await fs.writeFile(
  path.join(outDir, "translations-zh.json"),
  JSON.stringify(zhDict, null, 2)
);

console.log(`\nExtracted files written to: ${outDir}`);
