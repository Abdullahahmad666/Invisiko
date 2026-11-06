"use client";

import { useEffect, useState } from "react";
import { IoArrowUp } from "react-icons/io5";

/**
 * Appears once a visitor is well down a long page, within thumb reach. Returns to the top and
 * moves keyboard focus to the start of the content, so focus is not left behind.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 1.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      className="tone-dark press menu-pop fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 grid size-12 place-items-center rounded-full border border-line-strong bg-[#1A1A1D] shadow-lg hover:border-fg sm:right-6 sm:bottom-6"
    >
      <IoArrowUp aria-hidden="true" className="size-5 text-amber" />
      <span className="sr-only">Back to top</span>
    </button>
  );
}
