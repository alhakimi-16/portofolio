export const locales = ["en", "de"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, { short: string; long: string; og: string }> = {
  en: { short: "EN", long: "English", og: "en_US" },
  de: { short: "DE", long: "Deutsch", og: "de_DE" },
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "de" : "en";
}
