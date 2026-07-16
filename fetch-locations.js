
import * as dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

async function getPlaces(query) {
    const res = await fetch('https://google.serper.dev/places', {
        method: 'POST',
        headers: { 'X-API-KEY': API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: query })
    });
    const data = await res.json();
    return data.places || [];
}

async function run() {
    const culinaryPlaces = await getPlaces('best authentic tavernas and restaurants Kassiopi Corfu');
    const nightlifePlaces = await getPlaces('best cocktail bars and pubs Kassiopi Corfu');
    
    console.log('--- CULINARY ---');
    culinaryPlaces.slice(0, 5).forEach(p => console.log('- ' + p.title + ' (Rating: ' + p.rating + ', Reviews: ' + p.ratingCount + ')'));
    
    console.log('\n--- NIGHTLIFE ---');
    nightlifePlaces.slice(0, 5).forEach(p => console.log('- ' + p.title + ' (Rating: ' + p.rating + ', Reviews: ' + p.ratingCount + ')'));
}

run();

