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
  
  // Refined Layer 1: Drill down into SPECIFIC venues and workshops
  const eliteSites = "site:timeout.com OR site:ra.co OR site:cntraveler.com OR site:theinfatuation.com OR site:wallpaper.com OR site:highsnobiety.com";
  // We add intent keywords like "booking" "tickets" "venue" to avoid generic listicles
  const baseQuery = \`\${eliteSites} \${targetArea} "specific" "secret" OR "hidden" venue experience booking\`;
  
  try {
    const searchRes = await fetch(\`https://google.serper.dev/search\`, {
      method: 'POST', headers: HEADERS, body: JSON.stringify({ q: baseQuery, num: 10 })
    });
    const searchData = await searchRes.json();
    const relatedSearches = searchData.relatedSearches ? searchData.relatedSearches.map(r => r.query.toLowerCase()) : [];
    
    if (searchData.organic && searchData.organic.length > 0) {
      // ADVANCED EXTRACTION: Skip listicle titles and try to find specific nouns
      let candidates = searchData.organic
        .filter(item => {
          // Filter out obvious broad listicles
          const t = item.title.toLowerCase();
          return !t.includes("best restaurants") && !t.includes("things to do") && !t.includes("best hotels");
        })
        .slice(0, 5)
        .map(item => {
          let name = item.title.split('-')[0].split('|')[0].trim();
          // Stripping more generic terms to find the "Heart" of the experience
          name = name.replace(/The Best|Top 10|Guide to|Secret|Hidden|Experience|In Copenhagen|In Miami/ig, '').trim();
          
          // If the title is still too broad, we try to grab a proper noun from the snippet
          if (name.split(' ').length > 5 || name.toLowerCase().includes("restaurants")) {
            const match = item.snippet.match(/[A-Z][a-z]+ [A-Z][a-z]+/); // Very basic proper noun extraction
            if (match) name = match[0];
          }

          return { 
            name: name.substring(0, 40), 
            source: new URL(item.link).hostname.replace('www.', '') 
          };
        });

      // If we filtered out too many, fallback to the original list but still clean them
      if (candidates.length < 3) {
         candidates = searchData.organic.slice(0, 5).map(item => {
            let name = item.title.split('-')[0].split('|')[0].trim();
            name = name.replace(/The Best|Top 10|Guide to|Secret|Hidden/ig, '').trim();
            return { name: name.substring(0, 40), source: new URL(item.link).hostname.replace('www.', '') };
         });
      }

      const validatedTrends = await Promise.all(candidates.map(async (candidate) => {
        let trendScore = 50;
        let isBookable = false;
        let rating = "N/A";
        let venueName = candidate.name;
        
        // Pinging Places API with the specific candidate name
        const placesData = await fetch(\`https://google.serper.dev/places\`, {
          method: 'POST', headers: HEADERS, body: JSON.stringify({ q: \`\${candidate.name} \${targetArea}\` })
        }).then(r => r.json()).catch(() => ({}));

        const socialData = await fetch(\`https://google.serper.dev/search\`, {
          method: 'POST', headers: HEADERS, body: JSON.stringify({ q: \`site:tiktok.com "\${candidate.name}" \${targetArea}\` })
        }).then(r => r.json()).catch(() => ({}));

        if (placesData.places && placesData.places.length > 0) {
          const place = placesData.places[0];
          // If Places found a specific venue, use the EXACT venue name from Google Maps
          venueName = place.title; 
          rating = place.rating || "N/A";
          if (place.ratingCount > 30) trendScore += 25;
          if (place.address) isBookable = true;
        }

        if (socialData.organic && socialData.organic.length > 0) trendScore += 25;
        if (relatedSearches.some(q => q.includes(candidate.name.toLowerCase()))) trendScore += 15;

        return {
          name: \`? \${venueName}\`,
          source: candidate.source,
          score: Math.min(trendScore, 100),
          isBookable,
          rating
        };
      }));

      validatedTrends.sort((a, b) => b.score - a.score);

      return {
        city, neighborhood,
        sentiment: 'High-Velocity & Emergent',
        topExperiences: validatedTrends,
        velocity: 9.8
      };
    }
  } catch (err) {
    console.error("[Agent A] Serper Vibe Stack failed...", err);
  }

  // FALLBACK
  return { city, neighborhood, sentiment: 'Emerging & Dynamic', topExperiences: [], velocity: 9.2 };
}

`;

content = content.substring(0, startIdx) + newFunction + content.substring(endIdx);
fs.writeFileSync(file, content);
