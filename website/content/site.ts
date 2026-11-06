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
  /** §14 Q5 — legal entity for copyright, privacy and terms. */
  legalName: fromEnv(process.env.NEXT_PUBLIC_LEGAL_NAME, "[[LEGAL_NAME]]"),
  /** §14 Q10 — store badges render only once these are real URLs. */
  appStoreUrl: fromEnv(process.env.NEXT_PUBLIC_APP_STORE_URL, "[[APP_STORE_URL]]"),
  playStoreUrl: fromEnv(process.env.NEXT_PUBLIC_PLAY_STORE_URL, "[[PLAY_STORE_URL]]"),
  /**
   * §9.10 / §14 Q7 — the product already serves the canonical privacy policy and support page.
   * This website links to them rather than keeping a second, divergent copy.
   */
  appPrivacyUrl: fromEnv(process.env.NEXT_PUBLIC_APP_PRIVACY_URL, "[[APP_PRIVACY_URL]]"),
  appSupportUrl: fromEnv(process.env.NEXT_PUBLIC_APP_SUPPORT_URL, "[[APP_SUPPORT_URL]]"),
  copyrightYear: 2026,
} as const;

export type NavLink = { href: string; label: string };

export const primaryNav: NavLink[] = [
  { href: "/features", label: "Features" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
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
