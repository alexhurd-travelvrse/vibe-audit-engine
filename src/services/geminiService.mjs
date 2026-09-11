import * as dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { masterVibeSchema } from '../schemas/masterVibeSchema.mjs';

dotenv.config();

const getApiKey = () => process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

export async function runStructuredVibeAudit(hotelName, city, venueCorpus, livePhotos = [], amenityPhotos = []) {
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
Your task is to analyze live real-world venue data (reviews, editorial critique, places metadata) and ACTUAL LIVE BOOKING.COM PHOTOS + SIGNATURE AMENITY ASSETS for "${hotelName}" in "${city}" to synthesize a complete Master Vibe Audit payload.

CRITICAL GUIDELINES:
1. Grounding & Anti-Hallucination: Extract genuine architectural features, actual named bars/restaurants/spas, authentic neighborhood lore, and verified aesthetic details.
2. Vibe Signature:
   - energy_score: 0-100 integer reflecting social pacing and velocity.
   - acoustic_dna: 3 exact real defining artists, soundscape genre, and texture.
   - qualification_test: Punchy statements for who will love this venue and who should skip it.
3. Interactive 3D Quiz Challenge:
   - Question highlighting signature architectural design or secret history.
   - 4 distinct options (A, B, C, D) with exactly one correct option.
4. OTA Conversion & Recommended Photos Strategy (Strict Anti-Repetition & Booking.com Compliance):
   - MANDATORY ANTI-DUPLICATION RULE:
     * NEVER output 3 or 4 repetitive living rooms or bedrooms in the optimal 5-photo sequence!
     * IF the live Booking.com gallery has 3 or 4 living rooms/bedrooms, you MUST actively DEMOTE and REPLACE the duplicate rooms in Slot #2 and/or Slot #4 with signature public amenities from the amenity pool (e.g. Destination Rooftop Lounge, Cocktail Bar, Restaurant, Spa, or Iconic Lobby).
     * EXACTLY 1 to 2 slots MUST represent high-character guest rooms/suites (Slot #3: Signature Suite / King Bed, Slot #5: Secondary Bedroom or Design Bathroom) to satisfy Booking.com accommodation policies.
   - The 5 Recommended Slots Structure:
     * Slot 1: Architectural Exterior / Riverfront / Skyline Hero ("KEEP AS HERO")
     * Slot 2: Signature Social / F&B Destination (e.g. "SWAP IN 12TH KNOT ROOFTOP" or "SWAP IN COCKTAIL BAR")
     * Slot 3: Signature Suite / Master Bedroom with View ("KEEP SIGNATURE SUITE")
     * Slot 4: Wellness Spa, Curated Art, or Iconic Lobby / Arrival ("SWAP IN SPA / LOBBY")
     * Slot 5: Secondary Room or Design Bathroom ("KEEP SECONDARY ROOM / BATHROOM")
   - In optimal_5_photo_sequence:
     * For swapped amenities: set "action": "REPLACE", "action_label": "SWAP IN [AMENITY NAME] (SLOT #X)", "current_slot": null, and describe the exact amenity in "photo_subject".
     * For retained live photos: set "action": "KEEP_HERO" or "KEEP", set "current_slot": (original slot 1-5).`;

  const userPrompt = `VENUE: ${hotelName} (${city})
TIMESTAMP: ${new Date().toISOString()}

LIVE VENUE INTELLIGENCE CORPUS:
${venueCorpus}

Synthesize this live data and return the complete Master Vibe Audit JSON payload matching the schema exactly.`;

  console.log(`[Gemini] Preparing multimodal extraction request for ${hotelName}...`);
  const parts = [{ text: systemPrompt }];

  // 1. Attach Current Live Booking.com Photos
  if (livePhotos && livePhotos.length > 0) {
    parts.push({ text: `\n=== CURRENT LIVE BOOKING.COM PHOTOS (SLOTS 1 TO ${livePhotos.length}) ===\nThese are the photos currently displayed in order on the hotel's Booking.com listing:\n` });
    for (let i = 0; i < livePhotos.length; i++) {
      const p = livePhotos[i];
      const slotNum = p.slot || (i + 1);
      try {
        const resp = await fetch(p.imageUrl, { signal: AbortSignal.timeout(6000) });
        if (resp.ok) {
          const buffer = await resp.arrayBuffer();
          const base64 = Buffer.from(buffer).toString('base64');
          parts.push({ text: `\n[CURRENT LIVE SLOT #${slotNum} - "${p.title || ''}"]:` });
          parts.push({ inlineData: { data: base64, mimeType: 'image/jpeg' } });
        }
      } catch (err) {
        console.warn(`[Gemini] Could not download live photo ${slotNum}:`, err.message);
      }
    }
  }

  // 2. Attach Signature Amenity Candidate Photos (Rooftops, Bars, Spas, Lobby)
  if (amenityPhotos && amenityPhotos.length > 0) {
    parts.push({ text: `\n=== SIGNATURE AMENITY & VENUE ASSETS (CANDIDATES FOR SWAPPING IN) ===\nUse these signature public vibe spaces to replace repetitive living room/bed shots:\n` });
    for (let i = 0; i < Math.min(amenityPhotos.length, 6); i++) {
      const a = amenityPhotos[i];
      try {
        const resp = await fetch(a.imageUrl, { signal: AbortSignal.timeout(6000) });
        if (resp.ok) {
          const buffer = await resp.arrayBuffer();
          const base64 = Buffer.from(buffer).toString('base64');
          parts.push({ text: `\n[SIGNATURE AMENITY ASSET #${i + 1}: "${a.title || 'Amenity'}"]:` });
          parts.push({ inlineData: { data: base64, mimeType: 'image/jpeg' } });
        }
      } catch (err) {
        console.warn(`[Gemini] Could not download amenity photo ${i + 1}:`, err.message);
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
