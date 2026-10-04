"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/i18n/config";
import { formatStat } from "@/lib/format";
import { prefersReducedMotion } from "@/lib/utils";

/** A number that counts up from zero the first time it scrolls into view. */
export function CountUp({
  value,
  decimals,
  suffix,
  locale,
}: {
  value: number;
  decimals: number;
  suffix: string;
  locale: Locale;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const final = formatStat(value, { locale, decimals, suffix });

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const format = (n: number) => formatStat(n, { locale, decimals, suffix });
    let frame = 0;
    el.textContent = format(0);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1800);
          el.textContent = format(value * (1 - Math.pow(1 - t, 4)));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = format(value);
    };
  }, [value, decimals, suffix, locale]);

  return (
    <>
      <span className="sr-only">{final}</span>
      <span ref={ref} aria-hidden>
        {final}
      </span>
    </>
  );
}
