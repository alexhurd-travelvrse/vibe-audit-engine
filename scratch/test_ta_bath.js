import * as dotenv from 'dotenv';
dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

async function checkTripAdvisorBathrooms() {
  const q = `"Sea Containers London" (bathroom OR "marble bathroom" OR shower OR "walk-in shower" OR tub) (site:tripadvisor.com OR site:seacontainerslondon.com) -bedroom -bed`;
  const res = await fetch('https://google.serper.dev/images', {
    method: 'POST',
    headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q, num: 10 })
  }).then(r => r.json());

  console.log('=== TRIPADVISOR & DIRECT BATHROOMS ===');
  (res.images || []).forEach((img, i) => {
    console.log(`\n#${i + 1}: Title: "${img.title}"`);
    console.log(`  URL: ${img.imageUrl}`);
    console.log(`  Link: ${img.link}`);
  });
}

checkTripAdvisorBathrooms().catch(console.error);
