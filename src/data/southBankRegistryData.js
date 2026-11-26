/**
 * AtmosVibe Canonical Sensory & Vibe Signature Registry — London South Bank (SE1)
 * Pure ESM module shared by React pages AND build-time static prerendering (scripts/prerender-vibe-insights.mjs).
 * Syncs bi-directionally with TravelVRSE (https://www.travelvrse.com/destinations/london/south-bank).
 */

export const ATMOSVIBE_ORIGIN = 'https://www.atmosvibe.io';
export const TRAVELVRSE_ORIGIN = 'https://www.travelvrse.com';

export const REGISTRY_URLS = {
  southBankRegistry: `${ATMOSVIBE_ORIGIN}/registry/london-south-bank`,
  southBankAlias: `${ATMOSVIBE_ORIGIN}/london/south-bank`,
  methodology: `${ATMOSVIBE_ORIGIN}/methodology`,
  studyPart1Ota: `${ATMOSVIBE_ORIGIN}/vibe-insights/london-boutique-ota-gap`,
  studyPart2Local: `${ATMOSVIBE_ORIGIN}/vibe-insights/london-local-destination-gap`,
  travelvrseSouthBankHub: `${TRAVELVRSE_ORIGIN}/destinations/london/south-bank`,
  travelvrseCompare: `${TRAVELVRSE_ORIGIN}/compare/sea-containers-vs-bankside-hotel`,
  travelvrseScoutAlex: `${TRAVELVRSE_ORIGIN}/scouts/alex-hurd`,
};

export const SOUTH_BANK_DESTINATION_SIGNATURE = {
  id: 'london-south-bank',
  registryCode: 'AV-REG-2026-LON-SE1',
  name: 'South Bank, London (SE1)',
  borough: 'London Borough of Southwark & Lambeth',
  postcodeDistrict: 'SE1',
  lastVerified: '2026-11-18',
  leadScout: {
    name: 'Alex Hurd',
    handle: '@AlexCulture',
    role: 'Lead Area Curator & Sensory Scout',
    profileUrl: REGISTRY_URLS.travelvrseScoutAlex,
  },
  geo: {
    latitude: 51.5074,
    longitude: -0.1065,
  },
  compositeVibeScore: 91.3,
  walkabilityScore: 97.2,
  independentGemRatioPct: 76,
  zeroChainCorridor: "Gabriel's Wharf (56 Upper Ground, SE1 9PP) & Lower Marsh (SE1 7RJ)",
  diurnalAcoustics: {
    morning: { db: '50–54 dB', window: '08:30–10:30', feel: 'Calm Thames towpath, rowers & uncrowded coffee courtyards' },
    afternoon: { db: '64–68 dB', window: '12:30–16:30', feel: 'Active Queen’s Walk cultural promenade & street buskers' },
    goldenHour: { db: '62–66 dB', window: '17:00–19:30', feel: 'Amber skyline reflections over St Paul’s & rooftop aperitivo buzz' },
    lateNight: { db: '39–43 dB', window: '22:00–06:00', feel: 'Quiet inland mews (Great Suffolk St) & glazed upper-floor river suites' },
  },
  dominantAesthetics: [
    'Brutalist Riverfront & Cultural Concrete (Tate Modern, National Theatre, BFI)',
    'Mid-Century Maritime Copper & Botanical Mixology (Sea Containers, Lyaness, 12th Knot)',
    'Zero-Chain Artisan Courtyards & Victorian Food Arches (Gabriel’s Wharf, Borough Market)',
  ],
  eightSignals: [
    {
      number: '01',
      signal: 'On-Site & District Experiences',
      score: 95,
      factRatio: '95% Fact',
      verification: '14th-floor & 12th-floor riverfront rooftops (Seabird, 12th Knot), Lyaness award-winning mixology, 56-seat Curzon boutique cinema & live Makers Studio.',
    },
    {
      number: '02',
      signal: 'Walkable Micro-Neighbourhood',
      score: 97,
      factRatio: '100% Fact',
      verification: 'Timed pedestrian corridors: 2–6 minute flat walks connecting Sea Containers, Bankside Hotel & The Hoxton Southwark to Tate Modern, Gabriel’s Wharf & Borough Market.',
    },
    {
      number: '03',
      signal: 'Sleep Sanctuary & Acoustics',
      score: 91,
      factRatio: '92% Fact',
      verification: '34 dB verified upper-floor acoustic glazing at Sea Containers; 37 dB tree-lined cultural mews calm after 22:00 at Bankside Hotel.',
    },
    {
      number: '04',
      signal: 'Natural Light & Golden Hour',
      score: 94,
      factRatio: '95% Fact',
      verification: 'Direct north/east Thames water reflections; peak golden-hour illumination across Blackfriars & St Paul’s Cathedral (17:00–19:30).',
    },
    {
      number: '05',
      signal: 'Architectural & Design DNA',
      score: 93,
      factRatio: '90% Fact',
      verification: 'Warren Platner & Tom Dixon 1970s maritime landmark alongside Giles Gilbert Scott’s Bankside Power Station (Tate Modern) & Crittall-glass industrial lofts.',
    },
    {
      number: '06',
      signal: 'Independent & Zero-Chain Ratio',
      score: 88,
      factRatio: '96% Fact',
      verification: '76% independent venue concentration within 400m inland corridor, anchored by Gabriel’s Wharf zero-chain artisan charter & Borough Market traders.',
    },
    {
      number: '07',
      signal: 'Crowd Rhythm & Dispersion',
      score: 86,
      factRatio: '90% Fact',
      verification: 'Stepping 120m off Queen’s Walk into Gabriel’s Wharf or Great Suffolk Street drops pedestrian congestion by >60% while retaining cultural density.',
    },
    {
      number: '08',
      signal: 'Honest Fit & Trade-Off Transparency',
      score: 96,
      factRatio: '100% Verified',
      verification: 'Explicit "Love this if / Avoid this if" verdicts audited on-site by named scouts under UK CMA / DMCC Act editorial independence standards.',
    },
  ],
};

export const SOUTH_BANK_HOTEL_SIGNATURES = [
  {
    id: 'sea-containers',
    registryCode: 'AV-SIG-LON-SE1-H01',
    name: 'Sea Containers London',
    neighborhood: 'South Bank Riverfront',
    address: '20 Upper Ground, South Bank, London SE1 9PD',
    postcode: 'SE1 9PD',
    officialUrl: 'https://www.seacontainerslondon.com/',
    bookingUrl: 'https://www.booking.com/hotel/gb/mondrian-london-at-sea-containers.en-gb.html',
    vibeInsightsPart1Url: '/vibe-insights/london-boutique-ota-gap?hotel=sea-containers',
    vibeInsightsPart2Url: '/vibe-insights/london-local-destination-gap',
    travelvrseHubUrl: `${REGISTRY_URLS.travelvrseSouthBankHub}#sea-containers`,
    travelvrseCompareUrl: REGISTRY_URLS.travelvrseCompare,
    inLondon10Study: true,
    scores: {
      physicalVibe: 91.3,
      ownPropertyDigital: 89,
      localDestinationDigital: 46,
      otaTop5Hero: 64,
      sleepSanctuaryDb: '34 dB (Upper-Floor River Suites)',
    },
    heroTag: 'Tom Dixon Maritime Copper Icon • 12th Knot St Paul’s Rooftop & Lyaness Bar',
    bestFor: 'St Paul’s golden-hour rooftop views, Tom Dixon copper design & on-site 56-seat Curzon cinema',
    timedWalks: [
      { gem: "Gabriel's Wharf Artisan Courtyard", walk: '2 min walk (120m)' },
      { gem: 'Tate Modern Turbine Hall', walk: '4 min walk (320m)' },
      { gem: 'BFI Southbank & Mediatheque', walk: '5 min walk (380m)' },
      { gem: 'Borough Market', walk: '11 min riverside walk (850m)' },
    ],
    acousticProfile: 'Lively weekend atmosphere in Lyaness bar & 12th Knot rooftop (68–72 dB); upper-floor river rooms feature heavy acoustic glazing (34 dB).',
    lightProfile: 'Direct north/east Thames water reflections; peak golden-hour glow at 12th Knot rooftop and river-balcony suites (17:00–19:30).',
    loveThisIf: 'You want iconic Tom Dixon nautical copper interiors, panoramic Thames & St Paul’s sunset views from 12th Knot, and a private 56-seat Curzon cinema downstairs.',
    avoidThisIf: 'You prefer a tiny, quiet residential guesthouse — the ground-floor lobby and Lyaness bar carry a lively evening buzz on Friday and Saturday nights.',
    vibeInsightsAuditNote:
      'In AtmosVibe’s London 10 Study, Sea Containers scored 91.3/100 physically and 89/100 on its own website for in-house F&B, yet dropped to 46/100 on local neighbourhood storytelling and 64/100 on Booking.com (where Slots #2–#5 show four repetitive suite couches and a bed instead of Lyaness or 12th Knot).',
    verifiedSignals: [
      { label: 'On-Site Experiences', value: '12th Knot Rooftop, Lyaness Bar, Agua Spa & 56-seat Curzon Cinema' },
      { label: 'Sleep Sanctuary', value: '34 dB upper-floor river suites with acoustic double glazing' },
      { label: 'Local Gem Gateway', value: '120m (2 min) flat walk to Gabriel’s Wharf zero-chain artisan courtyard' },
      { label: 'Field Verification', value: 'Audited on-site by Alex Hurd (@AlexCulture) • 18 Nov 2026' },
    ],
  },
  {
    id: 'bankside-hotel',
    registryCode: 'AV-SIG-LON-SE1-H02',
    name: 'Bankside Hotel, Autograph Collection',
    neighborhood: 'Bankside / South Bank Cultural Mews',
    address: '2–8 Great Suffolk St, London SE1 0UG',
    postcode: 'SE1 0UG',
    officialUrl: 'https://www.banksidehotel.com/',
    bookingUrl: 'https://www.booking.com/hotel/gb/bankside.en-gb.html',
    vibeInsightsPart1Url: null,
    vibeInsightsPart2Url: '/vibe-insights/london-local-destination-gap',
    travelvrseHubUrl: `${REGISTRY_URLS.travelvrseSouthBankHub}#bankside-hotel`,
    travelvrseCompareUrl: REGISTRY_URLS.travelvrseCompare,
    inLondon10Study: false,
    scores: {
      physicalVibe: 89.8,
      ownPropertyDigital: 86,
      localDestinationDigital: 58,
      otaTop5Hero: 62,
      sleepSanctuaryDb: '37 dB (Quiet Cultural Mews)',
    },
    heroTag: 'Art-Filled Sleep Sanctuary • Live Makers Studio 3 Mins from Tate Modern',
    bestFor: 'Art-filled calm sanctuary, live Makers Studio & tree-lined quiet mews 3 min from Tate Modern',
    timedWalks: [
      { gem: 'Tate Modern Turbine Hall', walk: '3 min walk (240m)' },
      { gem: "Gabriel's Wharf Artisan Courtyard", walk: '5 min walk (380m)' },
      { gem: 'Borough Market', walk: '7 min walk (520m)' },
      { gem: 'BFI Southbank & Mediatheque', walk: '7 min walk (540m)' },
    ],
    acousticProfile: 'Noticeably quieter after 22:00 (37 dB); tucked one block inland off the riverfront promenade on a calm tree-lined cultural side street.',
    lightProfile: 'Warm morning light across the ground-floor Art Yard atrium and calm interior mezzanine library.',
    loveThisIf: 'You want a creative, art-filled boutique stay with a live Makers Studio, complimentary Pashley bicycles, and a genuinely calm night’s sleep steps from Tate Modern.',
    avoidThisIf: 'You specifically want direct, unobstructed Thames river views from your bedroom window.',
    vibeInsightsAuditNote:
      'Audited for the South Bank Launch Cohort as the primary "Quiet Sleep Sanctuary & Art Mews" counterpart to Sea Containers London on TravelVRSE’s head-to-head comparison hub.',
    verifiedSignals: [
      { label: 'On-Site Experiences', value: 'Live Makers Studio (artist-in-residence), Art Yard Bar & Kitchen, Pashley Bikes' },
      { label: 'Sleep Sanctuary', value: '37 dB inland cultural mews — minimal street noise after 22:00' },
      { label: 'Local Gem Gateway', value: '240m (3 min) walk to Tate Modern; 520m (7 min) to Borough Market' },
      { label: 'Field Verification', value: 'Audited on-site by Alex Hurd (@AlexCulture) • 18 Nov 2026' },
    ],
  },
  {
    id: 'hoxton-southwark',
    registryCode: 'AV-SIG-LON-SE1-H03',
    name: 'The Hoxton, Southwark',
    neighborhood: 'Southwark / South Bank',
    address: '40 Blackfriars Rd, Southwark, London SE1 8NY',
    postcode: 'SE1 8NY',
    officialUrl: 'https://thehoxton.com/london/southwark/',
    bookingUrl: 'https://www.booking.com/hotel/gb/the-hoxton-southwark.en-gb.html',
    vibeInsightsPart1Url: '/vibe-insights/london-boutique-ota-gap?hotel=hoxton-southwark',
    vibeInsightsPart2Url: '/vibe-insights/london-local-destination-gap',
    travelvrseHubUrl: REGISTRY_URLS.travelvrseSouthBankHub,
    travelvrseCompareUrl: REGISTRY_URLS.travelvrseSouthBankHub,
    inLondon10Study: true,
    scores: {
      physicalVibe: 91.5,
      ownPropertyDigital: 88,
      localDestinationDigital: 64,
      otaTop5Hero: 49,
      sleepSanctuaryDb: '36 dB (Crittall-Glazed Upper Floors)',
    },
    heroTag: 'Seabird 14th-Floor Coastal Rooftop • #2 Highest Local Area Score in London Study (64/100)',
    bestFor: '14th-floor Seabird rooftop oyster bar, Albie all-day lobby buzz & curated Borough Market neighbourhood guide',
    timedWalks: [
      { gem: "Gabriel's Wharf Artisan Courtyard", walk: '4 min walk (310m)' },
      { gem: 'Tate Modern Turbine Hall', walk: '5 min walk (390m)' },
      { gem: 'Borough Market', walk: '8 min walk (600m)' },
      { gem: 'Leake Street Graffiti Tunnel', walk: '7 min walk (520m)' },
    ],
    acousticProfile: 'High-energy ground-floor lobby at Albie and 14th-floor rooftop at Seabird; guest bedrooms on floors 3–13 are well insulated.',
    lightProfile: 'Unobstructed 14th-floor panoramic light across the London skyline and Thames from Seabird’s wrap-around terrace.',
    loveThisIf: 'You want London’s most dramatic 14th-floor rooftop raw bar (Seabird), industrial Crittall-window bedrooms, and a hotel that actively champions Borough Market & South Bank local spots.',
    avoidThisIf: 'You want oversized traditional luxury suites — standard Hoxton rooms (Snug/Cosy) are compact by design.',
    vibeInsightsAuditNote:
      'Ranked #2 out of 10 London hotels for Local Destination Marketing (64/100) in Study Part II (featured as "Hotel B" in our Borough Market benchmark) — yet in Study Part I, its Booking.com Top-5 gallery scored just 49/100 due to 3 bathroom soap bottles in Slot #3 and gym treadmills in Slot #5.',
    verifiedSignals: [
      { label: 'On-Site Experiences', value: 'Seabird 14th-Floor Rooftop Raw Bar, Albie Lobby Bar & Working From_ Co-Working' },
      { label: 'Local Destination Leader', value: '64/100 Local Area Score — dedicated Southwark & Borough Market neighbourhood guide' },
      { label: 'OTA Merchandising Gap', value: '49/100 OTA Top-5 Score (-42.5 pt gap vs 91.5 real-world vibe)' },
      { label: 'Field Verification', value: 'Audited in London 10 Cohort & South Bank Registry • Nov 2026' },
    ],
  },
];

export const SOUTH_BANK_LOCAL_GEM_SIGNATURES = [
  {
    id: 'gabriels-wharf',
    registryCode: 'AV-GEM-LON-SE1-01',
    name: "Gabriel's Wharf Artisan Courtyard",
    category: 'Independent Makers & Zero-Chain Courtyard',
    schemaType: 'TouristAttraction',
    address: '56 Upper Ground, South Bank, London SE1 9PP',
    postcode: 'SE1 9PP',
    vibeScore: 93.1,
    zeroChainVerified: true,
    acousticProfile: '46 dB (Conversational Open-Air Courtyard)',
    bestWindow: '10:30–16:30 (Studio Craft Hours & Courtyard Lunch)',
    walkFromHotels: [
      '2 min walk (120m) from Sea Containers London',
      '4 min walk (310m) from The Hoxton, Southwark',
      '5 min walk (380m) from Bankside Hotel',
    ],
    vibeSignatureSummary:
      'Operates under a strict zero-chain charter: a riverside enclave of independent leatherworkers, custom jewellers, local printmakers, and wood-fired courtyard cafés just 120 metres from Sea Containers London.',
    loveThisIf: 'You want 100% independent London craft studios and relaxed courtyard coffee away from chain souvenir shops.',
    signals: [
      '100% Zero-Chain Independent Charter',
      '46 dB Sheltered Courtyard Acoustics',
      '120m Flat Walk from Sea Containers',
      'Verified On-Site: Nov 2026',
    ],
  },
  {
    id: 'bfi-mediatheque',
    registryCode: 'AV-GEM-LON-SE1-02',
    name: 'BFI Southbank & Archival Mediatheque',
    category: 'Cinema, Film Archive & Riverfront Bar',
    schemaType: 'TouristAttraction',
    address: 'Belvedere Rd, South Bank, London SE1 8XT',
    postcode: 'SE1 8XT',
    vibeScore: 94.6,
    zeroChainVerified: true,
    acousticProfile: '32 dB (Sound-Dampened Archival Viewing Booths) / 62 dB (Riverfront Bar)',
    bestWindow: '14:00–21:30 (Afternoon Archival Viewing → Evening Screenings)',
    walkFromHotels: [
      '5 min walk (380m) from Sea Containers London',
      '7 min walk (540m) from Bankside Hotel',
      '7 min walk (510m) from The Hoxton, Southwark',
    ],
    vibeSignatureSummary:
      'Britain’s flagship repertory cinema complex housing the free BFI Mediatheque — private, sound-dampened viewing booths giving visitors on-demand access to 10,000+ rare archived British films and television classics.',
    loveThisIf: 'You want an insider cultural sanctuary on a rainy afternoon followed by riverside aperitivo under Waterloo Bridge.',
    signals: [
      'Free 10,000+ Film Archival Mediatheque',
      '32 dB Private Sound-Dampened Booths',
      'Independent Repertory Cinema & Bar',
      'Verified On-Site: Nov 2026',
    ],
  },
  {
    id: 'tate-modern',
    registryCode: 'AV-GEM-LON-SE1-03',
    name: 'Tate Modern & Turbine Hall',
    category: 'Brutalist Architecture & Modern Art Anchor',
    schemaType: 'Museum',
    address: 'Bankside, London SE1 9TG',
    postcode: 'SE1 9TG',
    vibeScore: 95.4,
    zeroChainVerified: true,
    acousticProfile: '54 dB (Cavernous Turbine Hall Resonance — Quietest 10:00–11:00)',
    bestWindow: '10:00–11:30 (Opening Window) or Friday/Saturday Late Evenings',
    walkFromHotels: [
      '3 min walk (240m) from Bankside Hotel',
      '4 min walk (320m) from Sea Containers London',
      '5 min walk (390m) from The Hoxton, Southwark',
    ],
    vibeSignatureSummary:
      'Herzog & de Meuron’s iconic conversion of Giles Gilbert Scott’s 1950s Bankside Power Station — anchoring the entire SE1 cultural corridor within a 3–5 minute walk of all three audited South Bank hotels.',
    loveThisIf: 'You love monumental industrial brick architecture, global contemporary art, and espresso overlooking the Millennium Bridge.',
    signals: [
      '3–5 Min Walk from All 3 Audited Hotels',
      'Iconic 1950s Brutalist Power Station',
      'Free Collection Galleries & River Views',
      'Verified On-Site: Nov 2026',
    ],
  },
  {
    id: 'borough-market',
    registryCode: 'AV-GEM-LON-SE1-04',
    name: 'Borough Market Artisan Food Hall',
    category: 'Historic Food Market & Natural Wine Corridor',
    schemaType: 'TouristAttraction',
    address: '8 Southwark St, London SE1 1TL',
    postcode: 'SE1 1TL',
    vibeScore: 94.2,
    zeroChainVerified: true,
    acousticProfile: '68–74 dB (High-Energy Market Buzz — Quieter Tue–Wed 10:00–11:30)',
    bestWindow: '10:00–12:00 (Tue–Thu Artisan Grazing) or Evening Perimeter Wine Bars (Elliot’s)',
    walkFromHotels: [
      '7 min walk (520m) from Bankside Hotel',
      '8 min walk (600m) from The Hoxton, Southwark',
      '11 min walk (850m) from Sea Containers London',
    ],
    vibeSignatureSummary:
      'London’s 1,000-year-old culinary anchor beneath Victorian railway arches — pairing daytime independent cheese, oyster, and charcuterie stalls with evening natural wine bistros like Elliot’s on Stoney Street.',
    loveThisIf: 'You travel for artisan street food, historic ironwork market halls, and buzzing evening wine bars.',
    signals: [
      'Featured in Study Part II (Hoxton Southwark)',
      '100+ Independent Food & Drink Producers',
      '7–8 Min Walk from Bankside & Hoxton',
      'Verified On-Site: Nov 2026',
    ],
  },
  {
    id: 'waterloo-book-market',
    registryCode: 'AV-GEM-LON-SE1-05',
    name: 'Waterloo Bridge Vintage Book & Print Market',
    category: 'Open-Air Literary & Archival Print Stalls',
    schemaType: 'TouristAttraction',
    address: 'Queen’s Walk under Waterloo Bridge, London SE1 8XT',
    postcode: 'SE1 8XT',
    vibeScore: 91.8,
    zeroChainVerified: true,
    acousticProfile: '56 dB (Thames Breeze & Acoustic Buskers Under the Arch)',
    bestWindow: '11:00–17:00 Daily (Weather-Sheltered Under Waterloo Bridge)',
    walkFromHotels: [
      '4 min walk (300m) from Sea Containers London',
      '6 min walk (480m) from The Hoxton, Southwark',
      '7 min walk (520m) from Bankside Hotel',
    ],
    vibeSignatureSummary:
      'One of Europe’s only daily open-air second-hand book and antique map markets, sheltered beneath the concrete span of Waterloo Bridge right outside BFI Southbank.',
    loveThisIf: 'You love browsing rare Penguin paperbacks, vintage London cartography, and classic cinema posters by the river.',
    signals: [
      '100% Independent Antiquarian Traders',
      '4 Min Riverside Walk from Sea Containers',
      'Sheltered Under Waterloo Bridge Span',
      'Verified On-Site: Nov 2026',
    ],
  },
  {
    id: 'leake-street-arches',
    registryCode: 'AV-GEM-LON-SE1-06',
    name: 'Leake Street Graffiti & Culture Tunnel',
    category: 'Underground Street Art & Subterranean Bars',
    schemaType: 'TouristAttraction',
    address: 'Leake St, Lambeth, London SE1 7NN',
    postcode: 'SE1 7NN',
    vibeScore: 92.4,
    zeroChainVerified: true,
    acousticProfile: '64–70 dB (Echoing Vaulted Brick Arches & Evening Indie Bars)',
    bestWindow: '11:00–15:00 (Live Daytime Mural Painting) or 19:00–23:00 (Arch Bars)',
    walkFromHotels: [
      '6 min walk (400m) inland from Waterloo Riverfront',
      '7 min walk (520m) from The Hoxton, Southwark',
      '8 min walk (620m) from Sea Containers London',
    ],
    vibeSignatureSummary:
      'A 300-metre legal graffiti tunnel ("The Banksy Tunnel") beneath Waterloo Station’s Victorian brick vaults, lined with independent craft beer arches, live street artists, and subterranean cafés.',
    loveThisIf: 'You want raw, constantly changing London street art and off-the-beaten-path archway bars 6 minutes inland from the Thames.',
    signals: [
      '300m Legal Street-Art Vaulted Tunnel',
      '8 Independent Subterranean Arch Venues',
      '6–8 Min Inland Walk from South Bank',
      'Verified On-Site: Nov 2026',
    ],
  },
];

export const ATMOSVIBE_METHODOLOGY_DATA = {
  code: 'AV-METH-2026-V2',
  lastUpdated: '2026-11-21',
  title: 'AtmosVibe 8-Signal Verification & Multi-Channel Discoverability Methodology',
  subtitle:
    'How AtmosVibe independently verifies the 8 real-world Vibe & Experience Signals of destinations, hotels, and local gems — and benchmarks how properties showcase that reality across Owned Digital, OTAs, and AI Search.',
  editorialDisclosure:
    'AtmosVibe Vibe Signatures and Vibe Insights benchmark scores are produced independently using standardised field audits, computer-vision gallery diagnostics, and geospatial walkability telemetry. Properties cannot pay to alter a benchmark score, suppress an OTA diagnostic finding, or modify an honest-fit ("Love this if / Avoid this if") trade-off verdict, in compliance with UK CMA and DMCC Act transparency standards.',
  pillars: [
    {
      id: 'eight-signals',
      title: '1. The 8 Verified Vibe & Experience Signals (90%+ Fact vs. Opinion)',
      summary:
        'Unlike subjective star ratings or unverified user reviews, every AtmosVibe Signature decomposes a hotel, local gem, or neighbourhood into 8 verifiable physical and sensory signals: (1) On-Site Experiences (Rooftops, Dining & Spa), (2) Walkable Micro-Neighbourhood & Timed Corridors, (3) Sleep Sanctuary & Acoustic Insulation (dB), (4) Natural Light & Golden-Hour Orientation, (5) Architectural & Design DNA, (6) Independent / Zero-Chain Venue Ratio, (7) Diurnal Crowd Rhythm & Dispersion, and (8) Honest Fit Trade-Offs ("Love this if / Avoid this if").',
    },
    {
      id: 'multi-channel-benchmark',
      title: '2. The 4-Score Multi-Channel Discoverability Benchmark (0–100 Scale)',
      summary:
        'For every audited property in Vibe Insights, we measure four distinct scores on a 0–100 scale: (A) Physical Vibe & Experiences Reality, (B1) Owned Digital — In-House Vibe & F&B Merchandising (Website & Instagram), (B2) Owned Digital — Local Destination & Neighbourhood Connection ("The Walled Garden Test"), and (C) OTA Top-5 Hero Grid Score (auditing slots #1–#5 on Booking.com for experience/destination hooks vs. repetitive beds, bathroom sinks, and utility clutter).',
    },
    {
      id: 'field-provenance',
      title: '3. On-Site Scout Provenance & Re-Verification Windows',
      summary:
        'Every canonical district registry (such as London South Bank SE1) records named scout provenance (e.g., Alex Hurd / @AlexCulture), physical observation dates, measurement methods (timed pedestrian walks from hotel reception to venue entrance, morning 08:30–10:30 vs. evening 17:00–21:00 acoustic and lighting checks), and mandatory 90-to-180-day re-verification expiries.',
    },
    {
      id: 'bi-directional-graph',
      title: '4. Bi-Directional Knowledge Graph (AtmosVibe Registry ↔ TravelVRSE Discovery)',
      summary:
        'AtmosVibe acts as the B2B canonical verification registry and commercial audit engine (atmosvibe.io), feeding verified JSON-LD Datasets (via Schema.org isBasedOn and citation links) directly into TravelVRSE’s consumer discovery hubs, interactive 3D walkthroughs, and head-to-head hotel comparison pages (travelvrse.com).',
    },
  ],
};

export function buildSouthBankRegistryJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Dataset',
        '@id': `${REGISTRY_URLS.southBankRegistry}#dataset`,
        sameAs: [
          `${REGISTRY_URLS.southBankAlias}#dataset`,
          'https://atmosvibe.io/london/south-bank#dataset',
          'https://atmosvibe.io/registry/london-south-bank#dataset',
        ],
        name: 'Atmosvibe Canonical Sensory Registry — South Bank, London',
        identifier: SOUTH_BANK_DESTINATION_SIGNATURE.registryCode,
        description:
          'Independently verified 8-Signal Vibe Signatures for London South Bank (SE1): Destination sensory & walkability baseline (91.3/100), 3 audited boutique hotels (Sea Containers London, Bankside Hotel, The Hoxton Southwark), and 6 verified zero-chain local gems & cultural attractions.',
        url: REGISTRY_URLS.southBankRegistry,
        license: 'https://creativecommons.org/licenses/by/4.0/',
        isAccessibleForFree: true,
        dateModified: SOUTH_BANK_DESTINATION_SIGNATURE.lastVerified,
        distribution: [
          {
            '@type': 'DataDownload',
            encodingFormat: 'application/json',
            contentUrl: 'https://www.atmosvibe.io/datasets/london-south-bank-registry.json',
          },
        ],
        creator: {
          '@type': 'Organization',
          name: 'AtmosVibe',
          url: ATMOSVIBE_ORIGIN,
        },
        variableMeasured: [
          'Composite Vibe Signature Score (0-100)',
          'Pedestrian Walkability & Timed Hotel-to-Gem Corridors',
          'Diurnal Acoustic Profile (Morning, Afternoon, Golden Hour, Late-Night dB)',
          'Zero-Chain Independent Venue Ratio (76%)',
          'Owned Digital vs. Local Destination vs. OTA Top-5 Hero Score',
          'Honest Fit Verdict (Love this if / Avoid this if)',
        ],
      },
      {
        '@type': 'TouristDestination',
        '@id': `${REGISTRY_URLS.southBankRegistry}#destination`,
        name: SOUTH_BANK_DESTINATION_SIGNATURE.name,
        description:
          'Verified Vibe Signature for London South Bank (SE1): 91.3/100 Composite Vibe, 97.2/100 Walkability, 76% Independent Gem Ratio, connecting Brutalist riverside cultural landmarks (Tate Modern, BFI) with zero-chain maker courtyards (Gabriel’s Wharf, Borough Market) and boutique hotels.',
        url: REGISTRY_URLS.southBankRegistry,
        sameAs: [
          REGISTRY_URLS.travelvrseSouthBankHub,
          'https://www.wikidata.org/wiki/Q2304537',
        ],
        isBasedOn: { '@id': `${REGISTRY_URLS.southBankRegistry}#dataset` },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: SOUTH_BANK_DESTINATION_SIGNATURE.geo.latitude,
          longitude: SOUTH_BANK_DESTINATION_SIGNATURE.geo.longitude,
        },
        containsPlace: [
          ...SOUTH_BANK_HOTEL_SIGNATURES.map((h) => ({
            '@id': `${REGISTRY_URLS.southBankRegistry}#hotel-${h.id}`,
          })),
          ...SOUTH_BANK_LOCAL_GEM_SIGNATURES.map((g) => ({
            '@id': `${REGISTRY_URLS.southBankRegistry}#gem-${g.id}`,
          })),
        ],
      },
      ...SOUTH_BANK_HOTEL_SIGNATURES.map((h) => ({
        '@type': 'Hotel',
        '@id': `${REGISTRY_URLS.southBankRegistry}#hotel-${h.id}`,
        name: h.name,
        description: `${h.bestFor}. Love this if: ${h.loveThisIf} Avoid this if: ${h.avoidThisIf}`,
        url: h.officialUrl,
        sameAs: [h.officialUrl, h.travelvrseHubUrl].filter(Boolean),
        isBasedOn: { '@id': `${REGISTRY_URLS.southBankRegistry}#dataset` },
        containedInPlace: { '@id': `${REGISTRY_URLS.southBankRegistry}#destination` },
        address: {
          '@type': 'PostalAddress',
          streetAddress: h.address,
          addressLocality: 'London',
          postalCode: h.postcode,
          addressCountry: 'GB',
        },
      })),
      ...SOUTH_BANK_LOCAL_GEM_SIGNATURES.map((g) => ({
        '@type': g.schemaType || 'TouristAttraction',
        '@id': `${REGISTRY_URLS.southBankRegistry}#gem-${g.id}`,
        name: g.name,
        description: `${g.vibeSignatureSummary} Peak window: ${g.bestWindow}. Acoustics: ${g.acousticProfile}.`,
        isBasedOn: { '@id': `${REGISTRY_URLS.southBankRegistry}#dataset` },
        containedInPlace: { '@id': `${REGISTRY_URLS.southBankRegistry}#destination` },
        address: {
          '@type': 'PostalAddress',
          streetAddress: g.address,
          addressLocality: 'London',
          postalCode: g.postcode,
          addressCountry: 'GB',
        },
      })),
    ],
  };
}

export function buildMethodologyJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${REGISTRY_URLS.methodology}#article`,
    headline: ATMOSVIBE_METHODOLOGY_DATA.title,
    description: ATMOSVIBE_METHODOLOGY_DATA.subtitle,
    dateModified: ATMOSVIBE_METHODOLOGY_DATA.lastUpdated,
    url: REGISTRY_URLS.methodology,
    author: {
      '@type': 'Organization',
      name: 'AtmosVibe',
      url: ATMOSVIBE_ORIGIN,
    },
  };
}
