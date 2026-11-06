/**
 * Turns raw app captures into the website's clean screenshots.
 *
 *   npm run screenshots
 *
 * Input:  assets/screens/*.jpg (local only and gitignored: they contain real names, an address and
 *         live codes). Output: public/screenshots/*.webp, which are committed.
 *
 * Every screen gets a clean top and bottom: the phone's status bar (real time, battery, signal) and
 * home indicator are painted out, because the website's device frame supplies its own hardware.
 * Screens are then upscaled to 1080×2400 and lightly sharpened.
 *
 * Redactions are listed per screen. NEVER add these raw screens without reviewing them first:
 *   staff-profile (real name, email) · staff-my-pay (rates and the pay split, which must not be
 *   published) · manager-suppliers-storage (real supplier and address) · manager-check-in-qr (live
 *   code) · manager-analytics (real name).
 */
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const W = 720;
const H = 1600;
const OUT_WIDTH = 1080;
const STATUS_BAR = 92;

/** A raw RGB canvas with the few pixel operations the redactions need. */
class Canvas {
  constructor(data) {
    this.data = data;
  }
  at(x, y) {
    const i = (y * W + x) * 3;
    return [this.data[i], this.data[i + 1], this.data[i + 2]];
  }
  fill(x, y, w, h, color) {
    for (let r = y; r < y + h; r++) {
      for (let c = x; c < x + w; c++) {
        const i = (r * W + c) * 3;
        [this.data[i], this.data[i + 1], this.data[i + 2]] = color;
      }
    }
  }
  /** Paints a rectangle with the colour found at (sampleX, sampleY). */
  cover(x, y, w, h, sampleX, sampleY) {
    this.fill(x, y, w, h, this.at(sampleX, sampleY));
  }
  /** Moves a block sideways by dx, then repaints what it left behind from (sampleX, sampleY). */
  moveLeft(x, y, w, h, dx, sampleX, sampleY) {
    const color = this.at(sampleX, sampleY);
    for (let r = y; r < y + h; r++) {
      const row = this.data.subarray((r * W + x) * 3, (r * W + x + w) * 3);
      this.data.set(row, (r * W + x - dx) * 3);
    }
    this.fill(x - dx + w, y, dx + 20, h, color);
  }
  /** Moves rows [from, H) up to start at `to`, then fills what is left: a genuine scrolled view. */
  scrollUp(from, to, background) {
    const rows = H - from;
    this.data.copy(this.data, to * W * 3, from * W * 3, H * W * 3);
    this.fill(0, to + rows, W, H - (to + rows), background);
  }
}

/**
 * Removes the home indicator by repeating, along each row, the clean pixel just left of it. Rows
 * rather than columns, so the rounded tab bar above it is not dragged down.
 */
function removeHomeIndicator(canvas) {
  for (let y = 1574; y < H; y++) {
    const clean = canvas.at(216, y);
    canvas.fill(220, y, 280, 1, clean);
  }
}

const AMBER = [254, 154, 2];

/** Replaces a live code with eight dots, so it reads as hidden rather than broken. */
function maskCode(canvas) {
  canvas.cover(170, 528, 380, 74, 100, 566);
  for (let n = 0; n < 8; n++) {
    const cx = 360 - 3.5 * 40 + n * 40;
    for (let y = -9; y <= 9; y++) {
      for (let x = -9; x <= 9; x++) {
        if (x * x + y * y <= 81) canvas.fill(Math.round(cx) + x, 566 + y, 1, 1, AMBER);
      }
    }
  }
}

const screens = {
  "welcome-manager": {},
  "welcome-staff": {},
  "sign-in": {},
  "staff-analytics": {},
  "manager-swap-requests": {},
  "manager-checks-dashboard": {},
  "manager-staff-hub": {},
  "manager-weekly-rota": {},
  "manager-inventory": {},
  "manager-purchase-history": {},
  "manager-temperature-history": {},
  "staff-opening-routine": {},
  // The movement line names a person. Close the gap by sliding "· From invoice scan…" over the name.
  "food-invoice-capture-stock": {
    edit: (c) => c.moveLeft(458, 1150, 196, 30, 92, 670, 1165),
    // The stock card alone, magnified for the "What it reads" section.
    detail: { name: "stock-item-detail", left: 30, top: 805, width: 660, height: 392 },
  },
  // The app bar shows a raw route name ("StaffBarcode").
  "manager-check-in-setup": { edit: (c) => c.cover(116, 98, 240, 62, 400, 130) },
  // A live invite code would let anyone join the team.
  "manager-invite-team": { edit: maskCode },
  // The hint names the restaurant.
  "staff-scan": { edit: (c) => c.cover(30, 1338, 660, 92, 16, 1384) },
  // Scrolled past "How this works", which mentions how staff are paid.
  "manager-payroll": { edit: (c) => c.scrollUp(668, 178, c.at(10, 1500)) },
  // Personal test photos are blurred.
  "manager-documents": { blur: { left: 72, top: 669, width: 576, height: 168 } },
  "manager-fridges-freezers": { blur: { left: 72, top: 249, width: 78, height: 76 } },
};

const outDir = join(root, "public/screenshots");
await mkdir(outDir, { recursive: true });

console.log("Building screenshots from assets/screens/");
for (const [name, { edit, blur, detail }] of Object.entries(screens)) {
  const { data, info } = await sharp(join(root, "assets/screens", `${name}.jpg`))
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  if (info.width !== W || info.height !== H) throw new Error(`${name}: expected ${W}×${H}, got ${info.width}×${info.height}`);

  const canvas = new Canvas(data);
  canvas.cover(0, 0, W, STATUS_BAR, 4, STATUS_BAR + 2);
  removeHomeIndicator(canvas);
  edit?.(canvas);

  if (detail) {
    const { name: detailName, ...region } = detail;
    await sharp(canvas.data, { raw: { width: W, height: H, channels: 3 } })
      .extract(region)
      .resize({ width: region.width * 2, kernel: "lanczos3" })
      .sharpen({ sigma: 0.7 })
      .webp({ quality: 90, smartSubsample: true })
      .toFile(join(outDir, `${detailName}.webp`));
    console.log(`  ${detailName}.webp`);
  }

  let image = sharp(canvas.data, { raw: { width: W, height: H, channels: 3 } });
  if (blur) {
    const patch = await sharp(canvas.data, { raw: { width: W, height: H, channels: 3 } })
      .extract(blur)
      .blur(16)
      .png()
      .toBuffer();
    image = sharp(await image.composite([{ input: patch, left: blur.left, top: blur.top }]).png().toBuffer());
  }

  await image
    .resize({ width: OUT_WIDTH, kernel: "lanczos3" })
    .sharpen({ sigma: 0.7 })
    .webp({ quality: 88, smartSubsample: true })
    .toFile(join(outDir, `${name}.webp`));
  console.log(`  ${name}.webp`);
}

// PNG for the social share card, which cannot read WebP.
await sharp(join(outDir, "manager-checks-dashboard.webp"))
  .resize({ width: 400 })
  .png({ compressionLevel: 9 })
  .toFile(join(root, "assets/brand/share-screen.png"));
console.log("  assets/brand/share-screen.png");
