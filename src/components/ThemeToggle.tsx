"use client";

import { Moon, Sun } from "lucide-react";

/** Switches between light and dark. Without a saved choice the system setting applies. */
export function ThemeToggle({ label }: { label: string }) {
  function toggle() {
    const root = document.documentElement;
    const current =
      root.dataset.theme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="relative grid size-10 place-items-center overflow-hidden rounded-full text-fg transition-colors hover:bg-fg/[0.07]"
    >
      <Moon
        aria-hidden
        className="col-start-1 row-start-1 size-[1.15rem] transition-[rotate,scale,opacity] duration-500 dark:scale-50 dark:-rotate-90 dark:opacity-0"
      />
      <Sun
        aria-hidden
        className="col-start-1 row-start-1 size-[1.15rem] scale-50 rotate-90 opacity-0 transition-[rotate,scale,opacity] duration-500 dark:scale-100 dark:rotate-0 dark:opacity-100"
      />
    </button>
  );
}
