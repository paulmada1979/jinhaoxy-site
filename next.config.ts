import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// WordPress → new site slug map (per locale, source had localized slugs).
// English slugs were kept 1:1 from WP, so EN doesn't need explicit redirects.
const VI_SLUG_MAP: Record<string, string> = {
  "chinh-sach-cookie": "cookie-policy",
  "nha-may-hai-duong": "hai-duong-factory",
  "chung-nhan": "certifications",
  "ve-chung-toi": "about-us",
  "bao-bi-tieu-dung": "consumer-packaging",
  "thung-carton-gap": "folding-cartons",
  "nhan-dan-nhan": "stickers-labels",
  "huong-dan-su-dung": "instructions-manuals",
  "bao-bi-san-sang-de-tren-ke": "shelf-ready-packaging",
  "cac-san-pham": "products",
  "dieu-khoan-su-dung": "terms-of-use",
  "chinh-sach-bao-mat": "privacy-policy",
  "hop-nhan-tao": "artificial-boxes",
  "khay-bia-cung-chen": "cardboard-trays-inserts",
  "bao-bi-ban-le": "retail-packing",
  "cac-nha-may": "factories",
  "viet-nam-xinyuanjia": "vietnam-xinyuanjia",
  "nha-may-in-dong-quan-xinyuan": "dongguan-xinyuan-printing-factory",
  "hop-van-chuyen-thung-carton-xuat-khau": "shipping-boxes-export-cartons",
  khay: "trays",
  "hop-thu-thuong-mai-dien-tu": "e-commerce-mailer-boxes",
  "hop-qua-tang-cung-sang-trong": "luxury-rigid-gift-boxes",
  "hop-qua-lon": "large-gift-boxes",
  "hop-qua-tang-in-tuy-chinh": "custom-printed-gift-boxes",
  "nha-san-xuat-hop-carton-song-tai-viet-nam-tap-doan-jinhao-xinyuan":
    "corrugated-packaging-box-manufacturer-in-vietnam-jinhao-xinyuan-group",
  "hop-qua-tang-co-khoa-tu": "magnetic-closure-gift-boxes",
  "hop-qua-co-the-gap-gon-cho-ban-le-thuong-mai-dien-tu":
    "collapsible-gift-boxes-for-e-commerce-retail",
  "hop-qua-trang-suc-tuy-chinh": "custom-jewelry-gift-boxes",
  "hop-qua-tang-my-pham": "cosmetic-gift-boxes",
  "lien-he-voi-chung-toi": "conctact-us",
};

// Note: Chinese (zh) localized slug redirects live in src/middleware.ts because
// Next.js's path-to-regexp source matching can't handle non-ASCII characters
// reliably. Only EN drops + VI redirects are handled here.

const nextConfig: NextConfig = {
  // Match WordPress URL format (every URL has a trailing slash) so we
  // don't lose authority on indexed pages during the cutover.
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // With `trailingSlash: true`, source/destination paths must include the
    // trailing slash; otherwise Next.js does a 308 to the slashed version
    // first, creating a redirect chain that hurts SEO.
    const r: Array<{ source: string; destination: string; permanent: boolean }> = [];

    // Drop draft pages that shouldn't have been indexed on WP
    r.push({ source: "/button-draft/", destination: "/", permanent: true });
    r.push({ source: "/vi/ban-nhap-nut/", destination: "/vi/", permanent: true });

    // Vietnamese localized WP slugs → English slugs under /vi/
    for (const [vi, en] of Object.entries(VI_SLUG_MAP)) {
      r.push({ source: `/vi/${vi}/`, destination: `/vi/${en}/`, permanent: true });
    }

    return r;
  },
};

export default withNextIntl(nextConfig);
