import { cn } from "@/lib/utils";

/** Soft, slowly drifting colour clouds behind a section. */
export function Blobs({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <span className="absolute -top-32 -left-24 size-[28rem] animate-[drift_24s_ease-in-out_infinite] rounded-full bg-blue/20 blur-3xl" />
      <span className="absolute top-8 -right-28 size-[24rem] animate-[drift_28s_ease-in-out_-7s_infinite] rounded-full bg-sun/25 blur-3xl" />
      <span className="absolute -bottom-40 left-[30%] size-[26rem] animate-[drift_32s_ease-in-out_-14s_infinite] rounded-full bg-mint/20 blur-3xl" />
      <span className="absolute right-[18%] bottom-[-6rem] size-[16rem] animate-[drift_22s_ease-in-out_-4s_infinite] rounded-full bg-coral/20 blur-3xl" />
    </div>
  );
}
