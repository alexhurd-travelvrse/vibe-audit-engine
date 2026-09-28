import { fetchAmenityPhotosForHotel } from '../api/master-vibe-audit.js';

async function inspectPlymouth() {
  const amenity = await fetchAmenityPhotosForHotel('The Plymouth Hotel', 'Miami Beach', 'South Beach');
  console.log(`Found ${amenity.length} amenity photos:`);
  amenity.forEach((a, i) => {
    console.log(`#${i + 1}: [${a.detectedCategory}] "${a.title}" -> ${a.imageUrl}`);
  });
}

inspectPlymouth();
