import dotenv from 'dotenv';
dotenv.config();

const SERPER_API_KEY = process.env.SERPER_API_KEY || process.env.VITE_SERPER_API_KEY;

function getDistinctiveTokens(name) {
  if (!name) return [];
  const stopWords = new Set(['the', 'a', 'an', 'and', '&', 'hotel', 'hotels', 'inn', 'pub', 'bar', 'lounge', 'rooms', 'house', 'boutique', 'resort', 'spa', 'suites', 'b&b', 'bed', 'breakfast', 'restaurant', 'lodge', 'retreat', 'club', 'london', 'uk', 'miami', 'beach', 'south', 'north', 'city', 'downtown', 'knightsbridge', 'brickell']);
  return name.toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !stopWords.has(w));
}

function scoreCandidate(item, hotelName, city, neighborhood, brandTokens) {
  if (!item || !item.link) return -1;
  const slug = (item.link.split('booking.com/hotel/')[1] || '').toLowerCase();
  const title = (item.title || '').toLowerCase();
  const snippet = (item.snippet || '').toLowerCase();
  const text = `${slug} ${title} ${snippet}`;
  
  if (slug.includes('unit-at') || slug.includes('residence-with') || slug.includes('apartment') || slug.includes('private-mews') || title.includes('apartment') || title.includes('holiday home')) {
    return -100;
  }

  const isUS = /miami|orlando|new york|san diego|los angeles|chicago|boston|austin|seattle|vegas/i.test(`${city} ${neighborhood}`);
  const isUK = /london|manchester|edinburgh|birmingham|liverpool|bath|oxford|cambridge/i.test(`${city} ${neighborhood}`);

  let score = 0;
  if (isUS && !item.link.includes('/hotel/us/')) {
    score -= 150;
  }
  if (isUK && !item.link.includes('/hotel/gb/')) {
    score -= 150;
  }

  const matchesBrand = brandTokens.some(token => slug.includes(token) || title.includes(token));
  if (!matchesBrand) return -1;

  for (const token of brandTokens) {
    if (slug.includes(token)) score += 30;
    if (title.includes(token)) score += 20;
    if (snippet.includes(token)) score += 10;
  }

  const cleanHotel = hotelName.toLowerCase().replace(/\b(the|hotel|spa|resort|suites|inn|lodge|and|&)\b/gi, '').trim();
  if (cleanHotel && (title.includes(cleanHotel) || slug.includes(cleanHotel.replace(/\s+/g, '-')))) {
    score += 60;
  }

  if (neighborhood && text.includes(neighborhood.toLowerCase())) {
    score += 25;
  }
  if (city && text.includes(city.toLowerCase())) {
    score += 30;
  }
  if (hotelName.toLowerCase().includes('hyde park') && text.includes('hyde-park')) {
    score += 35;
  }
  if ((hotelName.toLowerCase().includes('knightsbridge') || (neighborhood && neighborhood.toLowerCase().includes('knightsbridge'))) && text.includes('hyde-park')) {
    score += 40;
  }

  return score;
}

async function resolveBookingUrl(hotelName, city, neighborhood = '') {
  const brandTokens = getDistinctiveTokens(hotelName);
  const cleanHotel = hotelName.replace(/\b(the|hotel|spa|resort|suites|inn|lodge|and|&)\b/gi, '').trim();

  const queries = [
    cleanHotel ? `site:booking.com/hotel/ "${cleanHotel}" ${city}` : null,
    `site:booking.com/hotel/ "${hotelName}"`,
    brandTokens.length > 0 ? `site:booking.com/hotel/ "${brandTokens.join(' ')}" ${city}` : null,
    brandTokens.length > 0 ? `site:booking.com/hotel/ "${brandTokens.join('-')}"` : null,
    brandTokens.length > 0 ? `site:booking.com/hotel/ ${brandTokens.join(' ')} ${neighborhood || ''} ${city}` : null
  ].filter(Boolean);

  let allCandidates = [];

  for (const q of queries) {
    const res = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q, num: 8 })
    });
    const data = await res.json();
    for (const item of (data.organic || [])) {
      if (item.link && item.link.includes('booking.com/hotel/')) {
        allCandidates.push(item);
      }
    }
  }

  let bestMatch = null;
  let bestScore = -1;

  for (const item of allCandidates) {
    const score = scoreCandidate(item, hotelName, city, neighborhood, brandTokens);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  }

  console.log(`[Resolved] "${hotelName}" => ${bestMatch?.link} (Score: ${bestScore})`);
  return (bestMatch && bestScore >= 20) ? bestMatch.link : null;
}

async function run() {
  await resolveBookingUrl('The Palms Hotel & Spa', 'Miami Beach', 'South Beach');
  await resolveBookingUrl('The Plymouth Hotel', 'Miami Beach', 'South Beach');
  await resolveBookingUrl('Aloft Miami Brickell', 'Miami', 'Brickell');
  await resolveBookingUrl('Mandarin Oriental Hyde Park, London', 'London', 'Knightsbridge');
  await resolveBookingUrl('Sea Containers London', 'London', 'Southwark');
}

run();
