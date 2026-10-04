import type { SiteContent } from "@/content";
import type { Dictionary } from "@/i18n/ui";
import { vars } from "@/lib/utils";
import { Chapter } from "./Chapter";

const listTitle = "label text-muted";
const list = "mt-4 border-t border-ink";
const row = "group border-b border-rule py-4";
const name = "sweep font-sans text-[1.0625rem] font-semibold text-ink";

export function Skills({ content, t }: { content: SiteContent; t: Dictionary }) {
  const { technical, personal } = content.skills;

  return (
    <Chapter id="skills" {...t.sections.skills}>
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-12">
        <div data-reveal>
          <h3 className={listTitle}>{t.skills.technical}</h3>
          <ul className={list}>
            {technical.map((skill) => (
              <li
                key={skill.name}
                className={`${row} grid gap-x-6 gap-y-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-baseline`}
              >
                <span>
                  <span className={name}>{skill.name}</span>
                </span>
                {skill.note && <span className="font-serif text-muted italic sm:text-right">{skill.note}</span>}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-14">
          <div data-reveal style={vars({ "--d": "120ms" })}>
            <h3 className={listTitle}>{t.skills.personal}</h3>
            <ul className={list}>
              {personal.map((skill) => (
                <li key={skill.name} className={row}>
                  <span className={name}>{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal style={vars({ "--d": "240ms" })}>
            <h3 className={listTitle}>{t.skills.languages}</h3>
            <ul className={list}>
              {content.languages.map((language) => (
                <li
                  key={language.name}
                  data-hue={language.hue}
                  className={`${row} flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1`}
                >
                  <span className="flex items-center gap-2.5">
                    <span aria-hidden className="size-2 shrink-0 bg-hue" />
                    <span className={name}>{language.name}</span>
                  </span>
                  <span className="font-serif text-muted italic">{language.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
