import * as dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function verifyImage(imageUrl, expectedCategory) {
  try {
    const resp = await fetch(imageUrl);
    const buf = Buffer.from(await resp.arrayBuffer());
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: { responseMimeType: 'application/json' }
    });

    const prompt = `Inspect this image. Does it depict a ${expectedCategory}?
Return JSON:
{
  "detected_subject": "brief description",
  "is_match": boolean,
  "is_bedroom": boolean,
  "is_bathroom": boolean,
  "is_pool": boolean,
  "is_dining_or_bar": boolean,
  "is_exterior_facade": boolean
}`;

    const res = await model.generateContent([
      { inlineData: { data: buf.toString('base64'), mimeType: 'image/jpeg' } },
      { text: prompt }
    ]);
    return JSON.parse(res.response.text());
  } catch (err) {
    return { error: err.message };
  }
}

async function run() {
  console.log('Testing Photo #3 (175766765.jpg) against BATHROOM:');
  const res3 = await verifyImage('https://cf.bstatic.com/xdata/images/hotel/max1024x768/175766765.jpg?k=1b1779d415e305db2c281191696474e2832ba66fb2dc9f08ad1aa0b9ff088bda&o=', 'BATHROOM');
  console.log('Photo #3 result:', res3);

  console.log('\nTesting Official Bath (obts-bath_wide.jpg) against BATHROOM:');
  const resBath = await verifyImage('https://image-tc.galaxy.tf/wijpeg-9b35z5btd20vlqs8jqyphu9jj/obts-bath_wide.jpg?crop=0%2C101%2C2000%2C1125', 'BATHROOM');
  console.log('Official Bath result:', resBath);
}

run();
