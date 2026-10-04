import { ArrowUpRight, Mail } from "lucide-react";
import type { SiteContent } from "@/content";
import type { Dictionary } from "@/i18n/ui";
import { CopyEmail } from "./CopyEmail";
import { LinkedInIcon } from "./Icon";
import { Emphasis } from "./SheetSection";

export function Contact({ content, t }: { content: SiteContent; t: Dictionary }) {
  const { person } = content;
  const { eyebrow, title } = t.sections.contact;
  const [local, domain] = person.email.split("@");
  const linkedinText = person.linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  const [linkedinHost, linkedinPath] = linkedinText.split("/in/");

  return (
    <section
      id="contact"
      data-sheet="contact"
      aria-labelledby="contact-title"
      className="grid grid-cols-12 px-4 py-14 sm:px-6 lg:px-0 lg:py-20"
    >
      <div data-range className="range col-span-12 lg:col-span-10 lg:col-start-2">
        <div className="p-6 sm:p-10">
          <p className="cell-label">{eyebrow}</p>
          <h2 id="contact-title" className="mt-2 display text-[2.75rem] leading-none text-ink sm:text-[4rem]">
            <Emphasis text={title} hue="mint" />
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{t.contact.text}</p>
        </div>

        {/* on phones each label sits above its value */}
        <table className="w-full border-t border-line text-left text-sm max-sm:block">
          <tbody className="max-sm:block">
            <tr className="border-b border-line max-sm:block">
              <th scope="row" className="bg-head px-4 py-2.5 align-top cell-label max-sm:block sm:w-32 sm:px-6 sm:py-4">
                {t.tables.email}
              </th>
              <td className="px-4 py-4 max-sm:block sm:px-6">
                <p className="font-mono text-base text-ink select-all sm:text-lg">
                  {local}@<wbr />
                  {domain}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <CopyEmail email={person.email} label={t.contact.copy} doneLabel={t.contact.copied} />
                  <a
                    href={`mailto:${person.email}`}
                    className="inline-flex items-center gap-2 bg-sel px-3.5 py-2 text-sm font-semibold text-on-sel transition-colors hover:bg-sel-ink"
                  >
                    <Mail aria-hidden className="size-4" />
                    {t.contact.write}
                  </a>
                </div>
              </td>
            </tr>
            <tr className="max-sm:block">
              <th scope="row" className="bg-head px-4 py-2.5 align-top cell-label max-sm:block sm:px-6 sm:py-4">
                {t.contact.linkedin}
              </th>
              <td className="px-4 py-4 max-sm:block sm:px-6">
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex max-w-full items-center gap-2 font-mono text-sel-ink underline underline-offset-4 hover:no-underline"
                >
                  <LinkedInIcon className="size-4 shrink-0" />
                  <span className="min-w-0 [overflow-wrap:anywhere]">
                    {linkedinPath ? (
                      <>
                        {linkedinHost}/in/
                        <wbr />
                        {linkedinPath}
                      </>
                    ) : (
                      linkedinText
                    )}
                  </span>
                  <ArrowUpRight aria-hidden className="size-4 shrink-0" />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
