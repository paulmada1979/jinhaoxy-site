// One-shot internal-link sweep for blog posts #2, #3, #4.
//
// Adds the 3 target product/factory pages to the "related" array of each
// post in all 3 locales (idempotent — skips slugs already present).
// Optionally also inserts a contextually-placed inline CTA block.
//
// Target pages (per 2026-05-14 briefing — the 4 stuck Vietnam-English
// queries that need internal-link juice):
//   /vietnam-xinyuanjia/
//   /corrugated-packaging-box-manufacturer-in-vietnam-jinhao-xinyuan-group/
//   /cardboard-trays-inserts/
//
// Run once: `node scripts/internal-link-sweep.mjs`

import fs from "node:fs";
import path from "node:path";

const POSTS = [
  "section-301-packaging-tariffs-hts-codes", // #2
  "vietnam-vs-china-landed-cost-worked-example", // #3
  "made-in-vietnam-verification-substantial-transformation", // #4
];

const LOCALES = ["en", "vi", "zh"];

// Per-locale labels for the 3 target pages.
const RELATED_LABELS = {
  "vietnam-xinyuanjia": {
    en: "Vietnam Xinyuanjia — our Vietnam operations",
    vi: "Vietnam Xinyuanjia — hoạt động Việt Nam của chúng tôi",
    zh: "越南新源家 — 我们的越南运营",
  },
  "corrugated-packaging-box-manufacturer-in-vietnam-jinhao-xinyuan-group": {
    en: "Vietnam corrugated packaging manufacturing",
    vi: "Sản xuất bao bì sóng tại Việt Nam",
    zh: "越南瓦楞包装制造",
  },
  "cardboard-trays-inserts": {
    en: "Cardboard trays & inserts",
    vi: "Khay và miếng chèn carton",
    zh: "纸板托盘和内衬",
  },
};

// Per-post inline CTA blocks. Each entry says: which page to CTA to,
// where to insert (anchor block — we insert right after the first
// `text` block following a `heading` whose text matches anchorText),
// and the localized title/body.
const INLINE_CTAS = {
  // Post #2: CTA to cardboard-trays-inserts after the HTS codes table.
  // The table block is followed by an image block; insert AFTER the image.
  "section-301-packaging-tariffs-hts-codes": {
    href: "/cardboard-trays-inserts/",
    insertAfterImageSrc: "/blog/hts-classification-inline.png",
    en: {
      title: "Cardboard trays & inserts (HTS 4819.40)",
      body: "Custom paperboard trays and inserts manufactured in Vietnam — same HTS classification family, tariff-free for US buyers.",
    },
    vi: {
      title: "Khay và miếng chèn carton (HTS 4819.40)",
      body: "Khay và miếng chèn bằng bìa cứng sản xuất tại Việt Nam — cùng nhóm phân loại HTS, miễn thuế cho người mua Mỹ.",
    },
    zh: {
      title: "纸板托盘和内衬（HTS 4819.40）",
      body: "在越南制造的定制纸板托盘和内衬 — 相同的HTS分类系列，对美国买家免征关税。",
    },
  },
  // Post #3: CTA to corrugated-packaging after the landed-cost spreadsheet image.
  "vietnam-vs-china-landed-cost-worked-example": {
    href: "/corrugated-packaging-box-manufacturer-in-vietnam-jinhao-xinyuan-group/",
    insertAfterImageSrc: "/blog/landed-cost-spreadsheet-inline.png",
    en: {
      title: "Vietnam corrugated packaging — the production side of this math",
      body: "Where the worked example actually gets manufactured: B-flute, E-flute, BC double-wall corrugated production at our Hai Duong factory.",
    },
    vi: {
      title: "Bao bì sóng Việt Nam — phía sản xuất của phép tính này",
      body: "Nơi ví dụ trên thực sự được sản xuất: sản xuất sóng B, sóng E, BC hai lớp tại nhà máy Hải Dương của chúng tôi.",
    },
    zh: {
      title: "越南瓦楞包装 — 这套计算背后的生产端",
      body: "上述案例的实际生产地：在我们的海阳工厂生产B型、E型、BC双壁瓦楞产品。",
    },
  },
  // Post #4: CTA to vietnam-xinyuanjia after the certificate-of-origin image.
  "made-in-vietnam-verification-substantial-transformation": {
    href: "/vietnam-xinyuanjia/",
    insertAfterImageSrc: "/blog/certificate-of-origin-inline.png",
    en: {
      title: "Vietnam Xinyuanjia — where the substantial transformation happens",
      body: "Our Vietnam operations entity. Paperboard converting, offset printing, finishing, ISTA testing — all in-country, all documented to CBP's evidentiary standard.",
    },
    vi: {
      title: "Vietnam Xinyuanjia — nơi diễn ra sự chuyển đổi đáng kể",
      body: "Đơn vị hoạt động tại Việt Nam của chúng tôi. Chuyển đổi bìa cứng, in offset, hoàn thiện, kiểm tra ISTA — tất cả tại Việt Nam, tất cả có hồ sơ đạt tiêu chuẩn bằng chứng của CBP.",
    },
    zh: {
      title: "越南新源家 — 实质性转变发生的地方",
      body: "我们的越南运营实体。纸板转换、胶印、整理、ISTA测试 — 全部在国内完成，全部按CBP证据标准记录。",
    },
  },
};

let totalRelatedAdded = 0;
let totalCtasAdded = 0;

for (const slug of POSTS) {
  for (const locale of LOCALES) {
    const fp = path.join("src/content/blog", locale, `${slug}.json`);
    const raw = fs.readFileSync(fp, "utf-8");
    const data = JSON.parse(raw);

    // 1) Add missing related entries (idempotent)
    data.related = data.related || [];
    const existing = new Set(data.related.map((r) => r.slug));
    let addedHere = 0;
    for (const targetSlug of Object.keys(RELATED_LABELS)) {
      if (existing.has(targetSlug)) continue;
      data.related.push({
        slug: targetSlug,
        label: RELATED_LABELS[targetSlug][locale],
        kind: "page",
      });
      addedHere++;
    }

    // 2) Insert inline CTA (idempotent — skip if same href already present)
    const ctaSpec = INLINE_CTAS[slug];
    let ctaAddedHere = 0;
    if (ctaSpec) {
      const alreadyHasCta = data.blocks.some(
        (b) => b.type === "cta" && b.href === ctaSpec.href,
      );
      if (!alreadyHasCta) {
        const anchorIdx = data.blocks.findIndex(
          (b) => b.type === "image" && b.src === ctaSpec.insertAfterImageSrc,
        );
        if (anchorIdx === -1) {
          console.warn(
            `  ! ${slug}/${locale}: anchor image ${ctaSpec.insertAfterImageSrc} not found — skipping CTA`,
          );
        } else {
          const block = {
            type: "cta",
            href: ctaSpec.href,
            title: ctaSpec[locale].title,
            body: ctaSpec[locale].body,
          };
          data.blocks.splice(anchorIdx + 1, 0, block);
          ctaAddedHere = 1;
        }
      }
    }

    fs.writeFileSync(fp, JSON.stringify(data, null, 2) + "\n");
    if (addedHere > 0 || ctaAddedHere > 0) {
      console.log(
        `  ${slug}/${locale}: +${addedHere} related, +${ctaAddedHere} cta`,
      );
    }
    totalRelatedAdded += addedHere;
    totalCtasAdded += ctaAddedHere;
  }
}

console.log(
  `\nTotal: +${totalRelatedAdded} related entries, +${totalCtasAdded} inline CTAs across ${POSTS.length * LOCALES.length} files`,
);
