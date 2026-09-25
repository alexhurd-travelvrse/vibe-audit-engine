import * as dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function downloadImageBase64(url) {
  try {
    const resp = await fetch(url, { signal: AbortSignal.timeout(6000) });
    if (!resp.ok) return null;
    const buffer = Buffer.from(await resp.arrayBuffer());
    if (buffer.length < 1200) return null;
    let mimeType = 'image/jpeg';
    if (buffer[0] === 0x89 && buffer[1] === 0x50) mimeType = 'image/png';
    else if (buffer[0] === 0x52 && buffer[1] === 0x49) mimeType = 'image/webp';
    return { base64: buffer.toString('base64'), mimeType };
  } catch (e) {
    return null;
  }
}

async function verifyImageWithVision(imageUrl, expectedCategory) {
  const imgData = await downloadImageBase64(imageUrl);
  if (!imgData) return { isMatch: false, reason: 'Failed to download' };

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          detected_subject: { type: SchemaType.STRING },
          is_match: { type: SchemaType.BOOLEAN },
          is_bedroom: { type: SchemaType.BOOLEAN },
          is_bathroom: { type: SchemaType.BOOLEAN },
          is_pool: { type: SchemaType.BOOLEAN },
          is_restaurant_bar: { type: SchemaType.BOOLEAN },
          is_exterior_facade: { type: SchemaType.BOOLEAN }
        },
        required: ['detected_subject', 'is_match', 'is_bedroom', 'is_bathroom', 'is_pool', 'is_restaurant_bar', 'is_exterior_facade']
      }
    }
  });

  const res = await model.generateContent([
    { text: `Analyze this hotel photo. Does it represent category: "${expectedCategory}"? Be strict: bedrooms/beds are NOT bathrooms, swimming pools are NOT dining bars, and bedrooms are NOT exterior facades.` },
    { inlineData: { data: imgData.base64, mimeType: imgData.mimeType } }
  ]);

  return JSON.parse(res.response.text());
}

async function runTests() {
  const images = [
    { url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/175773716.jpg?k=a9a8e40f21ba8f8efdc834666bc5ccfc95fca0e97dca2e790bbc5761682a62b0&o=', cat: 'POOL' },
    { url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/175766798.jpg?k=472335bcd34d24f472081094d733da20e58a79c2a666392a06bd940f9522dfe4&o=', cat: 'BEDROOM' },
    { url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/175765147.jpg?k=d79dc58345f34fd32a250d47160109d391f35601d1cdcd99be90c0f845c47ef8&o=', cat: 'DINING_BAR' },
    { url: 'https://image-tc.galaxy.tf/wijpeg-8gd1lxfjqhxue6vrtpd0qg7l6/bedq3_standard.jpg?crop=111%2C0%2C1779%2C1334', cat: 'BATHROOM' } // This is actually a bedroom!
  ];

  for (const item of images) {
    console.log(`\nTesting category "${item.cat}" on ${item.url.slice(0, 70)}...`);
    const result = await verifyImageWithVision(item.url, item.cat);
    console.log('Result:', JSON.stringify(result, null, 2));
  }
}

runTests().catch(console.error);
