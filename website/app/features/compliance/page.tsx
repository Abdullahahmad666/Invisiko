import type { CSSProperties } from "react";
import { IoLockClosedOutline, IoTimeOutline } from "react-icons/io5";
import { ButtonLink } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { SplitFeature } from "@/components/SplitFeature";
import { primaryCta } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/features/compliance");

// Claims map to PRODUCT_BLUEPRINT.md §2 C1–C5. No certification wording (no SFBB, HACCP or
// "EHO-ready"); nothing implying corrective actions, a failed checklist state or missed-check
// alerts (§2 C6–C8, §9.5).

const expiry = [
  { tone: "bg-success", label: "Valid", body: "In date, or set as “does not expire”." },
  { tone: "bg-warning", label: "Expiring soon", body: "Due to expire within 30 days — flagged amber." },
  { tone: "bg-danger", label: "Expired", body: "Past its date — flagged red on the Documents tile." },
];

const gaps = [
  {
    title: "A checklist item has no “failed” state.",
    body: "It records that it was done — by whom, when, with an optional note. An item that was not done is simply absent. Only a temperature reading is measured against anything: the unit's recommended maximum.",
  },
  {
    title: "Nothing has to happen after an out-of-range reading.",
    body: "A reading above the maximum is recorded and shown clearly, but the app does not require a corrective action or block anything until it is dealt with.",
  },
  {
    title: "Nothing alerts you to a missed check.",
    body: "There is no reminder or alert when a check is missed or overdue. You find out by opening the history.",
  },
];

export default function CompliancePage() {
  return (
    <>
      <PageHero
        path="/features/compliance"
        eyebrow="Compliance records"
        title="Food-safety records, kept as the work happens."
        lead="Fridge temperatures, opening and closing checks and your licences — on the phone, with who did what and when, ready when somebody asks."
        screenshot="checksDashboard"
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

      <Section tone="light" labelledBy="routines-title">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            id="routines-title"
            eyebrow="Opening and closing"
            title="One routine for opening, one for closing."
            intro="Each routine leads to the day's fridge temperatures and its own checklist, in the order the work is done."
          />
          <ul className="grid gap-4 self-end" data-reveal>
            <li className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="font-semibold">Shared across the shift</h3>
              <p className="mt-1.5 text-muted">
                A routine belongs to the restaurant, not to one person, so whoever is on can pick up where the last person
                left off.
              </p>
            </li>
            <li className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="font-semibold">Every completion is stamped</h3>
              <p className="mt-1.5 text-muted">Each item records who completed it and when, with an optional note.</p>
            </li>
          </ul>
        </div>
      </Section>

      <Section tone="light" labelledBy="temperatures-title" className="border-t border-[#DCDCE0]">
        <SplitFeature
          id="temperatures"
          eyebrow="Temperatures"
          title="Every fridge and freezer, on the record."
          intro="Register each unit once — its name, whether it is a fridge or freezer, its recommended maximum temperature, and a photo if you like."
          bullets={[
            "Staff record a reading with a stepper, rather than typing a number.",
            "A reading above the unit's recommended maximum is obvious as it is entered.",
            "Anyone can add a note to a reading.",
          ]}
          screenshot="temperatures"
          reverse
        />
      </Section>

      <Section tone="dark" labelledBy="checklists-title">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            id="checklists-title"
            eyebrow="Named checklists"
            title="Daily, weekly and monthly lists, in your words."
            intro="As many named checklists as you need — “Toilet cleaning”, “Monthly deep clean” — each with its own tasks."
          />
          <ul className="grid gap-3 self-end sm:grid-cols-3" data-reveal>
            {["Daily", "Weekly", "Monthly"].map((frequency) => (
              <li key={frequency} className="rounded-2xl border border-line bg-surface p-5">
                <p className="label-caps text-accent-text">{frequency}</p>
                <p className="mt-2 text-muted">Tasks completed with a name, a time and an optional note.</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="light" labelledBy="documents-title">
        <SplitFeature
          id="documents"
          eyebrow="Documents"
          title="Someone official asks. It's two taps."
          intro="Licences, certificates and insurance are filed in the app — photographed, picked from the gallery or uploaded as a PDF — and open full screen when you need them."
          screenshot="documents"
        >
          <ul className="mt-6 space-y-3 text-muted">
            <li>Categories are named and ordered by you.</li>
            <li>An expiry date is optional — “does not expire” is a proper answer, not a blank.</li>
            <li>Images open full screen with pinch-to-zoom; PDFs open in the phone&apos;s own viewer.</li>
          </ul>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {expiry.map((state) => (
              <li key={state.label} className="rounded-xl border border-line bg-surface p-4">
                <span className="flex items-center gap-2 font-semibold">
                  <span aria-hidden="true" className={`size-2.5 rounded-full ${state.tone}`} />
                  {state.label}
                </span>
                <span className="mt-1.5 block text-sm text-muted">{state.body}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 flex gap-3 rounded-2xl border border-line-strong p-4">
            <IoLockClosedOutline aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent-text" />
            <span>
              <strong className="font-semibold">Managers only.</strong> Staff have no access to the document vault — there is
              no route to it from a staff account, and the server enforces that.
            </span>
          </p>
        </SplitFeature>
      </Section>

      <Section tone="light" labelledBy="history-title" className="border-t border-[#DCDCE0]">
        <SplitFeature
          id="history"
          eyebrow="History"
          title="Look back over the last month."
          intro="Managers can review temperature history for the last 7, 14 or 30 days, filtered by routine — each reading with who recorded it and when."
          screenshot="complianceHistory"
          reverse
        >
          <p className="mt-6 flex items-center gap-2 text-muted">
            <IoTimeOutline aria-hidden="true" className="size-5 text-accent-text" />
            Recorded as it happened, not written up at the end of the week.
          </p>
        </SplitFeature>
      </Section>

      <Section tone="dark" labelledBy="gaps-title">
        <SectionHeading
          id="gaps-title"
          eyebrow="Honest gaps"
          title="What the compliance records don't do."
          intro="Three things worth knowing before you rely on it."
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {gaps.map((gap, index) => (
            <li key={gap.title} data-reveal style={{ "--stagger": index } as CSSProperties} className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="text-lg font-semibold leading-snug">{gap.title}</h3>
              <p className="mt-2 text-muted">{gap.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-[44rem] text-muted" data-reveal>
          What it does do: the record exists, it is timestamped, it says who, and it is on the phone when somebody asks.
          Invisiko does not certify your business against any scheme — the checks are yours.
        </p>
        <div className="mt-10 flex flex-col items-start gap-2" data-reveal>
          <ButtonLink href="/features/invoice-scanning" variant="text" arrow>
            Next: invoice scanning
          </ButtonLink>
          <ButtonLink href="/how-it-works" variant="text" arrow>
            How setup works
          </ButtonLink>
        </div>
      </Section>

      <CtaBand id="compliance-cta" title="Want the folder behind the counter on your phone?" />
    </>
  );
}
