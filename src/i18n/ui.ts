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
    skills: "Skills",
    projects: "Projects",
    courses: "Courses",
    experience: "Experience",
    contact: "Contact",
  },
  hero: {
    iam: "I'm",
    cta: "Get in touch",
    skills: "See my skills",
  },
  sections: {
    about: { eyebrow: "About me", title: "A quick *hello*" },
    skills: { eyebrow: "Skills", title: "What I *bring*" },
    projects: { eyebrow: "Projects", title: "Things I'm *building*" },
    courses: { eyebrow: "Online courses", title: "Always *learning*" },
    experience: { eyebrow: "Experience", title: "Work & *volunteering*" },
    contact: { eyebrow: "Contact", title: "Let's *talk*" },
  },
  skills: {
    technical: "Technical",
    personal: "Personal",
    languages: "Languages",
  },
  projects: {
    soonTitle: "First projects in progress",
    soonText:
      "I'm currently working on my first projects. As soon as they're ready, you'll find them here with a short description and the tech behind them.",
    status: "In progress",
    live: "Live",
    code: "Code",
  },
  courses: {
    soonTitle: "Coming soon",
    soonText: "My online courses and certificates will be listed here soon.",
    certificate: "Certificate",
    inProgress: "In progress",
  },
  experience: {
    scan: "ID check",
    verified: "Verified",
    report: "Financial report",
    onTime: "On time",
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
  sheet: {
    start: "Start",
    tabs: "Sheets",
    nameBox: "Selected cells",
    formula: "Formula",
    picture: "Picture 1",
    calculating: "Calculating",
  },
  /** Decorative formulas shown in the formula bar for each part of the page. */
  formulas: {
    top: '=CONCAT("Business", " + ", "IT")',
    about: '=VLOOKUP("Mugahed", About, 2, FALSE)',
    skills: "=COUNTA(Technical, Personal)",
    projects: '=IF(Projects="done", "live", "in progress")',
    courses: '=FILTER(Courses, Status="completed")',
    experience: '=XLOOKUP("Working student", Roles, Companies)',
    contact: '=HYPERLINK("mailto:hakimi.mujahed@gmail.com", "Write")',
  },
  tables: {
    skill: "Skill",
    area: "Area",
    use: "In use",
    all: "All",
    filter: "Filter skills",
    language: "Language",
    level: "Level",
    course: "Course",
    provider: "Provider",
    year: "Year",
    email: "Email",
  },
  checks: {
    verify: "=VERIFY(customer_data, id_document)",
    report: "=REPORT(finances, on_time)",
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
    skills: "Kenntnisse",
    projects: "Projekte",
    courses: "Kurse",
    experience: "Erfahrung",
    contact: "Kontakt",
  },
  hero: {
    iam: "Ich bin",
    cta: "Kontakt aufnehmen",
    skills: "Meine Kenntnisse",
  },
  sections: {
    about: { eyebrow: "Über mich", title: "Kurz *vorgestellt*" },
    skills: { eyebrow: "Kenntnisse", title: "Was ich *mitbringe*" },
    projects: { eyebrow: "Projekte", title: "Woran ich *baue*" },
    courses: { eyebrow: "Online-Kurse", title: "Immer am *Lernen*" },
    experience: { eyebrow: "Erfahrung", title: "Arbeit & *Ehrenamt*" },
    contact: { eyebrow: "Kontakt", title: "Lassen Sie uns *sprechen*" },
  },
  skills: {
    technical: "Fachlich",
    personal: "Persönlich",
    languages: "Sprachen",
  },
  projects: {
    soonTitle: "Erste Projekte in Arbeit",
    soonText:
      "Ich arbeite gerade an meinen ersten Projekten. Sobald sie fertig sind, finden Sie sie hier, mit einer kurzen Beschreibung und der Technik dahinter.",
    status: "In Arbeit",
    live: "Live",
    code: "Code",
  },
  courses: {
    soonTitle: "Bald hier",
    soonText: "Meine Online-Kurse und Zertifikate stehen bald hier.",
    certificate: "Zertifikat",
    inProgress: "Läuft gerade",
  },
  experience: {
    scan: "Ausweisprüfung",
    verified: "Geprüft",
    report: "Finanzbericht",
    onTime: "Pünktlich",
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
  sheet: {
    start: "Start",
    tabs: "Tabellenblätter",
    nameBox: "Ausgewählte Zellen",
    formula: "Formel",
    picture: "Grafik 1",
    calculating: "Wird berechnet",
  },
  formulas: {
    top: '=VERKETTEN("BWL"; " + "; "IT")',
    about: '=SVERWEIS("Mugahed"; Über_mich; 2; FALSCH)',
    skills: "=ANZAHL2(Fachlich; Persönlich)",
    projects: '=WENN(Projekte="fertig"; "online"; "in Arbeit")',
    courses: '=FILTER(Kurse; Status="abgeschlossen")',
    experience: '=XVERWEIS("Werkstudent"; Rollen; Firmen)',
    contact: '=HYPERLINK("mailto:hakimi.mujahed@gmail.com"; "Schreiben")',
  },
  tables: {
    skill: "Kenntnis",
    area: "Bereich",
    use: "Einsatz",
    all: "Alle",
    filter: "Kenntnisse filtern",
    language: "Sprache",
    level: "Niveau",
    course: "Kurs",
    provider: "Anbieter",
    year: "Jahr",
    email: "E-Mail",
  },
  checks: {
    verify: "=PRÜFEN(Kundendaten; Ausweis)",
    report: "=BERICHT(Finanzen; pünktlich)",
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
