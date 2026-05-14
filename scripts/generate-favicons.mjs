import sharp from "sharp";
import pngToIco from "png-to-ico";
import { writeFile } from "fs/promises";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const source = resolve(__dirname, "../public/tiki-taco-logo-full.png");
const outDir = resolve(__dirname, "../public");

const sizes = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "favicon-48x48.png", size: 48 },
  { name: "favicon-96x96.png", size: 96 },
  { name: "favicon-192x192.png", size: 192 },
  { name: "favicon-512x512.png", size: 512 },
  { name: "apple-touch-icon.png", size: 180 },
];

// Generate PNGs
for (const { name, size } of sizes) {
  await sharp(source).resize(size, size).png().toFile(resolve(outDir, name));
  console.log(`✓ ${name} (${size}×${size})`);
}

// Generate favicon.ico from 16, 32, 48
const icoInputs = await Promise.all(
  [16, 32, 48].map((s) => sharp(source).resize(s, s).png().toBuffer())
);
const ico = await pngToIco(icoInputs);
await writeFile(resolve(outDir, "favicon.ico"), ico);
console.log("✓ favicon.ico (16+32+48)");

console.log("\nDone! All favicons generated in /public/");
