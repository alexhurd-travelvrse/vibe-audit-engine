async function testUserQuery() {
  const hotelName = 'plymouth';
  const city = 'miami';
  const neighborhood = 'south beach';

  console.log('--- PHASE 1: Fast Manifest ---');
  const manifestRes = await fetch('http://localhost:3002/api/master-vibe-manifest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hotelName, city, neighborhood })
  });
  const manifest = await manifestRes.json();
  console.log('Manifest slots:');
  console.log(JSON.stringify(manifest.ota_conversion_audit?.optimal_5_photo_sequence, null, 2));

  console.log('\n--- PHASE 2: Photo Resolution ---');
  const photoRes = await fetch('http://localhost:3002/api/resolve-audit-photos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      hotelName,
      city,
      neighborhood,
      strategySlots: manifest.ota_conversion_audit?.optimal_5_photo_sequence
    })
  });
  const photoData = await photoRes.json();
  console.log('\nResolved slots:');
  photoData.optimal_5_photo_sequence?.forEach(s => {
    console.log(`Slot #${s.slot} [${s.category}] (${s.action}):`);
    console.log(`  Subject: ${s.photo_subject}`);
    console.log(`  URL: ${s.photo_url}`);
    console.log(`  Was Slot: ${s.current_slot}`);
  });
}

testUserQuery().catch(console.error);
