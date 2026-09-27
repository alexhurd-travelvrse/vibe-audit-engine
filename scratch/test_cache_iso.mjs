async function testCacheIsolation() {
  console.log('Testing cache isolation for The Standard Spa, Miami Beach...');
  const res = await fetch('http://localhost:3002/api/master-vibe-audit?phase=1', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      hotelName: 'The Standard Spa, Miami Beach',
      city: 'Miami',
      neighborhood: 'Belle Isle',
      fresh: true
    })
  });
  const data = await res.json();
  console.log(`Venue: ${data.venue_name}`);
  console.log(`Location: ${data.location}`);
  console.log(`Headline: "${data.vibe_signature?.headline}"`);
  console.log(`Soundscape: ${data.vibe_signature?.acoustic_dna?.soundscape_genre}`);
}
testCacheIsolation();
