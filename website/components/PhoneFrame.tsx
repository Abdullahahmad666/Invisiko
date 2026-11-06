import Image from "next/image";
import type { ReactNode } from "react";
import { IoImageOutline } from "react-icons/io5";
import { screenshots, type Screenshot, type ScreenshotId } from "@/content/screenshots";
import { LogoMark } from "./Logo";

const DEFAULT_SIZES = "(min-width: 1024px) 300px, 70vw";

/** The device outline: bezel, camera cut-out and a glass sheen that sweeps past on scroll. */
export function PhoneShell({ children, float = false }: { children: ReactNode; float?: boolean }) {
  return (
    <div
      className={`phone-body relative rounded-[2.75rem] border border-[#333336] bg-[#111113] p-2.5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.65)] ${
        float ? "phone-float" : ""
      }`}
    >
      <div
        aria-hidden="true"
        className="absolute top-[1.15rem] left-1/2 z-20 h-[1.35rem] w-[5.5rem] -translate-x-1/2 rounded-full bg-black"
      />
      {/* overflow-clip, not hidden: hidden would capture the scroll timeline of the sheen below. */}
      <div className="relative aspect-[9/20] overflow-clip rounded-[2.2rem] bg-[#0B0B0D]">
        {children}
        <span aria-hidden="true" className="sd-glare pointer-events-none absolute inset-0 z-10" />
      </div>
    </div>
  );
}

type ScreenProps = {
  screenshot: ScreenshotId;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Hidden from assistive technology when a stacked screen is not the current one. */
  decorative?: boolean;
};

/** One screen: the real capture, or a labelled placeholder until it exists. */
export function PhoneScreen({ screenshot, priority = false, sizes = DEFAULT_SIZES, className = "", decorative = false }: ScreenProps) {
  const shot: Screenshot = screenshots[screenshot];

  if (shot.src && shot.width && shot.height) {
    return (
      <Image
        src={shot.src}
        alt={decorative ? "" : shot.alt}
        width={shot.width}
        height={shot.height}
        // Next 16 deprecates `priority`; eager + high fetch priority is the recommended form.
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        sizes={sizes}
        className={`h-full w-full object-cover object-top ${className}`}
      />
    );
  }

  return (
    <div className="ph-shimmer relative flex h-full flex-col items-center justify-center gap-3 overflow-hidden rounded-[2.2rem] border border-dashed border-[#6E6E76] px-6 text-center text-[#A6A6AC]">
      {/* Decorative scan line: reads as "capture coming", not as a broken image. */}
      <span
        aria-hidden="true"
        className="ph-scan absolute inset-x-6 top-1/2 h-px bg-gradient-to-r from-transparent via-[#FE9A02] to-transparent opacity-0 motion-reduce:hidden"
      />
      <LogoMark className="size-10" />
      <IoImageOutline aria-hidden="true" className="mt-2 size-6" />
      <p className="label-caps text-[#FE9A02]">Screenshot placeholder</p>
      <p className="text-[0.9375rem] leading-snug font-semibold text-white">{shot.label}</p>
      <p className="text-xs leading-snug">A real capture from the app goes here.</p>
    </div>
  );
}

type PhoneFrameProps = {
  screenshot: ScreenshotId;
  /** Above-the-fold frames load eagerly; everything else is lazy (§9.2 I). */
  priority?: boolean;
  /** A slow idle float, for hero phones. */
  float?: boolean;
  className?: string;
  sizes?: string;
};

/**
 * A real product screenshot in a simple device outline (§10: no heavy perspective, never a
 * fabricated screen). It rises and straightens as it scrolls into view.
 */
export function PhoneFrame({ screenshot, priority = false, float = false, className = "", sizes }: PhoneFrameProps) {
  return (
    <figure className={`sd-phone mx-auto w-full max-w-[280px] sm:max-w-[300px] ${className}`}>
      <PhoneShell float={float}>
        <PhoneScreen screenshot={screenshot} priority={priority} sizes={sizes} />
      </PhoneShell>
    </figure>
  );
}
