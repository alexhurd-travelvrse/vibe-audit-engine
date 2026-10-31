// AtmosVibe Pure Atmospheric Tour Signatures for Travel Curious — London Black Cab Heritage Tours
// Source Collection: https://travelcurious.com/collections/black-cab-heritage-tours (Airport transfers excluded)

export const VIBE_FILTER_CATEGORIES = [
  {
    id: 'rock-beatles',
    label: 'Rebel Soho, Vinyl & 60s Icons',
    moodWord: 'Electric · Nostalgic · Countercultural',
    icon: '🎸',
    shortDesc: 'Swinging Sixties recording studios, Tin Pan Alley guitar shops & Abbey Road legends',
    color: '#f43f5e',
    keywords: ['beatles', 'rock', 'music', 'abbey road', 'lennon', 'mccartney', 'soho', '60s', 'swinging', 'vinyl', 'rolling stones', 'bowie', 'punk', 'rebel', 'counterculture']
  },
  {
    id: 'gothic-noir',
    label: 'Gaslight Noir, Shadows & Dark Lore',
    moodWord: 'Moody · Mysterious · Spine-Tingling',
    icon: '🕯️',
    shortDesc: '1888 Whitechapel cobbles, misty Spitalfields alleys, plague pits & spectral folklore',
    color: '#10b981',
    keywords: ['jack the ripper', 'ghost', 'haunted', 'macabre', 'dark', 'murder', 'whitechapel', 'victorian', 'noir', 'spooky', 'creepy', 'east end', 'mystery', 'shadows', 'gaslight']
  },
  {
    id: 'cinematic-magic',
    label: 'Cinematic Fantasy & Story Worlds',
    moodWord: 'Spellbinding · Theatrical · Immersive',
    icon: '🎬',
    shortDesc: 'Wizarding Diagon Alleyways, Hogwarts Oxford cloisters & silver-screen London sets',
    color: '#a855f7',
    keywords: ['harry potter', 'magic', 'wizard', 'muggle', 'film', 'filming', 'movie', 'cinema', 'platform', 'bridgerton', 'darkest hour', 'oxford', 'hogwarts', 'fantasy', 'story']
  },
  {
    id: 'royal-power',
    label: 'Sovereign Grandeur & Power Corridors',
    moodWord: 'Majestic · Ceremonial · Iconic',
    icon: '👑',
    shortDesc: 'Gilded palace gates, Westminster pageantry, royal parks & 1,000-year crown history',
    color: '#ffd700',
    keywords: ['royal', 'royalty', 'queen', 'king', 'palace', 'buckingham', 'westminster', 'parliament', 'big ben', 'windsor', 'classic', 'unesco', 'monarchy', 'ceremonial', 'grandeur']
  },
  {
    id: 'wartime-grit',
    label: 'Wartime Intrigue & Secret Bunkers',
    moodWord: 'Gripping · Stoic · Dramatic',
    icon: '🏛️',
    shortDesc: 'May 1940 Blitz resilience, Whitehall war corridors, espionage & Churchillian drama',
    color: '#f59e0b',
    keywords: ['churchill', 'war', 'wwii', 'ww2', 'darkest hour', 'blitz', 'bunker', 'whitehall', '1940', 'history', 'intrigue', 'downing']
  },
  {
    id: 'countryside-regency',
    label: 'Regency Romance & Honey-Stone Escape',
    moodWord: 'Pastoral · Elegant · Slow-Luxury',
    icon: '🌿',
    shortDesc: 'Georgian Bath crescents, 13th-century Lacock village, dreaming spires & ancient monoliths',
    color: '#34d399',
    keywords: ['bath', 'lacock', 'cotswolds', 'countryside', 'regency', 'georgian', 'oxford', 'stonehenge', 'windsor', 'village', 'day trip', 'romance', 'honey-stone']
  },
  {
    id: 'nocturnal-lights',
    label: 'Blue-Hour Neon & Illuminated Thames',
    moodWord: 'Romantic · Nocturnal · High-Glamour',
    icon: '🌃',
    shortDesc: 'Choreographed river bridge lightscapes, floodlit domes & glittering after-dark reflections',
    color: '#00e5ff',
    keywords: ['night', 'light', 'illuminated', 'evening', 'after dark', 'twilight', 'thames', 'sunset', 'romantic', 'bridges', 'neon', 'skyline', 'blue hour']
  },
  {
    id: 'bespoke-knowledge',
    label: 'Secret Alleyways & Insider "Knowledge"',
    moodWord: 'Off-Radar · Curious · Unscripted',
    icon: '🧭',
    shortDesc: 'Hidden Roman ruins, Dickensian courts, historic riverside taverns & unscripted cabbie lore',
    color: '#38bdf8',
    keywords: ['custom', 'bespoke', 'build your own', 'hidden gems', 'secret', 'flexible', 'private', 'layover', 'tailored', 'backstreets', 'knowledge', 'alleys', 'taverns']
  }
];

export const SAMPLE_VIBE_PROMPTS = [
  {
    label: '🎸 Electric 1960s Soho vinyl clubs & Abbey Road nostalgia',
    query: '1960s Beatlemania Abbey Road rock and roll Soho vinyl counterculture',
    vibes: ['rock-beatles']
  },
  {
    label: '🕯️ Gaslit 1888 Victorian Noir & shadowy East End mysteries',
    query: 'Moody Victorian mysteries haunted ghost stories Jack the Ripper dark alleyways',
    vibes: ['gothic-noir']
  },
  {
    label: '🌃 Romantic blue-hour Thames bridges & neon night glamour',
    query: 'Night tour illuminated river Thames lights evening skyline romantic',
    vibes: ['nocturnal-lights']
  },
  {
    label: '🌿 Regency high-society romance & honey-stone Bath crescents',
    query: 'Bridgerton Regency romance Bath Lacock countryside escape',
    vibes: ['countryside-regency', 'cinematic-magic']
  },
  {
    label: '🎬 Spellbinding wizarding alleys & medieval Hogwarts cloisters',
    query: 'Magical Harry Potter filming locations wizarding London Oxford',
    vibes: ['cinematic-magic']
  },
  {
    label: '🧭 Off-radar medieval courts, Roman ruins & secret taverns',
    query: 'Secret alleyways hidden gems Dickensian courts bespoke knowledge',
    vibes: ['bespoke-knowledge']
  }
];

export const TRAVEL_CURIOUS_BLACK_CAB_TOURS = [
  {
    id: 'TR04SC',
    title: 'The Beatles Iconic Landmarks: Private Beatlemania Tour',
    url: 'https://travelcurious.com/united-kingdom/london/tours/the-beatles-iconic-landmarks-private-beatlemania-tour-in-a-london-taxi-TR04SC',
    city: 'London',
    durationHours: 4,
    durationLabel: '4 hrs · Private Black Cab',
    priceFromGbp: 104,
    priceLabel: 'From £104 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1630416014/yaejcowths5lxm3dy9lu.jpg',
    originalCatalogueCopy: 'Visit the haunts and the homes of The Beatles across London in an iconic London Taxi and discover their history in the English capital following the steps of Lennon, McCartney, Harrison, and Starr.',
    vibeArchetype: '1960s Counterculture & Abbey Road Sonic Pilgrimage',
    shortlistHook: 'Puts you right on the Abbey Road zebra crossing and beneath the Savile Row rooftop where Swinging Sixties London changed music forever.',
    baseVibeScore: 99,
    vibeTags: ['rock-beatles', 'bespoke-knowledge'],
    vibePills: ['Swinging 60s Soho', 'Abbey Road Stride', 'Savile Row Rooftop'],
    fiveSignalSignature: {
      eraWorld: '1962–1969 Swinging London, Mod Mayfair & Counterculture Soho',
      visualAura: 'Leafy St John’s Wood studio walls, Carnaby neon, Georgian townhouses & iconic white crosswalks',
      raconteurEnergy: 'Passionate rock-history insider spinning backstage studio lore & 1960s club anecdotes',
      emotionalMood: 'Nostalgic, electric, rebellious & joyously musical',
      peakWindow: 'Late Morning or Golden Afternoon (for iconic Abbey Road street lighting)'
    },
    dnaRadar: {
      eraImmersion: 99,
      sensoryDrama: 92,
      raconteurCharisma: 98,
      secretAlleyIndex: 95,
      shortlistMagnetism: 99
    },
    signatureMoments: [
      'Striding across the world-famous Abbey Road zebra crossing outside EMI Studios & signing the white studio wall',
      'Standing beneath 3 Savile Row where The Beatles played their final unannounced 42-minute rooftop concert in 1969',
      'Ducking into the Soho alleyways, Marylebone basement flats, and Mayfair doorways where Beatlemania erupted'
    ]
  },
  {
    id: 'TR2VLZ',
    title: 'London Calling: Rock n’ Roll Private Half-Day Tour',
    url: 'https://travelcurious.com/united-kingdom/london/tours/london-calling-rock-n-roll-private-half-day-tour-in-a-london-taxi-TR2VLZ',
    city: 'London',
    durationHours: 4,
    durationLabel: '4 hrs · Private Black Cab',
    priceFromGbp: 104,
    priceLabel: 'From £104 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1630416014/yaejcowths5lxm3dy9lu.jpg',
    originalCatalogueCopy: "Embark on an epic Rock n' Roll adventure with Black Cab Heritage Tours and learn all about the London's rock scene including a photo opportunity at the iconic Abbey Road crossing.",
    vibeArchetype: 'Soho Rebellion, Vinyl Legends & Glam-to-Punk Sonic Grit',
    shortlistHook: 'Trades polite sightseeing for the gritty Soho cobbles where Bowie, Hendrix, Queen, The Clash, and The Stones rewrote rock history.',
    baseVibeScore: 97,
    vibeTags: ['rock-beatles', 'bespoke-knowledge'],
    vibePills: ['Ziggy Stardust Alley', 'Tin Pan Alley Vinyl', 'Bowie · Hendrix · Queen'],
    fiveSignalSignature: {
      eraWorld: '1960s–1980s Soho Rock Clubs, Glam Rock Alleyways & Punk Counterculture',
      visualAura: 'Vintage guitar shop windows on Denmark Street, red-brick Heddon Street & bohemian Soho neon',
      raconteurEnergy: 'Witty music-scene raconteur sharing wild backstage tales of Bowie, Freddie Mercury & Hendrix',
      emotionalMood: 'Edgy, high-voltage, bohemian & fiercely iconic',
      peakWindow: 'Afternoon into Early Evening (when Soho’s music streets hum with life)'
    },
    dnaRadar: {
      eraImmersion: 98,
      sensoryDrama: 91,
      raconteurCharisma: 97,
      secretAlleyIndex: 96,
      shortlistMagnetism: 97
    },
    signatureMoments: [
      'Standing on the exact Heddon Street cobbles where David Bowie stood in the rain as Ziggy Stardust',
      'Cruising down Denmark Street ("Tin Pan Alley") where the Rolling Stones and Sex Pistols laid down tracks',
      'Visiting Jimi Hendrix’s Mayfair flat on Brook Street and crossing the legendary Abbey Road crosswalk'
    ]
  },
  {
    id: 'TVX23G',
    title: 'In the Footsteps of Jack The Ripper: Victorian Noir Tour',
    url: 'https://travelcurious.com/united-kingdom/london/tours/in-the-footsteps-of-jack-the-ripper-private-tour-in-a-london-taxi-TVX23G',
    city: 'London',
    durationHours: 4,
    durationLabel: '4 hrs · Private Black Cab',
    priceFromGbp: 104,
    priceLabel: 'From £104 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1661541670/h2axc5r692vdl4xkrvoo.jpg',
    originalCatalogueCopy: 'Hear the macabre history of Jack the Ripper and the "Whitechapel Murders" on a private driving tour to the East End of London through the alleyways and dark streets of Whitechapel.',
    vibeArchetype: '1888 Whitechapel Gaslight Noir & East End Shadows',
    shortlistHook: 'Uses the private cab as a warm Victorian time capsule—gliding between shadowed Spitalfields courts, Hawksmoor spires, and 1888 tavern doorways.',
    baseVibeScore: 98,
    vibeTags: ['gothic-noir', 'nocturnal-lights', 'bespoke-knowledge'],
    vibePills: ['1888 Gaslight Noir', 'Spitalfields Cobbles', 'Victorian Crime Lore'],
    fiveSignalSignature: {
      eraWorld: 'Autumn 1888 Victorian East End — Fog, Rookeries & Scotland Yard Case Files',
      visualAura: 'Dark Spitalfields brick passages, Hawksmoor baroque church towers & original Victorian pub tilework',
      raconteurEnergy: 'Masterful noir investigator weaving suspense, social history, and forensic mystery',
      emotionalMood: 'Cinematic, suspenseful, brooding & deeply atmospheric',
      peakWindow: 'Dusk & Twilight (when long shadows transform Whitechapel’s cobbled passages)'
    },
    dnaRadar: {
      eraImmersion: 99,
      sensoryDrama: 96,
      raconteurCharisma: 99,
      secretAlleyIndex: 97,
      shortlistMagnetism: 98
    },
    signatureMoments: [
      'Stepping from the cab onto the quiet Victorian cobbles of Mitre Square and narrow Artillery Passage',
      'Peering into the original 1888 patterned tilework of The Ten Bells beneath the shadow of Christ Church Spitalfields',
      'Connecting the stark contrast between Victorian East End rookeries and the glittering City of London next door'
    ]
  },
  {
    id: 'T77QC0',
    title: 'Ghastly Ghosts of Haunted London: After-Dark Folklore Tour',
    url: 'https://travelcurious.com/united-kingdom/london/tours/ghastly-ghosts-of-haunted-london-private-black-cab-tour-T77QC0',
    city: 'London',
    durationHours: 4,
    durationLabel: '4 hrs · Private Black Cab',
    priceFromGbp: 104,
    priceLabel: 'From £104 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1680180233/v5jd4qlk27exqgyzqr8e.jpg',
    originalCatalogueCopy: 'Feel the adrenaline rush as we share with you nightmarish stories and creepy characters on this London Ghastly Ghost Tour in an iconic Black Cab.',
    vibeArchetype: 'Gothic Folklore, Plague-Pit Squares & Spectral Nocturne',
    shortlistHook: 'Unlocks hushed medieval cloisters, execution squares, and 500-year-old haunted coaching inns that tour buses can never enter.',
    baseVibeScore: 95,
    vibeTags: ['gothic-noir', 'nocturnal-lights', 'bespoke-knowledge'],
    vibePills: ['Gothic Ghost Lore', 'Medieval Cloisters', 'Shadowy Squares'],
    fiveSignalSignature: {
      eraWorld: 'Medieval Black Death London, Tudor Execution Grounds & Georgian Body-Snatchers',
      visualAura: 'Flickering gaslamps in Charterhouse Square, ancient Smithfield arches & misty Thames embankments',
      raconteurEnergy: 'Theatrical folklore storyteller balancing spine-tingling chills with dark London wit',
      emotionalMood: 'Eerie, theatrical, intimate & deliciously uncanny',
      peakWindow: 'Twilight & After-Dark'
    },
    dnaRadar: {
      eraImmersion: 95,
      sensoryDrama: 94,
      raconteurCharisma: 97,
      secretAlleyIndex: 98,
      shortlistMagnetism: 95
    },
    signatureMoments: [
      'Gliding into silent Charterhouse Square above 14th-century plague pits while the city buzzes blocks away',
      'Exploring ancient Smithfield cloisters and hearing of royal spectres around the Bloody Tower',
      'Discovering hidden graveyards, body-snatcher watchtowers, and London’s most haunted historic pubs'
    ]
  },
  {
    id: 'T1AKAJ',
    title: 'Harry Potter Filming Locations: Private "Muggle Taxi" Tour',
    url: 'https://travelcurious.com/united-kingdom/london/tours/harry-potter-filming-locations-in-london-private-tour-in-a-london-taxi-T1AKAJ',
    city: 'London',
    durationHours: 4,
    durationLabel: '4 hrs · Private Black Cab',
    priceFromGbp: 104,
    priceLabel: 'From £104 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1630664724/ysbqqghtcob87ln8q6w5.jpg',
    originalCatalogueCopy: 'Enjoy a driving tour in a Muggle taxi through historic London, and visit some of the most iconic Harry Potter filming locations including the perfect photo opportunity at Platform 3/4!',
    vibeArchetype: 'Wizarding Cinema, Victorian Arcades & Enchanted Alleyways',
    shortlistHook: 'Transforms real Victorian arcades and Dickensian lanes into Diagon Alley and the Ministry of Magic from the comfort of your own private Muggle cab.',
    baseVibeScore: 98,
    vibeTags: ['cinematic-magic', 'bespoke-knowledge'],
    vibePills: ['Diagon Alley Arcades', 'Ministry of Magic', 'Platform 9¾'],
    fiveSignalSignature: {
      eraWorld: 'Wizarding London & Ornate Victorian Gothic Architecture',
      visualAura: 'Gilded wrought-iron roofs at Leadenhall Market, crooked narrow courts & dramatic Thames bridges',
      raconteurEnergy: 'Warm, spellbinding storyteller packed with behind-the-camera secrets and film trivia',
      emotionalMood: 'Wonder-filled, playful, cinematic & magical across generations',
      peakWindow: 'Mid-Morning or Afternoon (when sunlight filters through Leadenhall’s glass roof)'
    },
    dnaRadar: {
      eraImmersion: 98,
      sensoryDrama: 95,
      raconteurCharisma: 96,
      secretAlleyIndex: 93,
      shortlistMagnetism: 98
    },
    signatureMoments: [
      'Stepping beneath the crimson-and-gold Victorian arches of Leadenhall Market where Diagon Alley was filmed',
      'Discovering Goodwin’s Court—the gaslit, bow-windowed 17th-century alley that inspired Knockturn Alley',
      'Tracing the Death Eaters’ swoop across Millennium Bridge before the iconic Platform 9¾ trolley photo'
    ]
  },
  {
    id: 'TSNPZ3',
    title: 'Harry Potter Locations in Oxford: "City of Dreaming Spires"',
    url: 'https://travelcurious.com/united-kingdom/london/tours/harry-potter-locations-in-oxford-private-day-trip-from-london-TSNPZ3',
    city: 'London & Oxford',
    durationHours: 8,
    durationLabel: '8 hrs · Private Day Trip',
    priceFromGbp: 301,
    priceLabel: 'From £301 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1663100702/lvksj6hjvci69w7urdyu.jpg',
    originalCatalogueCopy: 'Discover the magic of Oxford known as the "City of Dreaming Spires", and see the many Harry Potter filming locations on this private day trip from London in an iconic Black Cab.',
    vibeArchetype: 'Medieval Cloisters, Hogwarts Vaults & Scholarly Fantasy',
    shortlistHook: 'Immerses you inside actual 15th-century Gothic vaults, ancient college quadrangles, and the literary haunts of Tolkien and C.S. Lewis.',
    baseVibeScore: 97,
    vibeTags: ['cinematic-magic', 'countryside-regency'],
    vibePills: ['Hogwarts Cloisters', 'Dreaming Spires', 'Tolkien & Lewis Lore'],
    fiveSignalSignature: {
      eraWorld: '15th-Century Academic Gothic & Hogwarts Great Hall Inspirations',
      visualAura: 'Honey-gold limestone quads, fan-vaulted medieval ceilings, Radcliffe Camera & ancient oak trees',
      raconteurEnergy: 'Cultured storyteller blending 800 years of Oxford eccentricity with cinematic Hogwarts magic',
      emotionalMood: 'Awe-inspiring, scholarly, timeless & storybook-magical',
      peakWindow: 'Full-Day Golden Stone Immersion'
    },
    dnaRadar: {
      eraImmersion: 98,
      sensoryDrama: 97,
      raconteurCharisma: 95,
      secretAlleyIndex: 91,
      shortlistMagnetism: 97
    },
    signatureMoments: [
      'Standing beneath the intricate 1480s stone fan-vaulting of the Divinity School (Hogwarts Infirmary & Dance Hall)',
      'Wandering New College’s medieval cloisters and the gnarled courtyard oak tree from Goblet of Fire',
      'Gliding past the Bridge of Sighs, Bodleian Library, and the historic taverns where Narnia and Middle-earth were conceived'
    ]
  },
  {
    id: 'T26KP8',
    title: 'Bridgerton Filming Locations in Bath: Regency Day Trip',
    url: 'https://travelcurious.com/united-kingdom/london/tours/bridgerton-filming-locations-in-bath-private-day-trip-from-london-T26KP8',
    city: 'London & Bath',
    durationHours: 10,
    durationLabel: '10 hrs · Private Day Trip',
    priceFromGbp: 289,
    priceLabel: 'From £289 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1663772533/h5xmaeyv82adlz1d6tty.jpg',
    originalCatalogueCopy: "Explore Bridgerton's stunning film locations on this day trip from London to the UNESCO World Heritage City of Bath, the surrounding Cotswold Villages and countryside in an iconic London Black Cab",
    vibeArchetype: 'Regency High Society, Honey-Stone Crescents & Period Romance',
    shortlistHook: 'Lets you step straight into Lady Whistledown’s 1813 Mayfair—sweeping across Bath’s golden Georgian crescents and wisteria-draped facades.',
    baseVibeScore: 98,
    vibeTags: ['countryside-regency', 'cinematic-magic', 'royal-power'],
    vibePills: ['Regency Ballroom Glamour', 'Royal Crescent Bath', 'Jane Austen & Bridgerton'],
    fiveSignalSignature: {
      eraWorld: '1813 Regency Aristocracy, Jane Austen Society & Georgian Splendour',
      visualAura: 'Sunlit Bath stone crescents, colonnaded promenades, Pulteney Bridge & rolling West Country hills',
      raconteurEnergy: 'Charming period-drama raconteur serving Regency scandal, architectural secrets & filming lore',
      emotionalMood: 'Romantic, opulent, sun-drenched & delightfully escapist',
      peakWindow: 'Full Day — Morning Countryside Glide to Afternoon Georgian Promenade'
    },
    dnaRadar: {
      eraImmersion: 99,
      sensoryDrama: 98,
      raconteurCharisma: 95,
      secretAlleyIndex: 90,
      shortlistMagnetism: 98
    },
    signatureMoments: [
      'Arriving at the sweeping Palladian arc of No. 1 Royal Crescent—the iconic Featherington residence in Bridgerton',
      'Strolling Abbey Green’s cobbled square and Bath Street’s colonnades where Modiste and society promenades were shot',
      'Admiring Lady Danbury’s mansion (the Holburne Museum) surrounded by Sydney Pleasure Gardens'
    ]
  },
  {
    id: 'TOIN97',
    title: 'Explore Bath & 13th-Century Lacock Village: Countryside Escape',
    url: 'https://travelcurious.com/united-kingdom/london/tours/explore-bath-lacock-village-private-day-trip-from-london-TOIN97',
    city: 'London, Bath & Wiltshire',
    durationHours: 11,
    durationLabel: '11 hrs · Private Day Trip',
    priceFromGbp: 315,
    priceLabel: 'From £315 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1682607768/taupbu9jspnwgvihkffp.jpg',
    originalCatalogueCopy: 'Discover historic Bath and Lacock Village on a private day trip just 2 hours away from London to the charming English countryside in an iconic London Taxi.',
    vibeArchetype: 'Untouched Medieval England, Roman Thermal Springs & Pastoral Calm',
    shortlistHook: 'Pairs the thermal grandeur of Roman & Georgian Bath with Lacock—a village with zero telegraph poles or modern signs, frozen in the 13th century.',
    baseVibeScore: 96,
    vibeTags: ['countryside-regency', 'cinematic-magic', 'bespoke-knowledge'],
    vibePills: ['Time-Frozen Lacock Village', 'Roman Thermal Baths', 'Cotswold-Fringe Calm'],
    fiveSignalSignature: {
      eraWorld: 'Roman Aquae Sulis, Medieval Abbey Cloisters & Tudor Country Life',
      visualAura: 'Steaming emerald Roman baths, crooked half-timbered cottages, lichen-covered stone & country inns',
      raconteurEnergy: 'Unhurried country-heritage guide sharing 2,000 years of Roman, monastic, and rural folklore',
      emotionalMood: 'Serene, pastoral, restorative & deeply authentic',
      peakWindow: 'Full-Day Slow-Luxury Escape'
    },
    dnaRadar: {
      eraImmersion: 97,
      sensoryDrama: 97,
      raconteurCharisma: 94,
      secretAlleyIndex: 96,
      shortlistMagnetism: 96
    },
    signatureMoments: [
      'Walking the quiet medieval lanes of Lacock Village—used for Pride & Prejudice, Downton Abbey, and Harry Potter',
      'Taking in the sacred steaming waters of the Roman Baths and the soaring fan-vaults of Bath Abbey',
      'Pausing at a timbered Wiltshire country inn for a slow fireside or garden pub lunch'
    ]
  },
  {
    id: 'TGTYRO',
    title: 'Light Up London: Private 2-Hour Illuminated Night Tour',
    url: 'https://travelcurious.com/united-kingdom/london/tours/light-up-london-private-2-hour-night-tour-in-a-london-taxi-TGTYRO',
    city: 'London',
    durationHours: 2,
    durationLabel: '2 hrs · After-Dark Cab Glide',
    priceFromGbp: 69,
    priceLabel: 'From £69 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1690987152/umpllq2g7xwgkjnp3ayf.jpg',
    originalCatalogueCopy: 'Experience the enchanting city of London by night on this 2-hour private tour along the river Thames in an iconic London Taxi and discover the Illuminated River art installation.',
    vibeArchetype: 'Blue-Hour Thames Luminescence & Nocturnal Architectural Glamour',
    shortlistHook: 'Turns London into a private midnight cinema—gliding beneath Leo Villareal’s choreographed LED river bridges when the daytime crowds have vanished.',
    baseVibeScore: 97,
    vibeTags: ['nocturnal-lights', 'royal-power'],
    vibePills: ['Illuminated River Art', 'Floodlit Domes & Bridges', 'Post-Dinner Glamour'],
    fiveSignalSignature: {
      eraWorld: 'Contemporary Nocturnal London & Floodlit Imperial Landmarks',
      visualAura: 'Shimmering pastel LED bridge spans, golden Big Ben reflections, floodlit St Paul’s & West End neon',
      raconteurEnergy: 'Smooth, unhurried evening host who knows every secret mirror-reflection vantage point along the Thames',
      emotionalMood: 'Romantic, luminous, cinematic & effortlessly glamorous',
      peakWindow: 'Blue Hour & After-Dark (19:30–22:30)'
    },
    dnaRadar: {
      eraImmersion: 92,
      sensoryDrama: 99,
      raconteurCharisma: 91,
      secretAlleyIndex: 88,
      shortlistMagnetism: 97
    },
    signatureMoments: [
      'Gliding across and beneath the Illuminated River bridges—Westminster, Waterloo, Millennium, and Tower Bridge',
      'Stopping at quiet Victoria Embankment alcoves where floodlit palaces and domes shimmer across black water',
      'Sweeping through Piccadilly Circus and Regent Street’s glowing curves from the intimacy of a private cab'
    ]
  },
  {
    id: 'T5C76S',
    title: '"Darkest Hour" Filming Locations: Churchill’s 1940 London',
    url: 'https://travelcurious.com/united-kingdom/london/tours/darkest-hour-filming-locations-in-london-private-half-day-tour-T5C76S',
    city: 'London',
    durationHours: 4,
    durationLabel: '4 hrs · Private Black Cab',
    priceFromGbp: 104,
    priceLabel: 'From £104 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1682603527/nx15p5ekir14t8b0f8vk.jpg',
    originalCatalogueCopy: 'This private tour in a black cab will take you to the 2017 "Darkest Hour" filming locations in London where Gary Oldman played Winston Churchill in the spring of 1940.',
    vibeArchetype: 'May 1940 Blitz Grit, Secret War Bunkers & Churchillian Statecraft',
    shortlistHook: 'Recreates the high-stakes tension of May 1940—tracing Churchill’s midnight Whitehall routes, Mayfair cigar vaults, and bomb-scarred masonry.',
    baseVibeScore: 96,
    vibeTags: ['wartime-grit', 'royal-power', 'cinematic-magic'],
    vibePills: ['May 1940 War Cabinet', 'Churchill’s St James’s', 'Blitz History & Cinema'],
    fiveSignalSignature: {
      eraWorld: 'Spring 1940 Wartime Westminster, Underground Bunkers & St James’s Gentlemen’s Clubs',
      visualAura: 'Austere Portland-stone ministries, bronze wartime monuments, shrapnel-scarred stone & wood-panelled cigar shops',
      raconteurEnergy: 'Gripping political & military storyteller bringing the 1940 War Cabinet crisis vividly to life',
      emotionalMood: 'Stoic, dramatic, inspiring & intellectually thrilling',
      peakWindow: 'Morning Crisp or Late Afternoon Shadows across Whitehall'
    },
    dnaRadar: {
      eraImmersion: 98,
      sensoryDrama: 92,
      raconteurCharisma: 97,
      secretAlleyIndex: 91,
      shortlistMagnetism: 96
    },
    signatureMoments: [
      'Following Churchill’s daily wartime path between 10 Downing Street, the Admiralty, and the Cabinet War Rooms',
      'Stepping into historic St James’s Street where Churchill purchased his cigars at J.J. Fox since 1900',
      'Touching real WWII Blitz shrapnel scars hidden in plain sight along Westminster and the Embankment'
    ]
  },
  {
    id: 'TPHRI8',
    title: 'The Heart of London: Classic Westminster Private 2-Hour Tour',
    url: 'https://travelcurious.com/united-kingdom/london/tours/the-heart-of-london-classic-westminster-private-2-hour-tour-TPHRI8',
    city: 'London',
    durationHours: 2,
    durationLabel: '2 hrs · Private Black Cab',
    priceFromGbp: 100,
    priceLabel: 'From £100 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1666644554/di1hvrdaouhnmauanoqw.jpg',
    originalCatalogueCopy: "Westminster truly is the heart of London and you're about to discover it on this 2-hour tour. See Buckingham Palace, 10 Downing St, the Houses of Parliament, Big Ben, Trafalgar Square and more!",
    vibeArchetype: 'Sovereign Pageantry & Ceremonial Power Corridors',
    shortlistHook: 'Delivers the goosebump-inducing majesty of Royal Westminster in 2 high-impact hours—pulling into secret cab-only vantage points right beside the palaces.',
    baseVibeScore: 95,
    vibeTags: ['royal-power', 'wartime-grit'],
    vibePills: ['Royal Pageantry', 'Corridors of Power', 'High-Impact 2-Hr Sweep'],
    fiveSignalSignature: {
      eraWorld: '1,000 Years of British Monarchy, Coronations & Parliamentary Empire',
      visualAura: 'Gilded Buckingham Palace crests, scarlet sentry boxes, Gothic Abbey towers & processional avenues',
      raconteurEnergy: 'Polished, charismatic Westminster insider decoding royal protocol and political scandal',
      emotionalMood: 'Regal, ceremonial, iconic & effortlessly VIP',
      peakWindow: 'Crisp Morning (Changing of the Guard energy) or Golden Hour'
    },
    dnaRadar: {
      eraImmersion: 93,
      sensoryDrama: 96,
      raconteurCharisma: 92,
      secretAlleyIndex: 80,
      shortlistMagnetism: 95
    },
    signatureMoments: [
      'Sweeping down The Mall’s red ceremonial tarmac toward Buckingham Palace and St James’s Palace',
      'Framing Westminster Abbey and Big Ben from quiet kerbside angles away from the bridge crowds',
      'Pausing at Horse Guards Parade and Whitehall as your cabbie shares centuries of royal intrigue'
    ]
  },
  {
    id: 'TJI8RE',
    title: 'The Premier Classic London: Crown to Ancient City 4-Hour Tour',
    url: 'https://travelcurious.com/united-kingdom/london/tours/the-premier-classic-london-private-4-hour-tour-in-a-london-taxi-TJI8RE',
    city: 'London',
    durationHours: 4,
    durationLabel: '4 hrs · Private Black Cab',
    priceFromGbp: 104,
    priceLabel: 'From £104 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/c_crop,h_1115,w_5354,x_0,y_597/v1/Destinations/td8ejc49mfvpbnn0uca2.jpg',
    originalCatalogueCopy: 'Enjoy a half-day tour to discover the marvellous city of London on this perfect tour for first-time visitors and for those that have a short time in the city with a professional driver guide.',
    vibeArchetype: 'Two Londons in One: Royal Pageantry Meets Ancient Roman & Medieval Alleys',
    shortlistHook: 'Bridges the gilded palaces of Westminster with the hidden Roman walls, Wren domes, and Dickensian courts of the ancient Square Mile.',
    baseVibeScore: 96,
    vibeTags: ['royal-power', 'bespoke-knowledge'],
    vibePills: ['Palaces + Ancient City', 'St Paul’s & Tower Bridge', 'Hidden Inns of Court'],
    fiveSignalSignature: {
      eraWorld: 'Roman Londinium, Medieval Guildhalls, Baroque St Paul’s & Royal Westminster',
      visualAura: 'Dramatic contrast of medieval fortress stone, Christopher Wren domes, glass towers & gaslit courts',
      raconteurEnergy: 'Master of "The Knowledge" effortlessly linking world-famous icons with secret 17th-century backstreets',
      emotionalMood: 'Grand, layered, eye-opening &quintessentially London',
      peakWindow: 'Morning or Afternoon Half-Day Arc'
    },
    dnaRadar: {
      eraImmersion: 95,
      sensoryDrama: 96,
      raconteurCharisma: 95,
      secretAlleyIndex: 90,
      shortlistMagnetism: 96
    },
    signatureMoments: [
      'Connecting Buckingham Palace and Westminster Abbey with St Paul’s Cathedral, the Tower of London, and Tower Bridge',
      'Slipping through tiny Fleet Street and Temple legal enclaves where tour buses are strictly barred',
      'Standing beside 2,000-year-old Roman London Wall fragments hidden between modern City architecture'
    ]
  },
  {
    id: 'TNA63G',
    title: 'The Ultimate London Tour: 4 UNESCO Worlds & Riverside Taverns (6-Hr)',
    url: 'https://travelcurious.com/united-kingdom/london/tours/the-ultimate-london-tour-private-6-hour-tour-in-a-london-taxi-TNA63G',
    city: 'London',
    durationHours: 6,
    durationLabel: '6 hrs · Private Black Cab',
    priceFromGbp: 156,
    priceLabel: 'From £156 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/c_crop,h_1250,w_6000,x_0,y_1691/v1/Destinations/lsv6tqup4or7nfimlsyj.jpg',
    originalCatalogueCopy: "Discover London's most famous attractions, including 4 UNESCO World Heritage sites, on a private 6-hour driving tour through the streets of this amazing city in a London Taxi.",
    vibeArchetype: 'Grand UNESCO Collector, Maritime Empire & Historic Tavern Culture',
    shortlistHook: 'Weaves London’s UNESCO crown jewels together with Southwark river wharves, artisan food markets, and centuries-old wooden coaching inns.',
    baseVibeScore: 97,
    vibeTags: ['royal-power', 'bespoke-knowledge', 'wartime-grit'],
    vibePills: ['UNESCO Icons + Secret Wharves', 'Historic Pub / Market Pause', '6-Hr Deep Immersion'],
    fiveSignalSignature: {
      eraWorld: 'Imperial London, Shakespearean Southwark & Maritime Thames Heritage',
      visualAura: 'Tower Bridge bascules, Greenwich & Westminster UNESCO vistas, cobbled wharves & oak-beamed pubs',
      raconteurEnergy: 'Unhurried, encyclopedic London host who paced the day around great views and an atmospheric lunch stop',
      emotionalMood: 'Rich, expansive, convivial & deeply immersive',
      peakWindow: 'Full Day (10:00–16:00 including Borough Market or historic tavern pause)'
    },
    dnaRadar: {
      eraImmersion: 96,
      sensoryDrama: 98,
      raconteurCharisma: 97,
      secretAlleyIndex: 93,
      shortlistMagnetism: 97
    },
    signatureMoments: [
      'Experiencing London’s UNESCO World Heritage landmarks linked by scenic Thames-side cab routes',
      'Ducking into 17th-century rebuilt taverns like Ye Oldeahu Cheshire Cheese or riverside Wapping pubs',
      'Exploring Southwark’s historic Clink street, medieval Winchester Palace ruins, and Borough Market aromas'
    ]
  },
  {
    id: 'TTBDTB',
    title: 'Bespoke 4-Hour Black Cab: "Secret Alleys, Roman Ruins & Dickensian Courts" Edition',
    url: 'https://travelcurious.com/united-kingdom/london/tours/build-your-own-4-hour-private-tour-in-a-london-taxi-TTBDTB',
    city: 'London',
    durationHours: 4,
    durationLabel: '4 hrs · Bespoke Vibe Blueprint',
    priceFromGbp: 104,
    priceLabel: 'From £104 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1680101253/meqwskulwerhrvtticdn.jpg',
    originalCatalogueCopy: "Discover not only iconic London attractions but hidden gems too, all from the back seat of a London taxi - taking the routes that stereotypical tour buses can't.",
    vibeArchetype: 'Off-Radar Cabbie’s "Knowledge": Secret Mews, Oddities & Hidden London',
    shortlistHook: 'Solves the "blank-page bespoke" problem with a curated insider blueprint—hunting down London’s smallest police station, hidden Roman amphitheatres, and secret floral mews.',
    baseVibeScore: 98,
    vibeTags: ['bespoke-knowledge', 'gothic-noir'],
    vibePills: ['100% Off-Radar London', 'Dickensian Courts & Mews', 'Cabbie’s Secret Black Book'],
    fiveSignalSignature: {
      eraWorld: 'Hidden Layers of London — Roman Underground, Dickensian Alleys & Eccentric Curiosities',
      visualAura: 'Wisteria-draped Kensington mews, gaslit Lincoln’s Inn passages, hidden guildhalls & secret gardens',
      raconteurEnergy: 'Unscripted "Knowledge" master sharing the secret corners only 320-route-tested cabbies know',
      emotionalMood: 'Curious, intimate, serendipitous & delightfully insider',
      peakWindow: 'Morning or Afternoon Backstreet Discovery'
    },
    dnaRadar: {
      eraImmersion: 95,
      sensoryDrama: 94,
      raconteurCharisma: 99,
      secretAlleyIndex: 100,
      shortlistMagnetism: 98
    },
    signatureMoments: [
      'Pivoting on a sixpence into tiny cobbled mews and gaslit legal courts completely invisible from main roads',
      'Visiting eccentric curiosities—from Britain’s smallest police station to St Dunstan in the East’s bombed church garden',
      'Blending any two personal obsessions on the fly (e.g., Secret Architecture + Historic Gin Palaces)'
    ]
  },
  {
    id: 'TYE4O3',
    title: 'Bespoke 6-Hour Black Cab: "Bohemian Villages, Subcultures & Design" Edition',
    url: 'https://travelcurious.com/united-kingdom/london/tours/build-your-own-6-hour-private-london-tour-in-a-black-cab-TYE4O3',
    city: 'London',
    durationHours: 6,
    durationLabel: '6 hrs · Bespoke Vibe Blueprint',
    priceFromGbp: 184,
    priceLabel: 'From £184 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1680101232/brkahhbozetilljlcpan.jpg',
    originalCatalogueCopy: 'Discover iconic London attractions and hidden gems, all from the back seat of a London taxi. Please reach out directly to plan the itinerary and confirm the duration of the tour.',
    vibeArchetype: 'Multi-Village Cultural Tapestry: Mayfair Elegance to East End Creative Grit',
    shortlistHook: 'Connects five distinct London neighbourhood vibes in one effortless arc—from Notting Hill pastels and Savile Row tailoring to Soho vinyl and Shoreditch street art.',
    baseVibeScore: 96,
    vibeTags: ['bespoke-knowledge', 'rock-beatles', 'cinematic-magic'],
    vibePills: ['5 London Villages in 1 Day', 'Notting Hill · Soho · East End', 'Tailored Cultural Flow'],
    fiveSignalSignature: {
      eraWorld: 'Contemporary Creative London Meets Georgian Mayfair & Bohemian Bloomsbury',
      visualAura: 'Pastel Notting Hill townhouses, Burlington Arcade glass, Soho neon & Brick Lane murals',
      raconteurEnergy: 'Culturally plugged-in local host adapting the route live to your aesthetic, music, and culinary taste',
      emotionalMood: 'Stylish, eclectic, vibrant & effortlessly bespoke',
      peakWindow: 'Full Day Neighbourhood Hopping'
    },
    dnaRadar: {
      eraImmersion: 94,
      sensoryDrama: 96,
      raconteurCharisma: 98,
      secretAlleyIndex: 99,
      shortlistMagnetism: 96
    },
    signatureMoments: [
      'Sweeping from the pastel mews of Notting Hill and Kensington into Mayfair’s hidden arcades and Savile Row',
      'Crossing through literary Bloomsbury and Soho’s music alleys into Spitalfields and Shoreditch street-art lanes',
      'Stopping spontaneously at independent coffee roasters, antique vaults, or historic riverfront pubs'
    ]
  },
  {
    id: 'T0IE5Y',
    title: 'Bespoke 8–10 Hour Grand Odyssey: "Daylight Icons to After-Dark Thames"',
    url: 'https://travelcurious.com/united-kingdom/london/tours/build-your-own-10-hour-private-london-tour-in-a-black-cab-T0IE5Y',
    city: 'London & Outer Royal Estates',
    durationHours: 9,
    durationLabel: '7–10 hrs · Carte Blanche Odyssey',
    priceFromGbp: 210,
    priceLabel: 'From £210–£289 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1680101189/bukpabuaual5gh41yrzq.jpg',
    originalCatalogueCopy: 'Discover iconic London attractions and hidden gems, all from the back seat of a London taxi. Please reach out directly to our reservations team to plan the itinerary.',
    vibeArchetype: 'Full Circadian London Masterpiece: Morning Palaces to Twilight Neon',
    shortlistHook: 'Your private Black Cab and historian for an entire day and evening—watching London’s atmosphere shift from morning royal pageantry to golden-hour river pub and illuminated night bridges.',
    baseVibeScore: 97,
    vibeTags: ['bespoke-knowledge', 'royal-power', 'nocturnal-lights', 'countryside-regency'],
    vibePills: ['Morning-to-Night Arc', 'Central London + Greenwich/Hampton', 'Ultimate VIP Carte Blanche'],
    fiveSignalSignature: {
      eraWorld: 'All of London Across Every Era & Lighting Mood (7h, 8h, 9h, or 10h Editions)',
      visualAura: 'Morning palace gates, afternoon Tudor chimneys at Hampton Court or Greenwich, and twilight Thames lights',
      raconteurEnergy: 'Dedicated private chauffeur-historian on standby all day outside galleries, restaurants, and landmarks',
      emotionalMood: 'Unrivalled freedom, grand-scale immersion & cinematic day-to-night progression',
      peakWindow: 'Full Circadian Arc (Morning Crisp through Golden Hour & Twilight)'
    },
    dnaRadar: {
      eraImmersion: 98,
      sensoryDrama: 99,
      raconteurCharisma: 99,
      secretAlleyIndex: 100,
      shortlistMagnetism: 97
    },
    signatureMoments: [
      'Experiencing London’s complete atmospheric shift from morning royal parks to illuminated evening river bridges',
      'Extending beyond central London to Maritime Greenwich, Kew Gardens, or Henry VIII’s Hampton Court Palace',
      'Having your private cab waiting right outside your chosen lunch club, West End gallery, or riverside tavern'
    ],
    durationVariants: [
      { label: '7-Hour Edition', price: 'From £210 / person', url: 'https://travelcurious.com/united-kingdom/london/tours/build-your-own-7-hour-private-london-tour-in-a-black-cab-TVG3WF' },
      { label: '8-Hour Edition', price: 'From £237 / person', url: 'https://travelcurious.com/united-kingdom/london/tours/build-your-own-8-hour-private-tour-in-a-london-taxi-TP56NN' },
      { label: '9-Hour Edition', price: 'From £263 / person', url: 'https://travelcurious.com/united-kingdom/london/tours/build-your-own-9-hour-private-london-tour-in-a-black-cab-TVWKXB' },
      { label: '10-Hour Edition', price: 'From £289 / person', url: 'https://travelcurious.com/united-kingdom/london/tours/build-your-own-10-hour-private-london-tour-in-a-black-cab-T0IE5Y' }
    ]
  },
  {
    id: 'TGH0DN',
    title: 'Stonehenge Mysticism & Salisbury Plain: Cruise Heritage Tour',
    url: 'https://travelcurious.com/united-kingdom/london/tours/from-london-to-southampton-private-transfer-including-stonehenge-TGH0DN',
    city: 'London ⇄ Stonehenge ⇄ Southampton',
    durationHours: 5,
    durationLabel: '5 hrs · Heritage Journey',
    priceFromGbp: 217,
    priceLabel: 'From £217 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1682614206/oue2y3tdx4lbmiibr9jz.jpg',
    originalCatalogueCopy: 'Embark on a 5-hour transfer from London to Southampton Cruise Terminal in a classic black cab, with a fascinating stop at the iconic Stonehenge along the way.',
    vibeArchetype: 'Neolithic Solstice Mysticism & Windswept Wessex Horizons',
    shortlistHook: 'Turns a coastal journey into an ancient pagan pilgrimage—standing before the 4,500-year-old monoliths of Stonehenge on windswept Salisbury Plain.',
    baseVibeScore: 95,
    vibeTags: ['countryside-regency', 'bespoke-knowledge'],
    vibePills: ['4,500-Yr Neolithic Circle', 'Wessex Chalk Downs', 'Ancient Pagan Lore'],
    fiveSignalSignature: {
      eraWorld: '2500 BC Neolithic Britain, Druid Solstice Lore & Ancient Wessex',
      visualAura: 'Monumental sarsen stones and Welsh bluestones rising against vast Wiltshire skies and green barrows',
      raconteurEnergy: 'Engaging heritage storyteller unpacking astronomical alignments and prehistoric engineering mysteries',
      emotionalMood: 'Elemental, mystical, expansive & bucket-list iconic',
      peakWindow: 'Morning Departure into Open Countryside Skies'
    },
    dnaRadar: {
      eraImmersion: 96,
      sensoryDrama: 97,
      raconteurCharisma: 92,
      secretAlleyIndex: 86,
      shortlistMagnetism: 95
    },
    signatureMoments: [
      'Walking the perimeter of the prehistoric Stonehenge stone circle on Salisbury Plain',
      'Watching the urban skyline melt away into rolling Hampshire and Wiltshire chalk downs from your private cab',
      'Linking London and Southampton with a timeless UNESCO wonder (available in both directions)'
    ]
  },
  {
    id: 'TO3TAR',
    title: 'Windsor Castle Royal Battlements: Berkshire Heritage Journey',
    url: 'https://travelcurious.com/united-kingdom/london/tours/from-london-to-southampton-private-transfer-including-windsor-TO3TAR',
    city: 'London · Windsor · Southampton',
    durationHours: 6,
    durationLabel: '6 hrs · Royal Castle Journey',
    priceFromGbp: 242,
    priceLabel: 'From £242 / person',
    imageUrl: 'https://res.cloudinary.com/touriocity/image/upload/v1683128886/uffxghjncetwv1p1965z.jpg',
    originalCatalogueCopy: 'Embark on a 6-hour transfer from London to Southampton Cruise Terminal in an iconic black cab, stopping at the popular Windsor Castle for a self-guided tour.',
    vibeArchetype: '900-Year Royal Fortress, Gothic Chivalry & Thames-Side Eton',
    shortlistHook: 'Immerses you in the living pageantry of Windsor Castle—where Norman battlements, Order of the Garter banners, and royal weddings meet the Berkshire countryside.',
    baseVibeScore: 95,
    vibeTags: ['royal-power', 'countryside-regency'],
    vibePills: ['Windsor Castle & St George’s', 'Order of the Garter Lore', 'Royal Berkshire'],
    fiveSignalSignature: {
      eraWorld: '1070 Norman Fortress to Modern House of Windsor Royal Sanctuary',
      visualAura: 'Crenellated stone towers, St George’s Chapel Gothic heraldry, the Long Walk & cobbled Windsor lanes',
      raconteurEnergy: 'Regal history raconteur sharing tales of knights, monarchs, and historic Eton across the river',
      emotionalMood: 'Chivalric, majestic, storied & aristocratic',
      peakWindow: 'Morning Royal Arrival'
    },
    dnaRadar: {
      eraImmersion: 96,
      sensoryDrama: 96,
      raconteurCharisma: 93,
      secretAlleyIndex: 85,
      shortlistMagnetism: 95
    },
    signatureMoments: [
      'Exploring Windsor Castle—the world’s oldest and largest occupied royal castle and St George’s Chapel',
      'Gazing down the tree-lined 3-mile Long Walk in Windsor Great Park and across the Thames to Eton',
      'Strolling historic Windsor town’s crooked Georgian tea-house lanes before continuing your coastal journey'
    ]
  }
];

/**
 * Compute dynamic Vibe Match score and shortlist ranking based purely on Atmospheric Vibe & Mood intent.
 */
export function scoreTourByVibes(tour, selectedVibes = [], searchQuery = '') {
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
    const primaryBonus = tour.vibeTags[0] && selectedVibes.includes(tour.vibeTags[0]) ? 7 : 0;
    filterScore = Math.min(99, Math.round(80 + overlapRatio * 14 + primaryBonus));
  }

  let queryScore = 0;
  let queryMatched = false;
  if (hasQuery) {
    const searchable = [
      tour.title,
      tour.shortlistHook,
      tour.vibeArchetype,
      ...(tour.vibePills || []),
      ...(tour.signatureMoments || []),
      tour.fiveSignalSignature?.eraWorld,
      tour.fiveSignalSignature?.visualAura,
      tour.fiveSignalSignature?.raconteurEnergy,
      tour.fiveSignalSignature?.emotionalMood,
      tour.fiveSignalSignature?.peakWindow
    ].join(' ').toLowerCase();

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
      queryScore = Math.min(99, Math.round(81 + tokenRatio * 13 + inferredBonus));
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
    matchScore: Math.max(tour.baseVibeScore - 3, finalScore),
    matchedVibes
  };
}
