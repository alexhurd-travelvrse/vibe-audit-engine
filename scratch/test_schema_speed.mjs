import * as dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { masterVibeSchema } from '../src/schemas/masterVibeSchema.mjs';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function testWithSchema() {
  console.log('Testing gemini-2.5-flash WITH masterVibeSchema...');
  const t0 = Date.now();
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: { 
        responseMimeType: 'application/json',
        responseSchema: masterVibeSchema,
        temperature: 0.2
      }
    });
    const res = await model.generateContent('Synthesize vibe audit for The Plymouth Hotel Miami. Return valid JSON matching schema.');
    console.log(`With schema success in ${Date.now() - t0}ms! Length:`, res.response.text().length);
  } catch (err) {
    console.error(`With schema error in ${Date.now() - t0}ms:`, err.message);
  }
}

async function testWithoutSchema() {
  console.log('Testing gemini-2.5-flash WITHOUT masterVibeSchema (prompt-instructed JSON)...');
  const t0 = Date.now();
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: { 
        responseMimeType: 'application/json',
        temperature: 0.2
      }
    });
    const res = await model.generateContent(`You must return valid JSON matching this schema: ${JSON.stringify(masterVibeSchema)}\n\nSynthesize vibe audit for The Plymouth Hotel Miami.`);
    console.log(`Without schema success in ${Date.now() - t0}ms! Length:`, res.response.text().length);
    const parsed = JSON.parse(res.response.text());
    console.log('Parsed successfully! Energy score:', parsed.vibe_signature?.energy_score);
  } catch (err) {
    console.error(`Without schema error in ${Date.now() - t0}ms:`, err.message);
  }
}

async function run() {
  await testWithoutSchema();
  await testWithSchema();
}

run();
