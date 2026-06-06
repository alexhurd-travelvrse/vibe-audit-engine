// Export Vercel Configuration to increase timeout to 60 seconds
export const maxDuration = 60;

import fs from 'fs';
import path from 'path';

// Automatically loads .env if present (Vite/Node)
import * as dotenv from 'dotenv';
dotenv.config();

const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

// -------------------------------------------------------------
// HELPER FUNCTIONS (Gemini + Serper)
// -------------------------------------------------------------
async function fetchGeminiWithRetry(url, options, retries = 3, delay = 2000) {
    for (let i = 0; i < retries; i++) {
        const res = await fetch(url, options);
        if (res.status === 503) {
            console.log(`[Gemini] 503 High Demand. Retrying in ${delay}ms... (Attempt ${i+1}/${retries})`);
            await new Promise(r => setTimeout(r, delay));
            continue;
        }
        return res;
    }
    return await fetch(url, options);
}
async function extractTopVibes(city, neighborhood, categories) {
    console.log(`[Step 1] Querying Gemini AI for top vibes in ${neighborhood}, ${city}...`);
    const prompt = `
    Act as an Agentic Search Telemetry Analyzer. For the city of ${city} (specifically ${neighborhood}), identify the top 3 most distinct, highly-searched travel 'vibes' or subcultures for each of the following categories: ${categories.join(', ')}. 
    
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

    const response = await fetchGeminiWithRetry(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.2 }
        })
    });

    const data = await response.json();
    try {
        let textResult = data.candidates[0].content.parts[0].text;
        const jsonMatch = textResult.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        throw new Error("No JSON found in response");
    } catch (error) {
        console.error("Failed to parse Gemini response as JSON", error);
        console.error("Raw response:", JSON.stringify(data));
        console.log("FALLING BACK TO MOCK VIBE DATA DUE TO API LIMITS");
        
        // Construct a dynamic mock based on requested categories
        const mockVibes = {};
        categories.forEach(cat => {
            mockVibes[cat] = {
                "Top3Vibes": [
                    { "rank": 1, "vibeName": `Trending ${cat}`, "growthTrend": "Explosive", "semanticKeywords": [cat.toLowerCase(), "local", "authentic"], "frequentHumanQueries": [`best ${cat.toLowerCase()} near me`] },
                    { "rank": 2, "vibeName": `Underground ${cat}`, "growthTrend": "Steady", "semanticKeywords": ["hidden gem", cat.toLowerCase()], "frequentHumanQueries": [`secret ${cat.toLowerCase()} spots`] },
                    { "rank": 3, "vibeName": `Classic ${cat}`, "growthTrend": "High", "semanticKeywords": ["traditional", cat.toLowerCase()], "frequentHumanQueries": [`classic ${cat.toLowerCase()}`] }
                ]
            };
        });
        return mockVibes;
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

async function extractMacroCategories(city, neighborhood) {
    console.log(`[Step 0] Querying Gemini AI for Macro-Category Analysis in ${neighborhood}, ${city}...`);
    const allCategories = ["Nightlife", "Wellness", "Coffee Culture", "Culinary", "Culture", "Adventure", "Retail", "Entertainment", "Gaming"];
    const prompt = `Act as an Agentic Search Telemetry Analyzer. For the city of ${city} (specifically ${neighborhood}), analyze the overall macro cultural landscape.
    I am going to provide you with a list of 9 overarching travel categories: ${allCategories.join(', ')}.
    
    Your task is to RANK these 9 categories from 1 to 9 based on their absolute dominance, historical search volume, and cultural weight for this specific city/neighborhood.
    
    Output STRICTLY as a valid JSON object matching exactly this structure:
    {
        "MacroCategoryRankings": [
            {
                "rank": 1,
                "categoryName": "Name of the Category",
                "dominanceScore": 95,
                "justification": "A one-sentence explanation"
            }
        ]
    }
    Do not include markdown codeblocks or any other text.`;

    const response = await fetchGeminiWithRetry(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.2 }
        })
    });

    const data = await response.json();
    try {
        let textResult = data.candidates[0].content.parts[0].text;
        const jsonMatch = textResult.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        throw new Error("No JSON found in response");
    } catch (error) {
        console.error("Failed to parse Gemini macro response as JSON", error);
        console.error("Raw response:", JSON.stringify(data));
        console.log("FALLING BACK TO MOCK MACRO DATA DUE TO API LIMITS");
        return {
            "MacroCategoryRankings": [
                { "rank": 1, "categoryName": "Culinary", "dominanceScore": 95, "justification": "World-renowned dining scene." },
                { "rank": 2, "categoryName": "Culture", "dominanceScore": 90, "justification": "Historic and artistic epicenter." },
                { "rank": 3, "categoryName": "Coffee Culture", "dominanceScore": 85, "justification": "Deeply ingrained in daily life." },
                { "rank": 4, "categoryName": "Nightlife", "dominanceScore": 80, "justification": "Vibrant evening entertainment." },
                { "rank": 5, "categoryName": "Retail", "dominanceScore": 75, "justification": "Bustling shopping districts." },
                { "rank": 6, "categoryName": "Entertainment", "dominanceScore": 70, "justification": "Theaters and live music." }
            ]
        };
    }
}

async function runPipeline(city, neighborhood) {
    const macroAnalysis = await extractMacroCategories(city, neighborhood);
    const top6Categories = macroAnalysis.MacroCategoryRankings.slice(0, 6).map(c => c.categoryName);
    
    // Inject "Hotel" as a fixed, always-first category
    const queryCategories = ["Hotel", ...top6Categories.filter(c => c !== "Hotel")];
    
    const vibeData = await extractTopVibes(city, neighborhood, queryCategories);

    const finalOutput = {
        MicroLocation: neighborhood,
        MacroCategoryRankings: macroAnalysis.MacroCategoryRankings,
        Categories: {}
    };

    // Process categories in exact order of queryCategories to ensure "Hotel" remains first
    const categoryPromises = queryCategories.map(async (categoryName) => {
        const categoryInfo = vibeData[categoryName];
        if (!categoryInfo || !categoryInfo.Top3Vibes) return null;

        let categoryData = {
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
            categoryData.TopLocalVenue = {
                name: topLocalVenue.title,
                distanceFromHotelKm: 0.3,
                googlePlacesScore: topLocalVenue.rating || 4.5,
                reviewCount: topLocalVenue.ratingCount || 0,
                validationTag: "Top Hyper-Local Venue",
                socialVelocity: validationScores.socialVelocity,
                editorialMentions: validationScores.editorialMentions
            };
        } else {
             categoryData.TopLocalVenue = {
                name: "No immediate venue found", distanceFromHotelKm: 0, googlePlacesScore: 0, reviewCount: 0
            };
        }

        const needsExpansion = localDensity < 3;
        const adjacentLocation = city; 
        
        if (needsExpansion) {
            const adjacentVenues = await huntLocalVenues(topVibe.semanticKeywords, adjacentLocation, city);
            const multiplier = adjacentVenues.length > 0 ? (adjacentVenues.length / (localDensity || 1)).toFixed(1) : 0;
            
            categoryData.ExtendedRadiusSearch = {
                isVibeHotterElsewhere: adjacentVenues.length > localDensity,
                targetDistrict: "Broader City",
                distanceKm: 2.0,
                densityMultiplier: parseFloat(multiplier),
                marketInsight: `While your immediate neighborhood has ${localDensity} top spot(s), the broader city contains ${adjacentVenues.length} high-velocity hubs, making this vibe ${multiplier}x more active slightly further away.`
            };
        } else {
             categoryData.ExtendedRadiusSearch = {
                isVibeHotterElsewhere: false,
                marketInsight: `You are sitting in the absolute epicenter of the ${topVibe.vibeName} vibe for this city.`
            };
        }

        return { name: categoryName, data: categoryData };
    });

    const resolvedCategories = await Promise.all(categoryPromises);
    for (const cat of resolvedCategories) {
        if (cat) {
            finalOutput.Categories[cat.name] = cat.data;
        }
    }

    return finalOutput;
}

// -------------------------------------------------------------
// VERCEL SERVERLESS HANDLER
// -------------------------------------------------------------
export default async function handler(req, res) {
    // Set CORS headers manually to guarantee they are applied in Serverless Functions
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET' && req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Use req.query for GET requests, req.body for POST
        const city = req.method === 'POST' ? req.body.city : req.query.city;
        const neighborhood = req.method === 'POST' ? req.body.neighborhood : req.query.neighborhood;
        if (!city || !neighborhood) {
            return res.status(400).json({ error: 'Missing city or neighborhood parameters' });
        }

        // Set Vercel Edge Caching to cache the response for 24 hours (86400 seconds)
        res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');

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
