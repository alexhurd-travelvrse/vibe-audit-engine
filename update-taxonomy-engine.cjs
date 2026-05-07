const fs = require("fs");
const file = "src/personaEngine.js";
let content = fs.readFileSync(file, "utf8");

const startIdx = content.indexOf("export const VIBE_CATEGORIES");
const endMarker = "/**\r\n * Agent B: The Discoverability Auditor";
const endIdx = content.indexOf(endMarker);

const taxonomyLogic = `
export const VIBE_TAXONOMY = [
  {
    id: "CULINARY",
    label: "High-Fidelity Gastronomy",
    query: '"tasting menu" OR "chef table" OR "gastronomy" OR "farm-to-table"',
    sites: "site:theinfatuation.com OR site:eater.com OR site:timeout.com"
  },
  {
    id: "NIGHTLIFE",
    label: "Emergent Nightlife & Mixology",
    query: '"speakeasy" OR "listening bar" OR "natural wine" OR "underground bar"',
    sites: "site:ra.co OR site:vice.com OR site:timeout.com"
  },
  {
    id: "RETAIL",
    label: "Experience-Led Retail Design",
    query: '"concept store" OR "flagship experience" OR "boutique retail"',
    sites: "site:highsnobiety.com OR site:hypebeast.com OR site:wallpaper.com"
  },
  {
    id: "WELLNESS",
    label: "Next-Gen Wellness & Rituals",
    query: '"urban sauna" OR "ritual" OR "biohacking" OR "wellness sanctuary"',
    sites: "site:monocle.com OR site:wallpaper.com OR site:cntraveler.com"
  },
  {
    id: "TOUR",
    label: "Curated Local Tour",
    query: '"hidden tour" OR "private heritage" OR "canal tour" OR "walking tour"',
    sites: "site:getyourguide.com OR site:viator.com OR site:cntraveler.com"
  },
  {
    id: "CULTURE",
    label: "Immersive Art & Design",
    query: '"pop-up" OR "installation" OR "immersive gallery" OR "design hub"',
    sites: "site:dezeen.com OR site:nowness.com OR site:designboom.com"
  }
];

export async function scrapeLocalSignals(city, neighborhood) {
  const targetArea = neighborhood || city;
  const API_KEY = import.meta.env.VITE_SERPER_API_KEY;
  const HEADERS = { 'X-API-KEY': API_KEY, 'Content-Type': 'application/json' };
  
  console.log(\`[Agent A] Executing Parallel Taxonomy Probe for \${targetArea}...\`);

  try {
    // 1. PARALLEL TAXONOMY PROBE: One search per vertical
    const verticalResults = await Promise.all(VIBE_TAXONOMY.map(async (vertical) => {
      const q = \`\${vertical.sites} "\${targetArea}" \${vertical.query}\`;
      const res = await fetch(\`https://google.serper.dev/search\`, {
        method: 'POST', headers: HEADERS, body: JSON.stringify({ q, num: 3 })
      }).then(r => r.json()).catch(() => ({}));

      if (res.organic && res.organic.length > 0) {
        const item = res.organic[0]; // Take the #1 result for this vertical
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

    const candidates = verticalResults.filter(c => c !== null);

    // 2. VALIDATION LAYER (Places, TikTok, Related Searches)
    const finalTrends = await Promise.all(candidates.map(async (candidate) => {
      let trendScore = 0;
      let demandLabel = "Emergent Signal";
      let venueName = candidate.name;
      
      const [placesData, socialData] = await Promise.all([
        fetch(\`https://google.serper.dev/places\`, { method: 'POST', headers: HEADERS, body: JSON.stringify({ q: \`\${candidate.name} \${targetArea}\` }) }).then(r => r.json()).catch(() => ({})),
        fetch(\`https://google.serper.dev/search\`, { method: 'POST', headers: HEADERS, body: JSON.stringify({ q: \`site:tiktok.com "\${candidate.name}" \${targetArea}\` }) }).then(r => r.json()).catch(() => ({}))
      ]);

      const hasPhysicalPlace = placesData.places && placesData.places.length > 0;
      const hasSocialPresence = socialData.organic && socialData.organic.length > 0;

      // Gatekeeper: Must have physical presence or be a verified tour to pass
      if (!hasPhysicalPlace && !candidate.link.includes('getyourguide.com')) return null;

      if (hasPhysicalPlace) {
        const place = placesData.places[0];
        venueName = place.title;
        if (place.ratingCount > 15) { trendScore += 20; demandLabel = "High Local Demand"; }
      }

      if (hasSocialPresence) {
        trendScore += 40; // High weight for TikTok
        demandLabel = "High Social Velocity";
      }
      
      // Simple publisher boost
      if (!candidate.link.includes('getyourguide.com')) trendScore += 20;

      return {
        name: venueName,
        category: candidate.vertical.label,
        demandLabel: demandLabel,
        score: Math.min(trendScore + 20, 100) // Base bias +20
      };
    }));

    const results = finalTrends.filter(t => t !== null);
    results.sort((a, b) => b.score - a.score);

    return {
      city, neighborhood,
      sentiment: 'Validated Market Intelligence',
      topExperiences: results.slice(0, 5),
      velocity: 9.8
    };

  } catch (err) {
    console.error("[Agent A] Taxonomy Stack failed...", err);
  }

  return { city, neighborhood, sentiment: 'Emerging & Dynamic', topExperiences: [], velocity: 9.2 };
}
`;

content = content.substring(0, startIdx) + taxonomyLogic + content.substring(endIdx);
fs.writeFileSync(file, content);
