import Link from "next/link";
import type { CSSProperties } from "react";
import { IoArrowForward } from "react-icons/io5";
import type { IconName } from "@/content/features";
import { Icon } from "./Icon";

type FeatureCardProps = {
  label: string;
  title: string;
  body: string;
  icon: IconName;
  href?: string;
  linkLabel?: string;
  /** Position within its row, for the staggered scroll reveal. */
  stagger?: number;
  /** Heading level inside the card — h3 under a section h2. */
  compact?: boolean;
};

/** Dark surface, 1px border, 16px radius, hover-lift (§10). A linked card is one link target. */
export function FeatureCard({ label, title, body, icon, href, linkLabel, stagger = 0, compact = false }: FeatureCardProps) {
  const content = (
    <>
      <div className="flex items-center gap-3">
        <span className="sd-pop grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-surface-raised text-accent-text">
          <Icon name={icon} className="size-5" />
        </span>
        {compact ? null : <span className="label-caps text-muted">{label}</span>}
      </div>
      <h3 className={`${compact ? "mt-5 text-lg" : "mt-6 text-xl"} font-semibold leading-snug tracking-[-0.01em]`}>{title}</h3>
      <p className="mt-2.5 text-muted">{body}</p>
      {href ? (
        <span className="mt-auto flex items-center gap-1.5 pt-6 font-semibold text-accent-text">
          {linkLabel ?? `More on ${label.toLowerCase()}`}
          <IoArrowForward
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
          />
        </span>
      ) : null}
    </>
  );

  const cardClass = `flex h-full flex-col rounded-2xl border border-line bg-surface ${compact ? "p-6" : "p-6 sm:p-7"}`;

  return (
    <li data-reveal style={{ "--stagger": stagger } as CSSProperties}>
      {href ? (
        <Link href={href} className={`group lift ${cardClass} hover:border-line-strong`}>
          {content}
        </Link>
      ) : (
        <div className={`lift ${cardClass} hover:border-line-strong`}>{content}</div>
      )}
    </li>
  );
}
