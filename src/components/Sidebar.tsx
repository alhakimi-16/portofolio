import type { SiteContent } from "@/content";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/ui";
import { sectionIds } from "@/lib/site";
import { ActiveNav } from "./ActiveNav";
import { Avatar } from "./Avatar";
import { LinkedInIcon, MailIcon } from "./Icons";
import { LangSwitch } from "./LangSwitch";

export function Sidebar({ person, t, locale }: { person: SiteContent["person"]; t: Dictionary; locale: Locale }) {
  const nav = sectionIds.map((id) => ({ id, label: t.nav[id] }));

  return (
    <header className="sidebar rise lg:flex lg:w-[44%] lg:flex-col lg:justify-between lg:self-start lg:py-16">
      <div>
        <Avatar photo={person.photo} initials={person.initials} name={person.name} />
        <h1 className="mt-7 font-serif text-[2.75rem] leading-[1.05] font-medium tracking-[-0.015em] sm:text-[3.25rem]">
          {person.name}
        </h1>
        <p className="mt-3 text-lg font-medium text-fg">
          {person.headline}{" "}
          <span className="whitespace-nowrap">
            <span className="text-muted">·</span> {person.school}
          </span>
        </p>
        <p className="mt-4 max-w-sm leading-relaxed">{person.tagline}</p>
        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-[0.8125rem] text-fg">
          <span aria-hidden className="size-1.5 rounded-full bg-ok" />
          {person.availability}
        </p>
        <ActiveNav items={nav} label={t.header.sections} />
      </div>

      <div className="mt-8 flex items-center gap-5">
        <a
          href={`mailto:${person.email}`}
          aria-label={t.header.email}
          title={person.email}
          className="text-muted transition-colors hover:text-accent"
        >
          <MailIcon />
        </a>
        <a
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.contact.linkedin}
          title={t.contact.linkedin}
          className="text-muted transition-colors hover:text-accent"
        >
          <LinkedInIcon />
        </a>
        <span aria-hidden className="h-4 w-px bg-line" />
        <LangSwitch locale={locale} label={t.header.language} />
      </div>
    </header>
  );
}
