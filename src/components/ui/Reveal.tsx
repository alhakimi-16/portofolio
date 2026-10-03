"use client";

import { useRef, type HTMLAttributes } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "section" | "footer" | "article";
};

/**
 * Wraps server-rendered markup and animates it on scroll:
 *  • [data-split]  → headings reveal line by line from behind a mask
 *  • [data-reveal] → fades up; the attribute value is an optional delay in seconds
 */
export function Reveal({ as = "div", children, ...rest }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || prefersReducedMotion()) return;

      root.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 115,
              duration: 1.3,
              stagger: 0.09,
              ease: "expo.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            }),
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]", root).forEach((el) => {
        gsap.from(el, {
          y: 36,
          autoAlpha: 0,
          duration: 1.2,
          ease: "expo.out",
          delay: Number(el.dataset.reveal) || 0,
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });
    },
    { scope: ref },
  );

  // the tag only changes semantics; all variants are plain block elements
  const Tag = as as "div";
  return (
    <Tag ref={ref} {...rest}>
      {children}
    </Tag>
  );
}
