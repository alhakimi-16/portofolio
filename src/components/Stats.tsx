import type { SiteContent } from "@/content";
import type { Locale } from "@/i18n/config";
import { vars } from "@/lib/utils";
import { CountUp } from "./CountUp";

/** Four numbers from the CV that count up when they appear. */
export function Stats({ stats, locale }: { stats: SiteContent["stats"]; locale: Locale }) {
  return (
    <div className="relative mx-auto max-w-6xl px-5 pb-20 sm:px-8 md:pb-24">
      <dl className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            data-reveal
            data-hue={stat.hue}
            className="relative flex flex-col-reverse justify-end overflow-hidden card p-5 sm:p-6"
            style={vars({ "--d": `${i * 90}ms` })}
          >
            <span aria-hidden className="absolute -top-8 -right-8 size-24 rounded-full bg-hue/15" />
            <dt className="relative mt-2 text-sm leading-snug">{stat.label}</dt>
            <dd className="relative font-display text-[2.5rem] leading-none font-extrabold tracking-tight text-hue-ink tabular-nums sm:text-5xl">
              <CountUp
                value={stat.value}
                decimals={stat.decimals}
                suffix={stat.suffix}
                ordinal={stat.ordinal}
                locale={locale}
              />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
