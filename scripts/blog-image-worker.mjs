// Blog image worker — generate hero/inline images for jinhaoxy blog posts via
// openai/gpt-image-2 on Replicate, then center-crop and resize to the exact
// dimensions our renderer expects. Saves directly into public/blog/<filename>
// so the JSON content references resolve immediately.
//
// Pattern adapted from D:\insperium-dashboard\workers\drill\regen-gpt-image.js
// (see also REPLICATE-IMAGE-WORKER-SPEC.md). Differences from that worker:
// - No Supabase / Postgres state. Queue is a JSON file.
// - PNG output (matches existing public/blog/ convention).
// - Idempotent: skips files that already exist unless --force.
// - Style suffix baked in so prompts stay short and B2B-photographic.
//
// Usage:
//   node scripts/blog-image-worker.mjs --dry-run                # show plan + cost
//   node scripts/blog-image-worker.mjs                          # generate all pending
//   node scripts/blog-image-worker.mjs --only=section-301-hts-hero.png
//   node scripts/blog-image-worker.mjs --cluster=tariff
//   node scripts/blog-image-worker.mjs --quality=low            # cheap test pass
//   node scripts/blog-image-worker.mjs --force                  # regenerate even if file exists
//
// Env (read from .env.local):
//   REPLICATE_API_TOKEN=r8_...

import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import https from "node:https";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

// Load .env.local (same minimal loader azure-translate.mjs uses)
try {
  const envText = await fs.readFile(path.join(projectRoot, ".env.local"), "utf-8");
  for (const line of envText.split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch {
  // No .env.local, rely on process env
}

const REPLICATE_TOKEN = process.env.REPLICATE_API_TOKEN;
const MODEL_PATH = "/v1/models/openai/gpt-image-2/predictions";
const REPLICATE_HOST = "api.replicate.com";
const PROMPTS_FILE = path.join(projectRoot, "scripts", "blog-image-prompts.json");
const OUTPUT_DIR = path.join(projectRoot, "public", "blog");
const DELAY_MS = 4000; // gentle pacing between Replicate calls

// gpt-image-2 only accepts these aspect ratios. We map our target to the
// closest supported source ratio, then crop down to exact target dims.
const SUPPORTED_RATIOS = [
  { name: "1:1", w: 1, h: 1 },
  { name: "3:2", w: 3, h: 2 },   // 1.500 — landscape
  { name: "2:3", w: 2, h: 3 },   // 0.667 — portrait
];

const QUALITY_COSTS = { low: 0.012, medium: 0.047, high: 0.128, auto: 0.128 };

// Suffix appended to every prompt to nail the brand-consistent look without
// repeating it in every queue entry.
const STYLE_SUFFIX =
  " Cinematic photography, full-frame DSLR aesthetic, natural lighting, " +
  "documentary style, sharp focus on the main subject, shallow depth of field. " +
  "No on-image text, watermarks, logos, signage, or readable brand names.";

// ---------- arg parsing ---------------------------------------------------

function parseArgs() {
  const args = process.argv.slice(2);
  const get = (flag) => {
    const a = args.find((x) => x.startsWith(`${flag}=`));
    return a ? a.slice(flag.length + 1) : null;
  };
  return {
    dryRun: args.includes("--dry-run"),
    force: args.includes("--force"),
    only: get("--only"),
    cluster: get("--cluster"),
    qualityOverride: get("--quality"),
  };
}

// ---------- aspect ratio routing -----------------------------------------

function pickSourceRatio(targetW, targetH) {
  // For each supported source, check if it can contain the target after
  // center-crop. A source can contain the target iff source's aspect ratio's
  // shorter axis covers the target's shorter axis when we scale the source to
  // match the target's longer axis.
  //
  // Simpler practical rule (works for all our targets):
  // - Target landscape (W >= H): use 3:2 (which is wider than 16:9 → trim
  //   top/bottom; or narrower than 4:3 → no, 3:2 IS 4:3-ish). Actually:
  //     16:9 = 1.778 → src 3:2 (1.500) is NARROWER → can't trim sides; instead
  //                    we'd need to trim top/bottom. But 3:2 has MORE height
  //                    than 16:9 needs → YES, we crop top+bottom from the 3:2.
  //                    Verified in the spec doc §8.
  //   So: target landscape with ratio > 1.5 → use 3:2, crop top/bottom.
  //   Target landscape with ratio <= 1.5 → use 3:2, crop sides slightly (rare).
  // - Target portrait: mirror logic with 2:3.
  // - Target 1:1: use 1:1 directly.
  const targetRatio = targetW / targetH;
  if (targetRatio === 1) return SUPPORTED_RATIOS[0];
  if (targetRatio > 1) return SUPPORTED_RATIOS[1]; // landscape → 3:2
  return SUPPORTED_RATIOS[2]; // portrait → 2:3
}

// Center-crop + resize a buffer to exact target dimensions.
async function fitToTarget(buffer, targetW, targetH) {
  const meta = await sharp(buffer).metadata();
  const sw = meta.width;
  const sh = meta.height;
  if (!sw || !sh) throw new Error(`bad image dims ${sw}x${sh}`);

  const sRatio = sw / sh;
  const tRatio = targetW / targetH;

  let cropW, cropH;
  if (sRatio > tRatio) {
    // source is wider — trim sides
    cropH = sh;
    cropW = Math.round(sh * tRatio);
  } else {
    // source is taller (or equal) — trim top/bottom
    cropW = sw;
    cropH = Math.round(sw / tRatio);
  }
  const left = Math.floor((sw - cropW) / 2);
  const top = Math.floor((sh - cropH) / 2);

  return sharp(buffer)
    .extract({ left, top, width: cropW, height: cropH })
    .resize(targetW, targetH, { fit: "fill" })
    .png({ compressionLevel: 8, palette: false })
    .toBuffer();
}

// ---------- Replicate call ------------------------------------------------

function gptImagePredict({ prompt, aspectRatio, quality }) {
  const body = JSON.stringify({
    input: {
      prompt,
      quality,
      background: "auto",
      moderation: "auto",
      aspect_ratio: aspectRatio,
      output_format: "webp",
      number_of_images: 1,
      output_compression: 92,
    },
  });

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: REPLICATE_HOST,
        path: MODEL_PATH,
        method: "POST",
        headers: {
          Authorization: `Bearer ${REPLICATE_TOKEN}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
          Prefer: "wait",
        },
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            if (json.output) {
              const url = Array.isArray(json.output) ? json.output[0] : json.output;
              return resolve(url);
            }
            if (json.error) return reject(new Error(`Replicate: ${json.error}`));
            reject(new Error(`No output: ${data.slice(0, 300)}`));
          } catch (e) {
            reject(new Error(`Parse error: ${e.message} :: ${data.slice(0, 200)}`));
          }
        });
      },
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

function downloadBuffer(url, hops = 0) {
  if (hops > 5) return Promise.reject(new Error("too many redirects"));
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (
          (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307) &&
          res.headers.location
        ) {
          return downloadBuffer(res.headers.location, hops + 1).then(resolve, reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`download HTTP ${res.statusCode}`));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      })
      .on("error", reject);
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- main ----------------------------------------------------------

async function processOne(entry, defaults) {
  const filename = entry.filename;
  const outPath = path.join(OUTPUT_DIR, filename);
  const [targetW, targetH] = entry.size;
  const quality = entry.quality || defaults.quality;
  const sourceRatio = pickSourceRatio(targetW, targetH);
  const fullPrompt = entry.prompt + STYLE_SUFFIX;

  const t0 = Date.now();
  console.log(
    `→ ${filename}  ${targetW}x${targetH}  quality=${quality}  src=${sourceRatio.name}`,
  );

  let predictedUrl;
  try {
    predictedUrl = await gptImagePredict({
      prompt: fullPrompt,
      aspectRatio: sourceRatio.name,
      quality,
    });
  } catch (e) {
    console.error(`  ✗ predict failed: ${e.message}`);
    return { ok: false, filename, reason: e.message };
  }

  let buffer;
  try {
    buffer = await downloadBuffer(predictedUrl);
  } catch (e) {
    console.error(`  ✗ download failed: ${e.message}`);
    return { ok: false, filename, reason: e.message };
  }

  let outBuffer;
  try {
    outBuffer = await fitToTarget(buffer, targetW, targetH);
  } catch (e) {
    console.error(`  ✗ crop failed: ${e.message}`);
    return { ok: false, filename, reason: e.message };
  }

  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.writeFile(outPath, outBuffer);
  const dt = ((Date.now() - t0) / 1000).toFixed(1);
  const kb = (outBuffer.length / 1024).toFixed(0);
  console.log(`  ✓ ${kb}KB in ${dt}s`);
  return { ok: true, filename, kb: Number(kb), dt: Number(dt) };
}

async function run() {
  const opts = parseArgs();
  if (!REPLICATE_TOKEN && !opts.dryRun) {
    console.error("REPLICATE_API_TOKEN not set in env or .env.local");
    console.error("Add it to D:/jinhaoxy-site/.env.local (gitignored).");
    process.exit(1);
  }
  if (opts.qualityOverride && !QUALITY_COSTS[opts.qualityOverride]) {
    console.error(`Bad --quality '${opts.qualityOverride}'. Use low|medium|high|auto.`);
    process.exit(1);
  }

  const queue = JSON.parse(await fs.readFile(PROMPTS_FILE, "utf-8"));
  const defaults = queue.defaults || { quality: "high" };

  // Filter
  let images = queue.images;
  if (opts.only) images = images.filter((x) => x.filename === opts.only);
  if (opts.cluster) images = images.filter((x) => x.cluster === opts.cluster);

  // Apply quality override
  if (opts.qualityOverride) {
    images = images.map((x) => ({ ...x, quality: opts.qualityOverride }));
  }

  // Skip ones that already exist (unless --force)
  const todo = [];
  for (const entry of images) {
    const exists = fsSync.existsSync(path.join(OUTPUT_DIR, entry.filename));
    if (exists && !opts.force) {
      console.log(`· skip (exists)  ${entry.filename}`);
      continue;
    }
    todo.push(entry);
  }

  if (todo.length === 0) {
    console.log("\nNothing to do.");
    return;
  }

  // Cost estimate
  const totalCost = todo.reduce(
    (s, e) => s + (QUALITY_COSTS[e.quality || defaults.quality] || 0),
    0,
  );
  console.log(
    `\n${todo.length} image(s) to generate · estimated $${totalCost.toFixed(2)} on Replicate`,
  );

  if (opts.dryRun) {
    console.log("\n--dry-run — no API calls made.");
    for (const e of todo) {
      const q = e.quality || defaults.quality;
      console.log(
        `  ${e.filename}  ${e.size[0]}x${e.size[1]}  quality=${q}  ($${QUALITY_COSTS[q].toFixed(3)})`,
      );
    }
    return;
  }

  console.log("");
  let ok = 0;
  let fail = 0;
  const failures = [];
  for (let i = 0; i < todo.length; i++) {
    const r = await processOne(todo[i], defaults);
    if (r.ok) ok++;
    else {
      fail++;
      failures.push(r);
    }
    if (i < todo.length - 1) await sleep(DELAY_MS);
  }

  console.log(`\nDone — ${ok} ok, ${fail} failed.`);
  if (failures.length > 0) {
    console.log("\nFailures:");
    for (const f of failures) console.log(`  ${f.filename}: ${f.reason}`);
    process.exit(1);
  }
}

run().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
