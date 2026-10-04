"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Hue } from "@/content/types";
import { cn, prefersReducedMotion, vars } from "@/lib/utils";

/** Where each sticker sits around the portrait, and how strongly it follows the mouse. */
const spots = [
  { className: "top-[9%] -left-[3%] sm:-left-[8%]", rotate: "-8deg", depth: 26 },
  { className: "top-[2%] right-[2%] sm:-right-[2%]", rotate: "7deg", depth: -20 },
  { className: "bottom-[13%] -left-[1%] sm:-left-[6%]", rotate: "6deg", depth: 32 },
  { className: "right-[-2%] bottom-[4%] sm:-right-[7%]", rotate: "-6deg", depth: -28 },
];

/** Photo (or initials) in a turning colour ring, with stickers floating around it. */
export function Portrait({
  photo,
  initials,
  name,
  stickers,
}: {
  photo?: string;
  initials: string;
  name: string;
  stickers: { text: string; hue: Hue }[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  // stickers drift a little towards the mouse (desktop only)
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const box = el.getBoundingClientRect();
        el.style.setProperty("--mx", ((event.clientX - box.left - box.width / 2) / window.innerWidth).toFixed(3));
        el.style.setProperty("--my", ((event.clientY - box.top - box.height / 2) / window.innerHeight).toFixed(3));
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[19rem] [--mx:0] [--my:0] sm:max-w-[23rem]">
      <div
        aria-hidden
        className="absolute inset-[7%] animate-[spin_16s_linear_infinite] rounded-full bg-[conic-gradient(from_20deg,var(--blue),var(--violet),var(--sun),var(--blue))]"
      />
      <div aria-hidden className="absolute inset-[9.5%] rounded-full bg-bg" />
      <div className="absolute inset-[12%] overflow-hidden rounded-full bg-surface shadow-[var(--shadow)]">
        {photo ? (
          <Image
            src={photo}
            alt={name}
            fill
            priority
            sizes="(min-width: 640px) 18rem, 15rem"
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="grid size-full place-items-center bg-[radial-gradient(circle_at_30%_25%,color-mix(in_srgb,var(--sun)_22%,transparent),transparent_55%),radial-gradient(circle_at_75%_80%,color-mix(in_srgb,var(--blue)_22%,transparent),transparent_60%)]"
          >
            <span className="shimmer-text font-display text-[5.5rem] leading-none font-extrabold tracking-[-0.04em] sm:text-[6.75rem]">
              {initials}
            </span>
          </div>
        )}
      </div>

      {stickers.map((sticker, i) => {
        const spot = spots[i % spots.length];
        return (
          <span
            key={sticker.text}
            data-hue={sticker.hue}
            className={cn(
              "absolute [translate:calc(var(--mx)*var(--depth)*1px)_calc(var(--my)*var(--depth)*1px)] transition-[translate] duration-500 ease-out",
              spot.className,
            )}
            style={vars({ "--depth": spot.depth })}
          >
            <span
              className="block float rounded-full border-2 border-hue bg-[color-mix(in_srgb,var(--hue)_14%,var(--surface))] px-3.5 py-1.5 font-display text-sm font-bold whitespace-nowrap text-hue-ink shadow-[3px_3px_0_var(--hue)] sm:text-[0.9375rem]"
              style={vars({ "--r": spot.rotate, "--d": `${i * -1.3}s` })}
            >
              {sticker.text}
            </span>
          </span>
        );
      })}
    </div>
  );
}
