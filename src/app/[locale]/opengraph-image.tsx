import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getContent } from "@/content";
import { hasLocale, locales } from "@/i18n/config";

// The preview card shown when the link is shared on LinkedIn, WhatsApp, Slack, …
export const alt = "Mugahed Al-Hakimi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered once per language at build time.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const font = (file: string) => readFile(join(process.cwd(), "node_modules/@fontsource", file));

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { person } = getContent(hasLocale(locale) ? locale : "en");
  const [serif, sans, sansMedium] = await Promise.all([
    font("newsreader/files/newsreader-latin-500-normal.woff"),
    font("geist-sans/files/geist-sans-latin-400-normal.woff"),
    font("geist-sans/files/geist-sans-latin-500-normal.woff"),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 96px",
        background: "#ffffff",
        borderLeft: "24px solid #23407a",
        fontFamily: "Geist",
        color: "#141a26",
      }}
    >
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#eef1f7",
          color: "#23407a",
          fontFamily: "Newsreader",
          fontSize: 44,
        }}
      >
        {person.initials}
      </div>
      <div style={{ marginTop: 44, fontFamily: "Newsreader", fontSize: 92, lineHeight: 1, letterSpacing: -1 }}>
        {person.name}
      </div>
      <div style={{ marginTop: 26, fontSize: 34, fontWeight: 500 }}>{`${person.headline} · ${person.school}`}</div>
      <div style={{ marginTop: 14, fontSize: 26, color: "#586172" }}>{person.availability}</div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Newsreader", data: serif, weight: 500, style: "normal" },
        { name: "Geist", data: sans, weight: 400, style: "normal" },
        { name: "Geist", data: sansMedium, weight: 500, style: "normal" },
      ],
    },
  );
}
