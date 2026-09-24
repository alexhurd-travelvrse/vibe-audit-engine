import * as dotenv from 'dotenv';
dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

async function checkBathroomImages() {
  const hotelName = 'Sea Containers London';
  const locationContext = 'South Bank London';
  const officialDomain = 'seacontainerslondon.com';
  const domainFilter = `(site:${officialDomain} OR site:tripadvisor.com OR site:instagram.com OR site:facebook.com)`;
  const exclusions = '-wedding -bride -groom -couple -dress -menu';

  const resBath = await fetch('https://google.serper.dev/images', {
    method: 'POST',
    headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: `"${hotelName}" ${locationContext} (bathroom OR "freestanding bath" OR "soaking tub" OR "marble bathroom" OR "rain shower" OR vanity OR "walk-in shower") ${domainFilter} ${exclusions}`, num: 15 })
  }).then(r => r.json());

  console.log('=== BATHROOM IMAGES FOUND FOR SEA CONTAINERS ===');
  (resBath.images || []).forEach((img, i) => {
    console.log(`\nBathroom Image #${i + 1}:`);
    console.log(`  Title: ${img.title}`);
    console.log(`  URL: ${img.imageUrl}`);
    console.log(`  Link: ${img.link}`);
  });
}

checkBathroomImages().catch(console.error);
