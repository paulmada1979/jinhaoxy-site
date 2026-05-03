import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Box,
  Package,
  PackageCheck,
  PackageOpen,
  Boxes,
  LayoutGrid,
  Check,
  Printer,
  FlaskConical,
  Factory,
  ShieldCheck,
} from "lucide-react";
import ContactForm from "./ContactForm";
export default function ShippingBoxesPage() {
  const t = useTranslations();
  const locale = useLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const whyPoints = [
    t("shippingBoxes.why1"),
    t("shippingBoxes.why2"),
    t("shippingBoxes.why3"),
    t("shippingBoxes.why4"),
    t("shippingBoxes.why5"),
    t("shippingBoxes.why6"),
    t("shippingBoxes.why7"),
  ];

  const types = [
    { icon: Box, title: t("shippingBoxes.type1Title"), desc: t("shippingBoxes.type1Desc") },
    { icon: PackageCheck, title: t("shippingBoxes.type2Title"), desc: t("shippingBoxes.type2Desc") },
    { icon: Package, title: t("shippingBoxes.type3Title"), desc: t("shippingBoxes.type3Desc") },
    { icon: PackageOpen, title: t("shippingBoxes.type4Title"), desc: t("shippingBoxes.type4Desc") },
    { icon: Boxes, title: t("shippingBoxes.type5Title"), desc: t("shippingBoxes.type5Desc") },
    { icon: LayoutGrid, title: t("shippingBoxes.type6Title"), desc: t("shippingBoxes.type6Desc") },
  ];

  const boards = [
    { title: t("shippingBoxes.board1Title"), desc: t("shippingBoxes.board1Desc") },
    { title: t("shippingBoxes.board2Title"), desc: t("shippingBoxes.board2Desc") },
    { title: t("shippingBoxes.board3Title"), desc: t("shippingBoxes.board3Desc") },
    { title: t("shippingBoxes.board4Title"), desc: t("shippingBoxes.board4Desc") },
    { title: t("shippingBoxes.board5Title"), desc: t("shippingBoxes.board5Desc") },
    { title: t("shippingBoxes.board6Title"), desc: t("shippingBoxes.board6Desc") },
  ];

  const printing = [
    t("shippingBoxes.print1"),
    t("shippingBoxes.print2"),
    t("shippingBoxes.print3"),
    t("shippingBoxes.print4"),
    t("shippingBoxes.print5"),
    t("shippingBoxes.print6"),
  ];

  const testing = [
    t("shippingBoxes.test1"),
    t("shippingBoxes.test2"),
    t("shippingBoxes.test3"),
    t("shippingBoxes.test4"),
    t("shippingBoxes.test5"),
  ];

  const capabilities = [
    t("shippingBoxes.cap1"),
    t("shippingBoxes.cap2"),
    t("shippingBoxes.cap3"),
    t("shippingBoxes.cap4"),
    t("shippingBoxes.cap5"),
    t("shippingBoxes.cap6"),
    t("shippingBoxes.cap7"),
    t("shippingBoxes.cap8"),
  ];

  return (
    <div>
      {/* Hero banner */}
      <section className="relative min-h-[560px] flex items-center bg-gray-900 overflow-hidden">
        <Image
          src="/media/warehouse-workers-packing-boxes-for-shipment-2025-02-11-14-31-52-utc.webp"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2340]/90 via-[#0d2340]/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-20 w-full">
          <div className="max-w-3xl text-white">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-orange-400 mb-4">
              {t("shippingBoxes.badge")}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {t("shippingBoxes.heroTitle")}
            </h1>
            <p className="text-base md:text-lg text-gray-200 mb-8 leading-relaxed">
              {t("shippingBoxes.heroDesc")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`${prefix}/conctact-us`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-semibold transition-colors"
              >
                {t("shippingBoxes.heroCtaQuote")}
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
          <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
            {t("shippingBoxes.introBadge")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
            {t("shippingBoxes.introTitle")}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            {t("shippingBoxes.introBody")}
          </p>
        </div>
      </section>

      {/* Why us + image */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("shippingBoxes.whyBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-5">
              {t("shippingBoxes.whyTitle")}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t("shippingBoxes.whyDesc")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {whyPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-gray-700 leading-snug">{point}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/media/team-portrait-of-multi-ethnic-female-warehouse-wor-2025-04-03-22-26-42-utc.webp"
              alt="XinYuan Vietnam warehouse team"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">
              {t("shippingBoxes.typesBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {t("shippingBoxes.typesTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {types.map((type) => (
              <div
                key={type.title}
                className="p-6 rounded-xl bg-white border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className="w-11 h-11 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                  <type.icon size={20} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{type.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board flute types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("shippingBoxes.boardTitle")}
            </h2>
            <p className="text-gray-600">{t("shippingBoxes.boardDesc")}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {boards.map((board) => (
              <div
                key={board.title}
                className="p-5 rounded-lg bg-white border border-gray-100 shadow-sm hover:border-orange-200 hover:shadow-md transition-all"
              >
                <p className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">
                  {board.title}
                </p>
                <p className="text-sm text-gray-700 leading-snug">{board.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Printing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
            <Image
              src="/media/workers-open-steel-40-feet-container-doors-carry-b-2024-10-18-03-58-18-utc.webp"
              alt="Workers loading export cartons into a 40ft container"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 lg:order-2">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
              <Printer size={20} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("shippingBoxes.printingTitle")}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t("shippingBoxes.printingDesc")}
            </p>
            <ul className="space-y-2.5">
              {printing.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-orange-500 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  </div>
                  <span className="text-sm text-gray-700 leading-snug">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ISTA testing */}
      <section className="py-20 bg-[#0d2340] text-white">
        <div className="max-w-5xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="w-14 h-14 rounded-xl bg-orange-500 text-white flex items-center justify-center mx-auto mb-4">
              <FlaskConical size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              {t("shippingBoxes.testingTitle")}
            </h2>
            <p className="text-gray-300">{t("shippingBoxes.testingDesc")}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {testing.map((test, i) => (
              <div
                key={i}
                className="p-4 rounded-lg bg-white/5 backdrop-blur border border-white/10 text-center"
              >
                <div className="w-8 h-8 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center mx-auto mb-2">
                  {i + 1}
                </div>
                <p className="text-xs text-gray-200 leading-snug">{test}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4">
              <Factory size={20} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("shippingBoxes.capabilitiesTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className="p-4 rounded-lg bg-gray-50 border border-gray-100 flex items-start gap-2"
              >
                <ShieldCheck size={16} className="text-orange-500 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 leading-snug">{cap}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote request form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("shippingBoxes.formTitle")}
            </h2>
            <p className="text-gray-600">{t("shippingBoxes.formDesc")}</p>
          </div>
          <ContactForm
            pageContext="Shipping Boxes & Export Cartons"
            volume={{ label: "Est. Quantity", placeholder: "e.g. 10,000 boxes" }}
            select={{
              label: "Box Type",
              options: [...types.map((tp) => tp.title), "Not sure — need advice"],
            }}
            messagePlaceholder="Dimensions, material grade, print requirements, destination country, timeline..."
          />
        </div>
      </section>
    </div>
  );
}
