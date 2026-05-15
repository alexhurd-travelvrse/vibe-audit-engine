// MOCK LOCALSTORAGE FOR NODE
global.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {}
};

import { scrapeLocalSignals } from './src/personaEngine.js';
import fs from 'fs';

async function runTest() {
  console.log("Running Vibe Audit for London: Southbank...");
  try {
    const results = await scrapeLocalSignals('London', 'Southbank');
    
    // Save full JSON for deep analysis
    fs.writeFileSync('audit_debug_southbank.json', JSON.stringify(results, null, 2));
    
    console.log("\n--- CORE VIBES ---");
    results.coreVibes.forEach(v => console.log(`- ${v.name}: ${v.vibeConcept}`));

    console.log("\n--- SECTOR HEATMAP (GEOGRAPHIC COMPARISON) ---");
    results.sectorHeatmap.forEach(s => {
      console.log(`\n[${s.label}]`);
      console.log(`  LOCAL: ${s.local.name} (${s.local.score})`);
      console.log(`  EXPANSION (${s.expansion.district}): ${s.expansion.name} (${s.expansion.score})`);
    });

    console.log("\nDeep debug saved to audit_debug_southbank.json");
  } catch (err) {
    console.error("Test failed:", err);
  }
}

runTest();
