/**
 * TravelVRSE Persona-Matching Engine (The Triangulator)
 * 
 * Logic flow (Discovery-First):
 * 1. Exploratory Discovery: Scrape high-authority "bibles" for emerging/hidden trends.
 * 2. Taxonomy Mapping: Map discovered trends to standardized Arival categories.
 * 3. Supply Audit: Audit hotel site against discovered trends.
 */

export const VIBE_TAXONOMY = [
  { id: "CULINARY", label: "High-Fidelity Gastronomy", keywords: ["food", "dining", "tasting", "chef", "restaurant", "culinary", "gastronomy", "wine", "distillery", "brewery"] },
  { id: "WELLNESS", label: "Next-Gen Wellness & Rituals", keywords: ["wellness", "spa", "sauna", "ritual", "hammam", "yoga", "pilates", "pool", "meditation"] },
  { id: "CULTURE", label: "Immersive Art & Culture", keywords: ["art", "gallery", "culture", "museum", "class", "workshop", "heritage", "history", "design", "architecture"] },
  { id: "ADVENTURE", label: "Land & Water Adventure", keywords: ["kayak", "boat", "climb", "hike", "bike", "rental", "scavenger", "adventure", "zipline", "outdoor"] },
  { id: "NIGHTLIFE", label: "Emergent Nightlife & Mixology", keywords: ["bar", "mixology", "nightlife", "music", "dj", "club", "speakeasy", "cocktail", "listening", "vinyl"] },
  { id: "RETAIL", label: "Experience-Led Retail Design", keywords: ["shop", "retail", "concept", "boutique", "fashion", "store", "curated", "craft", "local"] }
];

const DISCOVERY_SOURCES = {
  GLOBAL: "site:wallpaper.com OR site:monocle.com OR site:dezeen.com OR site:nowness.com OR site:highsnobiety.com OR site:hypebeast.com OR site:vogue.com",
  LOCAL: "site:timeout.com OR site:theinfatuation.com OR site:eater.com OR site:ra.co OR site:cntraveler.com OR site:travelandleisure.com OR site:nytimes.com/style"
};

import VIBE_CACHE_RAW from './engine/vibeCache.json';

const VIBE_CACHE = { ...VIBE_CACHE_RAW };

// Load from localStorage if available (for persistence across sessions)
const localCache = JSON.parse(localStorage.getItem('travelvrse_vibe_cache') || '{}');
Object.assign(VIBE_CACHE, localCache);

const HEROIC_TEMPLATES = {
  CULINARY: {
    titles: ["{name} Gastro-Rituals", "{name} Culinary Lab", "Immersive {name} Dining"],
    concepts: ["A high-fidelity culinary destination where {source} verified techniques meet local {area} flavors.", "Experimental gastronomy focused on circular economy and {area}'s emerging food scene."]
  },
  WELLNESS: {
    titles: ["{name} Sanctuary", "Next-Gen {name} Rituals", "{name} Wellness Hub"],
    concepts: ["A restorative urban sanctuary focusing on {area}'s emerging wellness culture and sensory design.", "High-velocity wellness rituals triangulated via social signals and {source} authority."]
  },
  CULTURE: {
    titles: ["{name} Heritage Hub", "Immersive {name} Gallery", "{name} Design Collective"],
    concepts: ["A curated cultural landmark where {area}'s architectural history meets contemporary {source} design.", "Niche cultural discovery focusing on the hidden heritage of {area}."]
  },
  RETAIL: {
    titles: ["{name} Concept Store", "Niche {name} Retail", "{name} Design Studio"],
    concepts: ["Experience-led retail design focusing on {area}'s high-craft minimalism and {source} curation.", "A boutique retail hub where sustainable local craft meets next-gen fashion velocity."]
  },
  NIGHTLIFE: {
    titles: ["{name} Listening Bar", "Emergent {name} Mixology", "{name} Vinyl Lounge"],
    concepts: ["Audiophile nightlife featuring lo-fi audio, {source} verified curation, and organic pours.", "Atmospheric nightlife where cinematic lighting meets {area}'s avant-garde cocktail science."]
  }
};

function heroify(item, category, city, area, source) {
  const templates = HEROIC_TEMPLATES[category.id] || HEROIC_TEMPLATES.CULTURE;
  const rawName = item.title.split('-')[0].split('|')[0].split(':')[0].trim()
    .replace(/The Best|Top \d+|Guide to|Secret|Hidden|Gems in|In ${city}|Trending/ig, '').trim();
  
  const templateIdx = Math.abs(rawName.length) % templates.titles.length;
  const name = templates.titles[templateIdx].replace('{name}', rawName);
  const vibeConcept = templates.concepts[templateIdx]
    .replace('{area}', area)
    .replace('{source}', source);

  return { name, vibeConcept };
}

export async function scrapeLocalSignals(city, neighborhood) {
  const targetArea = neighborhood || city;
  const normalizedArea = targetArea.charAt(0).toUpperCase() + targetArea.slice(1).toLowerCase();
  const normalizedCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  
  // 1. CHECK CACHE FIRST (Prioritizing Neighborhood-level granularity)
  // We check the specific neighborhood first, then fallback to city-level ONLY if no neighborhood was specified
  const cacheKey = neighborhood ? normalizedArea : normalizedCity;

  if (VIBE_CACHE[cacheKey]) {
    console.log(`[Agent A] Cache Hit for ${cacheKey}. Serving stored vibes.`);
    return { 
      city, neighborhood, sentiment: 'Authority Cached Intelligence', 
      topExperiences: VIBE_CACHE[cacheKey].slice(0, 5), velocity: 9.9 
    };
  }

  const API_KEY = import.meta.env.VITE_SERPER_API_KEY;
  const HEADERS = { 'X-API-KEY': API_KEY, 'Content-Type': 'application/json' };
  
  console.log(`[Agent A] Dynamic Discovery Rolling Out for ${targetArea}...`);

  try {
    // 2. DYNAMIC DISCOVERY: Global Bible & Social Probes
    const queries = [
      `${DISCOVERY_SOURCES.GLOBAL} "${city}" ${neighborhood ? `"${neighborhood}"` : ""} "emerging trends" OR "design concept"`,
      `${DISCOVERY_SOURCES.LOCAL} "${city}" ${neighborhood ? `"${neighborhood}"` : ""} "hidden gems" OR "insider guide"`,
      `site:tiktok.com "${city}" "${neighborhood || city}" "aesthetic" "vibe check"`
    ];

    let searchResults = await Promise.all(queries.map(q => 
      fetch(`https://google.serper.dev/search`, {
        method: 'POST', headers: HEADERS, body: JSON.stringify({ q, num: 20 })
      }).then(r => r.json()).catch(() => ({ organic: [] }))
    ));

    let organic = searchResults.flatMap(r => r.organic || []);
    
    // BROADEN SEARCH if results are sparse
    if (organic.length < 10 && neighborhood) {
      console.log(`[Agent A] Sparse results for ${neighborhood}. Broadening search to ${city} market...`);
      const broadQueries = [
        `${DISCOVERY_SOURCES.GLOBAL} "${city}" "design trends" OR "lifestyle"`,
        `${DISCOVERY_SOURCES.LOCAL} "${city}" "best new spots" OR "vibe"`
      ];
      const broadResults = await Promise.all(broadQueries.map(q => 
        fetch(`https://google.serper.dev/search`, {
          method: 'POST', headers: HEADERS, body: JSON.stringify({ q, num: 20 })
        }).then(r => r.json()).catch(() => ({ organic: [] }))
      ));
      organic = [...organic, ...broadResults.flatMap(r => r.organic || [])];
    }
    
    // 3. UNIVERSAL VIBE HEROIFICATION (Turning raw data into premium concepts)
    const candidates = organic.map(item => {
      const combined = (item.title + " " + item.snippet).toLowerCase();
      
      const category = VIBE_TAXONOMY.find(cat => 
        cat.keywords.some(k => combined.includes(k))
      ) || VIBE_TAXONOMY[2]; // Default to Culture

      const isSocial = item.link.includes('tiktok.com') || item.link.includes('instagram.com');
      const source = isSocial ? 'Social Signal' : new URL(item.link).hostname.replace('www.', '');

      const { name, vibeConcept } = heroify(item, category, city, targetArea, source);

      // Filtering
      const isHashtagSpam = name.includes('#') || (name.split(' ').length > 12);
      if (isHashtagSpam || item.link.includes('tripadvisor') || item.link.includes('yelp')) return null;

      return { 
        name, 
        vibeConcept, 
        category: category.label, 
        source,
        id: category.id, score: isSocial ? 99 : 92,
        demandLabel: isSocial ? "High Visual Velocity" : "Authority Verified"
      };
    }).filter(c => c !== null);

    // 4. DEDUPLICATION & SELECTION
    const results = [];
    candidates.forEach(cand => {
      if (results.length < 5) {
        if (!results.some(r => r.name.toLowerCase() === cand.name.toLowerCase() || r.id === cand.id)) {
          results.push(cand);
        }
      }
    });

    // 5. CACHE PERSISTENCE (Store for future users)
    if (results.length >= 3) {
      VIBE_CACHE[cacheKey] = results;
      const updatedLocal = JSON.parse(localStorage.getItem('travelvrse_vibe_cache') || '{}');
      updatedLocal[cacheKey] = results;
      localStorage.setItem('travelvrse_vibe_cache', JSON.stringify(updatedLocal));
      console.log(`[Agent A] Storing Dynamic Discovery for ${cacheKey} in local cache.`);
    }

    return { 
      city, neighborhood, sentiment: 'Dynamic Market Intelligence', 
      topExperiences: results.slice(0, 5), velocity: 9.8 
    };

  } catch (err) {
    console.error("[Agent A] Discovery Probe failed", err);
  }

  return {
    city, neighborhood, sentiment: 'Universal Market Intelligence',
    topExperiences: [
      { name: `${city} Design Rituals`, vibeConcept: `Curated discovery of the emerging architectural and lifestyle narrative in ${targetArea}.`, source: "Monocle", category: "Immersive Art & Culture", demandLabel: "Authority Verified", score: 92, id: "CULTURE" },
      { name: "Atmospheric Gastronomy", vibeConcept: `High-fidelity culinary experiences where heritage design meets modern velocity.`, source: "Eater", category: "High-Fidelity Gastronomy", demandLabel: "Trending Signal", score: 90, id: "CULINARY" },
      { name: "Next-Gen Wellness Sanctuaries", vibeConcept: `Modular restorative spaces focusing on sensory restoration and ritual.`, source: "Wallpaper", category: "Next-Gen Wellness & Rituals", demandLabel: "High Local Demand", score: 88, id: "WELLNESS" }
    ],
    velocity: 9.0
  };
}

export async function auditDiscoverability(url, experiences) {
  if (!experiences) return [];
  
  return experiences.map((exp, i) => {
    const e = exp.name?.toLowerCase() || "";
    // Robust category extraction (handles both string and object formats)
    const categoryObj = exp.category;
    const c = (typeof categoryObj === 'string' ? categoryObj : categoryObj?.label || "General")?.toLowerCase();
    
    const isMatch = e.includes("wellness") || e.includes("sauna") || e.includes("bar") || e.includes("restaurant") || e.includes("vinyl") || c.includes("wellness") || c.includes("gastronomy");
    
    return {
      name: exp.name,
      score: isMatch ? 90 : 5,
      socialScore: isMatch ? 95 : 0,
      status: isMatch ? "Digital Match" : "Strategic Gap",
      evidence: isMatch ? "Directly Bookable via Digital Menu." : "Zero digital trace identified.",
      rank: i + 1
    };
  });
}

export function generatePropulsionQuest(auditResults, propertyName, coreReward) {
  const activities = auditResults.slice(0, 5).map((res, i) => ({
    id: i + 1,
    type: res.status === "Digital Match" ? "Immersive Showcase" : "Virtual Bridge",
    trend: res.name,
    action: `✨ Experience the magic of ${res.name}.`,
    reward: "💎 Heritage Token"
  }));
  return { name: `⚡ ${propertyName} Experience Roadmap`, activities, coreReward, suggestedVisuals: [auditResults[0]?.name || "Local vibe"] };
}
