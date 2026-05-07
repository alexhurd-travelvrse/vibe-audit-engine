const fs = require("fs");
const file = "src/personaEngine.js";
let content = fs.readFileSync(file, "utf8");

// Fix any duplicated headers manually
const cleanHeader = `/**
 * TravelVRSE Persona-Matching Engine (The Triangulator)
 * 
 * Logic flow:
 * 1. Agent A (Demand): Local Pulse analysis (neighborhood-level trends)
 * 2. Agent B (Supply): Brand DNA analysis (Visual + Textual supply)
 * 3. Agent C (Inventory): Experience mapping (Onsite vs local trends)
 */

export const VIBE_CATEGORIES = [
  "Cultural Heritage",
  "Urban Exploration",
  "Luxury & Lifestyle",
  "Wellness & Rituals",
  "Culinary & Mixology"
];

/**
 * Agent A: The Hyper-Local Pulse
 * Scrapes neighborhood-level demand data.
 */
`;

const startIdx = content.indexOf("export async function scrapeLocalSignals");
const endPart = content.substring(startIdx);
fs.writeFileSync(file, cleanHeader + endPart);
