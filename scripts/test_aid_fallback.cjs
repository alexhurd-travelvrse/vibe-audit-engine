const http = require('http');

const payload = JSON.stringify({
  hotelName: 'The edition',
  city: 'Miami',
  neighborhood: 'South Beach',
  bookingId: '357028', // Mistakenly entered aid
  fresh: true
});

console.log('Sending request for The edition with aid 357028 in bookingId...');

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
      console.log('is_listed_on_booking:', ota?.is_listed_on_booking);
      console.log('listing_status:', ota?.listing_status);
      console.log('live_photos count:', ota?.live_photos?.length || 0);
    } catch (e) {
      console.error('Error:', e.message, raw.substring(0, 300));
    }
  });
});

req.on('error', console.error);
req.write(payload);
req.end();
