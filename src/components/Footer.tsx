import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const productLinks = [
    { href: "/folding-cartons", label: "Folding Cartons" },
    { href: "/retail-packing", label: "Rigid & Gift Boxes" },
    { href: "/cardboard-trays-inserts", label: "Corrugated Boxes" },
    { href: "/stickers-labels", label: "Labels & Manuals" },
    { href: "/shelf-ready-packaging", label: "Eco Packaging" },
  ];

  const companyLinks = [
    { href: "/about-us", label: t("about") },
    { href: "/factories", label: t("factories") },
    { href: "/certifications", label: t("certifications") },
    { href: "/conctact-us", label: t("contact") },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 mt-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white/5 backdrop-blur rounded-lg p-3 inline-block mb-4">
            <Image
              src="/logo.webp"
              alt="Jinhao XinYuan"
              width={180}
              height={50}
              className="h-12 w-auto"
            />
          </div>
          <p className="text-sm text-gray-400 max-w-md">
            FSC®/ISO-certified printing & packaging manufacturer. Corrugated boxes,
            folding cartons, rigid & gift boxes, labels and eco packaging.
          </p>
          <p className="text-sm text-orange-400 mt-4 font-semibold tracking-wide">
            Vietnam · China · Thailand
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-3">Products</h4>
          <ul className="space-y-2 text-sm">
            {productLinks.map((l) => (
              <li key={l.href}>
                <Link href={`${prefix}${l.href}`} className="hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link href={`${prefix}${l.href}`} className="hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-xs text-gray-500 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Jinhao Xinyuan Group. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href={`${prefix}/privacy-policy`} className="hover:text-gray-300">Privacy</Link>
            <Link href={`${prefix}/terms-of-use`} className="hover:text-gray-300">Terms</Link>
            <Link href={`${prefix}/cookie-policy`} className="hover:text-gray-300">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
