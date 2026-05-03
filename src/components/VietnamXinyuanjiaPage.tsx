import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Check,
  Printer,
  Scissors,
  Layers,
  Box,
  FlaskConical,
  Award,
  Leaf,
  ShieldCheck,
  Users,
  Globe2,
  Factory,
} from "lucide-react";
import ContactForm from "./ContactForm";

export default function VietnamXinyuanjiaPage() {
  const t = useTranslations();
  const locale = useLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const productionLines = [
    {
      icon: Printer,
      title: t("vietnamXinyuanjia.productionLine1Title"),
      desc: t("vietnamXinyuanjia.productionLine1Desc"),
    },
    {
      icon: Scissors,
      title: t("vietnamXinyuanjia.productionLine2Title"),
      desc: t("vietnamXinyuanjia.productionLine2Desc"),
    },
    {
      icon: Layers,
      title: t("vietnamXinyuanjia.productionLine3Title"),
      desc: t("vietnamXinyuanjia.productionLine3Desc"),
    },
    {
      icon: Box,
      title: t("vietnamXinyuanjia.productionLine4Title"),
      desc: t("vietnamXinyuanjia.productionLine4Desc"),
    },
    {
      icon: FlaskConical,
      title: t("vietnamXinyuanjia.productionLine5Title"),
      desc: t("vietnamXinyuanjia.productionLine5Desc"),
    },
    {
      icon: Award,
      title: "ISO 9001:2015",
      desc: t("vietnamXinyuanjia.productionLine6Desc"),
    },
  ];

  const certs = [
    {
      title: t("vietnamXinyuanjia.cert1Title"),
      desc: t("vietnamXinyuanjia.cert1Desc"),
    },
    {
      title: "ISO 9001:2015",
      desc: t("vietnamXinyuanjia.cert2Desc"),
    },
    {
      title: t("vietnamXinyuanjia.cert3Title"),
      desc: t("vietnamXinyuanjia.cert3Desc"),
    },
    {
      title: t("vietnamXinyuanjia.cert4Title"),
      desc: t("vietnamXinyuanjia.cert4Desc"),
    },
  ];

  const responsibility = [
    t("vietnamXinyuanjia.responsibility1"),
    t("vietnamXinyuanjia.responsibility2"),
    t("vietnamXinyuanjia.responsibility3"),
    t("vietnamXinyuanjia.responsibility4"),
    t("vietnamXinyuanjia.responsibility5"),
  ];

  return (
    <div>
      {/* Hero banner — left-aligned */}
      <section className="relative min-h-[560px] flex items-center bg-gray-900 overflow-hidden">
        <Image
          src="/media/Banner-1.png"
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
              {t("vietnamXinyuanjia.heroEyebrow")}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {t("vietnamXinyuanjia.heroTitle")}
            </h1>
            <p className="text-base md:text-lg text-gray-200 mb-8 leading-relaxed">
              {t("vietnamXinyuanjia.heroDesc")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`${prefix}/conctact-us`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-semibold transition-colors"
              >
                {t("vietnamXinyuanjia.heroCta")}
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About — text left, image right */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("vietnamXinyuanjia.aboutEyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-5">
              {t("vietnamXinyuanjia.aboutTitle")}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              {t("vietnamXinyuanjia.aboutDesc1Pre")}
              <strong className="text-gray-900">20,000 m²</strong>
              {t("vietnamXinyuanjia.aboutDesc1Mid")}
              <strong className="text-gray-900">{t("vietnamXinyuanjia.aboutDesc1Staff")}</strong>
              {t("vietnamXinyuanjia.aboutDesc1Post")}
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              {t("vietnamXinyuanjia.aboutDesc2")}
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              {t("vietnamXinyuanjia.aboutDesc3Pre")}
              <strong className="text-gray-900">{t("vietnamXinyuanjia.aboutDesc3Port")}</strong>
              {t("vietnamXinyuanjia.aboutDesc3Post")}
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/media/about-technology-heidelberg-press.png"
              alt={t("vietnamXinyuanjia.aboutImageAlt")}
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
              src="/media/2.png"
              alt={t("vietnamXinyuanjia.productionImageAlt")}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("vietnamXinyuanjia.productionEyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-5">
              {t("vietnamXinyuanjia.productionTitle")}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              {t("vietnamXinyuanjia.productionDesc")}
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

      {/* Workshops — two-image showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("vietnamXinyuanjia.workshopsEyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("vietnamXinyuanjia.workshopsTitle")}
            </h2>
            <p className="text-gray-600">
              {t("vietnamXinyuanjia.workshopsDesc")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/media/7.png"
                alt={t("vietnamXinyuanjia.workshop1ImageAlt")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/media/11.png"
                alt={t("vietnamXinyuanjia.workshop2ImageAlt")}
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
              {t("vietnamXinyuanjia.certificationsEyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("vietnamXinyuanjia.certificationsTitle")}
            </h2>
            <p className="text-gray-600">
              {t("vietnamXinyuanjia.certificationsDesc")}
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

      {/* Sustainability & Social Responsibility — text left, image right */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold text-green-700 uppercase tracking-widest">
              {t("vietnamXinyuanjia.sustainabilityEyebrow")}
            </span>
            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center mt-4 mb-4">
              <Leaf size={20} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
              {t("vietnamXinyuanjia.sustainabilityTitle")}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t("vietnamXinyuanjia.sustainabilityDesc")}
            </p>
            <ul className="space-y-3">
              {responsibility.map((r, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-sm text-gray-700 leading-relaxed">{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/media/young-woman-holding-small-planet-in-hands-against-2024-11-07-13-19-28-utc.webp"
              alt={t("vietnamXinyuanjia.sustainabilityImageAlt")}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Regional Network */}
      <section className="py-20 bg-[#0d2340] text-white">
        <div className="max-w-5xl mx-auto px-4 lg:px-6 text-center">
          <div className="w-14 h-14 rounded-xl bg-orange-500 text-white flex items-center justify-center mx-auto mb-4">
            <Globe2 size={24} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("vietnamXinyuanjia.regionalTitle")}
          </h2>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-6">
            {t("vietnamXinyuanjia.regionalDesc")}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur border border-white/20 rounded-lg">
              <Factory size={14} className="text-orange-400" />
              <span className="text-sm">{t("vietnamXinyuanjia.regionalSiteVietnam")}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur border border-white/20 rounded-lg">
              <Factory size={14} className="text-orange-400" />
              <span className="text-sm">{t("vietnamXinyuanjia.regionalSiteChina")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / trust strip */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 lg:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-orange-600">20,000 m²</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{t("vietnamXinyuanjia.stat1Label")}</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-orange-600">250+</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{t("vietnamXinyuanjia.stat2Label")}</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-orange-600">4</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{t("vietnamXinyuanjia.stat3Label")}</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-orange-600">{t("vietnamXinyuanjia.stat4Value")}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{t("vietnamXinyuanjia.stat4Label")}</p>
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
              {t("vietnamXinyuanjia.formTitle")}
            </h2>
            <p className="text-gray-600">
              {t("vietnamXinyuanjia.formDesc")}
            </p>
          </div>
          <ContactForm
            pageContext="Vietnam Factory"
            companyLabel={t("vietnamXinyuanjia.formCompany")}
            volume={{ label: t("vietnamXinyuanjia.formCountry") }}
            select={{
              label: t("vietnamXinyuanjia.formInquiry"),
              options: [
                t("vietnamXinyuanjia.formInquiryQuotation"),
                t("vietnamXinyuanjia.formInquiryProduct"),
                t("vietnamXinyuanjia.formInquirySite"),
                t("vietnamXinyuanjia.formInquiryCert"),
                t("vietnamXinyuanjia.formInquiryOther"),
              ],
            }}
            messageLabel={t("vietnamXinyuanjia.formProjectDetails")}
            messagePlaceholder={t("vietnamXinyuanjia.formProjectDetailsPlaceholder")}
          />
        </div>
      </section>
    </div>
  );
}
