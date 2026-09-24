import * as dotenv from 'dotenv';
dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

async function testQueryImprovements() {
  const queries = [
    `site:booking.com/hotel/ mandarin oriental London`,
    `site:booking.com/hotel/ "mandarin oriental" London`,
    `"mandarin oriental" London site:booking.com/hotel/`,
    `mandarin oriental knightsbridge London site:booking.com/hotel/`
  ];

  for (const q of queries) {
    console.log('\n--- Testing Query:', q);
    const res = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q, num: 5 })
    }).then(r => r.json());

    (res.organic || []).forEach((item, idx) => {
      console.log(`  [#${idx+1}] Title: "${item.title}" | Link: ${item.link}`);
    });
  }
}

testQueryImprovements().catch(console.error);
