import Image from "next/image";

/**
 * A stock card, magnified: the crop of a screen §10 asks for when a whole phone would make the
 * detail too small to read. Built by `npm run demo-screens`.
 */
export function StockCardDetail() {
  return (
    <figure className="sd-phone mx-auto w-full max-w-[30rem]">
      <div className="phone-body relative overflow-clip rounded-3xl border border-[#333336] bg-[#0B0B0D] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)]">
        <Image
          src="/screenshots/stock-item-detail.webp"
          alt="A stock item in Invisiko: quantity in stock, par level, unit cost and stock value, with a delivery recorded from an invoice scan."
          width={984}
          height={711}
          sizes="(min-width: 1024px) 480px, 90vw"
          className="h-auto w-full"
        />
        <span aria-hidden="true" className="sd-glare pointer-events-none absolute inset-0 z-10" />
      </div>
      <figcaption className="mt-4 text-center text-[0.9375rem] text-muted">
        A line from a delivery note, once read and confirmed.
      </figcaption>
    </figure>
  );
}
