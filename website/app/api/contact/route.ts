import { NextResponse, type NextRequest } from "next/server";
import { parseContactInput, validateContact, type ContactInput } from "@/lib/contact";
import { sendMail, smtpConfig } from "@/lib/mail";

/**
 * Request-access enquiries (PRODUCT_BLUEPRINT.md §9.8, §13).
 *
 * Owned entirely by the website: it never touches the product's API or database. Enquiries are
 * emailed through the support@invisiko.app mailbox over SMTP (lib/mail.ts) and not stored anywhere,
 * so no personal data is kept at rest.
 *
 * Until SMTP_HOST, SMTP_USER and SMTP_PASS are set the endpoint answers 503, and the form keeps
 * what was typed and offers the email address instead.
 */

const MAX_BODY_BYTES = 10_000;
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 };

// Best-effort, per-instance limit. Enough to blunt a burst from one address; not a security
// boundary (serverless instances do not share memory).
const recent = new Map<string, number[]>();

function rateLimited(key: string, now = Date.now()): boolean {
  const windowStart = now - RATE_LIMIT.windowMs;
  const hits = (recent.get(key) ?? []).filter((time) => time > windowStart);
  hits.push(now);
  recent.set(key, hits);
  if (recent.size > 5_000) recent.clear();
  return hits.length > RATE_LIMIT.max;
}

function sameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // Non-browser clients send none; validation still applies.
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

function emailText(input: ContactInput): string {
  return [
    "New request for access from the website.",
    "",
    `Name: ${input.name.trim()}`,
    `Email: ${input.email.trim()}`,
    `Restaurant: ${input.restaurant.trim()}`,
    `Number of staff: ${input.staffSize || "Not given"}`,
    "",
    "What's hardest right now:",
    input.hardest.trim() || "Not given",
    "",
    "Consent to be contacted about this request: yes",
  ].join("\n");
}

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "too_large" }, { status: 413 });
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return NextResponse.json({ error: "too_large" }, { status: 413 });
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const input = parseContactInput(body);

  // A filled honeypot is a bot. Answer as if it worked so it learns nothing; send nothing.
  if (input.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "invalid", errors }, { status: 422 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const config = smtpConfig();
  if (!config) {
    console.error("[contact] Enquiry not sent: SMTP_HOST, SMTP_USER or SMTP_PASS is not set.");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    await sendMail(config, {
      // Reply goes straight to the person who asked.
      replyTo: input.email.trim(),
      subject: `Request for access — ${input.restaurant.trim().slice(0, 80)}`,
      text: emailText(input),
    });
  } catch (error) {
    // Log the kind of failure only: never the password or the enquiry itself.
    const code = error && typeof error === "object" && "code" in error ? String(error.code) : "unknown";
    console.error(`[contact] Email not sent (${code}).`);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
