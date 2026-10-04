import { Geist, Newsreader } from "next/font/google";

// Fonts are downloaded at build time and served from this site,
// so visitors' browsers never contact Google (GDPR-friendly).
export const newsreader = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const fontVariables = `${newsreader.variable} ${geist.variable}`;
