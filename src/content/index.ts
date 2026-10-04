import type { Locale } from "@/i18n/config";
import * as data from "./profile";

/** All content of the site, resolved to one language. */
export function getContent(locale: Locale) {
  const { person } = data;
  return {
    person: {
      name: person.name,
      initials: person.initials,
      headline: person.headline[locale],
      school: person.school,
      tagline: person.tagline[locale],
      availability: person.availability[locale],
      email: person.email,
      linkedin: person.linkedin,
      photo: person.photo,
    },
    about: data.about[locale],
    experience: data.experience.map((role) => ({
      title: role.title[locale],
      company: role.company,
      location: role.location,
      period: role.period[locale],
      bullets: role.bullets[locale],
      tags: role.tags?.[locale] ?? [],
      url: role.url,
    })),
    education: data.education.map((entry) => ({
      degree: entry.degree[locale],
      school: entry.school[locale],
      period: entry.period[locale],
      note: entry.note?.[locale],
    })),
    skills: { technical: data.skills.technical[locale], personal: data.skills.personal[locale] },
    languages: data.languages.map((language) => ({ name: language.name[locale], level: language.level[locale] })),
    certificates: data.certificates.map((cert) => ({
      name: cert.name[locale],
      issuer: cert.issuer[locale],
      period: cert.period,
    })),
  };
}

export type SiteContent = ReturnType<typeof getContent>;
