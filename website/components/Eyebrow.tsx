import type { ReactNode } from "react";

/** Small uppercase label above a heading, led by the brand mark's amber dot. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`label-caps flex items-center gap-2 text-accent-text ${className}`}>
      <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-amber" />
      {children}
    </p>
  );
}
