import Link from "next/link";
import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  IoAlertCircleOutline,
  IoArrowForward,
  IoBriefcaseOutline,
  IoCheckmarkDoneOutline,
  IoDocumentTextOutline,
  IoMailOutline,
  IoPeopleOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { EmailLink, Fill } from "@/components/Fill";
import { LegalList, LegalTopic } from "@/components/LegalTopic";
import { LegalToc } from "@/components/LegalToc";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionNav } from "@/components/SectionNav";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { HeroCards } from "@/sections/HeroCards";

export const metadata = pageMetadata("/terms");

/*
 * DRAFT terms of service, prepared for the owner's solicitor (PRODUCT_BLUEPRINT.md §9.10: terms must
 * be reviewed by a person, not an AI). Every statement about the product matches what it does
 * today and the privacy policy. Two commercial decisions are left as visible tokens:
 * [[LIABILITY_CAP]] and the fees wording.
 *
 * When the solicitor has approved the text:
 *   1. delete the draft banner below and set DRAFT to false;
 *   2. remove `noindex: true` from "/terms" in content/pages.ts, so it joins the sitemap.
 */
const DRAFT = true;
const LAST_UPDATED = "8 November 2026";

const sections = [
  { id: "about-these-terms", label: "About these terms" },
  { id: "the-service", label: "The service" },
  { id: "accounts", label: "Accounts and access" },
  { id: "your-responsibilities", label: "Your responsibilities" },
  { id: "important-limits", label: "Important limits" },
  { id: "acceptable-use", label: "Acceptable use" },
  { id: "your-data", label: "Your data" },
  { id: "fees", label: "Fees" },
  { id: "availability", label: "Availability and changes" },
  { id: "intellectual-property", label: "Intellectual property" },
  { id: "ending", label: "Suspension and ending" },
  { id: "liability", label: "Liability" },
  { id: "apple", label: "Apple and the App Store" },
  { id: "general", label: "General" },
  { id: "contact", label: "Contact" },
];

const shortVersion: { Icon: IconType; title: string; body: string; href: string }[] = [
  {
    Icon: IoBriefcaseOutline,
    title: "For businesses and their staff",
    body: "A restaurant uses Invisiko to run its back of house. Staff use it as part of their work.",
    href: "#about-these-terms",
  },
  {
    Icon: IoCheckmarkDoneOutline,
    title: "You check before you rely on it",
    body: "Pay, invoice readings and records are tools. The business stays responsible for what it pays and keeps.",
    href: "#important-limits",
  },
  {
    Icon: IoShieldCheckmarkOutline,
    title: "Your data stays yours",
    body: "The business controls its account and data. We process it to run the app, as our privacy policy explains.",
    href: "#your-data",
  },
  {
    Icon: IoPeopleOutline,
    title: "Use it fairly",
    body: "Lawfully, for running your restaurant, and without misusing anyone else's data.",
    href: "#acceptable-use",
  },
];

const strong = "font-semibold text-fg";

export default function TermsPage() {
  const n = (id: string) => sections.findIndex((section) => section.id === id) + 1;

  return (
    <>
      <PageHero
        path="/terms"
        eyebrow="Legal"
        title="Terms of service"
        lead="The agreement between Invisiko and the businesses, managers and staff who use the Invisiko app and this website."
        visual={
          <HeroCards
            cards={[
              { q: "Who are these terms for?", a: "Businesses and their staff." },
              { q: "Who checks what the app reads?", a: "You do, before Confirm." },
              { q: "Which law applies?", a: "England and Wales." },
              { q: "Are they in force?", a: DRAFT ? "Not yet: under legal review." : "Yes." },
            ]}
          />
        }
      >
        <p className="flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem] text-muted">
          <span>
            {DRAFT ? "Draft prepared" : "Last updated"} <strong className="text-fg">{LAST_UPDATED}</strong>
          </span>
          <span>
            Governed by the law of <strong className="text-fg">England and Wales</strong>
          </span>
        </p>
      </PageHero>

      <SectionNav items={sections} mobileOnly />

      <Section tone="light" labelledBy="short-version">
        {/* Part of this screen, not a strip of its own between screens. */}
        {DRAFT ? (
          <div role="note" className="mb-10 flex gap-4 rounded-2xl border border-amber/60 bg-amber/10 p-5 text-fg sm:p-6" data-reveal>
            <IoAlertCircleOutline aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-[#8F5300]" />
            <p>
              <strong className="font-semibold">Draft — under legal review, not yet in force.</strong> These terms are
              being reviewed before they take effect. If you have a question about them in the meantime, email{" "}
              <EmailLink address={site.contactEmail} className="text-fg" />.
            </p>
          </div>
        ) : null}
        <p className="label-caps text-accent-text">In brief</p>
        <h2 id="short-version" className="mt-2 text-[1.75rem] font-semibold tracking-[-0.02em] sm:text-[2.25rem]">
          The short version
        </h2>
        <p className="mt-2 max-w-[40rem] text-[0.9375rem] text-muted">
          A summary to help you find your way. The full terms below are what apply.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {shortVersion.map(({ Icon, title, body, href }, index) => (
            <li key={title} data-reveal style={{ "--stagger": index % 4 } as CSSProperties}>
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

      <Section tone="light" labelledBy="about-these-terms" className="border-t border-[#DCDCE0]">
        <div className="grid gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-20">
          <LegalToc items={sections} updated={LAST_UPDATED} updatedLabel={DRAFT ? "Draft prepared" : "Last updated"} />

          <div>
            <LegalTopic id="about-these-terms" number={n("about-these-terms")} title="About these terms">
              <p>
                These terms are an agreement between <strong className={strong}>{site.legalName}</strong>, based in{" "}
                {site.location.locality}, {site.location.country} (&ldquo;Invisiko&rdquo;, &ldquo;we&rdquo;,
                &ldquo;us&rdquo;), and anyone who uses the Invisiko app or this website.
              </p>
              <LegalList>
                <li>
                  <strong className={strong}>The business</strong> — the restaurant or takeaway that holds an Invisiko
                  account. A manager who sets up the account accepts these terms on the business&apos;s behalf and
                  confirms they are authorised to do so.
                </li>
                <li>
                  <strong className={strong}>Users</strong> — the managers and staff the business invites. Staff use
                  Invisiko as part of their work for the business, and agree to use it in line with these terms.
                </li>
              </LegalList>
              <p>
                Invisiko is a tool for businesses. It is not offered to consumers for personal use. By creating an account
                or using the app, you agree to these terms and to our{" "}
                <Link href="/privacy" className="font-semibold text-fg underline underline-offset-4">
                  privacy policy
                </Link>
                .
              </p>
            </LegalTopic>

            <LegalTopic id="the-service" number={n("the-service")} title="The service">
              <p>
                Invisiko is an iPhone app that helps a business run its back of house: staff attendance, rota and shift
                swaps, food-safety records, fortnightly pay periods, invoice reading, stock and purchase history, and a
                store for licences and certificates. This website describes the app and lets businesses request access.
              </p>
              <p>Today, the service:</p>
              <LegalList>
                <li>is for one restaurant per account;</li>
                <li>runs on iPhone (iOS); Android phones and iPad are not supported;</li>
                <li>needs an internet connection to work; and</li>
                <li>is not a till, point-of-sale or ordering system.</li>
              </LegalList>
            </LegalTopic>

            <LegalTopic id="accounts" number={n("accounts")} title="Accounts and access">
              <LegalList>
                <li>
                  A manager creates the business&apos;s account. We may review a new account before it is activated, and
                  may decline to open one.
                </li>
                <li>
                  Staff join with an invite code the business shares. The business decides who to invite and is
                  responsible for removing access for people who should no longer have it.
                </li>
                <li>
                  Keep your sign-in details secure and do not share your account. Tell us straight away at{" "}
                  <EmailLink address={site.supportEmail} className="text-fg" /> if you think someone else has used it.
                </li>
                <li>
                  Managers can see and change information that staff cannot, including attendance records and pay. The
                  business is responsible for choosing who has manager access.
                </li>
              </LegalList>
            </LegalTopic>

            <LegalTopic id="your-responsibilities" number={n("your-responsibilities")} title="Your responsibilities as a business">
              <p>Invisiko helps you keep records; the legal duties that go with running a business remain yours. In particular, the business is responsible for:</p>
              <LegalList>
                <li>
                  meeting its obligations as an employer, including paying staff correctly and on time, and its tax and
                  payroll obligations;
                </li>
                <li>meeting its food-safety and licensing obligations;</li>
                <li>
                  telling its staff that it uses Invisiko, including that the app reads a phone&apos;s location at
                  check-in and check-out, and giving them any information the law requires as their employer;
                </li>
                <li>the accuracy of the information it and its users enter; and</li>
                <li>keeping any records it is legally required to keep for longer than it keeps an Invisiko account.</li>
              </LegalList>
            </LegalTopic>

            <LegalTopic id="important-limits" number={n("important-limits")} title="Important limits">
              <p>Please read this section carefully. Invisiko is a tool to support your judgement, not a replacement for it.</p>
              <LegalList>
                <li>
                  <strong className={strong}>Pay.</strong> Pay periods are calculated from the hours and rates recorded in
                  the app. The business must check pay before paying it, and remains responsible for what it pays.
                </li>
                <li>
                  <strong className={strong}>Invoice reading.</strong> Invoices are read automatically by a third-party AI
                  service. A reading is a draft and may contain mistakes; nothing reaches stock until a person confirms it,
                  and the business is responsible for what it confirms.
                </li>
                <li>
                  <strong className={strong}>Check-in location.</strong> Check-in compares the venue with the position the
                  phone reports. It is a check, not a guarantee of where someone was.
                </li>
                <li>
                  <strong className={strong}>Food-safety records.</strong> The app records the checks your team carries
                  out. It does not certify that a business meets any law, standard or inspection scheme, and it does not
                  alert anyone when a check is missed.
                </li>
              </LegalList>
            </LegalTopic>

            <LegalTopic id="acceptable-use" number={n("acceptable-use")} title="Acceptable use">
              <p>You must not:</p>
              <LegalList>
                <li>use Invisiko for anything unlawful, or for any purpose other than running the business;</li>
                <li>use it to monitor anyone in a way the law does not allow;</li>
                <li>upload anything harmful, such as malware, or content you do not have the right to share;</li>
                <li>try to access accounts, data or parts of the service you are not authorised to use;</li>
                <li>copy, modify, reverse-engineer or resell the app, except where the law allows; or</li>
                <li>interfere with the security or normal running of the service.</li>
              </LegalList>
            </LegalTopic>

            <LegalTopic id="your-data" number={n("your-data")} title="Your data">
              <p>
                The business owns the information it and its users put into Invisiko, and controls the account and the
                data. We process it to provide the service, in line with our{" "}
                <Link href="/privacy" className="font-semibold text-fg underline underline-offset-4">
                  privacy policy
                </Link>
                , and do not sell it or use it for advertising.
              </p>
              <p>
                Where we handle staff personal data on the business&apos;s behalf, we do so only to run the service for
                the business. We use the service providers named in the privacy policy to host and run the app.
              </p>
              <p>
                Users can delete their account from inside the app, as the privacy policy describes. If the only manager of
                a restaurant deletes their account, the restaurant and all of its records are permanently deleted, so the
                business should make sure it keeps any records it needs first.
              </p>
            </LegalTopic>

            <LegalTopic id="fees" number={n("fees")} title="Fees">
              <p>
                Access to Invisiko is currently by request. If fees apply to your business, we will agree them with you
                before you are charged. <Fill value="[[FEES_AND_PAYMENT_TERMS]]" />
              </p>
            </LegalTopic>

            <LegalTopic id="availability" number={n("availability")} title="Availability and changes">
              <LegalList>
                <li>
                  We work to keep Invisiko available, but we do not guarantee it will always be available, uninterrupted or
                  free of errors. We may need to pause it for maintenance or updates.
                </li>
                <li>
                  We may improve, change or remove features. If a change significantly affects how you use the service, we
                  will tell the business in advance where we reasonably can.
                </li>
              </LegalList>
            </LegalTopic>

            <LegalTopic id="intellectual-property" number={n("intellectual-property")} title="Intellectual property">
              <p>
                We own the Invisiko app, this website and everything in them, other than the information you put in. We
                give the business and its users a non-exclusive, non-transferable right to use the app for running the
                business while these terms apply. If you send us suggestions, we may use them without owing you anything.
              </p>
            </LegalTopic>

            <LegalTopic id="ending" number={n("ending")} title="Suspension and ending">
              <LegalList>
                <li>The business can stop using Invisiko at any time. Users can delete their own accounts in the app.</li>
                <li>
                  We may suspend or close an account if these terms are seriously broken, if we need to for legal or
                  security reasons, or if the account is used in a way that could harm others or the service. Where we
                  reasonably can, we will tell you first.
                </li>
                <li>
                  When an account closes, the business should make sure it has kept any records it is legally required to
                  keep.
                </li>
              </LegalList>
            </LegalTopic>

            <LegalTopic id="liability" number={n("liability")} title="Liability">
              <LegalList>
                <li>
                  Nothing in these terms limits liability that cannot be limited by law, including for death or personal
                  injury caused by negligence, or for fraud.
                </li>
                <li>
                  We are not responsible for losses the business suffers because of decisions it makes using information in
                  the app, including pay it makes or invoices it confirms, or for indirect losses such as lost profits,
                  revenue or business.
                </li>
                <li>
                  Otherwise, our total liability to the business under or in connection with these terms is limited to{" "}
                  <Fill value="[[LIABILITY_CAP]]" />.
                </li>
              </LegalList>
            </LegalTopic>

            <LegalTopic id="apple" number={n("apple")} title="Apple and the App Store">
              <p>
                If you download the app from Apple&apos;s App Store, Apple&apos;s App Store terms also apply to that
                download. These terms are between you and Invisiko, not Apple: Apple is not responsible for the app, its
                content, maintenance or support, or any claims relating to it.
              </p>
            </LegalTopic>

            <LegalTopic id="general" number={n("general")} title="General">
              <LegalList>
                <li>
                  We may update these terms. We will tell the business about significant changes before they take effect,
                  and the date at the top of this page will change.
                </li>
                <li>If any part of these terms cannot be enforced, the rest still applies.</li>
                <li>These terms are governed by the law of England and Wales, and the courts of England and Wales have jurisdiction.</li>
              </LegalList>
            </LegalTopic>

            <LegalTopic id="contact" number={n("contact")} title="Contact">
              <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
                <span className="flex items-center gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-amber text-ink">
                    <IoMailOutline aria-hidden="true" className="size-5" />
                  </span>
                  <span>
                    <span className={`block ${strong}`}>Questions about these terms</span>
                    <span className="block text-[0.9375rem]">A person reads every message.</span>
                  </span>
                </span>
                <EmailLink address={site.contactEmail} className="text-fg" />
              </div>
              <p className="flex items-center gap-2 text-[0.9375rem]">
                <IoDocumentTextOutline aria-hidden="true" className="size-5 text-accent-text" />
                See also our{" "}
                <Link href="/privacy" className="font-semibold text-fg underline underline-offset-4">
                  privacy policy
                </Link>
                .
              </p>
            </LegalTopic>
          </div>
        </div>
      </Section>
    </>
  );
}
