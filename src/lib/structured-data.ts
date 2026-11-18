// Page-level JSON-LD for the [slug] route: Product on product pages, Article on
// the long-form guide-style product pages, ItemList on /products/.
//
// Every locale gets the same schema. Text comes from the strings the page
// already renders (messages/<locale>.json, or the page's content JSON), so the
// schema is localized automatically and never says anything the page doesn't.
//
// Deliberately absent: prices, aggregateRating, review, certifications. The
// site publishes none of those as structured facts. Products carry a quote-only
// Offer (made to order, price on request, url = contact page) because Google
// wants one of offers / review / aggregateRating on a Product. Same pattern as
// Luban; no price is invented.

import { getTranslations } from "next-intl/server";
import type { PageData } from "@/components/PageRenderer";

export const SITE_URL = "https://jinhaoxy.com";
const ORG_NAME = "Jinhao Xinyuan Group";

const ORG_REF = {
  "@type": "Organization",
  name: ORG_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.webp`,
};

type ProductSource =
  // Dedicated component page: name = megamenu label, description = <ns>.heroDesc
  | { menuKey: string; ns: string; image: string }
  // Content-JSON page (PageRenderer): name = first H1, description = seo.description
  | { content: true; image: string };

// Product pages, in /products/ ItemList order (megamenu order, then rigid boxes).
export const PRODUCT_PAGES: Record<string, ProductSource> = {
  "shipping-boxes-export-cartons": {
    menuKey: "linkShippingBoxes",
    ns: "shippingBoxes",
    image: "/media/warehouse-workers-packing-boxes-for-shipment-2025-02-11-14-31-52-utc.webp",
  },
  "e-commerce-mailer-boxes": {
    menuKey: "linkMailerBoxes",
    ns: "mailerBoxes",
    image: "/media/cardboard-carton-box-with-photos-close-up-2024-09-16-08-33-48-utc.webp",
  },
  "cardboard-trays-inserts": {
    menuKey: "linkCardboardTrays",
    ns: "trays",
    image: "/media/online-small-business-owner-2025-04-01-01-18-59-utc.webp",
  },
  "retail-packing": {
    menuKey: "linkRetailPackaging",
    ns: "retailPacking",
    image: "/media/Retail-packing.webp",
  },
  "shelf-ready-packaging": {
    menuKey: "linkShelfReady",
    ns: "shelfReady",
    image: "/media/01_ShelfBox_v1.4-copy.jpg",
  },
  "consumer-packaging": {
    menuKey: "linkConsumerPackaging",
    ns: "consumerPackaging",
    image: "/media/01.Gable-Box-Mockup-copy.png",
  },
  "folding-cartons": {
    menuKey: "linkFoldingCartons",
    ns: "foldingCartons",
    image: "/media/01_Carton-Box-Mockup-copy.jpg",
  },
  "luxury-rigid-gift-boxes": {
    menuKey: "linkLuxuryRigid",
    ns: "luxuryRigid",
    image: "/media/blank-box-package-for-mobile-phone-or-other-things-2024-09-06-02-35-03-utc.webp",
  },
  "custom-printed-gift-boxes": {
    menuKey: "linkCustomPrinted",
    ns: "customPrinted",
    image: "/media/happy-mothers-day-2025-02-24-14-44-31-utc.webp",
  },
  "large-gift-boxes": {
    menuKey: "linkLargeGift",
    ns: "largeGift",
    image: "/media/black-man-opening-box-with-blue-balloons-while-pre-2025-06-19-19-20-51-utc.webp",
  },
  "custom-jewelry-gift-boxes": {
    menuKey: "linkJewelryBoxes",
    ns: "jewelry",
    image: "/media/shot-of-assorted-colorful-gift-boxes-with-accessor-2025-02-08-23-29-30-utc.webp",
  },
  "magnetic-closure-gift-boxes": {
    menuKey: "linkMagnetic",
    ns: "magnetic",
    image: "/media/black-box-isolated-on-a-white-background-2025-02-02-20-00-39-utc-1.webp",
  },
  "collapsible-gift-boxes-for-e-commerce-retail": {
    menuKey: "linkCollapsible",
    ns: "collapsible",
    image: "/media/white-box-isolated-on-background-mockup-2024-12-20-11-19-20-utc.webp",
  },
  "cosmetic-gift-boxes": {
    menuKey: "linkCosmetic",
    ns: "cosmetic",
    image: "/media/top-view-of-blue-ribbon-on-man-perfume-in-a-gift-b-2025-02-10-11-30-09-utc.webp",
  },
  "stickers-labels": {
    menuKey: "linkAdhesiveLabel",
    ns: "stickers",
    image: "/media/unrecognizable-man-holding-roll-with-stickers-for-2025-03-18-17-15-13-utc.jpg",
  },
  "artificial-boxes": {
    menuKey: "linkArtificialBoxes",
    ns: "plastic",
    image: "/media/plastic-containers-2024-10-24-03-04-33-utc.jpg",
  },
  "instructions-manuals": {
    menuKey: "linkInstructions",
    ns: "instructions",
    image: "/media/caucasian-young-man-reads-book-instructions-for-as-2025-03-06-10-10-45-utc.jpg",
  },
  "rigid-boxes": {
    content: true,
    image: "/media/pretty-multiethnic-woman-standing-inside-blank-whi-2024-09-11-20-35-43-utc.webp",
  },
};

// Legacy alias that renders the same component as cardboard-trays-inserts.
// Gets Product schema but is not listed in the /products/ ItemList.
const PRODUCT_ALIASES: Record<string, string> = { trays: "cardboard-trays-inserts" };

// Long-form, guide-style product pages that also carry Article markup
// (Article.about -> the page's Product).
const ARTICLE_PAGES = new Set(["collapsible-gift-boxes-for-e-commerce-retail", "instructions-manuals"]);

const ITEM_LIST_SLUG = "products";

export function pageUrl(locale: string, slug: string): string {
  const localePart = locale === "en" ? "" : `/${locale}`;
  return `${SITE_URL}${localePart}/${slug}/`;
}

function quoteOffer(locale: string) {
  return {
    "@type": "Offer",
    availability: "https://schema.org/PreOrder",
    itemCondition: "https://schema.org/NewCondition",
    url: pageUrl(locale, "contact-us"),
    seller: ORG_REF,
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "USD",
      description: "Price on request",
    },
  };
}

type Translator = Awaited<ReturnType<typeof getTranslations>>;

function firstH1(page: PageData): string | undefined {
  return page.blocks.find((b) => b.type === "heading" && b.level === 1)?.text?.trim() || undefined;
}

async function loadContent(locale: string, slug: string): Promise<PageData | null> {
  try {
    const mod = await import(`@/content/${locale}/${slug}.json`);
    return mod.default as PageData;
  } catch {
    return null;
  }
}

async function productNameAndDescription(
  t: Translator,
  locale: string,
  slug: string,
  src: ProductSource,
  page?: PageData | null,
): Promise<{ name: string; description?: string }> {
  if ("content" in src) {
    const data = page ?? (await loadContent(locale, slug));
    return {
      name: (data && (firstH1(data) ?? data.title)) || slug,
      description: data?.seo?.description,
    };
  }
  return { name: t(`megamenu.${src.menuKey}`), description: t(`${src.ns}.heroDesc`) };
}

/** JSON-LD objects for a [slug] page. Empty array when the page has none. */
export async function buildPageJsonLd(
  locale: string,
  slug: string,
  page: PageData,
): Promise<Record<string, unknown>[]> {
  const t = await getTranslations({ locale });
  const url = pageUrl(locale, slug);
  const out: Record<string, unknown>[] = [];

  const productSlug = PRODUCT_ALIASES[slug] ?? slug;
  const product = PRODUCT_PAGES[productSlug];
  if (product) {
    const { name, description } = await productNameAndDescription(t, locale, productSlug, product, page);
    const productId = `${url}#product`;
    out.push({
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": productId,
      name,
      ...(description ? { description } : {}),
      url,
      image: `${SITE_URL}${product.image}`,
      brand: { "@type": "Brand", name: ORG_NAME },
      manufacturer: ORG_REF,
      offers: quoteOffer(locale),
    });

    if (ARTICLE_PAGES.has(productSlug) && "ns" in product) {
      out.push({
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${url}#article`,
        headline: t(`${product.ns}.heroTitle`).slice(0, 110),
        ...(description ? { description } : {}),
        inLanguage: locale,
        url,
        mainEntityOfPage: url,
        image: `${SITE_URL}${product.image}`,
        author: ORG_REF,
        publisher: ORG_REF,
        about: { "@id": productId },
      });
    }
  }

  if (slug === ITEM_LIST_SLUG) {
    const entries = Object.entries(PRODUCT_PAGES);
    const items = await Promise.all(
      entries.map(async ([s, src], i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: pageUrl(locale, s),
        name: (await productNameAndDescription(t, locale, s, src)).name,
      })),
    );
    out.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${url}#itemlist`,
      name: page.title,
      url,
      numberOfItems: items.length,
      itemListElement: items,
    });
  }

  return out;
}

/** Serialize for a <script type="application/ld+json">; escapes "<" so content can't close the tag. */
export function jsonLdString(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
