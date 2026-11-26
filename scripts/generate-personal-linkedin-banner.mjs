import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');
const currentArtifactDir = 'C:/Users/Student/.gemini/antigravity/brain/5cc83c57-59b9-4310-bc85-48e847297a8b';

const loopExchangeSvg = `
<svg width="46" height="28" viewBox="0 0 46 28" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin: 0 14px;">
  <path d="M5 11C11 4 33 4 39 11" stroke="#00E5FF" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M34 5L40 11.5L32.5 13.5" stroke="#00E5FF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M41 17C35 24 13 24 7 17" stroke="#FFD700" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M12 23L6 16.5L13.5 14.5" stroke="#FFD700" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const forwardArrowSvg = `
<svg width="34" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin: 0 14px;">
  <path d="M4 12H29M29 12L22 6M29 12L22 18" stroke="#94A3B8" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const makeHtml = (taglineHtml, fontSize = '42px', credLineHtml = '') => `<!DOCTYPE html>
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
    gap: 16px;
    padding: 0 64px 0 360px;
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
    font-size: ${fontSize};
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

  .cred-line {
    position: relative;
    z-index: 2;
    margin-top: 6px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #94a3b8;
    white-space: nowrap;
    text-align: center;
  }
  .cred-line span.highlight {
    color: #cbd5e1;
  }
  .cred-line span.sep {
    color: #475569;
    margin: 0 12px;
  }
</style>
</head>
<body>

  <div class="banner" id="banner-2line">
    <div class="grid-overlay"></div>
    <div class="tagline">
      ${taglineHtml}
    </div>
    <div class="pillars-line">
      <span class="cyan">Actionable Data</span>${loopExchangeSvg}<span class="gold">Gamification</span>${forwardArrowSvg}<span class="cyan">Revenue</span>
    </div>
    ${credLineHtml ? `<div class="cred-line">${credLineHtml}</div>` : ''}
  </div>

</body>
</html>`;

const chatLifecycleLine = `<span class="highlight">Mobile Acquisition</span><span class="sep">•</span><span class="highlight">Engagement</span><span class="sep">•</span><span class="highlight">Retention</span><span class="sep">•</span><span class="highlight">Revenue</span>`;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1584, height: 396 },
  deviceScaleFactor: 2,
});

await page.setContent(
  makeHtml(
    'Get Found. Get Chosen. <span class="cyan">Keep Them Coming Back.</span>',
    '42px',
    chatLifecycleLine
  ),
  { waitUntil: 'networkidle' }
);
await page.evaluate(() => document.fonts.ready);
const el = await page.locator('#banner-2line');
const file = 'Alex-Hurd-LinkedIn-Banner-Chat-Final.png';
await el.screenshot({ path: path.join(publicDir, file) });
fs.copyFileSync(path.join(publicDir, file), path.join(currentArtifactDir, file));
fs.copyFileSync(path.join(publicDir, file), 'C:/Users/Student/Desktop/Alex-Hurd-LinkedIn-Banner-Chat-Final.png');

console.log('Generated ChatGPT final banner variation.');
await browser.close();
