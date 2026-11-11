import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LONDON_10_HOTELS } from '../src/data/london10StudyData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');
const artifactDir = 'C:/Users/Student/.gemini/antigravity/brain/1aab93db-7668-42c3-a55f-d4f72ca80c5b';

const getSlotImg = (hotelId, slotNum) => {
  const h = LONDON_10_HOTELS.find((x) => x.id === hotelId);
  const s = h?.top5.find((x) => x.slot === slotNum);
  return s?.imageUrl || '';
};

const imgHoxtonSouthwarkSoap = getSlotImg('hoxton-southwark', 3);
const imgHoxtonSouthwarkGym = getSlotImg('hoxton-southwark', 5);
const imgHoxtonShoreditchSink = getSlotImg('hoxton-shoreditch', 2);
const imgSeaContainersCouch = getSlotImg('sea-containers', 2);

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Outfit:wght@700;800;900&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1200px;
    height: 1200px;
    background: #040812;
    font-family: 'Inter', sans-serif;
    color: #ffffff;
    overflow: hidden;
  }
  .canvas {
    width: 1200px;
    height: 1200px;
    padding: 42px 48px;
    background:
      radial-gradient(700px 420px at 18% 12%, rgba(244, 63, 94, 0.14), transparent 70%),
      radial-gradient(650px 420px at 85% 88%, rgba(0, 229, 255, 0.12), transparent 70%),
      linear-gradient(160deg, #040812 0%, #091326 60%, #040812 100%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .top-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 16px;
    border-radius: 999px;
    background: rgba(244, 63, 94, 0.14);
    border: 1px solid rgba(244, 63, 94, 0.45);
    color: #fda4af;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .brand {
    font-family: 'Outfit', sans-serif;
    font-size: 28px;
    font-weight: 800;
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
  h1 span { color: #fb7185; }
  .sub {
    font-size: 18px;
    color: #cbd5e1;
    margin-top: 8px;
    line-height: 1.45;
  }
  .grid-2x2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-top: 20px;
  }
  .card {
    background: rgba(11, 20, 38, 0.92);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 18px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .img-wrap {
    position: relative;
    height: 250px;
    width: 100%;
    overflow: hidden;
    background: #050811;
  }
  .img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .slot-badge {
    position: absolute;
    top: 14px;
    left: 14px;
    background: rgba(4, 8, 18, 0.88);
    border: 1px solid rgba(255,255,255,0.2);
    color: #ffffff;
    font-size: 12px;
    font-weight: 800;
    padding: 5px 12px;
    border-radius: 8px;
    letter-spacing: 0.06em;
  }
  .drag-badge {
    position: absolute;
    top: 14px;
    right: 14px;
    background: #f43f5e;
    color: #ffffff;
    font-size: 12px;
    font-weight: 800;
    padding: 5px 12px;
    border-radius: 8px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  .card-body {
    padding: 16px 20px;
  }
  .hotel-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
  }
  .hotel-name {
    font-size: 18px;
    font-weight: 800;
    color: #ffffff;
  }
  .hotel-scores {
    font-size: 13px;
    font-weight: 800;
    color: #34d399;
  }
  .hotel-scores span { color: #fb7185; }
  .issue {
    font-size: 14.5px;
    font-weight: 700;
    color: #fda4af;
    margin-bottom: 4px;
  }
  .missing {
    font-size: 13px;
    color: #94a3b8;
  }
  .bottom-summary {
    background: rgba(15, 23, 42, 0.92);
    border: 1px solid rgba(0, 229, 255, 0.3);
    border-radius: 16px;
    padding: 18px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 18px;
  }
  .stat-item {
    text-align: center;
  }
  .stat-val {
    font-family: 'Outfit', sans-serif;
    font-size: 30px;
    font-weight: 800;
  }
  .stat-lbl {
    font-size: 12px;
    font-weight: 700;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 700;
    color: #cbd5e1;
    padding-top: 8px;
  }
  .footer span:last-child { color: #ffd700; font-weight: 800; }
</style>
</head>
<body>
  <div class="canvas">
    <div>
      <div class="top-row">
        <div class="eyebrow">LIVE BOOKING.COM TOP-5 AUDIT • 10 LONDON ICONS</div>
        <div class="brand">Atmos<span>Vibe</span></div>
      </div>
      <h1>Why Do 92/100 Lifestyle Hotels Show <span>Sinks, Soap &amp; Treadmills</span> in Their Top 5?</h1>
      <p class="sub">70% of Booking.com Top-5 Hero photos (35 of 50 slots) across London’s top 10 lifestyle hotels are repetitive beds, couches, toiletries, boardrooms, and gym equipment:</p>

      <div class="grid-2x2">
        <div class="card">
          <div class="img-wrap">
            <img src="${imgHoxtonSouthwarkSoap}" />
            <span class="slot-badge">THE HOXTON, SOUTHWARK • SLOT #3</span>
            <span class="drag-badge">3 Soap Bottles</span>
          </div>
          <div class="card-body">
            <div class="hotel-row">
              <span class="hotel-name">The Hoxton, Southwark (Slot #3)</span>
              <span class="hotel-scores">91.5 Real → <span>49 OTA</span></span>
            </div>
            <div class="issue">Slot #3 Hero: Close-up of 3 brown shower gel bottles</div>
            <div class="missing">Missing from Top 5: Seabird 14th-floor rooftop restaurant</div>
          </div>
        </div>

        <div class="card">
          <div class="img-wrap">
            <img src="${imgHoxtonSouthwarkGym}" />
            <span class="slot-badge">THE HOXTON, SOUTHWARK • SLOT #5</span>
            <span class="drag-badge">Gym Equipment</span>
          </div>
          <div class="card-body">
            <div class="hotel-row">
              <span class="hotel-name">The Hoxton, Southwark (Slot #5)</span>
              <span class="hotel-scores">91.5 Real → <span>49 OTA</span></span>
            </div>
            <div class="issue">Slot #5 Hero: Empty basement gym racks &amp; treadmills</div>
            <div class="missing">Missing from Top 5: Albie lobby bar &amp; South Bank skyline</div>
          </div>
        </div>

        <div class="card">
          <div class="img-wrap">
            <img src="${imgHoxtonShoreditchSink}" />
            <span class="slot-badge">THE HOXTON, SHOREDITCH • SLOT #2</span>
            <span class="drag-badge">Bathroom Sink</span>
          </div>
          <div class="card-body">
            <div class="hotel-row">
              <span class="hotel-name">The Hoxton, Shoreditch</span>
              <span class="hotel-scores">92.4 Real → <span>54 OTA</span></span>
            </div>
            <div class="issue">Slot #2: Bathroom vanity sink (#3 is a boardroom table)</div>
            <div class="missing">Missing from Top 5: Llama Inn rooftop &amp; Hoxton lobby bar</div>
          </div>
        </div>

        <div class="card">
          <div class="img-wrap">
            <img src="${imgSeaContainersCouch}" />
            <span class="slot-badge">SEA CONTAINERS LONDON • SLOTS #2–#5</span>
            <span class="drag-badge">4 Suite Couches</span>
          </div>
          <div class="card-body">
            <div class="hotel-row">
              <span class="hotel-name">Sea Containers London</span>
              <span class="hotel-scores">91.3 Real → <span>64 OTA</span></span>
            </div>
            <div class="issue">Slots #2, #3, #4 &amp; #5: Four repetitive living-room couches &amp; bed</div>
            <div class="missing">Missing from Top 5: Lyaness &amp; 12th Knot St Paul’s rooftop</div>
          </div>
        </div>
      </div>

      <div class="bottom-summary">
        <div class="stat-item">
          <div class="stat-val" style="color:#34d399;">92.5 / 100</div>
          <div class="stat-lbl">A. Physical Vibe Avg</div>
        </div>
        <div class="stat-item">
          <div class="stat-val" style="color:#00e5ff;">88.4 / 100</div>
          <div class="stat-lbl">B1. Own Property Digital</div>
        </div>
        <div class="stat-item">
          <div class="stat-val" style="color:#ffd700;">45.5 / 100</div>
          <div class="stat-lbl">B2. Local Neighbourhood Vibe</div>
        </div>
        <div class="stat-item">
          <div class="stat-val" style="color:#fb7185;">56.5 / 100</div>
          <div class="stat-lbl">C. Booking.com Top-5 Score</div>
        </div>
      </div>
    </div>

    <div class="footer">
      <span>AtmosVibe 2026 London Lifestyle Hotel Vibe Benchmark (n = 10 Hotels, 382 OTA Photos)</span>
      <span>atmosvibe.io/vibe-insights</span>
    </div>
  </div>
</body>
</html>`;

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1200, height: 1200 },
    deviceScaleFactor: 1,
  });
  await page.setContent(html, { waitUntil: 'networkidle' });
  const outPublic = path.join(publicDir, 'AtmosVibe-LinkedIn-Personal-Post-Visual-Proof.png');
  const outArtifact = path.join(artifactDir, 'AtmosVibe-LinkedIn-Personal-Post-Visual-Proof.png');
  await page.screenshot({ path: outPublic, type: 'png' });
  fs.copyFileSync(outPublic, outArtifact);
  await browser.close();
  console.log('Generated AtmosVibe-LinkedIn-Personal-Post-Visual-Proof.png with live photos.');
}

run();
