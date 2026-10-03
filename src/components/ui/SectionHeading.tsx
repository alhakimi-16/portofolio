import { Emphasis } from "./Emphasis";
import { Scramble } from "./Scramble";

/** Section header styled like a figure caption: "(02) About ———— Fig. 02 — Profile". */
export function SectionHeading({
  id,
  index,
  label,
  figure,
  title,
  count,
  children,
}: {
  /** id of the <h2>, for aria-labelledby on the section */
  id?: string;
  index: string;
  label: string;
  figure: string;
  title?: string;
  count?: number;
  children?: React.ReactNode;
}) {
  return (
    <header>
      <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4 label text-muted">
        <Scramble text={`(${index}) ${label}`} />
        <Scramble text={figure} className="hidden sm:inline" />
      </div>
      {title && (
        <div className="mt-10 flex items-start gap-3 md:mt-16">
          <h2 id={id} data-split className="display text-[clamp(3rem,9.2vw,8.75rem)]">
            <Emphasis text={title} />
          </h2>
          {count != null && (
            <span data-reveal className="mt-[0.5em] label text-accent tabular">
              ({String(count).padStart(2, "0")})
            </span>
          )}
        </div>
      )}
      {children}
    </header>
  );
}
