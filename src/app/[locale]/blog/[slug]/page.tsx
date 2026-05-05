import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllArticles,
  getArticle,
  getArticleData,
  type Locale,
} from "@/lib/blog";
import BlogArticleRenderer from "@/components/blog/BlogArticleRenderer";

const SITE_URL = "https://jinhaoxy.com";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const entry of getAllArticles()) {
    for (const locale of entry.availableLocales) {
      params.push({ locale, slug: entry.meta.slug });
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
  const entry = getArticle(slug);
  if (!entry || !entry.availableLocales.includes(locale as Locale)) {
    return { title: "Not Found", robots: { index: false, follow: false } };
  }

  // For JSON articles, prefer the per-locale title/description (translated)
  // over the EN meta.
  const localeData =
    entry.kind === "json" ? getArticleData(entry, locale as Locale) : null;
  const title = localeData?.title ?? entry.meta.title;
  const description = localeData?.description ?? entry.meta.description;
  const updatedAt = localeData?.updatedAt ?? entry.meta.updatedAt;
  const publishedAt = localeData?.publishedAt ?? entry.meta.publishedAt;
  const coverImage = entry.meta.coverImage;
  const coverAlt = localeData?.coverAlt ?? entry.meta.coverAlt;

  const canonicalPath = pathFor(locale, slug);

  // Only emit hreflang alternates for locales the article is actually
  // available in. This keeps Google from indexing English fallback content
  // under non-English URLs.
  const languages: Record<string, string> = {
    "x-default": `${SITE_URL}${pathFor("en", slug)}`,
  };
  for (const l of entry.availableLocales) {
    languages[l] = `${SITE_URL}${pathFor(l, slug)}`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}${canonicalPath}`,
      languages,
    },
    openGraph: {
      type: "article",
      url: `${SITE_URL}${canonicalPath}`,
      title,
      description,
      locale: locale === "en" ? "en_US" : locale === "vi" ? "vi_VN" : "zh_CN",
      siteName: "Jinhao Xinyuan Group",
      publishedTime: publishedAt,
      modifiedTime: updatedAt,
      authors: [entry.meta.author],
      images: [{ url: coverImage, width: 1600, height: 900, alt: coverAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [coverImage],
    },
  };
}

export default async function BlogArticle({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const entry = getArticle(slug);
  if (!entry || !entry.availableLocales.includes(locale as Locale)) {
    notFound();
  }

  if (entry.kind === "tsx") {
    const Component = entry.Component;
    return <Component />;
  }

  const data = getArticleData(entry, locale as Locale);
  if (!data) notFound();
  return <BlogArticleRenderer article={data} locale={locale as Locale} />;
}
