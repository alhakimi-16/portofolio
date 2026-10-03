"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

/** Endless ticker that speeds up with scroll velocity and follows the scroll direction. */
export function Marquee({ items }: { items: string[] }) {
  const track = useRef<HTMLDivElement>(null);
  const boost = useRef(0);
  const direction = useRef(1);

  useGSAP(
    () => {
      const el = track.current;
      if (!el || prefersReducedMotion()) return;
      const wrap = gsap.utils.wrap(-50, 0);
      const setX = gsap.quickSetter(el, "xPercent");
      let x = 0;
      let speed = 1;
      const tick = (_time: number, deltaMs: number) => {
        boost.current *= 0.92;
        const target = (1 + boost.current) * direction.current;
        speed += (target - speed) * 0.08;
        x = wrap(x - speed * deltaMs * 0.0016);
        setX(x);
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    },
    { scope: track },
  );

  useLenis(({ velocity, direction: dir }) => {
    if (dir) direction.current = dir;
    boost.current = Math.min(7, Math.max(boost.current, Math.abs(velocity) * 0.25));
  });

  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center">
          <span className={i % 2 ? "font-serif font-normal tracking-[-0.02em] italic" : undefined}>{item}</span>
          <span aria-hidden className="mx-[0.4em] text-[0.5em] text-accent">
            ✳
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden border-y border-line py-5 select-none md:py-7">
      <div
        ref={track}
        className="flex w-max display text-[clamp(2.5rem,7vw,6.5rem)] leading-[1.05] tracking-[-0.04em] whitespace-nowrap will-change-transform"
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
