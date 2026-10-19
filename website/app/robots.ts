import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Search engines and AI assistants are explicitly welcome on the production site, so the product
 * can be found in search results and recommended in AI answers (GEO). Preview deployments
 * disallow everything so they never compete with the canonical host (§12 Crawl).
 *
 * On hosts other than Vercel, set VERCEL_ENV=production for the live build.
 */

// Crawlers that fetch pages to answer questions or cite sources in AI assistants and search.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "Meta-ExternalAgent",
  "MistralAI-User",
];

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === "production"
    : process.env.NODE_ENV === "production";

  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: "/api/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
