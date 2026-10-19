import Link from "next/link";
import { site } from "@/content/site";

/**
 * Brand mark: a white "i" with an amber dot, on near-black (§10, mobile/assets/images/icon.png).
 * A vector recreation for the web until the owner supplies an SVG master (§14 Q25).
 */
export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="8" fill="#0B0B0D" />
      <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="none" stroke="#333336" />
      <circle cx="16" cy="9" r="3" fill="#FE9A02" />
      <rect x="13.5" y="14" width="5" height="11" rx="2.5" fill="#FFFFFF" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex min-h-11 items-center gap-2.5 font-semibold tracking-[-0.01em] ${className}`}
    >
      <LogoMark className="size-8" />
      <span className="text-lg">{site.name}</span>
      <span className="sr-only">home</span>
    </Link>
  );
}
