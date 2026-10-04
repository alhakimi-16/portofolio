"use client";

import { useEffect, useLayoutEffect } from "react";
import { prefersReducedMotion } from "@/lib/utils";

declare global {
  interface Window {
    /** set once the page's JavaScript runs (see src/lib/boot.ts) */
    __revealReady?: boolean;
    /** set when the boot script gave up waiting and switched animations off */
    __revealOff?: boolean;
  }
}

/**
 * Page-wide behaviour:
 * • re-applies the theme and motion flags on <html> (React clears them when the language changes),
 * • reveals every [data-reveal] element the first time it scrolls into view.
 */
export function SiteEffects() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    try {
      const theme = localStorage.getItem("theme");
      if (theme === "light" || theme === "dark") root.dataset.theme = theme;
    } catch {
      /* storage unavailable */
    }
    if (!window.__revealOff && !prefersReducedMotion()) root.dataset.motion = "";
    window.__revealReady = true;
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.shown = "";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return null;
}
