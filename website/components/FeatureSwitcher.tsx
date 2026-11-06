import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import { featureNav } from "@/content/site";
import { ButtonLink } from "./Button";
import { Icon } from "./Icon";
import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";
import type { CSSProperties } from "react";

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
              className="group lift flex h-full flex-col rounded-2xl border border-line bg-surface p-6 hover:border-line-strong"
            >
              <span className="grid size-10 place-items-center rounded-xl border border-line bg-surface-raised text-accent-text">
                <Icon name={item.icon} className="size-5" />
              </span>
              <span className="mt-5 flex items-center gap-1.5 text-lg font-semibold">
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
