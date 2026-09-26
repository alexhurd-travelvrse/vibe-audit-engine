async function test() {
  console.log('Testing Edition on running server...');
  const res1 = await fetch('http://localhost:3002/api/lookup-hotel-candidates', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hotelName: 'The Edition Miami Beach', city: 'Miami' })
  });
  console.log('Lookup Result 1:', await res1.json());

  const res2 = await fetch('http://localhost:3002/api/resolve-audit-photos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      hotelName: 'The Miami Beach EDITION',
      city: 'Miami',
      neighborhood: 'Miami Beach',
      bookingUrl: 'https://www.booking.com/hotel/us/twoninezeroone-collinsave.html'
    })
  });
  const photos = await res2.json();
  console.log('Photos is_listed_on_booking:', photos.is_listed_on_booking);
  console.log('Photos live_photos count:', photos.live_photos?.length);
  for (const s of (photos.optimal_5_photo_sequence || [])) {
    console.log(`Slot #${s.slot} [${s.category}]: ${s.action_label}`);
    console.log(`  URL: ${s.photo_url}`);
  }
}
test();
