"use client";

import { useEffect, useRef, useState } from "react";

type Tab = { id: string; label: string };

/** Sheet tabs along the bottom: one per part of the page; the one in view is active. */
export function SheetTabs({ tabs, label, status }: { tabs: Tab[]; label: string; status: string }) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  const listRef = useRef<HTMLUListElement>(null);

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
        if (current) setActive(current.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    sheets.forEach((sheet) => observer.observe(sheet));
    return () => observer.disconnect();
  }, []);

  // keep the active tab visible when the tab strip scrolls (phones)
  useEffect(() => {
    const list = listRef.current;
    const tab = list?.querySelector<HTMLElement>(`a[data-id="${active}"]`);
    if (!list || !tab) return;
    const left = tab.offsetLeft - list.clientWidth / 2 + tab.clientWidth / 2;
    list.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label={label}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-head pb-[env(safe-area-inset-bottom,0px)]"
    >
      <div className="mx-auto flex h-11 max-w-[1240px] items-stretch lg:border-x lg:border-line">
        <p className="hidden shrink-0 items-center gap-2 border-r border-line px-4 font-mono text-xs text-muted lg:flex">
          <span aria-hidden className="relative flex size-2">
            <span className="absolute inset-0 animate-[ping_1.8s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-sel" />
            <span className="relative size-2 rounded-full bg-sel" />
          </span>
          {status}
        </p>
        <ul ref={listRef} className="flex min-w-0 flex-1 [scrollbar-width:none] items-stretch overflow-x-auto">
          {tabs.map((tab) => (
            <li key={tab.id} className="flex">
              <a
                href={`#${tab.id}`}
                data-id={tab.id}
                aria-current={active === tab.id ? "true" : undefined}
                className="flex items-center border-r border-line px-4 text-sm font-medium whitespace-nowrap text-muted transition-colors hover:bg-paper hover:text-ink aria-[current=true]:bg-paper aria-[current=true]:font-semibold aria-[current=true]:text-sel-ink aria-[current=true]:shadow-[inset_0_-2px_0_var(--sel)]"
              >
                {tab.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
