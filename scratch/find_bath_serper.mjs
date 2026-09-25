import dotenv from 'dotenv';
dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

async function testSerper() {
  const queries = [
    'site:theplymouth.com bath',
    'site:theplymouth.com tub',
    'site:theplymouth.com bathroom',
    'site:theplymouth.com shower',
    '"The Plymouth" "South Beach" bathroom tub',
    'site:tripadvisor.com "The Plymouth South Beach" bathroom'
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
      console.log(`[#${i + 1}] Title: "${img.title}", URL: ${img.imageUrl}`);
    });
  }
}

testSerper().catch(console.error);
