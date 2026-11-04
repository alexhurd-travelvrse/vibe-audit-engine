import benchmarkVault from './benchmarkData.json';

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
    local_vibe_synergy_context: 'South Bank is London’s riverfront cultural hub, where high-intent traveller searches center on Thames-view rooftop bars, world-class craft cocktail bars, and walkable access to Tate Modern and Borough Market.',
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
      vibe_gap_summary: 'Booking.com Top 5 scores just 48/100 (-44 pt gap vs. reality): 3 repetitive blue-couch living room photos occupy Slots #2, #3 & #5 (-10 pt penalty), 0 guest bathrooms appear in all 55 photos, and 12th Knot & Lyaness are buried at #24–#26.',
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
          formula_name: 'Slot #3 — 2nd Room / Bath Compliance Slot',
          live_score: 4,
          max_score: 20,
          status: '0/55 BATHROOM GAP',
          live_what_is_there: 'Duplicate angle of the same blue-couch living room (Live #3); 0 guest bathrooms in all 55 photos',
          optimal_fix: 'Pair 2nd Distinct Deluxe Suite Bedroom & Lounge (Live #14) + Upload Master Bathroom Shot'
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

export const SKOL_APARTMENTS_MARBELLA_DEMO = {
  venue_id: 'skol_apartments_marbella_es',
  venue_name: 'Skol Apartments Marbella',
  location: 'Paseo Marítimo Beachfront, Marbella',
  vibe_signature: {
    energy_score: 76,
    social_pacing: 'Sun-Drenched Beachfront & Paseo Buzz',
    headline: 'Iconic Mid-Century Beachfront Living on Marbella’s Golden Paseo Marítimo',
    acoustic_dna: {
      soundscape_genre: 'Mediterranean Balearic Chill & Coastal Café Acoustic',
      anchor_artists: ['Gipsy Kings', 'Café del Mar', 'Guitarra Azul'],
      spotify_query: 'Mediterranean Chillout Marbella Beachfront',
      sound_texture: 'Mediterranean shoreline waves, poolside daytime buzz & relaxed terrace conversation',
      conversation_clarity_score: 84,
      conversation_verdict: 'Easy Terrace & Balcony Chat',
      decibel_level: '66 dB',
      sleep_sanctuary_verdict: 'Sleep Sanctuary: Private Sea-Breeze Apartments & Restful Nighttime Quiet'
    },
    crowd_archetype: {
      primary: 'Returning European Sun-Seekers, Couples & Long-Stay Digital Nomads',
      social_density: 'Lively Around the 3 Beachfront Pools & Paseo Cafés',
      dress_code: 'Mediterranean Linen & Resort Casual',
      energy_verdict: 'Sunny Poolside Days & Golden-Hour Paseo Strolls',
      local_ratio: 58,
      tourist_ratio: 42,
      tourist_trap_verdict: 'Authentic Paseo Marítimo Institution',
      trip_occasions: ['Beachfront Escape', 'Couples Sun Break', 'Work-from-Sea-View Stay']
    },
    lighting_and_sensory: {
      atmosphere: 'Sun-Drenched Mediterranean Daylight & Warm Coastal Sunset Glow',
      sensory_intensity: 'Bright & Airy',
      lighting_temperature: 'Golden-Hour Mediterranean Sun & Warm 2700K Balcony Evenings'
    },
    hyper_local_proximity: {
      key_anchors: [
        'Soleo Marbella Beach Club (4.5★ · 2m walk)',
        'Chiringuito La Pesquera (4.4★ · 3m walk)',
        'Marbella Old Town / Casco Antiguo (4.7★ · 6m walk)',
        'Parque de la Constitución (4.6★ · 2m walk)'
      ],
      insider_lore: 'Set directly on Marbella’s pedestrian Paseo Marítimo with private garden gates opening onto Venus and Bajadilla beaches, Skol puts verified 4.5★+ beachfront chiringuitos and the historic orange-blossom squares of Marbella Old Town within a 2 to 6 minute flat walk.'
    },
    qualification_test: {
      you_will_love_if: 'You want unbeatable direct beachfront access on Marbella’s Paseo Marítimo, three expansive garden swimming pools, private sea-view balconies, and a 5-minute walk to Old Town tapas.',
      skip_if: 'You are looking for a secluded mountain golf resort far from the beach promenade or a formal bellhop-style corporate chain hotel.'
    },
    ai_search_geo: {
      traveler_prompts: [
        'Best beachfront apartments in Marbella directly on the Paseo Marítimo within walking distance of Old Town',
        'Where to stay in Marbella with private sea-view balconies, large outdoor pools, and authentic chiringuitos outside the door',
        'Recommended Marbella beachfront base for couples and families wanting walkable beach club and tapas access'
      ],
      verified_entity_summary: 'Skol Apartments Marbella is a landmark beachfront apartment resort directly on Marbella’s Paseo Marítimo, featuring three garden swimming pools, private sea-view balconies, and direct gated access to the beach and Old Town.'
    },
    authenticity_and_materials: {
      authenticity_score: 88,
      material_palette: 'Iconic 1960s Marbella Modernist Brise-Soleil Terraces, Andalusian Garden Lawns & Crisp Coastal Interiors',
      material_verdict: 'Landmark Marbella Mid-Century Coastal Architecture'
    },
    host_vibe: {
      host_style_score: 90,
      host_archetype: 'Warm Multilingual Marbella Hosts & Poolside Regulars',
      warmth_verdict: 'Personalised Coastal Welcome — High Repeat-Guest Loyalty',
      service_pacing: 'Relaxed, Responsive & Local-First',
      team_aesthetic: 'Crisp Mediterranean Resort Casual',
      signature_team_roles: ['Guest Host Team', 'Poolside Garden Bar Host', 'Local Concierge'],
      staff_icebreaker_prompt: 'Ask the reception team which beachfront chiringuito on the Paseo is grilling the freshest espetos de sardinas over olive wood today.'
    },
    insider_secrets: {
      insider_badge: 'Paseo Marítimo Insider Lore',
      off_menu_perk: 'Use the private south garden gate directly onto the Paseo Marítimo at 7:30 PM to catch the sunset over Gibraltar and grab a front-row table at Soleo before the evening rush.',
      secret_lore: 'West-facing apartments in Block A & B capture uninterrupted sunset views all the way to Gibraltar and the Atlas Mountains on clear evenings.',
      secret_title: 'The Gibraltar Sunset Balcony & Private Paseo Gate'
    },
    temporal_dynamics: {
      best_time_to_visit: '10:30 AM for calm morning laps in the 3 garden pools; 7:00 PM for golden-hour drinks on your sea-view balcony overlooking the Paseo.',
      content_readiness: {
        aesthetic_subculture: 'Mediterranean Mid-Century Coastal Living',
        flattery_note: 'Unfiltered Mediterranean sea light, palm-lined garden lawns & golden sunset reflections—zero harsh glare',
        score: 91,
        top_creator_spot: 'Private Sea-View Balcony at Golden Hour overlooking the 3 Pools & Mediterranean Horizon',
        verdict: 'Golden Coastal Light • Zero Harsh Glare'
      },
      diurnal_rhythm: {
        working: {
          window: '8:30 AM – 1:00 PM',
          focus: 'High-speed Wi-Fi from bright sea-view apartment tables & morning coffee on the terrace.',
          score: 88
        },
        chilling: {
          window: '1:00 PM – 6:30 PM',
          focus: 'Sun-lounging across three expansive lawn pools & afternoon dips in the Mediterranean.',
          score: 96
        },
        playing: {
          window: '7:00 PM – Late',
          focus: 'Golden-hour balcony aperitifs followed by a 5-minute stroll to Paseo beach clubs & Old Town tapas.',
          score: 94
        }
      },
      peak_atmospheric_window: 'Golden-Hour Sea-View Balcony & Paseo Sunset'
    }
  },
  ota_conversion_audit: {
    channel: 'Booking.com',
    before_merchandising_score: 54,
    after_merchandising_score: 95,
    projected_conversion_uplift: '+21.0%',
    photos_status: 'RESOLVED',
    current_drop_off_flaw: 'Booking.com Top 5 shows 0 bedrooms and 0 bathrooms: Slots #2 and #5 repeat two indoor living-room couch shots, while Slot #3 is a close-up of a wall mirror on a green wall—burying the actual bedrooms at #8 and #20, the walk-in shower at #32, and the ocean-view dining balcony at #9.',
    local_vibe_synergy_context: 'Marbella Beachfront travellers search specifically for direct Paseo Marítimo access, private sea-view balconies, and resort-scale outdoor pools within walking distance of Marbella Old Town.',
    key_strategic_shifts: [
      'Slot #1 — Signature Vibe Hero: Retain the panoramic Aerial Pool & Mediterranean Beachfront shot (Live #1) to immediately prove direct Paseo Marítimo beachfront scale.',
      'Slot #2 — The Bookable Room: Promote the bright Apartment Bedroom with Window (Live #8) into Slot #2 (replacing the living-room couch in Live #2 so guests see the actual bed).',
      'Slot #3 — Bathroom & Comfort Proof: Promote the Modern Walk-In Shower Bathroom (Live #32) into Slot #3 (replacing the green-wall mirror close-up in Live #3).',
      'Slot #4 — Day-to-Night Social & Sea-View Dining: Promote the Private Ocean-View Dining Balcony (Live #9) into Slot #4 to capture Marbella indoor-outdoor terrace living.',
      'Slot #5 — Neighbourhood & Beachfront Gateway: Promote the Palm-Lined Beach & Paseo Marítimo View (Live #10) into Slot #5 (replacing the 2nd repetitive couch shot in Live #5).'
    ],
    vibe_grading_rubric: {
      destination_vibe_title: 'Marbella Beachfront & Paseo Marítimo',
      destination_vibe_pillars: 'Direct Beachfront Pools • Sea-View Dining Balconies • Walkable Old Town & Chiringuitos',
      verified_reality_score: 91,
      verified_reality_label: 'On-Property Match to Destination Vibe',
      current_merchandising_score: 54,
      optimized_merchandising_score: 95,
      vibe_gap_points: -37,
      vibe_gap_archetype: 'HIGH VIBE GAP — BURIED SEA-VIEW & ROOM ASSETS',
      vibe_gap_summary: 'Booking.com Top 5 scores 54/100 (-37 pt gap vs. reality): 0 bedrooms and 0 bathrooms appear in the Top 5, Slot #3 is a close-up of a wall mirror, Slots #2 and #5 repeat living-room sofas, and the ocean-view dining balcony sits buried at #9.',
      raw_slot_total: 62,
      repetition_penalty: -8,
      repetition_penalty_reason: '2 repetitive indoor couch shots in Live Slots #2 & #5 + decorative wall mirror in Slot #3 with 0 bedrooms in Top 5',
      slot_scorecard: [
        {
          slot: 1,
          formula_name: 'Slot #1 — Signature Vibe Hero',
          live_score: 20,
          max_score: 20,
          status: 'STRONG HERO (20/20)',
          live_what_is_there: 'Aerial view of the 3 beachfront pools, gardens & Mediterranean Sea (Live #1)',
          optimal_fix: 'Retain Aerial Beachfront Pools & Ocean Hero in Slot #1'
        },
        {
          slot: 2,
          formula_name: 'Slot #2 — The Bookable Room',
          live_score: 10,
          max_score: 20,
          status: 'BURIED AT #8',
          live_what_is_there: 'Indoor living room couch & desk—no bed visible in Top 5 (Live #2)',
          optimal_fix: 'Promote Apartment Bedroom with Natural Window Light from Live #8 to Slot #2'
        },
        {
          slot: 3,
          formula_name: 'Slot #3 — Bathroom & Comfort Proof',
          live_score: 4,
          max_score: 20,
          status: 'MIRROR IN SLOT #3',
          live_what_is_there: 'Close-up of a round mirror on a green wall (Live #3); bathroom buried at #32',
          optimal_fix: 'Promote Modern Walk-In Shower Bathroom from Live #32 to Slot #3'
        },
        {
          slot: 4,
          formula_name: 'Slot #4 — Day-to-Night Social & Sea-View Terrace',
          live_score: 16,
          max_score: 20,
          status: 'UPGRADE FROM #9',
          live_what_is_there: 'Distant balcony rail view (Live #4) while furnished ocean-view dining terrace sits at #9',
          optimal_fix: 'Promote Private Ocean-View Dining Balcony from Live #9 into Slot #4'
        },
        {
          slot: 5,
          formula_name: 'Slot #5 — Neighbourhood & Beachfront Gateway',
          live_score: 12,
          max_score: 20,
          status: 'REPETITIVE COUCH #5',
          live_what_is_there: 'Second indoor living room couch shot (Live #5) while palm-lined beach view sits at #10',
          optimal_fix: 'Promote Palm-Lined Paseo Marítimo & Beachfront View from Live #10 into Slot #5'
        }
      ],
      auto_vibe_insights: {
        badge: 'High Vibe Gap Opportunity (-37 pts)',
        headline_stat: 'Skol Apartments Marbella delivers a 91/100 on-property match to the Marbella Beachfront Vibe Signature, but its Booking.com Top 5 gallery scores just 54/100—showing a green wall mirror in Slot #3, two indoor couch shots in Slots #2 & #5, and 0 bedrooms in the Top 5.',
        gm_outreach_hook: 'Skol Apartments has one of the best beachfront pool & Paseo Marítimo footprints in Marbella (91/100 reality score), yet your Booking.com Top 5 currently shows 0 bedrooms, a wall mirror in Slot #3, and buries your ocean-view dining balcony at #9.',
        linkedin_post_hook: 'We audited Skol Apartments Marbella against the Marbella Beachfront Vibe Signature. On-property reality: 91/100. Live Booking.com Top 5 gallery: 54/100 (-37 pt Vibe Gap). Resequencing existing photos #1, #8, #32, #9, and #10 closes the gap to 95/100.'
      }
    },
    optimal_5_photo_sequence: [
      {
        slot: 1,
        category: 'OUTDOOR_SOCIAL_POOL',
        photo_subject: 'Aerial View of the 3 Beachfront Pools, Lawns & Mediterranean Sea',
        photo_url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/836283464.jpg?k=f6a5f76ed4f670acff6e2fbcff004ef4392f8f3f7902ed6fec14e6641bc20d0e&o=',
        why_it_converts: 'Immediately proves Skol’s unbeatable direct beachfront footprint, three garden swimming pools, and zero-road-crossing access to the Mediterranean.',
        upgrade_rationale: 'Retaining this high-impact aerial hero in Slot #1 captures Marbella’s #1 beachfront & pool search intent at first glance.',
        bullet_points: [
          'Visual Hook: Shows all three outdoor pools, lush palm gardens, and the sand right outside the gate.',
          'Local Synergy: Matches Marbella travellers’ #1 desire for direct Paseo Marítimo beachfront living.',
          'Conversion Trigger: Eliminates location doubt in under 1 second.'
        ],
        psychological_conversion_trigger: 'Direct Beachfront Scale & Resort Pool Sanctuary',
        recommended_trigger: 'Direct Beachfront Scale & Resort Pool Sanctuary',
        current_slot: 1,
        is_retained: true,
        is_moved: false,
        is_swapped_in: false,
        action: 'RETAIN',
        action_label: '⚡ RETAIN HERO IN SLOT #1',
        source_display_label: 'Was: Slot #1 (Booking.com)',
        source_domain: 'booking.com',
        current_photo: {
          slot: 1,
          title: 'Aerial view of beachfront pools and the ocean at Skol Apartments Marbella',
          imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/836283464.jpg?k=f6a5f76ed4f670acff6e2fbcff004ef4392f8f3f7902ed6fec14e6641bc20d0e&o=',
          photoId: '836283464',
          sourceUrl: 'https://www.booking.com/hotel/es/skol-apartments-marbella.html'
        }
      },
      {
        slot: 2,
        category: 'SIGNATURE_SUITE_BEDROOM',
        photo_subject: 'Bright Apartment Bedroom with Crisp Linens & Balcony Light',
        photo_url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/836262074.jpg?k=37f9b277aba7763db7fbbd5ed6f94acd09905edf11a685d30173ef0724cc55cc&o=',
        why_it_converts: 'Replaces the indoor living-room sofa in Live Slot #2 (where no bed is visible anywhere in the Top 5) with a clear, restful bedroom shot.',
        upgrade_rationale: 'Booking.com guests need to see where they will sleep in Slot #2 before committing to an apartment stay.',
        bullet_points: [
          'Fixes 0-Bedroom Top 5: Currently the first actual bed does not appear until Photo #8.',
          'Sleep Reassurance: Crisp white linens and natural window light validate private sleeping comfort.',
          'Conversion Trigger: Bridges the outdoor beachfront promise with bookable sleep quality.'
        ],
        psychological_conversion_trigger: 'Restful Sleep & Modern Apartment Comfort',
        recommended_trigger: 'Restful Sleep & Modern Apartment Comfort',
        current_slot: 8,
        is_retained: false,
        is_moved: true,
        is_swapped_in: false,
        action: 'PROMOTE',
        action_label: 'PROMOTE FROM SLOT #8',
        source_display_label: 'Was: Slot #8 (Booking.com)',
        source_domain: 'booking.com',
        current_photo: {
          slot: 2,
          title: 'Living room with a couch and desk (No bed in Top 5 — Live #2)',
          imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max500/836261848.jpg?k=3e9af529ea60adde3798550375b61c511890b874c6b1fc5e3b08bdfb66d6d6dd&o=',
          photoId: '836261848',
          sourceUrl: 'https://www.booking.com/hotel/es/skol-apartments-marbella.html'
        }
      },
      {
        slot: 3,
        category: 'SECONDARY_ROOM_BATHROOM',
        photo_subject: 'Modern Walk-In Rain Shower & Refurbished Bathroom',
        photo_url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/836262759.jpg?k=a09d19cc92435cb8f547bc42e5b52d847c2f8460427c022ebe218a0271c04198&o=&hp=1',
        why_it_converts: 'Replaces the close-up photo of a decorative wall mirror on a green wall (Live Slot #3) with a bright, modern walk-in shower bathroom buried at Live Slot #32.',
        upgrade_rationale: 'For iconic mid-century apartment buildings, proving modern refurbished bathrooms in Slot #3 is the #1 objection-buster for families and couples.',
        bullet_points: [
          'Replaces Wall Mirror (#3): Removes a zero-conversion decorative mirror close-up from the Top 5.',
          'Refurbished Proof: Confirms modern walk-in glass shower, clean tiling, and contemporary vanity.',
          'Booking.com Compliance: Completes the 2-photo Bedroom + Bathroom accommodation pair in Slots #2 & #3.'
        ],
        psychological_conversion_trigger: 'Refurbished Bathroom & Hygiene Confidence',
        recommended_trigger: 'Refurbished Bathroom & Hygiene Confidence',
        current_slot: 32,
        is_retained: false,
        is_moved: true,
        is_swapped_in: false,
        action: 'PROMOTE',
        action_label: 'PROMOTE FROM SLOT #32',
        source_display_label: 'Was: Slot #32 (Booking.com)',
        source_domain: 'booking.com',
        current_photo: {
          slot: 3,
          title: 'Decorative mirror on a green wall (Live #3)',
          imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max500/836262037.jpg?k=5bb8144a94c3589592d604a1f97350ecc074352bcb5bc13e3dc9c9bcd5d4a724&o=',
          photoId: '836262037',
          sourceUrl: 'https://www.booking.com/hotel/es/skol-apartments-marbella.html'
        }
      },
      {
        slot: 4,
        category: 'SOCIAL_FB_ROOFTOP',
        photo_subject: 'Private Ocean-View Dining Balcony Overlooking the Mediterranean',
        photo_url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/836261561.jpg?k=e74f390383dfed65c0f4e1f40e5f83a9cbe2deaf336f6253d19c1ff3ce758f0a&o=&hp=1',
        why_it_converts: 'Upgrades Live Slot #4 to a furnished private balcony table with chairs overlooking the sparkling Mediterranean Sea (currently buried at Live Slot #9).',
        upgrade_rationale: 'Puts the guest directly in the seat of morning coffee and sunset wine on their own private Marbella terrace.',
        bullet_points: [
          'Experiential Magnet: Shows the furnished balcony lifestyle rather than just an empty railing.',
          'Local Synergy: Captures Marbella’s indoor-outdoor Mediterranean terrace culture.',
          'Conversion Trigger: Drives higher-tier sea-view apartment upgrades.'
        ],
        psychological_conversion_trigger: 'Private Sea-View Al Fresco Living',
        recommended_trigger: 'Private Sea-View Al Fresco Living',
        current_slot: 9,
        is_retained: false,
        is_moved: true,
        is_swapped_in: false,
        action: 'PROMOTE',
        action_label: 'PROMOTE FROM SLOT #9',
        source_display_label: 'Was: Slot #9 (Booking.com)',
        source_domain: 'booking.com',
        current_photo: {
          slot: 4,
          title: 'View of the pool and ocean from balcony railing (Live #4)',
          imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max300/349898846.jpg?k=f2c53e3bcd1fc9b184b4803665a8fb0551f470c6fb3425035975478f67cfcd22&o=',
          photoId: '349898846',
          sourceUrl: 'https://www.booking.com/hotel/es/skol-apartments-marbella.html'
        }
      },
      {
        slot: 5,
        category: 'EXTERIOR_LANDMARK',
        photo_subject: 'Palm-Lined Marbella Beach & Paseo Marítimo Steps Outside',
        photo_url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/836261521.jpg?k=ed941aaaac9b140acf68a7fd821f69868ab4195403e8f23569b3ff2aaf861602&o=&hp=1',
        why_it_converts: 'Replaces the 2nd repetitive indoor living-room sofa shot in Live Slot #5 with the sun-drenched palm trees, sand, and Mediterranean coastline from Live Slot #10.',
        upgrade_rationale: 'Anchors the property as a true beachfront gateway on Marbella’s Golden Paseo Marítimo.',
        bullet_points: [
          'Eliminates Couch Repetition: Removes the second indoor sofa photo from the Top 5.',
          'Destination Gateway: Connects the apartments directly to the palm-lined beach and chiringuitos.',
          'Conversion Trigger: Closes the 5-photo sequence with an irresistible Marbella beach lifestyle hook.'
        ],
        psychological_conversion_trigger: 'Walkable Beachfront & Paseo Marítimo Gateway',
        recommended_trigger: 'Walkable Beachfront & Paseo Marítimo Gateway',
        current_slot: 10,
        is_retained: false,
        is_moved: true,
        is_swapped_in: false,
        action: 'PROMOTE',
        action_label: 'PROMOTE FROM SLOT #10',
        source_display_label: 'Was: Slot #10 (Booking.com)',
        source_domain: 'booking.com',
        current_photo: {
          slot: 5,
          title: 'Second indoor living room with a couch and table (Live #5)',
          imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max300/836261894.jpg?k=dc884c3178294a59e7ac1d6972e316259cff2c02446406a48632a269bdc9f061&o=',
          photoId: '836261894',
          sourceUrl: 'https://www.booking.com/hotel/es/skol-apartments-marbella.html'
        }
      }
    ],
    photographic_gap_analysis: [
      {
        missing_shot_title: 'Golden-Hour Poolside & Garden Café Aperitif',
        category: 'ATMOSPHERIC_TWILIGHT',
        why_needed: 'All 48 live Booking.com gallery photos are shot in midday light or indoors; adding one warm sunset shot of the garden pool bar and illuminated palms will capture evening leisure emotion.',
        recommended_framing_and_lighting: 'Shoot at 7:30 PM during golden hour looking across the main pool toward the sea with warm terrace lighting.',
        projected_adr_impact: '+9% evening leisure appeal'
      }
    ]
  }
};

export const TUI_ZORA_CANNED_DEMO = {
  venue_id: 'tui_zora_river_cruise_uk',
  venue_name: 'TUI Zora (TUI River Cruises)',
  location: 'Rhine & Moselle Rivers (Cologne · Cochem · Koblenz · Rüdesheim)',
  vibe_signature: {
    energy_score: 82,
    social_pacing: 'Boutique Floating Hotel & Walkable River Cities (18+ Adults Only)',
    headline: 'Next-Gen "Cultural Mosaic" River Ship: 25m² French Balcony Suites & Central Rhine/Moselle City Docks',
    acoustic_dna: {
      soundscape_genre: 'Acoustic Lounge, Contemporary Soul & Regional Wine-Bar Sets',
      anchor_artists: ['Tom Misch', 'Norah Jones', 'Leon Bridges'],
      spotify_query: 'Boutique Hotel Evening Lounge Acoustic Soul',
      sound_texture: 'Whisper-quiet flat-water river glide by day; sociable 72 dB cocktail & live acoustic music in The Observatory by night',
      conversation_clarity_score: 91,
      conversation_verdict: 'Easy Cocktail Chat in The Observatory & Zero-Swell 36 dB Cabin Sleep',
      decibel_level: '72 dB Lounge / 36 dB Suite',
      sleep_sanctuary_verdict: 'Sleep Sanctuary: Flat-Water River Navigation (Zero Ocean Swells) & Sound-Insulated Deck 2/3 Staterooms'
    },
    crowd_archetype: {
      primary: 'Sociable 38–55 Couples, Food & Wine Explorers, and Multi-City Break Travellers (18+ Adults Only)',
      social_density: 'Intimate 188-Guest Boutique Scale Across 4 Decks (Never Crowded)',
      dress_code: 'Smart-Casual Boutique Hotel Style (Zero Black-Tie Formality)',
      energy_verdict: 'Daytime Vineyard & City Walks Into Sociable Evening Cocktails at The Observatory',
      local_ratio: 68,
      tourist_ratio: 32,
      tourist_trap_verdict: 'Docks in Real Local Wine Towns & City Centres (Not Isolated Mega-Ship Ports)',
      trip_occasions: ['Couples Wine & Culture Cruise', 'Multi-City Rhine/Moselle Escape', 'Boutique River Break']
    },
    lighting_and_sensory: {
      atmosphere: 'Panoramic Drop-Down French Balcony Daylight & Warm 2700K Observatory Cocktail Glow',
      sensory_intensity: 'Warm, Contemporary & Scenic',
      lighting_temperature: 'Natural Rhine Valley Daylight & 2700K Candlelit Evening Lounge'
    },
    hyper_local_proximity: {
      key_anchors: [
        'Cologne Altstadt & Peters Brauhaus (4.6★ · 4m walk from berth)',
        'Cochem Old Town & Weingut Hieronimi (4.7★ · 2m walk from berth)',
        'Koblenz Deutsches Eck & Ehrenbreitstein Cable Car (4.7★ · 3m walk)',
        'Rüdesheim Drosselgasse Wine Lane (4.6★ · 4m walk from berth)'
      ],
      insider_lore: 'Unlike ocean ships that dock in industrial ports 45 minutes from town, TUI Zora berths directly on central river promenades in Cologne, Cochem, Koblenz, and Boppard—putting verified 4.6★+ local wine taverns, Kölsch beer halls, and TUI Musement e-bike/vineyard trails within a 2 to 5 minute walk of the gangway.'
    },
    qualification_test: {
      you_will_love_if: 'You want a modern, adults-only (18+) floating boutique hotel (188 guests) with 25m² drop-down French Balcony suites that docks right in the middle of walkable Rhine & Moselle wine towns.',
      skip_if: 'You are looking for a 5,000-passenger mega-ship with waterslides, casinos, and kids’ clubs, or a formal black-tie traditional cruise.'
    },
    ai_search_geo: {
      traveler_prompts: [
        'Modern river cruise on the Rhine and Moselle for couples in their 40s and 50s that feels like a boutique hotel',
        'Adults-only European river cruise with French balcony suites, relaxed dining, and walkable city-centre ports',
        'Best Rhine and Moselle river cruise ship for local wine tasting, Cologne Old Town, and Cochem castle views'
      ],
      verified_entity_summary: 'TUI Zora is a next-generation, adults-only (18+) boutique river cruise ship for TUI River Cruises (188 guests, 94 cabins up to 25m² French Balcony Suites, methanol-ready hull) sailing the Rhine and Moselle with Verdastro restaurant, The Observatory lounge, and central city berths.'
    },
    authenticity_and_materials: {
      authenticity_score: 93,
      material_palette: '"Cultural Mosaic" Interior Architecture: Warm European Oak, Brushed Brass, Terracotta & Regional Rhine/Moselle Textiles',
      material_verdict: 'Contemporary Boutique Hotel Design — Zero Traditional Cruise-Ship Clutter'
    },
    host_vibe: {
      host_style_score: 94,
      host_archetype: '52-Person English-Speaking Crew (1:3 Ratio), Atrium Shore Concierge & Regional Guest Musicians',
      warmth_verdict: 'Zero Stiffness — Warm UK Hospitality & Local Port Insiders',
      service_pacing: 'Open-Seating Flexible Dining & Unhurried Lounge Service',
      team_aesthetic: 'Contemporary Boutique Hospitality Tailoring',
      signature_team_roles: ['Cruise Director (Atrium Desk)', 'Verdastro Sommelier', 'Observatory Mixologist'],
      staff_icebreaker_prompt: 'Ask the Cruise Director at the Atrium desk which family-run Riesling cellar in Cochem or Boppard is pouring late-harvest tastings within a 4-minute walk of today’s berth.'
    },
    insider_secrets: {
      insider_badge: 'Rhine & Moselle Insider Playbook',
      off_menu_perk: 'Book a Deck 3 French Balcony Suite (25m²—largest in TUI’s fleet) and drop the panoramic window at 4:00 PM during the UNESCO Middle Rhine Gorge passage past the Lorelei Rock.',
      secret_lore: 'When TUI Zora docks overnight in Cologne or Koblenz, you can walk straight off the gangway after dinner at Verdastro into local Altstadt beer halls and wine bars without worrying about tender boats.',
      secret_title: 'Deck 3 French Balcony Gorge Glide & Overnight Port Tavern Walk'
    },
    temporal_dynamics: {
      best_time_to_visit: '10:00 AM on the Top Deck gliding past 40 Rhine Gorge castles; 4:00 PM stepping ashore into Cochem wine alleys; 8:30 PM for cocktails & live acoustic music in The Observatory.',
      content_readiness: {
        aesthetic_subculture: 'Contemporary River Boutique & Vineyard Slow-Luxury',
        flattery_note: 'Floor-to-ceiling drop-down French balcony daylight & warm 2700K Observatory lounge lamps—zero harsh fluorescent glare',
        score: 94,
        top_creator_spot: 'Deck 3 French Balcony Suite with Drop-Down Glass Open to Cochem Castle & Moselle Vineyards',
        verdict: 'Panoramic River Light & Warm 2700K Lounge Glow'
      },
      diurnal_rhythm: {
        working: {
          window: '8:30 AM – 12:30 PM',
          focus: 'Included ship-wide Wi-Fi, morning coffee in The Observatory, top-deck yoga & scenic castle gliding.',
          score: 91
        },
        chilling: {
          window: '1:00 PM – 6:30 PM',
          focus: 'Walk straight off the gangway into Cochem, Boppard or Cologne—or open your 25m² suite’s French balcony to the river breeze.',
          score: 96
        },
        playing: {
          window: '7:00 PM – Late',
          focus: 'Open-seating regional dinner at Verdastro (Full Board Plus drinks included) into live acoustic sets & local entertainers in The Observatory.',
          score: 95
        }
      },
      peak_atmospheric_window: 'Golden-Hour Gorge Sail & Evening Observatory Lounge'
    }
  },
  ota_conversion_audit: {
    channel: 'TUI Direct & AI Search (ChatGPT / Mindtrip)',
    before_merchandising_score: 52,
    after_merchandising_score: 95,
    projected_conversion_uplift: '+24.0%',
    photos_status: 'RESOLVED',
    current_drop_off_flaw: 'Traditional river cruise listings score 52/100 with younger 38–55 adults because Slots #1 and #2 lead with a distant flat-water hull render and a technical deck plan, while Slot #3 shows an empty daytime dining room—hiding the 25m² drop-down French Balcony lifestyle, The Observatory evening cocktail vibe, and walkable city-centre ports.',
    local_vibe_synergy_context: 'TUI River Cruises attracts some of the youngest adult profiles in river cruising (38–55), who book when they see a floating boutique hotel + walkable European wine & city break rather than a traditional retirement riverboat.',
    key_strategic_shifts: [
      'Slot #1 — Boutique Suite Hero: Lead with the 25m² Deck 3 Suite with Drop-Down French Balcony open to Rhine/Moselle vineyards (replaces the distant exterior riverboat hull in Slot #1).',
      'Slot #2 — Evening Social Vibe: Promote The Observatory Lounge & Cocktail Bar at Twilight into Slot #2 (replaces the technical deck plan diagram to prove a sociable 18+ boutique atmosphere).',
      'Slot #3 — Walkable Port Reality (TUI Musement Hook): Show guests stepping directly from the gangway into Cochem & Cologne Old Town wine lanes (3-min walk) in Slot #3.',
      'Slot #4 — Daytime Top-Deck Sanctuary: Feature Top-Deck Sun Loungers & Wellness gliding past UNESCO Rhine Gorge castles in Slot #4.',
      'Slot #5 — Contemporary Culinary Proof: Showcase evening regional dining & wine pour at Verdastro in Slot #5 (replaces empty daytime table shots).'
    ],
    vibe_grading_rubric: {
      destination_vibe_title: 'Rhine & Moselle Boutique River Cruise (TUI Zora)',
      destination_vibe_pillars: '25m² French Balcony Suites • Walkable Wine & City Ports • 18+ Boutique Lounge Vibe',
      verified_reality_score: 93,
      verified_reality_label: 'On-Ship & Port Match to Younger Adult (38–55) Vibe',
      current_merchandising_score: 52,
      optimized_merchandising_score: 95,
      vibe_gap_points: -41,
      vibe_gap_archetype: 'PERCEPTION GAP — BOUTIQUE SHIP SOLD LIKE TRADITIONAL RIVERBOAT',
      vibe_gap_summary: 'Current river cruise merchandising scores 52/100 (-41 pt gap vs. reality): leading with exterior hull renders, deck schematics, and empty dining tables triggers the "traditional retirement cruise" stereotype—hiding TUI Zora’s 25m² French Balcony Suites, The Observatory evening lounge, and city-centre berths.',
      raw_slot_total: 60,
      repetition_penalty: -8,
      repetition_penalty_reason: 'Empty venue renders & static cabin shots without river/port context in the first 5 visual slots',
      slot_scorecard: [
        {
          slot: 1,
          formula_name: 'Slot #1 — Signature Vibe Hero',
          live_score: 10,
          max_score: 20,
          status: 'STEREOTYPE RISK',
          live_what_is_there: 'Wide exterior render of the riverboat hull on water (Live #1)',
          optimal_fix: 'Lead with 25m² Suite + Drop-Down French Balcony Open to Rhine Vineyards'
        },
        {
          slot: 2,
          formula_name: 'Slot #2 — Social & Evening Vibe',
          live_score: 8,
          max_score: 20,
          status: 'DECK PLAN IN #2',
          live_what_is_there: 'Technical deck/cabin layout graphic in the hero sequence (Live #2)',
          optimal_fix: 'Promote The Observatory Cocktail Lounge & Live Evening Vibe to Slot #2'
        },
        {
          slot: 3,
          formula_name: 'Slot #3 — Port Walkability & Shore Hook',
          live_score: 10,
          max_score: 20,
          status: 'ZERO PORT CONTEXT',
          live_what_is_there: 'Empty daytime restaurant tables with no people or river view (Live #3)',
          optimal_fix: 'Show Central City Berth Steps from Cochem Vineyards & Cologne Old Town'
        },
        {
          slot: 4,
          formula_name: 'Slot #4 — Daytime Deck & Scenic Glide',
          live_score: 12,
          max_score: 20,
          status: 'CLOSED CURTAINS',
          live_what_is_there: 'Standard cabin bed angle with curtains partially drawn (Live #4)',
          optimal_fix: 'Promote Top-Deck Sun Loungers & UNESCO Rhine Castle Glide into Slot #4'
        },
        {
          slot: 5,
          formula_name: 'Slot #5 — Culinary & Full Board Plus Proof',
          live_score: 12,
          max_score: 20,
          status: 'REPETITIVE EXTERIOR',
          live_what_is_there: 'Second bow/waterline exterior shot (Live #5)',
          optimal_fix: 'Show Verdastro Evening À-La-Carte Dining & Regional Wine Pour in Slot #5'
        }
      ],
      auto_vibe_insights: {
        badge: 'High Vibe Gap Opportunity (-41 pts)',
        headline_stat: 'TUI Zora delivers a 93/100 reality match for 38–55 boutique travellers (25m² French Balcony Suites + city-centre Rhine/Moselle berths), but standard river cruise merchandising scores 52/100 by leading with hull renders and deck plans.',
        gm_outreach_hook: 'TUI River Cruises already attracts some of the youngest profiles in river cruising—pairing TUI Zora’s "Cultural Mosaic" ship Vibe Signature with AtmosVibe Port Signatures for Cologne, Cochem, and Koblenz turns static ship pages into a high-converting GEO & TUI Musement discovery engine.',
        linkedin_post_hook: 'River cruises are half boutique floating hotel, half walkable city break. Here is how AtmosVibe bridges the 41-point perception gap on TUI’s new TUI Zora by connecting onboard Vibe Signatures with port-side neighbourhood DNA.'
      }
    },
    optimal_5_photo_sequence: [
      {
        slot: 1,
        category: 'SIGNATURE_SUITE_BEDROOM',
        photo_subject: '25m² Suite with Drop-Down French Balcony Open to the River',
        photo_url: '/wtm-assets/tui-opt-1-frenchbalcony.jpg',
        why_it_converts: 'Immediately reframes TUI Zora from a "riverboat" into a floating boutique hotel with the largest suites (25m²) in TUI’s European fleet.',
        upgrade_rationale: 'Younger 38–55 couples convert when they see indoor-outdoor French balcony living overlooking the Rhine.',
        bullet_points: [
          'Visual Hook: Drop-down panoramic glass turns the suite into an open-air river lounge.',
          'De-Risks Cabin Size: Highlights TUI Zora’s new 25m² Deck 3 suite footprint.',
          'Conversion Trigger: Breaks the traditional river-cruise stereotype in under 1 second.'
        ],
        psychological_conversion_trigger: 'Boutique Hotel Suite & Panoramic River View',
        recommended_trigger: 'Boutique Hotel Suite & Panoramic River View',
        current_slot: 12,
        is_retained: false,
        is_moved: true,
        is_swapped_in: false,
        action: 'PROMOTE',
        action_label: 'PROMOTE FROM SLOT #12',
        source_display_label: 'Was: Slot #12 (Ship Gallery)',
        source_domain: 'tui.co.uk',
        current_photo: {
          slot: 1,
          title: 'Wide Exterior Hull Render on Water (Live #1)',
          imageUrl: '/wtm-assets/tui-live-1-exterior.jpg',
          photoId: 'tui-1',
          sourceUrl: 'https://www.tui.co.uk/river-cruises/ships/tui-zora/'
        }
      },
      {
        slot: 2,
        category: 'SOCIAL_FB_ROOFTOP',
        photo_subject: 'The Observatory Lounge & Cocktail Bar at Twilight (18+ Social Vibe)',
        photo_url: '/wtm-assets/tui-opt-2-observatory.jpg',
        why_it_converts: 'Replaces the technical deck schematic in Slot #2 with warm 2700K cocktail lighting and sociable evening energy.',
        upgrade_rationale: 'Directly answers the #1 objection of younger river cruisers: "What is the vibe like after dark?"',
        bullet_points: [
          'Social Proof: Shows a contemporary 18+ cocktail lounge, not a bingo hall.',
          'Cultural Mosaic Design: Highlights regional textures and warm lighting.',
          'Conversion Trigger: Drives All-Inclusive drinks upgrades and evening confidence.'
        ],
        psychological_conversion_trigger: 'Sociable 18+ Boutique Lounge Atmosphere',
        recommended_trigger: 'Sociable 18+ Boutique Lounge Atmosphere',
        current_slot: 18,
        is_retained: false,
        is_moved: true,
        is_swapped_in: false,
        action: 'PROMOTE',
        action_label: 'PROMOTE FROM SLOT #18',
        source_display_label: 'Was: Slot #18 (Ship Gallery)',
        source_domain: 'tui.co.uk',
        current_photo: {
          slot: 2,
          title: 'Technical Deck & Cabin Schematic (Live #2)',
          imageUrl: '/wtm-assets/tui-live-2-deckplan.jpg',
          photoId: 'tui-2',
          sourceUrl: 'https://www.tui.co.uk/river-cruises/ships/tui-zora/'
        }
      },
      {
        slot: 3,
        category: 'SECONDARY_ROOM_BATHROOM',
        photo_subject: 'Superior French Balcony King Bedroom with Floor-to-Ceiling Castle View',
        photo_url: '/wtm-assets/tui-opt-3-cochem-port.jpg',
        why_it_converts: 'Satisfies the 2-cabin visual rule by pairing the UK King Bed with floor-to-ceiling river & castle views (promoted from Cabins tab #11).',
        upgrade_rationale: 'Replacing a close-up dessert plate shot with the bookable French Balcony King Bedroom drives immediate cabin selection confidence.',
        bullet_points: [
          '2-Cabin Rule: Shows both the 24.2m² Balcony Suite (Slot #1) and 14.4m² French Balcony King (Slot #3).',
          'Castle Sightline: Proves front-row river views from the bed.',
          'Conversion Trigger: Eliminates fear of dark, cramped lower-deck cabins.'
        ],
        psychological_conversion_trigger: 'King Bed with Front-Row River & Castle Views',
        recommended_trigger: 'King Bed with Front-Row River & Castle Views',
        current_slot: 11,
        is_retained: false,
        is_moved: true,
        is_swapped_in: false,
        action: 'PROMOTE',
        action_label: 'PROMOTE FROM SLOT #11',
        source_display_label: 'Was: Slot #11 (Cabins Tab)',
        source_domain: 'tui.co.uk',
        current_photo: {
          slot: 3,
          title: 'Close-Up Plated Dessert Shot (Live #3)',
          imageUrl: '/wtm-assets/tui-live-3-dining.jpg',
          photoId: 'tui-3',
          sourceUrl: 'https://www.tui.co.uk/river-cruises/ships/tui-zora/'
        }
      },
      {
        slot: 4,
        category: 'SECONDARY_ROOM_BATHROOM',
        photo_subject: 'Boutique Gold-Brass Walk-In Rainshower & Backlit Marble Vanity',
        photo_url: '/wtm-assets/tui-opt-4-topdeck.jpg',
        why_it_converts: 'Eliminates the #1 cruise objection ("tiny plastic wet-room bathrooms") with a luxury boutique-hotel rainshower bathroom (promoted from Cabins tab #12).',
        upgrade_rationale: 'Replaces the Deck 1 small high-window cabin shot with TUI Zora’s warm brushed-brass bathroom finish.',
        bullet_points: [
          'Bathroom Proof: Brushed brass fixtures, backlit oval mirror, and walk-in glass rainshower.',
          'Boutique Hotel Standard: Looks like a 5-star city hotel bathroom, not a ship.',
          'Conversion Trigger: Removes bathroom anxiety for first-time river cruisers.'
        ],
        psychological_conversion_trigger: 'Boutique Hotel Walk-In Rainshower Bathroom',
        recommended_trigger: 'Boutique Hotel Walk-In Rainshower Bathroom',
        current_slot: 12,
        is_retained: false,
        is_moved: true,
        is_swapped_in: false,
        action: 'PROMOTE',
        action_label: 'PROMOTE FROM SLOT #12',
        source_display_label: 'Was: Slot #12 (Cabins Tab)',
        source_domain: 'tui.co.uk',
        current_photo: {
          slot: 4,
          title: 'Deck 1 Standard Cabin with Small High Window (Live #4)',
          imageUrl: '/wtm-assets/tui-live-4-corridor.jpg',
          photoId: 'tui-4',
          sourceUrl: 'https://www.tui.co.uk/river-cruises/ships/tui-zora/'
        }
      },
      {
        slot: 5,
        category: 'EXTERIOR_LANDMARK',
        photo_subject: 'Walkable Medieval River Quay — Step Off Straight Into Historic Towns',
        photo_url: '/wtm-assets/tui-opt-5-port.jpg',
        why_it_converts: 'Closes the Top 5 by proving that TUI Zora docks directly in the heart of walkable European river towns—connecting the ship directly to TUI Musement shore experiences.',
        upgrade_rationale: 'Replaces an overexposed white-sky deck rail shot with vibrant riverside town architecture.',
        bullet_points: [
          '5-Min Walk Proof: Gangway steps straight onto historic riverfront quays.',
          'Ancillary Bridge: Sets up TUI Musement shore excursions and independent port walks.',
          'Conversion Trigger: Seals the destination + boutique ship value proposition.'
        ],
        psychological_conversion_trigger: 'Walkable City-Centre River Quays',
        recommended_trigger: 'Walkable City-Centre River Quays',
        current_slot: 18,
        is_retained: false,
        is_moved: true,
        is_swapped_in: false,
        action: 'PROMOTE',
        action_label: 'PROMOTE FROM SLOT #18',
        source_display_label: 'Was: Slot #18 (Top Ports Tab)',
        source_domain: 'tui.co.uk',
        current_photo: {
          slot: 5,
          title: 'Overexposed White-Sky Deck Rail Shot (Live #5)',
          imageUrl: '/wtm-assets/tui-live-5-bow.jpg',
          photoId: 'tui-5',
          sourceUrl: 'https://www.tui.co.uk/river-cruises/ships/tui-zora/'
        }
      }
    ]
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
  },
  'tui-zora': {
    slug: 'tui-zora',
    propertyName: 'TUI Zora (TUI River Cruises)',
    city: 'Rhine & Moselle',
    neighborhood: 'Cologne · Cochem · Koblenz · Rüdesheim',
    bookingUrl: 'https://www.tui.co.uk/river-cruises/ships/tui-zora/',
    masterAudit: TUI_ZORA_CANNED_DEMO
  },
  'skol-apartments-marbella': {
    slug: 'skol-apartments-marbella',
    propertyName: 'Skol Apartments Marbella',
    city: 'Marbella',
    neighborhood: 'Paseo Marítimo Beachfront',
    bookingUrl: 'https://www.booking.com/hotel/es/skol-apartments-marbella.html',
    masterAudit: SKOL_APARTMENTS_MARBELLA_DEMO
  }
};

export const MEETING_LIVE_LINKS = [
  {
    slug: 'tui-zora-deck',
    label: '🚢 TUI Zora (River Cruise Deck)',
    location: 'TUI Meeting Demo',
    href: '/tui-zora'
  },
  {
    slug: 'tui-zora-dossier',
    label: '🚢 TUI Zora (Full Dossier)',
    location: 'Rhine & Moselle',
    href: '/audit?demo=tui-zora'
  },
  {
    slug: 'sea-containers-wtm-deck',
    label: '📱 Sea Containers (Mobile Deck)',
    location: 'WTM 4-Slide Story',
    href: '/wtm'
  },
  {
    slug: 'skol-apartments-marbella',
    label: 'Skol Apartments Marbella',
    location: 'Marbella Beachfront',
    href: '/audit?demo=skol-apartments-marbella'
  }
];
