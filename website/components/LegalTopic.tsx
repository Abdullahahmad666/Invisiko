import type { ReactNode } from "react";

/**
 * One numbered section of a legal page. The heading id is what the contents sidebar and the section
 * bar link to; `data-toc-block` lets them track the whole block as the reader moves through it.
 */
export function LegalTopic({ id, number, title, children }: { id: string; number: number; title: string; children: ReactNode }) {
  return (
    <div data-toc-block className="border-t border-line py-12 first:border-t-0 first:pt-0 sm:py-14">
      <p className="label-caps tabular-nums text-accent-text">{String(number).padStart(2, "0")}</p>
      <h2 id={id} className="mt-2 text-2xl font-semibold tracking-[-0.01em] sm:text-[1.75rem]">
        {title}
      </h2>
      <div className="mt-5 max-w-[68ch] space-y-4 text-[1.0625rem] text-muted">{children}</div>
    </div>
  );
}

/** Bulleted list styled for legal prose. */
export function LegalList({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-2 pl-5 marker:text-accent-text">{children}</ul>;
}
