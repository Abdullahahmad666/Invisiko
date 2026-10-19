import type { FaqItem } from "@/content/faq";
import { breadcrumbTrail, CONTENT_LAST_UPDATED, pages, type PagePath } from "@/content/pages";
import { isPlaceholder, site } from "@/content/site";

/**
 * Structured data (§12). Honest fields only — no `aggregateRating`, no `offers` (no pricing exists)
 * — and nothing that is not visible on the page it is attached to. Entities are linked by `@id`
 * so search engines and AI systems can tie the site, the organisation and the app together.
 */

const absolute = (path: string) => `${site.url}${path === "/" ? "" : path}`;

export const ids = {
  website: `${site.url}/#website`,
  organization: `${site.url}/#organization`,
  app: `${site.url}/#app`,
};

const hasOrganization = () => !isPlaceholder(site.legalName);

/** Only emitted once the legal entity is known (§12; §14 Q5). */
export function organizationLd() {
  if (!hasOrganization()) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ids.organization,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    ...(isPlaceholder(site.contactEmail) ? {} : { email: site.contactEmail }),
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": ids.website,
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: "en-GB",
    ...(hasOrganization() ? { publisher: { "@id": ids.organization } } : {}),
  };
}

/** The product. Every listed feature is described on the site and implemented (§2). */
export function softwareApplicationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": ids.app,
    name: site.name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Restaurant back-of-house management",
    operatingSystem: "Android, iOS",
    description: site.description,
    url: site.url,
    inLanguage: "en-GB",
    countriesSupported: "GB",
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Owners and managers of independent takeaways and small restaurants",
    },
    featureList: [
      "QR code staff check-in, refused outside a radius the manager sets",
      "Weekly rota with an estimated staff cost",
      "Shift swaps with manager approval",
      "Opening and closing routines, fridge and freezer temperature logs and named checklists",
      "Licence and certificate storage with expiry flags, for managers only",
      "Fortnightly pay periods built from recorded hours",
      "Delivery invoices read from a photo or PDF, confirmed by a person, into stock and spend",
      "Spend per product across suppliers, with VAT shown separately",
    ],
    ...(hasOrganization() ? { publisher: { "@id": ids.organization } } : {}),
  };
}

export function breadcrumbLd(path: PagePath) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbTrail(path).map((page, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: page.name,
      item: absolute(page.path),
    })),
  };
}

export function webPageLd(path: PagePath) {
  const page = pages[path];
  return {
    "@context": "https://schema.org",
    "@type": page.schemaType === "FAQPage" ? "WebPage" : page.schemaType,
    "@id": `${absolute(path)}#webpage`,
    url: absolute(path),
    name: page.title,
    description: page.description,
    inLanguage: "en-GB",
    isPartOf: { "@id": ids.website },
    about: { "@id": ids.app },
    dateModified: CONTENT_LAST_UPDATED,
    ...(path === "/" ? {} : { breadcrumb: breadcrumbLd(path) }),
  };
}

/** FAQPage — call only with the exact items rendered on that page (§9.9 acceptance). */
export function faqPageLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absolute("/faq")}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer.join(" ") },
    })),
  };
}

/** HowTo for the visible setup steps on /how-it-works. */
export function howToLd(name: string, description: string, steps: { title: string; text: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    inLanguage: "en-GB",
    tool: [
      { "@type": "HowToTool", name: "An Android phone or iPhone" },
      { "@type": "HowToTool", name: "A printed QR code at the venue door" },
    ],
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.text,
    })),
  };
}
