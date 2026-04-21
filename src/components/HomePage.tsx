import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  Package,
  Gift,
  Layers,
  Tag,
  Leaf,
  Globe2,
  Award,
  Factory,
  ArrowRight,
  ShieldCheck,
  Truck,
  Recycle,
} from "lucide-react";
import type { PageData } from "./PageRenderer";
import FAQ from "./FAQ";
import FactoryMap from "./FactoryMapLoader";

export default function HomePage({ page }: { page: PageData }) {
  const t = useTranslations();
  const locale = useLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const PRODUCT_CATEGORIES = [
    { href: "/cardboard-trays-inserts", icon: Package, title: t("home.catCorrugatedTitle"), desc: t("home.catCorrugatedDesc") },
    { href: "/retail-packing", icon: Gift, title: t("home.catGiftTitle"), desc: t("home.catGiftDesc") },
    { href: "/folding-cartons", icon: Layers, title: t("home.catFoldingTitle"), desc: t("home.catFoldingDesc") },
    { href: "/stickers-labels", icon: Tag, title: t("home.catLabelsTitle"), desc: t("home.catLabelsDesc") },
    { href: "/shelf-ready-packaging", icon: Leaf, title: t("home.catEcoTitle"), desc: t("home.catEcoDesc") },
  ];

  const STATS = [
    { icon: Factory, value: "4+", label: t("home.statsFactories") },
    { icon: Award, value: "FSC® + ISO", label: t("home.statsCertified") },
    { icon: Globe2, value: "25K+", label: t("home.statsBrands") },
  ];

  // Find hero content from extracted blocks
  const heroBadge = page.blocks.find((b) => b.type === "heading" && b.level === 6)?.text || t("home.heroBadge");
  const heroTitle = page.blocks.find((b) => b.type === "heading" && b.level === 1)?.text || page.title;
  const heroSubtitle = page.blocks.find((b) => b.type === "text")?.text || "";

  const textBlocks = page.blocks.filter((b) => b.type === "text").slice(1);
  const heroDesc = textBlocks[0]?.text;

  // Find "Who We Are" section
  const sections = [];
  let current: { heading?: string; texts: string[] } | null = null;
  for (const block of page.blocks) {
    if (block.type === "heading" && block.level === 2 && block.text) {
      if (current) sections.push(current);
      current = { heading: block.text, texts: [] };
    } else if (block.type === "text" && block.text && current) {
      current.texts.push(block.text);
    }
  }
  if (current) sections.push(current);

  const whoWeAre = sections.find((s) => s.heading?.toLowerCase().includes("who we are"));
  const globalNetwork = sections.find((s) => s.heading?.toLowerCase().includes("global network"));

  return (
    <div>
      {/* Hero with banner background */}
      <section className="relative min-h-[600px] flex items-center bg-gray-900 overflow-hidden">
        <Image
          src="/media/Banner-1.png"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-20 w-full">
          <div className="max-w-2xl text-white">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-orange-400 mb-4">
              {heroBadge}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {heroTitle}
            </h1>
            {heroSubtitle && (
              <p className="text-lg md:text-xl text-gray-200 mb-4 font-light">
                {heroSubtitle}
              </p>
            )}
            {heroDesc && (
              <p className="text-base text-gray-300 mb-8 max-w-xl">
                {heroDesc}
              </p>
            )}
            <div className="flex flex-wrap gap-3">
              <Link
                href={`${prefix}/about-us`}
                className="px-6 py-3 bg-white/10 backdrop-blur border border-white/30 hover:bg-white/20 text-white rounded-md text-sm font-semibold transition-colors"
              >
                {t("home.heroCtaDiscover")}
              </Link>
              <Link
                href={`${prefix}/conctact-us`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-semibold transition-colors"
              >
                {t("home.heroCtaQuote")}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#0d2340] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400">
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-gray-300 uppercase tracking-wider">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who We Are */}
      {whoWeAre && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">{t("home.aboutBadge")}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
                {whoWeAre.heading}
              </h2>
              {whoWeAre.texts.map((text, i) => (
                <p key={i} className="text-gray-600 text-base leading-relaxed mb-4">
                  {text}
                </p>
              ))}
              <Link
                href={`${prefix}/about-us`}
                className="inline-flex items-center gap-2 mt-4 text-orange-600 hover:text-orange-700 text-sm font-semibold"
              >
                {t("home.aboutLearnMore")}
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/media/Packing-banner.webp"
                alt="Packaging production"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>
      )}

      {/* Product categories grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">{t("home.productsBadge")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {t("home.productsTitle")}
            </h2>
            <p className="text-gray-600 mt-4">
              {t("home.productsDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PRODUCT_CATEGORIES.map((cat) => (
              <Link
                key={cat.href}
                href={`${prefix}${cat.href}`}
                className="group bg-white rounded-xl border border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all p-6 flex flex-col"
              >
                <div className="w-12 h-12 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <cat.icon size={22} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{cat.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed flex-1">{cat.desc}</p>
                <span className="inline-flex items-center gap-1 text-xs text-orange-600 font-semibold mt-4 group-hover:gap-2 transition-all">
                  {t("home.productsExplore")}
                  <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Global network with map */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">{t("home.networkBadge")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {globalNetwork?.heading || "Our Global Network"}
            </h2>
            <p className="text-gray-600 mt-4">
              {t("home.networkDesc")}
            </p>
          </div>
          <FactoryMap height="520px" />
        </div>
      </section>

      {/* Trusted by global brands */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">{t("home.trustedBadge")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
              {t("home.trustedTitle")}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {t("home.trustedDesc")}
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {["FSC®", "ISO 9001", "SMETA-4P", "GMI", "ISTA", "OEM & ODM"].map((cert) => (
                <span
                  key={cert}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-700 shadow-sm"
                >
                  <ShieldCheck size={12} className="text-orange-500" />
                  {cert}
                </span>
              ))}
            </div>

            {/* Sectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto">
              {[
                { label: "Retail", icon: Package },
                { label: "Electronics", icon: ShieldCheck },
                { label: "Food & Beverage", icon: Leaf },
                { label: "Cosmetics", icon: Gift },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-gray-100">
                  <s.icon size={20} className="text-orange-500" />
                  <span className="text-xs font-semibold text-gray-700">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certified quality & sustainability */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">{t("home.qualityBadge")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
              {t("home.qualityTitle")}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              {t("home.qualityDesc")}
            </p>

            <div className="space-y-3 mb-8">
              {[
                { icon: Recycle, label: "FSC®-certified materials, recyclable and responsibly sourced" },
                { icon: Leaf, label: "Eco-friendly inks and water-based coatings" },
                { icon: ShieldCheck, label: "Compliance with EU PPWR and North American EPR regulations" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <item.icon size={16} />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed pt-1.5">{item.label}</p>
                </div>
              ))}
            </div>

            <Link
              href={`${prefix}/certifications`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-semibold transition-colors"
            >
              {t("home.qualityCta")}
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/media/opening-the-paper-eco-box-man-in-casual-clothes-i-2025-03-18-22-06-13-utc.webp"
              alt="Certified sustainable packaging"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Partner with us */}
      <section className="py-20 bg-gradient-to-br from-[#0d2340] to-[#1a3659] text-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
          <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest">{t("home.partnerBadge")}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-5">
            {t("home.partnerTitle")}
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            {t("home.partnerDesc")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
            <div className="flex items-center gap-2 justify-center text-sm text-gray-200">
              <Truck size={16} className="text-orange-400" />
              Fast turnaround
            </div>
            <div className="flex items-center gap-2 justify-center text-sm text-gray-200">
              <Package size={16} className="text-orange-400" />
              Samples & mockups
            </div>
            <div className="flex items-center gap-2 justify-center text-sm text-gray-200">
              <Globe2 size={16} className="text-orange-400" />
              Global export
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={`${prefix}/factories`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-semibold transition-colors"
            >
              <Factory size={14} />
              {t("home.partnerCta1")}
            </Link>
            <Link
              href={`${prefix}/conctact-us`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur border border-white/30 hover:bg-white/20 text-white rounded-md text-sm font-semibold transition-colors"
            >
              {t("home.partnerCta2")}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {page.faqs && page.faqs.length > 0 && <FAQ items={page.faqs} />}

      {/* CTA band */}
      <section className="py-16 bg-gradient-to-r from-[#0d2340] to-[#1a3659] text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {t("home.ctaTitle")}
            </h2>
            <p className="text-gray-300">
              {t("home.ctaDesc")}
            </p>
          </div>
          <Link
            href={`${prefix}/conctact-us`}
            className="inline-flex items-center gap-2 px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-semibold shrink-0 transition-colors"
          >
            {t("home.heroCtaQuote")}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
