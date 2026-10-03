import { ArrowUpRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SiteContent } from "@/content";
import type { Dictionary } from "@/i18n/ui";

export function Education({ content, t }: { content: SiteContent; t: Dictionary }) {
  return (
    <Reveal as="section" id="education" aria-labelledby="education-title" className="gutter py-24 md:py-36">
      <SectionHeading
        id="education-title"
        index="05"
        label={t.education.label}
        figure={t.education.figure}
        title={t.education.title}
      />

      <div className="mt-16 grid grid-cols-12 gap-x-5 gap-y-16 md:mt-24">
        <div className="col-span-12 lg:col-span-7">
          <h3 data-reveal className="label text-muted">
            {t.education.education}
          </h3>
          <ul className="mt-4 border-t border-line">
            {content.education.map((entry) => (
              <li
                key={`${entry.degree}-${entry.period}`}
                data-reveal
                className="grid gap-x-6 gap-y-2 border-b border-line py-7 sm:grid-cols-[1fr_auto]"
              >
                <div>
                  <p className="text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight font-semibold tracking-[-0.03em]">
                    {entry.degree}
                  </p>
                  <p className="mt-1.5 text-muted">
                    {entry.school} · {entry.location}
                  </p>
                  {entry.note && <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed">{entry.note}</p>}
                </div>
                <p className="order-first label text-muted tabular sm:order-none sm:pt-2 sm:text-right">
                  {entry.period}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <h3 data-reveal className="label text-muted">
            {t.education.certifications}
          </h3>
          <ul className="mt-4 border-t border-line">
            {content.certifications.map((cert) => {
              const body = (
                <>
                  <span>
                    <span className="block leading-snug">{cert.name}</span>
                    <span className="mt-1.5 block label text-muted">
                      {cert.issuer} · {cert.year}
                    </span>
                  </span>
                  {cert.url && (
                    <ArrowUpRight className="mt-1 size-3.5 shrink-0 transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  )}
                </>
              );
              return (
                <li key={cert.name} data-reveal className="border-b border-line">
                  {cert.url ? (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex justify-between gap-4 py-5 transition-colors hover:text-accent"
                    >
                      {body}
                    </a>
                  ) : (
                    <div className="flex justify-between gap-4 py-5">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
