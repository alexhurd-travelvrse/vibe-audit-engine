import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');
const artifactDir = 'C:/Users/Student/.gemini/antigravity/brain/1aab93db-7668-42c3-a55f-d4f72ca80c5b';

const alexImgPath = path.join(publicDir, 'models/Alex_Hurd.jpg');
const alexBase64 = fs.existsSync(alexImgPath)
  ? `data:image/jpeg;base64,${fs.readFileSync(alexImgPath).toString('base64')}`
  : '';

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&family=Outfit:wght@700;800;900&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1200px;
    background: #040812;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #ffffff;
  }

  /* Exact 1200 x 627 (1.91:1 LinkedIn Landscape Feed Size - matches Mirko Lalli post height) */
  .canvas {
    width: 1200px;
    height: 627px;
    background:
      radial-gradient(600px 380px at 80% 25%, rgba(0, 229, 255, 0.13), transparent 70%),
      linear-gradient(135deg, #040914 0%, #0a1528 60%, #040812 100%);
    padding: 36px 52px 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
  }

  .bg-lines {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }

  /* ULTRA-MINIMAL MIRKO-STYLE LAYOUT */
  .main-row {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 1.05fr 1fr;
    align-items: center;
    gap: 44px;
    flex: 1;
  }

  .stat-box {
    background: rgba(0, 229, 255, 0.08);
    border: 1.5px solid rgba(0, 229, 255, 0.35);
    border-radius: 18px;
    padding: 32px 36px;
  }
  .stat-kicker {
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #00e5ff;
    margin-bottom: 10px;
  }
  .stat-compare {
    display: flex;
    align-items: baseline;
    gap: 22px;
    margin-bottom: 14px;
  }
  .big-num {
    font-family: 'Outfit', sans-serif;
    font-size: 88px;
    font-weight: 900;
    line-height: 0.95;
    letter-spacing: -0.03em;
  }
  .big-num.cyan { color: #00e5ff; }
  .big-num.gold { color: #ffd700; }
  .vs-text {
    font-family: 'Outfit', sans-serif;
    font-size: 32px;
    font-weight: 800;
    color: #64748b;
  }
  .stat-bar-label {
    display: inline-block;
    background: rgba(0, 229, 255, 0.16);
    color: #f8fafc;
    font-size: 20px;
    font-weight: 800;
    padding: 8px 16px;
    border-radius: 8px;
  }
  .stat-sub {
    font-size: 16px;
    color: #94a3b8;
    margin-top: 12px;
    line-height: 1.4;
  }

  /* Right side: Clean 2-Card Choice (Hotel A vs Hotel B) */
  .choice-stack {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .choice-card {
    background: rgba(12, 23, 44, 0.92);
    border-radius: 16px;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 18px;
  }
  .choice-card.a {
    border: 1.5px solid rgba(251, 113, 133, 0.45);
  }
  .choice-card.b {
    border: 1.5px solid rgba(52, 211, 153, 0.55);
    background: linear-gradient(145deg, rgba(16, 185, 129, 0.12), rgba(12, 23, 44, 0.95));
  }
  .choice-thumb {
    width: 118px;
    height: 118px;
    border-radius: 12px;
    object-fit: cover;
    flex-shrink: 0;
  }
  .choice-pill {
    display: inline-block;
    font-size: 11.5px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 4px 10px;
    border-radius: 6px;
    margin-bottom: 6px;
  }
  .choice-card.a .choice-pill {
    background: rgba(251, 113, 133, 0.18);
    color: #fda4af;
  }
  .choice-card.b .choice-pill {
    background: rgba(52, 211, 153, 0.2);
    color: #34d399;
  }
  .choice-title {
    font-size: 19px;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 4px;
  }
  .choice-desc {
    font-size: 14px;
    color: #94a3b8;
    line-height: 1.35;
  }

  .bottom-bar {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 8px;
  }
  .author-badge {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .author-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 2px solid #00e5ff;
    object-fit: cover;
  }
  .author-name {
    font-size: 15px;
    font-weight: 800;
    color: #ffffff;
  }
  .author-role {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: #94a3b8;
    text-transform: uppercase;
  }
  .brand-logo {
    font-family: 'Outfit', sans-serif;
    font-size: 23px;
    font-weight: 800;
    color: #ffffff;
  }
  .brand-logo span { color: #00e5ff; }
</style>
</head>
<body>

  <div class="canvas" id="card-minimal">
    <div class="bg-lines"></div>

    <div class="main-row">
      <div class="stat-box">
        <div class="stat-kicker">London 10-Hotel Website Audit</div>
        <div class="stat-compare">
          <span class="big-num cyan">88</span>
          <span class="vs-text">vs.</span>
          <span class="big-num gold">45</span>
        </div>
        <div class="stat-bar-label">Own Bars &amp; Vibe vs. Local Area</div>
        <div class="stat-sub">
          Hotels strongly promote their own bars (<strong>88/100</strong>)—yet hide the neighbourhood outside their doors (<strong>45/100</strong>).
        </div>
      </div>

      <div class="choice-stack">
        <div class="choice-card a">
          <img class="choice-thumb" src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/871085375.jpg?k=34247c46f6d191530d624e4be77f2fdee0214685c1c52df0ba6bcce4b1cb3206&o=" />
          <div>
            <span class="choice-pill">Hotel A • Local Area: 28 / 100</span>
            <div class="choice-title">“The Walled Garden”</div>
            <div class="choice-desc">Promotes its own courtyard &amp; bars (90/100), with almost zero mention of Fitzrovia outside.</div>
          </div>
        </div>

        <div class="choice-card b">
          <img class="choice-thumb" src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/826978849.jpg?k=dd8a4f639311a9aa1e2a24f4a7037b286e8e34361eeb30caaf6db5ebbd0bbc1a&o=" />
          <div>
            <span class="choice-pill">Hotel B • Local Area: 66 / 100 (#1)</span>
            <div class="choice-title">“The Local Gateway”</div>
            <div class="choice-desc">Promotes its lobby &amp; dining (87/100) + a curated guide to Shoreditch &amp; Columbia Road.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-bar">
      <div class="author-badge">
        ${alexBase64 ? `<img class="author-avatar" src="${alexBase64}" />` : ''}
        <div>
          <div class="author-name">Alex Hurd</div>
          <div class="author-role">AI &amp; Data Venture Builder</div>
        </div>
      </div>

      <div class="brand-logo">Atmos<span>Vibe</span></div>
    </div>
  </div>

</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 627 },
  deviceScaleFactor: 1.5,
});

await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

const fileName = 'AtmosVibe-Personal-Minimal-1200x627.png';
const pubPath = path.join(publicDir, fileName);
const artPath = path.join(artifactDir, fileName);

await page.locator('#card-minimal').screenshot({ path: pubPath });
fs.copyFileSync(pubPath, artPath);
console.log(`Saved ${fileName}`);

await browser.close();
