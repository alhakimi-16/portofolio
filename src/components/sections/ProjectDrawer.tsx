"use client";

import { useEffect, useRef } from "react";
import { useI18n } from "@/components/providers/I18nProvider";
import { ArrowLeft, ArrowRight, ArrowUpRight, Close } from "@/components/ui/Icons";
import type { ProjectView } from "@/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { lockScroll } from "@/lib/scroll-lock";
import { prefersReducedMotion } from "@/lib/utils";

export function ProjectDrawer({
  project,
  cover,
  index,
  total,
  nextTitle,
  onNavigate,
  onClose,
}: {
  project: ProjectView;
  cover: React.ReactNode;
  index: number;
  total: number;
  nextTitle: string;
  onNavigate: (direction: 1 | -1) => void;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);

  const close = () => {
    if (closing.current) return;
    closing.current = true;
    if (prefersReducedMotion()) {
      onClose();
      return;
    }
    gsap.to(panel.current, { xPercent: 100, duration: 0.7, ease: "expo.in" });
    gsap.to(backdrop.current, { autoAlpha: 0, duration: 0.7, ease: "power2.in", onComplete: onClose });
  };
  const closeRef = useRef(close);
  useEffect(() => {
    closeRef.current = close;
  });

  // mount: lock page scroll, focus, keyboard
  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const unlock = lockScroll();
    closeButton.current?.focus({ preventScroll: true });

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeRef.current();
      if (event.key === "Tab" && panel.current) {
        // simple focus trap
        const focusable = panel.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlock();
      previous?.focus({ preventScroll: true });
    };
  }, []);

  // enter animation
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(backdrop.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, ease: "power2.out" });
      gsap.fromTo(panel.current, { xPercent: 100 }, { xPercent: 0, duration: 1, ease: "expo.out" });
    },
    { scope: root },
  );

  // content animation whenever the project changes
  useGSAP(
    () => {
      panel.current?.scrollTo({ top: 0 });
      if (prefersReducedMotion()) return;
      gsap.from("[data-drawer-item]", {
        y: 28,
        autoAlpha: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.045,
        delay: 0.15,
      });
    },
    { scope: root, dependencies: [project.slug] },
  );

  return (
    <div ref={root} className="fixed inset-0 z-[55]" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
      <div ref={backdrop} className="absolute inset-0 bg-bg/70 backdrop-blur-sm" onClick={close} />
      <div
        ref={panel}
        data-lenis-prevent
        className="absolute inset-y-0 right-0 flex w-full flex-col overflow-y-auto overscroll-contain border-l border-line-strong bg-bg md:w-[min(52rem,92vw)]"
      >
        <div className="sticky top-0 z-10 flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-line bg-bg/85 gutter backdrop-blur-md">
          <span className="label text-muted tabular">
            ({String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}) {t.work.project}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate(-1)}
              aria-label={t.work.previous}
              className="grid size-9 place-items-center rounded-full border border-line-strong transition-colors hover:border-fg"
            >
              <ArrowLeft className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate(1)}
              aria-label={t.work.next}
              className="grid size-9 place-items-center rounded-full border border-line-strong transition-colors hover:border-fg"
            >
              <ArrowRight className="size-3.5" />
            </button>
            <button
              ref={closeButton}
              type="button"
              onClick={close}
              className="ml-2 flex h-9 items-center gap-2 rounded-full bg-fg px-4 label text-bg transition-opacity hover:opacity-85"
            >
              {t.work.close} <Close className="size-3" />
            </button>
          </div>
        </div>

        <div data-drawer-item className="aspect-[16/10] w-full shrink-0 overflow-hidden border-b border-line">
          {cover}
        </div>

        <div className="flex-1 gutter py-10 md:py-14">
          <p data-drawer-item className="flex gap-4 label text-muted">
            <span className="text-accent">{project.categoryLabel}</span>
            <span className="tabular">{project.year}</span>
          </p>
          <h3 id="drawer-title" data-drawer-item className="mt-4 display text-[clamp(2.75rem,7vw,5.5rem)]">
            {project.title}
          </h3>
          <p
            data-drawer-item
            className="mt-6 max-w-[34ch] text-[clamp(1.25rem,2.2vw,1.75rem)] leading-tight tracking-[-0.02em]"
          >
            {project.summary}
          </p>

          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <div data-drawer-item>
              <h4 className="border-t border-line pt-3 label text-muted">{t.work.problem}</h4>
              <p className="mt-4 leading-relaxed">{project.problem}</p>
            </div>
            <div data-drawer-item>
              <h4 className="border-t border-line pt-3 label text-muted">{t.work.approach}</h4>
              <p className="mt-4 leading-relaxed">{project.approach}</p>
            </div>
          </div>

          <div data-drawer-item className="mt-12">
            <h4 className="border-t border-line pt-3 label text-muted">{t.work.results}</h4>
            <dl className="mt-5 grid grid-cols-1 gap-px bg-line sm:grid-cols-3">
              {project.results.map((result) => (
                <div key={result.label} className="flex flex-col gap-2 bg-bg py-4 pr-4 sm:px-4 sm:first:pl-0">
                  <dt className="order-2 text-[0.875rem] leading-snug text-muted">{result.label}</dt>
                  <dd className="order-1 display text-[clamp(2.5rem,5vw,3.5rem)] text-accent">{result.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div data-drawer-item className="mt-12 grid gap-10 md:grid-cols-2">
            <div>
              <h4 className="border-t border-line pt-3 label text-muted">{t.work.stack}</h4>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tool) => (
                  <li key={tool} className="rounded-full border border-line-strong px-3 py-1.5 label">
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
            {project.links.length > 0 && (
              <div>
                <h4 className="border-t border-line pt-3 label text-muted">{t.work.links}</h4>
                <ul className="mt-4 flex flex-wrap gap-4">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
                      >
                        {link.label} <ArrowUpRight />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {total > 1 && (
          <button
            type="button"
            onClick={() => onNavigate(1)}
            className="group flex w-full shrink-0 items-end justify-between gap-6 border-t border-line gutter py-8 text-left transition-colors hover:bg-elevated"
          >
            <span>
              <span className="block label text-muted">{t.work.next}</span>
              <span className="mt-2 block display text-[clamp(2rem,5vw,3.75rem)]">{nextTitle}</span>
            </span>
            <ArrowRight className="mb-3 size-6 transition-transform duration-500 ease-expo group-hover:translate-x-2" />
          </button>
        )}
      </div>
    </div>
  );
}
