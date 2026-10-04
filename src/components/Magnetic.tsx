"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/utils";

/** Pulls its child a little towards the mouse pointer (desktop only). */
export function Magnetic({ children, strength = 0.25 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const move = (event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      const x = (event.clientX - box.left - box.width / 2) * strength;
      const y = (event.clientY - box.top - box.height / 2) * strength;
      el.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
    };
    const leave = () => {
      el.style.translate = "";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  return (
    <span ref={ref} className="inline-flex transition-[translate] duration-300 ease-out">
      {children}
    </span>
  );
}
