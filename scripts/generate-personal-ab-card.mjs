import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');
const artifactDir = 'C:/Users/Student/.gemini/antigravity/brain/1aab93db-7668-42c3-a55f-d4f72ca80c5b';

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 980px;
    height: 620px;
    background: #070e1c;
    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
    color: #ffffff;
    padding: 26px 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .title {
    font-size: 23.5px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #ffffff;
    white-space: nowrap;
  }
  .title span {
    color: #00e5ff;
  }
  .badge {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.18);
    padding: 5px 13px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 800;
    color: #e2e8f0;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .ab-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .card {
    background: #0e192d;
    border-radius: 16px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 11px;
  }
  .card.hotel-a {
    border: 1.5px solid rgba(251, 113, 133, 0.45);
  }
  .card.hotel-b {
    border: 1.5px solid rgba(52, 211, 153, 0.55);
    background: linear-gradient(160deg, rgba(16, 185, 129, 0.09), #0e192d 65%);
  }

  .card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .option-pill {
    font-size: 12px;
    font-weight: 800;
    padding: 4px 10px;
    border-radius: 7px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .hotel-a .option-pill {
    background: rgba(251, 113, 133, 0.18);
    color: #fda4af;
  }
  .hotel-b .option-pill {
    background: rgba(52, 211, 153, 0.2);
    color: #34d399;
  }
  .card-tag {
    font-size: 12px;
    font-weight: 700;
    color: #94a3b8;
  }

  /* 3-photo mini collage inside each card */
  .photo-grid {
    display: grid;
    grid-template-columns: 1.25fr 1fr;
    grid-template-rows: 138px 138px;
    gap: 8px;
    border-radius: 11px;
    overflow: hidden;
  }
  .photo-main {
    grid-row: 1 / span 2;
    position: relative;
    overflow: hidden;
  }
  .photo-sub {
    position: relative;
    overflow: hidden;
  }
  .photo-grid img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .img-label {
    position: absolute;
    bottom: 7px;
    left: 7px;
    background: rgba(7, 14, 28, 0.88);
    border: 1px solid rgba(255,255,255,0.18);
    color: #f8fafc;
    font-size: 10.5px;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 6px;
  }

  .card-caption {
    font-size: 15px;
    font-weight: 800;
    color: #f8fafc;
    line-height: 1.3;
  }
  .card-sub {
    font-size: 12.8px;
    color: #94a3b8;
    line-height: 1.35;
    margin-top: 3px;
  }

  .footer-strip {
    background: #0c1628;
    border: 1px solid #1e293b;
    border-radius: 12px;
    padding: 12px 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    font-size: 13px;
    color: #cbd5e1;
  }
  .footer-strip strong.cyan { color: #00e5ff; }
  .footer-strip strong.gold { color: #facc15; }
  .footer-strip strong.rose { color: #fb7185; }
  .brand-mark {
    font-weight: 800;
    font-size: 14.5px;
    color: #ffffff;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .brand-mark span { color: #00e5ff; }
</style>
</head>
<body>

  <div class="header">
    <div class="title">You’re booking a weekend in London. <span>Which hotel gets your click?</span></div>
    <div class="badge">Weakest vs. Strongest in Study</div>
  </div>

  <div class="ab-grid">
    <!-- HOTEL A: SINGLE REAL HOTEL (THE NED - WEAKEST ON LOCAL AREA & OTA CONTEXT) -->
    <div class="card hotel-a">
      <div class="card-top">
        <span class="option-pill">Hotel A • Only Promotes Itself</span>
        <span class="card-tag">Local Area Score: 31 / 100</span>
      </div>

      <div class="photo-grid">
        <div class="photo-main">
          <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/286553896.jpg?k=4590082834acee225ac0d1a76104d8ec96314996fbf3549114fe03f4e8aa4e25&o=" />
          <span class="img-label">Indoor Bedroom</span>
        </div>
        <div class="photo-sub">
          <img src="https://cf.bstatic.com/xdata/images/hotel/max500/787726337.jpg?k=9fb90a5781a1d70d8a99a04eee4b05e7f7ed9f6916eb221a990c4001ea29d68a&o=" />
          <span class="img-label">Windowless Lounge</span>
        </div>
        <div class="photo-sub">
          <img src="https://cf.bstatic.com/xdata/images/hotel/max300/787726373.jpg?k=a1e5063f13e07e430a4c322066245ed753141d9664a366452bb4b04138f621f5&o=" />
          <span class="img-label">Bathroom Tub &amp; Sink</span>
        </div>
      </div>

      <div>
        <div class="card-caption">100% inward-facing (rooms, couch &amp; bathroom)</div>
        <div class="card-sub">Sits 6 mins from St Paul’s &amp; Leadenhall Market—yet shows zero trace of the neighbourhood outside.</div>
      </div>
    </div>

    <!-- HOTEL B: SINGLE REAL HOTEL (THE HOXTON SHOREDITCH - STRONGEST ON LOCAL AREA 66/100) -->
    <div class="card hotel-b">
      <div class="card-top">
        <span class="option-pill">Hotel B • Vibe + Local Area</span>
        <span class="card-tag">Local Area Score: 66 / 100 (#1)</span>
      </div>

      <div class="photo-grid">
        <div class="photo-main">
          <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/826978849.jpg?k=dd8a4f639311a9aa1e2a24f4a7037b286e8e34361eeb30caaf6db5ebbd0bbc1a&o=" />
          <span class="img-label">Signature Fireplace Lobby</span>
        </div>
        <div class="photo-sub">
          <img src="https://cf.bstatic.com/xdata/images/hotel/max300/504725240.jpg?k=8188b725acf5314dd3992f338ef4aaa268dfccd85b2022f8f71632fd86202c90&o=" />
          <span class="img-label">Glasshouse Dining Vibe</span>
        </div>
        <div class="photo-sub">
          <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80" />
          <span class="img-label">Curated Local Area Guide</span>
        </div>
      </div>

      <div>
        <div class="card-caption">Pairs its on-site vibe with a local neighbourhood guide</div>
        <div class="card-sub">Connects its lobby &amp; dining to Columbia Road, Brick Lane &amp; East London indie spots.</div>
      </div>
    </div>
  </div>

  <div class="footer-strip">
    <div>
      <strong>London 10-Hotel Audit:</strong> Top hotels score <strong class="cyan">88/100</strong> promoting their own bars, but drop to <strong class="gold">45/100</strong> on their local area (<strong class="rose">84%</strong> of OTA hero photos show zero destination context).
    </div>
    <div class="brand-mark">Atmos<span>Vibe</span></div>
  </div>

</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 980, height: 620 },
  deviceScaleFactor: 1.5,
});

await page.setContent(html, { waitUntil: 'networkidle' });

const fileName = 'AtmosVibe-Personal-Hotel-A-vs-B.png';
const v4Name = 'AtmosVibe-Personal-Hotel-A-vs-B-v4.png';
const pubPath = path.join(publicDir, fileName);
const artPath = path.join(artifactDir, fileName);
const artV4Path = path.join(artifactDir, v4Name);

await page.screenshot({ path: pubPath });
fs.copyFileSync(pubPath, artPath);
fs.copyFileSync(pubPath, artV4Path);
console.log(`Saved ${fileName}`);

await browser.close();
