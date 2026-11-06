"use client";

import { useState, type ReactNode } from "react";
import type { ScreenshotId } from "@/content/screenshots";
import { PhoneFrame, PhoneScreen, PhoneShell } from "./PhoneFrame";
import { StepList, type Step } from "./StepList";

export type ShowcaseStep = Step & { screenshot: ScreenshotId };

type StepShowcaseProps = {
  /** Every step needs its own screen: the phone changing is what shows the story moving on. */
  steps: ShowcaseStep[];
  /** The section heading, shown above the steps. */
  children: ReactNode;
  /** The label beside the progress bar, e.g. "Step". */
  unit?: string;
};

/**
 * Steps beside a phone that stays put from 1024px. As each step reaches the middle of the screen,
 * its own screen slides in: earlier screens leave upwards and later ones wait below, so the motion
 * follows the direction of the scroll, in reverse too. Below 1024px each step carries its own phone.
 */
export function StepShowcase({ steps, children, unit = "Step" }: StepShowcaseProps) {
  const [active, setActive] = useState(0);

  const listed = steps.map((step) => ({
    title: step.title,
    body: (
      <>
        {step.body}
        <PhoneFrame
          screenshot={step.screenshot}
          sizes="240px"
          className="mt-6 max-w-[220px] sm:max-w-[240px] lg:hidden"
        />
      </>
    ),
  }));

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
      {/* Top offset clears the header and the "On this page" bar. */}
      <div className="hidden lg:sticky lg:top-36 lg:block lg:self-start">
        {/* Sized from the viewport height, so the phone and its progress stay visible on a laptop. */}
        <figure className="sd-phone mx-auto w-full max-w-[min(300px,calc((100svh-14.5rem)*0.44))]">
          <PhoneShell>
            {steps.map((step, index) => (
              <div
                key={step.title}
                data-screen={index}
                className={`absolute inset-0 transition-[opacity,translate,scale] duration-500 ease-out motion-reduce:transition-none ${
                  index === active
                    ? "translate-y-0 scale-100 opacity-100"
                    : index < active
                      ? "-translate-y-12 scale-[0.96] opacity-0"
                      : "translate-y-12 scale-[0.96] opacity-0"
                }`}
              >
                <PhoneScreen screenshot={step.screenshot} decorative={index !== active} sizes="300px" />
              </div>
            ))}
          </PhoneShell>
          <figcaption aria-hidden="true" className="mt-4 flex items-center gap-3">
            <span className="label-caps shrink-0 text-muted tabular-nums">
              {unit} {active + 1} of {steps.length}
            </span>
            <span className="flex flex-1 gap-1">
              {steps.map((step, index) => (
                <span
                  key={step.title}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 motion-reduce:transition-none ${
                    index <= active ? "bg-amber" : "bg-line"
                  }`}
                />
              ))}
            </span>
          </figcaption>
        </figure>
      </div>
      <div>
        {children}
        {/* The extra room lets the last step reach the middle while the phone is still pinned. */}
        <div className="mt-8 lg:mt-10 lg:pb-[14vh]">
          <StepList steps={listed} highlight tall onActiveChange={setActive} />
        </div>
      </div>
    </div>
  );
}
