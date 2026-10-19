import * as dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;
console.log('API Key present:', Boolean(apiKey));

const query = 'site:booking.com "Sea Containers London" hotel';
const res = await fetch('https://google.serper.dev/images', {
  method: 'POST',
  headers: {
    'X-API-KEY': apiKey,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ q: query, num: 20 })
});

console.log('Status:', res.status);
const data = await res.json();
console.log('Images returned:', data.images?.length || 0);
if (data.images && data.images.length > 0) {
  data.images.slice(0, 5).forEach((img, i) => {
    console.log(`[${i+1}] Title: ${img.title}`);
    console.log(`     Image URL: ${img.imageUrl}`);
    console.log(`     Source: ${img.link}`);
  });
}
