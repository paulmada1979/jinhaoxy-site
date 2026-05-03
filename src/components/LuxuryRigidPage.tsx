import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Check,
  Magnet,
  Layers,
  BookOpen,
  Box,
  Archive,
  Sparkles,
  Stamp,
  Droplets,
  Wand2,
  Shirt,
  FileText,
  Gem,
  Cpu,
  Wine,
  Briefcase,
  Heart,
  Leaf,
  ShieldCheck,
  Lightbulb,
  Pencil,
  Factory,
} from "lucide-react";
import ContactForm from "./ContactForm";
export default function LuxuryRigidPage() {
  const t = useTranslations();
  const locale = useLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const features = [
    t("luxuryRigid.feat1"),
    t("luxuryRigid.feat2"),
    t("luxuryRigid.feat3"),
    t("luxuryRigid.feat4"),
  ];

  const types = [
    { icon: Magnet, title: t("luxuryRigid.type1Title"), desc: t("luxuryRigid.type1Desc") },
    { icon: Layers, title: t("luxuryRigid.type2Title"), desc: t("luxuryRigid.type2Desc") },
    { icon: BookOpen, title: t("luxuryRigid.type3Title"), desc: t("luxuryRigid.type3Desc") },
    { icon: Box, title: t("luxuryRigid.type4Title"), desc: t("luxuryRigid.type4Desc") },
    { icon: Archive, title: t("luxuryRigid.type5Title"), desc: t("luxuryRigid.type5Desc") },
  ];

  const finishing = [
    { icon: Stamp, title: t("luxuryRigid.finish1Title"), desc: t("luxuryRigid.finish1Desc") },
    { icon: Sparkles, title: t("luxuryRigid.finish2Title"), desc: t("luxuryRigid.finish2Desc") },
    { icon: Droplets, title: t("luxuryRigid.finish3Title"), desc: t("luxuryRigid.finish3Desc") },
    { icon: Layers, title: t("luxuryRigid.finish4Title"), desc: t("luxuryRigid.finish4Desc") },
    { icon: Wand2, title: t("luxuryRigid.finish5Title"), desc: t("luxuryRigid.finish5Desc") },
    { icon: Shirt, title: t("luxuryRigid.finish6Title"), desc: t("luxuryRigid.finish6Desc") },
  ];

  const materials = [
    { icon: Box, title: t("luxuryRigid.mat1Title"), desc: t("luxuryRigid.mat1Desc") },
    { icon: FileText, title: t("luxuryRigid.mat2Title"), desc: t("luxuryRigid.mat2Desc") },
    { icon: Layers, title: t("luxuryRigid.mat3Title"), desc: t("luxuryRigid.mat3Desc") },
    { icon: Magnet, title: t("luxuryRigid.mat4Title"), desc: t("luxuryRigid.mat4Desc") },
  ];

  const industries = [
    { icon: Sparkles, label: t("luxuryRigid.ind1") },
    { icon: Gem, label: t("luxuryRigid.ind2") },
    { icon: Cpu, label: t("luxuryRigid.ind3") },
    { icon: Wine, label: t("luxuryRigid.ind4") },
    { icon: Shirt, label: t("luxuryRigid.ind5") },
    { icon: Briefcase, label: t("luxuryRigid.ind6") },
  ];

  const sustain = [
    t("luxuryRigid.sustain1"),
    t("luxuryRigid.sustain2"),
    t("luxuryRigid.sustain3"),
    t("luxuryRigid.sustain4"),
  ];

  const process = [
    { icon: Lightbulb, title: t("luxuryRigid.process1Title"), desc: t("luxuryRigid.process1Desc") },
    { icon: Pencil, title: t("luxuryRigid.process2Title"), desc: t("luxuryRigid.process2Desc") },
    { icon: Heart, title: t("luxuryRigid.process3Title"), desc: t("luxuryRigid.process3Desc") },
    { icon: Factory, title: t("luxuryRigid.process4Title"), desc: t("luxuryRigid.process4Desc") },
  ];

  return (
    <div>
      {/* Hero banner */}
      <section className="relative min-h-[620px] flex items-center bg-gray-900 overflow-hidden">
        <Image
          src="/media/blank-box-package-for-mobile-phone-or-other-things-2024-09-06-02-35-03-utc.webp"
          alt=""
          fill
          priority
          className="object-cover object-center"
          style={{ opacity: 0.55 }}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2340]/90 via-[#0d2340]/55 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-20 w-full">
          <div className="max-w-3xl text-white">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-orange-400 mb-4">
              {t("luxuryRigid.badge")}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight tracking-tight">
              {t("luxuryRigid.heroTitle")}
            </h1>
            <p className="text-lg md:text-xl text-orange-200 font-light mb-5">
              {t("luxuryRigid.heroSubtitle")}
            </p>
            <p className="text-base text-gray-200 mb-8 leading-relaxed max-w-2xl">
              {t("luxuryRigid.heroDesc")}
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

      {/* Feature strip */}
      <section className="py-10 bg-orange-50 border-y border-orange-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-6">
            <h3 className="text-base font-semibold text-gray-900">{t("luxuryRigid.featuresTitle")}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-2 bg-white rounded-lg p-3 border border-orange-100">
                <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={12} strokeWidth={3} />
                </div>
                <p className="text-xs text-gray-700 leading-snug">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
              {t("luxuryRigid.featIntroTitle")}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              {t("luxuryRigid.featIntroBody")}
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/media/gift-box-package-2025-01-29-01-31-06-utc.webp"
              alt="Premium gift box packaging"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* 5 Box types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("luxuryRigid.typesBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("luxuryRigid.typesTitle")}
            </h2>
            <p className="text-gray-600">{t("luxuryRigid.typesDesc")}</p>
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
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{type.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Finishing techniques */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("luxuryRigid.finishBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("luxuryRigid.finishTitle")}
            </h2>
            <p className="text-gray-600">{t("luxuryRigid.finishDesc")}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image src="/media/hotfoil-stamping.webp" alt="Hot foil stamping" fill className="object-cover" sizes="400px" />
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image src="/media/emboss.webp" alt="Embossing" fill className="object-cover" sizes="400px" />
              </div>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {finishing.map((f) => (
                <div
                  key={f.title}
                  className="p-5 rounded-xl bg-gray-50 border border-gray-100 hover:border-orange-200 hover:bg-white hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-orange-500 text-white flex items-center justify-center mb-3">
                    <f.icon size={18} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1.5 text-sm">{f.title}</h3>
                  <p className="text-xs text-gray-600 leading-snug">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Materials & construction */}
      <section className="py-20 bg-[#0d2340] text-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest">
              {t("luxuryRigid.materialsBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-3">
              {t("luxuryRigid.materialsTitle")}
            </h2>
            <p className="text-gray-300">{t("luxuryRigid.materialsDesc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {materials.map((m) => (
              <div
                key={m.title}
                className="p-6 rounded-xl bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="w-11 h-11 rounded-lg bg-orange-500 text-white flex items-center justify-center mb-3">
                  <m.icon size={20} />
                </div>
                <h3 className="font-bold text-white mb-2 text-sm">{m.title}</h3>
                <p className="text-xs text-gray-300 leading-snug">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("luxuryRigid.industriesBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("luxuryRigid.industriesTitle")}
            </h2>
            <p className="text-gray-600">{t("luxuryRigid.industriesDesc")}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
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

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("luxuryRigid.processBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {t("luxuryRigid.processTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            {process.map((step, i) => (
              <div key={step.title} className="relative">
                <div className="p-6 rounded-2xl bg-white border border-gray-200 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center">
                      {i + 1}
                    </div>
                    <step.icon size={20} className="text-orange-500" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainable luxury */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center mb-4">
              <Leaf size={20} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("luxuryRigid.sustainTitle")}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t("luxuryRigid.sustainDesc")}
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
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/media/front-view-of-woman-perfume-on-a-gift-box-on-red-r-2025-02-10-05-12-30-utc.webp"
              alt="Luxury gift box with perfume"
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
              {t("luxuryRigid.formTitle")}
            </h2>
            <p className="text-gray-600">{t("luxuryRigid.formDesc")}</p>
          </div>
          <ContactForm
            pageContext="Luxury Rigid Gift Boxes"
            companyLabel="Brand"
            select={{
              label: "Preferred Box Style",
              options: [...types.map((tp) => tp.title), "Not sure — need design advice"],
            }}
            messageLabel="Project details *"
            messagePlaceholder="Product dimensions, target volume, preferred finishings (hot foil, emboss, soft-touch...), brand guidelines, launch timeline, industry (cosmetics / jewelry / spirits / fashion / etc.)..."
          />
        </div>
      </section>
    </div>
  );
}
