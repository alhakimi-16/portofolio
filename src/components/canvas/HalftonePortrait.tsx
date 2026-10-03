"use client";

import { useEffect, useRef } from "react";
import { observeTheme } from "@/lib/theme";
import { cssVar, hasFinePointer, prefersReducedMotion } from "@/lib/utils";

/**
 * A portrait drawn as a grid of data points (halftone). Without a photo it renders
 * the initials. Points near the pointer are pushed away and light up in the accent colour.
 */
export function HalftonePortrait({ src, text, className }: { src?: string; text: string; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduced = prefersReducedMotion();
    const fine = hasFinePointer();
    let cancelled = false;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let cell = 0;
    let ink = new Float32Array(0); // 0–1 amount of "ink" per cell
    let offX = new Float32Array(0);
    let offY = new Float32Array(0);
    let heat = new Float32Array(0);
    let source: HTMLImageElement | null = null;
    let raf = 0;
    let visible = false;
    const pointer = { x: -9999, y: -9999, inside: false };
    let colors = { fg: "#eceae4", accent: "#ff5b1f", dark: true };

    const readColors = () => {
      colors = {
        fg: cssVar("--fg") || colors.fg,
        accent: cssVar("--accent") || colors.accent,
        dark: document.documentElement.dataset.theme !== "light",
      };
    };

    function sample() {
      if (!cols || !rows) return;
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;
      octx.fillStyle = "#000";
      octx.fillRect(0, 0, cols, rows);
      if (source) {
        // cover-fit the photo into the grid
        const scale = Math.max(cols / source.naturalWidth, rows / source.naturalHeight);
        const w = source.naturalWidth * scale;
        const h = source.naturalHeight * scale;
        octx.drawImage(source, (cols - w) / 2, (rows - h) / 2, w, h);
      } else {
        const family = cssVar("--font-archivo") || "sans-serif";
        octx.fillStyle = "#fff";
        octx.textAlign = "center";
        octx.textBaseline = "middle";
        octx.font = `800 ${Math.round(rows * 0.62)}px ${family}`;
        octx.fillText(text, cols / 2, rows * 0.54, cols * 0.92);
      }
      const data = octx.getImageData(0, 0, cols, rows).data;
      ink = new Float32Array(cols * rows);
      for (let i = 0; i < cols * rows; i++) {
        const lum = (data[i * 4] * 0.299 + data[i * 4 + 1] * 0.587 + data[i * 4 + 2] * 0.114) / 255;
        // a photo is shown as a positive: light dots on dark, dark dots on light
        ink[i] = source && !colors.dark ? 1 - lum : lum;
      }
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
      cell = width < 360 ? 8 : 10;
      cols = Math.floor(width / cell);
      rows = Math.floor(height / cell);
      offX = new Float32Array(cols * rows);
      offY = new Float32Array(cols * rows);
      heat = new Float32Array(cols * rows);
      sample();
      draw();
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      const ox = (width - cols * cell) / 2 + cell / 2;
      const oy = (height - rows * cell) / 2 + cell / 2;
      const maxR = cell * 0.5;
      ctx.fillStyle = colors.fg;
      ctx.beginPath();
      for (let i = 0; i < ink.length; i++) {
        const v = ink[i];
        if (v < 0.04 || heat[i] > 0.15) continue;
        const r = maxR * Math.pow(v, 0.75);
        const x = ox + (i % cols) * cell + offX[i];
        const y = oy + Math.floor(i / cols) * cell + offY[i];
        ctx.moveTo(x + r, y);
        ctx.arc(x, y, r, 0, Math.PI * 2);
      }
      ctx.fill();

      // points near the pointer: highlighted
      ctx.fillStyle = colors.accent;
      ctx.beginPath();
      for (let i = 0; i < ink.length; i++) {
        if (heat[i] <= 0.15) continue;
        const v = Math.max(ink[i], 0.18);
        const r = maxR * Math.pow(v, 0.75) * (1 + heat[i] * 0.25);
        const x = ox + (i % cols) * cell + offX[i];
        const y = oy + Math.floor(i / cols) * cell + offY[i];
        ctx.moveTo(x + r, y);
        ctx.arc(x, y, r, 0, Math.PI * 2);
      }
      ctx.fill();
    }

    function step() {
      raf = 0;
      const ox = (width - cols * cell) / 2 + cell / 2;
      const oy = (height - rows * cell) / 2 + cell / 2;
      const radius = Math.max(60, width * 0.22);
      let moving = false;
      for (let i = 0; i < ink.length; i++) {
        const bx = ox + (i % cols) * cell;
        const by = oy + Math.floor(i / cols) * cell;
        let tx = 0;
        let ty = 0;
        let th = 0;
        if (pointer.inside) {
          const dx = bx - pointer.x;
          const dy = by - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < radius) {
            const f = 1 - d / radius;
            const push = f * f * cell * 2.2;
            tx = (dx / (d || 1)) * push;
            ty = (dy / (d || 1)) * push;
            th = f;
          }
        }
        offX[i] += (tx - offX[i]) * 0.16;
        offY[i] += (ty - offY[i]) * 0.16;
        heat[i] += (th - heat[i]) * 0.12;
        if (Math.abs(tx - offX[i]) > 0.05 || Math.abs(ty - offY[i]) > 0.05 || Math.abs(th - heat[i]) > 0.01)
          moving = true;
      }
      draw();
      if ((moving || pointer.inside) && visible) raf = requestAnimationFrame(step);
    }

    const kick = () => {
      if (!raf && !reduced && visible) raf = requestAnimationFrame(step);
    };

    const onMove = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.inside = true;
      kick();
    };
    const onLeave = () => {
      pointer.inside = false;
      kick();
    };

    readColors();
    const ready = src
      ? new Promise<void>((resolve) => {
          const img = new Image();
          img.decoding = "async";
          img.onload = () => {
            source = img;
            resolve();
          };
          img.onerror = () => resolve();
          img.src = src;
        })
      : document.fonts.ready.then(() => undefined);

    const resizeObserver = new ResizeObserver(() => resize());
    void ready.then(() => {
      if (cancelled) return;
      resize();
      resizeObserver.observe(wrap);
    });

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    io.observe(wrap);

    const unobserveTheme = observeTheme(() => {
      readColors();
      sample();
      draw();
    });

    if (fine) {
      wrap.addEventListener("pointermove", onMove);
      wrap.addEventListener("pointerleave", onLeave);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      io.disconnect();
      unobserveTheme();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [src, text]);

  return (
    <div ref={wrapRef} className={className}>
      <canvas ref={canvasRef} aria-hidden className="block size-full" />
    </div>
  );
}
