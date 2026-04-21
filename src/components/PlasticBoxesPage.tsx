import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Check,
  Shield,
  Hand,
  RefreshCw,
  Layers,
  Box,
  Archive,
  Grid3x3,
  Eye,
  Utensils,
  Cpu,
  Wheat,
  Package,
  Truck,
  ShoppingBag,
  Settings,
  Palette,
  Ruler,
  Tag,
  Factory,
  Send,
  Leaf,
  Zap,
} from "lucide-react";
import HeroBackgroundVideo from "./HeroBackgroundVideo";

const HERO_VIDEO_ID = "W0ye5U4cDVU";

export default function PlasticBoxesPage() {
  const t = useTranslations();
  const locale = useLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const heroUsps = [
    t("plastic.heroUsp1"),
    t("plastic.heroUsp2"),
    t("plastic.heroUsp3"),
    t("plastic.heroUsp4"),
  ];

  const stats = [
    { value: t("plastic.stat1Value"), label: t("plastic.stat1Label") },
    { value: t("plastic.stat2Value"), label: t("plastic.stat2Label") },
    { value: t("plastic.stat3Value"), label: t("plastic.stat3Label") },
  ];

  const three = [
    { icon: Shield, title: t("plastic.three1Title"), desc: t("plastic.three1Desc") },
    { icon: Hand, title: t("plastic.three2Title"), desc: t("plastic.three2Desc") },
    { icon: RefreshCw, title: t("plastic.three3Title"), desc: t("plastic.three3Desc") },
  ];

  const types = [
    { icon: Layers, title: t("plastic.type1Title"), desc: t("plastic.type1Desc") },
    { icon: Box, title: t("plastic.type2Title"), desc: t("plastic.type2Desc") },
    { icon: Archive, title: t("plastic.type3Title"), desc: t("plastic.type3Desc") },
    { icon: Grid3x3, title: t("plastic.type4Title"), desc: t("plastic.type4Desc") },
    { icon: Eye, title: t("plastic.type5Title"), desc: t("plastic.type5Desc") },
    { icon: Utensils, title: t("plastic.type6Title"), desc: t("plastic.type6Desc") },
    { icon: Cpu, title: t("plastic.type7Title"), desc: t("plastic.type7Desc") },
    { icon: Wheat, title: t("plastic.type8Title"), desc: t("plastic.type8Desc") },
  ];

  const materials = [
    { icon: Package, title: t("plastic.mat1Title"), desc: t("plastic.mat1Desc") },
    { icon: Shield, title: t("plastic.mat2Title"), desc: t("plastic.mat2Desc") },
    { icon: Leaf, title: t("plastic.mat3Title"), desc: t("plastic.mat3Desc") },
    { icon: Zap, title: t("plastic.mat4Title"), desc: t("plastic.mat4Desc") },
  ];

  const features = [
    t("plastic.feat1"),
    t("plastic.feat2"),
    t("plastic.feat3"),
    t("plastic.feat4"),
    t("plastic.feat5"),
    t("plastic.feat6"),
    t("plastic.feat7"),
    t("plastic.feat8"),
  ];

  const industries = [
    { icon: Truck, title: t("plastic.ind1Title"), desc: t("plastic.ind1Desc"), tint: "bg-blue-100 text-blue-700" },
    { icon: Utensils, title: t("plastic.ind2Title"), desc: t("plastic.ind2Desc"), tint: "bg-green-100 text-green-700" },
    { icon: ShoppingBag, title: t("plastic.ind3Title"), desc: t("plastic.ind3Desc"), tint: "bg-orange-100 text-orange-700" },
    { icon: Cpu, title: t("plastic.ind4Title"), desc: t("plastic.ind4Desc"), tint: "bg-slate-100 text-slate-700" },
    { icon: Wheat, title: t("plastic.ind5Title"), desc: t("plastic.ind5Desc"), tint: "bg-amber-100 text-amber-700" },
    { icon: Settings, title: t("plastic.ind6Title"), desc: t("plastic.ind6Desc"), tint: "bg-red-100 text-red-700" },
  ];

  const custom = [
    { icon: Palette, title: t("plastic.custom1Title"), desc: t("plastic.custom1Desc") },
    { icon: Tag, title: t("plastic.custom2Title"), desc: t("plastic.custom2Desc") },
    { icon: Ruler, title: t("plastic.custom3Title"), desc: t("plastic.custom3Desc") },
    { icon: Settings, title: t("plastic.custom4Title"), desc: t("plastic.custom4Desc") },
  ];

  const sustain = [
    t("plastic.sustain1"),
    t("plastic.sustain2"),
    t("plastic.sustain3"),
    t("plastic.sustain4"),
    t("plastic.sustain5"),
    t("plastic.sustain6"),
  ];

  const hubs = [
    { title: t("plastic.hub1Title"), desc: t("plastic.hub1Desc") },
    { title: t("plastic.hub2Title"), desc: t("plastic.hub2Desc") },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[640px] flex items-center bg-gray-900 overflow-hidden">
        <HeroBackgroundVideo
          videoId={HERO_VIDEO_ID}
          fallbackImage="/media/colourful-industrial-plastic-crates-stuck-up-on-to-2025-02-24-11-58-30-utc.jpg"
          imageOpacity={0.5}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2340]/92 via-[#0d2340]/60 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-20 w-full">
          <div className="max-w-3xl text-white">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-orange-400 mb-4">
              {t("plastic.badge")}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight tracking-tight">
              {t("plastic.heroTitle")}
            </h1>
            <p className="text-lg md:text-xl text-orange-200 font-light mb-5">
              {t("plastic.heroSubtitle")}
            </p>
            <p className="text-base text-gray-200 mb-8 leading-relaxed max-w-2xl">
              {t("plastic.heroDesc")}
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

      {/* Stats */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("plastic.statsBadge")}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
              {t("plastic.statsTitle")}
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
              {t("plastic.threeBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {t("plastic.threeTitle")}
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
              {t("plastic.introBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-5">
              {t("plastic.introTitle")}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              {t("plastic.introBody")}
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/media/plastic-containers-2024-10-24-03-04-33-utc.jpg"
              alt="Stacked plastic storage containers"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Product types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("plastic.typesBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("plastic.typesTitle")}
            </h2>
            <p className="text-gray-600">{t("plastic.typesDesc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {types.map((c) => (
              <div
                key={c.title}
                className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                  <c.icon size={22} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{c.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials (navy) */}
      <section className="py-20 bg-[#0d2340] text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest">
              {t("plastic.materialsBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-3">
              {t("plastic.materialsTitle")}
            </h2>
            <p className="text-gray-300">{t("plastic.materialsDesc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {materials.map((m) => (
              <div
                key={m.title}
                className="p-6 rounded-xl bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="w-11 h-11 rounded-lg bg-orange-500 text-white flex items-center justify-center mb-3">
                  <m.icon size={20} />
                </div>
                <h3 className="font-bold text-white mb-2 text-sm">{m.title}</h3>
                <p className="text-xs text-gray-300 leading-snug">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("plastic.featuresBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {t("plastic.featuresTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {features.map((f, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={12} strokeWidth={3} />
                </div>
                <p className="text-sm text-gray-700 leading-snug">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("plastic.industriesBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {t("plastic.industriesTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((i) => (
              <div
                key={i.title}
                className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className={`w-12 h-12 rounded-xl ${i.tint} flex items-center justify-center mb-4`}>
                  <i.icon size={22} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{i.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customization */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
            <Image
              src="/media/stacked-white-and-green-plastic-storage-bins-in-st-2025-08-27-08-37-37-utc.jpg"
              alt="Custom color-coded plastic storage bins"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("plastic.customBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              {t("plastic.customTitle")}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">{t("plastic.customDesc")}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {custom.map((c) => (
                <div key={c.title} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <c.icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{c.title}</h3>
                    <p className="text-xs text-gray-600 leading-snug">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center mb-4">
              <Leaf size={20} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("plastic.sustainTitle")}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">{t("plastic.sustainDesc")}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sustain.map((s, i) => (
                <div key={i} className="flex items-start gap-2 p-2 bg-white/60 rounded-lg">
                  <div className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-gray-700 leading-snug">{s}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/media/factory-worker-sorting-plastic-caps-2025-03-18-14-56-46-utc.jpg"
              alt="Sorting recyclable plastic materials"
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
              {t("plastic.hubsBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("plastic.hubsTitle")}
            </h2>
            <p className="text-gray-600">{t("plastic.hubsDesc")}</p>
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
                <h3 className="font-bold text-gray-900 mb-2 text-xl">{h.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("plastic.formTitle")}
            </h2>
            <p className="text-gray-600">{t("plastic.formDesc")}</p>
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
                  <label className="block text-xs font-semibold text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    name="first_name"
                    required
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Last Name *</label>
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
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Company *</label>
                  <input
                    type="text"
                    name="company"
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
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Container Type</label>
                  <select
                    name="container_type"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option>Stackable Crate</option>
                    <option>Nestable Bin</option>
                    <option>Attached-Lid Container</option>
                    <option>Divider / Compartment Box</option>
                    <option>Food-Grade Crate</option>
                    <option>ESD-Safe Electronics Box</option>
                    <option>Agricultural / Bulk Bin</option>
                    <option>Not sure — need advice</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Application</label>
                  <select
                    name="application"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option>Warehouse & Distribution</option>
                    <option>Food & Cold-Chain</option>
                    <option>Retail & E-commerce</option>
                    <option>Electronics & Assembly</option>
                    <option>Agricultural</option>
                    <option>Automotive & Industrial</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Specifications *</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Dimensions, load weight, color requirements, custom features (lids / dividers / drainage), branding (logo / IML), quantity, destination market..."
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
                We'll respond within 1 business day with product options and pricing.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
