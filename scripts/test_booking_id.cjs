require('dotenv').config();
const key = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

async function testSerperWithId() {
  // Let's test with Serper search for Sea Containers London on booking.com
  const res = await fetch('https://google.serper.dev/search', {
    method: 'POST',
    headers: { 'X-API-KEY': key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: 'site:booking.com/hotel/ "Sea Containers London" London', num: 3 })
  });
  const data = await res.json();
  console.log('Result:');
  (data.organic || []).forEach(o => {
    console.log(o.title, o.link);
  });
}

testSerperWithId();
