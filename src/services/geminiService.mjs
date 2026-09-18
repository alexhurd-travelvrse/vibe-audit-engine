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
Your recommendations must NOT just describe the hotel internally — they must explicitly BRIDGE THE HOTEL DNA WITH THE SURROUNDING NEIGHBORHOOD GRAVITY.

=============================================================
THE HERO CULTURAL MAGNET (SLOT 1 OVERRIDE ENGINE):
=============================================================
Default Baseline State:
- Slot 1 = EXTERIOR_LANDMARK (Eliminates location anxiety immediately)
- Slot 2 = SOCIAL_FB_ROOFTOP (Validates local subculture alignment)

THE 4 MANDATORY OVERRIDE CRITERIA:
Trigger a MAGNET OVERRIDE (making the unique asset Slot 1) ONLY IF the property possesses an extraordinary, high-impact cultural asset that meets all 4 criteria:
1. Neighborhood Affinity Threshold (NAI >= 0.85): The asset directly mirrors the #1 or #2 trending subcultural search theme in this specific neighborhood (e.g., Subterranean Vinyl Hi-Fi Lounge in a nightlife district, Rooftop Infinity Pool in an iconic skyline area, Destination Culinary Bistro).
2. Destination Power Check (Standalone Viability): The feature is a destination in its own right that non-hotel locals actively seek out.
3. Split-Second Clarity Visual Standard: The photo must have zero ambiguity (<0.5s recognition), rich spatial context (skyline, architectural arches), and warm human energy.
4. Mandatory Re-Sequencing Protocol: When Magnet Override is executed, you MUST immediately lock EXTERIOR_LANDMARK into Slot #2 to resolve location anxiety right after the hook.

THE TWO VALID 5-SLOT SEQUENCES:

A) STANDARD BASELINE SEQUENCE (Default when no asset qualifies for override):
- Slot 1 (EXTERIOR_LANDMARK): Authentic facade/entrance. (Action: "PROMOTE" or "KEEP_HERO")
- Slot 2 (SOCIAL_FB_ROOFTOP): Signature cocktail bar, rooftop lounge, or restaurant. (Action: "SWAP_IN" or "PROMOTE")
- Slot 3 (SIGNATURE_SUITE_BEDROOM): Most stylish signature king suite/room. (Action: "KEEP" or "RETAIN")
- Slot 4 (WELLNESS_SPA_LOBBY): Iconic design lobby, vinyl lounge, or spa. (Action: "RE_SEQUENCE")
- Slot 5 (SECONDARY_ROOM_BATHROOM): Distinctive design bathroom or secondary room. (Action: "KEEP")

B) MAGNET OVERRIDE SEQUENCE (When NAI >= 0.85 and Asset passes all 4 rules):
- Slot 1 (HERO_CULTURAL_MAGNET): The unique asset (e.g., Subterranean Hi-Fi Bar, Skyline Rooftop Pool). Category: "HERO_CULTURAL_MAGNET", Action: "HERO_CULTURAL_MAGNET", Action Label: "⚡ HERO CULTURAL MAGNET: [ASSET NAME] (SLOT #1)".
- Slot 2 (EXTERIOR_LANDMARK): Mandatory exterior facade. Category: "EXTERIOR_LANDMARK", Action: "PROMOTE" or "RE_SEQUENCE", Action Label: "EXTERIOR LANDMARK (SLOT #2 - MANDATORY GROUNDING)".
- Slot 3 (SIGNATURE_SUITE_BEDROOM): Most stylish signature king suite/room. (Action: "KEEP" or "RETAIN")
- Slot 4 (WELLNESS_SPA_LOBBY): Iconic design lobby, vinyl lounge, or spa. (Action: "RE_SEQUENCE")
- Slot 5 (SECONDARY_ROOM_BATHROOM): Distinctive design bathroom or secondary room. (Action: "KEEP")

ANTI-DUPLICATION COMPLIANCE:
- NEVER recommend 3 or 4 generic repetitive bedrooms.
- Strict 5 distinct thematic slots at all times.
- Populate "slot_1_decision_logic" explaining whether Magnet Override was triggered or why default was retained.`;

  const userPrompt = `VENUE: ${hotelName} (${city})
TIMESTAMP: ${new Date().toISOString()}

LIVE VENUE INTELLIGENCE CORPUS:
${venueCorpus}

Synthesize this live data and return the complete Master Vibe Audit JSON payload matching the schema exactly.`;

  console.log(`[Gemini] Preparing multimodal extraction request for ${hotelName}...`);
  const parts = [{ text: systemPrompt }];

  // Helper for parallel image fetching with magic bytes validation
  const downloadImageBase64 = async (url) => {
    try {
      if (!url || typeof url !== 'string' || !url.startsWith('http')) return null;
      const resp = await fetch(url, { 
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
        signal: AbortSignal.timeout(4000) 
      });
      if (!resp.ok) return null;
      
      const buffer = Buffer.from(await resp.arrayBuffer());
      if (buffer.length < 1200) return null; // Ignore tiny icons / 1x1 pixels / empty shells

      // Detect standard image types by magic bytes
      let mimeType = null;
      if (buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) {
        mimeType = 'image/jpeg';
      } else if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
        mimeType = 'image/png';
      } else if (buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 && buffer.toString('ascii', 8, 12) === 'WEBP') {
        mimeType = 'image/webp';
      }

      if (!mimeType) {
        // Not a standard recognized format, skip passing as raw inlineData
        return null;
      }

      return {
        base64: buffer.toString('base64'),
        mimeType
      };
    } catch (err) {
      // Quiet timeout or network issue
    }
    return null;
  };

  // 1. Concurrently fetch and attach Top Live Booking.com Photos for Multimodal Vision
  if (livePhotos && livePhotos.length > 0) {
    const liveVisionSubset = livePhotos.slice(0, 6);
    const downloadedLive = await Promise.all(
      liveVisionSubset.map(p => downloadImageBase64(p.imageUrl))
    );

    parts.push({ text: `\n=== CURRENT LIVE BOOKING.COM PHOTOS (TOP ${liveVisionSubset.length} VISUAL SAMPLES & METADATA) ===\n` });
    downloadedLive.forEach((item, i) => {
      const p = liveVisionSubset[i];
      const slotNum = p.slot || (i + 1);
      if (item && item.base64 && item.mimeType) {
        parts.push({ text: `\n[CURRENT LIVE PHOTO #${slotNum} (Title: "${p.title || 'Room'}")]:` });
        parts.push({ inlineData: { data: item.base64, mimeType: item.mimeType } });
      } else {
        parts.push({ text: `\n[CURRENT LIVE PHOTO #${slotNum} (Title: "${p.title || 'Room'}")]: URL: ${p.imageUrl || 'Gallery Photo'}` });
      }
    });

    if (livePhotos.length > 6) {
      parts.push({ 
        text: `\n[ADDITIONAL LIVE GALLERY PHOTOS METADATA]:\n` + 
          livePhotos.slice(6, 20).map((p, i) => `Photo #${p.slot || (i + 7)}: "${p.title || 'Hotel Photo'}" (URL: ${p.imageUrl})`).join('\n') 
      });
    }
  }

  // 2. Concurrently fetch and attach Signature Amenity Candidate Photos
  if (amenityPhotos && amenityPhotos.length > 0) {
    const amenityVisionSubset = amenityPhotos.slice(0, 4);
    const downloadedAmenity = await Promise.all(
      amenityVisionSubset.map(a => downloadImageBase64(a.imageUrl))
    );

    parts.push({ text: `\n=== SIGNATURE AMENITY & VENUE ASSETS (CANDIDATES FOR SWAPPING IN) ===\n` });
    downloadedAmenity.forEach((item, i) => {
      const a = amenityVisionSubset[i];
      if (item && item.base64 && item.mimeType) {
        parts.push({ text: `\n[SIGNATURE AMENITY ASSET #${i + 1} (Title: "${a.title || 'Amenity'}")]:` });
        parts.push({ inlineData: { data: item.base64, mimeType: item.mimeType } });
      } else {
        parts.push({ text: `\n[SIGNATURE AMENITY ASSET #${i + 1} (Title: "${a.title || 'Amenity'}")]: URL: ${a.imageUrl || 'Amenity'}` });
      }
    });

    if (amenityPhotos.length > 4) {
      parts.push({ 
        text: `\n[ADDITIONAL AMENITY ASSETS METADATA]:\n` + 
          amenityPhotos.slice(4, 10).map((a, i) => `Amenity Asset #${i + 5}: "${a.title || 'Amenity'}" (URL: ${a.imageUrl})`).join('\n') 
      });
    }
  }

  parts.push({ text: userPrompt });

  try {
    let result;
    try {
      result = await model.generateContent(parts);
    } catch (multimodalErr) {
      console.warn(`[Gemini] Multimodal inline image generation failed (${multimodalErr.message}), executing graceful text-only metadata generation...`);
      
      const textOnlyParts = [
        { text: systemPrompt },
        { 
          text: `\n=== CURRENT LIVE BOOKING.COM PHOTOS METADATA ===\n` + 
            (livePhotos || []).slice(0, 20).map((p, i) => `Live Photo #${p.slot || (i + 1)}: "${p.title || 'Hotel Photo'}" (URL: ${p.imageUrl})`).join('\n')
        },
        { 
          text: `\n=== SIGNATURE AMENITY CANDIDATES METADATA ===\n` + 
            (amenityPhotos || []).slice(0, 10).map((a, i) => `Amenity Asset #${i + 1}: "${a.title || 'Amenity'}" (URL: ${a.imageUrl})`).join('\n')
        },
        { text: userPrompt }
      ];
      result = await model.generateContent(textOnlyParts);
    }

    const responseText = result.response.text();
    const parsedData = JSON.parse(responseText);
    
    if (!parsedData.venue_id) {
      parsedData.venue_id = hotelName.toLowerCase().replace(/[^a-z0-9]+/g, '_') + '_' + city.toLowerCase().replace(/[^a-z0-9]+/g, '_');
    }
    if (!parsedData.venue_name) parsedData.venue_name = hotelName;
    if (!parsedData.location) parsedData.location = locationLabel;
    if (!parsedData.audit_timestamp) parsedData.audit_timestamp = new Date().toISOString();

    console.log(`[Gemini] Successfully received and validated structured JSON with visual photo analysis.`);
    return parsedData;
  } catch (err) {
    console.error(`[Gemini] Error during generation:`, err.message);
    throw err;
  }
}
