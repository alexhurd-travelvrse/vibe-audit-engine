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
  
  console.log(\`[Agent A] Initializing High-Fidelity Vibe Stack for \${targetArea}...\`);

  try {
    // 1. DIVERSIFIED SOURCE SEARCH
    const tourQuery = \`site:getyourguide.com OR site:viator.com "\${targetArea}" tour experience\`;
    const trendQuery = \`site:timeout.com OR site:wallpaper.com OR site:highsnobiety.com OR site:monocle.com OR site:cntraveler.com "\${targetArea}" curated experience\`;

    const [tourRes, trendRes] = await Promise.all([
      fetch(\`https://google.serper.dev/search\`, { method: 'POST', headers: HEADERS, body: JSON.stringify({ q: tourQuery, num: 15 }) }).then(r => r.json()),
      fetch(\`https://google.serper.dev/search\`, { method: 'POST', headers: HEADERS, body: JSON.stringify({ q: trendQuery, num: 15 }) }).then(r => r.json())
    ]);

    const allOrganic = [...(tourRes.organic || []), ...(trendRes.organic || [])];
    const relatedSearches = [...(tourRes.relatedSearches || []), ...(trendRes.relatedSearches || [])].map(r => r.query.toLowerCase());

    if (allOrganic.length > 0) {
      let candidates = allOrganic.map(item => {
        let name = item.title.split('-')[0].split('|')[0].trim();
        name = name.replace(/The Best|Top 10|Guide to|Secret|Hidden|Gems in|In \${targetArea}/ig, '').trim();
        // Keep track if it came from a publisher vs aggregator
        const isPublisher = !item.link.includes('getyourguide.com') && !item.link.includes('viator.com');
        return { name, source: new URL(item.link).hostname.replace('www.', ''), snippet: item.snippet, link: item.link, isPublisher };
      });

      // Deduplicate
      candidates = Array.from(new Map(candidates.map(c => [c.name.toLowerCase(), c])).values());

      const validatedTrends = await Promise.all(candidates.slice(0, 12).map(async (candidate) => {
        let trendScore = 0;
        let demandLabel = "Emergent Signal";
        let venueName = candidate.name;
        
        // Parallel Validation
        const [placesData, gygData, socialData] = await Promise.all([
          fetch(\`https://google.serper.dev/places\`, { method: 'POST', headers: HEADERS, body: JSON.stringify({ q: \`\${candidate.name} \${targetArea}\` }) }).then(r => r.json()).catch(() => ({})),
          fetch(\`https://google.serper.dev/search\`, { method: 'POST', headers: HEADERS, body: JSON.stringify({ q: \`site:getyourguide.com "\${candidate.name}" \${targetArea}\` }) }).then(r => r.json()).catch(() => ({})),
          fetch(\`https://google.serper.dev/search\`, { method: 'POST', headers: HEADERS, body: JSON.stringify({ q: \`site:tiktok.com "\${candidate.name}" \${targetArea}\` }) }).then(r => r.json()).catch(() => ({}))
        ]);

        const hasPhysicalPlace = placesData.places && placesData.places.length > 0;
        const hasTourListing = gygData.organic && gygData.organic.length > 0;

        // THE GATEKEEPER: Must be bookable/visitable to pass
        if (!hasPhysicalPlace && !hasTourListing) return null;

        // 1. Publisher Boost (+20)
        if (candidate.isPublisher) trendScore += 20;

        // 2. Search Trends (+30) - THE HIGHEST WEIGHT
        const isTrending = relatedSearches.some(q => q.includes(candidate.name.toLowerCase()));
        if (isTrending) {
          trendScore += 30;
          demandLabel = "Trending Search Topic";
        }

        // 3. TikTok Velocity (+30) - THE HIGHEST WEIGHT
        if (socialData.organic && socialData.organic.length > 0) {
          trendScore += 30;
          demandLabel = "High Social Velocity";
        }

        // 4. Review Volume (+20)
        if (hasPhysicalPlace) {
          const place = placesData.places[0];
          venueName = place.title;
          if (place.ratingCount > 20) {
            trendScore += 20;
            if (demandLabel === "Emergent Signal") demandLabel = "High Local Demand";
          }
        } else if (hasTourListing) {
           demandLabel = "Verified Bookable Tour";
        }

        return {
          name: venueName,
          category: deriveAdaptiveCategory({ title: venueName, snippet: candidate.snippet, link: candidate.link }),
          demandLabel: demandLabel,
          score: Math.min(trendScore, 100)
        };
      }));

      // Filter out nulls (Gatekeeper rejects) and sort
      const finalTrends = validatedTrends.filter(t => t !== null);
      finalTrends.sort((a, b) => b.score - a.score);

      return {
        city, neighborhood,
        sentiment: 'Validated Market Intelligence',
        topExperiences: finalTrends.slice(0, 5),
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
