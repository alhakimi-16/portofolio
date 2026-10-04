import { MapPin } from "lucide-react";
import type { SiteContent } from "@/content";
import type { Dictionary } from "@/i18n/ui";
import { cn } from "@/lib/utils";
import { Journey } from "./Journey";
import { Section } from "./Section";

export function Path({ content, t }: { content: SiteContent; t: Dictionary }) {
  return (
    <Section id="path" nav="path" hue="mint" {...t.sections.path}>
      <Journey>
        <ol className="relative grid gap-8 md:gap-0">
          {content.path.map((stop, i) => (
            <li
              key={stop.title}
              data-stop
              data-hue={stop.hue}
              className="group relative pl-16 md:grid md:grid-cols-2 md:pl-0 md:[&:not(:first-child)]:-mt-12"
            >
              <span
                data-dot
                aria-hidden
                className="absolute top-8 left-6 z-10 size-5 -translate-x-1/2 rounded-full border-4 border-hue bg-surface transition-[background-color,scale] duration-500 group-data-on:scale-125 group-data-on:bg-hue md:left-1/2"
              />
              <div data-reveal className={cn("md:px-12", i % 2 ? "md:col-start-2" : "md:col-start-1")}>
                <article className="card p-5 transition-[translate,border-color] duration-300 hover:-translate-y-1 hover:border-hue sm:p-6">
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm">
                    <span className="rounded-full bg-hue/15 px-2.5 py-0.5 font-bold text-hue-ink tabular-nums">
                      {stop.period}
                    </span>
                    <span className="inline-flex items-center gap-1 font-medium">
                      <MapPin aria-hidden className="size-3.5" />
                      {stop.place}
                    </span>
                  </p>
                  <h3 className="mt-3 text-xl leading-snug font-bold tracking-tight">{stop.title}</h3>
                  <p className="mt-1.5 leading-relaxed">{stop.detail}</p>
                </article>
              </div>
            </li>
          ))}
        </ol>
      </Journey>
    </Section>
  );
}
