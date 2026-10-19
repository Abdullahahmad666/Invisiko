import type { ScreenshotId } from "./screenshots";

/**
 * Feature copy. Every capability named here maps to a PRODUCT_BLUEPRINT.md §2 row marked
 * **Implemented** — the reference is beside each one. Nothing Partial, Placeholder or
 * Not built may be added: no offline use, corrective actions, missed-check alerts, a failed
 * checklist state, scheduled shift reminders, equipment tracking, tables or orders,
 * multi-site, non-GBP currencies or Google sign-in.
 *
 * Payroll is described only as "fortnightly pay periods built from recorded hours, with
 * per-person rates" (§7). Never mention the rate split, NI or cash (§14 Q12).
 */

export type IconName =
  | "location"
  | "clipboard"
  | "receipt"
  | "wallet"
  | "swap"
  | "pulse"
  | "pricetags"
  | "business"
  | "notifications"
  | "key"
  | "document"
  | "cube"
  | "bar-chart";

export type Pillar = {
  id: string;
  label: string;
  title: string;
  body: string;
  href: string;
  icon: IconName;
};

/** Home §9.1 section 3. */
export const pillars: Pillar[] = [
  {
    id: "attendance",
    label: "Attendance",
    title: "Clocked in where they are, not where they say",
    body: "A QR code at the door and the phone's position. Outside the radius you set, it says no — and says by how far.",
    href: "/features/attendance",
    icon: "location", // §2 B1
  },
  {
    id: "compliance",
    label: "Compliance",
    title: "The checks, as they happen",
    body: "Fridge temperatures, opening and closing checklists, named cleaning lists. Each one stamped with who and when.",
    href: "/features/compliance",
    icon: "clipboard", // §2 C1–C3
  },
  {
    id: "invoices",
    label: "Invoices",
    title: "Photograph it. Check it. Done.",
    body: "A delivery note becomes line items, matched to what you already buy, and updates stock and spend once you confirm.",
    href: "/features/invoice-scanning",
    icon: "receipt", // §2 E1
  },
  {
    id: "pay",
    label: "Pay",
    title: "Hours become pay, with the working shown",
    body: "Fortnightly periods built from recorded attendance. Rate changes never rewrite a closed period.",
    href: "/features#pay",
    icon: "wallet", // §2 D1
  },
];

export type FeatureBlock = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  bullets: string[];
  screenshot: ScreenshotId;
  link?: { href: string; label: string };
};

/** Features §9.2 — the four main blocks, in order. */
export const featureBlocks: FeatureBlock[] = [
  {
    id: "attendance",
    eyebrow: "Attendance & rota",
    title: "Know who was actually here",
    intro:
      "Staff check in and out by scanning a code at your door. The rota, the swaps and the hours all build on that record.",
    bullets: [
      "Refuses a check-in outside the radius you set, and says by how far.", // B1
      "Check-ins are matched to the shift on the rota where one exists.", // B1, B3
      "A manager's correction stays marked as a manual override — nothing is silently rewritten.", // B5
    ],
    screenshot: "scanRefused",
    link: { href: "/features/attendance", label: "Attendance & rota in detail" },
  },
  {
    id: "compliance",
    eyebrow: "Compliance records",
    title: "Prove the checks were done",
    intro:
      "Opening and closing routines, fridge temperatures and named checklists are recorded on the phone as the work happens.",
    bullets: [
      "Every completion is stamped with who did it and when.", // C1, C3
      "A temperature above a unit's recommended maximum is obvious as it is typed.", // C2
      "Licences and certificates are filed by category, with expiry dates flagged — managers only.", // C5
    ],
    screenshot: "checksDashboard",
    link: { href: "/features/compliance", label: "Compliance records in detail" },
  },
  {
    id: "invoices",
    eyebrow: "Invoices & stock",
    title: "Stop typing delivery notes",
    intro:
      "Photograph a delivery note, pick one from the gallery or upload the PDF. Invisiko reads the lines; a person checks them.",
    bullets: [
      "Each line is matched to a stock item you already buy, and nothing reaches stock until someone confirms.", // E1
      "A credit note is applied as a return, not a delivery.", // E1
      "Spend adds up per product across every supplier, with VAT kept separate.", // E4
    ],
    screenshot: "invoiceReview",
    link: { href: "/features/invoice-scanning", label: "Invoice scanning in detail" },
  },
  {
    id: "pay",
    eyebrow: "Pay",
    title: "Pay what the hours say",
    intro:
      "Hours flow from check-ins into fortnightly pay periods, costed against each person's rates.",
    bullets: [
      "Open a period, review the hours, close it, then mark it paid once the money has moved.", // D1
      "Staff see a running estimate of their own pay, and the final figure once the period closes.", // D1, J5
      "A closed pay period stays correct when a rate changes.", // D1 append-only RateChange
    ],
    screenshot: "payroll",
  },
];

export type MinorFeature = { title: string; body: string; icon: IconName };

/** Features §9.2 "Everything else". */
export const everythingElse: MinorFeature[] = [
  {
    title: "Shift swaps, with approval",
    body: "Staff offer a shift to a named colleague. It only changes hands when the manager approves.", // B4
    icon: "swap",
  },
  {
    title: "Who's on shift, live",
    body: "Everyone currently checked in, and how long they have been on.", // B6
    icon: "pulse",
  },
  {
    title: "Per-product spend",
    body: "What you have spent on each product, across suppliers, by week or month.", // E4
    icon: "pricetags",
  },
  {
    title: "Suppliers and storage areas",
    body: "Storage areas are picked up from what a delivery note says. Rename or retire either.", // E3
    icon: "business",
  },
  {
    title: "Stock levels",
    body: "Quantities on hand, a par level per item, and every movement with a reason and a name.", // E2
    icon: "cube",
  },
  {
    title: "Push notifications",
    body: "When a shift is added, changed or cancelled, and when a swap is requested or decided.", // F (event-driven only)
    icon: "notifications",
  },
  {
    title: "Invite-code onboarding",
    body: "Staff join your restaurant with one eight-character code. No accounts to create by hand.", // A2
    icon: "key",
  },
  {
    title: "Document vault",
    body: "Licences and certificates by category, with expiring and expired documents flagged.", // C5
    icon: "document",
  },
  {
    title: "Team analytics",
    body: "Staff cost by month, hours and minutes late per person. Staff see their own.", // D2
    icon: "bar-chart",
  },
];

/**
 * The honesty block (§9.1 section 6, §9.2 Limitations). A trust asset — do not delete.
 * `short` is used on Home; `full` on Features.
 */
export const limitations = [
  {
    short: "Not a till or ordering system.",
    full: "It isn't a till or ordering system. There are no menus, customer orders or card payments — it runs the back of house, not the front.",
  },
  {
    short: "Built for one restaurant, not a chain.",
    full: "It's built for one restaurant. An account belongs to a single restaurant, and there is no multi-site or head-office view.",
  },
  {
    short: "Needs a connection today.",
    full: "It needs a connection. Checking in, recording a check and reading an invoice all need the internet; there is no offline mode today.",
  },
];
