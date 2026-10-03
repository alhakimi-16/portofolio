import Image from "next/image";
import { notFound } from "next/navigation";
import { ProjectArt } from "@/components/canvas/ProjectArt";
import { Footer } from "@/components/layout/Footer";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { Work } from "@/components/sections/Work";
import { Marquee } from "@/components/ui/Marquee";
import { getContent } from "@/content";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/ui";
import { siteUrl } from "@/lib/site";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const t = getDictionary(locale);
  const content = getContent(locale);
  const { person } = content;

  // Project covers are rendered here on the server and handed to the interactive list.
  const covers = Object.fromEntries(
    content.projects.map((project) => [
      project.slug,
      project.image ? (
        <div className="relative size-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 52rem, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <ProjectArt kind={project.art} seed={project.slug} />
      ),
    ]),
  );

  const tickerItems = content.skills.filter((skill) => skill.level >= 4).map((skill) => skill.name);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.role,
    url: `${siteUrl}/${locale}`,
    address: { "@type": "PostalAddress", addressCountry: person.location },
    sameAs: content.socials.map((social) => social.href),
    knowsAbout: content.skills.map((skill) => skill.name),
    knowsLanguage: content.languages.map((language) => language.name),
  };

  return (
    <>
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero person={person} />
        <Marquee items={tickerItems} />
        <About content={content} t={t} />
        <Work projects={content.projects} categories={content.categories} covers={covers} />
        <Experience roles={content.experience} since={content.experienceSince} />
        <Skills skills={content.skills} groups={content.skillGroups} languages={content.languages} />
        <Education content={content} t={t} />
        <Contact person={person} socials={content.socials} />
      </main>
      <Footer
        name={person.name}
        lastName={person.lastName}
        timezone={person.timezone}
        year={new Date().getFullYear()}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
