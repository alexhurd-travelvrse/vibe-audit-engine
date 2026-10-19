const url = 'https://www.booking.com/hotel/gb/sea-containers-london.html?lang=en-us';
try {
  const resp = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    }
  });
  console.log('Status:', resp.status);
  const text = await resp.text();
  console.log('HTML Length:', text.length);
  const matches = text.match(/https?:\/\/[a-z0-9.]*bstatic\.com\/xdata\/images\/hotel\/[^\s"'>\\]+/g) || [];
  console.log('Found matches:', matches.length);
  if (matches.length > 0) {
    console.log('First 5 unique:');
    const seen = new Set();
    for (const m of matches) {
      const clean = m.replace(/\\u002F/g, '/').split('?')[0];
      if (!seen.has(clean) && clean.endsWith('.jpg')) {
        seen.add(clean);
        console.log(clean);
        if (seen.size >= 5) break;
      }
    }
  }
} catch (e) {
  console.error('Fetch error:', e.message);
}
