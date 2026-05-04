import type { MetadataRoute } from "next";
import manifest from "@/content/manifest.json";

const SITE = "https://jinhaoxy.com";
const LOCALES = ["en", "vi", "zh"] as const;

interface ManifestEntry {
  slug: string;
  title: string;
  blocks: number;
}
interface Manifest {
  en: ManifestEntry[];
  vi: ManifestEntry[];
  zh: ManifestEntry[];
}

function urlFor(locale: string, slug: string): string {
  const localePart = locale === "en" ? "" : `/${locale}`;
  if (slug === "home") return `${SITE}${localePart}/`;
  return `${SITE}${localePart}/${slug}/`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const m = manifest as Manifest;
  const slugs = m.en.map((p) => p.slug);

  const entries: MetadataRoute.Sitemap = [];

  for (const slug of slugs) {
    for (const locale of LOCALES) {
      // Hreflang alternates: same slug across all three locales.
      const languages: Record<string, string> = {
        en: urlFor("en", slug),
        vi: urlFor("vi", slug),
        zh: urlFor("zh", slug),
        "x-default": urlFor("en", slug),
      };

      entries.push({
        url: urlFor(locale, slug),
        lastModified: new Date(),
        changeFrequency: slug === "home" ? "weekly" : "monthly",
        priority: slug === "home" ? 1.0 : slug === "about-us" || slug === "products" ? 0.9 : 0.7,
        alternates: { languages },
      });
    }
  }

  return entries;
}
