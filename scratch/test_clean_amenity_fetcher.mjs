import dotenv from 'dotenv';
dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

async function fetchCleanAmenityPhotos(hotelName, city, neighborhood = '') {
  const locationContext = neighborhood && neighborhood.trim() ? `${neighborhood.trim()} ${city}` : city;

  // 1. Resolve official hotel website domain
  let officialDomain = '';
  try {
    const searchRes = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: `"${hotelName}" ${locationContext} official website`, num: 6 })
    });
    const searchData = await searchRes.json();
    for (const item of searchData.organic || []) {
      if (item.link && !item.link.includes('booking.com') && !item.link.includes('tripadvisor.com') && !item.link.includes('expedia.com') && !item.link.includes('hotels.com') && !item.link.includes('kayak.com') && !item.link.includes('wikipedia.org') && !item.link.includes('yelp.com')) {
        const match = item.link.match(/https?:\/\/(?:www\.)?([^\/]+)/);
        if (match) {
          officialDomain = match[1];
          break;
        }
      }
    }
  } catch (e) {
    console.warn('Domain error:', e);
  }

  console.log('Resolved officialDomain:', officialDomain);

  const domainClause = officialDomain ? `site:${officialDomain}` : `site:tripadvisor.com "${hotelName}" ${city}`;
  const tripAdvisorClause = `site:tripadvisor.com "${hotelName}"`;

  const [resBath, resSocial, resExterior, resTripAdvisor] = await Promise.all([
    // Dedicated bathroom query directly targeting official site
    fetch('https://google.serper.dev/images', {
      method: 'POST',
      headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: `${domainClause} (bath OR shower OR tub OR bathroom OR "soaking tub") -wedding -menu`, num: 15 }),
      signal: AbortSignal.timeout(8000)
    }).then(r => r.json()).catch(err => { console.error('Fetch err:', err.message); return {}; }),
    // Dedicated dining query directly targeting official site
    fetch('https://google.serper.dev/images', {
      method: 'POST',
      headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: `${domainClause} (restaurant OR bar OR dining OR sushi OR lounge OR cocktails) -wedding -menu`, num: 15 }),
      signal: AbortSignal.timeout(8000)
    }).then(r => r.json()).catch(err => { console.error('Fetch err:', err.message); return {}; }),
    // Dedicated exterior query
    fetch('https://google.serper.dev/images', {
      method: 'POST',
      headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: `${domainClause} (facade OR exterior OR entrance OR building) -wedding`, num: 10 }),
      signal: AbortSignal.timeout(8000)
    }).then(r => r.json()).catch(err => { console.error('Fetch err:', err.message); return {}; }),
    // TripAdvisor high-authority photos
    fetch('https://google.serper.dev/images', {
      method: 'POST',
      headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: `${tripAdvisorClause} (bath OR bathroom OR dining OR restaurant OR bar OR pool OR facade) -traveler`, num: 15 }),
      signal: AbortSignal.timeout(8000)
    }).then(r => r.json()).catch(() => ({})),
  ]);

  const allImages = [];
  console.log('resBath raw:', (resBath.images || []).length);
  console.log('resSocial raw:', (resSocial.images || []).length);
  console.log('resExterior raw:', (resExterior.images || []).length);

  // Filter & classify Bath
  (resBath.images || []).forEach(img => {
    const s = `${img.title || ''} ${img.imageUrl || ''}`.toLowerCase();
    console.log('Bath cand s:', s);
    const hasBath = s.includes('bath') || s.includes('shower') || s.includes('tub') || s.includes('vanity');
    const isStrictBedroomOnly = (s.includes('bedq') || s.includes('bedroom with a bed')) && !s.includes('bath_wide');
    console.log(' - hasBath:', hasBath, 'isStrictBedroomOnly:', isStrictBedroomOnly);
    if (hasBath && !isStrictBedroomOnly) {
      allImages.push({
        title: img.title || 'Official Luxury Bathroom',
        imageUrl: img.imageUrl,
        sourceUrl: img.link,
        detectedCategory: 'BATHROOM',
        sourceAuthority: 95
      });
    }
  });

  // Filter & classify Social
  (resSocial.images || []).forEach(img => {
    allImages.push({
      title: img.title || 'Signature Dining & Social Space',
      imageUrl: img.imageUrl,
      sourceUrl: img.link,
      detectedCategory: 'SOCIAL',
      sourceAuthority: 95
    });
  });

  // Filter & classify Exterior
  (resExterior.images || []).forEach(img => {
    const s = `${img.title || ''} ${img.imageUrl || ''}`.toLowerCase();
    if (!s.includes('ballet') && !s.includes('convention') && !s.includes('museum')) {
      allImages.push({
        title: img.title || 'Historic Architectural Facade',
        imageUrl: img.imageUrl,
        sourceUrl: img.link,
        detectedCategory: 'EXTERIOR',
        sourceAuthority: 90
      });
    }
  });

  console.log(`Clean Amenity Photos collected: ${allImages.length}`);
  allImages.forEach((img, i) => {
    console.log(`[#${i+1}] [${img.detectedCategory}] "${img.title}" -> ${img.imageUrl}`);
  });

  return allImages;
}

fetchCleanAmenityPhotos('plymouth', 'miami', 'south beach').catch(console.error);
