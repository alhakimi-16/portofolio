import { Check, ScanLine, UserRound } from "lucide-react";

/** Decorative: an ID card being scanned and stamped "verified", a nod to my job at Nect. */
export function IdScan({ scan, verified }: { scan: string; verified: string }) {
  return (
    <div
      aria-hidden
      className="relative flex min-h-64 flex-col items-center justify-center gap-10 overflow-hidden bg-hue/10 [background-image:radial-gradient(color-mix(in_srgb,var(--hue)_40%,transparent)_1.2px,transparent_1.4px)] [background-size:18px_18px] p-10"
    >
      <div className="relative w-56 -rotate-3 rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow)]">
        <div className="flex items-center justify-between">
          <span className="text-[0.625rem] font-bold tracking-[0.24em] text-muted">ID</span>
          <span className="h-1.5 w-10 rounded-full bg-line" />
        </div>
        <div className="mt-3 flex gap-3">
          <div className="grid size-14 place-items-center rounded-xl bg-blue/15 text-blue" data-hue="blue">
            <UserRound className="size-8" strokeWidth={1.6} />
          </div>
          <div className="flex-1 space-y-2 pt-1">
            <div className="h-2 rounded-full bg-line" />
            <div className="h-2 w-3/4 rounded-full bg-line" />
            <div className="h-2 w-1/2 rounded-full bg-line" />
          </div>
        </div>
        <div className="mt-4 space-y-1.5">
          <div className="h-1.5 rounded-full bg-line" />
          <div className="h-1.5 w-5/6 rounded-full bg-line" />
        </div>

        <div
          data-hue="mint"
          className="absolute inset-x-2 top-3 h-0.5 animate-[scan_2.8s_ease-in-out_infinite] rounded-full bg-hue shadow-[0_0_14px_3px_var(--hue)] [--scan-distance:7.4rem]"
        />
        <div
          data-hue="mint"
          className="absolute -right-6 -bottom-4 flex -rotate-8 animate-[stamp_5.6s_ease-out_infinite] items-center gap-1.5 rounded-xl border-[3px] border-hue bg-surface px-3 py-1 font-display text-sm font-extrabold tracking-[0.08em] text-hue-ink uppercase"
        >
          <Check className="size-4" strokeWidth={3.2} />
          {verified}
        </div>
      </div>
      <p className="flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-hue-ink uppercase">
        <ScanLine className="size-4" />
        {scan}
      </p>
    </div>
  );
}
