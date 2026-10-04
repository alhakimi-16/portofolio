"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { copyText } from "@/lib/clipboard";
import { cn } from "@/lib/utils";

/** Copies the email address; the button confirms for two seconds. */
export function CopyEmail({
  email,
  label,
  doneLabel,
  className,
}: {
  email: string;
  label: string;
  doneLabel: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    if (!(await copyText(email))) return;
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={() => void copy()}
      data-copied={copied || undefined}
      className={cn(
        "inline-flex items-center gap-2 border border-line bg-paper px-3.5 py-2 text-sm font-semibold text-ink transition-colors hover:border-sel hover:text-sel-ink data-copied:border-sel data-copied:bg-fill-green data-copied:text-ink-green",
        className,
      )}
    >
      {copied ? <Check aria-hidden className="size-4" strokeWidth={2.6} /> : <Copy aria-hidden className="size-4" />}
      <span aria-live="polite">{copied ? doneLabel : label}</span>
    </button>
  );
}
