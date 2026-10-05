import { Check } from "lucide-react";
import type { SiteContent } from "@/content";
import type { Dictionary } from "@/i18n/ui";
import { cn } from "@/lib/utils";
import { IdScan } from "./IdScan";
import { ReportArt } from "./ReportArt";
import { Section } from "./Section";

export function Experience({ content, t }: { content: SiteContent; t: Dictionary }) {
  return (
    <Section id="experience" nav="experience" hue="violet" {...t.sections.experience}>
      <div className="grid gap-6">
        {content.experience.map((role, i) => {
          // every second card has its animation on the left (on wide screens)
          const flip = i % 2 === 1;
          return (
            <article
              key={`${role.org}-${role.title}`}
              data-reveal
              className={cn(
                "grid overflow-hidden card",
                flip ? "lg:grid-cols-[21rem_1fr]" : "lg:grid-cols-[1fr_21rem]",
              )}
            >
              <div className="p-6 sm:p-10">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl leading-tight font-extrabold tracking-tight sm:text-3xl">{role.title}</h3>
                    <p className="mt-1.5 font-semibold text-fg">
                      {role.org}
                      {role.orgDetail && <span className="font-normal text-muted">&nbsp;· {role.orgDetail}</span>}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {role.kind && (
                      <span className="rounded-full border border-hue px-3 py-1 text-sm font-bold text-hue-ink">
                        {role.kind}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-2 rounded-full bg-hue/15 px-3 py-1 text-sm font-bold text-hue-ink">
                      <span aria-hidden className="relative flex size-2">
                        <span className="absolute inset-0 animate-[ping_1.8s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-hue" />
                        <span className="relative size-2 rounded-full bg-hue" />
                      </span>
                      {role.period}
                    </span>
                  </div>
                </div>

                <ul className="mt-7 grid gap-3.5">
                  {role.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 leading-relaxed">
                      <span
                        aria-hidden
                        data-hue="mint"
                        className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-hue/25 text-hue-ink"
                      >
                        <Check className="size-3.5" strokeWidth={3} />
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {role.tags.length > 0 && (
                  <ul className="mt-7 flex flex-wrap gap-2">
                    {role.tags.map((tag) => (
                      <li key={tag} className="rounded-full border border-line px-3 py-1 text-sm font-semibold text-fg">
                        <span className="text-hue-ink">#</span>
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className={cn(flip && "lg:order-first")}>
                {role.art === "id-scan" ? (
                  <IdScan scan={t.experience.scan} verified={t.experience.verified} />
                ) : (
                  <ReportArt caption={t.experience.report} stamp={t.experience.onTime} />
                )}
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
