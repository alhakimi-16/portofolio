import { Archivo, Instrument_Serif, JetBrains_Mono } from "next/font/google";

// Fonts are downloaded at build time and served from this site,
// so visitors' browsers never contact Google (GDPR-friendly).
export const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const fontVariables = `${archivo.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`;
