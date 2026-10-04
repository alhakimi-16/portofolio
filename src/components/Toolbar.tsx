"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/ui";
import { Formula } from "./Formula";
import { LangSwitch } from "./LangSwitch";
import { ThemeToggle } from "./ThemeToggle";

type Part = keyof Dictionary["formulas"];

const columns = "ABCDEFGHIJKL".split("");

/**
 * The workbook's top bar: file name, language and theme switches, the formula bar
 * (its formula follows the part of the page in view; the name box shows the selected
 * range) and, on wide screens, the column letters.
 */
export function Toolbar({
  locale,
  initials,
  file,
  formulas,
  labels,
}: {
  locale: Locale;
  initials: string;
  file: string;
  formulas: Dictionary["formulas"];
  labels: { language: string; theme: string; top: string; nameBox: string; formula: string };
}) {
  const [part, setPart] = useState<Part>("top");

  useEffect(() => {
    const sheets = [...document.querySelectorAll<HTMLElement>("[data-sheet]")];
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        const current = sheets.find((sheet) => visible.has(sheet));
        if (current) setPart(current.dataset.sheet as Part);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    sheets.forEach((sheet) => observer.observe(sheet));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-head">
      <div className="mx-auto flex h-12 max-w-[1240px] items-center gap-3 px-3 sm:px-4 lg:border-x lg:border-line">
        <a
          href="#top"
          aria-label={labels.top}
          className="grid size-8 shrink-0 place-items-center bg-sel display text-[0.9375rem] text-on-sel"
        >
          {initials}
        </a>
        <span className="min-w-0 truncate font-mono text-[0.8125rem] text-muted">{file}</span>
        <div className="ml-auto flex items-center gap-1.5">
          <LangSwitch locale={locale} label={labels.language} />
          <ThemeToggle label={labels.theme} />
        </div>
      </div>

      <div className="mx-auto flex h-9 max-w-[1240px] items-stretch border-t border-line font-mono text-[0.8125rem] lg:border-x">
        <output
          id="name-box"
          aria-label={labels.nameBox}
          className="flex w-[6.5rem] shrink-0 items-center border-r border-line bg-paper px-2.5 text-ink tabular-nums"
        >
          A1
        </output>
        <span
          aria-hidden
          className="flex w-9 shrink-0 items-center justify-center border-r border-line text-muted italic"
        >
          fx
        </span>
        <p aria-label={labels.formula} className="flex min-w-0 flex-1 items-center bg-paper px-3">
          <span key={part} className="animate-[formula-in_0.35s_ease-out] truncate">
            <Formula text={formulas[part]} />
          </span>
        </p>
      </div>

      <div
        aria-hidden
        className="mx-auto hidden h-6 max-w-[1240px] grid-cols-[44px_minmax(0,1fr)] border-t border-line lg:grid lg:border-x"
      >
        <span className="relative border-r border-line">
          <span className="absolute right-1 bottom-1 border-[0_0_7px_7px] border-solid border-transparent border-b-head-ink/50" />
        </span>
        <div className="grid grid-cols-12">
          {columns.map((letter, i) => (
            <span
              key={letter}
              data-col={i + 1}
              className="flex items-center justify-center border-r border-line font-mono text-[0.6875rem] text-head-ink transition-colors last:border-r-0 data-on:bg-fill-green data-on:font-semibold data-on:text-ink-green"
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
