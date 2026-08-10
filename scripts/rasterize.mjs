/**
 * Rasterizes SVG brand assets into PNG (favicons + social share image).
 * Requires `sharp`. Run with: npm run art (this script is invoked by generate-art.mjs).
 */
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('..', import.meta.url));
const pub = join(root, 'public');

async function main() {
  await sharp(join(pub, 'favicon.svg')).resize(192, 192).png().toFile(join(pub, 'icons', 'android-chrome-192x192.png'));
  await sharp(join(pub, 'favicon.svg')).resize(512, 512).png().toFile(join(pub, 'icons', 'android-chrome-512x512.png'));
  await sharp(join(pub, 'favicon.svg')).resize(180, 180).png().toFile(join(pub, 'apple-touch-icon.png'));
  await sharp(join(pub, 'art', 'hero-main.svg'))
    .resize(1200, 630, { fit: 'cover' })
    .png()
    .toFile(join(pub, 'og.png'));
  console.log('Rasterized favicon PNGs and og.png');
}

mkdirSync(join(pub, 'icons'), { recursive: true });
main().catch((err) => {
  console.error('Rasterization failed (non-fatal):', err.message);
});
