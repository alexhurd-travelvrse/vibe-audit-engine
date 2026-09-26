const http = require('http');

const userUrl = 'https://www.booking.com/hotel/us/twoninezeroone-collinsave.en-gb.html?aid=357028&label=bin859jc-10CAso7AFCGXR3b25pbmV6ZXJvb25lLWNvbGxpbnNhdmVIM1gDaFCIAQGYATO4ARfIAQzYAQPoAQH4AQGIAgGoAgG4ApCL3tUGwAIB0gIkMDk3ODUxNGQtNzY4ZC00Njc3LTkzM2YtYzRlYWJmYjZjNTA12AIB4AIB&sid=e6b0165d9d0b42e596d50fdf34ee196e&all_sr_blocks=111279902_94582385_0_0_0&checkin=2026-10-23&checkout=2026-10-25&dest_id=20023182&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=111279902_94582385_0_0_0&hpos=1&matching_block_id=111279902_94582385_0_0_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=111279902_94582385_0_0_0__201575&srepoch=1790434887&srpvid=c8be67fd591007d3&type=total&ucfs=1&';

const payload = JSON.stringify({
  hotelName: 'The edition',
  city: 'Miami',
  neighborhood: 'South Beach',
  bookingId: userUrl, // User pasted the URL into the input field!
  fresh: true
});

console.log('Sending request for The edition with user URL in bookingId...');

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
      console.log('is_listed_on_booking:', ota.is_listed_on_booking);
      console.log('listing_status:', ota.listing_status);
      console.log('live_photos count:', ota.live_photos?.length || 0);
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
