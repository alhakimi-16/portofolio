import { Archivo, Source_Serif_4 } from "next/font/google";

// Fonts are downloaded at build time and served from this site,
// so visitors' browsers never contact Google (GDPR-friendly).
// Archivo is a variable font with a width axis: stretched wide and uppercase, it is the display face.
export const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

// Source Serif 4 carries the reading text; its italic marks emphasis.
export const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
});

export const fontVariables = `${archivo.variable} ${sourceSerif.variable}`;
