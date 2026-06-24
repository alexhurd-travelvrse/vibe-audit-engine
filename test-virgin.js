import dotenv from 'dotenv';
dotenv.config();

async function run() {
    console.log("Starting analysis for Virgin Hotel, East of the Strip (Las Vegas)...");
    
    // 1. Audit Local Signals
    const city = "Las Vegas";
    const neighborhood = "East of the Strip";
    console.log(`\n[Agent A] Requesting Dynamic Flipped Funnel Data for ${city} / ${neighborhood}...`);
    
    const params = new URLSearchParams({ city, neighborhood });
    const localSignalsRes = await fetch(`http://localhost:3002/api/audit?${params.toString()}`);
    const cityData = await localSignalsRes.json();
    
    console.log(`City Data retrieved. Categories found:`, Object.keys(cityData.Categories).length);

    // 2. Audit Discoverability (Hotel)
    const propertyName = "Virgin Hotel";
    console.log(`\n[Agent B] Requesting Vibe Audit for ${propertyName} in ${city}...`);
    
    const categories = cityData.Categories;
    const topCategories = Object.entries(categories || {}).slice(0, 6).map(([categoryName, data]) => {
        const topVibe = data.Top3Vibes?.[0];
        return {
            categoryName,
            vibeName: topVibe?.vibeName || categoryName,
            keywords: topVibe?.semanticKeywords || [topVibe?.vibeName],
            topVenueName: data.TopLocalVenue?.name
        };
    });

    const hotelAuditRes = await fetch('http://localhost:3002/api/hotel-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            hotelName: propertyName, 
            city, 
            topCategories,
            propertyUrl: 'https://virginhotelslv.com/',
            instagramUrl: 'https://www.instagram.com/virginhotelslv/'
        })
    });
    const auditResults = await hotelAuditRes.json();
    console.log("RAW AUDIT RESULTS:", JSON.stringify(auditResults, null, 2));

    // 3. Apply Phase 3 logic
    const audits = Object.entries(auditResults.categoryAudits || {}).map(([catName, audit]) => ({ catName, ...audit }));
    const onsitePasses = audits.filter(a => a.onsiteMark === 'Pass').slice(0, 3);
    const onsiteCatNames = onsitePasses.map(a => a.catName);
    const localGaps = audits.filter(a => !onsiteCatNames.includes(a.catName)).slice(0, 2);

    console.log("\n======================================");
    console.log("PHASE 3: THE 5-CHALLENGE FRAMEWORK");
    console.log("======================================");
    
    console.log("\n[3 ONSITE EXPERIENCES (PASS)]");
    onsitePasses.forEach((p, i) => {
        console.log(`${i+1}. ${p.catName}: ${p.vibeName}`);
        console.log(`   Keywords: ${p.keywords?.join(', ') || p.foundKeywords?.join(', ') || 'N/A'}`);
    });

    console.log("\n[2 LOCAL GAPS]");
    localGaps.forEach((g, i) => {
        console.log(`${i+1}. ${g.catName}: ${g.vibeName}`);
        console.log(`   Venue: ${g.topVenueName}`);
        console.log(`   Keywords: ${g.keywords?.join(', ') || g.foundSocialKeywords?.join(', ') || 'N/A'}`);
    });
}
run();
