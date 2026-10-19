export default async function handler(req, res) {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send('Missing url parameter');
  try {
    const fetchResp = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Referer': targetUrl
      },
      signal: AbortSignal.timeout(6000)
    });
    if (!fetchResp.ok) {
      return res.redirect(targetUrl);
    }
    const contentType = fetchResp.headers.get('content-type') || 'image/jpeg';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    const buffer = Buffer.from(await fetchResp.arrayBuffer());
    return res.send(buffer);
  } catch (err) {
    return res.redirect(targetUrl);
  }
}
