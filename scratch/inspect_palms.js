async function inspectPalms() {
  const res = await fetch('http://localhost:3002/api/master-vibe-audit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hotelName: 'The Palms Hotel & Spa', city: 'Miami', neighborhood: 'Miami Beach' })
  });
  const data = await res.json();
  console.log('=== THE PALMS HOTEL & SPA: LIVE BOOKING.COM PHOTOS ===');
  (data.ota_conversion_audit?.live_photos || []).forEach((p, idx) => {
    console.log(`Live Photo #${p.slot || (idx + 1)}: Title: "${p.title}" | URL: ${p.imageUrl}`);
  });

  console.log('\n=== THE PALMS HOTEL & SPA: OPTIMAL 5-SLOT SEQUENCE ===');
  (data.ota_conversion_audit?.optimal_5_photo_sequence || []).forEach(s => {
    console.log(`Slot #${s.slot}: [${s.category}] [${s.action_label || s.action}] (current_slot: ${s.current_slot})`);
    console.log(`  Subject: ${s.photo_subject}`);
    console.log(`  Upgrade Rationale: ${s.upgrade_rationale}`);
    console.log(`  URL: ${s.photo_url}`);
  });
}

inspectPalms().catch(console.error);
