"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { primaryCta, primaryNav } from "@/content/site";
import { Logo } from "./Logo";

const SCROLL_THRESHOLD = 80; // §9.1 F: sticky header gains a background after 80px.

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Close the panel whenever the route changes (adjusting state during render, not in an effect).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // While the panel is open: lock page scroll, move focus in, trap Tab, close on Escape.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <header
      className={`tone-dark fixed inset-x-0 top-0 z-40 border-b transition-colors duration-200 motion-reduce:transition-none ${
        // backdrop-filter would make the header the containing block for the fixed menu panel,
        // so it is dropped while the panel is open.
        open
          ? "border-line bg-[#0B0B0D]"
          : scrolled
            ? "border-line bg-[#0B0B0D]/90 backdrop-blur-md"
            : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] w-full max-w-[1200px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isCurrent(pathname, link.href) ? "page" : undefined}
                  className="nav-underline label-caps inline-flex min-h-11 items-center text-muted transition-colors duration-200 hover:text-fg aria-[current=page]:text-fg"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={primaryCta.href}
            className="press hidden min-h-11 items-center rounded-full bg-amber px-5 text-[0.9375rem] font-semibold text-ink transition-colors duration-200 hover:bg-amber-hover sm:inline-flex"
          >
            {primaryCta.label}
          </Link>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
            className="press grid size-11 place-items-center rounded-full border border-line-strong md:hidden"
          >
            <IoMenu aria-hidden="true" className="size-5" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>

      {/* Reading progress, driven by scroll (CSS only; hidden where scroll timelines are unsupported). */}
      <span aria-hidden="true" className="scroll-progress absolute inset-x-0 bottom-0 h-0.5 bg-amber" />

      {open ? (
        <div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="tone-dark sheet-in fixed inset-0 z-50 flex flex-col md:hidden"
        >
          <div className="flex h-[4.5rem] items-center justify-between border-b border-line px-4 sm:px-6">
            <Logo />
            <button
              type="button"
              onClick={() => close()}
              className="grid size-11 place-items-center rounded-full border border-line-strong"
            >
              <IoClose aria-hidden="true" className="size-5" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <nav aria-label="Main" className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <ul className="divide-y divide-line">
              {primaryNav.map((link, index) => (
                <li key={link.href} className="menu-item" style={{ "--stagger": index } as CSSProperties}>
                  <Link
                    href={link.href}
                    aria-current={isCurrent(pathname, link.href) ? "page" : undefined}
                    onClick={() => close(false)}
                    className="flex min-h-16 items-center text-2xl font-semibold tracking-[-0.01em] aria-[current=page]:text-accent-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {/* CTA pinned to the bottom, within thumb reach (§9 shared shell). */}
          <div className="border-t border-line px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
            <Link
              href={primaryCta.href}
              onClick={() => close(false)}
              className="press flex min-h-14 w-full items-center justify-center rounded-full bg-amber text-lg font-semibold text-ink"
            >
              {primaryCta.label}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
