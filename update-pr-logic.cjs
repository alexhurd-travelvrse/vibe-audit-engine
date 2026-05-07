const fs = require("fs");
const file = "src/personaEngine.js";
let content = fs.readFileSync(file, "utf8");

// 1. Define the PR-Ready "Approved Category" Matrix
const categoriesCode = `
export const VIBE_CATEGORIES = {
  RETAIL: "Experience-Led Retail Design",
  WELLNESS: "Next-Gen Wellness & Rituals",
  NIGHTLIFE: "Emergent Nightlife & Mixology",
  CULINARY: "High-Fidelity Gastronomy",
  CULTURE: "Immersive Art & Design",
  HERITAGE: "Hyper-Local Urban Heritage"
};
`;

// 2. Mapping Logic: Assign a category based on keywords
const mappingFunction = `
function assignCategory(name, snippet) {
  const text = (name + " " + snippet).toLowerCase();
  if (text.includes("store") || text.includes("shop") || text.includes("retail") || text.includes("design") || text.includes("boutique")) return VIBE_CATEGORIES.RETAIL;
  if (text.includes("spa") || text.includes("sauna") || text.includes("wellness") || text.includes("ritual") || text.includes("bath")) return VIBE_CATEGORIES.WELLNESS;
  if (text.includes("bar") || text.includes("cocktail") || text.includes("club") || text.includes("underground") || text.includes("dj")) return VIBE_CATEGORIES.NIGHTLIFE;
  if (text.includes("restaurant") || text.includes("food") || text.includes("dining") || text.includes("tasting")) return VIBE_CATEGORIES.CULINARY;
  if (text.includes("gallery") || text.includes("art") || text.includes("exhibition") || text.includes("museum")) return VIBE_CATEGORIES.CULTURE;
  return VIBE_CATEGORIES.HERITAGE; // Default
}
`;

// 3. Update the scrapeLocalSignals function to include Categories and Demand Labels
const startIdx = content.indexOf("export async function scrapeLocalSignals");
const endMarker = "/**\r\n * Agent B: The Discoverability Auditor";
const endIdx = content.indexOf(endMarker);

const newFunction = `
${categoriesCode}
${mappingFunction}

export async function scrapeLocalSignals(city, neighborhood) {
  const targetArea = neighborhood || city;
  const API_KEY = import.meta.env.VITE_SERPER_API_KEY;
  const HEADERS = { 'X-API-KEY': API_KEY, 'Content-Type': 'application/json' };
  
  const eliteSites = "site:timeout.com OR site:ra.co OR site:cntraveler.com OR site:theinfatuation.com OR site:wallpaper.com OR site:highsnobiety.com OR site:monocle.com";
  const baseQuery = \`\${eliteSites} \${targetArea} "curated" OR "emerging" OR "underground" OR "boutique" experience\`;
  
  try {
    const searchRes = await fetch(\`https://google.serper.dev/search\`, {
      method: 'POST', headers: HEADERS, body: JSON.stringify({ q: baseQuery, num: 15 })
    });
    const searchData = await searchRes.json();
    const relatedSearches = searchData.relatedSearches ? searchData.relatedSearches.map(r => r.query.toLowerCase()) : [];
    
    if (searchData.organic && searchData.organic.length > 0) {
      const sourceCounts = {};
      let candidates = [];
      
      for (const item of searchData.organic) {
        const source = new URL(item.link).hostname.replace('www.', '');
        sourceCounts[source] = (sourceCounts[source] || 0) + 1;
        if (sourceCounts[source] <= 2) {
          let name = item.title.split('-')[0].split('|')[0].trim();
          name = name.replace(/The Best|Top 10|Guide to|Secret|Hidden|Gems in|In \${targetArea}/ig, '').trim();
          candidates.push({ name, source, snippet: item.snippet });
        }
        if (candidates.length >= 5) break;
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

        // Demand Scoring & Labelling
        if (placesData.places && placesData.places.length > 0) {
          const place = placesData.places[0];
          venueName = place.title; 
          if (place.ratingCount > 50) {
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
          category: assignCategory(venueName, candidate.snippet),
          demandLabel: demandLabel,
          score: Math.min(trendScore, 100)
        };
      }));

      validatedTrends.sort((a, b) => b.score - a.score);

      return {
        city, neighborhood,
        sentiment: 'Validated Market Intelligence',
        topExperiences: validatedTrends,
        velocity: 9.8
      };
    }
  } catch (err) {
    console.error("[Agent A] Vibe Stack failed...", err);
  }

  return { city, neighborhood, sentiment: 'Emerging & Dynamic', topExperiences: [], velocity: 9.2 };
}
`;

content = content.substring(0, startIdx) + newFunction + content.substring(endIdx);
fs.writeFileSync(file, content);
