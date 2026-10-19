import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { allFaqs, faqGroups } from "@/content/faq";
import { pageMetadata } from "@/lib/metadata";
import { faqPageLd } from "@/lib/structured-data";

export const metadata = pageMetadata("/faq");

export default function FaqPage() {
  return (
    <>
      {/* Every question below is rendered on this page, so the markup describes visible content only. */}
      <JsonLd data={faqPageLd(allFaqs)} />

      <PageHero
        path="/faq"
        eyebrow="FAQ"
        title="Questions about Invisiko."
        lead="Including the awkward ones. If yours isn't here, ask us."
      />

      <Section tone="light" labelledBy="faq-groups-title">
        <h2 id="faq-groups-title" className="sr-only">
          All questions
        </h2>
        <div className="grid gap-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-20">
          <nav aria-label="Question topics" className="lg:sticky lg:top-28 lg:self-start">
            <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {faqGroups.map((group) => (
                <li key={group.id}>
                  <a
                    href={`#${group.id}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-[0.9375rem] font-semibold hover:border-line-strong lg:rounded-none lg:border-0 lg:px-0 lg:text-muted lg:hover:text-fg"
                  >
                    {group.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-16">
            {faqGroups.map((group) => (
              <section key={group.id} id={group.id} aria-labelledby={`${group.id}-title`} className="scroll-mt-28">
                <h3 id={`${group.id}-title`} className="label-caps mb-4 text-accent-text">
                  {group.title}
                </h3>
                <FaqAccordion items={group.items} headingLevel="h4" />
              </section>
            ))}
            <p className="text-muted">
              Still unsure?{" "}
              <Link href="/contact" className="font-semibold text-fg underline underline-offset-4">
                Ask us directly
              </Link>{" "}
              — or, if you already use the app, see{" "}
              <Link href="/support" className="font-semibold text-fg underline underline-offset-4">
                support
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      <CtaBand id="faq-cta" />
    </>
  );
}
