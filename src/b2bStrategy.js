import { scrapeLocalSignals } from './personaEngine.js';

/**
 * B2B Strategy Engine: Vibe Gap Analysis & Challenge Generator
 */
export async function generateHotelStrategy(hotelName, hotelUrl, city, neighborhood) {
  console.log(`[Strategist] Analyzing Vibe Gap for ${hotelName} in ${neighborhood || city}...`);

  // 1. GET LOCAL VIBE CONTEXT
  const localAudit = await scrapeLocalSignals(city, neighborhood);
  const localViralSignals = localAudit.topExperiences;

  // 2. SCRAPE HOTEL DIGITAL PRESENCE
  // In a real environment, we'd use a dedicated scraper. 
  // For this demo, we'll simulate the extraction of mentions from the URL content.
  let hotelMentions = [];
  try {
    const res = await fetch(hotelUrl).then(r => r.text());
    const body = res.toLowerCase();
    
    // Check which local signals the hotel actually mentions
    hotelMentions = localViralSignals.map(signal => {
      const isMentioned = body.includes(signal.name.toLowerCase());
      return { ...signal, isMentioned };
    });
  } catch (e) {
    console.warn("[Strategist] Website scrape failed, using proximity estimation.");
    hotelMentions = localViralSignals.map(s => ({ ...s, isMentioned: false }));
  }

  // 3. IDENTIFY GAPS
  const gaps = hotelMentions.filter(m => !m.isMentioned);
  const sharedDNA = hotelMentions.filter(m => m.isMentioned);

  // 4. GENERATE PROPULSION CHALLENGES
  const challenges = [
    {
      type: "VIBE_MATCH",
      title: "The DNA Sync",
      mission: `Align with the local '${localViralSignals[0].category}' trend by discovering the hotel's parallel onsite experience.`,
      reward: "A 'Glocal' gift from the 25h Things Shop."
    },
    {
      type: "GAP_FILL",
      title: "The Narrative Bridge",
      mission: `Be the first to bridge the gap to '${gaps[0]?.name || 'the local district'}' and bring back a high-fidelity visual signal.`,
      reward: "A signature cocktail at the Rendezvous bar."
    },
    {
      type: "STRENGTH_PLAY",
      title: "The Anchor Quest",
      mission: `Leverage the hotel's highest-fidelity anchor (NENI) to unlock a hidden local narrative.`,
      reward: "Exclusive local 'Charming Routes' bike map."
    }
  ];

  return {
    hotelName,
    neighborhood,
    vibeCoverage: `${((sharedDNA.length / localViralSignals.length) * 100).toFixed(0)}%`,
    topGaps: gaps.slice(0, 3),
    propulsionRoadmap: challenges
  };
}
