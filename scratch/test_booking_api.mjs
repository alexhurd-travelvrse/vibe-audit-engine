async function test() {
  const query = 'The Plymouth South Beach';
  const url = `https://accommodations.booking.com/autocomplete.json?query=${encodeURIComponent(query)}&language=en-us&size=5`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    console.log('Status:', res.status);
    const json = await res.json();
    console.log('Results:', JSON.stringify(json, null, 2));
  } catch (err) {
    console.error('Error:', err);
  }
}
test();
