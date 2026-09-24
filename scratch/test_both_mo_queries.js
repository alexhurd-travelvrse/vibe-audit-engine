async function testBoth() {
  const queries = [
    { hotelName: 'mandarin oriental', city: 'London', neighborhood: 'knightsbridge' },
    { hotelName: 'Mandarin Oriental Hyde Park, London', city: 'London', neighborhood: 'Knightsbridge' }
  ];

  for (const q of queries) {
    console.log(`\n======================================================`);
    console.log(`SEARCHING: "${q.hotelName}" (${q.neighborhood}, ${q.city})`);
    console.log(`======================================================`);
    const res = await fetch('http://localhost:5173/api/master-vibe-audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(q)
    });
    const data = await res.json();
    console.log(`Listing Status: ${data.ota_conversion_audit?.listing_status} | Is Listed: ${data.ota_conversion_audit?.is_listed_on_booking}`);
    console.log(`Live Photos Found: ${data.ota_conversion_audit?.live_photos?.length || 0}`);
    console.log(`Optimal Slots: ${data.ota_conversion_audit?.optimal_5_photo_sequence?.length || 0}`);
    (data.ota_conversion_audit?.optimal_5_photo_sequence || []).forEach(s => {
      console.log(`  Slot #${s.slot}: [${s.category}] [${s.action_label || s.action}] -> URL: ${s.photo_url}`);
    });
  }
}

testBoth().catch(console.error);
