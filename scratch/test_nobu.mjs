import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });

import { fetchVenueCorpus } from '../src/services/serperService.mjs';

console.log('Testing fetchVenueCorpus for "Nobu Hotel" in "Barcelona"...');
try {
  const result = await fetchVenueCorpus('Nobu Hotel', 'Barcelona', '');
  console.log('fetchVenueCorpus SUCCESS: verifiedCity =', result.verifiedCity, 'length =', result.rawCorpus?.length);
} catch (e) {
  console.error('fetchVenueCorpus FAILED:', e);
}
