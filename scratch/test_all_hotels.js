async function testAll() {
  const hotels = [
    { hotelName: 'The Palms Hotel & Spa', city: 'Miami', neighborhood: 'Miami Beach' },
    { hotelName: 'The Plymouth Hotel', city: 'Miami', neighborhood: 'Miami Beach' },
    { hotelName: 'Aloft Miami Brickell', city: 'Miami', neighborhood: 'Brickell' }
  ];

  for (const h of hotels) {
    console.log(`\n========================================`);
    console.log(`TESTING: ${h.hotelName} (${h.neighborhood})`);
    console.log(`========================================`);
    const res = await fetch('http://localhost:3002/api/master-vibe-audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(h)
    });
    const data = await res.json();
    (data.ota_conversion_audit?.optimal_5_photo_sequence || []).forEach(s => {
      console.log(`Slot #${s.slot}: [${s.category}] [${s.action_label || s.action}] (current_slot: ${s.current_slot})`);
      console.log(`  Subject: ${s.photo_subject}`);
      console.log(`  URL: ${s.photo_url}`);
    });
  }
}

testAll().catch(console.error);
