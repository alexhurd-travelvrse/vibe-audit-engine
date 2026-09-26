require('dotenv').config();
const key = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

async function run() {
  const res = await fetch('https://google.serper.dev/search', {
    method: 'POST',
    headers: { 'X-API-KEY': key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: 'site:booking.com/hotel/ "Sea Containers London"', num: 3 })
  });
  const data = await res.json();
  (data.organic || []).forEach(o => {
    console.log('Title:', o.title);
    console.log('Link:', o.link);
  });
}

run();
