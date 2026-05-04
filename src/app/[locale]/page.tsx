import HomePage from "@/components/HomePage";
import type { PageData } from "@/components/PageRenderer";
import type { Metadata } from "next";

const SITE_URL = "https://jinhaoxy.com";
const SITE_NAME = "Jinhao Xinyuan Group";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localePath = locale === "en" ? "/" : `/${locale}/`;

  const description =
    "FSC® and ISO-certified packaging manufacturer. Corrugated boxes, folding cartons, rigid & gift boxes, labels and eco packaging. Factories in Vietnam & China.";

  return {
    // `absolute` opts out of the layout's "%s | Jinhao Xinyuan Group" template
    // so the homepage title doesn't double the brand name.
    title: { absolute: `${SITE_NAME} — Premium Packaging Manufacturer` },
    description,
    alternates: {
      canonical: `${SITE_URL}${localePath}`,
      languages: {
        en: `${SITE_URL}/`,
        vi: `${SITE_URL}/vi/`,
        zh: `${SITE_URL}/zh/`,
        "x-default": `${SITE_URL}/`,
      },
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}${localePath}`,
      title: `${SITE_NAME} — Premium Packaging Manufacturer`,
      description,
      locale: locale === "en" ? "en_US" : locale === "vi" ? "vi_VN" : "zh_CN",
      siteName: SITE_NAME,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} — Premium Packaging Manufacturer`,
      description,
      images: ["/og-image.png"],
    },
  };
}

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
