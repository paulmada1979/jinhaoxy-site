import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Check,
  Tag,
  Radio,
  Lock,
  Zap,
  Package,
  ShieldCheck,
  Droplet,
  Layers,
  Shield,
  Sparkles,
  Scan,
  QrCode,
  Binary,
  Wifi,
  FlaskConical,
  Utensils,
  Heart,
  Stethoscope,
  Beaker,
  Truck,
  Cpu,
  ShoppingBag,
  Wine,
  Factory,
  Leaf,
  FileText,
  Printer,
  Layers3,
  Film,
  Square,
  Maximize,
} from "lucide-react";
import ContactForm from "./ContactForm";
import HeroBackgroundVideo from "./HeroBackgroundVideo";

const HERO_VIDEO_ID = "vNszRVM4e-I";

export default function StickersLabelsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const heroUsps = [
    t("stickers.heroUsp1"),
    t("stickers.heroUsp2"),
    t("stickers.heroUsp3"),
    t("stickers.heroUsp4"),
  ];

  const stats = [
    { value: t("stickers.stat1Value"), label: t("stickers.stat1Label") },
    { value: t("stickers.stat2Value"), label: t("stickers.stat2Label") },
    { value: t("stickers.stat3Value"), label: t("stickers.stat3Label") },
  ];

  const three = [
    { icon: Droplet, title: t("stickers.three1Title"), desc: t("stickers.three1Desc") },
    { icon: Shield, title: t("stickers.three2Title"), desc: t("stickers.three2Desc") },
    { icon: ShieldCheck, title: t("stickers.three3Title"), desc: t("stickers.three3Desc") },
  ];

  const types = [
    { icon: Tag, title: t("stickers.type1Title"), desc: t("stickers.type1Desc") },
    { icon: Film, title: t("stickers.type2Title"), desc: t("stickers.type2Desc") },
    { icon: Maximize, title: t("stickers.type3Title"), desc: t("stickers.type3Desc") },
    { icon: Square, title: t("stickers.type4Title"), desc: t("stickers.type4Desc") },
    { icon: Scan, title: t("stickers.type5Title"), desc: t("stickers.type5Desc") },
    { icon: Lock, title: t("stickers.type6Title"), desc: t("stickers.type6Desc") },
    { icon: Sparkles, title: t("stickers.type7Title"), desc: t("stickers.type7Desc") },
    { icon: Radio, title: t("stickers.type8Title"), desc: t("stickers.type8Desc") },
    { icon: FileText, title: t("stickers.type9Title"), desc: t("stickers.type9Desc") },
  ];

  const substrates = [
    { icon: FileText, title: t("stickers.sub1Title"), desc: t("stickers.sub1Desc") },
    { icon: Film, title: t("stickers.sub2Title"), desc: t("stickers.sub2Desc") },
    { icon: Layers, title: t("stickers.sub3Title"), desc: t("stickers.sub3Desc") },
    { icon: Sparkles, title: t("stickers.sub4Title"), desc: t("stickers.sub4Desc") },
    { icon: Layers3, title: t("stickers.sub5Title"), desc: t("stickers.sub5Desc") },
    { icon: Lock, title: t("stickers.sub6Title"), desc: t("stickers.sub6Desc") },
  ];

  const printing = [
    { icon: Printer, title: t("stickers.print1Title"), desc: t("stickers.print1Desc") },
    { icon: Zap, title: t("stickers.print2Title"), desc: t("stickers.print2Desc") },
    { icon: Binary, title: t("stickers.print3Title"), desc: t("stickers.print3Desc") },
    { icon: Layers3, title: t("stickers.print4Title"), desc: t("stickers.print4Desc") },
  ];

  const smart = [
    { icon: Radio, title: t("stickers.smart1Title"), desc: t("stickers.smart1Desc") },
    { icon: Wifi, title: t("stickers.smart2Title"), desc: t("stickers.smart2Desc") },
    { icon: QrCode, title: t("stickers.smart3Title"), desc: t("stickers.smart3Desc") },
    { icon: Binary, title: t("stickers.smart4Title"), desc: t("stickers.smart4Desc") },
  ];

  const finishing = [
    t("stickers.finish1"),
    t("stickers.finish2"),
    t("stickers.finish3"),
    t("stickers.finish4"),
    t("stickers.finish5"),
    t("stickers.finish6"),
    t("stickers.finish7"),
    t("stickers.finish8"),
  ];

  const compliance = [
    { icon: Utensils, title: t("stickers.comp1Title"), desc: t("stickers.comp1Desc") },
    { icon: FlaskConical, title: t("stickers.comp2Title"), desc: t("stickers.comp2Desc") },
    { icon: Stethoscope, title: t("stickers.comp3Title"), desc: t("stickers.comp3Desc") },
    { icon: Beaker, title: t("stickers.comp4Title"), desc: t("stickers.comp4Desc") },
    { icon: Heart, title: t("stickers.comp5Title"), desc: t("stickers.comp5Desc") },
    { icon: Leaf, title: t("stickers.comp6Title"), desc: t("stickers.comp6Desc") },
  ];

  const industries = [
    { icon: Utensils, title: t("stickers.ind1Title"), desc: t("stickers.ind1Desc"), tint: "bg-green-100 text-green-700" },
    { icon: Heart, title: t("stickers.ind2Title"), desc: t("stickers.ind2Desc"), tint: "bg-pink-100 text-pink-700" },
    { icon: Stethoscope, title: t("stickers.ind3Title"), desc: t("stickers.ind3Desc"), tint: "bg-teal-100 text-teal-700" },
    { icon: Beaker, title: t("stickers.ind4Title"), desc: t("stickers.ind4Desc"), tint: "bg-yellow-100 text-yellow-700" },
    { icon: Truck, title: t("stickers.ind5Title"), desc: t("stickers.ind5Desc"), tint: "bg-blue-100 text-blue-700" },
    { icon: Cpu, title: t("stickers.ind6Title"), desc: t("stickers.ind6Desc"), tint: "bg-slate-100 text-slate-700" },
    { icon: ShoppingBag, title: t("stickers.ind7Title"), desc: t("stickers.ind7Desc"), tint: "bg-orange-100 text-orange-700" },
    { icon: Wine, title: t("stickers.ind8Title"), desc: t("stickers.ind8Desc"), tint: "bg-red-100 text-red-700" },
  ];

  const sustain = [
    t("stickers.sustain1"),
    t("stickers.sustain2"),
    t("stickers.sustain3"),
    t("stickers.sustain4"),
    t("stickers.sustain5"),
    t("stickers.sustain6"),
  ];

  const hubs = [
    { title: t("stickers.hub1Title"), desc: t("stickers.hub1Desc") },
    { title: t("stickers.hub2Title"), desc: t("stickers.hub2Desc") },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[640px] flex items-center bg-gray-900 overflow-hidden">
        <HeroBackgroundVideo
          videoId={HERO_VIDEO_ID}
          fallbackImage="/media/unrecognizable-man-holding-roll-with-stickers-for-2025-03-18-17-15-13-utc.jpg"
          imageOpacity={0.5}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2340]/92 via-[#0d2340]/60 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-20 w-full">
          <div className="max-w-3xl text-white">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-orange-400 mb-4">
              {t("stickers.badge")}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight tracking-tight">
              {t("stickers.heroTitle")}
            </h1>
            <p className="text-lg md:text-xl text-orange-200 font-light mb-5">
              {t("stickers.heroSubtitle")}
            </p>
            <p className="text-base text-gray-200 mb-8 leading-relaxed max-w-2xl">
              {t("stickers.heroDesc")}
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
              {t("stickers.statsBadge")}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
              {t("stickers.statsTitle")}
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
              {t("stickers.threeBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {t("stickers.threeTitle")}
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
              {t("stickers.introBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-5">
              {t("stickers.introTitle")}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              {t("stickers.introBody")}
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/media/two-asian-ui-ux-designers-are-working-on-a-new-mob-2025-01-10-13-34-31-utc.jpg"
              alt="UI/UX designers working on label artwork"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Label types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("stickers.typesBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("stickers.typesTitle")}
            </h2>
            <p className="text-gray-600">{t("stickers.typesDesc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {types.map((c) => (
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

      {/* Substrates (navy) */}
      <section className="py-20 bg-[#0d2340] text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest">
              {t("stickers.substratesBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-3">
              {t("stickers.substratesTitle")}
            </h2>
            <p className="text-gray-300">{t("stickers.substratesDesc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {substrates.map((s) => (
              <div
                key={s.title}
                className="p-6 rounded-xl bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="w-11 h-11 rounded-lg bg-orange-500 text-white flex items-center justify-center mb-3">
                  <s.icon size={20} />
                </div>
                <h3 className="font-bold text-white mb-2 text-sm">{s.title}</h3>
                <p className="text-xs text-gray-300 leading-snug">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Printing methods */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("stickers.printBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {t("stickers.printTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {printing.map((p) => (
              <div
                key={p.title}
                className="p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-white border border-orange-100 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center mb-4">
                  <p.icon size={22} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart labels */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
            <Image
              src="/media/freight-distribution-center-employee-using-barcode-2025-02-17-20-09-15-utc.webp"
              alt="Worker scanning barcoded shipping labels"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("stickers.smartBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              {t("stickers.smartTitle")}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">{t("stickers.smartDesc")}</p>
            <div className="space-y-4">
              {smart.map((s) => (
                <div key={s.title} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <s.icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{s.title}</h3>
                    <p className="text-sm text-gray-600 leading-snug">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Finishing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("stickers.finishBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {t("stickers.finishTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {finishing.map((f, i) => (
              <div key={i} className="flex items-start gap-2.5 p-4 bg-gray-50 rounded-xl">
                <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={12} strokeWidth={3} />
                </div>
                <p className="text-sm text-gray-700 leading-snug">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory compliance */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("stickers.complianceBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("stickers.complianceTitle")}
            </h2>
            <p className="text-gray-600">{t("stickers.complianceDesc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {compliance.map((c) => (
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

      {/* Industries */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("stickers.industriesBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {t("stickers.industriesTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((i) => (
              <div
                key={i.title}
                className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className={`w-11 h-11 rounded-lg ${i.tint} flex items-center justify-center mb-3`}>
                  <i.icon size={20} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-sm">{i.title}</h3>
                <p className="text-xs text-gray-600 leading-snug">{i.desc}</p>
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
              <Leaf size={20} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("stickers.sustainTitle")}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">{t("stickers.sustainDesc")}</p>
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
            <div className="flex flex-wrap gap-2 mt-6">
              {["FSC®", "ISO 9001", "ISO 14001", "SMETA-4P", "G7®"].map((c) => (
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
              src="/media/two-skilled-web-designers-are-working-together-pl-2025-02-20-03-55-54-utc.jpg"
              alt="Designers collaborating on sustainable label design"
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
              {t("stickers.hubsBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("stickers.hubsTitle")}
            </h2>
            <p className="text-gray-600">{t("stickers.hubsDesc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hubs.map((h) => (
              <div
                key={h.title}
                className="p-7 rounded-2xl bg-white border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center mb-4">
                  <Factory size={22} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{h.title}</h3>
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
              {t("stickers.formTitle")}
            </h2>
            <p className="text-gray-600">{t("stickers.formDesc")}</p>
          </div>
          <ContactForm
            pageContext="Adhesive Labels & Stickers"
            select={{
              label: "Label Type",
              options: [
                "Pressure-Sensitive Roll Label",
                "Shrink Sleeve",
                "Wrap-Around",
                "Die-Cut Sticker",
                "Barcode / Serialization",
                "Tamper-Evident / Security",
                "RFID / NFC Smart Label",
                "Not sure — need advice",
              ],
            }}
            messageLabel="Specifications *"
            messagePlaceholder="Label dimensions, substrate preference, adhesive type, finishing (foil/emboss/varnish), industry (food / cosmetics / pharma / chemicals / logistics / electronics / retail / wine), compliance requirements (FDA / EU 1169 / UDI / GHS), quantity, destination market..."
          />
        </div>
      </section>
    </div>
  );
}
