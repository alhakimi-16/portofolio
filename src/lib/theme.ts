"use client";

import { useCallback, useSyncExternalStore } from "react";
import { prefersReducedMotion } from "./utils";

export type Theme = "dark" | "light";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

/** Switches theme with a circular reveal from `origin` (View Transitions API when available). */
export function applyTheme(next: Theme, origin?: { x: number; y: number }) {
  const root = document.documentElement;
  const commit = () => {
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage can be unavailable (private mode) — the switch still works for this visit */
    }
  };

  if (typeof document.startViewTransition !== "function" || prefersReducedMotion()) {
    commit();
    return;
  }

  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? 0;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  const transition = document.startViewTransition(commit);
  transition.ready
    .then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 800, easing: "cubic-bezier(0.76, 0, 0.24, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    })
    .catch(() => {});
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const toggle = useCallback((origin?: { x: number; y: number }) => {
    applyTheme(getSnapshot() === "dark" ? "light" : "dark", origin);
  }, []);
  return { theme, toggle };
}

/** Calls `callback` whenever the theme attribute changes (for canvases that cache colours). */
export function observeTheme(callback: () => void): () => void {
  return subscribe(callback);
}
