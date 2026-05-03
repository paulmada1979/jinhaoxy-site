import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Check,
  Pill,
  Utensils,
  Cpu,
  Megaphone,
  Leaf,
  ShieldCheck,
  Layers,
  Scissors,
  Sparkles,
  Snowflake,
} from "lucide-react";
import ContactForm from "./ContactForm";

export default function ConsumerPackagingPage() {
  const t = useTranslations();
  const locale = useLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const cartonFeatures = [
    { icon: Layers, label: t("consumerPackaging.feature1") },
    { icon: Scissors, label: t("consumerPackaging.feature2") },
    { icon: ShieldCheck, label: t("consumerPackaging.feature3") },
    { icon: Sparkles, label: t("consumerPackaging.feature4") },
  ];

  const cartonIndustries = [
    { icon: Pill, title: t("consumerPackaging.industry1Title"), desc: t("consumerPackaging.industry1Desc") },
    { icon: Utensils, title: t("consumerPackaging.industry2Title"), desc: t("consumerPackaging.industry2Desc") },
    { icon: Cpu, title: t("consumerPackaging.industry3Title"), desc: t("consumerPackaging.industry3Desc") },
    { icon: Megaphone, title: t("consumerPackaging.industry4Title"), desc: t("consumerPackaging.industry4Desc") },
  ];

  const foodFeatures = [
    t("consumerPackaging.foodFeature1"),
    t("consumerPackaging.foodFeature2"),
    t("consumerPackaging.foodFeature3"),
    t("consumerPackaging.foodFeature4"),
    t("consumerPackaging.foodFeature5"),
    t("consumerPackaging.foodFeature6"),
  ];

  return (
    <div>
      {/* Hero banner */}
      <section className="relative min-h-[560px] flex items-center bg-gray-900 overflow-hidden">
        <Image
          src="/media/couple-choosing-cosmetics-in-the-pharmacy-2025-03-13-13-35-07-utc.jpg"
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
              {t("consumerPackaging.heroEyebrow")}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {t("consumerPackaging.heroTitle")}
            </h1>
            <p className="text-base md:text-lg text-gray-200 mb-8 leading-relaxed">
              {t("consumerPackaging.heroDesc")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`${prefix}/conctact-us`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-semibold transition-colors"
              >
                {t("consumerPackaging.heroCta")}
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Folding Cartons — text left, mockup right */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("consumerPackaging.cartonsEyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-5">
              {t("consumerPackaging.cartonsTitle")}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              {t("consumerPackaging.cartonsDesc1")}
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              {t("consumerPackaging.cartonsDesc2")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cartonFeatures.map((f, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-orange-50 rounded-lg p-3 border border-orange-100"
                >
                  <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <f.icon size={14} />
                  </div>
                  <p className="text-sm text-gray-700 leading-snug pt-0.5">{f.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-gray-50">
            <Image
              src="/media/01.Gable-Box-Mockup-copy.png"
              alt={t("consumerPackaging.cartonsImageAlt")}
              fill
              className="object-contain p-6"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("consumerPackaging.industriesEyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("consumerPackaging.industriesTitle")}
            </h2>
            <p className="text-gray-600">
              {t("consumerPackaging.industriesDesc")}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cartonIndustries.map((ind) => (
              <div
                key={ind.title}
                className="p-5 rounded-xl bg-white border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className="w-11 h-11 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center mb-3">
                  <ind.icon size={20} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-sm">{ind.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chocolate mockup banner */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 lg:px-6">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-xl bg-gray-50">
            <Image
              src="/media/Chocolate-Box-Mockup-copy.png"
              alt={t("consumerPackaging.chocolateImageAlt")}
              fill
              className="object-contain p-8"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
          </div>
        </div>
      </section>

      {/* Food Packaging — image left, text right */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-3 order-2 lg:order-1">
            {foodFeatures.map((f, i) => (
              <div
                key={i}
                className="flex items-start gap-2 bg-white rounded-lg p-3 border border-green-100"
              >
                <div className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={12} strokeWidth={3} />
                </div>
                <p className="text-sm text-gray-700 leading-snug">{f}</p>
              </div>
            ))}
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-xs font-semibold text-green-700 uppercase tracking-widest">
              {t("consumerPackaging.foodEyebrow")}
            </span>
            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center mt-4 mb-4">
              <Snowflake size={20} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("consumerPackaging.foodTitle")}
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {t("consumerPackaging.foodDesc1")}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {t("consumerPackaging.foodDesc2")}
            </p>
          </div>
        </div>
      </section>

      {/* Sustainability ribbon */}
      <section className="py-12 bg-[#0d2340] text-white">
        <div className="max-w-5xl mx-auto px-4 lg:px-6 text-center">
          <Leaf size={28} className="text-green-300 mx-auto mb-3" />
          <p className="text-base md:text-lg text-gray-200 leading-relaxed max-w-3xl mx-auto">
            {t("consumerPackaging.sustainabilityRibbon")}
          </p>
        </div>
      </section>

      {/* Quote form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("consumerPackaging.formTitle")}
            </h2>
            <p className="text-gray-600">
              {t("consumerPackaging.formDesc")}
            </p>
          </div>
          <ContactForm
            pageContext="Consumer Packaging"
            companyLabel={t("consumerPackaging.formCompany")}
            volume={{
              label: t("consumerPackaging.formVolume"),
              placeholder: t("consumerPackaging.formVolumePlaceholder"),
            }}
            select={{
              label: t("consumerPackaging.formCategory"),
              options: [
                ...cartonIndustries.map((c) => c.title),
                t("consumerPackaging.formCategoryCosmetics"),
                t("consumerPackaging.formCategoryOther"),
              ],
            }}
            messageLabel={t("consumerPackaging.formProjectDetails")}
            messagePlaceholder={t("consumerPackaging.formProjectDetailsPlaceholder")}
          />
        </div>
      </section>
    </div>
  );
}
