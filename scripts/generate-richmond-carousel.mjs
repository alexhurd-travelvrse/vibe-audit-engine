import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');
const richmondImgDir = path.join(publicDir, 'richmond');
const artifactDir = 'C:/Users/Student/.gemini/antigravity/brain/1aab93db-7668-42c3-a55f-d4f72ca80c5b';
const challengeModelsDir = 'C:/Users/Student/.gemini/antigravity/scratch/ted-lasso-vibe-challenge/public/models';

fs.mkdirSync(richmondImgDir, { recursive: true });

function loadBase64Jpg(filename) {
  const srcPath = path.join(challengeModelsDir, filename);
  const destPath = path.join(richmondImgDir, filename);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    const buf = fs.readFileSync(srcPath);
    return `data:image/jpeg;base64,${buf.toString('base64')}`;
  }
  return '';
}

const imgPub = loadBase64Jpg('ted-lasso_experience_1_preview.jpg');
const imgPavedCourt = loadBase64Jpg('ted-lasso_experience_2_preview.jpg');
const imgPhoneBoxes = loadBase64Jpg('ted-lasso_experience_3_preview.jpg');
const imgGreen = loadBase64Jpg('ted-lasso_experience_4_preview.jpg');
const imgRiverside = loadBase64Jpg('ted-lasso_experience_5_preview.jpg');

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
    padding: 44px 48px;
    background: radial-gradient(circle at 85% 12%, rgba(0, 229, 255, 0.12), transparent 45%),
                radial-gradient(circle at 15% 88%, rgba(250, 204, 21, 0.09), transparent 45%),
                #060d1b;
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
    font-size: 24px;
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
    background: rgba(250, 204, 21, 0.12);
    border: 1px solid rgba(250, 204, 21, 0.45);
    color: #facc15;
    padding: 5px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 12px;
  }
  .kicker.cyan {
    background: rgba(0, 229, 255, 0.1);
    border-color: rgba(0, 229, 255, 0.45);
    color: #00e5ff;
  }
  .kicker.rose {
    background: rgba(251, 113, 133, 0.12);
    border-color: rgba(251, 113, 133, 0.45);
    color: #fb7185;
  }
  .kicker.emerald {
    background: rgba(52, 211, 153, 0.12);
    border-color: rgba(52, 211, 153, 0.45);
    color: #34d399;
  }
  h1 {
    font-size: 40px;
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -0.02em;
  }
  h2 {
    font-size: 33px;
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.02em;
  }
  .cyan { color: #00e5ff; }
  .gold { color: #facc15; }
  .rose { color: #fb7185; }
  .emerald { color: #34d399; }
  .lead {
    font-size: 17px;
    color: #cbd5e1;
    line-height: 1.42;
    margin-top: 10px;
  }
  .card {
    background: rgba(13, 25, 46, 0.92);
    border: 1px solid #1e3356;
    border-radius: 16px;
    padding: 18px 22px;
  }
  .card.rose-border { border-left: 6px solid #fb7185; }
  .card.gold-border { border-left: 6px solid #facc15; }
  .card.emerald-border { border-left: 6px solid #34d399; }
  .card.cyan-border { border-left: 6px solid #00e5ff; }

  .prompt-box {
    background: #0a1426;
    border: 1.5px solid #00e5ff;
    border-radius: 14px;
    padding: 16px 20px;
  }
  .prompt-label {
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #00e5ff;
    margin-bottom: 5px;
  }
  .prompt-text {
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
  }
  .models-row {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
  .model-pill {
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.16);
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 12.5px;
    font-weight: 700;
    color: #e2e8f0;
  }

  .stat-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .big-num {
    font-size: 42px;
    font-weight: 900;
    line-height: 1;
    margin-bottom: 6px;
  }
  .stat-title {
    font-size: 15px;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 4px;
  }
  .stat-desc {
    font-size: 13.5px;
    color: #94a3b8;
    line-height: 1.35;
  }

  .photo-pair {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
  .photo-box {
    position: relative;
    height: 175px;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.16);
  }
  .photo-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .photo-box img.pub-crop {
    object-position: center 85%;
    transform: scale(1.26);
    transform-origin: center 88%;
  }
  .photo-tag {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    background: rgba(6, 13, 27, 0.88);
    border: 1px solid rgba(255, 255, 255, 0.18);
    padding: 6px 10px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 800;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .footer-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 12px;
    border-top: 1px solid #1e293b;
    font-size: 13.5px;
    color: #94a3b8;
  }
  .swipe-cta {
    color: #facc15;
    font-weight: 800;
  }
`;

const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>${styles}</style>
</head>
<body>

  <!-- SLIDE 1: HOOK & THE 3-LLM TEST -->
  <div class="page" id="slide-1">
    <div class="top-bar">
      <div class="brand">Atmos<span>Vibe</span></div>
      <div class="page-pill">Vibe Insights • Slide 1 of 4</div>
    </div>

    <div>
      <div class="kicker">SCREEN TOURISM MEETS AI TRIP PLANNERS</div>
      <h1>Can ChatGPT Plan a <span class="cyan">Vibey Trip</span>?</h1>
      <p class="lead">
        We tested <strong>ChatGPT, Google Gemini and Perplexity</strong> on <em>Ted Lasso’s</em> Richmond-upon-Thames to see if an LLM actually knows where the atmosphere is.
      </p>
    </div>

    <div class="stat-grid-2">
      <div class="card cyan-border">
        <div class="big-num cyan">66% / 81%</div>
        <div class="stat-title">Screen-Inspired Travel</div>
        <div class="stat-desc">
          <strong>66% of travellers</strong> (and <strong>81% of Gen Z &amp; Millennials</strong>) say TV shows &amp; films influence where they travel <em>(Expedia Unpack)</em>.
        </div>
      </div>
      <div class="card gold-border">
        <div class="big-num gold">53%</div>
        <div class="stat-title">Visit UK Screen Locations</div>
        <div class="stat-desc">
          <strong>53% of recent international UK visitors</strong> visited a film or TV location during their trip <em>(VisitBritain Research)</em>.
        </div>
      </div>
    </div>

    <div class="prompt-box">
      <div class="prompt-label">THE EXACT PROMPT WE TESTED ACROSS 3 LLMs</div>
      <div class="prompt-text">“Plan a Ted Lasso trip to Richmond, London with the best atmosphere.”</div>
      <div class="models-row">
        <span class="model-pill">1. ChatGPT (OpenAI)</span>
        <span class="model-pill">2. Google Gemini</span>
        <span class="model-pill">3. Perplexity AI</span>
      </div>
    </div>

    <div class="footer-bar">
      <span>AtmosVibe Study #03 • Richmond-upon-Thames (TW9)</span>
      <span class="swipe-cta">See what all 3 AIs recommended →</span>
    </div>
  </div>

  <!-- SLIDE 2: WHAT 3 OUT OF 3 LLMs RECOMMENDED -->
  <div class="page" id="slide-2">
    <div class="top-bar">
      <div class="brand">Atmos<span>Vibe</span></div>
      <div class="page-pill">3-LLM Benchmark • Slide 2 of 4</div>
    </div>

    <div>
      <div class="kicker rose">THE BLOG-SCRAPING BOTTLENECK</div>
      <h2><span class="rose">3 out of 3 AIs</span> Sent Everyone to the Exact Same Corner.</h2>
      <p class="lead">
        LLMs rank places by <strong>how many blog posts mention a name</strong>, not by what a street actually feels like on a Saturday afternoon.
      </p>
    </div>

    <div class="photo-pair">
      <div class="photo-box">
        <img src="${imgPhoneBoxes}" alt="28 The Green & Red Phone Boxes" />
        <div class="photo-tag">
          <span>28 The Green &amp; K6 Phone Boxes</span>
          <span class="rose">3/3 LLMs</span>
        </div>
      </div>
      <div class="photo-box">
        <img src="${imgPavedCourt}" alt="11 Paved Court" />
        <div class="photo-tag">
          <span>11 Paved Court (3.5m Wide Lane)</span>
          <span class="rose">3/3 LLMs</span>
        </div>
      </div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 12px;">
      <div class="card rose-border" style="padding: 14px 18px;">
        <div class="stat-title" style="font-size: 16px;">1. The 250-Metre Filming Checklist (3 / 3 Models)</div>
        <div class="stat-desc" style="color: #cbd5e1; font-size: 14px;">
          All 3 AIs funnel every visitor into the same <strong>3.5-metre-wide lane</strong> (11 Paved Court) and corner pub (28 The Green), creating afternoon walking-tour bottlenecks and three-deep bar waits.
        </div>
      </div>
      <div class="card gold-border" style="padding: 14px 18px;">
        <div class="stat-title" style="font-size: 16px;">2. The 14-Mile Stadium Misfire (2 / 3 Models)</div>
        <div class="stat-desc" style="color: #cbd5e1; font-size: 14px;">
          ChatGPT &amp; Gemini also told Richmond visitors to pop over to <strong>Selhurst Park Stadium</strong> (“Nelson Road”), which is <strong>14 miles away in South Norwood (SE25)</strong>, over an hour away across South London.
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Popularity ≠ Atmosphere</span>
      <span class="swipe-cta">What did 0 out of 3 AIs mention? →</span>
    </div>
  </div>

  <!-- SLIDE 3: WHAT 0 OUT OF 3 LLMs MENTIONED (60 METRES AWAY) -->
  <div class="page" id="slide-3">
    <div class="top-bar">
      <div class="brand">Atmos<span>Vibe</span></div>
      <div class="page-pill">On-the-Ground Reality • Slide 3 of 4</div>
    </div>

    <div>
      <div class="kicker emerald">WHERE THE REAL ATMOSPHERE LIVES</div>
      <h2><span class="gold">0 out of 3 AIs</span> Mentioned the Pub 60 Metres Across the Grass.</h2>
      <p class="lead">
        The warm, unhurried village atmosphere people loved on screen is 100% real. It just sits <strong>60 seconds away</strong> from the AI checklist:
      </p>
    </div>

    <div class="photo-pair">
      <div class="photo-box">
        <img class="pub-crop" src="${imgPub}" alt="The Coach & Horses 29 The Green" />
        <div class="photo-tag">
          <span>The Coach &amp; Horses (29 The Green)</span>
          <span class="emerald">94.8 Vibe</span>
        </div>
      </div>
      <div class="photo-box">
        <img src="${imgRiverside}" alt="Thames Path Riverside Promenade" />
        <div class="photo-tag">
          <span>Thames Path to Petersham (1.2 km)</span>
          <span class="emerald">97.1 Vibe</span>
        </div>
      </div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 11px;">
      <div class="card emerald-border" style="padding: 13px 18px;">
        <div class="stat-title" style="font-size: 15.5px;">1. Walk 60 Metres Across the Green → The Coach &amp; Horses (0 / 3 LLMs)</div>
        <div class="stat-desc" style="color: #cbd5e1; font-size: 13.5px;">
          Same view over the 12-acre cricket pitch, proper wood-panelled snug and outdoor tables where Richmond locals and dog walkers actually sit down for a pint or Sunday roast.
        </div>
      </div>
      <div class="card cyan-border" style="padding: 13px 18px;">
        <div class="stat-title" style="font-size: 15.5px;">2. Walk Paved Court at 9:30 AM + Follow the Thames Path 15 Mins</div>
        <div class="stat-desc" style="color: #cbd5e1; font-size: 13.5px;">
          Browse Paved Court’s independent boutiques before walking tours arrive, then follow the flat Thames towpath <strong>1.2 km past Richmond Bridge</strong> to grazing cattle in <strong>Petersham Meadows</strong>, <strong>Petersham Nurseries</strong> &amp; riverfront boutique hotels.
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Verified on the Ground • Richmond Registry (94.2/100 Vibe)</span>
      <span class="swipe-cta">How we put atmosphere on the map →</span>
    </div>
  </div>

  <!-- SLIDE 4: TAKEAWAY & 3D TED LASSO VIBE CHALLENGE -->
  <div class="page" id="slide-4">
    <div class="top-bar">
      <div class="brand">Atmos<span>Vibe</span> × <span>Travel-Vrse</span></div>
      <div class="page-pill">3D Spatial Discovery • Slide 4 of 4</div>
    </div>

    <div>
      <div class="kicker cyan">DATA-DRIVEN DISCOVERABILITY</div>
      <h2>LLMs Know Where a Camera Stood. <span class="cyan">Not Where the Vibe Is.</span></h2>
      <p class="lead">
        We partnered with <strong>The Coach &amp; Horses</strong> to launch the <strong>3D Ted Lasso Richmond Vibe Challenge</strong> alongside our canonical <strong>Richmond Vibe Registry</strong>.
      </p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
      <div class="photo-box" style="height: 150px;">
        <img class="pub-crop" src="${imgPub}" alt="Checkpoint 1: The Coach & Horses" />
        <div class="photo-tag" style="font-size: 11px;">
          <span>#1 Coach &amp; Horses</span>
        </div>
      </div>
      <div class="photo-box" style="height: 150px;">
        <img src="${imgGreen}" alt="Checkpoint 4: Richmond Green" />
        <div class="photo-tag" style="font-size: 11px;">
          <span>#4 Richmond Green</span>
        </div>
      </div>
      <div class="photo-box" style="height: 150px;">
        <img src="${imgRiverside}" alt="Checkpoint 5: Thames Path" />
        <div class="photo-tag" style="font-size: 11px;">
          <span>#5 Thames Path</span>
        </div>
      </div>
    </div>

    <div class="card gold-border" style="padding: 18px 22px;">
      <div class="stat-title" style="font-size: 17px; color: #facc15; margin-bottom: 6px;">
        Turn a 1-Hour Filming Checklist Into a 24-Hour Neighbourhood Stay
      </div>
      <div class="stat-desc" style="color: #e2e8f0; font-size: 14px; line-height: 1.45;">
        • <strong>5 Interactive 3D Spatial Checkpoints</strong> you can explore on your phone before you travel.<br/>
        • <strong>82% Independent Village Venues</strong> across The Green, Golden Court &amp; Petersham.<br/>
        • <strong>3 Audited Overnight Boutique Stays</strong> (Bingham Riverhouse, The Petersham &amp; Harbour Hotel).
      </div>
    </div>

    <div class="prompt-box" style="border-color: #facc15; padding: 14px 20px; display: flex; align-items: center; justify-content: space-between;">
      <div>
        <div class="prompt-label" style="color: #facc15; margin-bottom: 2px;">EXPLORE THE STUDY &amp; 3D RICHMOND CHALLENGE</div>
        <div style="font-size: 16px; font-weight: 800; color: #ffffff;">atmosvibe.io/vibe-insights/richmond-set-jetting-study</div>
      </div>
      <div style="background: #facc15; color: #060d1b; font-weight: 900; font-size: 12.5px; padding: 8px 14px; border-radius: 999px;">
        LINKS IN COMMENT ↓
      </div>
    </div>
  </div>

</body>
</html>
`;

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 800, height: 800 },
    deviceScaleFactor: 2,
  });

  await page.setContent(html, { waitUntil: 'load' });

  // 1. Export the 4-Slide LinkedIn Carousel PDF
  const pdfName = 'AtmosVibe-Richmond-LLM-Vibe-Test-Carousel.pdf';
  const pdfPublicPath = path.join(publicDir, pdfName);
  const pdfArtifactPath = path.join(artifactDir, pdfName);

  await page.pdf({
    path: pdfPublicPath,
    width: '800px',
    height: '800px',
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
  });
  fs.copyFileSync(pdfPublicPath, pdfArtifactPath);

  // 2. Export each individual 800x800 slide as a crisp PNG for Medium, Substack & preview
  for (let i = 1; i <= 4; i++) {
    const el = await page.$(`#slide-${i}`);
    const pngName = `AtmosVibe-Richmond-Carousel-Slide-${i}.png`;
    const pngPublicPath = path.join(publicDir, pngName);
    const pngArtifactPath = path.join(artifactDir, pngName);
    await el.screenshot({ path: pngPublicPath });
    fs.copyFileSync(pngPublicPath, pngArtifactPath);
  }

  await browser.close();
  console.log('[carousel] Generated 4-slide PDF and PNGs successfully.');
}

run();
