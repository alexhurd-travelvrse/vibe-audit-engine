import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function generateLinkedInAssets() {
  const browser = await chromium.launch();
  
  const svgPath = path.resolve('public/models/Atmosvibe6.svg');
  const svgContent = fs.readFileSync(svgPath, 'utf-8');

  // Extract <defs>
  const defsMatch = svgContent.match(/<defs>[\s\S]*?<\/defs>/);
  const defsContent = defsMatch ? defsMatch[0] : '';

  // 1. LinkedIn Profile Picture (800 x 800) - Icon Centerpiece
  const pageIcon = await browser.newPage({
    viewport: { width: 800, height: 800 },
    deviceScaleFactor: 1
  });

  const htmlProfileIcon = `
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; }
          body {
            margin: 0;
            padding: 0;
            width: 800px;
            height: 800px;
            background: radial-gradient(circle at 50% 45%, #0d223f 0%, #050b14 72%);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }
          .icon-container {
            width: 440px;
            height: 440px;
            display: flex;
            align-items: center;
            justify-content: center;
            filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 35px rgba(0, 229, 255, 0.2));
          }
          svg {
            width: 100%;
            height: 100%;
          }
        </style>
      </head>
      <body>
        <div class="icon-container">
          <svg viewBox="0 0 90 90" fill="none">
            ${defsContent}
            <!-- Prism Mark -->
            <polygon points="42,11 12.5,28 24,58 42,26" fill="url(#nav_facetTeal)" stroke="rgba(0, 229, 255, 0.35)" stroke-width="0.8" stroke-linejoin="round" />
            <polygon points="42,11 71.5,28 60,58 42,26" fill="url(#nav_facetWhite)" stroke="rgba(255, 255, 255, 0.4)" stroke-width="0.8" stroke-linejoin="round" />
            <polygon points="12.5,28 12.5,62 42,79 42,58 24,58" fill="url(#nav_facetDeep)" stroke="rgba(56, 189, 248, 0.3)" stroke-width="0.8" stroke-linejoin="round" />
            <polygon points="71.5,28 71.5,62 42,79 42,58 60,58" fill="url(#nav_facetAmber)" stroke="rgba(245, 158, 11, 0.4)" stroke-width="0.8" stroke-linejoin="round" />
            <polygon points="42,26 60,58 24,58" fill="#060D1A" stroke="#FFFFFF" stroke-width="2.2" stroke-linejoin="round" />
            <circle cx="42" cy="47" r="11" fill="url(#nav_amberCore)" filter="url(#nav_glowAmber)" opacity="0.65" />
            <circle cx="42" cy="47" r="8" fill="url(#nav_amberCore)" stroke="#FFFBEB" stroke-width="0.8" />
            <polygon points="42,11 71.5,28 71.5,62 42,79 12.5,62 12.5,28" fill="none" stroke="url(#nav_hexBorder)" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round" />
          </svg>
        </div>
      </body>
    </html>
  `;

  await pageIcon.setContent(htmlProfileIcon, { waitUntil: 'networkidle' });
  await pageIcon.evaluateHandle('document.fonts.ready');

  const downloadsDir = 'C:\\Users\\Student\\Downloads';
  const desktopDir = 'C:\\Users\\Student\\Desktop';
  const publicDir = path.resolve('public');
  const artifactsDir = path.resolve('../../brain/1aab93db-7668-42c3-a55f-d4f72ca80c5b');

  const iconName = 'AtmosVibe-LinkedIn-Profile-Logo.png';
  await pageIcon.screenshot({ path: path.join(downloadsDir, iconName) });
  await pageIcon.screenshot({ path: path.join(desktopDir, iconName) });
  await pageIcon.screenshot({ path: path.join(publicDir, iconName) });
  await pageIcon.screenshot({ path: path.join(artifactsDir, iconName) });
  console.log('Saved LinkedIn Profile Logo to Downloads and Desktop');

  // 2. LinkedIn Profile Picture (800 x 800) - Stacked with "AtmosVibe" Wordmark
  const pageStacked = await browser.newPage({
    viewport: { width: 800, height: 800 },
    deviceScaleFactor: 1
  });

  const htmlProfileStacked = `
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; }
          body {
            margin: 0;
            padding: 0;
            width: 800px;
            height: 800px;
            background: radial-gradient(circle at 50% 40%, #0d223f 0%, #050b14 74%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;
          }
          .icon-wrap {
            width: 300px;
            height: 300px;
            filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 25px rgba(0, 229, 255, 0.25));
          }
          .wordmark {
            font-family: 'Inter', sans-serif;
            font-size: 64px;
            font-weight: 300;
            letter-spacing: -1.5px;
            color: #ffffff;
            margin-top: 10px;
          }
          .wordmark strong {
            font-weight: 900;
            background: linear-gradient(135deg, #38BDF8 0%, #00E5FF 60%, #0284C7 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          svg { width: 100%; height: 100%; }
        </style>
      </head>
      <body>
        <div class="icon-wrap">
          <svg viewBox="0 0 90 90" fill="none">
            ${defsContent}
            <polygon points="42,11 12.5,28 24,58 42,26" fill="url(#nav_facetTeal)" stroke="rgba(0, 229, 255, 0.35)" stroke-width="0.8" stroke-linejoin="round" />
            <polygon points="42,11 71.5,28 60,58 42,26" fill="url(#nav_facetWhite)" stroke="rgba(255, 255, 255, 0.4)" stroke-width="0.8" stroke-linejoin="round" />
            <polygon points="12.5,28 12.5,62 42,79 42,58 24,58" fill="url(#nav_facetDeep)" stroke="rgba(56, 189, 248, 0.3)" stroke-width="0.8" stroke-linejoin="round" />
            <polygon points="71.5,28 71.5,62 42,79 42,58 60,58" fill="url(#nav_facetAmber)" stroke="rgba(245, 158, 11, 0.4)" stroke-width="0.8" stroke-linejoin="round" />
            <polygon points="42,26 60,58 24,58" fill="#060D1A" stroke="#FFFFFF" stroke-width="2.2" stroke-linejoin="round" />
            <circle cx="42" cy="47" r="11" fill="url(#nav_amberCore)" filter="url(#nav_glowAmber)" opacity="0.65" />
            <circle cx="42" cy="47" r="8" fill="url(#nav_amberCore)" stroke="#FFFBEB" stroke-width="0.8" />
            <polygon points="42,11 71.5,28 71.5,62 42,79 12.5,62 12.5,28" fill="none" stroke="url(#nav_hexBorder)" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round" />
          </svg>
        </div>
        <div class="wordmark">Atmos<strong>Vibe</strong></div>
      </body>
    </html>
  `;

  await pageStacked.setContent(htmlProfileStacked, { waitUntil: 'networkidle' });
  await pageStacked.evaluateHandle('document.fonts.ready');

  const stackedName = 'AtmosVibe-LinkedIn-Profile-Stacked.png';
  await pageStacked.screenshot({ path: path.join(downloadsDir, stackedName) });
  await pageStacked.screenshot({ path: path.join(desktopDir, stackedName) });
  await pageStacked.screenshot({ path: path.join(publicDir, stackedName) });
  await pageStacked.screenshot({ path: path.join(artifactsDir, stackedName) });
  console.log('Saved LinkedIn Stacked Logo to Downloads and Desktop');

  // 3. LinkedIn Company Banner (1584 x 396 px - Standard Retina Banner)
  const pageBanner = await browser.newPage({
    viewport: { width: 1584, height: 396 },
    deviceScaleFactor: 1
  });

  const htmlBanner = `
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; }
          body {
            margin: 0;
            padding: 0;
            width: 1584px;
            height: 396px;
            background: linear-gradient(135deg, #050b14 0%, #081628 40%, #050b14 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
          }
          .glow-bg {
            position: absolute;
            width: 800px;
            height: 300px;
            background: radial-gradient(ellipse at center, rgba(0, 229, 255, 0.12) 0%, rgba(245, 158, 11, 0.05) 50%, transparent 70%);
            filter: blur(40px);
            z-index: 1;
          }
          .logo-lockup {
            position: relative;
            z-index: 10;
            width: 820px;
            height: 160px;
            filter: drop-shadow(0 15px 35px rgba(0, 0, 0, 0.8));
          }
          svg {
            width: 100%;
            height: 100%;
          }
        </style>
      </head>
      <body>
        <div class="glow-bg"></div>
        <div class="logo-lockup">
          ${svgContent}
        </div>
      </body>
    </html>
  `;

  await pageBanner.setContent(htmlBanner, { waitUntil: 'networkidle' });
  await pageBanner.evaluateHandle('document.fonts.ready');

  const bannerName = 'AtmosVibe-LinkedIn-Cover-Banner.png';
  await pageBanner.screenshot({ path: path.join(downloadsDir, bannerName) });
  await pageBanner.screenshot({ path: path.join(desktopDir, bannerName) });
  await pageBanner.screenshot({ path: path.join(publicDir, bannerName) });
  await pageBanner.screenshot({ path: path.join(artifactsDir, bannerName) });
  console.log('Saved LinkedIn Cover Banner to Downloads and Desktop');

  await browser.close();
}

generateLinkedInAssets().catch(console.error);
