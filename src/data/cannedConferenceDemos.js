import benchmarkVault from '../../api/benchmarkData.json';

const rawSeaContainers = benchmarkVault['sea-containers-london'] || {};

export const SEA_CONTAINERS_CANNED_DEMO = {
  ...rawSeaContainers,
  venue_id: 'sea_containers_london_uk',
  venue_name: 'Sea Containers London',
  location: 'South Bank, London',
  vibe_signature: {
    ...(rawSeaContainers.vibe_signature || {}),
    energy_score: 78,
    social_pacing: 'Vibrant & Cosmopolitan',
    headline: 'Riverside Glamour with a Nautical Edge: A South Bank Social Hub',
    hyper_local_proximity: {
      ...(rawSeaContainers.vibe_signature?.hyper_local_proximity || {}),
      key_anchors: [
        'Tate Modern (4.7★ · 4m walk)',
        'Borough Market (4.7★ · 6m walk)',
        'Shakespeare\'s Globe (4.7★ · 5m walk)',
        'Oxo Tower Wharf (4.6★ · 2m walk)'
      ],
      insider_lore: 'Nestled directly on the South Bank riverwalk between Tate Modern and Oxo Tower, Sea Containers London is a cultural magnet in its own right—drawing Londoners to Lyaness and 12th Knot while putting verified 4.6★+ South Bank spots within a 2 to 6 minute walk.'
    },
    host_vibe: {
      host_style_score: 94,
      host_archetype: 'Storytelling Mixologists & South Bank Scene Insiders',
      warmth_verdict: 'Zero Snobbery — Instant Regulars',
      service_pacing: 'Unhurried Banter & Intuitive Craft',
      team_aesthetic: 'Bespoke Maritime Tailoring & Lab-Craft Mixology Aprons',
      signature_team_roles: ['Lyaness Mixologist', '12th Knot Selector', 'Culture Concierge'],
      staff_icebreaker_prompt: 'Ask the Lyaness bar team which off-menu botanical ingredient they fermented in-house this week.'
    },
    temporal_dynamics: {
      ...(rawSeaContainers.vibe_signature?.temporal_dynamics || {}),
      best_time_to_visit: '5:00 PM for Golden-Hour cocktails at Lyaness; 8:30 PM for peak Thames skyline buzz at 12th Knot.',
      content_readiness: {
        aesthetic_subculture: 'Warm Riverside Glamour',
        flattery_note: 'Warm 2700K table lamps & Thames twilight reflections—zero harsh downlight glare',
        score: 94,
        top_creator_spot: '12th Knot Glass Corner Banquette at Sunset overlooking St Paul\'s',
        verdict: 'Warm, Flattering Evening Light • Zero Harsh Glare'
      },
      diurnal_rhythm: {
        working: {
          window: '9:00 AM – 3:30 PM',
          focus: 'Bright riverside daylight, calm coffee atmosphere & comfy tables for getting work done.',
          score: 89
        },
        chilling: {
          window: '4:00 PM – 7:00 PM',
          focus: 'Golden-hour sunset over the Thames: warm evening light & relaxed pre-dinner drinks.',
          score: 96
        },
        playing: {
          window: '7:30 PM – Late',
          focus: 'Candlelit evening buzz, 12th Knot rooftop views & a lively cocktail crowd.',
          score: 98
        }
      },
      peak_atmospheric_window: 'Evening Cocktail Hour & Nightlife'
    }
  },
  ota_conversion_audit: {
    ...(rawSeaContainers.ota_conversion_audit || {}),
    before_merchandising_score: 48,
    after_merchandising_score: 94,
    projected_conversion_uplift: '+21.0%',
    photos_status: 'RESOLVED',
    vibe_grading_rubric: {
      destination_vibe_title: 'South Bank, London',
      destination_vibe_pillars: 'Thames Rooftop Bars • Craft Mixology • Cultural Riverwalk',
      verified_reality_score: 92,
      verified_reality_label: 'On-Property Match to Destination Vibe',
      current_merchandising_score: 48,
      optimized_merchandising_score: 94,
      vibe_gap_points: -44,
      vibe_gap_archetype: 'HIGH VIBE GAP — UNDERSOLD ICON',
      vibe_gap_summary: 'Sea Containers delivers a 92/100 on-property match to the South Bank Vibe Signature (12th Knot rooftop, award-winning Lyaness bar, Thames views), but its live Booking.com Top 5 scores just 48/100 due to 3 repetitive blue-couch living room shots and 0 guest bathroom photos across all 55 images.',
      raw_slot_total: 58,
      repetition_penalty: -10,
      repetition_penalty_reason: '3 nearly identical blue-couch suite living room shots occupy Live Slots #2, #3, and #5',
      slot_scorecard: [
        {
          slot: 1,
          formula_name: 'Slot #1 — Signature Vibe Hero',
          live_score: 12,
          max_score: 20,
          status: 'MISSED HOOK',
          live_what_is_there: 'Wide daytime exterior of the building from across the Thames (Live #1)',
          optimal_fix: 'Promote 12th Knot Rooftop Bar at Night from Live #24 to Slot #1'
        },
        {
          slot: 2,
          formula_name: 'Slot #2 — The Bookable Room',
          live_score: 12,
          max_score: 20,
          status: 'BURIED AT #6',
          live_what_is_there: 'Suite living area with a blue sofa—no bed visible (Live #2)',
          optimal_fix: 'Promote King Bedroom with Floor-to-Ceiling Window from Live #6 to Slot #2'
        },
        {
          slot: 3,
          formula_name: 'Slot #3 — Bathroom & Comfort Proof',
          live_score: 4,
          max_score: 20,
          status: '0/55 BATHROOM GAP',
          live_what_is_there: 'Duplicate angle of the same blue-couch living room (Live #3); 0 guest bathrooms in all 55 photos',
          optimal_fix: 'Bridge with Private River-View Balcony (Live #22) + Upload Master Bathroom Shot'
        },
        {
          slot: 4,
          formula_name: 'Slot #4 — Day-to-Night Social & Dining',
          live_score: 16,
          max_score: 20,
          status: 'BURIED AT #19–#26',
          live_what_is_there: 'Standard bedroom shot (Live #4) while Lyaness & Restaurant sit at #19–#26',
          optimal_fix: 'Promote Lyaness Craft Cocktail Bar from Live #26 into Slot #4'
        },
        {
          slot: 5,
          formula_name: 'Slot #5 — Neighbourhood & Riverfront Gateway',
          live_score: 14,
          max_score: 20,
          status: 'REPETITIVE SLOT #5',
          live_what_is_there: 'Third blue-couch living room photo in the Top 5 (Live #5)',
          optimal_fix: 'Reposition South Bank Thames Riverfront Exterior from Live #1 into Slot #5'
        }
      ],
      auto_vibe_insights: {
        badge: 'High Vibe Gap Opportunity (-44 pts)',
        headline_stat: 'Sea Containers London delivers a 92/100 on-property match to the South Bank Vibe Signature, but its Booking.com Top 5 gallery scores just 48/100—burying 12th Knot Rooftop Bar at #24, Lyaness at #26, and showing 0 bathroom photos out of 55.',
        gm_outreach_hook: 'Your guests rate Sea Containers 92/100 for South Bank rooftop & riverside energy, yet 3 of your first 5 Booking.com thumbnails show the same blue living-room sofa while 12th Knot is buried at #24 and zero guest bathrooms appear in all 55 photos.',
        linkedin_post_hook: 'We audited Sea Containers London against the South Bank Destination Vibe Signature. On-property reality: 92/100. Live Booking.com Top 5 gallery: 48/100 (-44 pt Vibe Gap). Why? 3 blue-couch shots in the Top 5, 12th Knot buried at #24, and 0/55 bathroom photos.'
      }
    }
  }
};

export const CANNED_CONFERENCE_DEMOS = {
  'sea-containers-london': {
    slug: 'sea-containers-london',
    propertyName: 'Sea Containers London',
    city: 'London',
    neighborhood: 'South Bank',
    bookingUrl: 'https://www.booking.com/hotel/gb/sea-containers-london.html',
    masterAudit: SEA_CONTAINERS_CANNED_DEMO
  }
};
