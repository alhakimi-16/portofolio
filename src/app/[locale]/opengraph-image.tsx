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
  paper: "#fcfdfb",
  grid: "#e1e5de",
  line: "#c8cec5",
  head: "#eef1ec",
  headInk: "#636b61",
  ink: "#121612",
  muted: "#535b52",
  sel: "#0f7b58",
  selInk: "#0b6347",
  fillGreen: "#d4efe0",
  inkGreen: "#0b5b41",
  inkYellow: "#6b5000",
};

const COLUMNS = "ABCDEFGHIJKL".split("");

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = hasLocale(locale) ? locale : "en";
  const { person } = getContent(lang);
  const t = getDictionary(lang);
  const [condensed, condensedSemi, mono] = await Promise.all([
    font("ibm-plex-sans-condensed/files/ibm-plex-sans-condensed-latin-700-normal.woff"),
    font("ibm-plex-sans-condensed/files/ibm-plex-sans-condensed-latin-600-normal.woff"),
    font("ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff"),
  ]);
  const formula = t.formulas.top;
  const [fn, ...rest] = formula.split("(");

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: c.paper }}>
      {/* formula bar */}
      <div
        style={{
          display: "flex",
          height: 64,
          borderBottom: `2px solid ${c.line}`,
          background: c.head,
          fontFamily: "Plex Mono",
          fontSize: 26,
          color: c.ink,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: 150,
            paddingLeft: 24,
            borderRight: `2px solid ${c.line}`,
            background: c.paper,
          }}
        >
          B2:G5
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: 64,
            justifyContent: "center",
            borderRight: `2px solid ${c.line}`,
            color: c.muted,
          }}
        >
          fx
        </div>
        <div style={{ display: "flex", alignItems: "center", paddingLeft: 24, background: c.paper, flex: 1 }}>
          <span style={{ color: c.selInk }}>{fn}</span>
          <span style={{ color: c.inkYellow }}>{`(${rest.join("(")}`}</span>
        </div>
      </div>
      {/* column letters */}
      <div style={{ display: "flex", height: 34, background: c.head, borderBottom: `2px solid ${c.line}` }}>
        {COLUMNS.map((letter) => (
          <div
            key={letter}
            style={{
              display: "flex",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRight: `1px solid ${c.line}`,
              fontFamily: "Plex Mono",
              fontSize: 18,
              color: letter >= "B" && letter <= "G" ? c.inkGreen : c.headInk,
              background: letter >= "B" && letter <= "G" ? c.fillGreen : c.head,
            }}
          >
            {letter}
          </div>
        ))}
      </div>
      {/* the sheet */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flex: 1,
          backgroundImage: `linear-gradient(to right, ${c.grid} 1px, transparent 1px), linear-gradient(to bottom, ${c.grid} 1px, transparent 1px)`,
          backgroundSize: "100px 52px",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 100,
            top: 52,
            width: 600,
            height: 416,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 40px",
            background: c.paper,
            border: `4px solid ${c.sel}`,
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Plex Condensed",
              fontSize: 108,
              lineHeight: 0.92,
              color: c.ink,
              flexDirection: "column",
            }}
          >
            <span>{person.firstName}</span>
            <span>{person.lastName}</span>
          </div>
          <div
            style={{ display: "flex", marginTop: 26, fontFamily: "Plex Condensed Semi", fontSize: 32, color: c.muted }}
          >
            {`${person.headline} · ${person.school}`}
          </div>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              marginTop: 22,
              padding: "6px 14px",
              background: c.fillGreen,
              color: c.inkGreen,
              fontFamily: "Plex Mono",
              fontSize: 20,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 12,
                background: c.sel,
                marginRight: 12,
                alignSelf: "center",
              }}
            />
            {person.availability}
          </div>
          <div
            style={{
              position: "absolute",
              right: -10,
              bottom: -10,
              width: 16,
              height: 16,
              background: c.sel,
              border: `3px solid ${c.paper}`,
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: 800,
            top: 104,
            width: 300,
            height: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `2px solid ${c.sel}`,
            backgroundColor: c.paper,
            fontFamily: "Plex Condensed",
            fontSize: 132,
            color: c.ink,
          }}
        >
          {person.initials}
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Plex Condensed", data: condensed, weight: 700, style: "normal" },
        { name: "Plex Condensed Semi", data: condensedSemi, weight: 600, style: "normal" },
        { name: "Plex Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
