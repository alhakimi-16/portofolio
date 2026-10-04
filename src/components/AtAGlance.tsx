import type { SiteContent } from "@/content";
import type { Locale } from "@/i18n/config";
import { vars } from "@/lib/utils";
import { CountUp } from "./CountUp";
import { Icon } from "./Icon";

/** "{n} languages" with the number counting up. */
function Value({ text, count, locale }: { text: string; count?: number; locale: Locale }) {
  const [before, after] = text.split("{n}");
  if (count === undefined || after === undefined) return text;
  return (
    <>
      {before}
      <CountUp value={count} decimals={0} suffix="" locale={locale} />
      {after}
    </>
  );
}

/** Three highlights below the hero: what I study, how many languages I speak, what I work as. */
export function AtAGlance({ items, locale }: { items: SiteContent["atAGlance"]; locale: Locale }) {
  return (
    <div className="relative mx-auto max-w-6xl px-5 pb-20 sm:px-8 md:pb-24">
      <ul className="grid gap-3 sm:gap-4 lg:grid-cols-[1.3fr_1fr_1fr]">
        {items.map((item, i) => (
          <li
            key={item.label}
            data-reveal
            data-hue={item.hue}
            className="relative flex items-center gap-4 overflow-hidden card p-5 sm:p-6 lg:flex-col lg:items-start"
            style={vars({ "--d": `${i * 90}ms` })}
          >
            <span aria-hidden className="absolute -top-8 -right-8 size-24 rounded-full bg-hue/15" />
            <span className="relative grid size-12 shrink-0 place-items-center rounded-2xl bg-hue/15 text-hue-ink">
              <Icon name={item.icon} className="size-6" />
            </span>
            <div className="relative min-w-0">
              <p className="font-display text-[1.625rem] leading-tight font-extrabold tracking-[-0.02em] text-hue-ink xl:text-[1.75rem]">
                <Value text={item.value} count={item.count} locale={locale} />
              </p>
              <p className="mt-1 text-sm leading-snug">{item.label}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
