"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { IoAdd } from "react-icons/io5";
import type { FaqItem } from "@/content/faq";

type FaqAccordionProps = {
  items: FaqItem[];
  /** Heading level of each question; h3 under a section h2. */
  headingLevel?: "h3" | "h4";
};

/**
 * Accordion built as `<button aria-expanded>` controlling a labelled region (§9.1 H).
 * Native buttons make it keyboard-operable with Enter and Space; answers stay in the HTML
 * so they are readable by crawlers and match the FAQPage structured data.
 */
export function FaqAccordion({ items, headingLevel = "h3" }: FaqAccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<Set<string>>(() => new Set());
  const Heading = headingLevel;

  function toggle(id: string) {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => {
        const isOpen = open.has(item.id);
        const buttonId = `${baseId}-${item.id}-q`;
        const panelId = `${baseId}-${item.id}-a`;
        return (
          <div key={item.id}>
            <Heading className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left text-lg font-semibold leading-snug tracking-[-0.01em] hover:text-accent-text"
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className={`grid size-8 shrink-0 place-items-center rounded-full border border-line-strong transition-transform duration-200 motion-reduce:transition-none ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  <IoAdd className="size-4" />
                </span>
              </button>
            </Heading>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen} className="faq-panel pb-6">
              <div className="max-w-[44rem] space-y-3 text-muted">
                {item.answer.map((paragraph, index) => (
                  <p key={index} className={index === 0 ? "text-fg" : undefined}>
                    {paragraph}
                  </p>
                ))}
                {item.link ? (
                  <p>
                    <Link href={item.link.href} className="font-semibold text-accent-text underline underline-offset-4">
                      {item.link.label}
                    </Link>
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
