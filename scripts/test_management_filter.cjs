require('dotenv').config();
const key = process.env.VITE_SERPER_API_KEY;

async function testStrictManagementFilter() {
  const cleanHotelName = 'The Miami Beach EDITION';
  const officialDomain = 'editionhotels.com';
  const parentBrand = 'marriott.com';
  const tokens = ['edition'];

  const queries = [
    `site:${officialDomain} "Miami Beach" (pool OR spa OR matador OR basement OR dining OR bar OR suite OR room OR bath OR exterior)`,
    `site:${parentBrand} "${cleanHotelName}" (pool OR spa OR dining OR room OR bath OR suite OR exterior)`,
    `site:tripadvisor.com/Hotel_Review "${cleanHotelName}" -intitle:"Picture of"`,
    `site:tripadvisor.com/Hotel_Feature "${cleanHotelName}" -intitle:"Picture of"`
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

  const isStrictOfficialOrManagement = (img) => {
    if (!img || !img.imageUrl) return false;
    const u = (img.imageUrl || '').toLowerCase();
    const l = (img.link || '').toLowerCase();
    const t = (img.title || '').toLowerCase();
    const combined = `${u} ${l} ${t}`;

    // 1. Must match target hotel tokens
    const matchesTarget = tokens.some(tok => combined.includes(tok));
    if (!matchesTarget) return false;

    // 2. Reject traveler review photos on TripAdvisor
    if (l.includes('tripadvisor.com') || u.includes('tripadvisor.com')) {
      if (t.includes('picture of') || t.includes('photo of') || l.includes('showuserreviews') || l.includes('userreview')) {
        return false; // Traveler photo!
      }
    }

    // 3. Strict Whitelist of Official Brand & TripAdvisor Management Sources
    const isOfficialBrand = officialDomain && (combined.includes(officialDomain) || u.includes(officialDomain));
    const isParentBrand = parentBrand && combined.includes(parentBrand);
    const isOfficialCdn = ['galaxy.tf', 'tambourine.com', 'symphony.cdn', 'travelclick.com', 'cloudbeds.com'].some(net => combined.includes(net));
    const isTripAdvisorManagement = (l.includes('tripadvisor.com') || u.includes('tripadvisor.com')) && (l.includes('/hotel_review') || l.includes('/hotel_feature') || t.includes('management'));
    const isBookingCdn = combined.includes('bstatic.com');

    return isOfficialBrand || isParentBrand || isOfficialCdn || isTripAdvisorManagement || isBookingCdn;
  };

  const filtered = rawImages.filter(isStrictOfficialOrManagement);
  console.log(`TOTAL RAW: ${rawImages.length}, STRICT OFFICIAL + TA MANAGEMENT: ${filtered.length}\n`);

  filtered.forEach((img, i) => {
    let sourceCategory = 'UNKNOWN';
    if (img.imageUrl.includes('editionhotels.com')) sourceCategory = 'OFFICIAL BRAND (editionhotels.com)';
    else if (img.imageUrl.includes('marriott.com')) sourceCategory = 'OFFICIAL PARENT BRAND (marriott.com)';
    else if (img.imageUrl.includes('tripadvisor.com')) sourceCategory = 'TRIPADVISOR (From Management)';

    console.log(`[${i+1}] [${sourceCategory}]`);
    console.log(`     Title: ${img.title}`);
    console.log(`     Image: ${img.imageUrl}`);
    console.log(`     Link:  ${img.link}\n`);
  });
}

testStrictManagementFilter();
