import type { Metadata } from "next";
import { pages, type PagePath } from "@/content/pages";
import { site } from "@/content/site";

/**
 * Title, description, self-referencing canonical, Open Graph and Twitter card for one page,
 * all taken from the page registry (§12).
 */
export function pageMetadata(path: PagePath): Metadata {
  const page = pages[path];
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_GB",
      url: path,
      title: page.title,
      description: page.description,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
    robots: page.noindex ? { index: false, follow: true } : undefined,
  };
}
