import { Archivo } from "next/font/google";

// The fonts are downloaded at build time and served from this site,
// so visitors' browsers never contact Google (GDPR-friendly).
// One family for everything: Archivo is a variable font with weight and width axes, so the same
// face gives the wide uppercase headings, the light large text, the body text and its italics.
export const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  style: ["normal", "italic"],
  variable: "--font-archivo",
  display: "swap",
});

export const fontVariables = archivo.variable;
