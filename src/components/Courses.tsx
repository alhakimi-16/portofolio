import { ArrowUpRight, GraduationCap } from "lucide-react";
import type { SiteContent } from "@/content";
import type { Dictionary } from "@/i18n/ui";
import { hues, vars } from "@/lib/utils";
import { Section } from "./Section";

export function Courses({ content, t }: { content: SiteContent; t: Dictionary }) {
  const { courses } = content;

  return (
    <Section id="courses" nav="courses" hue="blue" className="pt-4 sm:pt-8" {...t.sections.courses}>
      {courses.length === 0 ? (
        <div data-reveal className="flex flex-col items-start gap-5 card p-6 sm:flex-row sm:items-center sm:p-8">
          <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-hue/15 text-hue-ink">
            <GraduationCap aria-hidden className="size-8 float" />
          </span>
          <div>
            <p className="text-xl font-extrabold tracking-tight text-fg">{t.courses.soonTitle}</p>
            <p className="mt-1">{t.courses.soonText}</p>
          </div>
        </div>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {courses.map((course, i) => (
            <li
              key={course.title}
              data-reveal
              data-hue={hues[i % hues.length]}
              style={vars({ "--d": `${(i % 2) * 90}ms` })}
            >
              <article className="flex h-full gap-5 card p-5 transition-[translate,border-color] duration-300 hover:-translate-y-1 hover:border-hue sm:p-6">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-hue/15 text-hue-ink">
                  <GraduationCap aria-hidden className="size-7" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">
                    {course.provider}
                    {course.year && <span className="tabular-nums">&nbsp;· {course.year}</span>}
                  </p>
                  <h3 className="mt-1 text-lg leading-snug font-bold">{course.title}</h3>
                  {course.topics.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {course.topics.map((topic) => (
                        <li key={topic} className="rounded-full bg-hue/15 px-2.5 py-0.5 text-xs font-bold text-hue-ink">
                          {topic}
                        </li>
                      ))}
                    </ul>
                  )}
                  {(course.inProgress || course.certificate) && (
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm font-semibold">
                      {course.inProgress && (
                        <span className="rounded-full border border-hue px-2.5 py-0.5 text-hue-ink">
                          {t.courses.inProgress}
                        </span>
                      )}
                      {course.certificate && (
                        <a
                          href={course.certificate}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-fg underline decoration-hue decoration-2 underline-offset-4 hover:text-hue-ink"
                        >
                          {t.courses.certificate}
                          <ArrowUpRight aria-hidden className="size-4" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
