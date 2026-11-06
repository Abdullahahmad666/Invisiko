/**
 * Builds every raster brand asset from the master glyph, so icons never drift from the logo.
 *
 *   npm run brand
 *
 * Master: assets/brand/invisiko-mark.png — the white "i" and amber dot on a transparent ground,
 * trimmed from the owner's logo file with its stray background outline removed.
 *
 * The glyph is white, so every icon puts it on the product's near-black (#0B0B0D), as the app
 * icon does. Outputs:
 *   app/icon.png                        512×512 favicon, rounded tile     (served at /icon.png)
 *   app/apple-icon.png                  180×180 home-screen icon, square   (iOS applies its own mask)
 *   public/brand/invisiko-icon-192.png  192×192 manifest icon
 *   public/brand/invisiko-logo-512.png  512×512 logo for structured data and search engines
 */
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const master = join(root, "assets/brand/invisiko-mark.png");
const INK = "#0B0B0D";

/** The glyph centred on a near-black tile, filling `glyphRatio` of the tile's height. */
async function tile({ size, radius, glyphRatio, out }) {
  const glyph = await sharp(master)
    .resize({ height: Math.round(size * glyphRatio), fit: "inside", kernel: "lanczos3" })
    .toBuffer();
  const background = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="${INK}"/></svg>`,
  );
  const path = join(root, out);
  await mkdir(dirname(path), { recursive: true });
  await sharp(background)
    .composite([{ input: glyph, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toFile(path);
  console.log(`  ${out} (${size}×${size})`);
}

console.log("Building brand assets from assets/brand/invisiko-mark.png");
await tile({ size: 512, radius: 112, glyphRatio: 0.62, out: "app/icon.png" });
await tile({ size: 180, radius: 0, glyphRatio: 0.6, out: "app/apple-icon.png" });
await tile({ size: 192, radius: 42, glyphRatio: 0.62, out: "public/brand/invisiko-icon-192.png" });
await tile({ size: 512, radius: 0, glyphRatio: 0.62, out: "public/brand/invisiko-logo-512.png" });
