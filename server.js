import express from 'express';
import auditHandler from './api/audit.js';
import auditHotelHandler from './api/audit-hotel.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

process.on('uncaughtException', (err) => {
    console.error('[Server Uncaught Exception]:', err.message);
});

process.on('unhandledRejection', (reason, promise) => {
    console.warn('[Server Unhandled Rejection]:', reason);
});

app.get('/', (req, res) => {
    res.send('Vibe Audit API is running. The endpoint is at POST /api/audit');
});

app.get('/api/audit', async (req, res) => {
    await auditHandler(req, res);
});

app.post('/api/audit', async (req, res) => {
    await auditHandler(req, res);
});

import hotelAuditHandler from './api/hotel-audit.js';
app.post('/api/hotel-audit', async (req, res) => {
    await hotelAuditHandler(req, res);
});

import masterVibeAuditHandler, { resolveAuditPhotosHandler, lookupHotelCandidatesHandler } from './api/master-vibe-audit.js';
app.all('/api/master-vibe-audit', async (req, res) => {
    await masterVibeAuditHandler(req, res);
});

app.all('/api/master-vibe-manifest', async (req, res) => {
    req.query.phase = '1';
    await masterVibeAuditHandler(req, res);
});

app.all('/api/lookup-hotel-candidates', async (req, res) => {
    await lookupHotelCandidatesHandler(req, res);
});

app.all('/api/resolve-audit-photos', async (req, res) => {
    await resolveAuditPhotosHandler(req, res);
});

app.get('/api/proxy-image', async (req, res) => {
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
      // WAF Circuit Breaker: If remote server blocks proxy (403/429/503), redirect directly
      return res.redirect(targetUrl);
    }
    const contentType = fetchResp.headers.get('content-type') || 'image/jpeg';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    const buffer = Buffer.from(await fetchResp.arrayBuffer());
    return res.send(buffer);
  } catch (err) {
    // Resilient fallback: redirect browser directly to target URL
    return res.redirect(targetUrl);
  }
});

app.listen(3002, () => {
    console.log('Local Vercel API Emulator running on http://localhost:3002');
});
