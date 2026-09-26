import { lookupHotelCandidates, parseBookingUrl } from '../api/master-vibe-audit.js';

async function test() {
  console.log('=== TEST 1: Direct URL with query parameters ===');
  const userUrl = 'https://www.booking.com/hotel/us/twoninezeroone-collinsave.en-gb.html?aid=357028&label=bin859jc-10CAso7AFCGXR3b25pbmV6ZXJvb25lLWNvbGxpbnNhdmVIM1gDaFCIAQGYATO4ARfIAQzYAQPoAQH4AQGIAgGoAgG4ApCL3tUGwAIB0gIkMDk3ODUxNGQtNzY4ZC00Njc3LTkzM2YtYzRlYWJmYjZjNTA12AIB4AIB&sid=e6b0165d9d0b42e596d50fdf34ee196e';
  const parsed = parseBookingUrl(userUrl);
  console.log('Parsed title:', parsed.cleanTitle);
  console.log('Parsed cleanUrl:', parsed.cleanUrl);
  const lookup1 = await lookupHotelCandidates(userUrl);
  console.log('Lookup 1 status:', lookup1.status, lookup1.selected?.title, lookup1.selected?.url);

  console.log('\n=== TEST 2: Searching "The Edition Miami Beach" ===');
  const lookup2 = await lookupHotelCandidates('The Edition Miami Beach', 'Miami', 'Miami Beach');
  console.log('Lookup 2 status:', lookup2.status, lookup2.selected?.title, lookup2.selected?.url);

  console.log('\n=== TEST 3: Searching generic "Edition" in Miami (ambiguity check) ===');
  const lookup3 = await lookupHotelCandidates('Edition', 'Miami', '');
  console.log('Lookup 3 status:', lookup3.status, 'candidates count:', lookup3.candidates?.length);
  for (const c of (lookup3.candidates || [])) {
    console.log(`- [${c.score}] ${c.title} => ${c.url}`);
  }
}
test();
