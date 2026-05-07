const fs = require("fs");
const file = "src/personaEngine.js";
let content = fs.readFileSync(file, "utf8");

const startIdx = content.indexOf("export const VIBE_CATEGORIES");
const endMarker = "export async function scrapeLocalSignals";
const endIdx = content.indexOf(endMarker);

const newScoringLogic = `
export const VIBE_CATEGORIES = {
  RETAIL: "Experience-Led Retail Design",
  WELLNESS: "Next-Gen Wellness & Rituals",
  NIGHTLIFE: "Emergent Nightlife & Mixology",
  CULINARY: "High-Fidelity Gastronomy",
  CULTURE: "Immersive Art & Design",
  HERITAGE: "Hyper-Local Urban Heritage",
  URBAN: "Adaptive Urbanism & Architecture"
};

function deriveAdaptiveCategory(item) {
  const combined = (item.title + " " + item.snippet + " " + item.link).toLowerCase();
  
  // Scoring weights for each category
  const weights = {
    [VIBE_CATEGORIES.HERITAGE]: 0,
    [VIBE_CATEGORIES.RETAIL]: 0,
    [VIBE_CATEGORIES.WELLNESS]: 0,
    [VIBE_CATEGORIES.NIGHTLIFE]: 0,
    [VIBE_CATEGORIES.CULINARY]: 0,
    [VIBE_CATEGORIES.CULTURE]: 0,
    [VIBE_CATEGORIES.URBAN]: 0
  };

  // 1. Heritage & Tours (High Intent)
  if (combined.includes("tour") || combined.includes("cruise") || combined.includes("canal") || combined.includes("boat")) weights[VIBE_CATEGORIES.HERITAGE] += 50;
  if (combined.includes("history") || combined.includes("heritage") || combined.includes("historic")) weights[VIBE_CATEGORIES.HERITAGE] += 30;

  // 2. Retail (Only if matched with commerce words)
  if (combined.includes("store") || combined.includes("shop") || combined.includes("boutique") || combined.includes("showroom")) weights[VIBE_CATEGORIES.RETAIL] += 40;
  if (combined.includes("fashion") || combined.includes("apparel") || combined.includes("retail")) weights[VIBE_CATEGORIES.RETAIL] += 30;

  // 3. Culinary
  if (combined.includes("restaurant") || combined.includes("dining") || combined.includes("tasting") || combined.includes("culinary") || combined.includes("chef") || combined.includes("food")) weights[VIBE_CATEGORIES.CULINARY] += 45;

  // 4. Nightlife & Mixology
  if (combined.includes("bar") || combined.includes("cocktail") || combined.includes("mixology") || combined.includes("club") || combined.includes("nightlife") || combined.includes("underground")) weights[VIBE_CATEGORIES.NIGHTLIFE] += 45;

  // 5. Wellness
  if (combined.includes("spa") || combined.includes("wellness") || combined.includes("sauna") || combined.includes("bath") || combined.includes("ritual")) weights[VIBE_CATEGORIES.WELLNESS] += 45;

  // 6. Culture & Design
  if (combined.includes("gallery") || combined.includes("art") || combined.includes("exhibition") || combined.includes("studio")) weights[VIBE_CATEGORIES.CULTURE] += 40;
  if (combined.includes("design") || combined.includes("architecture")) {
      // If it mentions design but also retail words, it's retail. Otherwise it's Culture/Urban.
      if (weights[VIBE_CATEGORIES.RETAIL] > 0) weights[VIBE_CATEGORIES.RETAIL] += 20;
      else weights[VIBE_CATEGORIES.URBAN] += 30;
  }

  // Find the category with the highest weight
  let topCategory = VIBE_CATEGORIES.HERITAGE;
  let maxWeight = -1;
  for (const [cat, weight] of Object.entries(weights)) {
    if (weight > maxWeight) {
      maxWeight = weight;
      topCategory = cat;
    }
  }

  // If no weight found, check for dynamic keywords
  if (maxWeight <= 0) {
    const keywords = ["collective", "hub", "installation", "popup"];
    for (const k of keywords) {
      if (combined.includes(k)) return \`\${k.charAt(0).toUpperCase() + k.slice(1)}-Led Innovation\`;
    }
    return VIBE_CATEGORIES.URBAN;
  }

  return topCategory;
}

`;

content = content.substring(0, startIdx) + newScoringLogic + content.substring(endIdx);
fs.writeFileSync(file, content);
