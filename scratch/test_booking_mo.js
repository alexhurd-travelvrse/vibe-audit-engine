import * as dotenv from 'dotenv';
dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

async function testBookingSearch() {
  const hotelName = 'mandarin oriental';
  const locationContext = 'knightsbridge London';
  const queryStr = `site:booking.com/hotel/ "${hotelName}" ${locationContext}`;

  const res = await fetch('https://google.serper.dev/search', {
    method: 'POST',
    headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: queryStr, num: 8 })
  }).then(r => r.json());

  console.log('Results for:', queryStr);
  console.log(JSON.stringify(res.organic, null, 2));
}

testBookingSearch().catch(console.error);
