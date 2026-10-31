// Curated AtmosVibe Tour Vibe Signatures for Travel Curious — London Black Cab Heritage Tours
// Source Collection: https://travelcurious.com/collections/black-cab-heritage-tours (Airport transfers excluded)

export const VIBE_FILTER_CATEGORIES = [
  {
    id: 'royal-power',
    label: 'Royal & Political Power',
    icon: '👑',
    shortDesc: 'Sovereign pageantry, Westminster corridors of power & UNESCO icons',
    color: '#ffd700',
    keywords: ['royal', 'royalty', 'queen', 'king', 'palace', 'buckingham', 'westminster', 'parliament', 'big ben', 'windsor', 'classic', 'unesco', 'monarchy', 'politics']
  },
  {
    id: 'rock-beatles',
    label: '60s Beatlemania & Rock ’n’ Roll',
    icon: '🎸',
    shortDesc: 'Swinging Sixties Soho, Abbey Road crossings & counterculture music legends',
    color: '#f43f5e',
    keywords: ['beatles', 'rock', 'music', 'abbey road', 'lennon', 'mccartney', 'soho', '60s', 'swinging', 'vinyl', 'rolling stones', 'bowie', 'punk', 'band', 'concert']
  },
  {
    id: 'cinematic-magic',
    label: 'Cinematic & Wizarding Worlds',
    icon: '🎬',
    shortDesc: 'Harry Potter Muggle taxi routes, Bridgerton sets & silver-screen locations',
    color: '#a855f7',
    keywords: ['harry potter', 'magic', 'wizard', 'muggle', 'film', 'filming', 'movie', 'cinema', 'platform', 'bridgerton', 'darkest hour', 'oxford', 'hogwarts']
  },
  {
    id: 'gothic-noir',
    label: 'Victorian Noir, Ghosts & Macabre',
    icon: '🕯️',
    shortDesc: 'Gaslit Whitechapel alleyways, Jack the Ripper lore & haunted London shadows',
    color: '#10b981',
    keywords: ['jack the ripper', 'ghost', 'haunted', 'macabre', 'dark', 'murder', 'whitechapel', 'victorian', 'noir', 'spooky', 'creepy', 'east end', 'mystery', 'crime']
  },
  {
    id: 'wartime-grit',
    label: 'Wartime & Churchillian Grit',
    icon: '🏛️',
    shortDesc: '1940s Blitz resilience, Cabinet War Rooms & Winston Churchill’s London',
    color: '#f59e0b',
    keywords: ['churchill', 'war', 'wwii', 'ww2', 'darkest hour', 'blitz', 'bunker', 'whitehall', '1940', 'history', 'military', 'downing']
  },
  {
    id: 'countryside-regency',
    label: 'Regency Bath, Oxford & Stonehenge',
    icon: '🌿',
    shortDesc: 'Honey-stone Cotswold villages, Georgian crescents, dreaming spires & monoliths',
    color: '#34d399',
    keywords: ['bath', 'lacock', 'cotswolds', 'countryside', 'regency', 'georgian', 'oxford', 'stonehenge', 'windsor', 'village', 'day trip', 'southampton', 'abbey']
  },
  {
    id: 'nocturnal-lights',
    label: 'After-Dark Neon & Thames Lights',
    icon: '🌃',
    shortDesc: 'Illuminated River art bridges, twilight skyline reflections & evening glamour',
    color: '#00e5ff',
    keywords: ['night', 'light', 'illuminated', 'evening', 'after dark', 'twilight', 'thames', 'sunset', 'romantic', 'bridges', 'neon', 'skyline']
  },
  {
    id: 'bespoke-knowledge',
    label: 'Bespoke "Knowledge" Hidden Gems',
    icon: '🧭',
    shortDesc: 'Custom backstreet routes, secret mews & driver-curated London storytelling',
    color: '#38bdf8',
    keywords: ['custom', 'bespoke', 'build your own', 'hidden gems', 'secret', 'flexible', 'private', 'layover', 'tailored', 'backstreets', 'knowledge']
  }
];

export const SAMPLE_VIBE_PROMPTS = [
  {
    label: '🕯️ Moody Victorian mysteries & haunted East End alleys',
    query: 'Moody Victorian mysteries haunted ghost stories Jack the Ripper dark alleyways',
    vibes: ['gothic-noir']
  },
  {
    label: '🎸 1960s Soho vinyl history & Abbey Road rock legends',
    query: '1960s Beatlemania Abbey Road rock and roll music legends Soho',
    vibes: ['rock-beatles']
  },
  {
    label: '🎬 Magical Harry Potter filming locations & dreaming spires',
    query: 'Magical Harry Potter filming locations wizarding London Oxford family',
    vibes: ['cinematic-magic']
  },
  {
    label: '🌿 Regency romance, Georgian Bath & honey-stone villages',
    query: 'Bridgerton Regency romance Bath Lacock countryside day trip',
    vibes: ['countryside-regency', 'cinematic-magic']
  },
  {
    label: '🌃 Illuminated Thames bridges & romantic London after dark',
    query: 'Night tour illuminated river Thames lights evening skyline',
    vibes: ['nocturnal-lights']
  },
  {
    label: '👑 Iconic Royal palaces, Churchill war history & Westminster',
    query: 'Royal Buckingham Palace Westminster Churchill wartime history',
    vibes: ['royal-power', 'wartime-grit']
  }
];

export const TRAVEL_CURIOUS_BLACK_CAB_TOURS = [
  {
    id: 'TPHRI8',
    title: 'The Heart of London: Classic Westminster Private 2-Hour Tour',
    url: 'https://travelcurious.com/united-kingdom/london/tours/the-heart-of-london-classic-westminster-private-2-hour-tour-TPHRI8',
    city: 'London',
    durationHours: 2,
    durationLabel: 'Private Tour · 2 hrs',
    durationBucket: 'express',
    priceFromGbp: 100,
    priceLabel: 'From £100 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1666644554/di1hvrdaouhnmauanoqw.jpg',
    shortSummary: "Westminster truly is the heart of London. Sweep past Buckingham Palace, 10 Downing St, the Houses of Parliament, Big Ben, and Trafalgar Square with an accredited 'Knowledge' cabbie.",
    vibeArchetype: 'Sovereign Pageantry & Ceremonial Power Corridors',
    baseVibeScore: 95,
    vibeTags: ['royal-power', 'wartime-grit'],
    vibePills: ['Royal Ceremony', 'Westminster Icons', 'Express High-Impact'],
    sensorySignature: {
      visualAura: 'Portland stone grandeur, gilded palace gates, Gothic parliamentary spires & scarlet sentry boxes',
      sonicMood: 'Big Ben chimes echoing over Whitehall with intimate in-cab raconteur commentary',
      pacingCadence: 'High-efficiency 2-hour ceremonial sweep with curated curb-side photo stops',
      circadianPeak: 'Morning Crisp (Changing of the Guard energy) or Late Afternoon Golden Light'
    },
    dnaRadar: {
      storytellingDepth: 90,
      subculturalGravity: 82,
      visualDrama: 96,
      secretGemIndex: 74,
      familyMultiGen: 95,
      intimacyExclusivity: 94
    },
    signatureMoments: [
      'Pulling up beside Buckingham Palace & The Mall as your cabbie decodes centuries of royal protocol',
      'Framing Westminster Abbey & the Elizabeth Tower (Big Ben) from secret cab-only vantage points',
      'Pausing outside the guarded gates of 10 Downing Street along Whitehall’s corridor of power'
    ],
    idealPersonas: ['First-Time London VIPs', 'Time-Pressed Executives', 'Multi-Generational Families']
  },
  {
    id: 'T1AKAJ',
    title: 'Harry Potter Filming Locations in London: Private Tour in a London Taxi',
    url: 'https://travelcurious.com/united-kingdom/london/tours/harry-potter-filming-locations-in-london-private-tour-in-a-london-taxi-T1AKAJ',
    city: 'London',
    durationHours: 4,
    durationLabel: 'Private Tour · 4 hrs',
    durationBucket: 'half-day',
    priceFromGbp: 104,
    priceLabel: 'From £104 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1630664724/ysbqqghtcob87ln8q6w5.jpg',
    shortSummary: 'Enjoy a spellbinding driving tour in a private "Muggle taxi" through historic London, visiting iconic Harry Potter filming locations including the Platform 9¾ photo opportunity.',
    vibeArchetype: 'Cinematic Wizarding Lore & Victorian Diagon Alleyways',
    baseVibeScore: 98,
    vibeTags: ['cinematic-magic', 'bespoke-knowledge'],
    vibePills: ['Wizarding Cinema', 'Hidden Dickensian Alleys', 'Family Cult Favourite'],
    sensorySignature: {
      visualAura: 'Wrought-iron Victorian markets, crooked Tudor facades, dramatic Thames bridges & Gothic archways',
      sonicMood: 'Playful behind-the-scenes filmmaking trivia & spellbinding storytelling for all ages',
      pacingCadence: 'Interactive half-day hop-in/hop-out adventure with plenty of wand-ready photo stops',
      circadianPeak: 'Mid-Morning to Afternoon (optimal light inside Leadenhall & Borough Market)'
    },
    dnaRadar: {
      storytellingDepth: 95,
      subculturalGravity: 99,
      visualDrama: 94,
      secretGemIndex: 92,
      familyMultiGen: 100,
      intimacyExclusivity: 93
    },
    signatureMoments: [
      'Stepping into Leadenhall Market’s ornate Victorian arcade where Diagon Alley & The Leaky Cauldron came to life',
      'Tracing the Death Eaters’ dramatic flight path across the Millennium Bridge toward St Paul’s Cathedral',
      'Capturing the classic luggage-trolley disappearance photo at King’s Cross Platform 9¾'
    ],
    idealPersonas: ['Potterheads & Fantasy Fans', 'Families with Kids & Teens', 'Cinematic Pop-Culture Travelers']
  },
  {
    id: 'TR04SC',
    title: 'The Beatles Iconic Landmarks: Private Beatlemania Tour in a London Taxi',
    url: 'https://travelcurious.com/united-kingdom/london/tours/the-beatles-iconic-landmarks-private-beatlemania-tour-in-a-london-taxi-TR04SC',
    city: 'London',
    durationHours: 4,
    durationLabel: 'Private Tour · 4 hrs',
    durationBucket: 'half-day',
    priceFromGbp: 104,
    priceLabel: 'From £104 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1630416014/yaejcowths5lxm3dy9lu.jpg',
    shortSummary: 'Visit the haunts, studios, and homes of The Beatles across London in an iconic Black Cab, following in the footsteps of Lennon, McCartney, Harrison, and Starr.',
    vibeArchetype: '1960s Counterculture & Abbey Road Sonic Pilgrimage',
    baseVibeScore: 99,
    vibeTags: ['rock-beatles', 'bespoke-knowledge'],
    vibePills: ['Swinging 60s Soho', 'Abbey Road Crossing', 'Music History'],
    sensorySignature: {
      visualAura: 'St John’s Wood leafy studios, Carnaby Street mod colour, Mayfair townhouses & Soho neon',
      sonicMood: 'Rich 1960s rock-and-roll oral history, studio session lore & Swinging London nostalgia',
      pacingCadence: 'Rhythmic 4-hour pilgrimage linking St John’s Wood, Marylebone, Mayfair & Soho',
      circadianPeak: 'Late Morning or Afternoon (ideal street light for the Abbey Road crosswalk photo)'
    },
    dnaRadar: {
      storytellingDepth: 98,
      subculturalGravity: 100,
      visualDrama: 91,
      secretGemIndex: 95,
      familyMultiGen: 88,
      intimacyExclusivity: 96
    },
    signatureMoments: [
      'Walking the world-famous Abbey Road zebra crossing outside EMI Recording Studios & signing the studio wall',
      'Standing beneath the Apple Corps rooftop at 3 Savile Row where The Beatles played their final live concert in 1969',
      'Visiting the basement flat at Montagu Square and the Soho club doorways where Beatlemania was born'
    ],
    idealPersonas: ['Music & Vinyl Pilgrims', 'Baby Boomers & Classic Rock Fans', 'Cultural Nostalgia Seekers']
  },
  {
    id: 'TR2VLZ',
    title: 'London Calling: Rock n’ Roll Private Half-Day Tour in a London Taxi',
    url: 'https://travelcurious.com/united-kingdom/london/tours/london-calling-rock-n-roll-private-half-day-tour-in-a-london-taxi-TR2VLZ',
    city: 'London',
    durationHours: 4,
    durationLabel: 'Private Tour · 4 hrs',
    durationBucket: 'half-day',
    priceFromGbp: 104,
    priceLabel: 'From £104 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1630416014/yaejcowths5lxm3dy9lu.jpg',
    shortSummary: "Embark on an epic Rock n' Roll adventure across London's legendary music neighbourhoods—from Soho's Tin Pan Alley and Ziggy Stardust's Heddon Street to Abbey Road.",
    vibeArchetype: 'Soho Rebellion, Brit-Rock Legends & Punk Sonic Heritage',
    baseVibeScore: 97,
    vibeTags: ['rock-beatles', 'bespoke-knowledge'],
    vibePills: ['Soho Vinyl & Punk', 'Bowie, Queen & Stones', 'Counterculture Icons'],
    sensorySignature: {
      visualAura: 'Gritty Soho brick alleyways, vintage guitar shops on Denmark Street, Camden & Abbey Road',
      sonicMood: 'Electric stories of Bowie, Freddie Mercury, The Clash, Hendrix, Amy Winehouse & The Stones',
      pacingCadence: 'High-energy 4-hour subcultural crawl with iconic album-cover photo stops',
      circadianPeak: 'Afternoon into Early Evening (when Soho’s music streets come alive)'
    },
    dnaRadar: {
      storytellingDepth: 96,
      subculturalGravity: 99,
      visualDrama: 90,
      secretGemIndex: 96,
      familyMultiGen: 84,
      intimacyExclusivity: 95
    },
    signatureMoments: [
      'Standing on the exact Heddon Street cobbles where David Bowie posed for the Ziggy Stardust album sleeve',
      'Exploring Denmark Street ("Tin Pan Alley") where the Rolling Stones and Sex Pistols recorded',
      'Crossing Abbey Road and tracing Jimi Hendrix’s Mayfair Brook Street flat next door to Handel’s house'
    ],
    idealPersonas: ['Rock, Punk & Britpop Fans', 'Creative & Music Industry Travelers', 'Soho Subculture Explorers']
  },
  {
    id: 'TVX23G',
    title: 'In the Footsteps of Jack The Ripper: Private Tour in a London Taxi',
    url: 'https://travelcurious.com/united-kingdom/london/tours/in-the-footsteps-of-jack-the-ripper-private-tour-in-a-london-taxi-TVX23G',
    city: 'London',
    durationHours: 4,
    durationLabel: 'Private Tour · 4 hrs',
    durationBucket: 'half-day',
    priceFromGbp: 104,
    priceLabel: 'From £104 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1661541670/h2axc5r692vdl4xkrvoo.jpg',
    shortSummary: 'Uncover the macabre history of Jack the Ripper and the 1888 Whitechapel mysteries on a private Black Cab journey into the dark cobbled streets and Victorian pubs of the East End.',
    vibeArchetype: 'Victorian Noir, East End Gaslight & True-Crime Investigation',
    baseVibeScore: 97,
    vibeTags: ['gothic-noir', 'nocturnal-lights', 'bespoke-knowledge'],
    vibePills: ['1888 Whitechapel Noir', 'True-Crime History', 'Atmospheric East End'],
    sensorySignature: {
      visualAura: 'Shadowed Victorian brick tenements, Hawksmoor church spires, Spitalfields cobbles & Ten Bells pub tilework',
      sonicMood: 'Suspenseful forensic storytelling separating 1888 Scotland Yard case files from urban myth',
      pacingCadence: 'Atmospheric cab navigation between crime scenes with guided foot explorations down narrow courts',
      circadianPeak: 'Dusk & Evening (when shadows lengthen across Spitalfields and Whitechapel)'
    },
    dnaRadar: {
      storytellingDepth: 99,
      subculturalGravity: 97,
      visualDrama: 92,
      secretGemIndex: 96,
      familyMultiGen: 62,
      intimacyExclusivity: 96
    },
    signatureMoments: [
      'Stepping out onto the preserved Victorian cobbles of Mitre Square and Artillery Passage in the East End',
      'Inspecting the original 19th-century tilework outside The Ten Bells pub opposite Christ Church Spitalfields',
      'Hearing your cabbie’s deep-dive into Victorian social history, Scotland Yard suspects, and East End rookeries'
    ],
    idealPersonas: ['True-Crime & Mystery Enthusiasts', 'Victorian History Buffs', 'Nocturnal Atmospheric Explorers']
  },
  {
    id: 'T77QC0',
    title: 'Ghastly Ghosts of Haunted London: Private Black Cab Tour',
    url: 'https://travelcurious.com/united-kingdom/london/tours/ghastly-ghosts-of-haunted-london-private-black-cab-tour-T77QC0',
    city: 'London',
    durationHours: 4,
    durationLabel: 'Private Tour · 4 hrs',
    durationBucket: 'half-day',
    priceFromGbp: 104,
    priceLabel: 'From £104 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1680180233/v5jd4qlk27exqgyzqr8e.jpg',
    shortSummary: 'Feel the adrenaline rush as your driver-guide shares chilling stories, plague pits, medieval executions, and spectral legends across Haunted London’s darkest corners.',
    vibeArchetype: 'Gothic Folklore, Spectral Legends & Secret Crypts',
    baseVibeScore: 95,
    vibeTags: ['gothic-noir', 'nocturnal-lights', 'bespoke-knowledge'],
    vibePills: ['Haunted Folklore', 'Medieval Execution Sites', 'After-Dark Thrills'],
    sensorySignature: {
      visualAura: 'Flickering gaslamps in Charterhouse Square, ancient Smithfield cloisters & misty Thames embankments',
      sonicMood: 'Theatrical, spine-tingling tales of royal ghosts, body-snatchers, and centuries-old taverns',
      pacingCadence: 'Thrilling 4-hour nocturnal cab safari into shadowy squares where tour buses cannot fit',
      circadianPeak: 'Twilight & After-Dark'
    },
    dnaRadar: {
      storytellingDepth: 97,
      subculturalGravity: 95,
      visualDrama: 91,
      secretGemIndex: 98,
      familyMultiGen: 78,
      intimacyExclusivity: 95
    },
    signatureMoments: [
      'Gliding into quiet medieval squares built above 14th-century Black Death plague pits near Charterhouse',
      'Visiting ancient Smithfield execution grounds and hearing of the spectres haunting 500-year-old coaching inns',
      'Peering at the Tower of London’s Traitors’ Gate and Bloody Tower from the quiet nighttime riverfront'
    ],
    idealPersonas: ['Ghost-Lore & Gothic Fans', 'Adventurous Couples & Friends', 'Seekers of Off-Beat London']
  },
  {
    id: 'T5C76S',
    title: '"Darkest Hour" Filming Locations in London: Private Half-Day Tour',
    url: 'https://travelcurious.com/united-kingdom/london/tours/darkest-hour-filming-locations-in-london-private-half-day-tour-T5C76S',
    city: 'London',
    durationHours: 4,
    durationLabel: 'Private Tour · 4 hrs',
    durationBucket: 'half-day',
    priceFromGbp: 104,
    priceLabel: 'From £104 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1682603527/nx15p5ekir14t8b0f8vk.jpg',
    shortSummary: 'Step into May 1940 on a private Black Cab tour tracing the filming locations of "Darkest Hour" and the real Whitehall bunkers where Winston Churchill rallied a nation.',
    vibeArchetype: 'Wartime Statecraft, 1940s Blitz Resilience & Churchillian Drama',
    baseVibeScore: 96,
    vibeTags: ['wartime-grit', 'cinematic-magic', 'royal-power'],
    vibePills: ['Churchill’s 1940 London', 'WWII War Rooms Context', 'Political Cinema'],
    sensorySignature: {
      visualAura: 'Neoclassical Whitehall ministries, bronze wartime memorials, Mayfair cigar shops & St James’s clubs',
      sonicMood: 'Stirring historical narrative of the 1940 War Cabinet crisis, Dunkirk, and rhetoric that changed history',
      pacingCadence: 'Thought-provoking 4-hour historical deep-dive through Westminster, Whitehall & St James’s',
      circadianPeak: 'Morning or Afternoon'
    },
    dnaRadar: {
      storytellingDepth: 98,
      subculturalGravity: 93,
      visualDrama: 91,
      secretGemIndex: 89,
      familyMultiGen: 85,
      intimacyExclusivity: 96
    },
    signatureMoments: [
      'Tracing Churchill’s daily wartime route between 10 Downing Street, the Admiralty, and the King George VI memorials',
      'Visiting St James’s Street where Churchill bought his Romeo y Julieta cigars at J.J. Fox since 1900',
      'Comparing cinematic "Darkest Hour" sequences with the real bomb-scarred masonry still visible in central London'
    ],
    idealPersonas: ['WWII & Political History Connoisseurs', 'Biographical Cinema Fans', 'Discerning Cultural Travelers']
  },
  {
    id: 'TGTYRO',
    title: 'Light Up London: Private 2-Hour Night Tour in a London Taxi',
    url: 'https://travelcurious.com/united-kingdom/london/tours/light-up-london-private-2-hour-night-tour-in-a-london-taxi-TGTYRO',
    city: 'London',
    durationHours: 2,
    durationLabel: 'Private Tour · 2 hrs',
    durationBucket: 'express',
    priceFromGbp: 69,
    priceLabel: 'From £69 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1690987152/umpllq2g7xwgkjnp3ayf.jpg',
    shortSummary: 'Experience the enchanting city of London after dark on a 2-hour private Black Cab tour along the River Thames, showcasing the Illuminated River public art installation.',
    vibeArchetype: 'Nocturnal Thames Luminescence & Twilight Architectural Glamour',
    baseVibeScore: 96,
    vibeTags: ['nocturnal-lights', 'royal-power'],
    vibePills: ['Illuminated River Art', 'After-Dark Skyline', 'Romantic Evening Ride'],
    sensorySignature: {
      visualAura: 'Choreographed LED bridge lightscapes, floodlit St Paul’s dome, glittering Shard & golden Big Ben reflections',
      sonicMood: 'Unhurried evening cab glide with panoramic glass-roof views and insider nighttime photography tips',
      pacingCadence: 'Effortless 2-hour post-dinner or pre-cocktail riverfront cruise with dramatic skyline stops',
      circadianPeak: 'After-Dark & Blue Hour (19:30–22:30)'
    },
    dnaRadar: {
      storytellingDepth: 88,
      subculturalGravity: 90,
      visualDrama: 99,
      secretGemIndex: 85,
      familyMultiGen: 92,
      intimacyExclusivity: 97
    },
    signatureMoments: [
      'Crossing and photographing the Illuminated River bridges—from Westminster and Waterloo to Millennium and Tower Bridge',
      'Pausing at quiet Victoria Embankment and South Bank viewpoints for mirror-like Thames night reflections',
      'Gliding through Piccadilly Circus, Regent Street, and floodlit Trafalgar Square without daytime crowds'
    ],
    idealPersonas: ['Couples & Romantic Evening Seekers', 'Night Photographers', 'Post-Dinner Luxury Travelers']
  },
  {
    id: 'T26KP8',
    title: 'Bridgerton Filming Locations in Bath: Private Day Trip from London',
    url: 'https://travelcurious.com/united-kingdom/london/tours/bridgerton-filming-locations-in-bath-private-day-trip-from-london-T26KP8',
    city: 'London & Bath',
    durationHours: 10,
    durationLabel: 'Private Day Trip · 10 hrs',
    durationBucket: 'extended',
    priceFromGbp: 289,
    priceLabel: 'From £289 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1663772533/h5xmaeyv82adlz1d6tty.jpg',
    shortSummary: "Indulge in Regency splendour on a private 10-hour day trip from London to UNESCO-listed Bath and surrounding honey-stone villages to explore Bridgerton's real filming locations.",
    vibeArchetype: 'Regency High Society, Georgian Crescents & Period Romance',
    baseVibeScore: 97,
    vibeTags: ['countryside-regency', 'cinematic-magic', 'royal-power'],
    vibePills: ['Bridgerton Regency Sets', 'UNESCO Georgian Bath', 'Door-to-Door Day Trip'],
    sensorySignature: {
      visualAura: ' sweeping golden-stone Georgian crescents, wisteria-draped townhouses, Assembly Rooms & Pulteney Bridge',
      sonicMood: 'Gossipy Lady Whistledown-style Regency society anecdotes paired with Jane Austen architectural history',
      pacingCadence: 'Luxurious 10-hour door-to-door private excursion combining scenic countryside driving with Bath walking stops',
      circadianPeak: 'Full Day (Morning departure from your London hotel door)'
    },
    dnaRadar: {
      storytellingDepth: 94,
      subculturalGravity: 98,
      visualDrama: 99,
      secretGemIndex: 90,
      familyMultiGen: 90,
      intimacyExclusivity: 97
    },
    signatureMoments: [
      'Standing before No. 1 Royal Crescent—the iconic facade of the Featherington family residence in Bridgerton',
      'Strolling Abbey Green and the colonnades of Bath Street where Modiste dress shop and market scenes were filmed',
      'Exploring the Holburne Museum (Lady Danbury’s ball-hosting mansion) and idyllic Cotswold fringe villages'
    ],
    idealPersonas: ['Bridgerton & Period Drama Devotees', 'Romantic Couples & Friends Trips', 'Architecture & Heritage Lovers']
  },
  {
    id: 'TOIN97',
    title: 'Explore Bath & Lacock Village: Private Day Trip from London',
    url: 'https://travelcurious.com/united-kingdom/london/tours/explore-bath-lacock-village-private-day-trip-from-london-TOIN97',
    city: 'London & Bath',
    durationHours: 11,
    durationLabel: 'Private Day Trip · 11 hrs',
    durationBucket: 'extended',
    priceFromGbp: 315,
    priceLabel: 'From £315 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1682607768/taupbu9jspnwgvihkffp.jpg',
    shortSummary: 'Escape the capital on an 11-hour private Black Cab day trip to historic Roman & Georgian Bath and the untouched 13th-century timber-framed village of Lacock.',
    vibeArchetype: 'Pastoral English Heritage, Roman Thermal Springs & Medieval Lacock',
    baseVibeScore: 96,
    vibeTags: ['countryside-regency', 'cinematic-magic', 'bespoke-knowledge'],
    vibePills: ['13th-Century Lacock Village', 'Roman & Georgian Bath', 'Countryside Sanctuary'],
    sensorySignature: {
      visualAura: 'Ancient Roman thermal baths, medieval cloisters at Lacock Abbey & car-free stone cottages frozen in time',
      sonicMood: 'Tranquil West Country birdsong, babbling Avon weirs & rich 2,000-year historical storytelling',
      pacingCadence: 'Unhurried 11-hour countryside immersion with time for a traditional village pub lunch',
      circadianPeak: 'Full Day Countryside Escape'
    },
    dnaRadar: {
      storytellingDepth: 96,
      subculturalGravity: 91,
      visualDrama: 98,
      secretGemIndex: 95,
      familyMultiGen: 93,
      intimacyExclusivity: 98
    },
    signatureMoments: [
      'Wandering Lacock Village—completely free of modern telegraph poles and used for Pride & Prejudice, Downton Abbey, and Harry Potter',
      'Admiring the fan-vaulted Gothic ceiling of Bath Abbey, the Roman Baths precinct, and the Royal Crescent',
      'Stopping at a centuries-old Wiltshire coaching inn for a relaxed countryside lunch between Bath and Lacock'
    ],
    idealPersonas: ['Countryside & Village Explorers', 'History & Photography Lovers', 'Luxury Slow-Travel Guests']
  },
  {
    id: 'TSNPZ3',
    title: 'Harry Potter Locations in Oxford: Private Day Trip from London',
    url: 'https://travelcurious.com/united-kingdom/london/tours/harry-potter-locations-in-oxford-private-day-trip-from-london-TSNPZ3',
    city: 'London & Oxford',
    durationHours: 8,
    durationLabel: 'Private Day Trip · 8 hrs',
    durationBucket: 'full-day',
    priceFromGbp: 301,
    priceLabel: 'From £301 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1663100702/lvksj6hjvci69w7urdyu.jpg',
    shortSummary: 'Discover the magic of Oxford, the "City of Dreaming Spires", and explore its medieval university quads and Hogwarts filming locations on an 8-hour private Black Cab day trip.',
    vibeArchetype: 'Academic Gothic Spires, Bodleian Libraries & Hogwarts Cloisters',
    baseVibeScore: 97,
    vibeTags: ['cinematic-magic', 'countryside-regency'],
    vibePills: ['Dreaming Spires of Oxford', 'Hogwarts Cloisters', 'Literary & Academic Lore'],
    sensorySignature: {
      visualAura: 'Honey-gold medieval college quads, Radcliffe Camera rotunda, Gothic vaulted ceilings & cobbled lanes',
      sonicMood: 'blend of 800-year scholarly tradition (Tolkien, C.S. Lewis) and Hogwarts cinematic secrets',
      pacingCadence: 'Full-day 8-hour door-to-door journey from London with guided college & quadrangle exploration',
      circadianPeak: 'Full Day (09:00–17:00)'
    },
    dnaRadar: {
      storytellingDepth: 97,
      subculturalGravity: 98,
      visualDrama: 97,
      secretGemIndex: 91,
      familyMultiGen: 97,
      intimacyExclusivity: 95
    },
    signatureMoments: [
      'Stepping inside the medieval Divinity School & Bodleian Library precinct—filming site of Hogwarts Infirmary and Library',
      'Exploring New College’s ancient cloisters and the courtyard oak tree from Harry Potter and the Goblet of Fire',
      'Passing the Eagle and Child pub where J.R.R. Tolkien and C.S. Lewis met, alongside the iconic Bridge of Sighs'
    ],
    idealPersonas: ['Harry Potter & Fantasy Families', 'Literary & University Heritage Seekers', 'Architecture & History Buffs']
  },
  {
    id: 'TNGXRH',
    title: 'Discover Westminster in an Iconic London Taxi: Private 2-Hour Tour',
    url: 'https://travelcurious.com/united-kingdom/london/tours/discover-westminster-in-an-iconic-london-taxi-private-2-hour-tour-TNGXRH',
    city: 'London',
    durationHours: 2,
    durationLabel: 'Private Tour · 2 hrs',
    durationBucket: 'express',
    priceFromGbp: 78,
    priceLabel: 'From £78 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1622813299/adjbygqnz1panoq1j1oy.jpg',
    shortSummary: 'Enjoy a brisk 2-hour private driving tour of Westminster and Central London—the historic hub of British Royalty, Power, and Politics—in an iconic London Taxi.',
    vibeArchetype: 'Express Royal Orientation & Parliamentary Landmarks',
    baseVibeScore: 92,
    vibeTags: ['royal-power', 'wartime-grit'],
    vibePills: ['2-Hour Orientation', 'Royalty & Parliament', 'Great Value Private Cab'],
    sensorySignature: {
      visualAura: 'Grand ceremonial boulevards, St James’s Park greenery, Westminster Abbey & Trafalgar Square',
      sonicMood: 'Lively, punchy London orientation from a seasoned cabbie who knows every shortcut',
      pacingCadence: 'Fast-paced 2-hour whistle-stop showcase ideal for arrival day or tight schedules',
      circadianPeak: 'Morning or Early Afternoon'
    },
    dnaRadar: {
      storytellingDepth: 88,
      subculturalGravity: 80,
      visualDrama: 93,
      secretGemIndex: 72,
      familyMultiGen: 96,
      intimacyExclusivity: 92
    },
    signatureMoments: [
      'Cruising down The Mall beneath royal ceremonial standards toward Buckingham Palace',
      'Stopping for curated family or couple portraits with Big Ben and the London Eye in a single frame',
      'Learning the quirky traditions of Parliament, Horse Guards Parade, and Nelson’s Column'
    ],
    idealPersonas: ['Day-One Arrival Travelers', 'Families Seeking Zero-Fatigue Sightseeing', 'Short-Stay Business Guests']
  },
  {
    id: 'TJI8RE',
    title: 'The Premier Classic London: Private 4-Hour Tour in a London Taxi',
    url: 'https://travelcurious.com/united-kingdom/london/tours/the-premier-classic-london-private-4-hour-tour-in-a-london-taxi-TJI8RE',
    city: 'London',
    durationHours: 4,
    durationLabel: 'Private Tour · 4 hrs',
    durationBucket: 'half-day',
    priceFromGbp: 104,
    priceLabel: 'From £104 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/c_crop,h_1115,w_5354,x_0,y_597/v1/Destinations/td8ejc49mfvpbnn0uca2.jpg',
    shortSummary: 'The definitive half-day London Black Cab experience bridging Royal Westminster and the ancient Roman & Medieval City of London, with hidden gems along the way.',
    vibeArchetype: 'Definitive Half-Day London Panorama: Crown to Square Mile',
    baseVibeScore: 96,
    vibeTags: ['royal-power', 'bespoke-knowledge', 'wartime-grit'],
    vibePills: ['Westminster + City of London', 'Tower Bridge & St Paul’s', 'Hidden Backstreet Gems'],
    sensorySignature: {
      visualAura: 'Contrast of royal palaces, Christopher Wren baroque domes, medieval fortress walls & glass skyscrapers',
      sonicMood: 'Masterclass in "The Knowledge"—weaving 2,000 years of Roman Londinium to modern finance',
      pacingCadence: 'Balanced 4-hour half-day arc with 6–8 hop-out photo and secret-courtyard stops',
      circadianPeak: 'Morning (09:00–13:00) or Afternoon (13:30–17:30)'
    },
    dnaRadar: {
      storytellingDepth: 95,
      subculturalGravity: 86,
      visualDrama: 96,
      secretGemIndex: 88,
      familyMultiGen: 96,
      intimacyExclusivity: 95
    },
    signatureMoments: [
      'Linking Buckingham Palace and Westminster Abbey with St Paul’s Cathedral, the Tower of London, and Tower Bridge',
      'Ducking into tiny Fleet Street and Inns of Court alleyways completely inaccessible to tour buses',
      'Standing beside original 2nd-century Roman London Wall ruins tucked behind modern City towers'
    ],
    idealPersonas: ['First-Time Luxury Visitors', 'Multi-Generational Families', 'Culture & Architecture Seekers']
  },
  {
    id: 'TNA63G',
    title: 'The Ultimate London Tour: Private 6-Hour Tour in a London Taxi',
    url: 'https://travelcurious.com/united-kingdom/london/tours/the-ultimate-london-tour-private-6-hour-tour-in-a-london-taxi-TNA63G',
    city: 'London',
    durationHours: 6,
    durationLabel: 'Private Tour · 6 hrs',
    durationBucket: 'full-day',
    priceFromGbp: 156,
    priceLabel: 'From £156 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/c_crop,h_1250,w_6000,x_0,y_1691/v1/Destinations/lsv6tqup4or7nfimlsyj.jpg',
    shortSummary: "Discover London's most famous attractions—including 4 UNESCO World Heritage sites—plus secret neighbourhood pockets on a comprehensive 6-hour private Black Cab tour.",
    vibeArchetype: 'Grand UNESCO Collector & Multi-District Cultural Immersion',
    baseVibeScore: 97,
    vibeTags: ['royal-power', 'bespoke-knowledge', 'wartime-grit'],
    vibePills: ['4 UNESCO Heritage Sites', '6-Hour Deep Immersion', 'Pub or Market Stop Included'],
    sensorySignature: {
      visualAura: 'Sweeping coverage from Kensington & Westminster to Greenwich/Tower of London, Southwark & Mayfair',
      sonicMood: 'Deep, unhurried narrative connecting royal pageantry, maritime empire, and local neighbourhood character',
      pacingCadence: 'Full 6-hour flagship tour with time for a traditional historic pub or Borough Market lunch break',
      circadianPeak: 'Full Day (10:00–16:00)'
    },
    dnaRadar: {
      storytellingDepth: 97,
      subculturalGravity: 89,
      visualDrama: 98,
      secretGemIndex: 92,
      familyMultiGen: 95,
      intimacyExclusivity: 97
    },
    signatureMoments: [
      'Connecting London’s UNESCO World Heritage landmarks with seamless door-to-door cab privileges',
      'Exploring secret historic pubs (like Ye Olde Cheshire Cheese) and hidden Southwark riverfront wharves',
      'Customising the midday break around artisanal Borough Market bites or a classic Mayfair tavern'
    ],
    idealPersonas: ['Comprehensive Culture Collectors', 'VIP Families & Small Groups', 'Full-Day Sightseers']
  },
  {
    id: 'TJIBMY',
    title: 'The Extended Ultimate London: Private 8-Hour Tour in a London Taxi',
    url: 'https://travelcurious.com/united-kingdom/london/tours/the-extended-ultimate-london-private-8-hour-tour-in-a-london-taxi-TJIBMY',
    city: 'London',
    durationHours: 8,
    durationLabel: 'Private Tour · 8 hrs',
    durationBucket: 'full-day',
    priceFromGbp: 207,
    priceLabel: 'From £207 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/c_crop,h_396,w_1900,x_0,y_1074/v1/Destinations/uzu2pn3zgkn906thvqqx.jpg',
    shortSummary: 'The most complete single-day London experience: 8 hours in a private Black Cab spanning Royal London, the ancient City, Maritime Greenwich or Kensington, and secret villages.',
    vibeArchetype: 'All-Encompassing London Masterpiece: East to West, Royal to Bohemian',
    baseVibeScore: 96,
    vibeTags: ['royal-power', 'bespoke-knowledge', 'rock-beatles'],
    vibePills: ['8-Hour Master Itinerary', 'Icons + Bohemian Villages', 'Private Chauffeur-Historian'],
    sensorySignature: {
      visualAura: 'Every architectural era of London—from Roman walls and Tudor palaces to Notting Hill pastels & Soho',
      sonicMood: 'A full day with your personal "Knowledge" historian adapting live to your curiosities',
      pacingCadence: 'Unhurried 8-hour grand tour with time for museum interiors, afternoon tea, or riverside dining',
      circadianPeak: 'Full Day (09:30–17:30)'
    },
    dnaRadar: {
      storytellingDepth: 99,
      subculturalGravity: 91,
      visualDrama: 97,
      secretGemIndex: 95,
      familyMultiGen: 94,
      intimacyExclusivity: 98
    },
    signatureMoments: [
      'Seeing all of London in one effortless day—from Westminster, St Paul’s, and Tower Bridge to Abbey Road and Kensington',
      'Unlocking hidden mews streets, secret gardens, and medieval guildhall courtyards off the tourist map',
      'Enjoying total flexibility to linger longer at the neighbourhoods that match your personal vibe'
    ],
    idealPersonas: ['One-Day-in-London Connoisseurs', 'Multi-Gen VIP Families', 'Deep-Dive History & Culture Lovers']
  },
  {
    id: 'TGH0DN',
    title: 'London ⇄ Southampton Cruise Tour-Transfer via Stonehenge',
    url: 'https://travelcurious.com/united-kingdom/london/tours/from-london-to-southampton-private-transfer-including-stonehenge-TGH0DN',
    city: 'London · Stonehenge · Southampton',
    durationHours: 5,
    durationLabel: 'Heritage Tour-Transfer · 5 hrs',
    durationBucket: 'full-day',
    priceFromGbp: 217,
    priceLabel: 'From £217 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1682614206/oue2y3tdx4lbmiibr9jz.jpg',
    shortSummary: 'Transform your cruise transfer between London and Southampton Cruise Terminal (available in either direction) into an unforgettable 5-hour Black Cab excursion with a stop at prehistoric Stonehenge.',
    vibeArchetype: 'Neolithic Mysticism & Effortless Cruise-Port Journey',
    baseVibeScore: 94,
    vibeTags: ['countryside-regency', 'bespoke-knowledge'],
    vibePills: ['Prehistoric Stonehenge Stop', 'London ⇄ Southampton Cruise', 'Luggage + Sightseeing'],
    sensorySignature: {
      visualAura: 'Windswept Salisbury Plain chalk downs and the 4,500-year-old Neolithic stone circle',
      sonicMood: 'Ancient pagan solstice mysteries and seamless pier-to-hotel comfort with luggage securely stowed',
      pacingCadence: '5-hour door-to-ship (or ship-to-door) scenic countryside drive with a dedicated Stonehenge visit',
      circadianPeak: 'Morning Cruise Embarkation or Disembarkation Window'
    },
    dnaRadar: {
      storytellingDepth: 91,
      subculturalGravity: 93,
      visualDrama: 96,
      secretGemIndex: 84,
      familyMultiGen: 94,
      intimacyExclusivity: 96
    },
    signatureMoments: [
      'Walking around the monolithic sarsen stones and bluestones of UNESCO-listed Stonehenge on Salisbury Plain',
      'Travelling in a classic London Black Cab directly from your London hotel to your Southampton cruise gangway (or vice versa)',
      'Turning dead transit hours into a bucket-list English heritage experience with zero luggage stress'
    ],
    idealPersonas: ['Luxury Cruise Passengers ( Cunard / Silversea / Celebrity )', 'Bucket-List Heritage Travelers']
  },
  {
    id: 'TO3TAR',
    title: 'London to Southampton: Private Cruise Tour-Transfer via Windsor Castle',
    url: 'https://travelcurious.com/united-kingdom/london/tours/from-london-to-southampton-private-transfer-including-windsor-TO3TAR',
    city: 'London · Windsor · Southampton',
    durationHours: 6,
    durationLabel: 'Heritage Tour-Transfer · 6 hrs',
    durationBucket: 'full-day',
    priceFromGbp: 242,
    priceLabel: 'From £242 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1683128886/uffxghjncetwv1p1965z.jpg',
    shortSummary: 'Embark on a 6-hour heritage tour-transfer from London to Southampton Cruise Terminal in an iconic Black Cab, stopping at royal Windsor Castle along the way.',
    vibeArchetype: 'Royal Castle Grandeur & VIP Cruise Embarkation',
    baseVibeScore: 95,
    vibeTags: ['royal-power', 'countryside-regency'],
    vibePills: ['Windsor Castle Stopover', 'Royal Berkshire Countryside', 'London ➔ Southampton Cruise'],
    sensorySignature: {
      visualAura: '900-year-old crenellated Windsor battlements, St George’s Chapel Gothic stone & Thames-side Eton views',
      sonicMood: 'Stories of William the Conqueror, Queen Elizabeth II, and British royal weddings en route to your ship',
      pacingCadence: '6-hour door-to-port royal excursion with time for a self-guided tour of Windsor Castle & State Apartments',
      circadianPeak: 'Morning Departure for Afternoon Cruise Embarkation'
    },
    dnaRadar: {
      storytellingDepth: 93,
      subculturalGravity: 90,
      visualDrama: 97,
      secretGemIndex: 83,
      familyMultiGen: 95,
      intimacyExclusivity: 97
    },
    signatureMoments: [
      'Exploring Windsor Castle—the world’s oldest and largest occupied castle and final resting place of Queen Elizabeth II',
      'Viewing the Long Walk in Windsor Great Park and historic Eton College across the Thames',
      'Arriving directly at Southampton Cruise Terminal refreshed, with your luggage handled door-to-pier'
    ],
    idealPersonas: ['Royal Watchers & Cruise Guests', 'Couples & Multi-Gen Cruise Travelers']
  },
  {
    id: 'TJ1GBH',
    title: 'Enjoy a Few Hours in London: Private Heathrow Layover Black Cab Tour',
    url: 'https://travelcurious.com/united-kingdom/london/tours/enjoy-a-few-hours-in-london-private-heathrow-airport-layover-tour-TJ1GBH',
    city: 'London (Heathrow Layover)',
    durationHours: 7,
    durationLabel: 'Private Layover Tour · 7 hrs',
    durationBucket: 'full-day',
    priceFromGbp: 210,
    priceLabel: 'From £210 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1683123532/zrzherha3r3s6kfu3uot.jpg',
    shortSummary: 'Turn a long Heathrow layover into a private London adventure! Includes terminal meet-and-greet, central London landmark sightseeing in a Black Cab, and timely airport drop-off.',
    vibeArchetype: 'Jet-Set Layover Escape & Precision Icon Sightseeing',
    baseVibeScore: 93,
    vibeTags: ['bespoke-knowledge', 'royal-power'],
    vibePills: ['Heathrow Meet & Greet', 'Zero-Stress Layover Escape', 'Custom Central London Route'],
    sensorySignature: {
      visualAura: 'Trading airport lounges for Kensington palaces, Westminster Abbey, Big Ben & Tower Bridge',
      sonicMood: 'Warm London welcome right at arrivals with bus-lane priority ensuring stress-free return to your gate',
      pacingCadence: '7-hour round-trip (approx. 4 hours in Central London + express cab transfers via bus lanes)',
      circadianPeak: 'Flexible Daytime Flight Transit Window'
    },
    dnaRadar: {
      storytellingDepth: 91,
      subculturalGravity: 84,
      visualDrama: 94,
      secretGemIndex: 87,
      familyMultiGen: 95,
      intimacyExclusivity: 98
    },
    signatureMoments: [
      'Being met at Heathrow Arrivals by your "Knowledge" cabbie and whisked into London via priority taxi lanes',
      'Checking off Buckingham Palace, Big Ben, St Paul’s, and Tower Bridge with luggage safely locked in the cab',
      'Customising your layover around a classic fish-and-chips pub stop or Harrods visit before returning to Heathrow'
    ],
    idealPersonas: ['International Layover Travelers', 'VIP Transit Passengers', 'First-Time London Stopovers']
  },
  {
    id: 'TTBDTB',
    title: 'Build Your Own 4-Hour Bespoke Private Tour in a London Black Cab',
    url: 'https://travelcurious.com/united-kingdom/london/tours/build-your-own-4-hour-private-tour-in-a-london-taxi-TTBDTB',
    city: 'London',
    durationHours: 4,
    durationLabel: 'Bespoke Private Tour · 4 hrs',
    durationBucket: 'half-day',
    priceFromGbp: 104,
    priceLabel: 'From £104 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1680101253/meqwskulwerhrvtticdn.jpg',
    shortSummary: 'Design your dream 4-hour London itinerary with an accredited Black Cab driver-guide—taking the secret backstreets and hidden courtyards that tour buses can never reach.',
    vibeArchetype: 'Bespoke "Knowledge" Curation & Secret Backstreet Discovery',
    baseVibeScore: 97,
    vibeTags: ['bespoke-knowledge', 'royal-power', 'rock-beatles', 'gothic-noir'],
    vibePills: ['100% Custom Half-Day', 'Secret Mews & Backstreets', 'Driver "Knowledge" Curation'],
    sensorySignature: {
      visualAura: 'Tailored to your taste—from Notting Hill mews and Chelsea boutiques to medieval alleys & street art',
      sonicMood: 'Unscripted, spontaneous storytelling powered by the world’s toughest geographical memory test',
      pacingCadence: '100% guest-controlled 4-hour cadence—stop wherever catches your eye',
      circadianPeak: 'Anytime (Morning, Afternoon, or Twilight)'
    },
    dnaRadar: {
      storytellingDepth: 97,
      subculturalGravity: 96,
      visualDrama: 94,
      secretGemIndex: 100,
      familyMultiGen: 96,
      intimacyExclusivity: 99
    },
    signatureMoments: [
      'Co-creating a bespoke route on the spot—mixing famous icons with London’s smallest police station and hidden Roman baths',
      'Gliding through floral residential mews in Kensington and Belgravia where coaches are prohibited',
      'Combining two vibes in one half-day (e.g., Royal Westminster + Beatles Abbey Road or Dickensian Hidden Gems)'
    ],
    idealPersonas: ['Repeat London Visitors', 'Curious Explorers Who Hate Fixed Scripts', 'Bespoke Luxury Travelers']
  },
  {
    id: 'TYE4O3',
    title: 'Build Your Own 6-Hour Bespoke Private London Tour in a Black Cab',
    url: 'https://travelcurious.com/united-kingdom/london/tours/build-your-own-6-hour-private-london-tour-in-a-black-cab-TYE4O3',
    city: 'London',
    durationHours: 6,
    durationLabel: 'Bespoke Private Tour · 6 hrs',
    durationBucket: 'full-day',
    priceFromGbp: 184,
    priceLabel: 'From £184 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1680101232/brkahhbozetilljlcpan.jpg',
    shortSummary: 'Six hours of complete freedom in an iconic London Black Cab—blend literary Bloomsbury, culinary markets, royal icons, or subcultural East End neighbourhoods at your own pace.',
    vibeArchetype: 'Full-Day Tailor-Made London Salon on Wheels',
    baseVibeScore: 96,
    vibeTags: ['bespoke-knowledge', 'royal-power', 'cinematic-magic', 'rock-beatles'],
    vibePills: ['6-Hour Custom Odyssey', 'Multi-Neighbourhood Blend', 'Secret Courtyards & Markets'],
    sensorySignature: {
      visualAura: 'Seamless transitions across 5+ distinct London villages—Mayfair, Soho, Bloomsbury, City & Shoreditch',
      sonicMood: 'Conversational insider access to London’s architecture, culinary haunts, and eccentric history',
      pacingCadence: 'Relaxed 6-hour bespoke flow with time for gallery stops, boutique shopping, or a long lunch',
      circadianPeak: 'Full Day Custom Schedule'
    },
    dnaRadar: {
      storytellingDepth: 98,
      subculturalGravity: 95,
      visualDrama: 95,
      secretGemIndex: 99,
      familyMultiGen: 96,
      intimacyExclusivity: 99
    },
    signatureMoments: [
      'Blending bespoke themes (e.g., Harry Potter + Rock ’n’ Roll + Royal Palaces) into a single seamless day',
      'Stopping at your cabbie’s favourite hidden riverside pubs in Wapping or artisan stalls in Maltby Street',
      'Pausing whenever you spot an intriguing archway, antique arcade, or view'
    ],
    idealPersonas: ['Discerning Families & Couples', 'Design, Art & Food Enthusiasts', 'Bespoke Itinerary Seekers']
  },
  {
    id: 'T0IE5Y',
    title: 'Build Your Own 8 to 10-Hour Grand Bespoke Black Cab Odyssey',
    url: 'https://travelcurious.com/united-kingdom/london/tours/build-your-own-10-hour-private-london-tour-in-a-black-cab-T0IE5Y',
    city: 'London & Surrounds',
    durationHours: 9,
    durationLabel: 'Bespoke Private Tour · 7–10 hrs',
    durationBucket: 'extended',
    priceFromGbp: 210,
    priceLabel: 'From £210–£289 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1680101189/bukpabuaual5gh41yrzq.jpg',
    shortSummary: 'Your private Black Cab and "Knowledge" driver-guide for an entire 7, 8, 9, or 10-hour day—covering Greater London, Hampton Court, Greenwich, or Windsor on your terms.',
    vibeArchetype: 'Ultimate Private Chauffeur-Historian & Full-Day Carte Blanche',
    baseVibeScore: 96,
    vibeTags: ['bespoke-knowledge', 'royal-power', 'countryside-regency', 'nocturnal-lights'],
    vibePills: ['7–10 Hr Carte Blanche', 'London + Outer Palaces', 'VIP Door-to-Door Freedom'],
    sensorySignature: {
      visualAura: 'From central London icons out to Greenwich Royal Observatory, Hampton Court Tudor chimneys, or Kew',
      sonicMood: 'Unrivalled depth of storytelling from morning coffee through golden-hour sunset along the Thames',
      pacingCadence: 'Full-day private command of an accredited Black Cab (available in 7h, 8h, 9h, and 10h durations)',
      circadianPeak: 'Morning to Evening Full Circadian Arc'
    },
    dnaRadar: {
      storytellingDepth: 99,
      subculturalGravity: 94,
      visualDrama: 98,
      secretGemIndex: 100,
      familyMultiGen: 95,
      intimacyExclusivity: 100
    },
    signatureMoments: [
      'Linking central London’s hidden gems with outer royal estates like Hampton Court Palace or Maritime Greenwich',
      'Keeping your private Black Cab waiting outside museums, restaurants, and West End venues all day long',
      'Transitioning seamlessly from daytime architectural discovery into an illuminated evening finale'
    ],
    idealPersonas: ['Ultra-Bespoke VIP Travelers', 'Multi-Generational Families', 'Private Concierge Clients'],
    durationVariants: [
      { label: '7 Hours', price: 'From £210 / person', url: 'https://travelcurious.com/united-kingdom/london/tours/build-your-own-7-hour-private-london-tour-in-a-black-cab-TVG3WF' },
      { label: '8 Hours', price: 'From £237 / person', url: 'https://travelcurious.com/united-kingdom/london/tours/build-your-own-8-hour-private-tour-in-a-london-taxi-TP56NN' },
      { label: '9 Hours', price: 'From £263 / person', url: 'https://travelcurious.com/united-kingdom/london/tours/build-your-own-9-hour-private-london-tour-in-a-black-cab-TVWKXB' },
      { label: '10 Hours', price: 'From £289 / person', url: 'https://travelcurious.com/united-kingdom/london/tours/build-your-own-10-hour-private-london-tour-in-a-black-cab-T0IE5Y' }
    ]
  }
];

/**
 * Compute dynamic Vibe Match score (0-100) and matched reasons for a tour
 * given selected vibe category IDs and free-text vibe search query.
 */
export function scoreTourByVibes(tour, selectedVibes = [], searchQuery = '', durationFilter = 'all') {
  if (durationFilter !== 'all' && tour.durationBucket !== durationFilter) {
    return { visible: false, matchScore: 0, matchedVibes: [] };
  }

  const q = (searchQuery || '').toLowerCase().trim();
  const hasVibeFilters = Array.isArray(selectedVibes) && selectedVibes.length > 0;
  const hasQuery = q.length > 0;

  if (!hasVibeFilters && !hasQuery) {
    return {
      visible: true,
      matchScore: tour.baseVibeScore,
      matchedVibes: tour.vibeTags
    };
  }

  let matchedVibes = [];
  let filterScore = 0;

  if (hasVibeFilters) {
    matchedVibes = selectedVibes.filter(v => tour.vibeTags.includes(v));
    if (matchedVibes.length === 0 && !hasQuery) {
      return { visible: false, matchScore: 0, matchedVibes: [] };
    }
    const overlapRatio = matchedVibes.length / selectedVibes.length;
    const primaryBonus = tour.vibeTags[0] && selectedVibes.includes(tour.vibeTags[0]) ? 6 : 0;
    filterScore = Math.min(99, Math.round(78 + overlapRatio * 16 + primaryBonus));
  }

  let queryScore = 0;
  let queryMatched = false;
  if (hasQuery) {
    const searchable = [
      tour.title,
      tour.shortSummary,
      tour.vibeArchetype,
      ...(tour.vibePills || []),
      ...(tour.signatureMoments || []),
      ...(tour.idealPersonas || []),
      tour.sensorySignature?.visualAura,
      tour.sensorySignature?.sonicMood
    ].join(' ').toLowerCase();

    // Also match query tokens against VIBE_FILTER_CATEGORIES keywords
    const inferredVibeIds = VIBE_FILTER_CATEGORIES
      .filter(cat => cat.keywords.some(kw => q.includes(kw) || kw.includes(q)))
      .map(cat => cat.id);

    const tokens = q.split(/\s+/).filter(t => t.length >= 2);
    const tokenHits = tokens.filter(t => searchable.includes(t)).length;
    const inferredHits = inferredVibeIds.filter(id => tour.vibeTags.includes(id));

    if (tokenHits > 0 || inferredHits.length > 0) {
      queryMatched = true;
      matchedVibes = [...new Set([...matchedVibes, ...inferredHits])];
      const tokenRatio = tokens.length > 0 ? tokenHits / tokens.length : 0;
      const inferredBonus = inferredHits.length * 8;
      queryScore = Math.min(99, Math.round(80 + tokenRatio * 14 + inferredBonus));
    }
  }

  if (hasQuery && !queryMatched && (!hasVibeFilters || matchedVibes.length === 0)) {
    return { visible: false, matchScore: 0, matchedVibes: [] };
  }

  if (hasVibeFilters && matchedVibes.length === 0) {
    return { visible: false, matchScore: 0, matchedVibes: [] };
  }

  const finalScore = (hasVibeFilters && hasQuery)
    ? Math.min(99, Math.round((filterScore * 0.55) + (queryScore * 0.45) + 3))
    : (hasVibeFilters ? filterScore : queryScore);

  return {
    visible: true,
    matchScore: Math.max(tour.baseVibeScore - 4, finalScore),
    matchedVibes
  };
}
