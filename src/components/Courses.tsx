import { ArrowUpRight } from "lucide-react";
import type { SiteContent } from "@/content";
import type { Dictionary } from "@/i18n/ui";
import { SheetSection } from "./SheetSection";

export function Courses({ content, t }: { content: SiteContent; t: Dictionary }) {
  const { courses } = content;

  return (
    <SheetSection id="courses" nav="courses" hue="blue" className="lg:pt-6" {...t.sections.courses}>
      <div data-range className="range col-span-12 lg:col-span-10 lg:col-start-2">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-head">
              <th scope="col" className="px-4 py-2 cell-label">
                {t.tables.course}
              </th>
              <th scope="col" className="hidden px-4 py-2 cell-label sm:table-cell">
                {t.tables.provider}
              </th>
              <th scope="col" className="hidden px-4 py-2 cell-label sm:table-cell">
                {t.tables.year}
              </th>
              <th scope="col" className="px-4 py-2 text-right cell-label">
                {t.courses.certificate}
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6">
                  <p className="font-semibold text-ink">{t.courses.soonTitle}</p>
                  <p className="mt-0.5 text-muted">{t.courses.soonText}</p>
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course.title} className="border-b border-line last:border-b-0">
                  <td className="px-4 py-3 align-top">
                    <p className="font-semibold text-ink">{course.title}</p>
                    <p className="text-xs text-muted sm:hidden">
                      {course.provider}
                      {course.year && <>&nbsp;· {course.year}</>}
                    </p>
                    {(course.topics.length > 0 || course.inProgress) && (
                      <ul className="mt-1.5 flex flex-wrap gap-1">
                        {course.inProgress && (
                          <li className="bg-fill-green px-1.5 py-0.5 font-mono text-[0.6875rem] text-ink-green">
                            {t.courses.inProgress}
                          </li>
                        )}
                        {course.topics.map((topic) => (
                          <li key={topic} className="bg-head px-1.5 py-0.5 font-mono text-[0.6875rem] text-head-ink">
                            {topic}
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td className="hidden px-4 py-3 align-top text-muted sm:table-cell">{course.provider}</td>
                  <td className="hidden px-4 py-3 align-top text-muted tabular-nums sm:table-cell">{course.year}</td>
                  <td className="px-4 py-3 text-right align-top">
                    {course.certificate ? (
                      <a
                        href={course.certificate}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-sel-ink underline underline-offset-4 hover:no-underline"
                      >
                        {t.courses.certificate}
                        <ArrowUpRight aria-hidden className="size-3.5" />
                      </a>
                    ) : (
                      <span className="text-muted">–</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </SheetSection>
  );
}
