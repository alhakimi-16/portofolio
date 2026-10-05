import { ArrowUpRight } from "lucide-react";
import type { SiteContent } from "@/content";
import type { Hue } from "@/content/types";
import type { Dictionary } from "@/i18n/ui";
import { hues, vars } from "@/lib/utils";
import { Section } from "./Section";

function Pulse() {
  return (
    <span aria-hidden className="relative flex size-2">
      <span className="absolute inset-0 animate-[ping_1.8s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-hue" />
      <span className="relative size-2 rounded-full bg-hue" />
    </span>
  );
}

/** Lines of make-believe code in the editor window: indent, then [width, colour] per token. */
const codeLines: { indent: number; tokens: [string, Hue][] }[] = [
  {
    indent: 0,
    tokens: [
      ["26%", "violet"],
      ["38%", "blue"],
    ],
  },
  {
    indent: 1,
    tokens: [
      ["18%", "sun"],
      ["44%", "blue"],
    ],
  },
  { indent: 2, tokens: [["52%", "violet"]] },
  {
    indent: 2,
    tokens: [
      ["30%", "blue"],
      ["20%", "sun"],
    ],
  },
  { indent: 1, tokens: [["14%", "violet"]] },
  { indent: 0, tokens: [["9%", "blue"]] },
];

/** Shown until the first project is added in profile.ts: an editor where code is being typed. */
function InProgress({ title, text, status }: { title: string; text: string; status: string }) {
  return (
    <div data-reveal className="grid overflow-hidden card md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
      <div
        aria-hidden
        className="flex items-center justify-center bg-hue/10 [background-image:radial-gradient(color-mix(in_srgb,var(--hue)_55%,transparent)_1.2px,transparent_1.4px)] [background-size:18px_18px] p-8 sm:p-10"
      >
        <div className="w-full max-w-72 -rotate-2 rounded-2xl border border-white/10 bg-panel p-4 shadow-[var(--shadow)]">
          <div className="flex gap-1.5">
            {(["blue", "violet", "sun"] as const).map((hue) => (
              <span key={hue} data-hue={hue} className="size-2.5 rounded-full bg-hue" />
            ))}
          </div>
          <div className="mt-4 space-y-2.5">
            {codeLines.map((line, i) => (
              <div key={i} className="flex gap-2" style={{ paddingLeft: `${line.indent * 14}px` }}>
                {line.tokens.map(([width, hue], j) => (
                  <span
                    key={j}
                    data-hue={hue}
                    className="block h-2 origin-left animate-[type_6s_ease-in-out_infinite] rounded-full bg-hue"
                    style={{ width, animationDelay: `${i * 0.4}s` }}
                  />
                ))}
              </div>
            ))}
            <span className="block h-3 w-1.5 animate-[blink_1.1s_steps(1)_infinite] rounded-sm bg-white/80" />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center p-6 sm:p-10">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-hue/15 px-3 py-1 text-sm font-bold text-hue-ink">
          <Pulse />
          {status}
        </span>
        <h3 className="mt-4 text-2xl leading-tight font-extrabold tracking-tight sm:text-3xl">{title}</h3>
        <p className="mt-3 max-w-md leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

export function Projects({ content, t }: { content: SiteContent; t: Dictionary }) {
  const { projects } = content;

  return (
    <Section id="projects" nav="projects" hue="sun" {...t.sections.projects}>
      {projects.length === 0 ? (
        <InProgress title={t.projects.soonTitle} text={t.projects.soonText} status={t.projects.status} />
      ) : (
        <ul className="grid gap-5 md:grid-cols-2">
          {projects.map((project, i) => (
            <li
              key={project.title}
              data-reveal
              data-hue={hues[i % hues.length]}
              style={vars({ "--d": `${(i % 2) * 90}ms` })}
            >
              <article className="flex h-full flex-col card p-6 transition-[translate,border-color] duration-300 hover:-translate-y-1 hover:border-hue sm:p-8">
                {(project.status || project.year) && (
                  <div className="mb-4 flex items-center justify-between gap-3 text-sm">
                    {project.status ? (
                      <span className="inline-flex items-center gap-2 rounded-full bg-hue/15 px-3 py-1 font-bold text-hue-ink">
                        <Pulse />
                        {project.status}
                      </span>
                    ) : (
                      <span />
                    )}
                    {project.year && <span className="font-semibold tabular-nums">{project.year}</span>}
                  </div>
                )}
                <h3 className="text-2xl leading-tight font-extrabold tracking-tight">{project.title}</h3>
                <p className="mt-2 leading-relaxed">{project.description}</p>
                {project.tech.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-line px-3 py-1 text-sm font-semibold text-fg"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                )}
                {(project.link || project.repo) && (
                  <div className="mt-auto flex gap-5 pt-6 font-semibold text-fg">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 underline decoration-hue decoration-2 underline-offset-4 hover:text-hue-ink"
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
                        className="inline-flex items-center gap-1 underline decoration-hue decoration-2 underline-offset-4 hover:text-hue-ink"
                      >
                        {t.projects.code}
                        <ArrowUpRight aria-hidden className="size-4" />
                      </a>
                    )}
                  </div>
                )}
              </article>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
