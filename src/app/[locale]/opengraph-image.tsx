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

const colors = { blue: "#3a5bf7", mint: "#12b386", sun: "#f7a823", coral: "#f2545b" };
const inks = { blue: "#2643c4", mint: "#0a7656", sun: "#925c00", coral: "#c0363e" };
const tints = { blue: "#e3e8fd", mint: "#dcf3ec", sun: "#fdf0d9", coral: "#fde3e4" };

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { person, stickers } = getContent(hasLocale(locale) ? locale : "en");
  const [display, sans, sansSemi] = await Promise.all([
    font("bricolage-grotesque/files/bricolage-grotesque-latin-800-normal.woff"),
    font("geist-sans/files/geist-sans-latin-500-normal.woff"),
    font("geist-sans/files/geist-sans-latin-600-normal.woff"),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 88px",
        background: "#f6f7fb",
        fontFamily: "Geist",
        color: "#121a33",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 700 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignSelf: "flex-start",
            gap: 12,
            padding: "10px 22px 10px 18px",
            borderRadius: 999,
            background: "#ffffff",
            border: "2px solid #e2e6f0",
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          <div style={{ width: 14, height: 14, borderRadius: 14, background: colors.mint }} />
          {person.availability}
        </div>
        <div
          style={{
            marginTop: 34,
            fontFamily: "Bricolage",
            fontSize: 96,
            lineHeight: 0.98,
            letterSpacing: -3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>{person.firstName}</span>
          <span style={{ color: inks.blue }}>{person.lastName}</span>
        </div>
        <div style={{ marginTop: 30, display: "flex", flexDirection: "column", fontSize: 34, color: "#3b4460" }}>
          <span style={{ fontWeight: 500 }}>{person.headline}</span>
          <span style={{ marginTop: 4, fontWeight: 600, color: "#121a33" }}>{person.school}</span>
        </div>
      </div>

      <div style={{ position: "relative", width: 340, height: 340, display: "flex" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 340,
            height: 340,
            borderRadius: 340,
            display: "flex",
            backgroundImage: `linear-gradient(135deg, ${colors.blue}, ${colors.mint} 35%, ${colors.sun} 65%, ${colors.coral})`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            width: 308,
            height: 308,
            borderRadius: 308,
            background: "#121a33",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Bricolage",
            fontSize: 120,
            letterSpacing: -4,
          }}
        >
          {person.initials}
        </div>
        {stickers.slice(0, 3).map((sticker, i) => {
          const spots = [
            { top: 6, left: -46, rotate: -8 },
            { top: 150, right: -54, rotate: 6 },
            { bottom: 0, left: -10, rotate: 5 },
          ];
          const { rotate, ...spot } = spots[i];
          return (
            <div
              key={sticker.text}
              style={{
                position: "absolute",
                ...spot,
                display: "flex",
                padding: "8px 18px",
                borderRadius: 999,
                border: `3px solid ${colors[sticker.hue]}`,
                background: tints[sticker.hue],
                color: inks[sticker.hue],
                boxShadow: `4px 4px 0 ${colors[sticker.hue]}`,
                fontFamily: "Bricolage",
                fontSize: 28,
                transform: `rotate(${rotate}deg)`,
              }}
            >
              {sticker.text}
            </div>
          );
        })}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: display, weight: 800, style: "normal" },
        { name: "Geist", data: sans, weight: 500, style: "normal" },
        { name: "Geist", data: sansSemi, weight: 600, style: "normal" },
      ],
    },
  );
}
