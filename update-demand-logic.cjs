const fs = require("fs");
const file = "src/personaEngine.js";
let content = fs.readFileSync(file, "utf8");

const startIdx = content.indexOf("export async function scrapeLocalSignals");
const endMarker = "/**\r\n * Agent B: The Discoverability Auditor";
const endIdx = content.indexOf(endMarker);

const demandLedLogic = `
export async function scrapeLocalSignals(city, neighborhood) {
  const targetArea = neighborhood || city;
  const API_KEY = import.meta.env.VITE_SERPER_API_KEY;
  const HEADERS = { 'X-API-KEY': API_KEY, 'Content-Type': 'application/json' };
  
  console.log(\`[Agent A] Analyzing Natural Trend Velocity for \${targetArea}...\`);

  try {
    const eliteSites = "site:timeout.com OR site:ra.co OR site:cntraveler.com OR site:theinfatuation.com OR site:wallpaper.com OR site:highsnobiety.com OR site:monocle.com OR site:getyourguide.com";
    
    // THE "SOUL" SEARCH: Look for what is emerging, underground, and hot across all elite domains
    const query = \`\${eliteSites} "\${targetArea}" "hidden gems" OR "underground" OR "emerging" OR "secret" experience\`;

    const searchRes = await fetch(\`https://google.serper.dev/search\`, { 
      method: 'POST', headers: HEADERS, body: JSON.stringify({ q: query, num: 30 }) 
    }).then(r => r.json());

    const relatedSearches = (searchRes.relatedSearches || []).map(r => r.query.toLowerCase());
    
    if (searchRes.organic && searchRes.organic.length > 0) {
      const validatedTrends = await Promise.all(searchRes.organic.slice(0, 15).map(async (item) => {
        let name = item.title.split('-')[0].split('|')[0].trim();
        name = name.replace(/The Best|Top 10|Guide to|Gems in|In \${city}/ig, '').trim();
        
        let trendScore = 20; // Base Publisher Boost
        let demandLabel = "Emergent Signal";
        
        // Parallel Demand Validation
        const [placesData, socialData] = await Promise.all([
          fetch(\`https://google.serper.dev/places\`, { method: 'POST', headers: HEADERS, body: JSON.stringify({ q: \`\${name} \${city}\` }) }).then(r => r.json()).catch(() => ({})),
          fetch(\`https://google.serper.dev/search\`, { method: 'POST', headers: HEADERS, body: JSON.stringify({ q: \`site:tiktok.com "\${name}" \${city}\` }) }).then(r => r.json()).catch(() => ({}))
        ]);

        if (placesData.places && placesData.places.length > 0) {
          name = placesData.places[0].title;
          if (placesData.places[0].ratingCount > 15) trendScore += 20;
        }

        if (socialData.organic && socialData.organic.length > 0) { 
          trendScore += 30; 
          demandLabel = "High Social Velocity"; 
        }
        
        if (relatedSearches.some(q => q.includes(name.toLowerCase()))) { 
          trendScore += 30; 
          demandLabel = "Trending Search Topic"; 
        }

        return {
          name,
          category: deriveAdaptiveCategory({ title: name, snippet: item.snippet, link: item.link }),
          demandLabel: demandLabel,
          score: Math.min(trendScore, 100)
        };
      }));

      // 3. NATURAL TREND SELECTION (Soft-Deduplicated)
      const results = validatedTrends.filter(t => t !== null).sort((a, b) => b.score - a.score);
      
      const finalTrends = [];
      const seenNames = new Set();
      const catCounts = {};

      for (const t of results) {
        if (finalTrends.length >= 5) break;
        if (seenNames.has(t.name.toLowerCase())) continue;
        
        // SOFT DIVERSITY CAP: Allow natural clusters but limit to 2 of the same "vibe" to keep audit interesting
        const cat = t.category;
        catCounts[cat] = (catCounts[cat] || 0) + 1;
        
        if (catCounts[cat] <= 2) {
          finalTrends.push(t);
          seenNames.add(t.name.toLowerCase());
        }
      }

      return {
        city, neighborhood,
        sentiment: 'Native Trend Velocity',
        topExperiences: finalTrends,
        velocity: 9.8
      };
    }
  } catch (err) {
    console.error("[Agent A] Demand-Led Stack failed...", err);
  }

  return { city, neighborhood, sentiment: 'Emerging & Dynamic', topExperiences: [], velocity: 9.2 };
}

function deriveAdaptiveCategory(item) {
  const combined = (item.title + " " + item.snippet + " " + (item.link || "")).toLowerCase();
  if (combined.includes("food") || combined.includes("restaurant") || combined.includes("tasting")) return "Culinary Experience";
  if (combined.includes("bar") || combined.includes("cocktail") || combined.includes("wine")) return "Mixology & Nightlife";
  if (combined.includes("store") || combined.includes("boutique") || combined.includes("fashion")) return "Experience Retail";
  if (combined.includes("wellness") || combined.includes("sauna") || combined.includes("spa")) return "Urban Wellness";
  if (combined.includes("tour") || combined.includes("canal") || combined.includes("boat")) return "Curated Tour";
  return "Urban Exploration";
}
`;

content = content.substring(0, startIdx) + demandLedLogic + content.substring(endIdx);
fs.writeFileSync(file, content);
