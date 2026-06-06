import express from 'express';
import auditHandler from './api/audit.js';
import auditHotelHandler from './api/audit-hotel.js';
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

app.post('/api/audit', async (req, res) => {
    await auditHandler(req, res);
});

app.post('/api/audit-hotel', async (req, res) => {
    await auditHotelHandler(req, res);
});

app.listen(3001, () => {
    console.log('Local Vercel API Emulator running on http://localhost:3001');
});
