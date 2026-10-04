import type { SiteContent } from "@/content";
import type { Dictionary } from "@/i18n/ui";
import { vars } from "@/lib/utils";
import { Icon } from "./Icon";
import { Section } from "./Section";

export function Awards({ content, t }: { content: SiteContent; t: Dictionary }) {
  return (
    <Section id="awards" nav="skills" hue="coral" className="pt-4 sm:pt-8" {...t.sections.awards}>
      <ul className="grid gap-4 md:grid-cols-2">
        {content.awards.map((award, i) => (
          <li key={award.name} data-reveal data-hue={award.hue} style={vars({ "--d": `${i * 90}ms` })}>
            <div className="group flex h-full items-center gap-5 card p-5 transition-[translate,border-color] duration-300 hover:-translate-y-1 hover:border-hue sm:p-6">
              <span className="relative grid size-16 shrink-0 place-items-center">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full border-2 border-dashed border-hue transition-transform duration-700 ease-(--ease) group-hover:rotate-90"
                />
                <span className="grid size-12 place-items-center rounded-full bg-hue/15 text-hue-ink">
                  <Icon name={award.icon} className="size-6" />
                </span>
              </span>
              <div className="min-w-0">
                <h3 className="text-lg leading-snug font-bold">{award.name}</h3>
                <p className="mt-0.5 text-sm leading-snug">{award.issuer}</p>
                {award.period && (
                  <p className="mt-2 text-xs font-bold tracking-wide text-hue-ink tabular-nums">{award.period}</p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
