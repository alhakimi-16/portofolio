import type { CSSProperties } from "react";

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Inline CSS custom properties, e.g. style={vars({ "--d": "120ms" })}. */
export function vars(values: Record<`--${string}`, string | number>): CSSProperties {
  return values as CSSProperties;
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** The page column: centred, with the side margins growing on larger screens. */
export const wrap = "mx-auto w-full max-w-[84rem] px-4 sm:px-8 lg:px-12";

/** 1 → "01" */
export const pad = (n: number) => String(n).padStart(2, "0");
