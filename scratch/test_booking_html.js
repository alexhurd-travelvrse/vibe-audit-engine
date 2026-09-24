async function testFetch() {
  const url = 'https://www.booking.com/hotel/gb/mandarin-oriental-hyde-park-london.html';
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9'
    }
  });
  const html = await res.text();
  console.log('Status:', res.status, 'HTML length:', html.length);
  const matches = [...html.matchAll(/https?:\/\/[a-z0-9.]*bstatic\.com\/xdata\/images\/hotel\/[a-zA-Z0-9_\/.]*(\d+)\.jpg[^\s"']*/g)];
  console.log('Found bstatic photos:', matches.length);
  const unique = [...new Set(matches.map(m => m[0].replace(/\/max\d+x\d+\//, '/max1024x768/')))];
  console.log('Unique photos:', unique.length);
  unique.slice(0, 5).forEach((u, i) => console.log('Photo #' + (i+1) + ':', u));
}
testFetch().catch(console.error);
