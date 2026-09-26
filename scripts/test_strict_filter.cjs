require('dotenv').config();
const key = process.env.VITE_SERPER_API_KEY;

async function testFilter() {
  const officialDomain = 'editionhotels.com';
  const cleanHotelName = 'The Miami Beach EDITION';
  const parentBrand = 'marriott.com';
  const tokens = ['edition'];

  const queries = [
    `site:${officialDomain} "Miami Beach" (matador OR basement OR spa OR pool OR suite OR room OR bath OR exterior)`,
    `site:${parentBrand} "The Miami Beach EDITION" (pool OR spa OR dining OR room OR bath)`,
    `site:tripadvisor.com "The Miami Beach EDITION" (spa OR pool OR bath OR room OR facade) -traveler`
  ];

  const rawImages = [];
  for (const q of queries) {
    const res = await fetch('https://google.serper.dev/images', {
      method: 'POST',
      headers: { 'X-API-KEY': key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q, num: 10 })
    });
    const d = await res.json();
    rawImages.push(...(d.images || []));
  }

  const isAllowedOfficialSource = (img) => {
    if (!img || !img.imageUrl) return false;
    const u = (img.imageUrl || '').toLowerCase();
    const l = (img.link || '').toLowerCase();
    const combined = `${u} ${l}`;

    // Reject low quality / social scrapers
    if (u.includes('lookaside') || u.includes('fbsbx') || u.includes('instagram.com/seo/')) return false;

    // Must match hotel token
    const matchesTarget = tokens.some(t => combined.includes(t) || (img.title || '').toLowerCase().includes(t));
    if (!matchesTarget) return false;

    const isOfficialDomain = officialDomain && combined.includes(officialDomain);
    const isBrandParent = parentBrand && combined.includes(parentBrand);
    const isTripAdvisor = combined.includes('tripadvisor.com') || combined.includes('media-cdn.tripadvisor.com');
    const isOfficialCdn = ['galaxy.tf', 'tambourine.com', 'symphony.cdn', 'travelclick.com', 'cloudbeds.com'].some(net => combined.includes(net));
    const isBookingCdn = combined.includes('bstatic.com');

    return isOfficialDomain || isBrandParent || isTripAdvisor || isOfficialCdn || isBookingCdn;
  };

  const filtered = rawImages.filter(isAllowedOfficialSource);
  console.log(`TOTAL RAW: ${rawImages.length}, STRICTLY ALLOWED OFFICIAL: ${filtered.length}`);
  
  filtered.forEach((img, i) => {
    const domain = (img.imageUrl.match(/https?:\/\/(?:www\.)?([^\/]+)/) || [])[1] || 'unknown';
    console.log(`[${i+1}] [${domain}] ${img.title}`);
  });
}

testFilter();
