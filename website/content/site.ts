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
  /** §14 Q1 — "Invisiko" is verified in the app; finality as the public name is unconfirmed. */
  name: "Invisiko",
  /** The product's own in-app tagline (§10). */
  tagline: "Staff, cost and compliance - sorted.",
  description:
    "A mobile app that runs the back of house for an independent takeaway or small restaurant: staff hours, food-safety records, pay and delivery invoices.",
  /**
   * §14 Q2 — `invisiko.app` is implied by the product's default sender address but is
   * not confirmed. [[DOMAIN]] Set NEXT_PUBLIC_SITE_URL once the canonical host is chosen.
   */
  url: fromEnv(process.env.NEXT_PUBLIC_SITE_URL, "https://invisiko.app").replace(/\/$/, ""),
  /** §14 Q4 — where enquiries go. */
  contactEmail: fromEnv(process.env.NEXT_PUBLIC_CONTACT_EMAIL, "[[CONTACT_EMAIL]]"),
  /** §14 Q18 — must be a role address on the product's own domain, never a personal one. */
  supportEmail: fromEnv(process.env.NEXT_PUBLIC_SUPPORT_EMAIL, "[[SUPPORT_EMAIL]]"),
  privacyEmail: fromEnv(process.env.NEXT_PUBLIC_PRIVACY_EMAIL, "[[PRIVACY_EMAIL]]"),
  /** §14 Q4 — a realistic reply time, e.g. "two working days". */
  replyTime: fromEnv(process.env.NEXT_PUBLIC_REPLY_TIME, "[[REPLY_TIME]]"),
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
