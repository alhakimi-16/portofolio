import Link from "next/link";
import { localeLabels, locales, type Locale } from "@/i18n/config";

/** EN | DE. Switching keeps the scroll position. */
export function LangSwitch({ locale, label }: { locale: Locale; label: string }) {
  return (
    <div role="group" aria-label={label} className="flex items-center border border-line bg-paper font-mono text-xs">
      {locales.map((code) =>
        code === locale ? (
          <span key={code} aria-current="true" className="bg-sel px-2 py-1 font-semibold text-on-sel">
            {localeLabels[code].short}
          </span>
        ) : (
          <Link
            key={code}
            href={`/${code}`}
            hrefLang={code}
            lang={code}
            scroll={false}
            aria-label={localeLabels[code].long}
            className="px-2 py-1 text-muted transition-colors hover:text-ink"
          >
            {localeLabels[code].short}
          </Link>
        ),
      )}
    </div>
  );
}
