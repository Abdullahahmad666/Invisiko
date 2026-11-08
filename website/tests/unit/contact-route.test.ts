// @vitest-environment node
import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const sendMail = vi.fn();
const createTransport = vi.fn<(options: Record<string, unknown>) => { sendMail: typeof sendMail }>(() => ({ sendMail }));
vi.mock("nodemailer", () => ({ default: { createTransport } }));

const { POST } = await import("@/app/api/contact/route");
const { smtpConfig } = await import("@/lib/mail");

const valid = {
  name: "Sam Patel",
  email: "sam@example.co.uk",
  restaurant: "The Clay Oven",
  staffSize: "6–15",
  hardest: "The fridge log",
  consent: true,
  website: "",
};

let ip = 0;
function post(body: unknown, headers: Record<string, string> = {}) {
  ip += 1; // A fresh address each time, so the rate limit never interferes.
  return POST(
    new NextRequest("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "content-type": "application/json", "x-forwarded-for": `10.0.0.${ip}`, ...headers },
    }),
  );
}

const SMTP = { SMTP_HOST: "smtp.example.com", SMTP_USER: "support@invisiko.app", SMTP_PASS: "app-password" };

beforeEach(() => {
  sendMail.mockReset().mockResolvedValue({ messageId: "1" });
  createTransport.mockClear();
  for (const [key, value] of Object.entries(SMTP)) vi.stubEnv(key, value);
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("smtpConfig", () => {
  it("is null until host, user and password are all set", () => {
    expect(smtpConfig({ SMTP_HOST: "smtp.example.com", SMTP_USER: "support@invisiko.app" })).toBeNull();
  });

  it("defaults to port 587 with STARTTLS, and to the mailbox as sender and recipient", () => {
    expect(smtpConfig(SMTP)).toMatchObject({
      port: 587,
      secure: false,
      to: "support@invisiko.app",
      from: "Invisiko <support@invisiko.app>",
    });
  });

  it("uses implicit TLS on port 465", () => {
    expect(smtpConfig({ ...SMTP, SMTP_PORT: "465" })).toMatchObject({ port: 465, secure: true });
  });
});

describe("POST /api/contact", () => {
  it("emails the enquiry, with replies going to the person who asked", async () => {
    const response = await post(valid);
    expect(response.status).toBe(200);
    expect(sendMail).toHaveBeenCalledTimes(1);
    const message = sendMail.mock.calls[0][0];
    expect(message).toMatchObject({
      from: "Invisiko <support@invisiko.app>",
      to: "support@invisiko.app",
      replyTo: "sam@example.co.uk",
      subject: "Request for access — The Clay Oven",
    });
    expect(message.text).toContain("The fridge log");
    expect(createTransport.mock.calls[0][0]).toMatchObject({ host: "smtp.example.com", requireTLS: true });
  });

  it("keeps line breaks out of the subject", async () => {
    await post({ ...valid, restaurant: "Clay\r\nBcc: someone@example.com" });
    expect(sendMail.mock.calls[0][0].subject).not.toMatch(/[\r\n]/);
  });

  it("answers 503 and sends nothing until SMTP is configured", async () => {
    vi.stubEnv("SMTP_PASS", "");
    const response = await post(valid);
    expect(response.status).toBe(503);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("answers 502 when the mail server refuses, without logging the password", async () => {
    sendMail.mockRejectedValue(Object.assign(new Error("Invalid login: app-password"), { code: "EAUTH" }));
    const response = await post(valid);
    expect(response.status).toBe(502);
    const logged = (console.error as unknown as { mock: { calls: unknown[][] } }).mock.calls.flat().join(" ");
    expect(logged).toContain("EAUTH");
    expect(logged).not.toContain("app-password");
  });

  it("rejects invalid input without sending", async () => {
    const response = await post({ ...valid, email: "not-an-email", consent: false });
    expect(response.status).toBe(422);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("quietly drops bots that fill the honeypot", async () => {
    const response = await post({ ...valid, website: "https://spam.example" });
    expect(response.status).toBe(200);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("refuses requests from another site", async () => {
    const response = await post(valid, { origin: "https://evil.example", host: "invisiko.app" });
    expect(response.status).toBe(403);
    expect(sendMail).not.toHaveBeenCalled();
  });
});
