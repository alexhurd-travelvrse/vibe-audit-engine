async function testHotel(hotelName, city, neighborhood) {
  console.log(`\n==================================================`);
  console.log(`TESTING: ${hotelName} (${neighborhood || city})`);
  console.log(`==================================================`);

  const t0 = Date.now();
  const manifestRes = await fetch('http://localhost:3002/api/master-vibe-manifest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hotelName, city, neighborhood })
  });
  const manifest = await manifestRes.json();
  const t1 = Date.now();
  console.log(`Manifest (Phase 1): ${t1 - t0}ms | Headline: "${manifest.vibe_signature?.headline}"`);

  const t2 = Date.now();
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
  const photos = await photoRes.json();
  const t3 = Date.now();
  console.log(`Photos (Phase 2): ${t3 - t2}ms | Live Photos: ${photos.live_photos?.length}`);
  (photos.optimal_5_photo_sequence || []).forEach(s => {
    console.log(`  Slot #${s.slot} [${s.category}]: ${s.photo_subject?.slice(0, 50)}... -> ${(s.photo_url || '').slice(0, 60)}...`);
  });
}

async function run() {
  await testHotel('Mandarin Oriental Hyde Park', 'London', 'Knightsbridge');
}

run().catch(console.error);
