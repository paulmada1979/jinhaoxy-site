import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Building2,
  Factory,
  Globe2,
  Clock,
  Leaf,
  Cpu,
  TrendingUp,
  ShieldCheck,
  Palette,
  Handshake,
} from "lucide-react";
import HeroBackgroundVideo from "./HeroBackgroundVideo";

const HERO_VIDEO_ID = "fhPKm6y5aZw";

export default function AboutPage() {
  const t = useTranslations();
  const locale = useLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const hubs = [
    {
      key: "china",
      icon: Factory,
      title: t("about.chinaTitle"),
      size: t("about.chinaSize"),
      desc: t("about.chinaDesc"),
      img: "/media/Dongguan-Xinyuan-Printing-Factory-Exterior-–-FSC-ISO-Certified-Packaging-Manufacturer.webp",
    },
    {
      key: "vietnam",
      icon: Globe2,
      title: t("about.vietnamTitle"),
      size: t("about.vietnamSize"),
      desc: t("about.vietnamDesc"),
      img: "/media/FSC-Certified-Packaging-Manufacturer-Vietnam-–-Vietnam-Xinyuanjia-Environment-Technology-Co.-Ltd.webp",
    },
    {
      key: "thailand",
      icon: Building2,
      title: t("about.thailandTitle"),
      size: t("about.thailandSize"),
      desc: t("about.thailandDesc"),
      img: "/media/warehouse-workers-under-working-factory-cargo-hand-2025-03-16-20-11-08-utc.webp",
    },
  ];

  const capabilities = [
    {
      icon: TrendingUp,
      title: t("about.capabilitiesTitle"),
      desc: t("about.capabilitiesDesc"),
    },
    {
      icon: ShieldCheck,
      title: t("about.qualityTitle"),
      desc: t("about.qualityDesc"),
    },
    {
      icon: Palette,
      title: t("about.customTitle"),
      desc: t("about.customDesc"),
    },
    {
      icon: Handshake,
      title: t("about.philosophyTitle"),
      desc: t("about.philosophyDesc"),
    },
  ];

  return (
    <div>
      {/* Hero with banner */}
      <section className="relative min-h-[500px] flex items-center bg-gray-900 overflow-hidden">
        <HeroBackgroundVideo
          videoId={HERO_VIDEO_ID}
          fallbackImage="/media/Banner-copy-scaled.jpg"
          imageOpacity={0.5}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2340]/90 via-[#0d2340]/60 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-20 w-full">
          <div className="max-w-2xl text-white">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-orange-400 mb-4">
              {t("about.badge")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t("about.heroTitle")}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 font-light mb-8">
              {t("about.heroDesc")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`${prefix}/conctact-us`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-semibold transition-colors"
              >
                {t("about.ctaConsult")}
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Three-hub network */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("about.hubsBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              {t("about.hubsTitle")}
            </h2>
            <p className="text-gray-600">{t("about.hubsDesc")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hubs.map((hub) => (
              <div
                key={hub.key}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-shadow overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                  <Image
                    src={hub.img}
                    alt={hub.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-lg bg-white/90 backdrop-blur flex items-center justify-center text-orange-600">
                    <hub.icon size={18} />
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{hub.title}</h3>
                  <p className="text-xs text-orange-600 font-semibold mb-3 uppercase tracking-wider">
                    {hub.size}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">{hub.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology-driven delivery */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
            <Image
              src="/media/Heidelberg-Offset-Printing-Line-–-Dongguan-Xinyuan-Printing-Factory.webp"
              alt="Heidelberg Offset Printing Line"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("about.techBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
              {t("about.techTitle")}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              {t("about.techDesc")}
            </p>
            <div className="space-y-3">
              {[
                { icon: Clock, label: t("about.techPoint1") },
                { icon: Leaf, label: t("about.techPoint2") },
                { icon: Cpu, label: t("about.techPoint3") },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <item.icon size={16} />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed pt-1.5">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("about.capabilitiesBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              What makes us different
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="p-8 rounded-2xl bg-gray-50 hover:bg-orange-50 transition-colors border border-gray-100"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center mb-4">
                  <cap.icon size={22} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{cap.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work With Us CTA */}
      <section className="py-20 bg-gradient-to-br from-[#0d2340] to-[#1a3659] text-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("about.ctaTitle")}</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            {t("about.ctaDesc")}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={`${prefix}/conctact-us`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-semibold transition-colors"
            >
              {t("about.ctaConsult")}
              <ArrowRight size={14} />
            </Link>
            <Link
              href={`${prefix}/factories`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur border border-white/30 hover:bg-white/20 text-white rounded-md text-sm font-semibold transition-colors"
            >
              <Factory size={14} />
              {t("about.ctaFactories")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
