import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getContent } from "@/content";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/ui";

// The preview card shown when the link is shared on LinkedIn, WhatsApp, Slack, …
export const alt = "Mugahed Al-Hakimi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered once per language at build time.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const font = (file: string) => readFile(join(process.cwd(), "node_modules/@fontsource", file));

// light theme colours from globals.css
const c = {
  paper: "#fcfcfe",
  ink: "#16152b",
  muted: "#5d5c74",
  rule: "#dedde8",
  blue: "#3a5bf7",
  blueInk: "#2643c4",
  violet: "#a78bfa",
  violetInk: "#7353e0",
  sun: "#f9c22e",
  mint: "#86d8b1",
  mark: "rgba(249, 194, 46, 0.55)",
};

const label = { fontFamily: "Archivo Semi", fontSize: 20, letterSpacing: 2.8, textTransform: "uppercase" } as const;

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = hasLocale(locale) ? locale : "en";
  const content = getContent(lang);
  const { person } = content;
  const t = getDictionary(lang);
  const greeting = content.greetings.find((word) => word.lang === lang) ?? content.greetings[0];
  const [display, semi, light, lightItalic] = await Promise.all([
    font("archivo/files/archivo-latin-800-normal.woff"),
    font("archivo/files/archivo-latin-600-normal.woff"),
    font("archivo/files/archivo-latin-300-normal.woff"),
    font("archivo/files/archivo-latin-300-italic.woff"),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "56px 64px",
        background: c.paper,
        color: c.ink,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", ...label }}>
        <span style={{ color: c.muted }}>{t.hero.portfolio}</span>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: 14, height: 14, borderRadius: 14, background: c.mint, marginRight: 14 }} />
          {person.availability}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 44,
          fontFamily: "Archivo Light Italic",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: 44,
          lineHeight: 1,
        }}
      >
        <span style={{ color: c.violetInk }}>{`${greeting?.text ?? "Hello"}!`}</span>
        <span style={{ color: c.muted, marginLeft: 14 }}>{t.hero.iam}</span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 18,
          fontFamily: "Archivo",
          fontSize: 148,
          lineHeight: 0.9,
          letterSpacing: -3,
          textTransform: "uppercase",
        }}
      >
        <span>{person.firstName}</span>
        <span style={{ letterSpacing: -2.4 }}>{person.lastName}</span>
      </div>

      <div style={{ display: "flex", height: 2, background: c.ink, marginTop: 30 }} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 26,
          fontFamily: "Archivo Light",
          fontWeight: 300,
          fontSize: 36,
        }}
      >
        <div style={{ display: "flex" }}>
          <span
            style={{
              backgroundImage: `linear-gradient(transparent 58%, ${c.mark} 58%, ${c.mark} 94%, transparent 94%)`,
            }}
          >
            {person.headline}
          </span>
          <span style={{ color: c.muted, marginLeft: 14 }}>{`· ${person.school}`}</span>
        </div>
        <div style={{ display: "flex" }}>
          {[c.blue, c.sun, c.violet, c.mint].map((colour) => (
            <div key={colour} style={{ width: 18, height: 18, background: colour, marginLeft: 10 }} />
          ))}
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Archivo", data: display, weight: 800, style: "normal" },
        { name: "Archivo Semi", data: semi, weight: 600, style: "normal" },
        { name: "Archivo Light", data: light, weight: 300, style: "normal" },
        { name: "Archivo Light Italic", data: lightItalic, weight: 300, style: "italic" },
      ],
    },
  );
}
