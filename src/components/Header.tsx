"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Globe, Mail, Phone, ChevronDown, Building2, Award, MapPin, ArrowRight } from "lucide-react";

// Toggle to show language switcher when translations are ready
const SHOW_LANGUAGE_SWITCHER = false;

const LOCALES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
];

function buildPackagingSolutions(t: (key: string) => string) {
  return [
    {
      title: t("megamenu.corrugated"),
      items: [
        { href: "/shipping-boxes-export-cartons", label: "Shipping Boxes & Export Cartons" },
        { href: "/e-commerce-mailer-boxes", label: "E-Commerce Mailer Boxes" },
        { href: "/cardboard-trays-inserts", label: "Cardboard Trays & Inserts" },
        { href: "/shelf-ready-packaging", label: "Shelf Ready Packaging" },
        { href: "/trays", label: "Corrugated Trays & Inserts" },
      ],
    },
    {
      title: t("megamenu.retail"),
      items: [
        { href: "/retail-packing", label: "Retail Packaging" },
        { href: "/consumer-packaging", label: "Consumer Packaging" },
        { href: "/folding-cartons", label: "Folding Cartons" },
      ],
    },
    {
      title: t("megamenu.gift"),
      items: [
        { href: "/luxury-rigid-gift-boxes", label: "Luxury Rigid Gift Boxes" },
        { href: "/custom-printed-gift-boxes", label: "Custom Printed Gift Boxes" },
        { href: "/large-gift-boxes", label: "Large Gift Boxes" },
        { href: "/custom-jewelry-gift-boxes", label: "Custom Jewelry Gift Boxes" },
        { href: "/magnetic-closure-gift-boxes", label: "Magnetic Closure Gift Boxes" },
        { href: "/collapsible-gift-boxes-for-e-commerce-retail", label: "Collapsible Gift Boxes" },
        { href: "/cosmetic-gift-boxes", label: "Cosmetic Gift Boxes" },
      ],
    },
    {
      title: t("megamenu.labels"),
      items: [
        { href: "/stickers-labels", label: "Adhesive Label & Sticker" },
        { href: "/artificial-boxes", label: "Artificial Boxes" },
        { href: "/instructions-manuals", label: "Instructions & Manuals" },
      ],
    },
  ];
}

const FACTORIES = [
  {
    href: "/vietnam-xinyuanjia",
    label: "Vietnam Xinyuanjia",
    location: "Bắc Ninh, Vietnam",
    size: "30,000 m² · Main factory",
    desc: "FSC® & ISO 9001 certified production hub serving export markets worldwide.",
    img: "/media/Banner-1.png",
  },
  {
    href: "/dongguan-xinyuan-printing-factory",
    label: "Dongguan Xinyuan Printing Factory",
    location: "Dongguan, China",
    size: "13,900 m² plant",
    desc: "Premium color boxes and board-game packaging on Roland and Komori press lines.",
    img: "/media/Dongguan-Xinyuan-Printing-Factory-Exterior-–-FSC-ISO-Certified-Packaging-Manufacturer.webp",
  },
];

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [packagingOpen, setPackagingOpen] = useState(false);
  const [factoriesOpen, setFactoriesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const PACKAGING_SOLUTIONS = buildPackagingSolutions(t);

  const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), "") || "/";
  const prefix = locale === "en" ? "" : `/${locale}`;

  function localePath(href: string, newLocale: string) {
    if (newLocale === "en") return href;
    return `/${newLocale}${href}`;
  }

  const currentLocale = LOCALES.find((l) => l.code === locale);

  return (
    <>
      {/* Top contact bar */}
      <div className="bg-[#0d2340] text-white text-xs border-b border-[#1a3659]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-gray-300">{t("topbar.consultation")}</span>
            <a href="mailto:info@jinhaoxy.com" className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
              <Mail size={12} />
              info@jinhaoxy.com
            </a>
            <Link href={`${prefix}/conctact-us`} className="hidden sm:flex items-center gap-1.5 hover:text-orange-400 transition-colors">
              <Phone size={12} />
              {t("topbar.contactUs")}
            </Link>
          </div>
          <span className="text-gray-400 hidden sm:block">{t("topbar.tagline")}</span>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 flex items-center gap-6">
          <Link
            href={locale === "en" ? "/" : `/${locale}`}
            className="shrink-0 flex items-center"
          >
            <Image
              src="/logo.webp"
              alt="Jinhao XinYuan"
              width={180}
              height={50}
              priority
              className="h-12 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1 ml-auto">
            <Link
              href={`${prefix}/`}
              className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors"
            >
              {t("nav.home")}
            </Link>
            {/* About dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors">
                {t("nav.about")}
                <ChevronDown size={14} />
              </button>
              {aboutOpen && (
                <div className="absolute right-0 top-full pt-2 w-[560px]">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-2xl overflow-hidden">
                    <div className="grid grid-cols-[1fr_1.2fr]">
                      {/* Featured image */}
                      <div className="relative bg-[#0d2340] overflow-hidden min-h-[280px]">
                        <Image
                          src="/media/Banner-copy-scaled.jpg"
                          alt="About Jinhao Xinyuan Group"
                          fill
                          className="object-cover opacity-60"
                          sizes="260px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d2340] via-[#0d2340]/70 to-transparent" />
                        <div className="relative p-5 flex flex-col h-full justify-end text-white min-h-[280px]">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400 mb-1.5">
                            {t("megamenu.featured")}
                          </span>
                          <h3 className="text-base font-bold mb-2 leading-tight">
                            Global manufacturing network
                          </h3>
                          <p className="text-[11px] text-gray-200 leading-relaxed">
                            Vietnam, China & Thailand — three hubs, one standard of quality.
                          </p>
                        </div>
                      </div>

                      {/* Links */}
                      <div className="p-5">
                        <Link
                          href={`${prefix}/about-us`}
                          onClick={() => setAboutOpen(false)}
                          className="group block p-3 rounded-lg hover:bg-orange-50 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                              <Building2 size={16} />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 mb-0.5">
                                {t("nav.about")}
                              </h4>
                              <p className="text-xs text-gray-500 leading-snug">
                                Our company, factories and production capabilities
                              </p>
                            </div>
                          </div>
                        </Link>

                        <Link
                          href={`${prefix}/certifications`}
                          onClick={() => setAboutOpen(false)}
                          className="group block p-3 rounded-lg hover:bg-orange-50 transition-colors mt-1"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                              <Award size={16} />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 mb-0.5">
                                {t("nav.certifications")}
                              </h4>
                              <p className="text-xs text-gray-500 leading-snug">
                                FSC®, ISO, SMETA, GMI, G7®, ISTA and more
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Packaging Solutions mega menu */}
            <div
              className="relative"
              onMouseEnter={() => setPackagingOpen(true)}
              onMouseLeave={() => setPackagingOpen(false)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors">
                {t("nav.products")}
                <ChevronDown size={14} />
              </button>
              {packagingOpen && (
                <div className="absolute right-0 top-full pt-2 w-[1100px]">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-2xl overflow-hidden">
                    <div className="grid grid-cols-[1fr_2.5fr]">
                      {/* Featured image panel */}
                      <div className="relative bg-[#0d2340] overflow-hidden min-h-[380px]">
                        <Image
                          src="/media/man-in-casual-clothes-is-holding-cake-that-are-in-2025-03-18-19-49-15-utc.webp"
                          alt="Premium Packaging"
                          fill
                          className="object-cover opacity-70"
                          sizes="300px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d2340] via-[#0d2340]/60 to-transparent" />
                        <div className="relative p-6 flex flex-col h-full justify-end text-white min-h-[380px]">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400 mb-2">{t("megamenu.featured")}</span>
                          <h3 className="text-xl font-bold mb-2 leading-tight">{t("megamenu.featuredTitle")}</h3>
                          <p className="text-xs text-gray-200 mb-4 leading-relaxed">
                            {t("megamenu.featuredDesc")}
                          </p>
                          <Link
                            href={`${prefix}/products`}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-400 hover:text-orange-300"
                          >
                            {t("megamenu.exploreAll")}
                            <ChevronDown size={12} className="-rotate-90" />
                          </Link>
                        </div>
                      </div>

                      {/* Categories grid */}
                      <div className="p-6 grid grid-cols-2 gap-6">
                        {PACKAGING_SOLUTIONS.map((group) => (
                          <div key={group.title}>
                            <h4 className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mb-3 pb-2 border-b border-gray-100">
                              {group.title}
                            </h4>
                            <ul className="space-y-1.5">
                              {group.items.map((item) => (
                                <li key={item.href}>
                                  <Link
                                    href={`${prefix}${item.href}`}
                                    className="text-sm text-gray-700 hover:text-orange-600 transition-colors block leading-snug py-0.5"
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Factories mega menu */}
            <div
              className="relative"
              onMouseEnter={() => setFactoriesOpen(true)}
              onMouseLeave={() => setFactoriesOpen(false)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors">
                {t("nav.factories")}
                <ChevronDown size={14} />
              </button>
              {factoriesOpen && (
                <div className="absolute right-0 top-full pt-2 w-[720px]">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-2xl overflow-hidden">
                    <div className="px-5 pt-4 pb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600">
                        {t("megamenu.factoriesBadge")}
                      </span>
                      <h3 className="text-sm font-bold text-gray-900 mt-0.5">
                        {t("megamenu.factoriesTitle")}
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3 p-3">
                      {FACTORIES.map((f) => (
                        <Link
                          key={f.href}
                          href={`${prefix}${f.href}`}
                          onClick={() => setFactoriesOpen(false)}
                          className="group relative rounded-lg overflow-hidden border border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all bg-white flex flex-col"
                        >
                          <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
                            <Image
                              src={f.img}
                              alt={f.label}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="340px"
                            />
                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur text-[10px] font-semibold text-orange-600 flex items-center gap-1">
                              <MapPin size={10} />
                              {f.location}
                            </div>
                          </div>
                          <div className="p-4 flex flex-col flex-1">
                            <h4 className="text-sm font-bold text-gray-900 leading-snug mb-1 group-hover:text-orange-600 transition-colors">
                              {f.label}
                            </h4>
                            <p className="text-[10px] font-semibold text-orange-600 uppercase tracking-wider mb-2">
                              {f.size}
                            </p>
                            <p className="text-xs text-gray-600 leading-relaxed flex-1">
                              {f.desc}
                            </p>
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-orange-600 mt-3 group-hover:gap-2 transition-all">
                              {t("megamenu.factoriesCta")}
                              <ArrowRight size={11} />
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Language switcher */}
            {SHOW_LANGUAGE_SWITCHER && (
              <div
                className="relative ml-2"
                onMouseEnter={() => setLangOpen(true)}
                onMouseLeave={() => setLangOpen(false)}
              >
                <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors">
                  <Globe size={14} />
                  <span>{currentLocale?.flag}</span>
                  <span className="hidden xl:inline">{currentLocale?.label}</span>
                  <ChevronDown size={12} />
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-full pt-2 min-w-[160px]">
                    <div className="bg-white border border-gray-200 rounded-md shadow-xl overflow-hidden">
                      {LOCALES.map((l) => (
                        <Link
                          key={l.code}
                          href={localePath(pathWithoutLocale, l.code)}
                          onClick={() => setLangOpen(false)}
                          className={`flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 transition-colors ${
                            l.code === locale ? "bg-orange-50 text-orange-600 font-semibold" : "text-gray-700"
                          }`}
                        >
                          <span className="text-base">{l.flag}</span>
                          <span>{l.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <Link
              href={`${prefix}/conctact-us`}
              className="ml-1 px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-semibold transition-colors"
            >
              {t("nav.contact")}
            </Link>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden ml-auto p-2 text-gray-700"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="lg:hidden border-t border-gray-100 bg-white max-h-[80vh] overflow-y-auto">
            <div className="px-4 py-3 space-y-1">
              <Link href={`${prefix}/`} onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-md">{t("nav.home")}</Link>

              <p className="px-3 pt-2 text-[10px] font-bold text-orange-600 uppercase tracking-wider">{t("nav.about")}</p>
              <Link href={`${prefix}/about-us`} onClick={() => setMenuOpen(false)} className="block pl-5 pr-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-md">{t("nav.about")}</Link>
              <Link href={`${prefix}/certifications`} onClick={() => setMenuOpen(false)} className="block pl-5 pr-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-md">{t("nav.certifications")}</Link>
              {PACKAGING_SOLUTIONS.map((group) => (
                <div key={group.title} className="py-1">
                  <p className="px-3 py-1 text-[10px] font-bold text-orange-600 uppercase tracking-wider">{group.title}</p>
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={`${prefix}${item.href}`}
                      onClick={() => setMenuOpen(false)}
                      className="block pl-5 pr-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
              <p className="px-3 pt-2 text-[10px] font-bold text-orange-600 uppercase tracking-wider">{t("nav.factories")}</p>
              {FACTORIES.map((f) => (
                <Link key={f.href} href={`${prefix}${f.href}`} onClick={() => setMenuOpen(false)} className="block pl-5 pr-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
                  <span className="block font-medium text-gray-800">{f.label}</span>
                  <span className="block text-[10px] text-gray-500">{f.location}</span>
                </Link>
              ))}
              <Link href={`${prefix}/conctact-us`} onClick={() => setMenuOpen(false)} className="block mx-3 mt-2 px-4 py-2 bg-orange-500 text-white text-sm font-semibold text-center rounded-md">{t("nav.contact")}</Link>

              {/* Language switcher in mobile menu */}
              {SHOW_LANGUAGE_SWITCHER && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="px-3 pb-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Language</p>
                  <div className="flex gap-2 px-3">
                    {LOCALES.map((l) => (
                      <Link
                        key={l.code}
                        href={localePath(pathWithoutLocale, l.code)}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium ${
                          l.code === locale
                            ? "bg-orange-500 text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        <span className="text-sm">{l.flag}</span>
                        <span>{l.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
