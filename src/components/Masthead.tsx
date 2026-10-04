"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/ui";
import { cn, pad, wrap } from "@/lib/utils";
import { LangSwitch } from "./LangSwitch";
import { ThemeToggle } from "./ThemeToggle";

type Item = { id: string; label: string };

/**
 * The header: the name, the numbered sections (the one in view is underlined), language
 * and theme. On phones the sections open in a panel. A thin blue line under the header
 * shows how far down the page you are.
 */
export function Masthead({
  locale,
  name,
  items,
  labels,
}: {
  locale: Locale;
  name: string;
  items: Item[];
  labels: Dictionary["header"];
}) {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        setActive(items.find((item) => visible.has(item.id))?.id ?? null);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));

    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [items]);

  return (
    <>
      <header
        data-scrolled={scrolled || undefined}
        className="sticky top-[env(safe-area-inset-top,0px)] z-40 border-b border-transparent bg-paper/90 backdrop-blur-md transition-colors duration-500 data-scrolled:border-rule"
      >
        <div className={cn(wrap, "flex h-14 items-center gap-4")}>
          <a href="#top" title={labels.top} className="min-w-0 truncate py-2 label text-ink">
            {name}
          </a>

          <nav aria-label={labels.sections} className="ml-auto hidden lg:block">
            <ol className="flex items-center gap-5 xl:gap-7">
              {items.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? "true" : undefined}
                    className="group flex items-baseline gap-1.5 py-2 label text-muted transition-colors hover:text-ink aria-[current=true]:text-ink"
                  >
                    <span className="text-blue-ink tabular-nums">{pad(i + 1)}</span>
                    <span className="relative">
                      {item.label}
                      <span
                        aria-hidden
                        className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-ink transition-transform duration-500 group-hover:scale-x-100 group-aria-[current=true]:scale-x-100"
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-1 lg:ml-4">
            <LangSwitch locale={locale} label={labels.language} />
            <ThemeToggle label={labels.theme} />
            <button
              type="button"
              popoverTarget="sections-panel"
              className="-mr-2 flex h-9 items-center gap-2 px-2 label text-ink lg:hidden"
            >
              {open ? <X aria-hidden className="size-4" /> : <Menu aria-hidden className="size-4" />}
              <span className="max-sm:sr-only">{labels.menu}</span>
            </button>
          </div>
        </div>
        <div aria-hidden className="progress absolute inset-x-0 -bottom-px h-0.5 bg-blue" />
      </header>

      <div
        id="sections-panel"
        ref={panel}
        popover="auto"
        onToggle={(event) => setOpen(event.newState === "open")}
        className="inset-x-0 top-[calc(3.5rem_+_env(safe-area-inset-top,0px))] bottom-auto m-0 max-h-[calc(100dvh_-_3.5rem_-_env(safe-area-inset-top,0px))] w-full max-w-none -translate-y-2 overflow-y-auto border-0 border-b border-rule bg-paper p-0 text-ink opacity-0 transition-[opacity,translate,display,overlay] transition-discrete duration-300 backdrop:top-[calc(3.5rem_+_env(safe-area-inset-top,0px))] backdrop:bg-black/25 open:translate-y-0 open:opacity-100 lg:hidden starting:open:-translate-y-2 starting:open:opacity-0"
      >
        <nav aria-label={labels.sections} className={cn(wrap, "pt-2 pb-6")}>
          <ol>
            {items.map((item, i) => (
              <li key={item.id} className="border-b border-rule last:border-b-0">
                <a
                  href={`#${item.id}`}
                  onClick={() => panel.current?.hidePopover()}
                  aria-current={active === item.id ? "true" : undefined}
                  className="group flex items-baseline gap-4 py-4"
                >
                  <span className="label text-blue-ink tabular-nums">{pad(i + 1)}</span>
                  <span className="sweep display text-[1.625rem] leading-none text-ink">{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </>
  );
}
