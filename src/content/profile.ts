/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ALL CONTENT OF THE SITE LIVES IN THIS FILE.
 *  Source: Lebenslauf (CV), October 2026. German texts follow the CV;
 *  English texts are translations of them.
 *
 *  • Every text exists in English (`en`) and German (`de`).
 *  • In the about text, ==words== get a coloured marker highlight.
 *  • Update the semester (about text + stats) when it changes.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import type { Award, Hue, IconName, L, Language, Role, Skill, Stat, Stop } from "./types";

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
  /** Portrait in /public, e.g. "/photo.jpg" (square works best). Until then the initials are shown. */
  photo: undefined as string | undefined,
};

/** "Hello" in the four languages I speak; the hero cycles through them. */
export const greetings: { text: string; lang: string; dir?: "rtl"; hue: Hue }[] = [
  { text: "Hallo", lang: "de", hue: "blue" },
  { text: "Hello", lang: "en", hue: "mint" },
  { text: "مرحبا", lang: "ar", dir: "rtl", hue: "sun" },
  { text: "Merhaba", lang: "tr", hue: "coral" },
];

/** Little labels floating around the portrait. */
export const stickers: { text: L; hue: Hue }[] = [
  { text: { en: "Java", de: "Java" }, hue: "coral" },
  { text: { en: "SQL", de: "SQL" }, hue: "blue" },
  { text: { en: "GDPR", de: "DSGVO" }, hue: "mint" },
  { text: { en: "4 languages", de: "4 Sprachen" }, hue: "sun" },
];

/** Keywords on the scrolling ribbon below the hero. */
export const marquee: { text: L; hue: Hue }[] = [
  { text: { en: "Java", de: "Java" }, hue: "coral" },
  { text: { en: "SQL", de: "SQL" }, hue: "blue" },
  { text: { en: "Data quality", de: "Datenqualität" }, hue: "mint" },
  { text: { en: "GDPR", de: "DSGVO" }, hue: "sun" },
  { text: { en: "Business administration", de: "BWL" }, hue: "coral" },
  { text: { en: "Critical thinking", de: "Kritisches Denken" }, hue: "blue" },
  { text: { en: "Compliance", de: "Compliance" }, hue: "mint" },
  { text: { en: "Microsoft Office", de: "Microsoft Office" }, hue: "sun" },
];

export const stats: Stat[] = [
  {
    value: 97.25,
    decimals: 2,
    suffix: { en: "%", de: " %" },
    label: { en: "High school result, 2nd in my year", de: "High-School-Ergebnis, 2. Platz im Jahrgang" },
    hue: "sun",
  },
  {
    value: 1.6,
    decimals: 1,
    label: { en: "Final grade at the Studienkolleg", de: "Abschlussnote am Studienkolleg" },
    hue: "coral",
  },
  { value: 4, decimals: 0, label: { en: "Languages", de: "Sprachen" }, hue: "mint" },
  {
    value: 3,
    decimals: 0,
    ordinal: true,
    label: { en: "Semester, B.Sc. Business Informatics", de: "Semester B.Sc. Wirtschaftsinformatik" },
    hue: "blue",
  },
];

export const about: L = {
  en: "Motivated Business Informatics student (3rd semester) with practical experience in handling ==sensitive data== and a keen ==eye for detail==. Combines a solid foundation in ==programming (Java, SQL)== and ==business administration== with first work experience in ==data verification and compliance== at Nect GmbH. Looking for a ==working student position== to apply theoretical knowledge in practice and continue to develop professionally.",
  de: "Motivierter Student der Wirtschaftsinformatik (3. Semester) mit praktischer Erfahrung im Umgang mit ==sensiblen Daten== und einem ausgeprägten ==Blick fürs Detail==. Kombiniert fundierte Grundlagen in ==Programmierung (Java, SQL)== und ==Betriebswirtschaftslehre== mit erster Berufserfahrung im Bereich ==Datenprüfung und Compliance== bei Nect GmbH. Sucht eine ==Werkstudentenstelle==, um theoretisches Wissen praktisch anzuwenden und sich fachlich weiterzuentwickeln.",
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
    label: { en: "Looking for", de: "Gesucht" },
    value: { en: "A working student position", de: "Eine Werkstudentenstelle" },
    icon: "search",
  },
  {
    label: { en: "Languages", de: "Sprachen" },
    value: { en: "Arabic, German, English, Turkish", de: "Arabisch, Deutsch, Englisch, Türkisch" },
    icon: "globe",
  },
];

/** My path so far, oldest first. */
export const path: Stop[] = [
  {
    period: { en: "2019 – 2023", de: "2019 – 2023" },
    place: { en: "Putrajaya, Malaysia", de: "Putrajaya, Malaysia" },
    title: { en: "IMAS – The International Modern Arabic School", de: "IMAS – The International Modern Arabic School" },
    detail: {
      en: "High school · grade 1.1 (97.25%) · excellence award, 2nd place in my year",
      de: "Gymnasium · Note 1,1 (97,25 %) · Exzellenzpreis, 2. Platz im Jahrgang",
    },
    hue: "sun",
  },
  {
    period: { en: "2023 – 2024", de: "2023 – 2024" },
    place: { en: "Kuala Lumpur, Malaysia", de: "Kuala Lumpur, Malaysia" },
    title: { en: "Goethe-Institut", de: "Goethe-Institut" },
    detail: { en: "German language course, A1 to B2", de: "Deutschsprachiger Kurs, A1 bis B2" },
    hue: "mint",
  },
  {
    period: { en: "2024 – 2025", de: "2024 – 2025" },
    place: { en: "Hannover", de: "Hannover" },
    title: { en: "Studienkolleg · Leibniz University Hannover", de: "Studienkolleg · Leibniz Universität Hannover" },
    detail: {
      en: "Final grade 1.6 · preparation for university studies in Germany",
      de: "Abschlussnote 1,6 · Vorbereitung auf ein Hochschulstudium in Deutschland",
    },
    hue: "coral",
  },
  {
    period: { en: "Since Oct 2025", de: "Seit 10/2025" },
    place: { en: "Hamburg", de: "Hamburg" },
    title: { en: "B.Sc. Business Informatics · HAW Hamburg", de: "B.Sc. Wirtschaftsinformatik · HAW Hamburg" },
    detail: {
      en: "Focus so far: Java, SQL, business administration, fundamentals of business informatics, statistics",
      de: "Schwerpunkte bisher: Java, SQL, BWL, Grundlagen der Wirtschaftsinformatik, Statistik",
    },
    hue: "blue",
  },
];

export const experience: Role[] = [
  {
    title: { en: "Working Student, Data Maintenance", de: "Werkstudent, Datenpflege" },
    company: "Nect GmbH",
    location: "Hamburg",
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
  },
];

export const skills: { technical: Skill[]; personal: Skill[] } = {
  technical: [
    { name: { en: "SQL", de: "SQL" }, note: { en: "basic", de: "Grundkenntnisse" }, icon: "database" },
    { name: { en: "Java", de: "Java" }, note: { en: "basic", de: "Grundkenntnisse" }, icon: "cup" },
    { name: { en: "Business administration", de: "Betriebswirtschaftslehre (BWL)" }, icon: "chart" },
    {
      name: { en: "Microsoft Office", de: "Microsoft Office" },
      note: { en: "Word, Excel, PowerPoint", de: "Word, Excel, PowerPoint" },
      icon: "document",
    },
  ],
  personal: [
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
    hue: "mint",
  },
  {
    name: { en: "Turkish", de: "Türkisch" },
    level: { en: "Beginner", de: "Anfänger" },
    value: 0.2,
    hello: "Merhaba",
    lang: "tr",
    hue: "coral",
  },
];

export const awards: Award[] = [
  {
    name: { en: "High school excellence award", de: "Exzellenzpreis der High School" },
    issuer: { en: "2nd place in my year · IMAS, Putrajaya", de: "2. Platz im Jahrgang · IMAS, Putrajaya" },
    icon: "medal",
    hue: "sun",
  },
  {
    name: { en: "German language course (A1–B2)", de: "Deutschsprachiger Kurs (A1–B2)" },
    issuer: { en: "Goethe-Institut, Kuala Lumpur", de: "Goethe-Institut, Kuala Lumpur" },
    period: "2023 – 2024",
    icon: "speech",
    hue: "blue",
  },
  {
    name: { en: "Certificate of participation", de: "Teilnahmezertifikat" },
    issuer: { en: "Kangaroo Math Competition, Kuala Lumpur", de: "Kangaroo Math Competition, Kuala Lumpur" },
    period: "2019 – 2020",
    icon: "sigma",
    hue: "mint",
  },
  {
    name: { en: "First aid course, certificate of attendance", de: "Teilnahmebescheinigung Erste-Hilfe-Kurs" },
    issuer: { en: "IMAS Malaysia", de: "IMAS Malaysia" },
    icon: "aid",
    hue: "coral",
  },
];
