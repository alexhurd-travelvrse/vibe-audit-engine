import { fetchBookingPhotosForHotel, fetchAmenityPhotosForHotel, resolveAuditPhotos } from '../api/master-vibe-audit.js';

async function testResolution() {
  const hotelName = 'plymouth';
  const city = 'miami';
  const neighborhood = 'south beach';

  console.log('Resolving audit photos for Plymouth South Beach...');
  const res = await resolveAuditPhotos(hotelName, city, neighborhood);

  console.log('\n=== RESOLVED SEQUENCE ===');
  res.optimal_5_photo_sequence.forEach(s => {
    console.log(`Slot #${s.slot} [${s.category}] (${s.action}):`);
    console.log(`  Subject: ${s.photo_subject}`);
    console.log(`  URL: ${s.photo_url}`);
    console.log(`  Was Slot: ${s.current_slot}`);
  });
}

testResolution().catch(console.error);
