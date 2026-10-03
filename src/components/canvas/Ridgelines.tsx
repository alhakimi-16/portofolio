"use client";

import { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";
import { gsap } from "@/lib/gsap";
import { onIntroReady } from "@/lib/intro";
import { mulberry32 } from "@/lib/random";
import { observeTheme } from "@/lib/theme";
import { clamp, cssVar, hasFinePointer, prefersReducedMotion } from "@/lib/utils";

export const RIDGE_SERIES = 44;

/**
 * "Signal from noise" — a ridgeline plot in the spirit of the famous pulsar chart.
 * Each line is a noisy series; the pointer injects signal (faster movement = more energy),
 * clicks send a pulse rippling through the plot, and a crosshair reads out values like a chart.
 */
export function Ridgelines({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const noise = createNoise3D(mulberry32(1967));
    const reduced = prefersReducedMotion();
    const fine = hasFinePointer();
    const lines = RIDGE_SERIES;

    let width = 0;
    let height = 0;
    let step = 4;
    let count = 0;
    let envelope = new Float32Array(0);
    let jitter = new Float32Array(0);
    let ys = new Float32Array(0);
    let colors = readColors();
    let raf = 0;
    let visible = true;
    let last = 0;
    let time = 0;

    const intro = { value: reduced ? 1 : 0 };
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, inside: false, presence: 0, energy: 0, lastX: 0, lastY: 0, lastT: 0 };
    const pulses: { x: number; y: number; start: number }[] = [];

    function readColors() {
      return {
        bg: cssVar("--bg") || "#0b0b0a",
        fg: cssVar("--fg") || "#eceae4",
        muted: cssVar("--muted") || "#9b988f",
        line: cssVar("--line-strong") || "rgba(236,234,228,.26)",
        accent: cssVar("--accent") || "#ff5b1f",
        font: cssVar("--font-jetbrains") || "ui-monospace, monospace",
      };
    }

    function resize() {
      if (!wrap || !canvas || !ctx) return;
      const rect = wrap.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      step = width < 640 ? 4 : 5;
      count = Math.ceil(width / step) + 1;
      ys = new Float32Array(count);
      envelope = new Float32Array(count);
      const rand = mulberry32(42);
      jitter = new Float32Array(count * lines);
      for (let i = 0; i < jitter.length; i++) jitter[i] = rand() - 0.5;
      for (let j = 0; j < count; j++) {
        const nx = Math.min(j * step, width) / width;
        // peaks concentrate in the middle of the plot, edges stay calm
        envelope[j] = Math.exp(-Math.pow(Math.abs(nx - 0.5) / 0.23, 3));
      }
      if (!pointer.lastT && !pointer.inside) {
        pointer.x = pointer.tx = width * 0.5;
        pointer.y = pointer.ty = height * (0.55 + 0.25 * Math.sin(1.3));
      }
      if (!raf) draw(performance.now());
    }

    function draw(now: number) {
      if (!ctx) return;
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, width, height);

      const top = height * 0.2;
      const bottom = height - 6;
      const gap = (bottom - top) / (lines - 1);
      const amp = gap * 10;
      const k = intro.value;
      const { x: px, y: py, presence, energy } = pointer;
      const bumpWidth = width * (0.04 + energy * 0.03) + 24;
      const highlight = presence > 0.35 ? Math.round(clamp((py - top) / gap, 0, lines - 1)) : -1;
      let highlightY = py;
      let highlightValue = 0;

      for (let i = 0; i < lines; i++) {
        const y0 = top + i * gap;
        const li = i / (lines - 1);
        const row = i * count;
        const dy = (y0 - py) / (gap * 6);
        const bumpRow = presence * Math.exp(-dy * dy) * amp * (0.32 + energy * 0.95) * k;

        for (let j = 0; j < count; j++) {
          const x = Math.min(j * step, width);
          const nx = x / width;
          let v = 0;

          const env = envelope[j];
          if (env > 0.004) {
            const broad = noise(nx * 2.6, li * 3.3, time * 0.085);
            const detail = noise(nx * 10 + 31, li * 9.1, time * 0.21) * 0.32;
            const peak = broad + detail + 0.22;
            if (peak > 0) v += env * peak * peak * amp * 0.72 * k;
          }

          if (bumpRow > 0.05) {
            const dx = (x - px) / bumpWidth;
            if (dx > -3 && dx < 3) {
              const wobble = 0.75 + 0.25 * noise(nx * 24, li * 6, time * 1.4);
              v += Math.exp(-dx * dx) * bumpRow * wobble;
            }
          }

          for (let p = 0; p < pulses.length; p++) {
            const pulse = pulses[p];
            const age = now - pulse.start;
            const ring = (Math.hypot(x - pulse.x, (y0 - pulse.y) * 1.8) - age * 0.6) / 42;
            const fade = 1 - age / 2400;
            if (fade > 0) v += Math.exp(-ring * ring) * amp * 0.5 * fade * fade * k;
          }

          ys[j] = y0 - v + jitter[row + j] * gap * 0.16;
        }

        // occlude the lines behind, then stroke this one
        ctx.beginPath();
        ctx.moveTo(0, ys[0]);
        for (let j = 1; j < count; j++) ctx.lineTo(Math.min(j * step, width), ys[j]);
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fillStyle = colors.bg;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(0, ys[0]);
        for (let j = 1; j < count; j++) ctx.lineTo(Math.min(j * step, width), ys[j]);
        if (i === highlight) {
          ctx.strokeStyle = colors.accent;
          ctx.lineWidth = 1.6;
          ctx.globalAlpha = 1;
          const j = clamp(Math.round(px / step), 0, count - 1);
          highlightY = ys[j];
          highlightValue = (y0 - ys[j]) / amp;
        } else {
          ctx.strokeStyle = colors.fg;
          ctx.lineWidth = 1.05;
          ctx.globalAlpha = 0.86;
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      if (fine && presence > 0.05 && pointer.inside) drawCrosshair(px, py, highlight, highlightY, highlightValue);
    }

    function drawCrosshair(px: number, py: number, series: number, sy: number, value: number) {
      if (!ctx) return;
      ctx.save();
      ctx.globalAlpha = Math.min(1, pointer.presence * 1.2);
      ctx.strokeStyle = colors.line;
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.moveTo(px + 0.5, 0);
      ctx.lineTo(px + 0.5, height);
      ctx.moveTo(0, py + 0.5);
      ctx.lineTo(width, py + 0.5);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.font = `10px ${colors.font}`;
      ctx.fillStyle = colors.muted;
      ctx.textBaseline = "alphabetic";
      ctx.fillText(`x ${(px / width).toFixed(3)}`, Math.min(px + 8, width - 64), height - 10);
      ctx.fillText(`y ${(1 - py / height).toFixed(3)}`, 8, Math.max(py - 8, 14));

      if (series >= 0) {
        ctx.fillStyle = colors.accent;
        ctx.beginPath();
        ctx.arc(px, sy, 3.5, 0, Math.PI * 2);
        ctx.fill();
        const label = `s${String(series + 1).padStart(2, "0")} · ${Math.max(0, value).toFixed(2)}`;
        const tx = px + 12 + ctx.measureText(label).width > width ? px - 12 - ctx.measureText(label).width : px + 12;
        ctx.fillText(label, tx, Math.max(sy - 10, 14));
      }
      ctx.restore();
    }

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016;
      last = now;
      time += dt;

      // without a real pointer a "ghost" wanders around, hinting that the plot is alive
      if (!pointer.inside) {
        pointer.tx = width * (0.5 + 0.3 * Math.sin(time * 0.31));
        pointer.ty = height * (0.55 + 0.25 * Math.sin(time * 0.47 + 1.3));
      }
      const follow = pointer.inside ? 0.22 : 0.04;
      pointer.x += (pointer.tx - pointer.x) * follow;
      pointer.y += (pointer.ty - pointer.y) * follow;
      pointer.presence += ((pointer.inside ? 1 : 0.55) - pointer.presence) * 0.06;
      pointer.energy *= 0.94;

      while (pulses.length && now - pulses[0].start > 2400) pulses.shift();
      draw(now);
    }

    function start() {
      if (reduced || raf || !visible || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    }

    function stop() {
      cancelAnimationFrame(raf);
      raf = 0;
    }

    const local = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const onMove = (event: PointerEvent) => {
      const { x, y } = local(event);
      const now = performance.now();
      if (pointer.inside && pointer.lastT) {
        const speed = Math.hypot(x - pointer.lastX, y - pointer.lastY) / Math.max(8, now - pointer.lastT);
        pointer.energy = Math.min(1, pointer.energy + speed * 0.09);
      } else {
        pointer.x = x;
        pointer.y = y;
      }
      pointer.inside = true;
      pointer.tx = x;
      pointer.ty = y;
      pointer.lastX = x;
      pointer.lastY = y;
      pointer.lastT = now;
    };

    const onLeave = () => {
      pointer.inside = false;
      pointer.lastT = 0;
    };

    const onDown = (event: PointerEvent) => {
      const { x, y } = local(event);
      pulses.push({ x, y, start: performance.now() });
      if (pulses.length > 6) pulses.shift();
      if (reduced) draw(performance.now());
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(wrap);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    const unobserveTheme = observeTheme(() => {
      colors = readColors();
      if (!raf) draw(performance.now());
    });

    if (fine) {
      wrap.addEventListener("pointermove", onMove);
      wrap.addEventListener("pointerleave", onLeave);
    }
    wrap.addEventListener("pointerdown", onDown);

    const offIntro = onIntroReady(() => {
      if (!reduced) gsap.to(intro, { value: 1, duration: 3.2, ease: "expo.out", delay: 0.15 });
    });

    start();

    return () => {
      stop();
      offIntro();
      gsap.killTweensOf(intro);
      resizeObserver.disconnect();
      io.disconnect();
      unobserveTheme();
      document.removeEventListener("visibilitychange", onVisibility);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      wrap.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <div ref={wrapRef} className={className} data-cursor="crosshair">
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 block size-full touch-pan-y" />
    </div>
  );
}
