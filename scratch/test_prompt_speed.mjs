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
CRITICAL OUTPUT FORMAT: Return a valid JSON object strictly conforming to the response schema.`;

  console.log('Testing speed without redundant stringified schema in prompt text...');
  const t0 = Date.now();
  try {
    const res = await model.generateContent(prompt);
    console.log(`Success in ${((Date.now() - t0)/1000).toFixed(1)}s!`);
    const txt = res.response.text();
    console.log('JSON length:', txt.length);
    const parsed = JSON.parse(txt);
    console.log('Venue:', parsed.venue_name);
    console.log('Headline:', parsed.vibe_signature?.headline);
    console.log('Energy score:', parsed.vibe_signature?.energy_score);
    console.log('Strategic shift 1:', parsed.ota_conversion_audit?.key_strategic_shifts?.[0]?.shift_title);
  } catch (err) {
    console.error(`Failed in ${((Date.now() - t0)/1000).toFixed(1)}s:`, err);
  }
}

testDirectCall();
