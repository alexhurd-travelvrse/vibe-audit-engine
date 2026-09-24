const start = Date.now();

async function run() {
  console.log('Sending request to /api/master-vibe-audit for The Plymouth Hotel...');
  const res = await fetch('http://localhost:3002/api/master-vibe-audit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      hotelName: 'The Plymouth Hotel',
      city: 'Miami',
      neighborhood: 'South Beach'
    })
  });

  const data = await res.json();
  console.log(`\n=== RESULT (Status: ${res.status}, Time: ${Date.now() - start}ms) ===`);
  console.log('Venue:', data.venue_name, 'in', data.location);
  console.log('Acoustic DNA:', data.vibe_signature?.acoustic_dna?.decibel_level, '| Clarity:', data.vibe_signature?.acoustic_dna?.conversation_verdict);
  console.log('Authenticity:', data.vibe_signature?.authenticity_and_materials?.authenticity_score, '| Verdict:', data.vibe_signature?.authenticity_and_materials?.material_verdict);
  console.log('Crowd Gravity:', `Locals ${data.vibe_signature?.crowd_archetype?.local_ratio}% / Tourists ${data.vibe_signature?.crowd_archetype?.tourist_ratio}%`, '| Verdict:', data.vibe_signature?.crowd_archetype?.tourist_trap_verdict);
  console.log('Lighting & Mood:', data.vibe_signature?.lighting_and_sensory?.lighting_temperature);
  console.log('Location Pulse:', data.vibe_signature?.hyper_local_proximity?.distance_summary);
  console.log('Insider Secret:', data.vibe_signature?.insider_secrets?.signature_secret);
  
  console.log('\n=== OPTIMAL 5-PHOTO SEQUENCE ===');
  (data.ota_conversion_audit?.optimal_5_photo_sequence || []).forEach(s => {
    console.log(`Slot #${s.slot}: [${s.category}] [${s.action_label || s.action}]`);
    console.log(`  Subject: ${s.photo_subject}`);
    console.log(`  URL: ${s.photo_url}`);
  });
}

run().catch(console.error);
