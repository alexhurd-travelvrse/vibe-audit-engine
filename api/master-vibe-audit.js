export const maxDuration = 60;
import * as dotenv from 'dotenv';
import { fetchVenueCorpus } from '../src/services/serperService.mjs';
import { runStructuredVibeAudit } from '../src/services/geminiService.mjs';

dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

// Live Booking.com direct scraper via Playwright (with Serper fallback)
async function fetchBookingPhotosForHotel(hotelName, city, neighborhood = '') {
  try {
    const locationContext = neighborhood && neighborhood.trim() ? `${neighborhood.trim()} ${city}` : city;
    // 1. Find the exact Booking.com URL via Serper Search
    console.log(`[Master Vibe] Resolving Booking.com URL for "${hotelName}" in "${locationContext}"...`);
    const searchRes = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: `site:booking.com/hotel/ "${hotelName}" ${locationContext}`,
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
        q: `site:booking.com "${hotelName}" ${locationContext} hotel`,
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

// Dynamic Amenity Photo Fetcher for any hotel & city with category-specific precision
async function fetchAmenityPhotosForHotel(hotelName, city, neighborhood = '') {
  try {
    const locationContext = neighborhood && neighborhood.trim() ? `${neighborhood.trim()} ${city}` : city;
    
    // Concurrently fetch specific categories: Dining/Social, Spa/Wellness, and Bathroom
    const [resSocial, resSpa, resBath] = await Promise.all([
      fetch('https://google.serper.dev/images', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: `"${hotelName}" ${locationContext} ("restaurant" OR "dining" OR "brasserie" OR "cocktail bar" OR "bar" OR "lounge" OR "afternoon tea" OR "gastronomy" OR "bistro" OR "food")`, num: 10 })
      }).then(r => r.json()).catch(() => ({})),
      fetch('https://google.serper.dev/images', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: `"${hotelName}" ${locationContext} ("spa" OR "indoor pool" OR "swimming pool" OR "vitality pool" OR "treatment room" OR "wellness" OR "massage" OR "sauna" OR "bathhouse" OR "steam room")`, num: 10 })
      }).then(r => r.json()).catch(() => ({})),
      fetch('https://google.serper.dev/images', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: `"${hotelName}" ${locationContext} ("bathroom" OR "freestanding bath" OR "soaking tub" OR "marble bathroom" OR "rain shower" OR "luxury vanity")`, num: 10 })
      }).then(r => r.json()).catch(() => ({})),
    ]);

    const isExteriorLike = (title = '', url = '') => {
      const s = `${title} ${url}`.toLowerCase();
      return s.includes('exterior') || s.includes('facade') || s.includes('façade') || s.includes('building') || s.includes('outside') || s.includes('aerial') || s.includes('marina view') || s.includes('view of hotel') || s.includes('entrance') || s.includes('architecture');
    };

    const validSocial = (resSocial.images || [])
      .filter(img => !isExteriorLike(img.title, img.imageUrl))
      .map(img => ({ ...img, detectedCategory: 'SOCIAL' }));

    const validSpa = (resSpa.images || [])
      .filter(img => !isExteriorLike(img.title, img.imageUrl))
      .map(img => ({ ...img, detectedCategory: 'SPA' }));

    const validBath = (resBath.images || [])
      .filter(img => !isExteriorLike(img.title, img.imageUrl))
      .map(img => ({ ...img, detectedCategory: 'BATHROOM' }));

    const combined = [...validSocial, ...validSpa, ...validBath];

    return combined.map(img => ({
      title: img.title || '',
      imageUrl: img.imageUrl,
      sourceUrl: img.link,
      detectedCategory: img.detectedCategory
    }));
  } catch (err) {
    console.warn('[Master Vibe] Error fetching amenity images:', err.message);
  }
  return [];
}

// Fallback matching helper with strict category precision
function matchBestImageForSubject(subjectText, category, liveBookingPhotos = [], amenityPhotos = [], usedUrls = new Set(), defaultIndex = 0) {
  const text = String(subjectText || '').toLowerCase();
  const cat = String(category || '').toUpperCase();
  const poolLive = Array.isArray(liveBookingPhotos) ? liveBookingPhotos : [];
  const poolAmenity = Array.isArray(amenityPhotos) ? amenityPhotos : [];
  const setUsed = (usedUrls instanceof Set) ? usedUrls : new Set();

  const isExterior = (p) => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    return s.includes('exterior') || s.includes('facade') || s.includes('façade') || s.includes('building') || s.includes('outside') || s.includes('aerial') || s.includes('marina') || s.includes('entrance');
  };

  const findMatch = (pool, predicate) => {
    const match = pool.find(p => p?.imageUrl && !setUsed.has(p.imageUrl) && predicate(p));
    if (match) {
      setUsed.add(match.imageUrl);
      return match.imageUrl;
    }
    return null;
  };

  // 1. Social F&B / Fine Dining / Restaurant / Cocktail Bar
  if (cat === 'SOCIAL_FB_ROOFTOP' || text.includes('restaurant') || text.includes('dining') || text.includes('brasserie') || text.includes('bar') || text.includes('cocktail') || text.includes('bistro') || text.includes('lounge') || text.includes('culinary')) {
    // Check live booking photos first for authentic restaurant/bar shots
    const liveMatch = findMatch(poolLive, p => {
      const t = (p.title || '').toLowerCase();
      const u = (p.imageUrl || '').toLowerCase();
      if (isExterior(p)) return false;
      return t.includes('restaurant') || t.includes('dining') || t.includes('brasserie') || t.includes('bar') || t.includes('cocktail') || t.includes('lounge') || t.includes('bistro') || t.includes('food') || u.includes('restaurant') || u.includes('dining') || u.includes('bar');
    });
    if (liveMatch) return liveMatch;

    // Check amenity photos (strictly non-exterior)
    const amenityMatch = findMatch(poolAmenity, p => {
      if (isExterior(p)) return false;
      const t = (p.title || '').toLowerCase();
      return p.detectedCategory === 'SOCIAL' || t.includes('restaurant') || t.includes('dining') || t.includes('brasserie') || t.includes('bar') || t.includes('cocktail') || t.includes('lounge') || t.includes('food');
    });
    if (amenityMatch) return amenityMatch;
  }

  // 2. Spa & Wellness Category (Pool, Spa, Treatments)
  if (cat === 'WELLNESS_SPA_LOBBY' || (cat === 'HERO_CULTURAL_MAGNET' && (text.includes('spa') || text.includes('pool') || text.includes('thermal') || text.includes('wellness'))) || text.includes('spa') || text.includes('wellness') || text.includes('pool') || text.includes('treatment') || text.includes('sauna') || text.includes('bathhouse')) {
    // Check live booking photos first
    const liveMatch = findMatch(poolLive, p => {
      const t = (p.title || '').toLowerCase();
      const u = (p.imageUrl || '').toLowerCase();
      return t.includes('spa') || t.includes('pool') || t.includes('wellness') || t.includes('treatment') || t.includes('sauna') || t.includes('massage') || u.includes('spa') || u.includes('pool');
    });
    if (liveMatch) return liveMatch;

    // Check amenity photos
    const amenityMatch = findMatch(poolAmenity, p => {
      if (isExterior(p)) return false;
      const t = (p.title || '').toLowerCase();
      return p.detectedCategory === 'SPA' || t.includes('spa') || t.includes('pool') || t.includes('wellness') || t.includes('treatment') || t.includes('sauna') || t.includes('massage');
    });
    if (amenityMatch) return amenityMatch;
  }

  // 3. Design Bathroom Category (Slot 5 / Bathroom)
  if (cat === 'SECONDARY_ROOM_BATHROOM' || text.includes('bathroom') || text.includes('bath') || text.includes('tub') || text.includes('shower') || text.includes('washroom')) {
    const liveMatch = findMatch(poolLive, p => {
      const t = (p.title || '').toLowerCase();
      const u = (p.imageUrl || '').toLowerCase();
      return t.includes('bathroom') || t.includes('bath') || t.includes('tub') || t.includes('shower') || t.includes('washroom') || u.includes('bath') || u.includes('shower');
    });
    if (liveMatch) return liveMatch;

    const amenityMatch = findMatch(poolAmenity, p => {
      const t = (p.title || '').toLowerCase();
      return p.detectedCategory === 'BATHROOM' || t.includes('bathroom') || t.includes('bath') || t.includes('tub') || t.includes('shower');
    });
    if (amenityMatch) return amenityMatch;
  }

  // 4. Exterior / Facade / Building Landmark
  if (cat === 'EXTERIOR_LANDMARK' || text.includes('exterior') || text.includes('facade') || text.includes('building') || text.includes('courtyard') || text.includes('entrance')) {
    const liveMatch = findMatch(poolLive, p => {
      const t = (p.title || '').toLowerCase();
      const u = (p.imageUrl || '').toLowerCase();
      return t.includes('exterior') || t.includes('facade') || t.includes('building') || t.includes('outside') || t.includes('entrance') || t.includes('hotel') || u.includes('exterior');
    });
    if (liveMatch) return liveMatch;

    const amenityMatch = findMatch(poolAmenity, p => {
      const t = (p.title || '').toLowerCase();
      return t.includes('exterior') || t.includes('facade') || t.includes('building') || t.includes('hotel');
    });
    if (amenityMatch) return amenityMatch;
  }

  // 5. Signature Suite / Bedroom
  if (cat === 'SIGNATURE_SUITE_BEDROOM' || text.includes('bedroom') || text.includes('bed') || text.includes('suite') || text.includes('room')) {
    const liveMatch = findMatch(poolLive, p => {
      const t = (p.title || '').toLowerCase();
      return t.includes('suite') || t.includes('bedroom') || t.includes('bed') || (t.includes('room') && !t.includes('bathroom'));
    });
    if (liveMatch) return liveMatch;
  }

  // Unused fallback (strictly ensuring no duplicate image URLs)
  const allPool = [...poolLive, ...poolAmenity];
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
    const hotelName = req.body.hotelName || req.query.hotelName || req.body.propertyName || 'Hartwell House';
    const city = req.body.city || req.query.city || 'Aylesbury';
    const neighborhood = (req.body.neighborhood !== undefined) ? req.body.neighborhood : (req.query.neighborhood || '');

    console.log(`[Master Vibe Audit API] Running for: "${hotelName}" in "${city}" ${neighborhood ? `(${neighborhood})` : ''}`);

    // 1. Fetch Venue Corpus from Serper with neighborhood precision
    const { rawCorpus } = await fetchVenueCorpus(hotelName, city, neighborhood);

    // 2. Fetch Live Booking.com Photos + Signature Amenity Photos concurrently with neighborhood precision
    const [liveBookingPhotos, amenityPhotos] = await Promise.all([
      fetchBookingPhotosForHotel(hotelName, city, neighborhood),
      fetchAmenityPhotosForHotel(hotelName, city, neighborhood)
    ]);

    // 3. Run Structured Gemini Analysis with multimodal vision
    const auditResult = await runStructuredVibeAudit(hotelName, city, rawCorpus, liveBookingPhotos, amenityPhotos, neighborhood);

    // 4. Map the exact corresponding photos to each re-sequenced recommendation
    if (auditResult.ota_conversion_audit) {
      auditResult.ota_conversion_audit.live_photos = liveBookingPhotos;
      
      if (auditResult.ota_conversion_audit.optimal_5_photo_sequence) {
        const usedUrls = new Set();
        auditResult.ota_conversion_audit.optimal_5_photo_sequence = auditResult.ota_conversion_audit.optimal_5_photo_sequence.map((item, idx) => {
          const targetSlot = item.slot || (idx + 1);
          let photoUrl = null;
          let actualLiveSlot = null;

          // 1. Direct Resolution via Gemini's Multimodal Visual Selection (with duplicate prevention)
          if (item.source_type === 'LIVE_PHOTO' && item.source_index && liveBookingPhotos[item.source_index - 1]) {
            const candidate = liveBookingPhotos[item.source_index - 1].imageUrl;
            if (!usedUrls.has(candidate)) {
              photoUrl = candidate;
              actualLiveSlot = item.source_index;
              usedUrls.add(photoUrl);
            }
          } else if (item.source_type === 'AMENITY_ASSET' && item.source_index && amenityPhotos[item.source_index - 1]) {
            const candidate = amenityPhotos[item.source_index - 1].imageUrl;
            if (!usedUrls.has(candidate)) {
              photoUrl = candidate;
              actualLiveSlot = null;
              usedUrls.add(photoUrl);
            }
          }

          // 2. Fallback matching if source_index was not found or candidate was already assigned
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

          if (item.category === 'HERO_CULTURAL_MAGNET' || item.action === 'HERO_CULTURAL_MAGNET' || item.action === 'MAGNET_OVERRIDE') {
            action = 'HERO_CULTURAL_MAGNET';
            actionLabel = item.action_label || `⚡ HERO CULTURAL MAGNET: ${item.photo_subject || 'SIGNATURE ASSET'} (SLOT #1)`;
          } else if (isRetained) {
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
