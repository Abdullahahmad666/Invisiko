import Link from "next/link";
import { IoArrowForward, IoMailOutline } from "react-icons/io5";
import { FaqAccordion } from "@/components/FaqAccordion";
import { EmailLink } from "@/components/Fill";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import type { FaqItem } from "@/content/faq";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/support");

/*
 * The canonical support page for the Invisiko app — the app should link here. Phrased for people
 * already using the app; prospective customers are pointed to the FAQ and request-access form.
 */

const topics: FaqItem[] = [
  {
    id: "no-account",
    question: "I'm a staff member and don't have an account yet",
    answer: [
      "Ask your manager for your restaurant's invite code, then use “Join a team” in the app to create your account with it.",
    ],
  },
  {
    id: "check-in",
    question: "Check-in says I'm not at the venue",
    answer: [
      "Check-in confirms your phone's GPS position is within range of the venue.",
      "Make sure Location access is allowed for the app, and that you're actually on site — a weak GPS signal indoors can occasionally read a few metres off.",
    ],
  },
  {
    id: "password",
    question: "I forgot my password",
    answer: ["Use “Forgot password” on the sign-in screen. A reset link is emailed to the address on your account."],
  },
  {
    id: "delete-account",
    question: "How do I delete my account?",
    answer: [
      "Open Profile in the app and choose Delete my account. You'll be asked for your password to confirm. It's permanent — your email, phone number, photo and password are destroyed and you won't be able to sign in again.",
      "The hours you worked and the checks you recorded stay on your restaurant's record, under your name, marked as a former member — your employer has to keep those by law for a period after you leave, and has to be able to say whose they were. If there are no such records against your account, nothing is kept at all and the account is erased outright.",
      "If you're the only manager of a restaurant, deleting your account also deletes the restaurant and everyone in it. The app warns you and asks you to type the restaurant's name first.",
    ],
    link: { href: "/privacy#deleting-your-account", label: "Read the detail in the privacy policy" },
  },
  {
    id: "bug",
    question: "Something isn't working, or I found a bug",
    answer: [
      `Email us at ${site.supportEmail} with what you were doing and what happened, and we'll look into it.`,
    ],
  },
];

export default function SupportPage() {
  return (
    <>
      <PageHero
        path="/support"
        eyebrow="Support"
        title="Help with Invisiko."
        lead="Invisiko is a staff management app for restaurants and takeaways — attendance, payroll, food-safety compliance, rota and stock, in one app. Here are answers to common questions, and how to reach us."
      />

      <Section tone="light" labelledBy="support-topics">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-20">
          <div>
            <h2 id="support-topics" className="text-2xl font-semibold tracking-[-0.01em]">
              Common questions
            </h2>
            <div className="mt-6">
              <FaqAccordion items={topics} />
            </div>
          </div>

          <aside aria-labelledby="support-contact" className="space-y-6 lg:pt-14">
            <div className="rounded-2xl border border-line bg-surface p-6 sm:p-7">
              <span className="grid size-11 place-items-center rounded-xl bg-amber text-ink">
                <IoMailOutline aria-hidden="true" className="size-5" />
              </span>
              <h2 id="support-contact" className="mt-5 text-xl font-semibold">
                Contact support
              </h2>
              <p className="mt-2 text-muted">Tell us what you were doing and what happened.</p>
              <p className="mt-4 text-lg">
                <EmailLink address={site.supportEmail} className="text-fg" />
              </p>
            </div>
            <ul className="space-y-1 text-[0.9375rem]">
              {[
                { href: "/privacy", label: "Privacy policy" },
                { href: "/faq", label: "Questions about what Invisiko does" },
                { href: "/contact", label: "Thinking of using it? Request access" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group inline-flex min-h-11 items-center gap-1.5 font-semibold hover:text-accent-text">
                    {link.label}
                    <IoArrowForward
                      aria-hidden="true"
                      className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>
    </>
  );
}
