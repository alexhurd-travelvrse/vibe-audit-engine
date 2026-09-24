import * as dotenv from 'dotenv';
dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

async function testNum15() {
  const q = `site:booking.com/hotel/ "mandarin oriental" London`;
  const res = await fetch('https://google.serper.dev/search', {
    method: 'POST',
    headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q, num: 15 })
  }).then(r => r.json());

  console.log('Results with num:15');
  (res.organic || []).forEach((item, idx) => {
    console.log(`  [#${idx+1}] Title: "${item.title}" | Link: ${item.link}`);
  });
}

testNum15().catch(console.error);
