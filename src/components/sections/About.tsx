import { HalftonePortrait } from "@/components/canvas/HalftonePortrait";
import { Counter } from "@/components/ui/Counter";
import { Emphasis } from "@/components/ui/Emphasis";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollHighlight } from "@/components/ui/ScrollHighlight";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SiteContent } from "@/content";
import type { Dictionary } from "@/i18n/ui";

export function About({ content, t }: { content: SiteContent; t: Dictionary }) {
  const { about, person } = content;
  const facts: [string, string][] = [
    [t.about.facts.based, about.facts.based],
    [t.about.facts.focus, about.facts.focus],
    [t.about.facts.currently, about.facts.currently],
    [t.about.facts.languages, about.facts.languages],
    [t.about.facts.openTo, about.facts.openTo],
  ];

  return (
    <Reveal as="section" id="about" aria-labelledby="about-title" className="gutter pt-28 pb-24 md:pt-40 md:pb-36">
      <SectionHeading index="01" label={t.about.label} figure={t.about.figure} />
      <h2 id="about-title" className="sr-only">
        {t.about.label}
      </h2>

      <ScrollHighlight className="mt-12 max-w-[24ch] text-[clamp(2rem,4.7vw,4.6rem)] leading-[1.02] font-medium tracking-[-0.035em] md:mt-20">
        <Emphasis text={about.statement} />
      </ScrollHighlight>

      <div className="mt-20 grid grid-cols-12 gap-x-5 gap-y-14 md:mt-28">
        <figure data-reveal className="col-span-12 sm:col-span-8 md:col-span-5 lg:col-span-4">
          <HalftonePortrait
            src={person.portrait}
            text={person.initials}
            className="aspect-[4/5] w-full border border-line bg-elevated"
          />
          <figcaption className="mt-3 flex justify-between gap-4 label text-muted">
            <span>{t.about.portrait}</span>
          </figcaption>
        </figure>

        <div className="col-span-12 md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7">
          <div className="grid gap-5 text-[1.0625rem] leading-relaxed text-muted md:text-lg">
            {about.paragraphs.map((paragraph, i) => (
              <p key={i} data-reveal={i * 0.08}>
                {paragraph}
              </p>
            ))}
          </div>

          <dl className="mt-12 border-t border-line">
            {facts.map(([label, value], i) => (
              <div
                key={label}
                data-reveal={i * 0.05}
                className="grid grid-cols-[minmax(7rem,1fr)_2fr] gap-4 border-b border-line py-3.5"
              >
                <dt className="pt-1 label text-muted">{label}</dt>
                <dd className="text-[0.9375rem]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <ul className="mt-24 grid grid-cols-2 gap-px border-y border-line bg-line md:mt-32 md:grid-cols-4">
        {about.metrics.map((metric, i) => (
          <li key={metric.label} className="bg-bg">
            <div
              data-reveal={i * 0.06}
              className="flex h-full flex-col justify-between gap-8 px-4 py-6 md:px-6 md:py-8"
            >
              <span className="label text-muted">({String(i + 1).padStart(2, "0")})</span>
              <div>
                <Counter
                  value={metric.value}
                  suffix={metric.suffix}
                  className="block display text-[clamp(3.25rem,7vw,6.5rem)] leading-none tabular"
                />
                <span className="mt-2 block text-[0.9375rem] text-muted">{metric.label}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
