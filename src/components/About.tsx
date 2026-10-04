import type { SiteContent } from "@/content";
import type { Dictionary } from "@/i18n/ui";
import { Icon } from "./Icon";
import { Highlights, SheetSection } from "./SheetSection";

export function About({ content, t }: { content: SiteContent; t: Dictionary }) {
  const { lead, chapters } = content.about;

  return (
    <SheetSection id="about" nav="about" hue="mint" {...t.sections.about}>
      <p
        data-range
        className="range col-span-12 p-6 text-xl leading-snug font-medium text-ink sm:p-8 sm:text-2xl lg:col-span-10 lg:col-start-2"
      >
        <Highlights text={lead} hue="mint" />
      </p>
      <div data-range className="range col-span-12 grid lg:col-span-10 lg:col-start-2 lg:grid-cols-3">
        {chapters.map((chapter) => (
          <article
            key={chapter.title}
            className="flex flex-col border-t border-line first:border-t-0 lg:border-t-0 lg:border-l lg:first:border-l-0"
          >
            <h3 className="flex items-center gap-2 border-b border-line bg-head px-5 py-2.5 cell-label">
              <Icon name={chapter.icon} className="size-3.5" />
              {chapter.title}
            </h3>
            <p className="p-5 leading-relaxed text-muted sm:p-6">
              <Highlights text={chapter.text} hue={chapter.hue} />
            </p>
          </article>
        ))}
      </div>
    </SheetSection>
  );
}
