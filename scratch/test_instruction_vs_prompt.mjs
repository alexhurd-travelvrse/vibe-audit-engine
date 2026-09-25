import * as dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function testPromptInContents() {
  console.log('Testing generateContent with single combined prompt string...');
  const t0 = Date.now();
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: { 
      responseMimeType: 'application/json',
      temperature: 0.2
    }
  });

  const prompt = `Synthesize Vibe Manifest for The Plymouth Hotel Miami Beach.
Return valid JSON with:
{
  "venue_id": "the_plymouth_hotel_miami",
  "venue_name": "The Plymouth Hotel",
  "location": "South Beach, Miami Beach",
  "vibe_signature": {
    "energy_score": 88,
    "social_pacing": "High-Paced Social Vibrancy & Poolside Lounging",
    "headline": "Art Deco poolside sanctuary where 1940s glamour meets vibrant contemporary mixology.",
    "acoustic_dna": {
      "soundscape_genre": "Deep Tropical House, Bossa Nova",
      "anchor_artists": ["Poolside", "Sofi Tukker", "Kaytranada"],
      "spotify_query": "South Beach Poolside Lounge",
      "sound_texture": "Warm acoustic resonance",
      "decibel_level": "64 dB",
      "conversation_clarity_score": 86,
      "conversation_verdict": "Effortless Social Banter"
    },
    "authenticity_and_materials": {
      "authenticity_score": 94,
      "material_palette": "Original 1940s terrazzo, curved Art Moderne plaster, coral stone, brass",
      "material_verdict": "Authentic Art Moderne Heritage"
    },
    "crowd_archetype": {
      "primary": "Design-conscious creatives & international tastemakers",
      "social_density": "Curated & High-Velocity",
      "dress_code": "Miami Chic",
      "local_ratio": 68,
      "tourist_ratio": 32,
      "energy_verdict": "Sunlit Social Magnet",
      "tourist_trap_verdict": "Authentic Local Magnet"
    }
  },
  "ota_conversion_audit": {
    "before_merchandising_score": 42,
    "after_merchandising_score": 96,
    "projected_conversion_uplift": "+21.4%",
    "current_drop_off_flaw": "Buries pool and signature dining behind standard rooms",
    "conversion_diagnosis": "Travelers abandon listing due to commodity bedroom lead",
    "key_strategic_shifts": [
      "Shift 1: Elevate Iconic Courtyard Pool to Slot #1",
      "Shift 2: Ground Art Deco street facade in Slot #2",
      "Shift 3: Showcase stylish king suite in Slot #3",
      "Shift 4: Feature Blue Ribbon Sushi in Slot #4",
      "Shift 5: Validate luxury soaking tub bathroom in Slot #5"
    ],
    "optimal_5_photo_sequence": [
      {
        "slot": 1,
        "category": "HERO_CULTURAL_MAGNET",
        "photo_subject": "Iconic Art Deco Courtyard Pool & Sanctuary Loungers",
        "action": "HERO_CULTURAL_MAGNET",
        "action_label": "⚡ HERO CULTURAL MAGNET: ICONIC ART DECO POOL (SLOT #1)"
      },
      {
        "slot": 2,
        "category": "EXTERIOR_LANDMARK",
        "photo_subject": "Historic Art Deco Architectural Facade and Street Presence",
        "action": "MOVE",
        "action_label": "EXTERIOR LANDMARK (SLOT #2 - MANDATORY GROUNDING)"
      },
      {
        "slot": 3,
        "category": "SIGNATURE_SUITE_BEDROOM",
        "photo_subject": "Most Stylish Signature King Suite with Mid-Century Decor",
        "action": "RETAIN",
        "action_label": "SIGNATURE SUITE (SLOT #3 - PRIVATE SANCTUARY)"
      },
      {
        "slot": 4,
        "category": "SOCIAL_FB_ROOFTOP",
        "photo_subject": "Blue Ribbon Sushi Bar & Grill Dining Room",
        "action": "PROMOTE",
        "action_label": "DESTINATION DINING & BAR (SLOT #4)"
      },
      {
        "slot": 5,
        "category": "SECONDARY_ROOM_BATHROOM",
        "photo_subject": "Luxury Bathroom with Freestanding Soaking Tub & Rainfall Shower",
        "action": "SWAP_IN",
        "action_label": "LUXURY BATHROOM (SLOT #5 - HYGIENE PROOF)"
      }
    ]
  }
}`;

  const res = await model.generateContent(prompt);
  console.log(`Success in ${Date.now() - t0}ms! Length: ${res.response.text().length}`);
}

testPromptInContents();
