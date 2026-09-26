import { fetchBookingPhotosForHotel } from '../api/master-vibe-audit.js';

async function test() {
  console.log('Testing scraping on real Edition URL: https://www.booking.com/hotel/us/twoninezeroone-collinsave.html');
  const photos = await fetchBookingPhotosForHotel(
    'The Miami Beach EDITION',
    'Miami',
    'Miami Beach',
    'https://www.booking.com/hotel/us/twoninezeroone-collinsave.html'
  );
  console.log('Photos scraped:', photos.length);
  for (const p of photos.slice(0, 5)) {
    console.log('-', p.title, p.imageUrl);
  }
}
test();
