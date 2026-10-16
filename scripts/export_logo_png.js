import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function exportLogos() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1200, height: 800 },
    deviceScaleFactor: 4 // Ultra high-res 4x export
  });

  const svgPath = path.resolve('public/models/Atmosvibe6.svg');
  const svgContent = fs.readFileSync(svgPath, 'utf-8');

  // 1. Transparent version (Original dark-mode white/cyan lockup)
  const htmlTransparent = `
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap" rel="stylesheet">
        <style>
          body { margin: 0; padding: 20px; background: transparent; display: inline-block; }
          #logo { display: block; width: 460px; height: 90px; }
        </style>
      </head>
      <body>
        <div id="logo">${svgContent}</div>
      </body>
    </html>
  `;

  await page.setContent(htmlTransparent, { waitUntil: 'networkidle' });
  // Wait for Google Fonts to be ready
  await page.evaluateHandle('document.fonts.ready');

  const logoElement = await page.$('#logo');
  
  // Output paths
  const publicDir = path.resolve('public');
  const artifactsDir = path.resolve('../../brain/1aab93db-7668-42c3-a55f-d4f72ca80c5b');

  const transparentPngPublic = path.join(publicDir, 'atmosvibe-logo-transparent.png');
  const transparentPngArtifact = path.join(artifactsDir, 'atmosvibe-logo-transparent.png');

  await logoElement.screenshot({
    path: transparentPngPublic,
    omitBackground: true
  });
  await logoElement.screenshot({
    path: transparentPngArtifact,
    omitBackground: true
  });
  console.log('Saved transparent logo:', transparentPngPublic);

  // 2. Dark Luxury Background version (#050B14)
  const htmlDark = `
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap" rel="stylesheet">
        <style>
          body { 
            margin: 0; 
            padding: 40px 60px; 
            background: #050B14; 
            display: inline-block; 
            border-radius: 16px;
          }
          #logo { display: block; width: 460px; height: 90px; }
        </style>
      </head>
      <body>
        <div id="logo">${svgContent}</div>
      </body>
    </html>
  `;

  await page.setContent(htmlDark, { waitUntil: 'networkidle' });
  await page.evaluateHandle('document.fonts.ready');

  const darkPngPublic = path.join(publicDir, 'atmosvibe-logo-dark.png');
  const darkPngArtifact = path.join(artifactsDir, 'atmosvibe-logo-dark.png');

  const bodyElement = await page.$('body');
  await bodyElement.screenshot({
    path: darkPngPublic
  });
  await bodyElement.screenshot({
    path: darkPngArtifact
  });
  console.log('Saved dark background logo:', darkPngPublic);

  // 3. Mark / Icon only (Transparent)
  const svgIconOnly = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" width="90" height="90" fill="none">
      ${svgContent.substring(svgContent.indexOf('<defs>'), svgContent.indexOf('<!-- ==================== TYPOGRAPHY LOCKUP'))}
    </svg>
  `;

  const htmlIcon = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { margin: 0; padding: 10px; background: transparent; display: inline-block; }
          #icon { display: block; width: 90px; height: 90px; }
        </style>
      </head>
      <body>
        <div id="icon">${svgIconOnly}</div>
      </body>
    </html>
  `;

  await page.setContent(htmlIcon, { waitUntil: 'networkidle' });
  const iconElement = await page.$('#icon');

  const iconPngPublic = path.join(publicDir, 'atmosvibe-icon-transparent.png');
  const iconPngArtifact = path.join(artifactsDir, 'atmosvibe-icon-transparent.png');

  await iconElement.screenshot({
    path: iconPngPublic,
    omitBackground: true
  });
  await iconElement.screenshot({
    path: iconPngArtifact,
    omitBackground: true
  });
  console.log('Saved icon mark logo:', iconPngPublic);

  await browser.close();
  console.log('All logo exports completed successfully');
}

exportLogos().catch(console.error);
