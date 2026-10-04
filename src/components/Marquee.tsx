import type { Hue } from "@/content/types";
import { Sparkle } from "./Icon";

/** A tilted ribbon of keywords from the CV that scrolls sideways (pauses on hover). */
export function Marquee({ items }: { items: { text: string; hue: Hue }[] }) {
  const row = (copy: boolean) => (
    <ul
      aria-hidden={copy || undefined}
      className="flex shrink-0 animate-[marquee_38s_linear_infinite] items-center group-hover:[animation-play-state:paused]"
    >
      {items.map((item) => (
        <li key={item.text} className="flex items-center whitespace-nowrap">
          <span className="px-6 sm:px-8">{item.text}</span>
          <span data-hue={item.hue}>
            <Sparkle className="size-5 text-hue sm:size-6" />
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="overflow-hidden py-8">
      <div className="group -mx-6 -rotate-2 overflow-hidden border-y-2 border-fg/10 bg-panel py-4 font-display text-2xl font-bold tracking-tight text-white sm:py-5 sm:text-[2rem]">
        <div className="flex w-max">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  );
}
