import type { Locale } from "@/i18n/config";
import * as data from "./profile";

/** Keeps a " · " separator on the line before it, so a wrapped line never starts with a dot. */
const keepDots = (text: string) => text.replaceAll(" · ", "\u00a0· ");

/**
 * Long German words get optional hyphens (\u00ad), so in narrow boxes they break at a
 * sensible point ("Betriebs-wirtschaftslehre") instead of anywhere. Invisible otherwise.
 */
const breakPoints: [string, string][] = [
  ["Betriebswirtschaftslehre", "Betriebs\u00adwirtschafts\u00adlehre"],
  ["Informationssysteme", "Informations\u00adsysteme"],
  ["Finanzverantwortlicher", "Finanz\u00adverantwortlicher"],
  ["Wirtschaftsinformatik", "Wirtschafts\u00adinformatik"],
  ["Werkstudentenstelle", "Werkstudenten\u00adstelle"],
];
const soft = (text: string) => breakPoints.reduce((out, [word, split]) => out.replaceAll(word, split), text);

/** All content of the site, resolved to one language. */
export function getContent(locale: Locale) {
  const { person } = data;
  return {
    person: {
      firstName: person.firstName,
      lastName: person.lastName,
      name: `${person.firstName} ${person.lastName}`,
      initials: person.initials,
      headline: person.headline[locale],
      school: person.school,
      intro: person.intro[locale],
      availability: person.availability[locale],
      email: person.email,
      linkedin: person.linkedin,
      photo: person.photo,
    },
    // the visitor's own language first
    greetings: [...data.greetings].sort((a, b) => Number(b.lang === locale) - Number(a.lang === locale)),
    stickers: data.stickers.map((sticker) => ({ text: sticker.text[locale], hue: sticker.hue })),
    marquee: data.marquee.map((item) => ({ text: item.text[locale], hue: item.hue })),
    stats: data.stats.map((stat) => ({
      value: stat.value,
      decimals: stat.decimals ?? 0,
      suffix: stat.suffix?.[locale] ?? "",
      label: stat.label[locale],
      hue: stat.hue,
    })),
    about: {
      intro: data.about.intro[locale].replaceAll("{age}", String(person.age)),
      body: data.about.body[locale].replaceAll("{age}", String(person.age)),
    },
    countries: data.countries.map((country) => ({ name: country.name[locale], hue: country.hue })),
    adaptLine: data.adaptLine[locale],
    facts: data.facts.map((fact) => ({
      label: fact.label[locale],
      value: soft(keepDots(fact.value[locale])),
      icon: fact.icon,
    })),
    experience: data.experience.map((role) => ({
      title: soft(role.title[locale]),
      org: role.org,
      orgDetail: role.orgDetail?.[locale],
      kind: role.kind?.[locale],
      period: role.period[locale],
      bullets: role.bullets[locale],
      tags: role.tags?.[locale] ?? [],
      art: role.art,
    })),
    skills: {
      technical: data.skills.technical.map((skill) => ({
        name: soft(skill.name[locale]),
        note: skill.note?.[locale],
        icon: skill.icon,
      })),
      personal: data.skills.personal.map((skill) => ({
        name: soft(skill.name[locale]),
        note: skill.note?.[locale],
        icon: skill.icon,
      })),
    },
    languages: data.languages.map((language) => ({
      name: language.name[locale],
      level: language.level[locale],
      hue: language.hue,
    })),
    projects: data.projects.map((project) => ({
      title: project.title[locale],
      description: project.description[locale],
      status: project.status?.[locale],
      tech: project.tech,
      link: project.link,
      repo: project.repo,
      year: project.year,
    })),
    courses: data.courses.map((course) => ({
      title: course.title[locale],
      provider: course.provider,
      year: course.year,
      certificate: course.certificate,
      topics: course.topics?.[locale] ?? [],
      inProgress: course.inProgress ?? false,
    })),
  };
}

export type SiteContent = ReturnType<typeof getContent>;
