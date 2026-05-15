#!/usr/bin/env node
/**
 * verify-titles-and-metas.mjs
 *
 * Verifies that live-rendered <title> and <meta name="description"> tags on a
 * list of URLs stay within Google's pixel budgets:
 *   - title:           ≤ 60 chars  (≈580 px desktop)
 *   - meta description: ≤ 155 chars (≈920 px desktop)
 *
 * Designed for post-deploy SEO sanity-checks (e.g. after a title/meta trim PR).
 *
 * Usage
 * -----
 *   # Inline URL list:
 *   node scripts/verify-titles-and-metas.mjs https://jinhaoxy.com/blog/foo/ https://jinhaoxy.com/bar/
 *
 *   # From a newline-delimited file (lines starting with # are comments):
 *   node scripts/verify-titles-and-metas.mjs --file scripts/seo-verify-urls.txt
 *
 *   # Mixed sources:
 *   node scripts/verify-titles-and-metas.mjs --file urls.txt https://extra.example.com/
 *
 *   # Override the pass thresholds (rare):
 *   node scripts/verify-titles-and-metas.mjs --title-max 70 --meta-max 160 https://...
 *
 * Exit codes
 * ----------
 *   0  all URLs pass
 *   1  at least one title or meta is over budget (or fetch failed)
 *   2  bad CLI invocation
 *
 * Per-URL output
 * --------------
 *   <url>
 *     title (<N>) ✓|❌ : <rendered title>
 *     meta  (<N>) ✓|❌ : <rendered description, truncated to 100 chars>
 *
 * The script follows redirects, decodes a small set of common HTML entities,
 * and treats the meta description as optional (a URL with no meta tag is
 * reported as `meta (-) –: <none>` and does not count as a fail).
 *
 * Used by:
 *   - daily SEO cleanup tickets (2026-05-15 onward)
 *   - Cowork briefing-run verification
 */

import { readFileSync } from "node:fs";
import { fetch } from "undici";

const DEFAULT_TITLE_MAX = 60;
const DEFAULT_META_MAX = 155;

function parseArgs(argv) {
  const out = {
    urls: [],
    files: [],
    titleMax: DEFAULT_TITLE_MAX,
    metaMax: DEFAULT_META_MAX,
    help: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--help" || a === "-h") {
      out.help = true;
    } else if (a === "--file" || a === "-f") {
      const v = argv[++i];
      if (!v) throw new Error("--file requires a path argument");
      out.files.push(v);
    } else if (a === "--title-max") {
      out.titleMax = Number(argv[++i]);
    } else if (a === "--meta-max") {
      out.metaMax = Number(argv[++i]);
    } else if (a.startsWith("--")) {
      throw new Error(`unknown flag: ${a}`);
    } else {
      out.urls.push(a);
    }
  }
  return out;
}

function loadUrlsFromFile(file) {
  const txt = readFileSync(file, "utf8");
  return txt
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

async function checkUrl(url, titleMax, metaMax) {
  let res;
  try {
    res = await fetch(url, { redirect: "follow" });
  } catch (e) {
    return { url, status: 0, fetchError: String(e), titleFail: true, metaFail: false };
  }
  const html = await res.text();
  const tMatch = html.match(/<title>([^<]*)<\/title>/);
  const mMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/);
  const title = tMatch ? decodeEntities(tMatch[1]) : null;
  const meta = mMatch ? decodeEntities(mMatch[1]) : null;
  return {
    url,
    status: res.status,
    title,
    titleLen: title ? title.length : 0,
    titleFail: !title || title.length > titleMax,
    meta,
    metaLen: meta ? meta.length : 0,
    // meta is optional — only fail if present and over budget
    metaFail: meta != null && meta.length > metaMax,
  };
}

function formatRow(r, titleMax, metaMax) {
  const lines = [r.url];
  if (r.fetchError) {
    lines.push(`  fetch error: ${r.fetchError}`);
    return lines.join("\n");
  }
  lines.push(`  status: ${r.status}`);
  const tFlag = r.title == null ? "❌" : r.titleFail ? "❌" : "✓";
  lines.push(`  title (${r.titleLen})/${titleMax} ${tFlag}: ${r.title == null ? "<missing>" : r.title}`);
  const mFlag = r.meta == null ? "–" : r.metaFail ? "❌" : "✓";
  const mPreview = r.meta == null ? "<none>" : r.meta.length > 100 ? r.meta.slice(0, 97) + "…" : r.meta;
  lines.push(`  meta  (${r.metaLen})/${metaMax} ${mFlag}: ${mPreview}`);
  return lines.join("\n");
}

async function main() {
  let args;
  try {
    args = parseArgs(process.argv.slice(2));
  } catch (e) {
    console.error("error: " + e.message);
    console.error("run with --help for usage");
    process.exit(2);
  }

  if (args.help) {
    // Strip the JSDoc block at the top and print it
    const src = readFileSync(new URL(import.meta.url), "utf8");
    const m = src.match(/\/\*\*([\s\S]*?)\*\//);
    console.log(m ? m[1].replace(/^\s*\* ?/gm, "").trim() : "see source for usage");
    process.exit(0);
  }

  const urls = [...args.urls];
  for (const f of args.files) urls.push(...loadUrlsFromFile(f));

  if (urls.length === 0) {
    console.error("error: no URLs given. Pass URLs as args or via --file <path>.");
    console.error("run with --help for usage");
    process.exit(2);
  }

  let titleFails = 0;
  let metaFails = 0;
  for (const url of urls) {
    const r = await checkUrl(url, args.titleMax, args.metaMax);
    console.log(formatRow(r, args.titleMax, args.metaMax));
    if (r.titleFail) titleFails++;
    if (r.metaFail) metaFails++;
  }

  console.log(
    `\n--- ${urls.length} URL${urls.length === 1 ? "" : "s"} checked: ${titleFails} title fail${titleFails === 1 ? "" : "s"}, ${metaFails} meta fail${metaFails === 1 ? "" : "s"} ---`
  );
  process.exit(titleFails + metaFails > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error("fatal: " + (e?.stack || e));
  process.exit(1);
});
