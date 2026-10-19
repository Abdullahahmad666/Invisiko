import { limitations } from "@/content/features";

/**
 * The honesty block (§9.1 section 6). Muted, small, no icons — and load-bearing:
 * saying the limitation first is part of the conversion strategy. Do not delete.
 */
export function Limitations({ variant = "short", headingId }: { variant?: "short" | "full"; headingId: string }) {
  if (variant === "short") {
    return (
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12" data-reveal>
        <h2 id={headingId} className="text-2xl font-semibold tracking-[-0.01em]">
          What it isn&apos;t.
        </h2>
        <ul className="divide-y divide-line border-y border-line text-muted">
          {limitations.map((item) => (
            <li key={item.short} className="py-3.5">
              {item.short}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div data-reveal>
      <h2 id={headingId} className="text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[2.25rem]">
        What it isn&apos;t
      </h2>
      <p className="mt-4 max-w-[40rem] text-lg text-muted">
        Better you hear it from us now than find out in week two.
      </p>
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {limitations.map((item) => (
          <li key={item.short} className="rounded-2xl border border-line bg-surface p-6 text-muted">
            <span className="block font-semibold text-fg">{item.short}</span>
            <span className="mt-2 block">{item.full}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
