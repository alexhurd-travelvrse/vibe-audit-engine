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
            sound_texture: { type: "string" },
            decibel_level: { type: "string", description: "e.g. 52 dB (Snug/Intimate) or 74 dB (Vibrant)" },
            conversation_clarity_score: { type: "integer", description: "0-100 percentage e.g. 96" },
            conversation_verdict: { type: "string", description: "e.g. Effortless Chat, Lean-in Required" }
          },
          required: ["soundscape_genre", "anchor_artists", "spotify_query", "sound_texture"]
        },
        authenticity_and_materials: {
          type: "object",
          properties: {
            authenticity_score: { type: "integer", description: "0-100 scale" },
            material_palette: { type: "string", description: "e.g. Reclaimed Victorian Oak, Aged Brass, Terrazzo" },
            material_verdict: { type: "string", description: "e.g. Authentic Heritage — Zero Faux Decor" }
          }
        },
        crowd_archetype: {
          type: "object",
          properties: {
            primary: { type: "string" },
            social_density: { type: "string" },
            dress_code: { type: "string" },
            local_ratio: { type: "integer", description: "Percentage of locals (0-100), e.g. 82" },
            tourist_ratio: { type: "integer", description: "Percentage of travelers/tourists (0-100), e.g. 18" },
            energy_verdict: { type: "string", description: "e.g. High Banter & Neighborhood Sanctuary" },
            tourist_trap_verdict: { type: "string", description: "e.g. Authentic Local Magnet — Zero Tourist Trap" }
          },
          required: ["primary", "social_density", "dress_code"]
        },
        lighting_and_sensory: {
          type: "object",
          properties: {
            atmosphere: { type: "string" },
            lighting_temperature: { type: "string", description: "e.g. 2200K Warm Filament Amber, Subterranean Neon, Golden Hour Sunlight" },
            sensory_intensity: { type: "string" }
          },
          required: ["atmosphere", "sensory_intensity"]
        },
        temporal_dynamics: {
          type: "object",
          properties: {
            best_time_to_visit: { type: "string", description: "e.g. 4:30 PM for fireside relaxation; 8:30 PM for peak atmospheric buzz" },
            peak_atmospheric_window: { type: "string", description: "e.g. Late Afternoon Golden Hour" },
            diurnal_rhythm: {
              type: "object",
              properties: {
                working: {
                  type: "object",
                  properties: {
                    window: { type: "string" },
                    focus: { type: "string" },
                    score: { type: "number" }
                  }
                },
                chilling: {
                  type: "object",
                  properties: {
                    window: { type: "string" },
                    focus: { type: "string" },
                    score: { type: "number" }
                  }
                },
                playing: {
                  type: "object",
                  properties: {
                    window: { type: "string" },
                    focus: { type: "string" },
                    score: { type: "number" }
                  }
                }
              }
            },
            content_readiness: {
              type: "object",
              properties: {
                score: { type: "number" },
                verdict: { type: "string" },
                flattery_note: { type: "string" },
                top_creator_spot: { type: "string" },
                aesthetic_subculture: { type: "string" }
              }
            }
          }
        },
        hyper_local_proximity: {
          type: "object",
          properties: {
            key_anchors: { type: "array", items: { type: "string" } },
            insider_lore: { type: "string" }
          },
          required: ["key_anchors", "insider_lore"]
        },
        insider_secrets: {
          type: "object",
          properties: {
            secret_title: { type: "string", description: "e.g. The Off-Menu Highball / The Hidden Courtyard Passage" },
            secret_lore: { type: "string", description: "Actionable insider tip or hidden perk known only to locals" },
            off_menu_perk: { type: "string", description: "e.g. Order the off-menu botanical highball at the bar" },
            insider_badge: { type: "string", description: "e.g. Concierge & Local Regular Lore" }
          }
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
        before_merchandising_score: { type: "integer", description: "Current visual sequence score on a 0-100 scale (typically 35-55 due to commodity flaws)" },
        after_merchandising_score: { type: "integer", description: "Optimized visual sequence score on a 0-100 scale (typically 90-98)" },
        projected_conversion_uplift: { type: "string", description: "Projected OTA conversion uplift e.g. '+18.5%'" },
        current_drop_off_flaw: { type: "string" },
        conversion_diagnosis: { type: "string" },
        key_strategic_shifts: {
          type: "array",
          items: { type: "string" },
          description: "Exactly 3-4 concise, high-impact bullet points detailing what is changing, explicitly connecting the hotel's DNA with neighborhood search demand"
        },
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
              bullet_points: {
                type: "array",
                items: { type: "string" },
                description: "2 to 3 concise, punchy bullet points justifying this specific photo: (1) Visual Upgrade Rationale (if bringing in a new asset, explain precisely why it is better than the existing photo in composition/lighting/mood), (2) Alignment with local neighborhood search demand, (3) Psychological conversion trigger"
              },
              upgrade_rationale: {
                type: "string",
                description: "If bringing in a new photo or upgrading an existing OTA photo, a direct 1-2 sentence explanation of why this photo is visually and psychologically superior (e.g. architectural symmetry, ambient lighting, warmth, depth vs. clinical/distorted angles)"
              },
              local_vibe_connection: { 
                type: "string", 
                description: "Explicit connection showing how this photo matches what travelers search for in this specific neighborhood" 
              },
              psychological_conversion_trigger: { type: "string", description: "Why this reordering triggers booking intent by bridging hotel DNA with local neighborhood demand" }
            },
            required: ["slot", "category", "source_type", "source_index", "photo_subject", "bullet_points", "psychological_conversion_trigger"]
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
        },
        photographic_gap_analysis: {
          type: "array",
          items: {
            type: "object",
            properties: {
              missing_shot_title: { type: "string", description: "Name of missing shot e.g. 'Twilight Cocktail Hour on Matador Terrace'" },
              category: { type: "string", description: "Category e.g. 'CULINARY_SOCIAL', 'ATMOSPHERIC_TWILIGHT', 'CREATOR_BATHROOM'" },
              why_needed: { type: "string", description: "Why this shot is currently missing from all channels and what traveler intent it captures" },
              recommended_framing_and_lighting: { type: "string", description: "Specific composition, angle, photometrics e.g. '2400K warm eye-level glow, diffused fill, glassware reflection'" },
              projected_adr_impact: { type: "string", description: "Expected impact on direct booking and ADR e.g. '+8% higher suite booking velocity'" }
            },
            required: ["missing_shot_title", "category", "why_needed", "recommended_framing_and_lighting"]
          },
          description: "2 to 3 high-impact photographic gaps: specific photos the property does NOT currently have on any official channel or OTA, but should commission to capture unmet traveler search demand"
        }
      },
      required: ["channel", "before_merchandising_score", "after_merchandising_score", "projected_conversion_uplift", "current_drop_off_flaw", "key_strategic_shifts", "optimal_5_photo_sequence", "anti_commodity_copy_rewrite", "photographic_gap_analysis"]
    }
  },
  required: ["venue_id", "venue_name", "location", "vibe_signature", "interactive_quiz_challenge", "ota_conversion_audit"]
};
