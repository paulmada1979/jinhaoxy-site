import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import VietnamPackagingTariffGuide, {
  articleMeta as vietnamPackagingTariffGuideMeta,
} from "@/components/blog/VietnamPackagingTariffGuide";
import type { Metadata } from "next";

const SITE_URL = "https://jinhaoxy.com";

interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  readingMin: number;
  author: string;
  coverImage: string;
  coverAlt: string;
}

const ARTICLES: Record<string, { meta: ArticleMeta; component: React.ComponentType }> = {
  [vietnamPackagingTariffGuideMeta.slug]: {
    meta: vietnamPackagingTariffGuideMeta,
    component: VietnamPackagingTariffGuide,
  },
};

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const slug of Object.keys(ARTICLES)) {
      params.push({ locale, slug });
    }
  }
  return params;
}

function pathFor(locale: string, slug: string): string {
  const localePart = locale === "en" ? "" : `/${locale}`;
  return `${localePart}/blog/${slug}/`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = ARTICLES[slug];
  if (!article) {
    return { title: "Not Found", robots: { index: false, follow: false } };
  }
  const m = article.meta;
  const canonicalPath = pathFor(locale, slug);

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `${SITE_URL}${canonicalPath}`,
      languages: {
        en: `${SITE_URL}${pathFor("en", slug)}`,
        vi: `${SITE_URL}${pathFor("vi", slug)}`,
        zh: `${SITE_URL}${pathFor("zh", slug)}`,
        "x-default": `${SITE_URL}${pathFor("en", slug)}`,
      },
    },
    openGraph: {
      type: "article",
      url: `${SITE_URL}${canonicalPath}`,
      title: m.title,
      description: m.description,
      locale: locale === "en" ? "en_US" : locale === "vi" ? "vi_VN" : "zh_CN",
      siteName: "Jinhao Xinyuan Group",
      publishedTime: m.publishedAt,
      modifiedTime: m.updatedAt,
      authors: [m.author],
      images: [{ url: m.coverImage, width: 1600, height: 900, alt: m.coverAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: [m.coverImage],
    },
  };
}

export default async function BlogArticle({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) notFound();
  const Component = article.component;
  return <Component />;
}

export const BLOG_ARTICLE_REGISTRY = ARTICLES;
