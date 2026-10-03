"use client";

import { useLayoutEffect } from "react";
import { INTRO_SEEN_KEY, isIntroReady } from "@/lib/intro";

/**
 * Switching language swaps the root layout, and React resets the attributes on <html>.
 * This restores what the boot script set (theme, JS flag, intro state) before the next paint.
 */
export function DocumentState() {
  useLayoutEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-js", "");
    try {
      const theme = localStorage.getItem("theme");
      if (theme === "light" || theme === "dark") html.setAttribute("data-theme", theme);
      if (isIntroReady() || sessionStorage.getItem(INTRO_SEEN_KEY)) html.setAttribute("data-intro-seen", "");
    } catch {
      if (isIntroReady()) html.setAttribute("data-intro-seen", "");
    }
  }, []);
  return null;
}
