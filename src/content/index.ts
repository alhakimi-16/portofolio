import type { Locale } from "@/i18n/config";
import * as data from "./profile";
import type { ArtKind, L, ProjectCategory, SkillGroup } from "./types";

const text = (value: string | L, locale: Locale) => (typeof value === "string" ? value : value[locale]);

function formatMonth(value: string, locale: Locale) {
  const [year, month] = value.split("-").map(Number);
  return new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, (month || 1) - 1, 1)));
}

function period(start: string, end: string | undefined, locale: Locale, present: string) {
  return `${formatMonth(start, locale)} — ${end ? formatMonth(end, locale) : present}`;
}

const presentLabel: Record<Locale, string> = { en: "Present", de: "Heute" };

/** "2024-04" → 2024.25 (fractional year, used by the timeline chart). Undefined = today. */
function toYear(value?: string) {
  if (!value) {
    const now = new Date();
    return now.getUTCFullYear() + now.getUTCMonth() / 12;
  }
  const [year, month] = value.split("-").map(Number);
  return year + ((month || 1) - 1) / 12;
}

export interface ProjectView {
  slug: string;
  title: string;
  year: string;
  category: ProjectCategory;
  categoryLabel: string;
  summary: string;
  problem: string;
  approach: string;
  results: { value: string; label: string }[];
  stack: string[];
  links: { label: string; href: string }[];
  art: ArtKind;
  image?: string;
}

export interface RoleView {
  company: string;
  role: string;
  type: string;
  location: string;
  period: string;
  current: boolean;
  /** fractional years for the timeline chart */
  from: number;
  to: number;
  bullets: string[];
  stack: string[];
  url?: string;
}

export interface SkillView {
  name: string;
  group: SkillGroup;
  level: number;
}

export function getContent(locale: Locale) {
  const { person } = data;
  const present = presentLabel[locale];

  const projects: ProjectView[] = data.projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    year: p.year,
    category: p.category,
    categoryLabel: data.categories[p.category][locale],
    summary: p.summary[locale],
    problem: p.problem[locale],
    approach: p.approach[locale],
    results: p.results.map((r) => ({ value: text(r.value, locale), label: r.label[locale] })),
    stack: p.stack,
    links: (p.links ?? []).map((link) => ({ label: text(link.label, locale), href: link.href })),
    art: p.art,
    image: p.image,
  }));

  const experience: RoleView[] = data.experience.map((r) => ({
    company: r.company,
    role: r.role[locale],
    type: r.type[locale],
    location: r.location[locale],
    period: period(r.start, r.end, locale, present),
    current: !r.end,
    from: toYear(r.start),
    to: toYear(r.end),
    bullets: r.bullets[locale],
    stack: r.stack ?? [],
    url: r.url,
  }));

  const firstYear = Math.min(...data.experience.map((r) => Number(r.start.slice(0, 4))));

  return {
    draft: data.draft,
    person: {
      firstName: person.firstName,
      lastName: person.lastName,
      name: `${person.firstName} ${person.lastName}`,
      initials: person.initials,
      role: person.role[locale],
      tagline: person.tagline[locale],
      location: person.location[locale],
      timezone: person.timezone,
      availability: person.availability[locale],
      email: person.email,
      portrait: person.portrait,
      cv: person.cv[locale],
    },
    socials: data.socials,
    about: {
      statement: data.about.statement[locale],
      paragraphs: data.about.paragraphs[locale],
      facts: {
        based: person.location[locale],
        focus: data.about.facts.focus[locale],
        currently: data.about.facts.currently[locale],
        languages: data.languages.map((l) => l.name[locale]).join(", "),
        openTo: data.about.facts.openTo[locale],
      },
      metrics: data.about.metrics.map((m) => ({ value: m.value, suffix: m.suffix, label: m.label[locale] })),
    },
    projects,
    categories: (Object.keys(data.categories) as ProjectCategory[])
      .filter((key) => data.projects.some((p) => p.category === key))
      .map((key) => ({ key, label: data.categories[key][locale] })),
    experience,
    experienceSince: Number.isFinite(firstYear) ? firstYear : undefined,
    education: data.education.map((e) => ({
      degree: e.degree[locale],
      school: e.school,
      location: e.location[locale],
      period: period(e.start, e.end, locale, present),
      note: e.note?.[locale],
    })),
    certifications: data.certifications,
    skills: data.skills.map((s): SkillView => ({ name: s.name, group: s.group, level: s.level })),
    skillGroups: (Object.keys(data.skillGroups) as SkillGroup[]).map((key) => ({
      key,
      label: data.skillGroups[key][locale],
    })),
    languages: data.languages.map((l) => ({ name: l.name[locale], level: l.level[locale], value: l.value })),
  };
}

export type SiteContent = ReturnType<typeof getContent>;
