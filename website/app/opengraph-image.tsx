import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Invisiko — the back of house, on one phone.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default social card for every page: the real brand mark, wordmark and promise on the product's
 * near-black ground.
 * §12 asks for a real screenshot plus the wordmark — replace this with one once approved
 * screenshots exist (§14 Q11). It deliberately shows no product UI until then.
 */
// The master glyph is 225×451 (white "i", amber dot, transparent ground).
const MARK_RATIO = 225 / 451;

export default async function OpenGraphImage() {
  const mark = `data:image/png;base64,${(await readFile(join(process.cwd(), "assets/brand/invisiko-mark.png"))).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 82% 60%, rgba(254,154,2,0.28), #0B0B0D 55%)",
          backgroundColor: "#0B0B0D",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              border: "2px solid #333336",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img */}
            <img src={mark} width={Math.round(46 * MARK_RATIO)} height={46} alt="" />
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>Invisiko</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img */}
        <img
          src={mark}
          width={Math.round(420 * MARK_RATIO)}
          height={420}
          alt=""
          style={{ position: "absolute", right: 120, top: 105, opacity: 0.95 }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 78, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05, maxWidth: 800 }}>
            The back of house, on one phone.
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#A6A6AC", maxWidth: 780 }}>
            Staff hours, food-safety records, pay and delivery invoices — for independent takeaways.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
