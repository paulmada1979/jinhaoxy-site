import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { articleMeta as vietnamPackagingTariffGuideMeta } from "@/components/blog/VietnamPackagingTariffGuide";

const SITE_URL = "https://jinhaoxy.com";
const SITE_NAME = "Jinhao Xinyuan Group";

const ARTICLES = [vietnamPackagingTariffGuideMeta];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localePath = locale === "en" ? "/blog/" : `/${locale}/blog/`;

  const description =
    "Buyer's guides, supplier intelligence, and packaging industry briefs from Jinhao Xinyuan Group.";

  return {
    title: "Blog",
    description,
    alternates: {
      canonical: `${SITE_URL}${localePath}`,
      languages: {
        en: `${SITE_URL}/blog/`,
        vi: `${SITE_URL}/vi/blog/`,
        zh: `${SITE_URL}/zh/blog/`,
        "x-default": `${SITE_URL}/blog/`,
      },
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}${localePath}`,
      title: `Blog | ${SITE_NAME}`,
      description,
      locale: locale === "en" ? "en_US" : locale === "vi" ? "vi_VN" : "zh_CN",
      siteName: SITE_NAME,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: SITE_NAME }],
    },
  };
}

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0d2340] to-[#1a3659] text-white">
        <div className="max-w-5xl mx-auto px-4 lg:px-6 py-20">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-orange-400 mb-4">
            Insights
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Packaging buyer&apos;s guides &amp; supplier intelligence
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl leading-relaxed">
            Tariff math, certification standards, sourcing playbooks, and
            industry briefs for procurement teams making real packaging
            decisions.
          </p>
        </div>
      </section>

      {/* Article list */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ARTICLES.map((article) => {
              const date = new Date(article.publishedAt).toLocaleDateString(
                "en-US",
                { year: "numeric", month: "long", day: "numeric" },
              );
              return (
                <Link
                  key={article.slug}
                  href={`${prefix}/blog/${article.slug}/`}
                  className="group block rounded-2xl overflow-hidden border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all"
                >
                  <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
                    <Image
                      src={article.coverImage}
                      alt={article.coverAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <time dateTime={article.publishedAt}>{date}</time>
                      <span>·</span>
                      <span>{article.readingMin} min read</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-orange-600 transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {article.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-orange-600 group-hover:gap-2 transition-all">
                      Read article
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
