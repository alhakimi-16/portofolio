import { ArrowDown, ArrowRight } from "lucide-react";
import type { SiteContent } from "@/content";
import type { Dictionary } from "@/i18n/ui";
import { vars } from "@/lib/utils";
import { Blobs } from "./Blobs";
import { Greeting } from "./Greeting";
import { Magnetic } from "./Magnetic";
import { Portrait } from "./Portrait";

export function Hero({ content, t, children }: { content: SiteContent; t: Dictionary; children?: React.ReactNode }) {
  const { person } = content;

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <Blobs className="[mask-image:linear-gradient(black_55%,transparent)]" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle,var(--line)_1.3px,transparent_1.5px)] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)] [background-size:26px_26px]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pt-32 pb-14 sm:px-8 md:grid-cols-[1.3fr_1fr] md:gap-10 md:pt-40 md:pb-20">
        <div>
          <p className="group flex rise items-center gap-3 font-display text-[1.75rem] leading-none font-bold sm:text-[2.125rem]">
            <span
              aria-hidden
              className="inline-block origin-[70%_75%] animate-[wave_2.2s_ease-in-out_0.9s_2] emoji group-hover:animate-[wave_1.6s_ease-in-out]"
            >
              👋
            </span>
            <Greeting words={content.greetings} />
          </p>

          <h1
            id="hero-title"
            className="mt-5 rise text-[clamp(3rem,9vw,5.75rem)] leading-[0.98] font-extrabold tracking-[-0.035em]"
            style={vars({ "--d": "120ms" })}
          >
            <span className="font-semibold text-muted">{t.hero.iam} </span>
            {person.firstName}
            <br />
            <span className="inline-block shimmer-text pb-[0.08em]">{person.lastName}</span>
          </h1>

          <p className="mt-6 max-w-xl rise text-lg leading-relaxed text-fg sm:text-xl" style={vars({ "--d": "220ms" })}>
            {person.intro}
          </p>

          <div className="mt-9 flex rise flex-wrap items-center gap-3" style={vars({ "--d": "320ms" })}>
            <Magnetic>
              <a
                href="#contact"
                className="group/cta inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3.5 font-semibold text-bg shadow-[var(--shadow)] transition-[background-color,box-shadow] hover:bg-blue hover:shadow-lg"
              >
                {t.hero.cta}
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover/cta:translate-x-1" />
              </a>
            </Magnetic>
            <a
              href="#skills"
              className="group/path inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-6 py-3.5 font-semibold text-fg backdrop-blur transition-colors hover:border-fg"
            >
              {t.hero.skills}
              <ArrowDown aria-hidden className="size-4 transition-transform group-hover/path:translate-y-0.5" />
            </a>
          </div>

          <p
            className="mt-8 inline-flex rise items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1.5 pr-4 pl-3 text-sm font-medium text-fg backdrop-blur"
            style={vars({ "--d": "420ms" })}
          >
            <span aria-hidden className="relative flex size-2.5" data-hue="mint">
              <span className="absolute inset-0 animate-[ping_1.8s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-hue" />
              <span className="relative size-2.5 rounded-full bg-hue" />
            </span>
            {person.availability}
          </p>
        </div>

        <div className="rise" style={vars({ "--d": "260ms" })}>
          <Portrait photo={person.photo} initials={person.initials} name={person.name} stickers={content.stickers} />
        </div>
      </div>
      {children}
    </section>
  );
}
