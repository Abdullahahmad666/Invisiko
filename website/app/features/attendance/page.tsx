import { IoCreateOutline, IoLocationOutline, IoPeopleOutline, IoQrCodeOutline, IoTimeOutline } from "react-icons/io5";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { SplitFeature } from "@/components/SplitFeature";
import { primaryCta } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/features/attendance");

// Claims map to PRODUCT_BLUEPRINT.md §2 B1–B6. Wording rule (§7): "position-checked", never
// tamper-proof, fraud-proof or proof of attendance. No biometrics, no shift reminders.

const beats = [
  {
    Icon: IoQrCodeOutline,
    title: "A printed code at the door",
    body: "You print your venue's QR code and put it where staff arrive. Regenerating it makes every printed copy stop working straight away.",
  },
  {
    Icon: IoLocationOutline,
    title: "The phone's position is checked",
    body: "When someone scans, their phone sends its position. Invisiko works out the distance from the venue against the radius you set — 100 metres unless you change it.",
  },
  {
    Icon: IoTimeOutline,
    title: "Outside the radius, it says no",
    body: "The check-in is refused, and the message says how far away the phone is. Inside it, the check-in is recorded and matched to their shift on the rota.",
  },
];

export default function AttendancePage() {
  return (
    <>
      <PageHero
        path="/features/attendance"
        eyebrow="Attendance & rota"
        title="Hours you can trust, recorded at the door."
        lead="Staff check in and out by scanning a code at your venue. The phone's position is checked against the radius you set, and a check-in from outside it is refused."
        screenshot="scanRefused"
        caption="Location is read once, at check-in or check-out — never tracked continuously."
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

      <Section tone="light" labelledBy="check-in-title">
        <SectionHeading id="check-in-title" eyebrow="How a check-in works" title="Three beats, at the door." />
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {beats.map(({ Icon, title, body }, index) => (
            <li
              key={title}
              data-reveal
              style={{ "--reveal-delay": `${index * 50}ms` } as CSSProperties}
              className="rounded-2xl border border-line bg-surface p-6"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-full bg-amber text-ink">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <span className="label-caps tabular-nums text-muted">0{index + 1}</span>
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-snug">{title}</h3>
              <p className="mt-2 text-muted">{body}</p>
            </li>
          ))}
        </ol>

        <figure className="mt-12 rounded-2xl border border-line bg-surface p-6 sm:p-8" data-reveal>
          <figcaption className="label-caps text-accent-text">What a refused check-in says</figcaption>
          {/* The product's actual message format, with a neutral venue name (§9.4). */}
          <blockquote className="mt-4 text-xl font-semibold leading-snug tracking-[-0.01em] sm:text-2xl">
            “You are 340m from The Clay Oven, outside the 100m check-in radius.”
          </blockquote>
          <p className="mt-4 max-w-[44rem] text-muted">
            The venue name is your restaurant&apos;s own, and the radius is whatever you set. A second scan moments after
            checking in is treated as a double tap, not a check-out.
          </p>
        </figure>

        <div className="mt-6 rounded-2xl border border-dashed border-line-strong p-6 sm:p-8" data-reveal>
          <h3 className="font-semibold">What it is, and what it isn&apos;t</h3>
          <p className="mt-2 max-w-[48rem] text-muted">
            Invisiko checks where the phone says it is, and refuses a check-in outside your radius. It is not a fingerprint
            or face scan, and because it relies on the position the phone reports, it is a check rather than a guarantee.
            Staff are asked for camera and location permission at the moment they first scan.
          </p>
        </div>
      </Section>

      <Section tone="light" labelledBy="rota-title" className="border-t border-[#DCDCE0]">
        <SplitFeature
          id="rota"
          eyebrow="The rota"
          title="Build the week, and see what it costs as you go."
          intro="Add shifts for each person across the days you pick, with start and end times and notes."
          bullets={[
            "The estimated staff cost for the week updates as you build it.",
            "The job is set per shift — chef, driver or till — so the same person can cover different roles on different days.",
            "Check-ins are matched to the shift on the rota where one exists.",
          ]}
          screenshot="rota"
        />
      </Section>

      <Section tone="dark" labelledBy="swaps-title">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            id="swaps-title"
            eyebrow="Swaps"
            title="Shift swaps that go through you."
            intro="Staff offer a shift to a named colleague, with a reason if they want to give one. The shift only changes hands when you approve it."
          />
          <ul className="space-y-4 self-end" data-reveal>
            {[
              "You approve or decline from your phone.",
              "Everyone involved gets a push notification when a swap is requested, and again when it is decided.",
              "Staff also hear when a shift of theirs is added, changed or cancelled.",
            ].map((line) => (
              <li key={line} className="rounded-2xl border border-line bg-surface p-5 text-muted">
                {line}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="light" labelledBy="corrections-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <SectionHeading
            id="corrections-title"
            eyebrow="Corrections and honesty"
            title="Mistakes get fixed. Fixes stay visible."
            intro="If you have ever argued about hours, this is the part that matters."
          />
          <ul className="grid gap-4" data-reveal>
            <li className="flex gap-4 rounded-2xl border border-line bg-surface p-6">
              <IoCreateOutline aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-accent-text" />
              <div>
                <h3 className="font-semibold">A manager can correct a record</h3>
                <p className="mt-1.5 text-muted">
                  The correction is kept marked as a manual override — it is never silently rewritten as if it had always
                  been that way.
                </p>
              </div>
            </li>
            <li className="flex gap-4 rounded-2xl border border-line bg-surface p-6">
              <IoPeopleOutline aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-accent-text" />
              <div>
                <h3 className="font-semibold">Staff can add their own note</h3>
                <p className="mt-1.5 text-muted">
                  Anyone can attach a note to their own check-in, so their side of it is on the record too.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </Section>

      <Section tone="light" labelledBy="managers-title" className="border-t border-[#DCDCE0]">
        <SplitFeature
          id="managers"
          eyebrow="What managers see"
          title="Who's on, and how the month went."
          bullets={[
            "Everyone currently checked in, and how long they have been on shift.",
            "A notification when someone checks in.",
            "Attendance history you can filter by person, and by open or closed records.",
            "Hours and minutes late per person across the month, and staff cost by month. Staff see their own.",
          ]}
          screenshot="attendanceLive"
          reverse
        >
          <div className="mt-8 flex flex-col items-start gap-2">
            <ButtonLink href="/features/compliance" variant="text" arrow>
              Next: compliance records
            </ButtonLink>
            <ButtonLink href="/how-it-works" variant="text" arrow>
              How setup works
            </ButtonLink>
          </div>
        </SplitFeature>
      </Section>

      <CtaBand id="attendance-cta" title="Want hours you don't have to argue about?" />
    </>
  );
}
