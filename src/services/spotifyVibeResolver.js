/**
 * AtmosVibe × Travelvrse Unified Spotify Acoustic DNA & Diurnal Resolver
 *
 * Implements the 4-Tier Spotify Resolution Architecture shared between
 * Travelvrse Vibe Challenges and the AtmosVibe Vibe Signature Engine:
 *
 *   Tier 1: Explicit Validated Spotify URI Override (with curated legacy-URI guard)
 *   Tier 2: Brand / Destination Signature Archetype Matrix (Sea Containers, 25hours,
 *           The Plymouth, Dukes The Palm, Virgin Hotels, MSC World Europa, Ted Lasso, etc.)
 *   Tier 3: Multi-Vector Acoustic DNA Scoring (Anchor Artists Fingerprint +
 *           Soundscape Genre + Sound Texture + Decibel Profile)
 *   Tier 4: Diurnal Rhythm & Energy Arc Modulation (Working [Low Energy <=45] /
 *           Chilling [Golden Hour Mid Energy 46-75] / Playing [Peak Nightlife >75])
 *   + Live Spotify Web API OAuth2 Client Credentials Search (`fetchPlaylistForVibe`)
 */

// All playlist IDs verified 200 OK against https://open.spotify.com/oembed
export const PLAYLIST_PRESETS = {
  // --- SEA CONTAINERS LONDON (South Bank Thames) ---
  sea_st_pauls_dawn: {
    id: '37i9dQZF1DX4E3UdUs7fUx',
    uri: 'spotify:playlist:37i9dQZF1DX4E3UdUs7fUx',
    title: 'St Pauls Sunrise Acoustic',
    spotifyTitle: 'Afternoon Acoustic',
    vibe: 'Warm Acoustic & Morning Thames Daylight',
    energyBand: 'working'
  },
  sea_agua_spa: {
    id: '37i9dQZF1DX3Ogo9pFvBkY',
    uri: 'spotify:playlist:37i9dQZF1DX3Ogo9pFvBkY',
    title: 'Agua Bathhouse Serenity',
    spotifyTitle: 'Ambient Relaxation',
    vibe: 'Subterranean Thermal Spa & Ambient Calm',
    energyBand: 'working'
  },
  sea_suite_river: {
    id: '37i9dQZF1DWTvNyxOwkztu',
    uri: 'spotify:playlist:37i9dQZF1DWTvNyxOwkztu',
    title: 'Riverfront Balcony Downtempo',
    spotifyTitle: 'Chillout Lounge',
    vibe: 'Warm Vinyl Downtempo, Nu-Jazz & Balearic Soul',
    energyBand: 'chilling'
  },
  sea_nautical_lobby: {
    id: '37i9dQZF1DX0SM0LYsmbMT',
    uri: 'spotify:playlist:37i9dQZF1DX0SM0LYsmbMT',
    title: 'Tom Dixon Copper Hull Lounge',
    spotifyTitle: 'Jazz Vibes',
    vibe: 'Transatlantic Liner Lounge & Mid-Century Jazz',
    energyBand: 'chilling'
  },
  sea_12th_knot: {
    id: '37i9dQZF1DX2TRYkJECvfC',
    uri: 'spotify:playlist:37i9dQZF1DX2TRYkJECvfC',
    title: '12th Knot Rooftop Sunset',
    spotifyTitle: 'Deep House Relax',
    vibe: 'South Bank Sunset Deep House & Nu-Disco',
    energyBand: 'playing'
  },
  sea_lyaness_late: {
    id: '37i9dQZF1DXbITWG1ZJKYt',
    uri: 'spotify:playlist:37i9dQZF1DXbITWG1ZJKYt',
    title: 'Lyaness Late-Night Soul & Jazz',
    spotifyTitle: 'Jazz Classics',
    vibe: 'Award-Winning Mixology, Nu-Jazz & Electric Soul',
    energyBand: 'playing'
  },

  // --- 25HOURS HOTEL INDRE BY (Copenhagen) ---
  hours25_sauna_calm: {
    id: '37i9dQZF1DX3Ogo9pFvBkY',
    uri: 'spotify:playlist:37i9dQZF1DX3Ogo9pFvBkY',
    title: 'Nordic Courtyard Sauna Calm',
    spotifyTitle: 'Ambient Relaxation',
    vibe: 'Nordic Thermal Sanctuary & Ambient Stillness',
    energyBand: 'working'
  },
  hours25_assembly_study: {
    id: '37i9dQZF1DX8Uebhn9wzrS',
    uri: 'spotify:playlist:37i9dQZF1DX8Uebhn9wzrS',
    title: 'Assembly Hall Creative Focus',
    spotifyTitle: 'chill lofi study beats',
    vibe: 'Paper Factory Co-Working & Analog Lo-Fi Beats',
    energyBand: 'working'
  },
  hours25_vinyl_lounge: {
    id: '37i9dQZF1DX2Nc3B70tvx0',
    uri: 'spotify:playlist:37i9dQZF1DX2Nc3B70tvx0',
    title: 'Vinyl Room Nordic Indie & Folk',
    spotifyTitle: "Indie's Top 50",
    vibe: 'Warm Analog Vinyl, Nordic Indie-Soul & Acoustic Folk',
    energyBand: 'chilling'
  },
  hours25_boilerman_bar: {
    id: '37i9dQZF1DXbITWG1ZJKYt',
    uri: 'spotify:playlist:37i9dQZF1DXbITWG1ZJKYt',
    title: 'Boilerman Bar Highball Sessions',
    spotifyTitle: 'Jazz Classics',
    vibe: 'Subterranean Highball Bar, Vintage Soul & Funk',
    energyBand: 'playing'
  },

  // --- THE PLYMOUTH SOUTH BEACH (Miami Art Deco) ---
  plymouth_morning_terrace: {
    id: '37i9dQZF1DX4E3UdUs7fUx',
    uri: 'spotify:playlist:37i9dQZF1DX4E3UdUs7fUx',
    title: 'Art Deco Courtyard Espresso',
    spotifyTitle: 'Afternoon Acoustic',
    vibe: 'Sun-Dappled Palm Courtyard & Breezy Acoustic',
    energyBand: 'working'
  },
  plymouth_poolside_golden: {
    id: '37i9dQZF1DX2TRYkJECvfC',
    uri: 'spotify:playlist:37i9dQZF1DX2TRYkJECvfC',
    title: 'Plymouth Poolside Balearic',
    spotifyTitle: 'Deep House Relax',
    vibe: 'Tropical Bossa-House, Latin Lounge & Sunset Chill',
    energyBand: 'chilling'
  },
  plymouth_blue_ribbon_night: {
    id: '37i9dQZF1DX10zKzsJ2jva',
    uri: 'spotify:playlist:37i9dQZF1DX10zKzsJ2jva',
    title: 'South Beach Nocturnal Pulse',
    spotifyTitle: 'Viva Latino',
    vibe: 'Late-Night Sushi & Cocktails, Afro-Cuban & Miami Groove',
    energyBand: 'playing'
  },

  // --- DUKES THE PALM (Dubai) ---
  dukes_drawing_room: {
    id: '37i9dQZF1DX4sWSpwq3LiO',
    uri: 'spotify:playlist:37i9dQZF1DX4sWSpwq3LiO',
    title: 'Drawing Room Champagne Tea',
    spotifyTitle: 'Peaceful Piano',
    vibe: 'Contemporary Neo-Classical Piano & Quiet Luxury',
    energyBand: 'working'
  },
  dukes_bar_martini: {
    id: '37i9dQZF1DWV7EzJMK2FUI',
    uri: 'spotify:playlist:37i9dQZF1DWV7EzJMK2FUI',
    title: 'Dukes Bar Vesper Martini Velvet',
    spotifyTitle: 'Jazz in the Background',
    vibe: '007 Mayfair Jazz, Velvet Brass & Classic Crooners',
    energyBand: 'chilling'
  },
  dukes_arabian_gulf_sunset: {
    id: '37i9dQZF1DWTvNyxOwkztu',
    uri: 'spotify:playlist:37i9dQZF1DWTvNyxOwkztu',
    title: 'Infinity Pool Marina Twilight',
    spotifyTitle: 'Chillout Lounge',
    vibe: 'Palm Jumeirah Skyline Downtempo & Velvet Lounge',
    energyBand: 'playing'
  },

  // --- VIRGIN HOTELS LAS VEGAS ---
  virgin_desert_chill: {
    id: '37i9dQZF1DX4WYpdgoIcn6',
    uri: 'spotify:playlist:37i9dQZF1DX4WYpdgoIcn6',
    title: 'Chamber Suite Desert Breeze',
    spotifyTitle: 'Chill Hits',
    vibe: 'Mojave Daylight Pop-Chill & Poolside Cabana',
    energyBand: 'working'
  },
  virgin_kassi_beach: {
    id: '37i9dQZF1DX2TRYkJECvfC',
    uri: 'spotify:playlist:37i9dQZF1DX2TRYkJECvfC',
    title: 'Kassi Beach Club Coastal Groove',
    spotifyTitle: 'Deep House Relax',
    vibe: 'Poolside Coastal House & Golden Hour Cocktails',
    energyBand: 'chilling'
  },
  virgin_shag_room: {
    id: '37i9dQZF1DX8tZsk68tuDw',
    uri: 'spotify:playlist:37i9dQZF1DX8tZsk68tuDw',
    title: 'Shag Room Electric Velvet',
    spotifyTitle: 'Dance Rising',
    vibe: 'High-Roller Late Night Electronic & Desert Neon',
    energyBand: 'playing'
  },

  // --- UNIVERSAL ARCHETYPE PRESETS (By Genre, Artist DNA & Diurnal Energy) ---
  universal_spa_ambient: {
    id: '37i9dQZF1DX3Ogo9pFvBkY',
    uri: 'spotify:playlist:37i9dQZF1DX3Ogo9pFvBkY',
    title: 'Thermal Sanctuary Ambient',
    spotifyTitle: 'Ambient Relaxation',
    vibe: 'Restorative Biophilic Soundscape & Sub-50dB Serenity',
    energyBand: 'working'
  },
  universal_neoclassical_piano: {
    id: '37i9dQZF1DX4sWSpwq3LiO',
    uri: 'spotify:playlist:37i9dQZF1DX4sWSpwq3LiO',
    title: 'Heritage Salon Neo-Classical',
    spotifyTitle: 'Peaceful Piano',
    vibe: 'Intimate Grand Piano, Chamber Strings & Quiet Luxury',
    energyBand: 'working'
  },
  universal_piano_background: {
    id: '37i9dQZF1DX7K31D69s4M1',
    uri: 'spotify:playlist:37i9dQZF1DX7K31D69s4M1',
    title: 'Drawing Room Piano Lounge',
    spotifyTitle: 'Piano in the Background',
    vibe: 'Refined Afternoon Salon & Conversational Piano',
    energyBand: 'chilling'
  },
  universal_lofi_focus: {
    id: '37i9dQZF1DX8Uebhn9wzrS',
    uri: 'spotify:playlist:37i9dQZF1DX8Uebhn9wzrS',
    title: 'Creative Co-Working Lo-Fi',
    spotifyTitle: 'chill lofi study beats',
    vibe: 'Warm Analog Beats for Daytime Focus & Coffee',
    energyBand: 'working'
  },
  universal_acoustic_morning: {
    id: '37i9dQZF1DX4E3UdUs7fUx',
    uri: 'spotify:playlist:37i9dQZF1DX4E3UdUs7fUx',
    title: 'Sunlit Terrace Acoustic',
    spotifyTitle: 'Afternoon Acoustic',
    vibe: 'Organic Guitar, Daylight Warmth & Artisan Coffee',
    energyBand: 'working'
  },
  universal_downtempo_lounge: {
    id: '37i9dQZF1DWTvNyxOwkztu',
    uri: 'spotify:playlist:37i9dQZF1DWTvNyxOwkztu',
    title: 'Golden Hour Downtempo & Balearic',
    spotifyTitle: 'Chillout Lounge',
    vibe: 'Warm Vinyl Downtempo, Organic Grooves & Aperitivo',
    energyBand: 'chilling'
  },
  universal_jazz_vibes: {
    id: '37i9dQZF1DX0SM0LYsmbMT',
    uri: 'spotify:playlist:37i9dQZF1DX0SM0LYsmbMT',
    title: 'Twilight Nu-Jazz & Lounge',
    spotifyTitle: 'Jazz Vibes',
    vibe: 'Contemporary Jazz-Hop, Warm Horns & Craft Cocktails',
    energyBand: 'chilling'
  },
  universal_jazz_classics: {
    id: '37i9dQZF1DXbITWG1ZJKYt',
    uri: 'spotify:playlist:37i9dQZF1DXbITWG1ZJKYt',
    title: 'Speakeasy Velvet Jazz & Soul',
    spotifyTitle: 'Jazz Classics',
    vibe: 'Timeless Brass, Late-Night Bourbon & Intimate Banter',
    energyBand: 'playing'
  },
  universal_indie_boutique: {
    id: '37i9dQZF1DX2Nc3B70tvx0',
    uri: 'spotify:playlist:37i9dQZF1DX2Nc3B70tvx0',
    title: 'Boutique Creative Indie & Folk',
    spotifyTitle: "Indie's Top 50",
    vibe: 'Neighborhood Vinyl Culture & Curated Indie',
    energyBand: 'chilling'
  },
  universal_deep_house_sunset: {
    id: '37i9dQZF1DX2TRYkJECvfC',
    uri: 'spotify:playlist:37i9dQZF1DX2TRYkJECvfC',
    title: 'Rooftop & Poolside Deep House',
    spotifyTitle: 'Deep House Relax',
    vibe: 'Melodic Sunset House, Balearic Pulse & Skyline Views',
    energyBand: 'playing'
  },
  universal_nightlife_club: {
    id: '37i9dQZF1DX8tZsk68tuDw',
    uri: 'spotify:playlist:37i9dQZF1DX8tZsk68tuDw',
    title: 'Peak Nocturnal Electronic',
    spotifyTitle: 'Dance Rising',
    vibe: 'High-Velocity Club Energy & Late-Night Mixology',
    energyBand: 'playing'
  },
  universal_latin_coastal: {
    id: '37i9dQZF1DX10zKzsJ2jva',
    uri: 'spotify:playlist:37i9dQZF1DX10zKzsJ2jva',
    title: 'Coastal Cantina & Tropical Rhythm',
    spotifyTitle: 'Viva Latino',
    vibe: 'Sun-Drenched Latin Grooves, Mezcal & Social Heat',
    energyBand: 'playing'
  },
  universal_soul_booster: {
    id: '37i9dQZF1DX3rxVfibe1L0',
    uri: 'spotify:playlist:37i9dQZF1DX3rxVfibe1L0',
    title: 'Social Hub Soul & Groove',
    spotifyTitle: 'Mood Booster',
    vibe: 'Upbeat Contemporary Soul, Funk & Magnetic Banter',
    energyBand: 'playing'
  }
};

// Known over-generic or mismatched Spotify IDs from older LLM generations that should be upgraded
const LEGACY_MISMATCHED_IDS = new Set([
  '37i9dQZF1DX0s5kDXi1oC5', // "Hit Rewind" (generic pop throwback)
  '37i9dQZF1DWWEcRhUVtL8n'  // "Indie Pop" (previously mislabeled as piano/classical)
]);

/**
 * Extracts a clean 22-character Spotify playlist ID from a URI or URL if valid
 */
export function extractSpotifyPlaylistId(input) {
  if (!input || typeof input !== 'string') return null;
  const uriMatch = input.match(/spotify:playlist:([a-zA-Z0-9]{22})/);
  if (uriMatch && !LEGACY_MISMATCHED_IDS.has(uriMatch[1])) return uriMatch[1];
  const urlMatch = input.match(/open\.spotify\.com\/(?:embed\/)?playlist\/([a-zA-Z0-9]{22})/);
  if (urlMatch && !LEGACY_MISMATCHED_IDS.has(urlMatch[1])) return urlMatch[1];
  return null;
}

/**
 * Core Multi-Dimensional Resolver for AtmosVibe Vibe Signatures
 * Mirrors Travelvrse's `resolveDynamicPlaylist(roomId, activeDialEnergy, selectedPreset, brandId, roomName)`
 *
 * @param {Object} manifest - The full Vibe Signature manifest object
 * @param {string} activeDiurnalTab - 'working' | 'chilling' | 'playing' (syncs with Diurnal Rhythm tabs)
 * @param {string} hotelName - Optional fallback hotel name
 * @returns {Object} Resolved preset `{ id, uri, title, spotifyTitle, vibe, energyBand, matchReason }`
 */
export function resolveVibeSignatureSpotify(manifest, activeDiurnalTab = null, hotelName = '') {
  const v = manifest?.vibe_signature || {};
  const dna = v.acoustic_dna || {};
  const venue = `${manifest?.venue_name || ''} ${hotelName || ''} ${manifest?.location || ''}`.toLowerCase();
  const genre = (dna.soundscape_genre || '').toLowerCase();
  const texture = (dna.sound_texture || '').toLowerCase();
  const query = (dna.spotify_query || '').toLowerCase();
  const artists = (dna.anchor_artists || []).map(a => String(a).toLowerCase()).join(' ');
  const combinedCorpus = `${genre} ${texture} ${query} ${artists}`;

  // Effective energy score (0-100) modulated by active Diurnal Rhythm tab
  const baseEnergy = Number(v.energy_score) || 75;
  const effectiveMode = activeDiurnalTab || (baseEnergy <= 52 ? 'working' : baseEnergy >= 82 ? 'playing' : 'chilling');

  // =========================================================================
  // TIER 1: Brand / Destination Signature Archetype Matrix (Travelvrse Parity)
  // =========================================================================
  if (venue.includes('sea containers')) {
    if (effectiveMode === 'working') {
      return { ...PLAYLIST_PRESETS.sea_st_pauls_dawn, matchReason: 'Sea Containers · Morning Daylight & Work Rhythm' };
    }
    if (effectiveMode === 'playing') {
      return { ...PLAYLIST_PRESETS.sea_12th_knot, matchReason: 'Sea Containers · 12th Knot & Lyaness Nocturnal Rhythm' };
    }
    return { ...PLAYLIST_PRESETS.sea_suite_river, matchReason: 'Sea Containers · Thames Twilight Pivot & Downtempo DNA' };
  }

  if (venue.includes('25hours') || venue.includes('25 hours') || venue.includes('indre by')) {
    if (effectiveMode === 'working') {
      return { ...PLAYLIST_PRESETS.hours25_assembly_study, matchReason: '25hours Indre By · Assembly Hall Creative Focus' };
    }
    if (effectiveMode === 'playing') {
      return { ...PLAYLIST_PRESETS.hours25_boilerman_bar, matchReason: '25hours Indre By · Boilerman Bar Soul & Highballs' };
    }
    return { ...PLAYLIST_PRESETS.hours25_vinyl_lounge, matchReason: '25hours Indre By · Vinyl Room Nordic Indie & Soul' };
  }

  if (venue.includes('plymouth') || (venue.includes('sls') && venue.includes('south beach'))) {
    if (effectiveMode === 'working') {
      return { ...PLAYLIST_PRESETS.plymouth_morning_terrace, matchReason: 'South Beach · Sunlit Art Deco Courtyard' };
    }
    if (effectiveMode === 'playing') {
      return { ...PLAYLIST_PRESETS.plymouth_blue_ribbon_night, matchReason: 'South Beach · Nocturnal Latin & Coastal Pulse' };
    }
    return { ...PLAYLIST_PRESETS.plymouth_poolside_golden, matchReason: 'South Beach · Poolside Balearic & Bossa House' };
  }

  if (venue.includes('dukes')) {
    if (effectiveMode === 'working') {
      return { ...PLAYLIST_PRESETS.dukes_drawing_room, matchReason: 'Dukes The Palm · Drawing Room Neo-Classical' };
    }
    if (effectiveMode === 'playing') {
      return { ...PLAYLIST_PRESETS.dukes_arabian_gulf_sunset, matchReason: 'Dukes The Palm · Arabian Gulf Twilight Lounge' };
    }
    return { ...PLAYLIST_PRESETS.dukes_bar_martini, matchReason: 'Dukes Bar · Mayfair Velvet Jazz & Martini Ritual' };
  }

  if (venue.includes('virgin')) {
    if (effectiveMode === 'working') {
      return { ...PLAYLIST_PRESETS.virgin_desert_chill, matchReason: 'Virgin Hotels · Chamber Daylight Chill' };
    }
    if (effectiveMode === 'playing') {
      return { ...PLAYLIST_PRESETS.virgin_shag_room, matchReason: 'Virgin Hotels · Shag Room Late-Night Pulse' };
    }
    return { ...PLAYLIST_PRESETS.virgin_kassi_beach, matchReason: 'Virgin Hotels · Kassi Beach Club Sunset Groove' };
  }

  // =========================================================================
  // TIER 2: Explicit Validated Spotify URI in Manifest (when in default mode)
  // =========================================================================
  const explicitId = extractSpotifyPlaylistId(dna.spotify_query);
  if (explicitId && effectiveMode === 'chilling') {
    const matchedPreset = Object.values(PLAYLIST_PRESETS).find(p => p.id === explicitId);
    if (matchedPreset) {
      return { ...matchedPreset, matchReason: 'Manifest Verified Spotify URI' };
    }
  }

  // =========================================================================
  // TIER 3 & 4: Multi-Vector Acoustic DNA + Anchor Artist + Diurnal Modulation
  // =========================================================================

  // 1. Neo-Classical / Piano / Quiet Luxury Heritage
  if (
    combinedCorpus.includes('piano') ||
    combinedCorpus.includes('classical') ||
    combinedCorpus.includes('chamber') ||
    combinedCorpus.includes('einaudi') ||
    combinedCorpus.includes('max richter') ||
    combinedCorpus.includes('arnalds') ||
    combinedCorpus.includes('debussy')
  ) {
    if (effectiveMode === 'working') {
      return { ...PLAYLIST_PRESETS.universal_neoclassical_piano, matchReason: 'Anchor Artist & Neo-Classical Focus DNA' };
    }
    if (effectiveMode === 'playing') {
      return { ...PLAYLIST_PRESETS.dukes_bar_martini, matchReason: 'Evening Salon Jazz & Velvet Brass Transition' };
    }
    return { ...PLAYLIST_PRESETS.universal_piano_background, matchReason: 'Conversational Salon Piano DNA' };
  }

  // 2. Thermal Spa / Biophilic Sanctuary / Ambient Wellness
  if (
    combinedCorpus.includes('ambient') ||
    combinedCorpus.includes('spa') ||
    combinedCorpus.includes('zen') ||
    combinedCorpus.includes('wellness') ||
    combinedCorpus.includes('sanctuary') ||
    combinedCorpus.includes('brian eno') ||
    combinedCorpus.includes('meditation')
  ) {
    if (effectiveMode === 'playing') {
      return { ...PLAYLIST_PRESETS.universal_downtempo_lounge, matchReason: 'Evening Sanctuary Downtempo Transition' };
    }
    return { ...PLAYLIST_PRESETS.universal_spa_ambient, matchReason: 'Biophilic Sanctuary & Ambient DNA' };
  }

  // 3. Downtempo / Balearic / Nu-Jazz / Trip-Hop (Bonobo, Maribou State, Khruangbin, Thievery Corp)
  if (
    combinedCorpus.includes('downtempo') ||
    combinedCorpus.includes('balearic') ||
    combinedCorpus.includes('bonobo') ||
    combinedCorpus.includes('maribou state') ||
    combinedCorpus.includes('khruangbin') ||
    combinedCorpus.includes('thievery') ||
    combinedCorpus.includes('nightmares on wax') ||
    combinedCorpus.includes('zero 7') ||
    combinedCorpus.includes('kruder')
  ) {
    if (effectiveMode === 'working') {
      return { ...PLAYLIST_PRESETS.universal_lofi_focus, matchReason: 'Daytime Analog Focus & Lo-Fi DNA' };
    }
    if (effectiveMode === 'playing') {
      return { ...PLAYLIST_PRESETS.universal_deep_house_sunset, matchReason: 'Nocturnal Melodic House & Rooftop Pivot' };
    }
    return { ...PLAYLIST_PRESETS.universal_downtempo_lounge, matchReason: 'Anchor Artist Downtempo & Balearic DNA' };
  }

  // 4. Jazz / Soul / Speakeasy / Crooner (Miles Davis, Chet Baker, Sade, Leon Bridges, Ezra Collective, Tom Misch)
  if (
    combinedCorpus.includes('jazz') ||
    combinedCorpus.includes('bossa') ||
    combinedCorpus.includes('soul') ||
    combinedCorpus.includes('speakeasy') ||
    combinedCorpus.includes('sade') ||
    combinedCorpus.includes('chet baker') ||
    combinedCorpus.includes('miles davis') ||
    combinedCorpus.includes('leon bridges') ||
    combinedCorpus.includes('ezra collective') ||
    combinedCorpus.includes('tom misch') ||
    combinedCorpus.includes('kamasi') ||
    combinedCorpus.includes('gregory porter')
  ) {
    if (effectiveMode === 'working') {
      return { ...PLAYLIST_PRESETS.universal_jazz_vibes, matchReason: 'Daytime Nu-Jazz & Coffeehouse Lounge DNA' };
    }
    if (effectiveMode === 'playing') {
      return { ...PLAYLIST_PRESETS.universal_jazz_classics, matchReason: 'Late-Night Speakeasy Jazz & Soul DNA' };
    }
    return { ...PLAYLIST_PRESETS.universal_jazz_vibes, matchReason: 'Twilight Jazz & Cocktail Banter DNA' };
  }

  // 5. Deep House / Rooftop / Beach Club / Electronic (Kaytranada, Rüfüs Du Sol, Black Coffee, Peggy Gou, Poolside)
  if (
    combinedCorpus.includes('house') ||
    combinedCorpus.includes('club') ||
    combinedCorpus.includes('rooftop') ||
    combinedCorpus.includes('electronic') ||
    combinedCorpus.includes('disco') ||
    combinedCorpus.includes('kaytranada') ||
    combinedCorpus.includes('rufus') ||
    combinedCorpus.includes('rüfüs') ||
    combinedCorpus.includes('black coffee') ||
    combinedCorpus.includes('peggy gou') ||
    combinedCorpus.includes('poolside') ||
    combinedCorpus.includes('disclosure')
  ) {
    if (effectiveMode === 'working') {
      return { ...PLAYLIST_PRESETS.universal_downtempo_lounge, matchReason: 'Daytime Terrace Chillout DNA' };
    }
    if (effectiveMode === 'playing' && baseEnergy >= 84) {
      return { ...PLAYLIST_PRESETS.universal_nightlife_club, matchReason: 'High-Velocity Nocturnal Electronic DNA' };
    }
    return { ...PLAYLIST_PRESETS.universal_deep_house_sunset, matchReason: 'Sunset Deep House & Rooftop DNA' };
  }

  // 6. Indie / Nordic Folk / Vinyl / Acoustic (Agnes Obel, Jose Gonzalez, Kings of Convenience, Fleet Foxes)
  if (
    combinedCorpus.includes('indie') ||
    combinedCorpus.includes('folk') ||
    combinedCorpus.includes('acoustic') ||
    combinedCorpus.includes('vinyl') ||
    combinedCorpus.includes('agnes obel') ||
    combinedCorpus.includes('gonzalez') ||
    combinedCorpus.includes('gonzález') ||
    combinedCorpus.includes('kings of convenience') ||
    combinedCorpus.includes('bon iver')
  ) {
    if (effectiveMode === 'working') {
      return { ...PLAYLIST_PRESETS.universal_acoustic_morning, matchReason: 'Daytime Acoustic & Artisan Coffee DNA' };
    }
    if (effectiveMode === 'playing') {
      return { ...PLAYLIST_PRESETS.universal_soul_booster, matchReason: 'Evening Social Indie-Soul Pivot' };
    }
    return { ...PLAYLIST_PRESETS.universal_indie_boutique, matchReason: 'Curated Boutique Indie & Vinyl DNA' };
  }

  // 7. Latin / Coastal / Tropical / Mediterranean
  if (
    combinedCorpus.includes('latin') ||
    combinedCorpus.includes('tropic') ||
    combinedCorpus.includes('afro-cuban') ||
    combinedCorpus.includes('salsa') ||
    combinedCorpus.includes('cumbia') ||
    combinedCorpus.includes('buena vista')
  ) {
    if (effectiveMode === 'working') {
      return { ...PLAYLIST_PRESETS.universal_acoustic_morning, matchReason: 'Sunlit Courtyard Acoustic Rhythm' };
    }
    if (effectiveMode === 'playing') {
      return { ...PLAYLIST_PRESETS.universal_latin_coastal, matchReason: 'Nocturnal Latin & Coastal Pulse' };
    }
    return { ...PLAYLIST_PRESETS.plymouth_poolside_golden, matchReason: 'Golden Hour Bossa-House & Tropical Lounge' };
  }

  // Default Diurnal Fallback based on Energy Band
  if (effectiveMode === 'working') {
    return { ...PLAYLIST_PRESETS.universal_lofi_focus, matchReason: 'Diurnal Work Mode · Low-Distraction Focus' };
  }
  if (effectiveMode === 'playing') {
    return { ...PLAYLIST_PRESETS.universal_deep_house_sunset, matchReason: 'Diurnal Play Mode · Evening Social Pulse' };
  }
  return { ...PLAYLIST_PRESETS.universal_downtempo_lounge, matchReason: 'Diurnal Chill Mode · Golden Hour Lounge' };
}

// ============================================================================
// LIVE SPOTIFY WEB API OAUTH2 CLIENT CREDENTIALS SEARCH (Travelvrse Layer 2)
// ============================================================================
let cachedToken = null;
let tokenExpiry = null;

async function getSpotifyAccessToken() {
  const clientId = import.meta.env?.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env?.VITE_SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret || clientId === 'your_spotify_client_id_here') {
    return null;
  }

  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  try {
    const authString = btoa(`${clientId}:${clientSecret}`);
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${authString}`
      },
      body: 'grant_type=client_credentials'
    });

    if (!response.ok) return null;
    const data = await response.json();
    cachedToken = data.access_token;
    tokenExpiry = Date.now() + 3300 * 1000; // 55-minute cache
    return cachedToken;
  } catch {
    return null;
  }
}

/**
 * Queries the live Spotify Web API `/v1/search` endpoint when client credentials
 * are configured, prioritizing official Spotify editorial playlists (`owner.id === 'spotify'`).
 */
export async function fetchLiveSpotifyPlaylistForVibe(vibeQuery, fallbackPreset) {
  const token = await getSpotifyAccessToken();
  if (!token || !vibeQuery) return fallbackPreset;

  const cleanQuery = vibeQuery.replace(/^spotify:playlist:[a-zA-Z0-9]+$/i, '').trim();
  if (!cleanQuery) return fallbackPreset;

  try {
    const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(cleanQuery)}&type=playlist&limit=10`;
    const response = await fetch(searchUrl, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) return fallbackPreset;

    const data = await response.json();
    const items = (data?.playlists?.items || []).filter(item => item && item.id && item.public !== false);
    if (items.length === 0) return fallbackPreset;

    const editorial = items.find(item => item.owner?.id === 'spotify') || items[0];
    return {
      id: editorial.id,
      uri: `spotify:playlist:${editorial.id}`,
      title: editorial.name || fallbackPreset?.title,
      spotifyTitle: editorial.name || fallbackPreset?.spotifyTitle,
      vibe: fallbackPreset?.vibe || cleanQuery,
      energyBand: fallbackPreset?.energyBand || 'chilling',
      matchReason: 'Live Spotify API Editorial Match'
    };
  } catch {
    return fallbackPreset;
  }
}
