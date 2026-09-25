const SERPER_API_KEY = 'a23fd96c5cb1aace5f985e1d32f27492c241b349';

async function testDomain() {
  const hotelName = 'The Plymouth Hotel';
  const locationContext = 'South Beach Miami Beach';
  const searchRes = await fetch('https://google.serper.dev/search', {
    method: 'POST',
    headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: `"${hotelName}" ${locationContext} official website`, num: 6 })
  });
  const searchData = await searchRes.json();
  console.log('Organic search results:');
  for (const item of searchData.organic || []) {
    console.log(item.title, '->', item.link);
  }

  // Also search images
  const imgRes = await fetch('https://google.serper.dev/images', {
    method: 'POST',
    headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: `"${hotelName}" ${locationContext} (bathroom OR "freestanding bath" OR "soaking tub" OR "marble bathroom" OR "rain shower" OR "clawfoot tub") (site:theplymouthmiami.com OR site:tripadvisor.com OR site:instagram.com OR site:facebook.com) -wedding`, num: 10 })
  });
  const imgData = await imgRes.json();
  console.log('\nBathroom images from official/tripadvisor:');
  for (const img of imgData.images || []) {
    console.log(img.title, '->', img.imageUrl, 'link:', img.link);
  }
}

testDomain();
