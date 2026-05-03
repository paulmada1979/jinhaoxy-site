import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Check,
  Printer,
  Scissors,
  Layers,
  Stamp,
  Box,
  FlaskConical,
  Award,
  Leaf,
  ShieldCheck,
  Globe2,
  Factory,
  Users,
  Wind,
  Database,
  Clock,
} from "lucide-react";
import ContactForm from "./ContactForm";

export default function DongguanFactoryPage() {
  const t = useTranslations();
  const locale = useLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const productionLines = [
    {
      icon: Printer,
      title: t("dongguanFactory.productionLine1Title"),
      desc: t("dongguanFactory.productionLine1Desc"),
    },
    {
      icon: Scissors,
      title: t("dongguanFactory.productionLine2Title"),
      desc: t("dongguanFactory.productionLine2Desc"),
    },
    {
      icon: Layers,
      title: t("dongguanFactory.productionLine3Title"),
      desc: t("dongguanFactory.productionLine3Desc"),
    },
    {
      icon: Stamp,
      title: t("dongguanFactory.productionLine4Title"),
      desc: t("dongguanFactory.productionLine4Desc"),
    },
    {
      icon: Box,
      title: t("dongguanFactory.productionLine5Title"),
      desc: t("dongguanFactory.productionLine5Desc"),
    },
    {
      icon: FlaskConical,
      title: t("dongguanFactory.productionLine6Title"),
      desc: t("dongguanFactory.productionLine6Desc"),
    },
  ];

  const facilityHighlights = [
    { icon: Wind, label: t("dongguanFactory.highlight1") },
    { icon: Award, label: t("dongguanFactory.highlight2") },
    { icon: Database, label: t("dongguanFactory.highlight3") },
    { icon: Clock, label: t("dongguanFactory.highlight4") },
  ];

  const certs = [
    {
      title: t("dongguanFactory.cert1Title"),
      desc: t("dongguanFactory.cert1Desc"),
    },
    {
      title: "ISO 9001:2015",
      desc: t("dongguanFactory.cert2Desc"),
    },
    {
      title: t("dongguanFactory.cert3Title"),
      desc: t("dongguanFactory.cert3Desc"),
    },
    {
      title: t("dongguanFactory.cert4Title"),
      desc: t("dongguanFactory.cert4Desc"),
    },
  ];

  const sustainability = [
    t("dongguanFactory.sustainability1"),
    t("dongguanFactory.sustainability2"),
    t("dongguanFactory.sustainability3"),
    t("dongguanFactory.sustainability4"),
    t("dongguanFactory.sustainability5"),
  ];

  return (
    <div>
      {/* Hero banner — left-aligned */}
      <section className="relative min-h-[560px] flex items-center bg-gray-900 overflow-hidden">
        <Image
          src="/media/3eb62070d00c8a027d8ab0454cba079-scaled.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2340]/90 via-[#0d2340]/55 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-20 w-full">
          <div className="max-w-2xl text-white">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-orange-400 mb-4">
              {t("dongguanFactory.heroEyebrow")}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {t("dongguanFactory.heroTitle")}
            </h1>
            <p className="text-base md:text-lg text-gray-200 mb-8 leading-relaxed">
              {t("dongguanFactory.heroDesc")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`${prefix}/conctact-us`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-semibold transition-colors"
              >
                {t("dongguanFactory.heroCta")}
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About — text left, exterior image right */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("dongguanFactory.aboutEyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-5">
              {t("dongguanFactory.aboutTitle")}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              {t("dongguanFactory.aboutDesc1Pre")}
              <strong className="text-gray-900">30,000 m²</strong>
              {t("dongguanFactory.aboutDesc1Mid")}
              <strong className="text-gray-900">{t("dongguanFactory.aboutDesc1Tech")}</strong>
              {t("dongguanFactory.aboutDesc1Post")}
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              {t("dongguanFactory.aboutDesc2")}
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              {t("dongguanFactory.aboutDesc3Pre")}
              <strong className="text-gray-900">{t("dongguanFactory.aboutDesc3Ports")}</strong>
              {" "}
              {t("dongguanFactory.aboutDesc3Post")}
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/media/Dongguan-Xinyuan-Printing-Factory-Exterior-–-FSC-ISO-Certified-Packaging-Manufacturer.webp"
              alt={t("dongguanFactory.aboutImageAlt")}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Production Capabilities — image left, lines right */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
            <Image
              src="/media/Heidelberg-Offset-Printing-Line-–-Dongguan-Xinyuan-Printing-Factory.webp"
              alt={t("dongguanFactory.productionImageAlt")}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("dongguanFactory.productionEyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-5">
              {t("dongguanFactory.productionTitle")}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              {t("dongguanFactory.productionDesc")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {productionLines.map((p) => (
                <div
                  key={p.title}
                  className="flex items-start gap-3 bg-white rounded-lg p-3 border border-gray-100"
                >
                  <div className="w-9 h-9 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <p.icon size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{p.title}</p>
                    <p className="text-xs text-gray-600 leading-snug">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Facility highlights strip */}
      <section className="py-12 bg-orange-50 border-y border-orange-100">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <h3 className="text-lg font-bold text-gray-900">{t("dongguanFactory.highlightsTitle")}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {facilityHighlights.map((f, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-white rounded-lg p-3 border border-orange-100"
              >
                <div className="w-9 h-9 rounded-lg bg-orange-500 text-white flex items-center justify-center shrink-0">
                  <f.icon size={16} />
                </div>
                <p className="text-sm text-gray-700 leading-snug pt-1.5">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshops — two-image showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("dongguanFactory.workshopsEyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("dongguanFactory.workshopsTitle")}
            </h2>
            <p className="text-gray-600">
              {t("dongguanFactory.workshopsDesc")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/media/Automatic-Die-Cutting-Workshop-–-Dongguan-Xinyuan-Printing-Co.-Ltd.webp"
                alt={t("dongguanFactory.workshop1ImageAlt")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/media/Paper-Handling-and-Packing-Line-–-Dongguan-Packaging-Factory.webp"
                alt={t("dongguanFactory.workshop2ImageAlt")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="w-14 h-14 rounded-xl bg-orange-500 text-white flex items-center justify-center mx-auto mb-4">
              <ShieldCheck size={24} />
            </div>
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("dongguanFactory.certificationsEyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("dongguanFactory.certificationsTitle")}
            </h2>
            <p className="text-gray-600">
              {t("dongguanFactory.certificationsDesc")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {certs.map((c) => (
              <div
                key={c.title}
                className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className="w-11 h-11 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                  <Award size={20} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{c.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability & Social Responsibility */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold text-green-700 uppercase tracking-widest">
              {t("dongguanFactory.sustainabilityEyebrow")}
            </span>
            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center mt-4 mb-4">
              <Leaf size={20} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
              {t("dongguanFactory.sustainabilityTitle")}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {t("dongguanFactory.sustainabilityDesc")}
            </p>
          </div>
          <ul className="space-y-3">
            {sustainability.map((s, i) => (
              <li
                key={i}
                className="flex items-start gap-3 bg-white rounded-lg p-4 border border-green-100"
              >
                <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} strokeWidth={3} />
                </div>
                <span className="text-sm text-gray-700 leading-relaxed">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Regional Network */}
      <section className="py-20 bg-[#0d2340] text-white">
        <div className="max-w-5xl mx-auto px-4 lg:px-6 text-center">
          <div className="w-14 h-14 rounded-xl bg-orange-500 text-white flex items-center justify-center mx-auto mb-4">
            <Globe2 size={24} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("dongguanFactory.regionalTitle")}</h2>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-6">
            {t("dongguanFactory.regionalDesc")}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur border border-white/20 rounded-lg">
              <Factory size={14} className="text-orange-400" />
              <span className="text-sm">{t("dongguanFactory.regionalSiteChina")}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur border border-white/20 rounded-lg">
              <Factory size={14} className="text-orange-400" />
              <span className="text-sm">{t("dongguanFactory.regionalSiteVietnam")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / trust strip */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 lg:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-orange-600">30,000 m²</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{t("dongguanFactory.stat1Label")}</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-orange-600">400+</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{t("dongguanFactory.stat2Label")}</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-orange-600">24/7</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{t("dongguanFactory.stat3Label")}</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-orange-600">G7®</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{t("dongguanFactory.stat4Label")}</p>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-10">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4">
              <Users size={20} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("dongguanFactory.formTitle")}
            </h2>
            <p className="text-gray-600">
              {t("dongguanFactory.formDesc")}
            </p>
          </div>
          <ContactForm
            pageContext="Dongguan Factory"
            companyLabel={t("dongguanFactory.formCompany")}
            volume={{ label: t("dongguanFactory.formCountry") }}
            select={{
              label: t("dongguanFactory.formInquiry"),
              options: [
                t("dongguanFactory.formInquiryProduction"),
                t("dongguanFactory.formInquiryQuotation"),
                t("dongguanFactory.formInquirySite"),
                t("dongguanFactory.formInquiryCert"),
                t("dongguanFactory.formInquiryOther"),
              ],
            }}
            messageLabel={t("dongguanFactory.formProjectDetails")}
            messagePlaceholder={t("dongguanFactory.formProjectDetailsPlaceholder")}
          />
        </div>
      </section>
    </div>
  );
}
