import * as dotenv from 'dotenv';
dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

async function testSerper() {
  const hotelName = 'The Palms Hotel & Spa';
  const locationContext = 'Miami Beach Miami';
  const domainExclusions = '-site:instagram.com -site:facebook.com -site:pinterest.com -site:linkedin.com -site:timeout.com -site:tiktok.com -site:tripadvisor.com -site:yelp.com -site:eventbrite.com -site:youtube.com';

  const queries = [
    { cat: 'EXTERIOR', q: `"${hotelName}" ${locationContext} ("facade" OR "exterior" OR "art deco facade" OR "entrance" OR "building exterior" OR "street view" OR "architecture") ${domainExclusions} -pool -swimming -bedroom -bathroom` },
    { cat: 'EXTERIOR_CLEAN', q: `"${hotelName}" ${locationContext} ("exterior" OR "facade" OR "building" OR "Collins Ave") ${domainExclusions} -pool -swimming -bedroom -bathroom` }
  ];

  for (const item of queries) {
    console.log(`\n=== QUERY: ${item.cat} ===`);
    const res = await fetch('https://google.serper.dev/images', {
      method: 'POST',
      headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: item.q, num: 8 })
    });
    const data = await res.json();
    (data.images || []).forEach((img, i) => {
      console.log(`[${i+1}] ${img.title} -> ${img.imageUrl}`);
    });
  }
}

testSerper().catch(console.error);
