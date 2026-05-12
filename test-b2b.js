import { generateHotelStrategy } from './src/b2bStrategy.js';

async function runB2BTest() {
  const hotel = {
    name: "25hours Hotel Copenhagen Indre By",
    url: "https://www.25hours-hotels.com/en/hotels/copenhagen/indre-by",
    city: "Copenhagen",
    neighborhood: "Indre By"
  };

  console.log(`\n--- B2B VIBE GAP ANALYSIS: ${hotel.name} ---`);
  
  try {
    const strategy = await generateHotelStrategy(hotel.name, hotel.url, hotel.city, hotel.neighborhood);
    
    console.log(`\nVibe Coverage: ${strategy.vibeCoverage}`);
    console.log("\nTop Experience Gaps (Viral local spots you ARE NOT mentioning):");
    strategy.topGaps.forEach(gap => {
      console.log(`- ${gap.name} (${gap.category}) [Viral Score: ${gap.score}]`);
    });

    console.log("\nRecommended Propulsion Roadmap (Challenges to bridge the gap):");
    strategy.propulsionRoadmap.forEach(chal => {
      console.log(`[${chal.type}] ${chal.title}`);
      console.log(`  Mission: ${chal.mission}`);
      console.log(`  Reward: ${chal.reward}`);
    });

  } catch (error) {
    console.error("Strategy Generation Failed:", error);
  }
}

runB2BTest();
