"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import type { Role } from "@/content/types";
import { cn, prefersReducedMotion } from "@/lib/utils";

/** when a part starts drawing, in ms after the drawing begins */
const at = (ms: number) => ({ "--t": ms }) as CSSProperties;

const line = { fill: "none", strokeLinecap: "round", strokeLinejoin: "round", pathLength: 1 } as const;

/** the card / sheet outline, a rounded rectangle */
const frame = "M9 1h142a8 8 0 0 1 8 8v86a8 8 0 0 1-8 8H9a8 8 0 0 1-8-8V9a8 8 0 0 1 8-8z";

/** An ID card: drawn, scanned from top to bottom and back, then checked. */
function IdScan() {
  return (
    <>
      <path className="art-stroke fill-paper stroke-ink" d={frame} strokeWidth="1.5" pathLength={1} style={at(0)} />
      {/* portrait */}
      <path
        className="art-stroke stroke-ink"
        d="M17 16h34a3 3 0 0 1 3 3v44a3 3 0 0 1-3 3H17a3 3 0 0 1-3-3V19a3 3 0 0 1 3-3z"
        strokeWidth="1.25"
        {...line}
        style={at(250)}
      />
      <path
        className="art-stroke stroke-ink"
        d="M34 27a8 8 0 1 1 0 16a8 8 0 1 1 0-16z"
        strokeWidth="1.25"
        {...line}
        style={at(400)}
      />
      <path
        className="art-stroke stroke-ink"
        d="M21 66c0-9 6-14 13-14s13 5 13 14"
        strokeWidth="1.25"
        {...line}
        style={at(450)}
      />
      {/* name and details */}
      <path className="art-stroke stroke-ink" d="M66 22h54" strokeWidth="2.5" {...line} style={at(550)} />
      <path className="art-stroke stroke-muted" d="M66 34h74" strokeWidth="1.5" {...line} style={at(650)} />
      <path className="art-stroke stroke-muted" d="M66 44h46" strokeWidth="1.5" {...line} style={at(720)} />
      <path className="art-stroke stroke-muted" d="M66 54h60" strokeWidth="1.5" {...line} style={at(790)} />
      {/* the machine-readable zone at the bottom of a passport */}
      <path
        className="art-fade stroke-muted"
        d="M14 80h104M14 89h104"
        strokeWidth="1.5"
        strokeDasharray="5 2.5"
        fill="none"
        opacity="0.6"
        style={at(850)}
      />
      {/* scanner */}
      <g className="art-beam" style={at(1000)}>
        <path className="stroke-blue" d="M4 9h152" strokeWidth="7" opacity="0.14" />
        <path className="stroke-blue" d="M4 9h152" strokeWidth="1.5" />
      </g>
      {/* verified */}
      <g className="art-badge" style={at(2600)}>
        <circle className="fill-mint" cx="138" cy="82" r="11" />
        <path
          className="art-stroke stroke-ink"
          d="M132.5 82.5l3.8 3.8 7.2-7.6"
          strokeWidth="1.8"
          {...line}
          style={at(2900)}
        />
      </g>
    </>
  );
}

/** A financial report: the bars grow, the trend is drawn, the clock runs and the report is in on time. */
function Report() {
  const bars = [
    { x: 18, h: 22 },
    { x: 38, h: 32 },
    { x: 58, h: 27 },
    { x: 78, h: 44 },
  ];
  return (
    <>
      <path className="art-stroke fill-paper stroke-ink" d={frame} strokeWidth="1.5" pathLength={1} style={at(0)} />
      {/* title */}
      <path className="art-stroke stroke-ink" d="M14 18h46" strokeWidth="2.5" {...line} style={at(250)} />
      <path className="art-stroke stroke-muted" d="M14 27h30" strokeWidth="1.5" {...line} style={at(350)} />
      {/* chart */}
      <path className="art-stroke stroke-muted" d="M12 88h96" strokeWidth="1.25" {...line} style={at(400)} />
      {bars.map((bar, i) => (
        <rect
          key={bar.x}
          className={cn("art-bar stroke-ink", i === bars.length - 1 ? "fill-sun" : "fill-paper")}
          x={bar.x}
          y={88 - bar.h}
          width="13"
          height={bar.h}
          strokeWidth="1.25"
          style={at(600 + i * 140)}
        />
      ))}
      <path
        className="art-stroke stroke-blue"
        d="M24.5 60l20-10 20 5 20-17"
        strokeWidth="1.5"
        {...line}
        style={at(1250)}
      />
      {/* the deadline */}
      <path
        className="art-stroke stroke-ink"
        d="M134 23a13 13 0 1 1 0 26a13 13 0 1 1 0-26z"
        strokeWidth="1.25"
        {...line}
        style={at(500)}
      />
      <g className="art-fade" style={at(900)}>
        <path
          className="art-hand stroke-ink"
          d="M134 36v-8"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ ...at(1100), transformOrigin: "134px 36px" }}
        />
        <path className="stroke-ink" d="M134 36h5" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      {/* on time */}
      <g className="art-badge" style={at(2300)}>
        <circle className="fill-mint" cx="138" cy="82" r="11" />
        <path
          className="art-stroke stroke-ink"
          d="M132.5 82.5l3.8 3.8 7.2-7.6"
          strokeWidth="1.8"
          {...line}
          style={at(2600)}
        />
      </g>
    </>
  );
}

/**
 * The small line drawing next to a role. It draws itself when it scrolls into view and again
 * when the pointer moves onto the role; at rest (and with reduced motion) it is simply finished.
 */
export function RoleArt({ art, className }: { art: Role["art"]; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || prefersReducedMotion()) return;
    const play = () => {
      svg.removeAttribute("data-play");
      void svg.getBoundingClientRect(); // restarts the CSS animations
      svg.setAttribute("data-play", "");
    };
    const role = svg.closest("li");
    role?.addEventListener("pointerenter", play);

    // still below the screen: wait empty, then draw once it is well in view
    let observer: IntersectionObserver | undefined;
    if (svg.getBoundingClientRect().top >= window.innerHeight) {
      svg.setAttribute("data-armed", "");
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          observer?.disconnect();
          play();
        },
        { rootMargin: "0px 0px -20% 0px" },
      );
      observer.observe(svg);
    }
    return () => {
      role?.removeEventListener("pointerenter", play);
      observer?.disconnect();
      svg.removeAttribute("data-armed");
    };
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 160 104" aria-hidden className={cn("h-auto overflow-visible", className)}>
      {art === "id-scan" ? <IdScan /> : <Report />}
    </svg>
  );
}
