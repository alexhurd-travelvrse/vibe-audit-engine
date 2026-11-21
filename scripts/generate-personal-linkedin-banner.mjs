import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');
const currentArtifactDir = 'C:/Users/Student/.gemini/antigravity/brain/5cc83c57-59b9-4310-bc85-48e847297a8b';

// Custom SVG 1: Sleek Bi-Directional Stacked Exchange Arrows (Cyan top -> right, Gold bottom <- left)
const biDirectionalSvg = `
<svg width="44" height="26" viewBox="0 0 44 26" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin: 0 14px; overflow: visible;">
  <!-- Top arrow: Cyan (Actionable Data -> Gamification) -->
  <path d="M4 8H38M38 8L32 3M38 8L32 13" stroke="#00E5FF" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Bottom arrow: Gold (Gamification -> Actionable Data) -->
  <path d="M40 18H6M6 18L12 13M6 18L12 23" stroke="#FFD700" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

// Custom SVG 2: Forward Arrow into Revenue
const forwardArrowSvg = `
<svg width="34" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin: 0 14px;">
  <path d="M4 12H29M29 12L22 6M29 12L22 18" stroke="#94A3B8" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

// Custom SVG 3: Curved Flywheel / Infinity Loop Exchange Icon
const loopExchangeSvg = `
<svg width="46" height="28" viewBox="0 0 46 28" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin: 0 14px;">
  <!-- Top curved flow (Cyan -> Gold) -->
  <path d="M5 11C11 4 33 4 39 11" stroke="#00E5FF" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M34 5L40 11.5L32.5 13.5" stroke="#00E5FF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Bottom curved flow (Gold -> Cyan) -->
  <path d="M41 17C35 24 13 24 7 17" stroke="#FFD700" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M12 23L6 16.5L13.5 14.5" stroke="#FFD700" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const makeHtml = (pillarsHtml, extraCss = '') => `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&family=Outfit:wght@700;800;900&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1584px;
    background: #040812;
    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #ffffff;
  }

  .banner {
    width: 1584px;
    height: 396px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 18px;
    padding: 0 72px 0 360px;
    background:
      radial-gradient(650px 360px at 68% 50%, rgba(0, 229, 255, 0.14), transparent 70%),
      radial-gradient(450px 320px at 38% 60%, rgba(255, 215, 0, 0.08), transparent 70%),
      linear-gradient(135deg, #040914 0%, #0a1529 55%, #050b16 100%);
  }

  .grid-overlay {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 52px 52px;
    pointer-events: none;
  }

  .tagline {
    position: relative;
    z-index: 2;
    font-size: 48px;
    font-weight: 900;
    letter-spacing: -0.025em;
    color: #ffffff;
    white-space: nowrap;
    text-align: center;
    line-height: 1.08;
  }
  .tagline span.cyan {
    color: #00e5ff;
  }

  .pillars-line {
    position: relative;
    z-index: 2;
    font-family: 'Inter', sans-serif;
    font-size: 25px;
    font-weight: 700;
    letter-spacing: 0.01em;
    color: #e2e8f0;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pillars-line span.cyan {
    color: #00e5ff;
  }
  .pillars-line span.gold {
    color: #ffd700;
  }
  .pillars-line span.white {
    color: #ffffff;
  }
  .pillars-line span.emerald {
    color: #10b981;
  }
  .engine-capsule {
    display: inline-flex;
    align-items: center;
    padding: 7px 20px;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.65);
    border: 1px solid rgba(0, 229, 255, 0.28);
    box-shadow: 0 0 24px rgba(0, 229, 255, 0.08), inset 0 0 12px rgba(255, 215, 0, 0.05);
  }
  ${extraCss}
</style>
</head>
<body>

  <div class="banner" id="banner-2line">
    <div class="grid-overlay"></div>
    <div class="tagline">
      Helping Brands Get <span class="cyan">Found &amp; Chosen</span>
    </div>
    <div class="pillars-line">
      ${pillarsHtml}
    </div>
  </div>

</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1584, height: 396 },
  deviceScaleFactor: 2,
});

// Style 1: Clean Color-Coded Dual Stacked Arrows (Cyan right arrow on top, Gold left arrow on bottom) -> Revenue
await page.setContent(
  makeHtml(
    `<span class="cyan">Actionable Data</span>${biDirectionalSvg}<span class="gold">Gamification</span>${forwardArrowSvg}<span class="cyan">Revenue</span>`
  ),
  { waitUntil: 'networkidle' }
);
await page.evaluate(() => document.fonts.ready);
const el1 = await page.locator('#banner-2line');
const file1 = 'Alex-Hurd-LinkedIn-Banner-2Way-Stacked.png';
await el1.screenshot({ path: path.join(publicDir, file1) });
fs.copyFileSync(path.join(publicDir, file1), path.join(currentArtifactDir, file1));
fs.copyFileSync(path.join(publicDir, file1), 'C:/Users/Student/Desktop/Alex-Hurd-LinkedIn-Personal-Banner.png');

// Style 2: Curved Flywheel Loop Icon + Glowing Engine Capsule around [Actionable Data ⇄ Gamification] → Revenue
await page.setContent(
  makeHtml(
    `<div class="engine-capsule"><span class="cyan">Actionable Data</span>${loopExchangeSvg}<span class="gold">Gamification</span></div>${forwardArrowSvg}<span class="white">Revenue</span>`
  ),
  { waitUntil: 'networkidle' }
);
await page.evaluate(() => document.fonts.ready);
const el2 = await page.locator('#banner-2line');
const file2 = 'Alex-Hurd-LinkedIn-Banner-2Way-Capsule.png';
await el2.screenshot({ path: path.join(publicDir, file2) });
fs.copyFileSync(path.join(publicDir, file2), path.join(currentArtifactDir, file2));
fs.copyFileSync(path.join(publicDir, file2), 'C:/Users/Student/Desktop/Alex-Hurd-LinkedIn-Banner-2Way-Capsule.png');

// Style 3: Curved Flywheel Loop Icon without capsule (Clean minimal matching original aesthetic)
await page.setContent(
  makeHtml(
    `<span class="cyan">Actionable Data</span>${loopExchangeSvg}<span class="gold">Gamification</span>${forwardArrowSvg}<span class="cyan">Revenue</span>`
  ),
  { waitUntil: 'networkidle' }
);
await page.evaluate(() => document.fonts.ready);
const el3 = await page.locator('#banner-2line');
const file3 = 'Alex-Hurd-LinkedIn-Banner-2Way-Loop.png';
await el3.screenshot({ path: path.join(publicDir, file3) });
fs.copyFileSync(path.join(publicDir, file3), path.join(currentArtifactDir, file3));
fs.copyFileSync(path.join(publicDir, file3), 'C:/Users/Student/Desktop/Alex-Hurd-LinkedIn-Banner-2Way-Loop.png');

console.log('Generated 3 2-way visual banner designs.');
await browser.close();
