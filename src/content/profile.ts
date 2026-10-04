/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ALL CONTENT OF THE SITE LIVES IN THIS FILE.
 *  Sources: my CV (October 2026) and my own notes. Every text exists in
 *  English (`en`) and German (`de`).
 *
 *  • In the about text, ==words== get a coloured marker highlight and {age}
 *    is replaced with `person.age`.
 *  • Update `person.age` after each birthday (it is also one of the numbers).
 * ─────────────────────────────────────────────────────────────────────────────
 */
import type { Hue, IconName, L, Language, Role, Skill, Stat, Stop } from "./types";

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
  { text: { en: "4 languages", de: "4 Sprachen" }, hue: "sun" },
];

/** Keywords on the scrolling ribbon below the hero. */
export const marquee: { text: L; hue: Hue }[] = [
  { text: { en: "Java", de: "Java" }, hue: "violet" },
  { text: { en: "SQL", de: "SQL" }, hue: "blue" },
  { text: { en: "Information systems", de: "Informationssysteme" }, hue: "sun" },
  { text: { en: "Data quality", de: "Datenqualität" }, hue: "violet" },
  { text: { en: "GDPR", de: "DSGVO" }, hue: "mint" },
  { text: { en: "Business administration", de: "BWL" }, hue: "blue" },
  { text: { en: "Financial reports", de: "Finanzberichte" }, hue: "sun" },
  { text: { en: "Teamwork", de: "Teamarbeit" }, hue: "violet" },
  { text: { en: "Time management", de: "Zeitmanagement" }, hue: "blue" },
];

/** The numbers below the hero; they count up when they appear. */
export const stats: Stat[] = [
  { value: person.age, label: { en: "Years old", de: "Jahre alt" }, hue: "blue" },
  { value: 3, label: { en: "Countries I've lived in", de: "Länder, in denen ich gelebt habe" }, hue: "sun" },
  { value: 4, label: { en: "Languages I speak", de: "Sprachen, die ich spreche" }, hue: "violet" },
  { value: 2, label: { en: "Roles alongside my studies", de: "Tätigkeiten neben dem Studium" }, hue: "blue" },
];

export const about: L = {
  en: "I'm Mugahed, a {age}-year-old from ==Yemen==. So far I've lived in three countries with three very different cultures: Yemen, ==Malaysia== and ==Germany==. Today I study ==Business Informatics== at HAW Hamburg, right where business and IT meet. Alongside my studies I check and maintain customer data as a working student at Nect, where ==accuracy and care with sensitive data== count every day, and I volunteer as finance officer for the VJSD, the association of Yemeni students in Germany. My next step: a ==working student position== where I can put what I learn into practice.",
  de: "Ich bin Mugahed, {age} Jahre alt und komme aus dem ==Jemen==. Bisher habe ich in drei Ländern mit drei ganz unterschiedlichen Kulturen gelebt: im Jemen, in ==Malaysia== und in ==Deutschland==. Heute studiere ich ==Wirtschaftsinformatik== an der HAW Hamburg, genau dort, wo BWL und IT zusammenkommen. Neben dem Studium prüfe und pflege ich als Werkstudent bei Nect Kundendaten, wo es jeden Tag auf ==Genauigkeit und einen sorgfältigen Umgang mit sensiblen Daten== ankommt, und engagiere mich ehrenamtlich als Finanzverantwortlicher beim VJSD (Verein jemenitischer Studierende Deutschland). Mein nächster Schritt: eine ==Werkstudentenstelle==, in der ich Gelerntes in der Praxis anwenden kann.",
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

/** Three countries, three cultures, in the order I lived in them. */
export const path: Stop[] = [
  {
    label: { en: "Where I'm from", de: "Herkunft" },
    title: { en: "Yemen", de: "Jemen" },
    detail: {
      en: "My home country and my roots. Arabic is my native language.",
      de: "Mein Heimatland und meine Wurzeln. Arabisch ist meine Muttersprache.",
    },
    hue: "sun",
  },
  {
    label: { en: "A new culture", de: "Eine neue Kultur" },
    title: { en: "Malaysia", de: "Malaysia" },
    detail: {
      en: "Southeast Asia: a whole new culture, in a country where many cultures meet.",
      de: "Südostasien: eine ganz neue Kultur, in einem Land, in dem viele Kulturen aufeinandertreffen.",
    },
    hue: "violet",
  },
  {
    label: { en: "Today", de: "Heute" },
    title: { en: "Germany", de: "Deutschland" },
    detail: {
      en: "Business Informatics at HAW Hamburg, my job at Nect and volunteering for the VJSD.",
      de: "Wirtschaftsinformatik an der HAW Hamburg, mein Job bei Nect und mein Ehrenamt beim VJSD.",
    },
    hue: "blue",
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

export const skills: { technical: Skill[]; personal: Skill[] } = {
  technical: [
    { name: { en: "SQL", de: "SQL" }, icon: "database" },
    { name: { en: "Java", de: "Java" }, icon: "cup" },
    { name: { en: "Business administration", de: "Betriebswirtschaftslehre (BWL)" }, icon: "chart" },
    { name: { en: "Information systems", de: "Informationssysteme" }, icon: "network" },
    { name: { en: "Data verification & GDPR", de: "Datenprüfung & DSGVO" }, icon: "shield" },
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
  {
    name: { en: "Arabic", de: "Arabisch" },
    level: { en: "Native", de: "Muttersprache" },
    value: 1,
    hello: "مرحبا",
    lang: "ar",
    dir: "rtl",
    hue: "sun",
  },
  {
    name: { en: "German", de: "Deutsch" },
    level: { en: "Fluent", de: "Fließend" },
    value: 0.85,
    hello: "Hallo",
    lang: "de",
    hue: "blue",
  },
  {
    name: { en: "English", de: "Englisch" },
    level: { en: "Business fluent", de: "Verhandlungssicher" },
    value: 0.85,
    hello: "Hello",
    lang: "en",
    hue: "violet",
  },
  {
    name: { en: "Turkish", de: "Türkisch" },
    level: { en: "Beginner", de: "Anfänger" },
    value: 0.2,
    hello: "Merhaba",
    lang: "tr",
    hue: "mint",
  },
];
