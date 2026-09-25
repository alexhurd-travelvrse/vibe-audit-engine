import * as dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { resolveAuditPhotos } from '../api/master-vibe-audit.js';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function testVisionClassification() {
  console.log('Fetching live booking photos for Plymouth...');
  // We can fetch live photos directly
  const { chromium } = await import('playwright');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.booking.com/hotel/us/the-plymouth-miami-beach.html', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  
  const urls = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img[src*="bstatic.com"]'));
    return imgs.map(img => img.src.replace(/\/max\d+x\d+\//, '/max500/')).slice(0, 12);
  });
  await browser.close();

  console.log(`Extracted ${urls.length} images. Downloading for Gemini Vision...`);
  
  const imageParts = [];
  for (let i = 0; i < urls.length; i++) {
    const resp = await fetch(urls[i]);
    const buf = Buffer.from(await resp.arrayBuffer());
    imageParts.push({
      text: `Photo #${i + 1}:`
    });
    imageParts.push({
      inlineData: {
        data: buf.toString('base64'),
        mimeType: 'image/jpeg'
      }
    });
  }

  const prompt = `You are a hospitality visual gatekeeper.
Inspect these ${urls.length} photos and return a JSON array classifying each photo:
[
  {
    "photo_index": 1,
    "category": "POOL | EXTERIOR_FACADE | BEDROOM | BATHROOM | RESTAURANT_DINING_BAR | LOBBY_LOUNGE | MEETING_ROOM | OTHER",
    "subject": "Detailed description of what is visible",
    "is_true_pool": boolean,
    "is_true_exterior_facade": boolean,
    "is_true_bathroom": boolean,
    "is_true_dining_bar": boolean
  }
]
`;

  console.log('Calling Gemini Vision 2.5-flash...');
  const t0 = Date.now();
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: { responseMimeType: 'application/json' }
  });

  const res = await model.generateContent([...imageParts, { text: prompt }]);
  console.log(`Gemini Vision classified all ${urls.length} photos in ${Date.now() - t0}ms!`);
  const parsed = JSON.parse(res.response.text());
  console.log(JSON.stringify(parsed, null, 2));
}

testVisionClassification().catch(console.error);
