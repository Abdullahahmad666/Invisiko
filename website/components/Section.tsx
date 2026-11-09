import type { ReactNode } from "react";
import { Container } from "./Container";

type Tone = "dark" | "light";

type SectionProps = {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  /** id of the section's h2, for aria-labelledby. */
  labelledBy?: string;
  /** Vertical rhythm. `default` is used everywhere unless a section is deliberately tight. */
  spacing?: "default" | "tight" | "none";
  className?: string;
  containerClassName?: string;
  /**
   * Fill the screen below the header (and the section bar, where there is one), with the content
   * centred, so a reader sees one section at a time. On by default.
   */
  fill?: boolean;
};

const spacingClass = {
  default: "py-16 sm:py-20 lg:py-24",
  tight: "py-12 sm:py-14 lg:py-16",
  none: "",
};

/** Consistent vertical rhythm and tone for every page section, one screen at a time. */
export function Section({
  children,
  tone = "light",
  id,
  labelledBy,
  spacing = "default",
  className = "",
  containerClassName = "",
  fill = true,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`tone-${tone} ${fill ? "fill-screen" : ""} ${spacingClass[spacing]} ${className}`}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
