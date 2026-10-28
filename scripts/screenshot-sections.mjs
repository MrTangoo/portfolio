// Dev helper: capture each section at a given viewport width.
// Usage: node scripts/screenshot-sections.mjs [width] [baseURL]
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const width = Number(process.argv[2] ?? 1440);
const baseURL = process.argv[3] ?? "http://localhost:3000";
const outDir = `test-results/screenshots/sections-${width}`;
const ids = [
  "top",
  "a-propos",
  "expertise",
  "stack",
  "parcours",
  "certifications",
  "approche",
  "contact",
];

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width, height: width < 768 ? 812 : 900 },
  reducedMotion: "reduce",
});
await page.goto(baseURL, { waitUntil: "networkidle" });
await page.evaluate(async () => {
  const step = window.innerHeight / 2;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((resolve) => setTimeout(resolve, 60));
  }
  window.scrollTo(0, 0);
});
await page.addStyleTag({
  content: 'body > header, a[href="#main"], nextjs-portal { display: none !important; }',
});

for (const id of ids) {
  const element = page.locator(`#${id}`);
  await element.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await element.screenshot({ path: `${outDir}/${id}.png` });
  console.log(`captured ${id}`);
}

await browser.close();
