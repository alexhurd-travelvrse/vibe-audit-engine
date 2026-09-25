async function testTwoPhase() {
  const hotel = {
    hotelName: 'The Plymouth Hotel',
    city: 'Miami Beach',
    neighborhood: 'South Beach'
  };

  console.log('==================================================');
  console.log('TESTING TWO-PHASE VIBE AUDIT & PHOTO RESOLUTION');
  console.log('==================================================');

  // 1. Phase 1: Fast Manifest & Strategy Text
  console.log('\n--- PHASE 1: Requesting Fast Manifest (/api/master-vibe-manifest) ---');
  const t0 = Date.now();
  const manifestRes = await fetch('http://localhost:3002/api/master-vibe-manifest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(hotel)
  });
  const manifestData = await manifestRes.json();
  const t1 = Date.now();
  console.log(`Phase 1 returned in ${t1 - t0}ms!`);
  console.log(`Venue Name: ${manifestData.venue_name}`);
  console.log(`Energy Score: ${manifestData.vibe_signature?.energy_score}/100`);
  console.log(`Photos Status: ${manifestData.ota_conversion_audit?.photos_status}`);
  console.log(`Slots pending photos: ${(manifestData.ota_conversion_audit?.optimal_5_photo_sequence || []).length}`);

  // 2. Phase 2: Dedicated Photo Resolution
  console.log('\n--- PHASE 2: Requesting Photo Resolution (/api/resolve-audit-photos) ---');
  const t2 = Date.now();
  const photoRes = await fetch('http://localhost:3002/api/resolve-audit-photos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...hotel,
      strategySlots: manifestData.ota_conversion_audit?.optimal_5_photo_sequence
    })
  });
  const photoData = await photoRes.json();
  const t3 = Date.now();
  console.log(`Phase 2 resolved in ${t3 - t2}ms!`);
  console.log(`Listed on Booking: ${photoData.is_listed_on_booking} | Live Photos: ${photoData.live_photos?.length}`);
  console.log(`Photos Status: ${photoData.photos_status}`);

  console.log('\nVerified 5-Photo Merchandising Sequence:');
  (photoData.optimal_5_photo_sequence || []).forEach(s => {
    console.log(`Slot #${s.slot}: [${s.category}] [${s.action_label || s.action}]`);
    console.log(`  Subject: ${s.photo_subject}`);
    console.log(`  URL: ${s.photo_url}`);
  });
}

testTwoPhase().catch(console.error);
