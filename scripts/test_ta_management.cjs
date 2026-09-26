require('dotenv').config();
const key = process.env.VITE_SERPER_API_KEY;

async function checkTripAdvisorManagement() {
  const queries = [
    'site:tripadvisor.com "The Miami Beach EDITION" "Management Photos"',
    'site:tripadvisor.com "The Miami Beach EDITION" "From Management"',
    'site:tripadvisor.com inurl:LocationPhoto "The Miami Beach EDITION"',
    'site:tripadvisor.com "The Miami Beach EDITION" ("Management photo" OR "Photos by Management" OR "Management Photos")'
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
      console.log('  Title:', img.title);
      console.log('  Link:', img.link);
      console.log('  Image:', img.imageUrl?.substring(0, 90));
    });
  }
}
checkTripAdvisorManagement();
