import * as dotenv from 'dotenv';
dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

async function testBathQuery() {
  const hotelName = 'The Plymouth Hotel';
  const locationContext = 'South Beach Miami Beach';
  const officialDomain = 'theplymouth.com';
  const domainFilter = `(site:${officialDomain} OR site:tripadvisor.com OR site:instagram.com OR site:facebook.com)`;
  const exclusions = '-wedding -bride -groom -couple -dress -menu';

  const res = await fetch('https://google.serper.dev/images', {
    method: 'POST',
    headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: `"${hotelName}" ${locationContext} (bathroom OR bath OR tub OR "freestanding tub" OR "clawfoot tub" OR "soaking tub" OR "marble bathroom" OR "rain shower" OR vanity OR "walk-in shower") ${domainFilter} ${exclusions}`, num: 20 })
  }).then(r => r.json()).catch(() => ({}));

  console.log('Results:');
  (res.images || []).forEach(img => {
    const u = (img.imageUrl || '').toLowerCase();
    const t = (img.title || '').toLowerCase();
    const isBed = u.includes('bed') || u.includes('queen') || u.includes('king') || t.includes('bedroom with a bed');
    const isBath = u.includes('bath') || u.includes('shower') || u.includes('tub') || t.includes('bath') || t.includes('shower') || t.includes('tub');
    console.log(`[isBath: ${isBath}, isBed: ${isBed}] ${t} -> ${img.imageUrl}`);
  });
}

testBathQuery();
