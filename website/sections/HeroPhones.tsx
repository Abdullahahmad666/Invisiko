import type { CSSProperties } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";

const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

/**
 * The homepage hero: the Checks dashboard in front, Invoice review behind, so the promise of the
 * whole back of house shows records and money rather than one job.
 *
 * From 1024px only. Below that a second phone would be too small to read, so just the front one
 * shows; the back image is lazy and hidden, so phones never download it.
 */
export function HeroPhones() {
  return (
    <div className="hero-exit-phone relative mx-auto w-full lg:max-w-[460px]">
      {/* Behind: dimmed so the front phone leads, and drifting at its own pace on scroll. */}
      <div className="hero-phone-back absolute top-[7%] right-0 hidden w-[56%] rotate-3 brightness-[0.82] lg:block">
        <div className="hero-rise" style={rise(520)}>
          <PhoneFrame screenshot="invoiceReview" sizes="260px" className="lg:max-w-none" />
        </div>
      </div>

      <div className="hero-rise relative z-10 lg:w-[62%]" style={rise(360)}>
        <PhoneFrame
          screenshot="checksDashboard"
          priority
          float
          sizes="(min-width: 1024px) 290px, 70vw"
          className="lg:max-w-none"
        />
      </div>
    </div>
  );
}
