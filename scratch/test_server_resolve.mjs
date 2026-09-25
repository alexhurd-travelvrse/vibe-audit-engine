async function test() {
  console.log('Testing resolve-audit-photos on running server...');
  const res = await fetch('http://localhost:3002/api/resolve-audit-photos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hotelName: 'The Plymouth South Beach', city: 'Miami', neighborhood: 'South Beach' })
  });
  const data = await res.json();
  console.log('is_listed_on_booking:', data.is_listed_on_booking);
  console.log('listing_status:', data.listing_status);
  console.log('live_photos count:', data.live_photos?.length);
  for (const s of (data.optimal_5_photo_sequence || [])) {
    console.log(`Slot #${s.slot} [${s.category}]: ${s.action_label}`);
    console.log(`  URL: ${s.photo_url}`);
  }
}
test();
