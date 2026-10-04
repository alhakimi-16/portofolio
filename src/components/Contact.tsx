import { ArrowUpRight, Mail } from "lucide-react";
import type { SiteContent } from "@/content";
import type { Dictionary } from "@/i18n/ui";
import { vars } from "@/lib/utils";
import { Blobs } from "./Blobs";
import { CopyEmail } from "./CopyEmail";
import { LinkedInIcon } from "./Icon";
import { Magnetic } from "./Magnetic";
import { Emphasis } from "./Section";

const button =
  "inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold transition-[background-color,border-color,color] duration-300";

export function Contact({ content, t }: { content: SiteContent; t: Dictionary }) {
  const { person } = content;
  const { eyebrow, title } = t.sections.contact;
  const [local, domain] = person.email.split("@");

  return (
    <section
      id="contact"
      data-nav="contact"
      data-hue="blue"
      aria-labelledby="contact-title"
      className="px-3 py-16 sm:px-5 sm:py-24"
    >
      <div
        data-reveal="scale"
        data-hue="sun"
        // on the dark panel the bright accent reads better than the darker "ink" shade
        style={vars({ "--hue-ink": "var(--hue)" })}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-panel px-6 py-14 text-white/75 sm:rounded-[2.5rem] sm:px-12 sm:py-20 md:px-16"
      >
        <Blobs className="opacity-70" />
        <div className="relative max-w-3xl">
          <p className="flex items-center gap-2.5 text-sm font-bold tracking-[0.14em] text-white/70 uppercase">
            <span aria-hidden className="size-2 rounded-full bg-hue" />
            {eyebrow}
          </p>
          <h2
            id="contact-title"
            className="mt-3 text-5xl leading-[1.02] font-extrabold tracking-[-0.035em] text-white sm:text-7xl"
          >
            <Emphasis text={title} />
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed">{t.contact.text}</p>

          <a
            href={`mailto:${person.email}`}
            className="mt-10 inline-block font-display text-[clamp(1.3rem,5.6vw,2.25rem)] font-bold tracking-tight wrap-anywhere text-white decoration-hue decoration-[3px] underline-offset-[10px] hover:underline"
          >
            {local}@<wbr />
            {domain}
          </a>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href={`mailto:${person.email}`} className={`${button} bg-white text-[#121a33] hover:bg-hue`}>
                <Mail aria-hidden className="size-4" />
                {t.contact.write}
              </a>
            </Magnetic>
            <CopyEmail
              email={person.email}
              label={t.contact.copy}
              doneLabel={t.contact.copied}
              className={`${button} border border-white/25 text-white hover:border-white/60 hover:bg-white/10`}
            />
            <Magnetic>
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`${button} border border-white/25 text-white hover:border-white/60 hover:bg-white/10`}
              >
                <LinkedInIcon className="size-4" />
                {t.contact.linkedin}
                <ArrowUpRight aria-hidden className="size-4" />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
