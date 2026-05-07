const fs = require("fs");
const file = "src/personaEngine.js";
let content = fs.readFileSync(file, "utf8");

const startIdx = content.indexOf("export async function scrapeLocalSignals");
const endMarker = "/**\r\n * Agent B: The Discoverability Auditor";
const endIdx = content.indexOf(endMarker);

const newFunction = `export async function scrapeLocalSignals(city, neighborhood) {
  const targetArea = neighborhood || city;
  const API_KEY = import.meta.env.VITE_SERPER_API_KEY;
  const HEADERS = { 'X-API-KEY': API_KEY, 'Content-Type': 'application/json' };
  
  console.log(\`[Agent A] Initializing Vibe Stack for \${targetArea}...\`);

  // BROADENING SITES to ensure we fill 5 slots with variety
  const eliteSites = "site:timeout.com OR site:ra.co OR site:cntraveler.com OR site:theinfatuation.com OR site:wallpaper.com OR site:highsnobiety.com OR site:monocle.com OR site:getyourguide.com";
  const baseQuery = \`\${eliteSites} \${targetArea} "curated" OR "hidden" OR "tour" OR "experience"\`;
  
  try {
    const searchRes = await fetch(\`https://google.serper.dev/search\`, {
      method: 'POST', headers: HEADERS, body: JSON.stringify({ q: baseQuery, num: 25 })
    });
    const searchData = await searchRes.json();
    
    if (searchData.organic && searchData.organic.length > 0) {
      const sourceCounts = {};
      let candidates = [];
      
      for (const item of searchData.organic) {
        const source = new URL(item.link).hostname.replace('www.', '');
        sourceCounts[source] = (sourceCounts[source] || 0) + 1;
        
        if (sourceCounts[source] <= 3) {
          let name = item.title.split('-')[0].split('|')[0].trim();
          name = name.replace(/The Best|Top 10|Guide to|Secret|Hidden|Gems in|In \${targetArea}/ig, '').trim();
          candidates.push({ name, source, snippet: item.snippet });
        }
        if (candidates.length >= 10) break; 
      }

      const validatedTrends = await Promise.all(candidates.map(async (candidate) => {
        let trendScore = 50;
        let demandLabel = "Emergent Signal";
        let venueName = candidate.name;
        
        // 1. Google Places (Physical Validation)
        const placesData = await fetch(\`https://google.serper.dev/places\`, {
          method: 'POST', headers: HEADERS, body: JSON.stringify({ q: \`\${candidate.name} \${targetArea}\` })
        }).then(r => r.json()).catch(() => ({}));

        // 2. GetYourGuide (Tour Bookability Validation)
        const gygData = await fetch(\`https://google.serper.dev/search\`, {
          method: 'POST', headers: HEADERS, body: JSON.stringify({ q: \`site:getyourguide.com "\${candidate.name}" \${targetArea}\` })
        }).then(r => r.json()).catch(() => ({}));

        // 3. TikTok (Social Proof)
        const socialData = await fetch(\`https://google.serper.dev/search\`, {
          method: 'POST', headers: HEADERS, body: JSON.stringify({ q: \`site:tiktok.com "\${candidate.name}" \${targetArea}\` })
        }).then(r => r.json()).catch(() => ({}));

        if (placesData.places && placesData.places.length > 0) {
          const place = placesData.places[0];
          venueName = place.title; 
          if (place.ratingCount > 20) {
             trendScore += 20;
             demandLabel = "High Local Demand";
          }
        }

        if (gygData.organic && gygData.organic.length > 0) {
          trendScore += 30; // High weighting for tour existence
          demandLabel = "Verified Bookable Tour";
        }

        if (socialData.organic && socialData.organic.length > 0) {
          trendScore += 15;
          if (demandLabel === "Emergent Signal") demandLabel = "Social Velocity High";
        }

        return {
          name: venueName,
          category: deriveAdaptiveCategory({ title: venueName, snippet: candidate.snippet, link: candidate.source }),
          demandLabel: demandLabel,
          score: Math.min(trendScore, 100)
        };
      }));

      // Deduplicate and filter out generic results
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
        sentiment: 'Verified Market Intelligence',
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

content = content.substring(0, startIdx) + newFunction + content.substring(endIdx);
fs.writeFileSync(file, content);
