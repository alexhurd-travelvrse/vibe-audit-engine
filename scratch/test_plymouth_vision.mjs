import { fetchBookingPhotosForHotel, fetchAmenityPhotosForHotel } from '../api/master-vibe-audit.js';
import { runMultimodalImageClassification } from '../src/services/geminiService.mjs';

async function testPlymouthVision() {
  const live = await fetchBookingPhotosForHotel('The Plymouth Hotel', 'Miami Beach', 'South Beach');
  const amenity = await fetchAmenityPhotosForHotel('The Plymouth Hotel', 'Miami Beach', 'South Beach');
  
  const candidatePool = [...live.slice(0, 10), ...amenity.slice(0, 6)];
  console.log(`Classifying ${candidatePool.length} candidates...`);
  const visualMap = await runMultimodalImageClassification(candidatePool, 'The Plymouth Hotel');
  
  candidatePool.forEach((c, i) => {
    const v = visualMap.get(c.imageUrl) || visualMap.get(c.photoId);
    console.log(`\nCandidate #${i + 1}: [${c.slot ? `Live #${c.slot}` : 'Amenity'}] "${c.title}"`);
    console.log(`  URL: ${c.imageUrl}`);
    if (v) {
      console.log(`  Vision: [${v.primary_category}] -> ${v.best_fit_slot}`);
      console.log(`  is_exterior: ${v.is_exterior} | is_dining: ${v.is_dining_or_bar}`);
      console.log(`  has_bed: ${v.has_bed} | has_bath: ${v.has_bath} | window: ${v.has_window_light}`);
      console.log(`  Desc: "${v.brief_visual_description}"`);
    } else {
      console.log('  Vision: NOT CLASSIFIED');
    }
  });
}

testPlymouthVision();
