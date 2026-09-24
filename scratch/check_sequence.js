async function test() {
  const res = await fetch('http://localhost:3002/api/master-vibe-audit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hotelName: 'The Plymouth Hotel', city: 'Miami', neighborhood: 'South Beach' })
  });
  const data = await res.json();
  const sequence = data.ota_conversion_audit?.optimal_5_photo_sequence || [];
  console.log('\n=== CURRENT OPTIMAL 5-SLOT SEQUENCE ===');
  sequence.forEach(s => {
    console.log(`Slot #${s.slot}: [${s.category}] [${s.action_label || s.action}] (current_slot: ${s.current_slot})`);
    console.log(`  Subject: ${s.photo_subject}`);
    console.log(`  URL: ${s.photo_url}`);
  });
}

test().catch(console.error);
