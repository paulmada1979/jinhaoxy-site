// Build-time blog article registry.
//
// Two kinds of articles coexist:
// 1. TSX cornerstone (hand-designed, English-only) — registered manually below.
// 2. JSON articles in src/content/blog/{locale}/<slug>.json — auto-discovered
//    by globbing the EN folder. An article is considered available in a locale
//    iff <slug>.json exists in that locale's folder.
//
// All file IO happens at build/SSG time. Do not call these from client
// components.

import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";
import VietnamPackagingTariffGuide, {
  articleMeta as vietnamPackagingTariffGuideMeta,
} from "@/components/blog/VietnamPackagingTariffGuide";
import type { BlogArticle } from "@/types/blog";

export type Locale = "en" | "vi" | "zh";
export const LOCALES: readonly Locale[] = ["en", "vi", "zh"];

export interface ArticleMetaCommon {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  readingMin: number;
  author: string;
  coverImage: string;
  coverAlt: string;
  category?: string;
}

export type ArticleEntry =
  | {
      kind: "tsx";
      meta: ArticleMetaCommon;
      // Locales the TSX article is available in — usually just ["en"].
      availableLocales: readonly Locale[];
      Component: ComponentType;
    }
  | {
      kind: "json";
      meta: ArticleMetaCommon;
      availableLocales: readonly Locale[];
      // Per-locale article data, loaded eagerly at build.
      data: Partial<Record<Locale, BlogArticle>>;
    };

const BLOG_CONTENT_DIR = path.join(process.cwd(), "src", "content", "blog");

// --- TSX cornerstone registry ---------------------------------------------

const TSX_ARTICLES: ArticleEntry[] = [
  {
    kind: "tsx",
    meta: vietnamPackagingTariffGuideMeta,
    availableLocales: ["en"] as const,
    Component: VietnamPackagingTariffGuide,
  },
];

// --- JSON article discovery -----------------------------------------------

function readJsonArticleSafe(locale: Locale, slug: string): BlogArticle | null {
  const file = path.join(BLOG_CONTENT_DIR, locale, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  try {
    const raw = fs.readFileSync(file, "utf-8");
    return JSON.parse(raw) as BlogArticle;
  } catch {
    return null;
  }
}

function loadJsonArticles(): ArticleEntry[] {
  const enDir = path.join(BLOG_CONTENT_DIR, "en");
  if (!fs.existsSync(enDir)) return [];

  const slugs = fs
    .readdirSync(enDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));

  const out: ArticleEntry[] = [];
  for (const slug of slugs) {
    const data: Partial<Record<Locale, BlogArticle>> = {};
    const availableLocales: Locale[] = [];
    for (const locale of LOCALES) {
      const article = readJsonArticleSafe(locale, slug);
      if (article) {
        data[locale] = article;
        availableLocales.push(locale);
      }
    }
    if (!data.en) continue; // EN is the source of truth; skip if missing.
    const en = data.en;
    out.push({
      kind: "json",
      meta: {
        slug: en.slug,
        title: en.title,
        description: en.description,
        publishedAt: en.publishedAt,
        updatedAt: en.updatedAt,
        readingMin: en.readingMin,
        author: en.author,
        coverImage: en.coverImage,
        coverAlt: en.coverAlt,
        category: en.category,
      },
      availableLocales,
      data,
    });
  }
  return out;
}

// --- Public API ------------------------------------------------------------

const ALL_ARTICLES: ArticleEntry[] = [...TSX_ARTICLES, ...loadJsonArticles()];

// Sorted newest-first by publishedAt for index/listing pages.
function byDateDesc(a: ArticleEntry, b: ArticleEntry): number {
  return b.meta.publishedAt.localeCompare(a.meta.publishedAt);
}

export function getAllArticles(): ArticleEntry[] {
  return [...ALL_ARTICLES].sort(byDateDesc);
}

export function getArticlesForLocale(locale: Locale): ArticleEntry[] {
  return getAllArticles().filter((a) => a.availableLocales.includes(locale));
}

export function getArticle(slug: string): ArticleEntry | undefined {
  return ALL_ARTICLES.find((a) => a.meta.slug === slug);
}

export function getArticleData(
  entry: ArticleEntry,
  locale: Locale,
): BlogArticle | undefined {
  if (entry.kind !== "json") return undefined;
  return entry.data[locale];
}
