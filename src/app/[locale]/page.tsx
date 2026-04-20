import HomePage from "@/components/HomePage";
import type { PageData } from "@/components/PageRenderer";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const mod = await import(`@/content/${locale}/home.json`);
  const page = mod.default as PageData;
  return <HomePage page={page} />;
}
