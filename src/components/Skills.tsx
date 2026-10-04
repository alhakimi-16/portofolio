import type { SiteContent } from "@/content";
import type { Dictionary } from "@/i18n/ui";
import { hues, vars } from "@/lib/utils";
import { Icon } from "./Icon";
import { Section } from "./Section";

export function Skills({ content, t }: { content: SiteContent; t: Dictionary }) {
  const groups = [
    { label: t.skills.technical, items: content.skills.technical },
    { label: t.skills.personal, items: content.skills.personal },
  ];

  return (
    <Section id="skills" nav="skills" hue="sun" {...t.sections.skills}>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-10">
        {groups.map((group, g) => (
          <div key={group.label}>
            <h3
              data-reveal
              className="mb-4 flex items-center gap-3 font-sans text-sm font-bold tracking-[0.14em] text-muted uppercase"
            >
              {group.label}
              <span aria-hidden className="h-px flex-1 bg-line" />
            </h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {group.items.map((skill, i) => (
                <li
                  key={skill.name}
                  data-reveal
                  data-hue={hues[(i + g * 2) % hues.length]}
                  style={vars({ "--d": `${i * 80}ms` })}
                >
                  <div className="group flex h-full items-center gap-4 card p-4 transition-[translate,border-color] duration-300 hover:-translate-y-1 hover:border-hue">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-hue/15 text-hue-ink transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      <Icon name={skill.icon} className="size-6" />
                    </span>
                    <div className="min-w-0">
                      <p className="leading-snug font-semibold text-fg">{skill.name}</p>
                      {skill.note && <p className="text-sm">{skill.note}</p>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
