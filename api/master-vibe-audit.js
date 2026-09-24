export const maxDuration = 60;
import * as dotenv from 'dotenv';
import { fetchVenueCorpus } from '../src/services/serperService.mjs';
import { runStructuredVibeAudit } from '../src/services/geminiService.mjs';

dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

// Distinctive token extractor (strips generic hospitality stop words)
function upgradePhotoResolution(url) {
  if (!url) return url;
  let cleanUrl = url;
  // TripAdvisor: upgrade /photo-s/, /photo-f/, /photo-l/, /photo-w/ to /photo-o/ (original high-res)
  if (cleanUrl.includes('tripadvisor.com')) {
    cleanUrl = cleanUrl.replace(/\/photo-[sflw]\//, '/photo-o/');
  }
  // Booking.com: upgrade /max200/, /max300/, /max500/ to /max1024x768/
  if (cleanUrl.includes('bstatic.com')) {
    cleanUrl = cleanUrl.replace(/\/max\d+x\d+\//, '/max1024x768/').replace(/\/max\d+\//, '/max1024x768/');
  }
  return cleanUrl;
}

function getDistinctiveTokens(name) {
  const stopWords = new Set(['the', 'a', 'an', 'and', '&', 'hotel', 'hotels', 'inn', 'pub', 'bar', 'lounge', 'rooms', 'house', 'boutique', 'resort', 'spa', 'suites', 'b&b', 'bed', 'breakfast', 'restaurant', 'lodge', 'retreat', 'club', 'london', 'uk']);
  return String(name || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length >= 3 && !stopWords.has(token));
}

function scoreUrlOrTitleMatch(targetStr, tokens) {
  if (!targetStr || !tokens || tokens.length === 0) return 0;
  const s = String(targetStr).toLowerCase();
  let score = 0;
  for (const token of tokens) {
    if (s.includes(token)) {
      score += 10;
    }
  }
  return score;
}

// Live Booking.com direct scraper via Playwright (with Serper fallback & strict disambiguation)
async function fetchBookingPhotosForHotel(hotelName, city, neighborhood = '') {
  try {
    const locationContext = neighborhood && neighborhood.trim() ? `${neighborhood.trim()} ${city}` : city;
    const tokens = getDistinctiveTokens(hotelName);
    
    // 1. Find the exact Booking.com URL via Serper Search
    console.log(`[Master Vibe] Resolving Booking.com URL for "${hotelName}" in "${locationContext}" (Tokens: [${tokens.join(', ')}])...`);
    const cleanName = hotelName.replace(/\b(hotel|resort|suites|inn|lodge|boutique)\b/gi, '').trim();
    const queryStr = cleanName && cleanName !== hotelName 
      ? `site:booking.com/hotel/ ("${hotelName}" OR "${cleanName}") ${locationContext}`
      : `site:booking.com/hotel/ "${hotelName}" ${locationContext}`;

    const searchRes = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: queryStr,
        num: 8
      })
    });
    const searchData = await searchRes.json();
    const organicResults = searchData.organic || [];

    // Disambiguation: Find the result whose URL slug or title best matches the distinctive hotel tokens
    let bestMatch = null;
    let bestScore = -1;

    for (const item of organicResults) {
      if (!item.link || !item.link.includes('booking.com/hotel/')) continue;
      const urlSlug = item.link.split('booking.com/hotel/')[1] || '';
      const score = (scoreUrlOrTitleMatch(urlSlug, tokens) * 2) + scoreUrlOrTitleMatch(item.title, tokens);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = item;
      }
    }

    // Strict Disambiguation: ONLY select a Booking.com URL if it explicitly matches hotel name tokens
    const bookingUrl = (bestMatch && bestScore >= 10) ? bestMatch.link : null;

    if (bookingUrl && bookingUrl.includes('booking.com/hotel/')) {
      console.log(`[Master Vibe] Scraping live Booking.com gallery from resolved URL (Score: ${bestScore}): ${bookingUrl}`);
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

        if (photos.length >= 3) {
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
        console.warn('[Master Vibe] Headless browser scrape error:', browserErr.message);
      }
    } else {
      console.log(`[Master Vibe] Venue "${hotelName}" does not have a verified active room listing on Booking.com.`);
    }

    // Fallback: Google Serper Images API ONLY if we have tokens and images match
    if (tokens.length > 0) {
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
        const filtered = data.images.filter(img => {
          const combined = `${img.title || ''} ${img.link || ''} ${img.imageUrl || ''}`.toLowerCase();
          return tokens.some(t => combined.includes(t));
        });
        if (filtered.length >= 3) {
          return filtered.map((img, i) => ({
            slot: i + 1,
            title: img.title || `Booking.com Photo ${i + 1}`,
            imageUrl: img.imageUrl,
            sourceUrl: img.link
          }));
        }
      }
    }
  } catch (err) {
    console.warn('[Master Vibe] Error fetching booking images:', err.message);
  }
  return [];
}

// Dynamic Amenity Photo Fetcher: Strictly pulls ONLY from Official Hotel Website, TripAdvisor, and Official Social Posts
async function fetchAmenityPhotosForHotel(hotelName, city, neighborhood = '') {
  try {
    const locationContext = neighborhood && neighborhood.trim() ? `${neighborhood.trim()} ${city}` : city;
    const tokens = getDistinctiveTokens(hotelName);

    // 1. Dynamically resolve the official hotel website domain
    let officialDomain = '';
    try {
      const searchRes = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: `"${hotelName}" ${locationContext} official website`, num: 6 })
      });
      const searchData = await searchRes.json();
      for (const item of searchData.organic || []) {
        if (item.link && !item.link.includes('booking.com') && !item.link.includes('tripadvisor.com') && !item.link.includes('expedia.com') && !item.link.includes('hotels.com') && !item.link.includes('kayak.com') && !item.link.includes('wikipedia.org') && !item.link.includes('yelp.com')) {
          const match = item.link.match(/https?:\/\/(?:www\.)?([^\/]+)/);
          if (match) {
            officialDomain = match[1];
            break;
          }
        }
      }
    } catch (e) {
      console.warn('[Master Vibe] Domain resolution error:', e.message);
    }

    const domainFilter = officialDomain 
      ? `(site:${officialDomain} OR site:tripadvisor.com OR site:instagram.com OR site:facebook.com)`
      : `(site:tripadvisor.com OR site:instagram.com OR site:facebook.com)`;

    const exclusions = '-wedding -bride -groom -couple -dress -menu';
    
    // Concurrently fetch specific categories: Dining/Social, Spa/Wellness, Grand Lobby/Ballroom/Interior, Exterior Facade, Suite/Bedroom, and Bathroom
    const [resSocial, resSpa, resLobby, resExterior, resBedroom, resBath] = await Promise.all([
      fetch('https://google.serper.dev/images', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: `"${hotelName}" ${locationContext} (restaurant OR bar OR cocktail OR lounge OR dining OR "w xyz") ${domainFilter} ${exclusions} -exterior -building -outside -facade -aerial -pool -bedroom -bathroom -motel`, num: 12 }),
        signal: AbortSignal.timeout(3500)
      }).then(r => r.json()).catch(() => ({})),
      fetch('https://google.serper.dev/images', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: `"${hotelName}" ${locationContext} (spa OR "treatment room" OR wellness OR massage OR "vitality pool" OR sauna OR "agua spa" OR "agua bathhouse" OR "thermal suite") ${domainFilter} ${exclusions} -food -dish -eating -bedroom -bed -suite -cabin -meeting -event`, num: 12 }),
        signal: AbortSignal.timeout(3500)
      }).then(r => r.json()).catch(() => ({})),
      fetch('https://google.serper.dev/images', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: `"${hotelName}" ${locationContext} (lobby OR "grand lobby" OR reception OR ballroom OR "drawing room" OR lounge OR interior) ${domainFilter} ${exclusions}`, num: 12 }),
        signal: AbortSignal.timeout(3500)
      }).then(r => r.json()).catch(() => ({})),
      fetch('https://google.serper.dev/images', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: `"${hotelName}" ${locationContext} (facade OR exterior OR "art deco facade" OR entrance OR "building exterior" OR "street view" OR architecture) ${domainFilter} ${exclusions} -pool -swimming -bedroom -bathroom -food -dish`, num: 12 }),
        signal: AbortSignal.timeout(3500)
      }).then(r => r.json()).catch(() => ({})),
      fetch('https://google.serper.dev/images', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: `"${hotelName}" ${locationContext} ("king suite" OR "oceanfront suite" OR "ocean view" OR "bedroom interior" OR "guest room") ${domainFilter} ${exclusions} -pool -exterior -bathroom`, num: 12 }),
        signal: AbortSignal.timeout(3500)
      }).then(r => r.json()).catch(() => ({})),
      fetch('https://google.serper.dev/images', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: `"${hotelName}" ${locationContext} (bathroom OR "freestanding bath" OR "soaking tub" OR "marble bathroom" OR "rain shower" OR vanity OR "walk-in shower") ${domainFilter} ${exclusions}`, num: 12 }),
        signal: AbortSignal.timeout(3500)
      }).then(r => r.json()).catch(() => ({})),
    ]);

    const isLowQualityDomain = (url = '', title = '') => {
      const u = (url || '').toLowerCase();
      const t = (title || '').toLowerCase();
      const isWeddingOrBlog = t.includes('wedding') || t.includes('bride') || t.includes('groom') || t.includes('dress') || t.includes('couple') || t.includes('timeout') || t.includes('linkedin') || t.includes('pinterest') || u.includes('wedding');
      return isWeddingOrBlog;
    };

    const isExteriorLike = (title = '', url = '') => {
      const s = `${title} ${url}`.toLowerCase();
      return s.includes('exterior') || s.includes('facade') || s.includes('façade') || s.includes('building') || s.includes('outside') || s.includes('aerial') || s.includes('marina view') || s.includes('view of hotel') || s.includes('entrance') || s.includes('architecture') || s.includes('street view') || s.endsWith('aloft-miami-brickell.jpg');
    };

    const isPoolLike = (title = '', url = '') => {
      const s = `${title} ${url}`.toLowerCase();
      return s.includes('pool') || s.includes('swimming') || s.includes('sunbed') || s.includes('lounger');
    };

    const isRoomLike = (title = '', url = '') => {
      const s = `${title} ${url}`.toLowerCase();
      return s.includes('bedroom') || s.includes('suite') || s.includes('cabin') || s.includes('bed') || s.includes('couch') || s.includes('living room') || s.includes('guest room') || s.includes('meeting') || s.includes('event');
    };

    // Filter out photos belonging to rival venues in the same neighborhood or low-quality social scrapers
    const isValidAmenityPhoto = (img) => {
      if (!img || !img.imageUrl) return false;
      if (isLowQualityDomain(img.imageUrl, img.title)) return false;
      if (isExteriorLike(img.title, img.imageUrl)) return false;
      if (isPoolLike(img.title, img.imageUrl)) return false;
      
      const titleLower = (img.title || '').toLowerCase();
      const linkLower = (img.link || '').toLowerCase();
      const urlLower = (img.imageUrl || '').toLowerCase();
      const combined = `${titleLower} ${linkLower} ${urlLower}`;
      
      if (tokens.length > 0) {
        const matchesTargetToken = tokens.some(t => combined.includes(t)) || (officialDomain && combined.includes(officialDomain));
        // Strict TripAdvisor & Social verification: If from TripAdvisor or Social, it MUST match the hotel token or domain
        if ((linkLower.includes('tripadvisor.com') || linkLower.includes('instagram.com') || linkLower.includes('facebook.com')) && !matchesTargetToken) {
          return false;
        }
        // If image title/link refers to another venue type but lacks target hotel token, reject
        const mentionsGenericVenue = titleLower.includes(' pub') || titleLower.includes(' hotel') || titleLower.includes(' inn') || titleLower.includes(' tavern') || titleLower.includes(' brasserie');
        if (mentionsGenericVenue && !matchesTargetToken) {
          return false;
        }
      }
      return true;
    };

    const isValidSpaPhoto = (img) => {
      if (!isValidAmenityPhoto(img)) return false;
      const s = `${img.title || ''} ${img.imageUrl || ''} ${img.link || ''}`.toLowerCase();
      if (isRoomLike(img.title, img.imageUrl) || isRoomLike(img.link, '') || s.includes('social-space') || s.includes('party-venue') || s.includes('meeting') || s.includes('event')) {
        return false;
      }
      return true;
    };

    const isValidExteriorPhoto = (img) => {
      if (!img || !img.imageUrl) return false;
      if (isLowQualityDomain(img.imageUrl, img.title)) return false;
      if (isPoolLike(img.title, img.imageUrl)) return false;
      const titleLower = (img.title || '').toLowerCase();
      const linkLower = (img.link || '').toLowerCase();
      const urlLower = (img.imageUrl || '').toLowerCase();
      const combined = `${titleLower} ${linkLower} ${urlLower}`;
      if (tokens.length > 0) {
        const matchesTargetToken = tokens.some(t => combined.includes(t));
        const mentionsUnrelated = titleLower.includes('ballet') || titleLower.includes('museum') || titleLower.includes('convention') || titleLower.includes('theatre') || urlLower.includes('ballet') || urlLower.includes('museum');
        if (!matchesTargetToken || mentionsUnrelated) return false;
      }
      return true;
    };

    const scoreSource = (img) => {
      const u = (img.imageUrl || '').toLowerCase();
      const l = (img.link || '').toLowerCase();
      if (officialDomain && (u.includes(officialDomain) || l.includes(officialDomain) || u.includes('tambourine.com') || u.includes('symphony.cdn'))) return 100;
      if (u.includes('tripadvisor.com') || l.includes('tripadvisor.com') || u.includes('media-cdn.tripadvisor.com')) return 80;
      if (u.includes('instagram.com') || l.includes('instagram.com') || u.includes('facebook.com') || l.includes('facebook.com')) return 60;
      return 40;
    };

    const sortBySource = (arr) => [...arr].sort((a, b) => scoreSource(b) - scoreSource(a));

    const validSocial = sortBySource((resSocial.images || []).filter(isValidAmenityPhoto))
      .map(img => ({ ...img, detectedCategory: 'SOCIAL', sourceAuthority: scoreSource(img) }));

    const validSpa = sortBySource((resSpa.images || []).filter(isValidSpaPhoto))
      .map(img => ({ ...img, detectedCategory: 'SPA', sourceAuthority: scoreSource(img) }));

    const validLobby = sortBySource((resLobby.images || []).filter(isValidAmenityPhoto))
      .map(img => ({ ...img, detectedCategory: 'LOBBY', sourceAuthority: scoreSource(img) }));

    const validExterior = sortBySource((resExterior.images || []).filter(isValidExteriorPhoto))
      .map(img => ({ ...img, detectedCategory: 'EXTERIOR', sourceAuthority: scoreSource(img) }));

    const validBedroom = sortBySource((resBedroom.images || []).filter(isValidAmenityPhoto))
      .map(img => ({ ...img, detectedCategory: 'BEDROOM', sourceAuthority: scoreSource(img) }));

    const validBath = sortBySource((resBath.images || []).filter(isValidAmenityPhoto))
      .map(img => ({ ...img, detectedCategory: 'BATHROOM', sourceAuthority: scoreSource(img) }));

    const combined = [...validSocial, ...validSpa, ...validLobby, ...validExterior, ...validBedroom, ...validBath];

    return combined.map(img => ({
      title: img.title || '',
      imageUrl: upgradePhotoResolution(img.imageUrl),
      sourceUrl: img.link,
      detectedCategory: img.detectedCategory,
      sourceAuthority: img.sourceAuthority
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
  if (cat === 'SOCIAL_FB_ROOFTOP' || text.includes('restaurant') || text.includes('dining') || text.includes('brasserie') || text.includes('bar') || text.includes('cocktail') || text.includes('bistro') || text.includes('lounge') || text.includes('culinary') || text.includes('grill') || text.includes('w xyz')) {
    const isPositiveBarDining = (p) => {
      const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
      if (isExterior(p) || s.includes('exterior') || s.includes('pool') || s.includes('swimming') || s.endsWith('aloft-miami-brickell.jpg')) return false;
      return s.includes('bar') || s.includes('cocktail') || s.includes('lounge') || s.includes('restaurant') || s.includes('dining') || s.includes('sushi') || s.includes('food') || s.includes('drink') || s.includes('grill') || s.includes('bistro') || s.includes('wine') || s.includes('beer') || s.includes('wxyz') || s.includes('table') || s.includes('seating') || s.includes('mixology');
    };

    // Check live booking photos first for authentic restaurant/bar shots
    const liveMatch = findMatch(poolLive, isPositiveBarDining);
    if (liveMatch) return liveMatch;

    // Check amenity photos (strictly positive dining/bar cues)
    const amenityMatch = findMatch(poolAmenity, isPositiveBarDining);
    if (amenityMatch) return amenityMatch;
  }

  // 2. Spa / Wellness OR Grand Lobby / Ballroom / Historic Public Space
  if (cat === 'WELLNESS_SPA_LOBBY' || (cat === 'HERO_CULTURAL_MAGNET' && (text.includes('spa') || text.includes('pool') || text.includes('thermal') || text.includes('wellness') || text.includes('lobby') || text.includes('ballroom'))) || text.includes('spa') || text.includes('wellness') || text.includes('pool') || text.includes('treatment') || text.includes('sauna') || text.includes('bathhouse') || text.includes('lobby') || text.includes('ballroom') || text.includes('drawing room') || text.includes('reception') || text.includes('grand hall') || text.includes('palm court')) {
    // Check if specifically looking for lobby/ballroom/public space
    const isLobbySearch = text.includes('lobby') || text.includes('ballroom') || text.includes('drawing') || text.includes('reception') || text.includes('hall') || text.includes('palm court') || text.includes('public space');

    if (isLobbySearch) {
      const liveLobby = findMatch(poolLive, p => {
        if (isExterior(p)) return false;
        const t = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
        if (t.includes('pool') || t.includes('swimming')) return false;
        return t.includes('lobby') || t.includes('reception') || t.includes('ballroom') || t.includes('hall') || t.includes('lounge') || t.includes('drawing') || t.includes('interior');
      });
      if (liveLobby) return liveLobby;

      const amenityLobby = findMatch(poolAmenity, p => {
        if (isExterior(p)) return false;
        const t = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
        if (t.includes('pool') || t.includes('swimming')) return false;
        return p.detectedCategory === 'LOBBY' || p.detectedCategory === 'SOCIAL' || t.includes('lobby') || t.includes('reception') || t.includes('ballroom') || t.includes('drawing') || t.includes('hall') || t.includes('lounge');
      });
      if (amenityLobby) return amenityLobby;
    }

    const isRoomLike = (p) => {
      const s = `${p.title || ''} ${p.imageUrl || ''} ${p.sourceUrl || ''}`.toLowerCase();
      return s.includes('bedroom') || s.includes('suite') || s.includes('cabin') || s.includes('room') || s.includes('bed') || s.includes('couch') || s.includes('living') || s.includes('meeting') || s.includes('event') || s.includes('social-space') || s.includes('hero-shot-6');
    };

    // Check live booking photos for spa / wellness
    const liveMatch = findMatch(poolLive, p => {
      if (isExterior(p) || isRoomLike(p)) return false;
      const t = (p.title || '').toLowerCase();
      const u = (p.imageUrl || '').toLowerCase();
      return t.includes('spa') || t.includes('wellness') || t.includes('treatment') || t.includes('sauna') || t.includes('massage') || u.includes('spa') || u.includes('sauna');
    });
    if (liveMatch) return liveMatch;

    // Check amenity photos for spa or lobby (strictly non-bedroom)
    const amenityMatch = findMatch(poolAmenity, p => {
      if (isExterior(p) || isRoomLike(p)) return false;
      const t = (p.title || '').toLowerCase();
      return p.detectedCategory === 'SPA' || t.includes('spa') || t.includes('wellness') || t.includes('treatment') || t.includes('sauna') || t.includes('massage') || t.includes('agua') || t.includes('bathhouse');
    });
    if (amenityMatch) return amenityMatch;
  }

  // 3. Design Bathroom Category (Slot 5 / Bathroom)
  if (cat === 'SECONDARY_ROOM_BATHROOM' || text.includes('bathroom') || text.includes('bath') || text.includes('tub') || text.includes('shower') || text.includes('washroom')) {
    const liveMatch = findMatch(poolLive, p => {
      if (isExterior(p)) return false;
      const t = (p.title || '').toLowerCase();
      const u = (p.imageUrl || '').toLowerCase();
      return t.includes('bathroom') || t.includes('bath') || t.includes('tub') || t.includes('shower') || t.includes('washroom') || u.includes('bath') || u.includes('shower');
    });
    if (liveMatch) return liveMatch;

    const amenityMatch = findMatch(poolAmenity, p => {
      if (isExterior(p)) return false;
      const t = (p.title || '').toLowerCase();
      return p.detectedCategory === 'BATHROOM' || t.includes('bathroom') || t.includes('bath') || t.includes('tub') || t.includes('shower');
    });
    if (amenityMatch) return amenityMatch;
  }

  // 4. Exterior / Facade / Building Landmark (STRICTLY NON-POOL, NON-BEDROOM)
  if (cat === 'EXTERIOR_LANDMARK' || text.includes('facade') || text.includes('façade') || text.includes('exterior') || text.includes('entrance') || text.includes('landmark facade')) {
    const isPool = (p) => {
      const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
      return s.includes('pool') || s.includes('swimming') || s.includes('sunbed') || s.includes('lounger');
    };
    const isRoomOrBath = (p) => {
      const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
      return s.includes('bedroom') || s.includes('suite') || s.includes('bathroom') || s.includes('shower') || s.includes('bath') || (s.includes('bed') && !s.includes('sunbed'));
    };

    // Priority 1: Amenity photos with explicit EXTERIOR category
    const amenityExterior = findMatch(poolAmenity, p => {
      if (isPool(p) || isRoomOrBath(p)) return false;
      const t = (p.title || '').toLowerCase();
      return p.detectedCategory === 'EXTERIOR' || t.includes('facade') || t.includes('façade') || t.includes('exterior') || t.includes('street view') || t.includes('entrance');
    });
    if (amenityExterior) return amenityExterior;

    // Priority 2: Live booking photos with explicit exterior metadata (strictly non-pool)
    const liveMatch = findMatch(poolLive, p => {
      if (isPool(p) || isRoomOrBath(p)) return false;
      const t = (p.title || '').toLowerCase();
      const u = (p.imageUrl || '').toLowerCase();
      return t.includes('exterior') || t.includes('facade') || t.includes('façade') || t.includes('building') || t.includes('outside') || t.includes('entrance') || u.includes('exterior') || u.includes('facade');
    });
    if (liveMatch) return liveMatch;

    // Priority 3: Fallback amenity photos that are non-pool and non-bedroom
    const amenityMatch = findMatch(poolAmenity, p => {
      if (isPool(p) || isRoomOrBath(p)) return false;
      const t = (p.title || '').toLowerCase();
      return p.detectedCategory === 'EXTERIOR' || t.includes('exterior') || t.includes('facade') || t.includes('building') || t.includes('hotel');
    });
    if (amenityMatch) return amenityMatch;

    // Priority 4: Search any amenity photo that is non-pool and non-room
    for (const p of poolAmenity) {
      if (p?.imageUrl && !setUsed.has(p.imageUrl) && !isPool(p) && !isRoomOrBath(p)) {
        setUsed.add(p.imageUrl);
        return p.imageUrl;
      }
    }
  }

  // 5. Signature Suite / Bedroom
  if (cat === 'SIGNATURE_SUITE_BEDROOM' || text.includes('bedroom') || text.includes('bed') || text.includes('suite') || text.includes('room')) {
    const isPool = (p) => {
      const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
      return s.includes('pool') || s.includes('swimming') || s.includes('sunbed') || s.includes('lounger');
    };
    const isBath = (p) => {
      const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
      return s.includes('bathroom') || s.includes('shower') || s.includes('bath') || s.includes('tub');
    };

    // Priority 1: Live booking photos with authentic bedroom/suite title (strictly non-pool, non-bath)
    const liveMatch = findMatch(poolLive, p => {
      if (isExterior(p) || isPool(p) || isBath(p)) return false;
      const t = (p.title || '').toLowerCase();
      return t.includes('suite') || t.includes('bedroom') || t.includes('bed') || (t.includes('room') && !t.includes('living room'));
    });
    if (liveMatch) return liveMatch;

    // Priority 2: Amenity bedroom photos
    const amenityMatch = findMatch(poolAmenity, p => {
      if (isExterior(p) || isPool(p) || isBath(p)) return false;
      const t = (p.title || '').toLowerCase();
      return p.detectedCategory === 'BEDROOM' || t.includes('suite') || t.includes('bedroom') || t.includes('bed') || t.includes('king');
    });
    if (amenityMatch) return amenityMatch;
  }

  // 6. Strict Non-Exterior Fallback for indoor amenity slots
  const isIndoorSlot = cat !== 'EXTERIOR_LANDMARK' && !text.includes('exterior') && !text.includes('facade') && !text.includes('building');
  const allPool = [...poolLive, ...poolAmenity];

  if (isIndoorSlot) {
    for (const p of allPool) {
      if (p?.imageUrl && !setUsed.has(p.imageUrl) && !isExterior(p)) {
        setUsed.add(p.imageUrl);
        return p.imageUrl;
      }
    }
  }

  // General unused fallback (strictly ensuring no duplicate image URLs)
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
    let hotelName = req.body.hotelName || req.query.hotelName || req.body.propertyName || req.query.propertyName || 'The Plymouth Hotel';
    let city = req.body.city || req.query.city || req.body.location || req.query.location || 'Miami';
    let neighborhood = (req.body.neighborhood !== undefined) ? req.body.neighborhood : (req.query.neighborhood || '');

    if (city.toLowerCase().includes('south beach') && !neighborhood) {
      neighborhood = 'South Beach';
      city = city.replace(/south beach/i, '').replace(/,/g, '').trim() || 'Miami';
    }

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
      const isListedOnBooking = liveBookingPhotos && liveBookingPhotos.length >= 3;
      auditResult.ota_conversion_audit.live_photos = liveBookingPhotos;
      auditResult.ota_conversion_audit.is_listed_on_booking = isListedOnBooking;
      auditResult.ota_conversion_audit.listing_status = isListedOnBooking ? 'ACTIVE_ON_BOOKING' : 'NOT_LISTED_ON_BOOKING';
      
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
            const candObj = amenityPhotos[item.source_index - 1];
            const candidate = candObj.imageUrl;
            const candTitle = (candObj.title || '').toLowerCase();
            const isSlotPool = item.category === 'HERO_CULTURAL_MAGNET' && (item.photo_subject || '').toLowerCase().includes('pool');
            const candidateIsPool = candTitle.includes('pool') || candidate.toLowerCase().includes('pool');
            const isSlotExterior = item.category === 'EXTERIOR_LANDMARK';
            const candidateIsExterior = candObj.detectedCategory === 'EXTERIOR';

            // Validate that we do not put pool into exterior/lobby or exterior into pool
            const isValid = (isSlotPool && candidateIsPool) || (isSlotExterior && candidateIsExterior && !candidateIsPool) || (!isSlotExterior && !isSlotPool && !candidateIsPool);

            if (isValid && !usedUrls.has(candidate)) {
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

          if (!isListedOnBooking) {
            action = targetSlot === 1 ? 'HERO_CULTURAL_MAGNET' : 'CURATED_ASSET';
            actionLabel = targetSlot === 1 
              ? `⚡ HERO CULTURAL MAGNET: ${item.photo_subject || 'SIGNATURE ASSET'} (SLOT #1)`
              : `PRE-LISTING ASSET: ${item.photo_subject || 'SIGNATURE ASSET'} (SLOT #${targetSlot})`;
          } else if (item.category === 'HERO_CULTURAL_MAGNET' || item.action === 'HERO_CULTURAL_MAGNET' || item.action === 'MAGNET_OVERRIDE') {
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
            photo_url: upgradePhotoResolution(photoUrl),
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
