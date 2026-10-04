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
  | "chart"
  | "network"
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

export interface Stop {
  /** small label above the country, e.g. "Today" */
  label: L;
  title: L;
  detail: L;
  hue: Hue;
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
  /** 0–1, drives the bar */
  value: number;
  /** "hello" in that language */
  hello: string;
  lang: string;
  dir?: "rtl";
  hue: Hue;
}
