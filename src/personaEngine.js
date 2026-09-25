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
  
  const params = new URLSearchParams({ city, neighborhood });
  const response = await fetch(`/api/audit?${params.toString()}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
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

export async function auditDiscoverability(propertyName, city, categories, propertyUrl, instagramUrl, neighborhood = '') {
    console.log(`[Agent B] Requesting Vibe Audit for ${propertyName} in ${neighborhood ? `${neighborhood}, ` : ''}${city}...`);
    
    // Prepare the top categories payload
    const topCategories = Object.entries(categories || {}).slice(0, 6).map(([categoryName, data]) => {
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
        body: JSON.stringify({ hotelName: propertyName, city, neighborhood, topCategories, propertyUrl, instagramUrl })
    });

    if (!response.ok) {
        throw new Error(`Audit API returned ${response.status}: ${await response.text()}`);
    }

    return await response.json();
}

export function generatePropulsionQuest(auditResults, propertyName, reward) {
    return { title: "Vibe Quest", description: "Optimize local SEO." };
}

export async function fetchMasterVibeAudit(hotelName, city, neighborhood) {
  console.log(`[Master Vibe] Fetching comprehensive vibe manifest for ${hotelName} in ${city}...`);
  const response = await fetch('/api/master-vibe-audit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hotelName, city, neighborhood })
  });
  if (!response.ok) {
    throw new Error(`Master Vibe Audit API returned ${response.status}: ${await response.text()}`);
  }
  return await response.json();
}

export async function fetchMasterVibeAuditManifest(hotelName, city, neighborhood) {
  console.log(`[Master Vibe Phase 1] Fetching instant vibe manifest & strategy text for ${hotelName} in ${city}...`);
  const response = await fetch('/api/master-vibe-audit?phase=1', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hotelName, city, neighborhood, phase: 1 })
  });
  if (!response.ok) {
    throw new Error(`Master Vibe Manifest API returned ${response.status}: ${await response.text()}`);
  }
  return await response.json();
}

export async function lookupHotelCandidates(hotelName, city, neighborhood = '') {
  console.log(`[Candidate Lookup] Checking property matches for "${hotelName}" in "${city}"...`);
  const response = await fetch('/api/lookup-hotel-candidates', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hotelName, city, neighborhood })
  });
  if (!response.ok) {
    console.warn(`[Candidate Lookup] API returned ${response.status}`);
    return { status: 'none', candidates: [] };
  }
  return await response.json();
}

export async function fetchMasterVibeAuditPhotos(hotelName, city, neighborhood, strategySlots = null, signal = null, bookingUrl = null) {
  console.log(`[Master Vibe Phase 2] Resolving and verifying visual photo assets for ${hotelName}...`);
  const response = await fetch('/api/resolve-audit-photos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hotelName, city, neighborhood, strategySlots, bookingUrl }),
    signal: signal || undefined
  });
  if (!response.ok) {
    throw new Error(`Photo Resolution API returned ${response.status}: ${await response.text()}`);
  }
  return await response.json();
}

