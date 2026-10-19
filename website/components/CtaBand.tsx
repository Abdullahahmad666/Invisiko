import type { ReactNode } from "react";
import { primaryCta } from "@/content/site";
import { ButtonLink } from "./Button";
import { Container } from "./Container";

type CtaBandProps = {
  /**
   * Unique per page. With Cache Components, recently visited routes stay in the DOM (hidden), so a
   * shared id would make aria-labelledby ambiguous across pages.
   */
  id: string;
  title?: ReactNode;
  body?: ReactNode;
  secondary?: { href: string; label: string } | null;
};

/** The closing dark band on every page (§9.1 section 8). */
export function CtaBand({
  id,
  title = "Want to try it in your kitchen?",
  body = "Tell us about your place. A person reads every request and replies by email.",
  secondary = { href: "/contact#other-ways", label: "Talk to us first" },
}: CtaBandProps) {
  return (
    <section aria-labelledby={`${id}-title`} className="tone-dark relative overflow-clip border-t border-line">
      <div
        aria-hidden="true"
        className="sd-glow pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_100%,rgba(254,154,2,0.16),transparent_70%)]"
      />
      <Container className="relative py-20 sm:py-24 lg:py-28">
        <div className="max-w-[40rem]" data-reveal>
          <h2
            id={`${id}-title`}
            className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[2.5rem] lg:text-[3rem]"
          >
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted">{body}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={primaryCta.href} block>
              {primaryCta.label}
            </ButtonLink>
            {secondary ? (
              <ButtonLink href={secondary.href} variant="secondary" block>
                {secondary.label}
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
