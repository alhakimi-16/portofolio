"use client";

import { ListFilter } from "lucide-react";
import { useState } from "react";
import type { IconName } from "@/content/types";
import { Icon } from "./Icon";

type Group = "technical" | "personal";
type Row = { name: string; note?: string; icon: IconName; group: Group };

/** All skills in one table, with a filter like the one on a spreadsheet column. */
export function SkillsTable({
  rows,
  labels,
}: {
  rows: Row[];
  labels: {
    skill: string;
    area: string;
    use: string;
    all: string;
    filter: string;
    technical: string;
    personal: string;
  };
}) {
  const [filter, setFilter] = useState<"all" | Group>("all");
  const shown = rows.filter((row) => filter === "all" || row.group === filter);
  const options: ("all" | Group)[] = ["all", "technical", "personal"];

  return (
    <div data-range className="range col-span-12 self-start lg:col-span-6 lg:col-start-2">
      <div
        role="group"
        aria-label={labels.filter}
        className="flex flex-wrap items-center gap-1 border-b border-line bg-head px-3 py-2"
      >
        <ListFilter aria-hidden className="mr-1 size-4 text-head-ink" />
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={filter === option}
            onClick={() => setFilter(option)}
            className="px-2.5 py-1 text-xs font-semibold text-muted transition-colors hover:text-ink aria-pressed:bg-paper aria-pressed:text-sel-ink aria-pressed:shadow-[inset_0_0_0_1px_var(--sel)]"
          >
            {labels[option]}{" "}
            <span className="font-mono font-normal tabular-nums">
              {option === "all" ? rows.length : rows.filter((row) => row.group === option).length}
            </span>
          </button>
        ))}
      </div>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-head">
            <th scope="col" className="px-4 py-2 cell-label">
              {labels.skill}
            </th>
            <th scope="col" className="px-3 py-2 cell-label">
              {labels.area}
            </th>
            <th scope="col" className="hidden px-4 py-2 cell-label sm:table-cell">
              {labels.use}
            </th>
          </tr>
        </thead>
        <tbody>
          {shown.map((row) => (
            <tr key={row.name} className="border-b border-line transition-colors last:border-b-0 hover:bg-head">
              <td className="px-4 py-2.5 align-top">
                <span className="flex items-start gap-2.5 font-semibold text-ink">
                  <Icon name={row.icon} className="mt-0.5 size-4 shrink-0 text-sel-ink" />
                  {row.name}
                </span>
                {row.note && <span className="mt-0.5 block pl-6.5 text-xs text-muted sm:hidden">{row.note}</span>}
              </td>
              <td className="px-3 py-2.5 align-top">
                <span
                  data-hue={row.group === "technical" ? "blue" : "violet"}
                  className="inline-block bg-hue px-1.5 py-0.5 font-mono text-[0.6875rem] whitespace-nowrap text-hue-ink uppercase"
                >
                  {labels[row.group]}
                </span>
              </td>
              <td className="hidden px-4 py-2.5 align-top text-muted sm:table-cell">{row.note ?? "–"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
