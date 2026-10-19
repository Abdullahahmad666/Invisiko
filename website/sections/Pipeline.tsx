import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  IoCameraOutline,
  IoCheckmarkDoneOutline,
  IoEyeOutline,
  IoHourglassOutline,
  IoReaderOutline,
  IoTrendingUpOutline,
} from "react-icons/io5";

const stages: { title: string; body: string; Icon: IconType; person?: boolean }[] = [
  { title: "Capture", body: "Camera, gallery or PDF.", Icon: IoCameraOutline },
  { title: "Queued", body: "Uploaded and waiting its turn.", Icon: IoHourglassOutline },
  { title: "Read in the background", body: "Supplier, lines and totals extracted.", Icon: IoReaderOutline },
  { title: "Review", body: "Each line matched to a stock item.", Icon: IoEyeOutline, person: true },
  { title: "Confirm", body: "A person presses Confirm.", Icon: IoCheckmarkDoneOutline, person: true },
  { title: "Stock and spend", body: "Quantities move; spend is recorded.", Icon: IoTrendingUpOutline },
];

/**
 * The invoice pipeline (§9.3), as a numbered list. The two stages where a person is in charge
 * are marked, because that checkpoint is the point of the page.
 */
export function Pipeline() {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:gap-0">
      {stages.map(({ title, body, Icon, person }, index) => (
        <li
          key={title}
          data-reveal
          style={{ "--reveal-delay": `${index * 40}ms` } as CSSProperties}
          className="relative flex gap-4 rounded-2xl border border-line bg-surface p-5 lg:flex-col lg:rounded-none lg:border-y lg:border-r-0 lg:border-l lg:first:rounded-l-2xl lg:last:rounded-r-2xl lg:last:border-r"
        >
          <span
            className={`grid size-11 shrink-0 place-items-center rounded-full ${
              person ? "bg-amber text-ink" : "border border-line-strong text-fg"
            }`}
          >
            <Icon aria-hidden="true" className="size-5" />
          </span>
          <div>
            <p className="label-caps tabular-nums text-muted">{String(index + 1).padStart(2, "0")}</p>
            <h3 className="mt-1.5 font-semibold leading-snug">{title}</h3>
            <p className="mt-1 text-[0.9375rem] text-muted">{body}</p>
            {person ? <p className="label-caps mt-3 text-accent-text">A person</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
