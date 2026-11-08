import type { ReactNode } from "react";

/** Long-form text at a 65–75 character measure (§10 typography). */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[68ch] space-y-5 text-[1.0625rem] [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-0.01em] [&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-semibold [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:text-muted [&>p]:text-muted">
      {children}
    </div>
  );
}

