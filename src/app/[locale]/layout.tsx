import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { fontVariables } from "../fonts";
import { getContent } from "@/content";
import { hasLocale, localeLabels, locales, otherLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/ui";
import { siteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const t = getDictionary(locale);
  const { person } = getContent(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: t.meta.title,
    description: t.meta.description,
    applicationName: person.name,
    authors: [{ name: person.name }],
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", de: "/de", "x-default": "/en" },
    },
    openGraph: {
      type: "profile",
      title: t.meta.title,
      description: t.meta.description,
      url: `/${locale}`,
      siteName: person.name,
      locale: localeLabels[locale].og,
      alternateLocale: localeLabels[otherLocale(locale)].og,
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1218" },
  ],
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  return (
    <html lang={locale} className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
