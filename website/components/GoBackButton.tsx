"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

/** Returns to the previous page, or to the home page when there is nothing to go back to. */
export function GoBackButton({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => {
        if (window.history.length > 1) router.back();
        else router.push("/");
      }}
      className="press inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-line-strong px-6 text-base font-semibold whitespace-nowrap text-fg transition-colors duration-200 hover:border-fg hover:bg-fg/5 sm:w-auto"
    >
      {children}
    </button>
  );
}
