import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n/config";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === defaultLocale ? 1 : 0.9,
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}`])) },
  }));
}
