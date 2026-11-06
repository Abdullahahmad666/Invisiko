import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import mark from "@/assets/brand/invisiko-mark.png";

/**
 * Brand mark: the owner's white "i" with an amber dot, on the product's near-black tile.
 * The glyph is white, so it always sits on the dark tile, whatever the background around it.
 * Source: assets/brand/invisiko-mark.png (icons are derived from it by `npm run brand`).
 */
export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-block shrink-0 rounded-[22%] border border-[#333336] bg-[#0B0B0D] ${className}`}
    >
      {/* Absolutely positioned so the percentage height resolves against the tile. */}
      <Image
        src={mark}
        alt=""
        loading="eager"
        sizes="40px"
        className="absolute inset-0 m-auto h-[64%] w-auto"
      />
    </span>
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
