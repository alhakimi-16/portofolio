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
    marquee: data.marquee.map((item) => ({ text: item.text[locale], hue: item.hue })),
    atAGlance: data.atAGlance.map((item) => ({
      value: soft(item.value[locale]),
      count: item.count,
      label: keepDots(item.label[locale]),
      icon: item.icon,
      hue: item.hue,
    })),
    about: {
      lead: data.about.lead[locale],
      chapters: data.about.chapters.map((chapter) => ({
        title: chapter.title[locale],
        text: chapter.text[locale],
        icon: chapter.icon,
        hue: chapter.hue,
      })),
    },
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
