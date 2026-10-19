/**
 * Request-access form: fields and validation, shared by the browser and the Route Handler so
 * the rules cannot drift (PRODUCT_BLUEPRINT.md §9.8).
 *
 * Fields are exactly the ones §9.8 lists — nothing the owner will not use.
 */

export const staffSizes = ["1–5", "6–15", "16–30", "30+"] as const;
export type StaffSize = (typeof staffSizes)[number];

export type ContactInput = {
  name: string;
  email: string;
  restaurant: string;
  staffSize: StaffSize | "";
  hardest: string;
  consent: boolean;
  /** Honeypot. Hidden from people and assistive technology; only bots fill it. */
  website: string;
};

export type ContactField = Exclude<keyof ContactInput, "website">;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const limits = {
  name: 120,
  email: 254,
  restaurant: 160,
  hardest: 2000,
} as const;

// Deliberately permissive: one "@", something either side, a dot in the domain, no spaces.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function emptyContactInput(): ContactInput {
  return { name: "", email: "", restaurant: "", staffSize: "", hardest: "", consent: false, website: "" };
}

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const restaurant = input.restaurant.trim();

  if (!name) errors.name = "Enter your name.";
  else if (name.length > limits.name) errors.name = `Keep your name under ${limits.name} characters.`;

  if (!email) errors.email = "Enter your email address.";
  else if (email.length > limits.email || !EMAIL_PATTERN.test(email))
    errors.email = "Enter an email address like name@example.com.";

  if (!restaurant) errors.restaurant = "Enter your restaurant's name.";
  else if (restaurant.length > limits.restaurant)
    errors.restaurant = `Keep the restaurant name under ${limits.restaurant} characters.`;

  if (input.staffSize && !staffSizes.includes(input.staffSize as StaffSize))
    errors.staffSize = "Choose one of the options.";

  if (input.hardest.length > limits.hardest) errors.hardest = `Keep this under ${limits.hardest} characters.`;

  if (!input.consent) errors.consent = "Tick the box so we can use these details to reply to you.";

  return errors;
}

/** Coerce untrusted JSON into a ContactInput without trusting any field's type. */
export function parseContactInput(body: unknown): ContactInput {
  const source = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const text = (value: unknown) => (typeof value === "string" ? value : "");
  return {
    name: text(source.name),
    email: text(source.email),
    restaurant: text(source.restaurant),
    staffSize: text(source.staffSize) as ContactInput["staffSize"],
    hardest: text(source.hardest),
    consent: source.consent === true,
    website: text(source.website),
  };
}
