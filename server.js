import express from 'express';
import handler from './api/audit.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/audit', async (req, res) => {
    // Vercel serverless functions have a req, res signature just like Express
    await handler(req, res);
});

app.listen(3001, () => {
    console.log('Local Vercel API Emulator running on http://localhost:3001');
});
