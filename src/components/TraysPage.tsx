"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import {
  ArrowRight,
  Cpu,
  Utensils,
  Store,
  ShoppingCart,
  Check,
  Scissors,
  Layers,
  Package,
  ShieldCheck,
  Factory,
  Send,
  Zap,
  Droplets,
  Ruler,
  Award,
  Play,
} from "lucide-react";

const HERO_VIDEO_ID = "vuys3GFHBvk";

export default function TraysPage() {
  const t = useTranslations();
  const locale = useLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;
  const [videoOpen, setVideoOpen] = useState(false);

  const features = [
    t("trays.feat1"),
    t("trays.feat2"),
    t("trays.feat3"),
    t("trays.feat4"),
  ];

  const useCases = [
    {
      icon: Cpu,
      title: t("trays.use1Title"),
      desc: t("trays.use1Desc"),
      tint: "bg-blue-100 text-blue-700",
    },
    {
      icon: Utensils,
      title: t("trays.use2Title"),
      desc: t("trays.use2Desc"),
      tint: "bg-green-100 text-green-700",
    },
    {
      icon: Store,
      title: t("trays.use3Title"),
      desc: t("trays.use3Desc"),
      tint: "bg-purple-100 text-purple-700",
    },
    {
      icon: ShoppingCart,
      title: t("trays.use4Title"),
      desc: t("trays.use4Desc"),
      tint: "bg-orange-100 text-orange-700",
    },
  ];

  const flutes = [
    { title: t("trays.flute1Title"), desc: t("trays.flute1Desc") },
    { title: t("trays.flute2Title"), desc: t("trays.flute2Desc") },
    { title: t("trays.flute3Title"), desc: t("trays.flute3Desc") },
    { title: t("trays.flute4Title"), desc: t("trays.flute4Desc") },
    { title: t("trays.flute5Title"), desc: t("trays.flute5Desc") },
    { title: t("trays.flute6Title"), desc: t("trays.flute6Desc") },
  ];

  const customization = [
    { icon: Ruler, label: t("trays.custom1") },
    { icon: Scissors, label: t("trays.custom2") },
    { icon: Zap, label: t("trays.custom3") },
    { icon: Droplets, label: t("trays.custom4") },
    { icon: Layers, label: t("trays.custom5") },
    { icon: Package, label: t("trays.custom6") },
  ];

  const quality = [
    t("trays.quality1"),
    t("trays.quality2"),
    t("trays.quality3"),
    t("trays.quality4"),
  ];

  const capabilities = [
    t("trays.cap1"),
    t("trays.cap2"),
    t("trays.cap3"),
    t("trays.cap4"),
    t("trays.cap5"),
    t("trays.cap6"),
    t("trays.cap7"),
    t("trays.cap8"),
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[560px] flex items-center bg-gray-900 overflow-hidden">
        <Image
          src="/media/packing-line-in-a-logistics-warehouse-conveyor-b-2025-01-09-01-24-07-utc.webp"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-55"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2340]/90 via-[#0d2340]/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-20 w-full">
          <div className="max-w-3xl text-white">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-orange-400 mb-4">
              {t("trays.badge")}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-3 leading-tight">
              {t("trays.heroTitle")}
            </h1>
            <p className="text-lg md:text-xl text-orange-200 font-light mb-5">
              {t("trays.heroSubtitle")}
            </p>
            <p className="text-base text-gray-200 mb-8 leading-relaxed max-w-2xl">
              {t("trays.heroDesc")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`${prefix}/conctact-us`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-semibold transition-colors"
              >
                Request a Quote
                <ArrowRight size={14} />
              </Link>
              <button
                onClick={() => setVideoOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur border border-white/30 hover:bg-white/20 text-white rounded-md text-sm font-semibold transition-colors"
              >
                <Play size={14} fill="currentColor" />
                Watch Video
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Video modal */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setVideoOpen(false)}
        >
          <div className="relative w-full max-w-5xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${HERO_VIDEO_ID}?autoplay=1`}
              title="Cardboard Trays & Inserts — Production"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-orange-400 text-sm font-semibold"
            >
              Close ✕
            </button>
          </div>
        </div>
      )}

      {/* Feature strip */}
      <section className="py-10 bg-orange-50 border-y border-orange-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <h3 className="text-base font-semibold text-gray-900">{t("trays.featuresTitle")}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
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
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
              {t("trays.introTitle")}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              {t("trays.introBody1")}
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              {t("trays.introBody2")}
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/media/Automatic-Die-Cutting-Workshop-–-Dongguan-Xinyuan-Printing-Co.-Ltd.webp"
              alt="Automatic die-cutting workshop"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Material grades */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("trays.gradeBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-5">
              {t("trays.gradeTitle")}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              {t("trays.gradeDesc")}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {flutes.map((f) => (
              <div
                key={f.title}
                className="p-5 rounded-lg bg-white border border-gray-100 hover:border-orange-200 hover:shadow-sm transition-all"
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

      {/* Use cases */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("trays.useBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("trays.useTitle")}
            </h2>
            <p className="text-gray-600">{t("trays.useDesc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {useCases.map((u) => (
              <div
                key={u.title}
                className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all flex gap-4"
              >
                <div className={`w-12 h-12 rounded-xl ${u.tint} flex items-center justify-center shrink-0`}>
                  <u.icon size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{u.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{u.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customization */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
            <Image
              src="/media/above-table-top-view-of-warehouse-preparing-post-c-2025-02-25-07-55-06-utc.webp"
              alt="Warehouse preparing packaging"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("trays.customBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              {t("trays.customTitle")}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t("trays.customDesc")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {customization.map((c, i) => (
                <div key={i} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <c.icon size={14} />
                  </div>
                  <p className="text-sm text-gray-700 leading-snug pt-0.5">{c.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality + testing */}
      <section className="py-20 bg-[#0d2340] text-white">
        <div className="max-w-5xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="w-14 h-14 rounded-xl bg-orange-500 text-white flex items-center justify-center mx-auto mb-4">
              <Award size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("trays.qualityTitle")}
            </h2>
            <p className="text-gray-300 leading-relaxed">{t("trays.qualityDesc")}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quality.map((q, i) => (
              <div
                key={i}
                className="p-4 rounded-lg bg-white/5 backdrop-blur border border-white/10"
              >
                <ShieldCheck size={16} className="text-orange-400 mb-2" />
                <p className="text-xs text-gray-200 leading-snug">{q}</p>
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
              {t("trays.capTitle")}
            </h2>
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
              {t("trays.formTitle")}
            </h2>
            <p className="text-gray-600">{t("trays.formDesc")}</p>
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
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    name="company"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Industry</label>
                  <select
                    name="industry"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option>Electronics & Devices</option>
                    <option>Food & Beverage</option>
                    <option>Retail / Display</option>
                    <option>E-Commerce</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Product dimensions & fit requirements *</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Product dimensions (L×W×H), weight, quantity per tray, board grade, print requirements..."
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
