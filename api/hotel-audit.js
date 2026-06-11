export const maxDuration = 60;

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
        let organicSocialText = "";

        // Execute Apify Instagram Scrape ONCE for the profile
        if (hasSocialPresence && process.env.APIFY_API_TOKEN) {
            try {
                const igHandle = instagramUrl.split('instagram.com/')[1]?.split('/')[0]?.split('?')[0] || instagramUrl.replace('@', '');
                if (igHandle) {
                    console.log(`[Agent B] Scraping Instagram for @${igHandle} via Apify...`);
                    const apifyRes = await fetch(`https://api.apify.com/v2/acts/apify~instagram-scraper/run-sync-get-dataset-items?token=${process.env.APIFY_API_TOKEN}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ search: igHandle, searchType: "user", resultsType: "posts", resultsLimit: 15 })
                    });
                    const apifyData = await apifyRes.json();
                    if (Array.isArray(apifyData)) {
                        organicSocialText = apifyData.map(item => item.caption || item.text || item.title || "").join(" ").toLowerCase();
                    }
                    console.log(`[Agent B] Apify Scrape complete. Pulled data length: ${apifyData.length || 0}`);
                }
            } catch (err) {
                console.error("[Agent B] Apify Scrape Failed:", err);
            }
        }

        // Step 2: Audit each top category
        const auditResults = {};
        let totalOnsiteScore = 0;
        let totalLocalGatewayScore = 0;

        const categoryPromises = topCategories.map(async (cat) => {
            const { categoryName, vibeName, keywords, topVenueName } = cat;
            
            let onsiteScore = 0;
            let localGatewayScore = 0;
            let onsiteMark = "Fail";
            let gatewayMark = "Fail";
            let socialMark = "Fail";
            let foundKeywords = [];
            let foundSocialKeywords = [];
            
            // Widen the search: Extract up to 3 long words from the Vibe Name + 3 Semantic Keywords
            const vibeNameWords = (vibeName || '').replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 4).slice(0, 3);
            const semanticWords = (keywords || []).slice(0, 3);
            const queryTerms = [...new Set([...vibeNameWords, ...semanticWords])].filter(Boolean);

            if (hotelDomain && queryTerms.length > 0) {
                const vibeQuery = `site:${hotelDomain} ${queryTerms.map(t => `"${t}"`).join(' OR ')}`;
                
                // Run Onsite and Gateway checks concurrently
                const promises = [];
                promises.push(runSerperSearch(vibeQuery));
                
                let doesGatewaySearch = false;
                if (topVenueName && topVenueName !== "No immediate venue found") {
                    doesGatewaySearch = true;
                    promises.push(runSerperSearch(`site:${hotelDomain} "${topVenueName}"`));
                }

                const results = await Promise.all(promises);
                const vibeRes = results[0];
                const venueRes = doesGatewaySearch ? results[1] : null;

                if (vibeRes.organic && vibeRes.organic.length > 0) {
                    onsiteMark = "Pass";
                    onsiteScore = 100;
                    
                    const organicText = vibeRes.organic.map(o => `${o.title} ${o.snippet}`).join(' ').toLowerCase();
                    foundKeywords = queryTerms.filter(term => organicText.includes(term.toLowerCase()));
                }

                if (doesGatewaySearch && venueRes && venueRes.organic && venueRes.organic.length > 0) {
                    gatewayMark = "Pass";
                    localGatewayScore = 100;
                }
            }

            // Social Check (Instagram)
            if (organicSocialText && queryTerms.length > 0) {
                foundSocialKeywords = queryTerms.filter(term => organicSocialText.includes(term.toLowerCase()));
                if (foundSocialKeywords.length > 0) {
                    socialMark = "Pass";
                }
            }

            return {
                categoryName,
                auditResult: {
                    vibeName,
                    topVenueName,
                    onsiteMark,
                    gatewayMark,
                    socialMark,
                    searchTermsUsed: queryTerms,
                    foundKeywords,
                    foundSocialKeywords,
                    keywordsMatchCount: `${foundKeywords.length}/${queryTerms.length}`,
                    socialMatchCount: `${foundSocialKeywords.length}/${queryTerms.length}`,
                    onsiteScore,
                    localGatewayScore
                },
                onsitePass: onsiteMark === "Pass" ? 1 : 0,
                gatewayPass: gatewayMark === "Pass" ? 1 : 0,
                socialPass: socialMark === "Pass" ? 1 : 0
            };
        });

        const resolvedCategories = await Promise.all(categoryPromises);

        let totalSocialScore = 0;
        for (const resData of resolvedCategories) {
            auditResults[resData.categoryName] = resData.auditResult;
            totalOnsiteScore += resData.onsitePass;
            totalLocalGatewayScore += resData.gatewayPass;
            totalSocialScore += resData.socialPass;
        }

        const avgOnsite = Math.round((totalOnsiteScore / topCategories.length) * 100) || 0;
        const avgGateway = Math.round((totalLocalGatewayScore / topCategories.length) * 100) || 0;
        const avgSocial = Math.round((totalSocialScore / topCategories.length) * 100) || 0;

        return res.status(200).json({
            hotelDomain: hotelDomain || 'Unknown',
            hasSocialPresence,
            avgOnsiteScore: avgOnsite,
            avgLocalGatewayScore: avgGateway,
            avgSocialScore: avgSocial,
            categoryAudits: auditResults
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error', details: err.message });
    }
}
