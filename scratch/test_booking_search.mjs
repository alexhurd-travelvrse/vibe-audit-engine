async function test() {
  const query = 'The Plymouth Miami Beach';
  const url = `https://www.booking.com/searchresults.en-gb.html?ss=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  console.log('Status:', res.status);
  const text = await res.text();
  const hotelMatches = [...text.matchAll(/href="([^"]*\/hotel\/[a-z]{2}\/[^"]+\.html[^"]*)"/g)];
  console.log('Found hotel matches:', hotelMatches.length);
  for (const m of hotelMatches.slice(0, 5)) {
    console.log('Link:', m[1].split('?')[0]);
  }
}
test();
