import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "vi", "zh"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  // Don't auto-redirect based on browser Accept-Language.
  // Always land on English unless user explicitly navigates to /vi or /zh.
  localeDetection: false,
});
