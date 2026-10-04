/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ALL CONTENT OF THE SITE LIVES IN THIS FILE.
 *  Sources: my CV (October 2026) and my own notes. Every text exists in
 *  English (`en`) and German (`de`).
 *
 *  • In the about texts, ==words== get a coloured marker highlight and {age}
 *    is replaced with `person.age`.
 *  • Update `person.age` after each birthday.
 *  • Projects and online courses: add them at the end of this file.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import type { Country, Course, Glance, Hue, IconName, L, Language, Project, Role, Skill } from "./types";

export const person = {
  firstName: "Mugahed",
  lastName: "Al-Hakimi",
  initials: "MA",
  age: 21,
  headline: { en: "Business Informatics Student", de: "Student der Wirtschaftsinformatik" } satisfies L,
  school: "HAW Hamburg",
  intro: {
    en: "Business Informatics student at HAW Hamburg and working student in data maintenance at Nect GmbH.",
    de: "Student der Wirtschaftsinformatik an der HAW Hamburg und Werkstudent in der Datenpflege bei Nect GmbH.",
  } satisfies L,
  availability: { en: "Open to working student positions", de: "Offen für Werkstudentenstellen" } satisfies L,
  email: "hakimi.mujahed@gmail.com",
  linkedin: "https://www.linkedin.com/in/mugahed-al-hakimi-36a2122bb/",
  /** Portrait in /public, e.g. "/photo.jpg" (square works best). Until then the initials are shown. */
  photo: undefined as string | undefined,
};

/** "Hello" in the four languages I speak; the hero cycles through them. */
export const greetings: { text: string; lang: string; dir?: "rtl"; hue: Hue }[] = [
  { text: "Hallo", lang: "de", hue: "blue" },
  { text: "Hello", lang: "en", hue: "violet" },
  { text: "مرحبا", lang: "ar", dir: "rtl", hue: "sun" },
  { text: "Merhaba", lang: "tr", hue: "mint" },
];

/** Little labels floating around the portrait. */
export const stickers: { text: L; hue: Hue }[] = [
  { text: { en: "Java", de: "Java" }, hue: "violet" },
  { text: { en: "SQL", de: "SQL" }, hue: "blue" },
  { text: { en: "GDPR", de: "DSGVO" }, hue: "mint" },
  { text: { en: "Excel", de: "Excel" }, hue: "sun" },
];

/** Keywords on the scrolling ribbon below the hero. */
export const marquee: { text: L; hue: Hue }[] = [
  { text: { en: "Java", de: "Java" }, hue: "violet" },
  { text: { en: "SQL", de: "SQL" }, hue: "blue" },
  { text: { en: "Statistics", de: "Statistik" }, hue: "sun" },
  { text: { en: "Information systems", de: "Informationssysteme" }, hue: "violet" },
  { text: { en: "Data quality", de: "Datenqualität" }, hue: "blue" },
  { text: { en: "GDPR", de: "DSGVO" }, hue: "mint" },
  { text: { en: "Business administration", de: "BWL" }, hue: "sun" },
  { text: { en: "Financial reports", de: "Finanzberichte" }, hue: "violet" },
  { text: { en: "Teamwork", de: "Teamarbeit" }, hue: "blue" },
  { text: { en: "Time management", de: "Zeitmanagement" }, hue: "sun" },
];

/** The three highlights below the hero. */
export const atAGlance: Glance[] = [
  {
    value: { en: "Business Informatics", de: "Wirtschaftsinformatik" },
    label: { en: "Student · HAW Hamburg", de: "Student · HAW Hamburg" },
    icon: "cap",
    hue: "blue",
  },
  {
    value: { en: "{n} languages", de: "{n} Sprachen" },
    count: 4,
    label: { en: "Arabic, German, English, Turkish", de: "Arabisch, Deutsch, Englisch, Türkisch" },
    icon: "languages",
    hue: "sun",
  },
  {
    value: { en: "Data maintenance", de: "Datenpflege" },
    label: { en: "Working student · Nect GmbH", de: "Werkstudent · Nect GmbH" },
    icon: "database",
    hue: "violet",
  },
];

/** "Über mich": a short intro, the three countries as passport stamps, then the rest. */
export const about: { intro: L; body: L } = {
  intro: {
    en: "I'm Mugahed, {age}, from ==Yemen==. I've already lived in ==three countries==, Yemen, Malaysia and Germany, and every move meant a new culture, new people and a new way of doing things.",
    de: "Ich bin Mugahed, {age}, und komme aus dem ==Jemen==. Gelebt habe ich bereits in ==drei Ländern==, im Jemen, in Malaysia und in Deutschland, und jeder Umzug bedeutete eine neue Kultur, neue Menschen und eine neue Art, Dinge anzugehen.",
  },
  body: {
    en: "Today I study ==Business Informatics== at HAW Hamburg, right where business and IT meet. As a working student at Nect, ==accuracy with sensitive data== is part of every day, and as a volunteer I look after the finances of the VJSD. Alongside that I work on my own ==projects== and keep learning with ==online courses==. Next up: a working student position where I can put all of this into practice.",
    de: "Heute studiere ich ==Wirtschaftsinformatik== an der HAW Hamburg, genau dort, wo BWL und IT zusammenkommen. Als Werkstudent bei Nect gehört ==Genauigkeit im Umgang mit sensiblen Daten== zu meinem Alltag, und ehrenamtlich kümmere ich mich um die Finanzen des VJSD. Daneben arbeite ich an eigenen ==Projekten== und bilde mich mit ==Online-Kursen== weiter. Als Nächstes: eine Werkstudentenstelle, in der ich all das in der Praxis einsetzen kann.",
  },
};

/** Shown as passport stamps, in the order I lived there. */
export const countries: Country[] = [
  { name: { en: "Yemen", de: "Jemen" }, hue: "sun" },
  { name: { en: "Malaysia", de: "Malaysia" }, hue: "violet" },
  { name: { en: "Germany", de: "Deutschland" }, hue: "blue" },
];

export const adaptLine: L = {
  en: "Three countries, three cultures, one constant: I adapt fast.",
  de: "Drei Länder, drei Kulturen, eine Konstante: Ich passe mich schnell an.",
};

/** Quick facts next to the about text. */
export const facts: { label: L; value: L; icon: IconName }[] = [
  {
    label: { en: "Studying", de: "Studium" },
    value: { en: "B.Sc. Business Informatics, HAW Hamburg", de: "B.Sc. Wirtschaftsinformatik, HAW Hamburg" },
    icon: "cap",
  },
  {
    label: { en: "Working", de: "Job" },
    value: { en: "Working student, data maintenance · Nect GmbH", de: "Werkstudent, Datenpflege · Nect GmbH" },
    icon: "briefcase",
  },
  {
    label: { en: "Volunteering", de: "Ehrenamt" },
    value: { en: "Finance officer · VJSD", de: "Finanzverantwortlicher · VJSD" },
    icon: "handshake",
  },
  {
    label: { en: "Looking for", de: "Gesucht" },
    value: { en: "A working student position", de: "Eine Werkstudentenstelle" },
    icon: "search",
  },
];

export const experience: Role[] = [
  {
    title: { en: "Working Student, Data Maintenance", de: "Werkstudent, Datenpflege" },
    org: "Nect GmbH",
    orgDetail: { en: "Hamburg", de: "Hamburg" },
    period: { en: "Since 2025", de: "Seit 2025" },
    bullets: {
      en: [
        "Checking and verifying customer data by systematically comparing it with official ID documents and passports to ensure data quality and compliance",
        "Careful and conscientious handling of sensitive personal data in line with GDPR requirements",
        "Identifying and documenting inconsistencies, and working closely with the team on continuous process improvement",
        "Developing a high level of accuracy, efficiency and responsibility in handling confidential information",
      ],
      de: [
        "Prüfung und Verifizierung von Kundendaten durch systematischen Abgleich mit amtlichen Ausweisdokumenten und Reisepässen zur Sicherstellung von Datenqualität und -konformität",
        "Sorgfältige und gewissenhafte Bearbeitung sensibler personenbezogener Daten unter Einhaltung der DSGVO-Vorgaben",
        "Erkennung und Dokumentation von Unstimmigkeiten sowie enge Zusammenarbeit mit dem Team zur kontinuierlichen Prozessverbesserung",
        "Entwicklung eines hohen Maßes an Genauigkeit, Effizienz und Verantwortungsbewusstsein im Umgang mit vertraulichen Informationen",
      ],
    },
    tags: { en: ["Data quality", "GDPR", "Compliance"], de: ["Datenqualität", "DSGVO", "Compliance"] },
    art: "id-scan",
  },
  {
    title: { en: "Finance Officer", de: "Finanzverantwortlicher" },
    org: "VJSD",
    orgDetail: {
      en: "Verein jemenitischer Studierende Deutschland",
      de: "Verein jemenitischer Studierende Deutschland",
    },
    kind: { en: "Volunteer", de: "Ehrenamtlich" },
    period: { en: "Currently", de: "Aktuell" },
    bullets: {
      en: [
        "Organising the association's finances and preparing reports and updates on them, using what I have learned in business administration and information systems",
        "Working closely with the team, which pushes me out of my comfort zone and strengthens my teamwork",
        "Taking responsibility for finishing tasks as requested and on time, where good time management plays a big role",
      ],
      de: [
        "Organisation der Vereinsfinanzen sowie Erstellung von Berichten und Updates zur finanziellen Lage, mit meinem Wissen aus BWL und Informationssystemen",
        "Enge Zusammenarbeit im Team, die mich aus meiner Komfortzone holt und meine Teamfähigkeit stärkt",
        "Verantwortung dafür, Aufgaben wie vereinbart und fristgerecht zu erledigen, wobei gutes Zeitmanagement eine große Rolle spielt",
      ],
    },
    tags: {
      en: ["Finance", "Reporting", "Teamwork", "Time management"],
      de: ["Finanzen", "Berichtswesen", "Teamarbeit", "Zeitmanagement"],
    },
    art: "report",
  },
];

/** Technical skills come with a short note on where or how I use them. */
export const skills: { technical: Skill[]; personal: Skill[] } = {
  technical: [
    {
      name: { en: "SQL", de: "SQL" },
      note: { en: "Querying and managing data", de: "Daten abfragen und verwalten" },
      icon: "database",
    },
    {
      name: { en: "Java", de: "Java" },
      note: { en: "Object-oriented programming", de: "Objektorientierte Programmierung" },
      icon: "cup",
    },
    {
      name: { en: "Statistics", de: "Statistik" },
      note: { en: "Analysing and interpreting data", de: "Daten auswerten und interpretieren" },
      icon: "sigma",
    },
    {
      name: { en: "Information systems", de: "Informationssysteme" },
      note: { en: "Organising data and processes", de: "Daten und Prozesse organisieren" },
      icon: "network",
    },
    {
      name: { en: "Business administration", de: "Betriebswirtschaftslehre (BWL)" },
      note: { en: "Applied to the VJSD's finances", de: "Im Einsatz für die Finanzen des VJSD" },
      icon: "business",
    },
    {
      name: { en: "Financial reporting", de: "Finanzberichte" },
      note: { en: "Reports and updates for the VJSD", de: "Berichte und Updates für den VJSD" },
      icon: "report",
    },
    {
      name: { en: "Data verification & GDPR", de: "Datenprüfung & DSGVO" },
      note: { en: "Every day at Nect", de: "Täglich bei Nect" },
      icon: "shield",
    },
    {
      name: { en: "Microsoft Office", de: "Microsoft Office" },
      note: { en: "Word, Excel, PowerPoint", de: "Word, Excel, PowerPoint" },
      icon: "document",
    },
  ],
  personal: [
    { name: { en: "Teamwork", de: "Teamfähigkeit" }, icon: "users" },
    { name: { en: "Time management", de: "Zeitmanagement" }, icon: "clock" },
    { name: { en: "Leadership", de: "Führungsfähigkeit" }, icon: "flag" },
    { name: { en: "Critical thinking and problem solving", de: "Kritisches Denken und Problemlösung" }, icon: "bulb" },
    { name: { en: "Organisational skills", de: "Organisatorische Fähigkeiten" }, icon: "checklist" },
    { name: { en: "First aid", de: "Erste-Hilfe-Kenntnisse" }, icon: "aid" },
  ],
};

export const languages: Language[] = [
  { name: { en: "Arabic", de: "Arabisch" }, level: { en: "Native", de: "Muttersprache" }, hue: "sun" },
  { name: { en: "German", de: "Deutsch" }, level: { en: "Fluent", de: "Fließend" }, hue: "blue" },
  {
    name: { en: "English", de: "Englisch" },
    level: { en: "Business fluent", de: "Verhandlungssicher" },
    hue: "violet",
  },
  { name: { en: "Turkish", de: "Türkisch" }, level: { en: "Learning", de: "Lerne ich gerade" }, hue: "mint" },
];

/**
 * Projects, newest first. While this list is empty the site shows an "in progress" card.
 * Example entry:
 *   {
 *     title: { en: "Project name", de: "Projektname" },
 *     description: { en: "One or two sentences.", de: "Ein bis zwei Sätze." },
 *     status: { en: "In progress", de: "In Arbeit" },   // optional
 *     tech: ["Java", "SQL"],
 *     repo: "https://github.com/…",                     // optional
 *     link: "https://…",                                // optional
 *     year: "2026",                                     // optional
 *   },
 */
export const projects: Project[] = [];

/**
 * Online courses, newest first. While this list is empty the site shows a "coming soon" card.
 * Example entry:
 *   {
 *     title: { en: "Course name", de: "Kursname" },
 *     provider: "Coursera",
 *     year: "2026",                                          // optional
 *     certificate: "https://…",                              // optional
 *     topics: { en: ["SQL", "Data analysis"], de: ["SQL", "Datenanalyse"] },  // optional
 *     inProgress: true,                                      // optional
 *   },
 */
export const courses: Course[] = [];
