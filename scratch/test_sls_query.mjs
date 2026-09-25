import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const apiKey = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;
  const queries = [
    'site:booking.com/hotel/ "SLS South Beach"',
    'site:booking.com/hotel/ "SLS" "South Beach"',
    'site:booking.com/hotel/ SLS South Beach Miami',
    'site:booking.com/hotel/ "SLS Hotel South Beach"'
  ];
  for (const q of queries) {
    const res = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: { 'X-API-KEY': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q, num: 5 })
    });
    const data = await res.json();
    console.log('Query:', q);
    data.organic?.forEach(o => {
      console.log('  ', o.title, '->', o.link);
    });
  }
}

main().catch(console.error);
