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

const imgSoap = getSlotImg('hoxton-southwark', 3);
const imgGym = getSlotImg('hoxton-southwark', 5);
const imgSink = getSlotImg('hoxton-shoreditch', 2);
const imgCouch = getSlotImg('sea-containers', 2);

const commonStyles = `
  @page {
    size: 1080px 1350px;
    margin: 0;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1080px;
    background: #040812;
    font-family: 'Inter', sans-serif;
    color: #ffffff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .slide {
    width: 1080px;
    height: 1350px;
    padding: 60px 66px;
    background:
      radial-gradient(850px 550px at 15% 12%, rgba(0, 229, 255, 0.14), transparent 70%),
      radial-gradient(750px 550px at 88% 85%, rgba(244, 63, 94, 0.11), transparent 70%),
      linear-gradient(165deg, #040812 0%, #091326 55%, #040812 100%);
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
    font-family: 'Outfit', sans-serif;
    font-size: 32px;
    font-weight: 800;
    letter-spacing: -0.01em;
  }
  .brand span { color: #00e5ff; }
  .slide-num {
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.15);
    padding: 8px 18px;
    border-radius: 999px;
    font-size: 16px;
    font-weight: 700;
    color: #94a3b8;
    letter-spacing: 0.06em;
  }
  .kicker {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: rgba(56, 189, 248, 0.14);
    border: 1px solid rgba(56, 189, 248, 0.4);
    color: #38bdf8;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 14.5px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  .kicker.emerald {
    background: rgba(16, 185, 129, 0.14);
    border-color: rgba(16, 185, 129, 0.4);
    color: #34d399;
  }
  .kicker.rose {
    background: rgba(244, 63, 94, 0.16);
    border-color: rgba(244, 63, 94, 0.45);
    color: #fb7185;
  }
  h1 {
    font-family: 'Outfit', sans-serif;
    font-size: 54px;
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -0.025em;
  }
  h1 span.cyan {
    background: linear-gradient(90deg, #00e5ff, #38bdf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  h1 span.gold {
    background: linear-gradient(90deg, #ffd700, #fbbf24);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  h1 span.rose {
    background: linear-gradient(90deg, #fb7185, #f43f5e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .lead {
    font-size: 22px;
    color: #cbd5e1;
    line-height: 1.44;
    margin-top: 16px;
  }
  .lead strong { color: #ffffff; }
  .stat-stack {
    display: flex;
    flex-direction: column;
    gap: 22px;
    margin: 22px 0;
  }
  .stat-card {
    background: rgba(11, 20, 38, 0.92);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 22px;
    padding: 28px 34px;
    position: relative;
  }
  .stat-card.cyan-border {
    border-left: 6px solid #00e5ff;
  }
  .stat-card.gold-border {
    border-left: 6px solid #fbbf24;
  }
  .stat-card.emerald-border {
    border-left: 6px solid #10b981;
  }
  .stat-card.rose-border {
    background: linear-gradient(145deg, rgba(244, 63, 94, 0.16), rgba(11, 20, 38, 0.95));
    border: 1.5px solid rgba(244, 63, 94, 0.55);
    border-left: 6px solid #f43f5e;
  }
  .stat-top {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  .big-num {
    font-family: 'Outfit', sans-serif;
    font-size: 64px;
    font-weight: 900;
    line-height: 1;
    color: #00e5ff;
  }
  .big-num.gold { color: #fbbf24; }
  .big-num.emerald { color: #10b981; }
  .big-num.rose { color: #f43f5e; }
  .badge {
    font-size: 14px;
    font-weight: 800;
    padding: 6px 14px;
    border-radius: 999px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .badge.cyan {
    background: rgba(0, 229, 255, 0.14);
    border: 1px solid rgba(0, 229, 255, 0.4);
    color: #00e5ff;
  }
  .badge.gold {
    background: rgba(251, 191, 36, 0.14);
    border: 1px solid rgba(251, 191, 36, 0.4);
    color: #fbbf24;
  }
  .badge.emerald {
    background: rgba(16, 185, 129, 0.14);
    border: 1px solid rgba(16, 185, 129, 0.4);
    color: #34d399;
  }
  .badge.rose {
    background: rgba(244, 63, 94, 0.22);
    border: 1px solid rgba(244, 63, 94, 0.55);
    color: #fda4af;
  }
  .stat-title {
    font-size: 24px;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 6px;
  }
  .stat-desc {
    font-size: 19px;
    color: #cbd5e1;
    line-height: 1.42;
  }
  .stat-desc strong { color: #ffffff; }
  .footer-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 22px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  .source-note {
    font-size: 14.5px;
    color: #94a3b8;
    font-weight: 600;
  }
  .swipe-cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    font-weight: 800;
    color: #00e5ff;
  }
  .photo-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 22px;
    margin: 20px 0;
  }
  .photo-card {
    background: rgba(11, 20, 38, 0.92);
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .photo-wrap {
    height: 250px;
    position: relative;
    overflow: hidden;
  }
  .photo-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .slot-pill {
    position: absolute;
    top: 14px;
    left: 14px;
    background: rgba(4, 8, 18, 0.88);
    border: 1px solid rgba(255, 255, 255, 0.25);
    color: #ffffff;
    font-size: 13px;
    font-weight: 800;
    padding: 6px 12px;
    border-radius: 8px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .score-pill {
    position: absolute;
    bottom: 14px;
    right: 14px;
    background: rgba(244, 63, 94, 0.95);
    color: #ffffff;
    font-size: 14px;
    font-weight: 900;
    padding: 6px 12px;
    border-radius: 8px;
  }
  .photo-meta {
    padding: 18px 22px;
  }
  .photo-hotel {
    font-size: 19px;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 4px;
  }
  .photo-caption {
    font-size: 15.5px;
    color: #cbd5e1;
    line-height: 1.38;
  }
  .photo-caption strong { color: #fda4af; }
`;

const slidesHtml = [
  // SLIDE 1: 2026 Research on Vibe & Experiences (Accor x Globetrender 2026 + SiteMinder 2026)
  `
  <div class="slide" id="slide-1">
    <div class="top-bar">
      <div class="brand">Atmos<span>Vibe</span></div>
      <div class="slide-num">1 / 4</div>
    </div>

    <div>
      <div class="kicker">2026 Hospitality Research • Accor &amp; SiteMinder</div>
      <h1>In 2026, <span class="cyan">Vibe &amp; Experiences</span> Drive Hotel Bookings.</h1>
      <p class="lead">New 2026 consumer research from <strong>ALL Accor × Globetrender</strong> ("When Moods Drive Bookings") and <strong>SiteMinder</strong> shows how guests choose where to stay:</p>
    </div>

    <div class="stat-stack" style="gap: 18px;">
      <div class="stat-card cyan-border">
        <div class="stat-top">
          <div class="big-num">1 in 4 <span style="font-size:34px;color:#94a3b8;font-weight:700;">(25%)</span></div>
          <div class="badge cyan">Accor 2026 Report</div>
        </div>
        <div class="stat-title">Want to Search by "Mood &amp; Vibe" First</div>
        <div class="stat-desc"><strong>25% of travellers</strong> want their online search to begin with <strong>mood and vibe</strong> rather than geography alone.</div>
      </div>

      <div class="stat-card gold-border">
        <div class="stat-top">
          <div class="big-num gold">85%</div>
          <div class="badge gold">Accor 2026 Report</div>
        </div>
        <div class="stat-title">Seek Shared Social Spaces &amp; Atmosphere</div>
        <div class="stat-desc"><strong>85% of travellers</strong> prioritize social connection &amp; vibrant communal spaces (rooftops, bars, dining, wellness).</div>
      </div>

      <div class="stat-card emerald-border">
        <div class="stat-top">
          <div class="big-num emerald">58%</div>
          <div class="badge emerald">SiteMinder 2026 (+4pp)</div>
        </div>
        <div class="stat-title">Upgrade Rooms for an Elevated Experience</div>
        <div class="stat-desc"><strong>58% of guests</strong> now book Superior or Luxury rooms over standard rooms for a more elevated property experience.</div>
      </div>
    </div>

    <div class="footer-bar">
      <div class="source-note">Sources: ALL Accor × Globetrender (Jan 2026) &amp; SiteMinder 2026 Report</div>
      <div class="swipe-cta">Where do guests look first? →</div>
    </div>
  </div>
  `,

  // SLIDE 2: Where Guests Discover Vibe & Experiences (SiteMinder 2026)
  `
  <div class="slide" id="slide-2">
    <div class="top-bar">
      <div class="brand">Atmos<span>Vibe</span></div>
      <div class="slide-num">2 / 4</div>
    </div>

    <div>
      <div class="kicker">2026 Discovery Shift • SiteMinder Report</div>
      <h1>Where Do Guests Look First for <span class="cyan">Vibe &amp; Experiences?</span></h1>
      <p class="lead">Before a guest ever reaches your website, your <strong>OTA listing</strong> is now their #1 discovery window.</p>
    </div>

    <div class="stat-stack" style="gap: 28px;">
      <div class="stat-card cyan-border" style="padding: 36px 40px;">
        <div class="stat-top">
          <div class="big-num" style="font-size: 74px;">26% <span style="font-size:36px;color:#94a3b8;font-weight:700;">vs 21%</span></div>
          <div class="badge cyan">#1 Starting Point in 2026</div>
        </div>
        <div class="stat-title" style="font-size: 26px;">OTAs Overtook Search Engines for Hotel Discovery</div>
        <div class="stat-desc" style="font-size: 20px;"><strong>26% of travellers</strong> now start their 2026 hotel search on an OTA (up from 18%), while search engines dropped from <strong>36% down to 21%</strong>.</div>
      </div>

      <div class="stat-card emerald-border" style="padding: 36px 40px;">
        <div class="stat-top">
          <div class="big-num emerald" style="font-size: 74px;">18%</div>
          <div class="badge emerald">Up +3.3pp for 2026</div>
        </div>
        <div class="stat-title" style="font-size: 26px;">Shortlist on the OTA → Switch to Book Direct</div>
        <div class="stat-desc" style="font-size: 20px;">Nearly <strong>1 in 5 guests</strong> who discover a hotel on an OTA use its gallery to shortlist—then switch to <strong>book direct on the hotel's website</strong>.</div>
      </div>
    </div>

    <div class="footer-bar">
      <div class="source-note">Source: SiteMinder Changing Traveller Report 2026 (12,000 travellers)</div>
      <div class="swipe-cta">So we audited London's top 10 →</div>
    </div>
  </div>
  `,

  // SLIDE 3: The AtmosVibe London 10 Audit (Own Site vs Booking.com)
  `
  <div class="slide" id="slide-3">
    <div class="top-bar">
      <div class="brand">Atmos<span>Vibe</span></div>
      <div class="slide-num">3 / 4</div>
    </div>

    <div>
      <div class="kicker rose">AtmosVibe 2026 London 10 Lifestyle Benchmark</div>
      <h1>Hotels Show Their <span class="cyan">Vibe &amp; Experiences</span> on Their Site—<span class="rose">But Hide Them on OTAs</span></h1>
      <p class="lead">We audited 135,000+ guest reviews, hotel websites, Instagram, and live Booking.com hero galleries across London's top 10 lifestyle hotels.</p>
    </div>

    <div class="stat-stack" style="gap: 18px;">
      <div class="stat-card emerald-border" style="padding: 26px 34px;">
        <div class="stat-top" style="margin-bottom: 6px;">
          <div class="big-num emerald" style="font-size: 60px;">92.5 <span style="font-size:30px;color:#94a3b8;">/ 100</span></div>
          <div class="badge emerald">135,000+ Guest Reviews</div>
        </div>
        <div class="stat-title" style="font-size: 23px; margin-bottom: 4px;">Real-World Vibe &amp; Experiences</div>
        <div class="stat-desc" style="font-size: 18.5px;">Guests overwhelmingly rave about the <strong>rooftop bars, destination dining, and social atmosphere</strong>.</div>
      </div>

      <div class="stat-card cyan-border" style="padding: 26px 34px;">
        <div class="stat-top" style="margin-bottom: 6px;">
          <div class="big-num" style="font-size: 60px;">88.4 <span style="font-size:30px;color:#94a3b8;">/ 100</span></div>
          <div class="badge cyan">Owned Channels</div>
        </div>
        <div class="stat-title" style="font-size: 23px; margin-bottom: 4px;">Hotel Website &amp; Instagram</div>
        <div class="stat-desc" style="font-size: 18.5px;">On their own sites, hotels lead with their <strong>signature experiences, rooftops, and design energy</strong>.</div>
      </div>

      <div class="stat-card rose-border" style="padding: 26px 34px;">
        <div class="stat-top" style="margin-bottom: 6px;">
          <div class="big-num rose" style="font-size: 60px;">56.5 <span style="font-size:30px;color:#fda4af;">/ 100</span></div>
          <div class="badge rose">70% Utility Shots (35 of 50)</div>
        </div>
        <div class="stat-title" style="font-size: 23px; margin-bottom: 4px;">Booking.com Top-5 Hero Gallery</div>
        <div class="stat-desc" style="font-size: 18.5px;">A <strong>-36pt drop</strong>: <strong>70% of Top-5 OTA hero slots</strong> show generic beds, couches, or bathrooms instead of vibe &amp; experiences.</div>
      </div>
    </div>

    <div class="footer-bar">
      <div class="source-note">Source: AtmosVibe 2026 London 10 Lifestyle Hotel Audit</div>
      <div class="swipe-cta">See live Booking.com examples →</div>
    </div>
  </div>
  `,

  // SLIDE 4: Visual Proof & Callout
  `
  <div class="slide" id="slide-4">
    <div class="top-bar">
      <div class="brand">Atmos<span>Vibe</span></div>
      <div class="slide-num">4 / 4</div>
    </div>

    <div>
      <div class="kicker rose">Live Booking.com Top-5 Hero Gallery Proof</div>
      <h1>Guests Search for <span class="cyan">Vibe &amp; Experiences.</span> <span class="rose">Here’s What Booking.com Shows:</span></h1>
    </div>

    <div class="photo-grid">
      <div class="photo-card">
        <div class="photo-wrap">
          <img src="${imgSoap}" alt="Hoxton Southwark Slot 3" />
          <div class="slot-pill">Hero Slot #3 of 5</div>
          <div class="score-pill">15 / 100 Vibe</div>
        </div>
        <div class="photo-meta">
          <div class="photo-hotel">The Hoxton, Southwark (94 Real Vibe)</div>
          <div class="photo-caption">Shows <strong>3 wall-mounted soap bottles</strong> instead of Seabird rooftop restaurant.</div>
        </div>
      </div>

      <div class="photo-card">
        <div class="photo-wrap">
          <img src="${imgGym}" alt="Hoxton Southwark Slot 5" />
          <div class="slot-pill">Hero Slot #5 of 5</div>
          <div class="score-pill">32 / 100 Vibe</div>
        </div>
        <div class="photo-meta">
          <div class="photo-hotel">The Hoxton, Southwark (94 Real Vibe)</div>
          <div class="photo-caption">Shows <strong>gym exercise bikes</strong> in the Top-5 hero window instead of rooftop views.</div>
        </div>
      </div>

      <div class="photo-card">
        <div class="photo-wrap">
          <img src="${imgSink}" alt="Hoxton Shoreditch Slot 2" />
          <div class="slot-pill">Hero Slot #2 of 5</div>
          <div class="score-pill">28 / 100 Vibe</div>
        </div>
        <div class="photo-meta">
          <div class="photo-hotel">The Hoxton, Shoreditch (92 Real Vibe)</div>
          <div class="photo-caption">Shows a <strong>tight bathroom sink crop</strong> instead of Llama Inn rooftop or lobby buzz.</div>
        </div>
      </div>

      <div class="photo-card">
        <div class="photo-wrap">
          <img src="${imgCouch}" alt="Sea Containers Slot 2" />
          <div class="slot-pill">4 of 5 Hero Slots</div>
          <div class="score-pill">42 / 100 Vibe</div>
        </div>
        <div class="photo-meta">
          <div class="photo-hotel">Sea Containers London (92 Real Vibe)</div>
          <div class="photo-caption"><strong>4 of 5 hero photos are empty couches</strong>—hiding 12th Knot rooftop &amp; Thames views.</div>
        </div>
      </div>
    </div>

    <div class="stat-card cyan-border" style="padding: 24px 32px; margin: 0;">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div>
          <div style="font-size:22px;font-weight:800;color:#ffffff;">Turn Your Vibe &amp; Experiences into Bookings</div>
          <div style="font-size:17px;color:#cbd5e1;margin-top:4px;">Explore the full 10-hotel benchmark at <strong>atmosvibe.io/vibe-insights</strong></div>
        </div>
        <div style="background:rgba(0,229,255,0.16);border:1px solid rgba(0,229,255,0.5);color:#00e5ff;font-weight:800;font-size:18px;padding:12px 22px;border-radius:12px;">
          atmosvibe.io
        </div>
      </div>
    </div>
  </div>
  `
];

const fullHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Outfit:wght@700;800;900&display=swap" rel="stylesheet">
<style>${commonStyles}</style>
</head>
<body>
  ${slidesHtml.join('\n')}
</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1080, height: 1350 },
  deviceScaleFactor: 2
});

await page.setContent(fullHtml, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

for (let i = 1; i <= 4; i++) {
  const el = await page.locator(`#slide-${i}`);
  const fileName = `AtmosVibe-Carousel-Slide-${i}.png`;
  const pubPath = path.join(publicDir, fileName);
  const artPath = path.join(artifactDir, fileName);
  await el.screenshot({ path: pubPath });
  fs.copyFileSync(pubPath, artPath);
  console.log(`Saved ${fileName}`);
}

const pdfName = 'AtmosVibe-SiteMinder-LinkedIn-Carousel.pdf';
const pdfPubPath = path.join(publicDir, pdfName);
const pdfArtPath = path.join(artifactDir, pdfName);
await page.pdf({
  path: pdfPubPath,
  width: '1080px',
  height: '1350px',
  printBackground: true,
  margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
});
fs.copyFileSync(pdfPubPath, pdfArtPath);
console.log(`Saved ${pdfName}`);

await browser.close();
