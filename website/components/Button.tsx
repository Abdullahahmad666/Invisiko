import Link from "next/link";
import type { ReactNode } from "react";
import { IoArrowForward } from "react-icons/io5";

type Variant = "primary" | "secondary" | "text";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Full width on mobile, natural width from `sm` up (§9.1 hero: CTAs stacked on mobile). */
  block?: boolean;
  arrow?: boolean;
  className?: string;
};

const base =
  "press inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-base font-semibold whitespace-nowrap transition-colors duration-200";

const variants: Record<Variant, string> = {
  // Dark ink on amber — white on this amber fails contrast (§10).
  primary: `${base} bg-amber text-ink hover:bg-amber-hover`,
  secondary: `${base} border border-line-strong text-fg hover:border-fg hover:bg-fg/5`,
  text: "group inline-flex min-h-11 items-center gap-1.5 font-semibold text-fg underline decoration-line-strong underline-offset-[6px] hover:decoration-fg",
};

/** Every CTA is a real link to a real page (§9.1 I: no `#` links). */
export function ButtonLink({ href, children, variant = "primary", block = false, arrow = false, className = "" }: ButtonLinkProps) {
  return (
    <Link href={href} className={`${variants[variant]} ${block ? "w-full sm:w-auto" : ""} ${className}`}>
      {children}
      {arrow ? (
        <IoArrowForward
          aria-hidden="true"
          className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
        />
      ) : null}
    </Link>
  );
}
