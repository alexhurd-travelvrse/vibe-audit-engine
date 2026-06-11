import * as dotenv from 'dotenv';
dotenv.config();

const APIFY_TOKEN = process.env.APIFY_API_TOKEN;
const handle = 'seacontainerslondon';

async function testApify() {
    console.log(`Scraping @${handle}...`);
    try {
        const res = await fetch(`https://api.apify.com/v2/acts/apify~instagram-scraper/run-sync-get-dataset-items?token=${APIFY_TOKEN}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ directUrls: [`https://www.instagram.com/${handle}/`], resultsType: "posts", resultsLimit: 15 })
        });
        const data = await res.json();
        
        if (Array.isArray(data) && data.length > 0) {
            console.log(`\n✅ Apify successfully pulled ${data.length} items.`);
            console.log(`\n--- RAW DATA ITEM 1 ---`);
            console.log(JSON.stringify(data[0], null, 2));
        } else {
            console.log("No array returned or empty array. Response:", data);
        }
    } catch (e) {
        console.error("Error:", e);
    }
}

testApify();
