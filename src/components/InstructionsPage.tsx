import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Check,
  BookOpen,
  Languages,
  FileText,
  Stethoscope,
  Package,
  ShoppingBag,
  ShieldCheck,
  Scale,
  FlaskConical,
  Globe,
  QrCode,
  FileCheck,
  Layers,
  Palette,
  Printer,
  Binary,
  Sparkles,
  Cpu,
  Home,
  Heart,
  Car,
  Utensils,
  Baby,
  Tag,
  Factory,
  Leaf,
  Eye,
  Shield,
} from "lucide-react";
import ContactForm from "./ContactForm";
import HeroBackgroundVideo from "./HeroBackgroundVideo";

const HERO_VIDEO_ID = "RRjV8K_S42k";

export default function InstructionsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const heroUsps = [
    t("instructions.heroUsp1"),
    t("instructions.heroUsp2"),
    t("instructions.heroUsp3"),
    t("instructions.heroUsp4"),
  ];

  const three = [
    { icon: Eye, title: t("instructions.three1Title"), desc: t("instructions.three1Desc") },
    { icon: Shield, title: t("instructions.three2Title"), desc: t("instructions.three2Desc") },
    { icon: Scale, title: t("instructions.three3Title"), desc: t("instructions.three3Desc") },
  ];

  const categories = [
    { icon: BookOpen, title: t("instructions.cat1Title"), desc: t("instructions.cat1Desc") },
    { icon: Languages, title: t("instructions.cat2Title"), desc: t("instructions.cat2Desc") },
    { icon: FileText, title: t("instructions.cat3Title"), desc: t("instructions.cat3Desc") },
    { icon: Stethoscope, title: t("instructions.cat4Title"), desc: t("instructions.cat4Desc") },
    { icon: Package, title: t("instructions.cat5Title"), desc: t("instructions.cat5Desc") },
    { icon: ShoppingBag, title: t("instructions.cat6Title"), desc: t("instructions.cat6Desc") },
  ];

  const compliance = [
    { icon: ShieldCheck, title: t("instructions.comp1Title"), desc: t("instructions.comp1Desc") },
    { icon: FlaskConical, title: t("instructions.comp2Title"), desc: t("instructions.comp2Desc") },
    { icon: Stethoscope, title: t("instructions.comp3Title"), desc: t("instructions.comp3Desc") },
    { icon: FileCheck, title: t("instructions.comp4Title"), desc: t("instructions.comp4Desc") },
    { icon: Globe, title: t("instructions.comp5Title"), desc: t("instructions.comp5Desc") },
    { icon: QrCode, title: t("instructions.comp6Title"), desc: t("instructions.comp6Desc") },
  ];

  const specs = [
    { icon: Layers, title: t("instructions.spec1Title"), desc: t("instructions.spec1Desc") },
    { icon: Sparkles, title: t("instructions.spec2Title"), desc: t("instructions.spec2Desc") },
    { icon: BookOpen, title: t("instructions.spec3Title"), desc: t("instructions.spec3Desc") },
    { icon: Palette, title: t("instructions.spec4Title"), desc: t("instructions.spec4Desc") },
    { icon: Languages, title: t("instructions.spec5Title"), desc: t("instructions.spec5Desc") },
    { icon: Binary, title: t("instructions.spec6Title"), desc: t("instructions.spec6Desc") },
  ];

  const industries = [
    { icon: Cpu, title: t("instructions.ind1Title"), desc: t("instructions.ind1Desc"), tint: "bg-blue-100 text-blue-700" },
    { icon: Home, title: t("instructions.ind2Title"), desc: t("instructions.ind2Desc"), tint: "bg-amber-100 text-amber-700" },
    { icon: Heart, title: t("instructions.ind3Title"), desc: t("instructions.ind3Desc"), tint: "bg-pink-100 text-pink-700" },
    { icon: Stethoscope, title: t("instructions.ind4Title"), desc: t("instructions.ind4Desc"), tint: "bg-teal-100 text-teal-700" },
    { icon: Car, title: t("instructions.ind5Title"), desc: t("instructions.ind5Desc"), tint: "bg-slate-100 text-slate-700" },
    { icon: Utensils, title: t("instructions.ind6Title"), desc: t("instructions.ind6Desc"), tint: "bg-green-100 text-green-700" },
    { icon: Baby, title: t("instructions.ind7Title"), desc: t("instructions.ind7Desc"), tint: "bg-purple-100 text-purple-700" },
    { icon: Tag, title: t("instructions.ind8Title"), desc: t("instructions.ind8Desc"), tint: "bg-orange-100 text-orange-700" },
  ];

  const sustain = [
    t("instructions.sustain1"),
    t("instructions.sustain2"),
    t("instructions.sustain3"),
    t("instructions.sustain4"),
    t("instructions.sustain5"),
    t("instructions.sustain6"),
  ];

  const hubs = [
    { title: t("instructions.hub1Title"), desc: t("instructions.hub1Desc") },
    { title: t("instructions.hub2Title"), desc: t("instructions.hub2Desc") },
    { title: t("instructions.hub3Title"), desc: t("instructions.hub3Desc") },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[640px] flex items-center bg-gray-900 overflow-hidden">
        <HeroBackgroundVideo
          videoId={HERO_VIDEO_ID}
          fallbackImage="/media/woman-is-reading-instruction-manual-while-assembli-2025-03-12-22-25-39-utc.jpg"
          imageOpacity={0.5}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2340]/92 via-[#0d2340]/60 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-20 w-full">
          <div className="max-w-3xl text-white">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-orange-400 mb-4">
              {t("instructions.badge")}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight tracking-tight">
              {t("instructions.heroTitle")}
            </h1>
            <p className="text-lg md:text-xl text-orange-200 font-light mb-5">
              {t("instructions.heroSubtitle")}
            </p>
            <p className="text-base text-gray-200 mb-8 leading-relaxed max-w-2xl">
              {t("instructions.heroDesc")}
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

      {/* 3 pillars */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("instructions.threeBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {t("instructions.threeTitle")}
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
              {t("instructions.introBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-5">
              {t("instructions.introTitle")}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              {t("instructions.introBody")}
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/media/caucasian-young-man-reads-book-instructions-for-as-2025-03-06-10-10-45-utc.jpg"
              alt="Man reading printed instruction manual"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Product categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("instructions.categoriesBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("instructions.categoriesTitle")}
            </h2>
            <p className="text-gray-600">{t("instructions.categoriesDesc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((c) => (
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

      {/* Regulatory & Compliance (navy) */}
      <section className="py-20 bg-[#0d2340] text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest">
              {t("instructions.complianceBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-3">
              {t("instructions.complianceTitle")}
            </h2>
            <p className="text-gray-300">{t("instructions.complianceDesc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {compliance.map((c) => (
              <div
                key={c.title}
                className="p-6 rounded-xl bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="w-11 h-11 rounded-lg bg-orange-500 text-white flex items-center justify-center mb-3">
                  <c.icon size={20} />
                </div>
                <h3 className="font-bold text-white mb-2 text-sm">{c.title}</h3>
                <p className="text-xs text-gray-300 leading-snug">{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-10">
            {["CE", "FDA", "MDR 2017/745", "REACH", "RoHS", "UKCA", "ISO 9001", "ISO 14001", "G7®", "FSC®"].map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-semibold text-white"
              >
                <ShieldCheck size={11} className="text-orange-400" />
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Production capabilities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("instructions.specsBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {t("instructions.specsTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {specs.map((s) => (
              <div
                key={s.title}
                className="p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-white border border-orange-100 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center mb-4">
                  <s.icon size={22} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("instructions.industriesBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {t("instructions.industriesTitle")}
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
              {t("instructions.sustainTitle")}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">{t("instructions.sustainDesc")}</p>
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
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/media/multiethnic-employees-sitting-at-table-with-papers-2025-03-26-03-01-04-utc.jpg"
              alt="Team reviewing printed documents"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Production hubs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("instructions.hubsBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("instructions.hubsTitle")}
            </h2>
            <p className="text-gray-600">{t("instructions.hubsDesc")}</p>
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

      {/* Quote form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("instructions.formTitle")}
            </h2>
            <p className="text-gray-600">{t("instructions.formDesc")}</p>
          </div>
          <ContactForm
            pageContext="Instructions & Manuals"
            select={{
              label: "Product Type",
              options: [
                "Product Manual",
                "Multi-Language Leaflet",
                "Assembly Booklet",
                "Pharma / Medical IFU",
                "Retail Box Insert",
                "E-commerce Unboxing Insert",
                "Other",
              ],
            }}
            messageLabel="Specifications *"
            messagePlaceholder="Page count, number of languages, paper weight (gsm), binding (saddle stitch / perfect / spiral / folded leaflet), finishing (lamination / spot UV), quantity, destination market (EU / US / UK / global), compliance requirements (CE / FDA / MDR), launch timeline..."
          />
        </div>
      </section>
    </div>
  );
}
