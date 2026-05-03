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

export const metadata: Metadata = {
  title: {
    default: "Jinhao Xinyuan Group — Premium Packaging Manufacturer",
    template: "%s | Jinhao Xinyuan Group",
  },
  description:
    "FSC® and ISO-certified packaging manufacturer. Corrugated boxes, folding cartons, rigid & gift boxes, labels and eco packaging. Factories in Vietnam & China.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
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

  return (
    <html lang={locale} className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
