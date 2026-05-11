const API_KEY = "a23fd96c5cb1aace5f985e1d32f27492c241b349";
const HEADERS = { 'X-API-KEY': API_KEY, 'Content-Type': 'application/json' };

async function testPlaces(city) {
  console.log(`Testing Serper Places for ${city}...`);
  const res = await fetch(`https://google.serper.dev/places`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ q: `top trending restaurants in ${city}`, num: 5 })
  }).then(r => r.json());

  console.log(JSON.stringify(res, null, 2));
}

testPlaces('Miami');
