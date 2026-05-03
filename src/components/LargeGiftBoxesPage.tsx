import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Check,
  Shield,
  Sparkles,
  Globe2,
  Box,
  Package,
  Archive,
  Layers,
  FolderArchive,
  Gift,
  Shirt,
  Briefcase,
  Wine,
  Megaphone,
  ShoppingCart,
  Ruler,
  Wrench,
  FileText,
  Boxes,
  Leaf,
  ShieldCheck,
} from "lucide-react";
import ContactForm from "./ContactForm";

export default function LargeGiftBoxesPage() {
  const t = useTranslations();
  const locale = useLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const three = [
    { icon: Shield, title: t("largeGift.three1Title"), desc: t("largeGift.three1Desc") },
    { icon: Sparkles, title: t("largeGift.three2Title"), desc: t("largeGift.three2Desc") },
    { icon: Globe2, title: t("largeGift.three3Title"), desc: t("largeGift.three3Desc") },
  ];

  const types = [
    { icon: Box, title: t("largeGift.type1Title"), desc: t("largeGift.type1Desc") },
    { icon: Package, title: t("largeGift.type2Title"), desc: t("largeGift.type2Desc") },
    { icon: Boxes, title: t("largeGift.type3Title"), desc: t("largeGift.type3Desc") },
    { icon: Layers, title: t("largeGift.type4Title"), desc: t("largeGift.type4Desc") },
    { icon: Archive, title: t("largeGift.type5Title"), desc: t("largeGift.type5Desc") },
  ];

  const useCases = [
    { icon: Gift, title: t("largeGift.use1Title"), desc: t("largeGift.use1Desc"), tint: "bg-red-100 text-red-700" },
    { icon: Shirt, title: t("largeGift.use2Title"), desc: t("largeGift.use2Desc"), tint: "bg-pink-100 text-pink-700" },
    { icon: Briefcase, title: t("largeGift.use3Title"), desc: t("largeGift.use3Desc"), tint: "bg-blue-100 text-blue-700" },
    { icon: Wine, title: t("largeGift.use4Title"), desc: t("largeGift.use4Desc"), tint: "bg-purple-100 text-purple-700" },
    { icon: Megaphone, title: t("largeGift.use5Title"), desc: t("largeGift.use5Desc"), tint: "bg-orange-100 text-orange-700" },
    { icon: ShoppingCart, title: t("largeGift.use6Title"), desc: t("largeGift.use6Desc"), tint: "bg-green-100 text-green-700" },
  ];

  const materials = [
    { icon: Ruler, title: t("largeGift.mat1Title"), desc: t("largeGift.mat1Desc") },
    { icon: Layers, title: t("largeGift.mat2Title"), desc: t("largeGift.mat2Desc") },
    { icon: FileText, title: t("largeGift.mat3Title"), desc: t("largeGift.mat3Desc") },
    { icon: Shield, title: t("largeGift.mat4Title"), desc: t("largeGift.mat4Desc") },
    { icon: Wrench, title: t("largeGift.mat5Title"), desc: t("largeGift.mat5Desc") },
    { icon: FolderArchive, title: t("largeGift.mat6Title"), desc: t("largeGift.mat6Desc") },
  ];

  const finishing = [
    t("largeGift.finish1"),
    t("largeGift.finish2"),
    t("largeGift.finish3"),
    t("largeGift.finish4"),
    t("largeGift.finish5"),
    t("largeGift.finish6"),
    t("largeGift.finish7"),
    t("largeGift.finish8"),
  ];

  const sustain = [
    t("largeGift.sustain1"),
    t("largeGift.sustain2"),
    t("largeGift.sustain3"),
    t("largeGift.sustain4"),
  ];

  return (
    <div>
      {/* Hero banner */}
      <section className="relative min-h-[600px] flex items-center bg-gray-900 overflow-hidden">
        <Image
          src="/media/black-man-opening-box-with-blue-balloons-while-pre-2025-06-19-19-20-51-utc.webp"
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
              {t("largeGift.badge")}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight tracking-tight">
              {t("largeGift.heroTitle")}
            </h1>
            <p className="text-lg md:text-xl text-orange-200 font-light mb-5">
              {t("largeGift.heroSubtitle")}
            </p>
            <p className="text-base text-gray-200 mb-8 leading-relaxed max-w-2xl">
              {t("largeGift.heroDesc")}
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

      {/* 3 pillars */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("largeGift.threeBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {t("largeGift.threeTitle")}
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

      {/* Box types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("largeGift.typesBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("largeGift.typesTitle")}
            </h2>
            <p className="text-gray-600">{t("largeGift.typesDesc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {types.map((type) => (
              <div
                key={type.title}
                className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                  <type.icon size={22} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{type.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("largeGift.useBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("largeGift.useTitle")}
            </h2>
            <p className="text-gray-600">{t("largeGift.useDesc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {useCases.map((u) => (
              <div
                key={u.title}
                className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className={`w-12 h-12 rounded-xl ${u.tint} flex items-center justify-center mb-4`}>
                  <u.icon size={22} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{u.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials + image */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/media/pretty-multiethnic-woman-standing-inside-blank-whi-2024-09-11-20-35-43-utc.webp"
              alt="Large gift box hampers"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("largeGift.materialsBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              {t("largeGift.materialsTitle")}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t("largeGift.materialsDesc")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {materials.map((m) => (
                <div key={m.title} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
                  <div className="w-9 h-9 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <m.icon size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-xs mb-0.5">{m.title}</h4>
                    <p className="text-xs text-gray-600 leading-snug">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Finishing */}
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {t("largeGift.finishTitle")}
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">{t("largeGift.finishDesc")}</p>
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

      {/* Sustainability */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center mb-4">
              <Leaf size={20} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("largeGift.sustainTitle")}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t("largeGift.sustainDesc")}
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
              src="/media/stacked-christmas-gift-boxes-with-a-red-ribbon-on-2025-11-11-18-53-53-utc.webp"
              alt="Stacked large gift boxes"
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
              {t("largeGift.formTitle")}
            </h2>
            <p className="text-gray-600">{t("largeGift.formDesc")}</p>
          </div>
          <ContactForm
            pageContext="Large Gift Boxes"
            companyLabel="Company / Brand"
            volume={{ label: "Approximate box dimensions", placeholder: "e.g. 40 × 30 × 15 cm" }}
            select={{
              label: "Box Type",
              options: [...types.map((tp) => tp.title), "Not sure — need design advice"],
            }}
            messageLabel="Project details *"
            messagePlaceholder="Use case (hamper, apparel set, corporate...), product weight, volume, finishing preferences, launch timeline..."
          />
        </div>
      </section>
    </div>
  );
}
