import type { CSSProperties } from "react";
import { goodFit, limitations } from "@/content/features";
import { ButtonLink } from "./Button";

/**
 * The honesty block (§9.1 section 6, §9.2 Limitations). Muted, no icons, and load-bearing: saying
 * the limitation first is part of the conversion strategy. Do not delete.
 *
 * Each limitation is paired with the objection it answers, and a "Made for" panel says the same
 * facts the other way round, so a visitor can tell in one screen whether it suits their kitchen.
 * `short` (Home) leads each card with the short line; `full` (Features) with the fuller sentence.
 */
export function Limitations({ variant = "short", headingId }: { variant?: "short" | "full"; headingId: string }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
      <div className="flex flex-col">
        <div data-reveal>
          <h2 id={headingId} className="text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[2.25rem]">
            What it isn&apos;t.
          </h2>
          <p className="mt-4 max-w-[30rem] text-lg text-muted">
            Better you hear it from us now than find out in week two.
          </p>
        </div>

        <div className="lift mt-8 rounded-2xl border border-line bg-surface p-6" data-reveal style={stagger(1)}>
          <h3 className="label-caps text-muted">Made for</h3>
          <ul className="mt-4 space-y-3">
            {goodFit.map((item) => (
              <li key={item} className="flex gap-3 font-medium">
                <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-fg/60" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6" data-reveal style={stagger(2)}>
          <ButtonLink href="/faq" variant="text" arrow>
            More awkward questions
          </ButtonLink>
        </div>
      </div>

      <ol className="grid content-center gap-4">
        {limitations.map((item, index) => (
          <li
            key={item.short}
            className="lift rounded-2xl border border-line bg-surface p-6 sm:p-7"
            data-reveal
            style={stagger(index)}
          >
            <span className="label-caps text-muted">{item.question}</span>
            <span className="mt-3 block text-lg font-semibold leading-snug text-fg">
              {variant === "short" ? item.short : item.full}
            </span>
            <span className="mt-2 block text-muted">{item.answer}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

const stagger = (n: number) => ({ "--stagger": n }) as CSSProperties;
