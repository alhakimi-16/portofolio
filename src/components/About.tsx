import { Plane } from "lucide-react";
import type { SiteContent } from "@/content";
import type { Hue } from "@/content/types";
import type { Dictionary } from "@/i18n/ui";
import { hues, vars } from "@/lib/utils";
import { Icon } from "./Icon";
import { Section } from "./Section";

/** Marker colours in order. */
const markers: Hue[] = ["sun", "violet", "blue"];

/** Turns "==phrase==" into a marker highlight that sweeps in when the text appears. */
function Highlights({ text, offset = 0 }: { text: string; offset?: number }) {
  let n = offset;
  return text.split(/(==[^=]+==)/).map((part, i) => {
    if (!part.startsWith("==")) return part;
    const k = n++;
    return (
      <mark
        key={i}
        className="marker"
        data-hue={markers[k % markers.length]}
        style={vars({ "--d": `${450 + (k - offset) * 200}ms` })}
      >
        {part.slice(2, -2)}
      </mark>
    );
  });
}

/** Tilt of each passport stamp. */
const tilts = ["-7deg", "4deg", "-3deg"];

/** The countries I have lived in, landing like passport stamps, with one line about adapting. */
function Stamps({ countries, line }: { countries: SiteContent["countries"]; line: string }) {
  const [lead, punch] = line.split(/:\s*/);
  return (
    <div data-reveal className="my-9">
      <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-3">
        {countries.map((country, i) => (
          <li key={country.name} className="flex items-center gap-2.5">
            {i > 0 && <Plane aria-hidden className="hidden size-[1.1rem] rotate-45 text-muted sm:block" />}
            <span
              data-hue={country.hue}
              className="stamp-in inline-block rounded-lg border-2 border-dashed border-hue bg-hue/10 px-2.5 py-1.5 font-display text-xs font-extrabold tracking-[0.14em] text-hue-ink uppercase outline-2 outline-offset-[3px] outline-hue/35 sm:px-4 sm:text-base"
              style={{ rotate: tilts[i % tilts.length], ...vars({ "--d": `${250 + i * 280}ms` }) }}
            >
              {country.name}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-5 font-display text-xl leading-snug font-bold tracking-tight text-fg sm:text-2xl">
        {punch ? (
          <>
            {lead}:{" "}
            <span data-hue="violet" className="whitespace-nowrap text-hue-ink">
              {punch}
            </span>
          </>
        ) : (
          line
        )}
      </p>
    </div>
  );
}

export function About({ content, t }: { content: SiteContent; t: Dictionary }) {
  const introMarks = (content.about.intro.match(/==/g)?.length ?? 0) / 2;

  return (
    <Section id="about" nav="about" hue="blue" {...t.sections.about}>
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div className="text-lg leading-[1.75] sm:text-xl">
          <p data-reveal>
            <Highlights text={content.about.intro} />
          </p>
          <Stamps countries={content.countries} line={content.adaptLine} />
          <p data-reveal>
            <Highlights text={content.about.body} offset={introMarks} />
          </p>
        </div>
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
