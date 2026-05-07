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
  
  try {
    const tourQuery = \`site:getyourguide.com OR site:viator.com "\${targetArea}" tour experience\`;
    const trendQuery = \`site:timeout.com OR site:wallpaper.com OR site:highsnobiety.com OR site:monocle.com OR site:cntraveler.com "\${targetArea}" curated experience\`;

    const [tourRes, trendRes] = await Promise.all([
      fetch(\`https://google.serper.dev/search\`, { method: 'POST', headers: HEADERS, body: JSON.stringify({ q: tourQuery, num: 15 }) }).then(r => r.json()),
      fetch(\`https://google.serper.dev/search\`, { method: 'POST', headers: HEADERS, body: JSON.stringify({ q: trendQuery, num: 25 }) }).then(r => r.json())
    ]);

    const allOrganic = [...(tourRes.organic || []), ...(trendRes.organic || [])];
    const relatedSearches = [...(tourRes.relatedSearches || []), ...(trendRes.relatedSearches || [])].map(r => r.query.toLowerCase());

    if (allOrganic.length > 0) {
      let candidates = allOrganic.map(item => {
        let name = item.title.split('-')[0].split('|')[0].trim();
        name = name.replace(/The Best|Top 10|Guide to|Secret|Hidden|Gems in|In \${targetArea}/ig, '').trim();
        return { name, source: new URL(item.link).hostname.replace('www.', ''), snippet: item.snippet, link: item.link };
      });

      candidates = Array.from(new Map(candidates.map(c => [c.name.toLowerCase(), c])).values());

      const validatedTrends = await Promise.all(candidates.slice(0, 15).map(async (candidate) => {
        let trendScore = 0;
        let demandLabel = "Emergent Signal";
        let venueName = candidate.name;
        
        const [placesData, gygData, socialData] = await Promise.all([
          fetch(\`https://google.serper.dev/places\`, { method: 'POST', headers: HEADERS, body: JSON.stringify({ q: \`\${candidate.name} \${targetArea}\` }) }).then(r => r.json()).catch(() => ({})),
          fetch(\`https://google.serper.dev/search\`, { method: 'POST', headers: HEADERS, body: JSON.stringify({ q: \`site:getyourguide.com "\${candidate.name}" \${targetArea}\` }) }).then(r => r.json()).catch(() => ({})),
          fetch(\`https://google.serper.dev/search\`, { method: 'POST', headers: HEADERS, body: JSON.stringify({ q: \`site:tiktok.com "\${candidate.name}" \${targetArea}\` }) }).then(r => r.json()).catch(() => ({}))
        ]);

        const hasPhysicalPlace = placesData.places && placesData.places.length > 0;
        const hasTourListing = gygData.organic && gygData.organic.length > 0;
        if (!hasPhysicalPlace && !hasTourListing) return null;

        if (relatedSearches.some(q => q.includes(candidate.name.toLowerCase()))) trendScore += 30;
        if (socialData.organic && socialData.organic.length > 0) trendScore += 30;
        
        if (hasPhysicalPlace) {
          const place = placesData.places[0];
          venueName = place.title;
          if (place.ratingCount > 20) {
            trendScore += 20;
            demandLabel = "High Local Demand";
          }
        }
        
        if (hasTourListing) trendScore += 10; // Small boost for tour existence

        return {
          name: venueName,
          category: deriveAdaptiveCategory({ title: venueName, snippet: candidate.snippet, link: candidate.link }),
          demandLabel: demandLabel,
          score: Math.min(trendScore, 100)
        };
      }));

      const results = validatedTrends.filter(t => t !== null);
      results.sort((a, b) => b.score - a.score);

      // IRONCLAD BASKET LOGIC
      const finalTrends = [];
      let tourCount = 0;
      const seenCategories = {};

      for (const t of results) {
        const isTour = t.name.toLowerCase().match(/tour|cruise|canal|boat|trip|guided/);
        
        if (isTour) {
          if (tourCount < 2) {
            finalTrends.push(t);
            tourCount++;
          }
        } else {
          // Non-tour items: Limit to 2 per specific category to ensure diversity
          const cat = t.category;
          seenCategories[cat] = (seenCategories[cat] || 0) + 1;
          if (seenCategories[cat] <= 2) {
            finalTrends.push(t);
          }
        }
        if (finalTrends.length >= 5) break;
      }

      return {
        city, neighborhood,
        sentiment: 'Validated Market Intelligence',
        topExperiences: finalTrends,
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
