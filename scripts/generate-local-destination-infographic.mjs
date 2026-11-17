import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LONDON_10_HOTELS } from '../src/data/london10StudyData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');
const artifactDir = 'C:/Users/Student/.gemini/antigravity/brain/1aab93db-7668-42c3-a55f-d4f72ca80c5b';

// Sort hotels from highest Local Vibe to lowest so it reads like a clean leaderboard
const sortedHotels = [...LONDON_10_HOTELS].sort(
  (a, b) => b.localDestinationDigitalScore - a.localDestinationDigitalScore
);

const tableRowsHtml = sortedHotels
  .map((h, i) => {
    const localColor =
      h.localDestinationDigitalScore >= 60
        ? 'emerald'
        : h.localDestinationDigitalScore >= 40
        ? 'gold'
        : 'rose';

    return `
    <div class="t-row">
      <div class="h-col">
        <span class="h-idx">${i + 1}</span>
        <span class="h-title">${h.name}</span>
        <span class="h-hood">${h.neighborhood}</span>
      </div>
      <div class="s-pill cyan">${h.ownPropertyDigitalScore}</div>
      <div class="s-pill ${localColor}">${h.localDestinationDigitalScore}</div>
    </div>
  `;
  })
  .join('');

const styles = `
  @page {
    size: 800px 800px;
    margin: 0;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 800px;
    background: #060d1b;
    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
    color: #ffffff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .page {
    width: 800px;
    height: 800px;
    padding: 44px 52px;
    background: #060d1b;
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
    font-size: 26px;
    font-weight: 800;
    letter-spacing: -0.02em;
  }
  .brand span { color: #00e5ff; }
  .page-pill {
    background: #0f1b31;
    border: 1px solid #233554;
    padding: 5px 14px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 700;
    color: #94a3b8;
  }
  .kicker {
    display: inline-block;
    background: #1a1b12;
    border: 1px solid #eab308;
    color: #facc15;
    padding: 5px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 12px;
  }
  h1 {
    font-size: 38px;
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -0.02em;
  }
  h1 span.cyan { color: #00e5ff; }
  h1 span.gold { color: #facc15; }
  h1 span.rose { color: #fb7185; }
  .lead {
    font-size: 17px;
    color: #cbd5e1;
    line-height: 1.4;
    margin-top: 8px;
  }

  /* Compact 3-Row Stat Cards on Page 1 */
  .score-stack {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin: 12px 0;
  }
  .score-card {
    background: #0c172c;
    border: 1px solid #1e293b;
    border-radius: 16px;
    padding: 22px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }
  .score-card.cyan { border-left: 6px solid #00e5ff; }
  .score-card.gold { border-left: 6px solid #facc15; border-color: rgba(250, 204, 21, 0.35); }
  .score-card.rose { border-left: 6px solid #fb7185; border-color: rgba(251, 113, 133, 0.35); }

  .score-left {
    flex: 1;
  }
  .pill-badge {
    display: inline-block;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 4px;
  }
  .pill-badge.cyan { color: #00e5ff; }
  .pill-badge.gold { color: #facc15; }
  .pill-badge.rose { color: #fb7185; }

  .score-title {
    font-size: 21px;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 4px;
  }
  .score-desc {
    font-size: 15px;
    color: #94a3b8;
    line-height: 1.35;
  }
  .big-score {
    font-size: 52px;
    font-weight: 900;
    line-height: 1;
    text-align: right;
    white-space: nowrap;
  }
  .big-score.cyan { color: #00e5ff; }
  .big-score.gold { color: #facc15; }
  .big-score.rose { color: #fb7185; }
  .big-score small {
    display: block;
    font-size: 14px;
    color: #64748b;
    font-weight: 700;
    margin-top: 4px;
  }

  .footer-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 14px;
    border-top: 1px solid #1e293b;
  }
  .source-note {
    font-size: 13px;
    color: #94a3b8;
    font-weight: 600;
  }
  .swipe-cta {
    font-size: 15px;
    font-weight: 800;
    color: #00e5ff;
  }

  /* Page 2: Ultra-Clean 2-Score Table */
  .table-wrap {
    background: #0c172c;
    border: 1px solid #1e293b;
    border-radius: 16px;
    padding: 14px 22px;
    margin: 8px 0;
  }
  .t-head {
    display: grid;
    grid-template-columns: 1fr 110px 110px;
    gap: 10px;
    align-items: center;
    padding-bottom: 8px;
    border-bottom: 1px solid #1e293b;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #94a3b8;
  }
  .t-head div:not(:first-child) {
    text-align: center;
  }
  .t-row {
    display: grid;
    grid-template-columns: 1fr 110px 110px;
    gap: 10px;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
  .t-row:last-child {
    border-bottom: none;
  }
  .h-col {
    display: flex;
    align-items: baseline;
    gap: 10px;
    overflow: hidden;
    white-space: nowrap;
  }
  .h-idx {
    width: 22px;
    font-size: 12px;
    font-weight: 800;
    color: #64748b;
    flex-shrink: 0;
  }
  .h-title {
    font-size: 15.5px;
    font-weight: 800;
    color: #ffffff;
  }
  .h-hood {
    font-size: 12.5px;
    font-weight: 600;
    color: #64748b;
  }
  .s-pill {
    font-size: 17px;
    font-weight: 800;
    text-align: center;
    padding: 3px 0;
    border-radius: 7px;
  }
  .s-pill.emerald {
    background: rgba(16, 185, 129, 0.14);
    color: #34d399;
  }
  .s-pill.cyan {
    background: rgba(0, 229, 255, 0.12);
    color: #00e5ff;
  }
  .s-pill.gold {
    background: rgba(250, 204, 21, 0.14);
    color: #facc15;
  }
  .s-pill.rose {
    background: rgba(244, 63, 94, 0.16);
    color: #fb7185;
  }
  .avg-bar {
    display: grid;
    grid-template-columns: 1fr 110px 110px;
    gap: 10px;
    align-items: center;
    padding-top: 10px;
    margin-top: 4px;
    border-top: 1.5px solid #334155;
    font-weight: 800;
    font-size: 15px;
    color: #f8fafc;
  }
`;

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<style>${styles}</style>
</head>
<body>

  <!-- PAGE 1: COMPACT 3-STAT SUMMARY -->
  <div class="page" id="page-1">
    <div class="top-bar">
      <div class="brand">Atmos<span>Vibe</span></div>
      <div class="page-pill">1 / 2</div>
    </div>

    <div>
      <div class="kicker">London 10 Hotel Audit • Part II</div>
      <h1>Hotels Market Their <span class="cyan">Own Bars</span>—Why Hide Their <span class="gold">Neighbourhood</span>?</h1>
      <p class="lead">Guests book a neighbourhood first—yet London’s top 10 lifestyle hotels market themselves like closed islands:</p>
    </div>

    <div class="score-stack">
      <div class="score-card cyan">
        <div class="score-left">
          <div class="pill-badge cyan">1. Own Website &amp; Instagram</div>
          <div class="score-title">In-House Bars, Rooftops &amp; Rooms</div>
          <div class="score-desc">Hotels strongly promote their own internal F&amp;B and design.</div>
        </div>
        <div class="big-score cyan">88.4<small>/ 100 avg</small></div>
      </div>

      <div class="score-card gold">
        <div class="score-left">
          <div class="pill-badge gold">2. Own Website &amp; Instagram</div>
          <div class="score-title">Local Neighbourhood Storytelling</div>
          <div class="score-desc"><strong>-42.9 pt drop:</strong> 7 of 10 barely show the area outside their doors.</div>
        </div>
        <div class="big-score gold">45.5<small>/ 100 avg</small></div>
      </div>

      <div class="score-card rose">
        <div class="score-left">
          <div class="pill-badge rose">3. Booking Top-5 Hero Photos</div>
          <div class="score-title">OTA Hero Slots Showing Local Area</div>
          <div class="score-desc"><strong>84% of hero slots (42/50)</strong> show zero street or skyline context.</div>
        </div>
        <div class="big-score rose">16%<small>8 of 50 slots</small></div>
      </div>
    </div>

    <div class="footer-bar">
      <div class="source-note">AtmosVibe Benchmark • 10 Flagship London Hotels</div>
      <div class="swipe-cta">Swipe for 10-hotel scores →</div>
    </div>
  </div>

  <!-- PAGE 2: COMPACT 2-COLUMN SCORECARD -->
  <div class="page" id="page-2">
    <div class="top-bar">
      <div class="brand">Atmos<span>Vibe</span></div>
      <div class="page-pill">2 / 2</div>
    </div>

    <div>
      <div class="kicker">Ranked by Local Neighbourhood Score</div>
      <h1>Own Vibe (<span class="cyan">88.4</span>) vs. Local Area (<span class="gold">45.5</span>)</h1>
    </div>

    <div class="table-wrap">
      <div class="t-head">
        <div>London Lifestyle Hotel</div>
        <div style="color:#00e5ff;">Own Vibe</div>
        <div style="color:#facc15;">Local Area</div>
      </div>

      ${tableRowsHtml}

      <div class="avg-bar">
        <div style="padding-left:32px;">10-Hotel Average</div>
        <div style="text-align:center;color:#00e5ff;font-size:18px;">88.4</div>
        <div style="text-align:center;color:#facc15;font-size:18px;">45.5</div>
      </div>
    </div>

    <div class="footer-bar">
      <div class="source-note">Full study on AtmosVibe Vibe Insights</div>
      <div class="swipe-cta">atmosvibe.io/vibe-insights</div>
    </div>
  </div>

</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 800, height: 800 },
  deviceScaleFactor: 1.5,
});

await page.setContent(html, { waitUntil: 'load' });

for (let i = 1; i <= 2; i++) {
  const el = await page.locator(`#page-${i}`);
  const fileName = `AtmosVibe-Local-Destination-Page-${i}.png`;
  const v2FileName = `AtmosVibe-Local-Destination-Compact-Page-${i}.png`;
  const pubPath = path.join(publicDir, fileName);
  const artPath = path.join(artifactDir, fileName);
  const artV2Path = path.join(artifactDir, v2FileName);
  await el.screenshot({ path: pubPath });
  fs.copyFileSync(pubPath, artPath);
  fs.copyFileSync(pubPath, artV2Path);
  console.log(`Saved ${fileName}`);
}

const pdfName = 'AtmosVibe-Local-Destination-2Page-Infographic.pdf';
const pdfPubPath = path.join(publicDir, pdfName);
const pdfArtPath = path.join(artifactDir, pdfName);
await page.pdf({
  path: pdfPubPath,
  width: '800px',
  height: '800px',
  printBackground: true,
  margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
});
fs.copyFileSync(pdfPubPath, pdfArtPath);
const stats = fs.statSync(pdfPubPath);
console.log(`Saved ${pdfName} (${(stats.size / 1024).toFixed(1)} KB)`);

await browser.close();
