const fs = require("fs");
const file = "src/personaEngine.js";
let content = fs.readFileSync(file, "utf8");

const startIdx = content.indexOf("export const VIBE_TAXONOMY");
const endMarker = "/**\r\n * Agent B: The Discoverability Auditor";
const endIdx = content.indexOf(endMarker);

const trendFirstLogic = `
export async function scrapeLocalSignals(city, neighborhood) {
  const targetArea = neighborhood || city;
  const API_KEY = import.meta.env.VITE_SERPER_API_KEY;
  const HEADERS = { 'X-API-KEY': API_KEY, 'Content-Type': 'application/json' };
  
  console.log(\`[Agent A] Scraping Emerging Trends for \${targetArea}...\`);

  try {
    // 1. OPEN VIBE SEARCH: Target 20 Elite Publishers for the "Soul" of the city
    const eliteSites = "site:timeout.com OR site:ra.co OR site:cntraveler.com OR site:theinfatuation.com OR site:wallpaper.com OR site:highsnobiety.com OR site:monocle.com OR site:dezeen.com OR site:nowness.com";
    const query = \`\${eliteSites} "\${targetArea}" hidden gems "underground" OR "emerging" OR "secret" experience\`;

    const searchRes = await fetch(\`https://google.serper.dev/search\`, {
      method: 'POST', headers: HEADERS, body: JSON.stringify({ q: query, num: 20 })
    });
    const searchData = await searchRes.json();
    const relatedSearches = searchData.relatedSearches ? searchData.relatedSearches.map(r => r.query.toLowerCase()) : [];
    
    if (searchData.organic && searchData.organic.length > 0) {
      const candidates = searchData.organic.slice(0, 10).map(item => {
        let name = item.title.split('-')[0].split('|')[0].trim();
        // CLEANING: Extract the "Harbour Saunas" style noun phrase
        name = name.replace(/The Best|Top 10|Guide to|Gems in|In \${targetArea}/ig, '').trim();
        return { name, source: new URL(item.link).hostname.replace('www.', ''), snippet: item.snippet, link: item.link };
      });

      // 2. TREND VALIDATION (The Vibe Stack)
      const validatedTrends = await Promise.all(candidates.map(async (candidate) => {
        let trendScore = 20; // Base Publisher Boost
        let demandLabel = "Emergent Signal";
        let venueName = candidate.name;
        
        const [placesData, socialData] = await Promise.all([
          fetch(\`https://google.serper.dev/places\`, { method: 'POST', headers: HEADERS, body: JSON.stringify({ q: \`\${candidate.name} \${targetArea}\` }) }).then(r => r.json()).catch(() => ({})),
          fetch(\`https://google.serper.dev/search\`, { method: 'POST', headers: HEADERS, body: JSON.stringify({ q: \`site:tiktok.com "\${candidate.name}" \${targetArea}\` }) }).then(r => r.json()).catch(() => ({}))
        ]);

        const hasPhysicalPlace = placesData.places && placesData.places.length > 0;
        const hasSocialPresence = socialData.organic && socialData.organic.length > 0;

        if (hasPhysicalPlace) {
          const place = placesData.places[0];
          venueName = place.title;
          if (place.ratingCount > 10) trendScore += 20;
        }

        if (hasSocialPresence) {
          trendScore += 30;
          demandLabel = "High Social Velocity";
        }

        if (relatedSearches.some(q => q.includes(candidate.name.toLowerCase()))) {
          trendScore += 30;
          demandLabel = "Trending Search Topic";
        }

        return {
          name: venueName,
          category: deriveAdaptiveCategory({ title: venueName, snippet: candidate.snippet, link: candidate.link }),
          demandLabel: demandLabel,
          score: Math.min(trendScore, 100)
        };
      }));

      const results = validatedTrends.filter(t => t !== null);
      results.sort((a, b) => b.score - a.score);

      // Deduplicate by name
      const uniqueResults = [];
      const seen = new Set();
      for (const t of results) {
        if (!seen.has(t.name.toLowerCase())) {
          uniqueResults.push(t);
          seen.add(t.name.toLowerCase());
        }
      }

      return {
        city, neighborhood,
        sentiment: 'Emerging Market Trends',
        topExperiences: uniqueResults.slice(0, 5),
        velocity: 9.8
      };
    }
  } catch (err) {
    console.error("[Agent A] Trend Stack failed...", err);
  }

  return { city, neighborhood, sentiment: 'Emerging & Dynamic', topExperiences: [], velocity: 9.2 };
}

// Keep the adaptive category as a secondary metadata label
function deriveAdaptiveCategory(item) {
  const combined = (item.title + " " + item.snippet + " " + item.link).toLowerCase();
  if (combined.includes("food") || combined.includes("restaurant") || combined.includes("tasting")) return "Culinary Experience";
  if (combined.includes("bar") || combined.includes("cocktail") || combined.includes("wine")) return "Mixology & Nightlife";
  if (combined.includes("store") || combined.includes("boutique") || combined.includes("fashion")) return "Experience Retail";
  if (combined.includes("wellness") || combined.includes("sauna") || combined.includes("spa")) return "Urban Wellness";
  if (combined.includes("tour") || combined.includes("canal") || combined.includes("boat")) return "Curated Tour";
  return "Urban Exploration";
}
`;

content = content.substring(0, startIdx) + trendFirstLogic + content.substring(endIdx);
fs.writeFileSync(file, content);
