"use client";

import { useEffect } from "react";

const ROW = 40;
const letter = (n: number) => String.fromCharCode(64 + n);

/**
 * Selection on the sheet: the range under the pointer (or keyboard focus) gets the green
 * outline, its address appears in the name box, and its columns and rows light up in the
 * headers. Ranges are elements with [data-range]; [data-start] marks the one selected on load.
 */
export function SheetEffects() {
  useEffect(() => {
    const sheet = document.getElementById("content");
    const nameBox = document.getElementById("name-box");
    const rowMark = document.getElementById("row-mark");
    const heads = [...document.querySelectorAll<HTMLElement>("[data-col]")];
    if (!sheet || !nameBox) return;
    let current: HTMLElement | null = null;

    const address = (el: HTMLElement) => {
      const box = sheet.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      const cols = window.matchMedia("(min-width: 64rem)").matches ? 12 : 4;
      const width = box.width / cols;
      const c1 = Math.min(cols, Math.max(1, Math.round((rect.left - box.left) / width) + 1));
      const c2 = Math.min(cols, Math.max(c1, Math.round((rect.right - box.left) / width)));
      const r1 = Math.floor((rect.top - box.top) / ROW) + 1;
      const r2 = Math.max(r1, Math.ceil((rect.bottom - box.top) / ROW));
      return { c1, c2, r1, r2 };
    };

    const select = (el: HTMLElement | null, force = false) => {
      if (!el || (el === current && !force)) return;
      current?.removeAttribute("data-selected");
      el.setAttribute("data-selected", "");
      current = el;
      const { c1, c2, r1, r2 } = address(el);
      nameBox.textContent = `${letter(c1)}${r1}:${letter(c2)}${r2}`;
      heads.forEach((head) => {
        const col = Number(head.dataset.col);
        head.toggleAttribute("data-on", col >= c1 && col <= c2);
      });
      if (rowMark) {
        rowMark.style.top = `${(r1 - 1) * ROW}px`;
        rowMark.style.height = `${(r2 - r1 + 1) * ROW}px`;
      }
    };

    const pick = (event: Event) => {
      const target = event.target;
      if (target instanceof Element) select(target.closest<HTMLElement>("[data-range]"));
    };
    const refresh = () => select(current, true);

    select(document.querySelector<HTMLElement>("[data-range][data-start]"));

    // while scrolling, the selection moves to the first range of the part in view
    const follow = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || (current && entry.target.contains(current))) continue;
          select(entry.target.querySelector<HTMLElement>("[data-range]"));
        }
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    document.querySelectorAll("[data-sheet]").forEach((part) => follow.observe(part));

    document.addEventListener("pointerover", pick);
    document.addEventListener("focusin", pick);
    window.addEventListener("resize", refresh);
    document.fonts?.ready.then(refresh).catch(() => {});
    return () => {
      follow.disconnect();
      document.removeEventListener("pointerover", pick);
      document.removeEventListener("focusin", pick);
      window.removeEventListener("resize", refresh);
      current?.removeAttribute("data-selected");
    };
  }, []);

  return null;
}
