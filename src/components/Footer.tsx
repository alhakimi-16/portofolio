import { ArrowUp } from "lucide-react";
import type { Dictionary } from "@/i18n/ui";

export function Footer({ name, t }: { name: string; t: Dictionary }) {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-head px-4 py-5 font-mono text-xs text-muted sm:px-6 lg:px-[calc(100%/12)]">
      <p>
        © {new Date().getFullYear()} {name} · {t.footer.built}
      </p>
      <a href="#top" className="inline-flex items-center gap-1.5 text-ink transition-colors hover:text-sel-ink">
        {t.header.top}
        <ArrowUp aria-hidden className="size-3.5" />
      </a>
    </footer>
  );
}
