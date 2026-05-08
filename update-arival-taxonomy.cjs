const fs = require("fs");
const file = "src/personaEngine.js";
let content = fs.readFileSync(file, "utf8");

const startIdx = content.indexOf("export const VIBE_TAXONOMY");
// Find where the Agent B comment starts to define the end of the taxonomy/scrape block
const endMarker = "/**\n * Agent B: The Discoverability Auditor";
const endIdx = content.indexOf(endMarker);

const arivalLogic = `
export const VIBE_TAXONOMY = [
  {
    id: "CULINARY",
    label: "High-Fidelity Gastronomy",
    query: '"tasting menu" OR "chef table" OR "gastronomy" OR "food tours" OR "cooking classes" OR "wine tastings"',
    sites: "site:theinfatuation.com OR site:eater.com OR site:timeout.com"
  },
  {
    id: "WELLNESS",
    label: "Next-Gen Wellness & Rituals",
    query: '"spas" OR "urban sauna" OR "yoga & pilates" OR "hammams" OR "thermal spas" OR "wellness ritual"',
    sites: "site:monocle.com OR site:wallpaper.com OR site:cntraveler.com"
  },
  {
    id: "CULTURE",
    label: "Immersive Art & Culture",
    query: '"art classes" OR "craft classes" OR "immersive gallery" OR "museum tour" OR "heritage sites"',
    sites: "site:dezeen.com OR site:nowness.com OR site:designboom.com OR site:cntraveler.com"
  },
  {
    id: "ADVENTURE",
    label: "Land & Water Adventure",
    query: '"kayaking" OR "climbing" OR "hiking trails" OR "bike rentals" OR "scavenger hunts" OR "zipline"',
    sites: "site:getyourguide.com OR site:viator.com OR site:timeout.com OR site:cntraveler.com"
  },
  {
    id: "NIGHTLIFE",
    label: "Emergent Nightlife & Mixology",
    query: '"listening bar" OR "speakeasy" OR "natural wine" OR "distillery tour" OR "beer tasting"',
    sites: "site:ra.co OR site:timeout.com OR site:vice.com"
  },
  {
    id: "TOUR",
    label: "Curated Local Tours",
    query: '"walking tour" OR "hidden gems tour" OR "private guide" OR "neighborhood secrets" OR "architecture tour"',
    sites: "site:getyourguide.com OR site:viator.com OR site:cntraveler.com"
  }
];

/**
 * Agent A: The Parallel Taxonomy Probe
 * Scrapes neighborhood-level demand data based on industry standard verticals.
 */
export async function scrapeLocalSignals(city, neighborhood) {
  const targetArea = neighborhood || city;
  const API_KEY = import.meta.env.VITE_SERPER_API_KEY;
  const HEADERS = { 'X-API-KEY': API_KEY, 'Content-Type': 'application/json' };
  
  console.log(\`[Agent A] Executing Parallel Taxonomy Probe for \${targetArea} (Arival Standard)...\`);

  try {
    const verticalResults = await Promise.all(VIBE_TAXONOMY.map(async (vertical) => {
      const q = \`\${vertical.sites} "\${targetArea}" \${vertical.query}\`;
      const res = await fetch(\`https://google.serper.dev/search\`, {
        method: 'POST', headers: HEADERS, body: JSON.stringify({ q, num: 5 })
      }).then(r => r.json()).catch(() => ({}));

      if (res.organic && res.organic.length > 0) {
        const candidates = res.organic.filter(item => 
          !item.title.toLowerCase().includes("top 10") && 
          !item.title.toLowerCase().includes("best restaurants") &&
          !item.title.toLowerCase().includes("best things to do")
        );
        
        const item = candidates.length > 0 ? candidates[0] : res.organic[0];
        let name = item.title.split('-')[0].split('|')[0].trim();
        name = name.replace(/The Best|Top 10|Guide to|Secret|Hidden|Gems in|In \${targetArea}/ig, '').trim();
        
        return { 
          name, 
          source: new URL(item.link).hostname.replace('www.', ''), 
          snippet: item.snippet, 
          link: item.link, 
          vertical 
        };
      }
      return null;
    }));

    const rawCandidates = verticalResults.filter(c => c !== null);

    const validatedTrends = await Promise.all(rawCandidates.map(async (candidate) => {
      let trendScore = 20; 
      let demandLabel = "Emergent Signal";
      let venueName = candidate.name;
      
      const [placesData, socialData] = await Promise.all([
        fetch(\`https://google.serper.dev/places\`, { method: 'POST', headers: HEADERS, body: JSON.stringify({ q: \`\${candidate.name} \${targetArea}\` }) }).then(r => r.json()).catch(() => ({})),
        fetch(\`https://google.serper.dev/search\`, { method: 'POST', headers: HEADERS, body: JSON.stringify({ q: \`site:tiktok.com "\${candidate.name}" \${targetArea}\` }) }).then(r => r.json()).catch(() => ({}))
      ]);

      const hasPhysicalPlace = placesData.places && placesData.places.length > 0;
      const hasSocialPresence = socialData.organic && socialData.organic.length > 0;

      if (!hasPhysicalPlace && !candidate.link.includes('getyourguide.com') && !candidate.link.includes('viator.com')) return null;

      if (hasPhysicalPlace) {
        const place = placesData.places[0];
        venueName = place.title;
        if (place.ratingCount > 15) { trendScore += 30; demandLabel = "High Local Demand"; }
      }

      if (hasSocialPresence) {
        trendScore += 40; 
        demandLabel = "High Social Velocity";
      }
      
      return {
        name: venueName,
        category: candidate.vertical.label,
        demandLabel: demandLabel,
        score: Math.min(trendScore + 20, 100)
      };
    }));

    const results = validatedTrends.filter(t => t !== null);
    results.sort((a, b) => b.score - a.score);

    return {
      city, neighborhood,
      sentiment: 'Validated Market Intelligence',
      topExperiences: results.slice(0, 5),
      velocity: 9.8
    };

  } catch (err) {
    console.error("[Agent A] Taxonomy Probe failed...", err);
  }

  return { city, neighborhood, sentiment: 'Emerging & Dynamic', topExperiences: [], velocity: 9.2 };
}
`;

content = content.substring(0, startIdx) + arivalLogic + content.substring(endIdx);
fs.writeFileSync(file, content);
console.log("Successfully updated personaEngine.js with Arival Taxonomy Logic.");
