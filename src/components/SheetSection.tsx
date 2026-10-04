import type { Hue } from "@/content/types";
import { cn } from "@/lib/utils";

/** "*word*" in a title becomes a highlighted cell value. */
export function Emphasis({ text, hue = "sun" }: { text: string; hue?: Hue }) {
  return text.split(/(\*[^*]+\*)/).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <span key={i} data-hue={hue} className="fill">
        {part.slice(1, -1)}
      </span>
    ) : (
      part
    ),
  );
}

/** "==phrase==" in running text becomes a highlighted phrase. */
export function Highlights({ text, hue }: { text: string; hue: Hue }) {
  return text.split(/(==[^=]+==)/).map((part, i) =>
    part.startsWith("==") ? (
      <span key={i} data-hue={hue} className="fill">
        {part.slice(2, -2)}
      </span>
    ) : (
      part
    ),
  );
}

/** One part of the page: a label, a big title, then ranges laid out on the 12-column sheet. */
export function SheetSection({
  id,
  nav,
  eyebrow,
  title,
  hue,
  className,
  children,
}: {
  id: string;
  /** the sheet tab and formula that belong to this part */
  nav: string;
  eyebrow: string;
  title: string;
  hue?: Hue;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      data-sheet={nav}
      aria-labelledby={`${id}-title`}
      className={cn("grid grid-cols-12 gap-y-5 px-4 py-14 sm:px-6 lg:gap-y-6 lg:px-0 lg:py-20", className)}
    >
      <header className="col-span-12 lg:col-span-10 lg:col-start-2">
        <p className="cell-label">{eyebrow}</p>
        <h2 id={`${id}-title`} className="mt-2 display text-[2.5rem] leading-[1.02] text-ink sm:text-[3.25rem]">
          <Emphasis text={title} hue={hue} />
        </h2>
      </header>
      {children}
    </section>
  );
}
