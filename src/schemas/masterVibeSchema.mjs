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
        optimal_5_photo_sequence: {
          type: "array",
          items: {
            type: "object",
            properties: {
              slot: { type: "integer", description: "Target recommended slot 1 to 5" },
              current_slot: { type: "integer", description: "Original current slot number on Booking.com (1 to 5)" },
              action: { type: "string", enum: ["KEEP_HERO", "KEEP", "PROMOTE", "DEMOTE", "REPLACE"] },
              action_label: { type: "string", description: "Short punchy label e.g. 'PROMOTE TO SLOT #3' or 'KEEP AS HERO'" },
              photo_subject: { type: "string", description: "Exact visual content of this specific photo" },
              psychological_conversion_trigger: { type: "string", description: "Why this reordering triggers booking intent" }
            },
            required: ["slot", "photo_subject", "psychological_conversion_trigger"]
          }
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
