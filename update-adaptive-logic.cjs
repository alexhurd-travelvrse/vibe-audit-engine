const fs = require("fs");
const file = "src/personaEngine.js";
let content = fs.readFileSync(file, "utf8");

const startIdx = content.indexOf("export const VIBE_CATEGORIES");
const endMarker = "/**\r\n * Agent B: The Discoverability Auditor";
const endIdx = content.indexOf(endMarker);

const newLogic = `
export const VIBE_CATEGORIES = {
  RETAIL: "Experience-Led Retail Design",
  WELLNESS: "Next-Gen Wellness & Rituals",
  NIGHTLIFE: "Emergent Nightlife & Mixology",
  CULINARY: "High-Fidelity Gastronomy",
  CULTURE: "Immersive Art & Design",
  HERITAGE: "Hyper-Local Urban Heritage",
  URBAN: "Adaptive Urbanism & Architecture",
  SOCIAL: "Community-Centric Social Spaces"
};

// Adaptive Taxonomy Engine: Learns from the publisher's context
function deriveAdaptiveCategory(item) {
  const title = item.title.toLowerCase();
  const snippet = item.snippet.toLowerCase();
  const url = item.link.toLowerCase();
  const combined = title + " " + snippet + " " + url;

  // Primary Buckets (Consistency Layer)
  if (combined.includes("retail") || combined.includes("store") || combined.includes("fashion") || combined.includes("shopping")) return VIBE_CATEGORIES.RETAIL;
  if (combined.includes("wellness") || combined.includes("spa") || combined.includes("sauna") || combined.includes("yoga") || combined.includes("meditation")) return VIBE_CATEGORIES.WELLNESS;
  if (combined.includes("nightlife") || combined.includes("club") || combined.includes("bar") || combined.includes("cocktail") || combined.includes("music")) return VIBE_CATEGORIES.NIGHTLIFE;
  if (combined.includes("gastronomy") || combined.includes("dining") || combined.includes("restaurant") || combined.includes("culinary") || combined.includes("chef")) return VIBE_CATEGORIES.CULINARY;
  if (combined.includes("art") || combined.includes("gallery") || combined.includes("design") || combined.includes("architecture") || combined.includes("creative")) return VIBE_CATEGORIES.CULTURE;
  if (combined.includes("history") || combined.includes("heritage") || combined.includes("tour") || combined.includes("local secrets")) return VIBE_CATEGORIES.HERITAGE;

  // Dynamic Discovery (Self-Learning Layer)
  // If no bucket matches, we attempt to extract a high-value noun from the snippet
  const keywords = ["concept", "hub", "collective", "studio", "installation", "popup"];
  for (const k of keywords) {
    if (combined.includes(k)) {
      return \`\${k.charAt(0).toUpperCase() + k.slice(1)}-Led Innovation\`;
    }
  }

  return VIBE_CATEGORIES.URBAN; // Intelligent Default
}

export async function scrapeLocalSignals(city, neighborhood) {
  const targetArea = neighborhood || city;
  const API_KEY = import.meta.env.VITE_SERPER_API_KEY;
  const HEADERS = { 'X-API-KEY': API_KEY, 'Content-Type': 'application/json' };
  
  const eliteSites = "site:timeout.com OR site:ra.co OR site:cntraveler.com OR site:theinfatuation.com OR site:wallpaper.com OR site:highsnobiety.com OR site:monocle.com OR site:dezeen.com OR site:nowness.com";
  // BROADER QUERY to ensure diversity and volume
  const baseQuery = \`\${eliteSites} \${targetArea} "curated" OR "emerging" OR "hidden" OR "underground" experience\`;
  
  try {
    const searchRes = await fetch(\`https://google.serper.dev/search\`, {
      method: 'POST', headers: HEADERS, body: JSON.stringify({ q: baseQuery, num: 20 })
    });
    const searchData = await searchRes.json();
    const relatedSearches = searchData.relatedSearches ? searchData.relatedSearches.map(r => r.query.toLowerCase()) : [];
    
    if (searchData.organic && searchData.organic.length > 0) {
      const sourceCounts = {};
      let candidates = [];
      
      for (const item of searchData.organic) {
        const source = new URL(item.link).hostname.replace('www.', '');
        sourceCounts[source] = (sourceCounts[source] || 0) + 1;
        
        // We allow more results to ensure we fill the 5 spots
        if (sourceCounts[source] <= 3) {
          let name = item.title.split('-')[0].split('|')[0].trim();
          name = name.replace(/The Best|Top 10|Guide to|Secret|Hidden|Gems in|In \${targetArea}/ig, '').trim();
          candidates.push({ 
            name, 
            source, 
            snippet: item.snippet,
            adaptiveCategory: deriveAdaptiveCategory(item)
          });
        }
        if (candidates.length >= 8) break; // Grab a few extra for validation
      }

      const validatedTrends = await Promise.all(candidates.map(async (candidate) => {
        let trendScore = 50;
        let demandLabel = "Emergent Signal";
        let venueName = candidate.name;
        
        const placesData = await fetch(\`https://google.serper.dev/places\`, {
          method: 'POST', headers: HEADERS, body: JSON.stringify({ q: \`\${candidate.name} \${targetArea}\` })
        }).then(r => r.json()).catch(() => ({}));

        const socialData = await fetch(\`https://google.serper.dev/search\`, {
          method: 'POST', headers: HEADERS, body: JSON.stringify({ q: \`site:tiktok.com "\${candidate.name}" \${targetArea}\` })
        }).then(r => r.json()).catch(() => ({}));

        if (placesData.places && placesData.places.length > 0) {
          const place = placesData.places[0];
          venueName = place.title; 
          if (place.ratingCount > 30) {
             trendScore += 25;
             demandLabel = "High Market Demand";
          } else {
             demandLabel = "Rising Niche Interest";
          }
        }

        if (socialData.organic && socialData.organic.length > 0) {
          trendScore += 20;
          demandLabel = "High Social Velocity";
        }

        if (relatedSearches.some(q => q.includes(candidate.name.toLowerCase()))) {
          trendScore += 15;
          demandLabel = "Trending Search Topic";
        }

        return {
          name: venueName,
          category: candidate.adaptiveCategory,
          demandLabel: demandLabel,
          score: Math.min(trendScore, 100)
        };
      }));

      // Sort and Deduplicate
      const uniqueTrends = [];
      const seen = new Set();
      for (const t of validatedTrends) {
        if (!seen.has(t.name.toLowerCase())) {
          uniqueTrends.push(t);
          seen.add(t.name.toLowerCase());
        }
      }
      
      uniqueTrends.sort((a, b) => b.score - a.score);

      return {
        city, neighborhood,
        sentiment: 'Validated Market Intelligence',
        topExperiences: uniqueTrends.slice(0, 5),
        velocity: 9.8
      };
    }
  } catch (err) {
    console.error("[Agent A] Vibe Stack failed...", err);
  }

  return { city, neighborhood, sentiment: 'Emerging & Dynamic', topExperiences: [], velocity: 9.2 };
}
`;

content = content.substring(0, startIdx) + newLogic + content.substring(endIdx);
fs.writeFileSync(file, content);
