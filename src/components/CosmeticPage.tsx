import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Check,
  Sparkles,
  ShieldCheck,
  Gift,
  Droplet,
  Palette,
  Heart,
  Package,
  Tag,
  FileText,
  Box,
  Store,
  ShoppingBag,
  Factory,
  Send,
  Leaf,
  Star,
} from "lucide-react";
import HeroBackgroundVideo from "./HeroBackgroundVideo";

const HERO_VIDEO_ID = "I8U2KPfFDWU";

export default function CosmeticPage() {
  const t = useTranslations();
  const locale = useLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const heroUsps = [
    t("cosmetic.heroUsp1"),
    t("cosmetic.heroUsp2"),
    t("cosmetic.heroUsp3"),
    t("cosmetic.heroUsp4"),
  ];

  const stats = [
    { value: t("cosmetic.stat1Value"), label: t("cosmetic.stat1Label") },
    { value: t("cosmetic.stat2Value"), label: t("cosmetic.stat2Label") },
    { value: t("cosmetic.stat3Value"), label: t("cosmetic.stat3Label") },
  ];

  const three = [
    { icon: Star, title: t("cosmetic.three1Title"), desc: t("cosmetic.three1Desc") },
    { icon: ShieldCheck, title: t("cosmetic.three2Title"), desc: t("cosmetic.three2Desc") },
    { icon: Sparkles, title: t("cosmetic.three3Title"), desc: t("cosmetic.three3Desc") },
  ];

  const categories = [
    {
      icon: Droplet,
      title: t("cosmetic.cat1Title"),
      desc: t("cosmetic.cat1Desc"),
      image: "/media/top-view-of-blue-ribbon-on-man-perfume-in-a-gift-b-2025-02-10-11-30-09-utc.webp",
      alt: "Luxury perfume gift box with ribbon",
    },
    {
      icon: Heart,
      title: t("cosmetic.cat2Title"),
      desc: t("cosmetic.cat2Desc"),
      image: "/media/white-and-blank-unbranded-cosmetic-cream-jar-with-2024-12-07-13-38-54-utc.webp",
      alt: "Skincare set in custom packaging",
    },
    {
      icon: Palette,
      title: t("cosmetic.cat3Title"),
      desc: t("cosmetic.cat3Desc"),
      image: "/media/pink-box-with-an-empty-and-blank-perfume-bottle-in-2025-02-09-20-03-11-utc.webp",
      alt: "Makeup PR box with custom finishing",
    },
    {
      icon: Gift,
      title: t("cosmetic.cat4Title"),
      desc: t("cosmetic.cat4Desc"),
      image: "/media/front-view-of-woman-perfume-on-a-gift-box-on-red-r-2025-02-10-05-12-30-utc.webp",
      alt: "Seasonal limited edition cosmetic gift box",
    },
  ];

  const finishing = [
    t("cosmetic.finish1"),
    t("cosmetic.finish2"),
    t("cosmetic.finish3"),
    t("cosmetic.finish4"),
    t("cosmetic.finish5"),
    t("cosmetic.finish6"),
    t("cosmetic.finish7"),
    t("cosmetic.finish8"),
  ];

  const onestop = [
    { icon: Tag, title: t("cosmetic.onestop1Title"), desc: t("cosmetic.onestop1Desc") },
    { icon: FileText, title: t("cosmetic.onestop2Title"), desc: t("cosmetic.onestop2Desc") },
    { icon: Box, title: t("cosmetic.onestop3Title"), desc: t("cosmetic.onestop3Desc") },
    { icon: Package, title: t("cosmetic.onestop4Title"), desc: t("cosmetic.onestop4Desc") },
  ];

  const channels = [
    { icon: Store, title: t("cosmetic.channel1Title"), desc: t("cosmetic.channel1Desc") },
    { icon: ShoppingBag, title: t("cosmetic.channel2Title"), desc: t("cosmetic.channel2Desc") },
  ];

  const hubs = [
    {
      title: t("cosmetic.hub1Title"),
      location: t("cosmetic.hub1Location"),
      desc: t("cosmetic.hub1Desc"),
    },
    {
      title: t("cosmetic.hub2Title"),
      location: t("cosmetic.hub2Location"),
      desc: t("cosmetic.hub2Desc"),
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[640px] flex items-center bg-gray-900 overflow-hidden">
        <HeroBackgroundVideo
          videoId={HERO_VIDEO_ID}
          fallbackImage="/media/top-view-of-blue-ribbon-on-man-perfume-in-a-gift-b-2025-02-10-11-30-09-utc.webp"
          imageOpacity={0.5}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2340]/92 via-[#0d2340]/60 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-20 w-full">
          <div className="max-w-3xl text-white">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-orange-400 mb-4">
              {t("cosmetic.badge")}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight tracking-tight">
              {t("cosmetic.heroTitle")}
            </h1>
            <p className="text-lg md:text-xl text-orange-200 font-light mb-5">
              {t("cosmetic.heroSubtitle")}
            </p>
            <p className="text-base text-gray-200 mb-8 leading-relaxed max-w-2xl">
              {t("cosmetic.heroDesc")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8 max-w-2xl">
              {heroUsps.map((u) => (
                <div key={u} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-gray-100 leading-snug">{u}</p>
                </div>
              ))}
            </div>
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

      {/* Stats / certs strip */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("cosmetic.statsBadge")}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
              {t("cosmetic.statsTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((s) => (
              <div
                key={s.value}
                className="bg-white p-6 rounded-xl border border-gray-200 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                  {s.value}
                </div>
                <p className="text-sm text-gray-600 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 pillars */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("cosmetic.threeBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {t("cosmetic.threeTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {three.map((item) => (
              <div
                key={item.title}
                className="p-7 rounded-2xl bg-white border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-orange-500 text-white flex items-center justify-center mb-5">
                  <item.icon size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("cosmetic.introBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-5">
              {t("cosmetic.introTitle")}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              {t("cosmetic.introBody")}
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/media/front-view-of-woman-perfume-on-a-gift-box-on-red-r-2025-02-10-05-12-30-utc.webp"
              alt="Luxury perfume gift box presentation"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* 4 product categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("cosmetic.categoriesBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("cosmetic.categoriesTitle")}
            </h2>
            <p className="text-gray-600">{t("cosmetic.categoriesDesc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((c) => (
              <div
                key={c.title}
                className="group rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                      <c.icon size={20} />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">{c.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium finishing (navy) */}
      <section className="py-20 bg-[#0d2340] text-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest">
              {t("cosmetic.finishBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
              {t("cosmetic.finishTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {finishing.map((f, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 p-4 bg-white/5 backdrop-blur rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={12} strokeWidth={3} />
                </div>
                <p className="text-sm text-gray-100 leading-snug">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* One-stop */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("cosmetic.onestopBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("cosmetic.onestopTitle")}
            </h2>
            <p className="text-gray-600">{t("cosmetic.onestopDesc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {onestop.map((o) => (
              <div
                key={o.title}
                className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                  <o.icon size={22} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{o.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Channel fit */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("cosmetic.channelBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {t("cosmetic.channelTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {channels.map((c) => (
              <div
                key={c.title}
                className="p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-white border border-orange-100 hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-orange-500 text-white flex items-center justify-center mb-5">
                  <c.icon size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-xl">{c.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability (green) */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center mb-4">
              <Leaf size={20} />
            </div>
            <span className="text-xs font-semibold text-green-700 uppercase tracking-widest">
              {t("cosmetic.sustainBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              {t("cosmetic.sustainTitle")}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">{t("cosmetic.sustainDesc")}</p>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">{t("cosmetic.sustain1Title")}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t("cosmetic.sustain1Desc")}
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">{t("cosmetic.sustain2Title")}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t("cosmetic.sustain2Desc")}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {["FSC®", "ISO 9001", "SMETA-4P", "ISTA", "G7®"].map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-700 shadow-sm"
                >
                  <ShieldCheck size={11} className="text-green-600" />
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/media/white-and-blank-unbranded-cosmetic-cream-jar-with-2024-12-07-13-38-54-utc.webp"
              alt="Sustainable cosmetic packaging"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Production hubs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("cosmetic.hubsBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {t("cosmetic.hubsTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hubs.map((h) => (
              <div
                key={h.title}
                className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center mb-4">
                  <Factory size={22} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-xl">{h.title}</h3>
                <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-3">
                  {h.location}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote form */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("cosmetic.formTitle")}
            </h2>
            <p className="text-gray-600">{t("cosmetic.formDesc")}</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
            <form
              className="space-y-4"
              action="mailto:info@jinhaoxy.com"
              method="post"
              encType="text/plain"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    required
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    required
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Company / Brand *
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Product Type
                </label>
                <select
                  name="product_type"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option>Perfume Gift Box</option>
                  <option>Skincare Set Box</option>
                  <option>Makeup & PR Box</option>
                  <option>Seasonal / Limited Edition</option>
                  <option>Not sure — need design advice</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Project details *
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Bottle/jar dimensions, number of SKUs per set, finishing preferences (hot-foil, emboss, soft-touch), launch timeline, target annual volume, destination port..."
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
                We'll respond within 1 business day with board grades, finish options, and FOB quotation.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
