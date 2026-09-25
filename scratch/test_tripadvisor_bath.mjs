import * as dotenv from 'dotenv';
dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

async function testTripadvisorBath() {
  const q = `"The Plymouth South Beach" OR "The Plymouth Hotel" Miami (bathroom OR "clawfoot tub" OR "freestanding tub" OR "shower") site:tripadvisor.com`;
  const res = await fetch('https://google.serper.dev/images', {
    method: 'POST',
    headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q, num: 10 })
  }).then(r => r.json()).catch(() => ({}));

  console.log('Results count:', (res.images || []).length);
  (res.images || []).forEach(img => {
    console.log('title:', img.title, '->', img.imageUrl);
  });
}

testTripadvisorBath();
