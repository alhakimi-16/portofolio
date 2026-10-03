"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

/** Number that counts up when it scrolls into view. Renders the final value on the server. */
export function Counter({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const state = { n: 0 };
      gsap.to(state, {
        n: value,
        duration: 2,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = `${Math.round(state.n)}${suffix}`;
        },
      });
      el.textContent = `0${suffix}`;
    },
    { scope: ref, dependencies: [value, suffix] },
  );

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
