import * as dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { masterVibeSchema } from '../schemas/masterVibeSchema.mjs';

dotenv.config();

const getApiKey = () => process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

export async function runStructuredVibeAudit(hotelName, city, venueCorpus, livePhotos = [], amenityPhotos = [], neighborhood = '') {
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

  const locationLabel = neighborhood && neighborhood.trim() ? `${neighborhood.trim()}, ${city}` : city;
  const systemPrompt = `You are the Lead Hospitality Brand Strategist and Visual Merchandising Architect for Vibe Audit.
Your task is to analyze live real-world venue data (reviews, editorial critique, places metadata) and ACTUAL LIVE BOOKING.COM PHOTOS + SIGNATURE AMENITY ASSETS for "${hotelName}" in "${locationLabel}" to synthesize a complete Master Vibe Audit payload.

CRITICAL VISUAL MERCHANDISING & LOCAL VIBE RESONANCE RULES:
You have been provided with the actual images for "CURRENT LIVE BOOKING.COM PHOTOS" (numbered #1, #2, #3...) and "SIGNATURE AMENITY ASSETS" (numbered #1, #2...).

LOCAL VIBE SYNERGY PRINCIPLE:
78% of modern travelers search for neighborhood subcultures (e.g. Craft Gastronomy, Speakeasy Cocktails, Underground Art, Thermal Wellness) FIRST before deciding where to stay.
Your recommendations must NOT just describe the hotel internally — they must explicitly BRIDGE THE HOTEL DNA WITH THE SURROUNDING NEIGHBORHOOD GRAVITY:
- If the neighborhood's #1 demand driver is Culinary/Mixology (e.g. Soho, Meatpacking, Indre By), actively prioritize the hotel's signature cocktail bar or restaurant in Slot #2 to capture that local search demand.
- In "local_vibe_synergy_context", explain how the neighborhood's cultural momentum dictates this visual reordering.
- In each slot's "local_vibe_connection" and "psychological_conversion_trigger", explicitly explain how that specific photo fulfills what travelers are seeking when visiting this specific neighborhood.

THE 5 RECOMMENDED SLOTS:
1. Slot #1 (EXTERIOR_LANDMARK):
   - MUST depict the hotel's authentic exterior facade, building landmark, courtyard, or street entrance.
   - Visually scan live photos. If an exterior exists (e.g. Live Photo #13), set "source_type": "LIVE_PHOTO", "source_index": 13, "action": "PROMOTE", "action_label": "PROMOTE EXTERIOR HERO (FROM SLOT #13)".
   - Local Vibe Connection: Establishes immediate physical grounding in the neighborhood streetscape.

2. Slot #2 (SOCIAL_FB_ROOFTOP / CULINARY & MIXOLOGY):
   - MUST depict the signature social anchor: cocktail bar (e.g. Boilerman Bar, Lyaness, 12th Knot), rooftop lounge, or destination restaurant.
   - Set "source_type": "AMENITY_ASSET" (or "LIVE_PHOTO"), "source_index": [index], "action": "SWAP_IN", "action_label": "SWAP IN [VENUE NAME] (SLOT #2)".
   - Local Vibe Connection: Validates the hotel's cultural relevance to travelers seeking the neighborhood's top food and nightlife subcultures.

3. Slot #3 (SIGNATURE_SUITE_BEDROOM):
   - MUST depict the most stylish signature guest room / master king bed / suite with local character.
   - Select from LIVE PHOTOS. Set "source_type": "LIVE_PHOTO", "source_index": [index], "action": "KEEP" or "RETAIN".

4. Slot #4 (WELLNESS_SPA_LOBBY / TEXTURE):
   - MUST depict the iconic arrival lobby, vinyl library/lounge, art centerpiece, or wellness spa.
   - If the hotel's famous lobby/lounge was originally Live Photo #1 (or another slot), re-sequence it here! Set "source_type": "LIVE_PHOTO", "source_index": 1, "action": "RE_SEQUENCE", "action_label": "MOVE LOBBY LOUNGE (FROM SLOT #1)".
   - Local Vibe Connection: Proves the hotel's interior vibe reflects the neighborhood's creative texture.

5. Slot #5 (SECONDARY_ROOM_BATHROOM):
   - MUST depict a distinctive secondary bedroom or stylish design bathroom.
   - Select from LIVE PHOTOS. Set "source_type": "LIVE_PHOTO", "source_index": [index], "action": "KEEP" or "RETAIN".

ANTI-DUPLICATION COMPLIANCE:
- NEVER recommend 3 or 4 generic repetitive bedrooms.
- Ensure the 5 slots strictly follow: 1) Exterior Hero -> 2) Social F&B/Bar -> 3) Signature Suite -> 4) Iconic Lobby/Spa -> 5) Secondary Room/Bathroom.`;

  const userPrompt = `VENUE: ${hotelName} (${city})
TIMESTAMP: ${new Date().toISOString()}

LIVE VENUE INTELLIGENCE CORPUS:
${venueCorpus}

Synthesize this live data and return the complete Master Vibe Audit JSON payload matching the schema exactly.`;

  console.log(`[Gemini] Preparing multimodal extraction request for ${hotelName}...`);
  const parts = [{ text: systemPrompt }];

  // Helper for parallel image fetching
  const downloadImageBase64 = async (url) => {
    try {
      const resp = await fetch(url, { signal: AbortSignal.timeout(3500) });
      if (resp.ok) {
        const buffer = await resp.arrayBuffer();
        return Buffer.from(buffer).toString('base64');
      }
    } catch (err) {
      // Quiet timeout
    }
    return null;
  };

  // 1. Concurrently fetch and attach Live Booking.com Photos
  if (livePhotos && livePhotos.length > 0) {
    const liveSubset = livePhotos.slice(0, 18);
    const downloadedLive = await Promise.all(
      liveSubset.map(p => downloadImageBase64(p.imageUrl))
    );

    parts.push({ text: `\n=== CURRENT LIVE BOOKING.COM PHOTOS (TOTAL ${liveSubset.length} PHOTOS) ===\n` });
    downloadedLive.forEach((base64, i) => {
      const p = liveSubset[i];
      const slotNum = p.slot || (i + 1);
      if (base64) {
        parts.push({ text: `\n[CURRENT LIVE PHOTO #${slotNum} (Title: "${p.title || ''}")]:` });
        parts.push({ inlineData: { data: base64, mimeType: 'image/jpeg' } });
      }
    });
  }

  // 2. Concurrently fetch and attach Signature Amenity Candidate Photos
  if (amenityPhotos && amenityPhotos.length > 0) {
    const amenitySubset = amenityPhotos.slice(0, 8);
    const downloadedAmenity = await Promise.all(
      amenitySubset.map(a => downloadImageBase64(a.imageUrl))
    );

    parts.push({ text: `\n=== SIGNATURE AMENITY & VENUE ASSETS (CANDIDATES FOR SWAPPING IN) ===\n` });
    downloadedAmenity.forEach((base64, i) => {
      const a = amenitySubset[i];
      if (base64) {
        parts.push({ text: `\n[SIGNATURE AMENITY ASSET #${i + 1} (Title: "${a.title || 'Amenity'}")]:` });
        parts.push({ inlineData: { data: base64, mimeType: 'image/jpeg' } });
      }
    });
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
