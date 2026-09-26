const https = require('https');

const url = 'https://www.booking.com/hotel/us/twoninezeroone-collinsave.en-gb.html';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
  console.log('Status:', res.statusCode);
  if (res.headers.location) console.log('Redirect:', res.headers.location);
  let html = '';
  res.on('data', chunk => { html += chunk; });
  res.on('end', () => {
    // Look for b_hotel_id
    const bId = html.match(/b_hotel_id:\s*'(\d+)'/);
    console.log('b_hotel_id:', bId ? bId[1] : 'not found');

    const hId = html.match(/name="hotel_id"\s+value="(\d+)"/);
    console.log('name="hotel_id":', hId ? hId[1] : 'not found');

    const jsonId = html.match(/"hotelId":\s*"?(\d+)"?/);
    console.log('hotelId (json):', jsonId ? jsonId[1] : 'not found');

    const propId = html.match(/data-hotel-id="(\d+)"/);
    console.log('data-hotel-id:', propId ? propId[1] : 'not found');

    const srBlock = html.match(/all_sr_blocks=(\d+)/);
    console.log('all_sr_blocks:', srBlock ? srBlock[1] : 'not found');

    const title = html.match(/<title>(.*?)<\/title>/);
    console.log('Title:', title ? title[1] : 'not found');
  });
});
