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
  ordinal,
  locale,
}: {
  value: number;
  decimals: number;
  suffix: string;
  ordinal: boolean;
  locale: Locale;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const options = { locale, decimals, suffix, ordinal };
  const final = formatStat(value, options);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const format = (n: number) => formatStat(n, { locale, decimals, suffix, ordinal });
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
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = format(value);
    };
  }, [value, decimals, suffix, ordinal, locale]);

  return (
    <>
      <span className="sr-only">{final}</span>
      <span ref={ref} aria-hidden>
        {final}
      </span>
    </>
  );
}
