import * as dotenv from 'dotenv';
dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

export async function fetchBookingPhotosViaSerper(hotelName, city = '', cleanUrl = null) {
  if (!SERPER_API_KEY) return [];
  try {
    const queries = [];
    if (cleanUrl) {
      queries.push(`site:booking.com "${cleanUrl}"`);
    }
    queries.push(`site:booking.com "${hotelName}" ${city} hotel`);

    const photos = [];
    const seen = new Set();

    for (const q of queries) {
      if (photos.length >= 25) break;
      const res = await fetch('https://google.serper.dev/images', {
        method: 'POST',
        headers: {
          'X-API-KEY': SERPER_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ q, num: 30 })
      });
      if (!res.ok) continue;
      const data = await res.json();
      const images = data.images || [];

      for (const img of images) {
        const u = img.imageUrl || '';
        if (u.includes('bstatic.com') && (u.includes('/hotel/') || u.includes('/xdata/images/hotel/'))) {
          const highRes = u.replace(/\/max\d+x\d+\//, '/max1024x768/').replace(/\/max\d+\//, '/max1024x768/');
          const photoId = highRes.match(/\/(\d+)\.jpg/)?.[1] || highRes.split('?')[0];
          if (!seen.has(photoId) && (highRes.includes('.jpg') || highRes.includes('.jpeg') || highRes.includes('.webp') || highRes.includes('.png'))) {
            seen.add(photoId);
            photos.push({
              slot: photos.length + 1,
              title: img.title || `${hotelName} Gallery Photo`,
              imageUrl: highRes,
              photoId: photoId,
              sourceUrl: img.link || cleanUrl || 'https://www.booking.com'
            });
          }
        }
      }
    }
    return photos;
  } catch (err) {
    console.warn('[Serper Booking Photos] Warning:', err.message);
    return [];
  }
}

const testResults = await fetchBookingPhotosViaSerper('Sea Containers London', 'London');
console.log('Discovered photos via Serper:', testResults.length);
if (testResults.length > 0) {
  console.log('First 3:');
  console.log(testResults.slice(0, 3));
}
