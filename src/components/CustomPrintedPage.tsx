import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Check,
  Palette,
  Ruler,
  Sparkles,
  Printer,
  Layers,
  SwatchBook,
  FileText,
  Package,
  FolderArchive,
  Box,
  Gift,
  ShieldCheck,
  Leaf,
  Cpu,
  Shirt,
  Gem,
  RefreshCw,
  Calendar,
  Briefcase,
  Award,
} from "lucide-react";
import ContactForm from "./ContactForm";
export default function CustomPrintedPage() {
  const t = useTranslations();
  const locale = useLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const three = [
    { icon: Palette, title: t("customPrinted.three1Title"), desc: t("customPrinted.three1Desc") },
    { icon: Ruler, title: t("customPrinted.three2Title"), desc: t("customPrinted.three2Desc") },
    { icon: Sparkles, title: t("customPrinted.three3Title"), desc: t("customPrinted.three3Desc") },
  ];

  const techs = [
    { icon: Printer, title: t("customPrinted.tech1Title"), desc: t("customPrinted.tech1Desc") },
    { icon: Layers, title: t("customPrinted.tech2Title"), desc: t("customPrinted.tech2Desc") },
    { icon: SwatchBook, title: t("customPrinted.tech3Title"), desc: t("customPrinted.tech3Desc") },
    { icon: FileText, title: t("customPrinted.tech4Title"), desc: t("customPrinted.tech4Desc") },
  ];

  const products = [
    { icon: Gift, title: t("customPrinted.prod1Title"), desc: t("customPrinted.prod1Desc") },
    { icon: Package, title: t("customPrinted.prod2Title"), desc: t("customPrinted.prod2Desc") },
    { icon: Box, title: t("customPrinted.prod3Title"), desc: t("customPrinted.prod3Desc") },
    { icon: Sparkles, title: t("customPrinted.prod4Title"), desc: t("customPrinted.prod4Desc") },
    { icon: FolderArchive, title: t("customPrinted.prod5Title"), desc: t("customPrinted.prod5Desc") },
  ];

  const finishing = [
    t("customPrinted.finish1"),
    t("customPrinted.finish2"),
    t("customPrinted.finish3"),
    t("customPrinted.finish4"),
    t("customPrinted.finish5"),
    t("customPrinted.finish6"),
    t("customPrinted.finish7"),
    t("customPrinted.finish8"),
  ];

  const industries = [
    { icon: Sparkles, label: t("customPrinted.ind1") },
    { icon: Cpu, label: t("customPrinted.ind2") },
    { icon: Shirt, label: t("customPrinted.ind3") },
    { icon: Gem, label: t("customPrinted.ind4") },
    { icon: Gift, label: t("customPrinted.ind5") },
    { icon: RefreshCw, label: t("customPrinted.ind6") },
    { icon: Calendar, label: t("customPrinted.ind7") },
    { icon: Briefcase, label: t("customPrinted.ind8") },
  ];

  const specs = [
    { title: t("customPrinted.spec1Title"), desc: t("customPrinted.spec1Desc") },
    { title: t("customPrinted.spec2Title"), desc: t("customPrinted.spec2Desc") },
    { title: t("customPrinted.spec3Title"), desc: t("customPrinted.spec3Desc") },
    { title: t("customPrinted.spec4Title"), desc: t("customPrinted.spec4Desc") },
  ];

  const sustain = [
    t("customPrinted.sustain1"),
    t("customPrinted.sustain2"),
    t("customPrinted.sustain3"),
    t("customPrinted.sustain4"),
  ];

  return (
    <div>
      {/* Hero banner */}
      <section className="relative min-h-[600px] flex items-center bg-gray-900 overflow-hidden">
        <Image
          src="/media/happy-mothers-day-2025-02-24-14-44-31-utc.webp"
          alt=""
          fill
          priority
          className="object-cover object-center"
          style={{ opacity: 0.5 }}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2340]/90 via-[#0d2340]/55 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-20 w-full">
          <div className="max-w-3xl text-white">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-orange-400 mb-4">
              {t("customPrinted.badge")}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight tracking-tight">
              {t("customPrinted.heroTitle")}
            </h1>
            <p className="text-lg md:text-xl text-orange-200 font-light mb-5">
              {t("customPrinted.heroSubtitle")}
            </p>
            <p className="text-base text-gray-200 mb-8 leading-relaxed max-w-2xl">
              {t("customPrinted.heroDesc")}
            </p>
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

      {/* 3 key benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("customPrinted.threeBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {t("customPrinted.threeTitle")}
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

      {/* Printing tech */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("customPrinted.techBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              {t("customPrinted.techTitle")}
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">{t("customPrinted.techDesc")}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {techs.map((tch) => (
                <div key={tch.title} className="p-4 bg-white rounded-xl border border-gray-100">
                  <div className="w-9 h-9 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center mb-2">
                    <tch.icon size={16} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{tch.title}</h3>
                  <p className="text-xs text-gray-600 leading-snug">{tch.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/media/stack-of-gift-boxes-with-christmas-decorations-2025-03-08-05-01-27-utc.webp"
              alt="Stack of custom printed gift boxes with Christmas decorations"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Product range */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("customPrinted.productsBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("customPrinted.productsTitle")}
            </h2>
            <p className="text-gray-600">{t("customPrinted.productsDesc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p) => (
              <div
                key={p.title}
                className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                  <p.icon size={22} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Finishing options */}
      <section className="py-20 bg-[#0d2340] text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                <Image src="/media/hotfoil-stamping.webp" alt="Hot foil stamping" fill className="object-cover" sizes="300px" />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                <Image src="/media/emboss.webp" alt="Embossing" fill className="object-cover" sizes="300px" />
              </div>
            </div>
            <div>
              <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest">
                {t("customPrinted.finishBadge")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-3">
                {t("customPrinted.finishTitle")}
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">{t("customPrinted.finishDesc")}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {finishing.map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <p className="text-sm text-gray-200 leading-snug">{f}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("customPrinted.industriesBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("customPrinted.industriesTitle")}
            </h2>
            <p className="text-gray-600">{t("customPrinted.industriesDesc")}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {industries.map((i) => (
              <div
                key={i.label}
                className="p-5 bg-gray-50 rounded-xl flex flex-col items-center gap-2 hover:bg-orange-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-white text-orange-600 shadow-sm flex items-center justify-center">
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

      {/* Specs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("customPrinted.specsTitle")}
            </h2>
            <p className="text-gray-600">{t("customPrinted.specsDesc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {specs.map((s) => (
              <div
                key={s.title}
                className="p-6 bg-white rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-sm transition-all"
              >
                <p className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-2">
                  {s.title}
                </p>
                <p className="text-sm text-gray-700 leading-snug">{s.desc}</p>
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
              {t("customPrinted.sustainTitle")}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t("customPrinted.sustainDesc")}
            </p>
            <div className="space-y-2">
              {sustain.map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-gray-700 leading-snug">{s}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {["FSC®", "ISO 9001", "SMETA-4P", "GMI"].map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-700 shadow-sm"
                >
                  <ShieldCheck size={11} className="text-orange-500" />
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/media/nice-gift-box-with-candles-and-decor-2025-10-16-10-56-10-utc.webp"
              alt="Custom printed gift box with candles and decor"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Quote form */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("customPrinted.formTitle")}
            </h2>
            <p className="text-gray-600">{t("customPrinted.formDesc")}</p>
          </div>
          <ContactForm
            pageContext="Custom Printed Gift Boxes"
            companyLabel="Brand / Company"
            select={{
              label: "Box Type",
              options: [...products.map((p) => p.title), "Not sure — need design advice"],
            }}
            messageLabel="Project details *"
            messagePlaceholder="Box dimensions, volume, desired finishings (hot foil, emboss, holographic...), Pantone colors, artwork status (print-ready / needs cleanup / starting from scratch), launch timeline..."
          />
        </div>
      </section>
    </div>
  );
}
