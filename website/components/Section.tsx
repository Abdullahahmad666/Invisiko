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
};

const spacingClass = {
  default: "py-16 sm:py-20 lg:py-28",
  tight: "py-12 sm:py-14 lg:py-16",
  none: "",
};

/** Consistent vertical rhythm and tone for every page section. */
export function Section({
  children,
  tone = "light",
  id,
  labelledBy,
  spacing = "default",
  className = "",
  containerClassName = "",
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`tone-${tone} ${spacingClass[spacing]} ${className}`}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
