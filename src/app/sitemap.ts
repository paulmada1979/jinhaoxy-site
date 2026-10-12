import type { MetadataRoute } from "next";
import manifest from "@/content/manifest.json";
import { getAllArticles } from "@/lib/blog";

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

function blogUrlFor(locale: string, slug: string): string {
  const localePart = locale === "en" ? "" : `/${locale}`;
  return `${SITE}${localePart}/blog/${slug}/`;
}

function blogIndexUrl(locale: string): string {
  const localePart = locale === "en" ? "" : `/${locale}`;
  return `${SITE}${localePart}/blog/`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const m = manifest as Manifest;
  const slugs = m.en.map((p) => p.slug);

  const entries: MetadataRoute.Sitemap = [];

  // Page slugs from manifest
  for (const slug of slugs) {
    for (const locale of LOCALES) {
      const languages: Record<string, string> = {
        en: urlFor("en", slug),
        vi: urlFor("vi", slug),
        zh: urlFor("zh", slug),
        "x-default": urlFor("en", slug),
      };

      entries.push({
        url: urlFor(locale, slug),
        // No lastModified: static pages have no per-page edit date, and
        // `new Date()` stamped every URL "modified now" on every build,
        // which teaches Google to ignore lastmod for the whole site.
        changeFrequency: slug === "home" ? "weekly" : "monthly",
        priority: slug === "home" ? 1.0 : slug === "about-us" || slug === "products" ? 0.9 : 0.7,
        alternates: { languages },
      });
    }
  }

  // Blog index per locale: lastmod = newest article update (a real date).
  const latestArticleUpdate = getAllArticles()
    .map((a) => new Date(a.meta.updatedAt))
    .reduce((a, b) => (a > b ? a : b), new Date(0));
  for (const locale of LOCALES) {
    entries.push({
      url: blogIndexUrl(locale),
      lastModified: latestArticleUpdate,
      changeFrequency: "weekly",
      priority: 0.6,
      alternates: {
        languages: {
          en: blogIndexUrl("en"),
          vi: blogIndexUrl("vi"),
          zh: blogIndexUrl("zh"),
          "x-default": blogIndexUrl("en"),
        },
      },
    });
  }

  // Blog articles — only emit URLs in locales the article actually has content
  // for, and only list those locales as hreflang alternates.
  for (const entry of getAllArticles()) {
    const article = entry.meta;
    const languages: Record<string, string> = {
      "x-default": blogUrlFor("en", article.slug),
    };
    for (const l of entry.availableLocales) {
      languages[l] = blogUrlFor(l, article.slug);
    }

    for (const locale of entry.availableLocales) {
      entries.push({
        url: blogUrlFor(locale, article.slug),
        lastModified: new Date(article.updatedAt),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: { languages },
      });
    }
  }

  return entries;
}
