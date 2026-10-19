import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  IoCloudDoneOutline,
  IoGlobeOutline,
  IoHandLeftOutline,
  IoLocationOutline,
  IoLockClosedOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { CtaBand } from "@/components/CtaBand";
import { Fill } from "@/components/Fill";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/about");

// §9.7: no invented team members, dates, funding or customer counts. The origin story, team and
// location must come from the owner (§14 Q5, Q21). "How we build" uses only verified facts from
// PRODUCT_BLUEPRINT.md §5 and the product's existing privacy page (§9.10).

const principles: { Icon: IconType; title: string; body: string }[] = [
  {
    Icon: IoLockClosedOutline,
    title: "Files are private",
    body: "Invoice photos, certificates and other uploads are kept in private storage and opened only through links that expire after an hour.",
  },
  {
    Icon: IoCloudDoneOutline,
    title: "Uploads can't be silently lost",
    body: "The production service refuses to start without its file storage configured, so an upload can never land somewhere the next deploy would wipe.",
  },
  {
    Icon: IoShieldCheckmarkOutline,
    title: "Roles are enforced on the server",
    body: "What staff can and can't see is decided on the server, not just hidden in the app. A staff account asking for a manager's data is refused.",
  },
  {
    Icon: IoLocationOutline,
    title: "Location is read once",
    body: "A phone's position is read at check-in or check-out, and never tracked continuously.",
  },
  {
    Icon: IoHandLeftOutline,
    title: "Your restaurant controls its data",
    body: "Invisiko provides the app and the infrastructure it runs on. Personal data is not sold and not used for advertising.",
  },
  {
    Icon: IoGlobeOutline,
    title: "This website is separate",
    body: "This site has no access to the app or its data. It holds no credentials and calls none of the app's services.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        path="/about"
        eyebrow="About"
        title="Built for the person who runs the place."
        lead="Invisiko is a mobile app for the back of house of an independent takeaway or small restaurant — the hours, the checks, the pay and the deliveries that land on whoever runs it."
      />

      <Section tone="light" labelledBy="why-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <SectionHeading id="why-title" eyebrow="Why it exists" title="Where Invisiko came from." />
          {/* Owner-supplied content only (§9.7 E). */}
          <div
            className="rounded-2xl border border-dashed border-line-strong bg-surface p-6 sm:p-8"
            data-reveal
          >
            <p className="label-caps text-accent-text">To be written by the owner</p>
            <p className="mt-3 text-muted">
              The honest origin of the product — who built it, why, and for which kitchen — goes here.{" "}
              <Fill value="[[ORIGIN_STORY]]" />
            </p>
            <p className="mt-3 text-muted">
              Company: <Fill value="[[LEGAL_NAME]]" /> · Based in: <Fill value="[[LOCATION]]" />
            </p>
          </div>
        </div>
      </Section>

      <Section tone="dark" labelledBy="build-title">
        <SectionHeading
          id="build-title"
          eyebrow="How we build"
          title="Handled with care, because it's other people's records."
          intro="You'd be trusting Invisiko with your staff's hours and pay and your compliance paperwork. Here is how that is looked after."
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {principles.map(({ Icon, title, body }, index) => (
            <li key={title} data-reveal style={{ "--stagger": index } as CSSProperties} className="rounded-2xl border border-line bg-surface p-6">
              <Icon aria-hidden="true" className="size-6 text-accent-text" />
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-muted">{body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand id="about-cta" title="Questions about how it works?" body="Ask us anything before you decide. A person reads every message." />
    </>
  );
}
