import { fetchBookingPhotosForHotel, fetchAmenityPhotosForHotel, resolveAuditPhotos } from '../api/master-vibe-audit.js';

async function test() {
  console.log('--- Testing Plymouth Resolution with Asset-First Engine ---');
  const hotelName = 'The Plymouth South Beach';
  const city = 'Miami';
  const neighborhood = 'South Beach';
  const bookingUrl = 'https://www.booking.com/hotel/us/the-plymouth-miami-beach.html';

  const res = await resolveAuditPhotos(hotelName, city, neighborhood, null, bookingUrl);
  console.log('is_listed_on_booking:', res.is_listed_on_booking);
  console.log('listing_status:', res.listing_status);
  console.log('total live photos scraped:', res.live_photos?.length);
  console.log('\n--- 5-SLOT RESOLVED SEQUENCE ---');
  for (const s of (res.optimal_5_photo_sequence || [])) {
    console.log(`Slot #${s.slot} [${s.category}] (${s.action}):`);
    console.log(`  Subject: ${s.photo_subject}`);
    console.log(`  Action Label: ${s.action_label}`);
    console.log(`  URL: ${s.photo_url}`);
    console.log(`  Trigger: ${s.trigger || 'N/A'}`);
    console.log(`  Bullets: ${JSON.stringify(s.bullet_points)}`);
    console.log('-------------------------------------------');
  }
}

test();
