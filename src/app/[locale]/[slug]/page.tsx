import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import PageRenderer, { type PageData } from "@/components/PageRenderer";
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
  return <PageRenderer page={page} />;
}
