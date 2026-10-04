import type { CSSProperties } from "react";
import type { Hue } from "@/content/types";

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Inline CSS custom properties, e.g. style={vars({ "--d": "120ms" })}. */
export function vars(values: Record<`--${string}`, string | number>): CSSProperties {
  return values as CSSProperties;
}

/** The main accent colours, in the order lists cycle through them (mint is only used sparingly). */
export const hues: readonly Hue[] = ["blue", "violet", "sun"];

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
