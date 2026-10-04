/** A piece of text in both site languages. */
export type L<T = string> = { en: T; de: T };

/**
 * Accent colours of the design (see globals.css): blue, yellow ("sun") and light purple
 * ("violet") carry the page; pastel green ("mint") is only a small extra.
 */
export type Hue = "blue" | "violet" | "sun" | "mint";

export type IconName =
  | "database"
  | "cup"
  | "sigma"
  | "business"
  | "network"
  | "report"
  | "shield"
  | "document"
  | "users"
  | "clock"
  | "flag"
  | "bulb"
  | "checklist"
  | "aid"
  | "cap"
  | "briefcase"
  | "handshake"
  | "search";

export interface Role {
  title: L;
  org: string;
  /** shown after the organisation, e.g. the city or the full name */
  orgDetail?: L;
  /** e.g. "Volunteer" */
  kind?: L;
  /** shown as written, e.g. "Since 2025" / "Seit 2025" */
  period: L;
  bullets: L<string[]>;
  tags?: L<string[]>;
  /** the small animation next to the role */
  art: "id-scan" | "report";
}

export interface Stat {
  value: number;
  decimals?: number;
  suffix?: L;
  label: L;
  hue: Hue;
}

export interface Skill {
  name: L;
  note?: L;
  icon: IconName;
}

export interface Language {
  name: L;
  level: L;
  hue: Hue;
}

/** A country I have lived in (shown as a passport stamp in the about section). */
export interface Country {
  name: L;
  hue: Hue;
}

export interface Project {
  title: L;
  description: L;
  /** e.g. "In progress" / "In Arbeit" */
  status?: L;
  /** languages and tools, e.g. ["Java", "SQL"] */
  tech: string[];
  /** where the finished project can be tried out */
  link?: string;
  /** where the code is, e.g. a GitHub repository */
  repo?: string;
  year?: string;
}

export interface Course {
  title: L;
  /** e.g. "Coursera", "Udemy", "LinkedIn Learning" */
  provider: string;
  year?: string;
  /** link to the certificate */
  certificate?: string;
  /** what the course covered */
  topics?: L<string[]>;
  /** still working through it */
  inProgress?: boolean;
}
