const ENGINE_VERSION = "v8.2-DYNAMIC";

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
  console.log(`[Agent A] Requesting Dynamic Flipped Funnel Data for ${city} / ${neighborhood}...`);
  
  const response = await fetch('/api/audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city, neighborhood })
  });

  if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${await response.text()}`);
  }

  const cityData = await response.json();

  return {
      city,
      neighborhood: cityData.MicroLocation || neighborhood,
      engineVersion: ENGINE_VERSION,
      categories: cityData.Categories
  };
}

export async function auditDiscoverability(url, experiences, sweeteners) {
    return new Promise(resolve => setTimeout(() => resolve({ score: 85 }), 2000));
}

export function generatePropulsionQuest(auditResults, propertyName, reward) {
    return { title: "Vibe Quest", description: "Optimize local SEO." };
}
