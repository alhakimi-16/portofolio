"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { cn, hasFinePointer, prefersReducedMotion } from "@/lib/utils";

/**
 * Makes its child drift towards the pointer. A descendant marked
 * [data-magnetic-inner] moves a little further for a parallax feel.
 */
export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const target = el?.firstElementChild as HTMLElement | null;
    if (!el || !target || !hasFinePointer() || prefersReducedMotion()) return;
    const inner = el.querySelector<HTMLElement>("[data-magnetic-inner]");

    const xTo = gsap.quickTo(target, "x", { duration: 0.9, ease: "power3" });
    const yTo = gsap.quickTo(target, "y", { duration: 0.9, ease: "power3" });
    const ixTo = inner ? gsap.quickTo(inner, "x", { duration: 0.9, ease: "power3" }) : null;
    const iyTo = inner ? gsap.quickTo(inner, "y", { duration: 0.9, ease: "power3" }) : null;

    const move = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      xTo(dx * strength);
      yTo(dy * strength);
      ixTo?.(dx * strength * 0.45);
      iyTo?.(dy * strength * 0.45);
    };
    const leave = () => {
      gsap.to([target, inner].filter(Boolean), { x: 0, y: 0, duration: 1.2, ease: "elastic.out(1, 0.35)" });
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.killTweensOf([target, inner].filter(Boolean));
    };
  }, [strength]);

  return (
    <div ref={ref} className={cn("-m-4 inline-flex p-4", className)}>
      {children}
    </div>
  );
}
