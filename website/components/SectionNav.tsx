"use client";

import { useEffect, useRef, useState } from "react";

export type SectionNavItem = { id: string; label: string };

/**
 * "On this page": a sticky bar under the header on long pages, so a visitor can always see which
 * section they are in and jump to any other. `id` is a section's heading (or block) id. The bar is
 * plain anchor links, so it works without JavaScript; the highlight is the only scripted part.
 */
export function SectionNav({ items }: { items: SectionNavItem[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    // Watch each item's section; when several items share one section (a long policy, say), watch
    // their headings instead so the highlight still moves.
    const targets = items.map((item) => ({ id: item.id, target: document.getElementById(item.id) }));
    const sectionOf = (el: HTMLElement | null) => el?.closest("section") ?? el;
    const owners = new Map<Element, string>();
    for (const { id, target } of targets) {
      const section = sectionOf(target);
      if (!target || !section) continue;
      const shared = targets.filter((other) => sectionOf(other.target) === section).length > 1;
      owners.set(shared ? target : section, id);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = owners.get(entry.target);
          if (entry.isIntersecting && id) setActive(id);
        }
      },
      // A thin band across the upper-middle of the screen: whichever section crosses it is current.
      { rootMargin: "-30% 0px -60% 0px" },
    );
    owners.forEach((_, section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  // Keep the current chip in view when the bar overflows on a phone.
  useEffect(() => {
    const list = listRef.current;
    const chip = list?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!list || !chip || list.scrollWidth <= list.clientWidth) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left: chip.offsetLeft - 16, behavior: reduce ? "auto" : "smooth" });
  }, [active]);

  return (
    <nav
      aria-label="On this page"
      className="tone-dark sticky top-[4.5rem] z-30 border-y border-line bg-[#0B0B0D]/95 backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center gap-5 lg:px-8">
        <p className="label-caps hidden shrink-0 text-muted lg:block">On this page</p>
        <ul
          ref={listRef}
          className="relative flex gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none] sm:px-6 lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "location" : undefined}
                className="inline-flex min-h-10 items-center rounded-full px-3.5 text-sm font-semibold whitespace-nowrap text-muted transition-colors duration-200 hover:text-fg aria-[current=location]:bg-amber aria-[current=location]:text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
