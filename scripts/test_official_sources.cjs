require('dotenv').config();
const key = process.env.VITE_SERPER_API_KEY;

async function check() {
  const queries = [
    'site:editionhotels.com "miami beach"',
    'site:editionhotels.com "miami beach" pool OR spa OR basement OR room OR suite OR matador',
    'site:tripadvisor.com "The Miami Beach EDITION" hotel photos',
    'site:marriott.com "The Miami Beach EDITION"'
  ];

  for (const q of queries) {
    const res = await fetch('https://google.serper.dev/images', {
      method: 'POST',
      headers: { 'X-API-KEY': key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q, num: 6 })
    });
    const d = await res.json();
    console.log('\nQUERY:', q, 'RESULTS:', d.images?.length || 0);
    (d.images || []).forEach(img => {
      console.log('  -', img.title, '-->', img.imageUrl?.substring(0, 80));
    });
  }
}
check();
