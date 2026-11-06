"use client";

import { useState, type ReactNode } from "react";
import type { ScreenshotId } from "@/content/screenshots";
import { PhoneFrame, PhoneScreen, PhoneShell } from "./PhoneFrame";
import { StepList, type Step } from "./StepList";

export type ShowcaseStep = Step & { screenshot: ScreenshotId };

type StepShowcaseProps = {
  steps: ShowcaseStep[];
  /** The section heading, shown above the steps. */
  children: ReactNode;
};

/**
 * Steps beside a phone that stays put from 1024px: the screen changes to match the step in view,
 * so reading the steps walks through the app. On smaller screens each step carries its own phone.
 */
export function StepShowcase({ steps, children }: StepShowcaseProps) {
  const [active, setActive] = useState(0);
  const screens = [...new Set(steps.map((step) => step.screenshot))];
  const current = steps[active]?.screenshot ?? steps[0].screenshot;

  const listed = steps.map((step) => ({
    title: step.title,
    body: (
      <>
        {step.body}
        <PhoneFrame
          screenshot={step.screenshot}
          sizes="220px"
          className="mt-6 max-w-[220px] sm:max-w-[240px] lg:hidden"
        />
      </>
    ),
  }));

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
      <div className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
        {/* Sized from the viewport height, so the whole phone stays visible on a laptop. */}
        <figure className="sd-phone mx-auto w-full max-w-[min(300px,calc((100svh-9rem)*0.44))]">
          <PhoneShell>
            {screens.map((screenshot) => (
              <div
                key={screenshot}
                className={`absolute inset-0 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
                  screenshot === current ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                }`}
              >
                <PhoneScreen screenshot={screenshot} decorative={screenshot !== current} priority={false} sizes="300px" />
              </div>
            ))}
          </PhoneShell>
        </figure>
      </div>
      <div>
        {children}
        <div className="mt-8 lg:mt-10">
          <StepList steps={listed} highlight tall onActiveChange={setActive} />
        </div>
      </div>
    </div>
  );
}
