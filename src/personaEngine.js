import VIBE_CACHE from './engine/vibeCache.json' with { type: 'json' };

const ENGINE_VERSION = "v8.1-ALIGNMENT"; 

export const VIBE_METHODOLOGY = {
  PLACES_BASE: 20,
  PLACES_RATING_MAX: 15,
  SOCIAL_LEVELS: { 1: 25, 2: 45, 3: 65 },
  AUTHORITY_WEIGHT: 20,
  TOTAL_MAX: 120
};

export const VIBE_TAXONOMY = [
  { id: "CULINARY", label: "Culinary" },
  { id: "WELLNESS", label: "Wellness" },
  { id: "CULTURE", label: "Culture" },
  { id: "ADVENTURE", label: "Adventure" },
  { id: "NIGHTLIFE", label: "Nightlife" },
  { id: "RETAIL", label: "Retail" },
  { id: "TOURS", label: "Tours" },
  { id: "AMBIENT", label: "Core Vibe" }
];

export async function scrapeLocalSignals(city, neighborhood) {
  const targetArea = neighborhood.trim();
  console.log(`[Agent A] Running v8.1 Alignment (Local vs Extended)...`);

  const localVenues = VIBE_CACHE[targetArea] || [];
  const expansionVenues = VIBE_CACHE["Waterloo"] || VIBE_CACHE["Indre By"] || []; // Expanded Context
  
  function scoreVenue(v) {
    let score = 0;
    const rating = 4.8;
    score += VIBE_METHODOLOGY.PLACES_BASE + (rating / 5) * VIBE_METHODOLOGY.PLACES_RATING_MAX;
    score += VIBE_METHODOLOGY.SOCIAL_LEVELS[3];
    score += VIBE_METHODOLOGY.AUTHORITY_WEIGHT;
    return { ...v, score: Math.round(score), rating };
  }

  const scoredLocal = localVenues.map(scoreVenue);
  const scoredExpansion = expansionVenues.map(scoreVenue);

  return { 
    city, neighborhood: targetArea, engineVersion: ENGINE_VERSION,
    topExperiences: scoredLocal.sort((a, b) => b.score - a.score).slice(0, 10),
    sectorHeatmap: VIBE_TAXONOMY.map(cat => ({
      id: cat.id, label: cat.label,
      local: scoredLocal.find(r => r.id === cat.id) || { name: "Low Signal", score: 0 },
      expansion: scoredExpansion.find(r => r.id === cat.id) || { name: "Low Signal", score: 0 }
    }))
  };
}

export async function auditDiscoverability(url, experiences, sweeteners = []) { return []; }
export function generatePropulsionQuest(auditResults, propertyName, reward) { return {}; }
