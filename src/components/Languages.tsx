import type { SiteContent } from "@/content";
import type { Dictionary } from "@/i18n/ui";
import { cn, vars } from "@/lib/utils";
import { Section } from "./Section";

export function Languages({ content, t }: { content: SiteContent; t: Dictionary }) {
  return (
    <Section id="languages" nav="skills" hue="mint" className="pt-4 sm:pt-8" {...t.sections.languages}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {content.languages.map((language, i) => (
          <li key={language.lang} data-reveal data-hue={language.hue} style={vars({ "--d": `${i * 90}ms` })}>
            <div className="group relative h-full overflow-hidden card p-6 transition-[translate,rotate,border-color] duration-300 hover:-translate-y-1.5 hover:-rotate-1 hover:border-hue">
              <span
                aria-hidden
                className="absolute -top-12 -right-12 size-36 rounded-full bg-hue/15 transition-transform duration-500 group-hover:scale-125"
              />
              <p
                lang={language.lang}
                dir={language.dir}
                className={cn(
                  "relative text-left text-[2.5rem] leading-none font-extrabold text-hue-ink transition-transform duration-300 group-hover:scale-110",
                  language.dir === "rtl" ? "origin-left" : "origin-left font-display tracking-tight",
                )}
              >
                {language.hello}
              </p>
              <h3 className="relative mt-10 text-lg font-bold">{language.name}</h3>
              <p className="relative text-sm">{language.level}</p>
              <div aria-hidden className="relative mt-4 h-2 overflow-hidden rounded-full bg-hue/15">
                <div
                  className="level h-full rounded-full bg-hue"
                  style={vars({ "--v": language.value, "--d": `${300 + i * 120}ms` })}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
