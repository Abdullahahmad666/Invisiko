import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** The brand mark — white "i", amber dot, near-black — as a home-screen icon. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#0B0B0D", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div style={{ width: 34, height: 34, borderRadius: 17, background: "#FE9A02", marginBottom: 14 }} />
        <div style={{ width: 28, height: 64, borderRadius: 14, background: "#FFFFFF" }} />
      </div>
    ),
    size,
  );
}
