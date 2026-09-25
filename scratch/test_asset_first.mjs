import { fetchBookingPhotosForHotel, fetchAmenityPhotosForHotel } from '../api/master-vibe-audit.js';

async function testAssetFirst(hotelName, city, neighborhood) {
  console.log(`\n========================================`);
  console.log(`TESTING ASSET-FIRST RESOLUTION: ${hotelName} (${city})`);
  console.log(`========================================`);

  const [liveBookingPhotos, amenityPhotos] = await Promise.all([
    fetchBookingPhotosForHotel(hotelName, city, neighborhood),
    fetchAmenityPhotosForHotel(hotelName, city, neighborhood)
  ]);

  const poolAmenity = Array.isArray(amenityPhotos) ? amenityPhotos : [];
  const poolLive = Array.isArray(liveBookingPhotos) ? liveBookingPhotos : [];
  const usedUrls = new Set();

  const isMeetingOrConference = (p) => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    return s.includes('meeting') || s.includes('conference') || s.includes('boardroom') || s.includes('event space') || s.includes('banquet') || s.includes('seminar');
  };

  const isTightFoodMacro = (p) => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    return s.includes('food_') || s.includes('_food') || s.includes('fruits_de_mer') || s.includes('boeuf') || s.includes('steak') || s.includes('dessert') || s.includes('burger') || s.includes('oyster') || s.includes('dish') || s.includes('plate') || s.includes('tartare') || s.includes('pasta');
  };

  const isExterior = (p) => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    return s.includes('exterior') || s.includes('facade') || s.includes('façade') || s.includes('building') || s.includes('outside') || s.includes('aerial') || s.includes('marina') || s.includes('entrance');
  };

  const isBedroomLike = (p) => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    return s.includes('bedroom') || s.includes('suite') || (s.includes('bed') && !s.includes('sunbed') && !s.includes('daybed'));
  };

  const isBath = (p) => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    return s.includes('bathroom') || s.includes('shower') || s.includes('bath') || s.includes('tub');
  };

  const isPoolLike = (p) => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    return s.includes('pool') || s.includes('swim') || s.includes('sunbed') || s.includes('cabana') || s.includes('day club') || s.includes('hyde');
  };

  const isRooftopOrBar = (p) => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    return s.includes('rooftop') || s.includes('12th knot') || s.includes('sky bar') || s.includes('skybar') || s.includes('cocktail') || s.includes('bar') || s.includes('lounge');
  };

  const findFirst = (pool, predicate) => {
    const found = pool.find(p => p?.imageUrl && !usedUrls.has(p.imageUrl) && !isMeetingOrConference(p) && !isTightFoodMacro(p) && predicate(p));
    if (found) {
      usedUrls.add(found.imageUrl);
      return found;
    }
    return null;
  };

  // SLOT 1: HERO CULTURAL MAGNET (Rooftop Bar OR Pool Deck OR Vibrant Social Lounge)
  let slot1Asset = findFirst(poolAmenity, p => (isRooftopOrBar(p) || isPoolLike(p)) && !isBedroomLike(p) && !isBath(p) && !isExterior(p));
  if (!slot1Asset) {
    slot1Asset = findFirst(poolLive, p => (isRooftopOrBar(p) || isPoolLike(p)) && !isBedroomLike(p) && !isBath(p) && !isExterior(p));
  }
  if (!slot1Asset) {
    slot1Asset = findFirst(poolAmenity, p => p.detectedCategory === 'SOCIAL' && !isBedroomLike(p) && !isBath(p) && !isExterior(p));
  }

  // SLOT 2: EXTERIOR ARCHITECTURAL LANDMARK
  let slot2Asset = findFirst(poolAmenity, p => isExterior(p) && !isBedroomLike(p) && !isBath(p) && !isPoolLike(p));
  if (!slot2Asset) {
    slot2Asset = findFirst(poolLive, p => isExterior(p) && !isBedroomLike(p) && !isBath(p) && !isPoolLike(p));
  }

  // SLOT 3: SIGNATURE SUITE BEDROOM
  let slot3Asset = findFirst(poolAmenity, p => isBedroomLike(p) && !isBath(p) && !isExterior(p));
  if (!slot3Asset) {
    slot3Asset = findFirst(poolLive, p => isBedroomLike(p) && !isBath(p) && !isExterior(p));
  }

  // SLOT 4: SIGNATURE AMENITY (Wellness Spa OR Destination Dining OR Grand Lobby)
  let slot4Asset = findFirst(poolAmenity, p => (p.detectedCategory === 'SPA' || p.detectedCategory === 'LOBBY' || p.detectedCategory === 'SOCIAL' || isRooftopOrBar(p)) && !isBedroomLike(p) && !isBath(p) && !isExterior(p));
  if (!slot4Asset) {
    slot4Asset = findFirst(poolLive, p => !isBedroomLike(p) && !isBath(p) && !isExterior(p));
  }

  // SLOT 5: HYGIENE & LUXURY FINISH (Design Bathroom / Soaking Tub OR Secondary Sanctuary)
  let slot5Asset = findFirst(poolAmenity, p => isBath(p) && !isExterior(p));
  if (!slot5Asset) {
    slot5Asset = findFirst(poolLive, p => isBath(p) && !isExterior(p));
  }
  if (!slot5Asset) {
    // If no bathroom exists, pick the next best luxury amenity
    slot5Asset = findFirst(poolAmenity, p => !isBedroomLike(p) && !isExterior(p)) || findFirst(poolLive, p => !isBedroomLike(p) && !isExterior(p));
  }

  const slots = [
    { slot: 1, name: 'HERO CULTURAL MAGNET', asset: slot1Asset },
    { slot: 2, name: 'EXTERIOR LANDMARK', asset: slot2Asset },
    { slot: 3, name: 'SIGNATURE SUITE', asset: slot3Asset },
    { slot: 4, name: 'DESTINATION AMENITY', asset: slot4Asset },
    { slot: 5, name: 'HYGIENE / BATHROOM', asset: slot5Asset }
  ];

  slots.forEach(s => {
    console.log(`SLOT ${s.slot} [${s.name}]:`);
    console.log(`  Title: ${s.asset?.title || 'NONE'}`);
    console.log(`  URL:   ${s.asset?.imageUrl || 'NONE'}`);
  });
}

async function run() {
  await testAssetFirst('Sea Containers London', 'London', 'South Bank');
  await testAssetFirst('SLS South Beach', 'Miami', 'South Beach');
  await testAssetFirst('The Plymouth Hotel', 'Miami', 'South Beach');
}

run();
