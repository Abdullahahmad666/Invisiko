import type { ReactNode } from "react";

/** Max content width 1200px; 16px gutters on mobile (§9 responsive rule). */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}
