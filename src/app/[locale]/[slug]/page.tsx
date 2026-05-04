import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import PageRenderer, { type PageData } from "@/components/PageRenderer";
import ContactPage from "@/components/ContactPage";
import AboutPage from "@/components/AboutPage";
import CertificationsPage from "@/components/CertificationsPage";
import ShippingBoxesPage from "@/components/ShippingBoxesPage";
import MailerBoxesPage from "@/components/MailerBoxesPage";
import TraysPage from "@/components/TraysPage";
import ShelfReadyPage from "@/components/ShelfReadyPage";
import LuxuryRigidPage from "@/components/LuxuryRigidPage";
import CustomPrintedPage from "@/components/CustomPrintedPage";
import LargeGiftBoxesPage from "@/components/LargeGiftBoxesPage";
import JewelryBoxesPage from "@/components/JewelryBoxesPage";
import MagneticClosurePage from "@/components/MagneticClosurePage";
import CollapsiblePage from "@/components/CollapsiblePage";
import CosmeticPage from "@/components/CosmeticPage";
import InstructionsPage from "@/components/InstructionsPage";
import StickersLabelsPage from "@/components/StickersLabelsPage";
import PlasticBoxesPage from "@/components/PlasticBoxesPage";
import RetailPackingPage from "@/components/RetailPackingPage";
import ConsumerPackagingPage from "@/components/ConsumerPackagingPage";
import FoldingCartonsPage from "@/components/FoldingCartonsPage";
import VietnamXinyuanjiaPage from "@/components/VietnamXinyuanjiaPage";
import DongguanFactoryPage from "@/components/DongguanFactoryPage";
import type { Metadata } from "next";
import manifest from "@/content/manifest.json";

interface Manifest {
  en: { slug: string; title: string; blocks: number }[];
  vi: { slug: string; title: string; blocks: number }[];
  zh: { slug: string; title: string; blocks: number }[];
}

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const page of (manifest as Manifest)[locale] || []) {
      if (page.slug === "home") continue; // home is /[locale]/page.tsx
      params.push({ locale, slug: page.slug });
    }
  }
  return params;
}

async function loadPage(locale: string, slug: string): Promise<PageData | null> {
  try {
    const mod = await import(`@/content/${locale}/${slug}.json`);
    return mod.default as PageData;
  } catch {
    return null;
  }
}

const SITE_URL = "https://jinhaoxy.com";

function pathFor(locale: string, slug: string): string {
  const localePart = locale === "en" ? "" : `/${locale}`;
  if (slug === "home") return `${localePart}/`;
  return `${localePart}/${slug}/`;
}

function extractDescription(page: PageData): string | null {
  // Pull the first non-empty text block as a meta description.
  // Cap at ~160 chars to fit Google's display window.
  for (const block of page.blocks) {
    if (block.type === "text" && block.text) {
      // Strip leading bullet markers and stray whitespace.
      const cleaned = block.text.replace(/^[•\-*]\s*/, "").trim();
      if (cleaned.length < 30) continue; // skip very short fragments
      if (cleaned.length <= 160) return cleaned;
      // Cut at a sentence boundary if possible
      const truncated = cleaned.slice(0, 157);
      const lastPeriod = truncated.lastIndexOf(".");
      if (lastPeriod > 100) return cleaned.slice(0, lastPeriod + 1);
      const lastSpace = truncated.lastIndexOf(" ");
      return cleaned.slice(0, lastSpace > 100 ? lastSpace : 157) + "…";
    }
  }
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = await loadPage(locale, slug);
  if (!page) return { title: "Not Found", robots: { index: false, follow: false } };

  const description = extractDescription(page) ?? undefined;
  const canonicalPath = pathFor(locale, slug);

  return {
    title: `${page.title} | Jinhao Xinyuan Group`,
    description,
    alternates: {
      canonical: `${SITE_URL}${canonicalPath}`,
      languages: {
        en: `${SITE_URL}${pathFor("en", slug)}`,
        vi: `${SITE_URL}${pathFor("vi", slug)}`,
        zh: `${SITE_URL}${pathFor("zh", slug)}`,
        "x-default": `${SITE_URL}${pathFor("en", slug)}`,
      },
    },
    openGraph: {
      type: "article",
      url: `${SITE_URL}${canonicalPath}`,
      title: page.title,
      description,
      locale: locale === "en" ? "en_US" : locale === "vi" ? "vi_VN" : "zh_CN",
      siteName: "Jinhao Xinyuan Group",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: page.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description,
      images: ["/og-image.png"],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const page = await loadPage(locale, slug);
  if (!page) notFound();

  if (slug === "conctact-us") return <ContactPage page={page} />;
  if (slug === "about-us") return <AboutPage />;
  if (slug === "certifications") return <CertificationsPage />;
  if (slug === "shipping-boxes-export-cartons") return <ShippingBoxesPage />;
  if (slug === "e-commerce-mailer-boxes") return <MailerBoxesPage />;
  if (slug === "cardboard-trays-inserts" || slug === "trays") return <TraysPage />;
  if (slug === "shelf-ready-packaging") return <ShelfReadyPage />;
  if (slug === "luxury-rigid-gift-boxes") return <LuxuryRigidPage />;
  if (slug === "custom-printed-gift-boxes") return <CustomPrintedPage />;
  if (slug === "large-gift-boxes") return <LargeGiftBoxesPage />;
  if (slug === "custom-jewelry-gift-boxes") return <JewelryBoxesPage />;
  if (slug === "magnetic-closure-gift-boxes") return <MagneticClosurePage />;
  if (slug === "collapsible-gift-boxes-for-e-commerce-retail") return <CollapsiblePage />;
  if (slug === "cosmetic-gift-boxes") return <CosmeticPage />;
  if (slug === "instructions-manuals") return <InstructionsPage />;
  if (slug === "stickers-labels") return <StickersLabelsPage />;
  if (slug === "artificial-boxes") return <PlasticBoxesPage />;
  if (slug === "retail-packing") return <RetailPackingPage />;
  if (slug === "consumer-packaging") return <ConsumerPackagingPage />;
  if (slug === "folding-cartons") return <FoldingCartonsPage />;
  if (slug === "vietnam-xinyuanjia") return <VietnamXinyuanjiaPage />;
  if (slug === "dongguan-xinyuan-printing-factory") return <DongguanFactoryPage />;
  return <PageRenderer page={page} />;
}
