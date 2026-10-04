/**
 * One row in a timeline list (experience, education): the period on the left,
 * the details on the right. Rows highlight on hover; their siblings fade back.
 */
export function Entry({
  period,
  title,
  place,
  meta,
  children,
}: {
  period: string;
  title: string;
  place: string;
  meta?: string;
  children?: React.ReactNode;
}) {
  return (
    <li className="group relative grid gap-2 transition-opacity duration-300 sm:grid-cols-[8.5rem_1fr] sm:gap-6 lg:group-hover/list:opacity-55 lg:hover:opacity-100">
      <div
        aria-hidden
        className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-xl transition-colors duration-300 lg:-inset-x-6 lg:block lg:group-hover:bg-surface"
      />
      <p className="relative z-10 mt-1 text-xs font-semibold tracking-[0.12em] text-muted uppercase">{period}</p>
      <div className="relative z-10">
        <h3 className="leading-snug font-medium">
          {title}
          <span className="text-muted"> · </span>
          <span className="transition-colors group-hover:text-accent">{place}</span>
        </h3>
        {meta && <p className="mt-0.5 text-sm">{meta}</p>}
        {children}
      </div>
    </li>
  );
}
