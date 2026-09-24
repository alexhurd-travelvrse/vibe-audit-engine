import * as dotenv from 'dotenv';
dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

function getDistinctiveTokens(name) {
  const stopWords = new Set(['the', 'a', 'an', 'and', '&', 'hotel', 'hotels', 'inn', 'pub', 'bar', 'lounge', 'rooms', 'house', 'boutique', 'resort', 'spa', 'suites', 'b&b', 'bed', 'breakfast', 'restaurant', 'lodge', 'retreat', 'club', 'london', 'uk']);
  return String(name || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length >= 3 && !stopWords.has(token));
}

async function testAmenityPhotos() {
  const hotelName = 'The Palms Hotel & Spa';
  const locationContext = 'Miami Beach Miami';
  const tokens = getDistinctiveTokens(hotelName);
  const domainExclusions = '-site:instagram.com -site:facebook.com -site:pinterest.com -site:linkedin.com -site:timeout.com -site:tiktok.com -site:tripadvisor.com -site:yelp.com -site:eventbrite.com -site:youtube.com';

  const [resSocial, resSpa, resLobby, resExterior, resBath] = await Promise.all([
    fetch('https://google.serper.dev/images', {
      method: 'POST',
      headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: `"${hotelName}" ${locationContext} ("cocktail bar" OR "bar interior" OR "w xyz bar" OR "restaurant interior" OR "dining room" OR "cocktail lounge" OR "Essensia" OR "dishes" OR "bartender") ${domainExclusions} -exterior -building -outside -facade -aerial -pool -bedroom -bathroom -motel`, num: 8 }),
    }).then(r => r.json()).catch(() => ({})),
    fetch('https://google.serper.dev/images', {
      method: 'POST',
      headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: `"${hotelName}" ${locationContext} ("spa" OR "The Palms Spa" OR "AVEDA" OR "treatment room" OR "wellness" OR "massage" OR "sauna" OR "bathhouse" OR "steam room" OR "courtyard pool") ${domainExclusions}`, num: 8 }),
    }).then(r => r.json()).catch(() => ({})),
    fetch('https://google.serper.dev/images', {
      method: 'POST',
      headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: `"${hotelName}" ${locationContext} ("lobby" OR "grand lobby" OR "reception" OR "crystal ballroom" OR "ballroom" OR "drawing room" OR "historic lounge" OR "palm court" OR "interior") ${domainExclusions}`, num: 8 }),
    }).then(r => r.json()).catch(() => ({})),
    fetch('https://google.serper.dev/images', {
      method: 'POST',
      headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: `"${hotelName}" ${locationContext} ("facade" OR "exterior" OR "art deco facade" OR "entrance" OR "building exterior" OR "street view" OR "architecture") ${domainExclusions} -pool -swimming -bedroom -bathroom`, num: 8 }),
    }).then(r => r.json()).catch(() => ({})),
    fetch('https://google.serper.dev/images', {
      method: 'POST',
      headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: `"${hotelName}" ${locationContext} ("bathroom" OR "freestanding bath" OR "soaking tub" OR "marble bathroom" OR "rain shower" OR "luxury vanity") ${domainExclusions}`, num: 8 }),
    }).then(r => r.json()).catch(() => ({})),
  ]);

  console.log('EXTERIOR IMAGES RAW:');
  console.log(resExterior.images);
}

testAmenityPhotos().catch(console.error);
