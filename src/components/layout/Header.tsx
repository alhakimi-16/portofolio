"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { useI18n } from "@/components/providers/I18nProvider";
import { LangSwitch } from "@/components/ui/LangSwitch";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ArrowUpRight } from "@/components/ui/Icons";
import type { Social } from "@/content/types";
import { useClock, useModKey } from "@/lib/hooks";
import { lockScroll, scrollToTarget } from "@/lib/scroll-lock";
import { sectionIds } from "@/lib/site";
import { cn } from "@/lib/utils";

function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["top", ...sectionIds].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

export function Header({
  initials,
  name,
  email,
  socials,
  timezone,
}: {
  initials: string;
  name: string;
  email: string;
  socials: Social[];
  timezone: string;
}) {
  const { t, locale } = useI18n();
  const modKey = useModKey();
  const active = useActiveSection();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useLenis(({ scroll, direction, progress }) => {
    setScrolled(scroll > 24);
    if (scroll < 240 || direction === -1) setHidden(false);
    else if (direction === 1) setHidden(true);
    if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
  });

  useEffect(() => {
    if (!menuOpen) return;
    const unlock = lockScroll();
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      unlock();
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const go = (id: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    setMenuOpen(false);
    scrollToTarget(id === "top" ? 0 : `#${id}`);
  };

  return (
    <>
      <header
        data-hidden={hidden && !menuOpen}
        className="fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-expo data-[hidden=true]:-translate-y-full"
      >
        <div
          className={cn(
            "grid h-[var(--header-h)] grid-cols-[1fr_auto] items-center gap-6 gutter transition-colors duration-500 xl:grid-cols-[1fr_auto_1fr]",
            scrolled && !menuOpen && "bg-bg/75 backdrop-blur-md",
          )}
        >
          <a
            href="#top"
            onClick={go("top")}
            aria-label={t.header.home}
            className="group flex items-center gap-3 justify-self-start"
          >
            <span className="grid size-9 place-items-center rounded-full border border-line-strong text-[0.8125rem] font-bold tracking-tight transition-colors duration-300 group-hover:border-fg group-hover:bg-fg group-hover:text-bg">
              {initials}
            </span>
            <span className="hidden label leading-tight sm:block">
              <span className="block text-fg">{name}</span>
              <span className="block text-muted">Data · AI · ML</span>
            </span>
          </a>

          <nav aria-label={t.header.menu} className="hidden xl:block">
            <ul className="flex items-center gap-7">
              {sectionIds.map((id, i) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={go(id)}
                    aria-current={active === id ? "true" : undefined}
                    className="group flex items-baseline gap-1.5 text-[0.9375rem]"
                  >
                    <span
                      className={cn(
                        "label text-[0.625rem] transition-colors",
                        active === id ? "text-accent" : "text-faint",
                      )}
                    >
                      0{i + 1}
                    </span>
                    <span className="roll">
                      <span data-text={t.nav[id]}>{t.nav[id]}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 justify-self-end">
            <LangSwitch className="mr-2 hidden sm:flex" />
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("palette:open"))}
              aria-label={t.header.command}
              title={t.header.command}
              className="hidden h-9 items-center gap-1.5 rounded-full border border-line-strong px-3 label text-muted transition-colors hover:border-fg hover:text-fg md:flex"
            >
              <kbd className="font-mono">{modKey}</kbd>
              <kbd className="font-mono">K</kbd>
            </button>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="h-9 min-w-[4.5rem] rounded-full bg-fg px-4 label text-bg transition-opacity hover:opacity-85 xl:hidden"
            >
              {menuOpen ? t.header.close : t.header.menu}
            </button>
          </div>
        </div>
        <div className="h-px bg-line">
          <div ref={progressRef} className="h-px origin-left scale-x-0 bg-accent" />
        </div>
      </header>

      <MobileMenu open={menuOpen} go={go} email={email} socials={socials} timezone={timezone} locale={locale} />
    </>
  );
}

function MobileMenu({
  open,
  go,
  email,
  socials,
  timezone,
  locale,
}: {
  open: boolean;
  go: (id: string) => (event: React.MouseEvent) => void;
  email: string;
  socials: Social[];
  timezone: string;
  locale: string;
}) {
  const { t } = useI18n();
  const time = useClock(timezone, locale);

  return (
    <div
      id="mobile-menu"
      data-open={open}
      inert={!open}
      className="invisible fixed inset-0 z-[45] flex flex-col justify-between bg-bg gutter pt-[calc(var(--header-h)+2rem)] pb-8 [clip-path:inset(0_0_100%_0)] [transition:clip-path_0.9s_var(--ease-quart),visibility_0s_0.9s] data-[open=true]:visible data-[open=true]:[clip-path:inset(0_0_0%_0)] data-[open=true]:[transition:clip-path_0.9s_var(--ease-quart),visibility_0s] xl:hidden"
    >
      <nav aria-label={t.header.menu}>
        <ul>
          {sectionIds.map((id, i) => (
            <li key={id} className="overflow-hidden border-b border-line">
              <a
                href={`#${id}`}
                onClick={go(id)}
                className="flex items-baseline justify-between py-3 transition-transform duration-[900ms] ease-expo"
                style={{
                  transform: open ? "translateY(0)" : "translateY(100%)",
                  transitionDelay: open ? `${0.15 + i * 0.05}s` : "0s",
                }}
              >
                <span className="display text-[clamp(2.5rem,11vw,5rem)]">{t.nav[id]}</span>
                <span className="label text-muted">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="grid gap-6">
        <a href={`mailto:${email}`} className="text-lg underline decoration-line-strong underline-offset-4">
          {email}
        </a>
        <div className="flex flex-wrap items-center justify-between gap-4 label text-muted">
          <div className="flex gap-4">
            {socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-fg"
              >
                {social.label}
                <ArrowUpRight />
              </a>
            ))}
          </div>
          <LangSwitch />
          <span className="tabular">
            {t.footer.localTime} {time}
          </span>
        </div>
      </div>
    </div>
  );
}
