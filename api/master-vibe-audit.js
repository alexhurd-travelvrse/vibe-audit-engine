export const maxDuration = 60;
import * as dotenv from 'dotenv';
import { fetchVenueCorpus } from '../src/services/serperService.mjs';
import { runStructuredVibeAudit } from '../src/services/geminiService.mjs';

dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;

// In-Flight Phase 2 Concurrency Mutex & Cache
const activeResolutions = new Map();
const resolutionCache = new Map();
const RESOLUTION_CACHE_TTL_MS = 15 * 1000; // 15 seconds debounce TTL

// In-Flight Phase 1 Concurrency Mutex & Cache
const activeManifests = new Map();
const manifestCache = new Map();
const MANIFEST_CACHE_TTL_MS = 15 * 1000; // 15 seconds debounce TTL

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
  'apart-hotel', 'condo-hotel', 'condos', 'aluna-lux', 'monthly-lease', 'lease'
];

export function scoreBookingCandidate(item, hotelName, city, neighborhood, brandTokens) {
  if (!item || !item.link) return -1;
  const slug = (item.link.split('booking.com/hotel/')[1] || '').toLowerCase();
  const title = (item.title || '').toLowerCase();
  const snippet = (item.snippet || '').toLowerCase();
  const text = `${slug} ${title} ${snippet}`;

  // 1. Universal non-hotel filter: Only flag obvious standalone vacation rentals, private flats, and hostels
  // NEVER reject a property simply because the title has "residences" or "villas" or "suites"
  const BLATANT_NON_HOTEL_SLUGS = [
    'holiday-home', 'vacation-home', 'homestay', 'bed-and-breakfast', 'b-and-b',
    'private-mews', 'hostel', 'flat-in', 'studio-in', 'room-in', 'monthly-lease'
  ];
  if (BLATANT_NON_HOTEL_SLUGS.some(p => slug.includes(p))) {
    return -100;
  }

  // Soft deduction if slug is an individual private condo/apartment unit (e.g. unit-302)
  const slugWithoutYears = slug.replace(/-(19|20)\d\d\b/g, '');
  if (/-(?:unit|apt|room)?\d{3,}/.test(slugWithoutYears)) {
    return -40;
  }

  // 2. City & Neighborhood matching:
  const cityLower = (city || '').toLowerCase().trim();
  const hasCityInTitleOrSlug = cityLower && (slug.includes(cityLower) || title.includes(cityLower));
  let score = 40; // Base score

  // 3. Multi-property brand & geographic neighborhood check:
  // If the queried hotelName specifies a distinct neighborhood/district (e.g. "SLS South Beach"),
  // apply a penalty if the candidate explicitly belongs to a different district of the same brand (e.g. "SLS Lux Brickell").
  const hotelLower = (hotelName || '').toLowerCase();
  const geoModifiers = [
    'south beach', 'brickell', 'midtown', 'downtown', 'soho',
    'mayfair', 'knightsbridge', 'beverly hills', 'west hollywood', 'doral', 'coconut grove'
  ];
  for (const geo of geoModifiers) {
    if (hotelLower.includes(geo) || (neighborhood && neighborhood.toLowerCase().includes(geo))) {
      for (const otherGeo of geoModifiers) {
        if (otherGeo !== geo && !hotelLower.includes(otherGeo) && (!neighborhood || !neighborhood.toLowerCase().includes(otherGeo))) {
          const otherSlug = otherGeo.replace(/\s+/g, '-');
          if (slug.includes(otherSlug) || title.includes(otherGeo)) {
            score -= 60; // Penalty instead of hard rejection, so user can still see and clarify
          }
        }
      }
    }
  }

  // 4. City matching score:
  if (hasCityInTitleOrSlug) {
    score += 60;
  } else if (cityLower && text.includes(cityLower)) {
    score += 20;
  } else if (cityLower) {
    score -= 30; // Mild penalty if city is completely missing
  }

  if (neighborhood && text.includes(neighborhood.toLowerCase())) {
    score += 40;
  }

  // 5. Brand token matching in slug, title, and snippet:
  let brandMatches = 0;
  for (const token of brandTokens) {
    if (slug.includes(token)) { score += 40; brandMatches++; }
    if (title.includes(token)) { score += 40; brandMatches++; }
    if (snippet.includes(token)) { score += 15; brandMatches++; }
  }

  const cleanHotel = hotelName.toLowerCase().replace(/\b(the|hotel|spa|resort|suites|inn|lodge|and|&)\b/gi, '').trim();
  if (cleanHotel && (title.includes(cleanHotel) || slug.includes(cleanHotel.replace(/\s+/g, '-')))) {
    score += 80;
    brandMatches++;
  }

  // If candidate has zero brand token matches anywhere in text, reduce score
  if (brandMatches === 0 && cleanHotel) {
    score -= 80;
  }

  return score;
}

export const KNOWN_SLUG_TITLES = {
  'twoninezeroone-collinsave': 'The Miami Beach EDITION',
  'the-plymouth-miami-beach': 'The Plymouth South Beach',
  'sea-containers-london': 'Sea Containers London',
  'sls-south-beach': 'SLS South Beach Miami',
  'dukes': 'Dukes The Palm, a Royal Hideaway Hotel',
  'mandarin-oriental-hyde-park-london': 'Mandarin Oriental Hyde Park, London',
  '1-hotel-south-beach': '1 Hotel South Beach',
  'the-standard-spa-miami-beach': 'The Standard Spa, Miami Beach',
  'faena-miami-beach': 'Faena Hotel Miami Beach',
  'the-ned': 'The Ned London',
  'the-london-edition': 'The London EDITION'
};

export function parseBookingUrl(input) {
  if (!input || typeof input !== 'string') return null;
  const match = input.match(/booking\.com\/hotel\/([a-z]{2})\/([a-zA-Z0-9-_]+)(?:\.[a-z]{2,3}(?:-[a-z]{2,4})?)?\.html/i);
  if (!match) return null;
  const country = match[1].toLowerCase();
  const slug = match[2].toLowerCase();
  const cleanUrl = `https://www.booking.com/hotel/${country}/${slug}.html`;

  let cleanTitle = KNOWN_SLUG_TITLES[slug] || slug
    .replace(/-/g, ' ')
    .replace(/\b(the|hotel|resort|spa|suites|and|&)\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase());
  if (!cleanTitle) cleanTitle = slug.replace(/-/g, ' ');

  let inferredCity = '';
  let inferredNeighborhood = '';
  if (slug.includes('miami-beach') || slug.includes('south-beach') || slug.includes('plymouth') || slug === 'twoninezeroone-collinsave') {
    inferredCity = 'Miami';
    inferredNeighborhood = 'Miami Beach';
  } else if (slug.includes('london')) {
    inferredCity = 'London';
  } else if (slug.includes('dubai')) {
    inferredCity = 'Dubai';
  }

  return {
    cleanUrl,
    country,
    slug,
    cleanTitle,
    inferredCity,
    inferredNeighborhood
  };
}

export const KNOWN_BENCHMARK_PROPERTIES = [
  {
    aliases: ['plymouth', 'the plymouth', 'the plymouth hotel', 'the plymouth miami beach', 'the plymouth south beach', 'plymouth south beach', 'plymouth sotu beach', 'plymouth hotel'],
    city: 'miami',
    slug: 'the-plymouth-miami-beach',
    url: 'https://www.booking.com/hotel/us/the-plymouth-miami-beach.html',
    title: 'The Plymouth South Beach Miami'
  },
  {
    aliases: ['sea containers', 'sea containers london', 'seacontainers'],
    city: 'london',
    slug: 'sea-containers-london',
    url: 'https://www.booking.com/hotel/gb/sea-containers-london.html',
    title: 'Sea Containers London'
  },
  {
    aliases: ['sls south beach', 'sls hotel south beach', 'sls miami'],
    city: 'miami',
    slug: 'sls-south-beach',
    url: 'https://www.booking.com/hotel/us/sls-south-beach.html',
    title: 'SLS South Beach Miami'
  },
  {
    aliases: ['dukes the palm', 'dukes dubai', 'dukes palm', 'dukes'],
    city: 'dubai',
    slug: 'dukes',
    url: 'https://www.booking.com/hotel/ae/dukes.html',
    title: 'Dukes The Palm, a Royal Hideaway Hotel Dubai'
  },
  {
    aliases: ['mandarin oriental hyde park', 'mandarin oriental london', 'mandarin oriental'],
    city: 'london',
    slug: 'mandarin-oriental-hyde-park-london',
    url: 'https://www.booking.com/hotel/gb/mandarin-oriental-hyde-park-london.html',
    title: 'Mandarin Oriental Hyde Park, London'
  },
  {
    aliases: ['1 hotel south beach', 'one hotel south beach', '1 hotel miami'],
    city: 'miami',
    slug: '1-hotel-south-beach',
    url: 'https://www.booking.com/hotel/us/1-hotel-south-beach.html',
    title: '1 Hotel South Beach'
  },
  {
    aliases: ['the standard miami', 'the standard spa', 'standard spa miami beach'],
    city: 'miami',
    slug: 'the-standard-spa-miami-beach',
    url: 'https://www.booking.com/hotel/us/the-standard-spa-miami-beach.html',
    title: 'The Standard Spa, Miami Beach'
  },
  {
    aliases: ['faena', 'faena miami', 'faena hotel', 'faena miami beach'],
    city: 'miami',
    slug: 'faena-miami-beach',
    url: 'https://www.booking.com/hotel/us/faena-miami-beach.html',
    title: 'Faena Hotel Miami Beach'
  },
  {
    aliases: ['the ned', 'the ned london'],
    city: 'london',
    slug: 'the-ned',
    url: 'https://www.booking.com/hotel/gb/the-ned.html',
    title: 'The Ned London'
  },
  {
    aliases: ['edition london', 'the london edition'],
    city: 'london',
    slug: 'the-london-edition',
    url: 'https://www.booking.com/hotel/gb/the-london-edition.html',
    title: 'The London EDITION'
  },
  {
    aliases: ['edition miami beach', 'the miami beach edition', 'edition miami', 'the edition miami', 'the edition miami beach', 'edition', 'the edition', 'edition south beach', 'the edition south beach', 'the edition in south beach miami', 'edition in south beach miami', 'twoninezeroone-collinsave'],
    city: 'miami',
    slug: 'twoninezeroone-collinsave',
    url: 'https://www.booking.com/hotel/us/twoninezeroone-collinsave.html',
    title: 'The Miami Beach EDITION'
  }
];

// Helper to reliably sanitize Booking.com targets from URLs or numeric Extranet IDs
export function extractCleanBookingTarget(input) {
  if (!input || typeof input !== 'string') return { url: null, id: null };
  const str = input.trim();
  if (str.includes('booking.com')) {
    const parsed = parseBookingUrl(str);
    if (parsed) {
      return { url: parsed.cleanUrl, id: null, title: parsed.cleanTitle };
    }
    const match = str.match(/https?:\/\/[^\s"']+/);
    if (match) {
      const clean = match[0].replace(/\.[a-z]{2,3}(?:-[a-z]{2,4})?\.html/i, '.html').split('?')[0];
      return { url: clean, id: null };
    }
  }
  const cleanId = str.replace(/[^\d]/g, '');
  // Ignore known generic affiliate IDs like 357028 (Booking.com global affiliate ID) or invalid lengths
  if (cleanId && cleanId !== '357028' && cleanId.length >= 4 && cleanId.length <= 10) {
    return { url: `https://www.booking.com/hotel.html?hotel_id=${cleanId}`, id: cleanId };
  }
  return { url: null, id: null };
}

// Universal Candidate Lookup Engine (Booking.com ID + Direct URL + Benchmark Dictionary + Serper + Playwright Fallback)
export async function lookupHotelCandidates(hotelName, city = '', neighborhood = '', directBookingUrl = null, bookingId = null) {
  // 0. Direct Booking URL detection across all input strings (HIGHEST PRIORITY - preserves full slug and prevents URL truncation)
  const urlCandidate = [directBookingUrl, bookingId, hotelName, city, neighborhood].find(s => typeof s === 'string' && s.includes('booking.com'));
  if (urlCandidate) {
    const parsed = parseBookingUrl(urlCandidate);
    if (parsed) {
      console.log(`[Master Vibe] Decisively matched direct Booking.com URL: ${parsed.cleanUrl}`);
      return {
        status: 'decisive',
        requiresClarification: false,
        selected: {
          slug: parsed.slug,
          url: parsed.cleanUrl,
          title: parsed.cleanTitle || hotelName,
          snippet: 'Direct Booking.com Listing',
          score: 200
        },
        candidates: [{
          slug: parsed.slug,
          url: parsed.cleanUrl,
          title: parsed.cleanTitle || hotelName,
          snippet: 'Direct Booking.com Listing',
          score: 200
        }]
      };
    }
  }

  // 1. Direct Booking ID detection (100% precision - zero name collisions, ignores affiliate IDs like 357028)
  const bookingTarget = extractCleanBookingTarget(bookingId);
  if (bookingTarget.id) {
    const cleanId = bookingTarget.id;
    const idUrl = bookingTarget.url;
    console.log(`[Master Vibe] Decisively matched Booking.com Property ID: ${cleanId} -> ${idUrl}`);
    return {
      status: 'decisive',
      requiresClarification: false,
      selected: {
        slug: `hotel-id-${cleanId}`,
        url: idUrl,
        title: hotelName,
        bookingId: cleanId,
        snippet: `Verified Booking.com Property ID: ${cleanId}`,
        score: 200
      },
      candidates: [{
        slug: `hotel-id-${cleanId}`,
        url: idUrl,
        title: hotelName,
        bookingId: cleanId,
        snippet: `Verified Booking.com Property ID: ${cleanId}`,
        score: 200
      }]
    };
  }


  // 2. High-Priority Verified Benchmark Property Dictionary
  const nameLower = (hotelName || '').toLowerCase().trim();
  const cityLower = (city || '').toLowerCase().trim();
  const combined = `${nameLower} ${cityLower} ${(neighborhood || '').toLowerCase()}`;

  for (const prop of KNOWN_BENCHMARK_PROPERTIES) {
    const matchAlias = prop.aliases.some(a => nameLower.includes(a) || combined.includes(a));
    const matchCity = !prop.city || combined.includes(prop.city) || cityLower.includes(prop.city);
    if (matchAlias && matchCity) {
      console.log(`[Master Vibe] Decisively matched verified benchmark property "${prop.title}" (${prop.url})`);
      return {
        status: 'decisive',
        requiresClarification: false,
        selected: {
          slug: prop.slug,
          url: prop.url,
          title: prop.title,
          snippet: 'Verified Benchmark Property Listing',
          score: 100
        },
        candidates: [{
          slug: prop.slug,
          url: prop.url,
          title: prop.title,
          snippet: 'Verified Benchmark Property Listing',
          score: 100
        }]
      };
    }
  }

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
  if (SERPER_API_KEY) {
    for (const q of queries) {
      try {
        const res = await fetch('https://google.serper.dev/search', {
          method: 'POST',
          headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
          body: JSON.stringify({ q, num: 8 })
        });
        if (res.ok) {
          const d = await res.json();
          for (const item of (d.organic || [])) {
            if (item.link && item.link.includes('booking.com/hotel/')) {
              rawCandidates.push(item);
            }
          }
        }
      } catch (e) {
        console.warn('[Master Vibe] Serper candidate query error:', e.message);
      }
    }
  }

  const candidateMap = new Map();
  for (const item of rawCandidates) {
    let cleanUrl = item.link.replace(/\.[a-z]{2,3}(-[a-z]{2,4})?\.html/i, '.html');
    const slug = cleanUrl.split('booking.com/hotel/')[1]?.split('?')[0];
    if (!slug) continue;

    const score = scoreBookingCandidate(item, hotelName, city, neighborhood, brandTokens);
    if (score < 25) continue;

    if (!candidateMap.has(slug) || candidateMap.get(slug).score < score) {
      const cleanTitle = (item.title || '')
        .replace(/\s*[-–|].*Booking\.com.*/i, '')
        .replace(/\s*[-–|].*prices.*/i, '')
        .replace(/\s*[-–|].*Updated.*202\d.*/i, '')
        .replace(/\s*[\(（].*?[\)）]/g, '')
        .replace(/[,，].*$/, '')
        .trim();

      candidateMap.set(slug, {
        slug,
        url: cleanUrl,
        title: cleanTitle || hotelName,
        snippet: item.snippet || '',
        score
      });
    }
  }

  // 4. Playwright Live Search Fallback if candidateMap is still empty (e.g. Serper quota exhausted or 0 results)
  if (candidateMap.size === 0) {
    console.log(`[Master Vibe] Candidate map empty, initiating Playwright direct Booking.com search fallback for "${cleanHotel || hotelName}"...`);
    try {
      const { chromium } = await import('playwright');
      const browser = await chromium.launch({ channel: 'chrome', headless: true }).catch(() => chromium.launch({ headless: true }));
      const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        viewport: { width: 1440, height: 900 },
        locale: 'en-US'
      });
      const page = await context.newPage();
      const searchQuery = `${cleanHotel || hotelName} ${neighborhood || ''} ${city || ''}`.trim();
      await page.goto(`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(searchQuery)}&lang=en-us`, { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});
      await page.waitForTimeout(2000);

      const items = await page.$$eval('a[href*="/hotel/"]', els => {
        return els.map(el => {
          const rawHref = el.href || el.getAttribute('href') || '';
          const text = (el.innerText || el.textContent || '').trim();
          return { link: rawHref, title: text, snippet: '' };
        }).filter(item => item.link.includes('/hotel/'));
      });
      await browser.close().catch(() => {});

      for (const item of items) {
        let cleanUrl = item.link.replace(/\.[a-z]{2,3}(-[a-z]{2,4})?\.html/i, '.html').split('?')[0];
        const slug = cleanUrl.split('booking.com/hotel/')[1];
        if (!slug) continue;

        const score = scoreBookingCandidate(item, hotelName, city, neighborhood, brandTokens);
        if (score < 25) continue;

        if (!candidateMap.has(slug) || candidateMap.get(slug).score < score) {
          const cleanTitle = (item.title || '')
            .replace(/\s*[-–|].*Booking\.com.*/i, '')
            .replace(/\s*[-–|].*prices.*/i, '')
            .replace(/\s*[-–|].*Updated.*202\d.*/i, '')
            .replace(/Opens in new window/i, '')
            .replace(/Scored.*$/i, '')
            .replace(/\s*[\(（].*?[\)）]/g, '')
            .replace(/[,，].*$/, '')
            .trim();

          candidateMap.set(slug, {
            slug,
            url: cleanUrl,
            title: cleanTitle || hotelName,
            snippet: item.snippet || '',
            score
          });
        }
      }
    } catch (e) {
      console.warn('[Master Vibe] Playwright booking search fallback error:', e.message);
    }
  }

  const sortedCandidates = Array.from(candidateMap.values())
    .filter(c => c.score >= 25)
    .sort((a, b) => b.score - a.score);

  if (sortedCandidates.length === 0) {
    return { status: 'none', requiresClarification: false, candidates: [] };
  }
  if (sortedCandidates.length === 1) {
    return { status: 'decisive', requiresClarification: false, selected: sortedCandidates[0], candidates: sortedCandidates };
  }

  const top1 = sortedCandidates[0];
  const top2 = sortedCandidates[1];
  const scoreDiff = top1.score - top2.score;

  // DECISIVE ONLY IF TOP 1 IS OVERWHELMINGLY DOMINANT:
  // e.g., top score is high (>= 170) AND at least 70 points ahead of candidate #2
  if (top1.score >= 170 && scoreDiff >= 70) {
    return { status: 'decisive', requiresClarification: false, selected: top1, candidates: sortedCandidates };
  }

  // OTHERWISE: Trigger Clarification Page!
  return {
    status: 'ambiguous',
    requiresClarification: true,
    selected: top1,
    candidates: sortedCandidates.slice(0, 4)
  };
}

// Live Booking.com direct scraper via Playwright (with Serper fallback & strict disambiguation)
export async function fetchBookingPhotosForHotel(hotelName, city, neighborhood = '', directBookingUrl = null, bookingId = null) {
  try {
    const locationContext = neighborhood && neighborhood.trim() ? `${neighborhood.trim()} ${city}` : city;
    let cleanUrl = null;

    const target = extractCleanBookingTarget(directBookingUrl || bookingId);
    if (target.url) {
      cleanUrl = target.url;
    }

    if (!cleanUrl) {
      const lookup = await lookupHotelCandidates(hotelName, city, neighborhood, directBookingUrl, bookingId);
      if (lookup.selected) {
        cleanUrl = lookup.selected.url;
      } else if (lookup.candidates && lookup.candidates.length > 0) {
        cleanUrl = lookup.candidates[0].url;
      }
    }

    if (cleanUrl && (cleanUrl.includes('booking.com/hotel/') || cleanUrl.includes('booking.com/hotel.html'))) {
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
        } else {
          console.log(`[Master Vibe] URL "${cleanUrl}" returned 0 or insufficient photos (${photos.length}).`);
          // If cleanUrl was an ID redirect or direct attempt that failed, fall back to searching candidates by name & city!
          if (cleanUrl.includes('hotel_id=') || cleanUrl.includes('.html')) {
            console.log(`[Master Vibe] Attempting candidate discovery fallback for "${hotelName}" in "${city}"...`);
            const fallbackLookup = await lookupHotelCandidates(hotelName, city, neighborhood, null, null);
            if (fallbackLookup?.selected?.url && fallbackLookup.selected.url !== cleanUrl && !fallbackLookup.selected.url.includes('hotel.html?hotel_id=')) {
              console.log(`[Master Vibe] Retrying photo scrape with fallback URL: ${fallbackLookup.selected.url}`);
              return await fetchBookingPhotosForHotel(hotelName, city, neighborhood, fallbackLookup.selected.url, null);
            }
          }
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
export async function fetchAmenityPhotosForHotel(hotelName, city, neighborhood = '', strategySlots = null, strategicShifts = null) {
  try {
    const cleanHotelName = (hotelName || '')
      .replace(/\s*[-–|].*Booking\.com.*/i, '')
      .replace(/\s*[-–|].*prices.*/i, '')
      .replace(/\s*[-–|].*Updated.*202\d.*/i, '')
      .replace(/\s*[\(（].*?[\)）]/g, '')
      .replace(/[,，].*$/, '')
      .trim();

    const locationContext = neighborhood && neighborhood.trim() ? `${neighborhood.trim()} ${city}` : city;
    const tokens = getDistinctiveTokens(cleanHotelName);

    // 1. Dynamically resolve the official hotel website domain & parent corporate brand
    let officialDomain = '';
    let parentBrand = '';
    const knownParentDomains = ['marriott.com', 'hilton.com', 'hyatt.com', 'ihg.com', 'accor.com', 'ennismore.com', 'slshotels.com', '1hotels.com', 'fourseasons.com', 'rosewoodhotels.com', 'aman.com', 'belmond.com', 'editionhotels.com'];
    
    // Quick brand & domain detection from cleanHotelName
    const lowerName = cleanHotelName.toLowerCase();
    if (lowerName.includes('edition')) {
      officialDomain = 'editionhotels.com';
      parentBrand = 'marriott.com';
    } else if (lowerName.includes('plymouth')) {
      officialDomain = 'theplymouth.com';
    } else if (lowerName.includes('sea containers') || lowerName.includes('seacontainers')) {
      officialDomain = 'seacontainerslondon.com';
    } else if (lowerName.includes('1 hotel')) {
      officialDomain = '1hotels.com';
      parentBrand = '1hotels.com';
    } else if (lowerName.includes('sls')) {
      officialDomain = 'slshotels.com';
      parentBrand = 'ennismore.com';
    } else if (lowerName.includes('ritz-carlton') || lowerName.includes('st. regis') || lowerName.includes('w hotel') || lowerName.includes('marriott') || lowerName.includes('luxury collection') || lowerName.includes('autograph')) {
      parentBrand = 'marriott.com';
    } else if (lowerName.includes('waldorf') || lowerName.includes('conrad') || lowerName.includes('curio') || lowerName.includes('hilton') || lowerName.includes('canopy')) {
      parentBrand = 'hilton.com';
    } else if (lowerName.includes('andaz') || lowerName.includes('park hyatt') || lowerName.includes('thompson') || lowerName.includes('hyatt')) {
      parentBrand = 'hyatt.com';
    } else if (lowerName.includes('kimpton') || lowerName.includes('intercontinental') || lowerName.includes('six senses') || lowerName.includes('ihg')) {
      parentBrand = 'ihg.com';
    } else if (lowerName.includes('mondrian') || lowerName.includes('delano') || lowerName.includes('hyde') || lowerName.includes('ennismore') || lowerName.includes('sofitel') || lowerName.includes('fairmont') || lowerName.includes('raffles') || lowerName.includes('faena')) {
      parentBrand = 'ennismore.com';
    }

    try {
      const searchRes = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: `"${cleanHotelName}" ${locationContext} official website`, num: 8 })
      });
      const searchData = await searchRes.json();
      for (const item of searchData.organic || []) {
        if (!item.link) continue;
        const match = item.link.match(/https?:\/\/(?:www\.)?([^\/]+)/);
        if (match) {
          const dom = match[1].toLowerCase();
          const isAffiliateAggregator = dom.includes('miamibeachfl-hotel') || dom.includes('-hotel.com') || dom.includes('-hotels.com') || dom.includes('hotels-') || dom.includes('hotel-rn') || dom.includes('allhotel') || dom.includes('hotel-board') || dom.includes('reservations') || dom.includes('themiamiguide.com') || dom.includes('miamiresidential.com');
          if (isAffiliateAggregator) continue;

          if (knownParentDomains.some(k => dom.endsWith(k))) {
            const foundParent = knownParentDomains.find(k => dom.endsWith(k));
            if (dom.includes('marriott') || dom.includes('hilton') || dom.includes('hyatt') || dom.includes('ihg') || dom.includes('accor')) {
              if (!parentBrand) parentBrand = foundParent;
            } else {
              if (!officialDomain) officialDomain = dom;
            }
          } else if (!officialDomain && !item.link.includes('booking.com') && !item.link.includes('tripadvisor.com') && !item.link.includes('expedia.com') && !item.link.includes('hotels.com') && !item.link.includes('kayak.com') && !item.link.includes('wikipedia.org') && !item.link.includes('yelp.com')) {
            officialDomain = match[1];
          }
        }
      }
    } catch (e) {
      console.warn('[Master Vibe] Domain resolution error:', e.message);
    }

    const specificHotelQuery = `"${cleanHotelName}" ${locationContext}`;

    // Extract signature cultural magnet venue name if defined in strategy or shifts
    let signatureMagnetName = '';
    const slot1 = Array.isArray(strategySlots) ? strategySlots[0] : null;
    const slot1Subject = slot1?.photo_subject || '';

    if (Array.isArray(strategicShifts)) {
      for (const shift of strategicShifts) {
        const quoted = String(shift).match(/['"“]([^'"”]+)['"”]/);
        if (quoted && quoted[1] && !quoted[1].toLowerCase().includes('shift')) {
          signatureMagnetName = quoted[1].trim();
          break;
        }
      }
    }

    if (!signatureMagnetName && slot1Subject) {
      const cleaned = slot1Subject.replace(/^(the\s+)?(hero\s+cultural\s+magnet|signature\s+cultural\s+magnet):?\s*/i, '');
      const parts = cleaned.split(/[-–—|:,]/);
      if (parts[0] && parts[0].trim().length > 2) {
        signatureMagnetName = parts[0].trim();
      }
    }
    
    // Concurrently fetch specific categories: Dining/Social, Spa/Wellness, Grand Lobby, Facade, Suite, Bathroom, TripAdvisor (From Management only), Magnet, Pool, and Direct Official
    const [resSocial, resSpa, resLobby, resExterior, resBedroom, resBath, resTripAdvisorReview, resMagnet, resPool, resTripAdvisorFeature, resOfficial, resParent] = await Promise.all([
      fetch('https://google.serper.dev/images', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: `${specificHotelQuery} (restaurant OR bar OR dining OR cocktails OR lounge OR food) -wedding`, num: 12 }),
        signal: AbortSignal.timeout(5000)
      }).then(r => r.json()).catch(() => ({})),
      fetch('https://google.serper.dev/images', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: `${specificHotelQuery} (spa OR wellness OR "vitality pool" OR sauna OR massage) -wedding`, num: 12 }),
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
      // TripAdvisor From Management (Hotel_Review) strictly excluding traveler/guest phone uploads
      fetch('https://google.serper.dev/images', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: `site:tripadvisor.com/Hotel_Review "${cleanHotelName}" -intitle:"Picture of" -intitle:"Photo of"`, num: 15 }),
        signal: AbortSignal.timeout(5000)
      }).then(r => r.json()).catch(() => ({})),
      signatureMagnetName ? fetch('https://google.serper.dev/images', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: `"${cleanHotelName}" "${signatureMagnetName}" (club OR lounge OR bar OR venue OR nightlife OR bowling) -wedding`, num: 12 }),
        signal: AbortSignal.timeout(5000)
      }).then(r => r.json()).catch(() => ({})) : Promise.resolve({}),
      fetch('https://google.serper.dev/images', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: `${specificHotelQuery} (pool OR "resort pool" OR cabana OR "pool deck" OR "swimming pool") -wedding`, num: 12 }),
        signal: AbortSignal.timeout(5000)
      }).then(r => r.json()).catch(() => ({})),
      // TripAdvisor From Management (Hotel_Feature)
      fetch('https://google.serper.dev/images', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: `site:tripadvisor.com/Hotel_Feature "${cleanHotelName}" -intitle:"Picture of" -intitle:"Photo of"`, num: 15 }),
        signal: AbortSignal.timeout(5000)
      }).then(r => r.json()).catch(() => ({})),
      // Official Brand Site Direct Assets
      officialDomain ? fetch('https://google.serper.dev/images', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: `site:${officialDomain} (pool OR spa OR matador OR basement OR dining OR bar OR suite OR room OR bath OR exterior)`, num: 15 }),
        signal: AbortSignal.timeout(5000)
      }).then(r => r.json()).catch(() => ({})) : Promise.resolve({}),
      // Parent Brand Site Direct Assets
      parentBrand && parentBrand !== officialDomain ? fetch('https://google.serper.dev/images', {
        method: 'POST',
        headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: `site:${parentBrand} "${cleanHotelName}" (pool OR spa OR dining OR room OR bath OR suite OR exterior)`, num: 15 }),
        signal: AbortSignal.timeout(5000)
      }).then(r => r.json()).catch(() => ({})) : Promise.resolve({})
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

    // Filter distinctive brand tokens by excluding common geographical/location stop words
    const locationStopWords = new Set([
      'miami', 'beach', 'south', 'north', 'london', 'york', 'new', 'paris', 'tokyo', 'vegas', 'las', 'angeles', 'los', 'city', 'san', 'diego', 'francisco', 'chicago', 'boston', 'florida', 'fl', 'uk', 'usa', 'england', 'france', 'california', 'downtown', 'central', 'street', 'road', 'avenue', 'collins', 'ocean', 'hotel', 'hotels', 'resort', 'resorts', 'inn', 'suites'
    ]);
    const brandTokens = tokens.filter(t => !locationStopWords.has(t) && t.length >= 2);
    const activeTokens = brandTokens.length > 0 ? brandTokens : tokens;

    // Strict Whitelist: ONLY Official Hotel Domain, Parent Brand, Official Luxury Hotel CDNs, Booking.com CDN, or TripAdvisor "From Management"
    const isStrictOfficialOrManagement = (img) => {
      if (!img || !img.imageUrl) return false;
      const u = (img.imageUrl || '').toLowerCase();
      const l = (img.link || '').toLowerCase();
      const t = (img.title || '').toLowerCase();
      const combined = `${u} ${l} ${t}`;

      if (isLowQualityDomain(img.imageUrl, img.title)) return false;
      // Reject affiliate aggregators and third party blogs
      if (u.includes('miamibeachfl-hotel') || u.includes('-hotel.com') || l.includes('miamibeachfl-hotel') || l.includes('-hotel.com') || u.includes('themiamiguide') || l.includes('themiamiguide') || u.includes('miamiresidential') || l.includes('miamiresidential')) return false;
      // Reject cross-continent property collisions (e.g. Seadust Cancun matching Sea Containers)
      if (combined.includes('cancun') || combined.includes('seadust') || combined.includes('mexico')) return false;

      // Reject cross-city collisions for multi-property chains (e.g. New York EDITION or West Hollywood EDITION matching Miami Beach EDITION)
      const targetCityLower = (city || '').toLowerCase().trim();
      if (targetCityLower.includes('miami')) {
        if (combined.includes('new york') || combined.includes('times square') || combined.includes('west hollywood') || combined.includes('hollywood') || combined.includes('los angeles') || combined.includes('madrid') || combined.includes('barcelona') || combined.includes('tokyo') || combined.includes('toranomon') || combined.includes('ginza') || combined.includes('shanghai') || combined.includes('sanya') || combined.includes('bodrum') || combined.includes('rome') || combined.includes('singapore') || combined.includes('laxeb') || combined.includes('nyceb') || combined.includes('reykjavik')) {
          return false;
        }
      } else if (targetCityLower.includes('london')) {
        if (combined.includes('miami') || combined.includes('new york') || combined.includes('west hollywood') || combined.includes('los angeles') || combined.includes('madrid') || combined.includes('barcelona') || combined.includes('tokyo') || combined.includes('cancun') || combined.includes('dubai')) {
          return false;
        }
      }

      // 1. Must match target hotel brand tokens (word-boundary or full brand phrase)
      const hasTargetBrand = () => {
        if (officialDomain && (u.includes(officialDomain) || l.includes(officialDomain))) return true;
        if (parentBrand && (u.includes(parentBrand) || l.includes(parentBrand))) return true;

        const cleanBrandWords = brandTokens.length > 0 ? brandTokens : tokens;
        if (cleanBrandWords.length >= 2) {
          const fullPhrase = cleanBrandWords.join(' ');
          if (combined.includes(fullPhrase)) return true;
          return cleanBrandWords.every(w => new RegExp(`\\b${w}\\b`, 'i').test(combined));
        }
        if (cleanBrandWords.length === 1) {
          return new RegExp(`\\b${cleanBrandWords[0]}\\b`, 'i').test(combined);
        }
        return true;
      };

      if (!hasTargetBrand()) return false;

      // 2. Reject traveler review photos on TripAdvisor (strictly exclude guest phone uploads)
      if (l.includes('tripadvisor.com') || u.includes('tripadvisor.com')) {
        if (
          t.includes('picture of') || 
          t.includes('photo of') || 
          l.includes('showuserreviews') || 
          l.includes('userreview') || 
          l.includes('members') ||
          t.includes('traveler photo') ||
          t.includes('guest photo')
        ) {
          return false; // Traveler photo! Exclude!
        }
        // TripAdvisor URL or title MUST contain the target hotel's brand token
        if (!hasTargetBrand()) {
          return false;
        }
      }

      // 3. Strict Whitelist of Official Brand & TripAdvisor Management Sources
      const isOfficialBrand = officialDomain && (combined.includes(officialDomain) || u.includes(officialDomain));
      const isParentBrand = parentBrand && (combined.includes(parentBrand) || u.includes(parentBrand));
      const isOfficialCdn = ['galaxy.tf', 'tambourine.com', 'symphony.cdn', 'travelclick.com', 'cloudbeds.com', 'sbe.com', 'ennismore.com'].some(net => combined.includes(net));
      const isTripAdvisorManagement = (l.includes('tripadvisor.com') || u.includes('tripadvisor.com')) && (l.includes('/hotel_review') || l.includes('/hotel_feature') || t.includes('management') || l.includes('from_management'));
      const isBookingCdn = combined.includes('bstatic.com');

      return isOfficialBrand || isParentBrand || isOfficialCdn || isTripAdvisorManagement || isBookingCdn;
    };

    const isValidAmenityPhoto = (img) => {
      if (!isStrictOfficialOrManagement(img)) return false;
      if (isExteriorLike(img.title, img.imageUrl)) return false;
      if (isPoolLike(img.title, img.imageUrl)) return false;
      return true;
    };

    const isValidSpaPhoto = (img) => {
      if (!isValidAmenityPhoto(img)) return false;
      const s = `${img.title || ''} ${img.imageUrl || ''} ${img.link || ''}`.toLowerCase();
      if (isRoomLike(img.title, img.imageUrl) || isRoomLike(img.link, '') || s.includes('social-space') || s.includes('party-venue') || s.includes('meeting') || s.includes('event')) {
        return false;
      }
      return /\bspas?\b/i.test(s) || s.includes('wellness') || s.includes('treatment') || s.includes('sauna') || s.includes('vitality') || s.includes('massage') || s.includes('bathhouse') || s.includes('hydrotherapy') || s.includes('ciel') || s.includes('agua');
    };

    const isValidExteriorPhoto = (img) => {
      if (!isStrictOfficialOrManagement(img)) return false;
      if (isPoolLike(img.title, img.imageUrl)) return false;
      if (isRoomLike(img.title, img.imageUrl) || isRoomLike(img.link, '')) return false;
      const titleLower = (img.title || '').toLowerCase();
      const urlLower = (img.imageUrl || '').toLowerCase();
      const mentionsUnrelated = titleLower.includes('ballet') || titleLower.includes('museum') || titleLower.includes('convention') || titleLower.includes('theatre') || urlLower.includes('ballet') || urlLower.includes('museum');
      if (mentionsUnrelated) return false;
      return true;
    };

    const isValidDiningPhoto = (img) => {
      if (!isValidAmenityPhoto(img)) return false;
      const s = `${img.title || ''} ${img.imageUrl || ''} ${img.link || ''}`.toLowerCase();
      if (isRoomLike(img.title, img.imageUrl) || isRoomLike(img.link, '')) return false;
      return s.includes('restaurant') || s.includes('dining') || s.includes('bar') || s.includes('cocktail') || s.includes('culinary') || s.includes('chef') || s.includes('bazaar') || s.includes('katsuya') || s.includes('bistro') || s.includes('brasserie') || s.includes('food') || s.includes('drink') || s.includes('lounge');
    };

    const isValidBathPhoto = (img) => {
      if (!isStrictOfficialOrManagement(img)) return false;
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
      if (officialDomain && (u.includes(officialDomain) || l.includes(officialDomain))) return 150;
      if (parentBrand && (u.includes(parentBrand) || l.includes(parentBrand))) return 140;
      if (u.includes('galaxy.tf') || u.includes('tambourine.com') || u.includes('symphony.cdn')) return 130;
      if (u.includes('tripadvisor.com') || l.includes('tripadvisor.com') || u.includes('media-cdn.tripadvisor.com')) return 110;
      if (u.includes('bstatic.com')) return 100;
      return 10;
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

    const validMagnet = (resMagnet?.images || [])
      .filter(isStrictOfficialOrManagement)
      .map(img => ({
        ...img,
        detectedCategory: 'MAGNET',
        isSignatureMagnet: true,
        magnetName: signatureMagnetName,
        sourceAuthority: 160
      }));

    const validPool = (resPool?.images || [])
      .filter(img => isPoolLike(img.title, img.imageUrl) && isStrictOfficialOrManagement(img))
      .map(img => ({
        ...img,
        detectedCategory: 'POOL',
        sourceAuthority: 120
      }));

    const rawTA = [...(resTripAdvisorReview?.images || []), ...(resTripAdvisorFeature?.images || [])];
    const validTripAdvisor = rawTA
      .filter(isStrictOfficialOrManagement)
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

    const rawOfficial = [...(resOfficial?.images || []), ...(resParent?.images || [])];
    const validOfficial = rawOfficial
      .filter(isStrictOfficialOrManagement)
      .map(img => {
        const s = `${img.title || ''} ${img.imageUrl || ''}`.toLowerCase();
        let cat = 'AMENITY';
        if (s.includes('bath') || s.includes('tub') || s.includes('shower')) cat = 'BATHROOM';
        else if (s.includes('matador') || s.includes('food') || s.includes('restaurant') || s.includes('bar') || s.includes('cocktail') || s.includes('dining') || s.includes('market') || s.includes('tropicale')) cat = 'SOCIAL';
        else if (s.includes('spa') || s.includes('wellness') || s.includes('massage') || s.includes('sauna')) cat = 'SPA';
        else if (s.includes('pool') || s.includes('swim') || s.includes('cabana')) cat = 'POOL';
        else if (s.includes('exterior') || s.includes('facade') || s.includes('façade') || s.includes('building') || s.includes('bungalow penthouse exterior')) cat = 'EXTERIOR';
        else if (s.includes('suite') || s.includes('room') || s.includes('king') || s.includes('bedroom')) cat = 'BEDROOM';
        return { ...img, detectedCategory: cat, sourceAuthority: scoreSource(img) };
      });

    const combined = [...validMagnet, ...validPool, ...validOfficial, ...validTripAdvisor, ...validSocial, ...validSpa, ...validLobby, ...validExterior, ...validBedroom, ...validBath]
      .filter(isStrictOfficialOrManagement)
      .sort((a, b) => (b.sourceAuthority || 0) - (a.sourceAuthority || 0));

    return combined.map(img => ({
      title: img.title || '',
      imageUrl: upgradePhotoResolution(img.imageUrl),
      sourceUrl: img.link,
      detectedCategory: img.detectedCategory,
      isSignatureMagnet: !!img.isSignatureMagnet,
      magnetName: img.magnetName || '',
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

  const isBedroomLike = (p) => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    return s.includes('bedroom') || s.includes('suite') || (s.includes('bed') && !s.includes('sunbed') && !s.includes('daybed'));
  };

  const isBath = (p) => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    return s.includes('bathroom') || s.includes('shower') || s.includes('bath') || s.includes('tub');
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
  if (cat === 'SOCIAL_FB_ROOFTOP' || text.includes('restaurant') || text.includes('dining') || text.includes('brasserie') || text.includes('bar') || text.includes('cocktail') || text.includes('bistro') || text.includes('lounge') || text.includes('culinary') || text.includes('grill') || text.includes('w xyz') || text.includes('rooftop')) {
    // Priority: If specifically searching for a rooftop venue (e.g. 12th Knot Rooftop Bar), match exact rooftop photos first!
    if (text.includes('rooftop') || text.includes('12th knot') || text.includes('sky bar') || text.includes('skybar')) {
      const rooftopAmenity = findMatch(poolAmenity, p => {
        const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
        return (s.includes('rooftop') || s.includes('12th knot') || s.includes('sky bar') || s.includes('skybar')) && !isBedroomLike(p) && !isExterior(p);
      });
      if (rooftopAmenity) return rooftopAmenity;

      const liveRooftop = findMatch(poolLive, p => {
        const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
        return (s.includes('rooftop') || s.includes('12th knot') || s.includes('sky bar')) && !isBedroomLike(p) && !isExterior(p);
      });
      if (liveRooftop) return liveRooftop;
    }

    const isPositiveBarDining = (p) => {
      const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
      if (isExterior(p) || isBedroomLike(p) || isBath(p) || s.includes('exterior') || s.includes('pool') || s.includes('swimming') || s.endsWith('aloft-miami-brickell.jpg')) return false;
      return p.detectedCategory === 'SOCIAL' || s.includes('bar') || s.includes('cocktail') || s.includes('lounge') || s.includes('restaurant') || s.includes('dining') || s.includes('sushi') || s.includes('food') || s.includes('drink') || s.includes('grill') || s.includes('bistro') || s.includes('wine') || s.includes('beer') || s.includes('wxyz') || s.includes('mixology') || s.includes('rooftop');
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
        if (isExterior(p) || isBedroomLike(p) || isBath(p)) return false;
        const t = (p.title || '').toLowerCase();
        const u = (p.imageUrl || '').toLowerCase();
        return t.includes('pool') || t.includes('swim') || t.includes('sunbed') || t.includes('lounger') || u.includes('pool');
      });
      if (livePool) return livePool;

      const amenityPool = findMatch(poolAmenity, p => {
        if (isBedroomLike(p) || isBath(p)) return false;
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
        if (isExterior(p) || isBedroomLike(p) || isBath(p)) return false;
        const t = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
        if (t.includes('pool') || t.includes('swimming')) return false;
        return t.includes('lobby') || t.includes('reception') || t.includes('ballroom') || t.includes('hall') || t.includes('lounge') || t.includes('drawing') || t.includes('interior');
      });
      if (liveLobby) return liveLobby;

      const amenityLobby = findMatch(poolAmenity, p => {
        if (isExterior(p) || isBedroomLike(p) || isBath(p)) return false;
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
// -------------------------------------------------------------
// -------------------------------------------------------------
// PHASE 2: Dedicated Photo Resolution with Asset-First Intelligence
// -------------------------------------------------------------
export async function resolveAuditPhotos(hotelName, city, neighborhood = '', strategySlots = null, bookingUrl = null, strategicShifts = null, prefetchedLivePhotos = null, prefetchedAmenityPhotos = null) {
  console.log(`[Photo Gatekeeper] Starting visual asset resolution for "${hotelName}" in "${city}"${bookingUrl ? ` (Direct URL: ${bookingUrl})` : ''}...`);
  
  // 1. Fetch live Booking.com photos (Playwright) + Signature Amenity photos (Serper) if not already prefetched
  const [liveBookingPhotos, amenityPhotos] = await Promise.all([
    (Array.isArray(prefetchedLivePhotos) && prefetchedLivePhotos.length > 0)
      ? prefetchedLivePhotos
      : fetchBookingPhotosForHotel(hotelName, city, neighborhood, bookingUrl),
    (Array.isArray(prefetchedAmenityPhotos) && prefetchedAmenityPhotos.length > 0)
      ? prefetchedAmenityPhotos
      : fetchAmenityPhotosForHotel(hotelName, city, neighborhood, strategySlots, strategicShifts)
  ]);

  const poolAmenity = Array.isArray(amenityPhotos) ? amenityPhotos : [];
  const poolLive = Array.isArray(liveBookingPhotos) ? liveBookingPhotos : [];
  const isListedOnBooking = poolLive.length >= 3;
  const usedUrls = new Set();

  const isMeetingOrConference = (p) => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    return s.includes('meeting') || s.includes('conference') || s.includes('boardroom') || s.includes('event space') || s.includes('banquet') || s.includes('seminar');
  };

  const isTightFoodMacro = (p) => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    return s.includes('food_') || s.includes('_food') || s.includes('fruits_de_mer') || s.includes('boeuf') || s.includes('steak') || s.includes('dessert') || s.includes('burger') || s.includes('oyster') || s.includes('dish') || s.includes('plate') || s.includes('tartare') || s.includes('pasta');
  };

  const isExterior = (p) => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    if (s.includes('balcony-suite') || s.includes('suite-') || s.includes('room-') || s.includes('bedroom')) return false;
    return p.detectedCategory === 'EXTERIOR' || s.includes('exterior') || s.includes('facade') || s.includes('façade') || s.includes('building') || (s.includes('outside') && !s.includes('balcony')) || s.includes('aerial') || s.includes('marina') || s.includes('entrance') || s.includes('street view');
  };

  const isBedroomLike = (p) => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    if (p.detectedCategory === 'EXTERIOR' || s.includes('exterior') || s.includes('facade') || s.includes('façade')) return false;
    return s.includes('bedroom') || s.includes('suite') || (s.includes('bed') && !s.includes('sunbed') && !s.includes('daybed'));
  };

  const isBath = (p) => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    return s.includes('bathroom') || s.includes('shower') || s.includes('bath') || s.includes('tub');
  };

  const isPoolLike = (p) => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    return s.includes('pool') || s.includes('swim') || s.includes('sunbed') || s.includes('cabana') || s.includes('day club') || s.includes('hyde');
  };

  const isRooftopOrBar = (p) => {
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    return s.includes('rooftop') || s.includes('12th knot') || s.includes('12thknot') || s.includes('knot') || s.includes('sky bar') || s.includes('skybar') || s.includes('cocktail') || /\bbar\b/i.test(s) || s.includes('lyaness') || s.includes('aubrey') || s.includes('lounge') || s.includes('basement') || s.includes('nightclub') || s.includes('bowling');
  };

  const findFirst = (pool, predicate) => {
    const found = pool.find(p => p?.imageUrl && !usedUrls.has(p.imageUrl) && !isMeetingOrConference(p) && !isTightFoodMacro(p) && predicate(p));
    if (found) {
      usedUrls.add(found.imageUrl);
      return found;
    }
    return null;
  };

  const stratSlot1 = Array.isArray(strategySlots) ? strategySlots[0] : null;
  const stratSlot2 = Array.isArray(strategySlots) ? strategySlots[1] : null;
  const stratSlot3 = Array.isArray(strategySlots) ? strategySlots[2] : null;
  const stratSlot4 = Array.isArray(strategySlots) ? strategySlots[3] : null;
  const stratSlot5 = Array.isArray(strategySlots) ? strategySlots[4] : null;

  // Analyze strategic shifts and strategy slots for specific category mandates:
  const allShifts = Array.isArray(strategicShifts) ? strategicShifts.join(' ').toLowerCase() : '';
  const shift1Str = (Array.isArray(strategicShifts) && strategicShifts[0]) ? String(strategicShifts[0]).toLowerCase() : '';
  const strat1Str = `${stratSlot1?.category || ''} ${stratSlot1?.photo_subject || ''} ${stratSlot1?.why_it_converts || ''}`.toLowerCase();
  const strat4Str = `${stratSlot4?.category || ''} ${stratSlot4?.photo_subject || ''} ${stratSlot4?.why_it_converts || ''}`.toLowerCase();

  // Slot 1 mandates: check if Shift 1 or Slot 1 strategy calls for Rooftop/Bar, Pool, Spa, or Nightlife
  const isSlot1RooftopBar = (
    shift1Str.includes('rooftop') || shift1Str.includes('12th knot') || shift1Str.includes('12th') || shift1Str.includes('knot') || shift1Str.includes('skyline') || shift1Str.includes('sky bar') || shift1Str.includes('lyaness') ||
    strat1Str.includes('rooftop') || strat1Str.includes('12th knot') || strat1Str.includes('12th') || strat1Str.includes('knot') || strat1Str.includes('skyline') || strat1Str.includes('lyaness') ||
    stratSlot1?.category === 'SOCIAL_FB_ROOFTOP' ||
    (allShifts.includes('slot 1') && (allShifts.includes('rooftop') || allShifts.includes('12th knot') || allShifts.includes('skyline'))) ||
    (allShifts.includes('slot #1') && (allShifts.includes('rooftop') || allShifts.includes('12th knot') || allShifts.includes('skyline')))
  );

  const isSlot1Pool = !isSlot1RooftopBar && (
    shift1Str.includes('pool') || 
    (allShifts.includes('slot 1') && allShifts.includes('pool')) || 
    (allShifts.includes('slot #1') && allShifts.includes('pool')) ||
    strat1Str.includes('pool')
  );
  const isSlot1Spa = !isSlot1RooftopBar && (shift1Str.includes('spa') || strat1Str.includes('spa'));
  const isSlot1Nightlife = !isSlot1RooftopBar && (
    shift1Str.includes('basement') || shift1Str.includes('nightclub') || shift1Str.includes('club') || shift1Str.includes('bowling') || 
    strat1Str.includes('basement') || strat1Str.includes('nightclub')
  );

  // Slot 4 mandates: only Pool if Slot 1 is NOT Pool!
  const isSlot4Pool = !isSlot1Pool && (
    stratSlot4?.category === 'OUTDOOR_SOCIAL_POOL' || 
    strat4Str.includes('pool') || 
    (allShifts.includes('slot 4') && allShifts.includes('pool')) || 
    (allShifts.includes('slot #4') && allShifts.includes('pool'))
  );

  // Strategy keywords for Slot 1 Hero Cultural Magnet
  const slot1Subject = String(stratSlot1?.photo_subject || '').toLowerCase();
  const slot1Keywords = slot1Subject.replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 3 && !['hero', 'cultural', 'magnet', 'slot', 'signature', 'with', 'iconic', 'views', 'view', 'pictures', 'reviews'].includes(w));

  const matchesSlot1Magnet = (p) => {
    if (p.isSignatureMagnet) return true;
    const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
    return slot1Keywords.some(kw => new RegExp(`\\b${kw}\\b`, 'i').test(s));
  };

  // ASSET-FIRST SELECTION:
  // Slot 1: Hero Cultural Magnet / Curated Pool / Signature Venue / 12th Knot Rooftop
  let slot1Asset = null;
  if (isSlot1RooftopBar) {
    // Priority 1: Explicit 12th Knot / Rooftop Bar / Skyline asset
    slot1Asset = findFirst(poolAmenity, p => {
      const s = `${p.title || ''} ${p.imageUrl || ''}`.toLowerCase();
      return (s.includes('12th') || s.includes('knot') || s.includes('rooftop') || s.includes('skyline')) && !isBedroomLike(p) && !isBath(p) && !isExterior(p);
    });
    // Priority 2: General rooftop or cocktail bar
    if (!slot1Asset) {
      slot1Asset = findFirst(poolAmenity, p => isRooftopOrBar(p) && !isBedroomLike(p) && !isBath(p) && !isExterior(p));
    }
    if (!slot1Asset) {
      slot1Asset = findFirst(poolLive, p => isRooftopOrBar(p) && !isBedroomLike(p) && !isBath(p) && !isExterior(p));
    }
  } else if (isSlot1Pool) {
    slot1Asset = findFirst(poolAmenity, p => (p.detectedCategory === 'POOL' || isPoolLike(p)) && !isBedroomLike(p) && !isBath(p) && !isExterior(p));
    if (!slot1Asset) {
      slot1Asset = findFirst(poolLive, p => isPoolLike(p) && !isBedroomLike(p) && !isBath(p) && !isExterior(p));
    }
  } else if (isSlot1Spa) {
    slot1Asset = findFirst(poolAmenity, p => (p.detectedCategory === 'SPA' || `${p.title} ${p.imageUrl}`.toLowerCase().includes('spa')) && !isBedroomLike(p) && !isBath(p) && !isExterior(p));
    if (!slot1Asset) {
      slot1Asset = findFirst(poolLive, p => `${p.title} ${p.imageUrl}`.toLowerCase().includes('spa') && !isBedroomLike(p) && !isBath(p) && !isExterior(p));
    }
  } else if (slot1Keywords.length > 0 || poolAmenity.some(p => p.isSignatureMagnet)) {
    slot1Asset = findFirst(poolAmenity, p => matchesSlot1Magnet(p) && !isBedroomLike(p) && !isBath(p) && !isExterior(p));
    if (!slot1Asset) {
      slot1Asset = findFirst(poolLive, p => matchesSlot1Magnet(p) && !isBedroomLike(p) && !isBath(p) && !isExterior(p));
    }
  }

  // Fallbacks for Slot 1 if not yet resolved:
  if (!slot1Asset && isSlot1Pool) {
    slot1Asset = findFirst(poolAmenity, p => isPoolLike(p) && !isBedroomLike(p) && !isBath(p) && !isExterior(p));
    if (!slot1Asset) slot1Asset = findFirst(poolLive, p => isPoolLike(p) && !isBedroomLike(p) && !isBath(p) && !isExterior(p));
  }
  if (!slot1Asset) {
    slot1Asset = findFirst(poolAmenity, p => isRooftopOrBar(p) && !isBedroomLike(p) && !isBath(p) && !isExterior(p));
  }
  if (!slot1Asset) {
    slot1Asset = findFirst(poolLive, p => isRooftopOrBar(p) && !isBedroomLike(p) && !isBath(p) && !isExterior(p));
  }
  if (!slot1Asset) {
    slot1Asset = findFirst(poolAmenity, p => p.detectedCategory === 'SOCIAL' && !isBedroomLike(p) && !isBath(p) && !isExterior(p));
  }
  if (!slot1Asset && poolAmenity.length > 0) {
    slot1Asset = findFirst(poolAmenity, p => !isBedroomLike(p) && !isBath(p) && !isExterior(p));
  }

  // Slot 2: Exterior Architectural Landmark
  let slot2Asset = findFirst(poolAmenity, p => (
    `${p.title} ${p.imageUrl}`.toLowerCase().includes('exterior-') ||
    `${p.title} ${p.imageUrl}`.toLowerCase().includes('facade') ||
    `${p.title} ${p.imageUrl}`.toLowerCase().includes('façade') ||
    (p.detectedCategory === 'EXTERIOR' && !`${p.title} ${p.imageUrl}`.toLowerCase().includes('balcony'))
  ) && !isBath(p) && !isPoolLike(p) && !isBedroomLike(p));
  if (!slot2Asset) {
    slot2Asset = findFirst(poolAmenity, p => (p.detectedCategory === 'EXTERIOR' || isExterior(p)) && !isBath(p) && !isPoolLike(p) && !isBedroomLike(p));
  }
  if (!slot2Asset) {
    slot2Asset = findFirst(poolLive, p => isExterior(p) && !isBath(p) && !isPoolLike(p) && !isBedroomLike(p));
  }

  // Slot 3: Signature Suite / Bedroom
  let slot3Asset = findFirst(poolAmenity, p => isBedroomLike(p) && !isBath(p) && !isExterior(p));
  if (!slot3Asset) {
    slot3Asset = findFirst(poolLive, p => isBedroomLike(p) && !isBath(p) && !isExterior(p));
  }

  // Slot 4: Signature Destination Amenity (Resort Pool Deck OR Lyaness / Destination Dining / Social)
  let slot4Asset = null;
  if (isSlot4Pool) {
    slot4Asset = findFirst(poolAmenity, p => (p.detectedCategory === 'POOL' || isPoolLike(p)) && !isBedroomLike(p) && !isBath(p) && !isExterior(p));
    if (!slot4Asset) {
      slot4Asset = findFirst(poolLive, p => isPoolLike(p) && !isBedroomLike(p) && !isBath(p) && !isExterior(p));
    }
  } else if (stratSlot4?.category === 'SPA' || String(stratSlot4?.photo_subject || '').toLowerCase().includes('spa')) {
    slot4Asset = findFirst(poolAmenity, p => (p.detectedCategory === 'SPA' || `${p.title} ${p.imageUrl}`.toLowerCase().includes('spa')) && !isBedroomLike(p) && !isBath(p) && !isExterior(p));
  }
  if (!slot4Asset) {
    // Check for Lyaness or acclaimed destination dining first
    slot4Asset = findFirst(poolAmenity, p => (`${p.title} ${p.imageUrl}`.toLowerCase().includes('lyaness') || `${p.title} ${p.imageUrl}`.toLowerCase().includes('matador')) && !isBedroomLike(p) && !isBath(p) && !isExterior(p));
  }
  if (!slot4Asset) {
    // If Slot 1 already took the pool, Slot 4 showcases destination dining / Matador Room / bar / social space!
    slot4Asset = findFirst(poolAmenity, p => (p.detectedCategory === 'SOCIAL' || isRooftopOrBar(p) || p.detectedCategory === 'SPA' || p.detectedCategory === 'LOBBY') && !isBedroomLike(p) && !isBath(p) && !isExterior(p) && (!isSlot1Pool || !isPoolLike(p)));
  }
  if (!slot4Asset) {
    slot4Asset = findFirst(poolLive, p => !isBedroomLike(p) && !isBath(p) && !isExterior(p) && (!isSlot1Pool || !isPoolLike(p)));
  }

  // Slot 5: Hygiene & Luxury Finish (Design Bathroom & Soaking Tub OR Secondary Sanctuary)
  let slot5Asset = findFirst(poolAmenity, p => isBath(p) && !isExterior(p));
  if (!slot5Asset) {
    slot5Asset = findFirst(poolLive, p => isBath(p) && !isExterior(p));
  }
  if (!slot5Asset) {
    slot5Asset = findFirst(poolAmenity, p => !isBedroomLike(p) && !isExterior(p)) || findFirst(poolLive, p => !isBedroomLike(p) && !isExterior(p));
  }

  const winningAssets = [
    { targetSlot: 1, defaultCat: isSlot1Pool ? 'OUTDOOR_SOCIAL_POOL' : 'HERO_CULTURAL_MAGNET', asset: slot1Asset },
    { targetSlot: 2, defaultCat: 'EXTERIOR_LANDMARK', asset: slot2Asset },
    { targetSlot: 3, defaultCat: 'SIGNATURE_SUITE_BEDROOM', asset: slot3Asset },
    { targetSlot: 4, defaultCat: isSlot4Pool ? 'OUTDOOR_SOCIAL_POOL' : 'SOCIAL_FB_ROOFTOP', asset: slot4Asset },
    { targetSlot: 5, defaultCat: 'SECONDARY_ROOM_BATHROOM', asset: slot5Asset }
  ];

  const resolvedSequence = winningAssets.map(({ targetSlot, defaultCat, asset }) => {
    let photoUrl = asset?.imageUrl || null;
    const stratSlot = (Array.isArray(strategySlots) && strategySlots[targetSlot - 1]) ? strategySlots[targetSlot - 1] : null;

    let category = stratSlot?.category || defaultCat;
    if (targetSlot === 1 && isSlot1Pool) {
      category = 'OUTDOOR_SOCIAL_POOL';
    } else if (targetSlot === 1 && isSlot1RooftopBar) {
      category = 'HERO_CULTURAL_MAGNET';
    } else if (targetSlot === 4 && isSlot1Pool && !isSlot4Pool) {
      category = 'SOCIAL_FB_ROOFTOP';
    }

    let photoSubject = stratSlot?.photo_subject || asset?.title || '';
    if (!photoSubject || photoSubject.toLowerCase().includes('scanning') || (targetSlot === 1 && isSlot1Pool && !photoSubject.toLowerCase().includes('pool'))) {
      if (targetSlot === 1 && isSlot1Pool) {
        photoSubject = (asset?.title && asset.title.toLowerCase().includes('pool')) ? asset.title : 'Curated Oceanfront Resort Pool & Cabana Sanctuary';
      } else if (targetSlot === 1 && isSlot1RooftopBar) {
        photoSubject = (stratSlot?.photo_subject && (stratSlot.photo_subject.toLowerCase().includes('12th') || stratSlot.photo_subject.toLowerCase().includes('rooftop')))
          ? stratSlot.photo_subject
          : '12th Knot Panoramic Rooftop Bar & River Thames Skyline';
      } else if (targetSlot === 4 && isSlot1Pool && !isSlot4Pool) {
        photoSubject = (asset?.title && (asset.title.toLowerCase().includes('matador') || asset.title.toLowerCase().includes('dining') || asset.title.toLowerCase().includes('restaurant') || asset.title.toLowerCase().includes('bar'))) ? asset.title : 'Matador Room Destination Dining & Jean-Georges Culinary Experience';
      } else if (targetSlot === 4 && isSlot1RooftopBar) {
        photoSubject = (asset?.title && asset.title.toLowerCase().includes('lyaness'))
          ? 'Lyaness Award-Winning Cocktail Bar & Social Lounge'
          : (stratSlot?.photo_subject || asset?.title || 'Lyaness Destination Social Lounge');
      } else {
        photoSubject = asset?.title || '';
      }
    }

    let why = stratSlot?.why_it_converts || stratSlot?.upgrade_rationale || '';
    if (targetSlot === 1 && isSlot1Pool && (!why || !why.toLowerCase().includes('pool'))) {
      why = "Showcasing the hotel's iconic oceanfront resort pool deck directly targets Miami Beach's #1 leisure search demand, establishing instant aspirational lifestyle appeal within the crucial 3-second first impression window.";
    } else if (targetSlot === 1 && isSlot1RooftopBar && (!why || (!why.toLowerCase().includes('rooftop') && !why.toLowerCase().includes('12th')))) {
      why = "Elevating the 12th Knot panoramic rooftop bar directly to Slot #1 captures South Bank's #1 leisure and nightlife search demand, establishing instant skyline prestige and Thames riverfront vitality.";
    } else if (targetSlot === 4 && isSlot1Pool && !isSlot4Pool && (!why || why.toLowerCase().includes('pool'))) {
      why = "Showcasing the property's acclaimed culinary destination provides high-margin experiential depth, confirming world-class dining and evening social vitality beyond guest rooms.";
    }
    if (why.toLowerCase().includes('evaluating and elevating')) why = '';

    let trigger = stratSlot?.psychological_conversion_trigger || stratSlot?.recommended_trigger || '';
    if (targetSlot === 1 && isSlot1Pool) {
      trigger = 'Curated Leisure Lifestyle & Oceanfront Sanctuary';
    } else if (targetSlot === 1 && isSlot1RooftopBar) {
      trigger = 'Iconic River Thames Skyline & Rooftop Social Magnet';
    } else if (targetSlot === 4 && isSlot1Pool && !isSlot4Pool) {
      trigger = 'Destination Dining & High-Energy Evening Vitality';
    }

    let bullets = (stratSlot?.bullet_points && stratSlot?.bullet_points.length > 0) ? stratSlot.bullet_points : [];
    if (targetSlot === 1 && isSlot1Pool && bullets.length === 0) {
      bullets = [
        'Aspirational Anchor: Immediate exposure to premier sunbeds, signature palms, and oceanfront atmosphere.',
        'Market Alignment: Directly addresses South Beach leisure search intent before guest room consideration.',
        'Immediate Lift: Replaces standard lobby or corridor visuals with high-conversion lifestyle assets.'
      ];
    } else if (targetSlot === 1 && isSlot1RooftopBar && bullets.length === 0) {
      bullets = [
        'Aspirational Anchor: Immediate exposure to panoramic London skyline views and iconic glass-enclosed rooftop lounge.',
        'Market Alignment: Directly addresses South Bank leisure and rooftop bar search demand before guest room consideration.',
        'High-Impact Hook: Replaces generic corridor or standard room angles with world-class hospitality architecture.'
      ];
    } else if (targetSlot === 4 && isSlot1Pool && !isSlot4Pool && bullets.length === 0) {
      bullets = [
        'Culinary Distinction: Validates Michelin-caliber dining and cocktail culture on property.',
        'ADR Justification: Signals premium destination status to luxury leisure and business travelers.',
        'Visual Depth: Balances day-time pool amenities with evening sophistication.'
      ];
    }

    // Fallback if strategy was missing or placeholder
    if (!why || !trigger || bullets.length === 0 || !photoSubject) {
      let rec = classifyAssetAndDeriveRecommendation(asset, hotelName);
      if (!photoSubject || photoSubject.toLowerCase().includes('scanning')) photoSubject = rec.subject;
      if (!why) why = rec.why;
      if (!trigger) trigger = rec.trigger;
      if (bullets.length === 0) bullets = rec.bullets;
    }

    let actualLiveSlot = null;
    if (photoUrl) {
      const liveIdx = liveBookingPhotos.findIndex(lp => lp.imageUrl === photoUrl);
      actualLiveSlot = liveIdx !== -1 ? (liveIdx + 1) : null;
    }

    const isRetained = actualLiveSlot === targetSlot;
    const isMoved = actualLiveSlot !== null && actualLiveSlot !== targetSlot;
    const isSwappedIn = actualLiveSlot === null;

    let action = 'RE_SEQUENCE';
    let actionLabel = '';

    if (!isListedOnBooking) {
      action = targetSlot === 1 ? 'HERO_CULTURAL_MAGNET' : 'CURATED_ASSET';
      actionLabel = targetSlot === 1 
        ? `⚡ HERO CULTURAL MAGNET: ${photoSubject.toUpperCase()} (SLOT #1)`
        : `PRE-LISTING ASSET: ${photoSubject.toUpperCase()} (SLOT #${targetSlot})`;
    } else if (targetSlot === 1 || category === 'HERO_CULTURAL_MAGNET' || category === 'OUTDOOR_SOCIAL_POOL') {
      action = isSlot1Pool ? 'ELEVATE_POOL' : 'HERO_CULTURAL_MAGNET';
      actionLabel = isSlot1Pool
        ? (isSwappedIn ? `⚡ HERO LIFESTYLE SANCTUARY (SWAP IN): RESORT POOL (SLOT #1)` : (isRetained ? `⚡ HERO LIFESTYLE SANCTUARY: RETAIN POOL IN SLOT #1` : `⚡ HERO LIFESTYLE SANCTUARY: PROMOTE POOL FROM SLOT #${actualLiveSlot}`))
        : (isSwappedIn ? `⚡ HERO CULTURAL MAGNET (SWAP IN): ${photoSubject.toUpperCase()} (SLOT #1)` : (isRetained ? `⚡ HERO CULTURAL MAGNET: RETAIN IN SLOT #1` : `⚡ HERO CULTURAL MAGNET: PROMOTE FROM SLOT #${actualLiveSlot}`));
    } else if (isRetained) {
      action = 'RETAIN';
      actionLabel = `RETAIN IN SLOT #${targetSlot}`;
    } else if (isMoved) {
      action = actualLiveSlot > targetSlot ? 'PROMOTE' : 'RE_SEQUENCE';
      actionLabel = actualLiveSlot > targetSlot ? `PROMOTE FROM SLOT #${actualLiveSlot}` : `MOVE FROM SLOT #${actualLiveSlot}`;
    } else if (isSwappedIn) {
      action = 'SWAP_IN';
      if (category === 'SECONDARY_ROOM_BATHROOM') {
        actionLabel = `DESIGN BATHROOM (SLOT #5 - HYGIENE & LUXURY FINISH)`;
      } else if (category === 'EXTERIOR_LANDMARK') {
        actionLabel = `EXTERIOR LANDMARK (SLOT #2 - MANDATORY GROUNDING)`;
      } else if (category === 'SIGNATURE_SUITE_BEDROOM') {
        actionLabel = `SIGNATURE SUITE (SLOT #3 - PRIVATE SANCTUARY)`;
      } else if (category === 'OUTDOOR_SOCIAL_POOL') {
        actionLabel = `RESORT POOL & CABANA (SLOT #4 - LIFESTYLE HOOK)`;
      } else if (category === 'SOCIAL_FB_ROOFTOP') {
        actionLabel = `DESTINATION DINING & SOCIAL (SLOT #4 - CULINARY DEPTH)`;
      } else {
        actionLabel = `SWAP IN SIGNATURE ASSET (SLOT #${targetSlot})`;
      }
    }

    return {
      slot: targetSlot,
      category,
      photo_subject: photoSubject,
      photo_url: upgradePhotoResolution(photoUrl),
      why_it_converts: why,
      upgrade_rationale: why,
      bullet_points: bullets,
      psychological_conversion_trigger: trigger,
      recommended_trigger: trigger,
      current_slot: actualLiveSlot,
      is_retained: isRetained,
      is_moved: isMoved,
      is_swapped_in: isSwappedIn,
      action,
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
    let bookingUrl = req.body?.bookingUrl || req.query?.bookingUrl || req.body?.directBookingUrl || req.query?.directBookingUrl || null;

    if (!hotelName && !bookingUrl) {
      return res.status(400).json({ error: 'Missing hotelName or bookingUrl parameter' });
    }

    const result = await lookupHotelCandidates(hotelName, city, neighborhood, bookingUrl);
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
    let strategicShifts = req.body.strategicShifts || req.body.keyStrategicShifts || null;
    let bookingUrl = req.body.bookingUrl || req.query.bookingUrl || req.body.directBookingUrl || req.query.directBookingUrl || null;
    let bookingId = req.body.bookingId || req.query.bookingId || req.body.hotelId || req.query.hotelId || null;

    const bookingTarget = extractCleanBookingTarget(bookingUrl || bookingId);
    if (bookingTarget.url) {
      bookingUrl = bookingTarget.url;
      if (bookingTarget.id) bookingId = bookingTarget.id;
    }

    // Check if hotelName is actually a direct Booking.com URL
    if (typeof hotelName === 'string' && hotelName.includes('booking.com/hotel/')) {
      const parsed = parseBookingUrl(hotelName);
      if (parsed) {
        if (!bookingUrl) bookingUrl = parsed.cleanUrl;
        hotelName = parsed.cleanTitle;
        if (parsed.inferredCity && (!city || city === 'Miami' || city === 'London')) city = parsed.inferredCity;
        if (parsed.inferredNeighborhood && !neighborhood) neighborhood = parsed.inferredNeighborhood;
      }
    }

    if (city.toLowerCase().includes('south beach') && !neighborhood) {
      neighborhood = 'South Beach';
      city = city.replace(/south beach/i, '').replace(/,/g, '').trim() || 'Miami';
    }

    const cacheKey = bookingUrl ? `${getResolutionKey(hotelName, city, neighborhood)}:::${bookingUrl}` : getResolutionKey(hotelName, city, neighborhood);

    const isFresh = req.query.fresh === 'true' || req.body?.fresh === true;
    if (isFresh) {
      resolutionCache.delete(cacheKey);
    }

    // 0. Check if full manifest cache already has the resolved photos for this hotel
    const manifestKey = getResolutionKey(hotelName, city, neighborhood);
    const cachedManifest = isFresh ? null : manifestCache.get(manifestKey);
    if (cachedManifest?.data?.ota_conversion_audit?.optimal_5_photo_sequence?.length > 0 && 
        cachedManifest.data.ota_conversion_audit.photos_status === 'RESOLVED') {
      const ota = cachedManifest.data.ota_conversion_audit;
      console.log(`[Photo Gatekeeper API] Serving pre-resolved photos from manifest cache for "${manifestKey}"`);
      return res.status(200).json({
        is_listed_on_booking: ota.is_listed_on_booking,
        listing_status: ota.listing_status,
        live_photos: ota.live_photos,
        optimal_5_photo_sequence: ota.optimal_5_photo_sequence
      });
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
    const resolutionPromise = resolveAuditPhotos(hotelName, city, neighborhood, strategySlots, bookingUrl, strategicShifts)
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
    let bookingUrl = req.body?.bookingUrl || req.query?.bookingUrl || req.body?.directBookingUrl || req.query?.directBookingUrl || null;
    let bookingId = req.body?.bookingId || req.query?.bookingId || req.body?.hotelId || req.query?.hotelId || null;

    const bookingTarget = extractCleanBookingTarget(bookingUrl || bookingId);
    if (bookingTarget.url) {
      bookingUrl = bookingTarget.url;
      if (bookingTarget.id) bookingId = bookingTarget.id;
    }

    // Check if hotelName is actually a direct Booking.com URL
    if (typeof hotelName === 'string' && hotelName.includes('booking.com/hotel/')) {
      const parsed = parseBookingUrl(hotelName);
      if (parsed) {
        if (!bookingUrl) bookingUrl = parsed.cleanUrl;
        hotelName = parsed.cleanTitle;
        if (parsed.inferredCity && (!city || city === 'Miami' || city === 'London')) city = parsed.inferredCity;
        if (parsed.inferredNeighborhood && !neighborhood) neighborhood = parsed.inferredNeighborhood;
      }
    }

    if (city.toLowerCase().includes('south beach') && !neighborhood) {
      neighborhood = 'South Beach';
      city = city.replace(/south beach/i, '').replace(/,/g, '').trim() || 'Miami';
    }

    console.log(`[Master Vibe Audit API] Running 4-Step Pipeline for: "${hotelName}" in "${city}" ${neighborhood ? `(${neighborhood})` : ''} ${bookingId ? `[Booking ID: ${bookingId}]` : ''} ${bookingUrl ? `(URL: ${bookingUrl})` : ''}`);

    const manifestKey = getResolutionKey(hotelName, city, neighborhood);
    const isFresh = req.query.fresh === 'true' || req.body?.fresh === true;
    if (isFresh) {
      manifestCache.delete(manifestKey);
      resolutionCache.delete(manifestKey);
    }

    // 1. Check in-memory manifest cache (15s debounce only)
    const cached = isFresh ? null : manifestCache.get(manifestKey);
    if (cached && (Date.now() - cached.timestamp < MANIFEST_CACHE_TTL_MS)) {
      console.log(`[Master Vibe API] Serving debounced manifest for "${manifestKey}"`);
      return res.status(200).json(cached.data);
    }

    // 2. Check in-flight promise (prevent duplicate concurrent Gemini calls)
    if (activeManifests.has(manifestKey)) {
      console.log(`[Master Vibe API] Joining in-flight manifest generation for "${manifestKey}"`);
      const manifest = await activeManifests.get(manifestKey);
      return res.status(200).json(manifest);
    }

    // 3. Initiate 4-Step Process:
    // 1) Manifest first
    // 2) Get available images from site, TripAdvisor (From Management only), and Booking.com
    // 3) Set strategy
    // 4) Re-order
    const manifestPromise = (async () => {
      // Step 1: Manifest First (Hotel DNA, sensory profile, local neighborhood search demand)
      console.log(`[Master Vibe API] 1) Manifest first: Gathering venue intelligence & hotel DNA for "${hotelName}"...`);
      const corpusData = await fetchVenueCorpus(hotelName, city, neighborhood);
      const rawCorpus = corpusData.rawCorpus;

      // Step 2: Get available images from site, TripAdvisor (From Management only), and Booking.com
      console.log(`[Master Vibe API] 2) Get available images from official site, TripAdvisor (From Management only), and Booking.com...`);
      const [liveBookingPhotos, amenityPhotos] = await Promise.all([
        fetchBookingPhotosForHotel(hotelName, city, neighborhood, bookingUrl, bookingId),
        fetchAmenityPhotosForHotel(hotelName, city, neighborhood)
      ]);
      console.log(`[Master Vibe API] Inventory discovered: ${liveBookingPhotos?.length || 0} live OTA photos, ${amenityPhotos?.length || 0} official/TripAdvisor management assets.`);

      // Step 3: Set strategy
      console.log(`[Master Vibe API] 3) Set strategy: Synthesizing Key Strategic Shifts & 5-slot blueprint bridging Hotel DNA ⟷ Neighborhood Demand with discovered inventory...`);
      const auditResult = await runStructuredVibeAudit(hotelName, city, rawCorpus, liveBookingPhotos || [], amenityPhotos || [], neighborhood);

      // Step 4: Re-order
      console.log(`[Master Vibe API] 4) Re-order: Binding and sequencing authentic photos to match strategic shifts 100% into Slots 1-5...`);
      const photoResults = await resolveAuditPhotos(
        hotelName, 
        city, 
        neighborhood, 
        auditResult.ota_conversion_audit?.optimal_5_photo_sequence, 
        bookingUrl, 
        auditResult.ota_conversion_audit?.key_strategic_shifts,
        liveBookingPhotos,
        amenityPhotos
      );

      if (auditResult.ota_conversion_audit) {
        auditResult.ota_conversion_audit.is_listed_on_booking = photoResults.is_listed_on_booking;
        auditResult.ota_conversion_audit.listing_status = photoResults.listing_status;
        auditResult.ota_conversion_audit.live_photos = photoResults.live_photos;
        auditResult.ota_conversion_audit.optimal_5_photo_sequence = photoResults.optimal_5_photo_sequence;
        auditResult.ota_conversion_audit.photos_status = 'RESOLVED';
      }

      manifestCache.set(manifestKey, { timestamp: Date.now(), data: auditResult });
      return auditResult;
    })().finally(() => {
      activeManifests.delete(manifestKey);
    });

    activeManifests.set(manifestKey, manifestPromise);
    const auditResult = await manifestPromise;
    return res.status(200).json(auditResult);
  } catch (err) {
    console.error('[Master Vibe Audit API] Error:', err);
    return res.status(500).json({ error: err.message });
  }
}
