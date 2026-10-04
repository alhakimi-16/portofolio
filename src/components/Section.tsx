import type { Hue } from "@/content/types";
import { cn } from "@/lib/utils";

/** Renders "*word*" in a title as a coloured word with a hand-drawn underline. */
export function Emphasis({ text }: { text: string }) {
  return text.split(/(\*[^*]+\*)/).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <span key={i} className="relative inline-block whitespace-nowrap text-hue-ink">
        {part.slice(1, -1)}
        <svg
          aria-hidden
          viewBox="0 0 100 12"
          preserveAspectRatio="none"
          className="squiggle absolute -bottom-[0.2em] left-0 h-[0.3em] w-full overflow-visible text-hue"
        >
          <path
            d="M2 8.5C12 3 20 3 29 7s17 5 27 .5S74 3 83 7.5 95 9 98 6"
            pathLength={1}
            fill="none"
            stroke="currentColor"
            strokeWidth={4}
            strokeLinecap="round"
          />
        </svg>
      </span>
    ) : (
      part
    ),
  );
}

/** A page section with a small coloured label and a big title. */
export function Section({
  id,
  nav,
  hue,
  eyebrow,
  title,
  className,
  children,
}: {
  id: string;
  /** the header link that is highlighted while this section is on screen */
  nav: string;
  hue: Hue;
  eyebrow: string;
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      data-nav={nav}
      data-hue={hue}
      aria-labelledby={`${id}-title`}
      className={cn("py-20 sm:py-28", className)}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div data-reveal className="mb-10 max-w-3xl sm:mb-14">
          <p className="flex items-center gap-2.5 text-sm font-bold tracking-[0.14em] text-hue-ink uppercase">
            <span aria-hidden className="size-2 rounded-full bg-hue" />
            {eyebrow}
          </p>
          <h2
            id={`${id}-title`}
            className="mt-3 text-[2.5rem] leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-5xl md:text-[3.5rem]"
          >
            <Emphasis text={title} />
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
