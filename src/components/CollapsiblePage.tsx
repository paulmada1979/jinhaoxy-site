import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Check,
  Package,
  Zap,
  Leaf,
  Maximize2,
  Truck,
  Shirt,
  Cpu,
  Sparkles,
  RefreshCw,
  Megaphone,
  Gift,
  Magnet,
  Layers,
  Paintbrush,
  ShieldCheck,
  Palette,
  Globe2,
} from "lucide-react";
import ContactForm from "./ContactForm";
export default function CollapsiblePage() {
  const t = useTranslations();
  const locale = useLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const stats = [
    { value: t("collapsible.stat1Value"), label: t("collapsible.stat1Label"), icon: Maximize2 },
    { value: t("collapsible.stat2Value"), label: t("collapsible.stat2Label"), icon: Package },
    { value: t("collapsible.stat3Value"), label: t("collapsible.stat3Label"), icon: Zap },
  ];

  const three = [
    { icon: Maximize2, title: t("collapsible.three1Title"), desc: t("collapsible.three1Desc") },
    { icon: Zap, title: t("collapsible.three2Title"), desc: t("collapsible.three2Desc") },
    { icon: Leaf, title: t("collapsible.three3Title"), desc: t("collapsible.three3Desc") },
  ];

  const marketplaces = [
    t("collapsible.mp1"),
    t("collapsible.mp2"),
    t("collapsible.mp3"),
    t("collapsible.mp4"),
    t("collapsible.mp5"),
    t("collapsible.mp6"),
  ];

  const advantages = [
    t("collapsible.adv1"),
    t("collapsible.adv2"),
    t("collapsible.adv3"),
    t("collapsible.adv4"),
    t("collapsible.adv5"),
    t("collapsible.adv6"),
    t("collapsible.adv7"),
    t("collapsible.adv8"),
  ];

  const customization = [
    { icon: Magnet, title: t("collapsible.custom1Title"), desc: t("collapsible.custom1Desc") },
    { icon: Layers, title: t("collapsible.custom2Title"), desc: t("collapsible.custom2Desc") },
    { icon: Paintbrush, title: t("collapsible.custom3Title"), desc: t("collapsible.custom3Desc") },
    { icon: Sparkles, title: t("collapsible.custom4Title"), desc: t("collapsible.custom4Desc") },
    { icon: ShieldCheck, title: t("collapsible.custom5Title"), desc: t("collapsible.custom5Desc") },
    { icon: Palette, title: t("collapsible.custom6Title"), desc: t("collapsible.custom6Desc") },
  ];

  const materials = [
    { icon: Package, title: t("collapsible.mat1Title"), desc: t("collapsible.mat1Desc") },
    { icon: Leaf, title: t("collapsible.mat2Title"), desc: t("collapsible.mat2Desc") },
    { icon: Sparkles, title: t("collapsible.mat3Title"), desc: t("collapsible.mat3Desc") },
    { icon: ShieldCheck, title: t("collapsible.mat4Title"), desc: t("collapsible.mat4Desc") },
  ];

  const useCases = [
    { icon: Sparkles, title: t("collapsible.use1Title"), desc: t("collapsible.use1Desc"), tint: "bg-pink-100 text-pink-700" },
    { icon: Cpu, title: t("collapsible.use2Title"), desc: t("collapsible.use2Desc"), tint: "bg-blue-100 text-blue-700" },
    { icon: Shirt, title: t("collapsible.use3Title"), desc: t("collapsible.use3Desc"), tint: "bg-purple-100 text-purple-700" },
    { icon: RefreshCw, title: t("collapsible.use4Title"), desc: t("collapsible.use4Desc"), tint: "bg-orange-100 text-orange-700" },
    { icon: Megaphone, title: t("collapsible.use5Title"), desc: t("collapsible.use5Desc"), tint: "bg-red-100 text-red-700" },
    { icon: Gift, title: t("collapsible.use6Title"), desc: t("collapsible.use6Desc"), tint: "bg-amber-100 text-amber-700" },
  ];

  const sustain = [
    t("collapsible.sustain1"),
    t("collapsible.sustain2"),
    t("collapsible.sustain3"),
    t("collapsible.sustain4"),
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[620px] flex items-center bg-gray-900 overflow-hidden">
        <Image
          src="/media/white-box-isolated-on-background-mockup-2024-12-20-11-19-20-utc.webp"
          alt=""
          fill
          priority
          className="object-cover object-center"
          style={{ opacity: 0.55 }}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2340]/90 via-[#0d2340]/55 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-20 w-full">
          <div className="max-w-3xl text-white">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-orange-400 mb-4">
              {t("collapsible.badge")}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight tracking-tight">
              {t("collapsible.heroTitle")}
            </h1>
            <p className="text-lg md:text-xl text-orange-200 font-light mb-5">
              {t("collapsible.heroSubtitle")}
            </p>
            <p className="text-base text-gray-200 mb-8 leading-relaxed max-w-2xl">
              {t("collapsible.heroDesc")}
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

      {/* Stats bar */}
      <section className="bg-[#0d2340] text-white py-12 border-t border-[#1a3659]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest">
              {t("collapsible.statsBadge")}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2">{t("collapsible.statsTitle")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="w-14 h-14 mx-auto rounded-xl bg-orange-500/20 flex items-center justify-center mb-3">
                  <s.icon size={24} className="text-orange-400" />
                </div>
                <p className="text-5xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-gray-300 uppercase tracking-wider mt-2 max-w-[200px] mx-auto">
                  {s.label}
                </p>
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
              {t("collapsible.threeBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {t("collapsible.threeTitle")}
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
              {t("collapsible.introBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-5">
              {t("collapsible.introTitle")}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              {t("collapsible.introBody")}
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/media/an-open-cardboard-box-rests-on-a-bright-white-surf-2025-02-24-12-32-49-utc.webp"
              alt="Collapsible gift box — open and flat"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Marketplaces */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("collapsible.marketplaceBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("collapsible.marketplaceTitle")}
            </h2>
            <p className="text-gray-600">{t("collapsible.marketplaceDesc")}</p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {marketplaces.map((m) => (
              <div
                key={m}
                className="p-4 bg-gray-50 rounded-xl flex flex-col items-center gap-2 hover:bg-orange-50 transition-colors"
              >
                <Globe2 size={22} className="text-orange-600" />
                <span className="text-sm font-semibold text-gray-800">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/media/luxury-pink-mousse-cake-in-gift-box-2025-02-21-14-30-43-utc.webp"
              alt="Luxury collapsible gift box assembled"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("collapsible.advBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-5">
              {t("collapsible.advTitle")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {advantages.map((a, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-gray-700 leading-snug">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customization */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("collapsible.customBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("collapsible.customTitle")}
            </h2>
            <p className="text-gray-600">{t("collapsible.customDesc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {customization.map((c) => (
              <div
                key={c.title}
                className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                  <c.icon size={22} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{c.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials (navy) */}
      <section className="py-20 bg-[#0d2340] text-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest">
              {t("collapsible.materialsBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
              {t("collapsible.materialsTitle")}
            </h2>
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

      {/* Use cases */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("collapsible.useBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {t("collapsible.useTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {useCases.map((u) => (
              <div
                key={u.title}
                className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className={`w-12 h-12 rounded-xl ${u.tint} flex items-center justify-center mb-4`}>
                  <u.icon size={22} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{u.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center mb-4">
              <Truck size={20} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("collapsible.sustainTitle")}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t("collapsible.sustainDesc")}
            </p>
            <div className="space-y-2">
              {sustain.map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-gray-700 leading-snug">{s}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {["FSC®", "ISO 9001", "SMETA-4P"].map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-700 shadow-sm"
                >
                  <ShieldCheck size={11} className="text-orange-500" />
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/media/fashionable-mousse-cake-with-a-mirror-glaze-decora-2025-02-21-05-05-33-utc.webp"
              alt="Premium collapsible packaging for e-commerce"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Quote form */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("collapsible.formTitle")}
            </h2>
            <p className="text-gray-600">{t("collapsible.formDesc")}</p>
          </div>
          <ContactForm
            pageContext="Collapsible Gift Boxes"
            companyLabel="Brand / Company"
            volume={{ label: "Est. Annual Volume", placeholder: "e.g. 100,000 boxes/year" }}
            select={{
              label: "Marketplace",
              options: [...marketplaces, "Multiple / Global"],
            }}
            messageLabel="Project details *"
            messagePlaceholder="Product, box dimensions, closure preference (magnetic / ribbon), destination markets, launch timeline..."
          />
        </div>
      </section>
    </div>
  );
}
