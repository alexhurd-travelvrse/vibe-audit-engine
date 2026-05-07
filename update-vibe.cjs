const fs = require("fs");
const file = "src/personaEngine.js";
let content = fs.readFileSync(file, "utf8");

const startIdx = content.indexOf("export async function scrapeLocalSignals");
const endMarker = "/**\r\n * Agent B: The Discoverability Auditor";
const endIdx = content.indexOf(endMarker);

const newFunction = `export async function scrapeLocalSignals(city, neighborhood) {
  const c = (city || "").toLowerCase();
  const n = (neighborhood || "").toLowerCase();
  const targetArea = neighborhood || city;
  console.log(\`[Agent A] Initializing Vibe Stack for \${targetArea}...\`);
  
  const API_KEY = import.meta.env.VITE_SERPER_API_KEY;
  const HEADERS = { 'X-API-KEY': API_KEY, 'Content-Type': 'application/json' };
  
  // Layer 1: The Authority Pulse (Elite 20 Publishers)
  const eliteSites = "site:timeout.com OR site:ra.co OR site:cntraveler.com OR site:theinfatuation.com OR site:vice.com OR site:wallpaper.com OR site:highsnobiety.com OR site:hypebeast.com OR site:monocle.com OR site:suitcasemag.com";
  const baseQuery = \`\${eliteSites} \${targetArea} hidden gems local experiences\`;
  
  try {
    // Run Core Search
    const searchRes = await fetch(\`https://google.serper.dev/search\`, {
      method: 'POST', headers: HEADERS, body: JSON.stringify({ q: baseQuery, num: 10 })
    });
    const searchData = await searchRes.json();
    
    // Extract Related Searches for the "Demand Layer" cross-reference
    const relatedSearches = searchData.relatedSearches ? searchData.relatedSearches.map(r => r.query.toLowerCase()) : [];
    
    if (searchData.organic && searchData.organic.length > 0) {
      // Clean and isolate top 5 venues/experiences
      let candidates = searchData.organic.slice(0, 5).map(item => {
        let name = item.title.split('-')[0].split('|')[0].trim();
        name = name.replace(/The Best|Top 10|Guide to|Things to Do in|Hidden Gems in/ig, '').trim();
        return { name: name.substring(0, 40), source: new URL(item.link).hostname.replace('www.', '') };
      });

      // Layer 2 & 3: Bookability (Places API) + Social Velocity (TikTok Cross-Check)
      const validatedTrends = await Promise.all(candidates.map(async (candidate) => {
        let trendScore = 50; // Base score
        let isBookable = false;
        let rating = "N/A";
        
        // Parallel Fetch 1: Google Places API via Serper (Bookability)
        const placesPromise = fetch(\`https://google.serper.dev/places\`, {
          method: 'POST', headers: HEADERS, body: JSON.stringify({ q: \`\${candidate.name} \${targetArea}\` })
        }).then(r => r.json()).catch(() => ({}));

        // Parallel Fetch 2: TikTok Cross-Check via Serper (Social Velocity)
        const socialPromise = fetch(\`https://google.serper.dev/search\`, {
          method: 'POST', headers: HEADERS, body: JSON.stringify({ q: \`site:tiktok.com "\${candidate.name}" \${targetArea}\` })
        }).then(r => r.json()).catch(() => ({}));

        const [placesData, socialData] = await Promise.all([placesPromise, socialPromise]);

        // Evaluate Bookability
        if (placesData.places && placesData.places.length > 0) {
          const place = placesData.places[0];
          rating = place.rating || "N/A";
          if (place.ratingCount > 50) trendScore += 20; // High review volume means active demand
          if (place.address) isBookable = true; // Physical location exists
        }

        // Evaluate Social Velocity (TikTok)
        if (socialData.organic && socialData.organic.length > 0) {
           trendScore += 30; // Massive multiplier for TikTok index presence
        }

        // Evaluate Demand (Related Searches overlap)
        if (relatedSearches.some(q => q.includes(candidate.name.toLowerCase()))) {
           trendScore += 20;
        }

        return {
          name: \`? \${candidate.name}\`,
          source: candidate.source,
          score: Math.min(trendScore, 100),
          isBookable,
          rating
        };
      }));

      // Sort by the new Vibe Score
      validatedTrends.sort((a, b) => b.score - a.score);

      return {
        city,
        neighborhood,
        sentiment: 'High-Velocity & Emergent',
        topExperiences: validatedTrends,
        velocity: 9.8
      };
    }
  } catch (err) {
    console.error("[Agent A] Serper Vibe Stack failed...", err);
  }

  // FALLBACK GENERATOR (Unchanged)
  console.log(\`[Agent A] UNIVERSAL DYNAMIC MODE...\`);
  const specificVibes = ["Private Heritage Tour", "Underground Mixology", "Secret Vinyl Session", "Wellness & Sauna Ritual"].map(s => ({
    name: \`? \${s} \${targetArea}\`, source: "timeout.com", score: 60, isBookable: false, rating: "N/A"
  }));
  return { city, neighborhood, sentiment: 'Emerging & Dynamic', topExperiences: specificVibes, velocity: 9.2 };
}

`;

content = content.substring(0, startIdx) + newFunction + content.substring(endIdx);
fs.writeFileSync(file, content);
