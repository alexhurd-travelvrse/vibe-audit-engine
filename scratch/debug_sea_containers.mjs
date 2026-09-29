async function test() {
  const res = await fetch('http://localhost:3002/api/master-vibe-audit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      hotelName: 'Sea Conainers',
      city: 'London',
      neighborhood: 'South Bank',
      bookingUrl: 'https://www.booking.com/hotel/gb/sea-containers-london.html'
    })
  });
  const data = await res.json();
  console.log('Hotel:', data.venue_name);
  console.log('Shifts:', data.ota_conversion_audit?.key_strategic_shifts);
  (data.ota_conversion_audit?.optimal_5_photo_sequence || []).forEach((s, idx) => {
    console.log(`Slot ${idx + 1}: [${s.category}] "${s.photo_subject}" | wasSlot: ${s.current_slot} | action: ${s.action} | URL: ${s.photo_url}`);
  });
}
test();
