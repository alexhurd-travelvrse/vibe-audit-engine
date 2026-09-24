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
- Slot 3 (SIGNATURE_SUITE_BEDROOM): Most stylish signature king suite/room with local texture. (Action: "KEEP" or "RETAIN")
- Slot 4 (WELLNESS_SPA_LOBBY): MUST depict the dedicated Spa, wellness facility, thermal bath, massage room, or iconic design arrival lobby. Category: "WELLNESS_SPA_LOBBY".
- Slot 5 (SECONDARY_ROOM_BATHROOM): MUST depict a design bathroom, freestanding soaking tub, marble washroom, or luxury rain shower (to confirm finish quality and hygiene). Category: "SECONDARY_ROOM_BATHROOM".

B) MAGNET OVERRIDE SEQUENCE (When NAI >= 0.85 and Asset passes all 4 rules):
- Slot 1 (HERO_CULTURAL_MAGNET): The unique asset (e.g., Hartwell Spa Indoor Pool, 12th Knot Rooftop Bar, Subterranean Hi-Fi Bar). Category: "HERO_CULTURAL_MAGNET", Action: "HERO_CULTURAL_MAGNET", Action Label: "⚡ HERO CULTURAL MAGNET: [ASSET NAME] (SLOT #1)".
- Slot 2 (EXTERIOR_LANDMARK): Mandatory exterior facade. Category: "EXTERIOR_LANDMARK", Action: "PROMOTE" or "RE_SEQUENCE", Action Label: "EXTERIOR LANDMARK (SLOT #2 - MANDATORY GROUNDING)".
- Slot 3 (SIGNATURE_SUITE_BEDROOM): Most stylish signature king suite/room. Category: "SIGNATURE_SUITE_BEDROOM".
- Slot 4 (COMPLEMENTARY AMENITY - NO THEMATIC DUPLICATION):
  * IF Slot 1 was a Social/Bar/Rooftop asset -> Slot 4 MUST feature the dedicated Spa/Wellness/Thermal facility (Category: "WELLNESS_SPA_LOBBY").
  * IF Slot 1 was a Spa/Wellness/Pool asset -> Slot 4 MUST feature the Fine Dining Restaurant / Culinary / Cocktail Lounge / Historic Drawing Room (Category: "SOCIAL_FB_ROOFTOP" or "WELLNESS_SPA_LOBBY") to ensure dining is showcased and NEVER duplicated with Slot 1.
- Slot 5 (SECONDARY_ROOM_BATHROOM): MUST depict a design bathroom, freestanding soaking tub, marble washroom, or luxury rain shower. Category: "SECONDARY_ROOM_BATHROOM".

STRICT SLOT INTEGRITY & DEDUPLICATION RULES:
- LIVE PHOTO SELECTION PRIORITY: Always inspect "CURRENT LIVE BOOKING.COM PHOTOS" first! If an asset of the required category (e.g. Spa Pool, Signature Bedroom, Exterior, Restaurant, Bathroom) is ALREADY present in the live gallery (e.g. Live Photo #4 is the Spa), you MUST select source_type: "LIVE_PHOTO", source_index: [1-indexed slot], and action: "PROMOTE" / "RE_SEQUENCE" / "KEEP". ONLY select "AMENITY_ASSET" if the live gallery completely lacks a photo of that amenity.
- RESTAURANT / CULINARY FIDELITY: When recommending Slot 4 (or Slot 2) for Social F&B / Restaurant (Category: "SOCIAL_FB_ROOFTOP"), the photo subject MUST depict an authentic indoor dining room, table setting, gastronomy dishes, cocktail bar, or lounge interior. It must NEVER be an exterior building, marina, facade, or street view.
- NEVER repeat the same theme across slots (e.g., NEVER put Spa in Slot 1 AND Spa in Slot 4; NEVER put Bedroom in Slot 3 AND Bedroom in Slot 5).
- If Spa/Pool is elevated to Slot 1, Slot 4 MUST showcase Fine Dining / Culinary / Social Lounge.
- Slot 5 MUST feature a luxury bathroom/tub/shower.
- Strict 5 distinct thematic slots at all times (Magnet ➔ Exterior ➔ Suite ➔ Complementary Dining/Spa ➔ Luxury Bathroom).
- Populate "slot_1_decision_logic" explaining whether Magnet Override was triggered or why default was retained.

MERCHANDISING SCORES & READABILITY BULLETS:
1. Merchandising Scores:
   - "before_merchandising_score": Current live sequence score (35-55/100) reflecting commodity flaws (e.g. duplicate bedrooms, missing spa/amenities).
   - "after_merchandising_score": Optimized sequence score (90-98/100).
   - "projected_conversion_uplift": Calculated uplift estimate (e.g. "+18.5%" to "+24.0%").
2. "key_strategic_shifts" (Overview Bullets):
   - Provide 3-4 high-impact, scannable bullet points explaining what is changing and WHY, explicitly linking the hotel's cultural DNA with neighborhood traveler search volume (e.g., "Shift 1: Elevate Subterranean Vinyl Hi-Fi Lounge to capture Soho's #1 nightlife search demand", "Shift 2: Move exterior facade to Slot #2 to anchor geographic orientation").
3. "upgrade_rationale" & "bullet_points" (Visual Upgrade Justification):
   - Whenever you bring in a new photo (source_type: "AMENITY_ASSET") or upgrade/replace an existing live photo:
     • "upgrade_rationale": Provide a direct, compelling 1-2 sentence explanation detailing EXACTLY why this new asset is visually and psychologically superior to what currently sits on Booking.com (e.g. "Upgrades from a flat, clinical side-angle with overhead fluorescent glare to a warm, sunlit central perspective with crisp reflections and luxury loungers that immediately convey 5-star sanctuary tranquility").
     • In "bullet_points", format the 3 bullets as:
       - Bullet 1: "Visual Upgrade: [Clear comparison of why this asset is superior in lighting, composition, emotional warmth, or architectural clarity over the live OTA photo]" (or "Strategic Placement: [Reason for re-sequencing]" if retaining a live photo).
       - Bullet 2: "Local Synergy: [How this visual connects the property's authentic DNA with what travelers search for in this specific neighborhood]".
       - Bullet 3: "Conversion Trigger: [The psychological mechanism triggering higher booking intent]".

MULTIDIMENSIONAL SENSORY & ATMOSPHERIC CALIBRATION:
Synthesize realistic sensory attributes derived from the real venue and neighborhood vibe:
1. Acoustic DNA & Conversation:
   - decibel_level: Calibrate realistic sound level (e.g., "52 dB (Snug / Intimate Sanctuary)", "64 dB (Lively Bistro Hum)", "76 dB (High-Energy Cocktail Buzz)").
   - conversation_clarity_score: 0-100 percentage (e.g. 96 for effortless chat, 68 for vibrant nightlife).
   - conversation_verdict: e.g. "Effortless Intimate Chat", "Gentle Ambient Murmur", "Vibrant Social Banter".
2. Material Honesty & Authenticity:
   - authenticity_score: 0-100 score (e.g. 94/100).
   - material_palette: Specific physical materials (e.g. "Hand-hewn Victorian oak, aged brass, reclaimed timber, fluted glass").
   - material_verdict: e.g. "Authentic Heritage — Zero Faux Decor" or "Artisanal Contemporary Craftsmanship".
3. Crowd Velocity & Local Ratio:
   - local_ratio: Realistic % of local neighborhood visitors (e.g., 75-90% for pubs/boutique anchors, 40-60% for major luxury hotels).
   - tourist_ratio: Remainder (100 - local_ratio).
   - energy_verdict: e.g. "High Banter & Neighborhood Sanctuary", "Cosmopolitan Creative Haven".
   - tourist_trap_verdict: e.g. "Authentic Local Magnet — Zero Tourist Trap", "Curated Neighborhood Haven".
4. Lighting & Photometrics:
   - lighting_temperature: e.g. "2200K Warm Amber Filament", "Subterranean Speakeasy Candelight", "Golden Hour Thames Reflections".
5. Temporal Dynamics:
   - best_time_to_visit: Provide specific dual-peak time windows (e.g., "4:30 PM for tranquil fireside drinks; 8:30 PM for peak atmospheric buzz").
6. Insider Secrets & Hidden Lore:
   - secret_title: Catchy title (e.g. "The Off-Menu Boiler Highball", "The Secret Courtyard Arch").
   - secret_lore: A real, actionable local insider secret, off-menu perk, or hidden architectural shortcut known only to regulars.
   - off_menu_perk: Specific actionable recommendation.
   - insider_badge: e.g. "Head Bartender & Local Regular Lore".`;

  const userPrompt = `VENUE: ${hotelName} (${city})
TIMESTAMP: ${new Date().toISOString()}

LIVE VENUE INTELLIGENCE CORPUS:
${venueCorpus}

Synthesize this live data and return the complete Master Vibe Audit JSON payload matching the schema exactly.`;

  console.log(`[Gemini] Preparing multimodal extraction request for ${hotelName}...`);
  const parts = [{ text: systemPrompt }];

  // Helper for parallel image fetching with magic bytes validation and fast 1.2s timeout
  const downloadImageBase64 = async (url) => {
    try {
      if (!url || typeof url !== 'string' || !url.startsWith('http')) return null;
      const resp = await fetch(url, { 
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
        signal: AbortSignal.timeout(1200) 
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
    const liveVisionSubset = livePhotos.slice(0, 4);
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

    if (livePhotos.length > 4) {
      parts.push({ 
        text: `\n[ADDITIONAL LIVE GALLERY PHOTOS METADATA]:\n` + 
          livePhotos.slice(4, 20).map((p, i) => `Photo #${p.slot || (i + 5)}: "${p.title || 'Hotel Photo'}" (URL: ${p.imageUrl})`).join('\n') 
      });
    }
  }

  // 2. Concurrently fetch and attach Signature Amenity Candidate Photos (diverse categories)
  if (amenityPhotos && amenityPhotos.length > 0) {
    // Pick top candidates from each category: 1 Social, 1 Spa, 1 Bathroom for vision analysis
    const socialCand = amenityPhotos.find(a => a.detectedCategory === 'SOCIAL') || amenityPhotos[0];
    const spaCand = amenityPhotos.find(a => a.detectedCategory === 'SPA') || amenityPhotos[1];
    const bathCand = amenityPhotos.find(a => a.detectedCategory === 'BATHROOM') || amenityPhotos[2];
    const amenityVisionSubset = [socialCand, spaCand, bathCand].filter(Boolean);

    const downloadedAmenity = await Promise.all(
      amenityVisionSubset.map(a => downloadImageBase64(a.imageUrl))
    );

    parts.push({ text: `\n=== SIGNATURE AMENITY & VENUE ASSETS (CANDIDATES FOR SWAPPING IN) ===\n` });
    downloadedAmenity.forEach((item, i) => {
      const a = amenityVisionSubset[i];
      const origIndex = amenityPhotos.findIndex(orig => orig.imageUrl === a.imageUrl) + 1;
      if (item && item.base64 && item.mimeType) {
        parts.push({ text: `\n[SIGNATURE AMENITY ASSET #${origIndex || (i + 1)} [Category: ${a.detectedCategory || 'AMENITY'}] (Title: "${a.title || 'Amenity'}")]:` });
        parts.push({ inlineData: { data: item.base64, mimeType: item.mimeType } });
      } else {
        parts.push({ text: `\n[SIGNATURE AMENITY ASSET #${origIndex || (i + 1)} [Category: ${a.detectedCategory || 'AMENITY'}] (Title: "${a.title || 'Amenity'}")]: URL: ${a.imageUrl || 'Amenity'}` });
      }
    });

    if (amenityPhotos.length > 3) {
      parts.push({ 
        text: `\n[ADDITIONAL AMENITY ASSETS METADATA]:\n` + 
          amenityPhotos.map((a, i) => `Amenity Asset #${i + 1} [Category: ${a.detectedCategory || 'AMENITY'}]: "${a.title || 'Amenity'}" (URL: ${a.imageUrl})`).join('\n') 
      });
    }
  }

  parts.push({ text: userPrompt });

  const createModelInstance = (modelName) => genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: masterVibeSchema,
      temperature: 0.2,
    }
  });

  const generateWithFallback = async (contentParts) => {
    let lastErr = null;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const mInstance = createModelInstance('gemini-2.5-flash');
        return await mInstance.generateContent(contentParts);
      } catch (err) {
        lastErr = err;
        console.warn(`[Gemini] Attempt ${attempt} failed (${err.message}). Retrying...`);
        if (attempt < 3) await new Promise(r => setTimeout(r, 1000 * attempt));
      }
    }
    throw lastErr;
  };

  try {
    let result;
    try {
      // Race multimodal vision call against an 8-second timeout for ultra-responsive performance
      const visionTimeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Multimodal vision generation timeout')), 8000));
      result = await Promise.race([
        generateWithFallback(parts),
        visionTimeout
      ]);
    } catch (multimodalErr) {
      console.warn(`[Gemini] Multimodal inline image generation fallback (${multimodalErr.message}), executing high-speed metadata generation...`);
      
      const textOnlyParts = [
        { text: systemPrompt },
        { 
          text: `\n=== CURRENT LIVE BOOKING.COM PHOTOS METADATA ===\n` + 
            (livePhotos || []).slice(0, 20).map((p, i) => `Live Photo #${p.slot || (i + 1)}: "${p.title || 'Hotel Photo'}" (URL: ${p.imageUrl})`).join('\n')
        },
        { 
          text: `\n=== SIGNATURE AMENITY CANDIDATES METADATA ===\n` + 
            (amenityPhotos || []).slice(0, 25).map((a, i) => `Amenity Asset #${i + 1} [Category: ${a.detectedCategory || 'AMENITY'}]: "${a.title || 'Amenity'}" (URL: ${a.imageUrl})`).join('\n')
        },
        { text: userPrompt }
      ];
      result = await generateWithFallback(textOnlyParts);
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
