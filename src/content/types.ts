/** A piece of text in both site languages. */
export type L<T = string> = { en: T; de: T };

/** Accent colours of the design (see globals.css). */
export type Hue = "blue" | "mint" | "coral" | "sun";

export type IconName =
  | "database"
  | "cup"
  | "chart"
  | "document"
  | "flag"
  | "bulb"
  | "checklist"
  | "aid"
  | "medal"
  | "speech"
  | "sigma"
  | "cap"
  | "briefcase"
  | "search"
  | "globe";

export interface Role {
  title: L;
  company: string;
  location: string;
  /** shown as written, e.g. "Since 2025" / "Seit 2025" */
  period: L;
  bullets: L<string[]>;
  tags?: L<string[]>;
}

export interface Stop {
  period: L;
  place: L;
  title: L;
  detail: L;
  hue: Hue;
}

export interface Stat {
  value: number;
  decimals: number;
  suffix?: L;
  /** shown as an ordinal number: 3rd / 3. */
  ordinal?: boolean;
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

export interface Award {
  name: L;
  issuer: L;
  period?: string;
  icon: IconName;
  hue: Hue;
}
