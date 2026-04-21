import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Check,
  Gem,
  Sparkles,
  Ruler,
  Heart,
  Star,
  Box,
  Archive,
  Briefcase,
  Layers,
  Magnet,
  FileText,
  Leaf,
  Send,
  ShieldCheck,
} from "lucide-react";
import HeroBackgroundVideo from "./HeroBackgroundVideo";

const HERO_VIDEO_ID = "I8U2KPfFDWU";

export default function JewelryBoxesPage() {
  const t = useTranslations();
  const locale = useLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const three = [
    { icon: Magnet, title: t("jewelry.three1Title"), desc: t("jewelry.three1Desc") },
    { icon: Sparkles, title: t("jewelry.three2Title"), desc: t("jewelry.three2Desc") },
    { icon: Ruler, title: t("jewelry.three3Title"), desc: t("jewelry.three3Desc") },
  ];

  const types = [
    { icon: Heart, title: t("jewelry.type1Title"), desc: t("jewelry.type1Desc") },
    { icon: Gem, title: t("jewelry.type2Title"), desc: t("jewelry.type2Desc") },
    { icon: Box, title: t("jewelry.type3Title"), desc: t("jewelry.type3Desc") },
    { icon: Star, title: t("jewelry.type4Title"), desc: t("jewelry.type4Desc") },
    { icon: Layers, title: t("jewelry.type5Title"), desc: t("jewelry.type5Desc") },
    { icon: Archive, title: t("jewelry.type6Title"), desc: t("jewelry.type6Desc") },
  ];

  const interior = [
    t("jewelry.int1"),
    t("jewelry.int2"),
    t("jewelry.int3"),
    t("jewelry.int4"),
    t("jewelry.int5"),
    t("jewelry.int6"),
    t("jewelry.int7"),
    t("jewelry.int8"),
  ];

  const materials = [
    { icon: Box, title: t("jewelry.mat1Title"), desc: t("jewelry.mat1Desc") },
    { icon: Sparkles, title: t("jewelry.mat2Title"), desc: t("jewelry.mat2Desc") },
    { icon: Layers, title: t("jewelry.mat3Title"), desc: t("jewelry.mat3Desc") },
    { icon: Magnet, title: t("jewelry.mat4Title"), desc: t("jewelry.mat4Desc") },
  ];

  const finishing = [
    t("jewelry.finish1"),
    t("jewelry.finish2"),
    t("jewelry.finish3"),
    t("jewelry.finish4"),
    t("jewelry.finish5"),
    t("jewelry.finish6"),
    t("jewelry.finish7"),
    t("jewelry.finish8"),
  ];

  const useCases = [
    { label: t("jewelry.use1"), icon: Heart },
    { label: t("jewelry.use2"), icon: Gem },
    { label: t("jewelry.use3"), icon: Sparkles },
    { label: t("jewelry.use4"), icon: ShieldCheck },
    { label: t("jewelry.use5"), icon: Star },
    { label: t("jewelry.use6"), icon: Briefcase },
  ];

  const sustain = [
    t("jewelry.sustain1"),
    t("jewelry.sustain2"),
    t("jewelry.sustain3"),
    t("jewelry.sustain4"),
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[620px] flex items-center bg-gray-900 overflow-hidden">
        <HeroBackgroundVideo
          videoId={HERO_VIDEO_ID}
          fallbackImage="/media/white-jewelry-boxes-on-brown-silk-background-2025-02-24-23-20-17-utc.webp"
          imageOpacity={0.55}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2340]/90 via-[#0d2340]/55 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-20 w-full">
          <div className="max-w-3xl text-white">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-orange-400 mb-4">
              {t("jewelry.badge")}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight tracking-tight">
              {t("jewelry.heroTitle")}
            </h1>
            <p className="text-lg md:text-xl text-orange-200 font-light mb-5">
              {t("jewelry.heroSubtitle")}
            </p>
            <p className="text-base text-gray-200 mb-8 leading-relaxed max-w-2xl">
              {t("jewelry.heroDesc")}
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
              {t("jewelry.threeBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {t("jewelry.threeTitle")}
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

      {/* Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("jewelry.typesBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("jewelry.typesTitle")}
            </h2>
            <p className="text-gray-600">{t("jewelry.typesDesc")}</p>
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

      {/* Interior craftsmanship */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/media/golden-earrings-and-jewelry-box-on-table-close-up-2025-02-24-18-56-50-utc.webp"
              alt="Gold earrings in jewelry box"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("jewelry.interiorBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              {t("jewelry.interiorTitle")}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t("jewelry.interiorDesc")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {interior.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-gray-700 leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="py-20 bg-[#0d2340] text-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest">
              {t("jewelry.materialsBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-3">
              {t("jewelry.materialsTitle")}
            </h2>
            <p className="text-gray-300">{t("jewelry.materialsDesc")}</p>
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

      {/* Finishing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div>
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("jewelry.finishBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              {t("jewelry.finishTitle")}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">{t("jewelry.finishDesc")}</p>
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
          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
              <Image src="/media/hotfoil-stamping.webp" alt="Hot foil stamping" fill className="object-cover" sizes="250px" />
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
              <Image src="/media/emboss.webp" alt="Embossing" fill className="object-cover" sizes="250px" />
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg col-span-2">
              <Image
                src="/media/two-long-jewelry-boxes-on-black-and-blue-backgroun-2025-02-24-18-56-17-utc.webp"
                alt="Long jewelry boxes"
                fill
                className="object-cover"
                sizes="500px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("jewelry.useBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("jewelry.useTitle")}
            </h2>
            <p className="text-gray-600">{t("jewelry.useDesc")}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {useCases.map((u) => (
              <div
                key={u.label}
                className="p-5 bg-white rounded-xl flex flex-col items-center gap-2 border border-gray-100 hover:border-orange-200 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                  <u.icon size={18} />
                </div>
                <span className="text-xs font-semibold text-gray-700 text-center leading-tight">
                  {u.label}
                </span>
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
              {t("jewelry.sustainTitle")}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t("jewelry.sustainDesc")}
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
            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                href={`${prefix}/vietnam-xinyuanjia`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-orange-300 text-gray-700 rounded-md text-xs font-semibold transition-colors"
              >
                Vietnam Facility
                <ArrowRight size={12} />
              </Link>
              <Link
                href={`${prefix}/dongguan-xinyuan-printing-factory`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-orange-300 text-gray-700 rounded-md text-xs font-semibold transition-colors"
              >
                China Facility
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/media/colorful-jewelry-displayed-in-decorative-box-on-te-2025-08-26-13-08-32-utc.webp"
              alt="Colorful jewelry in decorative box"
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
              {t("jewelry.formTitle")}
            </h2>
            <p className="text-gray-600">{t("jewelry.formDesc")}</p>
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
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Jewelry Type</label>
                  <select name="jewelry_type" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option>Rings</option>
                    <option>Necklaces / Pendants</option>
                    <option>Bracelets</option>
                    <option>Watches</option>
                    <option>Earrings</option>
                    <option>Multi-item Sets</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Preferred Box Type</label>
                <select name="box_type" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                  {types.map((tp) => <option key={tp.title}>{tp.title}</option>)}
                  <option>Not sure — need design advice</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Project details *</label>
                <textarea name="message" rows={5} required placeholder="Piece dimensions, interior lining preference (velvet / silk / satin / foam), hinge type, closure, finishing (foil, emboss, soft-touch), target volume, brand guidelines..." className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none" />
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
