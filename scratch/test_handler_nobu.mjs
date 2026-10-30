import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });

import handler from '../api/master-vibe-audit.js';

console.log('Invoking FULL master-vibe-audit for Nobu Hotel Barcelona...');

const req = {
  method: 'POST',
  body: {
    hotelName: 'Nobu Hotel',
    city: 'Barcelona',
    fresh: true,
    manifestOnly: false
  },
  query: {},
  headers: {}
};

const res = {
  statusCode: 200,
  setHeader(name, val) {},
  status(code) {
    this.statusCode = code;
    return this;
  },
  json(data) {
    console.log(`[Response ${this.statusCode}]:`, JSON.stringify(data).slice(0, 500));
  }
};

try {
  await handler(req, res);
} catch (e) {
  console.error('HANDLER THREW DIRECT ERROR:', e);
}
