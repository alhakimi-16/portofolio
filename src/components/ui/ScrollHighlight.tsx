"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { cn, prefersReducedMotion } from "@/lib/utils";

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
export function ScrollHighlight({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      SplitText.create(el, {
        type: "words",
        autoSplit: true,
        onSplit: (self) =>
          gsap.fromTo(
            self.words,
            { opacity: 0.16 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.1,
              scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 50%", scrub: 0.6 },
            },
          ),
      });
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={cn(className)}>
      {children}
    </p>
  );
}
