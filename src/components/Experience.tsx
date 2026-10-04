import type { SiteContent } from "@/content";
import type { Dictionary } from "@/i18n/ui";
import { vars } from "@/lib/utils";
import { Chapter, Pulse } from "./Chapter";
import { RoleArt } from "./RoleArt";

/**
 * The roles on a timeline: a green dot for each (both are current), joined by a line that draws
 * itself while you scroll, and a small line drawing of what the job is about.
 */
export function Experience({ content, t }: { content: SiteContent; t: Dictionary }) {
  const roles = content.experience;

  return (
    <Chapter id="experience" {...t.sections.experience}>
      <ol className="border-t border-ink">
        {roles.map((role, i) => (
          <li
            key={`${role.org}-${role.title}`}
            data-reveal="group"
            className="relative grid gap-x-8 gap-y-6 border-b border-rule py-10 pl-7 md:grid-cols-[12rem_minmax(0,1fr)] md:pl-0 lg:py-14"
          >
            <span aria-hidden className="absolute top-[calc(2.5rem+0.4rem)] left-0 lg:top-[calc(3.5rem+0.4rem)]">
              <Pulse />
            </span>
            {i < roles.length - 1 && (
              <span
                aria-hidden
                className="absolute top-[calc(2.5rem+1.4rem)] -bottom-10 left-[3.5px] w-px bg-rule lg:top-[calc(3.5rem+1.4rem)] lg:-bottom-14"
              >
                <span className="timeline block size-full bg-blue" />
              </span>
            )}

            <div className="flex items-start justify-between gap-6 md:flex-col md:justify-start md:pl-7">
              <div className="flex flex-col gap-2">
                <p className="label text-ink">{role.period}</p>
                {role.kind && <p className="label text-violet-ink">{role.kind}</p>}
              </div>
              <RoleArt art={role.art} className="w-28 shrink-0 sm:w-32 md:mt-3 md:w-full md:max-w-[10rem]" />
            </div>

            <div className="min-w-0">
              <h3 className="stagger text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15] font-bold text-ink">
                {role.title}
              </h3>
              <p className="stagger mt-2 text-lg text-muted italic" style={vars({ "--i": 1 })}>
                {role.org}
                {role.orgDetail && <>&nbsp;· {role.orgDetail}</>}
              </p>
              <ul className="mt-6 space-y-3" style={vars({ "--d": "250ms", "--step": "110ms" })}>
                {role.bullets.map((bullet, k) => (
                  <li key={bullet} className="stagger flex gap-4 leading-[1.7] text-ink" style={vars({ "--i": k })}>
                    <span aria-hidden className="draw-x mt-[0.85em] h-px w-4 shrink-0 bg-blue" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              {role.tags.length > 0 && (
                <ul className="mt-7 flex flex-wrap gap-2" style={vars({ "--d": "700ms", "--step": "70ms" })}>
                  {role.tags.map((tag, k) => (
                    <li
                      key={tag}
                      className="stagger border border-rule px-2.5 py-1 label text-muted"
                      style={vars({ "--i": k })}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Chapter>
  );
}
