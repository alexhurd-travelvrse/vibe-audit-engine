import { lookupHotelCandidates } from '../api/master-vibe-audit.js';

async function test() {
  console.log('Testing lookup for "Edition Miami Beach"...');
  const res = await lookupHotelCandidates('Edition Miami Beach', 'Miami', 'Miami Beach');
  console.log('Result status:', res.status);
  console.log('Candidates count:', res.candidates?.length);
  for (const c of (res.candidates || [])) {
    console.log(`- [Score: ${c.score}] ${c.title} => ${c.url}`);
  }
}
test();
