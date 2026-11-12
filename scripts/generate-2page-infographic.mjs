import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LONDON_10_HOTELS } from '../src/data/london10StudyData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');
const artifactDir = 'C:/Users/Student/.gemini/antigravity/brain/1aab93db-7668-42c3-a55f-d4f72ca80c5b';

const SHORT_NOTES = {
  'sea-containers': '4 of 5 hero slots are couches & beds (hides 12th Knot)',
  'hoxton-southwark': 'Slot #3 is 3 soap bottles; Slot #5 is gym bikes',
  'one-hundred-shoreditch': 'Shows terrace & lobby, but 3 slots are generic rooms',
  'hoxton-shoreditch': 'Slot #2 is a bathroom sink; 3 slots are beds',
  'hart-shoreditch': '4 of 5 hero slots are empty beds & lobby chairs',
  'the-standard-london': '4 bedrooms + bathroom sink (0 rooftop/lift shots)',
  'london-edition': 'Zero Berners Tavern or Punch Room shots in Top 5',
  'treehouse-london': 'Best performer (72), yet still 3 room/utility shots',
  'the-mandrake': 'Shows courtyard, but 3 of 5 slots are dark bedrooms',
  'the-ned': 'Zero Grand Banking Hall or rooftop shots in Top 5'
};

const tableRowsHtml = LONDON_10_HOTELS.map(
  (h) => `
    <div class="t-row">
      <div class="h-col">
        <span class="h-idx">#${h.index}</span>
        <div>
          <div class="h-title">${h.name}</div>
          <div class="h-hood">${h.neighborhood}</div>
        </div>
      </div>
      <div class="s-pill emerald">${h.mathVibeScore}</div>
      <div class="s-pill cyan">${h.ownPropertyDigitalScore}</div>
      <div class="s-pill rose">${h.otaTop5Score}</div>
    </div>
  `
).join('');

const styles = `
  @page {
    size: 1080px 1350px;
    margin: 0;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1080px;
    background: #040812;
    font-family: 'Inter', sans-serif;
    color: #ffffff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .page {
    width: 1080px;
    height: 1350px;
    padding: 56px 64px;
    background:
      radial-gradient(850px 550px at 15% 12%, rgba(0, 229, 255, 0.14), transparent 70%),
      radial-gradient(750px 550px at 88% 85%, rgba(244, 63, 94, 0.12), transparent 70%),
      linear-gradient(165deg, #040812 0%, #091326 55%, #040812 100%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    page-break-after: always;
    break-after: page;
    position: relative;
    overflow: hidden;
  }
  .top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .brand {
    font-family: 'Outfit', sans-serif;
    font-size: 32px;
    font-weight: 800;
    letter-spacing: -0.01em;
  }
  .brand span { color: #00e5ff; }
  .page-pill {
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.15);
    padding: 8px 18px;
    border-radius: 999px;
    font-size: 15px;
    font-weight: 700;
    color: #94a3b8;
    letter-spacing: 0.06em;
  }
  .kicker {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: rgba(0, 229, 255, 0.14);
    border: 1px solid rgba(0, 229, 255, 0.4);
    color: #00e5ff;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 18px;
  }
  h1 {
    font-family: 'Outfit', sans-serif;
    font-size: 50px;
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -0.025em;
  }
  h1 span.cyan {
    background: linear-gradient(90deg, #00e5ff, #38bdf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  h1 span.rose {
    background: linear-gradient(90deg, #fb7185, #f43f5e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .lead {
    font-size: 21px;
    color: #cbd5e1;
    line-height: 1.44;
    margin-top: 14px;
  }
  .lead strong { color: #ffffff; }
  .score-stack {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin: 22px 0;
  }
  .score-card {
    background: rgba(11, 20, 38, 0.92);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 22px;
    padding: 32px 38px;
  }
  .score-card.emerald { border-left: 6px solid #10b981; }
  .score-card.cyan { border-left: 6px solid #00e5ff; }
  .score-card.rose {
    background: linear-gradient(145deg, rgba(244, 63, 94, 0.16), rgba(11, 20, 38, 0.95));
    border: 1.5px solid rgba(244, 63, 94, 0.55);
    border-left: 6px solid #f43f5e;
  }
  .score-top {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .big-score {
    font-family: 'Outfit', sans-serif;
    font-size: 68px;
    font-weight: 900;
    line-height: 1;
  }
  .big-score.emerald { color: #10b981; }
  .big-score.cyan { color: #00e5ff; }
  .big-score.rose { color: #f43f5e; }
  .big-score small {
    font-size: 28px;
    color: #94a3b8;
    font-weight: 700;
  }
  .pill-badge {
    font-size: 14px;
    font-weight: 800;
    padding: 6px 14px;
    border-radius: 999px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .pill-badge.emerald {
    background: rgba(16, 185, 129, 0.14);
    border: 1px solid rgba(16, 185, 129, 0.4);
    color: #34d399;
  }
  .pill-badge.cyan {
    background: rgba(0, 229, 255, 0.14);
    border: 1px solid rgba(0, 229, 255, 0.4);
    color: #00e5ff;
  }
  .pill-badge.rose {
    background: rgba(244, 63, 94, 0.22);
    border: 1px solid rgba(244, 63, 94, 0.55);
    color: #fda4af;
  }
  .score-title {
    font-size: 24px;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 8px;
  }
  .score-desc {
    font-size: 19.5px;
    color: #cbd5e1;
    line-height: 1.44;
  }
  .score-desc strong { color: #ffffff; }
  .footer-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 18px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  .source-note {
    font-size: 14.5px;
    color: #94a3b8;
    font-weight: 600;
  }
  .swipe-cta {
    font-size: 18px;
    font-weight: 800;
    color: #00e5ff;
  }

  /* Page 2: 10-Hotel Ratings Table */
  .table-wrap {
    background: rgba(11, 20, 38, 0.92);
    border: 1px solid rgba(255, 255, 255, 0.13);
    border-radius: 22px;
    padding: 20px 26px;
    margin: 14px 0;
  }
  .t-head {
    display: grid;
    grid-template-columns: 1fr 112px 112px 124px;
    gap: 12px;
    align-items: center;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    font-size: 11.5px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #94a3b8;
  }
  .t-head div:not(:first-child) {
    text-align: center;
  }
  .t-row {
    display: grid;
    grid-template-columns: 1fr 112px 112px 124px;
    gap: 12px;
    align-items: center;
    padding: 13px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }
  .t-row:last-child {
    border-bottom: none;
  }
  .h-col {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .h-idx {
    width: 30px;
    height: 30px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.07);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 800;
    color: #94a3b8;
    flex-shrink: 0;
  }
  .h-title {
    font-size: 18px;
    font-weight: 800;
    color: #ffffff;
  }
  .h-hood {
    font-size: 14px;
    font-weight: 600;
    color: #94a3b8;
  }
  .h-note {
    font-size: 13.5px;
    color: #fda4af;
    margin-top: 2px;
    font-weight: 500;
  }
  .s-pill {
    font-family: 'Outfit', sans-serif;
    font-size: 24px;
    font-weight: 800;
    text-align: center;
    padding: 6px 0;
    border-radius: 10px;
  }
  .s-pill.emerald {
    background: rgba(16, 185, 129, 0.14);
    border: 1px solid rgba(16, 185, 129, 0.35);
    color: #34d399;
  }
  .s-pill.cyan {
    background: rgba(0, 229, 255, 0.12);
    border: 1px solid rgba(0, 229, 255, 0.35);
    color: #00e5ff;
  }
  .s-pill.rose {
    background: rgba(244, 63, 94, 0.18);
    border: 1px solid rgba(244, 63, 94, 0.5);
    color: #fb7185;
  }
  .avg-bar {
    display: grid;
    grid-template-columns: 1fr 112px 112px 124px;
    gap: 12px;
    align-items: center;
    padding-top: 14px;
    margin-top: 6px;
    border-top: 1.5px solid rgba(255, 255, 255, 0.18);
    font-weight: 800;
    font-size: 16px;
    color: #f8fafc;
  }
`;

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Outfit:wght@700;800;900&display=swap" rel="stylesheet">
<style>${styles}</style>
</head>
<body>

  <!-- PAGE 1: THE 3-CHANNEL SCOREBOARD -->
  <div class="page" id="page-1">
    <div class="top-bar">
      <div class="brand">Atmos<span>Vibe</span></div>
      <div class="page-pill">1 / 2</div>
    </div>

    <div>
      <div class="kicker">London 10 Lifestyle Hotel Audit</div>
      <h1>Hotels Lead With Their Vibe on <span class="cyan">Their Own Sites</span>—But Not on <span class="rose">Booking.com</span></h1>
      <p class="lead">How London’s 10 most iconic lifestyle hotels showcase their <strong>vibe &amp; experiences</strong> above the fold on their own sites vs. Booking.com:</p>
    </div>

    <div class="score-stack">
      <div class="score-card emerald">
        <div class="score-top">
          <div class="big-score emerald">92.5 <small>/ 100 avg</small></div>
          <div class="pill-badge emerald">1. Real-World Reality</div>
        </div>
        <div class="score-title">Real-World Property Vibe &amp; Experiences</div>
        <div class="score-desc">In real life, these 10 properties are extraordinary—combining <strong>iconic architecture, buzzing rooftop bars, and destination dining rooms</strong>.</div>
      </div>

      <div class="score-card cyan">
        <div class="score-top">
          <div class="big-score cyan">88.4 <small>/ 100 avg</small></div>
          <div class="pill-badge cyan">2. Own Homepage &amp; IG</div>
        </div>
        <div class="score-title">Own Website Homepage &amp; Instagram</div>
        <div class="score-desc">On their own homepage &amp; Instagram, hotels lead above the fold with their <strong>rooftops, restaurants, and atmosphere</strong>—keeping utility shots in room sub-pages.</div>
      </div>

      <div class="score-card rose">
        <div class="score-top">
          <div class="big-score rose">56.5 <small>/ 100 avg</small></div>
          <div class="pill-badge rose">3. Booking.com Top-5 Grid</div>
        </div>
        <div class="score-title">Booking.com Top-5 Hero Grid</div>
        <div class="score-desc">On Booking.com, the first 5 photos <strong>are</strong> your homepage—yet <strong>70% of those hero slots (35 of 50)</strong> are hijacked by repetitive beds, couches, sinks &amp; soap dispensers.</div>
      </div>
    </div>

    <div class="footer-bar">
      <div class="source-note">Source: AtmosVibe Multi-Channel Audit (10 London Hotels, 382 OTA Photos)</div>
      <div class="swipe-cta">Swipe for all 10 hotel ratings →</div>
    </div>
  </div>

  <!-- PAGE 2: THE 10-HOTEL RATINGS SCORECARD -->
  <div class="page" id="page-2">
    <div class="top-bar">
      <div class="brand">Atmos<span>Vibe</span></div>
      <div class="page-pill">2 / 2</div>
    </div>

    <div>
      <div class="kicker">The 10-Hotel Scorecard (0–100 Scale)</div>
      <h1>London Top 10 Lifestyle Hotels: <span class="cyan">Own Site</span> vs. <span class="rose">Booking.com</span></h1>
    </div>

    <div class="table-wrap">
      <div class="t-head">
        <div>Audited London Property</div>
        <div style="color:#34d399;">Real Vibe</div>
        <div style="color:#00e5ff;">Own Site</div>
        <div style="color:#fb7185;">Booking.com</div>
      </div>

      ${tableRowsHtml}

      <div class="avg-bar">
        <div style="padding-left:44px;">10-Hotel Cohort Average</div>
        <div style="text-align:center;color:#34d399;font-size:22px;">92.5</div>
        <div style="text-align:center;color:#00e5ff;font-size:22px;">88.4</div>
        <div style="text-align:center;color:#fb7185;font-size:22px;">56.5</div>
      </div>
    </div>

    <div class="footer-bar">
      <div class="source-note">Full interactive study pinned on @AtmosVibe</div>
      <div class="swipe-cta">atmosvibe.io/vibe-insights</div>
    </div>
  </div>

</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1080, height: 1350 },
  deviceScaleFactor: 2
});

await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

for (let i = 1; i <= 2; i++) {
  const el = await page.locator(`#page-${i}`);
  const fileName = `AtmosVibe-Infographic-Page-${i}.png`;
  const pubPath = path.join(publicDir, fileName);
  const artPath = path.join(artifactDir, fileName);
  await el.screenshot({ path: pubPath });
  fs.copyFileSync(pubPath, artPath);
  console.log(`Saved ${fileName}`);
}

const pdfName = 'AtmosVibe-London10-2Page-Infographic.pdf';
const pdfPubPath = path.join(publicDir, pdfName);
const pdfArtPath = path.join(artifactDir, pdfName);
await page.pdf({
  path: pdfPubPath,
  width: '1080px',
  height: '1350px',
  printBackground: true,
  margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
});
fs.copyFileSync(pdfPubPath, pdfArtPath);
console.log(`Saved ${pdfName}`);

await browser.close();
