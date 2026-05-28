// Blog article schema for JSON-driven posts.
//
// Cornerstone-style hand-designed posts stay as TSX components; everything
// else from post #2 onwards is authored as JSON in src/content/blog/{locale}/<slug>.json
// and rendered by BlogArticleRenderer. The translator script walks the same
// schema, so adding a new locale = run scripts/azure-translate.mjs.

export type BlogBlock =
  | { type: "heading"; level: 2 | 3; text: string; id?: string }
  | { type: "text"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | {
      type: "callout";
      variant: "tip" | "warning" | "note" | "stat";
      title?: string;
      body: string;
    }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
      caption?: string;
    }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "cta"; href: string; title: string; body: string };

export interface BlogFAQ {
  q: string;
  a: string;
}

export interface BlogRelated {
  // Internal slug — the URL is built per-locale at render time.
  slug: string;
  label: string;
  // If "page", links to /<slug>/. If "blog", links to /blog/<slug>/.
  kind?: "page" | "blog";
}

export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  // ISO 8601 date strings (YYYY-MM-DD).
  publishedAt: string;
  updatedAt: string;
  readingMin: number;
  author: string;
  // Eyebrow label shown above the title (e.g., "BUYER'S GUIDE").
  category?: string;
  // Tariff cluster, product cluster, etc. — for future hub pages.
  cluster?: string;
  coverImage: string;
  coverAlt: string;
  // When true, the article is excluded from the index, sitemap, and route
  // generation — it sits dormant in the content folder until promoted by
  // flipping this to false (or removing it). Use this to queue up future
  // posts that aren't ready to publish yet.
  draft?: boolean;
  // Optional SEO overrides applied ONLY to the HTML <title> and
  // <meta name="description"> tags. The verbose `title` / `description`
  // above continue to drive the visible <h1>, OpenGraph, and Twitter
  // social-share metadata. Use this when the natural article title is too
  // long for Google's ~60-char SERP truncation (or description >155 chars).
  seo?: {
    title?: string;
    description?: string;
  };
  blocks: BlogBlock[];
  faqs?: BlogFAQ[];
  related?: BlogRelated[];
}
