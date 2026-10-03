"use client";

import Link from "next/link";
import { Fragment } from "react";
import { useI18n } from "@/components/providers/I18nProvider";
import { localeLabels, locales } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function LangSwitch({ className }: { className?: string }) {
  const { locale, t } = useI18n();

  return (
    <div role="group" aria-label={t.header.language} className={cn("flex items-center gap-1.5 label", className)}>
      {locales.map((code, i) => (
        <Fragment key={code}>
          {i > 0 && (
            <span aria-hidden className="text-faint">
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
              scroll={false}
              aria-label={localeLabels[code].long}
              className="text-muted transition-colors hover:text-fg"
            >
              {localeLabels[code].short}
            </Link>
          )}
        </Fragment>
      ))}
    </div>
  );
}
