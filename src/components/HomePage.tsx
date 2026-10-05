import { getContent } from "@/content";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/ui";
import { navIds, siteUrl } from "@/lib/site";
import { About } from "./About";
import { AtAGlance } from "./AtAGlance";
import { Contact } from "./Contact";
import { Courses } from "./Courses";
import { Experience } from "./Experience";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Marquee } from "./Marquee";
import { Projects } from "./Projects";
import { SiteEffects } from "./SiteEffects";
import { Skills } from "./Skills";

/** Colour of each header link (matches the section). */
const navHues = {
  about: "blue",
  skills: "violet",
  projects: "sun",
  courses: "blue",
  experience: "violet",
  contact: "sun",
} as const;

/** The whole page for one language (shared by the site and the in-chat preview). */
export function HomePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const content = getContent(locale);
  const { person } = content;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.headline,
    affiliation: { "@type": "CollegeOrUniversity", name: person.school },
    url: `${siteUrl}/${locale}`,
    sameAs: [person.linkedin],
    knowsLanguage: content.languages.map((language) => language.name),
  };

  return (
    <>
      <SiteEffects />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        {t.header.skip}
      </a>
      <Header
        items={navIds.map((id) => ({ id, label: t.nav[id], hue: navHues[id] }))}
        locale={locale}
        name={person.name}
        initials={person.initials}
        labels={t.header}
      />

      <main id="content">
        <Hero content={content} t={t}>
          <AtAGlance items={content.atAGlance} locale={locale} />
        </Hero>
        <Marquee items={content.marquee} />
        <About content={content} t={t} />
        <Skills content={content} t={t} />
        <Projects content={content} t={t} />
        <Courses content={content} t={t} />
        <Experience content={content} t={t} />
        <Contact content={content} t={t} />
      </main>
      <Footer name={person.name} t={t} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
