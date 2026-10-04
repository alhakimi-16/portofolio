"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/utils";

type Word = { text: string; lang: string; dir?: "rtl" };

const letters = (text: string) => Array.from(text);

/** Types "Hello!" in the four languages, one after another, like input in a cell. */
export function Typewriter({ words }: { words: Word[] }) {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(() => letters(`${words[0]?.text ?? ""}!`).length);

  useEffect(() => {
    if (prefersReducedMotion() || words.length < 2) return;
    let i = 0;
    let n = letters(`${words[0].text}!`).length;
    let deleting = true;
    let timer = 0;
    const step = () => {
      const full = letters(`${words[i].text}!`).length;
      if (deleting) {
        if (n > 0) {
          n -= 1;
          setCount(n);
          timer = window.setTimeout(step, 45);
        } else {
          deleting = false;
          i = (i + 1) % words.length;
          setIndex(i);
          timer = window.setTimeout(step, 260);
        }
      } else if (n < full) {
        n += 1;
        setCount(n);
        timer = window.setTimeout(step, 90);
      } else {
        deleting = true;
        timer = window.setTimeout(step, 2200);
      }
    };
    timer = window.setTimeout(step, 2400);
    return () => window.clearTimeout(timer);
  }, [words]);

  const word = words[index];
  if (!word) return null;
  return (
    <>
      <span lang={word.lang} dir={word.dir}>
        {letters(`${word.text}!`).slice(0, count).join("")}
      </span>
      <span
        aria-hidden
        className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.15em] animate-[blink_1s_steps(1)_infinite] bg-sel"
      />
    </>
  );
}
