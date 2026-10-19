import type { CSSProperties, ReactNode } from "react";
import type { PagePath } from "@/content/pages";
import type { ScreenshotId } from "@/content/screenshots";
import { webPageLd } from "@/lib/structured-data";
import { Breadcrumbs } from "./Breadcrumbs";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { JsonLd } from "./JsonLd";
import { PhoneFrame } from "./PhoneFrame";
import { SplitWords } from "./SplitWords";

type PageHeroProps = {
  /** Registry path: drives the visible breadcrumb and the WebPage + BreadcrumbList markup. Omit on 404. */
  path?: PagePath;
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
export function PageHero({ path, eyebrow, title, lead, children, screenshot, caption }: PageHeroProps) {
  return (
    <section className="tone-dark relative overflow-clip">
      {path ? <JsonLd data={webPageLd(path)} /> : null}
      <div
        aria-hidden="true"
        className="hero-glow pointer-events-none absolute inset-0 bg-[radial-gradient(45%_55%_at_78%_45%,rgba(254,154,2,0.16),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_70%,#0B0B0D)]"
      />
      <Container className="relative pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24">
        <div className={screenshot ? "grid items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]" : ""}>
          {/* Lifts away as the page scrolls. */}
          <div className="hero-exit-copy max-w-[44rem]">
            {path && path !== "/" ? (
              <div className="hero-rise mb-8" style={rise(0)}>
                <Breadcrumbs path={path} />
              </div>
            ) : null}
            <div className="hero-rise" style={rise(40)}>
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
            <h1 className="mt-5 text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.025em] sm:text-[2.75rem] lg:text-[3.5rem]">
              {typeof title === "string" ? <SplitWords text={title} /> : title}
            </h1>
            <div className="hero-rise mt-5 max-w-[36rem] text-pretty text-lg text-muted sm:text-xl" style={rise(320)}>
              {lead}
            </div>
            {children ? (
              <div className="hero-rise mt-8" style={rise(440)}>
                {children}
              </div>
            ) : null}
            {caption ? (
              <p
                className="hero-rise mt-10 max-w-[26rem] border-t border-fg/70 pt-4 text-[0.9375rem] text-fg/90"
                style={rise(560)}
              >
                {caption}
              </p>
            ) : null}
          </div>
          {screenshot ? (
            <div className="hero-exit-phone">
              <div className="hero-rise" style={rise(300)}>
                <PhoneFrame screenshot={screenshot} priority />
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
