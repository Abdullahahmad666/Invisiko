import { HeroCards } from "./HeroCards";

/** The FAQ hero: the awkward questions, each with the short honest answer the page gives. */
export function FaqHeroCards() {
  return (
    <HeroCards
      cards={[
        { q: "Is it a till or ordering system?", a: "No." },
        { q: "Does it work offline?", a: "Not today." },
        { q: "Who can see our certificates?", a: "Managers only." },
        { q: "What if the scan misreads a line?", a: "You fix it before Confirm." },
      ]}
    />
  );
}
