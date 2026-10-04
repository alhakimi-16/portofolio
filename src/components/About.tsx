import type { SiteContent } from "@/content";
import type { Hue } from "@/content/types";
import type { Dictionary } from "@/i18n/ui";
import { hues, vars } from "@/lib/utils";
import { Icon } from "./Icon";
import { Section } from "./Section";

/** Marker colours, used in turn through the whole text. */
const markers: Hue[] = ["sun", "violet", "blue"];

/** Turns "==phrase==" into a marker highlight that sweeps in when the paragraph appears. */
function Highlights({ text, first }: { text: string; first: number }) {
  let n = first;
  return text.split(/(==[^=]+==)/).map((part, i) => {
    if (!part.startsWith("==")) return part;
    const k = n++;
    return (
      <mark
        key={i}
        className="marker"
        data-hue={markers[k % markers.length]}
        style={vars({ "--d": `${450 + (k - first) * 200}ms` })}
      >
        {part.slice(2, -2)}
      </mark>
    );
  });
}

const countMarks = (text: string) => (text.match(/==/g)?.length ?? 0) / 2;

export function About({ content, t }: { content: SiteContent; t: Dictionary }) {
  // marker colours continue from one paragraph to the next
  const firstMark = content.about.map((_, i) =>
    content.about.slice(0, i).reduce((sum, paragraph) => sum + countMarks(paragraph), 0),
  );

  return (
    <Section id="about" nav="about" hue="blue" {...t.sections.about}>
      <div className="grid gap-10 lg:grid-cols-[1.75fr_1fr] lg:gap-14">
        <div className="grid content-start gap-6 text-lg leading-[1.75] sm:text-xl lg:text-[1.1875rem]">
          {content.about.map((paragraph, i) => (
            <p key={i} data-reveal>
              <Highlights text={paragraph} first={firstMark[i]} />
            </p>
          ))}
        </div>
        <ul className="grid content-start gap-3 self-start sm:grid-cols-2 lg:sticky lg:top-28 lg:grid-cols-1">
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
