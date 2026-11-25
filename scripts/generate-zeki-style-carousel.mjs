import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');
const artifactDir = 'C:/Users/Student/.gemini/antigravity/brain/1aab93db-7668-42c3-a55f-d4f72ca80c5b';

const styles = `
  @page {
    size: 1080px 1350px;
    margin: 0;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1080px;
    background: #ffffff;
    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Inter', Roboto, Helvetica, Arial, sans-serif;
    color: #191847;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .page {
    width: 1080px;
    height: 1350px;
    padding: 88px 84px 76px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    page-break-after: always;
    break-after: page;
    position: relative;
    overflow: hidden;
  }

  /* PAGE 1: SOLID EDITORIAL TEAL COVER */
  .page-cover {
    background: #84c7d0;
    color: #191847;
  }
  .cover-top {
    margin-top: 100px;
  }
  .cover-headline {
    font-size: 76px;
    font-weight: 300;
    line-height: 1.1;
    letter-spacing: -0.025em;
    color: #191847;
  }
  .cover-headline strong {
    display: block;
    font-weight: 800;
    margin-top: 8px;
  }
  .cover-sub {
    margin-top: 54px;
    font-size: 31px;
    font-weight: 400;
    line-height: 1.38;
    color: #191847;
    max-width: 860px;
  }
  .cover-logo {
    font-size: 56px;
    font-weight: 400;
    letter-spacing: -0.03em;
    color: #191847;
  }
  .cover-logo strong {
    font-weight: 800;
  }

  /* PAGES 2 & 3: CLEAN EDITORIAL OFF-WHITE */
  .page-light {
    background: #f8fafb;
    color: #191847;
  }
  .slide-headline {
    font-size: 54px;
    font-weight: 700;
    line-height: 1.13;
    letter-spacing: -0.02em;
    color: #191847;
  }
  .chart-header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 34px;
    padding-bottom: 14px;
    border-bottom: 1.5px solid #e2e8f0;
  }
  .chart-kicker {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #334155;
  }
  .legend {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 16px;
    font-weight: 600;
    color: #334155;
  }
  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .swatch {
    width: 16px;
    height: 16px;
    border-radius: 3px;
    display: inline-block;
  }
  .swatch.navy { background: #1c2536; }
  .swatch.green { background: #52b765; }
  .swatch.teal { background: #84c7d0; }

  /* BAR CHART AREA */
  .chart-box {
    margin: 18px 0 22px;
    height: 560px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-left: 58px;
    padding-bottom: 72px;
  }
  .grid-lines {
    position: absolute;
    left: 58px;
    right: 0;
    top: 24px;
    bottom: 72px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: none;
  }
  .grid-line {
    width: 100%;
    border-bottom: 1.5px dashed #cbd5e1;
    position: relative;
  }
  .grid-line.solid {
    border-bottom: 2px solid #64748b;
  }
  .grid-label {
    position: absolute;
    left: -58px;
    top: -11px;
    font-size: 16px;
    font-weight: 600;
    color: #475569;
    width: 46px;
    text-align: right;
  }

  .bars-row {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 28px;
    align-items: flex-end;
    height: 464px;
    padding: 0 18px;
  }
  .bar-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: flex-end;
  }
  .bar-pair {
    display: flex;
    align-items: flex-end;
    gap: 10px;
    height: 100%;
    width: 100%;
    justify-content: center;
  }
  .bar-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    width: 68px;
    height: 100%;
  }
  .bar-val {
    font-size: 17px;
    font-weight: 800;
    color: #191847;
    margin-bottom: 6px;
    padding-bottom: 2px;
    border-bottom: 2px solid #191847;
    white-space: nowrap;
  }
  .bar-fill {
    width: 100%;
    border-radius: 3px 3px 0 0;
  }
  .bar-fill.navy { background: #1c2536; }
  .bar-fill.green { background: #52b765; }
  .bar-fill.zero {
    height: 6px !important;
    background: #94a3b8;
  }
  .x-labels {
    position: absolute;
    left: 58px;
    right: 0;
    bottom: 0;
    height: 62px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 28px;
    padding: 12px 18px 0;
    text-align: center;
  }
  .x-label-title {
    font-size: 17px;
    font-weight: 700;
    color: #191847;
    line-height: 1.2;
  }
  .x-label-sub {
    font-size: 14px;
    color: #64748b;
    margin-top: 3px;
  }

  /* CALLOUT BOX AT BOTTOM */
  .callout-box {
    background: #84c7d0;
    border-radius: 14px;
    padding: 34px 38px;
    color: #191847;
  }
  .callout-kicker {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #191847;
    margin-bottom: 10px;
  }
  .callout-text {
    font-size: 27px;
    font-weight: 700;
    line-height: 1.32;
    color: #191847;
  }

  /* PAGE 3: 3 BIG STACKED NUMBERS */
  .page3-intro {
    font-size: 24px;
    color: #334155;
    line-height: 1.4;
    margin-top: 16px;
  }
  .big-stats-stack {
    display: flex;
    flex-direction: column;
    gap: 26px;
    margin: 20px 0;
  }
  .big-stat-row {
    padding-bottom: 24px;
    border-bottom: 1.5px solid #cbd5e1;
  }
  .big-stat-row:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  .big-stat-num {
    font-size: 72px;
    font-weight: 400;
    color: #52b765;
    line-height: 1.02;
    letter-spacing: -0.03em;
    margin-bottom: 6px;
  }
  .big-stat-title {
    font-size: 25px;
    font-weight: 700;
    color: #191847;
    line-height: 1.25;
  }
  .big-stat-desc {
    font-size: 20px;
    color: #475569;
    line-height: 1.38;
    margin-top: 4px;
  }
  .footnote {
    font-size: 15px;
    color: #64748b;
    margin-top: 14px;
    display: flex;
    justify-content: space-between;
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

  <!-- PAGE 1: MINIMAL SOLID COVER -->
  <div class="page page-cover" id="zeki-page-1">
    <div class="cover-top">
      <div class="cover-headline">
        Two-thirds of travellers now pick trips from TV shows.
        <strong>Can ChatGPT find the vibe?</strong>
      </div>
      <p class="cover-sub">
        We asked ChatGPT, Gemini and Perplexity to plan a <em>Ted Lasso</em> trip to Richmond. They all missed the best pub on the Green by 60 metres...
      </p>
    </div>

    <div class="cover-logo">
      atmos<strong>vibe</strong>
    </div>
  </div>

  <!-- PAGE 2: ONE CLEAN CHART + ONE SHADED CALLOUT BOX -->
  <div class="page page-light" id="zeki-page-2">
    <div>
      <h2 class="slide-headline">
        All 3 AIs send everyone to the exact same corner
      </h2>

      <div class="chart-header-row">
        <span class="chart-kicker">AI MENTION RATE VS. REAL ON-THE-GROUND VIBE</span>
        <div class="legend">
          <span class="legend-item"><span class="swatch navy"></span>AI Mention Rate (3 LLMs)</span>
          <span class="legend-item"><span class="swatch green"></span>Verified Vibe Score</span>
        </div>
      </div>

      <div class="chart-box">
        <div class="grid-lines">
          <div class="grid-line"><span class="grid-label">100%</span></div>
          <div class="grid-line"><span class="grid-label">75%</span></div>
          <div class="grid-line"><span class="grid-label">50%</span></div>
          <div class="grid-line"><span class="grid-label">25%</span></div>
          <div class="grid-line solid"><span class="grid-label">0%</span></div>
        </div>

        <div class="bars-row">
          <!-- Spot 1: 28 The Green -->
          <div class="bar-group">
            <div class="bar-pair">
              <div class="bar-col">
                <span class="bar-val">3/3 AIs</span>
                <div class="bar-fill navy" style="height: 100%;"></div>
              </div>
              <div class="bar-col">
                <span class="bar-val">58/100</span>
                <div class="bar-fill green" style="height: 58%;"></div>
              </div>
            </div>
          </div>

          <!-- Spot 2: 11 Paved Court -->
          <div class="bar-group">
            <div class="bar-pair">
              <div class="bar-col">
                <span class="bar-val">3/3 AIs</span>
                <div class="bar-fill navy" style="height: 100%;"></div>
              </div>
              <div class="bar-col">
                <span class="bar-val">54/100</span>
                <div class="bar-fill green" style="height: 54%;"></div>
              </div>
            </div>
          </div>

          <!-- Spot 3: The Coach & Horses -->
          <div class="bar-group">
            <div class="bar-pair">
              <div class="bar-col">
                <span class="bar-val">0/3 AIs</span>
                <div class="bar-fill zero"></div>
              </div>
              <div class="bar-col">
                <span class="bar-val">95/100</span>
                <div class="bar-fill green" style="height: 95%;"></div>
              </div>
            </div>
          </div>

          <!-- Spot 4: Petersham Towpath -->
          <div class="bar-group">
            <div class="bar-pair">
              <div class="bar-col">
                <span class="bar-val">0/3 AIs</span>
                <div class="bar-fill zero"></div>
              </div>
              <div class="bar-col">
                <span class="bar-val">96/100</span>
                <div class="bar-fill green" style="height: 96%;"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="x-labels">
          <div>
            <div class="x-label-title">28 The Green</div>
            <div class="x-label-sub">Corner Queue</div>
          </div>
          <div>
            <div class="x-label-title">11 Paved Court</div>
            <div class="x-label-sub">3.5m Wide Alley</div>
          </div>
          <div>
            <div class="x-label-title">Coach &amp; Horses</div>
            <div class="x-label-sub">60m Across Green</div>
          </div>
          <div>
            <div class="x-label-title">Petersham Path</div>
            <div class="x-label-sub">15m River Walk</div>
          </div>
        </div>
      </div>
    </div>

    <div class="callout-box">
      <div class="callout-kicker">THE BLOG-SCRAPING BOTTLENECK</div>
      <div class="callout-text">
        LLMs rank places by how many blogs mention a filming address, sending everyone to the same 3.5-metre lane while missing the pub 60 metres away.
      </div>
    </div>
  </div>

  <!-- PAGE 3: 3 BIG STACKED NUMBERS + CALLOUT BOX -->
  <div class="page page-light" id="zeki-page-3">
    <div>
      <h2 class="slide-headline">
        Where the real Richmond atmosphere lives
      </h2>
      <p class="page3-intro">
        When we audited Richmond on the ground for AtmosVibe, the village feel people loved on screen was sitting yards away from the AI checklist:
      </p>
    </div>

    <div class="big-stats-stack">
      <div class="big-stat-row">
        <div class="big-stat-num">60 metres</div>
        <div class="big-stat-title">Walk across the grass to The Coach &amp; Horses (29 The Green)</div>
        <div class="big-stat-desc">
          Same view over the 12-acre cricket pitch, a proper wood-panelled snug and an actual table with locals while tour groups queue across the Green.
        </div>
      </div>

      <div class="big-stat-row">
        <div class="big-stat-num">9:30 am</div>
        <div class="big-stat-title">Walk 11 Paved Court before the afternoon walking tours arrive</div>
        <div class="big-stat-desc">
          Paved Court is only 3.5 metres wide. Visit with a morning coffee as the independent boutiques open their shutters (and skip the 14-mile detour to Selhurst Park).
        </div>
      </div>

      <div class="big-stat-row">
        <div class="big-stat-num">15 mins</div>
        <div class="big-stat-title">Follow the flat Thames Path (1.2 km) past Richmond Bridge</div>
        <div class="big-stat-desc">
          Opens out into grazing cattle in Petersham Meadows, candlelit glasshouses at Petersham Nurseries and riverfront stays (Bingham Riverhouse &amp; The Petersham).
        </div>
      </div>
    </div>

    <div>
      <div class="callout-box">
        <div class="callout-kicker">WHY ATMOSPHERE NEEDS MORE THAN TEXT SCRAPING</div>
        <div class="callout-text">
          LLMs know where a camera stood, not where the atmosphere is. Read the full Richmond Vibe Insights study at atmosvibe.io.
        </div>
      </div>
      <div class="footnote">
        <span>Sources: Expedia Unpack (66% / 81%), VisitBritain (53%), AtmosVibe 3-LLM Test (Nov 2026).</span>
        <span>atmosvibe.io</span>
      </div>
    </div>
  </div>

</body>
</html>
`;

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1080, height: 1350 },
    deviceScaleFactor: 2,
  });

  await page.setContent(html, { waitUntil: 'load' });

  // 1. Export individual 4:5 Portrait PNGs (2160x2700 Retina at deviceScaleFactor: 2)
  const pngBuffers = [];
  for (let i = 1; i <= 3; i++) {
    const el = await page.$(`#zeki-page-${i}`);
    const pngName = `AtmosVibe-Richmond-Zeki-Page-${i}.png`;
    const pngPublicPath = path.join(publicDir, pngName);
    const pngArtifactPath = path.join(artifactDir, pngName);
    const buf = await el.screenshot({ path: pngPublicPath });
    fs.copyFileSync(pngPublicPath, pngArtifactPath);
    pngBuffers.push(buf.toString('base64'));
  }

  // 2. Build a compact Zeki-sized 3-page PDF (3.5in x 4.0in = 252pt x 288pt, matching Zeki's exact compact card size)
  const pdfPage = await browser.newPage({
    viewport: { width: 336, height: 384 },
  });
  const flattenedPdfHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @page { size: 3.5in 4.0in; margin: 0; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; padding: 0; background: #ffffff; }
        .pdf-slide {
          width: 3.5in;
          height: 4.0in;
          page-break-after: always;
          break-after: page;
          overflow: hidden;
        }
        .pdf-slide:last-child {
          page-break-after: auto;
          break-after: auto;
        }
        .pdf-slide img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }
      </style>
    </head>
    <body>
      <div class="pdf-slide"><img src="data:image/png;base64,${pngBuffers[0]}" /></div>
      <div class="pdf-slide"><img src="data:image/png;base64,${pngBuffers[1]}" /></div>
      <div class="pdf-slide"><img src="data:image/png;base64,${pngBuffers[2]}" /></div>
    </body>
    </html>
  `;
  await pdfPage.setContent(flattenedPdfHtml, { waitUntil: 'load' });

  const pdfName = 'AtmosVibe-Richmond-Zeki-Style-3Page-Carousel.pdf';
  const pdfPublicPath = path.join(publicDir, pdfName);
  const pdfArtifactPath = path.join(artifactDir, pdfName);

  await pdfPage.pdf({
    path: pdfPublicPath,
    width: '3.5in',
    height: '4.0in',
    printBackground: true,
    margin: { top: '0in', right: '0in', bottom: '0in', left: '0in' },
  });
  fs.copyFileSync(pdfPublicPath, pdfArtifactPath);

  // 3. Render a LinkedIn Feed Side-by-Side Strip Mockup so the user can see how all 3 sit together in the feed!
  const feedPage = await browser.newPage({
    viewport: { width: 1400, height: 820 },
    deviceScaleFactor: 2,
  });

  const feedHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          background: #f3f2ef;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding: 28px;
          display: flex;
          justify-content: center;
        }
        .li-card {
          width: 1320px;
          background: #ffffff;
          border-radius: 12px;
          border: 1px solid #dcdcdc;
          padding: 22px 24px 26px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
        }
        .li-header {
          font-size: 18px;
          color: #191919;
          margin-bottom: 18px;
          line-height: 1.45;
        }
        .li-strip {
          display: flex;
          gap: 16px;
          overflow: hidden;
          position: relative;
        }
        .li-slide {
          width: 520px;
          height: 650px;
          flex-shrink: 0;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          position: relative;
        }
        .li-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .li-pill {
          position: absolute;
          top: 16px;
          left: 16px;
          background: rgba(20, 20, 20, 0.82);
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
          padding: 8px 16px;
          border-radius: 999px;
        }
      </style>
    </head>
    <body>
      <div class="li-card">
        <div class="li-header">
          <strong>AtmosVibe</strong> • Two-thirds of travellers now pick trips from TV shows. We tested ChatGPT, Gemini and Perplexity on Ted Lasso’s Richmond to see if an LLM knows where the atmosphere is...
        </div>
        <div class="li-strip">
          <div class="li-slide">
            <img src="data:image/png;base64,${pngBuffers[0]}" />
            <div class="li-pill">Can ChatGPT find the vibe? • 3 pages</div>
          </div>
          <div class="li-slide">
            <img src="data:image/png;base64,${pngBuffers[1]}" />
          </div>
          <div class="li-slide">
            <img src="data:image/png;base64,${pngBuffers[2]}" />
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  await feedPage.setContent(feedHtml, { waitUntil: 'load' });
  const previewName = 'AtmosVibe-Richmond-Zeki-Feed-Preview.png';
  const previewPublicPath = path.join(publicDir, previewName);
  const previewArtifactPath = path.join(artifactDir, previewName);
  await feedPage.screenshot({ path: previewPublicPath });
  fs.copyFileSync(previewPublicPath, previewArtifactPath);

  await browser.close();
  console.log('[zeki-carousel] Generated 3-page 4:5 portrait PDF, PNGs, and LinkedIn feed preview.');
}

run();
