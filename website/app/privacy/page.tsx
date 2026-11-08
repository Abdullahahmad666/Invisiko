import Link from "next/link";
import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  IoAlertCircleOutline,
  IoArrowForward,
  IoBanOutline,
  IoBriefcaseOutline,
  IoCalendarOutline,
  IoCameraOutline,
  IoCheckmarkCircle,
  IoDocumentTextOutline,
  IoImageOutline,
  IoLocationOutline,
  IoMailOutline,
  IoPersonOutline,
  IoServerOutline,
  IoSparklesOutline,
  IoTrashOutline,
  IoWalletOutline,
} from "react-icons/io5";
import { EmailLink } from "@/components/Fill";
import { LegalToc } from "@/components/LegalToc";
import { LegalTopic } from "@/components/LegalTopic";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionNav } from "@/components/SectionNav";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/privacy");

/*
 * The canonical privacy policy for the Invisiko app and this website. The policy text is the
 * owner's (dated 7 November 2026), presented for the web: the wording is unchanged, only grouped
 * into cards, a table and steps. "The short version" summarises it and links to each section; the
 * "This website" section is added here, so the page carries the later date. The app should link to
 * this page; if the policy changes, change it here.
 */

const LAST_UPDATED = "8 November 2026";

const sections = [
  { id: "what-we-collect", label: "What we collect" },
  { id: "how-its-used", label: "How it's used" },
  { id: "invoice-photos-and-ai", label: "Invoice photos and AI" },
  { id: "who-we-share-with", label: "Who we share with" },
  { id: "how-long-we-keep-it", label: "How long we keep it" },
  { id: "your-rights", label: "Your rights" },
  { id: "deleting-your-account", label: "Deleting your account" },
  { id: "children", label: "Children" },
  { id: "this-website", label: "This website" },
  { id: "changes", label: "Changes" },
  { id: "contact", label: "Contact" },
];

const shortVersion: { Icon: IconType; title: string; body: string; href: string }[] = [
  {
    Icon: IoBriefcaseOutline,
    title: "Your employer controls the account",
    body: "The restaurant decides who is invited. Invisiko provides the app and runs it.",
    href: "#what-we-collect",
  },
  {
    Icon: IoLocationOutline,
    title: "Location is read once",
    body: "At check-in or check-out only — never tracked continuously.",
    href: "#what-we-collect",
  },
  {
    Icon: IoBanOutline,
    title: "Not sold, no advertising",
    body: "Data is used only to run the app's own features for your employer.",
    href: "#how-its-used",
  },
  {
    Icon: IoSparklesOutline,
    title: "AI reads invoices, a person checks",
    body: "Invoice photos go to OpenAI to be read, and are always reviewed before saving.",
    href: "#invoice-photos-and-ai",
  },
  {
    Icon: IoTrashOutline,
    title: "Delete your account yourself",
    body: "From Profile in the app. Employment records your employer must keep stay.",
    href: "#deleting-your-account",
  },
  {
    Icon: IoCheckmarkCircle,
    title: "This website sets no cookies",
    body: "No analytics or advertising trackers, and form details are not stored.",
    href: "#this-website",
  },
];

const collected: { Icon: IconType; title: string; body: string }[] = [
  { Icon: IoPersonOutline, title: "Account details", body: "Name, email address, phone number, and your role (staff or manager)." },
  {
    Icon: IoLocationOutline,
    title: "Location",
    body: "Your device's GPS position is read once, at the moment you check in or out of a shift, to confirm you were at the venue. It is not tracked continuously or collected at any other time.",
  },
  { Icon: IoCalendarOutline, title: "Attendance and schedule", body: "Clock-in and clock-out times, rota shifts, and shift-swap requests." },
  { Icon: IoWalletOutline, title: "Pay information", body: "Hourly rates and calculated pay, visible to you and to managers at your restaurant." },
  {
    Icon: IoCameraOutline,
    title: "Photos you upload",
    body: "Fridge and freezer photos, food-safety checklist records, and supplier invoice photos, used only for the compliance and stock features you choose to use.",
  },
  { Icon: IoImageOutline, title: "Profile picture", body: "Optional, set by you." },
];

const processors: [string, string][] = [
  ["Render", "Hosts the backend application."],
  ["Neon", "Hosts the database."],
  ["Amazon Web Services (S3)", "Stores uploaded photos."],
  ["OpenAI", "Reads invoice photos, as described above."],
];

const strong = "font-semibold text-fg";

export default function PrivacyPage() {
  const n = (id: string) => sections.findIndex((section) => section.id === id) + 1;

  return (
    <>
      <PageHero
        path="/privacy"
        eyebrow="Legal"
        title="Privacy policy"
        lead="What personal data the Invisiko app and this website collect, why, who processes it, and how to have it removed."
      >
        <p className="flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem] text-muted">
          <span>
            Last updated <strong className="text-fg">{LAST_UPDATED}</strong>
          </span>
        </p>
      </PageHero>

      <SectionNav items={sections} className="lg:hidden" />

      {/* The short version */}
      <Section tone="light" labelledBy="short-version">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label-caps text-accent-text">In brief</p>
            <h2 id="short-version" className="mt-2 text-[1.75rem] font-semibold tracking-[-0.02em] sm:text-[2.25rem]">
              The short version
            </h2>
          </div>
          <p className="max-w-[26rem] text-[0.9375rem] text-muted">
            A summary to help you find your way. The full policy below is what applies.
          </p>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shortVersion.map(({ Icon, title, body, href }, index) => (
            <li key={title} data-reveal style={{ "--stagger": index % 3 } as CSSProperties}>
              <a
                href={href}
                className="group lift flex h-full flex-col rounded-2xl border border-line bg-surface p-6 hover:border-line-strong"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-amber text-ink">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <span className="mt-5 text-lg font-semibold leading-snug">{title}</span>
                <span className="mt-2 text-muted">{body}</span>
                <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-accent-text">
                  Read the detail
                  <IoArrowForward
                    aria-hidden="true"
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      {/* The full policy */}
      <Section tone="light" labelledBy="what-we-collect" className="border-t border-[#DCDCE0]">
        <div className="grid gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-20">
          <LegalToc items={sections} updated={LAST_UPDATED} />

          <div>
            <div className="mb-12 max-w-[68ch] space-y-4 text-[1.0625rem] text-muted">
              <p>
                Invisiko (&ldquo;the app&rdquo;) is a staff management app used by a restaurant or takeaway (&ldquo;the
                business&rdquo;) to run attendance, payroll, food-safety compliance and stock management for its own
                employees. This policy explains what personal data the app collects, why, and how it is handled.
              </p>
              <p>
                The business you work for (or that employs your staff, if you are a manager) controls the account and
                decides who is invited to use it. Invisiko provides the app and the infrastructure it runs on.
              </p>
            </div>

            <LegalTopic id="what-we-collect" number={n("what-we-collect")} title="What we collect">
              <ul className="grid gap-3 sm:grid-cols-2">
                {collected.map(({ Icon, title, body }) => (
                  <li key={title} className="rounded-2xl border border-line bg-surface p-5">
                    <span className="flex items-center gap-3">
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-surface-raised text-accent-text">
                        <Icon aria-hidden="true" className="size-[1.125rem]" />
                      </span>
                      <span className={strong}>{title}</span>
                    </span>
                    <span className="mt-3 block text-[0.9375rem]">{body}</span>
                  </li>
                ))}
              </ul>
            </LegalTopic>

            <LegalTopic id="how-its-used" number={n("how-its-used")} title="How it's used">
              <p>
                Data is used only to operate the app&apos;s own features for your employer: recording attendance,
                calculating pay, running food-safety checks, and tracking stock and invoices.{" "}
                <strong className={strong}>We do not sell personal data, and we do not use it for advertising.</strong>
              </p>
            </LegalTopic>

            <LegalTopic id="invoice-photos-and-ai" number={n("invoice-photos-and-ai")} title="Invoice photos and AI">
              <div className="flex gap-4 rounded-2xl border border-amber/50 bg-amber/10 p-5 text-fg sm:p-6">
                <IoSparklesOutline aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-[#8F5300]" />
                <p>
                  When a manager or staff member photographs a supplier invoice, the photo is sent to a third-party AI
                  service (OpenAI) to read the items, quantities and prices off it automatically. That reading is always a
                  draft — a person reviews and corrects it before anything is saved to stock records.
                </p>
              </div>
            </LegalTopic>

            <LegalTopic id="who-we-share-with" number={n("who-we-share-with")} title="Who we share data with">
              <p>
                We use a small number of service providers to run the app. None of them use your data for their own
                purposes — they process it only to provide their service to us:
              </p>
              <div className="overflow-hidden rounded-2xl border border-line bg-surface">
                <table className="w-full text-left text-[0.9375rem]">
                  <caption className="sr-only">Service providers that process data for the Invisiko app</caption>
                  <thead className="bg-surface-raised">
                    <tr>
                      <th scope="col" className="label-caps px-5 py-3 text-muted">
                        Provider
                      </th>
                      <th scope="col" className="label-caps px-5 py-3 text-muted">
                        What they do
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {processors.map(([provider, role]) => (
                      <tr key={provider}>
                        <th scope="row" className={`px-5 py-4 align-top ${strong}`}>
                          {provider}
                        </th>
                        <td className="px-5 py-4 align-top">{role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </LegalTopic>

            <LegalTopic id="how-long-we-keep-it" number={n("how-long-we-keep-it")} title="How long we keep it">
              <p>
                Data is kept for as long as your account is active with your employer&apos;s restaurant. If a manager
                deactivates your account, your historical attendance and payroll records are retained for the
                business&apos;s own record-keeping (standard practice for employment records), but your account can no
                longer sign in.
              </p>
            </LegalTopic>

            <LegalTopic id="your-rights" number={n("your-rights")} title="Your rights">
              <p>
                You can ask your manager (who controls the account) or contact us directly to{" "}
                <strong className={strong}>access, correct, or request deletion</strong> of your personal data, subject to
                the business&apos;s own legal obligations to retain employment records.
              </p>
            </LegalTopic>

            <LegalTopic id="deleting-your-account" number={n("deleting-your-account")} title="Deleting your account">
              <p>You can delete your account yourself, from inside the app. It is permanent and cannot be undone.</p>
              <ol className="grid gap-3 sm:grid-cols-3">
                {[
                  ["Open Profile", "In the app."],
                  ["Choose Delete my account", "From your profile."],
                  ["Confirm with your password", "It cannot be undone."],
                ].map(([title, body], index) => (
                  <li key={title} className="rounded-2xl border border-line bg-surface p-5">
                    <span className="grid size-8 place-items-center rounded-full bg-amber text-sm font-semibold text-ink">
                      {index + 1}
                    </span>
                    <span className={`mt-3 block ${strong}`}>{title}</span>
                    <span className="mt-1 block text-[0.9375rem]">{body}</span>
                  </li>
                ))}
              </ol>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
                  <p className="label-caps text-accent-text">What is deleted</p>
                  <p className="mt-3">
                    Your email address, phone number, profile photo and password are destroyed, every signed-in session
                    ends, and you will not be able to sign in again.
                  </p>
                  <p className="mt-3">
                    If your account has no employment records against it, nothing is kept at all — the account, and your
                    name with it, is erased outright.
                  </p>
                </div>
                <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
                  <p className="label-caps text-accent-text">What stays, and why</p>
                  <p className="mt-3">
                    The hours you worked and the food-safety checks you recorded remain on your restaurant&apos;s record,{" "}
                    <em>under your name</em>, marked as a former member. Those are your employer&apos;s employment records,
                    which the law requires them to keep for a period after you leave — HMRC requires payroll records to be
                    kept for three years, and requires the employee they belong to to be identifiable.
                  </p>
                  <p className="mt-3">
                    Your employer has to be able to say whose hours and whose pay those were, so the name on them is not
                    ours to remove on request. Everything that made the record an <em>account</em> is gone.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-2xl border border-[#B42318]/40 bg-[#FDECEA] p-5 text-[#3B0A06] sm:p-6">
                <IoAlertCircleOutline aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-[#B42318]" />
                <p>
                  <strong className="font-semibold">If you are the only manager of a restaurant,</strong> deleting your
                  account also permanently deletes that restaurant, its staff accounts, and all of its attendance, payroll
                  and food-safety records. The app tells you this first and asks you to type the restaurant&apos;s name to
                  confirm.
                </p>
              </div>
            </LegalTopic>

            <LegalTopic id="children" number={n("children")} title="Children">
              <p>Invisiko is a workplace tool and is not intended for use by children.</p>
            </LegalTopic>

            <LegalTopic id="this-website" number={n("this-website")} title="This website">
              <p>
                This website, invisiko.app, tells people about Invisiko and lets them request access. It is separate from
                the app: it has no access to the app or to any restaurant&apos;s data.
              </p>
              <ul className="grid gap-3">
                {[
                  {
                    Icon: IoDocumentTextOutline,
                    title: "Requesting access",
                    body: (
                      <>
                        The{" "}
                        <Link href="/contact" className="font-semibold text-fg underline underline-offset-4">
                          request-access form
                        </Link>{" "}
                        asks for your name, email address and restaurant name, and optionally how many staff you have and
                        what is hardest for you right now. We use these details only to reply to you. They reach us by
                        email through our email provider, Resend, and the website does not store them in a database. We do
                        not add you to a mailing list, and we do not sell or share your details.
                      </>
                    ),
                  },
                  {
                    Icon: IoBanOutline,
                    title: "Cookies and analytics",
                    body: "This website sets no cookies and runs no analytics or advertising trackers. If that changes, this page will say so first.",
                  },
                  {
                    Icon: IoServerOutline,
                    title: "Hosting",
                    body: "Our hosting provider serves the pages and may keep short-lived technical logs, such as IP addresses, to keep the site running securely.",
                  },
                ].map(({ Icon, title, body }) => (
                  <li key={title} className="flex gap-4 rounded-2xl border border-line bg-surface p-5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-surface-raised text-accent-text">
                      <Icon aria-hidden="true" className="size-[1.125rem]" />
                    </span>
                    <span>
                      <span className={`block ${strong}`}>{title}</span>
                      <span className="mt-1.5 block text-[0.9375rem]">{body}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p>You have the same rights over anything you send through this website as over data in the app.</p>
            </LegalTopic>

            <LegalTopic id="changes" number={n("changes")} title="Changes to this policy">
              <p>If this policy changes, the date at the top of this page will be updated.</p>
            </LegalTopic>

            <LegalTopic id="contact" number={n("contact")} title="Contact">
              <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
                <span className="flex items-center gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-amber text-ink">
                    <IoMailOutline aria-hidden="true" className="size-5" />
                  </span>
                  <span>
                    <span className={`block ${strong}`}>Questions about this policy or your data</span>
                    <span className="block text-[0.9375rem]">A person reads every message.</span>
                  </span>
                </span>
                <EmailLink address={site.privacyEmail} className="text-fg" />
              </div>
            </LegalTopic>
          </div>
        </div>
      </Section>
    </>
  );
}
