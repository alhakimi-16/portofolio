"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/** "⌘" on Apple devices, "Ctrl" elsewhere. */
export function useModKey(): string {
  return useSyncExternalStore(
    noopSubscribe,
    () => (/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent) ? "⌘" : "Ctrl"),
    () => "⌘",
  );
}

export function useMediaQuery(query: string, serverValue = false): boolean {
  return useSyncExternalStore(
    (callback) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

/** Current time in `timeZone`, refreshed every few seconds. "--:--" during server rendering. */
export function useClock(timeZone: string, locale: string): string {
  return useSyncExternalStore(
    (callback) => {
      const id = window.setInterval(callback, 5000);
      return () => window.clearInterval(id);
    },
    () =>
      new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", hour12: false, timeZone }).format(
        new Date(),
      ),
    () => "--:--",
  );
}
