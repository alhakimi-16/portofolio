import { getContent } from "@/content";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/ui";
import { navIds, siteUrl } from "@/lib/site";
import { About } from "./About";
import { Contact } from "./Contact";
import { Courses } from "./Courses";
import { Experience } from "./Experience";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { Masthead } from "./Masthead";
import { Projects } from "./Projects";
import { SiteEffects } from "./SiteEffects";
import { Skills } from "./Skills";

/** The whole page for one language (shared by the site and the in-chat preview). */
export function HomePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const content = getContent(locale);
  const { person } = content;
  const items = navIds.map((id) => ({ id, label: t.nav[id] }));

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
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:label focus:text-paper"
      >
        {t.header.skip}
      </a>
      <Masthead locale={locale} name={person.name} items={items} labels={t.header} />

      <main id="content">
        <Hero content={content} t={t} locale={locale} items={items} />
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
