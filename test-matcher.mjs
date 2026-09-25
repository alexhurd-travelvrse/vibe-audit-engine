import { fetchBookingPhotosForHotel, fetchAmenityPhotosForHotel } from './api/master-vibe-audit.js';

(async () => {
  const [livePhotos, amenityPhotos] = await Promise.all([
    fetchBookingPhotosForHotel('sea containers', 'London', 'South bank', 'https://www.booking.com/hotel/gb/sea-containers-london.html'),
    fetchAmenityPhotosForHotel('sea containers', 'London', 'South bank')
  ]);

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

  const isPositiveBarDining = (p) => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    if (isExterior(p) || isBedroomLike(p) || isBath(p) || s.includes('pool') || s.includes('swimming') || s.endsWith('aloft-miami-brickell.jpg')) return false;
    return p.detectedCategory === 'SOCIAL' || s.includes('bar') || s.includes('cocktail') || s.includes('lounge') || s.includes('restaurant') || s.includes('dining') || s.includes('sushi') || s.includes('food') || s.includes('drink') || s.includes('grill') || s.includes('bistro') || s.includes('wine') || s.includes('beer') || s.includes('mixology') || s.includes('rooftop');
  };

  const used = new Set();
  const findMatch = (pool, predicate) => {
    const match = pool.find(p => p?.imageUrl && !used.has(p.imageUrl) && predicate(p));
    if (match) {
      used.add(match.imageUrl);
      return match;
    }
    return null;
  };

  const testSlots = [
    { slot: 1, category: 'HERO_CULTURAL_MAGNET', subject: 'Vibrant 12th Knot Rooftop Bar with panoramic Thames views' },
    { slot: 2, category: 'EXTERIOR_LANDMARK', subject: 'Distinctive exterior facade of Sea Containers London along the Thames' },
    { slot: 3, category: 'SIGNATURE_SUITE_BEDROOM', subject: 'Stylish signature king suite with floor-to-ceiling windows offering panoramic Thames river views' },
    { slot: 4, category: 'WELLNESS_SPA_LOBBY', subject: 'Serene indoor spa pool with ambient lighting' },
    { slot: 5, category: 'SECONDARY_ROOM_BATHROOM', subject: 'Modern, spacious bathroom with a freestanding soaking tub' }
  ];

  for (const s of testSlots) {
    const text = s.subject.toLowerCase();
    let match = null;

    if (s.category === 'SECONDARY_ROOM_BATHROOM' || text.includes('bath')) {
      match = findMatch(amenityPhotos, p => isBath(p) && !isExterior(p)) 
        || findMatch(livePhotos, p => isBath(p) && !isExterior(p));
    } else if (text.includes('rooftop') || text.includes('12th knot')) {
      match = findMatch(amenityPhotos, p => {
        const str = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
        return (str.includes('rooftop') || str.includes('12th knot')) && !isBedroomLike(p) && !isExterior(p);
      }) || findMatch(livePhotos, isPositiveBarDining) || findMatch(amenityPhotos, isPositiveBarDining);
    } else if (s.category === 'EXTERIOR_LANDMARK' || text.includes('facade') || text.includes('exterior')) {
      match = findMatch(amenityPhotos, p => isExterior(p) && !isBedroomLike(p) && !isBath(p))
        || findMatch(livePhotos, p => isExterior(p) && !isBedroomLike(p) && !isBath(p));
    } else if (s.category === 'SIGNATURE_SUITE_BEDROOM' || text.includes('suite') || text.includes('bedroom')) {
      match = findMatch(livePhotos, p => isBedroomLike(p) && !isExterior(p) && !isBath(p))
        || findMatch(amenityPhotos, p => isBedroomLike(p) && !isExterior(p) && !isBath(p));
    } else if (s.category === 'WELLNESS_SPA_LOBBY' || text.includes('spa') || text.includes('pool')) {
      match = findMatch(amenityPhotos, p => {
        const str = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
        return (str.includes('spa') || str.includes('wellness') || str.includes('pool') || str.includes('agua')) && !isBedroomLike(p) && !isExterior(p);
      }) || findMatch(livePhotos, p => {
        const str = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
        return (str.includes('spa') || str.includes('pool')) && !isBedroomLike(p) && !isExterior(p);
      });
    }

    console.log(`Slot ${s.slot} [${s.category}]: ${s.subject}`);
    console.log(`  -> Matched: "${match?.title}" (${match?.imageUrl?.slice(0, 60)}...)`);
  }
})();
