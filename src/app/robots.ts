import type { MetadataRoute } from "next";
import { draft } from "@/content/profile";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // While the content is still a draft, ask search engines to stay away.
    rules: draft ? { userAgent: "*", disallow: "/" } : { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
