import * as dotenv from 'dotenv';
dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

async function testPreciseQueries() {
  const hotelName = 'The Palms Hotel & Spa';
  const locationContext = 'Miami Beach Miami';
  const exclusions = '-site:instagram.com -site:facebook.com -site:pinterest.com -site:linkedin.com -site:timeout.com -site:tiktok.com -site:tripadvisor.com -site:yelp.com -site:eventbrite.com -site:youtube.com -wedding -bride -groom -couple -dress -blog';

  const queries = [
    { cat: 'EXTERIOR_FACADE', q: `"${hotelName}" ${locationContext} ("exterior" OR "facade" OR "building" OR "entrance" OR "Collins Ave entrance" OR "street view") ${exclusions} -pool -swimming -bedroom -bathroom -food -dish` },
    { cat: 'SPA_WELLNESS', q: `"${hotelName}" ${locationContext} ("The Palms Spa" OR "AVEDA Spa" OR "treatment room" OR "massage room" OR "spa relaxation" OR "wellness sanctuary") ${exclusions} -food -dish -pool` },
    { cat: 'DINING_BAR', q: `"${hotelName}" ${locationContext} ("Essensia Restaurant" OR "Essensia Lounge" OR "cocktail bar" OR "restaurant interior" OR "dining room") ${exclusions} -exterior -building -facade -pool -bedroom -bathroom` },
    { cat: 'BEDROOM', q: `"${hotelName}" ${locationContext} ("king suite" OR "oceanfront suite" OR "ocean view king" OR "bedroom interior" OR "guest room") ${exclusions} -pool -exterior -bathroom` },
    { cat: 'BATHROOM', q: `"${hotelName}" ${locationContext} ("bathroom" OR "rain shower" OR "marble bathroom" OR "walk-in shower" OR "soaking tub") ${exclusions}` }
  ];

  for (const item of queries) {
    console.log(`\n=== QUERY: ${item.cat} ===`);
    const res = await fetch('https://google.serper.dev/images', {
      method: 'POST',
      headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: item.q, num: 6 })
    });
    const data = await res.json();
    (data.images || []).forEach((img, i) => {
      console.log(`[${i+1}] ${img.title} -> ${img.imageUrl}`);
    });
  }
}

testPreciseQueries().catch(console.error);
