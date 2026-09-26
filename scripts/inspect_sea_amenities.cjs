require('dotenv').config();

async function inspect() {
  const { fetchAmenityPhotosForHotel } = await import('../api/master-vibe-audit.js');
  const photos = await fetchAmenityPhotosForHotel('Sea Containers London', 'London', 'South Bank');
  console.log(`Total amenity photos fetched: ${photos.length}`);
  photos.forEach((p, i) => {
    console.log(`[${i+1}] [${p.detectedCategory}] ${p.title}`);
    console.log(`     URL: ${p.imageUrl}`);
    console.log(`     Link: ${p.sourceUrl}\n`);
  });
}

inspect();
