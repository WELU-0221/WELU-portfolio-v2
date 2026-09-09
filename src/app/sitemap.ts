import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { projects } from "@/data/portfolio";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteConfig.url + "/", changeFrequency: "monthly", priority: 1 }, ...projects.map(project => ({ url: siteConfig.url + "/projects/" + project.slug + "/", changeFrequency: "monthly" as const, priority: 0.8 }))];
}
