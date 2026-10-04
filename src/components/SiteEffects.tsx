"use client";

import { useEffect, useLayoutEffect } from "react";
import { prefersReducedMotion } from "@/lib/utils";

/**
 * Page-wide behaviour:
 * • re-applies the saved theme on <html> (React resets the element when the language changes),
 * • lets every [data-reveal] element that is still below the screen settle in once when it
 *   scrolls into view. Nothing is hidden beforehand, so the page is complete without this.
 */
export function SiteEffects() {
  useLayoutEffect(() => {
    try {
      const theme = localStorage.getItem("theme");
      if (theme === "light" || theme === "dark") document.documentElement.dataset.theme = theme;
    } catch {
      /* storage unavailable */
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        (entry.target as HTMLElement).dataset.enter = "";
      }
    });
    const fold = window.innerHeight;
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((item) => {
      if (item.getBoundingClientRect().top >= fold) observer.observe(item);
    });
    return () => observer.disconnect();
  }, []);

  return null;
}
