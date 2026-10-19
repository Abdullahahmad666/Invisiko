import type { ReactNode } from "react";
import { IoCheckmark } from "react-icons/io5";
import type { ScreenshotId } from "@/content/screenshots";
import { ButtonLink } from "./Button";
import { Eyebrow } from "./Eyebrow";
import { PhoneFrame } from "./PhoneFrame";

type SplitFeatureProps = {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  bullets?: ReactNode[];
  children?: ReactNode;
  screenshot?: ScreenshotId;
  /** Any visual in place of a screenshot (e.g. a diagram). */
  visual?: ReactNode;
  link?: { href: string; label: string };
  /** Put the visual on the left from 1024px. Text always comes first on mobile. */
  reverse?: boolean;
};

/** Text beside a screenshot from 1024px; stacked below (§9 responsive rule). */
export function SplitFeature({ id, eyebrow, title, intro, bullets, children, screenshot, visual, link, reverse = false }: SplitFeatureProps) {
  const headingId = `${id}-title`;
  return (
    <div id={id} className="grid scroll-mt-24 items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <div className={reverse ? "lg:order-2" : ""} data-reveal>
        {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
        <h2
          id={headingId}
          className="text-balance text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[2.25rem] lg:text-[2.5rem]"
        >
          {title}
        </h2>
        {intro ? <div className="mt-4 text-lg text-muted">{intro}</div> : null}
        {bullets?.length ? (
          <ul className="mt-6 space-y-3.5">
            {bullets.map((bullet, index) => (
              <li key={index} className="flex gap-3">
                <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-amber text-ink">
                  <IoCheckmark aria-hidden="true" className="size-3.5" />
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {children}
        {link ? (
          <div className="mt-8">
            <ButtonLink href={link.href} variant="text" arrow>
              {link.label}
            </ButtonLink>
          </div>
        ) : null}
      </div>
      <div className={reverse ? "lg:order-1" : ""} data-reveal>
        {visual ?? (screenshot ? <PhoneFrame screenshot={screenshot} /> : null)}
      </div>
    </div>
  );
}
