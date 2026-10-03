"use client";

import { useI18n } from "@/components/providers/I18nProvider";
import { useToast } from "@/components/providers/Toast";
import { Emphasis } from "@/components/ui/Emphasis";
import { ArrowUpRight, Copy } from "@/components/ui/Icons";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SiteContent } from "@/content";
import { copyText } from "@/lib/clipboard";

export function Contact({ person, socials }: { person: SiteContent["person"]; socials: SiteContent["socials"] }) {
  const { t } = useI18n();
  const toast = useToast();

  return (
    <Reveal as="section" id="contact" aria-labelledby="contact-title" className="gutter pt-24 pb-16 md:pt-36">
      <SectionHeading index="06" label={t.contact.label} figure={t.contact.figure} />

      <h2
        id="contact-title"
        data-split
        className="mt-12 max-w-[14ch] display text-[clamp(3.25rem,10vw,10.5rem)] md:mt-20"
      >
        <Emphasis text={t.contact.title} accent />
      </h2>

      <div className="mt-14 grid grid-cols-12 items-end gap-x-5 gap-y-12 md:mt-20">
        <p data-reveal className="col-span-12 max-w-[42ch] text-lg leading-relaxed text-muted md:col-span-6">
          {t.contact.text}
        </p>
        <div data-reveal className="col-span-12 flex md:col-span-6 md:justify-end">
          <Magnetic strength={0.45}>
            <a
              href={`mailto:${person.email}`}
              className="group grid size-40 place-items-center rounded-full bg-accent text-accent-ink transition-transform duration-500 ease-expo hover:scale-105 md:size-52"
            >
              <span data-magnetic-inner className="flex items-center gap-2 text-lg font-medium md:text-xl">
                {t.contact.cta}
                <ArrowUpRight className="size-4 transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-12 gap-x-5 gap-y-10 border-t border-line pt-8">
        <div data-reveal className="col-span-12 md:col-span-7">
          <p className="label text-muted">{t.contact.email}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href={`mailto:${person.email}`}
              className="text-[clamp(1.5rem,3.6vw,3rem)] leading-tight tracking-[-0.03em] break-all underline decoration-line-strong decoration-1 underline-offset-[0.18em] transition-colors hover:decoration-accent"
            >
              {person.email}
            </a>
            <button
              type="button"
              onClick={() => void copyText(person.email).then((ok) => ok && toast(t.contact.copied))}
              data-cursor-label={t.contact.copy}
              className="flex h-9 items-center gap-2 rounded-full border border-line-strong px-3.5 label transition-colors hover:border-fg"
            >
              <Copy className="size-3" />
              {t.contact.copy}
            </button>
          </div>
        </div>
        <div data-reveal className="col-span-12 md:col-span-4 md:col-start-9">
          <p className="label text-muted">{t.contact.elsewhere}</p>
          <ul className="mt-3 border-t border-line">
            {socials.map((social) => (
              <li key={social.href} className="border-b border-line">
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-3.5 transition-colors hover:text-accent"
                >
                  <span className="text-lg">{social.label}</span>
                  <span className="flex items-center gap-2 label text-muted group-hover:text-accent">
                    {social.handle}
                    <ArrowUpRight className="size-3 transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              </li>
            ))}
            {person.cv && (
              <li className="border-b border-line">
                <a
                  href={person.cv}
                  target="_blank"
                  rel="noopener"
                  className="group flex items-center justify-between gap-4 py-3.5 transition-colors hover:text-accent"
                >
                  <span className="text-lg">{t.hero.downloadCv}</span>
                  <span className="label text-muted group-hover:text-accent">PDF ↓</span>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
