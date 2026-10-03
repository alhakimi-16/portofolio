"use client";

import { scrollToTarget } from "@/lib/scroll-lock";

/** Keyboard users jump straight to the content; focus moves along with the scroll position. */
export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main"
      onClick={(event) => {
        event.preventDefault();
        document.getElementById("main")?.focus({ preventScroll: true });
        scrollToTarget("#main", { immediate: true });
      }}
      className="fixed top-3 left-3 z-[95] -translate-y-24 rounded-full bg-fg px-4 py-3 label text-bg transition-transform focus:translate-y-0"
    >
      {label}
    </a>
  );
}
