import Link from "next/link";
import type { CSSProperties } from "react";
import { IoArrowForward } from "react-icons/io5";
import type { ScreenshotId } from "@/content/screenshots";
import { featureNav } from "@/content/site";
import { ButtonLink } from "./Button";
import { Icon } from "./Icon";
import { PhoneScreen } from "./PhoneFrame";
import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";

/** The screen each feature is best known by. */
const previews: Record<string, ScreenshotId> = {
  "/features/attendance": "attendanceLive",
  "/features/compliance": "checksDashboard",
  "/features/invoice-scanning": "invoiceReview",
  "/features#pay": "payroll",
};

/**
 * Closes every feature page the same way: the other features, the overview and how it works,
 * so a reader always has a clear next step (§12: each feature page links a sibling and
 * /how-it-works). `id` must be unique per page; visited routes stay in the DOM.
 */
export function FeatureSwitcher({ current, id }: { current: string; id: string }) {
  const others = featureNav.filter((item) => item.href !== current);

  return (
    <Section tone="light" labelledBy={`${id}-title`} className="border-t border-[#DCDCE0]">
      <SectionHeading id={`${id}-title`} eyebrow="Keep exploring" title="The rest of the back of house." />
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {others.map((item, index) => (
          <li key={item.href} data-reveal style={{ "--stagger": index } as CSSProperties}>
            <Link
              href={item.href}
              className="group lift flex h-full flex-col overflow-clip rounded-2xl border border-line bg-surface p-6 hover:border-line-strong"
            >
              {/* A peek at the feature's own screen, rising out of the card. */}
              <span
                aria-hidden="true"
                className="relative -mx-6 -mt-6 mb-5 block h-44 overflow-clip rounded-t-2xl bg-[#0B0B0D] sm:h-52"
              >
                <span className="absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_100%,rgba(254,154,2,0.22),transparent_70%)]" />
                <span className="absolute top-6 left-1/2 block aspect-[9/20] w-[46%] max-w-[11rem] -translate-x-1/2 overflow-clip rounded-t-[1.6rem] border border-b-0 border-[#333336] bg-[#111113] p-1.5 pb-0 transition-transform duration-300 group-hover:-translate-y-2 motion-reduce:transition-none">
                  <span className="block h-full overflow-clip rounded-t-[1.25rem]">
                    <PhoneScreen screenshot={previews[item.href]} sizes="180px" decorative />
                  </span>
                </span>
              </span>
              <span className="flex items-center gap-2.5 text-lg font-semibold">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-line bg-surface-raised text-accent-text">
                  <Icon name={item.icon} className="size-4" />
                </span>
                {item.label}
                <IoArrowForward
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                />
              </span>
              <span className="mt-1.5 text-muted">{item.description}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2" data-reveal>
        <ButtonLink href="/features" variant="text" arrow>
          All features
        </ButtonLink>
        <ButtonLink href="/how-it-works" variant="text" arrow>
          How setup works
        </ButtonLink>
      </div>
    </Section>
  );
}
