"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Globe, Mail, Phone, ChevronDown } from "lucide-react";

const LOCALES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
];

const PACKAGING_SOLUTIONS = [
  {
    title: "Corrugated Packaging",
    items: [
      { href: "/shipping-boxes-export-cartons", label: "Shipping Boxes & Export Cartons" },
      { href: "/e-commerce-mailer-boxes", label: "E-Commerce Mailer Boxes" },
      { href: "/cardboard-trays-inserts", label: "Cardboard Trays & Inserts" },
      { href: "/shelf-ready-packaging", label: "Shelf Ready Packaging" },
      { href: "/trays", label: "Corrugated Trays & Inserts" },
    ],
  },
  {
    title: "Retail Packaging",
    items: [
      { href: "/retail-packing", label: "Retail Packaging" },
      { href: "/consumer-packaging", label: "Consumer Packaging" },
      { href: "/folding-cartons", label: "Folding Cartons" },
    ],
  },
  {
    title: "Rigid Gift Box Packaging",
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
    title: "Labels & Other",
    items: [
      { href: "/stickers-labels", label: "Adhesive Label & Sticker" },
      { href: "/artificial-boxes", label: "Artificial Boxes" },
      { href: "/instructions-manuals", label: "Instructions & Manuals" },
    ],
  },
];

const FACTORIES = [
  { href: "/hai-duong-factory", label: "XinYuan Packing Dongguan" },
  { href: "/dongguan-xinyuan-printing-factory", label: "Dongguan Xinyuan Printing Factory" },
  { href: "/vietnam-xinyuanjia", label: "Vietnam Xinyuanjia" },
  { href: "/corrugated-packaging-box-manufacturer-in-vietnam-jinhao-xinyuan-group", label: "Corrugated Packaging Vietnam" },
];

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [packagingOpen, setPackagingOpen] = useState(false);
  const [factoriesOpen, setFactoriesOpen] = useState(false);

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
            <span className="hidden sm:inline text-gray-300">Require Consultation?</span>
            <a href="mailto:info@jinhaoxy.com" className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
              <Mail size={12} />
              info@jinhaoxy.com
            </a>
            <Link href={`${prefix}/conctact-us`} className="hidden sm:flex items-center gap-1.5 hover:text-orange-400 transition-colors">
              <Phone size={12} />
              Contact Us
            </Link>
          </div>
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 hover:text-orange-400 transition-colors"
            >
              <Globe size={12} />
              <span>{currentLocale?.flag}</span>
              <span>{currentLocale?.label}</span>
              <ChevronDown size={12} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white text-gray-800 border border-gray-200 rounded-md shadow-lg overflow-hidden min-w-[140px] z-50">
                {LOCALES.map((l) => (
                  <Link
                    key={l.code}
                    href={localePath(pathWithoutLocale, l.code)}
                    onClick={() => setLangOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 ${
                      l.code === locale ? "bg-orange-50 text-orange-600 font-medium" : ""
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
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
              {t("home")}
            </Link>
            <Link
              href={`${prefix}/about-us`}
              className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors"
            >
              {t("about")}
            </Link>

            {/* Packaging Solutions mega menu */}
            <div
              className="relative"
              onMouseEnter={() => setPackagingOpen(true)}
              onMouseLeave={() => setPackagingOpen(false)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors">
                Packaging solutions
                <ChevronDown size={14} />
              </button>
              {packagingOpen && (
                <div className="absolute right-0 top-full pt-2 w-[900px]">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-6 grid grid-cols-4 gap-6">
                    {PACKAGING_SOLUTIONS.map((group) => (
                      <div key={group.title}>
                        <h4 className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-3 border-b border-gray-200 pb-2">
                          {group.title}
                        </h4>
                        <ul className="space-y-2">
                          {group.items.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={`${prefix}${item.href}`}
                                className="text-sm text-gray-700 hover:text-orange-600 transition-colors block leading-snug"
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
              )}
            </div>

            {/* Factories dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setFactoriesOpen(true)}
              onMouseLeave={() => setFactoriesOpen(false)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors">
                {t("factories")}
                <ChevronDown size={14} />
              </button>
              {factoriesOpen && (
                <div className="absolute right-0 top-full pt-2 w-[320px]">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-4">
                    <ul className="space-y-1">
                      {FACTORIES.map((f) => (
                        <li key={f.href}>
                          <Link
                            href={`${prefix}${f.href}`}
                            className="block px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-colors"
                          >
                            {f.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <Link
              href={`${prefix}/certifications`}
              className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors"
            >
              {t("certifications")}
            </Link>
            <Link
              href={`${prefix}/conctact-us`}
              className="ml-2 px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-semibold transition-colors"
            >
              {t("contact")}
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
              <Link href={`${prefix}/`} onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-md">{t("home")}</Link>
              <Link href={`${prefix}/about-us`} onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-md">{t("about")}</Link>
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
              <p className="px-3 pt-2 text-[10px] font-bold text-orange-600 uppercase tracking-wider">Factories</p>
              {FACTORIES.map((f) => (
                <Link key={f.href} href={`${prefix}${f.href}`} onClick={() => setMenuOpen(false)} className="block pl-5 pr-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-md">{f.label}</Link>
              ))}
              <Link href={`${prefix}/certifications`} onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-md mt-2">{t("certifications")}</Link>
              <Link href={`${prefix}/conctact-us`} onClick={() => setMenuOpen(false)} className="block mx-3 mt-2 px-4 py-2 bg-orange-500 text-white text-sm font-semibold text-center rounded-md">{t("contact")}</Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
