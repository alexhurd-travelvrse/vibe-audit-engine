async function run(name) {
  console.log(`\n================ Testing "${name}" ================`);
  const res = await fetch('http://localhost:3002/api/master-vibe-audit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      hotelName: name,
      city: 'London',
      neighborhood: 'South Bank',
      bookingUrl: 'https://www.booking.com/hotel/gb/sea-containers-london.html',
      fresh: true
    })
  });
  const data = await res.json();
  console.log('Hotel:', data.venue_name);
  (data.ota_conversion_audit?.optimal_5_photo_sequence || []).forEach((s, idx) => {
    console.log(`Slot ${idx + 1}: [${s.category}] "${s.photo_subject}"`);
    console.log(`  URL: ${s.photo_url}`);
    console.log(`  Source: ${s.source_display_label} (wasSlot: ${s.current_slot})`);
  });
}

run('Sea Containers London');
