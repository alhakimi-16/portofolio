import type { SiteContent } from "@/content";
import type { Dictionary } from "@/i18n/ui";
import { vars } from "@/lib/utils";
import { Chapter, Marked } from "./Chapter";

export function About({ content, t }: { content: SiteContent; t: Dictionary }) {
  const { lead, chapters } = content.about;

  return (
    <Chapter id="about" {...t.sections.about}>
      <p
        data-reveal
        className="max-w-[30ch] font-serif text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.25] text-ink"
        style={vars({ "--d": "100ms" })}
      >
        <Marked text={lead} />
      </p>
      <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8 lg:mt-20">
        {chapters.map((chapter, i) => (
          <article
            key={chapter.title}
            data-reveal
            data-hue={chapter.hue}
            style={vars({ "--d": `${i * 140}ms` })}
            className="border-t border-rule pt-5"
          >
            <h3 className="flex items-center gap-2.5 label text-ink">
              <span aria-hidden className="size-2 shrink-0 bg-hue" />
              {chapter.title}
            </h3>
            <p className="mt-4 leading-[1.7] text-muted">
              <Marked text={chapter.text} />
            </p>
          </article>
        ))}
      </div>
    </Chapter>
  );
}
