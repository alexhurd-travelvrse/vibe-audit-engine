import dotenv from 'dotenv';
dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;
console.log('SERPER_API_KEY exists:', !!SERPER_API_KEY);

const hotelName = 'plymouth';
const city = 'miami';
const neighborhood = 'south beach';
const locationContext = `${neighborhood} ${city}`;

async function debugAmenity() {
  // Check official website resolution
  const searchRes = await fetch('https://google.serper.dev/search', {
    method: 'POST',
    headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: `"${hotelName}" ${locationContext} official website`, num: 6 })
  });
  const searchData = await searchRes.json();
  console.log('Organic search results:');
  (searchData.organic || []).forEach(o => console.log(' - ', o.link));

  let officialDomain = '';
  for (const item of searchData.organic || []) {
    if (item.link && !item.link.includes('booking.com') && !item.link.includes('tripadvisor.com') && !item.link.includes('expedia.com') && !item.link.includes('hotels.com') && !item.link.includes('kayak.com') && !item.link.includes('wikipedia.org') && !item.link.includes('yelp.com')) {
      const match = item.link.match(/https?:\/\/(?:www\.)?([^\/]+)/);
      if (match) {
        officialDomain = match[1];
        break;
      }
    }
  }
  console.log('Resolved officialDomain:', officialDomain);

  // Check bathroom query
  const domainFilter = officialDomain 
    ? `(site:${officialDomain} OR site:tripadvisor.com OR site:instagram.com OR site:facebook.com)`
    : `(site:tripadvisor.com OR site:instagram.com OR site:facebook.com)`;
  const exclusions = '-wedding -bride -groom -couple -dress -menu';

  const q = `"${hotelName}" ${locationContext} (bathroom OR bath OR tub OR "freestanding tub" OR "clawfoot tub" OR "soaking tub" OR "marble bathroom" OR "rain shower" OR vanity OR "walk-in shower") ${domainFilter} ${exclusions}`;
  console.log('Query:', q);

  const imgRes = await fetch('https://google.serper.dev/images', {
    method: 'POST',
    headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q, num: 20 })
  });
  const imgData = await imgRes.json();
  console.log('Returned images count:', (imgData.images || []).length);
  (imgData.images || []).forEach((img, i) => {
    console.log(`[#${i + 1}] Title: "${img.title}", Link: "${img.link}", ImageUrl: "${img.imageUrl}"`);
  });
}

debugAmenity().catch(console.error);
