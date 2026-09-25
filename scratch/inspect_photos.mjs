import { fetchBookingPhotosForHotel, fetchAmenityPhotosForHotel } from '../api/master-vibe-audit.js';

async function main() {
  const hotelName = 'plymouth';
  const city = 'miami';
  const neighborhood = 'south beach';

  console.log('Fetching live and amenity photos...');
  const [live, amenity] = await Promise.all([
    fetchBookingPhotosForHotel(hotelName, city, neighborhood),
    fetchAmenityPhotosForHotel(hotelName, city, neighborhood)
  ]);

  console.log('\n--- LIVE BOOKING PHOTOS (' + live.length + ') ---');
  live.forEach((p, idx) => {
    console.log(`[#${idx + 1}] Title: "${p.title}", URL: ${p.imageUrl}`);
  });

  console.log('\n--- AMENITY PHOTOS (' + amenity.length + ') ---');
  amenity.forEach((a, idx) => {
    console.log(`[#${idx + 1}] [${a.detectedCategory}] Title: "${a.title}", URL: ${a.imageUrl}`);
  });
}

main().catch(console.error);
