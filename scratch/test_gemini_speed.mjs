import * as dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function testModel(modelName) {
  console.log(`Testing ${modelName}...`);
  const t0 = Date.now();
  try {
    const model = genAI.getGenerativeModel({
      model: modelName,
      generationConfig: { responseMimeType: 'application/json' }
    });
    const res = await model.generateContent('Return JSON with key "status": "ok" and "venue": "The Plymouth Hotel"');
    console.log(`${modelName} success in ${Date.now() - t0}ms:`, res.response.text());
  } catch (err) {
    console.error(`${modelName} error in ${Date.now() - t0}ms:`, err.message);
  }
}

async function run() {
  await testModel('gemini-2.5-flash');
  await testModel('gemini-2.0-flash');
  await testModel('gemini-1.5-flash');
}

run();
