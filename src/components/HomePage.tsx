import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import {
  Package,
  Gift,
  Layers,
  Tag,
  Leaf,
  Globe2,
  Award,
  Factory,
  ArrowRight,
} from "lucide-react";
import type { PageData } from "./PageRenderer";
import FAQ from "./FAQ";

const PRODUCT_CATEGORIES = [
  { href: "/cardboard-trays-inserts", icon: Package, title: "Corrugated Boxes", desc: "Export cartons, shipping boxes, trays" },
  { href: "/retail-packing", icon: Gift, title: "Rigid & Gift Boxes", desc: "Luxury, magnetic, collapsible gift packaging" },
  { href: "/folding-cartons", icon: Layers, title: "Folding Cartons", desc: "Consumer, retail, product packaging" },
  { href: "/stickers-labels", icon: Tag, title: "Labels & Manuals", desc: "Adhesive labels, stickers, inserts" },
  { href: "/shelf-ready-packaging", icon: Leaf, title: "Eco Packaging", desc: "Shelf-ready, sustainable solutions" },
];

const FACTORIES = [
  { href: "/hai-duong-factory", title: "XinYuan Dongguan", country: "China", img: "/media/Jinhaoxi-logo-02-scaled.png" },
  { href: "/vietnam-xinyuanjia", title: "Vietnam Xinyuanjia", country: "Vietnam", img: "/media/Jinhaoxi-logo-04.png" },
  { href: "/dongguan-xinyuan-printing-factory", title: "Dongguan Printing", country: "China", img: "/media/New-logo.webp" },
];

const STATS = [
  { icon: Factory, value: "4+", label: "Factories Across Asia" },
  { icon: Award, value: "FSC® + ISO", label: "Certified Manufacturer" },
  { icon: Globe2, value: "25K+", label: "Brands Served Worldwide" },
];

export default function HomePage({ page }: { page: PageData }) {
  const locale = useLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;

  // Find hero content from extracted blocks
  const heroBadge = page.blocks.find((b) => b.type === "heading" && b.level === 6)?.text || "Xinyuan Group";
  const heroTitle = page.blocks.find((b) => b.type === "heading" && b.level === 1)?.text || page.title;
  const heroSubtitle = page.blocks.find((b) => b.type === "text")?.text || "";

  const textBlocks = page.blocks.filter((b) => b.type === "text").slice(1);
  const heroDesc = textBlocks[0]?.text;

  // Find "Who We Are" section
  const sections = [];
  let current: { heading?: string; texts: string[] } | null = null;
  for (const block of page.blocks) {
    if (block.type === "heading" && block.level === 2 && block.text) {
      if (current) sections.push(current);
      current = { heading: block.text, texts: [] };
    } else if (block.type === "text" && block.text && current) {
      current.texts.push(block.text);
    }
  }
  if (current) sections.push(current);

  const whoWeAre = sections.find((s) => s.heading?.toLowerCase().includes("who we are"));
  const globalNetwork = sections.find((s) => s.heading?.toLowerCase().includes("global network"));

  return (
    <div>
      {/* Hero with banner background */}
      <section className="relative min-h-[600px] flex items-center bg-gray-900 overflow-hidden">
        <Image
          src="/media/Banner-1.png"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-20 w-full">
          <div className="max-w-2xl text-white">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-orange-400 mb-4">
              {heroBadge}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {heroTitle}
            </h1>
            {heroSubtitle && (
              <p className="text-lg md:text-xl text-gray-200 mb-4 font-light">
                {heroSubtitle}
              </p>
            )}
            {heroDesc && (
              <p className="text-base text-gray-300 mb-8 max-w-xl">
                {heroDesc}
              </p>
            )}
            <div className="flex flex-wrap gap-3">
              <Link
                href={`${prefix}/about-us`}
                className="px-6 py-3 bg-white/10 backdrop-blur border border-white/30 hover:bg-white/20 text-white rounded-md text-sm font-semibold transition-colors"
              >
                Discover More
              </Link>
              <Link
                href={`${prefix}/conctact-us`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-semibold transition-colors"
              >
                Request a Quote
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#0d2340] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400">
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-gray-300 uppercase tracking-wider">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who We Are */}
      {whoWeAre && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">About Us</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
                {whoWeAre.heading}
              </h2>
              {whoWeAre.texts.map((t, i) => (
                <p key={i} className="text-gray-600 text-base leading-relaxed mb-4">
                  {t}
                </p>
              ))}
              <Link
                href={`${prefix}/about-us`}
                className="inline-flex items-center gap-2 mt-4 text-orange-600 hover:text-orange-700 text-sm font-semibold"
              >
                Learn more about us
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/media/Packing-banner.webp"
                alt="Packaging production"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>
      )}

      {/* Product categories grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">Our Products</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Our Main Product Lines
            </h2>
            <p className="text-gray-600 mt-4">
              End-to-end packaging solutions for global brands — manufactured across Vietnam, China & Thailand.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PRODUCT_CATEGORIES.map((cat) => (
              <Link
                key={cat.href}
                href={`${prefix}${cat.href}`}
                className="group bg-white rounded-xl border border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all p-6 flex flex-col"
              >
                <div className="w-12 h-12 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <cat.icon size={22} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{cat.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed flex-1">{cat.desc}</p>
                <span className="inline-flex items-center gap-1 text-xs text-orange-600 font-semibold mt-4 group-hover:gap-2 transition-all">
                  Explore
                  <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Global network */}
      {globalNetwork && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">Global Reach</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                {globalNetwork.heading}
              </h2>
              {globalNetwork.texts[0] && (
                <p className="text-gray-600 mt-4">{globalNetwork.texts[0]}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FACTORIES.map((f) => (
                <Link
                  key={f.href}
                  href={`${prefix}${f.href}`}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-900 shadow-md hover:shadow-xl transition-shadow"
                >
                  <Image
                    src={f.img}
                    alt={f.title}
                    fill
                    className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest">{f.country}</span>
                    <h3 className="text-xl font-bold mt-1">{f.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {page.faqs && page.faqs.length > 0 && <FAQ items={page.faqs} />}

      {/* CTA band */}
      <section className="py-16 bg-gradient-to-r from-[#0d2340] to-[#1a3659] text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Ready to bring your packaging to life?
            </h2>
            <p className="text-gray-300">
              Get a tailored quote for your corrugated, rigid, or folding packaging needs.
            </p>
          </div>
          <Link
            href={`${prefix}/conctact-us`}
            className="inline-flex items-center gap-2 px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-semibold shrink-0 transition-colors"
          >
            Request a Quote
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
