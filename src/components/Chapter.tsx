import { navIds, type NavId } from "@/lib/site";
import { cn, pad, wrap } from "@/lib/utils";

/** "*word*" in a title is set in serif italic. */
export function Emphasis({ text }: { text: string }) {
  return text.split(/(\*[^*]+\*)/).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <em key={i} className="emph">
        {part.slice(1, -1)}
      </em>
    ) : (
      part
    ),
  );
}

/** "==phrase==" in running text gets the yellow highlighter. */
export function Marked({ text }: { text: string }) {
  return text.split(/(==[^=]+==)/).map((part, i) =>
    part.startsWith("==") ? (
      <mark key={i} className="marker">
        {part.slice(2, -2)}
      </mark>
    ) : (
      part
    ),
  );
}

/** The small pastel green dot for things that are happening now. */
export function Pulse() {
  return (
    <span aria-hidden className="relative flex size-2 shrink-0">
      <span className="absolute inset-0 animate-[ping_2.2s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-mint" />
      <span className="relative size-2 rounded-full bg-mint" />
    </span>
  );
}

/**
 * One chapter of the page, laid out like a magazine spread: a rule that draws itself,
 * then a narrow column with the chapter number and label (it stays in view while the
 * chapter scrolls by) and a wide column with the title and the content.
 */
export function Chapter({
  id,
  eyebrow,
  title,
  titleClassName,
  children,
}: {
  id: NavId;
  eyebrow: string;
  title: string;
  titleClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn(wrap, "py-16 sm:py-20 lg:py-28")}>
      <div aria-hidden data-reveal="rule" className="h-px bg-ink" />
      <div className="grid lg:grid-cols-12 lg:gap-x-8">
        <div className="flex items-baseline gap-4 pt-4 lg:sticky lg:top-24 lg:col-span-3 lg:block lg:self-start lg:pt-6">
          <p aria-hidden className="display text-[1.75rem] leading-none text-blue tabular-nums lg:text-[3.25rem]">
            {pad(navIds.indexOf(id) + 1)}
          </p>
          <p className="label text-muted lg:mt-4">{eyebrow}</p>
        </div>
        <div className="min-w-0 lg:col-span-9">
          <h2
            id={`${id}-title`}
            data-reveal
            className={cn(
              "pt-5 display text-[clamp(2.5rem,7.2vw,5.5rem)] leading-[0.94] text-ink lg:pt-6",
              titleClassName,
            )}
          >
            <Emphasis text={title} />
          </h2>
          <div className="mt-10 sm:mt-12 lg:mt-16">{children}</div>
        </div>
      </div>
    </section>
  );
}
