import dotenv from 'dotenv';
dotenv.config();

const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

async function fetchGeminiWithRetry(url, options, retries = 3, delay = 2000) {
    for (let i = 0; i < retries; i++) {
        const res = await fetch(url, options);
        if (res.status === 503) {
            console.log(`[Gemini] 503 High Demand. Retrying...`);
            await new Promise(r => setTimeout(r, delay));
            continue;
        }
        return res;
    }
    return await fetch(url, options);
}

async function run() {
    const city = 'Las Vegas';
    const neighborhood = 'the strip';
    const categories = ['Hotel'];
    
    const prompt = `Act as an Agentic Search Telemetry Analyzer. For the city of ${city} (specifically ${neighborhood}), identify the top 3 most distinct, highly-searched travel 'vibes' or subcultures for each of the following categories: ${categories.join(', ')}. 
    
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
    
    Do not include markdown codeblocks or any other text outside the JSON object.`;

    const response = await fetchGeminiWithRetry(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.2 }
        })
    });
    
    const data = await response.json();
    let textResult = data.candidates[0].content.parts[0].text;
    const jsonMatch = textResult.match(/\{[\s\S]*\}/);
    const vibeData = JSON.parse(jsonMatch[0]);
    
    const topVibe = vibeData['Hotel'].Top3Vibes[0];
    
    const query = `${topVibe.semanticKeywords.join(' ')} ${neighborhood} ${city}`;
    console.log('Querying Serper Places:', query);
    
    const serperResponse = await fetch('https://google.serper.dev/places', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: query })
    });
    const placesData = await serperResponse.json();
    const topVenue = placesData.places && placesData.places.length > 0 ? placesData.places[0] : null;
    
    console.log('\n--- RESULTS ---');
    console.log('Vibe Category Details:', JSON.stringify(vibeData['Hotel'].Top3Vibes, null, 2));
    if (topVenue) {
        console.log('Top Venue Found:', topVenue.title, '(', topVenue.rating, 'stars,', topVenue.ratingCount, 'reviews )');
    } else {
        console.log('Top Venue: None found');
    }
}
run().catch(console.error);
