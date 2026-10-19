/**
 * Every public page, in one place: its title tag, meta description, breadcrumb parent and
 * schema.org type. Metadata, the sitemap, breadcrumbs, structured data and /llms.txt all read
 * from here, so they cannot disagree.
 *
 * Titles follow PRODUCT_BLUEPRINT.md §12 exactly where it specifies one. Descriptions lead with
 * what the page answers, in plain words a person would search for — and a model would quote.
 */

export type PagePath =
  | "/"
  | "/features"
  | "/features/invoice-scanning"
  | "/features/attendance"
  | "/features/compliance"
  | "/how-it-works"
  | "/about"
  | "/contact"
  | "/faq"
  | "/privacy"
  | "/terms"
  | "/support";

export type PageEntry = {
  path: PagePath;
  /** Short name for breadcrumbs and link lists. */
  name: string;
  title: string;
  description: string;
  parent?: PagePath;
  schemaType: "WebPage" | "CollectionPage" | "AboutPage" | "ContactPage" | "FAQPage";
  /** Excluded from the sitemap and marked noindex (placeholder content). */
  noindex?: boolean;
  /** Relative weight for the sitemap. */
  priority: number;
};

/** Bump when page content changes materially; feeds sitemap lastModified and dateModified. */
export const CONTENT_LAST_UPDATED = "2026-10-19";

export const pages: Record<PagePath, PageEntry> = {
  "/": {
    path: "/",
    name: "Home",
    title: "Invisiko — staff, compliance and stock for takeaways",
    description:
      "Invisiko runs the back of house on one phone: position-checked staff hours, food-safety records, fortnightly pay and delivery invoices read for you.",
    schemaType: "WebPage",
    priority: 1,
  },
  "/features": {
    path: "/features",
    name: "Features",
    title: "Features — Invisiko",
    description:
      "Attendance with a geofence, food-safety records, AI-read delivery invoices and fortnightly payroll, in one app built for independent takeaways.",
    parent: "/",
    schemaType: "CollectionPage",
    priority: 0.9,
  },
  "/features/invoice-scanning": {
    path: "/features/invoice-scanning",
    name: "Invoice scanning",
    title: "Invoice scanning for restaurants — Invisiko",
    description:
      "Photograph a delivery note or upload the PDF. Invisiko reads the lines, matches them to your stock, and updates spend once you confirm.",
    parent: "/features",
    schemaType: "WebPage",
    priority: 0.9,
  },
  "/features/attendance": {
    path: "/features/attendance",
    name: "Attendance & rota",
    title: "Staff attendance and rota for takeaways — Invisiko",
    description:
      "A QR code clock-in for takeaway staff that checks the phone's position against the radius you set, plus a weekly rota, shift swaps and corrections that stay visible.",
    parent: "/features",
    schemaType: "WebPage",
    priority: 0.8,
  },
  "/features/compliance": {
    path: "/features/compliance",
    name: "Compliance records",
    title: "Food safety records for takeaways — Invisiko",
    description:
      "Fridge temperatures, opening and closing checklists and your licences, recorded as the work happens and ready when somebody asks.",
    parent: "/features",
    schemaType: "WebPage",
    priority: 0.8,
  },
  "/how-it-works": {
    path: "/how-it-works",
    name: "How it works",
    title: "How Invisiko works",
    description:
      "What setting up Invisiko involves: a printed QR code at the door, your fridges and checklists, one invite code for your team — then the records build themselves.",
    parent: "/",
    schemaType: "WebPage",
    priority: 0.8,
  },
  "/about": {
    path: "/about",
    name: "About",
    title: "About Invisiko",
    description:
      "Who is behind Invisiko, and how it looks after a restaurant's staff, compliance and supplier records: private files, server-enforced roles, location read once.",
    parent: "/",
    schemaType: "AboutPage",
    priority: 0.5,
  },
  "/contact": {
    path: "/contact",
    name: "Contact",
    title: "Contact Invisiko",
    description:
      "Request access to Invisiko, the back-of-house app for independent takeaways. Tell us about your place and a person will reply by email.",
    parent: "/",
    schemaType: "ContactPage",
    priority: 0.7,
  },
  "/faq": {
    path: "/faq",
    name: "FAQ",
    title: "Questions about Invisiko",
    description:
      "Straight answers about Invisiko: it isn't a till, it needs a connection, it's for one restaurant, how check-in works, what happens when scanning misreads, and where data lives.",
    parent: "/",
    schemaType: "FAQPage",
    priority: 0.8,
  },
  "/privacy": {
    path: "/privacy",
    name: "Privacy",
    title: "Privacy — Invisiko",
    description:
      "How this website handles the details you send, and a summary of the Invisiko app's privacy commitments, with a link to the app's full policy.",
    parent: "/",
    schemaType: "WebPage",
    priority: 0.3,
  },
  "/terms": {
    path: "/terms",
    name: "Terms",
    title: "Terms — Invisiko",
    description: "Terms of service for Invisiko.",
    parent: "/",
    schemaType: "WebPage",
    noindex: true, // Placeholder until real terms exist (§14 Q6).
    priority: 0.1,
  },
  "/support": {
    path: "/support",
    name: "Support",
    title: "Support — Invisiko",
    description:
      "Help for people already using Invisiko: joining a team with an invite code, check-in problems, resetting a password and reporting a bug.",
    parent: "/",
    schemaType: "WebPage",
    priority: 0.4,
  },
};

/** Root-first trail of pages leading to `path`, including it. */
export function breadcrumbTrail(path: PagePath): PageEntry[] {
  const trail: PageEntry[] = [];
  let current: PageEntry | undefined = pages[path];
  while (current) {
    trail.unshift(current);
    current = current.parent ? pages[current.parent] : undefined;
  }
  return trail;
}

export const indexablePages = Object.values(pages).filter((page) => !page.noindex);
