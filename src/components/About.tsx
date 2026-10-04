import type { SiteContent } from "@/content";
import type { Dictionary } from "@/i18n/ui";
import { hues, vars } from "@/lib/utils";
import { Icon } from "./Icon";
import { Section } from "./Section";

/** Turns "==phrase==" into a marker highlight that sweeps in when the text appears. */
function Highlights({ text }: { text: string }) {
  let n = 0;
  return text.split(/(==[^=]+==)/).map((part, i) => {
    if (!part.startsWith("==")) return part;
    const k = n++;
    return (
      <mark key={i} className="marker" data-hue={hues[k % hues.length]} style={vars({ "--d": `${450 + k * 200}ms` })}>
        {part.slice(2, -2)}
      </mark>
    );
  });
}

export function About({ content, t }: { content: SiteContent; t: Dictionary }) {
  return (
    <Section id="about" nav="about" hue="blue" {...t.sections.about}>
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <p data-reveal className="text-xl leading-[1.75] sm:text-[1.375rem]">
          <Highlights text={content.about} />
        </p>
        <ul className="grid content-start gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {content.facts.map((fact, i) => (
            <li
              key={fact.label}
              data-reveal
              data-hue={hues[i % hues.length]}
              style={vars({ "--d": `${120 + i * 90}ms` })}
            >
              <div className="flex h-full items-center gap-4 card p-4 transition-[translate,border-color] duration-300 hover:-translate-y-0.5 hover:border-hue">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-hue/15 text-hue-ink">
                  <Icon name={fact.icon} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold tracking-[0.12em] uppercase">{fact.label}</p>
                  <p className="leading-snug font-medium text-fg">{fact.value}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
