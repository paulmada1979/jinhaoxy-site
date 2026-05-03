import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Check,
  Printer,
  Scissors,
  Leaf,
  Sparkles,
  Layers,
  Utensils,
  Heart,
  Cpu,
  ShoppingCart,
  ShieldCheck,
  Award,
} from "lucide-react";
import ContactForm from "./ContactForm";

export default function FoldingCartonsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const keyFeatures = [
    {
      icon: Printer,
      title: t("foldingCartons.feature1Title"),
      desc: t("foldingCartons.feature1Desc"),
    },
    {
      icon: Scissors,
      title: t("foldingCartons.feature2Title"),
      desc: t("foldingCartons.feature2Desc"),
    },
    {
      icon: Leaf,
      title: t("foldingCartons.feature3Title"),
      desc: t("foldingCartons.feature3Desc"),
    },
    {
      icon: Sparkles,
      title: t("foldingCartons.feature4Title"),
      desc: t("foldingCartons.feature4Desc"),
    },
    {
      icon: Layers,
      title: t("foldingCartons.feature5Title"),
      desc: t("foldingCartons.feature5Desc"),
    },
    {
      icon: Award,
      title: t("foldingCartons.feature6Title"),
      desc: t("foldingCartons.feature6Desc"),
    },
  ];

  const applications = [
    {
      icon: Utensils,
      title: t("foldingCartons.app1Title"),
      desc: t("foldingCartons.app1Desc"),
      tint: "bg-green-100 text-green-700",
    },
    {
      icon: Heart,
      title: t("foldingCartons.app2Title"),
      desc: t("foldingCartons.app2Desc"),
      tint: "bg-pink-100 text-pink-700",
    },
    {
      icon: Cpu,
      title: t("foldingCartons.app3Title"),
      desc: t("foldingCartons.app3Desc"),
      tint: "bg-blue-100 text-blue-700",
    },
    {
      icon: ShoppingCart,
      title: t("foldingCartons.app4Title"),
      desc: t("foldingCartons.app4Desc"),
      tint: "bg-orange-100 text-orange-700",
    },
  ];

  const sustainability = [
    t("foldingCartons.sustainability1"),
    t("foldingCartons.sustainability2"),
    t("foldingCartons.sustainability3"),
    t("foldingCartons.sustainability4"),
    t("foldingCartons.sustainability5"),
    t("foldingCartons.sustainability6"),
  ];

  return (
    <div>
      {/* Hero banner — centered text */}
      <section className="relative min-h-[560px] flex items-center justify-center bg-gray-900 overflow-hidden">
        <Image
          src="/media/Banner-3.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0d2340]/70" />

        <div className="relative max-w-4xl mx-auto px-4 lg:px-6 py-20 w-full text-center">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-orange-400 mb-4">
            {t("foldingCartons.heroEyebrow")}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-white">
            {t("foldingCartons.heroTitle")}
          </h1>
          <p className="text-base md:text-lg text-gray-200 mb-8 leading-relaxed max-w-2xl mx-auto">
            {t("foldingCartons.heroDesc")}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={`${prefix}/conctact-us`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-semibold transition-colors"
            >
              {t("foldingCartons.heroCta")}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Intro — text left, mockup right */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("foldingCartons.introEyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-5">
              {t("foldingCartons.introTitle")}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              {t("foldingCartons.introDesc1")}
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              {t("foldingCartons.introDesc2")}
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-gray-50">
            <Image
              src="/media/01_Carton-Box-Mockup-copy.jpg"
              alt={t("foldingCartons.introImageAlt")}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Key features grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("foldingCartons.featuresEyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("foldingCartons.featuresTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {keyFeatures.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-xl bg-white border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className="w-11 h-11 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                  <f.icon size={20} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Our Manufacturing — image left, text right */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1 bg-gray-50">
            <Image
              src="/media/1.bip_.2995-copy.png"
              alt={t("foldingCartons.aboutImageAlt")}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("foldingCartons.aboutEyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-5">
              {t("foldingCartons.aboutTitle")}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              {t("foldingCartons.aboutDesc1")}
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              {t("foldingCartons.aboutDesc2")}
            </p>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("foldingCartons.applicationsEyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("foldingCartons.applicationsTitle")}
            </h2>
            <p className="text-gray-600">
              {t("foldingCartons.applicationsDesc")}
            </p>
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

      {/* Sustainability — text left, chips right */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold text-green-700 uppercase tracking-widest">
              {t("foldingCartons.sustainabilityEyebrow")}
            </span>
            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center mt-4 mb-4">
              <Leaf size={20} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("foldingCartons.sustainabilityTitle")}
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {t("foldingCartons.sustainabilityDesc1")}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {t("foldingCartons.sustainabilityDesc2")}
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

      {/* End-to-End Production Support */}
      <section className="py-20 bg-[#0d2340] text-white">
        <div className="max-w-5xl mx-auto px-4 lg:px-6 text-center">
          <div className="w-14 h-14 rounded-xl bg-orange-500 text-white flex items-center justify-center mx-auto mb-4">
            <ShieldCheck size={24} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("foldingCartons.supportTitle")}</h2>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            {t("foldingCartons.supportDesc")}
          </p>
        </div>
      </section>

      {/* Quote form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("foldingCartons.formTitle")}
            </h2>
            <p className="text-gray-600">
              {t("foldingCartons.formDesc")}
            </p>
          </div>
          <ContactForm
            pageContext="Folding Cartons"
            companyLabel={t("foldingCartons.formCompany")}
            volume={{
              label: t("foldingCartons.formVolume"),
              placeholder: t("foldingCartons.formVolumePlaceholder"),
            }}
            select={{
              label: t("foldingCartons.formIndustry"),
              options: [
                ...applications.map((a) => a.title),
                t("foldingCartons.formIndustryCosmetics"),
                t("foldingCartons.formIndustryPharma"),
                t("foldingCartons.formIndustryOther"),
              ],
            }}
            messageLabel={t("foldingCartons.formProjectDetails")}
            messagePlaceholder={t("foldingCartons.formProjectDetailsPlaceholder")}
          />
        </div>
      </section>
    </div>
  );
}
