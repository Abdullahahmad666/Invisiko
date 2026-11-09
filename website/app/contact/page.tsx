import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import type { CSSProperties } from "react";
import { EmailLink } from "@/components/Fill";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { nextSteps } from "@/content/next-steps";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { HeroCards } from "@/sections/HeroCards";

export const metadata = pageMetadata("/contact");


export default function ContactPage() {
  return (
    <>
      <PageHero
        path="/contact"
        eyebrow="Request access"
        title="Tell us about your place."
        lead="A few details so we can reply usefully. A person reads every request."
        visual={
          <HeroCards
            cards={[
              { q: "Who reads it?", a: "A person, not a bot." },
              { q: "When will we hear back?", a: `Within ${site.replyTime}.` },
              { q: "Is access instant?", a: "No, we reply first." },
              { q: "Where are you based?", a: `${site.location.locality}, ${site.location.country}.` },
            ]}
          />
        }
      />

      <Section tone="light" labelledBy="form-title">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-20">
          <div>
            <h2 id="form-title" className="sr-only">
              Request access form
            </h2>
            <ContactForm />
          </div>

          <aside className="space-y-10">
            <section aria-labelledby="next-title">
              <h2 id="next-title" className="text-xl font-semibold tracking-[-0.01em]">
                What happens next
              </h2>
              <ol className="mt-5 space-y-5">
                {nextSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-4" data-reveal style={{ "--stagger": index } as CSSProperties}>
                    <span
                      aria-hidden="true"
                      className="grid size-8 shrink-0 place-items-center rounded-full bg-amber text-sm font-semibold text-ink"
                    >
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold">{step.title}</h3>
                      <p className="mt-1 text-muted">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section id="other-ways" aria-labelledby="other-ways-title" className="scroll-mt-28 border-t border-line pt-8">
              <h2 id="other-ways-title" className="text-xl font-semibold tracking-[-0.01em]">
                Rather talk first?
              </h2>
              <p className="mt-3 text-muted">
                Email us at <EmailLink address={site.contactEmail} /> with any questions before you request access.
              </p>
              <p className="mt-4 text-muted">
                Already using Invisiko and need help?{" "}
                <Link href="/support" className="font-semibold text-fg underline underline-offset-4">
                  Go to support
                </Link>
                .
              </p>
            </section>
          </aside>
        </div>
      </Section>
    </>
  );
}
