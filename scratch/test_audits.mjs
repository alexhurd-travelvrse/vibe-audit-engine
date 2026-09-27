async function testAudit(name, bookingUrl) {
  console.log(`\n======================================================`);
  console.log(`TESTING: ${name}`);
  console.log(`URL: ${bookingUrl}`);
  const startTime = Date.now();
  
  try {
    const res = await fetch('http://localhost:3002/api/master-vibe-audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingUrl, fresh: true })
    });
    
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`Response status: ${res.status} in ${elapsed}s`);
    
    if (!res.ok) {
      const txt = await res.text();
      console.error(`Error: ${txt}`);
      return;
    }
    
    const data = await res.json();
    const hotelName = data.venue_name || data.hotelName || 'N/A';
    const location = data.location || 'N/A';
    const headline = data.vibe_signature?.headline || data.vibeManifest?.vibeHeadline || 'N/A';
    const energyScore = data.vibe_signature?.energy_score ?? 'N/A';
    const isFallback = data.vibe_signature?.isFallback || data.vibeManifest?.isFallback || false;

    console.log(`Hotel: ${hotelName}`);
    console.log(`Location: ${location}`);
    console.log(`Vibe Headline: "${headline}"`);
    console.log(`Energy Score: ${energyScore}`);
    console.log(`Is Fallback: ${isFallback}`);
    console.log(`\nFirst 5 Recommended Slots:`);
    
    const slots = (data.ota_conversion_audit?.optimal_5_photo_sequence || data.recommendations || []).slice(0, 5);
    slots.forEach((slot, idx) => {
      const category = slot.category || 'N/A';
      const label = slot.action_label || slot.photo_subject || slot.title || 'N/A';
      const photoUrl = slot.resolved_photo_url || slot.photo_url || slot.photoUrl || 'N/A';
      const photoKey = slot.photo_key || slot.photoKey || 'N/A';
      console.log(`  Slot ${idx + 1}: [${category}] ${label}`);
      console.log(`    Photo URL: ${photoUrl}`);
      console.log(`    Unique Key: ${photoKey}`);
    });
    
    // Check duplicates
    const urls = slots.map(s => s.resolved_photo_url || s.photo_url || s.photoUrl).filter(Boolean);
    const keys = slots.map(s => s.photo_key || s.photoKey).filter(Boolean);
    const uniqueKeys = new Set(keys.length ? keys : urls);
    if (slots.length > 1 && slots.length !== uniqueKeys.size) {
      console.error(`❌ DUPLICATE DETECTED IN FIRST 5!`);
    } else {
      console.log(`✅ All first 5 photos are strictly unique!`);
    }

    // Check sister city / Chicago for Hoxton
    if (name.includes('Hoxton')) {
      const hasChicago = slots.some(s => {
        const u = (s.resolved_photo_url || s.photo_url || s.photoUrl || '').toLowerCase();
        const t = (s.action_label || s.photo_subject || s.title || '').toLowerCase();
        return u.includes('chicago') || t.includes('chicago');
      });
      if (hasChicago) {
        console.error(`❌ HOXTON HAS CHICAGO PHOTO!`);
      } else {
        console.log(`✅ Hoxton London isolated: Zero Chicago leaks!`);
      }
    }

    // Check Eden Roc Matador Room
    if (name.includes('Eden Roc')) {
      const hasMatador = slots.some(s => {
        const t = (s.action_label || s.photo_subject || s.title || '').toLowerCase();
        return t.includes('matador room');
      });
      if (hasMatador) {
        console.error(`❌ EDEN ROC HAS MATADOR ROOM FALLBACK!`);
      } else {
        console.log(`✅ Eden Roc: No Matador Room fallback leakage!`);
      }
    }

  } catch (err) {
    console.error(`Test failed:`, err);
  }
}

async function run() {
  console.log('STARTING END-TO-END VALIDATION...');
  // Test 1: The Hoxton Shepherd's Bush
  await testAudit('The Hoxton, Shepherd\'s Bush', 'https://www.booking.com/hotel/gb/the-hoxton-shepherds-bush.en-gb.html');

  // Test 2: Eden Roc Miami Beach
  await testAudit('Eden Roc Miami Beach', 'https://www.booking.com/hotel/us/eden-roc-miami-beach.en-gb.html');

  // Test 3: The Goodtime Hotel Miami
  await testAudit('The Goodtime Hotel', 'https://www.booking.com/hotel/us/the-goodtime.en-gb.html');
}

run();
