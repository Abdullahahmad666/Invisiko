import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { screenshots, type Screenshot } from "@/content/screenshots";

const root = join(__dirname, "..", "..");
const publicDir = join(root, "public/screenshots");

// These raw captures hold real names, an address, live codes or the pay split.
const neverPublish = ["staff-profile", "staff-my-pay", "manager-suppliers-storage", "manager-check-in-qr", "manager-analytics"];

describe("screenshots", () => {
  it("point at files that exist", () => {
    for (const shot of Object.values(screenshots) as Screenshot[]) {
      if (shot.src) expect(existsSync(join(root, "public", shot.src)), shot.src).toBe(true);
    }
  });

  it("all have alt text", () => {
    for (const shot of Object.values(screenshots) as Screenshot[]) expect(shot.alt.length).toBeGreaterThan(20);
  });

  it("never include a screen with personal data or live codes", () => {
    const published = readdirSync(publicDir).map((file) => file.replace(/\.\w+$/, ""));
    for (const name of neverPublish) expect(published).not.toContain(name);
  });

  it("keep the raw captures out of git", () => {
    expect(readFileSync(join(root, ".gitignore"), "utf8")).toContain("/assets/screens/");
  });
});
