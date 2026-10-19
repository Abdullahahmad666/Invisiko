"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type Step = { title: string; body: ReactNode };

type StepListProps = {
  steps: Step[];
  /**
   * Highlight the step nearest the middle of the viewport and fill an amber track beside the
   * numbers as the visitor scrolls. Purely presentational: without JavaScript, or with
   * reduced motion, every step simply reads at full strength.
   */
  highlight?: boolean;
  /** Give each step generous height on desktop so a sticky heading beside it has room to travel. */
  tall?: boolean;
  start?: number;
};

/** Numbered steps (§9 reusable components). Semantic `<ol>`; numbers are decorative. */
export function StepList({ steps, highlight = false, tall = false, start = 1 }: StepListProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (!highlight || !listRef.current || typeof IntersectionObserver === "undefined") return;
    const items = Array.from(listRef.current.querySelectorAll<HTMLLIElement>("[data-step]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [highlight]);

  const progress = active === null ? 1 : (active + 1) / steps.length;

  return (
    <ol ref={listRef} start={start} className="steps-timeline relative">
      {highlight ? (
        <span aria-hidden="true" className="absolute top-2 bottom-2 left-[1.1875rem] w-px bg-line">
          <span
            // Scroll-driven where supported (.steps-fill overrides this inline transform); step-based otherwise.
            className="steps-fill block w-full origin-top bg-amber transition-transform duration-200 ease-out motion-reduce:transition-none"
            style={{ height: "100%", transform: `scaleY(${progress})` }}
          />
        </span>
      ) : null}
      {steps.map((step, index) => {
        const dimmed = highlight && active !== null && index !== active;
        const current = highlight && active === index;
        return (
          <li
            key={step.title}
            data-step={index}
            className={`step-item relative flex gap-5 ${tall ? "py-6 lg:min-h-[34vh] lg:py-10" : "py-5"} ${
              !highlight && index > 0 ? "border-t border-line" : ""
            }`}
          >
            <span
              aria-hidden="true"
              className={`relative z-10 grid size-10 shrink-0 place-items-center rounded-full border text-sm font-semibold tabular-nums transition-all duration-300 motion-reduce:transition-none ${
                dimmed ? "border-line bg-bg text-muted" : "border-amber bg-amber text-ink"
              } ${current ? "scale-110 shadow-[0_0_0_7px_rgba(254,154,2,0.18)]" : ""}`}
            >
              {start + index}
            </span>
            <div className="pt-1.5">
              <h3
                className={`text-xl font-semibold leading-snug tracking-[-0.01em] transition-colors duration-200 motion-reduce:transition-none sm:text-2xl ${
                  dimmed ? "text-muted" : "text-fg"
                }`}
              >
                {step.title}
              </h3>
              <div className="mt-2 max-w-[38rem] text-muted">{step.body}</div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
