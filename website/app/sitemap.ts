import type { MetadataRoute } from "next";
import { CONTENT_LAST_UPDATED, indexablePages } from "@/content/pages";
import { site } from "@/content/site";

/** Canonical, indexable pages only (§12 Crawl). Placeholder pages (noindex) are left out. */
export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePages.map((page) => ({
    url: `${site.url}${page.path === "/" ? "" : page.path}`,
    lastModified: CONTENT_LAST_UPDATED,
    changeFrequency: "monthly",
    priority: page.priority,
  }));
}
