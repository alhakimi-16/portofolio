import type { SiteContent } from "@/content";
import type { Dictionary } from "@/i18n/ui";
import { hues, vars } from "@/lib/utils";
import { Icon } from "./Icon";
import { Section } from "./Section";

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3
      data-reveal
      className="mb-4 flex items-center gap-3 font-sans text-sm font-bold tracking-[0.14em] text-muted uppercase"
    >
      {children}
      <span aria-hidden className="h-px flex-1 bg-line" />
    </h3>
  );
}

export function Skills({ content, t }: { content: SiteContent; t: Dictionary }) {
  const { technical, personal } = content.skills;

  return (
    <Section id="skills" nav="skills" hue="violet" {...t.sections.skills}>
      <GroupLabel>{t.skills.technical}</GroupLabel>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {technical.map((skill, i) => (
          <li
            key={skill.name}
            data-reveal
            data-hue={hues[i % hues.length]}
            style={vars({ "--d": `${(i % 4) * 80}ms` })}
          >
            <div className="group flex h-full items-center gap-4 card p-4 transition-[translate,border-color] duration-300 hover:-translate-y-1 hover:border-hue sm:flex-col sm:items-start sm:gap-5 sm:p-5">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-hue/15 text-hue-ink transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <Icon name={skill.icon} className="size-6" />
              </span>
              <div className="min-w-0">
                <p className="text-lg leading-snug font-bold text-fg">{skill.name}</p>
                {skill.note && <p className="mt-1 text-sm leading-snug">{skill.note}</p>}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-10">
        <div>
          <GroupLabel>{t.skills.personal}</GroupLabel>
          <ul className="flex flex-wrap gap-2.5">
            {personal.map((skill, i) => (
              <li key={skill.name} data-reveal data-hue={hues[i % hues.length]} style={vars({ "--d": `${i * 60}ms` })}>
                <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pr-4 pl-1.5 font-semibold text-fg transition-colors hover:border-hue">
                  <span className="grid size-8 place-items-center rounded-full bg-hue/15 text-hue-ink">
                    <Icon name={skill.icon} className="size-4" />
                  </span>
                  {skill.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <GroupLabel>{t.skills.languages}</GroupLabel>
          <ul className="flex flex-wrap gap-2.5">
            {content.languages.map((language, i) => (
              <li key={language.name} data-reveal data-hue={language.hue} style={vars({ "--d": `${i * 60}ms` })}>
                <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-2 pr-4 pl-3.5 transition-colors hover:border-hue">
                  <span aria-hidden className="size-2.5 rounded-full bg-hue" />
                  <span className="font-semibold text-fg">{language.name}</span>
                  <span className="text-sm">{language.level}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
