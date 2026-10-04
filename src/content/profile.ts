/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ALL CONTENT OF THE SITE LIVES IN THIS FILE.
 *  Source: Lebenslauf (CV), October 2026. German texts follow the CV word for word;
 *  English texts are translations of them.
 *
 *  Every text exists in English (`en`) and German (`de`).
 * ─────────────────────────────────────────────────────────────────────────────
 */
import type { Certificate, Education, L, Language, Role } from "./types";

export const person = {
  name: "Mugahed Al-Hakimi",
  initials: "MA",
  headline: { en: "Business Informatics Student", de: "Student der Wirtschaftsinformatik" } satisfies L,
  school: "HAW Hamburg",
  tagline: {
    en: "Practical experience in handling sensitive data and a keen eye for detail. Looking for a working student position.",
    de: "Praktische Erfahrung im Umgang mit sensiblen Daten und ein ausgeprägter Blick fürs Detail. Auf der Suche nach einer Werkstudentenstelle.",
  } satisfies L,
  availability: { en: "Open to working student positions", de: "Offen für Werkstudentenstellen" } satisfies L,
  email: "hakimi.mujahed@gmail.com",
  linkedin: "https://www.linkedin.com/in/mugahed-al-hakimi-36a2122bb/",
  /** Portrait in /public, e.g. "/photo.jpg" (square works best). Until then the initials are shown. */
  photo: undefined as string | undefined,
};

export const about: L = {
  en: "Motivated Business Informatics student (3rd semester) with practical experience in handling sensitive data and a keen eye for detail. Combines a solid foundation in programming (Java, SQL) and business administration with first work experience in data verification and compliance at Nect GmbH. Looking for a working student position to apply theoretical knowledge in practice and continue to develop professionally.",
  de: "Motivierter Student der Wirtschaftsinformatik (3. Semester) mit praktischer Erfahrung im Umgang mit sensiblen Daten und einem ausgeprägten Blick fürs Detail. Kombiniert fundierte Grundlagen in Programmierung (Java, SQL) und Betriebswirtschaftslehre mit erster Berufserfahrung im Bereich Datenprüfung und Compliance bei Nect GmbH. Sucht eine Werkstudentenstelle, um theoretisches Wissen praktisch anzuwenden und sich fachlich weiterzuentwickeln.",
};

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

export const education: Education[] = [
  {
    degree: { en: "B.Sc. Business Informatics", de: "B.Sc. Wirtschaftsinformatik" },
    school: { en: "HAW Hamburg", de: "HAW Hamburg" },
    period: { en: "Since Oct 2025", de: "Seit 10/2025" },
    note: {
      en: "Focus so far: Java, SQL, business administration, fundamentals of business informatics, statistics",
      de: "Schwerpunkte bisher: Java, SQL, BWL, Grundlagen der Wirtschaftsinformatik, Statistik",
    },
  },
  {
    degree: { en: "Studienkolleg (university preparatory course)", de: "Studienkolleg" },
    school: { en: "LUH – Leibniz University Hannover", de: "LUH – Leibniz Universität Hannover" },
    period: { en: "2024 – 2025", de: "2024 – 2025" },
    note: {
      en: "Final grade: 1.6 · Preparation for university studies in Germany",
      de: "Abschlussnote: 1,6 · Vorbereitung auf ein Hochschulstudium in Deutschland",
    },
  },
  {
    degree: { en: "High school", de: "Gymnasium" },
    school: {
      en: "IMAS – The International Modern Arabic School, Putrajaya, Malaysia",
      de: "IMAS – The International Modern Arabic School, Putrajaya, Malaysia",
    },
    period: { en: "2019 – 2023", de: "2019 – 2023" },
    note: {
      en: "High school excellence award: 2nd place in my year with a grade of 1.1 (97.25%)",
      de: "Exzellenzpreis der High School: 2. Platz im Jahrgang mit einer Note von 1,1 (97,25 %)",
    },
  },
];

export const skills = {
  technical: {
    en: ["SQL (basic)", "Java (basic)", "Business administration", "Microsoft Office (Word, Excel, PowerPoint)"],
    de: [
      "SQL (Grundkenntnisse)",
      "Java (Grundkenntnisse)",
      "Betriebswirtschaftslehre (BWL)",
      "Microsoft Office (Word, Excel, PowerPoint)",
    ],
  } satisfies L<string[]>,
  personal: {
    en: ["Leadership", "Critical thinking and problem solving", "Organisational skills", "First aid"],
    de: [
      "Führungsfähigkeit",
      "Kritisches Denken und Problemlösung",
      "Organisatorische Fähigkeiten",
      "Erste-Hilfe-Kenntnisse",
    ],
  } satisfies L<string[]>,
};

export const languages: Language[] = [
  { name: { en: "Arabic", de: "Arabisch" }, level: { en: "Native", de: "Muttersprache" } },
  { name: { en: "German", de: "Deutsch" }, level: { en: "Fluent", de: "Fließend" } },
  { name: { en: "English", de: "Englisch" }, level: { en: "Business fluent", de: "Verhandlungssicher" } },
  { name: { en: "Turkish", de: "Türkisch" }, level: { en: "Beginner", de: "Anfänger" } },
];

export const certificates: Certificate[] = [
  {
    name: { en: "German language course (A1–B2)", de: "Deutschsprachiger Kurs (A1–B2)" },
    issuer: { en: "Goethe-Institut, Kuala Lumpur", de: "Goethe-Institut, Kuala Lumpur" },
    period: "2023 – 2024",
  },
  {
    name: { en: "Certificate of participation", de: "Teilnahmezertifikat" },
    issuer: { en: "Kangaroo Math Competition, Kuala Lumpur", de: "Kangaroo Math Competition, Kuala Lumpur" },
    period: "2019 – 2020",
  },
  {
    name: { en: "First aid course, certificate of attendance", de: "Teilnahmebescheinigung Erste-Hilfe-Kurs" },
    issuer: { en: "IMAS Malaysia", de: "IMAS Malaysia" },
  },
];
