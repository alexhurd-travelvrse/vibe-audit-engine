import * as dotenv from 'dotenv';
import { runStructuredVibeAudit } from '../src/services/geminiService.mjs';
import { fetchVenueCorpus } from '../src/services/serperService.mjs';

dotenv.config();

async function run() {
  console.log('Testing Manifest Generation Speed...');
  const t0 = Date.now();
  console.log('1. Fetching Serper corpus...');
  const { rawCorpus } = await fetchVenueCorpus('The Plymouth Hotel', 'Miami Beach', 'South Beach');
  const t1 = Date.now();
  console.log(`Serper corpus fetched in ${t1 - t0}ms (Length: ${rawCorpus.length})`);

  console.log('2. Running runStructuredVibeAudit with Gemini...');
  const t2 = Date.now();
  const manifest = await runStructuredVibeAudit('The Plymouth Hotel', 'Miami Beach', rawCorpus, [], [], 'South Beach');
  const t3 = Date.now();
  console.log(`runStructuredVibeAudit completed in ${t3 - t2}ms!`);
  console.log('Headline:', manifest.vibe_signature?.headline);
  console.log('Energy Score:', manifest.vibe_signature?.energy_score);
  console.log('Slots:', manifest.ota_conversion_audit?.optimal_5_photo_sequence?.length);
}

run().catch(console.error);
