const http = require('http');

const payload = JSON.stringify({
  hotelName: 'Sea Containers London',
  city: 'London',
  neighborhood: 'South Bank',
  bookingId: '1048291'
});

console.log('Sending request with 3 mandatory fields (hotelName, city, bookingId)...');

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
        console.log('Data:', data);
        return;
      }
      console.log('\nKEY STRATEGIC SHIFTS:');
      (ota.key_strategic_shifts || []).forEach((s, i) => console.log(`  [${i+1}] ${s}`));
      console.log('\nOPTIMAL 5-PHOTO SEQUENCE:');
      (ota.optimal_5_photo_sequence || []).forEach(s => {
        console.log(`  Slot #${s.slot} [${s.category}] - ${s.photo_subject}`);
        console.log(`    URL: ${s.photo_url}`);
      });
    } catch (e) {
      console.error('Error:', e.message, raw.substring(0, 300));
    }
  });
});

req.on('error', console.error);
req.write(payload);
req.end();
