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
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@600;700;800;900&family=Outfit:wght@700;800;900&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1200px;
    background: #040812;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #ffffff;
  }

  /* Exact 1200 x 627 (1.91:1 LinkedIn Landscape Feed Size) */
  .canvas {
    width: 1200px;
    height: 627px;
    background:
      radial-gradient(600px 380px at 80% 25%, rgba(0, 229, 255, 0.13), transparent 70%),
      linear-gradient(135deg, #040914 0%, #0a1528 60%, #040812 100%);
    padding: 36px 42px 24px;
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

  .top-title {
    position: relative;
    z-index: 2;
    margin-bottom: 14px;
  }
  .top-title h1 {
    font-family: 'Outfit', sans-serif;
    font-size: 32px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #ffffff;
  }
  .top-title h1 span {
    color: #00e5ff;
  }

  .ab-grid {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
    flex: 1;
    align-items: stretch;
  }

  .card {
    background: rgba(12, 23, 44, 0.94);
    border-radius: 20px;
    padding: 22px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;
  }
  .card.hotel-a {
    border: 2px solid rgba(251, 113, 133, 0.5);
  }
  .card.hotel-b {
    border: 2px solid rgba(52, 211, 153, 0.65);
    background: linear-gradient(160deg, rgba(16, 185, 129, 0.12), rgba(12, 23, 44, 0.96) 65%);
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .hotel-title {
    font-family: 'Outfit', sans-serif;
    font-size: 32px;
    font-weight: 900;
    letter-spacing: -0.02em;
    color: #ffffff;
  }
  .hotel-badge {
    font-size: 14px;
    font-weight: 900;
    padding: 8px 16px;
    border-radius: 999px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  .hotel-a .hotel-badge {
    background: rgba(244, 63, 94, 0.22);
    border: 1.5px solid rgba(251, 113, 133, 0.55);
    color: #fda4af;
  }
  .hotel-b .hotel-badge {
    background: rgba(255, 215, 0, 0.2);
    border: 1.5px solid #ffd700;
    color: #ffd700;
  }

  .photo-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1.18fr;
    flex: 1;
    gap: 10px;
  }
  .photo-cell {
    position: relative;
    overflow: hidden;
    border-radius: 13px;
    border: 1.5px solid rgba(255, 255, 255, 0.14);
  }
  .photo-cell.local-highlight {
    border: 3.5px solid #ffd700;
    box-shadow: 0 0 28px rgba(255, 215, 0, 0.38);
  }
  .photo-cell img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .photo-pill {
    position: absolute;
    bottom: 10px;
    left: 8px;
    right: 8px;
    text-align: center;
    font-size: 11.5px;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 6px 6px;
    border-radius: 7px;
    background: rgba(5, 11, 22, 0.9);
    color: #cbd5e1;
    border: 1px solid rgba(255, 255, 255, 0.18);
  }
  .photo-cell.local-highlight .photo-pill {
    background: #ffd700;
    color: #040812;
    font-size: 12.5px;
    font-weight: 900;
    border: none;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.6);
  }

  .bottom-bar {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-top: 10px;
  }
  .brand-logo {
    font-family: 'Outfit', sans-serif;
    font-size: 21px;
    font-weight: 800;
    color: #ffffff;
  }
  .brand-logo span { color: #00e5ff; }
</style>
</head>
<body>

  <div class="canvas" id="card-landscape">
    <div class="bg-lines"></div>

    <div class="top-title">
      <h1>You’re booking a weekend in London. <span>Which hotel gets your click?</span></h1>
    </div>

    <div class="ab-grid">
      <!-- HOTEL A -->
      <div class="card hotel-a">
        <div class="card-header">
          <div class="hotel-title">Hotel A</div>
          <div class="hotel-badge">Only Promotes Itself</div>
        </div>

        <div class="photo-row">
          <div class="photo-cell">
            <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/871085375.jpg?k=34247c46f6d191530d624e4be77f2fdee0214685c1c52df0ba6bcce4b1cb3206&o=" />
            <span class="photo-pill">Inside Hotel</span>
          </div>
          <div class="photo-cell">
            <img src="https://cf.bstatic.com/xdata/images/hotel/max500/181663431.jpg?k=f9502aa9110f102facb298719ae7b219afb5a97cf13d3968d434767424b4b600&o=" />
            <span class="photo-pill">Inside Hotel</span>
          </div>
          <div class="photo-cell">
            <img src="https://cf.bstatic.com/xdata/images/hotel/max300/871090248.jpg?k=c0a21fd869f35cb500db738e10ee5e175104b92dc21762da561b862d42fa7f32&o=" />
            <span class="photo-pill">Inside Hotel</span>
          </div>
        </div>
      </div>

      <!-- HOTEL B -->
      <div class="card hotel-b">
        <div class="card-header">
          <div class="hotel-title">Hotel B</div>
          <div class="hotel-badge">Promotes Hotel + Local Area</div>
        </div>

        <div class="photo-row">
          <div class="photo-cell">
            <img src="https://thehoxton.com/wp-content/uploads/sites/5/2019/12/Seabird_southwark.jpg" />
            <span class="photo-pill">Inside Hotel</span>
          </div>
          <div class="photo-cell">
            <img src="https://thehoxton.com/wp-content/uploads/sites/5/2020/06/SMALL_Hoxton-Southwark-Lobby-Hero-1345_RET.jpg" />
            <span class="photo-pill">Inside Hotel</span>
          </div>
          <div class="photo-cell local-highlight">
            <img src="https://thehoxton.com/wp-content/uploads/sites/5/2020/03/borough_market_10.27.09_optimized_300.jpg" />
            <span class="photo-pill">📍 Local Area</span>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-bar">
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

const fileName = 'AtmosVibe-Personal-Hotel-A-vs-B.png';
const v11Name = 'AtmosVibe-Personal-Hotel-A-vs-B-ultra-clean.png';
const pubPath = path.join(publicDir, fileName);
const artPath = path.join(artifactDir, fileName);
const artV11Path = path.join(artifactDir, v11Name);

await page.locator('#card-landscape').screenshot({ path: pubPath });
fs.copyFileSync(pubPath, artPath);
fs.copyFileSync(pubPath, artV11Path);
console.log(`Saved ${fileName} (Ultra-clean zero-clutter version)`);

await browser.close();
