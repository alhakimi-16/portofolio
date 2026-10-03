import type { Locale } from "./config";

/**
 * Interface strings (navigation, buttons, labels).
 * Your personal content (projects, experience, …) lives in `src/content/profile.ts`.
 *
 * Text wrapped in *asterisks* is rendered as an italic serif accent.
 */
const en = {
  meta: {
    description:
      "Portfolio of Mugahed Al-Hakimi: machine learning, NLP and data analytics projects, experience and skills.",
  },
  nav: {
    about: "About",
    work: "Work",
    experience: "Experience",
    skills: "Skills",
    education: "Education",
    contact: "Contact",
  },
  header: {
    menu: "Menu",
    close: "Close",
    theme: "Switch light / dark mode",
    language: "Change language",
    command: "Open command menu",
    skip: "Skip to content",
    home: "Back to the top",
  },
  hero: {
    figure: "Fig. 01 — Signal from noise",
    series: "series",
    hint: "Move to inject signal · click to send a pulse",
    hintTouch: "Tap to send a pulse",
    scroll: "Scroll",
    viewWork: "View work",
    status: "Status",
    downloadCv: "Download CV",
    based: "Based in",
  },
  preloader: {
    training: "Training model",
    epoch: "epoch",
    loss: "loss",
  },
  about: {
    label: "About",
    figure: "Fig. 02 — Profile",
    facts: {
      based: "Based in",
      focus: "Focus",
      currently: "Currently",
      languages: "Languages",
      openTo: "Open to",
    },
    portrait: "Portrait rendered as data points — move your cursor over it",
  },
  work: {
    label: "Work",
    figure: "Fig. 03 — Selected work",
    title: "Selected *work*",
    intro: "A few projects that show how I approach a problem — from the first question to a result someone can use.",
    all: "All",
    open: "Open",
    problem: "Problem",
    approach: "Approach",
    results: "Results",
    stack: "Stack",
    links: "Links",
    close: "Close",
    next: "Next project",
    previous: "Previous project",
    year: "Year",
    category: "Category",
    project: "Project",
  },
  experience: {
    label: "Experience",
    figure: "Fig. 04 — Experience",
    title: "Where I've *worked*",
    present: "Present",
    summary: "{count} roles since {year}",
    chart: "Timeline · years",
  },
  skills: {
    label: "Skills",
    figure: "Fig. 05 — Skill embedding",
    title: "Toolkit & *skills*",
    hint: "Drag the nodes — it's a live force simulation.",
    hintTouch: "Tap a group to highlight it.",
    caption: "Force-directed layout · node size = proficiency",
    languages: "Languages",
    levels: ["", "Basics", "Working knowledge", "Solid", "Advanced", "Expert"],
  },
  education: {
    label: "Education",
    figure: "Fig. 06 — Education",
    title: "Education & *certificates*",
    education: "Education",
    certifications: "Certifications",
  },
  contact: {
    label: "Contact",
    figure: "Fig. 07 — Contact",
    title: "Hiring for *data & ML*? Let's talk.",
    text: "I'm open to full-time roles, working-student positions and internships. The fastest way to reach me is email.",
    cta: "Get in touch",
    email: "Email",
    copy: "Copy email",
    copied: "Email copied to clipboard",
    elsewhere: "Elsewhere",
  },
  footer: {
    built: "Designed & built by",
    localTime: "Local time",
    backToTop: "Back to top",
    palette: "for the command menu",
  },
  palette: {
    title: "Command menu",
    placeholder: "Type a command or search…",
    navigate: "Navigate",
    actions: "Actions",
    links: "Links",
    empty: "No results.",
    toggleTheme: "Switch light / dark mode",
    switchLanguage: "Auf Deutsch wechseln",
    copyEmail: "Copy email address",
    toggleGrid: "Show / hide layout grid",
    top: "Back to top",
    keys: { navigate: "navigate", select: "select", close: "close" },
  },
  draft: "Draft — sample content",
  notFound: {
    title: "Outlier detected.",
    text: "This page isn't part of the dataset.",
    back: "Back to the portfolio",
  },
};

export type Dictionary = typeof en;

const de: Dictionary = {
  meta: {
    description:
      "Portfolio von Mugahed Al-Hakimi: Projekte, Erfahrung und Skills in Machine Learning, NLP und Data Analytics.",
  },
  nav: {
    about: "Über mich",
    work: "Projekte",
    experience: "Erfahrung",
    skills: "Skills",
    education: "Ausbildung",
    contact: "Kontakt",
  },
  header: {
    menu: "Menü",
    close: "Schließen",
    theme: "Hell / Dunkel umschalten",
    language: "Sprache wechseln",
    command: "Befehlsmenü öffnen",
    skip: "Zum Inhalt springen",
    home: "Zurück nach oben",
  },
  hero: {
    figure: "Abb. 01 — Signal aus Rauschen",
    series: "Reihen",
    hint: "Cursor bewegen für mehr Signal · Klicken für einen Impuls",
    hintTouch: "Tippen für einen Impuls",
    scroll: "Scrollen",
    viewWork: "Projekte ansehen",
    status: "Status",
    downloadCv: "Lebenslauf",
    based: "Standort",
  },
  preloader: {
    training: "Modell wird trainiert",
    epoch: "Epoche",
    loss: "Loss",
  },
  about: {
    label: "Über mich",
    figure: "Abb. 02 — Profil",
    facts: {
      based: "Standort",
      focus: "Schwerpunkt",
      currently: "Aktuell",
      languages: "Sprachen",
      openTo: "Offen für",
    },
    portrait: "Porträt aus Datenpunkten — mit dem Cursor darüberfahren",
  },
  work: {
    label: "Projekte",
    figure: "Abb. 03 — Ausgewählte Projekte",
    title: "Ausgewählte *Projekte*",
    intro:
      "Einige Projekte, die zeigen, wie ich an Probleme herangehe — von der ersten Frage bis zu einem Ergebnis, mit dem man arbeiten kann.",
    all: "Alle",
    open: "Öffnen",
    problem: "Problem",
    approach: "Ansatz",
    results: "Ergebnisse",
    stack: "Stack",
    links: "Links",
    close: "Schließen",
    next: "Nächstes Projekt",
    previous: "Vorheriges Projekt",
    year: "Jahr",
    category: "Kategorie",
    project: "Projekt",
  },
  experience: {
    label: "Erfahrung",
    figure: "Abb. 04 — Erfahrung",
    title: "Berufliche *Stationen*",
    present: "Heute",
    summary: "{count} Stationen seit {year}",
    chart: "Zeitleiste · Jahre",
  },
  skills: {
    label: "Skills",
    figure: "Abb. 05 — Skill-Embedding",
    title: "Werkzeuge & *Skills*",
    hint: "Knoten ziehen — eine echte Kräftesimulation.",
    hintTouch: "Gruppe antippen, um sie hervorzuheben.",
    caption: "Kräftebasiertes Layout · Knotengröße = Kenntnisstand",
    languages: "Sprachen",
    levels: ["", "Grundlagen", "Anwendungswissen", "Sicher", "Fortgeschritten", "Experte"],
  },
  education: {
    label: "Ausbildung",
    figure: "Abb. 06 — Ausbildung",
    title: "Ausbildung & *Zertifikate*",
    education: "Ausbildung",
    certifications: "Zertifikate",
  },
  contact: {
    label: "Kontakt",
    figure: "Abb. 07 — Kontakt",
    title: "Verstärkung für *Data & ML* gesucht? Sprechen wir.",
    text: "Ich bin offen für Festanstellungen, Werkstudentenstellen und Praktika. Am schnellsten erreichen Sie mich per E-Mail.",
    cta: "Kontakt aufnehmen",
    email: "E-Mail",
    copy: "E-Mail kopieren",
    copied: "E-Mail-Adresse kopiert",
    elsewhere: "Profile",
  },
  footer: {
    built: "Gestaltet & entwickelt von",
    localTime: "Ortszeit",
    backToTop: "Nach oben",
    palette: "öffnet das Befehlsmenü",
  },
  palette: {
    title: "Befehlsmenü",
    placeholder: "Befehl eingeben oder suchen…",
    navigate: "Navigation",
    actions: "Aktionen",
    links: "Links",
    empty: "Keine Ergebnisse.",
    toggleTheme: "Hell / Dunkel umschalten",
    switchLanguage: "Switch to English",
    copyEmail: "E-Mail-Adresse kopieren",
    toggleGrid: "Layout-Raster ein- / ausblenden",
    top: "Nach oben",
    keys: { navigate: "navigieren", select: "auswählen", close: "schließen" },
  },
  draft: "Entwurf — Beispielinhalte",
  notFound: {
    title: "Ausreißer entdeckt.",
    text: "Diese Seite gehört nicht zum Datensatz.",
    back: "Zurück zum Portfolio",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, de };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Replaces `{name}` placeholders: format("{count} roles", { count: 3 }) → "3 roles". */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}
