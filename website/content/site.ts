/**
 * Site-wide facts.
 *
 * Every value the product owner has not yet confirmed is a `[[PLACEHOLDER]]` token
 * (PRODUCT_BLUEPRINT.md §14). They are deliberately greppable:
 *
 *   grep -rn "\[\[" content app components lib
 *
 * must return nothing before launch. Public values can be supplied through
 * `NEXT_PUBLIC_*` environment variables (see `.env.example`) without editing code.
 */

function fromEnv(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

/** True while a value is still an unresolved `[[TOKEN]]`. */
export function isPlaceholder(value: string): boolean {
  return value.startsWith("[[") && value.endsWith("]]");
}

export const site = {
  /** §14 Q1 — confirmed by the owner as the public name. */
  name: "Invisiko",
  /** The product's own in-app tagline (§10). */
  tagline: "Staff, cost and compliance - sorted.",
  description:
    "A mobile app that runs the back of house for an independent takeaway or small restaurant: staff hours, food-safety records, pay and delivery invoices.",
  /**
   * §14 Q2 — the domain is invisiko.app (confirmed through the owner's support address). The
   * apex is the canonical host by default; set NEXT_PUBLIC_SITE_URL if www is chosen instead.
   */
  url: fromEnv(process.env.NEXT_PUBLIC_SITE_URL, "https://invisiko.app").replace(/\/$/, ""),
  /** §14 Q4 / Q18 — confirmed by the owner: one role address on the product's own domain. */
  contactEmail: fromEnv(process.env.NEXT_PUBLIC_CONTACT_EMAIL, "support@invisiko.app"),
  supportEmail: fromEnv(process.env.NEXT_PUBLIC_SUPPORT_EMAIL, "support@invisiko.app"),
  /** No separate privacy address was given, so privacy requests go to the same role address. */
  privacyEmail: fromEnv(process.env.NEXT_PUBLIC_PRIVACY_EMAIL, "support@invisiko.app"),
  /** §14 Q4 — confirmed by the owner. Read as "Within 24–48 hours, …". */
  replyTime: fromEnv(process.env.NEXT_PUBLIC_REPLY_TIME, "24–48 hours"),
  /** §14 Q5 — confirmed by the owner. Used for copyright, privacy, terms and Organization data. */
  legalName: fromEnv(process.env.NEXT_PUBLIC_LEGAL_NAME, "Invisiko"),
  /** Confirmed by the owner. Shown on About and in the footer; used in Organization data. */
  location: { locality: "London", country: "UK", countryCode: "GB" },
  /** §14 Q10 — the App Store badge renders only once this is a real URL. Invisiko is iPhone only. */
  appStoreUrl: fromEnv(process.env.NEXT_PUBLIC_APP_STORE_URL, "[[APP_STORE_URL]]"),
  copyrightYear: 2026,
} as const;

export type NavLink = { href: string; label: string };

export const primaryNav: NavLink[] = [
  { href: "/features", label: "Features" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

/**
 * The feature pages, for the header's Features menu, the mobile menu and the switcher at the end
 * of each feature page — one list so every route to a feature says the same thing.
 */
export type FeatureNavLink = NavLink & { description: string; icon: "location" | "clipboard" | "receipt" | "wallet" };

export const featureNav: FeatureNavLink[] = [
  {
    href: "/features/attendance",
    label: "Attendance & rota",
    description: "QR check-in that checks where the phone is, the rota and swaps.",
    icon: "location",
  },
  {
    href: "/features/compliance",
    label: "Compliance records",
    description: "Temperatures, opening and closing checks, and your certificates.",
    icon: "clipboard",
  },
  {
    href: "/features/invoice-scanning",
    label: "Invoice scanning",
    description: "Photograph a delivery note; confirm the lines into stock and spend.",
    icon: "receipt",
  },
  {
    href: "/features#pay",
    label: "Pay",
    description: "Fortnightly pay periods built from recorded hours.",
    icon: "wallet",
  },
];

/** §11 — the only honest primary action while pricing and self-serve signup are unknown (§14 Q3). */
export const primaryCta: NavLink = { href: "/contact", label: "Request access" };

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Product",
    links: [
      { href: "/features", label: "Features" },
      { href: "/features/attendance", label: "Attendance & rota" },
      { href: "/features/compliance", label: "Compliance records" },
      { href: "/features/invoice-scanning", label: "Invoice scanning" },
      { href: "/how-it-works", label: "How it works" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/support", label: "Support" },
      { href: "/faq", label: "FAQ" },
    ],
  },
];
