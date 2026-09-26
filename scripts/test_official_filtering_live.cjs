require('dotenv').config();
const key = process.env.VITE_SERPER_API_KEY;

async function testCompletePipeline() {
  const cleanHotelName = 'The Miami Beach EDITION';
  const officialDomain = 'editionhotels.com';
  const parentBrand = 'marriott.com';
  const tokens = ['edition'];

  const [resOfficialDomain, resParentBrand, resTripAdvisor] = await Promise.all([
    fetch('https://google.serper.dev/images', {
      method: 'POST',
      headers: { 'X-API-KEY': key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: `site:${officialDomain} "${cleanHotelName}" (pool OR spa OR restaurant OR bar OR room OR suite OR bath OR exterior)`, num: 15 })
    }).then(r => r.json()).catch(() => ({})),
    fetch('https://google.serper.dev/images', {
      method: 'POST',
      headers: { 'X-API-KEY': key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: `site:${parentBrand} "${cleanHotelName}" (pool OR spa OR dining OR bar OR suite OR room OR bath)`, num: 15 })
    }).then(r => r.json()).catch(() => ({})),
    fetch('https://google.serper.dev/images', {
      method: 'POST',
      headers: { 'X-API-KEY': key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: `site:tripadvisor.com "${cleanHotelName}" (spa OR pool OR bath OR room OR facade) -traveler`, num: 15 })
    }).then(r => r.json()).catch(() => ({}))
  ]);

  const isAllowedOfficialSource = (img) => {
    if (!img || !img.imageUrl) return false;
    const u = (img.imageUrl || '').toLowerCase();
    const l = (img.link || '').toLowerCase();
    const combined = `${u} ${l}`;

    const matchesTarget = tokens.some(t => combined.includes(t) || (img.title || '').toLowerCase().includes(t));
    if (!matchesTarget) return false;

    const isOfficialSite = officialDomain && (combined.includes(officialDomain) || u.includes(officialDomain));
    const isParentSite = parentBrand && combined.includes(parentBrand);
    const isTripAdvisor = combined.includes('tripadvisor.com') || combined.includes('media-cdn.tripadvisor.com');
    const isOfficialCdn = ['galaxy.tf', 'tambourine.com', 'symphony.cdn', 'travelclick.com', 'cloudbeds.com'].some(net => combined.includes(net));
    const isBookingCdn = combined.includes('bstatic.com');

    return isOfficialSite || isParentSite || isTripAdvisor || isOfficialCdn || isBookingCdn;
  };

  const allPhotos = [...(resOfficialDomain.images || []), ...(resParentBrand.images || []), ...(resTripAdvisor.images || [])]
    .filter(isAllowedOfficialSource);

  console.log(`TOTAL OFFICIAL ASSETS: ${allPhotos.length}`);
  const domainCounts = {};
  allPhotos.forEach(p => {
    const domain = (p.imageUrl.match(/https?:\/\/(?:www\.)?([^\/]+)/) || [])[1] || 'unknown';
    domainCounts[domain] = (domainCounts[domain] || 0) + 1;
  });
  console.log('DOMAINS BREAKDOWN:', domainCounts);
}

testCompletePipeline();
