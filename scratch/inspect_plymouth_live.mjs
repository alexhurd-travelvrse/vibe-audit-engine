import { fetchBookingPhotos } from '../src/services/serperService.mjs';

async function inspect() {
  const result = await fetchBookingPhotos('The Plymouth Hotel', 'Miami Beach', 'South Beach');
  console.log('Is listed:', result.isListed);
  console.log('Listing status:', result.listingStatus);
  console.log('Live photos count:', result.photos?.length);
  result.photos?.forEach((p, i) => {
    console.log(`[#${i + 1}] Slot: ${p.slot} | Title: "${p.title}"`);
    console.log(`    URL: ${p.imageUrl}`);
  });
}

inspect().catch(console.error);
