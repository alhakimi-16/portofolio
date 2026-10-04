import type { SiteContent } from "@/content";
import type { Dictionary } from "@/i18n/ui";
import { vars } from "@/lib/utils";
import { Chapter } from "./Chapter";

const listTitle = "stagger label text-muted";
const rule = "draw-x mt-4 block h-px bg-ink";
const row = "stagger group border-b border-rule py-4";
const name = "sweep text-[1.0625rem] font-semibold text-ink";

/** Each list draws its top rule, then its rows follow one another. */
export function Skills({ content, t }: { content: SiteContent; t: Dictionary }) {
  const { technical, personal } = content.skills;

  return (
    <Chapter id="skills" {...t.sections.skills}>
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-12">
        <div data-reveal="group" style={vars({ "--step": "55ms" })}>
          <h3 className={listTitle}>{t.skills.technical}</h3>
          <span aria-hidden className={rule} />
          <ul>
            {technical.map((skill, i) => (
              <li
                key={skill.name}
                className={`${row} grid gap-x-6 gap-y-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-baseline`}
                style={vars({ "--i": i + 1 })}
              >
                <span>
                  <span className={name}>{skill.name}</span>
                </span>
                {skill.note && <span className="text-muted italic sm:text-right">{skill.note}</span>}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-14">
          <div data-reveal="group" style={vars({ "--d": "150ms", "--step": "55ms" })}>
            <h3 className={listTitle}>{t.skills.personal}</h3>
            <span aria-hidden className={rule} />
            <ul>
              {personal.map((skill, i) => (
                <li key={skill.name} className={row} style={vars({ "--i": i + 1 })}>
                  <span className={name}>{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal="group" style={vars({ "--d": "300ms", "--step": "70ms" })}>
            <h3 className={listTitle}>{t.skills.languages}</h3>
            <span aria-hidden className={rule} />
            <ul>
              {content.languages.map((language, i) => (
                <li
                  key={language.name}
                  data-hue={language.hue}
                  className={`${row} flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1`}
                  style={vars({ "--i": i + 1 })}
                >
                  <span className="flex items-center gap-2.5">
                    <span aria-hidden className="pop size-2 shrink-0 bg-hue" />
                    <span className={name}>{language.name}</span>
                  </span>
                  <span className="text-muted italic">{language.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
