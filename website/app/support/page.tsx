import Link from "next/link";
import { EmailLink, ExternalLink } from "@/components/Fill";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/support");

/*
 * Canonical decision (PRODUCT_BLUEPRINT.md §9.10, option a): the app's own support page stays
 * canonical; this page links to it. The four topics below mirror that page and are phrased for
 * staff, as it is — keep them consistent with it.
 */

const topics = [
  {
    id: "no-account",
    question: "I don't have an account yet",
    answer: (
      <>
        <p>
          Ask your manager for your restaurant&apos;s invite code. Then open Invisiko, choose{" "}
          <strong className="text-fg">“Join a team”</strong>, enter the eight-character code, and set your name, email
          and password. A six-digit code sent to your email confirms it.
        </p>
        <p>
          Codes expire after 14 days — if yours doesn&apos;t work, ask your manager for a fresh one. Managers setting up a
          new restaurant choose <strong className="text-fg">Manager</strong> instead.
        </p>
      </>
    ),
  },
  {
    id: "check-in",
    question: "Check-in says I'm not at the venue",
    answer: (
      <>
        <p>
          The message tells you how far away your phone thinks it is. Make sure location is switched on for Invisiko, move
          closer to the code at the door, and scan again.
        </p>
        <p>
          If it still refuses while you are there, tell your manager. They can check the venue&apos;s position and radius,
          and correct your record if needed.
        </p>
      </>
    ),
  },
  {
    id: "password",
    question: "I forgot my password",
    answer: (
      <p>
        Tap <strong className="text-fg">Forgot password</strong> on the sign-in screen and we&apos;ll email you a reset
        link. Open that email on the phone that has Invisiko installed — the link opens the app.
      </p>
    ),
  },
  {
    id: "bug",
    question: "I found a bug",
    answer: (
      <p>
        Email <EmailLink address={site.supportEmail} /> with what you were doing, what you expected, and what happened
        instead. The phone model helps, and a screenshot helps even more.
      </p>
    ),
  },
];

export default function SupportPage() {
  return (
    <>
      <PageHero
        path="/support"
        eyebrow="Support"
        title="Help with Invisiko."
        lead="For staff and managers already using the app. Thinking about using it? See the FAQ or request access instead."
      />

      <Section tone="light" labelledBy="support-topics">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-20">
          <div>
            <h2 id="support-topics" className="text-2xl font-semibold tracking-[-0.01em]">
              Common problems
            </h2>
            <div className="mt-6 divide-y divide-line border-y border-line">
              {topics.map((topic) => (
                <section key={topic.id} aria-labelledby={`${topic.id}-title`} className="py-7">
                  <h3 id={`${topic.id}-title`} className="text-lg font-semibold">
                    {topic.question}
                  </h3>
                  <div className="mt-3 max-w-[64ch] space-y-3 text-muted">{topic.answer}</div>
                </section>
              ))}
            </div>
          </div>

          <aside aria-labelledby="support-contact" className="space-y-6 lg:pt-14">
            <div className="rounded-2xl border border-line bg-surface p-6">
              <h2 id="support-contact" className="text-xl font-semibold">
                Contact support
              </h2>
              <p className="mt-3 text-muted">
                Email <EmailLink address={site.supportEmail} />.
              </p>
              <p className="mt-3 text-muted">
                Also see the <ExternalLink href={site.appSupportUrl}>support page in the app</ExternalLink>.
              </p>
            </div>
            <p className="text-muted">
              Questions about what Invisiko does?{" "}
              <Link href="/faq" className="font-semibold text-fg underline underline-offset-4">
                Read the FAQ
              </Link>
              .
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
