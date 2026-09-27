import * as dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from '@google/generative-ai';
import { masterVibeSchema } from '../src/schemas/masterVibeSchema.mjs';

const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function testDirectCall() {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: masterVibeSchema,
      temperature: 0.2,
    }
  });

  const prompt = `Synthesize a complete Master Vibe Audit JSON payload for "The Hoxton, Shepherd's Bush" in "London".
Corpus: Boutique hotel with mid-century style, Chet's Thai-American diner, retro lobby, 237 rooms.
Return a valid JSON object matching the schema.`;

  console.log('Sending direct generateContent to gemini-2.5-flash with masterVibeSchema...');
  const t0 = Date.now();
  try {
    const res = await model.generateContent(prompt);
    console.log(`Direct call succeeded in ${((Date.now() - t0)/1000).toFixed(1)}s!`);
    const txt = res.response.text();
    console.log('JSON length:', txt.length);
    console.log('Sample headline:', JSON.parse(txt).vibe_manifest?.vibe_headline);
  } catch (err) {
    console.error(`Direct call failed in ${((Date.now() - t0)/1000).toFixed(1)}s:`, err);
  }
}

testDirectCall();
