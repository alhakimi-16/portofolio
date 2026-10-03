"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  forceCollide,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type ForceX,
  type ForceY,
  type Simulation,
  type SimulationNodeDatum,
} from "d3-force";
import { useI18n } from "@/components/providers/I18nProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SiteContent, SkillView } from "@/content";
import type { SkillGroup } from "@/content/types";
import { mulberry32 } from "@/lib/random";
import { clamp, hasFinePointer, prefersReducedMotion } from "@/lib/utils";

type Node = SimulationNodeDatum & SkillView & { r: number; base: number };

const CEFR = ["A1", "A2", "B1", "B2", "C1", "C2"];

export function Skills({
  skills,
  groups,
  languages,
}: {
  skills: SkillView[];
  groups: SiteContent["skillGroups"];
  languages: SiteContent["languages"];
}) {
  const { t } = useI18n();
  const [focusGroup, setFocusGroup] = useState<SkillGroup | null>(null);
  const [hovered, setHovered] = useState<SkillView | null>(null);
  const map = useRef<HTMLDivElement>(null);
  const nodeEls = useRef<(HTMLDivElement | null)[]>([]);
  const labelEls = useRef<Partial<Record<SkillGroup, HTMLSpanElement | null>>>({});
  const sim = useRef<Simulation<Node, undefined> | null>(null);
  const nodes = useRef<Node[]>([]);

  const byGroup = useMemo(
    () =>
      Object.fromEntries(groups.map((g) => [g.key, skills.filter((s) => s.group === g.key)])) as Record<
        SkillGroup,
        SkillView[]
      >,
    [groups, skills],
  );
  const activeGroup = hovered?.group ?? focusGroup;

  useEffect(() => {
    const el = map.current;
    if (!el) return;
    const reduced = prefersReducedMotion();
    const keys = groups.map((g) => g.key);
    let width = el.clientWidth;
    let height = el.clientHeight;

    const rand = mulberry32(11);
    const list: Node[] = skills.map((s) => ({
      ...s,
      base: 16 + s.level * 9,
      r: 0,
      x: rand() * width,
      y: rand() * height,
    }));
    nodes.current = list;

    const fit = () => {
      // scale bubbles so they cover ~40% of the plot, whatever its size
      const area = list.reduce((sum, n) => sum + Math.PI * n.base * n.base, 0);
      const scale = Math.min(1.1, Math.sqrt((width * height * 0.3) / area));
      list.forEach((n, i) => {
        n.r = n.base * scale;
        const node = nodeEls.current[i];
        if (node) {
          node.style.width = node.style.height = `${n.r * 2}px`;
          // fit the longest word inside the bubble (mono glyphs are ~0.62em wide)
          const longest = Math.max(...n.name.split(" ").map((word) => word.length));
          node.style.fontSize = `${clamp((n.r * 2 * 0.82) / (longest * 0.62), 7.5, Math.min(13.5, n.r * 0.32))}px`;
        }
      });
    };

    const centers = () => {
      const rx = width * (width < 640 ? 0.29 : 0.33);
      const ry = height * 0.3;
      return Object.fromEntries(
        keys.map((key, i) => {
          const angle = (i / keys.length) * Math.PI * 2 - Math.PI / 2;
          return [key, { x: width / 2 + Math.cos(angle) * rx, y: height / 2 + Math.sin(angle) * ry }];
        }),
      ) as Record<SkillGroup, { x: number; y: number }>;
    };
    let c = centers();

    const render = () => {
      list.forEach((n, i) => {
        n.x = clamp(n.x ?? 0, n.r, width - n.r);
        n.y = clamp(n.y ?? 0, n.r, height - n.r);
        const node = nodeEls.current[i];
        if (node) node.style.transform = `translate3d(${n.x - n.r}px, ${n.y - n.r}px, 0)`;
      });
      // group labels sit above clusters in the upper half and below those in the lower half
      for (const key of keys) {
        const label = labelEls.current[key];
        const members = list.filter((n) => n.group === key);
        if (!label || members.length === 0) continue;
        const cx = members.reduce((sum, n) => sum + (n.x ?? 0), 0) / members.length;
        const above = c[key].y < height / 2;
        const edge = above
          ? Math.min(...members.map((n) => (n.y ?? 0) - n.r))
          : Math.max(...members.map((n) => (n.y ?? 0) + n.r));
        const halfW = label.offsetWidth / 2 + 6;
        const halfH = label.offsetHeight / 2 + 4;
        const lx = clamp(cx, halfW, width - halfW);
        const ly = clamp(edge + (above ? -12 : 12), halfH, height - halfH);
        label.style.transform = `translate3d(${lx}px, ${ly}px, 0) translate(-50%, -50%)`;
      }
    };

    fit();
    const simulation = forceSimulation<Node>(list)
      .force("x", forceX<Node>((d) => c[d.group].x).strength(0.11))
      .force("y", forceY<Node>((d) => c[d.group].y).strength(0.13))
      .force(
        "collide",
        forceCollide<Node>((d) => d.r + 3)
          .strength(0.95)
          .iterations(2),
      )
      .force("charge", forceManyBody<Node>().strength(-5))
      .alphaDecay(0.016)
      .on("tick", render)
      .stop();
    sim.current = simulation;

    if (reduced) {
      simulation.tick(420);
      render();
      return () => simulation.stop();
    }

    render(); // scattered "noise" first…
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        simulation.alpha(1).restart(); // …then it organises itself into clusters
        io.disconnect();
      },
      { threshold: 0.3 },
    );
    io.observe(el);

    const ro = new ResizeObserver(() => {
      if (el.clientWidth === width && el.clientHeight === height) return;
      width = el.clientWidth;
      height = el.clientHeight;
      c = centers();
      fit();
      (simulation.force("x") as ForceX<Node>).x((d) => c[d.group].x);
      (simulation.force("y") as ForceY<Node>).y((d) => c[d.group].y);
      (simulation.force("collide") as ReturnType<typeof forceCollide<Node>>).radius((d) => d.r + 3);
      simulation.alpha(0.6).restart();
    });
    ro.observe(el);

    return () => {
      simulation.stop();
      io.disconnect();
      ro.disconnect();
    };
  }, [skills, groups]);

  const startDrag = (index: number) => (event: React.PointerEvent<HTMLDivElement>) => {
    const node = nodes.current[index];
    const simulation = sim.current;
    const el = map.current;
    if (!node || !simulation || !el) return;
    if (event.pointerType !== "mouse" || !hasFinePointer()) {
      setFocusGroup((g) => (g === node.group ? null : node.group));
      return;
    }
    const target = event.currentTarget;
    const rect = el.getBoundingClientRect();
    target.setPointerCapture(event.pointerId);
    node.fx = node.x;
    node.fy = node.y;
    simulation.alphaTarget(0.25).restart();

    const move = (e: PointerEvent) => {
      node.fx = clamp(e.clientX - rect.left, node.r, rect.width - node.r);
      node.fy = clamp(e.clientY - rect.top, node.r, rect.height - node.r);
    };
    const end = () => {
      node.fx = null;
      node.fy = null;
      simulation.alphaTarget(0);
      target.removeEventListener("pointermove", move);
      target.removeEventListener("pointerup", end);
      target.removeEventListener("pointercancel", end);
    };
    target.addEventListener("pointermove", move);
    target.addEventListener("pointerup", end);
    target.addEventListener("pointercancel", end);
  };

  return (
    <section id="skills" aria-labelledby="skills-title" className="gutter py-24 md:py-36">
      <Reveal>
        <SectionHeading
          id="skills-title"
          index="04"
          label={t.skills.label}
          figure={t.skills.figure}
          title={t.skills.title}
          count={skills.length}
        />
      </Reveal>

      <div className="mt-14 grid grid-cols-12 gap-x-5 gap-y-14 md:mt-20">
        <Reveal className="order-2 col-span-12 lg:order-1 lg:col-span-4">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {groups.map((group) => (
              <li
                key={group.key}
                data-reveal
                onPointerEnter={() => setFocusGroup(group.key)}
                onPointerLeave={() => setFocusGroup(null)}
              >
                <button
                  type="button"
                  aria-pressed={activeGroup === group.key}
                  onClick={() => setFocusGroup((g) => (g === group.key ? null : group.key))}
                  className="flex w-full items-center justify-between border-t border-line pt-3 text-left label transition-colors aria-pressed:border-accent aria-pressed:text-accent"
                >
                  <span>{group.label}</span>
                  <span className="text-muted tabular">{String(byGroup[group.key]?.length ?? 0).padStart(2, "0")}</span>
                </button>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                  {(byGroup[group.key] ?? []).map((skill, i, all) => (
                    <span
                      key={skill.name}
                      className={
                        hovered?.name === skill.name ? "text-accent" : skill.level >= 5 ? "text-fg" : undefined
                      }
                    >
                      {skill.name}
                      {i < all.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ul>

          <div data-reveal className="mt-14">
            <h3 className="border-t border-line pt-3 label text-muted">{t.skills.languages}</h3>
            <ul className="mt-5 grid gap-6">
              {languages.map((language) => (
                <li key={language.name}>
                  <div className="flex items-baseline justify-between">
                    <span>{language.name}</span>
                    <span className="label text-accent">{language.level}</span>
                  </div>
                  <div className="relative mt-2.5 h-1 bg-line" role="presentation">
                    <div className="h-full bg-fg" style={{ width: `${language.value * 100}%` }} />
                  </div>
                  <div aria-hidden className="mt-1.5 flex justify-between label text-[0.5625rem] text-faint">
                    {CEFR.map((level) => (
                      <span key={level}>{level}</span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="order-1 col-span-12 lg:order-2 lg:col-span-8">
          <figure data-reveal>
            <div
              ref={map}
              aria-hidden
              className="relative h-[30rem] overflow-hidden border border-line bg-[radial-gradient(var(--line)_1px,transparent_1px)] [background-size:22px_22px] select-none sm:h-[34rem] lg:h-[40rem]"
            >
              {groups.map((group) => (
                <span
                  key={group.key}
                  ref={(node) => {
                    labelEls.current[group.key] = node;
                  }}
                  className={`pointer-events-none absolute top-0 left-0 z-10 rounded-sm bg-bg/85 px-1.5 py-0.5 label whitespace-nowrap transition-colors duration-300 ${
                    activeGroup === group.key ? "text-accent" : "text-muted"
                  }`}
                >
                  {group.label}
                </span>
              ))}
              {skills.map((skill, i) => (
                <div
                  key={skill.name}
                  ref={(node) => {
                    nodeEls.current[i] = node;
                  }}
                  className="skill-node touch-manipulation"
                  data-level={skill.level}
                  data-dim={activeGroup !== null && activeGroup !== skill.group}
                  data-hot={hovered?.name === skill.name}
                  data-cursor="hover"
                  onPointerDown={startDrag(i)}
                  onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(skill)}
                  onPointerLeave={() => setHovered(null)}
                >
                  {skill.name}
                </div>
              ))}
              <span aria-hidden className="absolute top-2 left-2 size-2 border-t border-l border-line-strong" />
              <span aria-hidden className="absolute top-2 right-2 size-2 border-t border-r border-line-strong" />
              <span aria-hidden className="absolute bottom-2 left-2 size-2 border-b border-l border-line-strong" />
              <span aria-hidden className="absolute right-2 bottom-2 size-2 border-r border-b border-line-strong" />
            </div>
            <figcaption className="mt-3 flex flex-wrap justify-between gap-x-6 gap-y-1 label text-muted">
              <span>
                {hovered ? (
                  <span className="text-fg">
                    {hovered.name} — {t.skills.levels[hovered.level]}
                  </span>
                ) : (
                  <>
                    <span className="hidden [@media(hover:hover)]:inline">{t.skills.hint}</span>
                    <span className="[@media(hover:hover)]:hidden">{t.skills.hintTouch}</span>
                  </>
                )}
              </span>
              <span>{t.skills.caption}</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
