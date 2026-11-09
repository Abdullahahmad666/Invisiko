import type { CSSProperties, ReactNode } from "react";
import { nextSteps } from "@/content/next-steps";
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

/**
 * The closing dark band on every page (§9.1 section 8): the ask on the left, and on the right what
 * happens once someone asks, so the last screen answers "and then what?".
 */
export function CtaBand({
  id,
  title = "Want to try it in your kitchen?",
  body = "Tell us about your place. A person reads every request and replies by email.",
  secondary = { href: "/contact#other-ways", label: "Talk to us first" },
}: CtaBandProps) {
  return (
    <section aria-labelledby={`${id}-title`} className="fill-screen tone-dark relative overflow-clip border-t border-line">
      <div
        aria-hidden="true"
        className="sd-glow pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_100%,rgba(254,154,2,0.16),transparent_70%)]"
      />
      <Container className="relative py-20 sm:py-24 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
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

          <div>
            <h3 className="label-caps text-muted" data-reveal>
              What happens next
            </h3>
            <ol className="mt-5 space-y-3">
              {nextSteps.map((step, index) => (
                <li
                  key={step.title}
                  className="lift flex gap-4 rounded-2xl border border-line bg-surface p-5"
                  data-reveal
                  style={{ "--stagger": index + 1 } as CSSProperties}
                >
                  <span
                    aria-hidden="true"
                    className="grid size-8 shrink-0 place-items-center rounded-full bg-amber text-sm font-semibold text-ink"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{step.title}</p>
                    <p className="mt-1 text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
