import { describe, expect, it } from "vitest";
import { GET as llmsTxt } from "@/app/llms.txt/route";
import sitemap from "@/app/sitemap";
import { allFaqs } from "@/content/faq";
import { breadcrumbTrail, pages } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";
import { faqPageLd, softwareApplicationLd, webPageLd } from "@/lib/structured-data";

describe("page registry and metadata", () => {
  it("gives every page a unique title and description", () => {
    const entries = Object.values(pages);
    expect(new Set(entries.map((p) => p.title)).size).toBe(entries.length);
    expect(new Set(entries.map((p) => p.description)).size).toBe(entries.length);
  });

  it("keeps descriptions within what search results display", () => {
    for (const page of Object.values(pages)) expect(page.description.length, page.path).toBeLessThanOrEqual(200);
  });

  it("sets a self-referencing canonical", () => {
    expect(pageMetadata("/features/attendance").alternates?.canonical).toBe("/features/attendance");
  });

  it("builds breadcrumbs from the root", () => {
    expect(breadcrumbTrail("/features/compliance").map((p) => p.name)).toEqual(["Home", "Features", "Compliance records"]);
  });
});

describe("sitemap", () => {
  it("lists indexable pages only", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls.some((url) => url.endsWith("/terms"))).toBe(false);
    expect(urls.some((url) => url.endsWith("/features/invoice-scanning"))).toBe(true);
  });
});

describe("structured data", () => {
  it("never invents ratings or prices", () => {
    const json = JSON.stringify([softwareApplicationLd(), webPageLd("/")]);
    expect(json).not.toMatch(/aggregateRating|offers|price/i);
  });

  it("marks up every FAQ answer exactly as rendered", () => {
    const ld = faqPageLd(allFaqs);
    expect(ld.mainEntity).toHaveLength(allFaqs.length);
    expect(ld.mainEntity[0].acceptedAnswer.text).toBe(allFaqs[0].answer.join(" "));
  });
});

describe("llms.txt", () => {
  it("summarises the product and states its limits plainly", async () => {
    const response = llmsTxt();
    expect(response.headers.get("content-type")).toMatch(/text\/markdown/);
    const text = await response.text();
    expect(text).toMatch(/^# Invisiko/);
    expect(text).toMatch(/not a till/i);
    expect(text).toMatch(/one restaurant/i);
    expect(text).toMatch(/no offline mode/i);
    expect(text).toContain("What is Invisiko?");
  });
});
