async function inspectSeaContainersFull() {
  console.log('Fetching full audit for Sea Containers London...');
  const res = await fetch('http://localhost:3002/api/master-vibe-audit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      hotelName: 'Sea Containers London',
      city: 'London',
      neighborhood: 'South Bank',
      fresh: true
    })
  });
  
  const data = await res.json();
  const recs = data.ota_conversion_audit?.optimal_5_photo_sequence || data.recommendations || [];
  console.log('\n===== SEA CONTAINERS SLOTS 1-5 =====\n');
  recs.slice(0, 5).forEach((slot, i) => {
    console.log(`SLOT ${i + 1}:`);
    console.log(`  Category: ${slot.category}`);
    console.log(`  Action Label: ${slot.action_label}`);
    console.log(`  Photo Subject: ${slot.photo_subject}`);
    console.log(`  Current Slot (wasSlot): ${slot.current_slot}`);
    console.log(`  Photo URL: ${slot.resolved_photo_url || slot.photo_url}`);
    console.log(`  Upgrade Rationale: ${slot.upgrade_rationale}`);
    console.log(`  Bullets:`, slot.bullet_points);
    console.log('----------------------------------------------------');
  });
}

inspectSeaContainersFull();
