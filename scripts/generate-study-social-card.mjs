import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LONDON_10_HOTELS } from '../src/data/london10StudyData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');
const artifactDir = 'C:/Users/Student/.gemini/antigravity/brain/1aab93db-7668-42c3-a55f-d4f72ca80c5b';

const rowsHtml = LONDON_10_HOTELS.map(
  (h) => `
    <div class="row">
      <div class="h-name">
        <span class="idx">#${h.index}</span>
        <div>
          <div class="title">${h.name}</div>
          <div class="dist">${h.neighborhood}</div>
        </div>
      </div>
      <div class="score s-green">${h.mathVibeScore}</div>
      <div class="score s-cyan">${h.ownPropertyDigitalScore}</div>
      <div class="score s-gold">${h.localDestinationDigitalScore}</div>
      <div class="score s-rose">${h.otaTop5Score}</div>
    </div>
  `
).join('');

const cardHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Outfit:wght@700;800;900&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1200px;
    height: 1050px;
    background: #040812;
    font-family: 'Inter', sans-serif;
    color: #ffffff;
    overflow: hidden;
  }
  .canvas {
    position: relative;
    width: 1200px;
    height: 1050px;
    padding: 42px 52px;
    background:
      radial-gradient(700px 450px at 20% 12%, rgba(0, 229, 255, 0.14), transparent 70%),
      radial-gradient(650px 420px at 85% 88%, rgba(255, 215, 0, 0.10), transparent 70%),
      linear-gradient(160deg, #040812 0%, #091326 60%, #040812 100%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 8px 18px;
    border-radius: 999px;
    background: rgba(0, 229, 255, 0.10);
    border: 1px solid rgba(0, 229, 255, 0.38);
    color: #00e5ff;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .brand {
    font-family: 'Outfit', sans-serif;
    font-size: 28px;
    font-weight: 800;
    letter-spacing: -0.02em;
  }
  .brand span { color: #00e5ff; }
  h1 {
    font-family: 'Outfit', sans-serif;
    font-size: 42px;
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -0.02em;
    margin-top: 14px;
  }
  h1 span { color: #00e5ff; }
  .sub {
    font-size: 18px;
    color: #cbd5e1;
    line-height: 1.45;
    margin-top: 8px;
  }
  .kpi-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin-top: 20px;
  }
  .kpi {
    background: rgba(11, 20, 38, 0.88);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 16px;
    padding: 16px 18px;
  }
  .kpi-label {
    font-size: 11.5px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .kpi-val {
    font-family: 'Outfit', sans-serif;
    font-size: 38px;
    font-weight: 800;
    line-height: 1.05;
    margin: 6px 0 4px;
  }
  .kpi-sub {
    font-size: 12.5px;
    color: #94a3b8;
    font-weight: 600;
  }
  .table-card {
    background: rgba(9, 16, 31, 0.9);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 18px;
    padding: 18px 24px;
    margin-top: 18px;
  }
  .table-head {
    display: grid;
    grid-template-columns: 2.3fr 1fr 1fr 1fr 1fr;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(255,255,255,0.12);
    font-size: 11.5px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #94a3b8;
  }
  .table-head div:not(:first-child) { text-align: center; }
  .row {
    display: grid;
    grid-template-columns: 2.3fr 1fr 1fr 1fr 1fr;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .row:last-child { border-bottom: none; }
  .h-name {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .idx {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: rgba(255,255,255,0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 800;
    color: #94a3b8;
  }
  .title { font-size: 16.5px; font-weight: 800; color: #ffffff; }
  .dist { font-size: 12px; color: #64748b; font-weight: 600; }
  .score {
    font-family: 'Outfit', sans-serif;
    font-size: 22px;
    font-weight: 800;
    text-align: center;
  }
  .s-green { color: #34d399; }
  .s-cyan { color: #00e5ff; }
  .s-gold { color: #ffd700; }
  .s-rose { color: #fb7185; }
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 14px;
    font-size: 14px;
    font-weight: 700;
    color: #cbd5e1;
  }
  .footer-url {
    color: #ffd700;
    font-weight: 800;
    letter-spacing: 0.03em;
  }
</style>
</head>
<body>
  <div class="canvas">
    <div>
      <div class="top-bar">
        <div class="badge">VIBE INSIGHTS STUDY #01 • AV-RES-2026-LON10</div>
        <div class="brand">Atmos<span>Vibe</span></div>
      </div>
      <h1>The 2026 London Lifestyle Hotel <span>Vibe Benchmark</span></h1>
      <p class="sub">Auditing 10 flagship London lifestyle hotels across Physical Reality, Owned Website &amp; Social (Own Property vs. Local Neighbourhood Vibe), and Booking.com Top-5 Hero Galleries.</p>

      <div class="kpi-grid">
        <div class="kpi">
          <div class="kpi-label" style="color:#34d399;">A. PHYSICAL VIBE</div>
          <div class="kpi-val" style="color:#34d399;">92.5</div>
          <div class="kpi-sub">Real-World Property &amp; District</div>
        </div>
        <div class="kpi">
          <div class="kpi-label" style="color:#00e5ff;">B1. OWNED — OWN VIBE</div>
          <div class="kpi-val" style="color:#00e5ff;">88.4</div>
          <div class="kpi-sub">Internal Bars &amp; Design</div>
        </div>
        <div class="kpi">
          <div class="kpi-label" style="color:#ffd700;">B2. OWNED — LOCAL VIBE</div>
          <div class="kpi-val" style="color:#ffd700;">45.5</div>
          <div class="kpi-sub">"Walled Garden" Blind Spot</div>
        </div>
        <div class="kpi">
          <div class="kpi-label" style="color:#fb7185;">C. OTA TOP-5 HERO</div>
          <div class="kpi-val" style="color:#fb7185;">56.5</div>
          <div class="kpi-sub">70% Rooms, Sinks &amp; Utility</div>
        </div>
      </div>

      <div class="table-card">
        <div class="table-head">
          <div>Audited London Property</div>
          <div>A. Physical</div>
          <div>B1. Own Vibe</div>
          <div>B2. Local Vibe</div>
          <div>C. OTA Top-5</div>
        </div>
        ${rowsHtml}
      </div>
    </div>

    <div class="footer">
      <span>Source: AtmosVibe Multi-Channel Vibe Signature Engine (n = 10 London Hotels, 382 OTA Photos)</span>
      <span class="footer-url">atmosvibe.io/vibe-insights</span>
    </div>
  </div>
</body>
</html>`;

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1200, height: 1050 },
    deviceScaleFactor: 1,
  });
  await page.setContent(cardHtml, { waitUntil: 'networkidle' });
  const outPublic = path.join(publicDir, 'AtmosVibe-LinkedIn-London10-Study-Card.png');
  const outArtifact = path.join(artifactDir, 'AtmosVibe-LinkedIn-London10-Study-Card.png');
  await page.screenshot({ path: outPublic, type: 'png' });
  fs.copyFileSync(outPublic, outArtifact);
  await browser.close();
  console.log('Generated AtmosVibe-LinkedIn-London10-Study-Card.png successfully.');
}

run();
