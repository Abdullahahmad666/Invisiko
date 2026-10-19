import type { CSSProperties, ReactNode } from "react";
import { IoArrowUp, IoCheckmark, IoScanOutline } from "react-icons/io5";

/**
 * Home §9.1 section 4: photograph → what it read → stock and spend updated.
 *
 * These are schematic illustrations, not screenshots: bars stand in for text, and no figure,
 * product or supplier is shown, so nothing here can be mistaken for a real screen (§10).
 */

function Bar({ w, tone = "muted" }: { w: string; tone?: "muted" | "strong" }) {
  return (
    <span
      className={`block h-2 rounded-full ${tone === "strong" ? "bg-fg/70" : "bg-fg/20"}`}
      style={{ width: w }}
    />
  );
}

function Panel({ children }: { children: ReactNode }) {
  return (
    <div aria-hidden="true" className="relative flex h-52 items-center justify-center overflow-clip rounded-xl border border-line bg-surface-raised p-5">
      {children}
    </div>
  );
}

const steps: { title: string; body: string; visual: ReactNode }[] = [
  {
    title: "Photograph it",
    body: "Take a photo of the delivery note, choose one from the gallery, or upload the supplier's PDF.",
    visual: (
      <Panel>
        <div className="sd-note relative w-36 rotate-[-3deg] rounded-md bg-[#F7F7F8] p-4 shadow-lg">
          <span className="mb-3 block h-2.5 w-16 rounded-full bg-[#0B0B0D]/70" />
          <div className="space-y-2">
            {["100%", "85%", "92%", "70%", "88%"].map((w, i) => (
              <span key={i} className="block h-1.5 rounded-full bg-[#0B0B0D]/20" style={{ width: w }} />
            ))}
          </div>
          <span className="mt-3 ml-auto block h-2 w-10 rounded-full bg-[#0B0B0D]/50" />
        </div>
        {/* Viewfinder corners */}
        <span className="sd-corner absolute top-6 left-10 size-6 border-t-2 border-l-2 border-amber" />
        <span className="sd-corner absolute top-6 right-10 size-6 border-t-2 border-r-2 border-amber" />
        <span className="sd-corner absolute bottom-6 left-10 size-6 border-b-2 border-l-2 border-amber" />
        <span className="sd-corner absolute right-10 bottom-6 size-6 border-r-2 border-b-2 border-amber" />
        <IoScanOutline className="absolute right-3 bottom-3 size-5 text-muted" />
      </Panel>
    ),
  },
  {
    title: "Check what it read",
    body: "Each line is matched to something you already buy. A line that can't be matched waits for you to match it.",
    visual: (
      <Panel>
        <div className="w-full max-w-56 space-y-2.5">
          {[
            { w: "70%", ok: true },
            { w: "55%", ok: true },
            { w: "62%", ok: false },
            { w: "48%", ok: true },
          ].map((row, i) => (
            <div
              key={i}
              style={{ "--stagger": i } as CSSProperties}
              className={`sd-row flex items-center gap-3 rounded-lg border px-3 py-2.5 ${
                row.ok ? "border-line bg-surface" : "border-amber bg-amber/10"
              }`}
            >
              <span
                className={`grid size-4 shrink-0 place-items-center rounded-full ${
                  row.ok ? "bg-success text-ink" : "border border-amber"
                }`}
              >
                {row.ok ? <IoCheckmark className="size-3" /> : null}
              </span>
              <Bar w={row.w} tone={row.ok ? "muted" : "strong"} />
            </div>
          ))}
        </div>
      </Panel>
    ),
  },
  {
    title: "Stock and spend, updated",
    body: "Once you press Confirm, quantities move into stock and the spend lands against each product.",
    visual: (
      <Panel>
        <div className="flex h-full w-full max-w-56 items-end justify-between gap-3 pb-1">
          {[38, 52, 46, 64, 58, 82].map((h, i) => (
            <span
              key={i}
              className={`sd-bar block flex-1 rounded-t-md ${i === 5 ? "bg-amber" : "bg-fg/15"}`}
              style={{ height: `${h}%`, "--stagger": i } as CSSProperties}
            />
          ))}
        </div>
        <span className="sd-pop absolute top-4 right-4 grid size-8 place-items-center rounded-full bg-amber text-ink" style={{ "--stagger": 3 } as CSSProperties}>
          <IoArrowUp className="size-4" />
        </span>
      </Panel>
    ),
  },
];

export function InvoiceSteps() {
  return (
    <ol className="grid gap-5 md:grid-cols-3">
      {steps.map((step, index) => (
        <li
          key={step.title}
          data-reveal
          style={{ "--stagger": index } as CSSProperties}
          className="flex flex-col rounded-2xl border border-line bg-surface p-4 sm:p-5"
        >
          {step.visual}
          <div className="px-1 pt-5 pb-1">
            <p className="label-caps text-accent-text">Step {index + 1}</p>
            <h3 className="mt-2 text-xl font-semibold tracking-[-0.01em]">{step.title}</h3>
            <p className="mt-2 text-muted">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
