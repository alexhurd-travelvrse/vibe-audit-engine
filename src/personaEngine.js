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

export async function auditDiscoverability(propertyName, city, categories) {
    console.log(`[Agent B] Requesting Vibe Audit for ${propertyName} in ${city}...`);
    
    // Prepare the top categories payload
    const topCategories = Object.entries(categories || {}).slice(0, 3).map(([categoryName, data]) => {
        const topVibe = data.Top3Vibes?.[0];
        return {
            categoryName,
            vibeName: topVibe?.vibeName || categoryName,
            keywords: topVibe?.semanticKeywords || [topVibe?.vibeName],
            topVenueName: data.TopLocalVenue?.name
        };
    });

    const response = await fetch('/api/hotel-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hotelName: propertyName, city, topCategories })
    });

    if (!response.ok) {
        throw new Error(`Audit API returned ${response.status}: ${await response.text()}`);
    }

    return await response.json();
}

export function generatePropulsionQuest(auditResults, propertyName, reward) {
    return { title: "Vibe Quest", description: "Optimize local SEO." };
}
