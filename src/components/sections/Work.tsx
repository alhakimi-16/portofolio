"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/providers/I18nProvider";
import { ArrowRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ProjectView, SiteContent } from "@/content";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { hasFinePointer, prefersReducedMotion } from "@/lib/utils";
import { ProjectDrawer } from "./ProjectDrawer";

type Filter = "all" | ProjectView["category"];

export function Work({
  projects,
  categories,
  covers,
}: {
  projects: ProjectView[];
  categories: SiteContent["categories"];
  covers: Record<string, React.ReactNode>;
}) {
  const { t } = useI18n();
  const [filter, setFilter] = useState<Filter>("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const reel = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const openIndex = openSlug ? visible.findIndex((p) => p.slug === openSlug) : -1;
  const counts = Object.fromEntries(
    categories.map((c) => [c.key, projects.filter((p) => p.category === c.key).length]),
  );

  // floating preview that follows the pointer over the list (desktop only)
  useEffect(() => {
    const list = listRef.current;
    const card = preview.current;
    if (!list || !card || !hasFinePointer()) return;
    const xTo = gsap.quickTo(card, "x", { duration: 0.7, ease: "power3" });
    const yTo = gsap.quickTo(card, "y", { duration: 0.7, ease: "power3" });
    const rotTo = gsap.quickTo(card, "rotation", { duration: 0.9, ease: "power3" });
    let lastX = 0;

    const move = (event: PointerEvent) => {
      xTo(event.clientX - card.offsetWidth / 2);
      yTo(event.clientY - card.offsetHeight / 2);
      rotTo(gsap.utils.clamp(-8, 8, (event.clientX - lastX) * 0.6));
      lastX = event.clientX;
    };
    const enter = (event: PointerEvent) => {
      gsap.set(card, { x: event.clientX - card.offsetWidth / 2, y: event.clientY - card.offsetHeight / 2 });
      lastX = event.clientX;
      gsap.to(card, { scale: 1, autoAlpha: 1, duration: 0.6, ease: "expo.out" });
    };
    const leave = () => gsap.to(card, { scale: 0.6, autoAlpha: 0, duration: 0.45, ease: "expo.out" });

    gsap.set(card, { scale: 0.6, autoAlpha: 0 });
    list.addEventListener("pointermove", move);
    list.addEventListener("pointerenter", enter);
    list.addEventListener("pointerleave", leave);
    return () => {
      list.removeEventListener("pointermove", move);
      list.removeEventListener("pointerenter", enter);
      list.removeEventListener("pointerleave", leave);
    };
  }, []);

  // animate the list whenever the filter changes
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    ScrollTrigger.refresh();
    if (prefersReducedMotion()) return;
    const rows = document.querySelectorAll("#work [data-project-row]");
    gsap.fromTo(rows, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: "expo.out", stagger: 0.05 });
  }, [filter]);

  const showPreview = (slug: string) => {
    const index = projects.findIndex((p) => p.slug === slug);
    if (reel.current)
      gsap.to(reel.current, { yPercent: (-100 * index) / projects.length, duration: 0.8, ease: "expo.out" });
  };

  return (
    <section id="work" aria-labelledby="work-title" className="gutter py-24 md:py-36">
      <Reveal>
        <SectionHeading
          id="work-title"
          index="02"
          label={t.work.label}
          figure={t.work.figure}
          title={t.work.title}
          count={projects.length}
        />
        <div className="mt-10 grid grid-cols-12 gap-5 md:mt-14">
          <p data-reveal className="col-span-12 max-w-[46ch] text-lg text-muted md:col-span-6">
            {t.work.intro}
          </p>
          <div data-reveal className="col-span-12 flex flex-wrap items-end gap-2 md:col-span-6 md:justify-end">
            {[
              { key: "all" as Filter, label: t.work.all, count: projects.length },
              ...categories.map((c) => ({ key: c.key as Filter, label: c.label, count: counts[c.key] })),
            ].map((option) => (
              <button
                key={option.key}
                type="button"
                aria-pressed={filter === option.key}
                onClick={() => setFilter(option.key)}
                className="flex h-9 items-center gap-1.5 rounded-full border border-line-strong px-3.5 label text-muted transition-colors hover:border-fg hover:text-fg aria-pressed:border-fg aria-pressed:bg-fg aria-pressed:text-bg"
              >
                {option.label}
                <sup className="text-[0.625rem]">{option.count}</sup>
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal>
        {/* desktop: list with floating preview */}
        <ul ref={listRef} className="group/list mt-14 hidden border-b border-line md:block">
          {visible.map((project) => (
            <li
              key={project.slug}
              data-project-row
              data-reveal
              className="border-t border-line transition-opacity duration-500 group-hover/list:opacity-35 hover:opacity-100!"
            >
              <button
                type="button"
                onClick={() => setOpenSlug(project.slug)}
                onPointerEnter={() => showPreview(project.slug)}
                onFocus={() => showPreview(project.slug)}
                data-cursor-label={t.work.open}
                className="group grid w-full grid-cols-12 items-center gap-5 py-7 text-left"
              >
                <span className="col-span-1 self-center label text-muted tabular">
                  {String(projects.indexOf(project) + 1).padStart(2, "0")}
                </span>
                <span className="col-span-6 display text-[clamp(2.125rem,4.1vw,4.5rem)] whitespace-nowrap transition-transform duration-700 ease-expo group-hover:translate-x-3">
                  {project.title}
                </span>
                <span className="col-span-4 self-center">
                  <span className="block max-w-[36ch] text-[0.9375rem] leading-snug text-muted">{project.summary}</span>
                  <span className="mt-2 block label text-faint">{project.categoryLabel}</span>
                </span>
                <span className="col-span-1 flex items-center justify-end gap-2 self-center label tabular">
                  {project.year}
                  <ArrowRight className="size-3 -translate-x-1 opacity-0 transition-all duration-500 ease-expo group-hover:translate-x-0 group-hover:opacity-100" />
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div
          ref={preview}
          aria-hidden
          className="pointer-events-none invisible fixed top-0 left-0 z-30 hidden aspect-[16/10] w-[min(30vw,26rem)] overflow-hidden border border-line-strong bg-elevated opacity-0 shadow-2xl shadow-black/30 md:block"
        >
          <div ref={reel} className="flex flex-col" style={{ height: `${projects.length * 100}%` }}>
            {projects.map((project) => (
              <div key={project.slug} className="w-full" style={{ height: `${100 / projects.length}%` }}>
                {covers[project.slug]}
              </div>
            ))}
          </div>
        </div>

        {/* mobile: cards */}
        <ul className="mt-12 grid gap-12 md:hidden">
          {visible.map((project) => (
            <li key={project.slug} data-project-row data-reveal>
              <button type="button" onClick={() => setOpenSlug(project.slug)} className="block w-full text-left">
                <div className="aspect-[16/10] overflow-hidden border border-line">{covers[project.slug]}</div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <span className="display text-[2.25rem]">{project.title}</span>
                  <span className="label text-muted tabular">{project.year}</span>
                </div>
                <p className="mt-2 text-muted">{project.summary}</p>
                <p className="mt-3 flex items-center gap-2 label text-accent">
                  {project.categoryLabel} <ArrowRight className="size-3" />
                </p>
              </button>
            </li>
          ))}
        </ul>
      </Reveal>

      {openSlug && openIndex >= 0 && (
        <ProjectDrawer
          key="drawer"
          project={visible[openIndex]}
          cover={covers[visible[openIndex].slug]}
          index={openIndex}
          total={visible.length}
          onNavigate={(direction) =>
            setOpenSlug(visible[(openIndex + direction + visible.length) % visible.length].slug)
          }
          onClose={() => setOpenSlug(null)}
          nextTitle={visible[(openIndex + 1) % visible.length].title}
        />
      )}
    </section>
  );
}
