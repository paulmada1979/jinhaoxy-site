import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Info,
  AlertTriangle,
  Lightbulb,
  TrendingDown,
} from "lucide-react";
import type { BlogArticle, BlogBlock } from "@/types/blog";
import type { Locale } from "@/lib/blog";

const SITE_URL = "https://jinhaoxy.com";

interface Props {
  article: BlogArticle;
  locale: Locale;
}

function formatDate(iso: string, locale: Locale): string {
  const intlLocale =
    locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : "en-US";
  const d = new Date(iso);
  return d.toLocaleDateString(intlLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function localePrefix(locale: Locale): string {
  return locale === "en" ? "" : `/${locale}`;
}

function calloutIcon(variant: "tip" | "warning" | "note" | "stat") {
  switch (variant) {
    case "tip":
      return Lightbulb;
    case "warning":
      return AlertTriangle;
    case "stat":
      return TrendingDown;
    case "note":
    default:
      return Info;
  }
}

function calloutColors(variant: "tip" | "warning" | "note" | "stat") {
  switch (variant) {
    case "warning":
      return {
        wrap: "bg-amber-50 border-amber-200",
        icon: "bg-amber-500",
      };
    case "tip":
      return {
        wrap: "bg-emerald-50 border-emerald-200",
        icon: "bg-emerald-500",
      };
    case "stat":
      return {
        wrap: "bg-orange-50 border-orange-200",
        icon: "bg-orange-500",
      };
    case "note":
    default:
      return {
        wrap: "bg-slate-50 border-slate-200",
        icon: "bg-slate-600",
      };
  }
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "heading": {
      const id =
        block.id ??
        block.text
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .slice(0, 80);
      if (block.level === 3) {
        return (
          <h3
            id={id}
            className="text-xl md:text-2xl font-bold text-gray-900 mt-10 mb-4 leading-tight scroll-mt-24"
          >
            {block.text}
          </h3>
        );
      }
      return (
        <h2
          id={id}
          className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-5 leading-tight scroll-mt-24"
        >
          {block.text}
        </h2>
      );
    }
    case "text":
      return (
        <p className="text-gray-700 leading-relaxed mb-5">{block.text}</p>
      );
    case "list": {
      if (block.ordered) {
        return (
          <ol className="list-decimal pl-6 space-y-2 mb-6 text-gray-700 leading-relaxed marker:text-orange-500 marker:font-semibold">
            {block.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="space-y-2 mb-6 text-gray-700 leading-relaxed">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span
                className="mt-2 w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0"
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    }
    case "image":
      return (
        <figure className="my-8">
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-100">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {block.caption && (
            <figcaption className="text-xs text-gray-500 mt-3 text-center">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "callout": {
      const Icon = calloutIcon(block.variant);
      const colors = calloutColors(block.variant);
      return (
        <aside
          className={`my-8 rounded-xl border ${colors.wrap} p-5 md:p-6`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`w-9 h-9 rounded-lg ${colors.icon} text-white flex items-center justify-center shrink-0`}
            >
              <Icon size={18} />
            </div>
            <div className="min-w-0">
              {block.title && (
                <h4 className="font-bold text-gray-900 mb-1.5">
                  {block.title}
                </h4>
              )}
              <p className="text-gray-700 leading-relaxed text-[15px]">
                {block.body}
              </p>
            </div>
          </div>
        </aside>
      );
    }
    case "table":
      return (
        <figure className="my-8 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-900 text-white">
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className="text-left font-semibold px-4 py-3 border-r border-gray-700 last:border-r-0"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr
                  key={ri}
                  className="border-b border-gray-200 last:border-b-0 even:bg-gray-50"
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="px-4 py-3 text-gray-700 align-top"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.caption && (
            <figcaption className="text-xs text-gray-500 mt-3">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "quote":
      return (
        <blockquote className="my-8 border-l-4 border-orange-500 pl-5 md:pl-6 py-2">
          <p className="text-lg md:text-xl text-gray-800 italic leading-relaxed mb-2">
            “{block.text}”
          </p>
          {block.attribution && (
            <footer className="text-sm text-gray-500 not-italic">
              — {block.attribution}
            </footer>
          )}
        </blockquote>
      );
    case "cta":
      return (
        <Link
          href={block.href}
          className="my-8 group flex items-center gap-4 rounded-xl border border-gray-200 hover:border-orange-300 hover:bg-orange-50/40 transition-colors p-5 md:p-6"
        >
          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
              {block.title}
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {block.body}
            </p>
          </div>
          <ArrowRight
            size={20}
            className="text-orange-500 shrink-0 group-hover:translate-x-1 transition-transform"
          />
        </Link>
      );
  }
}

export default function BlogArticleRenderer({ article, locale }: Props) {
  const prefix = localePrefix(locale);
  const date = formatDate(article.publishedAt, locale);
  const eyebrow =
    article.category ??
    (locale === "vi"
      ? "Hướng dẫn người mua"
      : locale === "zh"
        ? "采购指南"
        : "Buyer's guide");
  const blogLinkLabel =
    locale === "vi" ? "← Blog" : locale === "zh" ? "← 博客" : "← Blog";
  const readSuffix =
    locale === "vi" ? "phút đọc" : locale === "zh" ? "分钟阅读" : "min read";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: [`${SITE_URL}${article.coverImage}`],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Organization",
      name: "Jinhao Xinyuan Group",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Jinhao Xinyuan Group",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.webp`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${prefix}/blog/${article.slug}/`,
    },
  };

  const faqSchema =
    article.faqs && article.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Hero */}
      <section className="relative min-h-[440px] flex items-end bg-gray-900 overflow-hidden">
        <Image
          src={article.coverImage}
          alt={article.coverAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d2340]/95 via-[#0d2340]/60 to-[#0d2340]/30" />

        <div className="relative max-w-4xl mx-auto px-4 lg:px-6 py-14 md:py-16 w-full text-white">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <Link
              href={`${prefix}/blog`}
              className="text-xs font-semibold tracking-widest uppercase text-orange-400 hover:text-orange-300 transition-colors"
            >
              {blogLinkLabel}
            </Link>
            <span className="text-orange-400">·</span>
            <span className="text-xs font-semibold tracking-widest uppercase text-orange-400">
              {eyebrow}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight tracking-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-300">
            <span>{article.author}</span>
            <span className="text-gray-500">·</span>
            <time dateTime={article.publishedAt}>{date}</time>
            <span className="text-gray-500">·</span>
            <span>
              {article.readingMin} {readSuffix}
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 lg:px-6">
          <p className="text-lg text-gray-700 leading-relaxed mb-8 font-medium">
            {article.description}
          </p>
          {article.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
      </section>

      {/* FAQs */}
      {article.faqs && article.faqs.length > 0 && (
        <section className="py-12 md:py-16 bg-gray-50 border-t border-gray-200">
          <div className="max-w-3xl mx-auto px-4 lg:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              {locale === "vi"
                ? "Câu hỏi thường gặp"
                : locale === "zh"
                  ? "常见问题"
                  : "Frequently asked questions"}
            </h2>
            <div className="space-y-6">
              {article.faqs.map((f, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-200 p-5 md:p-6"
                >
                  <h3 className="font-bold text-gray-900 mb-2 text-base md:text-lg">
                    {f.q}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {article.related && article.related.length > 0 && (
        <section className="py-12 md:py-16 bg-white border-t border-gray-200">
          <div className="max-w-3xl mx-auto px-4 lg:px-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              {locale === "vi"
                ? "Đọc tiếp"
                : locale === "zh"
                  ? "延伸阅读"
                  : "Keep reading"}
            </h2>
            <ul className="space-y-3">
              {article.related.map((r, i) => {
                const href =
                  r.kind === "page"
                    ? `${prefix}/${r.slug}/`
                    : `${prefix}/blog/${r.slug}/`;
                return (
                  <li key={i}>
                    <Link
                      href={href}
                      className="group flex items-center justify-between gap-4 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50/40 transition-colors p-4"
                    >
                      <span className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                        {r.label}
                      </span>
                      <ArrowRight
                        size={16}
                        className="text-orange-500 shrink-0 group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
}
