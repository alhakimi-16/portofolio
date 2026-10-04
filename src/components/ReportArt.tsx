import { ChartColumn, Clock } from "lucide-react";

const bars = [
  { height: "45%", hue: "blue" },
  { height: "70%", hue: "violet" },
  { height: "55%", hue: "blue" },
  { height: "90%", hue: "violet" },
  { height: "75%", hue: "blue" },
];

/** Decorative: a small finance report with moving bars, stamped "on time", for my VJSD role. */
export function ReportArt({ caption, stamp }: { caption: string; stamp: string }) {
  return (
    <div
      aria-hidden
      data-hue="sun"
      className="relative flex h-full min-h-64 flex-col items-center justify-center gap-10 overflow-hidden bg-hue/10 [background-image:radial-gradient(color-mix(in_srgb,var(--hue)_55%,transparent)_1.2px,transparent_1.4px)] [background-size:18px_18px] p-10"
    >
      <div className="relative w-56 rotate-3 rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow)]">
        <div className="flex items-center justify-between">
          <span className="font-display text-sm font-extrabold text-muted">€</span>
          <span className="h-1.5 w-10 rounded-full bg-line" />
        </div>
        <div className="mt-3 flex h-20 items-end gap-2.5 border-b-2 border-line">
          {bars.map((bar, i) => (
            <span
              key={i}
              data-hue={bar.hue}
              className="block flex-1 origin-bottom animate-[bars_3.2s_ease-in-out_infinite] rounded-t-md bg-hue"
              style={{ height: bar.height, animationDelay: `${i * -0.45}s` }}
            />
          ))}
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="h-1.5 rounded-full bg-line" />
          <div className="h-1.5 w-2/3 rounded-full bg-line" />
        </div>

        <div className="absolute -right-6 -bottom-4 flex rotate-(--tilt) animate-[stamp_5.6s_ease-out_-2.8s_infinite] items-center gap-1.5 rounded-xl border-[3px] border-hue bg-surface px-3 py-1 font-display text-sm font-extrabold tracking-[0.08em] text-hue-ink uppercase [--tilt:6deg]">
          <Clock className="size-4" strokeWidth={2.8} />
          {stamp}
        </div>
      </div>
      <p className="flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-hue-ink uppercase">
        <ChartColumn className="size-4" />
        {caption}
      </p>
    </div>
  );
}
