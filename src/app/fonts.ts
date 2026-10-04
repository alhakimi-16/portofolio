import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

// Fonts are downloaded at build time and served from this site,
// so visitors' browsers never contact Google (GDPR-friendly).
// Plex Sans is a variable font with a width axis: narrowed, it is the display face.
export const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-plex-sans",
  display: "swap",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const fontVariables = `${plexSans.variable} ${plexMono.variable}`;
