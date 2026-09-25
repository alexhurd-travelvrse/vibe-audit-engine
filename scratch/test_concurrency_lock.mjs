async function testConcurrencyAndCache() {
  const payload = {
    hotelName: 'The Plymouth Hotel',
    city: 'Miami',
    neighborhood: 'South Beach'
  };

  console.log('--- TEST: Calling Phase 2 (/api/resolve-audit-photos) twice concurrently ---');
  const start = Date.now();
  const [res1, res2] = await Promise.all([
    fetch('http://localhost:3002/api/resolve-audit-photos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(r => r.json()),
    fetch('http://localhost:3002/api/resolve-audit-photos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(r => r.json())
  ]);

  const elapsed = Date.now() - start;
  console.log(`Both concurrent requests completed in ${elapsed}ms.`);
  console.log('Res 1 slots count:', res1.optimal_5_photo_sequence?.length);
  console.log('Res 2 slots count:', res2.optimal_5_photo_sequence?.length);

  console.log('\n--- TEST: Immediate 3rd Call (Cache Hit) ---');
  const cacheStart = Date.now();
  const res3 = await fetch('http://localhost:3002/api/resolve-audit-photos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then(r => r.json());
  const cacheElapsed = Date.now() - cacheStart;
  console.log(`3rd call returned from cache in ${cacheElapsed}ms! (Slots: ${res3.optimal_5_photo_sequence?.length})`);
}

testConcurrencyAndCache().catch(console.error);
