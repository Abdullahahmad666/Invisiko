import Image from "next/image";
import { IoImageOutline } from "react-icons/io5";
import { screenshots, type Screenshot, type ScreenshotId } from "@/content/screenshots";
import { LogoMark } from "./Logo";

type PhoneFrameProps = {
  screenshot: ScreenshotId;
  /** Above-the-fold frames load eagerly; everything else is lazy (§9.2 I). */
  priority?: boolean;
  className?: string;
  sizes?: string;
};

/**
 * A real product screenshot in a simple device outline (§10: no heavy perspective, never a
 * fabricated screen). Until the owner supplies the capture, the screen shows a clearly
 * labelled placeholder naming the screenshot that is needed.
 */
export function PhoneFrame({
  screenshot,
  priority = false,
  className = "",
  sizes = "(min-width: 1024px) 300px, 70vw",
}: PhoneFrameProps) {
  const shot: Screenshot = screenshots[screenshot];
  const ready = Boolean(shot.src && shot.width && shot.height);

  return (
    <figure className={`mx-auto w-full max-w-[280px] sm:max-w-[300px] ${className}`}>
      <div className="relative rounded-[2.75rem] border border-[#333336] bg-[#111113] p-2.5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.65)]">
        <div
          aria-hidden="true"
          className="absolute top-[1.15rem] left-1/2 z-10 h-[1.35rem] w-[5.5rem] -translate-x-1/2 rounded-full bg-black"
        />
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.2rem] bg-[#0B0B0D]">
          {ready ? (
            <Image
              src={shot.src!}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              // Next 16 deprecates `priority`; eager + high fetch priority is the recommended form.
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              sizes={sizes}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 rounded-[2.2rem] border border-dashed border-[#6E6E76] px-6 text-center text-[#A6A6AC]">
              <LogoMark className="size-10" />
              <IoImageOutline aria-hidden="true" className="mt-2 size-6" />
              <p className="label-caps text-[#FE9A02]">Screenshot placeholder</p>
              <p className="text-[0.9375rem] leading-snug font-semibold text-white">{shot.label}</p>
              <p className="text-xs leading-snug">A real capture from the app goes here.</p>
            </div>
          )}
        </div>
      </div>
    </figure>
  );
}
