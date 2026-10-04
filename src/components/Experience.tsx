import type { SiteContent } from "@/content";
import type { Dictionary } from "@/i18n/ui";
import { Chapter, Pulse } from "./Chapter";

export function Experience({ content, t }: { content: SiteContent; t: Dictionary }) {
  return (
    <Chapter id="experience" {...t.sections.experience}>
      <ol className="border-t border-ink">
        {content.experience.map((role) => (
          <li
            key={`${role.org}-${role.title}`}
            data-reveal
            className="grid gap-x-8 gap-y-5 border-b border-rule py-10 md:grid-cols-[10rem_minmax(0,1fr)] lg:py-12"
          >
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 md:flex-col md:items-start">
              <p className="inline-flex items-center gap-2.5 label text-ink">
                <Pulse />
                {role.period}
              </p>
              {role.kind && <p className="label text-violet-ink">{role.kind}</p>}
            </div>
            <div className="min-w-0">
              <h3 className="font-sans text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15] font-bold text-ink">
                {role.title}
              </h3>
              <p className="mt-2 font-serif text-lg text-muted italic">
                {role.org}
                {role.orgDetail && <>&nbsp;· {role.orgDetail}</>}
              </p>
              <ul className="mt-6 space-y-3">
                {role.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-4 leading-[1.7] text-ink">
                    <span aria-hidden className="mt-[0.85em] h-px w-4 shrink-0 bg-blue" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              {role.tags.length > 0 && (
                <ul className="mt-7 flex flex-wrap gap-2">
                  {role.tags.map((tag) => (
                    <li key={tag} className="border border-rule px-2.5 py-1 label text-muted">
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
