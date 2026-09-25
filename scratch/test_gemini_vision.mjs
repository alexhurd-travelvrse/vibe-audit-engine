import * as dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function testVision() {
  const testImageUrl = 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/175773716.jpg?k=a9a8e40f21ba8f8efdc834666bc5ccfc95fca0e97dca2e790bbc5761682a62b0&o=';
  console.log('Downloading test image...');
  const resp = await fetch(testImageUrl);
  const buffer = Buffer.from(await resp.arrayBuffer());
  const base64 = buffer.toString('base64');
  console.log('Downloaded. Size in bytes:', buffer.length);

  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const start = Date.now();
  console.log('Sending vision request to Gemini 2.5 Flash...');
  const res = await model.generateContent([
    { text: 'Describe what you see in this photo in 1 sentence, and classify it into one category (e.g. POOL, BEDROOM, BATHROOM, DINING, EXTERIOR):' },
    { inlineData: { data: base64, mimeType: 'image/jpeg' } }
  ]);
  console.log(`Response received in ${Date.now() - start}ms:`);
  console.log(res.response.text());
}

testVision().catch(console.error);
