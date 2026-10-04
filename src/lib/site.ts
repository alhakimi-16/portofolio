/** Public URL of the site. Set NEXT_PUBLIC_SITE_URL once you have a custom domain. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

/** Page sections, in order. Used for the navigation. */
export const sectionIds = ["about", "experience", "education", "skills", "certificates", "contact"] as const;

export type SectionId = (typeof sectionIds)[number];
