import * as dotenv from 'dotenv';
dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

async function testDualQuery() {
  const hotelName = 'mandarin oriental';
  const city = 'London';
  const neighborhood = 'knightsbridge';
  const locationContext = `${neighborhood} ${city}`;

  const res = await fetch('https://google.serper.dev/search', {
    method: 'POST',
    headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: `site:booking.com/hotel/gb/ ("${hotelName}" OR mandarin) (${neighborhood} OR "hyde park" OR ${city})`, num: 10 })
  }).then(r => r.json());

  console.log('Results:');
  (res.organic || []).forEach(item => console.log(item.title, '->', item.link));
}

testDualQuery().catch(console.error);
