require('dotenv').config();
const key = process.env.VITE_SERPER_API_KEY;

async function testStrict() {
  const officialDomain = 'editionhotels.com';
  const cleanHotelName = 'The Miami Beach EDITION';
  
  const queries = [
    'site:editionhotels.com "Miami Beach" (matador OR basement OR spa OR pool OR suite OR room OR bath OR exterior)',
    'site:marriott.com "Miami Beach EDITION" (pool OR spa OR dining OR room OR bath)',
    'site:tripadvisor.com "The Miami Beach EDITION" (spa OR pool OR bath OR room OR facade) -traveler'
  ];

  const results = [];
  for (const q of queries) {
    const res = await fetch('https://google.serper.dev/images', {
      method: 'POST',
      headers: { 'X-API-KEY': key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q, num: 10 })
    });
    const d = await res.json();
    (d.images || []).forEach(img => {
      const u = (img.imageUrl || '').toLowerCase();
      const l = (img.link || '').toLowerCase();
      const isOfficial = u.includes('editionhotels.com') || l.includes('editionhotels.com') || u.includes('marriott.com') || l.includes('marriott.com') || u.includes('tripadvisor.com') || l.includes('tripadvisor.com');
      if (isOfficial) {
        results.push({ title: img.title, url: img.imageUrl, link: img.link });
      }
    });
  }

  console.log('STRICT OFFICIAL PHOTOS FOUND:', results.length);
  results.slice(0, 15).forEach((r, i) => console.log((i+1) + '.', r.title, '-->', r.url));
}
testStrict();
