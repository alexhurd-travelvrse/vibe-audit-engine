import { lookupHotelCandidates } from '../api/master-vibe-audit.js';

async function test() {
  console.log('\n=== TEST 5: Searching "Four Seasons" in Miami (ambiguity check) ===');
  const res = await lookupHotelCandidates('Four Seasons', 'Miami', '');
  console.log('Status:', res.status);
  console.log('Requires Clarification:', res.requiresClarification);
  console.log('Candidates count:', res.candidates?.length);
  for (const c of (res.candidates || [])) {
    console.log(`- [Score: ${c.score}] ${c.title} => ${c.url}`);
  }
}
test();
