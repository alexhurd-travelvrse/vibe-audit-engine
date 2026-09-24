async function inspectMandarinOriental() {
  console.log('Testing Mandarin Oriental Hyde Park, London (Knightsbridge)...');
  const res = await fetch('http://localhost:3002/api/master-vibe-audit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      hotelName: 'Mandarin Oriental Hyde Park, London',
      city: 'London',
      neighborhood: 'Knightsbridge'
    })
  });
  const data = await res.json();

  console.log('\n=== MANDARIN ORIENTAL: LIVE BOOKING.COM PHOTOS ===');
  (data.ota_conversion_audit?.live_photos || []).forEach((p, idx) => {
    console.log(`Live Photo #${p.slot || (idx + 1)}: Title: "${p.title}" | URL: ${p.imageUrl}`);
  });

  console.log('\n=== MANDARIN ORIENTAL: OPTIMAL 5-SLOT SEQUENCE ===');
  console.log(`Before Score: ${data.ota_conversion_audit?.before_merchandising_score} | After Score: ${data.ota_conversion_audit?.after_merchandising_score} | Uplift: ${data.ota_conversion_audit?.projected_conversion_uplift}`);
  console.log(`Current Drop-Off Flaw: ${data.ota_conversion_audit?.current_drop_off_flaw}`);
  
  (data.ota_conversion_audit?.optimal_5_photo_sequence || []).forEach(s => {
    console.log(`\nSlot #${s.slot}: [${s.category}] [${s.action_label || s.action}] (current_slot: ${s.current_slot})`);
    console.log(`  Subject: ${s.photo_subject}`);
    console.log(`  Upgrade Rationale: ${s.upgrade_rationale}`);
    console.log(`  URL: ${s.photo_url}`);
    if (s.bullet_points) {
      s.bullet_points.forEach(b => console.log(`    • ${b}`));
    }
  });
}

inspectMandarinOriental().catch(console.error);
