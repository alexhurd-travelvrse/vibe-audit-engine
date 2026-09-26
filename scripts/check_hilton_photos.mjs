import { fetchBookingPhotosForHotel } from '../api/master-vibe-audit.js';

async function main() {
  const url = 'https://www.booking.com/hotel/gb/hilton-london-kensington.html';
  console.log('Fetching live Booking photos for Hilton Kensington...');
  const photos = await fetchBookingPhotosForHotel('Hilton London Kensington', 'London', 'Kensington', url);
  console.log(`Extracted ${photos.length} photos:`);
  photos.forEach((p, idx) => {
    console.log(` [${idx + 1}] ${p.title} -> ${p.imageUrl.substring(0, 80)}...`);
  });
}

main().catch(console.error);
