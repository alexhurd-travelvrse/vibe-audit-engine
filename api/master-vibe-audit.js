export const maxDuration = 60;
import * as dotenv from 'dotenv';
import { fetchVenueCorpus } from '../src/services/serperService.mjs';
import { runStructuredVibeAudit } from '../src/services/geminiService.mjs';

dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

// Fetch live booking images
async function fetchBookingPhotosForHotel(hotelName, city) {
  try {
    const res = await fetch('https://google.serper.dev/images', {
      method: 'POST',
      headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: `site:booking.com "${hotelName}" ${city} hotel`,
        num: 8
      })
    });
    const data = await res.json();
    if (data.images && data.images.length > 0) {
      return data.images.slice(0, 5).map((img, i) => ({
        slot: i + 1,
        title: img.title || `Photo ${i + 1}`,
        imageUrl: img.imageUrl,
        sourceUrl: img.link
      }));
    }
  } catch (err) {
    console.warn('[Master Vibe] Error fetching booking images:', err.message);
  }
  return [];
}

// Fetch signature amenity & venue images (Rooftops, Bars, Spas, Lobby features)
async function fetchAmenityPhotosForHotel(hotelName, city) {
  try {
    const res = await fetch('https://google.serper.dev/images', {
      method: 'POST',
      headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: `"${hotelName}" ${city} ("12th Knot" OR "rooftop bar" OR "Lyaness" OR "copper hull" OR "lobby" OR "spa" OR "terrace")`,
        num: 12
      })
    });
    const data = await res.json();
    return (data.images || []).map((img, i) => ({
      title: img.title || '',
      imageUrl: img.imageUrl,
      sourceUrl: img.link
    }));
  } catch (err) {
    console.warn('[Master Vibe] Error fetching amenity images:', err.message);
  }
  return [];
}

// Match the best image for a given photo recommendation subject
function matchBestImageForSubject(subjectText, liveBookingPhotos, amenityPhotos, defaultIndex = 0) {
  const text = (subjectText || '').toLowerCase();
  
  // 1. Check for specific venue spaces in amenity photos
  const allPool = [...amenityPhotos, ...liveBookingPhotos];
  
  if (text.includes('12th knot') || text.includes('rooftop')) {
    const match = allPool.find(p => p.title?.toLowerCase().includes('12th knot') || p.imageUrl?.toLowerCase().includes('12th') || p.title?.toLowerCase().includes('rooftop'));
    if (match) return match.imageUrl;
  }
  
  if (text.includes('lyaness') || text.includes('cocktail bar')) {
    const match = allPool.find(p => p.title?.toLowerCase().includes('lyaness') || p.imageUrl?.toLowerCase().includes('lyaness'));
    if (match) return match.imageUrl;
  }

  if (text.includes('copper') || text.includes('hull') || text.includes('lobby') || text.includes('staircase')) {
    const match = allPool.find(p => p.title?.toLowerCase().includes('copper') || p.title?.toLowerCase().includes('lobby') || p.title?.toLowerCase().includes('stair'));
    if (match) return match.imageUrl;
  }

  if (text.includes('spa') || text.includes('agua') || text.includes('wellness')) {
    const match = allPool.find(p => p.title?.toLowerCase().includes('spa') || p.title?.toLowerCase().includes('agua'));
    if (match) return match.imageUrl;
  }

  // 2. If subject relates to exterior / skyline
  if (text.includes('exterior') || text.includes('dusk') || text.includes('twilight') || text.includes('riverfront') || text.includes('st paul')) {
    if (liveBookingPhotos[0]?.imageUrl) return liveBookingPhotos[0].imageUrl;
  }

  // 3. If subject relates to suite / riverview room
  if (text.includes('suite') || text.includes('living area') || text.includes('sofa') || text.includes('balcony')) {
    if (liveBookingPhotos[1]?.imageUrl) return liveBookingPhotos[1].imageUrl;
    if (liveBookingPhotos[2]?.imageUrl) return liveBookingPhotos[2].imageUrl;
  }

  return liveBookingPhotos[defaultIndex]?.imageUrl || allPool[0]?.imageUrl || null;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const hotelName = req.body.hotelName || req.query.hotelName || req.body.propertyName || 'Sea Containers London';
    const city = req.body.city || req.query.city || 'London';
    const neighborhood = req.body.neighborhood || req.query.neighborhood || 'Southbank';

    console.log(`[Master Vibe Audit API] Running for: "${hotelName}" in "${city}" (${neighborhood})`);

    // 1. Fetch Venue Corpus from Serper
    const { rawCorpus } = await fetchVenueCorpus(hotelName, city);

    // 2. Fetch Live Booking.com Photos + Signature Amenity Photos concurrently
    const [liveBookingPhotos, amenityPhotos] = await Promise.all([
      fetchBookingPhotosForHotel(hotelName, city),
      fetchAmenityPhotosForHotel(hotelName, city)
    ]);

    // 3. Run Structured Gemini Analysis with multimodal vision
    const auditResult = await runStructuredVibeAudit(hotelName, city, rawCorpus, liveBookingPhotos);

    // 4. Map the exact corresponding photos to each re-sequenced recommendation
    if (auditResult.ota_conversion_audit) {
      auditResult.ota_conversion_audit.live_photos = liveBookingPhotos;
      
      if (auditResult.ota_conversion_audit.optimal_5_photo_sequence) {
        auditResult.ota_conversion_audit.optimal_5_photo_sequence = auditResult.ota_conversion_audit.optimal_5_photo_sequence.map((item, idx) => {
          // Determine best matching photo URL based on semantic subject & slot
          const photoUrl = matchBestImageForSubject(item.photo_subject, liveBookingPhotos, amenityPhotos, idx);
          
          return {
            ...item,
            photo_url: photoUrl,
            current_photo: liveBookingPhotos[item.current_slot ? item.current_slot - 1 : idx] || null
          };
        });
      }
    }

    return res.status(200).json(auditResult);
  } catch (err) {
    console.error('[Master Vibe Audit API] Error:', err);
    return res.status(500).json({ error: err.message });
  }
}
