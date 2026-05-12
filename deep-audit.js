import { scrapeLocalSignals, VIBE_TAXONOMY } from './src/personaEngine.js';

async function deepNeighborhoodAudit(city, neighborhood) {
  console.log(`[Deep Audit] Analyzing Vibe Heatmap for ${city} - ${neighborhood}...`);
  
  // 1. RUN LOCAL AUDIT (Baseline)
  // We need to disable expansion for the baseline to see what's actually THERE.
  // Actually, I'll just run it and look at the scores.
  const audit = await scrapeLocalSignals(city, neighborhood);
  const localResults = audit.topExperiences;

  // 2. EXPANSION MAPPING
  // We want to know which district is 'hottest' for each sector.
  let expansionDistricts = ["Design District", "Brickell", "Little Havana", "Coconut Grove"];
  if (city.toLowerCase().includes('copenhagen')) expansionDistricts = ["Vesterbro", "Nørrebro", "Østerbro", "Christianshavn"];
  else if (city.toLowerCase().includes('london')) expansionDistricts = ["Battersea", "Chelsea", "Shoreditch", "Soho"];
  else if (city.toLowerCase().includes('chichester')) expansionDistricts = ["Bracklesham Bay", "East Wittering", "Bosham", "Selsey"];
  else if (city.toLowerCase().includes('las vegas')) expansionDistricts = ["Downtown", "Arts District", "Summerlin", "Henderson"];
  
  const expansionHeatmap = {};
  
  for (const dist of expansionDistricts) {
    console.log(`[Deep Audit] Probing Expansion District: ${dist}...`);
    const distAudit = await scrapeLocalSignals(city, dist);
    distAudit.topExperiences.forEach(exp => {
      const catId = exp.id;
      if (!expansionHeatmap[catId] || exp.score > expansionHeatmap[catId].score) {
        expansionHeatmap[catId] = { ...exp, district: dist };
      }
    });
  }

  // 3. AGGREGATE RESULTS
  console.log("\n### Vibe Heatmap: " + neighborhood + " vs. City Velocity\n");
  console.log("| Sector | Local Top Pick (Score) | Hottest Expansion District (Top Venue / Score) |");
  console.log("| :--- | :--- | :--- |");

  VIBE_TAXONOMY.forEach(cat => {
    const localTop = localResults.find(r => r.id === cat.id) || { name: "Low Signal", score: 0 };
    const expandedTop = expansionHeatmap[cat.id] || { name: "N/A", score: 0, district: "None" };

    const localLine = `${localTop.name} (${localTop.score})`;
    const expandedLine = `${expandedTop.district}: ${expandedTop.name} (${expandedTop.score})`;
    
    console.log(`| **${cat.id}** | ${localLine} | ${expandedLine} |`);
  });
}

const [city, neighborhood] = process.argv.slice(2);
deepNeighborhoodAudit(city || 'Miami', neighborhood || 'South Beach');
