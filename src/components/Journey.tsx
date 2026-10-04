"use client";

import { Plane } from "lucide-react";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/utils";

/**
 * The timeline of "my path": a line that fills up as you scroll, a little plane
 * travelling along it, and stops that light up when the plane passes them.
 * Stops are the children marked with [data-stop]; their dot is the [data-dot] inside.
 */
export function Journey({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const stops = [...root.querySelectorAll<HTMLElement>("[data-stop]")];
    const dots = stops.map((stop) => stop.querySelector<HTMLElement>("[data-dot]"));
    const reduce = prefersReducedMotion();
    let frame = 0;

    const update = () => {
      frame = 0;
      const box = root.getBoundingClientRect();
      const centres = dots.map((dot) => {
        const r = dot?.getBoundingClientRect();
        return r ? r.top + r.height / 2 - box.top : 0;
      });
      const start = centres[0] ?? 0;
      const end = centres[centres.length - 1] ?? box.height;
      const length = Math.max(1, end - start);
      const progress = reduce ? 1 : Math.min(1, Math.max(0, (window.innerHeight * 0.6 - box.top - start) / length));
      root.style.setProperty("--start", `${start}px`);
      root.style.setProperty("--length", `${length}px`);
      root.style.setProperty("--p", progress.toFixed(4));
      stops.forEach((stop, i) => stop.toggleAttribute("data-on", start + progress * length >= (centres[i] ?? 0) - 2));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(root);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="relative [--length:calc(100%-4rem)] [--p:1] [--start:2rem]">
      <div
        aria-hidden
        className="absolute top-(--start) left-6 h-(--length) w-1 -translate-x-1/2 rounded-full bg-line md:left-1/2"
      />
      <div
        aria-hidden
        className="absolute top-(--start) left-6 h-(--length) w-1 -translate-x-1/2 rounded-full bg-[linear-gradient(var(--sun),var(--mint),var(--coral),var(--blue))] [clip-path:inset(0_0_calc((1-var(--p))*100%)_0)] md:left-1/2"
      />
      <div
        aria-hidden
        className="absolute top-[calc(var(--start)+var(--length)*var(--p))] left-6 z-20 -translate-x-1/2 -translate-y-1/2 md:left-1/2"
      >
        <span className="grid size-10 place-items-center rounded-full bg-fg text-bg shadow-lg ring-4 ring-bg">
          <Plane className="size-[1.15rem] rotate-[135deg]" strokeWidth={2} />
        </span>
      </div>
      {children}
    </div>
  );
}
