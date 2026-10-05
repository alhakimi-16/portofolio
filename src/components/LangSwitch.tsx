import Link from "next/link";
import { localeLabels, locales, type Locale } from "@/i18n/config";

/** EN | DE toggle. Switching keeps the scroll position. */
export function LangSwitch({ locale, label }: { locale: Locale; label: string }) {
  return (
    <div role="group" aria-label={label} className="flex items-center rounded-full bg-fg/[0.07] p-1 text-xs font-bold">
      {locales.map((code) =>
        code === locale ? (
          <span key={code} aria-current="true" className="rounded-full bg-surface px-2.5 py-1 text-fg shadow-sm">
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
            className="rounded-full px-2.5 py-1 text-muted transition-colors hover:text-fg"
          >
            {localeLabels[code].short}
          </Link>
        ),
      )}
    </div>
  );
}
