import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  TrendingDown,
  Clock,
  ShieldCheck,
  Factory,
  FileText,
  Globe2,
  Package,
} from "lucide-react";

const PUBLISHED_AT = "2026-05-04";
const UPDATED_AT = "2026-05-04";
const READING_MIN = 11;
const AUTHOR = "Jinhao Xinyuan Group editorial team";

export const articleMeta = {
  slug: "vietnam-packaging-manufacturers-us-tariff-guide",
  title:
    "Vietnam Packaging Manufacturers: Tariff-Free Alternative to China for US Importers (2026 Guide)",
  description:
    "How US importers are saving 25–30% on packaging by sourcing from Vietnam instead of China. Tariff math, certifications, lead times, and a vetting checklist.",
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,
  readingMin: READING_MIN,
  author: AUTHOR,
  coverImage: "/blog/vietnam-tariff-hero.png",
  coverAlt:
    "Container ship loaded with packaging cargo departing a Vietnamese port at golden hour, with cranes and stacked shipping containers in the background",
};

const FAQS = [
  {
    q: "Are packaging imports from Vietnam subject to US Section 301 tariffs?",
    a: "No. Section 301 tariffs (typically 7.5–25% on covered HTS codes) apply to goods of Chinese origin under HTS Chapter 48 (paper/paperboard) and Chapter 39 (plastic packaging). Goods substantially transformed and originating in Vietnam fall outside Section 301 entirely. They still incur the standard MFN duty (often 0–5% for paperboard packaging), so the all-in landed cost typically drops 20–30% versus comparable Chinese sourcing.",
  },
  {
    q: "What's the typical lead time difference between Vietnam and China packaging?",
    a: "For corrugated and folding cartons, sample-to-shipment is 25–45 days from a Vietnam factory vs 18–35 days from a comparable mainland China facility. The difference comes down to material lead times (some specialty papers are imported into Vietnam from China or Indonesia). For standard kraft and white-back paperboard, Vietnamese factories are now within 3–5 days of Chinese turnaround. Sea freight from Hai Phong / Ho Chi Minh to US West Coast averages 18–22 days versus 14–18 from Shanghai/Ningbo.",
  },
  {
    q: "What certifications should US buyers verify before placing a Vietnam packaging order?",
    a: "At minimum: FSC Chain-of-Custody (paper traceability), ISO 9001:2015 (quality management), and SMETA (social/ethical compliance). For food-contact and cosmetic packaging add ISO 22000 or BRC. For G7-certified color reproduction at retail-print quality, look for facilities with G7 Master Qualification — this is rarer in Vietnam than in China but increasing. Always request the certification numbers and validate them on the issuing body's public registry.",
  },
  {
    q: "What's the minimum order quantity (MOQ) at most Vietnam packaging factories?",
    a: "Standard MOQs run 3,000–10,000 units for offset-printed folding cartons, 1,000–5,000 for rigid gift boxes, and 500–2,000 for corrugated mailers. Lower MOQs (500–1,000) are usually possible for digital-printed runs at a 10–15% per-unit premium. Compare this to China where MOQs of 1,000–3,000 are typical for similar SKU complexity.",
  },
  {
    q: "Is the print quality from Vietnam packaging factories comparable to China?",
    a: "For mid-tier and premium offset printing, yes — most established Vietnamese exporters run Heidelberg, Komori, or KBA presses identical to Chinese facilities. The gap shows up in the highest-end specialty finishes: cold-foil, lenticular, certain spot UV effects. Vietnam has fewer factories at the very top of the print-tech curve, but for 90% of B2B packaging needs, the output is indistinguishable.",
  },
  {
    q: "Can a Vietnam factory accept artwork files and procurement processes set up for a Chinese supplier?",
    a: "Yes. Most established Vietnamese exporters use the same Adobe-based prepress workflow (Illustrator, InDesign), accept the same color profiles (G7, GMI, FOGRA), and follow the same QC standards (ISTA, ISO). Switching from a Chinese supplier to a Vietnamese one is largely a logistics and contract change, not a workflow rewrite. Most factories will accept dielines and color-matched proofs from your existing Chinese supplier as a starting point.",
  },
];

const VETTING_CHECKLIST = [
  "FSC Chain-of-Custody license number — verify on info.fsc.org",
  "ISO 9001:2015 certificate — request the certificate body and registration number",
  "SMETA audit report — ask for the most recent CAPR (Corrective Action Plan Report)",
  "ISTA-certified test lab on-site (compression, vibration, drop tests)",
  "G7-certified color management OR documented GMI/Pantone process",
  "Production capacity statement (m²/month) and current capacity utilization",
  "Reference customers in your industry (request 2–3 with permission to contact)",
  "Sample policy — does first sample cost get credited against production order?",
  "Incoterms options (EXW, FOB, CIF, DDP) and which they regularly use",
  "Compliance pack: packaging-specific REACH, prop 65, FDA food-contact (if applicable)",
];

export default function VietnamPackagingTariffGuide() {
  const locale = useLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: articleMeta.title,
    description: articleMeta.description,
    image: [`https://jinhaoxy.com${articleMeta.coverImage}`],
    datePublished: articleMeta.publishedAt,
    dateModified: articleMeta.updatedAt,
    author: {
      "@type": "Organization",
      name: "Jinhao Xinyuan Group",
      url: "https://jinhaoxy.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Jinhao Xinyuan Group",
      logo: {
        "@type": "ImageObject",
        url: "https://jinhaoxy.com/logo.webp",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://jinhaoxy.com${prefix}/blog/${articleMeta.slug}/`,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="relative min-h-[480px] flex items-end bg-gray-900 overflow-hidden">
        <Image
          src={articleMeta.coverImage}
          alt={articleMeta.coverAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d2340]/95 via-[#0d2340]/60 to-[#0d2340]/30" />

        <div className="relative max-w-4xl mx-auto px-4 lg:px-6 py-16 w-full text-white">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href={`${prefix}/blog`}
              className="text-xs font-semibold tracking-widest uppercase text-orange-400 hover:text-orange-300 transition-colors"
            >
              ← Blog
            </Link>
            <span className="text-orange-400">·</span>
            <span className="text-xs font-semibold tracking-widest uppercase text-orange-400">
              Buyer&apos;s guide
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight tracking-tight">
            {articleMeta.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-300">
            <span>{AUTHOR}</span>
            <span className="text-gray-500">·</span>
            <time dateTime={PUBLISHED_AT}>May 4, 2026</time>
            <span className="text-gray-500">·</span>
            <span>{READING_MIN} min read</span>
          </div>
        </div>
      </section>

      {/* TL;DR callout */}
      <section className="py-12 bg-orange-50 border-b border-orange-100">
        <div className="max-w-4xl mx-auto px-4 lg:px-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-orange-500 text-white flex items-center justify-center shrink-0">
              <TrendingDown size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                The 90-second version
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                US Section 301 tariffs add 7.5–25% to packaging imported from
                China. Vietnam is exempt. For a buyer importing $500K of folding
                cartons annually, sourcing from a Vietnamese exporter
                with comparable certifications saves <strong>$25,000–$75,000
                per year</strong> in landed cost — without compromising print
                quality, lead time, or compliance. Most Western buyers can
                switch suppliers in one production cycle.
              </p>
              <p className="text-gray-600 text-sm">
                This guide covers the actual tariff math, cert standards,
                MOQ/lead-time comparison, and a 10-point vetting checklist for
                first-time Vietnam buyers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-16">
        <div className="prose prose-lg max-w-none prose-headings:scroll-mt-20">
          {/* Section 1 */}
          <h2 className="text-3xl font-bold text-gray-900 mt-0 mb-5">
            Why US packaging buyers are looking at Vietnam in 2026
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            For most of the last two decades, &ldquo;packaging supplier&rdquo;
            and &ldquo;China&rdquo; were synonymous for Western brands. That
            equation has been shifting since the 2018 Section 301 tariffs first
            hit Chapter 48 paperboard and Chapter 39 plastic packaging
            categories — and the shift accelerated with the 2024 expansions
            and the broader US–China trade reset that followed.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Vietnam has emerged as the cleanest packaging-sourcing alternative.
            Not because Vietnamese factories are cheaper at the gate (they
            often aren&apos;t — labor and converted board can run 5–10% above
            comparable Guangdong pricing) but because the all-in landed cost,
            once tariffs and clearance fees are stacked, comes in 20–30% under
            the Chinese equivalent.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The companies switching aren&apos;t small. They&apos;re mid-market
            CPG brands, e-commerce 8-figure shops, cosmetics importers, and
            Fortune 1000 procurement teams that have been quietly running
            dual-source pilots for two or three years and are now consolidating
            volume to Vietnamese suppliers. The decision is rarely about
            ideology — it&apos;s a spreadsheet exercise.
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            This guide walks through the actual math, the certification
            standards Western buyers verify, the MOQ and lead-time tradeoffs,
            and a vetting checklist drawn from the questions our procurement
            customers ask before placing first orders.
          </p>

          {/* Section 2 — Tariff math */}
          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-5">
            The tariff math: what US importers actually save
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Section 301 duties stack on top of the standard Most-Favored-Nation
            (MFN) rate that all imports pay. For paperboard packaging
            (HTS 4819), the structure looks like this:
          </p>

          <div className="my-8 overflow-hidden rounded-2xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-bold text-gray-900">
                    Cost component
                  </th>
                  <th className="text-right px-4 py-3 font-bold text-gray-900">
                    From China
                  </th>
                  <th className="text-right px-4 py-3 font-bold text-gray-900">
                    From Vietnam
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-3">Factory price (FOB)</td>
                  <td className="px-4 py-3 text-right">$1.00</td>
                  <td className="px-4 py-3 text-right">$1.05</td>
                </tr>
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td className="px-4 py-3">MFN duty (HTS 4819.10)</td>
                  <td className="px-4 py-3 text-right">$0.00 (free)</td>
                  <td className="px-4 py-3 text-right">$0.00 (free)</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-3">
                    <strong>Section 301 List 3</strong>
                  </td>
                  <td className="px-4 py-3 text-right text-red-600 font-semibold">
                    +$0.25 (25%)
                  </td>
                  <td className="px-4 py-3 text-right text-green-700 font-semibold">
                    Not applicable
                  </td>
                </tr>
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td className="px-4 py-3">Sea freight + clearance</td>
                  <td className="px-4 py-3 text-right">$0.08</td>
                  <td className="px-4 py-3 text-right">$0.10</td>
                </tr>
                <tr className="border-t-2 border-gray-300">
                  <td className="px-4 py-3 font-bold text-gray-900">
                    Landed cost per unit
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-gray-900">
                    $1.33
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-gray-900">
                    $1.15
                  </td>
                </tr>
                <tr className="border-t border-gray-200 bg-orange-50">
                  <td className="px-4 py-3 font-bold text-orange-700">
                    Saving per unit
                  </td>
                  <td className="px-4 py-3 text-right" />
                  <td className="px-4 py-3 text-right font-bold text-orange-700">
                    $0.18 (13.5%)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mb-6">
            Illustrative only. Actual savings depend on HTS classification,
            specific 301 list applicability, and the FOB delta at your volume.
            Run the math against your own 12-month buy.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            For Chapter 39 plastics (PE/PP mailers, blister packs, plastic gift
            boxes), the savings are even more pronounced — Section 301 hits
            most of those at 25%, and Vietnam&apos;s MFN rate matches China at
            5.3% (no 301 surcharge). Net delta typically lands at 18–22%.
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            The math shifts the moment your annual packaging spend crosses
            ~$200K. Below that, the supplier-switch friction (re-doing dielines,
            color matching, sample iteration) often eats the savings in year
            one. Above $500K, a year-one ROI of 4–8x on the switching cost is
            normal.
          </p>

          {/* Section 3 — Lead time */}
          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-5">
            Lead times, MOQ, and capacity: practical comparison
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="p-5 rounded-xl bg-blue-50 border border-blue-100">
              <Clock className="text-blue-600 mb-2" size={22} />
              <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
                Production lead time
              </p>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                25–45 days
              </p>
              <p className="text-xs text-gray-600">
                vs 18–35 days from China. Specialty paper imports add the gap.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-blue-50 border border-blue-100">
              <Globe2 className="text-blue-600 mb-2" size={22} />
              <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
                Sea freight to USWC
              </p>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                18–22 days
              </p>
              <p className="text-xs text-gray-600">
                Hai Phong / HCM City to LA / Long Beach. Comparable to North
                China ports.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-blue-50 border border-blue-100">
              <Package className="text-blue-600 mb-2" size={22} />
              <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
                Typical MOQ
              </p>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                3K–10K units
              </p>
              <p className="text-xs text-gray-600">
                For offset folding cartons. 1K–5K for rigid boxes. 500–2K for
                corrugated mailers.
              </p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            The capacity story is more nuanced than a single &ldquo;Vietnam
            slower&rdquo; or &ldquo;China faster&rdquo; line. For
            <strong> standard kraft and white-back paperboard</strong>, the
            largest Vietnamese exporters operate Heidelberg XL and Komori
            Lithrone presses sized identically to comparable Guangdong plants
            — same 200 million-card monthly throughput, same automated
            folding-gluing lines.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Where Vietnam runs slightly behind is in
            <strong> specialty board sourcing</strong>. High-grade SBS, certain
            FBB grades, and recycled-content luxury boards are still partially
            imported from China, Indonesia, and Korea — adding 5–10 days of
            material lead time. For brands using stock kraft or bleached white
            paperboard (the majority of corrugated mailers, e-commerce shippers,
            and standard FCG packaging), this gap is invisible.
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            For premium rigid boxes and luxury folding cartons with embossing,
            hot-foil, and specialty coatings — Vietnam has caught up
            substantially since 2022, but the highest-end specialty work (deep
            cold-foil, lenticular, certain holographic effects) still has more
            depth in Guangdong and Shanghai. For 90% of B2B packaging
            specifications, the Vietnamese output is indistinguishable from a
            comparable Chinese facility.
          </p>

          {/* Section 4 — Certifications */}
          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-5">
            Certifications: what US buyers actually verify
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Procurement teams at every Western buyer of any size run the same
            cert checklist. If a Vietnamese supplier can&apos;t produce these
            on first request, they&apos;re not a serious candidate.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            <div className="p-5 rounded-xl bg-white border border-gray-200">
              <ShieldCheck className="text-orange-600 mb-2" size={22} />
              <h3 className="font-bold text-gray-900 mb-2">
                FSC Chain-of-Custody
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Required by Walmart, Target, IKEA, and most EU retailers. Verify
                the FSC license number on info.fsc.org — about 40% of Vietnamese
                packaging exporters hold valid FSC CoC.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-white border border-gray-200">
              <FileText className="text-orange-600 mb-2" size={22} />
              <h3 className="font-bold text-gray-900 mb-2">ISO 9001:2015</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Quality management system. The certification body should be
                IAF-recognized (TÜV, BV, SGS, BSI). Ask for the certificate
                body and the registration number — verify on the body&apos;s
                public registry.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-white border border-gray-200">
              <CheckCircle2 className="text-orange-600 mb-2" size={22} />
              <h3 className="font-bold text-gray-900 mb-2">SMETA / Sedex</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Social audit covering labor, health & safety, environment, and
                business ethics. Required by ethical-sourcing buyers like
                Unilever, P&amp;G, Tesco. Ask for the Sedex Member Number and
                the most recent audit&apos;s CAPR.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-white border border-gray-200">
              <Factory className="text-orange-600 mb-2" size={22} />
              <h3 className="font-bold text-gray-900 mb-2">G7 / GMI</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Color-management certification. G7 Master Qualification is
                rarer in Vietnam than in China but increasing. GMI compliance
                is the more common practical standard for retail-print color
                consistency.
              </p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            Beyond these, food-contact and cosmetic packaging adds
            <strong> ISO 22000</strong> or <strong>BRC</strong>, and electronics
            packaging often requires <strong>ISTA 3A or 6-Amazon.com-SIOC</strong>{" "}
            test reports. None of these are unique to Vietnam — they&apos;re
            the same standards a Chinese supplier needs to ship to a Western
            buyer.
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            One specific tip from procurement teams: validate certificates on
            the issuing body&apos;s public registry, not just the PDF the
            factory sends. A surprising percentage of forwarded certs in this
            industry are out of date or scoped to a different facility within
            the same group.
          </p>

          {/* Section 5 — Where to source */}
          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-5">
            Where to source: Vietnam&apos;s three packaging hubs
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Packaging production in Vietnam clusters around three regions, each
            with a different specialty and freight profile.
          </p>

          <ul className="space-y-4 my-8">
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-orange-500 text-white flex items-center justify-center shrink-0 mt-1">
                1
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">
                  Northern Vietnam — Bac Ninh, Bac Giang, Hai Phong
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  The largest concentration of FSC-certified paperboard and
                  rigid-box exporters. Hai Phong port handles most US- and
                  EU-bound packaging shipments. Capacity here grew 60%+ between
                  2020 and 2025 as Chinese-owned and Vietnamese factories both
                  expanded. This is where{" "}
                  <Link
                    href={`${prefix}/vietnam-xinyuanjia/`}
                    className="text-orange-600 font-semibold hover:underline"
                  >
                    our Bac Ninh facility
                  </Link>{" "}
                  operates.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-orange-500 text-white flex items-center justify-center shrink-0 mt-1">
                2
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">
                  Southern Vietnam — Ho Chi Minh, Binh Duong, Long An
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Strongest in food-grade and cosmetic packaging. Cat Lai and
                  Cai Mep ports serve US East Coast and Southeast Asia. Lower
                  labor costs than the north but slightly tighter capacity for
                  premium offset work.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-orange-500 text-white flex items-center justify-center shrink-0 mt-1">
                3
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">
                  Central Vietnam — Da Nang, Quang Nam
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Smaller but growing. Specialty in corrugated for furniture
                  and electronics export. Often used as a secondary fulfillment
                  hub for buyers who want geographic redundancy across multiple
                  Vietnamese provinces.
                </p>
              </div>
            </li>
          </ul>

          {/* Section 6 — Vetting checklist */}
          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-5">
            10-point vetting checklist for first-time Vietnam buyers
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Before you place a sample order, validate these. Every legitimate
            Vietnamese packaging exporter should answer all ten in writing
            within 48 hours.
          </p>

          <ol className="my-8 space-y-3 list-none pl-0">
            {VETTING_CHECKLIST.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100"
              >
                <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {i + 1}
                </div>
                <span className="text-gray-700 leading-relaxed text-sm">
                  {item}
                </span>
              </li>
            ))}
          </ol>

          {/* Section 7 — FAQ */}
          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-5">
            Frequently asked questions
          </h2>
          <div className="space-y-6 my-8">
            {FAQS.map((f, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 mb-3 text-lg">{f.q}</h3>
                <p className="text-gray-700 leading-relaxed text-base">{f.a}</p>
              </div>
            ))}
          </div>

          {/* Section 8 — How we work */}
          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-5">
            Working with Jinhao Xinyuan: dual-hub Vietnam + China
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We operate two integrated facilities — a 30,000 m² FSC- and
            ISO-certified plant in Bac Ninh, Vietnam, and a 13,900 m² premium
            color-box plant in Dongguan, China. Most of our US, UK, and AU
            shipments now route through Bac Ninh for the tariff reasons covered
            in this guide. Buyers needing top-end specialty finishing on a
            specific SKU can split production: bulk volume from Vietnam, the
            specialty run from Dongguan, both consolidated to one shipment.
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            What we ship: corrugated export cartons, e-commerce mailer boxes,
            shelf-ready packaging, retail folding cartons, luxury rigid gift
            boxes, magnetic-closure boxes, jewelry and cosmetic packaging, and
            adhesive labels. FSC, ISO 9001:2015, SMETA, and G7-certified.
          </p>

          {/* Internal links to product pages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-10">
            {[
              { href: "/shipping-boxes-export-cartons/", label: "Shipping Boxes & Export Cartons" },
              { href: "/e-commerce-mailer-boxes/", label: "E-Commerce Mailer Boxes" },
              { href: "/luxury-rigid-gift-boxes/", label: "Luxury Rigid Gift Boxes" },
              { href: "/folding-cartons/", label: "Folding Cartons" },
              { href: "/cardboard-trays-inserts/", label: "Cardboard Trays & Inserts" },
              { href: "/cosmetic-gift-boxes/", label: "Cosmetic Gift Boxes" },
            ].map((link) => (
              <Link
                key={link.href}
                href={`${prefix}${link.href}`}
                className="flex items-center justify-between p-4 rounded-lg bg-white border border-gray-200 hover:border-orange-300 hover:shadow-sm transition-all"
              >
                <span className="text-sm font-semibold text-gray-900">
                  {link.label}
                </span>
                <ArrowRight size={14} className="text-orange-600" />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="my-12 p-8 lg:p-10 rounded-2xl bg-gradient-to-br from-[#0d2340] to-[#1a3659] text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Run the tariff math against your own packaging spend
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Send us your current dielines, volume, and supplier quotes. We&apos;ll
              return a Vietnam-source quote and a side-by-side landed cost
              comparison within 1 business day.
            </p>
            <Link
              href={`${prefix}/conctact-us/`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-semibold transition-colors"
            >
              Request a Tariff-Free Quote
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Authoring note */}
          <hr className="my-12 border-gray-200" />
          <p className="text-sm text-gray-500 leading-relaxed">
            Published {new Date(PUBLISHED_AT).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}.
            Tariff math is illustrative; specific HTS classifications and 301
            list applicability change. Always confirm with your customs broker
            for your specific SKU and shipment.
          </p>
        </div>
      </div>
    </article>
  );
}
