import { ArrowUp } from "lucide-react";
import type { Dictionary } from "@/i18n/ui";
import { cn, wrap } from "@/lib/utils";

export function Footer({ name, t }: { name: string; t: Dictionary }) {
  return (
    <footer className={cn(wrap, "pb-10")}>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink pt-6 label text-muted">
        <p>
          © {new Date().getFullYear()} {name} · {t.footer.built}
        </p>
        <a href="#top" className="group inline-flex items-center gap-1.5 py-1 text-ink">
          <span className="link-line pb-1">{t.header.top}</span>
          <ArrowUp aria-hidden className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
}
