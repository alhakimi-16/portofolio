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
    experience: "Experience",
    education: "Education",
    skills: "Skills",
    certificates: "Certificates",
    contact: "Contact",
  },
  sections: {
    about: "About",
    experience: "Experience",
    education: "Education",
    skills: "Skills & languages",
    certificates: "Certificates & awards",
    contact: "Contact",
  },
  skills: {
    technical: "Technical",
    personal: "Personal",
    languages: "Languages",
  },
  contact: {
    title: "Let's get in touch",
    text: "I'm looking for a working student position. The easiest way to reach me is by email.",
    copy: "Copy",
    copied: "Email copied",
    linkedin: "LinkedIn profile",
  },
  header: {
    sections: "Sections",
    skip: "Skip to content",
    language: "Change language",
    email: "Write an email",
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
    experience: "Erfahrung",
    education: "Ausbildung",
    skills: "Kenntnisse",
    certificates: "Zertifikate",
    contact: "Kontakt",
  },
  sections: {
    about: "Über mich",
    experience: "Berufserfahrung",
    education: "Ausbildung",
    skills: "Kenntnisse & Sprachen",
    certificates: "Auszeichnungen & Zertifikate",
    contact: "Kontakt",
  },
  skills: {
    technical: "Fachlich",
    personal: "Persönlich",
    languages: "Sprachen",
  },
  contact: {
    title: "Kontakt aufnehmen",
    text: "Ich suche eine Werkstudentenstelle. Am einfachsten erreichen Sie mich per E-Mail.",
    copy: "Kopieren",
    copied: "E-Mail-Adresse kopiert",
    linkedin: "LinkedIn-Profil",
  },
  header: {
    sections: "Abschnitte",
    skip: "Zum Inhalt springen",
    language: "Sprache wechseln",
    email: "E-Mail schreiben",
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
