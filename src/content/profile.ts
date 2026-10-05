/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ALL CONTENT OF THE SITE LIVES IN THIS FILE.
 *  Sources: my CV (October 2026) and my own notes. Every text exists in
 *  English (`en`) and German (`de`).
 *
 *  • In the about texts, ==words== get a coloured marker highlight.
 *  • Projects and online courses: add them at the end of this file.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import type { Chapter, Course, Glance, Hue, L, Language, Project, Role, Skill } from "./types";

export const person = {
  firstName: "Mugahed",
  lastName: "Al-Hakimi",
  initials: "MA",
  headline: { en: "Business Informatics Student", de: "Student der Wirtschaftsinformatik" } satisfies L,
  school: "HAW Hamburg",
  intro: {
    en: "Business Informatics student at HAW Hamburg and working student in data maintenance at Nect GmbH.",
    de: "Student der Wirtschaftsinformatik an der HAW Hamburg und Werkstudent in der Datenpflege bei Nect GmbH.",
  } satisfies L,
  availability: { en: "Open to working student positions", de: "Offen für Werkstudentenstellen" } satisfies L,
  email: "hakimi.mujahed@gmail.com",
  linkedin: "https://www.linkedin.com/in/mugahed-al-hakimi-36a2122bb/",
  /** Portrait in /public (square works best). Without one, the initials are shown instead. */
  photo: "/photo.jpg" as string | undefined,
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

/** "Über mich": one opening line, then three short cards. */
export const about: { lead: L; chapters: Chapter[] } = {
  lead: {
    en: "I study Business Informatics at HAW Hamburg and I'm passionate about ==connecting business and IT==.",
    de: "Ich studiere Wirtschaftsinformatik an der HAW Hamburg und begeistere mich für die ==Verbindung von BWL und IT==.",
  },
  chapters: [
    {
      title: { en: "Studies", de: "Studium" },
      text: {
        en: "I want to understand how organisations work and how technology moves them forward. My studies give me ==both sides==: Java and SQL on one, statistics and business administration on the other.",
        de: "Ich will verstehen, wie Unternehmen funktionieren und wie Technologie sie voranbringt. Das Studium gibt mir ==beide Seiten==: Java und SQL auf der einen, Statistik und BWL auf der anderen.",
      },
      icon: "cap",
      hue: "blue",
    },
    {
      title: { en: "In practice", de: "Praxis" },
      text: {
        en: "At Nect, I work with sensitive customer data every day, where accuracy and GDPR compliance come first. For the VJSD, I organise the finances and prepare the reports the team relies on. Delivering them on time alongside university and work has sharpened my ==teamwork and time management==.",
        de: "Bei Nect arbeite ich täglich mit sensiblen Kundendaten, bei denen Genauigkeit und DSGVO-Konformität zählen. Für den VJSD organisiere ich die Finanzen und erstelle die Berichte, auf die sich das Team verlässt. Sie neben Studium und Job pünktlich zu liefern, hat meine ==Teamfähigkeit und mein Zeitmanagement== geschärft.",
      },
      icon: "briefcase",
      hue: "violet",
    },
    {
      title: { en: "What shaped me", de: "Was mich prägt" },
      text: {
        en: "Living in three countries meant new cultures and new people, again and again. It taught me to ==adapt quickly and stay calm under pressure==. Next up: my own projects, online courses and a working student position.",
        de: "Das Leben in drei Ländern bedeutete immer wieder neue Kulturen und neue Menschen. So habe ich gelernt, ==mich schnell einzustellen und unter Druck ruhig zu bleiben==. Als Nächstes: eigene Projekte, Online-Kurse und eine Werkstudentenstelle.",
      },
      icon: "globe",
      hue: "sun",
    },
  ],
};

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
