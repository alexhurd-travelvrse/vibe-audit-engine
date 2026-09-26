const http = require('http');

const payload = JSON.stringify({
  hotelName: 'Sea Containers London',
  city: 'London',
  neighborhood: 'South Bank',
  bookingUrl: 'https://www.booking.com/hotel/gb/sea-containers-london.html'
});

const req = http.request('http://localhost:3002/api/master-vibe-audit?phase=1', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) },
  timeout: 60000
}, (res) => {
  let raw = '';
  res.on('data', c => raw += c);
  res.on('end', () => {
    try {
      const data = JSON.parse(raw);
      console.log('STATUS:', res.statusCode);
      const ota = data.ota_conversion_audit;
      if (!ota) {
        console.log('No ota data:', data);
        return;
      }
      console.log('\nKEY STRATEGIC SHIFTS:');
      (ota.key_strategic_shifts || []).forEach((s, i) => console.log(`  [${i+1}] ${s}`));
      console.log('\nOPTIMAL 5-PHOTO SEQUENCE:');
      (ota.optimal_5_photo_sequence || []).forEach(s => {
        console.log(`  Slot #${s.slot} [${s.category}] - ${s.action_label || s.action}`);
        console.log(`    Subject: ${s.photo_subject}`);
        console.log(`    Photo: ${s.photo_url}`);
        console.log(`    Why: ${s.why_it_converts?.substring(0, 100)}...`);
      });
    } catch (e) {
      console.error(e.message, raw.substring(0, 500));
    }
  });
});
req.write(payload);
req.end();
