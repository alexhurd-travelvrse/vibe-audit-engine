import dotenv from 'dotenv';
dotenv.config();

async function getTourSpots(neighborhood) {
    console.log(`\nFetching spots for ${neighborhood}...`);
    const params = new URLSearchParams({ city: "Las Vegas", neighborhood });
    
    try {
        const localSignalsRes = await fetch(`http://localhost:3002/api/audit?${params.toString()}`);
        const cityData = await localSignalsRes.json();
        
        let spots = [];
        for (const [category, data] of Object.entries(cityData.Categories || {})) {
            if (data.TopLocalVenue && data.TopLocalVenue.name) {
                spots.push({
                    category: category,
                    vibe: data.Top3Vibes?.[0]?.vibeName || "N/A",
                    venue: data.TopLocalVenue.name,
                    rating: data.TopLocalVenue.googlePlacesScore,
                    keywords: data.Top3Vibes?.[0]?.semanticKeywords || []
                });
            }
        }
        return spots;
    } catch (e) {
        console.error(`Error fetching ${neighborhood}:`, e);
        return [];
    }
}

async function run() {
    console.log("Generating Vegas Tour (Arts District & Fremont Street)...");
    
    const artsDistrictSpots = await getTourSpots("Arts District");
    const fremontSpots = await getTourSpots("Fremont Street");
    
    console.log("\n======================================");
    console.log("ARTS DISTRICT SCANNABLE SPOTS");
    console.log("======================================");
    artsDistrictSpots.forEach((s, i) => {
        console.log(`${i+1}. ${s.venue} (${s.vibe} - ${s.rating} stars)`);
    });

    console.log("\n======================================");
    console.log("FREMONT STREET SCANNABLE SPOTS");
    console.log("======================================");
    fremontSpots.forEach((s, i) => {
        console.log(`${i+1}. ${s.venue} (${s.vibe} - ${s.rating} stars)`);
    });
}

run();
