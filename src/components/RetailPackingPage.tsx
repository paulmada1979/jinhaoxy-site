import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Check,
  Store,
  ShoppingCart,
  Utensils,
  Sparkles,
  Leaf,
  Globe2,
  ShieldCheck,
} from "lucide-react";
import ContactForm from "./ContactForm";

export default function RetailPackingPage() {
  const t = useTranslations();
  const locale = useLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const applications = [
    {
      icon: Store,
      title: t("retailPacking.app1Title"),
      desc: t("retailPacking.app1Desc"),
      tint: "bg-orange-100 text-orange-700",
    },
    {
      icon: ShoppingCart,
      title: t("retailPacking.app2Title"),
      desc: t("retailPacking.app2Desc"),
      tint: "bg-blue-100 text-blue-700",
    },
    {
      icon: Utensils,
      title: t("retailPacking.app3Title"),
      desc: t("retailPacking.app3Desc"),
      tint: "bg-green-100 text-green-700",
    },
    {
      icon: Sparkles,
      title: t("retailPacking.app4Title"),
      desc: t("retailPacking.app4Desc"),
      tint: "bg-purple-100 text-purple-700",
    },
  ];

  const sustainability = [
    t("retailPacking.sustainability1"),
    t("retailPacking.sustainability2"),
    t("retailPacking.sustainability3"),
    t("retailPacking.sustainability4"),
    t("retailPacking.sustainability5"),
    t("retailPacking.sustainability6"),
  ];

  return (
    <div>
      {/* Hero banner */}
      <section className="relative min-h-[560px] flex items-center bg-gray-900 overflow-hidden">
        <Image
          src="/media/2019-2019-ncov-adult-analysis-bacterial-banner-bas-2024-11-03-05-14-35-utc.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2340]/90 via-[#0d2340]/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-20 w-full">
          <div className="max-w-3xl text-white">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-orange-400 mb-4">
              {t("retailPacking.heroEyebrow")}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {t("retailPacking.heroTitle")}
            </h1>
            <p className="text-base md:text-lg text-gray-200 mb-8 leading-relaxed">
              {t("retailPacking.heroDesc")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`${prefix}/conctact-us`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-semibold transition-colors"
              >
                {t("retailPacking.heroCta")}
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SRP — text left, image right */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("retailPacking.srpEyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-5">
              {t("retailPacking.srpTitle")}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              {t("retailPacking.srpDesc")}
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/media/bearded-senior-man-pushing-shopping-trolley-in-sup-2024-11-02-23-42-01-utc.jpg"
              alt={t("retailPacking.srpImageAlt")}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Consumer Packaging — image left, text right */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
            <Image
              src="/media/back-view-of-female-consumer-standing-by-large-she-2025-03-17-23-42-53-utc.jpg"
              alt={t("retailPacking.consumerImageAlt")}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("retailPacking.consumerEyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-5">
              {t("retailPacking.consumerTitle")}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              {t("retailPacking.consumerDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* Solutions intro */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
          <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
            {t("retailPacking.solutionsEyebrow")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
            {t("retailPacking.solutionsTitle")}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">
            {t("retailPacking.solutionsDesc1")}
          </p>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            {t("retailPacking.solutionsDesc2")}
          </p>
        </div>
      </section>

      {/* Applications grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("retailPacking.applicationsEyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("retailPacking.applicationsTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {applications.map((app) => (
              <div
                key={app.title}
                className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all flex gap-4"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${app.tint} flex items-center justify-center shrink-0`}
                >
                  <app.icon size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{app.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{app.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability — text left, ribbon right */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold text-green-700 uppercase tracking-widest">
              {t("retailPacking.sustainabilityEyebrow")}
            </span>
            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center mt-4 mb-4">
              <Leaf size={20} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("retailPacking.sustainabilityTitle")}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t("retailPacking.sustainabilityDesc")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sustainability.map((s, i) => (
              <div
                key={i}
                className="flex items-start gap-2 bg-white rounded-lg p-3 border border-green-100"
              >
                <div className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={12} strokeWidth={3} />
                </div>
                <p className="text-sm text-gray-700 leading-snug">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global reach */}
      <section className="py-20 bg-[#0d2340] text-white">
        <div className="max-w-5xl mx-auto px-4 lg:px-6 text-center">
          <div className="w-14 h-14 rounded-xl bg-orange-500 text-white flex items-center justify-center mx-auto mb-4">
            <Globe2 size={24} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("retailPacking.globalTitle")}</h2>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            {t("retailPacking.globalDesc")}
          </p>
        </div>
      </section>

      {/* Quote form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("retailPacking.formTitle")}
            </h2>
            <p className="text-gray-600">
              {t("retailPacking.formDesc")}
            </p>
          </div>
          <ContactForm
            pageContext="Retail Packaging"
            companyLabel={t("retailPacking.formCompany")}
            volume={{
              label: t("retailPacking.formVolume"),
              placeholder: t("retailPacking.formVolumePlaceholder"),
            }}
            select={{
              label: t("retailPacking.formChannel"),
              options: [
                ...applications.map((a) => a.title),
                t("retailPacking.formChannelNotSure"),
              ],
            }}
            messageLabel={t("retailPacking.formProjectDetails")}
            messagePlaceholder={t("retailPacking.formProjectDetailsPlaceholder")}
          />
        </div>
      </section>

      {/* Trust ribbon */}
      <section className="py-10 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 lg:px-6 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-orange-500" />
            {t("retailPacking.trustFsc")}
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-orange-500" />
            {t("retailPacking.trustIso")}
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-orange-500" />
            {t("retailPacking.trustInks")}
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-orange-500" />
            {t("retailPacking.trustFactories")}
          </div>
        </div>
      </section>
    </div>
  );
}
