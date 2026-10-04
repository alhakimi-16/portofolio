import Link from "next/link";
import { Fragment } from "react";
import { localeLabels, locales, type Locale } from "@/i18n/config";

export function LangSwitch({ locale, label }: { locale: Locale; label: string }) {
  return (
    <div role="group" aria-label={label} className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.16em]">
      {locales.map((code, i) => (
        <Fragment key={code}>
          {i > 0 && (
            <span aria-hidden className="text-line">
              /
            </span>
          )}
          {code === locale ? (
            <span aria-current="true" className="text-fg">
              {localeLabels[code].short}
            </span>
          ) : (
            <Link
              href={`/${code}`}
              hrefLang={code}
              lang={code}
              aria-label={localeLabels[code].long}
              className="text-muted transition-colors hover:text-accent"
            >
              {localeLabels[code].short}
            </Link>
          )}
        </Fragment>
      ))}
    </div>
  );
}
