import dotenv from 'dotenv';
dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;
const officialDomain = 'theplymouth.com';

async function testTub() {
  const queries = [
    `site:${officialDomain} tub`,
    `site:${officialDomain} (tub OR "soaking tub" OR "freestanding tub")`,
    `site:${officialDomain} shower`,
    `site:${officialDomain} (bathroom OR shower OR tub) -"accessible classic queen"`,
    `site:tripadvisor.com "The Plymouth South Beach" bathroom`
  ];

  for (const q of queries) {
    console.log(`\n=== Query: ${q} ===`);
    const res = await fetch('https://google.serper.dev/images', {
      method: 'POST',
      headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q, num: 10 })
    });
    const data = await res.json();
    (data.images || []).forEach((img, i) => {
      console.log(`[#${i+1}] Title: "${img.title}" | URL: ${img.imageUrl}`);
    });
  }
}

testTub().catch(console.error);
