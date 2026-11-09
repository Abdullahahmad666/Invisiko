import type { CSSProperties } from "react";

export type HeroCard = { q: string; a: string };

const offsets = ["lg:ml-0", "lg:ml-[18%]", "lg:ml-[6%]", "lg:ml-[22%]"];
const tilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

/**
 * A hero visual for pages without a phone: the questions people arrive with, floating, each with
 * the short answer the page goes on to give. Decorative — the full answers follow — so it is hidden
 * from assistive technology, and from phones, where the real content should come first.
 */
export function HeroCards({ cards, label = "Question" }: { cards: HeroCard[]; label?: string }) {
  return (
    <div aria-hidden="true" className="hero-exit-phone relative isolate hidden lg:block">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_55%_50%,rgba(254,154,2,0.14),transparent_70%)]" />
      <ul className="space-y-4">
        {cards.map((card, index) => (
          <li
            key={card.q}
            className={`hero-rise ${offsets[index % offsets.length]}`}
            style={{ "--rise-delay": `${380 + index * 140}ms` } as CSSProperties}
          >
            <div
              className={`card-float w-full max-w-[22rem] rounded-2xl border border-line bg-surface p-5 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.9)] ${tilts[index % tilts.length]}`}
              style={{ "--float-delay": `${index * -1.6}s` } as CSSProperties}
            >
              <p className="label-caps text-muted">{label}</p>
              <p className="mt-2 text-lg font-semibold leading-snug">{card.q}</p>
              <p className="mt-3 inline-flex rounded-full bg-amber px-3 py-1 text-sm font-semibold text-ink">{card.a}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
