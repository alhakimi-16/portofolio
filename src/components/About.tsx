import type { SiteContent } from "@/content";
import type { Hue } from "@/content/types";
import type { Dictionary } from "@/i18n/ui";
import { vars } from "@/lib/utils";
import { Icon } from "./Icon";
import { Section } from "./Section";

/** Turns "==phrase==" into a marker highlight that sweeps in when the text appears. */
function Highlights({ text, hue, delay = 450 }: { text: string; hue: Hue; delay?: number }) {
  return text.split(/(==[^=]+==)/).map((part, i) =>
    part.startsWith("==") ? (
      <mark key={i} className="marker" data-hue={hue} style={vars({ "--d": `${delay}ms` })}>
        {part.slice(2, -2)}
      </mark>
    ) : (
      part
    ),
  );
}

/** "About me": one opening line, then three short cards (studies, practice, what shaped me). */
export function About({ content, t }: { content: SiteContent; t: Dictionary }) {
  const { lead, chapters } = content.about;

  return (
    <Section id="about" nav="about" hue="blue" {...t.sections.about}>
      <p
        data-reveal
        className="max-w-4xl font-display text-2xl leading-snug font-bold tracking-tight text-fg sm:text-[2rem] sm:leading-[1.3]"
      >
        <Highlights text={lead} hue="blue" delay={350} />
      </p>

      <ol className="mt-10 grid gap-4 sm:mt-12 lg:grid-cols-3">
        {chapters.map((chapter, i) => (
          <li key={chapter.title} data-reveal data-hue={chapter.hue} style={vars({ "--d": `${i * 110}ms` })}>
            <article className="group relative h-full overflow-hidden card p-6 transition-[translate,border-color] duration-300 hover:-translate-y-1 hover:border-hue sm:p-7">
              <span
                aria-hidden
                className="absolute -top-12 -right-12 size-32 rounded-full bg-hue/10 transition-transform duration-500 group-hover:scale-125"
              />
              <div className="relative flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-hue/15 text-hue-ink transition-transform duration-300 group-hover:-rotate-6">
                  <Icon name={chapter.icon} className="size-6" />
                </span>
                <span aria-hidden className="font-display text-4xl font-extrabold text-hue-ink/25 tabular-nums">
                  0{i + 1}
                </span>
              </div>
              <h3 className="relative mt-5 text-xl font-extrabold tracking-tight">{chapter.title}</h3>
              <p className="relative mt-2 leading-relaxed">
                <Highlights text={chapter.text} hue={chapter.hue} delay={450 + i * 110} />
              </p>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
