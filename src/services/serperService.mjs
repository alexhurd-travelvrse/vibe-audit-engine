import * as dotenv from 'dotenv';
dotenv.config();

const getApiKey = () => process.env.SERPER_API_KEY || process.env.VITE_SERPER_API_KEY;

export async function fetchVenueCorpus(hotelName, city) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('SERPER_API_KEY or VITE_SERPER_API_KEY is not defined in environment variables');
  }

  const headers = {
    'X-API-KEY': apiKey,
    'Content-Type': 'application/json'
  };

  console.log(`[Serper] Gathering live intelligence for "${hotelName}" in "${city}"...`);

  // 1. Google Places Query
  const placesPromise = fetch('https://google.serper.dev/places', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      q: `${hotelName} ${city}`,
      num: 5
    })
  }).then(r => r.json()).catch(err => {
    console.warn('[Serper] Places query error:', err.message);
    return {};
  });

  // 2. Editorial Search Query (Time Out, Infatuation, Condé Nast, etc.)
  const editorialPromise = fetch('https://google.serper.dev/search', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      q: `"${hotelName}" ${city} review (site:timeout.com OR site:theinfatuation.com OR site:cntraveller.com OR site:telegraph.co.uk OR site:standard.co.uk OR "vibe" OR "atmosphere")`,
      num: 10
    })
  }).then(r => r.json()).catch(err => {
    console.warn('[Serper] Editorial search query error:', err.message);
    return {};
  });

  // 3. Atmosphere & Guest Experience Search
  const atmospherePromise = fetch('https://google.serper.dev/search', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      q: `"${hotelName}" ${city} ("bar" OR "music" OR "interior design" OR "cocktail" OR "lobby" OR "crowd")`,
      num: 8
    })
  }).then(r => r.json()).catch(err => {
    console.warn('[Serper] Atmosphere search query error:', err.message);
    return {};
  });

  const [placesData, editorialData, atmosphereData] = await Promise.all([
    placesPromise,
    editorialPromise,
    atmospherePromise
  ]);

  const corpusSections = [];

  // Parse Places Data
  if (placesData.places && placesData.places.length > 0) {
    const topPlace = placesData.places[0];
    corpusSections.push(`=== GOOGLE PLACES METADATA & REVIEWS ===`);
    corpusSections.push(`Title: ${topPlace.title || hotelName}`);
    corpusSections.push(`Address: ${topPlace.address || ''}`);
    corpusSections.push(`Rating: ${topPlace.rating || 'N/A'} (${topPlace.ratingCount || 0} reviews)`);
    corpusSections.push(`Category: ${topPlace.category || ''}`);
    
    if (topPlace.description) {
      corpusSections.push(`Description: ${topPlace.description}`);
    }

    // Top places attributes if present
    if (topPlace.attributes) {
      corpusSections.push(`Attributes: ${JSON.stringify(topPlace.attributes)}`);
    }
  }

  // Parse Editorial Articles
  if (editorialData.organic && editorialData.organic.length > 0) {
    corpusSections.push(`\n=== EDITORIAL CRITIQUE & PRESS SNIPPETS ===`);
    editorialData.organic.forEach((item, idx) => {
      corpusSections.push(`[Source ${idx + 1}: ${item.title}]`);
      corpusSections.push(`Link: ${item.link}`);
      corpusSections.push(`Snippet: ${item.snippet || ''}`);
      if (item.sitelinks && item.sitelinks.length > 0) {
        corpusSections.push(`Highlights: ${item.sitelinks.map(s => s.title).join(', ')}`);
      }
    });
  }

  // Parse Atmosphere & Guest Vibe Mentions
  if (atmosphereData.organic && atmosphereData.organic.length > 0) {
    corpusSections.push(`\n=== ATMOSPHERE, INTERIOR & GUEST OBSERVATIONS ===`);
    atmosphereData.organic.forEach((item, idx) => {
      corpusSections.push(`- ${item.title}: ${item.snippet || ''}`);
    });
  }

  const rawCorpus = corpusSections.join('\n');
  console.log(`[Serper] Successfully compiled ${rawCorpus.length} characters of live venue data.`);
  return {
    rawCorpus,
    places: placesData.places || [],
    editorial: editorialData.organic || []
  };
}
