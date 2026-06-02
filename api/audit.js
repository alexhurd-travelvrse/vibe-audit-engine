import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Setup __dirname for ES modules or Vercel
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY;
const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY;

// -------------------------------------------------------------
// HELPER FUNCTIONS (Gemini + Serper)
// -------------------------------------------------------------
async function extractTopVibes(city, categories) {
    console.log(`[Step 1] Querying Gemini AI for top vibes in ${city}...`);
    const prompt = `
    Act as an Agentic Search Telemetry Analyzer. For ${city}, identify the top 3 most distinct, highly-searched travel 'vibes' or subcultures for each of the following categories: ${categories.join(', ')}. 
    
    Output STRICTLY as a valid JSON object matching exactly this structure:
    {
        "CategoryName": {
            "Top3Vibes": [
                {
                    "rank": 1,
                    "vibeName": "Name of the Vibe",
                    "growthTrend": "High/Steady/Explosive",
                    "semanticKeywords": ["Keyword 1", "Keyword 2", "Keyword 3"],
                    "frequentHumanQueries": ["A conversational human query looking for this vibe"]
                }
            ]
        }
    }
    
    Do not include markdown codeblocks (\`\`\`json) or any other text outside the JSON object.
    `;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.2 }
        })
    });

    const data = await response.json();
    try {
        let textResult = data.candidates[0].content.parts[0].text.trim();
        if (textResult.startsWith('\`\`\`json')) {
            textResult = textResult.substring(7, textResult.length - 3);
        } else if (textResult.startsWith('\`\`\`')) {
            textResult = textResult.substring(3, textResult.length - 3);
        }
        return JSON.parse(textResult);
    } catch (error) {
        console.error("Failed to parse Gemini response as JSON", error);
        return null;
    }
}

async function huntLocalVenues(keywords, microLocation, city) {
    const query = `${keywords.join(' ')} ${microLocation} ${city}`;
    console.log(`   -> Searching Serper Places: ${query}`);
    
    const response = await fetch('https://google.serper.dev/places', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: query })
    });
    const data = await response.json();
    return data.places || [];
}

async function validateVenue(venueName, city) {
    console.log(`   [Validation] Checking Social & Editorial for "${venueName}"...`);
    
    const socialQuery = `site:tiktok.com OR site:instagram.com "${venueName}" ${city}`;
    const socialRes = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: socialQuery })
    });
    const socialData = await socialRes.json();
    const socialHits = socialData.organic ? socialData.organic.length : 0;
    
    let socialVelocity = "Low Volume";
    if (socialHits >= 5) socialVelocity = "Viral High Velocity";
    else if (socialHits > 0) socialVelocity = "Emerging Trend";

    const editorialQuery = `site:timeout.com OR site:monocle.com OR site:ra.co "${venueName}" ${city}`;
    const editorialRes = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: editorialQuery })
    });
    const editorialData = await editorialRes.json();
    const editorialMentions = editorialData.organic ? editorialData.organic.length : 0;

    return { socialVelocity, editorialMentions };
}

async function runPipeline(city, neighborhood) {
    const categories = ["Nightlife", "Wellness", "Coffee Culture", "Culinary"];
    const vibeData = await extractTopVibes(city, categories);
    if (!vibeData) throw new Error("Gemini mapping failed");

    const finalOutput = {
        MicroLocation: neighborhood,
        Categories: {}
    };

    for (const [categoryName, categoryInfo] of Object.entries(vibeData)) {
        finalOutput.Categories[categoryName] = {
            Top3Vibes: categoryInfo.Top3Vibes.map(v => ({ rank: v.rank, vibeName: v.vibeName, growthTrend: v.growthTrend })),
            TopLocalVenue: null,
            ExtendedRadiusSearch: null,
            syntheticIntent: { frequentHumanQueries: categoryInfo.Top3Vibes[0].frequentHumanQueries }
        };

        const topVibe = categoryInfo.Top3Vibes[0];
        const localVenues = await huntLocalVenues(topVibe.semanticKeywords, neighborhood, city);
        let localDensity = localVenues.length;
        let topLocalVenue = localVenues.length > 0 ? localVenues[0] : null;

        if (topLocalVenue) {
            const validationScores = await validateVenue(topLocalVenue.title, city);
            finalOutput.Categories[categoryName].TopLocalVenue = {
                name: topLocalVenue.title,
                distanceFromHotelKm: 0.3,
                googlePlacesScore: topLocalVenue.rating || 4.5,
                reviewCount: topLocalVenue.ratingCount || 0,
                validationTag: "Top Hyper-Local Venue",
                socialVelocity: validationScores.socialVelocity,
                editorialMentions: validationScores.editorialMentions
            };
        } else {
             finalOutput.Categories[categoryName].TopLocalVenue = {
                name: "No immediate venue found", distanceFromHotelKm: 0, googlePlacesScore: 0, reviewCount: 0
            };
        }

        const needsExpansion = localDensity < 3;
        // Simplified expansion for any city (assumes 'Downtown' or just city core as fallback)
        const adjacentLocation = city; 
        
        if (needsExpansion) {
            const adjacentVenues = await huntLocalVenues(topVibe.semanticKeywords, adjacentLocation, city);
            const multiplier = adjacentVenues.length > 0 ? (adjacentVenues.length / (localDensity || 1)).toFixed(1) : 0;
            
            finalOutput.Categories[categoryName].ExtendedRadiusSearch = {
                isVibeHotterElsewhere: adjacentVenues.length > localDensity,
                targetDistrict: "Broader City",
                distanceKm: 2.0,
                densityMultiplier: parseFloat(multiplier),
                marketInsight: `While your immediate neighborhood has ${localDensity} top spot(s), the broader city contains ${adjacentVenues.length} high-velocity hubs, making this vibe ${multiplier}x more active slightly further away.`
            };
        } else {
             finalOutput.Categories[categoryName].ExtendedRadiusSearch = {
                isVibeHotterElsewhere: false,
                marketInsight: `You are sitting in the absolute epicenter of the ${topVibe.vibeName} vibe for this city.`
            };
        }
    }

    return finalOutput;
}

// -------------------------------------------------------------
// VERCEL SERVERLESS HANDLER
// -------------------------------------------------------------
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { city, neighborhood } = req.body;
        if (!city || !neighborhood) {
            return res.status(400).json({ error: 'Missing city or neighborhood' });
        }

        const cacheDir = path.resolve('/tmp', '.vibeCache');
        if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
        }

        const cacheFile = path.resolve(cacheDir, `vibe_${city.toLowerCase().replace(/\\s+/g, '_')}_${neighborhood.toLowerCase().replace(/\\s+/g, '_')}.json`);
        
        // Check 24-hour cache
        if (fs.existsSync(cacheFile)) {
            const stats = fs.statSync(cacheFile);
            const hoursOld = (new Date() - stats.mtime) / (1000 * 60 * 60);
            
            if (hoursOld < 24) {
                console.log(`[API] Serving cache for ${city} / ${neighborhood}`);
                const cachedData = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
                return res.status(200).json(cachedData);
            }
        }

        console.log(`[API] Cache expired or missing. Running pipeline for ${city} / ${neighborhood}...`);
        
        // Run pipeline
        const freshData = await runPipeline(city, neighborhood);
        
        // Save cache
        fs.writeFileSync(cacheFile, JSON.stringify(freshData, null, 2));

        return res.status(200).json(freshData);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error', details: err.message });
    }
}
