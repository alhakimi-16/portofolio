import type { Locale } from "./config";

/**
 * Interface strings (navigation, headings, buttons).
 * The personal content lives in `src/content/profile.ts`.
 */
const en = {
  meta: {
    title: "Mugahed Al-Hakimi · Business Informatics Student",
    description:
      "Mugahed Al-Hakimi, Business Informatics student at HAW Hamburg, looking for a working student position.",
  },
  nav: {
    about: "About",
    path: "My path",
    experience: "Experience",
    skills: "Skills",
    contact: "Contact",
  },
  hero: {
    iam: "I'm",
    cta: "Get in touch",
    path: "See my path",
  },
  sections: {
    about: { eyebrow: "About me", title: "A quick *hello*" },
    path: { eyebrow: "My path", title: "From Malaysia to *Hamburg*" },
    experience: { eyebrow: "Experience", title: "Where I *work*" },
    skills: { eyebrow: "Skills", title: "What I *bring*" },
    languages: { eyebrow: "Languages", title: "Four ways to say *hello*" },
    awards: { eyebrow: "Certificates & awards", title: "Things I'm *proud of*" },
    contact: { eyebrow: "Contact", title: "Let's *talk*" },
  },
  skills: {
    technical: "Technical",
    personal: "Personal",
  },
  experience: {
    scan: "ID check",
    verified: "Verified",
  },
  contact: {
    text: "I'm looking for a working student position. The easiest way to reach me is by email.",
    copy: "Copy email",
    copied: "Copied!",
    linkedin: "LinkedIn",
    write: "Write an email",
  },
  header: {
    sections: "Sections",
    skip: "Skip to content",
    language: "Change language",
    theme: "Switch light / dark mode",
    top: "Back to top",
    menu: "Menu",
  },
  footer: {
    built: "Built with Next.js",
  },
  notFound: {
    title: "Page not found",
    text: "This page doesn't exist.",
    back: "Back to the homepage",
  },
};

export type Dictionary = typeof en;

const de: Dictionary = {
  meta: {
    title: "Mugahed Al-Hakimi · Student der Wirtschaftsinformatik",
    description:
      "Mugahed Al-Hakimi, Student der Wirtschaftsinformatik an der HAW Hamburg, sucht eine Werkstudentenstelle.",
  },
  nav: {
    about: "Über mich",
    path: "Mein Weg",
    experience: "Erfahrung",
    skills: "Kenntnisse",
    contact: "Kontakt",
  },
  hero: {
    iam: "Ich bin",
    cta: "Kontakt aufnehmen",
    path: "Mein Weg",
  },
  sections: {
    about: { eyebrow: "Über mich", title: "Kurz *vorgestellt*" },
    path: { eyebrow: "Mein Weg", title: "Von Malaysia nach *Hamburg*" },
    experience: { eyebrow: "Berufserfahrung", title: "Wo ich *arbeite*" },
    skills: { eyebrow: "Kenntnisse", title: "Was ich *mitbringe*" },
    languages: { eyebrow: "Sprachen", title: "Vier Arten, *Hallo* zu sagen" },
    awards: { eyebrow: "Auszeichnungen & Zertifikate", title: "Worauf ich *stolz* bin" },
    contact: { eyebrow: "Kontakt", title: "Lassen Sie uns *sprechen*" },
  },
  skills: {
    technical: "Fachlich",
    personal: "Persönlich",
  },
  experience: {
    scan: "Ausweisprüfung",
    verified: "Geprüft",
  },
  contact: {
    text: "Ich suche eine Werkstudentenstelle. Am einfachsten erreichen Sie mich per E-Mail.",
    copy: "E-Mail kopieren",
    copied: "Kopiert!",
    linkedin: "LinkedIn",
    write: "E-Mail schreiben",
  },
  header: {
    sections: "Abschnitte",
    skip: "Zum Inhalt springen",
    language: "Sprache wechseln",
    theme: "Hell / Dunkel umschalten",
    top: "Nach oben",
    menu: "Menü",
  },
  footer: {
    built: "Erstellt mit Next.js",
  },
  notFound: {
    title: "Seite nicht gefunden",
    text: "Diese Seite existiert nicht.",
    back: "Zur Startseite",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, de };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
