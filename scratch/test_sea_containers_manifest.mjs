async function testSeaContainersManifest() {
  console.log(`\n======================================================`);
  console.log(`TESTING VIBE MANIFEST FOR: Sea Containers London`);
  const t0 = Date.now();
  
  const res = await fetch('http://localhost:3002/api/master-vibe-audit?phase=1', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      hotelName: 'Sea Containers London',
      city: 'London',
      neighborhood: 'South Bank',
      fresh: true
    })
  });
  
  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`Status: ${res.status} in ${elapsed}s`);
  
  if (!res.ok) {
    console.error('Error:', await res.text());
    return;
  }
  
  const data = await res.json();
  console.log(`\n--- VIBE MANIFEST RESULTS ---`);
  console.log(`Venue: ${data.venue_name}`);
  console.log(`Location: ${data.location}`);
  console.log(`Headline: "${data.vibe_signature?.headline}"`);
  console.log(`Energy Score: ${data.vibe_signature?.energy_score}`);
  console.log(`Social Pacing: ${data.vibe_signature?.social_pacing}`);
  console.log(`Soundscape: ${data.vibe_signature?.acoustic_dna?.soundscape_genre}`);
  console.log(`Anchor Artists:`, data.vibe_signature?.acoustic_dna?.anchor_artists);
  console.log(`Spotify Query: ${data.vibe_signature?.acoustic_dna?.spotify_query}`);
  console.log(`Decibel Level: ${data.vibe_signature?.acoustic_dna?.decibel_level}`);
  console.log(`Materials: ${data.vibe_signature?.authenticity_and_materials?.material_palette}`);
  console.log(`Crowd Primary: ${data.vibe_signature?.crowd_archetype?.primary}`);
  console.log(`Local Ratio: ${data.vibe_signature?.crowd_archetype?.local_ratio}% locals / ${data.vibe_signature?.crowd_archetype?.tourist_ratio}% tourists`);
  console.log(`Insider Secret: "${data.vibe_signature?.insider_secrets?.secret_title}"`);
  console.log(`Insider Lore: "${data.vibe_signature?.insider_secrets?.secret_lore}"`);
  console.log(`You Will Love If: "${data.vibe_signature?.qualification_test?.you_will_love_if}"`);
  console.log(`Skip If: "${data.vibe_signature?.qualification_test?.skip_if}"`);
  console.log(`Strategic Shifts:`, data.ota_conversion_audit?.key_strategic_shifts);
  console.log(`Anti-Commodity Headline: "${data.ota_conversion_audit?.anti_commodity_copy_rewrite?.ota_headline}"`);
}

testSeaContainersManifest();
