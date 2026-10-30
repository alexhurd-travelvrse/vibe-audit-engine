import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });

import { resolveAuditPhotos } from '../api/master-vibe-audit.js';

console.log('Testing resolveAuditPhotos with EMPTY photo pools (simulating serverless with 0 photos)...');
try {
  const result = await resolveAuditPhotos('Nobu Hotel', 'Barcelona', '', null, null, null, [], []);
  console.log('SUCCESS! Results returned:');
  console.log('is_listed_on_booking:', result.is_listed_on_booking);
  console.log('listing_status:', result.listing_status);
  console.log('optimal_5_photo_sequence length:', result.optimal_5_photo_sequence?.length);
  console.log('Slots:');
  for (const s of result.optimal_5_photo_sequence || []) {
    console.log(`  Slot ${s.slot}: ${s.photo_subject} | Image: ${s.photo_url || s.image_url}`);
  }
} catch (e) {
  console.error('CRASHED WITH ERROR:', e);
}
