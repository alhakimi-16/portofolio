import Link from "next/link";
import { Fragment } from "react";
import { localeLabels, locales, type Locale } from "@/i18n/config";

/** EN / DE. Switching keeps the scroll position. */
export function LangSwitch({ locale, label }: { locale: Locale; label: string }) {
  return (
    <div role="group" aria-label={label} className="flex items-center label">
      {locales.map((code, i) => (
        <Fragment key={code}>
          {i > 0 && (
            <span aria-hidden className="text-muted/50">
              /
            </span>
          )}
          {code === locale ? (
            <span aria-current="true" className="px-1.5 py-2 text-ink">
              {localeLabels[code].short}
            </span>
          ) : (
            <Link
              href={`/${code}`}
              hrefLang={code}
              lang={code}
              scroll={false}
              aria-label={localeLabels[code].long}
              className="px-1.5 py-2 text-muted transition-colors hover:text-blue-ink"
            >
              {localeLabels[code].short}
            </Link>
          )}
        </Fragment>
      ))}
    </div>
  );
}
