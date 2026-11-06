import type { CSSProperties } from "react";
import { IoPhonePortraitOutline, IoQrCodeOutline, IoWifiOutline } from "react-icons/io5";
import { ButtonLink } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionNav } from "@/components/SectionNav";
import { SectionHeading } from "@/components/SectionHeading";
import { StepShowcase, type ShowcaseStep } from "@/components/StepShowcase";
import { faqsById } from "@/content/faq";
import { primaryCta } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { howToLd } from "@/lib/structured-data";

export const metadata = pageMetadata("/how-it-works");

// Steps follow the journeys in PRODUCT_BLUEPRINT.md §4 (J1, J2, J3, J4, J5). Nothing here may
// describe a web dashboard — there is none. The restaurant-approval step (§14 Q15) is described
// generically until the owner confirms it stays.

const managerSteps = [
  {
    title: "Create your account",
    screenshot: "welcomeManager",
    body: "In the app, choose Manager and set up your takeaway: its name, your name, phone number and work email. A six-digit code sent to that email confirms it's yours. Your restaurant's dashboard opens once it is set up.",
  },
  {
    title: "Print the venue code",
    screenshot: "checkInSetup",
    body: "Generate your QR code and print it. Stand at the venue to set its position from your phone, then choose the check-in radius. Regenerating the code makes printed copies stop working immediately.",
  },
  {
    title: "Add fridges and checklists",
    screenshot: "fridges",
    body: "Register each fridge and freezer with its recommended maximum temperature. Write your opening and closing checks, and any daily, weekly or monthly lists, in your own words.",
  },
  {
    title: "Invite the team with one code",
    screenshot: "inviteTeam",
    body: "Share an eight-character staff code. The whole team can use it until you regenerate it, and it expires after 14 days. A code for another manager works once only.",
  },
] satisfies ShowcaseStep[];

const staffSteps: ShowcaseStep[] = [
  {
    title: "Install the app",
    screenshot: "welcomeStaff",
    body: "On their own Android phone or iPhone, and choose “Join a team”.",
  },
  {
    title: "Enter the code",
    screenshot: "joinTeam",
    body: "Then their name, email and a password. A six-digit code confirms their email, and they're signed in.",
  },
  {
    title: "Scan at the door",
    screenshot: "staffScan",
    body: "The first scan asks for camera and location permission. From then on, checking in is one scan — matched to their shift where one is on the rota.",
  },
];

const firstWeek: ShowcaseStep[] = [
  {
    title: "The rota",
    screenshot: "rota",
    body: "Add the week's shifts. The estimated staff cost updates as you build it.",
  },
  {
    title: "Opening and closing",
    screenshot: "openingRoutine",
    body: "Staff record fridge temperatures and tick off checklist items — each with a name and a time.",
  },
  {
    title: "Deliveries",
    screenshot: "invoiceCapture",
    body: "Photograph a delivery note, check the lines it read, and confirm them into stock.",
  },
  {
    title: "Swaps",
    screenshot: "swapRequests",
    body: "Staff offer shifts to colleagues. You approve or decline from your phone.",
  },
  {
    title: "Pay",
    screenshot: "payroll",
    body: "Open a fortnightly pay period. Hours accumulate from check-ins until you close it.",
  },
];

const needs = [
  { Icon: IoPhonePortraitOutline, title: "Phones the team already has", body: "Android phones or iPhones. iPad isn't supported." },
  { Icon: IoQrCodeOutline, title: "A printed code at the door", body: "One sheet of paper where staff arrive." },
  { Icon: IoWifiOutline, title: "A connection", body: "Invisiko needs the internet to check in, record a check or read an invoice. There is no offline mode today." },
];

const setupFaqs = faqsById(["web-dashboard", "staff-accounts", "phones", "offline"]);

const sections = [
  { id: "manager-title", label: "Manager" },
  { id: "staff-title", label: "Staff" },
  { id: "week-title", label: "First week" },
  { id: "needs-title", label: "What you need" },
  { id: "setup-faq-title", label: "Questions" },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Mirrors the visible "Day one · Manager" steps below. */}
      <JsonLd
        data={howToLd(
          "How to set up Invisiko for a takeaway",
          "The four things a manager sets up on day one, all from their phone.",
          managerSteps.map((step) => ({ title: step.title, text: step.body })),
        )}
      />
      <PageHero
        path="/how-it-works"
        eyebrow="How it works"
        title="What setting it up actually involves."
        lead="A code on the door, your fridges and checklists, and your team. Then it runs — and the records build themselves as people work."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={primaryCta.href} block>
            {primaryCta.label}
          </ButtonLink>
          <ButtonLink href="/features" variant="secondary" block>
            See all features
          </ButtonLink>
        </div>
      </PageHero>

      <SectionNav items={sections} />

      <Section tone="light" labelledBy="manager-title">
        <StepShowcase steps={managerSteps}>
          <SectionHeading
              id="manager-title"
              eyebrow="Day one · Manager"
              title="Four things to set up."
              intro="All of it from your phone. There's no web dashboard to learn."
            />
        </StepShowcase>
      </Section>

      <Section tone="dark" labelledBy="staff-title">
        <StepShowcase steps={staffSteps}>
          <SectionHeading
            id="staff-title"
            eyebrow="Day one · Staff"
            title="Install, enter the code, scan at the door."
            intro="Nobody needs an account created for them by hand."
          />
        </StepShowcase>
      </Section>

      <Section tone="light" labelledBy="week-title">
        <StepShowcase steps={firstWeek}>
          <SectionHeading
            id="week-title"
            eyebrow="The first week"
            title="The work you already do, recorded as you do it."
          />
        </StepShowcase>
      </Section>

      <Section tone="light" labelledBy="needs-title" className="border-t border-[#DCDCE0]">
        <SectionHeading id="needs-title" eyebrow="What you need" title="Three things, and no new hardware." />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {needs.map(({ Icon, title, body }, index) => (
            <li key={title} data-reveal style={{ "--stagger": index } as CSSProperties} className="rounded-2xl border border-line bg-surface p-6">
              <span className="grid size-11 place-items-center rounded-full bg-amber text-ink">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-muted">{body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="light" labelledBy="setup-faq-title" className="border-t border-[#DCDCE0]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div>
            <SectionHeading id="setup-faq-title" eyebrow="Questions" title="About getting started." />
            <div className="mt-8" data-reveal>
              <ButtonLink href="/faq" variant="text" arrow>
                All questions
              </ButtonLink>
            </div>
          </div>
          <div data-reveal>
            <FaqAccordion items={setupFaqs} />
          </div>
        </div>
      </Section>

      <CtaBand id="how-cta" />
    </>
  );
}
