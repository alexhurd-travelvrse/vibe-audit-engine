const fs = require('fs');
let code = fs.readFileSync('src/services/geminiService.mjs', 'utf8');

const gapPrompt = `
PHOTOGRAPHIC GAP ANALYSIS (CREATIVE COMMISSIONING SCOPE):
In addition to reordering and upgrading existing official visual assets into the optimal 5-photo sequence, analyze what high-conversion photographic assets are CURRENTLY MISSING from the hotel's entire visual ecosystem (official brand channels, TripAdvisor, and OTAs).
Identify 2 to 3 missing shots that the hotel should ideally shoot/commission to capture high-value unmet guest search demand:
- missing_shot_title: Name of the missing shot (e.g. 'Twilight Golden Hour Aperitivo at Poolside Terrace', 'Creator-Friendly Master Bath Soaking Tub with Natural Morning Sunlight', 'Late-Night Hi-Fi Listening Nook & Mixology Pour').
- category: Category ('CULINARY_SOCIAL', 'ATMOSPHERIC_TWILIGHT', 'CREATOR_BATHROOM', 'SANCTUARY_SPA', 'ARRIVALS_ARCHITECTURE').
- why_needed: Detail the exact traveler hesitation or unmet search intent this shot resolves.
- recommended_framing_and_lighting: Specific creative direction (camera angle, focal length, color temperature e.g. '2400K warm twilight glow, 35mm f/1.8 shallow depth with crisp glassware reflections and natural guest conversation').
- projected_adr_impact: Projected revenue impact (e.g. '+12% direct suite booking conversion and +$45 ADR premium').
`;

if (!code.includes('PHOTOGRAPHIC GAP ANALYSIS (CREATIVE COMMISSIONING SCOPE)')) {
  code = code.replace('MULTIDIMENSIONAL SENSORY & ATMOSPHERIC CALIBRATION:', gapPrompt.trim() + '\n\nMULTIDIMENSIONAL SENSORY & ATMOSPHERIC CALIBRATION:');
}

const fallbackGapCode = `
      photographic_gap_analysis: [
        {
          missing_shot_title: isMiami 
            ? "Twilight Golden Hour Aperitivo at Poolside Cabana"
            : (isLondon ? "Blue Hour Thames Riverfront Skyline from 12th Knot Terrace" : "Golden Hour Courtyard Drinks with Ambient Filament Lighting"),
          category: "ATMOSPHERIC_TWILIGHT",
          why_needed: "Current official assets lack blue-hour and golden-hour hospitality lifestyle framing, failing to capture travelers seeking romantic evening social buzz.",
          recommended_framing_and_lighting: "2400K warm ambient glow, diffused sidelight, 35mm f/1.8 shallow depth with crisp glassware reflections and natural guest conversation.",
          projected_adr_impact: "+14% higher evening dining and suite booking conversion"
        },
        {
          missing_shot_title: "Curated Master Bath Soaking Tub with Natural Morning Light & Botanical Rituals",
          category: "CREATOR_BATHROOM",
          why_needed: "Existing bathroom imagery is wide and clinical; lacks intimate sensory luxury and natural window illumination required to convert high-ADR wellness travelers.",
          recommended_framing_and_lighting: "5000K soft morning sunlight spilling across freestanding soaking tub, linen towels, organic botanicals, and textured stone.",
          projected_adr_impact: "+$55-$85 ADR premium on signature suite bookings"
        },
        {
          missing_shot_title: isMiami 
            ? "Art Deco Architectural Detail & Sconces at Dusk" 
            : "Artisanal Cocktail Pour & Custom Millwork at Speakeasy Bar",
          category: "CULINARY_SOCIAL",
          why_needed: "Missing close-range tactile craft and mixology artistry that differentiates authentic boutique culture from corporate chain hotels.",
          recommended_framing_and_lighting: "Macro 50mm, 2200K warm filament backlight, hand-carved ice clarity and artisanal spirit pour.",
          projected_adr_impact: "+9% social traveler engagement and on-site F&B capture"
        }
      ],
`;

if (!code.includes('missing_shot_title: isMiami')) {
  code = code.replace('optimal_5_photo_sequence: optimalSequence,', 'optimal_5_photo_sequence: optimalSequence,\n' + fallbackGapCode.trim());
}

fs.writeFileSync('src/services/geminiService.mjs', code, 'utf8');
console.log('Successfully updated src/services/geminiService.mjs');
