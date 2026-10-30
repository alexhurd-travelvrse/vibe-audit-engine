import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const apiKey = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

const res = await fetch('https://google.serper.dev/search', {
  method: 'POST',
  headers: { 'X-API-KEY': apiKey, 'Content-Type': 'application/json' },
  body: JSON.stringify({ q: 'apple' })
});

console.log('HTTP Status:', res.status);
const json = await res.json();
console.log('Response:', json);
