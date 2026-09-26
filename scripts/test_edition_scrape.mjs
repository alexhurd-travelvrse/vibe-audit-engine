import { fetchBookingPhotosForHotel } from '../api/master-vibe-audit.js';

async function main() {
  console.log('Testing with twoninezeroone-collinsave.html...');
  const photos = await fetchBookingPhotosForHotel(
    'The Miami Beach EDITION',
    'Miami Beach',
    'South Beach',
    'https://www.booking.com/hotel/us/twoninezeroone-collinsave.html'
  );
  console.log('Fetched photos count:', photos.length);
  if (photos.length > 0) {
    console.log('First photo:', photos[0]);
  }
}

main().catch(console.error);
