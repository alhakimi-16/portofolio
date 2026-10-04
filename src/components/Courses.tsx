import { ArrowUpRight } from "lucide-react";
import type { SiteContent } from "@/content";
import type { Dictionary } from "@/i18n/ui";
import { Chapter, Pulse } from "./Chapter";

export function Courses({ content, t }: { content: SiteContent; t: Dictionary }) {
  const { courses } = content;

  return (
    <Chapter id="courses" {...t.sections.courses}>
      {courses.length === 0 ? (
        <div data-reveal className="max-w-2xl">
          <p className="font-serif text-[clamp(1.625rem,2.8vw,2.25rem)] leading-tight text-ink italic">
            {t.courses.soonTitle}
          </p>
          <p className="mt-3 leading-[1.7] text-muted">{t.courses.soonText}</p>
        </div>
      ) : (
        <ul className="border-t border-ink">
          {courses.map((course) => (
            <li
              key={course.title}
              data-reveal
              className="grid gap-x-8 gap-y-3 border-b border-rule py-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline"
            >
              <div className="min-w-0">
                <h3 className="font-sans text-xl leading-snug font-semibold text-ink">{course.title}</h3>
                <p className="mt-1 font-serif text-muted italic">
                  {course.provider}
                  {course.year && <>&nbsp;· {course.year}</>}
                </p>
                {(course.topics.length > 0 || course.inProgress) && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {course.inProgress && (
                      <li className="inline-flex items-center gap-2 border border-mint px-2.5 py-1 label text-mint-ink">
                        <Pulse />
                        {t.courses.inProgress}
                      </li>
                    )}
                    {course.topics.map((topic) => (
                      <li key={topic} className="border border-rule px-2.5 py-1 label text-muted">
                        {topic}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {course.certificate && (
                <a
                  href={course.certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 justify-self-start py-1 label text-ink"
                >
                  <span className="link-line pb-1">{t.courses.certificate}</span>
                  <ArrowUpRight aria-hidden className="size-4 text-blue-ink" />
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </Chapter>
  );
}
