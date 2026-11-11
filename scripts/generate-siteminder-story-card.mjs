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
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Outfit:wght@700;800;900&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1200px;
    height: 980px;
    background: #040812;
    font-family: 'Inter', sans-serif;
    color: #ffffff;
    overflow: hidden;
  }
  .canvas {
    width: 1200px;
    height: 980px;
    padding: 44px 50px;
    background:
      radial-gradient(750px 450px at 18% 15%, rgba(0, 229, 255, 0.14), transparent 70%),
      radial-gradient(700px 450px at 85% 82%, rgba(244, 63, 94, 0.11), transparent 70%),
      linear-gradient(165deg, #040812 0%, #091326 55%, #040812 100%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .brand {
    font-family: 'Outfit', sans-serif;
    font-size: 28px;
    font-weight: 800;
  }
  .brand span { color: #00e5ff; }
  h1 {
    font-family: 'Outfit', sans-serif;
    font-size: 46px;
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -0.02em;
    margin-top: 0;
  }
  h1 span {
    background: linear-gradient(90deg, #00e5ff, #38bdf8, #ffd700);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .subtitle {
    font-size: 18.5px;
    color: #cbd5e1;
    margin-top: 8px;
    line-height: 1.4;
  }

  .section-box {
    background: rgba(11, 20, 38, 0.90);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 20px;
    padding: 24px 28px;
    margin-top: 22px;
    position: relative;
  }
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .step-tag {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #38bdf8;
  }
  .step-pill {
    background: rgba(56, 189, 248, 0.16);
    border: 1px solid rgba(56, 189, 248, 0.45);
    color: #38bdf8;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 11.5px;
    font-weight: 800;
  }
  .source-tag {
    font-size: 12.5px;
    font-weight: 700;
    color: #94a3b8;
  }
  .grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .sm-card {
    background: rgba(4, 8, 18, 0.78);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 14px;
    padding: 18px 20px;
  }
  .sm-num {
    font-family: 'Outfit', sans-serif;
    font-size: 40px;
    font-weight: 800;
    line-height: 1;
    color: #ffffff;
    margin-bottom: 8px;
  }
  .sm-num span {
    font-size: 20px;
    font-weight: 700;
    color: #94a3b8;
  }
  .sm-title {
    font-size: 15.5px;
    font-weight: 800;
    color: #f8fafc;
    margin-bottom: 6px;
  }
  .sm-desc {
    font-size: 13px;
    color: #94a3b8;
    line-height: 1.45;
  }

  /* Connector */
  .connector {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 14px 0 -8px;
  }
  .connector-pill {
    background: linear-gradient(90deg, rgba(0, 229, 255, 0.16), rgba(255, 215, 0, 0.16));
    border: 1px solid rgba(255, 215, 0, 0.4);
    color: #ffd700;
    font-size: 12.5px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 8px 22px;
    border-radius: 999px;
  }

  /* Block 2: AtmosVibe 3-Column Alignment */
  .av-card {
    background: rgba(4, 8, 18, 0.82);
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 16px;
    padding: 20px 22px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .av-kicker {
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 6px;
  }
  .av-score {
    font-family: 'Outfit', sans-serif;
    font-size: 42px;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 8px;
  }
  .av-score small {
    font-size: 17px;
    color: #64748b;
    font-weight: 700;
  }
  .av-heading {
    font-size: 16px;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 10px;
  }
  .bar-track {
    width: 100%;
    height: 8px;
    background: rgba(255,255,255,0.08);
    border-radius: 999px;
    overflow: hidden;
    margin-bottom: 12px;
  }
  .bar-fill {
    height: 100%;
    border-radius: 999px;
  }
  .av-desc {
    font-size: 13px;
    color: #cbd5e1;
    line-height: 1.45;
  }

  .cohort-box {
    background: rgba(15, 23, 42, 0.85);
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 14px;
    padding: 14px 20px;
    margin-top: 16px;
    font-size: 12.5px;
    color: #94a3b8;
    line-height: 1.5;
  }
  .cohort-box strong { color: #f8fafc; }
</style>
</head>
<body>
  <div class="canvas">
    <div>
      <div class="top-bar">
        <h1>The 2026 Hotel <span>Vibe Paradox</span></h1>
        <div class="brand">Atmos<span>Vibe</span></div>
      </div>
      <p class="subtitle">How travellers discover &amp; shortlist hotels in 2026 vs. how London’s top 10 lifestyle icons showcase their vibe on their own sites and Booking.com.</p>

      <!-- PART 1: SITEMINDER -->
      <div class="section-box">
        <div class="section-header">
          <div class="step-tag">
            <span class="step-pill">PART 1</span>
            <span>HOW TRAVELLERS SEARCH &amp; BUY IN 2026</span>
          </div>
          <span class="source-tag">Source: SiteMinder Changing Traveller Report 2026 (n = 12,000)</span>
        </div>

        <div class="grid-3">
          <div class="sm-card">
            <div class="sm-num" style="color:#00e5ff;">26% <span>vs 21%</span></div>
            <div class="sm-title">OTAs Overtook Search Engines</div>
            <div class="sm-desc">26% of travellers now start hotel research on an OTA (up from 18%), while search engines fell from 36% to 21%.</div>
          </div>

          <div class="sm-card">
            <div class="sm-num" style="color:#ffd700;">18% <span>(+3.3pp)</span></div>
            <div class="sm-title">Start on OTA → Book Direct</div>
            <div class="sm-desc">18% of guests who begin their search on an OTA ultimately switch to book directly on the hotel’s own website.</div>
          </div>

          <div class="sm-card">
            <div class="sm-num" style="color:#34d399;">58% <span>(+4pp)</span></div>
            <div class="sm-title">Prioritise Elevated Experiences</div>
            <div class="sm-desc">58% now choose superior or luxury stays—shifting toward meaningful, elevated on-property experiences &amp; vibe.</div>
          </div>
        </div>
      </div>

      <div class="connector">
        <div class="connector-pill">↓ HOW LONDON’S TOP 10 LIFESTYLE HOTELS SCORE ACROSS THAT JOURNEY ↓</div>
      </div>

      <!-- PART 2: ATMOSVIBE (3 PILLARS MATCHING THE 3 SITEMINDER BOXES) -->
      <div class="section-box" style="border-color: rgba(0, 229, 255, 0.28);">
        <div class="section-header">
          <div class="step-tag" style="color:#00e5ff;">
            <span class="step-pill" style="background:rgba(0,229,255,0.16);border-color:rgba(0,229,255,0.45);color:#00e5ff;">PART 2</span>
            <span>THE 2026 LONDON LIFESTYLE HOTEL VIBE BENCHMARK</span>
          </div>
          <span class="source-tag">Source: AtmosVibe Multi-Channel Audit (n = 10 London Hotels, 382 OTA Photos)</span>
        </div>

        <div class="grid-3">
          <div class="av-card">
            <div>
              <div class="av-kicker" style="color:#34d399;">1. REAL-WORLD REALITY</div>
              <div class="av-score" style="color:#34d399;">92.5<small> / 100</small></div>
              <div class="av-heading">Physical Property Vibe</div>
              <div class="bar-track"><div class="bar-fill" style="width:92.5%;background:#34d399;"></div></div>
            </div>
            <div class="av-desc">Extraordinary real-world architecture, destination rooftop bars, high-energy dining rooms, and interior design.</div>
          </div>

          <div class="av-card">
            <div>
              <div class="av-kicker" style="color:#00e5ff;">2. OWNED WEBSITE &amp; INSTAGRAM</div>
              <div class="av-score" style="color:#00e5ff;">88.4<small> / 100</small></div>
              <div class="av-heading">Owned Digital Vibe Score</div>
              <div class="bar-track"><div class="bar-fill" style="width:88.4%;background:#00e5ff;"></div></div>
            </div>
            <div class="av-desc">When travellers land on the hotel’s own site or Instagram, properties excel at showcasing their bars, dining, and atmosphere.</div>
          </div>

          <div class="av-card" style="border-color:rgba(244,63,94,0.42);">
            <div>
              <div class="av-kicker" style="color:#fb7185;">3. BOOKING.COM TOP-5 HEROES</div>
              <div class="av-score" style="color:#fb7185;">56.5<small> / 100</small></div>
              <div class="av-heading">OTA Discovery Vibe Score</div>
              <div class="bar-track"><div class="bar-fill" style="width:56.5%;background:#fb7185;"></div></div>
            </div>
            <div class="av-desc">Where discovery starts, 70% of Top-5 photos default to beds, sinks &amp; utility—burying the very vibe that wins the shortlist.</div>
          </div>
        </div>

        <div class="cohort-box">
          <strong>10 Audited London Lifestyle Icons:</strong> Sea Containers London (91.3 Real → 64 OTA) • The Hoxton, Southwark (91.5 → 49) • One Hundred Shoreditch (91.8 → 68) • The Hoxton, Shoreditch (92.4 → 54) • Hart Shoreditch (89.6 → 58) • The Standard, London (92.8 → 48) • The London EDITION (94.6 → 44) • Treehouse London (92.1 → 72) • The Mandrake (93.4 → 66) • The Ned (95.1 → 42)
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1200, height: 980 },
    deviceScaleFactor: 1,
  });
  await page.setContent(html, { waitUntil: 'networkidle' });
  const outPublic = path.join(publicDir, 'AtmosVibe-SiteMinder-Vibe-Story-Card.png');
  const outArtifact = path.join(artifactDir, 'AtmosVibe-SiteMinder-Vibe-Story-Card.png');
  await page.screenshot({ path: outPublic, type: 'png' });
  fs.copyFileSync(outPublic, outArtifact);
  await browser.close();
  console.log('Generated 3x3 AtmosVibe-SiteMinder-Vibe-Story-Card.png successfully.');
}

run();
