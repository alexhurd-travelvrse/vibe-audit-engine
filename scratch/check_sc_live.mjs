import { fetchBookingPhotosForHotel } from '../api/master-vibe-audit.js';

async function checkPhotos() {
  const photos = await fetchBookingPhotosForHotel('Sea Containers London', 'London', 'South Bank');
  console.log('Top 6 Live Booking.com Photos:');
  photos.slice(0, 6).forEach((p, i) => {
    console.log(`Live Photo #${i + 1}: [Slot ${p.slot}] Title: "${p.title}" URL: ${p.imageUrl}`);
  });
}

checkPhotos();
