import * as dotenv from 'dotenv';
dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

function getDistinctiveTokens(name) {
  const stopWords = new Set(['the', 'a', 'an', 'and', '&', 'hotel', 'hotels', 'inn', 'pub', 'bar', 'lounge', 'rooms', 'house', 'boutique', 'resort', 'spa', 'suites', 'b&b', 'bed', 'breakfast', 'restaurant', 'lodge', 'retreat', 'club', 'london', 'uk', 'miami', 'beach', 'south', 'north', 'city', 'downtown', 'knightsbridge', 'brickell']);
  return String(name || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length >= 3 && !stopWords.has(token));
}

async function debugPlymouthHarvest() {
  const hotelName = 'The Plymouth Hotel';
  const locationContext = 'South Beach Miami Beach';
  const tokens = getDistinctiveTokens(hotelName);
  let officialDomain = 'theplymouth.com';

  const domainFilter = `(site:${officialDomain} OR site:tripadvisor.com OR site:instagram.com OR site:facebook.com)`;
  const exclusions = '-wedding -bride -groom -couple -dress -menu';

  const resBath = await fetch('https://google.serper.dev/images', {
    method: 'POST',
    headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: `"${hotelName}" ${locationContext} (bathroom OR "freestanding bath" OR "soaking tub" OR "marble bathroom" OR "rain shower" OR vanity OR "walk-in shower") ${domainFilter} ${exclusions}`, num: 12 })
  }).then(r => r.json()).catch(() => ({}));

  console.log('resBath.images count:', (resBath.images || []).length);
  (resBath.images || []).forEach(img => {
    console.log('img:', img.title, '->', img.imageUrl);
  });
}

debugPlymouthHarvest();
