import { ArrowDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import type { SiteContent } from "@/content";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/ui";
import { CountUp } from "./CountUp";
import { Typewriter } from "./Typewriter";

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

/** Resize handles around the picture, as on an image placed in a spreadsheet. */
const handles = [
  "-top-1 -left-1",
  "-top-1 left-1/2 -translate-x-1/2",
  "-top-1 -right-1",
  "top-1/2 -left-1 -translate-y-1/2",
  "top-1/2 -right-1 -translate-y-1/2",
  "-bottom-1 -left-1",
  "-bottom-1 left-1/2 -translate-x-1/2",
  "-bottom-1 -right-1",
];

export function Hero({ content, t, locale }: { content: SiteContent; t: Dictionary; locale: Locale }) {
  const { person } = content;

  return (
    <section
      id="top"
      data-sheet="top"
      aria-labelledby="hero-title"
      className="grid grid-cols-12 gap-y-5 px-4 pt-8 pb-14 sm:px-6 lg:gap-y-10 lg:px-0 lg:pt-20 lg:pb-20"
    >
      <div data-range data-start className="range col-span-12 p-6 sm:p-9 lg:col-span-6 lg:col-start-2">
        <p className="font-mono text-sm text-muted">
          <span aria-hidden className="text-sel-ink">
            ›{" "}
          </span>
          <Typewriter words={content.greetings} />
        </p>
        <h1 id="hero-title" className="mt-5 display text-[clamp(3.25rem,10vw,6.75rem)] leading-[0.9] text-ink">
          {person.firstName}
          <br />
          {person.lastName}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{person.intro}</p>
        <div className="mt-8 flex flex-wrap gap-2">
          <a
            href="#contact"
            className="group/cta inline-flex items-center gap-2 bg-sel px-4 py-2.5 text-sm font-semibold text-on-sel transition-colors hover:bg-sel-ink"
          >
            {t.hero.cta}
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
          </a>
          <a
            href="#skills"
            className="inline-flex items-center gap-2 border border-line bg-paper px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-sel hover:text-sel-ink"
          >
            {t.hero.skills}
            <ArrowDown aria-hidden className="size-4" />
          </a>
        </div>
        <p className="mt-6 inline-flex items-center gap-2 bg-fill-green px-2.5 py-1 font-mono text-xs text-ink-green">
          <span aria-hidden className="relative flex size-2">
            <span className="absolute inset-0 animate-[ping_1.8s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-sel" />
            <span className="relative size-2 rounded-full bg-sel" />
          </span>
          {person.availability}
        </p>
      </div>

      <figure
        data-range
        className="range col-span-12 grid grid-cols-[7.5rem_minmax(0,1fr)] items-center gap-x-5 self-start p-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:p-6 lg:col-span-3 lg:col-start-9 lg:block"
      >
        <div className="relative aspect-square outline-1 outline-sel">
          {person.photo ? (
            <Image
              src={person.photo}
              alt={person.name}
              fill
              priority
              sizes="(min-width: 1024px) 18rem, 90vw"
              className="object-cover"
            />
          ) : (
            <div
              aria-hidden
              className="grid size-full place-items-center bg-paper [background-image:conic-gradient(var(--grid)_25%,transparent_0_50%,var(--grid)_0_75%,transparent_0)] [background-size:22px_22px]"
            >
              <span className="display text-[3.25rem] leading-none text-ink sm:text-[4.5rem] lg:text-[6.5rem]">
                {person.initials}
              </span>
            </div>
          )}
          {handles.map((position) => (
            <span key={position} aria-hidden className={`absolute size-2 border border-sel bg-paper ${position}`} />
          ))}
        </div>
        <div className="min-w-0">
          <figcaption className="flex flex-col gap-0.5 font-mono text-xs text-muted lg:mt-3 lg:flex-row lg:items-center lg:justify-between lg:gap-2">
            <span>{t.sheet.picture}</span>
            <span className="truncate">{person.name}</span>
          </figcaption>
          <ul className="mt-3 flex flex-wrap gap-1.5 lg:mt-4">
            {content.stickers.map((sticker) => (
              <li
                key={sticker.text}
                data-hue={sticker.hue}
                className="bg-hue px-2 py-0.5 font-mono text-xs font-medium text-hue-ink"
              >
                {sticker.text}
              </li>
            ))}
          </ul>
        </div>
      </figure>

      <ul data-range className="range col-span-12 grid sm:grid-cols-[1.3fr_1fr_1fr] lg:col-span-10 lg:col-start-2">
        {content.atAGlance.map((item) => (
          <li
            key={item.label}
            className="note relative border-t border-line p-5 first:border-t-0 sm:border-t-0 sm:border-l sm:p-6 sm:first:border-l-0"
          >
            <p className="display text-[2rem] leading-tight text-ink sm:text-[1.625rem] lg:text-[2rem]">
              <Value text={item.value} count={item.count} locale={locale} />
            </p>
            <p className="mt-1 text-sm text-muted">{item.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
