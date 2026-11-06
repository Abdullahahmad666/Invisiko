"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** A footer link that marks the page you are on. */
export function FooterLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      aria-current={pathname === href ? "page" : undefined}
      className="inline-flex min-h-11 items-center text-[0.9375rem] text-fg/90 hover:text-accent-text aria-[current=page]:font-semibold aria-[current=page]:text-accent-text sm:min-h-9"
    >
      {label}
    </Link>
  );
}
