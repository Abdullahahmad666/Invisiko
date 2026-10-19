"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    __revealReady?: boolean;
  }
}

/**
 * Inline, render-blocking: marks the document as JS-capable before first paint so revealable
 * content can start hidden without a flash. If the app bundle has not taken over within three
 * seconds (failed or blocked script), it removes the mark again so nothing stays hidden.
 */
export const revealBootScript = `document.documentElement.classList.add('js');setTimeout(function(){if(!window.__revealReady){document.documentElement.classList.remove('js')}},3000);`;

/**
 * Scroll-reveal for `[data-reveal]` elements: a 200ms fade-up on entry, once (§9.1 F).
 * CSS only animates under `prefers-reduced-motion: no-preference`; this just toggles a class.
 * Re-scans on every client-side navigation so new pages are observed too.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    window.__revealReady = true;
    const pending = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"));

    if (typeof IntersectionObserver === "undefined") {
      pending.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    pending.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
