async function check() {
  const res = await fetch('http://localhost:3002/api/master-vibe-audit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hotelName: 'The Plymouth Hotel', city: 'Miami', neighborhood: 'South Beach' })
  });
  const data = await res.json();
  console.log('Live photos count:', data.ota_conversion_audit?.live_photos?.length);
  (data.ota_conversion_audit?.live_photos || []).forEach((p, idx) => {
    console.log(`Live Photo #${p.slot || (idx + 1)}: Title: "${p.title}" | URL: ${p.imageUrl}`);
  });
}
check().catch(console.error);
