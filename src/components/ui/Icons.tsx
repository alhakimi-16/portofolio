type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "square" as const,
  "aria-hidden": true,
};

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className ?? "size-[0.9em]"} {...base}>
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
    </svg>
  );
}

export function ArrowDown({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className ?? "size-[0.9em]"} {...base}>
      <path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" />
    </svg>
  );
}

export function ArrowRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className ?? "size-[0.9em]"} {...base}>
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

export function ArrowLeft({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className ?? "size-[0.9em]"} {...base}>
      <path d="M13.5 8h-11M7 3.5 2.5 8 7 12.5" />
    </svg>
  );
}

export function Close({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className ?? "size-[0.9em]"} {...base}>
      <path d="m3.5 3.5 9 9M12.5 3.5l-9 9" />
    </svg>
  );
}

export function Copy({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className ?? "size-[0.9em]"} {...base}>
      <path d="M5.5 5.5h8v8h-8z M10.5 5.5v-3h-8v8h3" />
    </svg>
  );
}
