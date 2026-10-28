// Dev helper: capture full-page screenshots at several viewport widths.
// Usage: node scripts/screenshot.mjs [baseURL]
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const baseURL = process.argv[2] ?? "http://localhost:3000";
const outDir = "test-results/screenshots";
const viewports = [
  { name: "mobile-375", width: 375, height: 812 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1440", width: 1440, height: 900 },
];

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport, reducedMotion: "reduce" });
  await page.goto(baseURL, { waitUntil: "networkidle" });
  // Scroll through to trigger whileInView reveals before capturing.
  await page.evaluate(async () => {
    const step = window.innerHeight / 2;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${outDir}/${viewport.name}.png`, fullPage: true });
  console.log(`captured ${viewport.name}`);
  await page.close();
}

await browser.close();
