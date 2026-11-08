/**
 * App screens the pages use (PRODUCT_BLUEPRINT.md §9, §13).
 *
 * The welcome screens are real captures (scripts/build-screenshots.mjs). Everything else is a demo
 * screen: a recreation of a built screen with fictional data for a made-up restaurant, drawn by
 * scripts/build-demo-screens.mjs. The site's footer says so. Raw captures stay out of git.
 *
 * An entry without `src` makes `PhoneFrame` show a clearly labelled placeholder rather than an
 * empty frame. Every screen on the site has a file today; a test keeps it that way.
 */

export type Screenshot = {
  /** What a placeholder would say is missing. */
  label: string;
  /** Describes what is on the screen, for people who cannot see it. */
  alt: string;
  src?: string;
  width?: number;
  height?: number;
};

const shot = (file: string, label: string, alt: string): Screenshot => ({
  label,
  alt,
  src: `/screenshots/${file}.webp`,
  width: 1080,
  height: 2400,
});

export const screenshots = {
  splash: shot("app-splash", "Splash screen", "The Invisiko splash screen as the app opens: the logo, the name, and the tagline Staff, cost and compliance - sorted."),
  welcomeManager: shot("welcome-manager", "Welcome, manager", "The Invisiko welcome screen with Manager selected, offering Create an account or Sign in."),
  welcomeStaff: shot("welcome-staff", "Welcome, staff", "The Invisiko welcome screen with Staff selected, offering Enter your invite code or Sign in."),
  joinTeam: shot("staff-join", "Enter your invite code", "Entering an invite code in Invisiko: the code is accepted and the screen confirms the restaurant being joined."),
  checksDashboard: shot("manager-checks-dashboard", "Checks dashboard", "The Invisiko Checks dashboard: tiles for today's opening and closing routines, other checklists and temperature history, and a Manage section showing fridges, checklists and one expired document."),
  openingRoutine: shot("staff-opening-routine", "Opening routine", "The opening routine in Invisiko, with tiles for fridge and freezer temperatures and the opening checklist, both complete."),
  checklist: shot("staff-checklist", "Named checklist", "A daily checklist called Toilet cleaning in Invisiko: three tasks ticked, each with who did it and when, and two still to do."),
  temperatures: shot("staff-fridge-temperatures", "Recording temperatures", "Recording fridge temperatures in Invisiko with plus and minus steppers. One reading is above its maximum and marked in red, with space for a note."),
  fridges: shot("manager-fridges-freezers", "Fridges & freezers", "The Fridges & freezers list in Invisiko: four units, each with its recommended maximum temperature, and a button to add another."),
  complianceHistory: shot("manager-temperature-history", "Temperature history", "Invisiko temperature history with filters for 7, 14 or 30 days and for opening or closing, listing each reading with who recorded it and when."),
  documents: shot("manager-documents", "Documents", "The manager's Documents screen in Invisiko: licences, insurance and certificates with their expiry status, one expiring soon, one expired and one that does not expire."),
  invoiceCapture: shot("food-invoice-capture-stock", "Invoice capture and stock", "The Invisiko Food screen: take a photo, choose from the gallery or upload a PDF of a delivery invoice, above a stock item with a delivery recorded from an invoice scan."),
  invoiceReview: shot("invoice-review", "Invoice review", "Reviewing a scanned invoice in Invisiko: the supplier, invoice number and date, each line matched to a stock item, goods, VAT and total, and a Confirm button."),
  invoiceReviewUnmatched: shot("invoice-review-unmatched", "Invoice review, one line unmatched", "An invoice in review with one line highlighted and waiting to be matched to a stock item. The Confirm button is disabled until it is."),
  purchaseHistory: shot("manager-purchase-history", "Purchase history", "Invisiko purchase history: goods, VAT and paid-out totals for confirmed invoices, a monthly spend chart, and spend per product."),
  staffScan: shot("staff-scan", "Scan to clock in", "The Invisiko Scan screen: a camera frame with the instruction Scan to clock in or out."),
  scanRefused: shot("staff-scan-refused", "Check-in refused", "A refused check-in in Invisiko: You are 340m from The Clay Oven, outside the 100m check-in radius."),
  staffAnalytics: shot("staff-analytics", "My attendance", "A staff member's analytics in Invisiko: minutes late this month, on-time and late check-ins, and hours worked by month."),
  checkInSetup: shot("manager-check-in-setup", "Check-in code setup", "Setting a check-in code in Invisiko: the venue's latitude and longitude, taken from the phone's location, and a radius of 100 metres."),
  inviteTeam: shot("manager-invite-team", "Invite your team", "The Invite your team screen in Invisiko, with an invite code, buttons to share or copy it, and Generate new code."),
  rota: shot("manager-weekly-rota", "Weekly rota", "The Invisiko weekly rota: the estimated staff cost for the week at the top, then each day's shifts with names, jobs and times."),
  attendanceLive: shot("manager-on-shift", "Who's on shift now", "The manager's live view in Invisiko: three people on shift, each with their job, check-in time and how long they have been on."),
  swapRequests: shot("manager-swap-requests", "Swap requests", "The manager's Swap requests screen in Invisiko: a pending request with Approve and Decline buttons, and past decisions."),
  payroll: shot("manager-payroll", "Pay periods", "The Invisiko Payroll screen: an open fortnightly pay period, a finished one ready to mark as paid, a paid one, and a monthly cost report."),
} satisfies Record<string, Screenshot>;

export type ScreenshotId = keyof typeof screenshots;
