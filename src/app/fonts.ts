import { Bricolage_Grotesque, Geist } from "next/font/google";

// Fonts are downloaded at build time and served from this site,
// so visitors' browsers never contact Google (GDPR-friendly).
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const fontVariables = `${bricolage.variable} ${geist.variable}`;
