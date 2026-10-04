import {
  Briefcase,
  BriefcaseBusiness,
  BriefcaseMedical,
  Clock,
  Coffee,
  Database,
  FileChartColumn,
  FileText,
  Flag,
  Globe,
  GraduationCap,
  Languages,
  Lightbulb,
  ListChecks,
  Network,
  ShieldCheck,
  Sigma,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/content/types";

const icons: Record<IconName, LucideIcon> = {
  database: Database,
  cup: Coffee,
  languages: Languages,
  sigma: Sigma,
  business: BriefcaseBusiness,
  network: Network,
  report: FileChartColumn,
  shield: ShieldCheck,
  document: FileText,
  users: Users,
  clock: Clock,
  flag: Flag,
  bulb: Lightbulb,
  checklist: ListChecks,
  aid: BriefcaseMedical,
  cap: GraduationCap,
  briefcase: Briefcase,
  globe: Globe,
};

/** The icons used by the content in profile.ts. */
export function Icon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  const Component = icons[name];
  return <Component aria-hidden className={className} strokeWidth={1.8} />;
}

export function LinkedInIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}
