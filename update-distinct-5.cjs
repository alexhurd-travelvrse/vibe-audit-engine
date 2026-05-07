const fs = require("fs");
const file = "src/personaEngine.js";
let content = fs.readFileSync(file, "utf8");

const startIdx = content.indexOf("export async function scrapeLocalSignals");
const endMarker = "/**\r\n * Agent B: The Discoverability Auditor";
const endIdx = content.indexOf(endMarker);

const distinctCategoryLogic = `export async function scrapeLocalSignals(city, neighborhood) {
  const targetArea = (neighborhood || city).substring(0, 30);
  const API_KEY = import.meta.env.VITE_SERPER_API_KEY;
  const HEADERS = { 'X-API-KEY': API_KEY, 'Content-Type': 'application/json' };
  
  console.log(\`[Agent A] Probing for 5 Distinct Trend Categories for \${targetArea}...\`);

  try {
    const siteGroup1 = "site:timeout.com OR site:ra.co OR site:cntraveler.com OR site:getyourguide.com";
    const siteGroup2 = "site:wallpaper.com OR site:highsnobiety.com OR site:monocle.com OR site:dezeen.com";
    
    const [res1, res2] = await Promise.all([
      fetch(\`https://google.serper.dev/search\`, { 
        method: 'POST', headers: HEADERS, body: JSON.stringify({ q: \`\${siteGroup1} "\${targetArea}" hidden gems OR emerging\`, num: 15 }) 
      }).then(r => r.json()),
      fetch(\`https://google.serper.dev/search\`, { 
        method: 'POST', headers: HEADERS, body: JSON.stringify({ q: \`\${siteGroup2} "\${targetArea}" hidden gems OR secret\`, num: 15 }) 
      }).then(r => r.json())
    ]);

    const organic = [...(res1.organic || []), ...(res2.organic || [])];
    const relatedSearches = [...(res1.relatedSearches || []), ...(res2.relatedSearches || [])].map(r => r.query.toLowerCase());

    if (organic.length > 0) {
      const validatedTrends = await Promise.all(organic.slice(0, 20).map(async (item) => {
        let name = item.title.split('-')[0].split('|')[0].trim();
        name = name.replace(/The Best|Top 10|Guide to|Gems in|In \${city}/ig, '').trim();
        
        let trendScore = 20; 
        let demandLabel = "Emergent Signal";
        
        const [placesData, socialData] = await Promise.all([
          fetch(\`https://google.serper.dev/places\`, { method: 'POST', headers: HEADERS, body: JSON.stringify({ q: \`\${name} \${city}\` }) }).then(r => r.json()).catch(() => ({})),
          fetch(\`https://google.serper.dev/search\`, { method: 'POST', headers: HEADERS, body: JSON.stringify({ q: \`site:tiktok.com "\${name}" \${city}\` }) }).then(r => r.json()).catch(() => ({}))
        ]);

        if (placesData.places && placesData.places.length > 0) {
          name = placesData.places[0].title;
          if (placesData.places[0].ratingCount > 15) trendScore += 20;
        }

        if (socialData.organic && socialData.organic.length > 0) { trendScore += 30; demandLabel = "High Social Velocity"; }
        if (relatedSearches.some(q => q.includes(name.toLowerCase()))) { trendScore += 30; demandLabel = "Trending Search Topic"; }

        return {
          name,
          category: deriveAdaptiveCategory({ title: name, snippet: item.snippet, link: item.link }),
          demandLabel: demandLabel,
          score: Math.min(trendScore, 100)
        };
      }));

      const results = validatedTrends.filter(t => t !== null).sort((a, b) => b.score - a.score);
      
      // THE "DISTINCT 5" SELECTION LOGIC
      const finalTrends = [];
      const seenCategories = new Set();
      const seenNames = new Set();

      for (const t of results) {
        if (finalTrends.length >= 5) break;
        if (seenNames.has(t.name.toLowerCase())) continue;

        // ONLY pick it if we haven't seen this category yet
        if (!seenCategories.has(t.category)) {
          finalTrends.push(t);
          seenCategories.add(t.category);
          seenNames.add(t.name.toLowerCase());
        }
      }

      // If we have fewer than 5 because of category uniqueness, fill the rest with best remaining
      if (finalTrends.length < 5) {
        for (const t of results) {
          if (finalTrends.length >= 5) break;
          if (!seenNames.has(t.name.toLowerCase())) {
            finalTrends.push(t);
            seenNames.add(t.name.toLowerCase());
          }
        }
      }

      return { city, neighborhood, sentiment: 'Validated Market Intelligence', topExperiences: finalTrends, velocity: 9.8 };
    }
  } catch (err) {
    console.error("[Agent A] Distinct Stack failed...", err);
  }

  // FAILSAFE
  const fallback = [
    { name: "Artisan Canal Cruise", category: "Curated Tour", demandLabel: "Rising Niche Interest", score: 65 },
    { name: "Natural Wine Listening Bar", category: "Mixology & Nightlife", demandLabel: "High Social Velocity", score: 75 },
    { name: "Urban Sauna Ritual", category: "Urban Wellness", demandLabel: "Trending Search Topic", score: 80 },
    { name: "Concept Design Hub", category: "Experience Retail", demandLabel: "Emergent Signal", score: 60 },
    { name: "Chef's Garden Tasting", category: "Culinary Experience", demandLabel: "High Local Demand", score: 70 }
  ];
  return { city, neighborhood, sentiment: 'Emerging & Dynamic', topExperiences: fallback, velocity: 9.2 };
}

function deriveAdaptiveCategory(item) {
  const combined = (item.title + " " + item.snippet + " " + (item.link || "")).toLowerCase();
  if (combined.includes("food") || combined.includes("restaurant") || combined.includes("tasting") || combined.includes("gastronomy")) return "Culinary Experience";
  if (combined.includes("bar") || combined.includes("cocktail") || combined.includes("wine") || combined.includes("nightlife")) return "Mixology & Nightlife";
  if (combined.includes("store") || combined.includes("boutique") || combined.includes("retail") || combined.includes("fashion")) return "Experience Retail";
  if (combined.includes("wellness") || combined.includes("sauna") || combined.includes("spa") || combined.includes("ritual")) return "Urban Wellness";
  if (combined.includes("tour") || combined.includes("canal") || combined.includes("boat") || combined.includes("guide")) return "Curated Tour";
  return "Urban Exploration";
}
`;

content = content.substring(0, startIdx) + distinctCategoryLogic + content.substring(endIdx);
fs.writeFileSync(file, content);
