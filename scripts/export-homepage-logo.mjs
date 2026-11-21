import { chromium } from 'playwright';
import fs from 'node:fs';

const svgContent = fs.readFileSync('public/models/Atmosvibe6.svg', 'utf8');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 800, height: 200 }, deviceScaleFactor: 2 });

await page.setContent(
  `<body style="margin:0;background:#050b14;display:flex;align-items:center;justify-content:center;height:200px;">${svgContent}</body>`,
  { waitUntil: 'networkidle' }
);
await page.screenshot({ path: 'public/AtmosVibe-Homepage-Logo-Dark.png' });
fs.copyFileSync(
  'public/AtmosVibe-Homepage-Logo-Dark.png',
  'C:/Users/Student/.gemini/antigravity/brain/1aab93db-7668-42c3-a55f-d4f72ca80c5b/AtmosVibe-Homepage-Logo-Dark.png'
);

await page.setContent(
  `<body style="margin:0;background:transparent;display:flex;align-items:center;justify-content:center;height:200px;">${svgContent}</body>`,
  { waitUntil: 'networkidle' }
);
await page.screenshot({ path: 'public/AtmosVibe-Homepage-Logo-Transparent.png', omitBackground: true });
fs.copyFileSync(
  'public/AtmosVibe-Homepage-Logo-Transparent.png',
  'C:/Users/Student/.gemini/antigravity/brain/1aab93db-7668-42c3-a55f-d4f72ca80c5b/AtmosVibe-Homepage-Logo-Transparent.png'
);

await browser.close();
console.log('Exported homepage logo PNGs');
