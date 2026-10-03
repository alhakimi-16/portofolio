"use client";

import { useRef } from "react";
import { Ridgelines, RIDGE_SERIES } from "@/components/canvas/Ridgelines";
import { useI18n } from "@/components/providers/I18nProvider";
import { Emphasis } from "@/components/ui/Emphasis";
import { ArrowDown, ArrowUpRight } from "@/components/ui/Icons";
import { Magnetic } from "@/components/ui/Magnetic";
import type { SiteContent } from "@/content";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useClock } from "@/lib/hooks";
import { onIntroReady } from "@/lib/intro";
import { scrollToTarget } from "@/lib/scroll-lock";
import { prefersReducedMotion } from "@/lib/utils";

export function Hero({ person }: { person: SiteContent["person"] }) {
  const { t, locale } = useI18n();
  const root = useRef<HTMLElement>(null);
  const time = useClock(person.timezone, locale);

  useGSAP(
    (_context, contextSafe) => {
      const el = root.current;
      if (!el || !contextSafe) return;
      const hidden = el.querySelectorAll<HTMLElement>("[data-intro]");
      if (prefersReducedMotion()) {
        gsap.set(hidden, { visibility: "visible" });
        return;
      }

      // runs once the preloader lifts — contextSafe keeps it scoped and reverted on unmount
      const intro = contextSafe(() => {
        const name = el.querySelector<HTMLElement>("[data-hero-name]");
        const split = name ? SplitText.create(name, { type: "chars", mask: "chars", charsClass: "split-char" }) : null;
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        if (split) tl.from(split.chars, { yPercent: 105, duration: 1.5, stagger: 0.03 }, 0);
        tl.from(el.querySelectorAll("[data-intro-fade]"), { y: 22, autoAlpha: 0, duration: 1.3, stagger: 0.05 }, 0.3)
          .from(
            el.querySelectorAll("[data-intro-line]"),
            { scaleX: 0, transformOrigin: "left center", duration: 1.6 },
            0.2,
          )
          .set(hidden, { visibility: "visible" }, 0);
      });

      return onIntroReady(intro);
    },
    { scope: root },
  );

  const scrollToWork = (event: React.MouseEvent) => {
    event.preventDefault();
    scrollToTarget("#work");
  };

  return (
    <section id="top" ref={root} className="relative flex min-h-[100svh] flex-col pt-[var(--header-h)]">
      <div data-intro className="flex items-baseline justify-between gap-4 gutter pt-5 label text-muted">
        <span data-intro-fade>{t.hero.figure}</span>
        <span data-intro-fade className="tabular">
          n = {RIDGE_SERIES} {t.hero.series}
          <span className="ml-2 inline-flex items-center gap-1.5 text-fg">
            <span className="size-1.5 animate-pulse rounded-full bg-accent" />
            live
          </span>
        </span>
      </div>

      <Ridgelines className="relative min-h-[34svh] flex-1" />

      <div className="@container gutter">
        <div data-intro className="flex items-baseline justify-between gap-4 pt-3 pb-2 label text-muted">
          <span data-intro-fade className="hidden [@media(hover:hover)]:inline">
            ↳ {t.hero.hint}
          </span>
          <span data-intro-fade className="[@media(hover:hover)]:hidden">
            ↳ {t.hero.hintTouch}
          </span>
          <a
            href="#about"
            data-intro-fade
            className="hidden items-center gap-1.5 hover:text-fg sm:flex"
            onClick={(event) => {
              event.preventDefault();
              scrollToTarget("#about");
            }}
          >
            {t.hero.scroll} <ArrowDown />
          </a>
        </div>
        <h1
          data-intro
          data-hero-name
          className="-ml-[0.04em] pb-[0.16em] display text-[23cqw] leading-[0.92] tracking-[-0.055em] whitespace-nowrap md:text-[10.9cqw] md:leading-[0.84]"
        >
          {person.firstName}
          <br className="md:hidden" /> {person.lastName}
        </h1>
      </div>

      <div data-intro className="gutter pb-6 md:pb-8">
        <div data-intro-line className="h-px bg-line-strong" />
        <div className="grid grid-cols-12 gap-x-5 gap-y-6 pt-5">
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <p data-intro-fade className="flex items-center gap-2 label text-accent">
              <span className="size-1.5 rounded-full bg-accent" />
              {person.role}
            </p>
            <p
              data-intro-fade
              className="mt-3 max-w-[30ch] text-[clamp(1.25rem,2.1vw,1.75rem)] leading-[1.2] tracking-[-0.02em]"
            >
              <Emphasis text={person.tagline} />
            </p>
          </div>

          <dl
            data-intro-fade
            className="col-span-12 grid grid-cols-2 gap-x-5 gap-y-3 label text-muted sm:col-span-7 md:col-span-3 lg:col-start-7"
          >
            <div>
              <dt>{t.hero.status}</dt>
              <dd className="mt-1 flex items-center gap-2 text-fg">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
                {person.availability}
              </dd>
            </div>
            <div>
              <dt>{t.hero.based}</dt>
              <dd className="mt-1 text-fg">
                {person.location} <span className="text-muted tabular">{time}</span>
              </dd>
            </div>
          </dl>

          <div className="col-span-12 flex flex-wrap items-end gap-3 sm:col-span-5 sm:justify-end md:col-span-3 lg:col-span-3">
            <Magnetic>
              <a
                data-intro-fade
                href="#work"
                onClick={scrollToWork}
                className="group flex h-12 items-center gap-2 rounded-full border border-line-strong px-5 text-[0.9375rem] transition-colors hover:border-fg"
              >
                <span data-magnetic-inner className="flex items-center gap-2">
                  {t.hero.viewWork}
                  <ArrowDown className="size-3.5 transition-transform duration-500 ease-expo group-hover:translate-y-0.5" />
                </span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                data-intro-fade
                href={person.cv ?? `mailto:${person.email}`}
                {...(person.cv ? { target: "_blank", rel: "noopener" } : {})}
                className="group flex h-12 items-center gap-2 rounded-full bg-fg px-5 text-[0.9375rem] text-bg transition-colors hover:bg-accent hover:text-accent-ink"
              >
                <span data-magnetic-inner className="flex items-center gap-2">
                  {person.cv ? t.hero.downloadCv : t.contact.cta}
                  <ArrowUpRight className="size-3.5" />
                </span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
