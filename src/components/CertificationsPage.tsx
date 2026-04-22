import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Award,
  FileCheck,
  Leaf,
  Palette,
  Target,
  FlaskConical,
  UserCheck,
  Factory,
  FileText,
  Sprout,
  ShieldCheck,
  Users,
  Recycle,
} from "lucide-react";

export default function CertificationsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const certs = [
    {
      icon: Award,
      color: "bg-blue-500",
      title: t("certifications.iso9001Title"),
      subtitle: t("certifications.iso9001Subtitle"),
      desc: t("certifications.iso9001Desc"),
    },
    {
      icon: Leaf,
      color: "bg-green-600",
      title: t("certifications.fscTitle"),
      subtitle: t("certifications.fscSubtitle"),
      desc: t("certifications.fscDesc"),
    },
    {
      icon: Palette,
      color: "bg-purple-500",
      title: t("certifications.gmiTitle"),
      subtitle: t("certifications.gmiSubtitle"),
      desc: t("certifications.gmiDesc"),
    },
    {
      icon: Target,
      color: "bg-orange-500",
      title: t("certifications.g7Title"),
      subtitle: t("certifications.g7Subtitle"),
      desc: t("certifications.g7Desc"),
    },
    {
      icon: FlaskConical,
      color: "bg-teal-500",
      title: t("certifications.istaLabTitle"),
      subtitle: t("certifications.istaLabSubtitle"),
      desc: t("certifications.istaLabDesc"),
    },
    {
      icon: UserCheck,
      color: "bg-indigo-500",
      title: t("certifications.istaPdpTitle"),
      subtitle: t("certifications.istaPdpSubtitle"),
      desc: t("certifications.istaPdpDesc"),
    },
  ];

  const sustainPoints = [
    { icon: Recycle, label: t("certifications.sustain1") },
    { icon: Sprout, label: t("certifications.sustain2") },
    { icon: Users, label: t("certifications.sustain3") },
    { icon: ShieldCheck, label: t("certifications.sustain4") },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[440px] flex items-center bg-gray-900 overflow-hidden">
        <Image
          src="/media/banner certifications.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2340]/90 via-[#0d2340]/60 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-16 w-full">
          <div className="max-w-3xl text-white">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-orange-400 mb-4">
              {t("certifications.badge")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t("certifications.heroTitle")}
            </h1>
            <p className="text-base md:text-lg text-gray-200 leading-relaxed">
              {t("certifications.heroDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* Intro strip */}
      <section className="py-10 bg-orange-50 border-y border-orange-100">
        <div className="max-w-4xl mx-auto px-4 lg:px-6">
          <p className="text-center text-gray-700 text-base md:text-lg leading-relaxed">
            {t("certifications.introLead")}
          </p>
        </div>
      </section>

      {/* Certifications grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certs.map((cert) => (
              <div
                key={cert.title}
                className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className={`w-12 h-12 rounded-xl ${cert.color} text-white flex items-center justify-center mb-4`}>
                  <cert.icon size={22} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">{cert.title}</h3>
                <p className="text-xs text-orange-600 font-semibold mb-3 uppercase tracking-wider">
                  {cert.subtitle}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">{cert.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 text-base max-w-3xl mx-auto mt-12 leading-relaxed">
            {t("certifications.closingLine")}
          </p>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/media/fsc image.jpg"
              alt="FSC® Chain of Custody Certification"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div>
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">Sustainability</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              {t("certifications.sustainTitle")}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t("certifications.sustainIntro")}
            </p>

            <div className="space-y-3">
              {sustainPoints.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                    <item.icon size={16} />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed pt-1.5">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Request Documents CTA */}
      <section className="py-20 bg-gradient-to-br from-[#0d2340] to-[#1a3659] text-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
          <div className="w-14 h-14 rounded-xl bg-orange-500 text-white flex items-center justify-center mx-auto mb-4">
            <FileCheck size={26} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("certifications.requestTitle")}
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            {t("certifications.requestDesc")}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={`${prefix}/conctact-us`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-semibold transition-colors"
            >
              <FileText size={14} />
              {t("certifications.requestCta1")}
            </Link>
            <Link
              href={`${prefix}/factories`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur border border-white/30 hover:bg-white/20 text-white rounded-md text-sm font-semibold transition-colors"
            >
              <Factory size={14} />
              {t("certifications.requestCta2")}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
