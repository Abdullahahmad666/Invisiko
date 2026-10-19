/**
 * Product screenshots the pages call for (PRODUCT_BLUEPRINT.md §9, §13).
 *
 * None exist yet. Each must be a real capture from the app — dark theme, taken from
 * `manage.py seed_demo` data with the demo restaurant renamed, never a live restaurant
 * and never a mock-up of an unbuilt feature (§13 "Screenshots without exposing a real
 * restaurant").
 *
 * To supply one: export it at 3x (e.g. 1170×2532 for a 390pt-wide phone), save it under
 * `public/screenshots/`, and set `src`, `width` and `height` below. Until `src` is set,
 * `PhoneFrame` renders a clearly labelled placeholder rather than a fabricated screen.
 */

export type Screenshot = {
  /** What the placeholder says is missing, and what the owner should capture. */
  label: string;
  /** Descriptive alt text for the real image. */
  alt: string;
  src?: string;
  width?: number;
  height?: number;
};

export const screenshots = {
  checksDashboard: {
    label: "Checks dashboard",
    alt: "The Invisiko Checks dashboard: today's opening and closing routines, fridge temperatures and the Documents tile.",
  },
  documents: {
    label: "Documents",
    alt: "The manager's Documents screen in Invisiko, with certificates filed by category and expiry dates flagged.",
  },
  invoiceReview: {
    label: "Invoice review, lines matched",
    alt: "The Invisiko invoice review screen, listing the lines read from a delivery note, each matched to a stock item, with a Confirm button.",
  },
  invoiceReviewUnmatched: {
    label: "Invoice review, one line unmatched",
    alt: "An invoice in review with one line still waiting to be matched to a stock item before it can be confirmed.",
  },
  invoiceCapture: {
    label: "Invoice capture row",
    alt: "The Invisiko inventory screen offering three ways to add an invoice: take a photo, choose from the gallery, or upload a PDF.",
  },
  purchaseHistory: {
    label: "Purchase history summary",
    alt: "Invisiko purchase history showing spend per product across suppliers, with goods, VAT and paid-out totals shown separately.",
  },
  scanRefused: {
    label: "Check-in refused outside the radius",
    alt: "An Invisiko scan result refusing a check-in because the phone is outside the venue's check-in radius, with the distance stated.",
  },
  rota: {
    label: "Weekly rota",
    alt: "The Invisiko weekly rota, with shifts per staff member and the estimated staff cost for the week.",
  },
  attendanceLive: {
    label: "Who's on shift now",
    alt: "The manager's live view in Invisiko, listing everyone currently checked in and how long they have been on shift.",
  },
  payroll: {
    // §11 — the payroll screen needs the owner's approval before it is shown publicly (§14 Q12).
    label: "Pay period (owner approval needed)",
    alt: "An Invisiko fortnightly pay period, listing each person's recorded hours and pay before the period is closed.",
  },
  temperatures: {
    label: "Fridge temperatures",
    alt: "Recording fridge and freezer temperatures in Invisiko, with a reading above the recommended maximum clearly marked.",
  },
  complianceHistory: {
    label: "Temperature history",
    alt: "Invisiko temperature history filtered to the last 14 days, showing each reading with who recorded it and when.",
  },
} satisfies Record<string, Screenshot>;

export type ScreenshotId = keyof typeof screenshots;
