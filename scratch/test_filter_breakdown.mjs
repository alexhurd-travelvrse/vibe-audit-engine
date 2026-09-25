import dotenv from 'dotenv';
dotenv.config();

const SERPER_API_KEY = process.env.VITE_SERPER_API_KEY || process.env.SERPER_API_KEY;
const hotelName = 'plymouth';
const city = 'miami';
const neighborhood = 'south beach';
const locationContext = `${neighborhood} ${city}`;

async function run() {
  const officialDomain = 'theplymouth.com';
  const domainFilter = `(site:${officialDomain} OR site:tripadvisor.com OR site:instagram.com OR site:facebook.com)`;
  const exclusions = '-wedding -bride -groom -couple -dress -menu';

  const resSocial = await fetch('https://google.serper.dev/images', {
    method: 'POST',
    headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: `"${hotelName}" ${locationContext} (restaurant OR bar OR cocktail OR lounge OR dining OR "w xyz") ${domainFilter} ${exclusions} -exterior -building -outside -facade -aerial -pool -bedroom -bathroom -motel`, num: 12 })
  }).then(r => r.json());

  const tokens = ['plymouth'];

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

  const isValidAmenityPhoto = (img) => {
    if (!img || !img.imageUrl) return { ok: false, reason: 'no_img' };
    if (isLowQualityDomain(img.imageUrl, img.title)) return { ok: false, reason: 'low_quality_domain' };
    if (isExteriorLike(img.title, img.imageUrl)) return { ok: false, reason: 'exterior_like' };
    if (isPoolLike(img.title, img.imageUrl)) return { ok: false, reason: 'pool_like' };
    
    const titleLower = (img.title || '').toLowerCase();
    const linkLower = (img.link || '').toLowerCase();
    const urlLower = (img.imageUrl || '').toLowerCase();
    const combined = `${titleLower} ${linkLower} ${urlLower}`;
    
    if (tokens.length > 0) {
      const matchesTargetToken = tokens.some(t => combined.includes(t)) || (officialDomain && combined.includes(officialDomain));
      if ((linkLower.includes('tripadvisor.com') || linkLower.includes('instagram.com') || linkLower.includes('facebook.com')) && !matchesTargetToken) {
        return { ok: false, reason: 'social_no_token' };
      }
      const mentionsGenericVenue = titleLower.includes(' pub') || titleLower.includes(' hotel') || titleLower.includes(' inn') || titleLower.includes(' tavern') || titleLower.includes(' brasserie');
      if (mentionsGenericVenue && !matchesTargetToken) {
        return { ok: false, reason: 'generic_venue_no_token' };
      }
    }
    return { ok: true };
  };

  const isValidDiningPhoto = (img) => {
    const base = isValidAmenityPhoto(img);
    if (!base.ok) return base;
    const s = `${img.title || ''} ${img.imageUrl || ''} ${img.link || ''}`.toLowerCase();
    if (isRoomLike(img.title, img.imageUrl) || isRoomLike(img.link, '')) return { ok: false, reason: 'room_like' };
    return { ok: true };
  };

  console.log('\n--- Checking resSocial ---');
  (resSocial.images || []).forEach((img, i) => {
    const res = isValidDiningPhoto(img);
    console.log(`[#${i+1}] ${res.ok ? 'PASS' : 'FAIL: ' + res.reason} | Title: "${img.title}" | URL: ${img.imageUrl}`);
  });
}

run().catch(console.error);
