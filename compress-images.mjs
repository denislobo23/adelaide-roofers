// compress-images.mjs
// ─────────────────────────────────────────────────────────────
// One-time image compressor for public/images.
// - Backs up every original into public/images/_originals/ first
//   (so nothing is ever lost and you can re-run safely).
// - Resizes anything wider than MAX_WIDTH down (never up).
// - Re-encodes WebP at QUALITY.
// - Prints a before/after size report.
//
// HOW TO RUN (from C:\adelaide-roofers):
//   npm install sharp
//   node compress-images.mjs
// ─────────────────────────────────────────────────────────────

import { readdir, mkdir, copyFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const IMAGES_DIR = path.join(process.cwd(), "public", "images");
const BACKUP_DIR = path.join(IMAGES_DIR, "_originals");
const MAX_WIDTH = 1920;   // heroes never need to be wider than this
const QUALITY = 80;       // WebP quality — visually near-identical, far smaller

const KB = (bytes) => (bytes / 1024).toFixed(0) + " KB";
const MB = (bytes) => (bytes / 1048576).toFixed(2) + " MB";

async function run() {
  if (!existsSync(IMAGES_DIR)) {
    console.error("Could not find public/images — run this from the project root (C:\\adelaide-roofers).");
    process.exit(1);
  }

  await mkdir(BACKUP_DIR, { recursive: true });

  const all = await readdir(IMAGES_DIR);
  const images = all.filter((f) => /\.(webp|jpe?g|png)$/i.test(f));

  if (images.length === 0) {
    console.log("No images found in public/images.");
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;
  let processed = 0;
  let skipped = 0;

  console.log(`Found ${images.length} images. Compressing (originals → _originals/)…\n`);

  for (const file of images) {
    const src = path.join(IMAGES_DIR, file);
    const backup = path.join(BACKUP_DIR, file);

    const beforeSize = (await stat(src)).size;

    // Back up the original once (don't overwrite an existing backup).
    if (!existsSync(backup)) {
      await copyFile(src, backup);
    }

    try {
      // Always compress from the pristine backup so re-runs don't
      // re-compress an already-compressed file (quality loss).
      const input = sharp(backup);
      const meta = await input.metadata();

      let pipeline = input;
      if (meta.width && meta.width > MAX_WIDTH) {
        pipeline = pipeline.resize({ width: MAX_WIDTH });
      }

      const buffer = await pipeline.webp({ quality: QUALITY }).toBuffer();

      // Write the compressed WebP. If the source was .jpg/.png we still
      // output .webp and you'd update references — but your site already
      // uses .webp everywhere, so this just overwrites in place.
      const outName = file.replace(/\.(jpe?g|png)$/i, ".webp");
      const out = path.join(IMAGES_DIR, outName);
      await sharp(buffer).toFile(out);

      const afterSize = (await stat(out)).size;
      totalBefore += beforeSize;
      totalAfter += afterSize;
      processed++;

      const saved = beforeSize > 0 ? Math.round((1 - afterSize / beforeSize) * 100) : 0;
      const flag = afterSize > 400 * 1024 ? "  ⚠ still large" : "";
      console.log(
        `  ${file.padEnd(34)} ${KB(beforeSize).padStart(9)} → ${KB(afterSize).padStart(9)}  (-${saved}%)${flag}`
      );
    } catch (err) {
      skipped++;
      console.log(`  ${file.padEnd(34)} SKIPPED (${err.message})`);
    }
  }

  console.log("\n──────────────────────────────────────────────");
  console.log(`Processed: ${processed}   Skipped: ${skipped}`);
  console.log(`Total before: ${MB(totalBefore)}   after: ${MB(totalAfter)}`);
  if (totalBefore > 0) {
    console.log(`Overall saving: ${Math.round((1 - totalAfter / totalBefore) * 100)}%`);
  }
  console.log("Originals are safe in public/images/_originals/");
  console.log("If anything looks wrong, copy an original back over the compressed one.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
