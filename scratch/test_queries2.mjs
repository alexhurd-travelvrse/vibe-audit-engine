import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const apiKey = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

const testQueries = [
  'site:booking.com "Nobu Hotel Barcelona"',
  'site:booking.com Nobu Hotel Barcelona',
  'Nobu Hotel Barcelona booking.com',
  'Nobu Barcelona booking.com'
];

for (const q of testQueries) {
  const res = await fetch('https://google.serper.dev/search', {
    method: 'POST',
    headers: { 'X-API-KEY': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q, num: 5 })
  });
  const data = await res.json();
  console.log(`Q: "${q}" -> Results: ${data.organic?.length || 0}`);
  if (data.organic && data.organic.length > 0) {
    for (const it of data.organic.slice(0, 2)) {
      console.log(`   - ${it.title} (${it.link})`);
    }
  }
}
