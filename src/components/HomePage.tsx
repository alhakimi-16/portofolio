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
import { Projects } from "./Projects";
import { RowGutter } from "./RowGutter";
import { SheetEffects } from "./SheetEffects";
import { SheetTabs } from "./SheetTabs";
import { SiteEffects } from "./SiteEffects";
import { Skills } from "./Skills";
import { Ticker } from "./Ticker";
import { Toolbar } from "./Toolbar";

/** The whole page for one language (shared by the site and the in-chat preview). */
export function HomePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const content = getContent(locale);
  const { person } = content;
  const file = `${person.firstName.toLowerCase()}-${person.lastName.toLowerCase()}.xlsx`;

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
      <SheetEffects />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-sel focus:px-4 focus:py-2 focus:text-sm focus:text-on-sel"
      >
        {t.header.skip}
      </a>
      <Toolbar
        locale={locale}
        initials={person.initials}
        file={file}
        formulas={t.formulas}
        labels={{ ...t.header, ...t.sheet }}
      />

      <div className="mx-auto max-w-[1240px] pb-11 lg:grid lg:grid-cols-[44px_minmax(0,1fr)] lg:border-x lg:border-line">
        <RowGutter />
        <main id="content" className="min-w-0 sheet">
          <Hero content={content} t={t} locale={locale} />
          <Ticker items={content.marquee} />
          <About content={content} t={t} />
          <Skills content={content} t={t} />
          <Projects content={content} t={t} />
          <Courses content={content} t={t} />
          <Experience content={content} t={t} />
          <Contact content={content} t={t} />
          <Footer name={person.name} t={t} />
        </main>
      </div>

      <SheetTabs
        tabs={[{ id: "top", label: t.sheet.start }, ...navIds.map((id) => ({ id, label: t.nav[id] }))]}
        label={t.sheet.tabs}
        status={person.availability}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
