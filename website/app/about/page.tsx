import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  IoCheckmarkDoneOutline,
  IoCloudDoneOutline,
  IoEyeOutline,
  IoGlobeOutline,
  IoHandLeftOutline,
  IoLocationOutline,
  IoLockClosedOutline,
  IoPhonePortraitOutline,
  IoShieldCheckmarkOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { CtaBand } from "@/components/CtaBand";
import { EmailLink } from "@/components/Fill";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/about");

// §9.7: no invented team members, dates, funding or customer counts. This page describes the
// product and the thinking behind it; a personal founding story can be added when the owner writes
// one. "How we build" uses only verified facts from PRODUCT_BLUEPRINT.md §5 and the product's
// existing privacy page (§9.10).

const beliefs: { Icon: IconType; title: string; body: string }[] = [
  {
    Icon: IoTimeOutline,
    title: "Records made as the work happens",
    body: "A check written up at the end of the week is a memory. A check recorded at the fridge, with a name and a time, is a record. Invisiko is built around the second.",
  },
  {
    Icon: IoEyeOutline,
    title: "Say what it doesn't do",
    body: "It isn't a till, it needs a connection, and it runs one restaurant per account. We would rather you knew that before you start than found out in week two.",
  },
  {
    Icon: IoCheckmarkDoneOutline,
    title: "A person stays in charge",
    body: "The app reads delivery notes and works out hours, but nothing reaches your stock or your pay without someone checking it first.",
  },
  {
    Icon: IoPhonePortraitOutline,
    title: "One phone, not a new system",
    body: "No web dashboard to learn and no hardware to buy: a printed code at the door, and the app on each person's iPhone.",
  },
];

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
  const facts: [string, React.ReactNode][] = [
    ["Company", site.legalName],
    ["Based in", `${site.location.locality}, ${site.location.country}`],
    ["Built for", "Independent takeaways and small restaurants"],
    ["Runs on", "iPhone (iOS)"],
    ["Getting access", "By request — a person replies"],
    ["Contact", <EmailLink key="email" address={site.contactEmail} className="text-fg" />],
  ];

  return (
    <>
      <PageHero
        path="/about"
        eyebrow="About"
        title="Built for the person who runs the place."
        lead="Invisiko is a mobile app for the back of house of an independent takeaway or small restaurant — the hours, the checks, the pay and the deliveries that land on whoever runs it."
        screenshot="splash"
      />

      <Section tone="light" labelledBy="why-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-20">
          <div data-reveal>
            <SectionHeading id="why-title" eyebrow="Why it exists" title="Four jobs nobody trained you for." />
            <div className="mt-6 max-w-[62ch] space-y-5 text-lg text-muted">
              <p>
                Running a takeaway means running four jobs on top of the cooking: the rota and the hours people actually
                worked, the day&apos;s food-safety checks, what everyone is owed, and what the deliveries really cost. Often
                they live on paper, in a group chat and in someone&apos;s memory — and they get done after service, when
                everyone else has gone home.
              </p>
              <p>
                <strong className="font-semibold text-fg">Invisiko puts all four on one phone.</strong>{" "}
                Staff check in by scanning a code at the door. Fridge temperatures and checklists are recorded as they
                happen, each with a name and a time. Hours turn into fortnightly pay. Delivery notes turn into stock and
                spend, once someone has checked what was read.
              </p>
              <p>
                It is built for one independent restaurant, done properly — rather than a cut-down version of software
                made for chains. The result is a record you can stand behind: who was here, what was checked, what it
                cost, and when.
              </p>
            </div>
          </div>

          <aside aria-labelledby="glance-title" className="self-start lg:sticky lg:top-28" data-reveal>
            <div className="rounded-2xl border border-line bg-surface p-6 sm:p-7">
              <h2 id="glance-title" className="label-caps text-accent-text">
                Invisiko at a glance
              </h2>
              <dl className="mt-4 divide-y divide-line">
                {facts.map(([term, value]) => (
                  <div key={term} className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-4 py-3">
                    <dt className="text-sm text-muted">{term}</dt>
                    <dd className="text-[0.9375rem] font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="light" labelledBy="believe-title" className="border-t border-[#DCDCE0]">
        <SectionHeading
          id="believe-title"
          eyebrow="What we believe"
          title="Plain-spoken software for a hard-working kitchen."
          intro="Four ideas behind every screen in the app."
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {beliefs.map(({ Icon, title, body }, index) => (
            <li
              key={title}
              data-reveal
              style={{ "--stagger": index % 2 } as CSSProperties}
              className="lift flex gap-5 rounded-2xl border border-line bg-surface p-6 sm:p-7"
            >
              <span className="sd-pop grid size-12 shrink-0 place-items-center rounded-2xl bg-amber text-ink">
                <Icon aria-hidden="true" className="size-6" />
              </span>
              <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-muted">{body}</p>
              </div>
            </li>
          ))}
        </ul>
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
            <li
              key={title}
              data-reveal
              style={{ "--stagger": index % 3 } as CSSProperties}
              className="lift rounded-2xl border border-line bg-surface p-6"
            >
              <span className="sd-pop inline-grid size-11 place-items-center rounded-xl border border-line bg-surface-raised text-accent-text">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-muted">{body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        id="about-cta"
        title="Questions about how it works?"
        body="Ask us anything before you decide. A person reads every message."
      />
    </>
  );
}
