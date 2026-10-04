"use client";

import { useEffect, useState } from "react";
import type { Hue } from "@/content/types";
import { prefersReducedMotion } from "@/lib/utils";

type Word = { text: string; lang: string; dir?: "rtl"; hue: Hue };

/** "Hello!" cycling through the languages I speak. */
export function Greeting({ words }: { words: Word[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % words.length), 2600);
    return () => window.clearInterval(timer);
  }, [words.length]);

  const previous = (index - 1 + words.length) % words.length;

  return (
    <span className="inline-grid">
      {words.map((word, i) => (
        <span
          key={word.lang}
          lang={word.lang}
          dir={word.dir}
          data-hue={word.hue}
          data-state={i === index ? "in" : i === previous ? "out" : "next"}
          aria-hidden={i !== index || undefined}
          className="col-start-1 row-start-1 justify-self-start text-hue-ink transition-[opacity,translate] duration-700 ease-(--ease) data-[state=next]:translate-y-[0.55em] data-[state=next]:opacity-0 data-[state=out]:-translate-y-[0.55em] data-[state=out]:opacity-0"
        >
          {word.text}!
        </span>
      ))}
    </span>
  );
}
