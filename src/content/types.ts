/** A piece of text in both site languages. */
export type L<T = string> = { en: T; de: T };

export interface Role {
  title: L;
  company: string;
  location: string;
  /** shown as written, e.g. "Since 2025" / "Seit 2025" */
  period: L;
  bullets: L<string[]>;
  tags?: L<string[]>;
  url?: string;
}

export interface Education {
  degree: L;
  school: L;
  period: L;
  note?: L;
}

export interface Certificate {
  name: L;
  issuer: L;
  period?: string;
}

export interface Language {
  name: L;
  level: L;
}
