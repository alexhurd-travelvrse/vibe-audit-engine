import dotenv from 'dotenv';
dotenv.config();
import { fetchAmenityPhotosForHotel } from '../api/master-vibe-audit.js';

async function test() {
  const photos = await fetchAmenityPhotosForHotel('plymouth', 'miami', 'south beach');
  console.log('Amenity photos count:', photos.length);
  photos.forEach((p, i) => {
    console.log(`[#${i+1}] [${p.detectedCategory}] "${p.title}" -> ${p.imageUrl}`);
  });
}

test().catch(console.error);
