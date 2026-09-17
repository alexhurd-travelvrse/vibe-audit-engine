import express from 'express';
import auditHandler from './api/audit.js';
import auditHotelHandler from './api/audit-hotel.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

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

import masterVibeAuditHandler from './api/master-vibe-audit.js';
app.all('/api/master-vibe-audit', async (req, res) => {
    await masterVibeAuditHandler(req, res);
});

app.post('/api/audit-hotel', async (req, res) => {
    await auditHotelHandler(req, res);
});

app.listen(3002, () => {
    console.log('Local Vercel API Emulator running on http://localhost:3002');
});
