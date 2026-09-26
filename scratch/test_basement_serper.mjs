import dotenv from 'dotenv';
dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

async function test() {
  const query = '"The Miami Beach EDITION" "Basement"';
  console.log('Querying Serper for:', query);
  const resp = await fetch('https://google.serper.dev/images', {
    method: 'POST',
    headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: `${query} (club OR lounge OR nightclub OR bowling) -wedding`, num: 10 })
  });
  const data = await resp.json();
  console.log('Response data:', Object.keys(data), data.message || '');
  console.log('Images found:', data.images?.length);
  (data.images || []).forEach(img => {
    console.log('TITLE:', img.title);
    console.log('IMG URL:', img.imageUrl);
  });
}

test();
