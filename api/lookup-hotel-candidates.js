import { lookupHotelCandidatesHandler } from './master-vibe-audit.js';

export default async function handler(req, res) {
  return await lookupHotelCandidatesHandler(req, res);
}
