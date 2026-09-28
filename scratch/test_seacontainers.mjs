async function testSeaContainers() {
  console.log('Testing Sea Containers London with Two-Pass Multimodal Gatekeeper...');
  const res = await fetch('http://localhost:3002/api/master-vibe-audit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      hotelName: 'Sea Containers London',
      city: 'London',
      fresh: true
    })
  });
  
  if (!res.ok) {
    console.error('Error:', await res.text());
    return;
  }
  
  const data = await res.json();
  console.log('\nHotel:', data.venue_name);
  console.log('Location:', data.location);
  console.log('Vibe Headline:', data.vibe_signature?.headline);
  console.log('Energy Score:', data.vibe_signature?.energy_score);
  
  const slots = data.ota_conversion_audit?.optimal_5_photo_sequence || [];
  console.log('\n===== SLOTS 1 to 5 =====');
  slots.forEach((s, idx) => {
    console.log(`\nSlot ${idx + 1}: [${s.category}] ${s.action_label}`);
    console.log(`  Subject: ${s.photo_subject}`);
    console.log(`  URL: ${s.photo_url || s.resolved_photo_url}`);
    console.log(`  Current Slot (wasSlot): ${s.current_slot}`);
    console.log(`  Source Tag: ${s.source_display_label}`);
    console.log(`  Rationale: ${s.upgrade_rationale}`);
  });
}

testSeaContainers();
