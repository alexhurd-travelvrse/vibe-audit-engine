import * as dotenv from 'dotenv';
dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

async function testRestrictedSources() {
  const hotelName = 'The Palms Hotel & Spa';
  const city = 'Miami Beach';

  // 1. First, dynamically find the hotel's official website domain
  const searchRes = await fetch('https://google.serper.dev/search', {
    method: 'POST',
    headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: `"${hotelName}" ${city} official website`, num: 5 })
  });
  const searchData = await searchRes.json();
  let officialDomain = '';
  for (const item of searchData.organic || []) {
    if (item.link && !item.link.includes('booking.com') && !item.link.includes('tripadvisor.com') && !item.link.includes('expedia.com') && !item.link.includes('hotels.com') && !item.link.includes('kayak.com')) {
      const match = item.link.match(/https?:\/\/(?:www\.)?([^\/]+)/);
      if (match) {
        officialDomain = match[1];
        break;
      }
    }
  }

  console.log(`Resolved Official Domain: ${officialDomain}`);

  // 2. Query strictly from: Website, TripAdvisor, and Social
  const siteFilter = officialDomain 
    ? `(site:${officialDomain} OR site:tripadvisor.com OR site:instagram.com OR site:facebook.com)`
    : `(site:tripadvisor.com OR site:instagram.com OR site:facebook.com)`;

  const categories = [
    { cat: 'EXTERIOR_FACADE', q: `"${hotelName}" ${city} (exterior OR facade OR entrance OR architecture) ${siteFilter} -pool -bedroom -bathroom` },
    { cat: 'SPA_WELLNESS', q: `"${hotelName}" ${city} (spa OR "treatment room" OR "wellness" OR massage) ${siteFilter} -food -dish` },
    { cat: 'DINING_BAR', q: `"${hotelName}" ${city} (restaurant OR bar OR cocktail OR lounge OR dining) ${siteFilter} -exterior -pool -bedroom -bathroom` },
    { cat: 'BATHROOM', q: `"${hotelName}" ${city} (bathroom OR "rain shower" OR "marble bathroom" OR vanity OR tub) ${siteFilter}` }
  ];

  for (const item of categories) {
    console.log(`\n=== CATEGORY: ${item.cat} ===`);
    const res = await fetch('https://google.serper.dev/images', {
      method: 'POST',
      headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: item.q, num: 6 })
    });
    const data = await res.json();
    (data.images || []).forEach((img, i) => {
      console.log(`[${i+1}] [Source: ${img.source || img.domain}] ${img.title}`);
      console.log(`     Link: ${img.link}`);
      console.log(`     Image: ${img.imageUrl}`);
    });
  }
}

testRestrictedSources().catch(console.error);
