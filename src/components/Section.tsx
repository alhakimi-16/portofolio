import type { CSSProperties } from "react";

/** A page section with a small heading that stays pinned on phones while you read. */
export function Section({
  id,
  title,
  delay = 0,
  children,
}: {
  id: string;
  title: string;
  /** entrance delay in seconds */
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="mb-20 rise scroll-mt-16 md:mb-28 lg:mb-32 lg:scroll-mt-24"
      style={{ animationDelay: `${delay}s` } as CSSProperties}
    >
      <div className="sticky top-0 z-20 -mx-6 mb-6 bg-bg/85 px-6 py-4 backdrop-blur-md md:-mx-12 md:px-12 lg:static lg:mx-0 lg:mb-8 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
        <h2 id={`${id}-title`} className="text-xs font-semibold tracking-[0.18em] uppercase">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
