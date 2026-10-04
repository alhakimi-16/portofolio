import { getContent } from "@/content";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/ui";
import { siteUrl } from "@/lib/site";
import { CopyEmail } from "./CopyEmail";
import { Entry } from "./Entry";
import { ArrowUpRight, LinkedInIcon } from "./Icons";
import { Section } from "./Section";
import { Sidebar } from "./Sidebar";
import { Spotlight } from "./Spotlight";

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 grid gap-2 text-[0.9375rem] leading-relaxed">
      {items.map((item) => (
        <li
          key={item}
          className="relative pl-5 before:absolute before:top-[0.8em] before:left-0 before:h-px before:w-2.5 before:bg-muted/70"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className="rounded-full bg-accent-soft px-3 py-1 text-xs leading-5 font-medium text-accent">
          {item}
        </li>
      ))}
    </ul>
  );
}

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
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        {t.header.skip}
      </a>
      <Spotlight />

      <div className="relative z-10 mx-auto min-h-screen max-w-6xl px-6 py-14 md:px-12 md:py-20 lg:px-16 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-16">
          <Sidebar person={person} t={t} locale={locale} />

          <main id="content" className="pt-20 lg:w-[56%] lg:py-16">
            <Section id="about" title={t.sections.about} delay={0.08}>
              <p className="max-w-prose text-[1.0625rem] leading-relaxed">{content.about}</p>
            </Section>

            <Section id="experience" title={t.sections.experience} delay={0.16}>
              <ol className="group/list grid gap-12">
                {content.experience.map((role) => (
                  <Entry
                    key={`${role.company}-${role.period}`}
                    period={role.period}
                    title={role.title}
                    place={role.company}
                    meta={role.location}
                  >
                    <Bullets items={role.bullets} />
                    {role.tags.length > 0 && <Chips items={role.tags} />}
                  </Entry>
                ))}
              </ol>
            </Section>

            <Section id="education" title={t.sections.education} delay={0.24}>
              <ol className="group/list grid gap-12">
                {content.education.map((entry) => (
                  <Entry key={entry.degree} period={entry.period} title={entry.degree} place={entry.school}>
                    {entry.note && <p className="mt-2 text-[0.9375rem] leading-relaxed">{entry.note}</p>}
                  </Entry>
                ))}
              </ol>
            </Section>

            <Section id="skills" title={t.sections.skills}>
              <div className="grid gap-8">
                <div>
                  <h3 className="text-sm font-medium">{t.skills.technical}</h3>
                  <Chips items={content.skills.technical} />
                </div>
                <div>
                  <h3 className="text-sm font-medium">{t.skills.personal}</h3>
                  <Chips items={content.skills.personal} />
                </div>
              </div>
              <div className="mt-12">
                <h3 className="text-sm font-medium">{t.skills.languages}</h3>
                <dl className="mt-4 divide-y divide-line border-y border-line">
                  {content.languages.map((language) => (
                    <div key={language.name} className="flex items-baseline justify-between gap-4 py-3">
                      <dt className="text-fg">{language.name}</dt>
                      <dd className="text-sm">{language.level}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Section>

            <Section id="certificates" title={t.sections.certificates}>
              <ul className="divide-y divide-line border-y border-line">
                {content.certificates.map((cert) => (
                  <li
                    key={cert.name}
                    className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <div>
                      <p className="text-fg">{cert.name}</p>
                      <p className="text-sm">{cert.issuer}</p>
                    </div>
                    {cert.period && (
                      <p className="shrink-0 text-xs font-semibold tracking-[0.12em] tabular-nums">{cert.period}</p>
                    )}
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="contact" title={t.sections.contact}>
              <p className="font-serif text-[2rem] leading-tight text-fg sm:text-[2.5rem]">{t.contact.title}</p>
              <p className="mt-4 max-w-md leading-relaxed">{t.contact.text}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
                <a
                  href={`mailto:${person.email}`}
                  className="text-lg break-all text-fg underline decoration-line underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent sm:text-xl"
                >
                  {person.email}
                </a>
                <CopyEmail email={person.email} label={t.contact.copy} doneLabel={t.contact.copied} />
              </div>
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-fg transition-colors hover:text-accent"
              >
                <LinkedInIcon className="size-4" />
                {t.contact.linkedin}
                <ArrowUpRight />
              </a>
            </Section>

            <footer className="border-t border-line pt-6 pb-2 text-sm">
              © {new Date().getFullYear()} {person.name} · {t.footer.built}
            </footer>
          </main>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
