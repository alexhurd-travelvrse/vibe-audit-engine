import * as dotenv from 'dotenv';
import { resolveAuditPhotos } from '../api/master-vibe-audit.js';

dotenv.config();

async function run() {
  const targetSlots = [
    { slot: 1, category: "HERO_CULTURAL_MAGNET", photo_subject: "Iconic Art Deco Courtyard Pool & Sanctuary Loungers with distinctive ambient lighting" },
    { slot: 2, category: "EXTERIOR_LANDMARK", photo_subject: "Historic landmark architectural facade and street presence of Plymouth" },
    { slot: 3, category: "SIGNATURE_SUITE_BEDROOM", photo_subject: "Most stylish signature king suite with bespoke materials and warm natural light" },
    { slot: 4, category: "SOCIAL_FB_ROOFTOP", photo_subject: "Blue Ribbon Sushi Bar & Grill" },
    { slot: 5, category: "SECONDARY_ROOM_BATHROOM", photo_subject: "Luxury bathroom with freestanding clawfoot soaking tub or rainfall shower" }
  ];

  const result = await resolveAuditPhotos('The Plymouth Hotel', 'Miami Beach', 'South Beach', targetSlots);
  console.log('Resulting slots:');
  result.optimal_5_photo_sequence?.forEach(s => {
    console.log(`Slot #${s.slot} [${s.category}] (${s.action}):`);
    console.log(`  Subject: ${s.photo_subject}`);
    console.log(`  URL: ${s.photo_url}`);
    console.log(`  Was Slot: ${s.current_slot}`);
  });
}

run().catch(console.error);
