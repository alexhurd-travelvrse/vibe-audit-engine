import { resolveAuditPhotosHandler } from './master-vibe-audit.js';

export default async function handler(req, res) {
  return await resolveAuditPhotosHandler(req, res);
}
