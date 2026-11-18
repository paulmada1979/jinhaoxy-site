#!/usr/bin/env node
// IndexNow submission for jinhaoxy.com (modelled on jinlai's scripts/indexnow-submit.mjs).
//
// Pushes URLs to the IndexNow API so Bing/Yandex/Seznam/Naver learn about
// changed pages without waiting for a re-crawl. The key file is served from
// public/<KEY>.txt.
//
//   npm run indexnow                                   # dry run: whole sitemap
//   node scripts/indexnow-submit.mjs URL [URL ...]     # dry run: just these URLs
//   node scripts/indexnow-submit.mjs --file urls.txt   # dry run: one URL per line (# comments ok)
//   ...add --submit to any of the above to actually POST.
//
// Default is a DRY RUN: it prints the payload and makes no network write.
// Without explicit URLs it reads the sitemap the last local build produced
// (.next/server/app/sitemap.xml.body), falling back to the live sitemap.
// Nothing calls this automatically (no postbuild hook).
//
// No dependencies. Requires Node 18+ (global fetch).

import { readFile } from "node:fs/promises";
import path from "node:path";

const HOST = "jinhaoxy.com";
const KEY = "026a38a286f04530888e5538d689f623";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const BATCH_SIZE = 10000; // IndexNow hard cap per request

const BUILT_SITEMAP = path.join(process.cwd(), ".next", "server", "app", "sitemap.xml.body");

const STATUS_MEANING = {
  200: "OK - URLs accepted.",
  202: "Accepted - URLs received, key validation pending.",
  400: "Bad request - invalid format.",
  403: "Forbidden - key file not fetchable at keyLocation.",
  422: "Unprocessable - URLs do not belong to host, or key/host mismatch.",
  429: "Too many requests - rate limited. Do NOT retry in a loop.",
};

function parseArgs(argv) {
  const opts = { submit: false, file: null, urls: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--submit") opts.submit = true;
    else if (a === "--dry-run") opts.submit = false;
    else if (a === "--file") opts.file = argv[++i];
    else if (a.startsWith("--")) throw new Error(`unknown option ${a}`);
    else opts.urls.push(a);
  }
  return opts;
}

function parseLocs(xml, source) {
  const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
  if (urls.length === 0) {
    throw new Error(`sitemap parsed to 0 <loc> entries (${source}) - refusing to continue`);
  }
  return urls;
}

async function sitemapUrls() {
  try {
    const xml = await readFile(BUILT_SITEMAP, "utf8");
    console.log(`source:      BUILT ${BUILT_SITEMAP}`);
    return parseLocs(xml, BUILT_SITEMAP);
  } catch (err) {
    if (err?.code !== "ENOENT") throw err;
    console.log(`source:      LIVE ${SITEMAP_URL} (no local build sitemap)`);
  }
  const res = await fetch(SITEMAP_URL, { headers: { "cache-control": "no-cache" } });
  if (!res.ok) throw new Error(`sitemap fetch failed: HTTP ${res.status} ${SITEMAP_URL}`);
  return parseLocs(await res.text(), SITEMAP_URL);
}

async function collectUrls(opts) {
  const urls = [...opts.urls];
  if (opts.file) {
    const text = await readFile(opts.file, "utf8");
    urls.push(
      ...text
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter((l) => l && !l.startsWith("#")),
    );
    console.log(`source:      ${opts.file}${opts.urls.length ? " + command line" : ""}`);
  } else if (urls.length) {
    console.log("source:      command line");
  }
  if (urls.length === 0) return sitemapUrls();
  // Accept bare paths ("/vi/products/") as a convenience.
  return urls.map((u) => (u.startsWith("/") ? `https://${HOST}${u}` : u));
}

function assertSameHost(urls) {
  const foreign = urls.filter((u) => {
    try {
      return new URL(u).host !== HOST;
    } catch {
      return true;
    }
  });
  if (foreign.length > 0) {
    throw new Error(`${foreign.length} URL(s) are not on ${HOST} - refusing. First: ${foreign[0]}`);
  }
}

function batch(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const urls = [...new Set(await collectUrls(opts))];
  assertSameHost(urls);
  const batches = batch(urls, BATCH_SIZE);

  console.log(`host:        ${HOST}`);
  console.log(`keyLocation: ${KEY_LOCATION}`);
  console.log(`urls:        ${urls.length}`);
  console.log(`batches:     ${batches.length} (max ${BATCH_SIZE} per request)`);
  console.log("");
  urls.forEach((u, i) => console.log(`  ${String(i + 1).padStart(3, " ")}. ${u}`));
  console.log("");

  if (!opts.submit) {
    console.log("DRY RUN (default): no network write performed.");
    console.log("Payload that WOULD be sent (batch 1):");
    console.log(
      JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: batches[0] }, null, 2),
    );
    console.log("\nRe-run with --submit to POST.");
    return;
  }

  let failed = false;
  for (const [i, urlList] of batches.entries()) {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
    });
    const text = await res.text();
    console.log(`batch ${i + 1}/${batches.length} (${urlList.length} urls)`);
    console.log(`HTTP status: ${res.status} ${res.statusText}`);
    console.log(`meaning:     ${STATUS_MEANING[res.status] ?? "Unrecognised status."}`);
    console.log(`body:        ${JSON.stringify(text)}`);
    if (res.status !== 200 && res.status !== 202) failed = true;
  }

  if (failed) {
    console.log("\nAt least one batch was not accepted. Stopping. Do not retry in a loop.");
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(`ERROR: ${err.message}`);
  process.exitCode = 1;
});
