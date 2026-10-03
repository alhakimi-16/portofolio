import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { createNoise3D } from "simplex-noise";
import { getContent } from "@/content";
import { hasLocale, locales } from "@/i18n/config";
import { mulberry32 } from "@/lib/random";

// The preview card shown when the link is shared on LinkedIn, WhatsApp, Slack, …
export const alt = "Mugahed Al-Hakimi — Data & ML portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered once per language at build time (no runtime work on the server).
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

function ridgelines(width: number, height: number, lines: number) {
  const noise = createNoise3D(mulberry32(1967));
  const gap = height / (lines + 6);
  const amp = gap * 7;
  const paths: string[] = [];
  for (let i = 0; i < lines; i++) {
    const y0 = gap * 6 + i * gap;
    let d = "";
    for (let x = 0; x <= width; x += 8) {
      const nx = x / width;
      const env = Math.exp(-Math.pow(Math.abs(nx - 0.5) / 0.24, 3));
      const n = noise(nx * 2.6, (i / lines) * 3.3, 4.2) + noise(nx * 10 + 31, (i / lines) * 9.1, 2) * 0.32 + 0.22;
      const y = y0 - (n > 0 ? env * n * n * amp * 0.72 : 0);
      d += `${x === 0 ? "M" : "L"}${x},${y.toFixed(1)} `;
    }
    paths.push(d);
  }
  return paths;
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { person } = getContent(hasLocale(locale) ? locale : "en");
  const [display, mono] = await Promise.all([
    readFile(join(process.cwd(), "node_modules/@fontsource/archivo/files/archivo-latin-800-normal.woff")),
    readFile(join(process.cwd(), "node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff")),
  ]);

  const W = 1072;
  const H = 300;
  const paths = ridgelines(W, H, 26);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 64,
        background: "#0b0b0a",
        color: "#eceae4",
        fontFamily: "Archivo",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "JetBrains Mono",
          fontSize: 18,
          color: "#9b988f",
        }}
      >
        <span>FIG. 01 — SIGNAL FROM NOISE</span>
        <span>PORTFOLIO</span>
      </div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {paths.map((d, i) => (
          <g key={i}>
            <path d={`${d} L${W},${H} L0,${H} Z`} fill="#0b0b0a" />
            <path d={d} fill="none" stroke={i === 15 ? "#ff5b1f" : "#eceae4"} strokeWidth={i === 15 ? 2.4 : 1.4} />
          </g>
        ))}
      </svg>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 104, letterSpacing: -5, lineHeight: 0.9 }}>{person.name}</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 26,
            fontFamily: "JetBrains Mono",
            fontSize: 24,
            color: "#ff5b1f",
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 12, background: "#ff5b1f", marginRight: 14 }} />
          {person.role.toUpperCase()}
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Archivo", data: display, weight: 800, style: "normal" },
        { name: "JetBrains Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
