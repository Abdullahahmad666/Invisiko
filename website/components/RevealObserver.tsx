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
 * content can start hidden without a flash. (Only browsers without CSS scroll timelines use this
 * path; the rest reveal with pure CSS.)
 *
 * Safety nets so nothing stays hidden: the mark is removed if any script fails to load, or if the
 * app has still not taken over after 12 seconds. (An earlier 3-second limit fired on slow phones
 * and on the dev server, silently switching every reveal off.)
 */
export const revealBootScript = `(function(){var d=document.documentElement;d.classList.add('js');function off(){if(!window.__revealReady)d.classList.remove('js')}window.addEventListener('error',function(e){var t=e.target;if(t&&t.tagName==='SCRIPT')off()},true);setTimeout(off,12000)})();`;

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
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );

    pending.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
