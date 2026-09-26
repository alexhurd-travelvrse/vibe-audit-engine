require('dotenv').config();

async function testSelectionRefined() {
  const { fetchAmenityPhotosForHotel } = await import('../api/master-vibe-audit.js');
  const photos = await fetchAmenityPhotosForHotel('Sea Containers London', 'London', 'South Bank');
  
  // Filter out any third party or non-target photos
  const validPhotos = photos.filter(p => {
    const s = `${p.title || ''} ${p.imageUrl || ''} ${p.sourceUrl || ''}`.toLowerCase();
    if (s.includes('cancun') || s.includes('seadust')) return false;
    return true;
  });

  const used = new Set();
  const findFirst = (pool, pred) => {
    const found = pool.find(p => p?.imageUrl && !used.has(p.imageUrl) && pred(p));
    if (found) {
      used.add(found.imageUrl);
      return found;
    }
    return null;
  };

  const isRooftopOrBar = (p) => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    return s.includes('rooftop') || s.includes('12th knot') || s.includes('12thknot') || s.includes('knot') || s.includes('sky bar') || s.includes('cocktail') || /\bbar\b/i.test(s) || s.includes('lyaness') || s.includes('lounge');
  };

  const isExterior = (p) => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    return s.includes('exterior') || s.includes('facade') || s.includes('façade') || s.includes('building') || (s.includes('outside') && !s.includes('balcony-suite'));
  };

  const isBedroom = (p) => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    if (isExterior(p) || isRooftopOrBar(p)) return false;
    return s.includes('bedroom') || s.includes('suite') || s.includes('cabin');
  };

  const isBath = (p) => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    return s.includes('bath') || s.includes('bathroom') || s.includes('shower') || /\btub\b/i.test(s);
  };

  // Slot 1: Specifically 12th Knot Rooftop Bar (as requested in Shift 1)
  let slot1 = findFirst(validPhotos, p => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    return (s.includes('12thknot') || s.includes('12th knot') || (s.includes('12th') && s.includes('knot')) || s.includes('rooftop')) && !isBedroom(p) && !isBath(p) && !isExterior(p);
  });
  if (!slot1) {
    slot1 = findFirst(validPhotos, p => s.includes('lyaness') && !isBedroom(p) && !isBath(p) && !isExterior(p));
  }

  // Slot 2: True Exterior Facade (prioritize 'exterior' or 'facade')
  let slot2 = findFirst(validPhotos, p => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    return (s.includes('exterior') || s.includes('facade') || s.includes('façade')) && !isBath(p) && !isBedroom(p);
  });
  if (!slot2) {
    slot2 = findFirst(validPhotos, p => isExterior(p) && !isBath(p) && !isBedroom(p));
  }

  // Slot 3: Suite / Bedroom (Riverview Suite)
  const slot3 = findFirst(validPhotos, p => isBedroom(p) && !isBath(p));

  // Slot 4: Destination Dining / Cocktail Bar (Lyaness)
  const slot4 = findFirst(validPhotos, p => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    return (s.includes('lyaness') || p.detectedCategory === 'SOCIAL' || isRooftopOrBar(p) || s.includes('dining') || s.includes('restaurant')) && !isBedroom(p) && !isBath(p) && !isExterior(p);
  });

  // Slot 5: Bathroom
  const slot5 = findFirst(validPhotos, p => isBath(p) && !isExterior(p));

  console.log('SLOT 1 (12th Knot Rooftop):', slot1?.title, '\n ', slot1?.imageUrl);
  console.log('\nSLOT 2 (Exterior Facade):', slot2?.title, '\n ', slot2?.imageUrl);
  console.log('\nSLOT 3 (Signature Suite):', slot3?.title, '\n ', slot3?.imageUrl);
  console.log('\nSLOT 4 (Lyaness / Destination Dining):', slot4?.title, '\n ', slot4?.imageUrl);
  console.log('\nSLOT 5 (Design Bathroom):', slot5?.title, '\n ', slot5?.imageUrl);
}

testSelectionRefined();
