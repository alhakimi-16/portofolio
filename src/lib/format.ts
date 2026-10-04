import type { Locale } from "@/i18n/config";

const englishOrdinals: Record<string, string> = { one: "st", two: "nd", few: "rd", other: "th" };

/** 97.25 → "97.25%" / "97,25 %"; with `ordinal`, 3 → "3rd" / "3.". */
export function formatStat(
  value: number,
  { locale, decimals, suffix, ordinal }: { locale: Locale; decimals: number; suffix: string; ordinal: boolean },
): string {
  const number = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
  if (!ordinal) return number + suffix;
  if (locale === "de") return `${number}.`;
  const rule = new Intl.PluralRules("en", { type: "ordinal" }).select(Math.round(value));
  return number + (englishOrdinals[rule] ?? "th");
}
