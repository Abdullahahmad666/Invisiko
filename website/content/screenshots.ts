/**
 * Product screenshots the pages use (PRODUCT_BLUEPRINT.md §9, §13).
 *
 * Files in public/screenshots/ are built by `npm run screenshots` from the raw captures in
 * assets/screens/, which stay out of git because they hold real names, an address and live codes.
 * See scripts/build-screenshots.mjs for the redactions, and for raw screens that must not be used.
 *
 * An entry without `src` makes `PhoneFrame` show a clearly labelled placeholder rather than a
 * fabricated screen. Every screen on the site is real today; a test keeps it that way.
 */

export type Screenshot = {
  /** What the placeholder says is missing, and what the owner should capture. */
  label: string;
  /** Describes what is on the screen, for people who cannot see it. */
  alt: string;
  src?: string;
  width?: number;
  height?: number;
};

const SHOT = { width: 1080, height: 2400 };

export const screenshots = {
  welcomeManager: {
    label: "Welcome, manager",
    alt: "The Invisiko welcome screen with Manager selected, offering Create an account or Sign in.",
    src: "/screenshots/welcome-manager.webp",
    ...SHOT,
  },
  welcomeStaff: {
    label: "Welcome, staff",
    alt: "The Invisiko welcome screen with Staff selected, offering Enter your invite code or Sign in.",
    src: "/screenshots/welcome-staff.webp",
    ...SHOT,
  },
  checksDashboard: {
    label: "Checks dashboard",
    alt: "The Invisiko Checks dashboard: tiles for the opening and closing routines, other checklists and temperature history, and a Manage section for fridges and checklists.",
    src: "/screenshots/manager-checks-dashboard.webp",
    ...SHOT,
  },
  openingRoutine: {
    label: "Opening routine",
    alt: "The opening routine in Invisiko, with tiles for fridge and freezer temperatures and the opening checklist.",
    src: "/screenshots/staff-opening-routine.webp",
    ...SHOT,
  },
  fridges: {
    label: "Fridges & freezers",
    alt: "The Fridges & freezers list in Invisiko, showing a registered unit with a recommended maximum of 5.0°C and a button to add another.",
    src: "/screenshots/manager-fridges-freezers.webp",
    ...SHOT,
  },
  complianceHistory: {
    label: "Temperature history",
    alt: "Invisiko temperature history, with filters for 7, 14 or 30 days and for all, opening or closing readings.",
    src: "/screenshots/manager-temperature-history.webp",
    ...SHOT,
  },
  documents: {
    label: "Documents",
    alt: "The manager's Documents screen in Invisiko: a category filter, buttons to take a photo, choose from the gallery or upload a PDF, and a filed document.",
    src: "/screenshots/manager-documents.webp",
    ...SHOT,
  },
  invoiceCapture: {
    label: "Invoice capture and stock",
    alt: "The Invisiko Food screen: take a photo, choose from the gallery or upload a PDF of a delivery invoice, above a stock item showing its quantity, unit cost and a delivery received.",
    src: "/screenshots/food-invoice-capture-stock.webp",
    ...SHOT,
  },
  inventory: {
    label: "Stock items",
    alt: "Invisiko's list of stock items, each with its pack size, quantity on hand, unit cost and an optional par level.",
    src: "/screenshots/manager-inventory.webp",
    ...SHOT,
  },
  purchaseHistory: {
    label: "Purchase history",
    alt: "Invisiko purchase history: goods, VAT and paid-out totals for confirmed invoices, a spend chart, and spend per product.",
    src: "/screenshots/manager-purchase-history.webp",
    ...SHOT,
  },
  staffScan: {
    label: "Scan to clock in",
    alt: "The Invisiko Scan screen: a camera frame with the instruction Scan to clock in or out, line up the code inside the frame.",
    src: "/screenshots/staff-scan.webp",
    ...SHOT,
  },
  checkInSetup: {
    label: "Check-in code setup",
    alt: "Creating a check-in code in Invisiko: use the phone's current location or enter a latitude and longitude, and set the radius, here 100 metres.",
    src: "/screenshots/manager-check-in-setup.webp",
    ...SHOT,
  },
  inviteTeam: {
    label: "Invite your team",
    alt: "The Invite your team screen in Invisiko, with an invite code (hidden here), buttons to share or copy it, and Generate new code.",
    src: "/screenshots/manager-invite-team.webp",
    ...SHOT,
  },
  rota: {
    label: "Weekly rota",
    alt: "The Invisiko weekly rota, with the estimated staff cost for the week at the top and a day-by-day list with buttons to add staff.",
    src: "/screenshots/manager-weekly-rota.webp",
    ...SHOT,
  },
  staffHub: {
    label: "Staff hub",
    alt: "The manager's Staff screen in Invisiko, with tiles for who is on shift now, inviting staff, all staff and attendance history.",
    src: "/screenshots/manager-staff-hub.webp",
    ...SHOT,
  },
  payroll: {
    label: "Pay periods",
    alt: "The Invisiko Payroll screen, with a button to open the next fortnightly pay period and a monthly cost report.",
    src: "/screenshots/manager-payroll.webp",
    ...SHOT,
  },
  signIn: {
    label: "Sign in",
    alt: "The Invisiko sign-in screen, with fields for email and password and a link to set up an account with an invite code.",
    src: "/screenshots/sign-in.webp",
    ...SHOT,
  },
  staffAnalytics: {
    label: "My attendance",
    alt: "A staff member's analytics in Invisiko: minutes late this month, on-time and late check-ins, and hours and pay by month.",
    src: "/screenshots/staff-analytics.webp",
    ...SHOT,
  },
  swapRequests: {
    label: "Swap requests",
    alt: "The manager's Swap requests screen in Invisiko, with pending requests to review and past decisions.",
    src: "/screenshots/manager-swap-requests.webp",
    ...SHOT,
  },
} satisfies Record<string, Screenshot>;

export type ScreenshotId = keyof typeof screenshots;
