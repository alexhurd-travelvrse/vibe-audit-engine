import { lookupHotelCandidates } from '../api/master-vibe-audit.js';

async function run() {
  console.log('=== TEST 1: The Plymouth South Beach search ===');
  const res1 = await lookupHotelCandidates('The Plymouth South Beach', 'Miami', 'South Beach');
  console.log('Test 1 Result:', res1.status, res1.selected?.url, res1.selected?.title);

  console.log('\n=== TEST 2: Direct Booking URL with query params ===');
  const directUrl = 'https://www.booking.com/hotel/us/the-plymouth-miami-beach.en-gb.html?aid=304142&label=gen173nr-10CAEoggI46AdIM1gEaFCIAQGYATO4ARfIAQzYAQPoAQH4AQGIAgGoAgG4Apfi2NUGwAIB0gIkOTA5NDg4ZWMtMzkyYi00OTM3LTllMmItZDYwNDc1ZWQ4Yzcx2AIB4AIB&sid=e6b0165d9d0b42e596d50fdf34ee196e';
  const res2 = await lookupHotelCandidates(directUrl, '', '');
  console.log('Test 2 Result:', res2.status, res2.selected?.url, res2.selected?.title);

  console.log('\n=== TEST 3: User typo "The Plymouth sotu beach" ===');
  const res3 = await lookupHotelCandidates('The Plymouth sotu beach', 'Miami', '');
  console.log('Test 3 Result:', res3.status, res3.selected?.url, res3.selected?.title);

  console.log('\n=== TEST 4: Benchmark hotel "Sea Containers London" ===');
  const res4 = await lookupHotelCandidates('Sea Containers', 'London', 'South Bank');
  console.log('Test 4 Result:', res4.status, res4.selected?.url, res4.selected?.title);

  console.log('\n=== TEST 5: Arbitrary non-benchmark hotel via Playwright fallback ===');
  const res5 = await lookupHotelCandidates('Nobu Hotel Shoreditch', 'London', 'Shoreditch');
  console.log('Test 5 Result:', res5.status, res5.selected?.url, res5.selected?.title);
}

run();
