const http = require('http');

const url = 'https://www.booking.com/hotel/gb/hilton-london-kensington.en-gb.html?aid=357028&label=bin859jc-10CAso7AFCGXR3b25pbmV6ZXJvb25lLWNvbGxpbnNhdmVIM1gDaFCIAQGYATO4ARfIAQzYAQPoAQH4AQGIAgGoAgG4ApCL3tUGwAIB0gIkMDk3ODUxNGQtNzY4ZC00Njc3LTkzM2YtYzRlYWJmYjZjNTA12AIB4AIB&sid=e6b0165d9d0b42e596d50fdf34ee196e&all_sr_blocks=3653606_357658061_2_42_0&checkin=2026-10-23&checkout=2026-10-25&dest_id=-2601889&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=14&highlighted_blocks=3653606_357658061_2_42_0&hpos=14&matching_block_id=3653606_357658061_2_42_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=3653606_357658061_2_42_0__31038&srepoch=1790436211&srpvid=644c6c2c6ec30370&type=total&ucfs=1&';

const payload = JSON.stringify({
  hotelName: 'Hilton London Kensington',
  city: 'London',
  neighborhood: 'Kensington',
  bookingId: url,
  fresh: true
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
      const ota = data.ota_conversion_audit;
      console.log('STATUS:', res.statusCode);
      console.log('KEY STRATEGIC SHIFTS:');
      (ota?.key_strategic_shifts || []).forEach((s, i) => console.log(`  [${i+1}] ${s}`));
      console.log('\nOPTIMAL 5-PHOTO SEQUENCE:');
      (ota?.optimal_5_photo_sequence || []).forEach(s => {
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
