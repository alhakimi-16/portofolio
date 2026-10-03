"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/components/providers/I18nProvider";
import { useToast } from "@/components/providers/Toast";
import type { Social } from "@/content/types";
import { otherLocale } from "@/i18n/config";
import { copyText } from "@/lib/clipboard";
import { useModKey } from "@/lib/hooks";
import { lockScroll, scrollToTarget } from "@/lib/scroll-lock";
import { sectionIds } from "@/lib/site";
import { applyTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

type Command = { id: string; group: string; label: string; hint?: string; run: () => void };

/** ⌘K / Ctrl+K command menu: jump to sections, switch theme or language, copy the email. */
export function CommandPalette({ email, socials, cv }: { email: string; socials: Social[]; cv?: string }) {
  const { t, locale } = useI18n();
  const router = useRouter();
  const toast = useToast();
  const modKey = useModKey();
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const commands = useMemo<Command[]>(() => {
    const nav = t.palette.navigate;
    const actions = t.palette.actions;
    const links = t.palette.links;
    return [
      ...sectionIds.map((id, i) => ({
        id: `go-${id}`,
        group: nav,
        label: t.nav[id],
        hint: `0${i + 1}`,
        run: () => scrollToTarget(`#${id}`),
      })),
      { id: "top", group: nav, label: t.palette.top, hint: "↑", run: () => scrollToTarget(0) },
      {
        id: "theme",
        group: actions,
        label: t.palette.toggleTheme,
        run: () => applyTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light"),
      },
      {
        id: "language",
        group: actions,
        label: t.palette.switchLanguage,
        hint: otherLocale(locale).toUpperCase(),
        run: () => router.push(`/${otherLocale(locale)}`, { scroll: false }),
      },
      {
        id: "copy-email",
        group: actions,
        label: t.palette.copyEmail,
        run: () => void copyText(email).then((ok) => ok && toast(t.contact.copied)),
      },
      {
        id: "grid",
        group: actions,
        label: t.palette.toggleGrid,
        hint: "G",
        run: () => window.dispatchEvent(new Event("grid:toggle")),
      },
      ...(cv
        ? [{ id: "cv", group: links, label: t.hero.downloadCv, hint: "PDF", run: () => window.open(cv, "_blank") }]
        : []),
      ...socials.map((social) => ({
        id: `social-${social.label}`,
        group: links,
        label: social.label,
        hint: social.handle,
        run: () => window.open(social.href, "_blank", "noopener,noreferrer"),
      })),
      { id: "mail", group: links, label: email, hint: "@", run: () => (window.location.href = `mailto:${email}`) },
    ];
  }, [t, locale, router, toast, email, socials, cv]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.group} ${c.hint ?? ""}`.toLowerCase().includes(q));
  }, [commands, query]);

  const groups = useMemo(() => {
    const map = new Map<string, { command: Command; index: number }[]>();
    filtered.forEach((command, index) => {
      if (!map.has(command.group)) map.set(command.group, []);
      map.get(command.group)!.push({ command, index });
    });
    return [...map.entries()];
  }, [filtered]);

  const openRef = useRef(open);
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // global shortcut + "open" event from the header button
  useEffect(() => {
    const show = () => {
      setQuery("");
      setActive(0);
      setOpen(true);
    };
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (openRef.current) setOpen(false);
        else show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("palette:open", show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("palette:open", show);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const unlock = lockScroll();
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      cancelAnimationFrame(frame);
      unlock();
      previous?.focus({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, open, listId]);

  if (!open) return null;

  const run = (command?: Command) => {
    if (!command) return;
    setOpen(false);
    // let the menu close (and scrolling unlock) before acting
    requestAnimationFrame(() => command.run());
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      run(filtered[active]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Tab") {
      event.preventDefault(); // keep focus inside the dialog
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex animate-[fade-in_0.25s_ease-out] items-start justify-center bg-bg/60 px-4 pt-[12vh] backdrop-blur-sm"
      onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t.palette.title}
        className="w-full max-w-xl animate-[palette-in_0.45s_var(--ease-expo)] overflow-hidden rounded-2xl border border-line-strong bg-elevated shadow-2xl shadow-black/40"
      >
        <div className="flex items-center gap-3 border-b border-line px-5">
          <span className="shrink-0 label text-accent">{modKey === "⌘" ? "⌘K" : "Ctrl K"}</span>
          <input
            ref={inputRef}
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={filtered.length ? `${listId}-${active}` : undefined}
            aria-label={t.palette.placeholder}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder={t.palette.placeholder}
            className="h-14 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="rounded border border-line px-1.5 py-0.5 label text-muted">esc</kbd>
        </div>

        <div
          id={listId}
          role="listbox"
          aria-label={t.palette.title}
          data-lenis-prevent
          className="max-h-[min(52vh,26rem)] overflow-y-auto p-2"
        >
          {groups.map(([group, entries]) => (
            <div key={group} role="group" aria-label={group}>
              <div className="px-3 pt-3 pb-1.5 label text-muted">{group}</div>
              {entries.map(({ command, index }) => (
                <div
                  key={command.id}
                  id={`${listId}-${index}`}
                  role="option"
                  aria-selected={index === active}
                  onMouseMove={() => setActive(index)}
                  onClick={() => run(command)}
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-[0.9375rem] transition-colors",
                    index === active ? "bg-fg text-bg" : "text-fg",
                  )}
                >
                  <span className="truncate">{command.label}</span>
                  {command.hint && <span className="shrink-0 label opacity-60">{command.hint}</span>}
                </div>
              ))}
            </div>
          ))}
          {filtered.length === 0 && <p className="px-3 py-8 text-center text-muted">{t.palette.empty}</p>}
        </div>

        <div className="flex gap-5 border-t border-line px-5 py-3 label text-muted">
          <span>↑↓ {t.palette.keys.navigate}</span>
          <span>↵ {t.palette.keys.select}</span>
          <span>esc {t.palette.keys.close}</span>
        </div>
      </div>
    </div>
  );
}
