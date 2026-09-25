async function test() {
  const url = 'https://html.duckduckgo.com/html/?q=site:booking.com/hotel/+The+Plymouth+Hotel+Miami+Beach';
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
  const text = await res.text();
  const uddgMatches = [...text.matchAll(/uddg=([^&"']+)/g)];
  for (const m of uddgMatches) {
    const decoded = decodeURIComponent(m[1]);
    if (decoded.includes('booking.com/hotel/')) {
      console.log('Decoded Booking URL:', decoded);
    }
  }
}
test();
