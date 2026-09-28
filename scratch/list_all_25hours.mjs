import { fetchBookingPhotosForHotel } from '../api/master-vibe-audit.js';

async function listAll25Hours() {
  const photos = await fetchBookingPhotosForHotel('25hours Hotel Indre By', 'Copenhagen');
  console.log(`Found ${photos.length} photos:`);
  photos.forEach((p, i) => {
    console.log(`Photo #${i + 1}: [Slot ${p.slot}] "${p.title}" -> ${p.imageUrl}`);
  });
}

listAll25Hours();
