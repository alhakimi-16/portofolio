import type { Locale } from "@/i18n/config";

/** 21 → "21"; with decimals and a suffix e.g. 97.25 → "97.25%" / "97,25 %". */
export function formatStat(
  value: number,
  { locale, decimals, suffix }: { locale: Locale; decimals: number; suffix: string },
): string {
  const number = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
  return number + suffix;
}
