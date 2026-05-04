import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// WordPress → new site slug map for Chinese.
// Defined here (not in next.config.ts) because Next.js redirect path-to-regexp
// matching can't reliably handle non-ASCII characters in `source` patterns.
const ZH_SLUG_MAP: Record<string, string> = {
  "cookie政策": "cookie-policy",
  "海阳工厂": "hai-duong-factory",
  "认证": "certifications",
  "关于我们": "about-us",
  "消费品包装": "consumer-packaging",
  "折叠纸盒": "folding-cartons",
  "贴纸标签": "stickers-labels",
  "使用说明书": "instructions-manuals",
  "货架即用包装": "shelf-ready-packaging",
  "产品": "products",
  "使用条款": "terms-of-use",
  "隐私政策": "privacy-policy",
  "人工盒子": "artificial-boxes",
  "纸板托盘内衬": "cardboard-trays-inserts",
  "零售包装": "retail-packing",
  "工厂": "factories",
  "越南新源家": "vietnam-xinyuanjia",
  "东莞市鑫源印刷厂": "dongguan-xinyuan-printing-factory",
  "运输箱-出口纸箱": "shipping-boxes-export-cartons",
  "托盘": "trays",
  "电子商务邮寄包装盒": "e-commerce-mailer-boxes",
  "豪华硬质礼盒": "luxury-rigid-gift-boxes",
  "大礼盒": "large-gift-boxes",
  "定制印刷礼品盒": "custom-printed-gift-boxes",
  "越南瓦楞纸包装盒制造商金豪新源集团":
    "corrugated-packaging-box-manufacturer-in-vietnam-jinhao-xinyuan-group",
  "磁扣礼盒": "magnetic-closure-gift-boxes",
  "适用于电子商务零售的可折叠礼品盒":
    "collapsible-gift-boxes-for-e-commerce-retail",
  "定制珠宝礼盒": "custom-jewelry-gift-boxes",
  "化妆品礼盒": "cosmetic-gift-boxes",
  "联系我们": "conctact-us",
  "按钮草稿": "", // dropped — was a draft on WP
};

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Match /zh/<localized-slug> or /zh/<localized-slug>/
  // Decode first so we compare against the actual Chinese characters.
  let decodedPath: string;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    decodedPath = pathname;
  }

  if (decodedPath.startsWith("/zh/") && decodedPath.length > 4) {
    const slug = decodedPath.slice(4).replace(/\/$/, "");
    const target = ZH_SLUG_MAP[slug];
    if (target !== undefined) {
      const dest = target === "" ? "/zh/" : `/zh/${target}/`;
      const url = req.nextUrl.clone();
      url.pathname = dest;
      return NextResponse.redirect(url, 308);
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
