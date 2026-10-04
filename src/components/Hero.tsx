import { ArrowDown, ArrowDownRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import type { SiteContent } from "@/content";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/ui";
import { cn, pad, vars, wrap } from "@/lib/utils";
import { Pulse } from "./Chapter";
import { CountUp } from "./CountUp";
import { Greeting } from "./Greeting";

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

/**
 * The opening page: the name set very large, a rule, the introduction and the contents.
 * Below it the three highlights and the keywords.
 */
export function Hero({
  content,
  t,
  locale,
  items,
}: {
  content: SiteContent;
  t: Dictionary;
  locale: Locale;
  items: { id: string; label: string }[];
}) {
  const { person } = content;

  return (
    <section id="top" aria-labelledby="hero-title" className={cn(wrap, "pt-8 pb-8 sm:pt-12 lg:pt-14")}>
      <div className="@container">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 label text-muted">
          <p>{t.hero.portfolio}</p>
          <p className="inline-flex items-center gap-2.5 text-ink">
            <Pulse />
            {person.availability}
          </p>
        </div>

        <p className="mt-10 font-serif text-[clamp(1.5rem,3.4cqi,2.5rem)] leading-none italic sm:mt-14">
          <span className="text-violet-ink">
            <Greeting words={content.greetings} />
          </span>{" "}
          <span className="text-muted">{t.hero.iam}</span>
        </p>

        {/* Both lines are set as one justified block: the font size makes the longer line's ink
            span the column, the first line is tracked out to match, and the negative margins
            put each line's first letter on the column edge (measured for Archivo at 115 %). */}
        <h1
          id="hero-title"
          className="mt-3 display text-[length:16.43cqi] leading-[0.86] whitespace-nowrap text-ink sm:mt-4"
        >
          <span className="-ml-[0.0806em] block overflow-hidden pt-[0.04em] pb-[0.06em] tracking-[-0.0167em]">
            {person.firstName}
          </span>{" "}
          <span className="-ml-[0.0151em] block overflow-hidden pt-[0.04em] pb-[0.06em]">{person.lastName}</span>
        </h1>
      </div>

      <div aria-hidden className="mt-6 h-px origin-left animate-[draw_1.4s_var(--ease)_200ms_both] bg-ink sm:mt-8" />

      <div className="mt-8 grid gap-12 md:grid-cols-12 md:gap-x-8 lg:mt-10">
        <div className="md:col-span-6 lg:col-span-7">
          <p
            data-reveal
            className="max-w-[32ch] font-serif text-[clamp(1.375rem,2.5vw,2.125rem)] leading-[1.3] text-ink"
            style={vars({ "--d": "350ms" })}
          >
            {person.intro}
          </p>
          <div
            data-reveal
            className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 lg:mt-10"
            style={vars({ "--d": "450ms" })}
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 bg-ink px-5 py-3.5 label text-paper transition-colors hover:bg-blue-ink dark:hover:bg-blue"
            >
              {t.hero.cta}
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#skills" className="group inline-flex items-center gap-2 py-2 label text-ink">
              <span className="link-line pb-1">{t.hero.skills}</span>
              <ArrowDown aria-hidden className="size-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>

        <div className="md:col-span-6 lg:col-span-4 lg:col-start-9">
          {person.photo && (
            <figure data-reveal className="relative mb-8 aspect-[4/5] w-full max-w-xs overflow-hidden lg:max-w-none">
              <Image
                src={person.photo}
                alt={person.name}
                fill
                priority
                sizes="(min-width: 1024px) 24rem, 20rem"
                className="object-cover"
              />
            </figure>
          )}
          <nav aria-labelledby="contents-title" data-reveal style={vars({ "--d": "550ms" })}>
            <h2 id="contents-title" className="label text-muted">
              {t.hero.contents}
            </h2>
            <ol className="mt-3 border-t border-rule">
              {items.map((item, i) => (
                <li key={item.id} className="border-b border-rule">
                  <a href={`#${item.id}`} className="group flex items-baseline gap-4 py-3">
                    <span className="label text-blue-ink tabular-nums">{pad(i + 1)}</span>
                    <span className="sweep font-serif text-xl text-ink">{item.label}</span>
                    <ArrowDownRight
                      aria-hidden
                      className="ml-auto size-4 self-center text-muted transition-[translate,color] duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-ink"
                    />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      <ul aria-label={t.hero.glance} className="mt-16 grid border-y border-ink sm:grid-cols-3 lg:mt-24">
        {content.atAGlance.map((item, i) => (
          <li
            key={item.label}
            data-hue={item.hue}
            data-reveal
            style={vars({ "--d": `${i * 120}ms` })}
            className="border-rule py-6 not-first:border-t sm:px-6 sm:py-8 sm:not-first:border-t-0 sm:not-first:border-l sm:first:pl-0 sm:last:pr-0"
          >
            <span aria-hidden className="block h-1 w-10 bg-hue" />
            <p className="mt-5 font-serif text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] text-ink">
              <Value text={item.value} count={item.count} locale={locale} />
            </p>
            <p className="mt-3 label text-muted">{item.label}</p>
          </li>
        ))}
      </ul>

      <div data-reveal className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-8">
        <p id="keywords-title" className="shrink-0 label text-muted">
          {t.hero.keywords}
        </p>
        <ul aria-labelledby="keywords-title" className="flex flex-wrap gap-x-3 gap-y-1 font-serif text-muted italic">
          {content.marquee.map((keyword, i) => (
            <li key={keyword.text}>
              {keyword.text}
              {i < content.marquee.length - 1 && (
                <span aria-hidden className="ml-3 text-muted/40 not-italic">
                  /
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
