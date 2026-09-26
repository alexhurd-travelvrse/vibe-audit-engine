import dotenv from 'dotenv';
dotenv.config();

import { resolveAuditPhotos } from '../api/master-vibe-audit.js';

async function testEditionResolution() {
  console.log('Testing The Miami Beach EDITION photo resolution with strategy alignment...');

  const strategySlots = [
    {
      slot: 1,
      category: 'HERO_CULTURAL_MAGNET',
      photo_subject: "The Basement Club & Lounge",
      why_it_converts: "Elevates The Basement nightclub, bowling alley, and ice-skating lounge as Slot 1 hero cultural magnet to capture South Beach's #1 nightlife search demand.",
      bullet_points: [
        "Visual Upgrade: Seductive neon-lit subterranean nightlife visual replacing generic day-pool imagery",
        "Local Synergy: Positions the property as South Beach's undisputed cultural and nightlife epicenter",
        "Conversion Trigger: Captures high-ADR lifestyle travelers booking for immersive night experiences"
      ],
      psychological_conversion_trigger: "High-Energy Experiential Anchor"
    },
    {
      slot: 2,
      category: 'EXTERIOR_LANDMARK',
      photo_subject: "Iconic Oceanfront Facade",
      why_it_converts: "Anchors prime Collins Avenue beachfront location immediately after the cultural hook.",
      bullet_points: [
        "Visual Upgrade: Dramatic architectural elevation establishing geographic prestige",
        "Local Synergy: Prime Collins Ave oceanfront landmark",
        "Conversion Trigger: Orientation assurance"
      ],
      psychological_conversion_trigger: "Geographic Grounding"
    },
    {
      slot: 3,
      category: 'SIGNATURE_SUITE_BEDROOM',
      photo_subject: "Luxury Ocean View Suite",
      why_it_converts: "Proves sleep sanctuary luxury and high-spec design finish.",
      bullet_points: [
        "Visual Upgrade: Ian Schrager custom teak finishes and linen drapery",
        "Local Synergy: High-floor ocean horizon view",
        "Conversion Trigger: Private sanctuary comfort"
      ],
      psychological_conversion_trigger: "Sanctuary Reassurance"
    },
    {
      slot: 4,
      category: 'OUTDOOR_SOCIAL_POOL',
      photo_subject: "Resort Pool & Private Cabana Deck",
      why_it_converts: "Introduces the quintessential Miami Beach luxury pool lifestyle in Slot 4 without thematic duplication.",
      bullet_points: [
        "Visual Upgrade: Iconic tropical palm-fringed pool deck with custom luxury loungers",
        "Local Synergy: Essential South Beach daylight resort living",
        "Conversion Trigger: Lifestyle aspiration"
      ],
      psychological_conversion_trigger: "Daylight Luxury Immersion"
    },
    {
      slot: 5,
      category: 'SECONDARY_ROOM_BATHROOM',
      photo_subject: "Design Marble Bathroom & Soaking Tub",
      why_it_converts: "Confirms 5-star hygiene, freestanding soaking tub, and bespoke bath amenities.",
      bullet_points: [
        "Visual Upgrade: Custom white marble finishes and freestanding soaking tub",
        "Local Synergy: 5-star spa bathroom luxury",
        "Conversion Trigger: Hygiene & finish confidence"
      ],
      psychological_conversion_trigger: "Hygiene & Finish Affirmation"
    }
  ];

  const strategicShifts = [
    "Shift 1: Elevate 'The Basement' club & lounge to Slot #1 as a HERO CULTURAL MAGNET, directly addressing South Beach's #1 search demand for vibrant, unique nightlife experiences.",
    "Shift 2: Re-sequence the iconic oceanfront facade to Slot #2, immediately grounding the property's prime location and architectural grandeur after the initial cultural hook.",
    "Shift 3: Introduce a stunning resort pool shot in Slot #4 to showcase the quintessential Miami Beach luxury lifestyle, complementing the nightlife magnet without thematic duplication.",
    "Shift 4: Ensure Slot #5 features a luxurious design bathroom, confirming the high-end finish and hygiene standards expected by discerning travelers."
  ];

  const result = await resolveAuditPhotos(
    'The Miami Beach EDITION',
    'Miami Beach',
    'South Beach',
    strategySlots,
    'https://www.booking.com/hotel/us/twoninezeroone-collinsave.en-gb.html',
    strategicShifts
  );

  console.log('\n================ RESOLUTION RESULTS ================');
  console.log('Listing status:', result.listing_status);
  console.log('Photos count:', result.optimal_5_photo_sequence?.length);

  result.optimal_5_photo_sequence.forEach(s => {
    console.log(`\n--- SLOT #${s.slot}: ${s.category} ---`);
    console.log(`Subject: ${s.photo_subject}`);
    console.log(`Action: ${s.action} | Label: ${s.action_label}`);
    console.log(`Photo URL: ${s.photo_url}`);
    console.log(`Why it converts: ${s.why_it_converts}`);
  });
}

testEditionResolution().catch(console.error);
