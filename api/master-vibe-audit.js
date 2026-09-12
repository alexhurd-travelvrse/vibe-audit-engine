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
    const query = `"${hotelName}" ${city} ("rooftop" OR "cocktail bar" OR "bar" OR "restaurant" OR "lounge" OR "spa" OR "pool" OR "lobby" OR "exterior" OR "facade" OR "terrace")`;
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

// Fallback matching helper
function matchBestImageForSubject(subjectText, category, liveBookingPhotos = [], amenityPhotos = [], usedUrls = new Set(), defaultIndex = 0) {
  const text = String(subjectText || '').toLowerCase();
  const cat = String(category || '').toUpperCase();
  const poolLive = Array.isArray(liveBookingPhotos) ? liveBookingPhotos : [];
  const poolAmenity = Array.isArray(amenityPhotos) ? amenityPhotos : [];
  const allPool = [...poolAmenity, ...poolLive];
  const setUsed = (usedUrls instanceof Set) ? usedUrls : new Set();

  const findMatch = (pool, predicate) => {
    const match = pool.find(p => p?.imageUrl && !setUsed.has(p.imageUrl) && predicate(p));
    if (match) {
      setUsed.add(match.imageUrl);
      return match.imageUrl;
    }
    return null;
  };

  // 1. Exterior / Facade / Building Hero
  if (cat === 'EXTERIOR_LANDMARK' || text.includes('exterior') || text.includes('facade') || text.includes('building') || text.includes('courtyard')) {
    const url = findMatch(poolLive, p => {
      const t = (p.title || '').toLowerCase();
      const u = (p.imageUrl || '').toLowerCase();
      return t.includes('exterior') || t.includes('facade') || t.includes('building') || t.includes('outside') || t.includes('entrance') || u.includes('exterior');
    }) || findMatch(poolAmenity, p => {
      const t = (p.title || '').toLowerCase();
      return t.includes('exterior') || t.includes('facade') || t.includes('building') || t.includes('hotel');
    });
    if (url) return url;
  }

  // 2. Rooftop / Cocktail Bar / Lounge
  if (cat === 'SOCIAL_FB_ROOFTOP' || text.includes('bar') || text.includes('cocktail') || text.includes('rooftop') || text.includes('lounge') || text.includes('boilerman')) {
    const url = findMatch(poolAmenity, p => {
      const t = (p.title || '').toLowerCase();
      const u = (p.imageUrl || '').toLowerCase();
      return t.includes('bar') || t.includes('cocktail') || t.includes('rooftop') || t.includes('boilerman') || t.includes('lounge') || u.includes('bar');
    }) || findMatch(poolLive, p => {
      const t = (p.title || '').toLowerCase();
      return t.includes('bar') || t.includes('cocktail') || t.includes('lounge');
    });
    if (url) return url;
  }

  // 3. Lobby / Reception / Arrival / Spa
  if (cat === 'WELLNESS_SPA_LOBBY' || text.includes('lobby') || text.includes('reception') || text.includes('spa') || text.includes('vinyl')) {
    const url = findMatch(poolLive, p => {
      const t = (p.title || '').toLowerCase();
      return t.includes('lobby') || t.includes('reception') || t.includes('lounge') || t.includes('spa') || t.includes('vinyl');
    }) || findMatch(poolAmenity, p => {
      const t = (p.title || '').toLowerCase();
      return t.includes('lobby') || t.includes('spa') || t.includes('wellness');
    });
    if (url) return url;
  }

  // 4. Bedroom / Suite / Bed
  if (cat === 'SIGNATURE_SUITE_BEDROOM' || cat === 'SECONDARY_ROOM_BATHROOM' || text.includes('bedroom') || text.includes('bed') || text.includes('room') || text.includes('suite')) {
    const url = findMatch(poolLive, p => {
      const t = (p.title || '').toLowerCase();
      return t.includes('bedroom') || t.includes('bed') || t.includes('room') || t.includes('suite');
    });
    if (url) return url;
  }

  // 5. Bathroom / Tub
  if (text.includes('bath') || text.includes('tub') || text.includes('shower')) {
    const url = findMatch(poolLive, p => {
      const t = (p.title || '').toLowerCase();
      return t.includes('bath') || t.includes('tub') || t.includes('shower');
    });
    if (url) return url;
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
          let photoUrl = null;
          let actualLiveSlot = null;

          // 1. Direct Resolution via Gemini's Multimodal Visual Selection
          if (item.source_type === 'LIVE_PHOTO' && item.source_index && liveBookingPhotos[item.source_index - 1]) {
            photoUrl = liveBookingPhotos[item.source_index - 1].imageUrl;
            actualLiveSlot = item.source_index;
            usedUrls.add(photoUrl);
          } else if (item.source_type === 'AMENITY_ASSET' && item.source_index && amenityPhotos[item.source_index - 1]) {
            photoUrl = amenityPhotos[item.source_index - 1].imageUrl;
            actualLiveSlot = null;
            usedUrls.add(photoUrl);
          }

          // 2. Fallback matching if source_index was not found
          if (!photoUrl) {
            photoUrl = matchBestImageForSubject(item.photo_subject, item.category, liveBookingPhotos, amenityPhotos, usedUrls, idx);
            if (photoUrl) {
              const liveIdx = liveBookingPhotos.findIndex(lp => lp.imageUrl === photoUrl);
              actualLiveSlot = liveIdx !== -1 ? (liveIdx + 1) : null;
            }
          }

          const isRetained = actualLiveSlot === targetSlot;
          const isMoved = actualLiveSlot !== null && actualLiveSlot !== targetSlot;
          const isSwappedIn = actualLiveSlot === null;

          let action = item.action || 'RE_SEQUENCE';
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
