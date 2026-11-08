import type { CSSProperties } from "react";

/**
 * The FAQ hero: the awkward questions, floating, each with the short honest answer the page gives.
 * Decorative — the full questions and answers follow — so it is hidden from assistive technology,
 * and from phones, where the real list should come first.
 */
const cards = [
  { q: "Is it a till or ordering system?", a: "No.", offset: "lg:ml-0", tilt: "-rotate-2" },
  { q: "Does it work offline?", a: "Not today.", offset: "lg:ml-[18%]", tilt: "rotate-1" },
  { q: "Who can see our certificates?", a: "Managers only.", offset: "lg:ml-[6%]", tilt: "-rotate-1" },
  { q: "What if the scan misreads a line?", a: "You fix it before Confirm.", offset: "lg:ml-[22%]", tilt: "rotate-2" },
];

export function FaqHeroCards() {
  return (
    <div aria-hidden="true" className="hero-exit-phone relative isolate hidden lg:block">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_55%_50%,rgba(254,154,2,0.14),transparent_70%)]" />
      <ul className="space-y-4">
        {cards.map((card, index) => (
          <li
            key={card.q}
            className={`hero-rise ${card.offset}`}
            style={{ "--rise-delay": `${380 + index * 140}ms` } as CSSProperties}
          >
            <div
              className={`card-float w-full max-w-[22rem] rounded-2xl border border-line bg-surface p-5 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.9)] ${card.tilt}`}
              style={{ "--float-delay": `${index * -1.6}s` } as CSSProperties}
            >
              <p className="label-caps text-muted">Question</p>
              <p className="mt-2 text-lg font-semibold leading-snug">{card.q}</p>
              <p className="mt-3 inline-flex rounded-full bg-amber px-3 py-1 text-sm font-semibold text-ink">{card.a}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
