import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.resolve(__dirname, '../public');
const artifactDir = 'C:/Users/Student/.gemini/antigravity/brain/1aab93db-7668-42c3-a55f-d4f72ca80c5b';

const logoSvgPath = path.join(publicDir, 'models', 'atmosVibe4.svg');
const logoSvgBase64 = fs.existsSync(logoSvgPath)
  ? `data:image/svg+xml;base64,${fs.readFileSync(logoSvgPath).toString('base64')}`
  : '';

const heroImg1Path = path.join(artifactDir, 'london_10_slot1_1_sea-containers.jpg');
const heroImg2Path = path.join(artifactDir, 'london_10_slot1_6_the-standard-london.jpg');
const heroImg3Path = path.join(artifactDir, 'london_10_slot1_9_the-mandrake.jpg');

const toDataUri = (p) =>
  fs.existsSync(p) ? `data:image/jpeg;base64,${fs.readFileSync(p).toString('base64')}` : '';

const img1Uri = toDataUri(heroImg1Path);
const img2Uri = toDataUri(heroImg2Path);
const img3Uri = toDataUri(heroImg3Path);

const option1Html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Outfit:wght@600;700;800;900&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 2256px;
    height: 382px;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
    background: #040812;
    color: #ffffff;
  }
  .canvas {
    position: relative;
    width: 2256px;
    height: 382px;
    background:
      radial-gradient(900px 420px at 32% 50%, rgba(0, 229, 255, 0.13), transparent 70%),
      radial-gradient(750px 380px at 82% 45%, rgba(255, 215, 0, 0.10), transparent 70%),
      linear-gradient(135deg, #040812 0%, #091326 55%, #050a16 100%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* Left padding leaves 300px safe zone for LinkedIn's overlapping company logo on desktop/mobile */
    padding: 0 72px 0 310px;
  }
  .grid-overlay {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.028) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.028) 1px, transparent 1px);
    background-size: 44px 44px;
    pointer-events: none;
  }
  .bottom-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #00e5ff 0%, #10b981 50%, #ffd700 100%);
  }
  .left-col {
    position: relative;
    z-index: 2;
    max-width: 1120px;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 8px 20px;
    border-radius: 999px;
    background: rgba(10, 20, 38, 0.85);
    border: 1px solid rgba(0, 229, 255, 0.35);
    margin-bottom: 18px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  }
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 10px #10b981;
  }
  .badge-tag {
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0.14em;
    color: #00e5ff;
    text-transform: uppercase;
  }
  .badge-div {
    width: 1px;
    height: 14px;
    background: rgba(255,255,255,0.2);
  }
  .badge-text {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #e2e8f0;
    text-transform: uppercase;
  }
  h1 {
    font-family: 'Outfit', sans-serif;
    font-size: 56px;
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -0.02em;
    color: #ffffff;
    margin-bottom: 14px;
  }
  h1 span {
    background: linear-gradient(90deg, #00e5ff, #38bdf8, #ffd700);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .sub {
    font-size: 23px;
    font-weight: 500;
    color: #cbd5e1;
    letter-spacing: -0.01em;
  }
  .right-col {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 690px;
  }
  .glass-panel {
    background: rgba(11, 20, 38, 0.82);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 18px;
    padding: 20px 24px;
    box-shadow: 0 20px 45px rgba(0,0,0,0.55);
  }
  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .panel-title {
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #00e5ff;
  }
  .panel-domain {
    font-size: 14px;
    font-weight: 800;
    color: #ffd700;
    letter-spacing: 0.04em;
  }
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  .metric-box {
    background: rgba(4, 8, 18, 0.75);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .m-label {
    font-size: 13px;
    font-weight: 700;
    color: #cbd5e1;
  }
  .m-sub {
    font-size: 11px;
    color: #64748b;
    margin-top: 2px;
  }
  .m-val {
    font-family: 'Outfit', sans-serif;
    font-size: 22px;
    font-weight: 800;
  }
  .pills-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .pill {
    flex: 1;
    text-align: center;
    padding: 9px 12px;
    border-radius: 999px;
    background: rgba(10, 18, 32, 0.85);
    border: 1px solid rgba(255,255,255,0.12);
    font-size: 13px;
    font-weight: 700;
    color: #f1f5f9;
  }
</style>
</head>
<body>
  <div class="canvas">
    <div class="grid-overlay"></div>
    <div class="left-col">
      <div class="badge">
        <span class="dot"></span>
        <span class="badge-tag">AI READY</span>
        <span class="badge-div"></span>
        <span class="badge-text">VIBE SIGNATURES FOR HOTELS, CRUISES &amp; TOURS</span>
      </div>
      <h1>Turn Your Unique Experience<br/><span>into Bookings</span></h1>
      <p class="sub">Match travellers' dreams about your destination with your verified reality</p>
    </div>

    <div class="right-col">
      <div class="glass-panel">
        <div class="panel-header">
          <span class="panel-title">MULTI-CHANNEL VIBE SIGNATURE ENGINE</span>
          <span class="panel-domain">atmosvibe.io</span>
        </div>
        <div class="metrics-grid">
          <div class="metric-box">
            <div>
              <div class="m-label">Physical Vibe</div>
              <div class="m-sub">8 Real-World Signals</div>
            </div>
            <div class="m-val" style="color:#34d399;">Verified</div>
          </div>
          <div class="metric-box">
            <div>
              <div class="m-label">Owned Digital</div>
              <div class="m-sub">Own vs. Local Vibe</div>
            </div>
            <div class="m-val" style="color:#00e5ff;">Aligned</div>
          </div>
          <div class="metric-box">
            <div>
              <div class="m-label">OTA Top-5 Hero</div>
              <div class="m-sub">Booking &amp; Expedia</div>
            </div>
            <div class="m-val" style="color:#ffd700;">Optimised</div>
          </div>
          <div class="metric-box">
            <div>
              <div class="m-label">AI Search Ready</div>
              <div class="m-sub">Digital Signatures</div>
            </div>
            <div class="m-val" style="color:#38bdf8;">Indexed</div>
          </div>
        </div>
      </div>

      <div class="pills-row">
        <div class="pill">✦ Search Engines</div>
        <div class="pill">✦ Digital Signatures</div>
        <div class="pill">✦ Business Intelligence</div>
      </div>
    </div>

    <div class="bottom-bar"></div>
  </div>
</body>
</html>`;

const option2Html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Outfit:wght@600;700;800;900&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 2256px;
    height: 382px;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
    background: #040812;
    color: #ffffff;
  }
  .canvas {
    position: relative;
    width: 2256px;
    height: 382px;
    background: #040812;
    overflow: hidden;
  }
  .photo-strip {
    position: absolute;
    top: 0;
    left: 0;
    width: 58%;
    height: 100%;
    display: flex;
    z-index: 1;
  }
  .slice {
    flex: 1;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  .slice img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(1.15) contrast(1.06);
  }
  .slice:nth-child(1) { clip-path: polygon(0 0, 100% 0, 86% 100%, 0 100%); }
  .slice:nth-child(2) { clip-path: polygon(14% 0, 100% 0, 86% 100%, 0 100%); margin-left: -4%; }
  .slice:nth-child(3) { clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%); margin-left: -4%; }

  .fade-overlay {
    position: absolute;
    inset: 0;
    z-index: 2;
    background:
      linear-gradient(90deg,
        rgba(4, 8, 18, 0.55) 0%,
        rgba(4, 8, 18, 0.25) 28%,
        rgba(4, 8, 18, 0.88) 50%,
        #040812 58%,
        #060d1f 100%
      ),
      linear-gradient(180deg, rgba(4, 8, 18, 0.65) 0%, transparent 25%, transparent 75%, rgba(4, 8, 18, 0.75) 100%);
  }

  .content {
    position: relative;
    z-index: 3;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    text-align: right;
    padding: 0 76px;
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
    margin-bottom: 16px;
  }
  h1 {
    font-family: 'Outfit', sans-serif;
    font-size: 52px;
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -0.02em;
    color: #ffffff;
    text-transform: uppercase;
    margin-bottom: 12px;
    text-shadow: 0 6px 24px rgba(0,0,0,0.8);
  }
  h1 span {
    color: #00e5ff;
  }
  .sub {
    font-size: 23px;
    font-weight: 600;
    color: #e2e8f0;
    margin-bottom: 22px;
  }
  .pill-bar {
    display: inline-flex;
    align-items: center;
    gap: 12px;
  }
  .pill {
    padding: 8px 18px;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.9);
    border: 1px solid rgba(255,255,255,0.15);
    font-size: 13.5px;
    font-weight: 700;
    color: #f8fafc;
  }
  .pill-gold {
    background: rgba(255, 215, 0, 0.14);
    border-color: rgba(255, 215, 0, 0.45);
    color: #ffd700;
  }
  .bottom-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 5px;
    z-index: 4;
    background: linear-gradient(90deg, #00e5ff, #38bdf8, #ffd700);
  }
</style>
</head>
<body>
  <div class="canvas">
    <div class="photo-strip">
      <div class="slice"><img src="${img1Uri}" /></div>
      <div class="slice"><img src="${img2Uri}" /></div>
      <div class="slice"><img src="${img3Uri}" /></div>
    </div>
    <div class="fade-overlay"></div>
    <div class="content">
      <div class="badge">VIBE SIGNATURES • HOTELS, CRUISES &amp; TOURS</div>
      <h1>TURN YOUR VIBE &amp; EXPERIENCES<br/><span>INTO BOOKINGS</span></h1>
      <div class="sub" style="margin-bottom: 0;">Showcase your vibe, experiences and connection to your local destination across OTAs, web, social and AI search</div>
    </div>
    <div class="bottom-bar"></div>
  </div>
</body>
</html>`;

async function generateBanners() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 2256, height: 382 },
    deviceScaleFactor: 1,
  });

  // Option 2 (Clean without the 3 skill pills)
  await page.setContent(option2Html, { waitUntil: 'networkidle' });
  const out2Public = path.join(publicDir, 'AtmosVibe-LinkedIn-Banner-Option2-Visual.png');
  const outCoverPublic = path.join(publicDir, 'AtmosVibe-LinkedIn-Cover-Banner.png');
  const out2Artifact = path.join(artifactDir, 'AtmosVibe-LinkedIn-Banner-Option2-Visual.png');
  await page.screenshot({ path: out2Public, type: 'png' });
  fs.copyFileSync(out2Public, outCoverPublic);
  fs.copyFileSync(out2Public, out2Artifact);

  await browser.close();
  console.log('Generated updated Option 2 LinkedIn banner successfully.');
}

generateBanners();
