import type { CSSProperties } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import type { ScreenshotId } from "@/content/screenshots";

const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

const chip =
  "chip-pop label-caps absolute z-20 hidden items-center rounded-full border px-3 py-1.5 shadow-lg lg:inline-flex";

type PhonePairProps = {
  front: ScreenshotId;
  back: ScreenshotId;
  /** Optional role labels pinned to each phone, e.g. Manager and Staff. Desktop only. */
  labels?: { front: string; back: string };
};

/**
 * Two phones for a hero: the main screen in front, a second one tilted behind it that slides out
 * on load and drifts on scroll.
 *
 * From 1024px only. Below that a second phone would be too small to read, so just the front one
 * shows; the back image is lazy and hidden, so phones never download it.
 */
export function PhonePair({ front, back, labels }: PhonePairProps) {
  return (
    <div className="hero-exit-phone relative mx-auto w-full lg:max-w-[460px]">
      <div className="hero-phone-back absolute top-[7%] right-0 hidden w-[56%] rotate-3 lg:block">
        <div className="pair-back-in relative">
          <div className="brightness-[0.82]">
            <PhoneFrame screenshot={back} sizes="260px" className="lg:max-w-none" />
          </div>
          {labels ? (
            <span aria-hidden="true" className={`${chip} -top-3 right-6 border-line-strong bg-[#1A1A1D] text-muted`}>
              {labels.back}
            </span>
          ) : null}
        </div>
      </div>

      <div className="hero-rise relative z-10 lg:w-[62%]" style={rise(360)}>
        <PhoneFrame
          screenshot={front}
          priority
          float
          sizes="(min-width: 1024px) 290px, 70vw"
          className="lg:max-w-none"
        />
        {labels ? (
          <span aria-hidden="true" className={`${chip} -bottom-3 left-8 border-amber bg-amber text-ink`}>
            {labels.front}
          </span>
        ) : null}
      </div>
    </div>
  );
}

/** The homepage hero: records and money, rather than one job. */
export function HeroPhones() {
  return <PhonePair front="checksDashboard" back="invoiceReview" />;
}

/**
 * Three phones fanned out, for the features overview: attendance, checks and invoices at once.
 * The side phones open out from behind the centre one on load and spread further on scroll.
 * From 1024px only; phones see the centre screen alone.
 */
export function PhoneFan({ left, center, right }: { left: ScreenshotId; center: ScreenshotId; right: ScreenshotId }) {
  return (
    <div className="hero-exit-phone relative mx-auto w-full lg:max-w-[540px]">
      <div className="hero-fan-left absolute top-[13%] left-0 hidden w-[44%] -rotate-6 lg:block">
        <div className="fan-in-left brightness-[0.8]">
          <PhoneFrame screenshot={left} sizes="240px" className="lg:max-w-none" />
        </div>
      </div>
      <div className="hero-fan-right absolute top-[13%] right-0 hidden w-[44%] rotate-6 lg:block">
        <div className="fan-in-right brightness-[0.8]">
          <PhoneFrame screenshot={right} sizes="240px" className="lg:max-w-none" />
        </div>
      </div>
      <div className="hero-rise relative z-10 mx-auto lg:w-[52%]" style={rise(360)}>
        <PhoneFrame
          screenshot={center}
          priority
          float
          sizes="(min-width: 1024px) 280px, 70vw"
          className="lg:max-w-none"
        />
      </div>
    </div>
  );
}
