import { fetchBookingPhotosForHotel, fetchAmenityPhotosForHotel } from '../api/master-vibe-audit.js';

async function main() {
  console.log('Fetching live booking photos for SLS South Beach...');
  const live = await fetchBookingPhotosForHotel('SLS South Beach', 'Miami', 'South Beach');
  console.log('\n--- LIVE BOOKING PHOTOS (' + live.length + ') ---');
  live.forEach((p, i) => {
    console.log(`Live #${i+1} (Slot ${p.slot}): Title: "${p.title}" | URL: ${p.imageUrl}`);
  });

  console.log('\nFetching amenity photos for SLS South Beach...');
  const amenity = await fetchAmenityPhotosForHotel('SLS South Beach', 'Miami', 'South Beach');
  console.log('\n--- AMENITY PHOTOS (' + amenity.length + ') ---');
  amenity.forEach((a, i) => {
    console.log(`Amenity #${i+1} [${a.detectedCategory}]: Title: "${a.title}" | URL: ${a.imageUrl}`);
  });
}

main().catch(console.error);
