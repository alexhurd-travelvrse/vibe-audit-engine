import express from 'express';
import auditHandler from './api/audit.js';
import hotelAuditHandler from './api/hotel-audit.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Vibe Audit Engine API is running. The endpoint is at POST /api/audit');
});

app.get('/api/audit', async (req, res) => {
    await auditHandler(req, res);
});

app.post('/api/hotel-audit', async (req, res) => {
    await hotelAuditHandler(req, res);
});

app.listen(3001, () => {
    console.log('Local Vercel API Emulator running on http://localhost:3001');
});
