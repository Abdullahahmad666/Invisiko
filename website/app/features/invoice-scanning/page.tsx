import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { ButtonLink } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { FaqAccordion } from "@/components/FaqAccordion";
import { PageHero } from "@/components/PageHero";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { SplitFeature } from "@/components/SplitFeature";
import { faqsById } from "@/content/faq";
import { primaryCta } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { Pipeline } from "@/sections/Pipeline";

export const metadata = pageMetadata("/features/invoice-scanning");

// Every capability on this page maps to PRODUCT_BLUEPRINT.md §2 E1 / E4. No accuracy figure, no
// price per scan (§9.3).

const reads = [
  { group: "From the top of the note", items: ["Supplier", "Invoice number", "Invoice date"] },
  { group: "From every line", items: ["Description", "Size", "Quantity", "Unit price", "Line total"] },
  { group: "From the bottom", items: ["Goods", "VAT", "Total — as printed"] },
];

const inCharge = [
  {
    title: "Nothing reaches stock until Confirm.",
    body: "What was read is a draft. Quantities move and spend is recorded only when a person confirms the invoice.",
  },
  {
    title: "Every line must be matched first.",
    body: "Each line is matched to one of your stock items before the invoice can be confirmed. Once a supplier's wording has been matched, it is recognised next time.",
  },
  {
    title: "An unreadable price is not a zero.",
    body: "Lines whose price could not be read are counted separately, so a missing figure never quietly lowers your spend.",
  },
  {
    title: "A repeated invoice number is flagged, not rejected.",
    body: "If a supplier's invoice number has been seen before, the new one is still read, and flagged so you can compare the two.",
  },
];

const costs = [
  {
    title: "Duplicates are caught before anything is spent",
    body: "An identical file is recognised before it is read, marked as a duplicate, and not read again.",
  },
  {
    title: "An optional monthly ceiling",
    body: "A restaurant can have a monthly limit on how many invoices are read. Past it, the upload is kept and lines can be added by hand.",
  },
  {
    title: "Digital PDFs are read as text",
    body: "PDF pages that carry their own text are sent as text rather than as pictures, and pages with no figures on them are skipped.",
  },
];

const afterwards = [
  "Totals per product across every supplier and over time — what you have actually spent on each thing you buy.",
  "Spend by supplier, by storage area, by week or by month.",
  "Goods, VAT and paid-out shown separately.",
  "Lines with no readable price, and lines not yet matched, are reported rather than hidden.",
];

const invoiceFaqs = faqsById(["misread", "pdf", "credit-notes", "duplicates"]);

export default function InvoiceScanningPage() {
  return (
    <>
      <PageHero
        path="/features/invoice-scanning"
        eyebrow="Invoice scanning"
        title="Photograph the delivery note. Check what it read. That's the job."
        lead="Invisiko reads delivery notes and supplier invoices into line items, matched to the things you already buy."
        screenshot="invoiceReview"
      >
        {/* The human checkpoint, above the fold on mobile (§9.3 I). */}
        <p className="flex gap-3 rounded-2xl border border-amber/60 bg-amber/10 p-4 text-[0.9375rem] text-fg sm:text-base">
          <IoShieldCheckmarkOutline aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-amber" />
          <span>
            <strong className="font-semibold">A person stays in charge.</strong> Nothing reaches your stock or spend until
            someone checks the lines and presses Confirm.
          </span>
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={primaryCta.href} block>
            {primaryCta.label}
          </ButtonLink>
          <ButtonLink href="/features" variant="secondary" block>
            See all features
          </ButtonLink>
        </div>
      </PageHero>

      <Section tone="light" labelledBy="pipeline-title">
        <SectionHeading
          id="pipeline-title"
          eyebrow="The pipeline"
          title="From the delivery to the books."
          intro="Reading happens on a background worker, so the app is never blocked while an invoice is read — capture the next one, or get on with the shift."
        />
        <div className="mt-12">
          <Pipeline />
        </div>
      </Section>

      <Section tone="light" labelledBy="reads-title" className="border-t border-[#DCDCE0]">
        <SplitFeature
          id="reads"
          eyebrow="What it reads"
          title="The whole note, not just the total."
          intro="UK date order is understood — 22/09/26 is 22 September 2026."
          screenshot="invoiceCapture"
        >
          <dl className="mt-8 grid gap-6 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {reads.map((group) => (
              <div key={group.group}>
                <dt className="label-caps text-accent-text">{group.group}</dt>
                {group.items.map((item) => (
                  <dd key={item} className="mt-2 border-b border-line pb-2">
                    {item}
                  </dd>
                ))}
              </div>
            ))}
          </dl>
          <p className="mt-6 text-muted">
            <strong className="font-semibold text-fg">Credit notes</strong> are recognised and applied as returns, not
            deliveries.
          </p>
        </SplitFeature>
      </Section>

      <Section tone="dark" labelledBy="in-charge-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-20">
          <div>
            <SectionHeading
              id="in-charge-title"
              eyebrow="Where a person stays in charge"
              title="It reads. You decide."
              intro="Scanning saves the typing, not the judgement."
            />
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {inCharge.map((point) => (
                <li key={point.title} data-reveal className="rounded-2xl border border-line bg-surface p-6">
                  <h3 className="text-lg font-semibold leading-snug">{point.title}</h3>
                  <p className="mt-2 text-muted">{point.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal className="hidden lg:block">
            <PhoneFrame screenshot="invoiceReviewUnmatched" />
          </div>
        </div>
      </Section>

      <Section tone="light" labelledBy="costs-title">
        <SectionHeading
          id="costs-title"
          eyebrow="What it costs you"
          title="Built not to waste a read."
          intro="Reading an invoice has a cost, so the product avoids paying for one it doesn't need."
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {costs.map((cost) => (
            <li key={cost.title} data-reveal className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="text-lg font-semibold leading-snug">{cost.title}</h3>
              <p className="mt-2 text-muted">{cost.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="light" labelledBy="afterwards-title" className="border-t border-[#DCDCE0]">
        <SplitFeature
          id="afterwards"
          eyebrow="Afterwards"
          title="Know what things really cost."
          intro="Every confirmed invoice adds up in the manager's purchase history."
          bullets={afterwards}
          screenshot="purchaseHistory"
          reverse
        />
      </Section>

      <Section tone="light" labelledBy="invoice-faq-title" className="border-t border-[#DCDCE0]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div>
            <SectionHeading id="invoice-faq-title" eyebrow="Questions" title="About the scanning." />
            <div className="mt-8 flex flex-col items-start gap-2" data-reveal>
              <ButtonLink href="/features/compliance" variant="text" arrow>
                Next: compliance records
              </ButtonLink>
              <ButtonLink href="/how-it-works" variant="text" arrow>
                How setup works
              </ButtonLink>
            </div>
          </div>
          <div data-reveal>
            <FaqAccordion items={invoiceFaqs} />
          </div>
        </div>
      </Section>

      <CtaBand id="invoice-cta" title="Want it reading your delivery notes?" />
    </>
  );
}
