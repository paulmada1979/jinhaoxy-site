import PageRenderer, { type PageData } from "@/components/PageRenderer";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const mod = await import(`@/content/${locale}/home.json`);
  const page = mod.default as PageData;
  return <PageRenderer page={page} />;
}
