/** Public URL of the site. Set NEXT_PUBLIC_SITE_URL once you have a custom domain. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

/** Sections linked from the header, in page order. */
export const navIds = ["about", "skills", "projects", "courses", "experience", "contact"] as const;

export type NavId = (typeof navIds)[number];
