"use client";

import { useRef } from "react";
import { useI18n } from "@/components/providers/I18nProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { RoleView } from "@/content";
import { format } from "@/i18n/ui";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

export function Experience({ roles, since }: { roles: RoleView[]; since?: number }) {
  const { t } = useI18n();
  const list = useRef<HTMLOListElement>(null);
  const rail = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = list.current;
      if (!el) return;
      const items = el.querySelectorAll<HTMLElement>("[data-role]");
      if (prefersReducedMotion()) {
        gsap.set(rail.current, { scaleY: 1 });
        items.forEach((item) => item.classList.add("is-reached"));
        return;
      }
      gsap.fromTo(
        rail.current,
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 62%", end: "bottom 62%", scrub: 0.4 } },
      );
      items.forEach((item) =>
        ScrollTrigger.create({
          trigger: item,
          start: "top 62%",
          onEnter: () => item.classList.add("is-reached"),
          onLeaveBack: () => item.classList.remove("is-reached"),
        }),
      );
    },
    { scope: list },
  );

  return (
    <section id="experience" aria-labelledby="experience-title" className="gutter py-24 md:py-36">
      <Reveal>
        <SectionHeading
          id="experience-title"
          index="03"
          label={t.experience.label}
          figure={t.experience.figure}
          title={t.experience.title}
          count={roles.length}
        />
      </Reveal>

      <div className="mt-16 grid grid-cols-12 gap-x-5 gap-y-14 md:mt-24">
        <Reveal className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            {since && (
              <p data-reveal className="label text-muted">
                {format(t.experience.summary, { count: roles.length, year: since })}
              </p>
            )}
            <TimelineChart roles={roles} caption={t.experience.chart} />
          </div>
        </Reveal>

        <ol ref={list} className="relative col-span-12 lg:col-span-8">
          <div aria-hidden className="absolute top-2 bottom-2 left-[5px] w-px bg-line">
            <div ref={rail} className="h-full w-px origin-top bg-accent" />
          </div>
          {roles.map((role) => (
            <li
              key={`${role.company}-${role.period}`}
              data-role
              className="group/role relative pb-16 pl-9 last:pb-0 md:pl-12"
            >
              <span
                aria-hidden
                className="absolute top-1.5 left-0 size-[11px] rounded-full border border-line-strong bg-bg transition-colors duration-500 group-[.is-reached]/role:border-accent group-[.is-reached]/role:bg-accent"
              />
              <Reveal>
                <p data-reveal className="flex flex-wrap items-center gap-x-3 gap-y-1 label text-muted tabular">
                  <span>{role.period}</span>
                  {role.current && (
                    <span className="flex items-center gap-1.5 text-accent">
                      <span className="size-1.5 animate-pulse rounded-full bg-accent" />
                      {t.experience.present}
                    </span>
                  )}
                </p>
                <h3
                  data-reveal
                  className="mt-3 text-[clamp(1.75rem,3.3vw,2.875rem)] leading-[1.02] font-semibold tracking-[-0.035em]"
                >
                  {role.role}
                </h3>
                <p data-reveal className="mt-2 text-muted">
                  {role.url ? (
                    <a
                      href={role.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fg underline decoration-line-strong underline-offset-4"
                    >
                      {role.company}
                    </a>
                  ) : (
                    <span className="text-fg">{role.company}</span>
                  )}
                  {" · "}
                  {role.type} · {role.location}
                </p>
                <ul data-reveal className="mt-6 grid max-w-[62ch] gap-3">
                  {role.bullets.map((bullet) => (
                    <li key={bullet} className="grid grid-cols-[1.25rem_1fr] leading-relaxed">
                      <span aria-hidden className="text-accent">
                        —
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                {role.stack.length > 0 && (
                  <ul data-reveal className="mt-6 flex flex-wrap gap-2">
                    {role.stack.map((tool) => (
                      <li key={tool} className="rounded-full border border-line px-2.5 py-1 label text-muted">
                        {tool}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Small Gantt chart of all roles on a shared time axis. */
function TimelineChart({ roles, caption }: { roles: RoleView[]; caption: string }) {
  if (roles.length === 0) return null;
  const min = Math.floor(Math.min(...roles.map((r) => r.from)));
  const max = Math.ceil(Math.max(...roles.map((r) => r.to)) + 0.01);
  const span = Math.max(1, max - min);
  const years = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  const pct = (value: number) => `${((value - min) / span) * 100}%`;

  return (
    <figure data-reveal className="mt-8">
      <div className="relative">
        {years.map((year) => (
          <span key={year} aria-hidden className="absolute top-0 bottom-6 w-px bg-line" style={{ left: pct(year) }} />
        ))}
        <ul className="relative">
          {roles.map((role) => (
            <li key={`${role.company}-${role.from}`} className="relative h-12">
              <span
                className="absolute top-1.5 truncate label text-[0.625rem] text-muted"
                style={{ left: pct(role.from), maxWidth: `calc(100% - ${pct(role.from)})` }}
              >
                {role.company}
              </span>
              <span
                className={`absolute top-7 h-1.5 rounded-full ${role.current ? "bg-accent" : "bg-fg"}`}
                style={{ left: pct(role.from), width: `max(0.375rem, ${((role.to - role.from) / span) * 100}%)` }}
              />
            </li>
          ))}
        </ul>
        <div className="relative h-6">
          {years.map((year) => (
            <span
              key={year}
              className="absolute top-1.5 -translate-x-1/2 label text-[0.625rem] text-muted tabular"
              style={{ left: pct(year) }}
            >
              ’{String(year).slice(2)}
            </span>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 label text-faint">{caption}</figcaption>
    </figure>
  );
}
