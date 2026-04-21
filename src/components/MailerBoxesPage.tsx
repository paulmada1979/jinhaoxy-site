import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Package,
  Sparkles,
  Leaf,
  Lock,
  ShieldAlert,
  Scissors,
  Check,
  Printer,
  Factory,
  Send,
  Shirt,
  Cpu,
  RefreshCw,
  Utensils,
  Heart,
} from "lucide-react";
import HeroBackgroundVideo from "./HeroBackgroundVideo";

const HERO_VIDEO_ID = "I8U2KPfFDWU";

export default function MailerBoxesPage() {
  const t = useTranslations();
  const locale = useLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const industries = [
    { icon: Shirt, label: t("mailerBoxes.ind1") },
    { icon: Sparkles, label: t("mailerBoxes.ind2") },
    { icon: Cpu, label: t("mailerBoxes.ind3") },
    { icon: RefreshCw, label: t("mailerBoxes.ind4") },
    { icon: Heart, label: t("mailerBoxes.ind5") },
    { icon: Utensils, label: t("mailerBoxes.ind6") },
  ];

  const why = [
    t("mailerBoxes.why1"),
    t("mailerBoxes.why2"),
    t("mailerBoxes.why3"),
    t("mailerBoxes.why4"),
    t("mailerBoxes.why5"),
    t("mailerBoxes.why6"),
  ];

  const types = [
    { icon: Package, title: t("mailerBoxes.type1Title"), desc: t("mailerBoxes.type1Desc") },
    { icon: Sparkles, title: t("mailerBoxes.type2Title"), desc: t("mailerBoxes.type2Desc") },
    { icon: Leaf, title: t("mailerBoxes.type3Title"), desc: t("mailerBoxes.type3Desc") },
    { icon: Lock, title: t("mailerBoxes.type4Title"), desc: t("mailerBoxes.type4Desc") },
    { icon: ShieldAlert, title: t("mailerBoxes.type5Title"), desc: t("mailerBoxes.type5Desc") },
    { icon: Scissors, title: t("mailerBoxes.type6Title"), desc: t("mailerBoxes.type6Desc") },
  ];

  const flutes = [
    { title: t("mailerBoxes.flute1Title"), desc: t("mailerBoxes.flute1Desc") },
    { title: t("mailerBoxes.flute2Title"), desc: t("mailerBoxes.flute2Desc") },
    { title: t("mailerBoxes.flute3Title"), desc: t("mailerBoxes.flute3Desc") },
    { title: t("mailerBoxes.flute4Title"), desc: t("mailerBoxes.flute4Desc") },
  ];

  const printing = [
    t("mailerBoxes.print1"),
    t("mailerBoxes.print2"),
    t("mailerBoxes.print3"),
    t("mailerBoxes.print4"),
    t("mailerBoxes.print5"),
    t("mailerBoxes.print6"),
  ];

  const sustain = [
    t("mailerBoxes.sustain1"),
    t("mailerBoxes.sustain2"),
    t("mailerBoxes.sustain3"),
    t("mailerBoxes.sustain4"),
    t("mailerBoxes.sustain5"),
    t("mailerBoxes.sustain6"),
  ];

  const capabilities = [
    t("mailerBoxes.cap1"),
    t("mailerBoxes.cap2"),
    t("mailerBoxes.cap3"),
    t("mailerBoxes.cap4"),
    t("mailerBoxes.cap5"),
    t("mailerBoxes.cap6"),
    t("mailerBoxes.cap7"),
    t("mailerBoxes.cap8"),
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[560px] flex items-center bg-gray-900 overflow-hidden">
        <HeroBackgroundVideo
          videoId={HERO_VIDEO_ID}
          fallbackImage="/media/delivery-managers-asian-team-supervising-parcels-r-2025-02-17-06-27-30-utc.webp"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2340]/90 via-[#0d2340]/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-20 w-full">
          <div className="max-w-3xl text-white">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-orange-400 mb-4">
              {t("mailerBoxes.badge")}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {t("mailerBoxes.heroTitle")}
            </h1>
            <p className="text-base md:text-lg text-gray-200 mb-8 leading-relaxed">
              {t("mailerBoxes.heroDesc")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`${prefix}/conctact-us`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-semibold transition-colors"
              >
                Request a Quote
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
          <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
            {t("mailerBoxes.introBadge")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
            {t("mailerBoxes.introTitle")}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            {t("mailerBoxes.introBody")}
          </p>
        </div>
      </section>

      {/* Industries served */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("mailerBoxes.industriesBadge")}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
              {t("mailerBoxes.industriesTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {industries.map((i) => (
              <div
                key={i.label}
                className="p-4 bg-white rounded-xl border border-gray-100 flex flex-col items-center gap-2 hover:border-orange-200 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                  <i.icon size={18} />
                </div>
                <span className="text-xs font-semibold text-gray-700 text-center leading-tight">
                  {i.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("mailerBoxes.whyBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-5">
              {t("mailerBoxes.whyTitle")}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t("mailerBoxes.whyDesc")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {why.map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-gray-700 leading-snug">{point}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/media/parcel-2025-01-09-05-46-00-utc.webp"
              alt="E-commerce parcel packaging"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("mailerBoxes.typesBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("mailerBoxes.typesTitle")}
            </h2>
            <p className="text-gray-600">{t("mailerBoxes.typesDesc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {types.map((type) => (
              <div
                key={type.title}
                className="p-6 rounded-xl bg-white border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className="w-11 h-11 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                  <type.icon size={20} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{type.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flute types */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("mailerBoxes.fluteTitle")}
            </h2>
            <p className="text-gray-600">{t("mailerBoxes.fluteDesc")}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {flutes.map((f) => (
              <div
                key={f.title}
                className="p-5 rounded-lg bg-gray-50 border border-gray-100 hover:border-orange-200 transition-colors"
              >
                <p className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-2">
                  {f.title}
                </p>
                <p className="text-sm text-gray-700 leading-snug">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Printing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("mailerBoxes.printingBadge")}
            </span>
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mt-4 mb-4">
              <Printer size={20} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("mailerBoxes.printingTitle")}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t("mailerBoxes.printingDesc")}
            </p>
            <ul className="space-y-2.5">
              {printing.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-orange-500 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  </div>
                  <span className="text-sm text-gray-700 leading-snug">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/media/Heidelberg-Offset-Printing-Line-–-Dongguan-Xinyuan-Printing-Factory.webp"
              alt="Heidelberg Offset Printing Line"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
            <Image
              src="/media/eco-packaging-of-parcels-and-white-biodegradable-f-2025-03-10-11-44-45-utc.webp"
              alt="Eco packaging for e-commerce parcels"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-xs font-semibold text-green-700 uppercase tracking-widest">
              {t("mailerBoxes.sustainBadge")}
            </span>
            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center mt-4 mb-4">
              <Leaf size={20} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("mailerBoxes.sustainTitle")}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t("mailerBoxes.sustainDesc")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sustain.map((s, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-gray-700 leading-snug">{s}</p>
                </div>
              ))}
            </div>
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
              {t("mailerBoxes.capTitle")}
            </h2>
            <p className="text-gray-600">{t("mailerBoxes.capDesc")}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className="p-4 rounded-lg bg-gray-50 border border-gray-100 flex flex-col gap-1"
              >
                <div className="w-6 h-6 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {i + 1}
                </div>
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
              {t("mailerBoxes.formTitle")}
            </h2>
            <p className="text-gray-600">{t("mailerBoxes.formDesc")}</p>
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
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Est. Monthly Volume</label>
                  <input
                    type="text"
                    name="volume"
                    placeholder="e.g. 20,000 boxes/month"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Mailer Style</label>
                <select
                  name="style"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {types.map((tp) => <option key={tp.title}>{tp.title}</option>)}
                  <option>Not sure — need advice</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Project Details *</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Product, dimensions, print requirements, launch timeline, sustainability preferences..."
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
