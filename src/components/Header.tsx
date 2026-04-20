"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";

const LOCALES = [
  { code: "en", label: "EN" },
  { code: "vi", label: "VI" },
  { code: "zh", label: "中文" },
];

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  // Remove locale prefix to get path
  const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), "") || "/";

  const nav = [
    { href: "/", label: t("home") },
    { href: "/about-us", label: t("about") },
    { href: "/factories", label: t("factories") },
    { href: "/products", label: t("products") },
    { href: "/certifications", label: t("certifications") },
    { href: "/conctact-us", label: t("contact") },
  ];

  function localePath(href: string, newLocale: string) {
    if (newLocale === "en") return href;
    return `/${newLocale}${href}`;
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 flex items-center gap-6">
        <Link
          href={locale === "en" ? "/" : `/${locale}`}
          className="text-lg font-bold text-gray-900 tracking-tight shrink-0"
        >
          Jinhao Xinyuan
        </Link>

        <nav className="hidden lg:flex items-center gap-1 flex-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={locale === "en" ? item.href : `/${locale}${item.href}`}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <Globe size={14} />
            {LOCALES.find((l) => l.code === locale)?.label}
          </button>
          {langOpen && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden min-w-[100px]">
              {LOCALES.map((l) => (
                <Link
                  key={l.code}
                  href={localePath(pathWithoutLocale, l.code)}
                  onClick={() => setLangOpen(false)}
                  className={`block px-3 py-2 text-sm hover:bg-gray-50 ${
                    l.code === locale ? "text-blue-600 font-medium" : "text-gray-700"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 text-gray-700"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="lg:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-2 space-y-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={locale === "en" ? item.href : `/${locale}${item.href}`}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
