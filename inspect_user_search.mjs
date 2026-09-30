async function checkLondonSearch() {
  const res = await fetch('http://localhost:3002/api/master-vibe-audit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      hotelName: '25hours Hotel Indre By Copenhagen',
      city: 'London',
      bookingUrl: 'https://www.booking.com/hotel/dk/25hours-indre-by.html'
    })
  });

  const data = await res.json();
  const ota = data.ota_conversion_audit || data;

  console.log('--- SLOTS RETURNED TO USER ---');
  (ota.optimal_5_photo_sequence || []).forEach(slot => {
    console.log(`Slot #${slot.slot}: [${slot.category}] ${slot.photo_subject}`);
    console.log(`  Action: ${slot.action_label} | Source: ${slot.source_display_label}`);
    console.log(`  Photo URL: ${slot.photo_url}`);
    console.log(`  Why: ${slot.why_it_converts}`);
    console.log(`  Current Slot: ${slot.current_slot}`);
  });

  console.log('\n--- KEY STRATEGIC SHIFTS ---');
  (ota.key_strategic_shifts || []).forEach((s, idx) => console.log(`[Shift #${idx + 1}] ${s}`));
}

checkLondonSearch().catch(console.error);
