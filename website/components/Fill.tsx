import type { ReactNode } from "react";
import { isPlaceholder } from "@/content/site";

/**
 * Renders a business fact, or — while it is still an unresolved `[[TOKEN]]` — a visibly
 * marked placeholder, so nothing pretends to be real before the owner supplies it (§14).
 */
export function Fill({ value }: { value: string }) {
  if (isPlaceholder(value)) {
    return (
      <span className="placeholder-token" title="To be supplied by the product owner before launch">
        {value}
      </span>
    );
  }
  return <>{value}</>;
}

/** A mailto link once the address is real; a marked placeholder (never a dead link) until then. */
export function EmailLink({ address, className = "" }: { address: string; className?: string }) {
  if (isPlaceholder(address)) return <Fill value={address} />;
  return (
    <a href={`mailto:${address}`} className={`font-semibold underline underline-offset-4 ${className}`}>
      {address}
    </a>
  );
}

/** An outbound link once the URL is real; the label plus a marked placeholder until then. */
export function ExternalLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  if (isPlaceholder(href)) {
    return (
      <span>
        {children} <Fill value={href} />
      </span>
    );
  }
  return (
    <a href={href} rel="noopener" className={`font-semibold underline underline-offset-4 ${className}`}>
      {children}
    </a>
  );
}
