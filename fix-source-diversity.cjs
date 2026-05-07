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
  
  const eliteSites = "site:timeout.com OR site:ra.co OR site:cntraveler.com OR site:theinfatuation.com OR site:vice.com OR site:wallpaper.com OR site:highsnobiety.com OR site:monocle.com";
  const baseQuery = \`\${eliteSites} \${targetArea} "curated" OR "emerging" OR "underground" OR "boutique" experience\`;
  
  try {
    const searchRes = await fetch(\`https://google.serper.dev/search\`, {
      method: 'POST', headers: HEADERS, body: JSON.stringify({ q: baseQuery, num: 15 })
    });
    const searchData = await searchRes.json();
    
    if (searchData.organic && searchData.organic.length > 0) {
      // Source Balancing: We want a mix, not just RA.co
      const sourceCounts = {};
      let candidates = [];
      
      for (const item of searchData.organic) {
        const source = new URL(item.link).hostname.replace('www.', '');
        sourceCounts[source] = (sourceCounts[source] || 0) + 1;
        
        // Limit to 2 results per source to ensure diversity
        if (sourceCounts[source] <= 2) {
          let name = item.title.split('-')[0].split('|')[0].trim();
          name = name.replace(/The Best|Top 10|Guide to|Secret|Hidden|Gems in|In \${targetArea}/ig, '').trim();
          candidates.push({ name: name.substring(0, 40), source, snippet: item.snippet });
        }
        if (candidates.length >= 5) break;
      }

      const validatedTrends = await Promise.all(candidates.map(async (candidate) => {
        let trendScore = 50;
        let isBookable = false;
        let rating = "N/A";
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
          rating = place.rating || "N/A";
          if (place.ratingCount > 15) trendScore += 25;
          if (place.address) isBookable = true;
        }

        if (socialData.organic && socialData.organic.length > 0) trendScore += 25;
        
        return {
          name: venueName, // Removed emoji to fix the '?' issue
          source: candidate.source,
          score: Math.min(trendScore, 100),
          isBookable,
          rating
        };
      }));

      validatedTrends.sort((a, b) => b.score - a.score);

      return {
        city, neighborhood,
        sentiment: 'Multi-Source Signal',
        topExperiences: validatedTrends,
        velocity: 9.8
      };
    }
  } catch (err) {
    console.error("[Agent A] Serper Vibe Stack failed...", err);
  }

  return { city, neighborhood, sentiment: 'Emerging & Dynamic', topExperiences: [], velocity: 9.2 };
}

`;

content = content.substring(0, startIdx) + newFunction + content.substring(endIdx);
fs.writeFileSync(file, content);
