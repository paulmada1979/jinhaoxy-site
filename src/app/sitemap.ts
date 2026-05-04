import type { MetadataRoute } from "next";
import manifest from "@/content/manifest.json";
import { articleMeta as vietnamPackagingTariffGuideMeta } from "@/components/blog/VietnamPackagingTariffGuide";

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

const BLOG_ARTICLES = [vietnamPackagingTariffGuideMeta];

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
        lastModified: new Date(),
        changeFrequency: slug === "home" ? "weekly" : "monthly",
        priority: slug === "home" ? 1.0 : slug === "about-us" || slug === "products" ? 0.9 : 0.7,
        alternates: { languages },
      });
    }
  }

  // Blog index per locale
  for (const locale of LOCALES) {
    entries.push({
      url: blogIndexUrl(locale),
      lastModified: new Date(),
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

  // Blog articles
  for (const article of BLOG_ARTICLES) {
    for (const locale of LOCALES) {
      const languages: Record<string, string> = {
        en: blogUrlFor("en", article.slug),
        vi: blogUrlFor("vi", article.slug),
        zh: blogUrlFor("zh", article.slug),
        "x-default": blogUrlFor("en", article.slug),
      };
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
