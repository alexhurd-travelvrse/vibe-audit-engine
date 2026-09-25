import dotenv from 'dotenv';
dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;
const officialDomain = 'theplymouth.com';

async function test() {
  const withMenu = `site:${officialDomain} (bath OR shower OR tub OR bathroom) -menu`;
  const withoutMenu = `site:${officialDomain} (bath OR shower OR tub OR bathroom)`;

  const res1 = await fetch('https://google.serper.dev/images', {
    method: 'POST',
    headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: withMenu, num: 10 })
  }).then(r => r.json());

  const res2 = await fetch('https://google.serper.dev/images', {
    method: 'POST',
    headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: withoutMenu, num: 10 })
  }).then(r => r.json());

  console.log('With -menu count:', (res1.images || []).length);
  console.log('Without -menu count:', (res2.images || []).length);
  console.log('Without -menu results:');
  (res2.images || []).forEach(img => console.log(' - ', img.title, '->', img.imageUrl));
}

test().catch(console.error);
