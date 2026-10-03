"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/utils";

const GLYPHS = "!<>-_/[]{}=+*^?#01234567890";
const FRAMES = 26;

function scrambled(text: string, frame: number) {
  const revealed = Math.floor((frame / FRAMES) * text.length);
  let out = text.slice(0, revealed);
  for (let i = revealed; i < text.length; i++) {
    const char = text[i];
    // cheap deterministic hash so rendering stays pure
    out += char === " " ? " " : GLYPHS[(i * 7 + frame * 13 + char.charCodeAt(0)) % GLYPHS.length];
  }
  return out;
}

/**
 * Monospace label that "decodes" itself when it scrolls into view (and on hover).
 * Only use it with monospace text, so the width never changes.
 */
export function Scramble({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const raf = useRef(0);
  const [frame, setFrame] = useState<number | null>(null);

  const run = useCallback(() => {
    if (prefersReducedMotion()) return;
    cancelAnimationFrame(raf.current);
    let current = 0;
    const tick = () => {
      current += 1;
      if (current >= FRAMES) {
        setFrame(null);
        return;
      }
      setFrame(current);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        run();
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [run, text]);

  return (
    <span ref={ref} className={className} onPointerEnter={run}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{frame === null ? text : scrambled(text, frame)}</span>
    </span>
  );
}
