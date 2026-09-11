export const maxDuration = 60;
import * as dotenv from 'dotenv';
import { fetchVenueCorpus } from '../src/services/serperService.mjs';
import { runStructuredVibeAudit } from '../src/services/geminiService.mjs';

dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

// Live Booking.com direct scraper via Playwright (with Serper fallback)
async function fetchBookingPhotosForHotel(hotelName, city) {
  try {
    // 1. Find the exact Booking.com URL via Serper Search
    console.log(`[Master Vibe] Resolving Booking.com URL for "${hotelName}" in "${city}"...`);
    const searchRes = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: `site:booking.com/hotel/ "${hotelName}" ${city}`,
        num: 3
      })
    });
    const searchData = await searchRes.json();
    const bookingUrl = searchData.organic?.[0]?.link;

    if (bookingUrl && bookingUrl.includes('booking.com/hotel/')) {
      console.log(`[Master Vibe] Scraping live Booking.com gallery from: ${bookingUrl}`);
      try {
        const { chromium } = await import('playwright');
        const browser = await chromium.launch({ channel: 'chrome', headless: true }).catch(() => chromium.launch({ headless: true }));
        const context = await browser.newContext({
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          viewport: { width: 1440, height: 900 }
        });
        const page = await context.newPage();
        await page.goto(bookingUrl, { waitUntil: 'domcontentloaded', timeout: 25000 });
        await page.waitForTimeout(3000);

        const photos = await page.evaluate(() => {
          const list = [];
          const seen = new Set();

          // 1. Visible DOM hero & grid elements first (Slots 1 to 5+)
          const galleryElements = document.querySelectorAll('[data-preview-image-layout-gallery-grid-item] img, [data-testid="property-gallery"] img, .bh-photo-grid-item img, a[data-thumb-url], img[src*="bstatic.com"]');
          galleryElements.forEach(el => {
            const src = el.src || el.getAttribute('data-thumb-url') || el.getAttribute('href');
            if (src && src.includes('bstatic.com') && src.includes('/images/hotel/')) {
              const highRes = src.replace(/\/max\d+x\d+\//, '/max1024x768/');
              const photoId = src.match(/\/(\d+)\.jpg/)?.[1] || highRes;
              if (!seen.has(photoId)) {
                seen.add(photoId);
                list.push({
                  title: el.alt || 'Booking.com Gallery Photo',
                  imageUrl: highRes,
                  photoId: photoId,
                  sourceUrl: window.location.href
                });
              }
            }
          });

          // 2. Additional deep gallery photos from script tags
          const scripts = document.querySelectorAll('script');
          for (const s of scripts) {
            const txt = s.textContent || '';
            if (txt.includes('bstatic.com/xdata/images/hotel/')) {
              const matches = txt.matchAll(/https?:\/\/[a-z0-9.]*bstatic\.com\/xdata\/images\/hotel\/[a-zA-Z0-9_/.]*(\d+)\.jpg[^\s"']*/g);
              for (const m of matches) {
                const rawUrl = m[0].replace(/\\u002F/g, '/');
                const photoId = m[1];
                if (!seen.has(photoId)) {
                  seen.add(photoId);
                  const highRes = rawUrl.replace(/\/max\d+x\d+\//, '/max1024x768/');
                  list.push({
                    title: 'Booking.com Deep Gallery Photo',
                    imageUrl: highRes,
                    photoId: photoId,
                    sourceUrl: window.location.href
                  });
                }
              }
            }
          }

          return list;
        });

        await browser.close();

        if (photos.length >= 5) {
          console.log(`[Master Vibe] Successfully extracted ${photos.length} exact live Booking.com photos!`);
          return photos.map((p, i) => ({
            slot: i + 1,
            title: p.title,
            imageUrl: p.imageUrl,
            photoId: p.photoId,
            sourceUrl: p.sourceUrl
          }));
        }
      } catch (browserErr) {
        console.warn('[Master Vibe] Headless browser scrape error, falling back to Serper images:', browserErr.message);
      }
    }

    // Fallback: Google Serper Images API
    const res = await fetch('https://google.serper.dev/images', {
      method: 'POST',
      headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: `site:booking.com "${hotelName}" ${city} hotel`,
        num: 20
      })
    });
    const data = await res.json();
    if (data.images && data.images.length > 0) {
      return data.images.map((img, i) => ({
        slot: i + 1,
        title: img.title || `Booking.com Photo ${i + 1}`,
        imageUrl: img.imageUrl,
        sourceUrl: img.link
      }));
    }
  } catch (err) {
    console.warn('[Master Vibe] Error fetching booking images:', err.message);
  }
  return [];
}

// Dynamic Amenity Photo Fetcher for any hotel & city
async function fetchAmenityPhotosForHotel(hotelName, city) {
  try {
    const query = `"${hotelName}" ${city} ("rooftop" OR "cocktail bar" OR "bar" OR "restaurant" OR "lounge" OR "spa" OR "pool" OR "lobby" OR "terrace" OR "12th knot" OR "lyaness" OR "neni")`;
    const res = await fetch('https://google.serper.dev/images', {
      method: 'POST',
      headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: query, num: 15 })
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
// Match the best image for a given photo recommendation subject and category
function matchBestImageForSubject(subjectText, category, liveBookingPhotos = [], amenityPhotos = [], usedUrls = new Set(), defaultIndex = 0) {
  const text = String(subjectText || '').toLowerCase();
  const cat = String(category || '').toUpperCase();
  const poolLive = Array.isArray(liveBookingPhotos) ? liveBookingPhotos : [];
  const poolAmenity = Array.isArray(amenityPhotos) ? amenityPhotos : [];
  const allPool = [...poolAmenity, ...poolLive];
  const setUsed = (usedUrls instanceof Set) ? usedUrls : new Set();

  // Helper to find unused image matching predicate
  const findMatch = (pool, predicate) => {
    const match = pool.find(p => p?.imageUrl && !setUsed.has(p.imageUrl) && predicate(p));
    if (match) {
      setUsed.add(match.imageUrl);
      return match.imageUrl;
    }
    return null;
  };

  // 1. 12th Knot Rooftop / Rooftop Terrace
  if (cat === 'SOCIAL_FB_ROOFTOP' && (text.includes('12th knot') || text.includes('rooftop') || text.includes('skyline') || text.includes('terrace'))) {
    const url = findMatch(amenityPhotos, p => {
      const t = (p.title || '').toLowerCase();
      const u = (p.imageUrl || '').toLowerCase();
      return (t.includes('12th knot') || t.includes('rooftop') || u.includes('12th-knot') || t.includes('terrace')) && !t.includes('lyaness');
    });
    if (url) return url;
  }

  // 2. Lyaness Cocktail Bar / Bar
  if (cat === 'SOCIAL_FB_ROOFTOP' && (text.includes('lyaness') || text.includes('cocktail') || text.includes('marble bar') || text.includes('boilerman'))) {
    const url = findMatch(amenityPhotos, p => {
      const t = (p.title || '').toLowerCase();
      const u = (p.imageUrl || '').toLowerCase();
      return (t.includes('lyaness') || t.includes('cocktail') || u.includes('lyaness') || t.includes('bar')) && !t.includes('12th');
    });
    if (url) return url;
  }

  // 3. Restaurant / Dining (e.g. NENI)
  if (text.includes('restaurant') || text.includes('dining') || text.includes('neni') || text.includes('conservatory')) {
    const url = findMatch(allPool, p => {
      const t = (p.title || '').toLowerCase();
      return t.includes('restaurant') || t.includes('dining') || t.includes('neni') || t.includes('conservatory') || t.includes('food');
    });
    if (url) return url;
  }

  // 4. Lobby / Reception / Art Sculpture
  if (cat === 'WELLNESS_SPA_LOBBY' && (text.includes('lobby') || text.includes('hull') || text.includes('copper') || text.includes('sculpture') || text.includes('reception'))) {
    const url = findMatch(allPool, p => {
      const t = (p.title || '').toLowerCase();
      return t.includes('lobby') || t.includes('hull') || t.includes('copper') || t.includes('reception') || t.includes('sculpture');
    });
    if (url) return url;
  }

  // 5. Spa / Wellness Pool
  if (cat === 'WELLNESS_SPA_LOBBY' && (text.includes('spa') || text.includes('agua') || text.includes('wellness') || text.includes('pool'))) {
    const url = findMatch(amenityPhotos, p => {
      const t = (p.title || '').toLowerCase();
      return t.includes('spa') || t.includes('agua') || t.includes('wellness') || t.includes('massage');
    });
    if (url) return url;
  }

  // 6. Bedroom / Suite / Bed
  if (cat === 'SIGNATURE_SUITE_BEDROOM' || cat === 'SECONDARY_ROOM_BATHROOM' || text.includes('bedroom') || text.includes('bed') || text.includes('headboard') || text.includes('suite') || text.includes('room')) {
    // Look for actual bed / bedroom in live booking photos
    const url = findMatch(liveBookingPhotos, p => {
      const t = (p.title || '').toLowerCase();
      return t.includes('bedroom') || t.includes('bed') || t.includes('room') || t.includes('suite');
    });
    if (url) return url;
  }

  // 7. Bathroom / Tub / Sink
  if (text.includes('bathroom') || text.includes('tub') || text.includes('sink') || text.includes('basin') || text.includes('bath')) {
    const url = findMatch(liveBookingPhotos, p => {
      const t = (p.title || '').toLowerCase();
      return t.includes('bath') || t.includes('tub') || t.includes('sink');
    });
    if (url) return url;
  }

  // 8. Exterior / Riverfront / Skyline Hero
  if (cat === 'EXTERIOR_LANDMARK' || text.includes('exterior') || text.includes('river') || text.includes('thames') || text.includes('facade') || text.includes('building')) {
    if (poolLive[0] && !setUsed.has(poolLive[0].imageUrl)) {
      setUsed.add(poolLive[0].imageUrl);
      return poolLive[0].imageUrl;
    }
  }

  // Unused fallback
  for (const p of allPool) {
    if (p?.imageUrl && !setUsed.has(p.imageUrl)) {
      setUsed.add(p.imageUrl);
      return p.imageUrl;
    }
  }

  return poolLive[defaultIndex]?.imageUrl || allPool[0]?.imageUrl || null;
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
    const auditResult = await runStructuredVibeAudit(hotelName, city, rawCorpus, liveBookingPhotos, amenityPhotos);

    // 4. Map the exact corresponding photos to each re-sequenced recommendation
    if (auditResult.ota_conversion_audit) {
      auditResult.ota_conversion_audit.live_photos = liveBookingPhotos;
      
      if (auditResult.ota_conversion_audit.optimal_5_photo_sequence) {
        const usedUrls = new Set();
        auditResult.ota_conversion_audit.optimal_5_photo_sequence = auditResult.ota_conversion_audit.optimal_5_photo_sequence.map((item, idx) => {
          const targetSlot = item.slot || (idx + 1);
          // Determine best matching photo URL based on semantic subject & category
          const photoUrl = matchBestImageForSubject(item.photo_subject, item.category, liveBookingPhotos, amenityPhotos, usedUrls, idx);

          // Find exact live slot index in liveBookingPhotos (1-indexed)
          const liveMatchIndex = liveBookingPhotos.findIndex(lp => {
            if (!lp?.imageUrl || !photoUrl) return false;
            if (lp.imageUrl === photoUrl) return true;
            const lpId = lp.imageUrl.match(/\/(\d+)\.jpg/)?.[1];
            const recId = photoUrl.match(/\/(\d+)\.jpg/)?.[1];
            return lpId && recId && lpId === recId;
          });

          const actualLiveSlot = liveMatchIndex !== -1 ? (liveMatchIndex + 1) : null;
          const isRetained = actualLiveSlot === targetSlot;
          const isMoved = actualLiveSlot !== null && actualLiveSlot !== targetSlot;
          const isSwappedIn = actualLiveSlot === null;

          let action = item.action;
          let actionLabel = item.action_label;

          if (isRetained) {
            action = targetSlot === 1 ? 'KEEP_HERO' : 'RETAIN';
            actionLabel = targetSlot === 1 ? 'KEEP AS HERO (SLOT #1)' : `RETAIN IN SLOT #${targetSlot}`;
          } else if (isMoved) {
            action = actualLiveSlot > targetSlot ? 'PROMOTE' : 'RE_SEQUENCE';
            actionLabel = actualLiveSlot > targetSlot ? `PROMOTE FROM SLOT #${actualLiveSlot}` : `MOVE FROM SLOT #${actualLiveSlot}`;
          } else if (isSwappedIn) {
            action = 'SWAP_IN';
            if (!actionLabel || !actionLabel.toUpperCase().includes('SWAP')) {
              actionLabel = `SWAP IN NEW ASSET (SLOT #${targetSlot})`;
            }
          }
          
          return {
            ...item,
            slot: targetSlot,
            photo_url: photoUrl,
            current_slot: actualLiveSlot,
            is_retained: isRetained,
            is_moved: isMoved,
            is_swapped_in: isSwappedIn,
            action: action,
            action_label: actionLabel,
            current_photo: actualLiveSlot ? liveBookingPhotos[actualLiveSlot - 1] : null
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
