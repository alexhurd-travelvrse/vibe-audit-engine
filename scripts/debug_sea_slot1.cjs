require('dotenv').config();

async function debugSlot1Match() {
  const { fetchAmenityPhotosForHotel } = await import('../api/master-vibe-audit.js');
  const photos = await fetchAmenityPhotosForHotel('Sea Containers London', 'London', 'South Bank');
  
  const slot1Subject = "Dynamic shot of Lyaness Bar or 12th Knot Rooftop Bar at peak evening buzz, showcasing stylish crowd and river views.".toLowerCase();
  const slot1Keywords = slot1Subject.replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 3 && !['hero', 'cultural', 'magnet', 'slot', 'signature', 'with', 'iconic'].includes(w));
  console.log('Keywords:', slot1Keywords);

  const isBedroomLike = (p) => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    if (p.detectedCategory === 'EXTERIOR' || s.includes('exterior') || s.includes('facade') || s.includes('façade')) return false;
    return s.includes('bedroom') || s.includes('suite') || (s.includes('bed') && !s.includes('sunbed') && !s.includes('daybed'));
  };

  const isBath = (p) => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    return s.includes('bathroom') || s.includes('shower') || s.includes('bath') || s.includes('tub');
  };

  const isExterior = (p) => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    return p.detectedCategory === 'EXTERIOR' || s.includes('exterior') || s.includes('facade') || s.includes('façade') || s.includes('building') || s.includes('outside') || s.includes('aerial') || s.includes('marina') || s.includes('entrance');
  };

  const isTightFoodMacro = (p) => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    return s.includes('food_') || s.includes('_food') || s.includes('fruits_de_mer') || s.includes('boeuf') || s.includes('steak') || s.includes('dessert') || s.includes('burger') || s.includes('oyster') || s.includes('dish') || s.includes('plate') || s.includes('tartare') || s.includes('pasta');
  };

  const matchesSlot1Magnet = (p) => {
    if (p.isSignatureMagnet) return true;
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    return slot1Keywords.some(kw => s.includes(kw));
  };

  console.log('\nTesting photos against slot 1 criteria:');
  photos.forEach((p, i) => {
    const match = matchesSlot1Magnet(p);
    const bed = isBedroomLike(p);
    const bath = isBath(p);
    const ext = isExterior(p);
    const food = isTightFoodMacro(p);
    const passes = match && !bed && !bath && !ext && !food;
    if (match || p.title.toLowerCase().includes('knot') || p.imageUrl.toLowerCase().includes('knot') || p.title.toLowerCase().includes('lyaness') || p.imageUrl.toLowerCase().includes('lyaness') || p.imageUrl.includes('cancun')) {
      console.log(`[${i+1}] Title: ${p.title}`);
      console.log(`     URL: ${p.imageUrl}`);
      console.log(`     match: ${match}, bed: ${bed}, bath: ${bath}, ext: ${ext}, food: ${food} ==> PASSES: ${passes}\n`);
    }
  });
}

debugSlot1Match();
