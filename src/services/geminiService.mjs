import * as dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { masterVibeSchema } from '../schemas/masterVibeSchema.mjs';

dotenv.config();

const getApiKey = () => process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

export async function runStructuredVibeAudit(hotelName, city, venueCorpus, livePhotos = []) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY or VITE_GEMINI_API_KEY is not defined in environment variables');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: masterVibeSchema,
      temperature: 0.2,
    }
  });

  const systemPrompt = `You are the Lead Hospitality Brand Strategist and Visual Merchandising Architect for Vibe Audit Engine.
Your task is to analyze live real-world venue data (reviews, editorial critique, places metadata) and ACTUAL LIVE BOOKING.COM PHOTOS for "${hotelName}" in "${city}" to synthesize a complete, high-fidelity Master Vibe Audit payload.

CRITICAL GUIDELINES:
1. Grounding & Anti-Hallucination: Extract genuine architectural features, actual named bars/restaurants/spas, authentic neighborhood lore, and verified aesthetic details mentioned in the text or well-known about this venue.
2. Vibe Signature:
   - energy_score: 0-100 integer reflecting the velocity, nightlife, and social charge of the venue.
   - acoustic_dna: Define 3 exact real defining artists, soundscape genre, and a sound texture description.
   - qualification_test: Clear, punchy statements for who will love this venue and who should skip it.
3. Interactive 3D Quiz Challenge (for Scene 2 in the 3D Splat experience):
   - Question must highlight a real signature design element or secret historical fact of the venue.
   - Provide 4 distinct options (A, B, C, D) with exactly one correct option.
   - success_lore_reveal: 2-3 sentences explaining the full fascinating backstory when the player gets it right.
4. OTA Conversion & Live Photo Re-Sequencing Audit (Booking.com Optimization):
   - Visually inspect the provided live images currently on the hotel's Booking.com gallery.
   - In optimal_5_photo_sequence, describe the EXACT physical subject seen in each photo (e.g. "Twilight riverfront exterior showing glowing St. Paul's Cathedral", "Lyaness cocktail bar at night with Thames views", "Deluxe riverview suite with curved blue sofa").
   - Set current_slot (the original slot number 1-5 from the live listing) and slot (the new recommended slot 1-5).
   - Set action to "KEEP_HERO", "KEEP", "PROMOTE", "DEMOTE", or "REPLACE".
   - Set action_label to a clear action directive (e.g. "KEEP IN SLOT 1 (HERO)", "PROMOTE TO SLOT 3", "DEMOTE TO SLOT 10+ (BURY)").
   - Provide the specific psychological conversion trigger for why this photo belongs in that position.
   - anti_commodity_copy_rewrite: A seductive, atmospheric 150-word property overview that completely abandons commoditized hotel clichés in favor of cinematic lifestyle storytelling.
`;

  const userPrompt = `VENUE: ${hotelName} (${city})
TIMESTAMP: ${new Date().toISOString()}

LIVE VENUE INTELLIGENCE CORPUS:
${venueCorpus}

Synthesize this live data and return the complete Master Vibe Audit JSON payload matching the schema exactly.`;

  console.log(`[Gemini] Preparing multimodal extraction request for ${hotelName}...`);
  const parts = [{ text: systemPrompt }];

  // Attach live Booking.com photos as inline images if provided
  if (livePhotos && livePhotos.length > 0) {
    console.log(`[Gemini] Downloading ${livePhotos.length} live Booking.com photos for visual inspection...`);
    parts.push({ text: `\n=== ACTUAL LIVE BOOKING.COM PHOTOS (CURRENT SLOTS 1 TO ${livePhotos.length}) ===\nInspect these exact real photos to evaluate their visual energy, subject matter, and determine the optimal 5-photo re-sequencing map:\n` });
    
    for (let i = 0; i < livePhotos.length; i++) {
      const p = livePhotos[i];
      try {
        const resp = await fetch(p.imageUrl, { signal: AbortSignal.timeout(6000) });
        if (resp.ok) {
          const buffer = await resp.arrayBuffer();
          const base64 = Buffer.from(buffer).toString('base64');
          parts.push({
            inlineData: {
              data: base64,
              mimeType: 'image/jpeg'
            }
          });
          parts.push({ text: `[IMAGE DATA: Currently Live Slot #${p.slot || i + 1} on Booking.com]` });
        }
      } catch (err) {
        console.warn(`[Gemini] Could not download photo ${i + 1}:`, err.message);
      }
    }
  }

  parts.push({ text: userPrompt });

  try {
    const result = await model.generateContent(parts);

    const responseText = result.response.text();
    const parsedData = JSON.parse(responseText);
    
    if (!parsedData.venue_id) {
      parsedData.venue_id = hotelName.toLowerCase().replace(/[^a-z0-9]+/g, '_') + '_' + city.toLowerCase().replace(/[^a-z0-9]+/g, '_');
    }
    if (!parsedData.venue_name) parsedData.venue_name = hotelName;
    if (!parsedData.location) parsedData.location = city;
    if (!parsedData.audit_timestamp) parsedData.audit_timestamp = new Date().toISOString();

    console.log(`[Gemini] Successfully received and validated structured JSON with visual photo analysis.`);
    return parsedData;
  } catch (err) {
    console.error(`[Gemini] Error during generation:`, err.message);
    throw err;
  }
}
