"use client";

import { useEffect, useState } from "react";

/** Section links in the sidebar; the line next to the section you are reading grows. */
export function ActiveNav({ items, label }: { items: { id: string; label: string }[]; label: string }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    items.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label={label} className="mt-10 hidden lg:block">
      <ul className="w-max">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              className="group flex items-center py-1.5"
            >
              <span className="mr-4 h-px w-8 bg-muted/50 transition-all duration-300 group-hover:w-14 group-hover:bg-fg group-aria-[current=true]:w-14 group-aria-[current=true]:bg-fg" />
              <span className="text-xs font-semibold tracking-[0.16em] text-muted uppercase transition-colors group-hover:text-fg group-aria-[current=true]:text-fg">
                {item.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
