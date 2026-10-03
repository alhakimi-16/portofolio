"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { hasFinePointer, prefersReducedMotion } from "@/lib/utils";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, summary";

/**
 * Custom cursor for mouse users: a dot plus a trailing ring.
 *  • [data-cursor-label="Open"] → ring grows into an accent disc with a label
 *  • [data-cursor="crosshair"]  → only the dot (the hero canvas draws its own crosshair)
 */
export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || !dot.current || !ring.current || !hasFinePointer() || prefersReducedMotion()) return;
    const html = document.documentElement;
    html.dataset.cursor = "on";

    const dotX = gsap.quickSetter(dot.current, "x", "px");
    const dotY = gsap.quickSetter(dot.current, "y", "px");
    const ringX = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
      el.dataset.visible = "true";
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const labelled = target?.closest<HTMLElement>("[data-cursor-label]");
      const mode = target?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor;
      if (labelled) {
        el.dataset.state = "label";
        if (label.current) label.current.textContent = labelled.dataset.cursorLabel ?? "";
      } else if (mode === "crosshair") {
        el.dataset.state = "crosshair";
      } else if (mode === "hover" || target?.closest(INTERACTIVE)) {
        el.dataset.state = "hover";
      } else {
        el.dataset.state = "default";
      }
    };

    const onDown = () => (el.dataset.pressed = "true");
    const onUp = () => (el.dataset.pressed = "false");
    const onLeave = () => (el.dataset.visible = "false");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    html.addEventListener("mouseleave", onLeave);

    return () => {
      delete html.dataset.cursor;
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      html.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={root} className="cursor" data-state="default" data-visible="false" aria-hidden>
      <div ref={ring} className="cursor-ring">
        <div className="cursor-circle" />
        <span ref={label} className="cursor-label" />
      </div>
      <div ref={dot} className="cursor-dot" />
    </div>
  );
}
