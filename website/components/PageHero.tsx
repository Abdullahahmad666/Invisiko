import type { CSSProperties, ReactNode } from "react";
import type { ScreenshotId } from "@/content/screenshots";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { PhoneFrame } from "./PhoneFrame";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  /** CTAs or a callout under the lead. */
  children?: ReactNode;
  screenshot?: ScreenshotId;
  /** A short line under a hairline — a fact worth reading on its own. */
  caption?: ReactNode;
};

const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

/**
 * Dark hero for every page: the only `h1`, copy that rises in on load (no JavaScript needed),
 * and an optional phone on the right from 1024px. Text comes first in the source so it leads
 * on mobile.
 */
export function PageHero({ eyebrow, title, lead, children, screenshot, caption }: PageHeroProps) {
  return (
    <section className="tone-dark relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_55%_at_78%_45%,rgba(254,154,2,0.13),transparent_70%),linear-gradient(to_bottom,transparent_70%,#0B0B0D)]"
      />
      <Container className="relative pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24">
        <div className={screenshot ? "grid items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]" : ""}>
          <div className="max-w-[44rem]">
            <div className="hero-rise" style={rise(0)}>
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
            <h1
              className="hero-rise mt-5 text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.025em] sm:text-[2.75rem] lg:text-[3.5rem]"
              style={rise(40)}
            >
              {title}
            </h1>
            <div className="hero-rise mt-5 max-w-[36rem] text-pretty text-lg text-muted sm:text-xl" style={rise(80)}>
              {lead}
            </div>
            {children ? (
              <div className="hero-rise mt-8" style={rise(120)}>
                {children}
              </div>
            ) : null}
            {caption ? (
              <p
                className="hero-rise mt-10 max-w-[26rem] border-t border-fg/70 pt-4 text-[0.9375rem] text-fg/90"
                style={rise(160)}
              >
                {caption}
              </p>
            ) : null}
          </div>
          {screenshot ? (
            <div className="hero-rise" style={rise(120)}>
              <PhoneFrame screenshot={screenshot} priority />
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
