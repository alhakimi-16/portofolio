"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Hue } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { LangSwitch } from "./LangSwitch";
import { ThemeToggle } from "./ThemeToggle";

type NavItem = { id: string; label: string; hue: Hue };

/**
 * Floating header: logo, section links with a coloured pill that follows the section
 * you are reading, language and theme switches, a menu on phones and a scroll progress bar.
 */
export function Header({
  items,
  locale,
  name,
  initials,
  labels,
}: {
  items: NavItem[];
  locale: Locale;
  name: string;
  initials: string;
  labels: { sections: string; language: string; theme: string; top: string; menu: string };
}) {
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // progress bar + solid background once the page is scrolled
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      progressRef.current?.style.setProperty("--progress", progress.toFixed(4));
      barRef.current?.toggleAttribute("data-scrolled", window.scrollY > 16);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  // which section is in the middle of the screen
  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>("section[data-nav]")];
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        const current = sections.find((section) => visible.has(section));
        setActive(current?.dataset.nav ?? null);
      },
      { rootMargin: "-42% 0px -54% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // move the pill under the active link
  useLayoutEffect(() => {
    const nav = navRef.current;
    const pill = pillRef.current;
    if (!nav || !pill) return;
    const place = () => {
      const link = active ? nav.querySelector<HTMLElement>(`a[data-id="${active}"]`) : null;
      if (!link) {
        pill.style.opacity = "0";
        return;
      }
      pill.dataset.hue = link.dataset.hue;
      pill.style.opacity = "1";
      pill.style.width = `${link.offsetWidth}px`;
      pill.style.translate = `${link.offsetLeft}px 0`;
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(nav);
    return () => observer.disconnect();
  }, [active]);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    const onToggle = (event: Event) => setMenuOpen((event as ToggleEvent).newState === "open");
    menu.addEventListener("toggle", onToggle);
    return () => menu.removeEventListener("toggle", onToggle);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        ref={progressRef}
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-(--progress) bg-[linear-gradient(90deg,var(--blue),var(--violet),var(--sun))] [--progress:0]"
      />
      <div className="mx-auto max-w-6xl px-3 pt-3 sm:px-5">
        <div
          ref={barRef}
          className="flex h-14 items-center justify-between gap-3 rounded-full border border-transparent py-2 pr-2 pl-2 transition-[background-color,border-color,box-shadow] duration-300 data-scrolled:border-line data-scrolled:bg-surface/80 data-scrolled:shadow-[var(--shadow)] data-scrolled:backdrop-blur-xl"
        >
          <a
            href="#top"
            className="group flex items-center gap-3 rounded-full pr-2"
            aria-label={`${name} · ${labels.top}`}
          >
            <span className="grid size-10 place-items-center rounded-full bg-fg font-display text-[0.8125rem] font-extrabold tracking-tight text-bg transition-transform duration-700 ease-(--ease) group-hover:rotate-[360deg]">
              {initials}
            </span>
            <span className="hidden font-display text-[1.0625rem] font-bold tracking-tight text-fg lg:block">
              {name}
            </span>
          </a>

          <nav aria-label={labels.sections} className="hidden md:block">
            <div ref={navRef} className="relative">
              <span
                ref={pillRef}
                aria-hidden
                className="absolute inset-y-0 left-0 rounded-full bg-hue/15 opacity-0 transition-[translate,width,opacity] duration-500 ease-(--ease)"
              />
              <ul className="relative flex items-center">
                {items.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      data-id={item.id}
                      data-hue={item.hue}
                      aria-current={active === item.id ? "true" : undefined}
                      className="block rounded-full px-3.5 py-2 text-sm font-semibold text-muted transition-colors duration-300 hover:text-fg aria-[current=true]:text-hue-ink"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="flex items-center gap-1">
            <LangSwitch locale={locale} label={labels.language} />
            <ThemeToggle label={labels.theme} />
            <button
              type="button"
              popoverTarget="site-menu"
              aria-label={labels.menu}
              className="grid size-10 place-items-center rounded-full text-fg transition-colors hover:bg-fg/[0.07] md:hidden"
            >
              {menuOpen ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      <div
        ref={menuRef}
        id="site-menu"
        popover="auto"
        className="inset-x-3 top-[4.75rem] bottom-auto m-0 w-auto -translate-y-2 rounded-[1.75rem] border border-line bg-surface p-2 text-fg opacity-0 shadow-[var(--shadow)] transition-[opacity,translate,display,overlay] transition-discrete duration-300 ease-(--ease) open:translate-y-0 open:opacity-100 md:hidden starting:open:-translate-y-2 starting:open:opacity-0"
      >
        <nav aria-label={labels.sections}>
          <ul className="grid">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  data-hue={item.hue}
                  onClick={() => menuRef.current?.hidePopover()}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3.5 font-display text-xl font-bold transition-colors hover:bg-hue/10"
                >
                  <span aria-hidden className="size-2.5 rounded-full bg-hue" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
