"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/utils";

type Word = { text: string; lang: string; dir?: "rtl" };

/**
 * "Hello!" in the four languages, one after another. The words share one grid cell and
 * cross-fade; the cell's width follows the visible word, so the text after it glides along.
 */
export function Greeting({ words }: { words: Word[] }) {
  const [index, setIndex] = useState(0);
  // the first word is simply there; the following ones fade in
  const [cycling, setCycling] = useState(false);
  const [widths, setWidths] = useState<number[]>([]);
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion() || words.length < 2) return;
    const timer = window.setInterval(() => {
      setCycling(true);
      setIndex((i) => (i + 1) % words.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, [words]);

  // measure every word (again whenever the font size changes)
  useEffect(() => {
    const items = refs.current.filter((el): el is HTMLSpanElement => el !== null);
    const measure = () => setWidths(refs.current.map((el) => el?.getBoundingClientRect().width ?? 0));
    const observer = new ResizeObserver(measure);
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [words]);

  const first = words[0];
  if (!first) return null;
  return (
    <>
      <span className="sr-only" lang={first.lang}>
        {first.text}!
      </span>
      <span
        aria-hidden
        className="inline-grid justify-items-start transition-[width] duration-700 ease-[var(--ease)]"
        style={widths[index] ? { width: widths[index] } : undefined}
      >
        {words.map((word, i) => (
          <span
            key={word.text}
            ref={(el) => {
              refs.current[i] = el;
            }}
            lang={word.lang}
            dir={word.dir}
            data-on={i === index || undefined}
            data-cycling={cycling || undefined}
            className="invisible whitespace-nowrap [grid-area:1/1] data-on:visible data-on:data-cycling:animate-[greet-in_0.8s_var(--ease)_both]"
          >
            {word.text}!
          </span>
        ))}
      </span>
    </>
  );
}
