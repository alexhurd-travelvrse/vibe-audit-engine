import * as dotenv from 'dotenv';
dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

async function checkSpaImages() {
  const hotelName = 'Sea Containers London';
  const locationContext = 'South Bank London';
  const officialDomain = 'seacontainerslondon.com';
  const domainFilter = `(site:${officialDomain} OR site:tripadvisor.com OR site:instagram.com OR site:facebook.com)`;
  const exclusions = '-wedding -bride -groom -couple -dress -menu';

  const resSpa = await fetch('https://google.serper.dev/images', {
    method: 'POST',
    headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: `"${hotelName}" ${locationContext} (spa OR "treatment room" OR wellness OR massage OR "vitality pool" OR sauna OR "agua spa") ${domainFilter} ${exclusions} -food -dish -eating -bedroom -bed`, num: 12 })
  }).then(r => r.json());

  console.log('=== SPA IMAGES FOUND FOR SEA CONTAINERS ===');
  (resSpa.images || []).forEach((img, i) => {
    console.log(`\nSpa Image #${i + 1}:`);
    console.log(`  Title: ${img.title}`);
    console.log(`  URL: ${img.imageUrl}`);
    console.log(`  Link: ${img.link}`);
  });
}

checkSpaImages().catch(console.error);
