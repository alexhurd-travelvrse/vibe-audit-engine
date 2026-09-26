require('dotenv').config();
const key = process.env.VITE_SERPER_API_KEY;

async function testManagementOnly() {
  const cleanHotelName = 'The Miami Beach EDITION';
  
  // Exclude guest user captions: "-Picture of" and exclude "ShowUserReviews"
  const queries = [
    `site:tripadvisor.com "${cleanHotelName}" "Management Photos" -intitle:"Picture of"`,
    `site:tripadvisor.com/Hotel_Review "${cleanHotelName}" -intitle:"Picture of"`,
    `site:tripadvisor.com/Hotel_Feature "${cleanHotelName}"`
  ];

  for (const q of queries) {
    const res = await fetch('https://google.serper.dev/images', {
      method: 'POST',
      headers: { 'X-API-KEY': key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q, num: 10 })
    });
    const d = await res.json();
    console.log(`\n=== QUERY: ${q} (Count: ${d.images?.length || 0}) ===`);
    (d.images || []).forEach(img => {
      console.log('Title:', img.title);
      console.log('Link:', img.link);
      console.log('Image:', img.imageUrl?.substring(0, 90));
    });
  }
}

testManagementOnly();
