import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Check,
  Magnet,
  RefreshCw,
  Package,
  BookOpen,
  Box,
  Archive,
  Layers,
  Ruler,
  ShieldCheck,
  Zap,
  Sparkles,
  Heart,
  Cpu,
  Briefcase,
  Utensils,
  Gift,
  Send,
  Leaf,
} from "lucide-react";
import HeroBackgroundVideo from "./HeroBackgroundVideo";

const HERO_VIDEO_ID = "I8U2KPfFDWU";

export default function MagneticClosurePage() {
  const t = useTranslations();
  const locale = useLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const three = [
    { icon: Magnet, title: t("magnetic.three1Title"), desc: t("magnetic.three1Desc") },
    { icon: RefreshCw, title: t("magnetic.three2Title"), desc: t("magnetic.three2Desc") },
    { icon: Package, title: t("magnetic.three3Title"), desc: t("magnetic.three3Desc") },
  ];

  const styles = [
    { icon: Magnet, title: t("magnetic.style1Title"), desc: t("magnetic.style1Desc") },
    { icon: BookOpen, title: t("magnetic.style2Title"), desc: t("magnetic.style2Desc") },
    { icon: Box, title: t("magnetic.style3Title"), desc: t("magnetic.style3Desc") },
    { icon: Archive, title: t("magnetic.style4Title"), desc: t("magnetic.style4Desc") },
  ];

  const specs = [
    { icon: Layers, title: t("magnetic.spec1Title"), desc: t("magnetic.spec1Desc") },
    { icon: Magnet, title: t("magnetic.spec2Title"), desc: t("magnetic.spec2Desc") },
    { icon: Ruler, title: t("magnetic.spec3Title"), desc: t("magnetic.spec3Desc") },
    { icon: Zap, title: t("magnetic.spec4Title"), desc: t("magnetic.spec4Desc") },
  ];

  const materials = [
    t("magnetic.mat1"),
    t("magnetic.mat2"),
    t("magnetic.mat3"),
    t("magnetic.mat4"),
    t("magnetic.mat5"),
    t("magnetic.mat6"),
  ];

  const finishing = [
    t("magnetic.finish1"),
    t("magnetic.finish2"),
    t("magnetic.finish3"),
    t("magnetic.finish4"),
    t("magnetic.finish5"),
    t("magnetic.finish6"),
    t("magnetic.finish7"),
    t("magnetic.finish8"),
  ];

  const inserts = [
    t("magnetic.insert1"),
    t("magnetic.insert2"),
    t("magnetic.insert3"),
    t("magnetic.insert4"),
    t("magnetic.insert5"),
    t("magnetic.insert6"),
  ];

  const useCases = [
    { icon: Sparkles, title: t("magnetic.use1Title"), desc: t("magnetic.use1Desc"), tint: "bg-pink-100 text-pink-700" },
    { icon: RefreshCw, title: t("magnetic.use2Title"), desc: t("magnetic.use2Desc"), tint: "bg-orange-100 text-orange-700" },
    { icon: Heart, title: t("magnetic.use3Title"), desc: t("magnetic.use3Desc"), tint: "bg-red-100 text-red-700" },
    { icon: Cpu, title: t("magnetic.use4Title"), desc: t("magnetic.use4Desc"), tint: "bg-blue-100 text-blue-700" },
    { icon: Briefcase, title: t("magnetic.use5Title"), desc: t("magnetic.use5Desc"), tint: "bg-slate-100 text-slate-700" },
    { icon: Utensils, title: t("magnetic.use6Title"), desc: t("magnetic.use6Desc"), tint: "bg-amber-100 text-amber-700" },
  ];

  const sustain = [
    t("magnetic.sustain1"),
    t("magnetic.sustain2"),
    t("magnetic.sustain3"),
    t("magnetic.sustain4"),
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[620px] flex items-center bg-gray-900 overflow-hidden">
        <HeroBackgroundVideo
          videoId={HERO_VIDEO_ID}
          fallbackImage="/media/black-box-isolated-on-a-white-background-2025-02-02-20-00-39-utc-1.webp"
          imageOpacity={0.55}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2340]/90 via-[#0d2340]/55 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-20 w-full">
          <div className="max-w-3xl text-white">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-orange-400 mb-4">
              {t("magnetic.badge")}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight tracking-tight">
              {t("magnetic.heroTitle")}
            </h1>
            <p className="text-lg md:text-xl text-orange-200 font-light mb-5">
              {t("magnetic.heroSubtitle")}
            </p>
            <p className="text-base text-gray-200 mb-8 leading-relaxed max-w-2xl">
              {t("magnetic.heroDesc")}
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
              {t("magnetic.threeBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {t("magnetic.threeTitle")}
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
              {t("magnetic.introBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-5">
              {t("magnetic.introTitle")}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              {t("magnetic.introBody")}
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/media/pair-of-shoes-in-a-box-on-a-white-background-2025-02-06-05-29-16-utc.webp"
              alt="Magnetic gift box with shoes"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Box styles */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("magnetic.stylesBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("magnetic.stylesTitle")}
            </h2>
            <p className="text-gray-600">{t("magnetic.stylesDesc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {styles.map((s) => (
              <div
                key={s.title}
                className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                  <s.icon size={22} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical specs (navy) */}
      <section className="py-20 bg-[#0d2340] text-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest">
              {t("magnetic.specsBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-3">
              {t("magnetic.specsTitle")}
            </h2>
            <p className="text-gray-300">{t("magnetic.specsDesc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {specs.map((s) => (
              <div
                key={s.title}
                className="p-6 rounded-xl bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="w-11 h-11 rounded-lg bg-orange-500 text-white flex items-center justify-center mb-3">
                  <s.icon size={20} />
                </div>
                <h3 className="font-bold text-white mb-2 text-sm">{s.title}</h3>
                <p className="text-xs text-gray-300 leading-snug">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials + finishing split */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("magnetic.materialsBadge")}
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
              {t("magnetic.materialsTitle")}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">{t("magnetic.materialsDesc")}</p>
            <ul className="space-y-2.5">
              {materials.map((m, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-orange-500 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  </div>
                  <span className="text-sm text-gray-700 leading-snug">{m}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("magnetic.finishTitle")}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">{t("magnetic.finishDesc")}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {finishing.map((f, i) => (
                <div key={i} className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg">
                  <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-gray-700 leading-snug">{f}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interior inserts */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
            <Image
              src="/media/emboss.webp"
              alt="Embossed magnetic closure box detail"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("magnetic.insertsBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              {t("magnetic.insertsTitle")}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">{t("magnetic.insertsDesc")}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {inserts.map((i, idx) => (
                <div key={idx} className="flex items-start gap-2 p-3 bg-white rounded-lg border border-gray-100">
                  <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-gray-700 leading-snug">{i}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("magnetic.useBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("magnetic.useTitle")}
            </h2>
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

      {/* Sustainability */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center mb-4">
              <Leaf size={20} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("magnetic.sustainTitle")}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">{t("magnetic.sustainDesc")}</p>
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
              {["FSC®", "ISO 9001", "SMETA-4P", "GMI", "G7®"].map((c) => (
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
              src="/media/hotfoil-stamping.webp"
              alt="Hot foil finishing on magnetic gift box"
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
              {t("magnetic.formTitle")}
            </h2>
            <p className="text-gray-600">{t("magnetic.formDesc")}</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
            <form className="space-y-4" action="mailto:info@jinhaoxy.com" method="post" encType="text/plain">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Name *</label>
                  <input type="text" name="name" required className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email *</label>
                  <input type="email" name="email" required className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Brand</label>
                  <input type="text" name="brand" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Box Style</label>
                  <select name="style" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    {styles.map((s) => <option key={s.title}>{s.title}</option>)}
                    <option>Not sure — need design advice</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Closure feel preference</label>
                <select name="closure_feel" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                  <option>Strong snap (premium, secure)</option>
                  <option>Medium (balanced)</option>
                  <option>Soft close (elegant, easy)</option>
                  <option>Collapsible / flat-pack for shipping</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Project details *</label>
                <textarea name="message" rows={5} required placeholder="Product dimensions, weight, volume, insert type (foam / cardboard / velvet), finishing, brand guidelines, launch timeline..." className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none" />
              </div>
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-semibold transition-colors">
                <Send size={14} />
                Submit
              </button>
              <p className="text-xs text-gray-500 text-center">We'll respond within 1 business day.</p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
