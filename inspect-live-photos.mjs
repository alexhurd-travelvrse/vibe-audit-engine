import { fetchBookingPhotosForHotel } from './api/master-vibe-audit.js';

(async () => {
  const livePhotos = await fetchBookingPhotosForHotel('sea containers', 'London', 'South bank', 'https://www.booking.com/hotel/gb/sea-containers-london.html');
  console.log('Total live photos:', livePhotos.length);
  livePhotos.forEach((p, i) => {
    console.log(`Live #${i+1} [Slot ${p.slot}]: "${p.title}" -> ${p.imageUrl}`);
  });
})();
