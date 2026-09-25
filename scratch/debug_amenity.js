const SERPER_API_KEY = process.env.SERPER_API_KEY || '23f66c0753063f15951c3132e1858a74ec3b55c5';

async function debugAmenity() {
  const hotelName = 'The Plymouth Hotel';
  const locationContext = 'South Beach Miami Beach';
  const domainFilter = '(site:theplymouthmiami.com OR site:tripadvisor.com OR site:instagram.com OR site:facebook.com)';
  const exclusions = '-wedding -bride -groom -dress -couple -menu';
  
  const res = await fetch('https://google.serper.dev/images', {
    method: 'POST',
    headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: `"${hotelName}" ${locationContext} (bathroom OR "freestanding bath" OR "soaking tub" OR "marble bathroom" OR "rain shower" OR vanity OR "walk-in shower") ${domainFilter} ${exclusions}`, num: 12 })
  });
  const data = await res.json();
  console.log('Serper bathroom images for Plymouth:');
  (data.images || []).forEach(img => {
    console.log(`Title: "${img.title}"`);
    console.log(`  URL: ${img.imageUrl}`);
    console.log(`  Link: ${img.link}`);
  });
}

debugAmenity();
