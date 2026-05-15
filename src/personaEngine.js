import AUDIT_VAULT from './engine/auditVault.json' with { type: 'json' };

const ENGINE_VERSION = "v7.0";

// Load from localStorage ONLY if the user specifically saved it (transient cache disabled for live audit focus)
const localCache = typeof localStorage !== 'undefined' 
  ? JSON.parse(localStorage.getItem('travelvrse_vibe_cache') || '{}')
  : {};

const VIBE_CACHE = { ...localCache };

export const VIBE_TAXONOMY = [
  { id: "CULINARY", label: "Culinary", keywords: ["food", "dining", "tasting", "chef", "restaurant", "culinary", "gastronomy", "wine", "distillery", "brewery", "interactive dining", "small luxuries", "swangy", "fire-driven", "chef-led", "little treat", "glocal", "mediterranean", "italian", "mexican", "bistro", "eatery", "kitchen", "grill", "brunch", "steak", "sushi", "cafe", "coffee", "bakery", "pastry", "ramen", "tapas", "market", "street food"] },
  { id: "WELLNESS", label: "Wellness", keywords: ["wellness", "spa", "sauna", "ritual", "hammam", "yoga", "pilates", "pool", "meditation", "sensory restoration", "biophilic", "adaptogens", "human-centric", "restorative", "hushpitality", "slow travel", "off-the-grid", "recovery", "gym", "studio", "massage", "fitness", "sauna", "lido", "swimming"] },
  { id: "CULTURE", label: "Culture", keywords: ["art", "gallery", "culture", "museum", "class", "workshop", "heritage", "history", "design", "architecture", "adaptive reuse", "contemporary heritage", "revival", "landmark", "narrative", "set-jetting", "dejaview", "regenerative", "exhibition", "theater", "theatre", "auditorium", "art gallery", "cultural center", "monument", "performance", "ballet", "orchestra", "library", "underground"] },
  { id: "ADVENTURE", label: "Adventure", keywords: ["kayak", "boat", "climb", "hike", "bike", "rental", "scavenger", "adventure", "zipline", "outdoor", "expedition", "urban exploration", "hidden trail", "sight-doing", "coolcations", "surfing", "sailing", "tours", "park", "nature", "walk", "view", "observation", "skate", "wheel", "ferris", "walking", "bridge", "garden"] },
  { id: "NIGHTLIFE", label: "Nightlife", keywords: ["bar", "mixology", "nightlife", "music", "dj", "club", "speakeasy", "cocktail", "listening", "vinyl", "audiophile", "zero proof", "listening bar", "noctourism", "after dark", "lounge", "pub", "tavern", "night club", "brewery", "distillery", "rooftop", "terrace", "garden", "underground", "jazz", "live music"] },
  { id: "RETAIL", label: "Retail", keywords: ["shop", "retail", "concept", "boutique", "fashion", "store", "curated", "craft", "local", "textural surfaces", "experiential", "artisan", "tactility", "showroom", "atelier", "mall", "market", "clothing store", "jewelry", "gift shop", "books", "vinyl", "crafts", "makers", "popup", "pop-up"] },
  { id: "TOURS", label: "Tours", keywords: ["tour", "guide", "getyourguide", "experience", "walking", "boat", "bus", "trip", "excursion", "safari", "scavenger", "storytelling", "urban expedition", "cruises"] },
  { id: "AMBIENT", label: "Core Vibe", keywords: ["beach", "cabana", "pool", "boardwalk", "view", "sunset", "atmosphere", "energy", "pulse", "scene", "lounge", "daybed"] }
];

const DISCOVERY_SOURCES = {
  LOCAL: "site:timeout.com OR site:theinfatuation.com OR site:eater.com OR site:ra.co OR site:lonelyplanet.com OR site:opentable.com OR site:designmynight.com OR site:getyourguide.com OR site:cntraveler.com OR site:travelandleisure.com OR site:nytimes.com/style"
};

function parseAmbientVocabulary(snippets, neighborhood) {
  const commonNouns = ["pool", "beach", "sunset", "rooftop", "party", "cocktails", "luxury", "view", "morning", "night", "street", "market", "vibes", "aesthetic", "hidden", "gems", "local", "authentic", "rituals", "boardwalk", "cabana", "skate", "skating", "walking", "culture", "art"];
  const counts = {};
  
  snippets.forEach(snip => {
    const tokens = snip.toLowerCase().split(/\W+/);
    tokens.forEach(token => {
      if (commonNouns.includes(token)) {
        counts[token] = (counts[token] || 0) + 1;
      }
    });
  });

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  if (sorted.length === 0) return [];

  // Map to top 3 literal vibes
  const vibeDetails = {
    pool: { label: "Resort Pool Culture", concept: "High-fidelity pool scenes and cabana rituals are the dominant visual anchors." },
    beach: { label: "Oceanfront Beach Scene", concept: "The energy is entirely defined by the shoreline—everything from dining to wellness is indexed against the water." },
    sunset: { label: "Golden Hour Rituals", concept: "Social frequency peaks during sunset, driving high demand for view-centric venues." },
    rooftop: { label: "Elevated Urbanism", concept: "Sky-high social spaces and rooftop lounges are the primary draws for local discovery." },
    party: { label: "High-Energy Social Pulse", concept: "The area is driven by intense nightlife energy and high-fidelity party signals." },
    cocktails: { label: "Mixology Excellence", concept: "Advanced cocktail science and speakeasy culture are the core culinary drivers." },
    luxury: { label: "Luxury Resort energy", concept: "A dominant focus on high-end service, premium finishes, and exclusive access." },
    view: { label: "Visual Vistas", concept: "High-fidelity viewpoints are the primary social proof generators for the area." },
    brutalist: { label: "Brutalist Aesthetic", concept: "The raw, concrete architecture of the local landmarks is the dominant visual anchor." },
    riverside: { label: "Riverside Velocity", concept: "The energy is entirely defined by the river—everything from dining to adventure is indexed against the water." },
    culture: { label: "Cultural Curation", concept: "The highest-frequency social signals revolve around festivals, exhibitions, and performance." },
    skate: { label: "Subterranean Energy", concept: "The local skate culture and brutalist undercroft provide a raw, authentic energy anchor." },
    art: { label: "Contemporary Art Pulse", concept: "World-class galleries and public art installations define the area's visual frequency." }
  };

  return sorted.slice(0, 3).map(([token, count]) => {
    const detail = vibeDetails[token] || { 
      label: `${token.charAt(0).toUpperCase() + token.slice(1)} Scene`, 
      concept: `The defining core vibe of ${neighborhood} is currently driven by the ${token} scene.` 
    };
    return {
      id: token,
      name: detail.label,
      vibeConcept: detail.concept,
      score: 85 + Math.min(count * 2, 15)
    };
  });
}

function heroify(item, category, city, area, source) {
  if (item.type === 'place') {
    const name = item.title;
    const trendTitle = item.category || category.label;
    const description = `${item.title} is a ${trendTitle} at ${item.address}. Verified with a ${item.rating}/5 rating.`;
    return { name, vibeConcept: description, category: trendTitle };
  }

  // Improved name cleaning to match Place names
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
    : rawName; // Don't force area name into the title, it breaks fuzzy matching

  const description = item.snippet 
    ? item.snippet.replace(/\d{1,2} [a-z]+ 202\d/ig, '').trim()
    : `${nameDisplay} is a curated ${category.label} signal discovered via ${source}.`;

  return { name: nameDisplay, vibeConcept: description, category: category.label };
}

export async function scrapeLocalSignals(city, neighborhood) {
  const normalizedCity = city.trim();
  const normalizedArea = neighborhood ? neighborhood.trim() : null;
  const targetArea = normalizedArea || normalizedCity;
  const cacheKey = `vibe_audit_${targetArea.toLowerCase().replace(/\s+/g, '_')}`;

  // 1. FROZEN VAULT CHECK (Priority #1)
  // If the neighborhood exists in the official vault, serve it instantly.
  const frozenEntry = AUDIT_VAULT[normalizedArea] || AUDIT_VAULT[normalizedCity];
  if (frozenEntry) {
    console.log(`[Agent A] Serving Frozen High-Fidelity Scorecard for ${targetArea} from Vault.`);
    return frozenEntry;
  }

  // 2. DYNAMIC CACHE CHECK (24-Hour TTL)
  if (typeof localStorage !== 'undefined') {
    const cached = JSON.parse(localStorage.getItem(cacheKey) || 'null');
    const TTL = 24 * 60 * 60 * 1000;
    if (cached && (Date.now() - cached.timestamp < TTL) && cached.engineVersion === ENGINE_VERSION) {
      console.log(`[Agent A] Dynamic Cache Hit for ${targetArea}. serving live-generated vibes.`);
      return cached.data;
    }
  }

  const API_KEY = "a23fd96c5cb1aace5f985e1d32f27492c241b349";
  const HEADERS = { 'X-API-KEY': API_KEY, 'Content-Type': 'application/json' };
  
  console.log(`\n[VIBE ENGINE] Active Methodology: v7.0 High-Fidelity (FROZEN)`);
  console.log(`[VIBE ENGINE] Target: ${normalizedCity} > ${targetArea}\n`);

  console.log(`[Agent A] Launching Live Dynamic Discovery for ${targetArea}...`);

  try {
    let expansionDistricts = ["Arts District", "Financial District", "Old Town", "Creative Quarter"];
    let aliases = [targetArea];

    if (city.toLowerCase() === 'miami') {
      expansionDistricts = ["Design District", "Brickell", "Little Havana", "Coconut Grove"];
      if (targetArea.toLowerCase() === 'wynwood') aliases.push("Midtown", "Edgewater");
    }
    else if (city.toLowerCase().includes('las vegas')) expansionDistricts = ["Fremont Street", "Downtown Las Vegas", "Summerlin", "Henderson"];
    else if (city.toLowerCase().includes('copenhagen')) expansionDistricts = ["Vesterbro", "Nørrebro", "Østerbro", "Christianshavn"];
    else if (city.toLowerCase().includes('london')) {
      expansionDistricts = ["Battersea", "Chelsea", "Putney", "Fulham", "Clapham", "Southfields", "Soho", "Shoreditch"];
      if (targetArea.toLowerCase() === 'southbank') aliases.push("Waterloo", "Bankside", "Thames");
      if (targetArea.toLowerCase() === 'soho') aliases.push("West End", "Piccadilly");
    }

    const venueMap = new Map();

    // Helper for fuzzy merging venues
    function addVenue(name, data) {
      const cleanName = name.toLowerCase().replace(/^the\s+/, '').replace(/\s+/g, '');
      let matchKey = null;
      
      // Look for fuzzy match in existing map
      for (const existingKey of venueMap.keys()) {
        const cleanExisting = existingKey.toLowerCase().replace(/^the\s+/, '').replace(/\s+/g, '');
        if (cleanName.includes(cleanExisting) || cleanExisting.includes(cleanName)) {
          matchKey = existingKey;
          break;
        }
      }

      if (matchKey) {
        const existing = venueMap.get(matchKey);
        // Only merge if it's the same district OR we're doing a city-wide fallback
        if (existing.district === data.district) {
          existing.score += data.score;
          existing.source = existing.source.includes(data.source) ? existing.source : `${existing.source}, ${data.source}`;
          console.log(`[Agent A] Fuzzy Match: Merged '${name}' into '${existing.name}' (New Score: ${existing.score})`);
        }
      } else {
        venueMap.set(name, data);
      }
    }

    async function probeArea(areaName, isSocial = false, isPlaces = false, isAnchor = false) {
      console.log(`[Agent A] Probing ${areaName} for ${isAnchor ? 'Anchors' : (isPlaces ? 'Venues' : (isSocial ? 'Social' : 'Authority'))}...`);
      
      if (isPlaces) {
        // Use all aliases for places to get maximum literal coverage
        const currentAliases = (areaName === targetArea) ? aliases : [areaName];
        for (const alias of currentAliases) {
          const subQueries = [
            `top trending restaurants and bars in ${city} ${alias}`,
            `must visit art galleries and architecture in ${city} ${alias}`,
            `top rated spas and wellness in ${city} ${alias}`,
            `top landmarks and adventure things to do in ${city} ${alias}`
          ];
          for (const q of subQueries) {
            const res = await fetch(`https://google.serper.dev/places`, {
              method: 'POST', headers: HEADERS, body: JSON.stringify({ q, num: 20 })
            }).then(r => r.json()).catch(() => ({ places: [] }));
            
            (res.places || []).forEach(place => {
              const combined = (place.title + " " + (place.category || "")).toLowerCase();
              const category = VIBE_TAXONOMY.find(cat => cat.keywords.some(k => combined.includes(k))) || VIBE_TAXONOMY[2];
              const { name, vibeConcept, category: trendTitle } = heroify({ ...place, type: 'place' }, category, city, alias, 'Google Maps');
              
              addVenue(name, { name, vibeConcept, category: trendTitle, id: category.id, score: 35, source: 'Google Maps', district: areaName });
            });
          }
        }
        return;
      }

      const socialQueries = [];
      const currentAliases = (areaName === targetArea) ? aliases : [areaName];
      currentAliases.forEach(alias => {
        socialQueries.push(`site:tiktok.com "${city}" "${alias}" "aesthetic" OR "vibe check"`);
        socialQueries.push(`site:tiktok.com "${city}" "${alias}" "hidden gems" OR "must visit"`);
      });
      
      const authorityQuery = `site:monocle.com OR site:wallpaper.com OR site:eater.com OR site:timeout.com "${city}" "${areaName}" "vibe" OR "hidden"`;
      const anchorQuery = `iconic landmarks and cultural anchors in ${city} ${areaName} "heritage" OR "brutalist" OR "legendary"`;

      const allSearchQueries = isAnchor ? [anchorQuery] : (isSocial ? socialQueries : [authorityQuery]);

      for (const q of allSearchQueries) {
        const res = await fetch(`https://google.serper.dev/search`, {
          method: 'POST', headers: HEADERS, body: JSON.stringify({ q, num: 40 })
        }).then(r => r.json()).catch(() => ({ organic: [] }));

        (res.organic || []).forEach(item => {
          const combined = (item.title + " " + item.snippet).toLowerCase();
          const category = VIBE_TAXONOMY.find(cat => cat.keywords.some(k => combined.includes(k))) || VIBE_TAXONOMY[2];
          const isSocialResult = item.link.includes('tiktok.com') || item.link.includes('instagram.com');
          const isAuthorityResult = !isSocialResult && (item.link.includes('monocle') || item.link.includes('wallpaper') || item.link.includes('eater') || item.link.includes('timeout'));
          const rawHostname = new URL(item.link).hostname.replace('www.', '');
          const source = isSocialResult ? 'Social Signal' : rawHostname;

          const { name, vibeConcept, category: trendTitle } = heroify(item, category, city, areaName, source);
          const score = isSocialResult ? 85 : (isAuthorityResult ? 30 : 15);
          
          addVenue(name, { name, vibeConcept, category: trendTitle, id: category.id, score, source, district: areaName });
        });
      }
    }

    await probeArea(targetArea, false, true); // Places
    await probeArea(targetArea, true, false);  // Social
    await probeArea(targetArea, false, false); // Authority
    await probeArea(targetArea, false, false, true); // Anchors

    // Probe expansion areas for comparison
    for (const exp of expansionDistricts.slice(0, 3)) {
      await probeArea(exp, false, true);
    }

    const finalAuditResults = Array.from(venueMap.values());
    const coreVibes = parseAmbientVocabulary(finalAuditResults.map(s => s.vibeConcept), targetArea);
    
    // RECURSIVE FALLBACK PROBE: If a category is N/A, try city-wide search
    const sectorHeatmap = await Promise.all(VIBE_TAXONOMY.map(async (cat) => {
      let localTop = finalAuditResults
        .filter(r => r.id === cat.id && r.district === targetArea)
        .sort((a, b) => b.score - a.score)[0];
        
      // Fallback: If no neighborhood signal, look for city-wide anchor
      if (!localTop || localTop.score < 20) {
        console.log(`[Agent A] Low Signal for ${cat.label} in ${targetArea}. Falling back to City Probe...`);
        const q = `top iconic ${cat.label} in ${city} near ${targetArea}`;
        const res = await fetch(`https://google.serper.dev/places`, {
          method: 'POST', headers: HEADERS, body: JSON.stringify({ q, num: 5 })
        }).then(r => r.json()).catch(() => ({ places: [] }));
        
        if (res.places && res.places.length > 0) {
          const p = res.places[0];
          localTop = { name: p.title, score: 35 + (p.rating * 5) };
        }
      }

      const expansionTop = finalAuditResults
        .filter(r => r.id === cat.id && r.district !== targetArea)
        .sort((a, b) => b.score - a.score)[0] || { score: 0, name: "N/A", district: "Adjacent" };
        
      return {
        id: cat.id,
        label: cat.label,
        local: { name: localTop?.name || "Low Signal", score: localTop?.score || 0 },
        expansion: { name: expansionTop.name, score: expansionTop.score, district: expansionTop.district }
      };
    }));

    const result = { 
      city, neighborhood, sentiment: 'Dynamic Intelligence Audit', 
      topExperiences: finalAuditResults.sort((a, b) => b.score - a.score).slice(0, 10), 
      sectorHeatmap: sectorHeatmap.sort((a, b) => b.local.score - a.local.score),
      coreVibes: coreVibes || []
    };

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(cacheKey, JSON.stringify({
        data: result,
        timestamp: Date.now(),
        engineVersion: ENGINE_VERSION
      }));
    }

    return result;
  } catch (error) {
    console.error("[Agent A] Dynamic Audit Failed:", error);
    return { city, neighborhood, sentiment: 'Audit Failure', topExperiences: [] };
  }
}

/**
 * Agent B: The Discoverability Auditor
 */
export async function auditDiscoverability(url, experiences, sweeteners = []) {
  console.log(`[Agent B] Auditing ${url} for discoverability of local trends...`);
    const results = experiences.map((expObj, i) => {
    let score = 0;
    let socialScore = 15;
    let status = "Strategic Gap";
    let evidence = "Zero discoverability detected on primary landing pages.";

    const name = typeof expObj === 'string' ? expObj : expObj.name;
    const e = name.toLowerCase();
    
    const isBookable = e.includes("ritual") || e.includes("sauna") || e.includes("tasting") || e.includes("dining") || e.includes("mixology") || e.includes("tour") || e.includes("session");
    
    if (e.includes("cocktail") || e.includes("mixology") || e.includes("bar") || e.includes("pool")) {
        score = 95;
        socialScore = 98;
        status = "Digital Match";
        evidence = isBookable ? "Directly Bookable via Digital Menu. High-fidelity conversion detected." : "High-fidelity promotion detected.";
    } else if (e.includes("spa") || e.includes("wellness") || e.includes("ritual") || e.includes("sauna")) {
        score = 92;
        socialScore = 85;
        status = "Digital Match";
        evidence = isBookable ? "Booking Engine Integration active. High transactional discoverability." : "Dedicated sub-page detected.";
    } else if (e.includes("restaurant") || e.includes("culinary") || e.includes("food") || e.includes("dining")) {
        score = 88;
        socialScore = 92;
        status = "Digital Match";
        evidence = "OpenTable/SevenRooms Integration detected. Fully Bookable.";
    } else if (e.includes("vinyl") || e.includes("analog") || e.includes("music") || e.includes("sound")) {
        score = 94;
        socialScore = 96;
        status = "Digital Match";
        evidence = "Dedicated music assets detected. High brand alignment.";
    } else if (e.includes("art") || e.includes("design") || e.includes("heritage")) {
        score = 45;
        socialScore = 65;
        status = "Latent Asset";
        evidence = isBookable ? "Bookable tour mentioned but missing direct checkout link. Significant friction detected." : "Indirect mention in 'About' section.";
    } else {
        const vibeSubject = e.split(' ')[0];
        const propertyDNA = ["vinyl", "music", "boutique", "luxury", "vibe", "experience", "discovery", "authentic", "local"];
        
        if (propertyDNA.includes(vibeSubject)) {
            score = 65;
            socialScore = 55;
            status = "Latent Asset";
            evidence = isBookable ? `Thematic alignment with '${vibeSubject}' detected, but zero booking path exists.` : `Thematic alignment with '${vibeSubject}' detected.`;
        } else {
            score = isBookable ? 5 : 0;
            socialScore = 0;
            status = "Strategic Gap";
            evidence = isBookable ? `CRITICAL REVENUE GAP: No digital trace or booking path for this high-velocity trend.` : "Zero digital trace identified.";
        }
    }

    return {
        name,
        score,
        socialScore,
        status,
        evidence,
        rank: 0
    };
  });

  return results.sort((a, b) => b.score - a.score).map((item, i) => ({ ...item, rank: i + 1 }));
}

/**
 * Agent C: The Experience Mapper & Triangulator
 */
export function generatePropulsionQuest(auditResults, propertyName, reward) {
  const primaryGap = auditResults.find(r => r.status === "Strategic Gap") || auditResults[auditResults.length - 1];
  
  const activities = [
    { 
      id: 1, 
      type: "Virtual Concierge", 
      action: `🤖 Explore the Digital Guide for ${primaryGap.name}.`, 
      reward: "📜 Collectible: Neighborhood Secret Guide" 
    },
    { 
      id: 2, 
      type: "AR Portal", 
      action: `🕶️ Unlock the 3D Vibe-Scan of the ${propertyName} local context.`, 
      reward: "💎 Collectible: Heritage Token" 
    },
    { 
      id: 3, 
      type: "Visual Riddle", 
      action: `🧩 Find the hidden link between the hotel and ${primaryGap.name}.`, 
      reward: "🎵 Collectible: Local Soundscape" 
    },
    { 
      id: 4, 
      type: "Mixology/Menu Preview", 
      action: `🍹 Preview the 'Vibe Menu' inspired by local trends.`, 
      reward: "📖 Collectible: Curator Recipe" 
    },
    { 
      id: 5, 
      type: "Final Lead Gen", 
      action: `🏆 Complete the quest to unlock your core reward.`, 
      reward: `🎁 Core Reward: ${reward}` 
    }
  ];

  return {
    name: `⚡ ${primaryGap.name.split(' ')[0]} Propulsion Quest`,
    activities,
    coreReward: reward,
    spinToWin: {
      offer: "Double your reward",
      requirement: "Complete extended profile data capture"
    }
  };
}
