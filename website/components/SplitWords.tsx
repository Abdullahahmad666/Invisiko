import { Fragment, type CSSProperties } from "react";

/**
 * A headline whose words rise in one after another on load. Assistive technology reads the plain
 * sentence; the animated copy is hidden from it, so nothing is announced word by word.
 * Pure CSS — no JavaScript — and still under reduced motion.
 */
export function SplitWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="word-rise">
        {words.map((word, index) => (
          <Fragment key={index}>
            <span className="word" style={{ "--w": index } as CSSProperties}>
              {word}
            </span>
            {index < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </>
  );
}
