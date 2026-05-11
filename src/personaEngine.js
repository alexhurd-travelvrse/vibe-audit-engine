import VIBE_CACHE_RAW from './engine/vibeCache.json' with { type: 'json' };

const VIBE_CACHE = { ...VIBE_CACHE_RAW };
const ENGINE_VERSION = "v5.4";

// AUTO-RESET: Clear local cache if engine version has updated
if (typeof localStorage !== 'undefined' && localStorage.getItem('travelvrse_vibe_version') !== ENGINE_VERSION) {
  console.log(`[Engine] Version update detected (${ENGINE_VERSION}). Clearing legacy cache.`);
  localStorage.removeItem('travelvrse_vibe_cache');
  localStorage.setItem('travelvrse_vibe_version', ENGINE_VERSION);
}

// Load from localStorage if available (for persistence across sessions)
const localCache = typeof localStorage !== 'undefined' 
  ? JSON.parse(localStorage.getItem('travelvrse_vibe_cache') || '{}')
  : {};

// SANITIZATION: Ensure data format is consistent
Object.keys(localCache).forEach(city => {
  VIBE_CACHE[city] = localCache[city];
});

export const VIBE_TAXONOMY = [
  { id: "CULINARY", label: "Culinary", keywords: ["food", "dining", "tasting", "chef", "restaurant", "culinary", "gastronomy", "wine", "distillery", "brewery", "interactive dining", "small luxuries", "swangy", "fire-driven", "chef-led", "little treat", "glocal", "mediterranean", "italian", "mexican", "bistro", "eatery", "kitchen", "grill", "brunch", "steak", "sushi", "cafe", "coffee", "bakery", "pastry", "ramen", "tapas"] },
  { id: "WELLNESS", label: "Wellness", keywords: ["wellness", "spa", "sauna", "ritual", "hammam", "yoga", "pilates", "pool", "meditation", "sensory restoration", "biophilic", "adaptogens", "human-centric", "restorative", "hushpitality", "slow travel", "off-the-grid", "recovery", "gym", "studio", "massage", "fitness", "sauna"] },
  { id: "CULTURE", label: "Culture", keywords: ["art", "gallery", "culture", "museum", "class", "workshop", "heritage", "history", "design", "architecture", "adaptive reuse", "contemporary heritage", "revival", "landmark", "narrative", "set-jetting", "dejaview", "regenerative", "exhibition", "theater", "theatre", "auditorium", "art gallery", "cultural center", "monument"] },
  { id: "ADVENTURE", label: "Adventure", keywords: ["kayak", "boat", "climb", "hike", "bike", "rental", "scavenger", "adventure", "zipline", "outdoor", "expedition", "urban exploration", "hidden trail", "sight-doing", "coolcations", "surfing", "sailing", "tours", "park", "nature"] },
  { id: "NIGHTLIFE", label: "Nightlife", keywords: ["bar", "mixology", "nightlife", "music", "dj", "club", "speakeasy", "cocktail", "listening", "vinyl", "audiophile", "zero proof", "listening bar", "noctourism", "after dark", "lounge", "pub", "tavern", "night club", "brewery", "distillery"] },
  { id: "RETAIL", label: "Retail", keywords: ["shop", "retail", "concept", "boutique", "fashion", "store", "curated", "craft", "local", "textural surfaces", "experiential", "artisan", "tactility", "showroom", "atelier", "mall", "market", "clothing store", "jewelry", "gift shop"] },
  { id: "TOURS", label: "Tours", keywords: ["tour", "guide", "getyourguide", "experience", "walking", "boat", "bus", "trip", "excursion", "safari", "scavenger", "storytelling", "urban expedition"] }
];

const DISCOVERY_SOURCES = {
  LOCAL: "site:timeout.com OR site:theinfatuation.com OR site:eater.com OR site:ra.co OR site:lonelyplanet.com OR site:opentable.com OR site:designmynight.com OR site:getyourguide.com OR site:cntraveler.com OR site:travelandleisure.com OR site:nytimes.com/style"
};

function heroify(item, category, city, area, source) {
  if (item.type === 'place') {
    const name = item.title;
    const trendTitle = item.category || category.label;
    const description = `${item.title} is a ${trendTitle} at ${item.address}. Verified with a ${item.rating}/5 rating.`;
    return { name, vibeConcept: description, category: trendTitle };
  }

  let rawName = item.title.split('-')[0].split('|')[0].split(':')[0].trim()
    .replace(/TikTok|Instagram|Facebook|YouTube|LinkedIn|Pinterest/g, '')
    .replace(/The Best|Top \d+|Guide to|Secret|Hidden|Gems in|In ${city}|Trending|Best Things to Do in/ig, '')
    .replace(/I went to|I feared|I had fun|Watch this|Check out|Amazing|Exploring|Experience|The vibe of|My favorite|Party girl era|Entering my|Things to do in/ig, '')
    .replace(/\.{2,}/g, '') 
    .trim();

  if (rawName.length < 3) rawName = `${category.label} Discovery`;
  
  const cleanArea = area.trim();
  const nameDisplay = rawName.toLowerCase().includes(cleanArea.toLowerCase()) 
    ? rawName 
    : `${cleanArea} ${rawName}`;

  const description = item.snippet 
    ? item.snippet.replace(/\d{1,2} [a-z]+ 202\d/ig, '').trim()
    : `${nameDisplay} is a curated ${category.label} signal discovered via ${source}.`;

  return { name: nameDisplay, vibeConcept: description, category: category.label };
}

export async function scrapeLocalSignals(city, neighborhood) {
  const normalizedCity = city.trim();
  const normalizedArea = neighborhood ? neighborhood.trim() : null;
  const targetArea = normalizedArea || normalizedCity;
  const cacheKey = normalizedArea ? normalizedArea : normalizedCity;

  const cachedEntry = VIBE_CACHE[cacheKey];
  const TTL = 24 * 60 * 60 * 1000; 

  if (cachedEntry && cachedEntry.lastDiscovery && (Date.now() - cachedEntry.lastDiscovery < TTL)) {
    console.log(`[Agent A] Cache Hit (Fresh) for ${cacheKey}. Serving stored vibes.`);
    return { 
      city, neighborhood, sentiment: 'Authority Cached Intelligence', 
      topExperiences: cachedEntry.data.slice(0, 5), velocity: 9.9 
    };
  }

  const API_KEY = "a23fd96c5cb1aace5f985e1d32f27492c241b349";
  const HEADERS = { 'X-API-KEY': API_KEY, 'Content-Type': 'application/json' };
  
  console.log(`[Agent A] Dynamic Discovery Rolling Out for ${targetArea} (Cache Expired or Missing)...`);

  try {
    let expansionDistricts = ["Arts District", "Financial District", "Old Town", "Creative Quarter"];
    if (city.toLowerCase() === 'miami') expansionDistricts = ["Design District", "Brickell", "Little Havana", "Coconut Grove"];
    else if (city.toLowerCase().includes('las vegas')) expansionDistricts = ["Fremont Street", "Downtown Las Vegas", "Summerlin", "Henderson"];
    else if (city.toLowerCase().includes('copenhagen')) expansionDistricts = ["Vesterbro", "Nørrebro", "Østerbro", "Christianshavn"];
    else if (city.toLowerCase().includes('chichester') || city.toLowerCase().includes('wittering')) {
      expansionDistricts = ["Bracklesham Bay", "East Wittering", "Bosham", "Selsey", "Itchenor"];
    } else if (city.toLowerCase().includes('london')) {
      expansionDistricts = ["Battersea", "Chelsea", "Putney", "Fulham", "Clapham", "Southfields"];
    }

    const finalResults = [];
    const usedNames = new Set();
    const usedCategories = new Set();
    
    const placeBuffer = [];
    const socialBuffer = [];
    const tourBuffer = [];

    async function probeArea(areaName, isSocial = false, isPlaces = false) {
      console.log(`[Agent A] Probing ${areaName} for ${isPlaces ? 'Venues' : (isSocial ? 'Social' : 'Authority')}...`);
      
      if (isPlaces) {
        const subQueries = [
          `top trending restaurants and bars in ${city} ${areaName}`,
          `top trending art galleries and museums in ${city} ${areaName}`,
          `top trending boutiques and shops in ${city} ${areaName}`
        ];
        for (const q of subQueries) {
          const res = await fetch(`https://google.serper.dev/places`, {
            method: 'POST', headers: HEADERS, body: JSON.stringify({ q, num: 10 })
          }).then(r => r.json()).catch(() => ({ places: [] }));
          
          (res.places || []).forEach(place => {
            const combined = (place.title + " " + (place.category || "")).toLowerCase();
            const category = VIBE_TAXONOMY.find(cat => cat.keywords.some(k => combined.includes(k))) || VIBE_TAXONOMY[2];
            const { name, vibeConcept, category: trendTitle } = heroify({ ...place, type: 'place' }, category, city, areaName, 'Google Maps');
            placeBuffer.push({ ...place, name, vibeConcept, category: trendTitle, id: category.id, score: 100, source: 'Google Maps', demandLabel: 'High Local Demand' });
          });
        }
        return;
      }

      const query = isSocial 
        ? `site:tiktok.com "${city}" "${areaName}" "aesthetic" OR "vibe check" OR "hushpitality" OR "noctourism"`
        : `${DISCOVERY_SOURCES.LOCAL} "${city}" "${areaName}" "vibe" OR "hidden" OR "hushpitality" OR "noctourism" OR "sight-doing" OR "slow travel"`;
      
      const res = await fetch(`https://google.serper.dev/search`, {
        method: 'POST', headers: HEADERS, body: JSON.stringify({ q: query, num: 15 })
      }).then(r => r.json()).catch(() => ({ organic: [] }));

      (res.organic || []).forEach(item => {
        const combined = (item.title + " " + item.snippet).toLowerCase();
        const noiseKeywords = ["search", "login", "account", "map", "direction", "hours", "directions", "salvation army", "goodwill", "temple", "church", "job", "career", "weather", "news"];
        if (noiseKeywords.some(k => combined.includes(k))) return;

        const category = VIBE_TAXONOMY.find(cat => cat.keywords.some(k => combined.includes(k))) || VIBE_TAXONOMY[2];
        const isSocialResult = item.link.includes('tiktok.com') || item.link.includes('instagram.com');
        const rawHostname = new URL(item.link).hostname.replace('www.', '');
        const source = isSocialResult ? 'Social Signal' : rawHostname;

        if (rawHostname.includes('getyourguide.com') && category.id !== 'TOURS') return;
        if (category.id === 'TOURS' && !rawHostname.includes('getyourguide.com')) return;

        const { name, vibeConcept, category: trendTitle } = heroify(item, category, city, areaName, source);
        const score = isSocialResult ? 95 : 90;
        const candidate = { name, vibeConcept, category: trendTitle, id: category.id, score, source, demandLabel: isSocialResult ? "High Visual Velocity" : "Authority Verified" };
        
        if (category.id === 'TOURS') tourBuffer.push(candidate);
        else socialBuffer.push(candidate);
      });
    }

    const probeAreas = [targetArea, ...expansionDistricts.slice(0, 1)];
    for (const area of probeAreas) {
      await probeArea(area, false, true); // Places
      await probeArea(area, true, false);  // Social
      await probeArea(area, false, false); // Authority & Tours
    }

    // TRIANGULATION (Venues + Tours)
    const triangulate = (buffer) => buffer.map(item => {
      const socialMatch = socialBuffer.find(s => 
        s.name.toLowerCase().includes(item.name.toLowerCase()) || 
        item.name.toLowerCase().includes(s.name.toLowerCase())
      );
      if (socialMatch) {
        console.log(`[Agent A] Triangulated Signal: ${item.name} verified on ${socialMatch.source}`);
        const addr = item.source === 'Google Maps' ? ` | Location: ${item.vibeConcept.split(' at ')[1]}` : ` | Activity: ${item.vibeConcept}`;
        return {
          ...item, score: 110, demandLabel: "Viral High Velocity",
          vibeConcept: `🔥 Trending on Social: "${socialMatch.vibeConcept.split('.')[0]}..."${addr}`,
          source: `Verified via ${socialMatch.source} & ${item.source}`
        };
      }
      return { ...item };
    });

    const triangulatedPlaces = triangulate(placeBuffer);
    const triangulatedTours = triangulate(tourBuffer);

    const allCandidates = [...triangulatedPlaces, ...socialBuffer].sort((a, b) => b.score - a.score);
    allCandidates.forEach(cand => {
      if (finalResults.length < 4 && !usedNames.has(cand.name) && !usedCategories.has(cand.id)) {
        finalResults.push(cand);
        usedNames.add(cand.name);
        usedCategories.add(cand.id);
      }
    });

    const bestTour = triangulatedTours.sort((a, b) => b.score - a.score)[0];
    if (bestTour) finalResults.push(bestTour);

    if (finalResults.length >= 3 && typeof localStorage !== 'undefined') {
      const entry = { data: finalResults, lastDiscovery: Date.now() };
      VIBE_CACHE[cacheKey] = entry;
      const updatedLocal = JSON.parse(localStorage.getItem('travelvrse_vibe_cache') || '{}');
      updatedLocal[cacheKey] = entry;
      localStorage.setItem('travelvrse_vibe_cache', JSON.stringify(updatedLocal));
      localStorage.setItem('travelvrse_vibe_version', ENGINE_VERSION);
    }

    return { city, neighborhood, sentiment: 'Dynamic Intelligence Audit', topExperiences: finalResults, velocity: 9.9 };

  } catch (error) {
    console.error("[Agent A] Audit Failed:", error);
    return { city, neighborhood, sentiment: 'Audit Failure', topExperiences: [], velocity: 0 };
  }
}
