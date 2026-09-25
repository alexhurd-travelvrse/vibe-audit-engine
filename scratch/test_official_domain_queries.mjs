import dotenv from 'dotenv';
dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;
const officialDomain = 'theplymouth.com';

async function test() {
  const queries = {
    social: `site:${officialDomain} (restaurant OR bar OR sushi OR dining OR food OR lounge)`,
    bath: `site:${officialDomain} (bath OR shower OR tub OR bathroom)`,
    exterior: `site:${officialDomain} (facade OR exterior OR entrance OR building)`,
    suite: `site:${officialDomain} (suite OR bedroom OR king)`
  };

  for (const [cat, q] of Object.entries(queries)) {
    console.log(`\n=== Category: ${cat} | Query: ${q} ===`);
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

test().catch(console.error);
