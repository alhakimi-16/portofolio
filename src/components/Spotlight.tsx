"use client";

import { useEffect, useRef } from "react";

/** A soft glow that follows the mouse (desktop only, off for reduced motion). */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const move = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        el.style.setProperty("--x", `${event.clientX}px`);
        el.style.setProperty("--y", `${event.clientY}px`);
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 [--x:-9999px] [--y:-9999px] [background:radial-gradient(640px_at_var(--x)_var(--y),var(--accent-soft),transparent_75%)]"
    />
  );
}
