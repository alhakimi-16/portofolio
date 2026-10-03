"use client";

import { useI18n } from "@/components/providers/I18nProvider";
import { useClock, useModKey } from "@/lib/hooks";
import { scrollToTarget } from "@/lib/scroll-lock";

export function Footer({
  name,
  lastName,
  timezone,
  year,
}: {
  name: string;
  lastName: string;
  timezone: string;
  year: number;
}) {
  const { t, locale } = useI18n();
  const time = useClock(timezone, locale);
  const modKey = useModKey();

  return (
    <footer className="overflow-hidden gutter pt-10">
      <div className="grid grid-cols-2 gap-x-5 gap-y-4 border-t border-line pt-6 label text-muted md:grid-cols-4">
        <span>
          © {year} {name}
        </span>
        <span className="tabular">
          {t.footer.localTime} <span className="text-fg">{time}</span>
        </span>
        <span className="hidden md:block">
          <kbd className="text-fg">{modKey} K</kbd> {t.footer.palette}
        </span>
        <button
          type="button"
          onClick={() => scrollToTarget(0)}
          className="col-start-2 justify-self-end text-left uppercase transition-colors hover:text-fg md:col-start-auto"
        >
          ↑ {t.footer.backToTop}
        </button>
      </div>
      <p
        aria-hidden
        className="mt-8 -mb-[0.18em] text-center display text-[20.5vw] leading-[0.8] tracking-[-0.06em] whitespace-nowrap text-fg select-none md:mt-12"
      >
        {lastName}
      </p>
    </footer>
  );
}
