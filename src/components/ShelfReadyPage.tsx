import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Check,
  Scissors,
  Eye,
  Package,
  Leaf,
  Truck,
  Store,
  Utensils,
  ShoppingCart,
  Cpu,
  Warehouse,
  Send,
  ShieldCheck,
  Factory,
  Gauge,
  TreePine,
  Droplets,
  Recycle,
} from "lucide-react";
import HeroBackgroundVideo from "./HeroBackgroundVideo";

// No dedicated video in WP postmeta for this page — fall back to the image only
const HERO_VIDEO_ID: string | null = null;

export default function ShelfReadyPage() {
  const t = useTranslations();
  const locale = useLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const features = [
    t("shelfReady.feat1"),
    t("shelfReady.feat2"),
    t("shelfReady.feat3"),
    t("shelfReady.feat4"),
    t("shelfReady.feat5"),
  ];

  const benefits = [
    { icon: Scissors, title: t("shelfReady.benefit1Title"), desc: t("shelfReady.benefit1Desc") },
    { icon: Eye, title: t("shelfReady.benefit2Title"), desc: t("shelfReady.benefit2Desc") },
    { icon: Package, title: t("shelfReady.benefit3Title"), desc: t("shelfReady.benefit3Desc") },
    { icon: Leaf, title: t("shelfReady.benefit4Title"), desc: t("shelfReady.benefit4Desc") },
    { icon: Truck, title: t("shelfReady.benefit5Title"), desc: t("shelfReady.benefit5Desc") },
    { icon: ShieldCheck, title: t("shelfReady.benefit6Title"), desc: t("shelfReady.benefit6Desc") },
  ];

  const channels = [
    {
      icon: Utensils,
      title: t("shelfReady.type1Title"),
      desc: t("shelfReady.type1Desc"),
      tint: "bg-green-100 text-green-700",
    },
    {
      icon: ShoppingCart,
      title: t("shelfReady.type2Title"),
      desc: t("shelfReady.type2Desc"),
      tint: "bg-orange-100 text-orange-700",
    },
    {
      icon: Cpu,
      title: t("shelfReady.type3Title"),
      desc: t("shelfReady.type3Desc"),
      tint: "bg-blue-100 text-blue-700",
    },
    {
      icon: Warehouse,
      title: t("shelfReady.type4Title"),
      desc: t("shelfReady.type4Desc"),
      tint: "bg-purple-100 text-purple-700",
    },
  ];

  const heavyDuty = [
    t("shelfReady.heavy1"),
    t("shelfReady.heavy2"),
    t("shelfReady.heavy3"),
    t("shelfReady.heavy4"),
  ];

  const performance = [
    { icon: Gauge, title: t("shelfReady.perf1Title"), desc: t("shelfReady.perf1Desc") },
    { icon: TreePine, title: t("shelfReady.perf2Title"), desc: t("shelfReady.perf2Desc") },
    { icon: Droplets, title: t("shelfReady.perf3Title"), desc: t("shelfReady.perf3Desc") },
    { icon: Recycle, title: t("shelfReady.perf4Title"), desc: t("shelfReady.perf4Desc") },
  ];

  const capabilities = [
    t("shelfReady.cap1"),
    t("shelfReady.cap2"),
    t("shelfReady.cap3"),
    t("shelfReady.cap4"),
    t("shelfReady.cap5"),
    t("shelfReady.cap6"),
    t("shelfReady.cap7"),
    t("shelfReady.cap8"),
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[560px] flex items-center bg-gray-900 overflow-hidden">
        <HeroBackgroundVideo
          videoId={HERO_VIDEO_ID}
          fallbackImage="/media/bearded-senior-man-pushing-shopping-trolley-in-sup-2024-11-02-23-42-01-utc.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2340]/90 via-[#0d2340]/55 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-20 w-full">
          <div className="max-w-3xl text-white">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-orange-400 mb-4">
              {t("shelfReady.badge")}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {t("shelfReady.heroTitle")}
            </h1>
            <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-4">
              {t("shelfReady.heroDesc")}
            </p>
            <p className="text-sm md:text-base text-orange-200 leading-relaxed mb-8">
              {t("shelfReady.heroLede")}
            </p>
            <Link
              href={`${prefix}/conctact-us`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-semibold transition-colors"
            >
              Request a Quote
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="py-10 bg-orange-50 border-y border-orange-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <h3 className="text-base font-semibold text-gray-900">{t("shelfReady.featuresTitle")}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-2 bg-white rounded-lg p-3 border border-orange-100">
                <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={12} strokeWidth={3} />
                </div>
                <p className="text-xs text-gray-700 leading-snug">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
          <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
            {t("shelfReady.introBadge")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
            {t("shelfReady.introTitle")}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            {t("shelfReady.introBody")}
          </p>
        </div>
      </section>

      {/* 6 benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                  <b.icon size={20} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{b.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Retail channels */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("shelfReady.typesBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("shelfReady.typesTitle")}
            </h2>
            <p className="text-gray-600">{t("shelfReady.typesDesc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {channels.map((c) => (
              <div
                key={c.title}
                className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all flex gap-4"
              >
                <div className={`w-12 h-12 rounded-xl ${c.tint} flex items-center justify-center shrink-0`}>
                  <c.icon size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{c.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Heavy-duty corrugated */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/media/01_ShelfBox_v1.4-copy.jpg"
              alt="Shelf ready box — product display"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
              <Store size={20} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("shelfReady.heavyTitle")}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t("shelfReady.heavyDesc")}
            </p>
            <ul className="space-y-2.5">
              {heavyDuty.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-orange-500 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  </div>
                  <span className="text-sm text-gray-700 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Performance & Sustainability */}
      <section className="py-20 bg-[#0d2340] text-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("shelfReady.perfTitle")}
            </h2>
            <p className="text-gray-300 leading-relaxed">{t("shelfReady.perfDesc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {performance.map((p) => (
              <div
                key={p.title}
                className="p-5 rounded-xl bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-orange-500 text-white flex items-center justify-center mb-3">
                  <p.icon size={18} />
                </div>
                <h3 className="font-bold text-white mb-1.5 text-sm">{p.title}</h3>
                <p className="text-xs text-gray-300 leading-snug">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4">
              <Factory size={20} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("shelfReady.capTitle")}
            </h2>
            <p className="text-gray-600">{t("shelfReady.capDesc")}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {capabilities.map((cap, i) => (
              <div key={i} className="p-4 rounded-lg bg-gray-50 border border-gray-100 flex items-start gap-2">
                <ShieldCheck size={16} className="text-orange-500 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 leading-snug">{cap}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("shelfReady.formTitle")}
            </h2>
            <p className="text-gray-600">{t("shelfReady.formDesc")}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-100">
            <form className="space-y-4" action="mailto:info@jinhaoxy.com" method="post" encType="text/plain">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Brand / Company</label>
                  <input
                    type="text"
                    name="company"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Retailer / Channel</label>
                  <input
                    type="text"
                    name="retailer"
                    placeholder="e.g. Carrefour, Tesco, Amazon"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Retail Channel Type</label>
                <select
                  name="channel_type"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option>Food & Beverage</option>
                  <option>E-Commerce Fulfillment</option>
                  <option>Electronics & Home Goods</option>
                  <option>Retail Distribution</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">SKU count, volumes, and retailer specs *</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="SKUs per SRP, products per SKU, monthly volume, retailer compliance requirements, brand guidelines, print specs..."
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-semibold transition-colors"
              >
                <Send size={14} />
                Submit
              </button>
              <p className="text-xs text-gray-500 text-center">
                We'll respond within 1 business day.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
