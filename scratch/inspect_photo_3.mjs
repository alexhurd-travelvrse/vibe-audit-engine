import { fetchBookingPhotosForHotel } from '../api/master-vibe-audit.js';

async function run() {
  const photos = await fetchBookingPhotosForHotel('The Plymouth Hotel', 'Miami Beach', 'South Beach');
  photos.forEach((p, i) => {
    console.log(`[Photo #${i + 1}] Title: "${p.title}" | URL: ${p.imageUrl}`);
  });
}

run().catch(console.error);
