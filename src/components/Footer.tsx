import { ArrowUp } from "lucide-react";
import type { Dictionary } from "@/i18n/ui";

export function Footer({ name, t }: { name: string; t: Dictionary }) {
  return (
    <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 pt-2 pb-10 text-sm sm:flex-row sm:px-8">
      <p>
        © {new Date().getFullYear()} {name} · {t.footer.built}
      </p>
      <a href="#top" className="group inline-flex items-center gap-2.5 font-semibold text-fg">
        {t.header.top}
        <span className="grid size-9 place-items-center rounded-full border border-line transition-[translate,border-color] duration-300 group-hover:-translate-y-1 group-hover:border-fg">
          <ArrowUp aria-hidden className="size-4" />
        </span>
      </a>
    </footer>
  );
}
