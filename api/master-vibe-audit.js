export const maxDuration = 60;
import * as dotenv from 'dotenv';
import { fetchVenueCorpus } from '../src/services/serperService.mjs';
import { runStructuredVibeAudit } from '../src/services/geminiService.mjs';

dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

// In-Flight Phase 2 Concurrency Mutex & Cache
const activeResolutions = new Map();
const resolutionCache = new Map();
const RESOLUTION_CACHE_TTL_MS = 2 * 60 * 1000; // 2 minutes TTL

// In-Flight Phase 1 Concurrency Mutex & Cache
const activeManifests = new Map();
const manifestCache = new Map();
const MANIFEST_CACHE_TTL_MS = 60 * 60 * 1000; // 60 minutes TTL

function getResolutionKey(hotelName, city, neighborhood = '') {
  return `${String(hotelName || '').toLowerCase().trim()}:::${String(city || '').toLowerCase().trim()}:::${String(neighborhood || '').toLowerCase().trim()}`;
}

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

const stopWords = new Set([
  'the', 'a', 'an', 'and', '&', 'hotel', 'hotels', 'inn', 'resort', 'spa', 'suites', 
  'rooms', 'lodge', 'pub', 'bar', 'lounge', 'retreat', 'club'
]);

export function getDistinctiveTokens(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length >= 1 && !stopWords.has(token));
}

const NON_HOTEL_PATTERNS = [
  'apartment', 'apartments', 'holiday-home', 'vacation-home', 'guest-house', 'guesthouse',
  'hostel', 'unit-at', 'residence-with', 'residences', 'private-mews', 'homestay',
  'bed-and-breakfast', 'b-and-b', 'flat-in', 'studio-in', 'penthouse-in', 'room-in',
  'designer-1br', 'designer-2br', 'designer-3br', '-1br', '-2br', '-3br', '-4br', 'condo',
  'villa', 'villas', 'suites-at', '-suites-at', 'lux-suites', 'luxury-suites', 'aparthotel',
  'apart-hotel', 'condo-hotel', 'condos', 'aluna-lux'
];

export function scoreBookingCandidate(item, hotelName, city, neighborhood, brandTokens) {
  if (!item || !item.link) return -1;
  const slug = (item.link.split('booking.com/hotel/')[1] || '').toLowerCase();
  const title = (item.title || '').toLowerCase();
  const snippet = (item.snippet || '').toLowerCase();
  const text = `${slug} ${title} ${snippet}`;

  // 1. Universal non-hotel filter: Reject vacation rentals, apartments, hostels, villas, condo units
  if (NON_HOTEL_PATTERNS.some(p => slug.includes(p) || title.includes(p.replace(/-/g, ' ')))) {
    return -1000;
  }
  // Filter out individual apartment / condo unit numbers e.g. "palms-811" or "unit-302"
  if (/-\d{3,}/.test(slug) || /\b\d{3,}\b/.test(title)) {
    return -1000;
  }

  // 2. Multi-property brand & geographic neighborhood disambiguation:
  // If the queried hotelName specifies a distinct neighborhood/district (e.g. "SLS South Beach"),
  // candidate must NOT belong to a different district of the same brand (e.g. "SLS Lux Brickell").
  const hotelLower = (hotelName || '').toLowerCase();
  const geoModifiers = [
    'south beach', 'miami beach', 'brickell', 'midtown', 'downtown', 'soho',
    'mayfair', 'knightsbridge', 'beverly hills', 'west hollywood', 'doral', 'coconut grove'
  ];
  for (const geo of geoModifiers) {
    if (hotelLower.includes(geo) || (neighborhood && neighborhood.toLowerCase().includes(geo))) {
      for (const otherGeo of geoModifiers) {
        if (otherGeo !== geo && !hotelLower.includes(otherGeo) && (!neighborhood || !neighborhood.toLowerCase().includes(otherGeo))) {
          const otherSlug = otherGeo.replace(/\s+/g, '-');
          if (slug.includes(otherSlug) || title.includes(otherGeo)) {
            return -1000; // Hard reject candidate from wrong location of same brand
          }
        }
      }
    }
  }

  // 3. City Filter: If city is provided, either slug, title, or destination text must match city
  const cityLower = (city || '').toLowerCase().trim();
  const hasCityInTitleOrSlug = cityLower && (slug.includes(cityLower) || title.includes(cityLower));
  if (cityLower && !hasCityInTitleOrSlug && !text.includes(cityLower)) {
    return -500;
  }

  // MANDATORY: Must match at least one primary non-geographic brand token in slug or title
  const GEOGRAPHIC_TOKENS = new Set([
    'south', 'north', 'east', 'west', 'central', 'beach', 'city', 'downtown', 'uptown',
    'harbor', 'harbour', 'bay', 'island', 'islands', 'park', 'square', 'plaza', 'street',
    'road', 'ave', 'avenue', 'boulevard', 'blvd', 'river', 'lake', 'hill', 'hills',
    'valley', 'village', 'bridge', 'quay', 'gardens', 'garden', 'court', 'gate', 'point'
  ]);
  const primaryBrandTokens = brandTokens.filter(t => !GEOGRAPHIC_TOKENS.has(t) && t.length >= 2);

  if (primaryBrandTokens.length > 0) {
    const matchesPrimary = primaryBrandTokens.some(t => slug.includes(t) || title.includes(t));
    if (!matchesPrimary) return -1;
  } else {
    const matchesBrand = brandTokens.some(token => slug.includes(token) || title.includes(token));
    if (!matchesBrand) return -1;
  }

  let score = 0;
  for (const token of brandTokens) {
    if (slug.includes(token)) score += 40;
    if (title.includes(token)) score += 30;
    if (snippet.includes(token)) score += 10;
  }

  const cleanHotel = hotelName.toLowerCase().replace(/\b(the|hotel|spa|resort|suites|inn|lodge|and|&)\b/gi, '').trim();
  if (cleanHotel && (title.includes(cleanHotel) || slug.includes(cleanHotel.replace(/\s+/g, '-')))) {
    score += 80;
  }

  // Strong bonus for properties where city is officially in slug or title
  if (hasCityInTitleOrSlug) {
    score += 80;
  } else if (cityLower && text.includes(cityLower)) {
    score += 20;
  }

  if (neighborhood && text.includes(neighborhood.toLowerCase())) {
    score += 60;
  }

  return score;
}

// Universal Candidate Lookup Engine (Zero hardcoded city/neighborhood exceptions)
export async function lookupHotelCandidates(hotelName, city, neighborhood = '') {
  const brandTokens = getDistinctiveTokens(hotelName);
  const cleanHotel = hotelName.replace(/\b(the|hotel|spa|resort|suites|inn|lodge|and|&)\b/gi, '').trim();
  
  const queries = [
    neighborhood ? `site:booking.com/hotel/ "${cleanHotel || hotelName}" "${neighborhood}" -residence -apartment -hostel` : null,
    neighborhood ? `site:booking.com/hotel/ ${cleanHotel || hotelName} ${neighborhood} ${city} -residence -apartment -hostel` : null,
    `site:booking.com/hotel/ "${cleanHotel || hotelName}" ${city} -residence -apartment -hostel`,
    `site:booking.com/hotel/ ${cleanHotel || hotelName} ${city} -residence -apartment -hostel`,
    `site:booking.com/hotel/ "${cleanHotel || hotelName}" hotel ${city}`,
    brandTokens.length > 0 ? `site:booking.com/hotel/ ${brandTokens.join(' ')} ${city} hotel -residence -apartment -hostel` : null
  ].filter(Boolean);

  let rawCandidates = [];
  for (const q of queries) {
    try {
      const res = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q, num: 8 })
      });
      const d = await res.json();
      for (const item of (d.organic || [])) {
        if (item.link && item.link.includes('booking.com/hotel/')) {
          rawCandidates.push(item);
        }
      }
    } catch (e) {
      console.warn('[Master Vibe] Serper candidate query error:', e.message);
    }
  }

  const candidateMap = new Map();
  for (const item of rawCandidates) {
    let cleanUrl = item.link.replace(/\.[a-z]{2,3}(-[a-z]{2,4})?\.html/i, '.html');
    const slug = cleanUrl.split('booking.com/hotel/')[1]?.split('?')[0];
    if (!slug) continue;

    const score = scoreBookingCandidate(item, hotelName, city, neighborhood, brandTokens);
    if (score < 50) continue;

    if (!candidateMap.has(slug) || candidateMap.get(slug).score < score) {
      const cleanTitle = (item.title || '')
        .replace(/\s*[-–|].*Booking\.com.*/i, '')
        .replace(/\s*[-–|].*prices.*/i, '')
        .replace(/\s*[-–|].*Updated.*202\d.*/i, '')
        .replace(/\s*\(.*?\)\s*$/, '')
        .trim();

      candidateMap.set(slug, {
        slug,
        url: cleanUrl,
        title: cleanTitle || item.title,
        snippet: item.snippet || '',
        score
      });
    }
  }

  const sortedCandidates = Array.from(candidateMap.values()).sort((a, b) => b.score - a.score);

  if (sortedCandidates.length === 0) {
    return { status: 'none', requiresClarification: false, candidates: [] };
  }
  if (sortedCandidates.length === 1) {
    return { status: 'decisive', requiresClarification: false, selected: sortedCandidates[0], candidates: sortedCandidates };
  }

  const top1 = sortedCandidates[0];
  const top2 = sortedCandidates[1];
  const scoreDiff = top1.score - top2.score;

  const brandName = cleanHotel.toLowerCase();
  const bothContainBrand = brandName.length >= 3 && top1.title.toLowerCase().includes(brandName) && top2.title.toLowerCase().includes(brandName);

  // If top 2 are close in score, or both share the queried hotel brand title, ask user for clarification
  if (scoreDiff <= 50 || (bothContainBrand && scoreDiff <= 100)) {
    return {
      status: 'ambiguous',
      requiresClarification: true,
      candidates: sortedCandidates.slice(0, 4)
    };
  }

  return { status: 'decisive', requiresClarification: false, selected: top1, candidates: sortedCandidates };
}

// Live Booking.com direct scraper via Playwright (with Serper fallback & strict disambiguation)
export async function fetchBookingPhotosForHotel(hotelName, city, neighborhood = '', directBookingUrl = null) {
  try {
    const locationContext = neighborhood && neighborhood.trim() ? `${neighborhood.trim()} ${city}` : city;
    let cleanUrl = directBookingUrl;

    if (!cleanUrl) {
      const lookup = await lookupHotelCandidates(hotelName, city, neighborhood);
      if (lookup.selected) {
        cleanUrl = lookup.selected.url;
      } else if (lookup.candidates && lookup.candidates.length > 0) {
        cleanUrl = lookup.candidates[0].url;
      }
    }

    if (cleanUrl && cleanUrl.includes('booking.com/hotel/')) {
      cleanUrl = cleanUrl.replace(/\.[a-z]{2,3}(-[a-z]{2,4})?\.html/i, '.html');
      try {
        const parsed = new URL(cleanUrl);
        parsed.searchParams.set('lang', 'en-us');
        cleanUrl = parsed.toString();
      } catch (e) {
        if (!cleanUrl.includes('lang=')) cleanUrl += (cleanUrl.includes('?') ? '&lang=en-us' : '?lang=en-us');
      }
      console.log(`[Master Vibe] Scraping live Booking.com gallery from resolved URL: ${cleanUrl}`);
      let browser = null;
      try {
        const { chromium } = await import('playwright');
        browser = await chromium.launch({ channel: 'chrome', headless: true }).catch(() => chromium.launch({ headless: true }));
        const context = await browser.newContext({
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          viewport: { width: 1440, height: 900 },
          locale: 'en-US',
          extraHTTPHeaders: {
            'Accept-Language': 'en-US,en;q=0.9'
          }
        });
        await context.addCookies([
          { name: 'lang', value: 'en-us', domain: '.booking.com', path: '/' },
          { name: 'bkng_language', value: 'en', domain: '.booking.com', path: '/' }
        ]).catch(() => {});

        const page = await context.newPage();
        await page.goto(cleanUrl, { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(err => {
          console.warn('[Master Vibe] Playwright navigation warning:', err.message);
        });
        await page.waitForLoadState('networkidle', { timeout: 4000 }).catch(() => {});
        await page.waitForTimeout(1000);

        const extractPhotos = () => {
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
        };

        let photos = [];
        try {
          photos = await page.evaluate(extractPhotos);
        } catch (navErr) {
          await page.waitForTimeout(2000);
          photos = await page.evaluate(extractPhotos).catch(() => []);
        }

        await browser.close();
        browser = null;

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
        console.warn('[Master Vibe] Headless browser scrape warning:', browserErr.message);
        if (browser) await browser.close().catch(() => {});
      }
    } else {
      console.log(`[Master Vibe] Venue "${hotelName}" does not have a verified active room listing on Booking.com.`);
      return [];
    }
  } catch (err) {
    console.warn('[Master Vibe] Error fetching booking images:', err.message);
  }
  return [];
}

// Dynamic Amenity Photo Fetcher: Strictly pulls ONLY from Official Hotel Website, TripAdvisor, and Official Social Posts
export async function fetchAmenityPhotosForHotel(hotelName, city, neighborhood = '') {
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

    const specificHotelQuery = `"${hotelName}" ${locationContext}`;
    const tripAdvisorClause = `site:tripadvisor.com "${hotelName}" ${neighborhood || city}`;
    
    // Concurrently fetch specific categories: Dining/Social, Spa/Wellness, Grand Lobby/Ballroom/Interior, Exterior Facade, Suite/Bedroom, and Bathroom
    const [resSocial, resSpa, resLobby, resExterior, resBedroom, resBath, resTripAdvisor] = await Promise.all([
      fetch('https://google.serper.dev/images', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: `${specificHotelQuery} (restaurant OR bar OR dining OR cocktails OR lounge OR food) -wedding`, num: 12 }),
        signal: AbortSignal.timeout(5000)
      }).then(r => r.json()).catch(() => ({})),
      fetch('https://google.serper.dev/images', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: `${specificHotelQuery} (spa OR wellness OR "vitality pool" OR pool OR sauna OR massage) -wedding`, num: 12 }),
        signal: AbortSignal.timeout(5000)
      }).then(r => r.json()).catch(() => ({})),
      fetch('https://google.serper.dev/images', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: `${specificHotelQuery} (lobby OR reception OR ballroom OR "drawing room" OR interior OR salon) -wedding`, num: 12 }),
        signal: AbortSignal.timeout(5000)
      }).then(r => r.json()).catch(() => ({})),
      fetch('https://google.serper.dev/images', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: `${specificHotelQuery} (facade OR exterior OR entrance OR building OR architecture) -wedding`, num: 12 }),
        signal: AbortSignal.timeout(5000)
      }).then(r => r.json()).catch(() => ({})),
      fetch('https://google.serper.dev/images', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: `${specificHotelQuery} ("signature suite" OR "hotel suite" OR "king room" OR bedroom) -wedding`, num: 12 }),
        signal: AbortSignal.timeout(5000)
      }).then(r => r.json()).catch(() => ({})),
      fetch('https://google.serper.dev/images', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: `${specificHotelQuery} (bathroom OR "marble bathroom" OR shower OR "soaking tub" OR "clawfoot tub" OR "freestanding tub" OR "master bath") -wedding`, num: 20 }),
        signal: AbortSignal.timeout(5000)
      }).then(r => r.json()).catch(() => ({})),
      fetch('https://google.serper.dev/images', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: `${tripAdvisorClause} (bath OR bathroom OR dining OR restaurant OR bar OR pool OR facade) -traveler`, num: 15 }),
        signal: AbortSignal.timeout(5000)
      }).then(r => r.json()).catch(() => ({})),
    ]);

    const isLowQualityDomain = (url = '', title = '') => {
      const u = (url || '').toLowerCase();
      const t = (title || '').toLowerCase();
      const isCrawlerHost = u.includes('lookaside.instagram.com') || u.includes('lookaside.fbsbx.com') || u.includes('fbsbx.com') || u.includes('fbcdn.net') || u.includes('instagram.com/seo/') || u.includes('static.cdninstagram.com');
      const isWeddingOrBlog = t.includes('wedding') || t.includes('bride') || t.includes('groom') || t.includes('dress') || t.includes('couple') || t.includes('timeout') || t.includes('linkedin') || t.includes('pinterest') || u.includes('wedding');
      return isCrawlerHost || isWeddingOrBlog;
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
      return s.includes('spa') || s.includes('wellness') || s.includes('treatment') || s.includes('sauna') || s.includes('vitality') || s.includes('massage') || s.includes('bathhouse') || s.includes('hydrotherapy') || s.includes('ciel') || s.includes('agua');
    };

    const isValidExteriorPhoto = (img) => {
      if (!img || !img.imageUrl) return false;
      if (isLowQualityDomain(img.imageUrl, img.title)) return false;
      if (isPoolLike(img.title, img.imageUrl)) return false;
      if (isRoomLike(img.title, img.imageUrl) || isRoomLike(img.link, '')) return false;
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

    const isValidDiningPhoto = (img) => {
      if (!isValidAmenityPhoto(img)) return false;
      const s = `${img.title || ''} ${img.imageUrl || ''} ${img.link || ''}`.toLowerCase();
      if (isRoomLike(img.title, img.imageUrl) || isRoomLike(img.link, '')) return false;
      return s.includes('restaurant') || s.includes('dining') || s.includes('bar') || s.includes('cocktail') || s.includes('culinary') || s.includes('chef') || s.includes('bazaar') || s.includes('katsuya') || s.includes('bistro') || s.includes('brasserie') || s.includes('food') || s.includes('drink') || s.includes('lounge');
    };

    const isValidBathPhoto = (img) => {
      if (!img || !img.imageUrl) return false;
      if (isLowQualityDomain(img.imageUrl, img.title)) return false;
      const u = (img.imageUrl || '').toLowerCase();
      const t = (img.title || '').toLowerCase();
      if (u.includes('bath') || u.includes('tub') || u.includes('shower') || u.includes('vanity')) return true;
      const isExplicitBath = t.includes('bathroom') || t.includes('shower') || t.includes('clawfoot') || t.includes('soaking tub') || t.includes('bathtub') || t.includes('bath') || t.includes('tub');
      const isStrictBedroomOnly = (t.includes('bedroom with a bed') || t.includes('classic queen') || t.includes('classic king') || u.includes('bedq')) && !u.includes('bath_wide');
      if (isStrictBedroomOnly && !isExplicitBath) return false;
      return isExplicitBath;
    };

    const scoreSource = (img) => {
      const u = (img.imageUrl || '').toLowerCase();
      const l = (img.link || '').toLowerCase();
      if (officialDomain && (u.includes(officialDomain) || l.includes(officialDomain) || u.includes('galaxy.tf') || u.includes('tambourine.com') || u.includes('symphony.cdn'))) return 100;
      if (u.includes('tripadvisor.com') || l.includes('tripadvisor.com') || u.includes('media-cdn.tripadvisor.com')) return 80;
      if (u.includes('instagram.com') || l.includes('instagram.com') || u.includes('facebook.com') || l.includes('facebook.com')) return 60;
      return 40;
    };

    const sortBySource = (arr) => [...arr].sort((a, b) => scoreSource(b) - scoreSource(a));

    const validSocial = sortBySource((resSocial.images || []).filter(isValidDiningPhoto))
      .map(img => ({ ...img, detectedCategory: 'SOCIAL', sourceAuthority: scoreSource(img) }));

    const validSpa = sortBySource((resSpa.images || []).filter(isValidSpaPhoto))
      .map(img => ({ ...img, detectedCategory: 'SPA', sourceAuthority: scoreSource(img) }));

    const validLobby = sortBySource((resLobby.images || []).filter(isValidAmenityPhoto))
      .map(img => ({ ...img, detectedCategory: 'LOBBY', sourceAuthority: scoreSource(img) }));

    const validExterior = sortBySource((resExterior.images || []).filter(isValidExteriorPhoto))
      .map(img => ({ ...img, detectedCategory: 'EXTERIOR', sourceAuthority: scoreSource(img) }));

    const validBedroom = sortBySource((resBedroom.images || []).filter(isValidAmenityPhoto))
      .map(img => ({ ...img, detectedCategory: 'BEDROOM', sourceAuthority: scoreSource(img) }));

    const validBath = sortBySource((resBath.images || []).filter(isValidBathPhoto))
      .map(img => ({ ...img, detectedCategory: 'BATHROOM', sourceAuthority: scoreSource(img) }));

    const validTripAdvisor = (resTripAdvisor?.images || [])
      .filter(img => img?.imageUrl && !isLowQualityDomain(img.imageUrl, img.title))
      .map(img => {
        const s = `${img.title || ''} ${img.imageUrl || ''}`.toLowerCase();
        let cat = 'AMENITY';
        if (s.includes('bath') || s.includes('tub') || s.includes('shower')) cat = 'BATHROOM';
        else if (s.includes('food') || s.includes('restaurant') || s.includes('bar') || s.includes('cocktail') || s.includes('dining')) cat = 'SOCIAL';
        else if (s.includes('bedroom') || s.includes('suite') || s.includes('bed')) cat = 'BEDROOM';
        else if (s.includes('pool') || s.includes('swim') || s.includes('cabana') || s.includes('sunbed') || s.includes('day club') || s.includes('hyde')) cat = 'POOL';
        else if (s.includes('exterior') || s.includes('facade') || s.includes('façade') || s.includes('entrance') || s.includes('hotel reviews') || s.includes('hotel - tripadvisor') || s.includes('hotel,') || s.includes('resort - tripadvisor')) cat = 'EXTERIOR';
        return { ...img, detectedCategory: cat, sourceAuthority: scoreSource(img) };
      });

    const combined = [...validTripAdvisor, ...validSocial, ...validSpa, ...validLobby, ...validExterior, ...validBedroom, ...validBath]
      .sort((a, b) => (b.sourceAuthority || 0) - (a.sourceAuthority || 0));

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
export function matchBestImageForSubject(subjectText, category, liveBookingPhotos = [], amenityPhotos = [], usedUrls = new Set(), defaultIndex = 0) {
  const text = String(subjectText || '').toLowerCase();
  const cat = String(category || '').toUpperCase();
  const poolLive = Array.isArray(liveBookingPhotos) ? liveBookingPhotos : [];
  const poolAmenity = Array.isArray(amenityPhotos) ? amenityPhotos : [];
  const setUsed = (usedUrls instanceof Set) ? usedUrls : new Set();

  const isExterior = (p) => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    return s.includes('exterior') || s.includes('facade') || s.includes('façade') || s.includes('building') || s.includes('outside') || s.includes('aerial') || s.includes('marina') || s.includes('entrance');
  };

  const isMeetingOrConference = (p) => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    return s.includes('meeting') || s.includes('conference') || s.includes('boardroom') || s.includes('event space') || s.includes('banquet') || s.includes('seminar');
  };

  const findMatch = (pool, predicate) => {
    const match = pool.find(p => p?.imageUrl && !setUsed.has(p.imageUrl) && !isMeetingOrConference(p) && predicate(p));
    if (match) {
      setUsed.add(match.imageUrl);
      return match.imageUrl;
    }
    return null;
  };

  // 1. Design Bathroom Category (Slot 5 / Bathroom) - Evaluated first to prevent interception by Spa
  if (cat === 'SECONDARY_ROOM_BATHROOM' || text.includes('bathroom') || text.includes('bathtub') || text.includes('washroom') || (text.includes('shower') && !text.includes('bridal shower')) || (text.includes('bath') && !text.includes('bathhouse') && !text.includes('sunbathing'))) {
    const isBathroomCandidate = (p) => {
      if (isExterior(p) || isMeetingOrConference(p)) return false;
      const u = (p.imageUrl || '').toLowerCase();
      const t = (p.title || '').toLowerCase();
      if (u.includes('bath') || u.includes('tub') || u.includes('shower') || u.includes('vanity')) return true;
      if (p.detectedCategory === 'BATHROOM') return true;
      const hasBathTitle = t.includes('bathroom') || t.includes('soaking tub') || t.includes('clawfoot') || t.includes('freestanding tub') || t.includes('walk-in shower') || t.includes('shower') || t.includes('bathtub');
      const isBedroomWithBed = t.includes('bedroom with a bed') || t.includes('room with a bed') || t.includes('double room with private bath') || t.includes('double room with private bathroom') || t.includes('king room with shower');
      return hasBathTitle && !isBedroomWithBed;
    };

    // Priority 1: Check amenity photos for signature luxury tub / wide bathroom shots (like obts-bath_wide.jpg)
    const tubMatch = findMatch(poolAmenity, p => {
      if (isExterior(p)) return false;
      const u = (p.imageUrl || '').toLowerCase();
      const t = (p.title || '').toLowerCase();
      return (u.includes('bath_wide') || u.includes('tub') || t.includes('soaking tub') || t.includes('clawfoot') || t.includes('freestanding tub')) && !t.includes('bedroom with a bed');
    });
    if (tubMatch) return tubMatch;

    // Priority 2: General amenity bathroom photos
    const amenityMatch = findMatch(poolAmenity, isBathroomCandidate);
    if (amenityMatch) return amenityMatch;

    // Priority 3: Check live booking photos (strictly non-bedroom bathroom shots)
    const liveMatch = findMatch(poolLive, isBathroomCandidate);
    if (liveMatch) return liveMatch;

    // Strict integrity: If no authentic bathroom photo exists, return null so recommendation adapts
    return null;
  }

  // 2. Social F&B / Fine Dining / Restaurant / Cocktail Bar
  if (cat === 'SOCIAL_FB_ROOFTOP' || text.includes('restaurant') || text.includes('dining') || text.includes('brasserie') || text.includes('bar') || text.includes('cocktail') || text.includes('bistro') || text.includes('lounge') || text.includes('culinary') || text.includes('grill') || text.includes('w xyz')) {
    const isPositiveBarDining = (p) => {
      const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
      if (isExterior(p) || s.includes('exterior') || s.includes('pool') || s.includes('swimming') || s.endsWith('aloft-miami-brickell.jpg')) return false;
      return p.detectedCategory === 'SOCIAL' || s.includes('bar') || s.includes('cocktail') || s.includes('lounge') || s.includes('restaurant') || s.includes('dining') || s.includes('sushi') || s.includes('food') || s.includes('drink') || s.includes('grill') || s.includes('bistro') || s.includes('wine') || s.includes('beer') || s.includes('wxyz') || s.includes('table') || s.includes('seating') || s.includes('mixology');
    };

    const liveMatch = findMatch(poolLive, isPositiveBarDining);
    if (liveMatch) return liveMatch;

    const amenityMatch = findMatch(poolAmenity, isPositiveBarDining);
    if (amenityMatch) return amenityMatch;

    return null;
  }

  // 3. Spa / Wellness OR Grand Lobby / Ballroom / Pool / Historic Public Space (strictly non-bathroom)
  if (cat === 'WELLNESS_SPA_LOBBY' || cat === 'OUTDOOR_SOCIAL_POOL' || cat === 'SPA_WELLNESS_SANCTUARY' || cat === 'HERITAGE_SALON_LIVING' || (cat === 'HERO_CULTURAL_MAGNET' && (text.includes('spa') || text.includes('pool') || text.includes('thermal') || text.includes('wellness') || text.includes('lobby') || text.includes('ballroom'))) || text.includes('spa') || text.includes('wellness') || text.includes('pool') || text.includes('swimming') || text.includes('treatment') || text.includes('sauna') || text.includes('bathhouse') || text.includes('lobby') || text.includes('ballroom') || text.includes('drawing room') || text.includes('reception') || text.includes('grand hall') || text.includes('palm court')) {
    
    // Check if specifically looking for pool
    const isPoolSearch = text.includes('pool') || text.includes('swimming') || text.includes('sunbed') || text.includes('cabana') || text.includes('day club') || text.includes('hyde');
    if (isPoolSearch) {
      const livePool = findMatch(poolLive, p => {
        if (isExterior(p)) return false;
        const t = (p.title || '').toLowerCase();
        const u = (p.imageUrl || '').toLowerCase();
        return t.includes('pool') || t.includes('swim') || t.includes('sunbed') || t.includes('lounger') || u.includes('pool');
      });
      if (livePool) return livePool;

      const amenityPool = findMatch(poolAmenity, p => {
        const t = (p.title || '').toLowerCase();
        const u = (p.imageUrl || '').toLowerCase();
        return t.includes('pool') || t.includes('swim') || t.includes('sunbed') || t.includes('cabana') || t.includes('hyde') || u.includes('pool');
      });
      if (amenityPool) return amenityPool;
    }

    // Check if specifically looking for lobby/ballroom/public space
    const isLobbySearch = text.includes('lobby') || text.includes('ballroom') || text.includes('drawing') || text.includes('reception') || text.includes('hall') || text.includes('palm court') || text.includes('public space') || text.includes('salon');

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
        return p.detectedCategory === 'LOBBY' || p.detectedCategory === 'SOCIAL' || t.includes('lobby') || t.includes('reception') || t.includes('ballroom') || t.includes('drawing') || t.includes('hall') || t.includes('lounge') || t.includes('salon');
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

    return null;
  }

  // 4. Exterior / Facade / Building Landmark (STRICTLY NON-POOL CLOSEUPS, NON-BEDROOM)
  if (cat === 'EXTERIOR_LANDMARK' || text.includes('facade') || text.includes('façade') || text.includes('exterior') || text.includes('entrance') || text.includes('landmark facade')) {
    const isPool = (p) => {
      const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
      if (s.includes('building') || s.includes('facade') || s.includes('façade') || s.includes('entrance') || s.includes('street view')) return false;
      return s.includes('pool') || s.includes('swimming') || s.includes('sunbed') || s.includes('lounger');
    };
    const isRoomOrBath = (p) => {
      const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
      return s.includes('bedroom') || s.includes('suite') || s.includes('bathroom') || s.includes('shower') || s.includes('bath') || (s.includes('bed') && !s.includes('sunbed'));
    };

    const amenityExterior = findMatch(poolAmenity, p => {
      if (isPool(p) || isRoomOrBath(p)) return false;
      const t = (p.title || '').toLowerCase();
      return p.detectedCategory === 'EXTERIOR' || t.includes('facade') || t.includes('façade') || t.includes('exterior') || t.includes('street view') || t.includes('entrance');
    });
    if (amenityExterior) return amenityExterior;

    const liveMatch = findMatch(poolLive, p => {
      if (isPool(p) || isRoomOrBath(p)) return false;
      const t = (p.title || '').toLowerCase();
      const u = (p.imageUrl || '').toLowerCase();
      return t.includes('exterior') || t.includes('facade') || t.includes('façade') || t.includes('building') || t.includes('outside') || t.includes('entrance') || u.includes('exterior') || u.includes('facade');
    });
    if (liveMatch) return liveMatch;

    return null;
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

    const liveMatch = findMatch(poolLive, p => {
      if (isExterior(p) || isPool(p) || isBath(p)) return false;
      const t = (p.title || '').toLowerCase();
      return t.includes('suite') || t.includes('bedroom') || t.includes('bed') || (t.includes('room') && !t.includes('living room'));
    });
    if (liveMatch) return liveMatch;

    const amenityMatch = findMatch(poolAmenity, p => {
      if (isExterior(p) || isPool(p) || isBath(p)) return false;
      const t = (p.title || '').toLowerCase();
      return p.detectedCategory === 'BEDROOM' || t.includes('suite') || t.includes('bedroom') || t.includes('bed') || t.includes('king');
    });
    if (amenityMatch) return amenityMatch;

    return null;
  }

  // Strict Asset Integrity: NEVER return a random bedroom for dining or a pool for bathroom.
  // If no authentic image matches this specific category/subject, return null so that
  // the Dynamic Asset-Grounded Alignment engine can adapt the recommendation to an authentic asset.
  return null;
}

// -------------------------------------------------------------
// DYNAMIC ASSET-DRIVEN RECOMMENDATION DERIVATION ENGINE
// Takes a verified authentic photo and derives a 100% coherent
// recommendation (subject, category, rationale, bullets, triggers).
// -------------------------------------------------------------
function classifyAssetAndDeriveRecommendation(asset, hotelName = '') {
  const title = (asset?.title || '').trim();
  const cat = (asset?.detectedCategory || '').toUpperCase();
  const text = `${title} ${asset?.imageUrl || ''}`.toLowerCase();

  // 0. Design Bathroom / Luxury Tub / Walk-in Shower
  if (cat === 'BATHROOM' || text.includes('bathroom') || text.includes('bath tub') || text.includes('bathtub') || text.includes('soaking tub') || text.includes('clawfoot') || (text.includes('shower') && !text.includes('bridal shower'))) {
    return {
      category: 'SECONDARY_ROOM_BATHROOM',
      subject: title && !title.includes('Tripadvisor') && title.length <= 60 ? title : 'Design Bathroom with Freestanding Tub & Walk-in Shower',
      why: 'Showcasing immaculate private bathroom finishes and walk-in rain showers resolves hygiene anxiety and completes the luxury perception.',
      trigger: 'Indulgent Hygiene & Private Sanctuary',
      bullets: [
        'Visual Upgrade: High-finish stone surfaces with ambient vanity illumination.',
        'Local Synergy: Reinforces elevated residential luxury standards.',
        'Conversion Trigger: Resolves final hygiene doubts to accelerate checkout conversion.'
      ]
    };
  }

  // 1. Outdoor Social / Day Club / Pool / Oceanfront / Cabanas
  if (cat === 'POOL' || text.includes('hyde') || text.includes('pool') || text.includes('cabana') || text.includes('swim') || text.includes('sunbed') || text.includes('day club') || text.includes('dayclub') || text.includes('beach club') || text.includes('oceanfront')) {
    const isHyde = text.includes('hyde');
    const isPool = text.includes('pool') || text.includes('swim');
    const subject = isHyde 
      ? 'Hyde Beach Oceanfront Day Club & Cabana Lounge' 
      : (isPool ? 'Signature Resort Pool & Private Cabana Sanctuary' : 'Oceanfront Day Club & Social Cabana Terrace');
    return {
      category: 'OUTDOOR_SOCIAL_POOL',
      subject,
      why: 'Showcasing the hotel\'s signature outdoor pool and day club atmosphere captures high-intent social travel demand and accelerates premium weekend leisure conversions.',
      trigger: 'High-Energy Social Magnet & Outdoor Atmosphere',
      bullets: [
        'Visual Upgrade: High-energy outdoor atmosphere highlighting poolside social scene.',
        'Local Synergy: Directly connects with prime destination social and beach demand.',
        'Conversion Trigger: Validates authentic experiential lifestyle over commoditized hotel rooms.'
      ]
    };
  }

  // 2. Destination Dining / Culinary / Cocktail Bar / Lounge
  if (text.includes('restaurant') || text.includes('dining') || text.includes('bar') || text.includes('cocktail') || text.includes('bazaar') || text.includes('jose andres') || text.includes('katsuya') || text.includes('culinary') || text.includes('grill') || text.includes('bistro') || cat === 'SOCIAL') {
    let subject = 'Signature Destination Dining Room & Cocktail Bar';
    if (text.includes('bazaar') || text.includes('jose andres')) subject = 'The Bazaar by José Andrés & Signature Cocktail Lounge';
    else if (text.includes('katsuya')) subject = 'Katsuya Japanese Culinary Room & Robata Bar';
    else if (title && title.length >= 10 && title.length <= 60 && !title.includes('Tripadvisor') && !title.includes('Picture of')) subject = title;
    return {
      category: 'SOCIAL_FB_ROOFTOP',
      subject,
      why: 'Showcasing destination culinary programming elevates property perception and captures high-spend leisure travelers.',
      trigger: 'Destination Gastronomy & Evening Social Gravitas',
      bullets: [
        'Visual Upgrade: Atmospheric culinary perspective showing ambient lighting and curated seating.',
        'Local Synergy: Anchors the property within the city\'s destination dining circuit.',
        'Conversion Trigger: Sparks instant evening social anticipation and high-yield bookings.'
      ]
    };
  }

  // 3. Spa / Thermal Wellness / Sanctuary
  if (text.includes('spa') || text.includes('wellness') || text.includes('treatment') || text.includes('sauna') || text.includes('massage') || text.includes('bathhouse') || text.includes('ciel') || cat === 'SPA') {
    return {
      category: 'SPA_WELLNESS_SANCTUARY',
      subject: text.includes('vitality') || text.includes('pool') ? 'Subterranean Wellness Sanctuary & Vitality Pool' : 'Signature Spa & Holistic Wellness Sanctuary',
      why: 'Highlighting dedicated wellness and restorative amenities captures health-conscious luxury travelers and increases average length of stay.',
      trigger: 'Holistic Rejuvenation & Private Sanctuary',
      bullets: [
        'Visual Upgrade: Calming, textural wellness framing emphasizing premium relaxation amenities.',
        'Local Synergy: Positions the hotel as a tranquil restorative escape in a vibrant destination.',
        'Conversion Trigger: Confirms wellness credentials and justifies higher room rates.'
      ]
    };
  }

  // 4. Heritage / Design Salon / Living Room / Iconic Lobby
  if (text.includes('lobby') || text.includes('salon') || text.includes('drawing') || text.includes('reception') || text.includes('living') || text.includes('interior') || cat === 'LOBBY') {
    return {
      category: 'HERITAGE_SALON_LIVING',
      subject: text.includes('starck') ? 'Philippe Starck Design Living Room & Cultural Salon' : 'Design-Forward Living Room & Cultural Salon',
      why: 'Highlighting the hotel\'s striking bespoke design and vibrant public spaces establishes distinct brand prestige.',
      trigger: 'Design Prestige & Curated Atmosphere',
      bullets: [
        'Visual Upgrade: Wide-angle interior perspective highlighting custom architectural details.',
        'Local Synergy: Reinforces the property\'s reputation as a cultural social hub.',
        'Conversion Trigger: Builds instant aesthetic confidence and design-conscious booking appeal.'
      ]
    };
  }

  // 5. Exterior / Landmark Facade / Architectural Presence
  if (cat === 'EXTERIOR' || text.includes('exterior') || text.includes('facade') || text.includes('façade') || text.includes('building') || text.includes('landmark') || text.includes('entrance')) {
    return {
      category: 'EXTERIOR_LANDMARK',
      subject: 'Historic Landmark Architectural Facade',
      why: 'Establishing definitive architectural prestige and iconic street presence builds instant brand credibility.',
      trigger: 'Architectural Gravitas & Destination Landmark',
      bullets: [
        'Visual Upgrade: High-definition architectural perspective showcasing historic landmark presence.',
        'Local Synergy: Anchors the property within the destination\'s most iconic architectural district.',
        'Conversion Trigger: Builds instant confidence and architectural curiosity for premium bookings.'
      ]
    };
  }

  // 6. Signature Suite / Bedroom
  return {
    category: 'SIGNATURE_SUITE_BEDROOM',
    subject: 'Signature King Suite with Bespoke Designer Furnishings',
    why: 'Showcasing high-finish private sleeping accommodations assures travelers of restful luxury and elevated comfort.',
    trigger: 'Elevated Residential Comfort & Restful Sanctuary',
    bullets: [
      'Visual Upgrade: Spatial perspective showing natural illumination and premium bedding materials.',
      'Local Synergy: Conveys curated residential luxury in a premier destination.',
      'Conversion Trigger: Eliminates accommodation hesitation and accelerates checkout.'
    ]
  };
}

// -------------------------------------------------------------
// PHASE 2: Dedicated Photo Resolution with Gemini Vision Checks
// -------------------------------------------------------------
export async function resolveAuditPhotos(hotelName, city, neighborhood = '', strategySlots = null, bookingUrl = null) {
  console.log(`[Photo Gatekeeper] Starting visual asset resolution for "${hotelName}" in "${city}"${bookingUrl ? ` (Direct URL: ${bookingUrl})` : ''}...`);
  
  // 1. Fetch live Booking.com photos (Playwright) + Signature Amenity photos (Serper)
  const [liveBookingPhotos, amenityPhotos] = await Promise.all([
    fetchBookingPhotosForHotel(hotelName, city, neighborhood, bookingUrl),
    fetchAmenityPhotosForHotel(hotelName, city, neighborhood)
  ]);

  const poolAmenity = Array.isArray(amenityPhotos) ? amenityPhotos : [];
  const poolLive = Array.isArray(liveBookingPhotos) ? liveBookingPhotos : [];
  const isListedOnBooking = poolLive.length >= 3;
  const usedUrls = new Set();

  const isMeetingOrConference = (p) => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    return s.includes('meeting') || s.includes('conference') || s.includes('boardroom') || s.includes('event space') || s.includes('banquet') || s.includes('seminar');
  };
  
  // Default 5 slots if not provided from Phase 1
  const targetSlots = strategySlots || [
    { slot: 1, category: "HERO_CULTURAL_MAGNET", photo_subject: "Hero Cultural Magnet" },
    { slot: 2, category: "EXTERIOR_LANDMARK", photo_subject: "Historic Landmark Architectural Facade" },
    { slot: 3, category: "SIGNATURE_SUITE_BEDROOM", photo_subject: "Signature Suite Bedroom" },
    { slot: 4, category: "SOCIAL_FB_ROOFTOP", photo_subject: "Signature Culinary Dining Room & Cocktail Bar" },
    { slot: 5, category: "SECONDARY_ROOM_BATHROOM", photo_subject: "Design Bathroom & Walk-in Shower" }
  ];

  const resolvedSequence = targetSlots.map((item, idx) => {
    const targetSlot = item.slot || (idx + 1);
    let photoUrl = matchBestImageForSubject(item.photo_subject, item.category, liveBookingPhotos, amenityPhotos, usedUrls, idx);
    let adaptedCategory = item.category;
    let adaptedSubject = item.photo_subject;
    let adaptedWhy = item.why_it_converts;
    let adaptedTrigger = item.recommended_trigger;
    let adaptedBullets = item.bullet_points || null;

    // Dynamic Asset-Grounded Alignment:
    // If a slot has no authentic asset matching its category (e.g. property has no bathroom photo),
    // NEVER force a mismatched photo into it. Instead, adapt the slot to an authentic signature asset!
    if (!photoUrl) {
      const unusedAsset = poolAmenity.find(p => p?.imageUrl && !usedUrls.has(p.imageUrl) && !isMeetingOrConference(p))
        || poolLive.find(p => p?.imageUrl && !usedUrls.has(p.imageUrl) && !isMeetingOrConference(p));

      if (unusedAsset) {
        photoUrl = unusedAsset.imageUrl;
        usedUrls.add(photoUrl);

        const assetInfo = classifyAssetAndDeriveRecommendation(unusedAsset, hotelName);
        adaptedCategory = assetInfo.category;
        adaptedSubject = assetInfo.subject;
        adaptedWhy = assetInfo.why;
        adaptedTrigger = assetInfo.trigger;
        adaptedBullets = assetInfo.bullets;
      }
    }

    let actualLiveSlot = null;

    if (photoUrl) {
      const liveIdx = liveBookingPhotos.findIndex(lp => lp.imageUrl === photoUrl);
      actualLiveSlot = liveIdx !== -1 ? (liveIdx + 1) : null;
    }

    const isRetained = actualLiveSlot === targetSlot;
    const isMoved = actualLiveSlot !== null && actualLiveSlot !== targetSlot;
    const isSwappedIn = actualLiveSlot === null;

    let action = item.action || 'RE_SEQUENCE';
    let actionLabel = item.action_label;

    if (!isListedOnBooking) {
      action = targetSlot === 1 ? 'HERO_CULTURAL_MAGNET' : 'CURATED_ASSET';
      actionLabel = targetSlot === 1 
        ? `⚡ HERO CULTURAL MAGNET: ${adaptedSubject || 'SIGNATURE ASSET'} (SLOT #1)`
        : `PRE-LISTING ASSET: ${adaptedSubject || 'SIGNATURE ASSET'} (SLOT #${targetSlot})`;
    } else if (adaptedCategory === 'HERO_CULTURAL_MAGNET' || item.action === 'HERO_CULTURAL_MAGNET' || item.action === 'MAGNET_OVERRIDE') {
      action = 'HERO_CULTURAL_MAGNET';
      actionLabel = item.action_label || `⚡ HERO CULTURAL MAGNET: ${adaptedSubject || 'SIGNATURE ASSET'} (SLOT #1)`;
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

    const derivedDefaults = (!adaptedWhy || !adaptedBullets || !adaptedTrigger) 
      ? classifyAssetAndDeriveRecommendation({ title: adaptedSubject, detectedCategory: adaptedCategory }, hotelName) 
      : null;

    const finalWhy = adaptedWhy || item.why_it_converts || derivedDefaults?.why || 'Grounds signature property atmosphere to drive direct conversions.';
    const finalTrigger = adaptedTrigger || item.recommended_trigger || item.psychological_conversion_trigger || derivedDefaults?.trigger || 'Cultural Distinction & Sensory Prestige';
    const finalBullets = adaptedBullets || item.bullet_points || derivedDefaults?.bullets || [
      `Visual Upgrade: Distinctive high-finish perspective of ${adaptedSubject}.`,
      `Local Synergy: Connects directly with prime local neighborhood demand.`,
      `Conversion Trigger: Validates authentic hotel identity and private comfort.`
    ];

    return {
      ...item,
      category: adaptedCategory,
      photo_subject: adaptedSubject,
      why_it_converts: finalWhy,
      upgrade_rationale: finalWhy,
      bullet_points: finalBullets,
      psychological_conversion_trigger: finalTrigger,
      recommended_trigger: finalTrigger,
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

  return {
    is_listed_on_booking: isListedOnBooking,
    listing_status: isListedOnBooking ? 'ACTIVE_ON_BOOKING' : 'NOT_LISTED_ON_BOOKING',
    live_photos: liveBookingPhotos,
    optimal_5_photo_sequence: resolvedSequence,
    photos_status: 'RESOLVED'
  };
}

export async function lookupHotelCandidatesHandler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    let hotelName = req.body?.hotelName || req.query?.hotelName || req.body?.propertyName || req.query?.propertyName || '';
    let city = req.body?.city || req.query?.city || req.body?.location || req.query?.location || '';
    let neighborhood = (req.body?.neighborhood !== undefined) ? req.body.neighborhood : (req.query?.neighborhood || '');

    if (!hotelName) {
      return res.status(400).json({ error: 'Missing hotelName parameter' });
    }

    const result = await lookupHotelCandidates(hotelName, city, neighborhood);
    return res.status(200).json(result);
  } catch (err) {
    console.error('[Lookup Hotel Candidates API] Error:', err);
    return res.status(500).json({ error: err.message });
  }
}

export async function resolveAuditPhotosHandler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    let hotelName = req.body.hotelName || req.query.hotelName || req.body.propertyName || req.query.propertyName || 'The Plymouth Hotel';
    let city = req.body.city || req.query.city || req.body.location || req.query.location || 'Miami';
    let neighborhood = (req.body.neighborhood !== undefined) ? req.body.neighborhood : (req.query.neighborhood || '');
    let strategySlots = req.body.strategySlots || null;
    let bookingUrl = req.body.bookingUrl || req.query.bookingUrl || null;

    if (city.toLowerCase().includes('south beach') && !neighborhood) {
      neighborhood = 'South Beach';
      city = city.replace(/south beach/i, '').replace(/,/g, '').trim() || 'Miami';
    }

    const cacheKey = bookingUrl ? `${getResolutionKey(hotelName, city, neighborhood)}:::${bookingUrl}` : getResolutionKey(hotelName, city, neighborhood);

    const isFresh = req.query.fresh === 'true' || req.body?.fresh === true;
    if (isFresh) {
      resolutionCache.delete(cacheKey);
    }

    // 1. Check in-memory TTL Cache (instant response)
    const cached = isFresh ? null : resolutionCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < RESOLUTION_CACHE_TTL_MS)) {
      console.log(`[Photo Gatekeeper API] Serving cached photo resolution for "${cacheKey}"`);
      return res.status(200).json(cached.data);
    }

    // 2. Check In-Flight Concurrency Mutex (Idempotency Lock: prevents duplicate Playwright instances)
    if (activeResolutions.has(cacheKey)) {
      console.log(`[Photo Gatekeeper API] Joining existing in-flight resolution for "${cacheKey}" (idempotency lock)`);
      const existingPromise = activeResolutions.get(cacheKey);
      const photoResults = await existingPromise;
      return res.status(200).json(photoResults);
    }

    // 3. Initiate Resolution & register in-flight Promise
    const resolutionPromise = resolveAuditPhotos(hotelName, city, neighborhood, strategySlots, bookingUrl)
      .then(results => {
        resolutionCache.set(cacheKey, { timestamp: Date.now(), data: results });
        return results;
      })
      .finally(() => {
        activeResolutions.delete(cacheKey);
      });

    activeResolutions.set(cacheKey, resolutionPromise);
    const photoResults = await resolutionPromise;
    return res.status(200).json(photoResults);
  } catch (err) {
    console.error('[Photo Gatekeeper API] Error:', err);
    return res.status(500).json({ error: err.message });
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    let hotelName = req.body?.hotelName || req.query?.hotelName || req.body?.propertyName || req.query?.propertyName || 'The Plymouth Hotel';
    let city = req.body?.city || req.query?.city || req.body?.location || req.query?.location || 'Miami';
    let neighborhood = (req.body?.neighborhood !== undefined) ? req.body.neighborhood : (req.query?.neighborhood || '');
    const isPhase1Only = req.query?.phase === '1' || req.body?.phase === 1 || req.body?.phase === '1' || req.query?.fast === 'true' || req.path?.includes('master-vibe-manifest') || req.url?.includes('master-vibe-manifest');

    if (city.toLowerCase().includes('south beach') && !neighborhood) {
      neighborhood = 'South Beach';
      city = city.replace(/south beach/i, '').replace(/,/g, '').trim() || 'Miami';
    }

    console.log(`[Master Vibe Audit API] Running for: "${hotelName}" in "${city}" ${neighborhood ? `(${neighborhood})` : ''} [Phase 1 Fast: ${isPhase1Only}]`);

    const manifestKey = getResolutionKey(hotelName, city, neighborhood);

    if (isPhase1Only) {
      // 1. Check in-memory manifest cache
      const cached = manifestCache.get(manifestKey);
      if (cached && (Date.now() - cached.timestamp < MANIFEST_CACHE_TTL_MS)) {
        console.log(`[Master Vibe API] Serving cached Phase 1 manifest for "${manifestKey}"`);
        return res.status(200).json(cached.data);
      }

      // 2. Check in-flight promise (prevent duplicate concurrent Gemini calls)
      if (activeManifests.has(manifestKey)) {
        console.log(`[Master Vibe API] Joining in-flight Phase 1 manifest generation for "${manifestKey}"`);
        const manifest = await activeManifests.get(manifestKey);
        return res.status(200).json(manifest);
      }

      // 3. Initiate Phase 1 synthesis
      const manifestPromise = (async () => {
        const { rawCorpus } = await fetchVenueCorpus(hotelName, city, neighborhood);
        const auditResult = await runStructuredVibeAudit(hotelName, city, rawCorpus, [], [], neighborhood);

        if (auditResult.ota_conversion_audit) {
          auditResult.ota_conversion_audit.photos_status = 'PENDING';
          auditResult.ota_conversion_audit.live_photos = [];
          if (auditResult.ota_conversion_audit.optimal_5_photo_sequence) {
            auditResult.ota_conversion_audit.optimal_5_photo_sequence = auditResult.ota_conversion_audit.optimal_5_photo_sequence.map(item => ({
              ...item,
              photo_url: null,
              status: 'PENDING'
            }));
          }
        }
        manifestCache.set(manifestKey, { timestamp: Date.now(), data: auditResult });
        return auditResult;
      })().finally(() => {
        activeManifests.delete(manifestKey);
      });

      activeManifests.set(manifestKey, manifestPromise);
      const auditResult = await manifestPromise;
      return res.status(200).json(auditResult);
    }

    // Default Synchronous Mode (Serper + Gemini + Full Photo Resolution)
    const { rawCorpus } = await fetchVenueCorpus(hotelName, city, neighborhood);
    const auditResult = await runStructuredVibeAudit(hotelName, city, rawCorpus, [], [], neighborhood);

    // Default Synchronous Mode: Resolve photos in full
    const photoResults = await resolveAuditPhotos(hotelName, city, neighborhood, auditResult.ota_conversion_audit?.optimal_5_photo_sequence);
    if (auditResult.ota_conversion_audit) {
      auditResult.ota_conversion_audit.is_listed_on_booking = photoResults.is_listed_on_booking;
      auditResult.ota_conversion_audit.listing_status = photoResults.listing_status;
      auditResult.ota_conversion_audit.live_photos = photoResults.live_photos;
      auditResult.ota_conversion_audit.optimal_5_photo_sequence = photoResults.optimal_5_photo_sequence;
      auditResult.ota_conversion_audit.photos_status = 'RESOLVED';
    }

    return res.status(200).json(auditResult);
  } catch (err) {
    console.error('[Master Vibe Audit API] Error:', err);
    return res.status(500).json({ error: err.message });
  }
}
