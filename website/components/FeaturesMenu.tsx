"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoArrowForward, IoChevronDown } from "react-icons/io5";
import { featureNav } from "@/content/site";
import { Icon } from "./Icon";

const HOVER_CLOSE_DELAY = 160;

/**
 * The header's Features menu: a disclosure button revealing the feature pages, so they are one
 * step from anywhere. Keyboard: Enter or Space toggles, Escape closes and returns focus, and
 * tabbing out closes it. Mouse: opens on hover, with a short delay before closing.
 */
export function FeaturesMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openedByHover = useRef(false);

  const inSection = pathname === "/features" || pathname.startsWith("/features/");

  // Close on navigation (adjusting state during render, not in an effect).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }

  return (
    <div
      ref={rootRef}
      className="relative"
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        cancelClose();
        if (!open) openedByHover.current = true;
        setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse") return;
        closeTimer.current = setTimeout(() => setOpen(false), HOVER_CLOSE_DELAY);
      }}
      onBlur={(event) => {
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="features-menu"
        data-active={inSection}
        onClick={() => {
          // A click right after a hover-open keeps it open rather than snapping it shut.
          if (openedByHover.current) openedByHover.current = false;
          else setOpen((current) => !current);
        }}
        className="nav-underline label-caps inline-flex min-h-11 items-center gap-1.5 text-muted transition-colors duration-200 hover:text-fg data-[active=true]:text-fg"
      >
        Features
        <IoChevronDown
          aria-hidden="true"
          className={`size-3.5 transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* The top padding bridges the gap, so the pointer can travel from button to panel. */}
      <div id="features-menu" hidden={!open} className="absolute top-full left-1/2 w-[35rem] -translate-x-1/2 pt-3">
        <div className="menu-pop rounded-2xl border border-line bg-surface p-3 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]">
          <ul className="grid grid-cols-2 gap-1">
            {featureNav.map((item) => {
              const current = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className="group flex h-full gap-3 rounded-xl p-3 transition-colors duration-200 hover:bg-surface-raised aria-[current=page]:bg-surface-raised"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-surface-raised text-accent-text">
                      <Icon name={item.icon} className="size-[1.125rem]" />
                    </span>
                    <span>
                      <span className="block text-[0.9375rem] font-semibold">{item.label}</span>
                      <span className="mt-0.5 block text-sm leading-snug text-muted">{item.description}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-2 flex items-center justify-between gap-4 border-t border-line px-3 pt-3 pb-1 text-sm font-semibold">
            <Link
              href="/features"
              aria-current={pathname === "/features" ? "page" : undefined}
              onClick={() => setOpen(false)}
              className="group inline-flex min-h-9 items-center gap-1.5 text-accent-text"
            >
              All features
              <IoArrowForward
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
              />
            </Link>
            <Link href="/how-it-works" onClick={() => setOpen(false)} className="inline-flex min-h-9 items-center text-muted hover:text-fg">
              How it works
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
