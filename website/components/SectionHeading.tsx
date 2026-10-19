import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

type SectionHeadingProps = {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/** The h2 every section carries (§12: one h1 per page, h2 per section, no skipped levels). */
export function SectionHeading({ id, eyebrow, title, intro, align = "left", className = "" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-[42rem] ${className}`} data-reveal>
      {eyebrow ? <Eyebrow className={`mb-4 ${centered ? "justify-center" : ""}`}>{eyebrow}</Eyebrow> : null}
      <h2 id={id} className="text-balance text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[2.25rem] lg:text-[2.625rem]">
        {title}
      </h2>
      {intro ? <p className="mt-4 text-pretty text-lg text-muted">{intro}</p> : null}
    </div>
  );
}
