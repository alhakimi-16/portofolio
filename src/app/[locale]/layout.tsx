import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "lenis/dist/lenis.css";
import "../globals.css";
import { fontVariables } from "../fonts";
import { hasLocale, localeLabels, locales, otherLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/ui";
import { getContent } from "@/content";
import { bootScript } from "@/lib/boot";
import { siteUrl } from "@/lib/site";
import { InlineScript } from "@/components/ui/InlineScript";
import { SkipLink } from "@/components/ui/SkipLink";
import { Providers } from "@/components/providers/Providers";
import { DocumentState } from "@/components/layout/DocumentState";
import { Preloader } from "@/components/layout/Preloader";
import { Header } from "@/components/layout/Header";
import { Cursor } from "@/components/layout/Cursor";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { GridOverlay } from "@/components/layout/GridOverlay";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const t = getDictionary(locale);
  const { person, draft } = getContent(locale);
  const title = `${person.name} — ${person.role}`;

  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s — ${person.name}` },
    description: t.meta.description,
    applicationName: person.name,
    authors: [{ name: person.name }],
    creator: person.name,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", de: "/de", "x-default": "/en" },
    },
    openGraph: {
      type: "profile",
      title,
      description: t.meta.description,
      url: `/${locale}`,
      siteName: person.name,
      locale: localeLabels[locale].og,
      alternateLocale: localeLabels[otherLocale(locale)].og,
      firstName: person.firstName,
      lastName: person.lastName,
    },
    twitter: { card: "summary_large_image", title, description: t.meta.description },
    // Keep the draft out of search engines until the real content is in.
    robots: draft ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#0b0b0a",
  colorScheme: "dark light",
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const t = getDictionary(locale);
  const content = getContent(locale);

  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <head>
        <InlineScript html={bootScript} />
      </head>
      <body>
        <Providers locale={locale}>
          <DocumentState />
          <SkipLink label={t.header.skip} />
          <Preloader name={content.person.name} />
          <Header
            initials={content.person.initials}
            name={content.person.name}
            email={content.person.email}
            socials={content.socials}
            timezone={content.person.timezone}
          />
          {children}
          <CommandPalette email={content.person.email} socials={content.socials} cv={content.person.cv} />
          <Cursor />
          <GridOverlay />
          {content.draft && (
            <p className="pointer-events-none fixed bottom-3 left-3 z-[35] flex items-center gap-1.5 rounded-full border border-line-strong bg-bg/80 px-2.5 py-1 label text-[0.625rem] text-muted backdrop-blur-md print:hidden">
              <span className="size-1.5 rounded-full bg-accent" />
              {t.draft}
            </p>
          )}
          <div className="grain" aria-hidden />
        </Providers>
      </body>
    </html>
  );
}
