import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://jinhaoxy.com";
const SITE_NAME = "Jinhao Xinyuan Group";
const DEFAULT_TITLE = "Jinhao Xinyuan Group — Premium Packaging Manufacturer";
const DEFAULT_DESC =
  "FSC® and ISO-certified packaging manufacturer. Corrugated boxes, folding cartons, rigid & gift boxes, labels and eco packaging. Factories in Vietnam & China.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Jinhao Xinyuan Group",
  },
  description: DEFAULT_DESC,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  keywords: [
    "packaging manufacturer",
    "FSC certified",
    "ISO 9001",
    "corrugated boxes",
    "folding cartons",
    "rigid gift boxes",
    "Vietnam packaging",
    "China packaging",
    "export cartons",
    "OEM packaging",
  ],
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    url: SITE_URL,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await getMessages();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: ["XinYuan", "Jinhao Xinyuan", "新缘佳"],
    url: SITE_URL,
    logo: `${SITE_URL}/logo.webp`,
    email: "info@jinhaoxy.com",
    description: DEFAULT_DESC,
    address: [
      {
        "@type": "PostalAddress",
        addressLocality: "Bac Ninh",
        addressRegion: "Bac Ninh",
        addressCountry: "VN",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Dongguan",
        addressRegion: "Guangdong",
        addressCountry: "CN",
      },
    ],
    sameAs: ["https://jinhaoxypackaging.en.alibaba.com/"],
  };

  return (
    <html lang={locale} className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
