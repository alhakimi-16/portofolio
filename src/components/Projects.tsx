import { ArrowUpRight } from "lucide-react";
import type { SiteContent } from "@/content";
import type { Dictionary } from "@/i18n/ui";
import { Chapter, Pulse } from "./Chapter";

const link = "group inline-flex items-center gap-1.5 py-1 label text-ink";

export function Projects({ content, t }: { content: SiteContent; t: Dictionary }) {
  const { projects } = content;

  return (
    <Chapter id="projects" {...t.sections.projects}>
      {projects.length === 0 ? (
        // until the first project is added
        <div data-reveal className="max-w-2xl">
          <p className="inline-flex items-center gap-2.5 label text-mint-ink">
            <Pulse />
            {t.projects.status}
          </p>
          <p className="mt-5 font-serif text-[clamp(1.625rem,2.8vw,2.25rem)] leading-tight text-ink italic">
            {t.projects.soonTitle}
          </p>
          <p className="mt-3 leading-[1.7] text-muted">{t.projects.soonText}</p>
          <div aria-hidden className="mt-10 h-px overflow-hidden bg-rule">
            <span className="block h-full animate-[progress_3.6s_var(--ease)_infinite] bg-blue" />
          </div>
        </div>
      ) : (
        <ol className="border-t border-ink">
          {projects.map((project) => (
            <li
              key={project.title}
              data-reveal
              className="grid gap-x-8 gap-y-4 border-b border-rule py-8 md:grid-cols-[9rem_minmax(0,1fr)] lg:py-10"
            >
              <div className="flex flex-wrap gap-x-4 gap-y-2 label text-muted md:flex-col">
                {project.year && <span className="tabular-nums">{project.year}</span>}
                {project.status && (
                  <span className="inline-flex items-center gap-2.5 text-mint-ink">
                    <Pulse />
                    {project.status}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <h3 className="font-sans text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15] font-bold text-ink">
                  {project.title}
                </h3>
                <p className="mt-3 max-w-2xl leading-[1.7] text-muted">{project.description}</p>
                {project.tech.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <li key={tech} className="border border-rule px-2.5 py-1 label text-muted">
                        {tech}
                      </li>
                    ))}
                  </ul>
                )}
                {(project.link || project.repo) && (
                  <div className="mt-6 flex gap-6">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className={link}>
                        <span className="link-line pb-1">{t.projects.live}</span>
                        <ArrowUpRight aria-hidden className="size-4 text-blue-ink" />
                      </a>
                    )}
                    {project.repo && (
                      <a href={project.repo} target="_blank" rel="noopener noreferrer" className={link}>
                        <span className="link-line pb-1">{t.projects.code}</span>
                        <ArrowUpRight aria-hidden className="size-4 text-blue-ink" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </Chapter>
  );
}
