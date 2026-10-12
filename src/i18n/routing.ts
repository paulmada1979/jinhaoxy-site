import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "vi", "zh"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  // Don't auto-redirect based on browser Accept-Language.
  // Always land on English unless user explicitly navigates to /vi or /zh.
  localeDetection: false,
  // Don't emit the HTTP `Link: ...hreflang` header: it lists /vi/ and /zh/ for every
  // page, including EN-only blog posts that have no translation (-> 404 alternates).
  // Correct per-page hreflang is already emitted in the HTML head and the sitemap.
  alternateLinks: false,
});
