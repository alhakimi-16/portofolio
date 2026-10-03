"use client";

import { useI18n } from "@/components/providers/I18nProvider";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { t } = useI18n();
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={(event) => {
        // keyboard activation has no pointer position → reveal from the button itself
        const rect = event.currentTarget.getBoundingClientRect();
        const fromPointer = event.detail > 0;
        toggle({
          x: fromPointer ? event.clientX : rect.left + rect.width / 2,
          y: fromPointer ? event.clientY : rect.top + rect.height / 2,
        });
      }}
      aria-label={t.header.theme}
      title={t.header.theme}
      className={cn(
        "grid size-9 place-items-center rounded-full border border-line-strong transition-colors hover:border-fg",
        className,
      )}
    >
      <span className="relative block size-3.5 overflow-hidden rounded-full border border-fg">
        <span
          className="absolute inset-y-0 left-0 w-1/2 bg-fg transition-transform duration-700 ease-quart"
          style={{ transform: theme === "dark" ? "translateX(0)" : "translateX(100%)" }}
        />
      </span>
    </button>
  );
}
