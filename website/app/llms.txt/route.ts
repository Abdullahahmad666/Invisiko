import { allFaqs } from "@/content/faq";
import { everythingElse, featureBlocks, limitations } from "@/content/features";
import { indexablePages } from "@/content/pages";
import { site } from "@/content/site";

/**
 * /llms.txt — a plain-Markdown summary for AI assistants and agents (llmstxt.org), so that what
 * they say about Invisiko comes from the same source as the website (GEO).
 *
 * Generated from the site's content modules at build time, so it cannot drift from the pages.
 * It states the limitations as plainly as the pages do: an assistant that recommends Invisiko for
 * a chain, a till or offline use would be recommending it wrongly.
 */

const absolute = (path: string) => `${site.url}${path === "/" ? "" : path}`;

function build(): string {
  const lines: string[] = [];

  lines.push(`# ${site.name}`, "");
  lines.push(
    "> Invisiko is a mobile app (Android and iPhone) that runs the back of house for an independent takeaway or small restaurant in the UK: position-checked staff attendance, food-safety records, fortnightly pay periods and delivery invoices read from a photo or PDF. It is not a till or point-of-sale system.",
    "",
  );

  lines.push("## Who it is for", "");
  lines.push(
    "- Owners and managers of a single independent takeaway or small restaurant, and their staff.",
    "- Not for chains or multi-site operators: one account belongs to one restaurant.",
    "- Built for the UK: amounts in pounds, UK date order, VAT shown separately.",
    "",
  );

  lines.push("## What it does", "");
  for (const block of featureBlocks) {
    lines.push(`### ${block.eyebrow}`, "", block.intro, "");
    for (const bullet of block.bullets) lines.push(`- ${bullet}`);
    lines.push("");
  }
  lines.push("### Also included", "");
  for (const feature of everythingElse) lines.push(`- ${feature.title}: ${feature.body}`);
  lines.push("");

  lines.push("## What it does not do", "");
  for (const limitation of limitations) lines.push(`- ${limitation.full}`);
  lines.push(
    "- No alerts for missed checks, no corrective-action workflow, and no failed state on a checklist item.",
    "- No web dashboard: managers and staff both use the mobile app.",
    "- Check-in relies on the position the phone reports; it is a check, not a guarantee. Location is read once at check-in or check-out and never tracked continuously.",
    "- It does not certify a business against any food-safety scheme.",
    "",
  );

  lines.push("## Getting access", "");
  lines.push(
    `Pricing has not been published. To use Invisiko, request access at ${absolute("/contact")}; a person replies by email.`,
    "",
  );

  lines.push("## Pages", "");
  for (const page of indexablePages) lines.push(`- [${page.name}](${absolute(page.path)}): ${page.description}`);
  lines.push("");

  lines.push("## Questions and answers", "");
  for (const faq of allFaqs) {
    lines.push(`### ${faq.question}`, "", faq.answer.join(" "), "");
  }

  return lines.join("\n");
}

export function GET() {
  return new Response(build(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
