async function testAll() {
  const hotels = [
    { hotelName: 'Mandarin Oriental Hyde Park, London', city: 'London', neighborhood: 'Knightsbridge' },
    { hotelName: 'Sea Containers London', city: 'London', neighborhood: 'Southwark' },
    { hotelName: 'The Palms Hotel & Spa', city: 'Miami Beach', neighborhood: 'South Beach' },
    { hotelName: 'The Plymouth Hotel', city: 'Miami Beach', neighborhood: 'South Beach' },
    { hotelName: 'Aloft Miami Brickell', city: 'Miami', neighborhood: 'Brickell' }
  ];

  for (const h of hotels) {
    console.log(`\n========================================`);
    console.log(`TESTING: ${h.hotelName} in ${h.city} (${h.neighborhood})`);
    console.log(`========================================`);
    const res = await fetch('http://localhost:3002/api/master-vibe-audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(h)
    });
    const data = await res.json();
    console.log(`Listed on Booking: ${data.ota_conversion_audit?.is_listed_on_booking} | Live Photos: ${data.ota_conversion_audit?.live_photos?.length}`);
    (data.ota_conversion_audit?.optimal_5_photo_sequence || []).forEach(s => {
      console.log(`Slot #${s.slot}: [${s.category}] [${s.action_label || s.action}] (current_slot: ${s.current_slot})`);
      console.log(`  Subject: ${s.photo_subject}`);
      console.log(`  URL: ${s.photo_url}`);
    });
  }
}

testAll().catch(console.error);
