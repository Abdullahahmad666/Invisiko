import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { Eyebrow } from "@/components/Eyebrow";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FeatureCard } from "@/components/FeatureCard";
import { JsonLd } from "@/components/JsonLd";
import { Limitations } from "@/components/Limitations";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { StepList, type Step } from "@/components/StepList";
import { Container } from "@/components/Container";
import { faqsById } from "@/content/faq";
import { pillars } from "@/content/features";
import { primaryCta } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { organizationLd, softwareApplicationLd, webPageLd, websiteLd } from "@/lib/structured-data";
import { InvoiceSteps } from "@/sections/InvoiceSteps";

export const metadata = pageMetadata("/");

const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

const problems = [
  { label: "Rota and hours", text: "The rota, and the hours people actually worked." },
  { label: "The day's checks", text: "Fridge temperatures, opening, closing and cleaning — done and written down." },
  { label: "What everyone is owed", text: "Turning a fortnight of hours into what each person gets paid." },
  { label: "What deliveries cost", text: "What came in, from whom, and what it actually cost." },
];

const setupSteps: Step[] = [
  {
    title: "Put a code on the door.",
    body: "Print your venue's QR code, set where it is from your phone, and choose how close staff need to be to check in.",
  },
  {
    title: "Add your fridges, checklists and team.",
    body: "Register each fridge and freezer, write your opening, closing and cleaning lists in your own words, and share one invite code with your staff.",
  },
  {
    title: "Everyone works their shift; the records build themselves.",
    body: "Check-ins, temperatures, completed checks and delivery notes are recorded as the work happens — each with who and when.",
  },
];

const homeFaqs = faqsById(["till", "offline", "check-in", "misread"]);

export default function HomePage() {
  const organization = organizationLd();

  return (
    <>
      <JsonLd data={websiteLd()} />
      <JsonLd data={webPageLd("/")} />
      <JsonLd data={softwareApplicationLd()} />
      {organization ? <JsonLd data={organization} /> : null}

      {/* 1. Hero — recognition plus one action. */}
      <section aria-labelledby="hero-title" className="tone-dark relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_50%_at_76%_48%,rgba(254,154,2,0.16),transparent_70%),radial-gradient(60%_40%_at_10%_0%,rgba(255,255,255,0.05),transparent_70%)]"
        />
        <Container className="relative">
          <div className="grid min-h-[100svh] items-center gap-12 pt-28 pb-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:pt-24 lg:pb-12">
            <div className="mx-auto max-w-[40rem] text-center lg:mx-0 lg:text-left">
              <div className="hero-rise flex justify-center lg:justify-start" style={rise(0)}>
                <Eyebrow>For independent takeaways</Eyebrow>
              </div>
              <h1
                id="hero-title"
                className="hero-rise mt-6 text-balance text-[2rem] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[3rem] lg:text-[3.5rem]"
                style={rise(40)}
              >
                The back of house, on one phone.
              </h1>
              <p className="hero-rise mx-auto mt-6 max-w-[34rem] text-pretty text-lg text-muted sm:text-xl lg:mx-0" style={rise(80)}>
                Staff hours, food-safety records, pay and delivery invoices — for takeaways that currently run all four
                on paper.
              </p>
              <div className="hero-rise mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start" style={rise(120)}>
                <ButtonLink href={primaryCta.href} block>
                  {primaryCta.label}
                </ButtonLink>
                <ButtonLink href="/how-it-works" variant="secondary" block>
                  See how it works
                </ButtonLink>
              </div>
              <p
                className="hero-rise mx-auto mt-12 max-w-[25rem] border-t border-fg/60 pt-4 text-[0.9375rem] text-fg/90 lg:mx-0"
                style={rise(180)}
              >
                Your staff&apos;s location is read once, when they check in or out — and never tracked.
              </p>
            </div>
            <div className="hero-rise" style={rise(120)}>
              <PhoneFrame screenshot="checksDashboard" priority />
            </div>
          </div>
        </Container>
      </section>

      {/* 2. The problem, named. Descriptive, not fear-based; no statistics. */}
      <Section tone="light" labelledBy="problem-title">
        <SectionHeading
          id="problem-title"
          eyebrow="The paperwork"
          title="Four jobs nobody trained you for."
          intro="They all land on whoever runs the place."
        />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem, index) => (
            <li
              key={problem.label}
              data-reveal
              style={{ "--reveal-delay": `${index * 50}ms` } as CSSProperties}
              className="bg-surface p-6 sm:p-7"
            >
              <span className="label-caps tabular-nums text-accent-text">0{index + 1}</span>
              <p className="mt-6 text-lg font-semibold leading-snug tracking-[-0.01em]">{problem.label}</p>
              <p className="mt-2 text-muted">{problem.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 3. Four pillars. */}
      <Section tone="dark" labelledBy="pillars-title">
        <SectionHeading
          id="pillars-title"
          eyebrow="What it does"
          title="One app for all four."
          intro="Staff use it on their own phones. You run it from yours."
        />
        <ul className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar, index) => (
            <FeatureCard
              key={pillar.id}
              label={pillar.label}
              title={pillar.title}
              body={pillar.body}
              icon={pillar.icon}
              href={pillar.href}
              linkLabel={pillar.id === "pay" ? "See pay in features" : undefined}
              revealDelay={index * 50}
            />
          ))}
        </ul>
      </Section>

      {/* 4. Invoice scanning deep-cut. */}
      <Section tone="light" labelledBy="invoice-title">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="invoice-title"
            eyebrow="Invoice scanning"
            title="The delivery note types itself."
            intro="Photograph it, check what it read, and the stock and spend take care of themselves."
          />
          <p
            data-reveal
            className="max-w-[22rem] border-l-2 border-amber pl-4 text-lg font-semibold leading-snug tracking-[-0.01em]"
          >
            Nothing reaches your stock until you confirm it.
          </p>
        </div>
        <div className="mt-12">
          <InvoiceSteps />
        </div>
        <div className="mt-10">
          <ButtonLink href="/features/invoice-scanning" variant="text" arrow>
            How the scanning works
          </ButtonLink>
        </div>
      </Section>

      {/* 5. How it works in three steps — the heading stays put while the steps scroll past. */}
      <Section tone="dark" labelledBy="steps-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              id="steps-title"
              eyebrow="How it works"
              title="Three steps, then it runs."
              intro="No web dashboard to learn and no new hardware: a printed code, the phones your team already carries, and yours."
            />
            <div className="mt-8" data-reveal>
              <ButtonLink href="/how-it-works" variant="text" arrow>
                The full setup
              </ButtonLink>
            </div>
          </div>
          <StepList steps={setupSteps} highlight tall />
        </div>
      </Section>

      {/* 6. What it isn't — the honesty block. Do not remove. */}
      <Section tone="light" spacing="tight" labelledBy="limits-title" className="border-b border-[#DCDCE0]">
        <Limitations variant="short" headingId="limits-title" />
      </Section>

      {/* 7. FAQ preview. */}
      <Section tone="light" labelledBy="faq-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div>
            <SectionHeading id="faq-title" eyebrow="Questions" title="The awkward ones, answered first." />
            <div className="mt-8" data-reveal>
              <ButtonLink href="/faq" variant="text" arrow>
                All questions
              </ButtonLink>
            </div>
          </div>
          <div data-reveal>
            <FaqAccordion items={homeFaqs} />
          </div>
        </div>
      </Section>

      {/* 8. Closing CTA band. */}
      <CtaBand id="home-cta" />
    </>
  );
}
