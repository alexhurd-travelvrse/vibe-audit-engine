export const masterVibeSchema = {
  type: "object",
  properties: {
    venue_id: { type: "string" },
    venue_name: { type: "string" },
    location: { type: "string" },
    audit_timestamp: { type: "string" },
    
    vibe_signature: {
      type: "object",
      properties: {
        energy_score: { type: "integer", description: "0-100 scale" },
        social_pacing: { type: "string" },
        headline: { type: "string" },
        acoustic_dna: {
          type: "object",
          properties: {
            soundscape_genre: { type: "string" },
            anchor_artists: { 
              type: "array", 
              items: { type: "string" },
              description: "Exactly 3 defining artists"
            },
            spotify_query: { type: "string" },
            sound_texture: { type: "string" }
          },
          required: ["soundscape_genre", "anchor_artists", "spotify_query", "sound_texture"]
        },
        crowd_archetype: {
          type: "object",
          properties: {
            primary: { type: "string" },
            social_density: { type: "string" },
            dress_code: { type: "string" }
          },
          required: ["primary", "social_density", "dress_code"]
        },
        lighting_and_sensory: {
          type: "object",
          properties: {
            atmosphere: { type: "string" },
            sensory_intensity: { type: "string" }
          },
          required: ["atmosphere", "sensory_intensity"]
        },
        hyper_local_proximity: {
          type: "object",
          properties: {
            key_anchors: { type: "array", items: { type: "string" } },
            insider_lore: { type: "string" }
          },
          required: ["key_anchors", "insider_lore"]
        },
        qualification_test: {
          type: "object",
          properties: {
            you_will_love_if: { type: "string" },
            skip_if: { type: "string" }
          },
          required: ["you_will_love_if", "skip_if"]
        }
      },
      required: [
        "energy_score", "social_pacing", "headline", "acoustic_dna", 
        "crowd_archetype", "lighting_and_sensory", "hyper_local_proximity", "qualification_test"
      ]
    },

    interactive_quiz_challenge: {
      type: "object",
      properties: {
        target_scene_id: { type: "integer", default: 2 },
        scene_name: { type: "string" },
        mission_title: { type: "string" },
        challenge_prompt: { type: "string" },
        question: { type: "string" },
        options: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string", enum: ["A", "B", "C", "D"] },
              text: { type: "string" }
            },
            required: ["id", "text"]
          }
        },
        correct_option_id: { type: "string", enum: ["A", "B", "C", "D"] },
        success_lore_reveal: { type: "string" },
        reward_badge: { type: "string" },
        reward_spotify_uri: { type: "string" }
      },
      required: ["target_scene_id", "scene_name", "mission_title", "question", "options", "correct_option_id", "success_lore_reveal", "reward_badge"]
    },

    ota_conversion_audit: {
      type: "object",
      properties: {
        channel: { type: "string", default: "Booking.com" },
        current_drop_off_flaw: { type: "string" },
        conversion_diagnosis: { type: "string" },
        local_vibe_synergy_context: { 
          type: "string", 
          description: "Clear strategic explanation connecting the neighborhood's top local subcultures (e.g. culinary, craft mixology, underground art, wellness) to the photo recommendations" 
        },
        optimal_5_photo_sequence: {
          type: "array",
          items: {
            type: "object",
                        properties: {
              slot: { type: "integer", description: "Target recommended slot 1 to 5" },
              category: { 
                type: "string", 
                enum: [
                  "HERO_CULTURAL_MAGNET",
                  "EXTERIOR_LANDMARK",
                  "SOCIAL_FB_ROOFTOP",
                  "SIGNATURE_SUITE_BEDROOM",
                  "WELLNESS_SPA_LOBBY",
                  "SECONDARY_ROOM_BATHROOM"
                ],
                description: "Strict visual merchandising category for this slot"
              },
              source_type: {
                type: "string",
                enum: ["LIVE_PHOTO", "AMENITY_ASSET"],
                description: "Whether this photo was selected from CURRENT LIVE BOOKING.COM PHOTOS or SIGNATURE AMENITY ASSETS"
              },
              source_index: {
                type: "integer",
                description: "The 1-indexed number of the photo in the respective pool (e.g. 13 if chosen from LIVE PHOTO #13, or 2 if chosen from AMENITY ASSET #2)"
              },
              current_slot: { type: "integer", description: "Original current slot number on Booking.com (1 to 20) if retaining or promoting a live photo, or null if swapped from amenity asset" },
              action: { type: "string", enum: ["KEEP_HERO", "KEEP", "PROMOTE", "DEMOTE", "REPLACE", "SWAP_IN", "HERO_CULTURAL_MAGNET", "MAGNET_OVERRIDE", "RE_SEQUENCE"] },
              action_label: { type: "string", description: "Short punchy label e.g. 'HERO CULTURAL MAGNET: SUBTERRANEAN HI-FI BAR (SLOT #1)', 'PROMOTE EXTERIOR HERO (FROM SLOT #13)', 'SWAP IN COCKTAIL BAR (SLOT #2)'" },
              photo_subject: { type: "string", description: "Exact visual content of this specific photo" },
              local_vibe_connection: { 
                type: "string", 
                description: "Explicit connection showing how this photo matches what travelers search for in this specific neighborhood" 
              },
              psychological_conversion_trigger: { type: "string", description: "Why this reordering triggers booking intent by bridging hotel DNA with local neighborhood demand" }
            },
            required: ["slot", "category", "source_type", "source_index", "photo_subject", "psychological_conversion_trigger"]
          }
        },
        slot_1_decision_logic: {
          type: "object",
          properties: {
            is_magnet_override_active: { type: "boolean" },
            override_asset_name: { type: "string" },
            neighborhood_affinity_index: { type: "number", description: "0.00 to 1.00 score" },
            reasoning_code: { type: "string" },
            strategy_explanation: { type: "string" }
          },
          required: ["is_magnet_override_active", "reasoning_code", "strategy_explanation"]
        },
        anti_commodity_copy_rewrite: {
          type: "object",
          properties: {
            ota_headline: { type: "string" },
            property_overview_150_words: { type: "string" }
          },
          required: ["ota_headline", "property_overview_150_words"]
        }
      },
      required: ["channel", "current_drop_off_flaw", "conversion_diagnosis", "optimal_5_photo_sequence", "anti_commodity_copy_rewrite"]
    }
  },
  required: ["venue_id", "venue_name", "location", "vibe_signature", "interactive_quiz_challenge", "ota_conversion_audit"]
};
