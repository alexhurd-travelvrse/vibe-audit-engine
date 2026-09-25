import * as dotenv from 'dotenv';
dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

async function debugBathExclusions() {
  const hotelName = 'The Plymouth Hotel';
  const locationContext = 'South Beach Miami Beach';
  let officialDomain = 'theplymouth.com';

  const domainFilter = `(site:${officialDomain} OR site:tripadvisor.com OR site:instagram.com OR site:facebook.com)`;
  const exclusions = '-wedding -bride -groom -couple -dress -menu -bedroom -bed -queen -king -suite';

  const resBath = await fetch('https://google.serper.dev/images', {
    method: 'POST',
    headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: `"${hotelName}" ${locationContext} (bathroom OR "freestanding bath" OR "soaking tub" OR "clawfoot tub" OR "marble bathroom" OR "rain shower" OR vanity OR "walk-in shower") ${domainFilter} ${exclusions}`, num: 12 })
  }).then(r => r.json()).catch(() => ({}));

  console.log('resBath count:', (resBath.images || []).length);
  (resBath.images || []).forEach(img => {
    console.log('img:', img.title, '->', img.imageUrl);
  });
}

debugBathExclusions();
