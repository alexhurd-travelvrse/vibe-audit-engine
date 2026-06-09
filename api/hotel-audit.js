import * as dotenv from 'dotenv';
dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

// -------------------------------------------------------------
// HELPER FUNCTIONS (Serper Auto-Discovery & Audit)
// -------------------------------------------------------------
async function runSerperSearch(query) {
    const response = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: query })
    });
    return await response.json();
}



export default async function handler(req, res) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const { hotelName, city, topCategories, propertyUrl, instagramUrl } = req.body;
        if (!hotelName || !city || !topCategories) {
            return res.status(400).json({ error: 'Missing parameters' });
        }

        console.log(`[Agent B] Starting Vibe Audit for ${hotelName} in ${city}`);

        // Step 1: Use provided URLs
        let hotelDomain = null;
        if (propertyUrl) {
            try {
                hotelDomain = new URL(propertyUrl).hostname;
            } catch(e) {
                hotelDomain = propertyUrl.replace(/^https?:\/\//, '').split('/')[0];
            }
        }
        console.log(`[Agent B] Target Domain: ${hotelDomain || 'Not Provided'}`);

        let hasSocialPresence = !!instagramUrl;

        // Step 2: Audit each top category
        const auditResults = {};
        let totalOnsiteScore = 0;
        let totalLocalGatewayScore = 0;

        for (const cat of topCategories) {
            const { categoryName, vibeName, keywords, topVenueName } = cat;
            
            let onsiteScore = 0;
            let localGatewayScore = 0;
            let onsiteMark = "Fail";
            let gatewayMark = "Fail";
            let foundKeywords = [];
            
            // Widen the search: Extract up to 3 long words from the Vibe Name + 3 Semantic Keywords
            const vibeNameWords = (vibeName || '').replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 4).slice(0, 3);
            const semanticWords = (keywords || []).slice(0, 3);
            const queryTerms = [...new Set([...vibeNameWords, ...semanticWords])].filter(Boolean);

            if (hotelDomain && queryTerms.length > 0) {
                // Onsite check: Single OR query with up to 6 terms
                const vibeQuery = `site:${hotelDomain} ${queryTerms.map(t => `"${t}"`).join(' OR ')}`;
                const vibeRes = await runSerperSearch(vibeQuery);
                
                if (vibeRes.organic && vibeRes.organic.length > 0) {
                    onsiteMark = "Pass";
                    onsiteScore = 100;
                    
                    // Parse snippets to identify exactly which keywords were found
                    const organicText = vibeRes.organic.map(o => `${o.title} ${o.snippet}`).join(' ').toLowerCase();
                    foundKeywords = queryTerms.filter(term => organicText.includes(term.toLowerCase()));
                }

                // Gateway check: Search hotel domain for the top local venue
                if (topVenueName && topVenueName !== "No immediate venue found") {
                    const venueQuery = `site:${hotelDomain} "${topVenueName}"`;
                    const venueRes = await runSerperSearch(venueQuery);
                    if (venueRes.organic && venueRes.organic.length > 0) {
                        gatewayMark = "Pass";
                        localGatewayScore = 100;
                    }
                }
            }

            auditResults[categoryName] = {
                vibeName,
                topVenueName,
                onsiteMark,
                gatewayMark,
                searchTermsUsed: queryTerms,
                foundKeywords,
                keywordsMatchCount: `${foundKeywords.length}/${queryTerms.length}`,
                onsiteScore,         // Kept for backward UI compatibility
                localGatewayScore    // Kept for backward UI compatibility
            };

            totalOnsiteScore += (onsiteMark === "Pass" ? 1 : 0);
            totalLocalGatewayScore += (gatewayMark === "Pass" ? 1 : 0);
        }

        const avgOnsite = Math.round((totalOnsiteScore / topCategories.length) * 100) || 0;
        const avgGateway = Math.round((totalLocalGatewayScore / topCategories.length) * 100) || 0;

        return res.status(200).json({
            hotelDomain: hotelDomain || 'Unknown',
            hasSocialPresence,
            avgOnsiteScore: avgOnsite,
            avgLocalGatewayScore: avgGateway,
            categoryAudits: auditResults
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error', details: err.message });
    }
}
