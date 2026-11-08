import nodemailer from "nodemailer";

/**
 * Sends the website's email through an ordinary SMTP mailbox (Google Workspace, Microsoft 365,
 * Zoho or your domain host). Server-only: the password never reaches the browser.
 *
 *   SMTP_HOST           e.g. smtp.gmail.com · smtp.office365.com · smtp.zoho.eu
 *   SMTP_PORT           587 (STARTTLS, the default) or 465 (TLS)
 *   SMTP_USER           the mailbox, e.g. support@invisiko.app
 *   SMTP_PASS           its password, or an app password where two-factor sign-in is on
 *   CONTACT_TO_EMAIL    optional; defaults to SMTP_USER
 *   CONTACT_FROM_EMAIL  optional; defaults to "Invisiko <SMTP_USER>"
 */

export type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  to: string;
  from: string;
};

/** The configuration, or null while any required setting is missing. */
export function smtpConfig(env: Record<string, string | undefined> = process.env): SmtpConfig | null {
  const host = env.SMTP_HOST?.trim();
  const user = env.SMTP_USER?.trim();
  const pass = env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  const port = Number.parseInt(env.SMTP_PORT ?? "", 10) || 587;
  return {
    host,
    port,
    secure: port === 465,
    user,
    pass,
    to: env.CONTACT_TO_EMAIL?.trim() || user,
    from: env.CONTACT_FROM_EMAIL?.trim() || `Invisiko <${user}>`,
  };
}

type Message = { replyTo: string; subject: string; text: string };

export async function sendMail(config: SmtpConfig, message: Message): Promise<void> {
  const transport = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    // On 587, refuse to send unless the connection upgrades to TLS.
    requireTLS: !config.secure,
    auth: { user: config.user, pass: config.pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  await transport.sendMail({
    from: config.from,
    to: config.to,
    replyTo: message.replyTo,
    // Never let a line break from form input reach a header.
    subject: message.subject.replace(/[\r\n]+/g, " "),
    text: message.text,
  });
}
