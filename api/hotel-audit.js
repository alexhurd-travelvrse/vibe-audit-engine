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

async function extractHotelUrl(hotelName, city) {
    const data = await runSerperSearch(`"${hotelName}" ${city} official site`);
    if (data.organic && data.organic.length > 0) {
        // Find the first non-booking/agoda/tripadvisor link
        const validLinks = data.organic.filter(link => {
            const url = link.link.toLowerCase();
            return !url.includes('booking.com') && 
                   !url.includes('tripadvisor.') && 
                   !url.includes('agoda.com') &&
                   !url.includes('expedia.com') &&
                   !url.includes('hotels.com');
        });
        
        if (validLinks.length > 0) {
            try {
                const urlObj = new URL(validLinks[0].link);
                return urlObj.hostname;
            } catch (e) {
                return null;
            }
        }
    }
    return null;
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
        const { hotelName, city, topCategories } = req.body;
        if (!hotelName || !city || !topCategories) {
            return res.status(400).json({ error: 'Missing parameters' });
        }

        console.log(`[Agent B] Starting Vibe Audit for ${hotelName} in ${city}`);

        // Step 1: Auto Discovery
        const hotelDomain = await extractHotelUrl(hotelName, city);
        console.log(`[Agent B] Discovered Domain: ${hotelDomain || 'Not Found'}`);

        const socialData = await runSerperSearch(`site:instagram.com OR site:facebook.com "${hotelName}" ${city}`);
        let hasSocialPresence = (socialData.organic && socialData.organic.length > 0);

        // Step 2: Audit each top category
        const auditResults = {};
        let totalOnsiteScore = 0;
        let totalLocalGatewayScore = 0;

        for (const cat of topCategories) {
            const { categoryName, vibeName, keywords, topVenueName } = cat;
            
            let onsiteScore = 0;
            let localGatewayScore = 0;
            
            if (hotelDomain) {
                // Onsite check: Search hotel domain for the vibe keywords
                const vibeQuery = `site:${hotelDomain} ${keywords.slice(0,2).join(' OR ')}`;
                const vibeRes = await runSerperSearch(vibeQuery);
                if (vibeRes.organic && vibeRes.organic.length > 0) onsiteScore = 80;
                else onsiteScore = 20;

                // Gateway check: Search hotel domain for the top local venue
                if (topVenueName && topVenueName !== "No immediate venue found") {
                    const venueQuery = `site:${hotelDomain} "${topVenueName}"`;
                    const venueRes = await runSerperSearch(venueQuery);
                    if (venueRes.organic && venueRes.organic.length > 0) localGatewayScore = 95;
                    else localGatewayScore = 15;
                }
            }
            
            // Add social bonus
            if (hasSocialPresence) {
                onsiteScore = Math.min(100, onsiteScore + 10);
            }

            auditResults[categoryName] = {
                vibeName,
                topVenueName,
                onsiteScore,
                localGatewayScore,
                verdict: localGatewayScore > 50 ? 
                    `Strong local integration. Promoting ${topVenueName} positions you as an authentic gateway.` : 
                    `Missed opportunity. You are invisible to the search demand for ${vibeName} and do not leverage ${topVenueName}.`
            };

            totalOnsiteScore += onsiteScore;
            totalLocalGatewayScore += localGatewayScore;
        }

        const avgOnsite = Math.round(totalOnsiteScore / topCategories.length);
        const avgGateway = Math.round(totalLocalGatewayScore / topCategories.length);

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
