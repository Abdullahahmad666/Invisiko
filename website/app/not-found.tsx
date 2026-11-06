import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  IoArrowBack,
  IoChatbubblesOutline,
  IoGridOutline,
  IoHelpBuoyOutline,
  IoHelpCircleOutline,
  IoHomeOutline,
  IoMapOutline,
} from "react-icons/io5";
import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { GoBackButton } from "@/components/GoBackButton";
import { SplitWords } from "@/components/SplitWords";
import { NotFoundRadar } from "@/sections/NotFoundRadar";

export const metadata: Metadata = {
  title: { absolute: "Page not found — Invisiko" },
  description: "That page isn't here. Find your way back to Invisiko.",
  robots: { index: false, follow: true },
};

const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

/** Laid out like the tiles on the app's dashboard: one tap to anywhere that matters. */
const destinations: { href: string; label: string; body: string; Icon: IconType }[] = [
  { href: "/", label: "Home", body: "The back of house, on one phone", Icon: IoHomeOutline },
  { href: "/features", label: "Features", body: "Everything Invisiko does today", Icon: IoGridOutline },
  { href: "/how-it-works", label: "How it works", body: "What setting it up involves", Icon: IoMapOutline },
  { href: "/faq", label: "FAQ", body: "Including the awkward questions", Icon: IoHelpCircleOutline },
  { href: "/contact", label: "Contact", body: "Request access or talk to us", Icon: IoChatbubblesOutline },
  { href: "/support", label: "Support", body: "Help with the app", Icon: IoHelpBuoyOutline },
];

/**
 * Any unknown URL lands here, inside the normal header and footer. It borrows the app's check-in
 * refusal: the same message, the same radius, with the page you wanted just out of range.
 */
export default function NotFound() {
  return (
    <section aria-labelledby="not-found-title" className="tone-dark relative overflow-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_50%_at_76%_38%,rgba(254,154,2,0.12),transparent_70%)]"
      />
      <Container className="relative pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div>
            <div className="hero-rise" style={rise(0)}>
              <Eyebrow>Error 404 · Page not found</Eyebrow>
            </div>
            <h1
              id="not-found-title"
              className="mt-5 text-balance text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[3rem] lg:text-[3.5rem]"
            >
              <SplitWords text="This page is outside the radius." />
            </h1>

            {/* The app's refusal message, as staff would see it. */}
            <p
              className="hero-rise mt-6 max-w-[34rem] rounded-2xl border border-amber/50 bg-amber/10 p-4 text-[1.0625rem] font-semibold leading-snug"
              style={rise(360)}
            >
              You are 404m from this page, outside the 100m check-in radius.
            </p>
            <p className="hero-rise mt-4 max-w-[34rem] text-lg text-muted" style={rise(440)}>
              The link may be wrong, or the page may have moved. Nothing is lost: pick up from one of the places below.
            </p>

            <div className="hero-rise mt-8 flex flex-col gap-3 sm:flex-row" style={rise(520)}>
              <ButtonLink href="/" block>
                Go to the home page
              </ButtonLink>
              <GoBackButton>
                <IoArrowBack aria-hidden="true" className="size-4" />
                Go back
              </GoBackButton>
            </div>
          </div>

          <div className="hero-rise order-first lg:order-none" style={rise(200)}>
            <div className="mx-auto max-w-[15rem] sm:max-w-[20rem] lg:max-w-none">
              <NotFoundRadar />
            </div>
          </div>
        </div>

        <nav aria-labelledby="not-found-nav" className="mt-14 lg:mt-20">
          <h2 id="not-found-nav" className="label-caps text-muted">
            Where were you heading?
          </h2>
          <ul className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-3">
            {destinations.map(({ href, label, body, Icon }, index) => (
              <li key={href} className="hero-rise" style={rise(600 + index * 60)}>
                <Link
                  href={href}
                  className="group lift flex h-full items-start gap-3 rounded-2xl border border-line bg-surface p-4 hover:border-line-strong sm:gap-4 sm:p-5"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-surface-raised text-accent-text">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold">{label}</span>
                    <span className="mt-0.5 block text-sm leading-snug text-muted">{body}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
