import { ArrowUpRight } from "lucide-react";
import type { SiteContent } from "@/content";
import type { Dictionary } from "@/i18n/ui";
import { vars } from "@/lib/utils";
import { Chapter } from "./Chapter";
import { CopyEmail } from "./CopyEmail";
import { LinkedInIcon } from "./Icon";

const entry =
  "grid gap-x-8 gap-y-3 border-b border-rule py-6 sm:grid-cols-[8rem_minmax(0,1fr)] sm:items-baseline lg:py-8";

export function Contact({ content, t }: { content: SiteContent; t: Dictionary }) {
  const { person } = content;
  const [local, domain] = person.email.split("@");
  const linkedinText = person.linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  const [linkedinHost, linkedinPath] = linkedinText.split("/in/");

  return (
    <Chapter id="contact" {...t.sections.contact} titleClassName="text-[clamp(3rem,10.5vw,8.5rem)] leading-[0.9]">
      <p
        data-reveal
        className="max-w-[36ch] font-serif text-[clamp(1.25rem,2vw,1.625rem)] leading-[1.4] text-ink"
        style={vars({ "--d": "100ms" })}
      >
        {t.contact.text}
      </p>

      <dl className="mt-12 border-t border-ink lg:mt-16">
        <div data-reveal className={entry}>
          <dt className="label text-muted">{t.contact.email}</dt>
          <dd className="min-w-0">
            <a
              href={`mailto:${person.email}`}
              className="group inline-flex max-w-full items-baseline gap-3 font-serif text-[clamp(1.375rem,4.2vw,3rem)] leading-tight text-ink"
            >
              <span className="min-w-0 link-line">
                {local}@<wbr />
                {domain}
              </span>
              <ArrowUpRight
                aria-hidden
                className="size-[0.6em] shrink-0 self-center text-blue-ink transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
            <div className="mt-5">
              <CopyEmail email={person.email} label={t.contact.copy} doneLabel={t.contact.copied} />
            </div>
          </dd>
        </div>
        <div data-reveal className={entry} style={vars({ "--d": "120ms" })}>
          <dt className="label text-muted">{t.contact.linkedin}</dt>
          <dd className="min-w-0">
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex max-w-full items-center gap-3 font-serif text-[clamp(1.125rem,1.8vw,1.5rem)] leading-snug text-ink"
            >
              <LinkedInIcon className="size-[0.9em] shrink-0 text-blue-ink" />
              <span className="min-w-0 link-line [overflow-wrap:anywhere]">
                {linkedinPath ? (
                  <>
                    {linkedinHost}/in/
                    <wbr />
                    <span className="min-[360px]:whitespace-nowrap">{linkedinPath}</span>
                  </>
                ) : (
                  linkedinText
                )}
              </span>
              <ArrowUpRight
                aria-hidden
                className="size-[0.8em] shrink-0 text-blue-ink transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </dd>
        </div>
      </dl>
    </Chapter>
  );
}
