"use client";

import { useActiveSection, type SectionNavItem } from "./SectionNav";

/**
 * A sticky contents list for long legal pages, from 1024px. Numbered to match the sections, with
 * the current one marked by an amber rule. Plain anchor links, so it works without JavaScript.
 */
export function LegalToc({
  items,
  updated,
  updatedLabel = "Last updated",
}: {
  items: SectionNavItem[];
  updated: string;
  updatedLabel?: string;
}) {
  const active = useActiveSection(items);

  return (
    <nav aria-label="Policy contents" className="sticky top-28 hidden self-start lg:block">
      <p className="label-caps text-muted">Contents</p>
      <ol className="mt-4 border-l border-line">
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              className="-ml-px flex min-h-10 items-center gap-3 border-l-2 border-transparent py-1.5 pl-4 text-[0.9375rem] text-muted transition-colors duration-200 hover:text-fg aria-[current=location]:border-amber aria-[current=location]:font-semibold aria-[current=location]:text-fg"
            >
              <span className="label-caps w-5 shrink-0 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
      <p className="mt-8 text-sm text-muted">
        {updatedLabel} {updated}
      </p>
    </nav>
  );
}
