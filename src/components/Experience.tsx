import { Check } from "lucide-react";
import type { SiteContent } from "@/content";
import type { Dictionary } from "@/i18n/ui";
import { Formula } from "./Formula";
import { SheetSection } from "./SheetSection";

export function Experience({ content, t }: { content: SiteContent; t: Dictionary }) {
  return (
    <SheetSection id="experience" nav="experience" hue="violet" {...t.sections.experience}>
      {content.experience.map((role) => (
        <article
          key={`${role.org}-${role.title}`}
          data-range
          className="range col-span-12 lg:col-span-10 lg:col-start-2"
        >
          <header className="flex flex-wrap items-start justify-between gap-3 border-b border-line bg-head px-5 py-4 sm:px-6">
            <div className="min-w-0">
              <h3 className="display text-[1.625rem] leading-tight text-ink sm:text-[1.875rem]">{role.title}</h3>
              <p className="mt-0.5 text-sm">
                <span className="font-semibold text-ink">{role.org}</span>
                {role.orgDetail && <span className="text-muted">&nbsp;· {role.orgDetail}</span>}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 font-mono text-xs">
              {role.kind && <span className="border border-line bg-paper px-2 py-1 text-ink">{role.kind}</span>}
              <span className="inline-flex items-center gap-2 bg-fill-green px-2 py-1 text-ink-green">
                <span aria-hidden className="relative flex size-2">
                  <span className="absolute inset-0 animate-[ping_1.8s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-sel" />
                  <span className="relative size-2 rounded-full bg-sel" />
                </span>
                {role.period}
              </span>
            </div>
          </header>

          <ul>
            {role.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 border-b border-line px-5 py-3 leading-relaxed sm:px-6">
                <span aria-hidden className="mt-1 grid size-4 shrink-0 place-items-center bg-fill-green text-ink-green">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                <span className="text-muted">{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-6">
            <p aria-hidden className="min-w-0 font-mono text-xs text-muted">
              <span className="italic">fx</span>{" "}
              <Formula text={role.art === "id-scan" ? t.checks.verify : t.checks.report} />{" "}
              <span className="ml-1 bg-fill-green px-1.5 py-0.5 whitespace-nowrap text-ink-green">
                ✓ {role.art === "id-scan" ? t.experience.verified : t.experience.onTime}
              </span>
            </p>
            {role.tags.length > 0 && (
              <ul className="flex flex-wrap gap-1.5">
                {role.tags.map((tag) => (
                  <li key={tag} className="border border-line px-2 py-0.5 font-mono text-xs text-ink">
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </article>
      ))}
    </SheetSection>
  );
}
