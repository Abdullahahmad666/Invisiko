/**
 * Cleans the raw app captures that are still used on the website.
 *
 *   npm run screenshots
 *
 * Input:  assets/screens/*.jpg (local only and gitignored: most hold real names, an address, live
 *         codes or real prices). Output: public/screenshots/*.webp, which are committed.
 *
 * Only screens with no data on them are used directly. Everything else on the site is a demo
 * screen: see scripts/build-demo-screens.mjs. Never add these raw screens:
 *   staff-profile (real name, email) · staff-my-pay (rates and the pay split, which must not be
 *   published) · manager-suppliers-storage (real supplier and address) · manager-check-in-qr (live
 *   code) · manager-analytics (real name).
 *
 * The phone's status bar (real time, battery, signal) and home indicator are painted out, because
 * the website's device frame supplies its own hardware. Screens are upscaled to 1080×2400.
 */
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const W = 720;
const H = 1600;
const STATUS_BAR = 92;
const screens = ["welcome-manager", "welcome-staff"];

function fill(data, x, y, w, h, [r, g, b]) {
  for (let row = y; row < y + h; row++) {
    for (let col = x; col < x + w; col++) {
      const i = (row * W + col) * 3;
      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
    }
  }
}

const at = (data, x, y) => Array.from(data.subarray((y * W + x) * 3, (y * W + x) * 3 + 3));

const outDir = join(root, "public/screenshots");
await mkdir(outDir, { recursive: true });

console.log("Building screenshots from assets/screens/");
for (const name of screens) {
  const { data, info } = await sharp(join(root, "assets/screens", `${name}.jpg`))
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  if (info.width !== W || info.height !== H) throw new Error(`${name}: expected ${W}×${H}, got ${info.width}×${info.height}`);

  fill(data, 0, 0, W, STATUS_BAR, at(data, 4, STATUS_BAR + 2));
  // The home indicator sits below the tab bar: repeat the clean pixel just left of it, row by row.
  for (let y = 1574; y < H; y++) fill(data, 220, y, 280, 1, at(data, 216, y));

  await sharp(data, { raw: { width: W, height: H, channels: 3 } })
    .resize({ width: 1080, kernel: "lanczos3" })
    .sharpen({ sigma: 0.7 })
    .webp({ quality: 88, smartSubsample: true })
    .toFile(join(outDir, `${name}.webp`));
  console.log(`  ${name}.webp`);
}
