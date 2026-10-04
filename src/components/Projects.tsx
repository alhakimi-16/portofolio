import { ArrowUpRight } from "lucide-react";
import type { SiteContent } from "@/content";
import type { Dictionary } from "@/i18n/ui";
import { hues } from "@/lib/utils";
import { SheetSection } from "./SheetSection";

function Pulse() {
  return (
    <span aria-hidden className="relative flex size-2">
      <span className="absolute inset-0 animate-[ping_1.8s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-sel" />
      <span className="relative size-2 rounded-full bg-sel" />
    </span>
  );
}

export function Projects({ content, t }: { content: SiteContent; t: Dictionary }) {
  const { projects } = content;

  return (
    <SheetSection id="projects" nav="projects" hue="sun" {...t.sections.projects}>
      {projects.length === 0 ? (
        // until the first project is added: the sheet is still "calculating"
        <div
          data-range
          className="range col-span-12 grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:col-span-10 lg:col-start-2"
        >
          <div
            aria-hidden
            className="flex flex-col justify-center gap-3 border-b border-line bg-head p-6 sm:p-8 md:border-r md:border-b-0"
          >
            <p className="font-mono text-sm text-muted">{t.sheet.calculating} …</p>
            <div className="h-2 overflow-hidden bg-paper ring-1 ring-line">
              <span className="block h-full w-[64%] animate-[calc_5s_ease-in-out_infinite] bg-sel" />
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <span className="inline-flex items-center gap-2 bg-fill-green px-2.5 py-1 font-mono text-xs text-ink-green">
              <Pulse />
              {t.projects.status}
            </span>
            <h3 className="mt-4 display text-[1.75rem] leading-tight text-ink">{t.projects.soonTitle}</h3>
            <p className="mt-2 max-w-lg leading-relaxed text-muted">{t.projects.soonText}</p>
          </div>
        </div>
      ) : (
        projects.map((project, i) => (
          <article
            key={project.title}
            data-range
            data-hue={hues[i % hues.length]}
            className={`range col-span-12 flex flex-col lg:col-span-5 ${i % 2 ? "lg:col-start-7" : "lg:col-start-2"}`}
          >
            <header className="flex items-center justify-between gap-3 border-b border-line bg-head px-5 py-2.5">
              {project.status ? (
                <span className="inline-flex items-center gap-2 font-mono text-xs text-ink-green">
                  <Pulse />
                  {project.status}
                </span>
              ) : (
                <span />
              )}
              {project.year && <span className="font-mono text-xs text-muted tabular-nums">{project.year}</span>}
            </header>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <h3 className="display text-[1.75rem] leading-tight text-ink">{project.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{project.description}</p>
              {project.tech.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <li key={tech} className="bg-hue px-2 py-0.5 font-mono text-xs text-hue-ink">
                      {tech}
                    </li>
                  ))}
                </ul>
              )}
              {(project.link || project.repo) && (
                <div className="mt-auto flex gap-4 pt-5 text-sm font-semibold">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sel-ink underline underline-offset-4 hover:no-underline"
                    >
                      {t.projects.live}
                      <ArrowUpRight aria-hidden className="size-4" />
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sel-ink underline underline-offset-4 hover:no-underline"
                    >
                      {t.projects.code}
                      <ArrowUpRight aria-hidden className="size-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </article>
        ))
      )}
    </SheetSection>
  );
}
