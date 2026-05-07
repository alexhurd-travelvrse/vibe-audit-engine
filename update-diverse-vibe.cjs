const fs = require("fs");
const file = "src/personaEngine.js";
let content = fs.readFileSync(file, "utf8");

const startIdx = content.indexOf("export async function scrapeLocalSignals");
const endMarker = "/**\r\n * Agent B: The Discoverability Auditor";
const endIdx = content.indexOf(endMarker);

const balancedTrendLogic = `
export async function scrapeLocalSignals(city, neighborhood) {
  const c = city || "";
  const n = neighborhood || "";
  const API_KEY = import.meta.env.VITE_SERPER_API_KEY;
  const HEADERS = { 'X-API-KEY': API_KEY, 'Content-Type': 'application/json' };
  
  console.log(\`[Agent A] Running Diverse Vibe Audit for \${n || c}...\`);

  try {
    // 1. DUAL-STREAM SEARCH (Widen to City for trends, Neighborhood for local specific)
    const eliteSites = "site:timeout.com OR site:ra.co OR site:cntraveler.com OR site:theinfatuation.com OR site:wallpaper.com OR site:highsnobiety.com OR site:monocle.com";
    
    const [trendRes, gygRes] = await Promise.all([
      // Widen search to City if needed to ensure variety
      fetch(\`https://google.serper.dev/search\`, { 
        method: 'POST', headers: HEADERS, body: JSON.stringify({ q: \`\${eliteSites} \${c} "\${n}" hidden gems underground OR emerging experience\`, num: 30 }) 
      }).then(r => r.json()),
      // Explicitly pull 1 bookable tour
      fetch(\`https://google.serper.dev/search\`, { 
        method: 'POST', headers: HEADERS, body: JSON.stringify({ q: \`site:getyourguide.com "\${c}" tour experience\`, num: 5 }) 
      }).then(r => r.json())
    ]);

    const relatedSearches = (trendRes.relatedSearches || []).map(r => r.query.toLowerCase());
    
    // Combine and label candidates
    let candidates = [
      ...(trendRes.organic || []).map(item => ({ ...item, isTour: false })),
      ...(gygRes.organic || []).map(item => ({ ...item, isTour: true }))
    ];

    if (candidates.length > 0) {
      const validatedTrends = await Promise.all(candidates.map(async (item) => {
        let name = item.title.split('-')[0].split('|')[0].trim();
        name = name.replace(/The Best|Top 10|Guide to|Gems in|In \${c}|In \${n}/ig, '').trim();
        
        let trendScore = 0;
        let demandLabel = "Emergent Signal";
        
        const [placesData, socialData] = await Promise.all([
          fetch(\`https://google.serper.dev/places\`, { method: 'POST', headers: HEADERS, body: JSON.stringify({ q: \`\${name} \${c}\` }) }).then(r => r.json()).catch(() => ({})),
          fetch(\`https://google.serper.dev/search\`, { method: 'POST', headers: HEADERS, body: JSON.stringify({ q: \`site:tiktok.com "\${name}" \${c}\` }) }).then(r => r.json()).catch(() => ({}))
        ]);

        if (placesData.places && placesData.places.length > 0) {
          name = placesData.places[0].title;
          if (placesData.places[0].ratingCount > 10) trendScore += 20;
        }

        if (item.isTour) { trendScore += 30; demandLabel = "Verified Bookable Tour"; }
        if (socialData.organic && socialData.organic.length > 0) { trendScore += 30; if (!item.isTour) demandLabel = "High Social Velocity"; }
        if (relatedSearches.some(q => q.includes(name.toLowerCase()))) { trendScore += 20; if (!item.isTour) demandLabel = "Trending Search Topic"; }

        return {
          name,
          category: deriveAdaptiveCategory({ title: name, snippet: item.snippet, link: item.link }),
          demandLabel: demandLabel,
          score: Math.min(trendScore + 20, 100),
          isTour: item.isTour
        };
      }));

      // 3. THE "BALANCED 5" BASKET LOGIC
      const finalTrends = [];
      const usedCategories = new Set();
      let tourAdded = false;

      // Sort by score first
      const sorted = validatedTrends.filter(t => t !== null).sort((a, b) => b.score - a.score);

      // Rule A: Exactly 1 Tour from GYG
      const topTour = sorted.find(t => t.isTour);
      if (topTour) {
        finalTrends.push(topTour);
        tourAdded = true;
        usedCategories.add(topTour.category);
      }

      // Rule B: Diverse Lifestyle Categories (No duplicates)
      for (const t of sorted) {
        if (finalTrends.length >= 5) break;
        if (t.isTour) continue; // Skip extra tours
        if (!usedCategories.has(t.category)) {
          finalTrends.push(t);
          usedCategories.add(t.category);
        }
      }

      // Rule C: Fill remainders with highest scores if diversity exhausted
      if (finalTrends.length < 5) {
        for (const t of sorted) {
          if (finalTrends.length >= 5) break;
          if (!finalTrends.find(f => f.name === t.name)) {
            finalTrends.push(t);
          }
        }
      }

      return {
        city, neighborhood,
        sentiment: 'High-Diversity Market Audit',
        topExperiences: finalTrends,
        velocity: 9.8
      };
    }
  } catch (err) {
    console.error("[Agent A] Diverse Stack failed...", err);
  }

  return { city, neighborhood, sentiment: 'Emerging & Dynamic', topExperiences: [], velocity: 9.2 };
}

function deriveAdaptiveCategory(item) {
  const combined = (item.title + " " + item.snippet + " " + (item.link || "")).toLowerCase();
  if (combined.includes("food") || combined.includes("restaurant") || combined.includes("tasting") || combined.includes("gastronomy")) return "High-Fidelity Gastronomy";
  if (combined.includes("bar") || combined.includes("cocktail") || combined.includes("wine") || combined.includes("nightlife")) return "Mixology & Nightlife";
  if (combined.includes("store") || combined.includes("boutique") || combined.includes("retail") || combined.includes("fashion")) return "Experience Retail Design";
  if (combined.includes("wellness") || combined.includes("sauna") || combined.includes("spa") || combined.includes("ritual")) return "Next-Gen Wellness";
  if (combined.includes("tour") || combined.includes("canal") || combined.includes("boat") || combined.includes("getyourguide")) return "Curated Local Tour";
  if (combined.includes("art") || combined.includes("gallery") || combined.includes("design") || combined.includes("exhibition")) return "Immersive Art & Design";
  return "Urban Exploration";
}
`;

content = content.substring(0, startIdx) + balancedTrendLogic + content.substring(endIdx);
fs.writeFileSync(file, content);
