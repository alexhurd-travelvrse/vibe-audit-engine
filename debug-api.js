import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
dotenv.config();

const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY;

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

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.2 }
        })
    });

    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
    try {
        let textResult = data.candidates[0].content.parts[0].text;
        console.log("TEXT RESULT:", textResult);
        const jsonMatch = textResult.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            console.log("SUCCESSFULLY PARSED:", parsed);
            return parsed;
        }
        throw new Error("No JSON found in response");
    } catch (error) {
        console.error("Failed to parse Gemini macro response as JSON", error);
        return null;
    }
}

extractMacroCategories('Copenhagen', 'Indre By');
