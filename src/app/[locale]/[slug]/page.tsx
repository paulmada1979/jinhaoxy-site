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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = await loadPage(locale, slug);
  if (!page) return { title: "Not Found" };
  return {
    title: `${page.title} | Jinhao Xinyuan Group`,
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
  return <PageRenderer page={page} />;
}
