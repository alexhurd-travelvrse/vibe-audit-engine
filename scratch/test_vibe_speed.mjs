import * as dotenv from 'dotenv';
dotenv.config();
import { runStructuredVibeAudit } from '../src/services/geminiService.mjs';

async function test() {
  const t0 = Date.now();
  console.log('Testing runStructuredVibeAudit for The Hoxton, Shepherd\'s Bush...');
  const res = await runStructuredVibeAudit(
    "The Hoxton, Shepherd's Bush",
    "London",
    "The Hoxton, Shepherd's Bush is a stylish boutique hotel in Shepherd's Bush, West London. Features Chet's restaurant serving Thai-Americana flavors, vintage mid-century 70s decor, vibrant lobby with local neighborhood coffee buzz.",
    [
      { slot: 1, title: 'Hotel Exterior', imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/416706915.jpg' },
      { slot: 2, title: 'Chet\'s Dining', imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/416706916.jpg' }
    ],
    [],
    "Shepherd's Bush"
  );
  console.log(`Finished in ${((Date.now() - t0)/1000).toFixed(1)}s`);
  console.log('Headline:', res.vibe_manifest?.vibe_headline);
  console.log('Is fallback:', res.vibe_manifest?.isFallback || false);
}

test();
