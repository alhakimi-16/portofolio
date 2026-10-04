import type { Locale } from "@/i18n/config";
import * as data from "./profile";

/** Keeps a " · " separator on the line before it, so a wrapped line never starts with a dot. */
const keepDots = (text: string) => text.replaceAll(" · ", "\u00a0· ");

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
      decimals: stat.decimals,
      suffix: stat.suffix?.[locale] ?? "",
      ordinal: stat.ordinal ?? false,
      label: stat.label[locale],
      hue: stat.hue,
    })),
    about: data.about[locale],
    facts: data.facts.map((fact) => ({
      label: fact.label[locale],
      value: keepDots(fact.value[locale]),
      icon: fact.icon,
    })),
    path: data.path.map((stop) => ({
      period: stop.period[locale],
      place: stop.place[locale],
      title: keepDots(stop.title[locale]),
      detail: keepDots(stop.detail[locale]),
      hue: stop.hue,
    })),
    experience: data.experience.map((role) => ({
      title: role.title[locale],
      company: role.company,
      location: role.location,
      period: role.period[locale],
      bullets: role.bullets[locale],
      tags: role.tags?.[locale] ?? [],
    })),
    skills: {
      technical: data.skills.technical.map((skill) => ({
        name: skill.name[locale],
        note: skill.note?.[locale],
        icon: skill.icon,
      })),
      personal: data.skills.personal.map((skill) => ({
        name: skill.name[locale],
        note: skill.note?.[locale],
        icon: skill.icon,
      })),
    },
    languages: data.languages.map((language) => ({
      name: language.name[locale],
      level: language.level[locale],
      value: language.value,
      hello: language.hello,
      lang: language.lang,
      dir: language.dir,
      hue: language.hue,
    })),
    awards: data.awards.map((award) => ({
      name: award.name[locale],
      issuer: keepDots(award.issuer[locale]),
      period: award.period,
      icon: award.icon,
      hue: award.hue,
    })),
  };
}

export type SiteContent = ReturnType<typeof getContent>;
