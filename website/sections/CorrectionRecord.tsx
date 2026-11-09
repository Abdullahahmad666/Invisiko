import type { CSSProperties } from "react";

const row = (n: number) => ({ "--stagger": n }) as CSSProperties;

/**
 * One attendance record after a correction, drawn with demo data (the same people as the demo
 * screens). It shows the two verified behaviours side by side: a manager's fix stays marked as a
 * manual override, and the staff member's own note sits on the same record.
 */
export function CorrectionRecord() {
  return (
    <figure className="lift rounded-2xl border border-line bg-surface p-5 shadow-[0_24px_50px_-34px_rgba(0,0,0,0.35)] sm:p-6" data-reveal>
      <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <p className="font-semibold">Priya Shah</p>
          <p className="text-sm text-muted">Chef · Tuesday 11 November</p>
        </div>
        <span className="rounded-full border border-line px-2.5 py-1 text-xs font-semibold text-muted">Closed</span>
      </div>

      <ol className="mt-4 space-y-3">
        <li className="sd-row flex items-start gap-3" style={row(0)}>
          <span aria-hidden="true" className="mt-1.5 size-2.5 shrink-0 rounded-full bg-[#1F9D55]" />
          <div className="min-w-0 flex-1">
            <p className="flex justify-between gap-3 font-medium">
              Checked in <span className="tabular-nums">09:02</span>
            </p>
            <p className="text-sm text-muted">Scanned at the door, inside the radius</p>
          </div>
        </li>
        <li className="sd-row flex items-start gap-3" style={row(1)}>
          <span aria-hidden="true" className="mt-1.5 size-2.5 shrink-0 rounded-full bg-amber" />
          <div className="min-w-0 flex-1">
            <p className="flex justify-between gap-3 font-medium">
              Checked out <span className="tabular-nums">17:30</span>
            </p>
            <p className="mt-1 inline-flex rounded-full bg-amber/15 px-2.5 py-0.5 text-xs font-semibold text-accent-text">
              Manual override · corrected by a manager
            </p>
          </div>
        </li>
        <li className="sd-row flex items-start gap-3" style={row(2)}>
          <span aria-hidden="true" className="mt-1.5 size-2.5 shrink-0 rounded-full border border-line-strong" />
          <div className="min-w-0 flex-1">
            <p className="font-medium">Note from Priya</p>
            <p className="text-sm text-muted">&ldquo;Phone died at close, so I couldn&apos;t scan out.&rdquo;</p>
          </div>
        </li>
      </ol>

      <figcaption className="mt-5 border-t border-line pt-3 text-xs text-muted">Illustration with demo data.</figcaption>
    </figure>
  );
}
