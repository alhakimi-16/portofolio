/** A piece of text in both site languages. */
export type L<T = string> = { en: T; de: T };

/** Generated chart style used as a project's cover when it has no screenshot. */
export type ArtKind = "bars" | "network" | "line" | "heatmap" | "scatter" | "curve";

export type ProjectCategory = "ml" | "nlp" | "cv" | "analytics" | "data";

export interface Project {
  /** URL-safe id, also seeds the generated cover art. */
  slug: string;
  title: string;
  year: string;
  category: ProjectCategory;
  /** One line shown in the list. */
  summary: L;
  problem: L;
  approach: L;
  /** 2–3 headline numbers. Keep them honest and specific. */
  results: { value: string | L; label: L }[];
  stack: string[];
  links?: { label: string | L; href: string }[];
  /** Style of the generated cover art. */
  art: ArtKind;
  /** Optional screenshot in /public, e.g. "/projects/churn-radar.jpg" (16:10 works best). */
  image?: string;
}

export interface Role {
  company: string;
  role: L;
  type: L;
  location: L;
  /** "YYYY-MM" */
  start: string;
  /** "YYYY-MM", or leave out for a current position. */
  end?: string;
  bullets: L<string[]>;
  stack?: string[];
  url?: string;
}

export interface Education {
  degree: L;
  school: string;
  location: L;
  start: string;
  end?: string;
  note?: L;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  url?: string;
}

export type SkillGroup = "code" | "ml" | "genai" | "data" | "ops" | "viz";

export interface Skill {
  name: string;
  group: SkillGroup;
  /** 1 = basics … 5 = expert */
  level: 1 | 2 | 3 | 4 | 5;
}

export interface SpokenLanguage {
  name: L;
  /** e.g. "C1" or "Native" */
  level: L;
  /** 0–1, drives the bar length */
  value: number;
}

export interface Social {
  label: string;
  href: string;
  /** short handle shown next to the label */
  handle?: string;
}
