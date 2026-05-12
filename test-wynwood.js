// MOCK LOCALSTORAGE FOR NODE
global.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {}
};

import { scrapeLocalSignals } from './src/personaEngine.js';

async function runTest() {
  console.log("Running Vibe Audit for London: South Bank...");
  try {
    const results = await scrapeLocalSignals('London', 'South Bank');
    console.log("\n--- AUDIT RESULTS ---");
    console.log(`Sentiment: ${results.sentiment}`);
    console.log(`Location: ${results.city} (${results.neighborhood})`);
    console.log("\nTop Experiences:");
    results.topExperiences.forEach((exp, i) => {
      console.log(`${i+1}. ${exp.name.toUpperCase()}`);
      console.log(`   Trend: ${exp.category}`);
      console.log(`   Source: ${exp.source}`);
      console.log(`   Vibe: ${exp.vibeConcept}`);
      console.log(`   Label: ${exp.demandLabel} (Score: ${exp.score})\n`);
    });
  } catch (err) {
    console.error("Test failed:", err);
  }
}

runTest();
