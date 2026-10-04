import type { SiteContent } from "@/content";
import type { Dictionary } from "@/i18n/ui";
import { SheetSection } from "./SheetSection";
import { SkillsTable } from "./SkillsTable";

export function Skills({ content, t }: { content: SiteContent; t: Dictionary }) {
  const rows = [
    ...content.skills.technical.map((skill) => ({ ...skill, group: "technical" as const })),
    ...content.skills.personal.map((skill) => ({ ...skill, group: "personal" as const })),
  ];

  return (
    <SheetSection id="skills" nav="skills" hue="blue" {...t.sections.skills}>
      <SkillsTable rows={rows} labels={{ ...t.tables, technical: t.skills.technical, personal: t.skills.personal }} />
      <div data-range className="range col-span-12 self-start lg:col-span-3 lg:col-start-9">
        <table className="w-full text-left text-sm">
          <caption className="border-b border-line bg-head px-4 py-2.5 text-left cell-label">
            {t.skills.languages}
          </caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="px-4 py-2 cell-label">
                {t.tables.language}
              </th>
              <th scope="col" className="px-4 py-2 cell-label">
                {t.tables.level}
              </th>
            </tr>
          </thead>
          <tbody>
            {content.languages.map((language) => (
              <tr key={language.name} className="border-b border-line last:border-b-0">
                <td className="px-4 py-2.5 font-semibold text-ink">
                  <span className="flex items-center gap-2">
                    <span aria-hidden data-hue={language.hue} className="size-2.5 shrink-0 bg-hue ring-1 ring-line" />
                    {language.name}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-muted">{language.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SheetSection>
  );
}
