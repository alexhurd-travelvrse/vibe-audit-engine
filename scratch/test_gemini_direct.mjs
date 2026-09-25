import * as dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
console.log('Using API key:', apiKey ? apiKey.slice(0, 10) + '...' : 'NONE');

const genAI = new GoogleGenerativeAI(apiKey);

async function testGemini() {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    console.log('Calling gemini-2.5-flash text...');
    const res = await model.generateContent('Hello, respond in one word: OK');
    console.log('Result:', res.response.text());
  } catch (err) {
    console.error('Error with gemini-2.5-flash:', err.message);
  }
}

testGemini();
