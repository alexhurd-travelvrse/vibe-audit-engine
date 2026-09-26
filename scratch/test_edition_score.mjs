import { scoreBookingCandidate, getDistinctiveTokens } from '../api/master-vibe-audit.js';

const hotelName = 'The Edition Miami Beach';
const city = 'Miami';
const neighborhood = 'Miami Beach';
const brandTokens = getDistinctiveTokens(hotelName);

console.log('Brand tokens:', brandTokens);

const item = {
  link: 'https://www.booking.com/hotel/us/twoninezeroone-collinsave.html',
  title: 'The Miami Beach EDITION, Miami Beach (updated prices 2026)',
  snippet: 'Featuring 2 ocean-facing pools, a wellness spa, and luxury dining...'
};

const score = scoreBookingCandidate(item, hotelName, city, neighborhood, brandTokens);
console.log('Score:', score);
