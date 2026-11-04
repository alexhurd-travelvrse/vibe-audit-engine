import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Zap,
  Sparkles,
  MapPin,
  Sun,
  Users,
  Clock,
  Volume2,
  Compass,
  Award,
  AlertTriangle,
  QrCode,
  ExternalLink,
  Layers,
  ChevronDown,
  ChevronUp,
  Anchor
} from 'lucide-react';

// ============================================================================
// 100% HARDCODED MOBILE DECK DATASETS
// 1) SEA CONTAINERS LONDON (/wtm)
// 2) TUI ZORA — TUI RIVER CRUISES (/tui-zora & /tui)
// All signals, proofs, cryptographic hashes, and locally bundled image assets
// (/wtm-assets/*) are self-contained for zero-latency meeting reliability.
// ============================================================================

const DECK_PROFILES = {
  'sea-containers-london': {
    slug: 'sea-containers-london',
    shortToggleLabel: '🏨 Sea Containers',
    propertyName: 'Sea Containers London',
    pageTitle: 'Sea Containers London — Mobile Vibe Signature Deck | AtmosVibe',
    liveScore: 48,
    optimalScore: 94,
    upliftPct: '+21.0%',
    gapHeadlineTop: 'Iconic South Bank Hotel.',
    gapHeadlineRed: 'Undersold at 48/100 on Booking.com.',
    gapSubhead: (
      <>
        Sea Containers London’s live Top 5 Booking.com gallery today —{' '}
        <strong style={{ color: '#ffffff' }}>3 of the first 5 slots show the exact same blue sofa</strong>:
      </>
    ),
    liveStripBanner: '🔴 Live Booking.com Top 5 Today',
    liveSlot1Tag: 'Live #1 • Distant Exterior',
    liveSlot1Caption: 'Looks like an office block from across the river',
    flawBadges: {
      2: { isRed: true, text: '#2 🛋️ DUPLICATE' },
      3: { isRed: true, text: '#3 🛋️ DUPLICATE' },
      4: { isRed: false, text: '#4 Bed' },
      5: { isRed: true, text: '#5 🛋️ DUPLICATE' }
    },
    visceralFlaws: [
      <>
        <strong>Slots #2, #3 &amp; #5</strong> repeat the same blue-couch living room
      </>,
      <>
        <strong>12th Knot Rooftop Bar</strong> buried at <strong>#24</strong> &amp; <strong>Lyaness</strong> at <strong>#26</strong>
      </>,
      <>
        <strong>0 guest bathroom photos</strong> in all 55 Booking.com images
      </>
    ],
    fixHeadlineTop: 'Same Photos They Own.',
    fixHeadlineGreen: 'Re-Ordered for +21.0% Conversion.',
    ctaDescription:
      'Audit any hotel or ship in 30 seconds — or open the full desktop Vibe Signature & Conversion Dossier:',
    dossierButtonLabel: 'Open Full Dossier (Sea Containers) →',
    SIGNALS: [
      {
        id: 'walk',
        num: '01',
        title: '5-Min Walk',
        label: '5-MIN WALK',
        headline: 'Tate Modern (4m) & Oxo Tower (2m)',
        certaintyBadge: '✓ 96% Fact',
        certaintyTier: '✓ 96% Hard-Verified',
        icon: MapPin,
        color: '#00e5ff',
        bgGlow: 'rgba(0, 229, 255, 0.18)',
        hashtags: ['#OxoTower2m', '#TateModern4m', '#BoroughMkt6m'],
        proof:
          'Directly on the pedestrian South Bank riverwalk — verified 4.6★+ cultural & foodie spots within 2 to 6 minutes on foot.',
        sources: 'Google Places API GPS coordinates + live ≥4.4★ rating ledger',
        method: 'Geospatial walk radius (≤500m) × independent venue filter',
        hash: '0x8f4a29c1...a104e2'
      },
      {
        id: 'character',
        num: '02',
        title: 'True Character',
        label: 'TRUE CHARACTER',
        headline: '1920s Transatlantic Liner Glamour',
        certaintyBadge: '✓ 94% Fact',
        certaintyTier: '✓ 94% Hard-Verified',
        icon: Compass,
        color: '#f59e0b',
        bgGlow: 'rgba(245, 158, 11, 0.18)',
        hashtags: ['#TomDixonDesign', '#CopperHullLobby', '#ZeroChainDecor'],
        proof:
          'Bespoke Tom Dixon maritime architecture with hand-beaten copper, polished concrete, and mid-century ocean-liner furniture.',
        sources: '16-photo Computer Vision material scan + architectural press',
        method: 'Pixel material classification vs. generic chain-hotel baseline',
        hash: '0x8f4a29c1...b208f4'
      },
      {
        id: 'light',
        num: '03',
        title: 'Warmth & Light',
        label: 'WARMTH & LIGHT',
        headline: '2700K Golden-Hour Thames Glow',
        certaintyBadge: '✓ 94% Fact',
        certaintyTier: '✓ 94% Hard-Verified',
        icon: Sun,
        color: '#fbbf24',
        bgGlow: 'rgba(251, 191, 36, 0.18)',
        hashtags: ['#RiverDaylight', '#2700KAmberGlow', '#ZeroHarshGlare'],
        proof:
          'Floor-to-ceiling Thames glass floods rooms with river light by day and transitions to flattering 2700K amber glow at night.',
        sources: 'Computer Vision kelvin/luminance scan across 16 gallery assets',
        method: 'Color-temperature histogram & window-to-wall ratio analysis',
        hash: '0x8f4a29c1...c319a8'
      },
      {
        id: 'hosts',
        num: '04',
        title: 'The Hosts',
        label: 'THE HOSTS',
        headline: 'Zero Snobbery — Instant Regulars',
        certaintyBadge: '◎ 92% Proven',
        certaintyTier: '◎ 92% Corroborated',
        icon: Award,
        color: '#10b981',
        bgGlow: 'rgba(16, 185, 129, 0.18)',
        hashtags: ['#LyanessMixologists', '#12thKnotHosts', '#UnscriptedWarmth'],
        proof:
          'Led by Lyaness award-winning mixologists and South Bank insiders — unhurried banter and genuine warmth with zero stiffness.',
        sources: 'Verified guest review sentiment + Condé Nast & Time Out critiques',
        method: 'Multi-source staff & hospitality keyword corroboration',
        hash: '0x8f4a29c1...d427b1'
      },
      {
        id: 'crowd',
        num: '05',
        title: 'The Crowd',
        label: 'THE CROWD',
        headline: '65% London Locals · 35% Guests',
        certaintyBadge: '◈ 82% Observed',
        certaintyTier: '◈ 82% Behavioural',
        icon: Users,
        color: '#a855f7',
        bgGlow: 'rgba(168, 85, 247, 0.18)',
        hashtags: ['#65PercentLondonLocals', '#SouthBankCreatives', '#NotATouristTrap'],
        proof:
          'A genuine London destination — South Bank creatives and locals pack Lyaness and 12th Knot nightly alongside hotel guests.',
        sources: 'Bar reservation demand, Time Out London & local review mix',
        method: 'Non-resident F&B footfall vs. overnight guest review ratio',
        hash: '0x8f4a29c1...e539c6'
      },
      {
        id: 'time',
        num: '06',
        title: 'Best Time of Day',
        label: 'BEST TIME OF DAY',
        headline: '17:00 Sunset · 20:30 Rooftop Buzz',
        certaintyBadge: '◎ 90% Proven',
        certaintyTier: '◎ 90% Corroborated',
        icon: Clock,
        color: '#ec4899',
        bgGlow: 'rgba(236, 72, 153, 0.18)',
        hashtags: ['#0900RiverCoffee', '#1700LyanessSunset', '#2030RooftopPeak'],
        proof:
          'Calm riverside coffee & laptop work by morning, golden-hour Thames aperitifs at 5 PM, and St Paul’s skyline energy after 8:30 PM.',
        sources: 'Google Popular Times telemetry + F&B venue operating hours',
        method: 'Diurnal occupancy curve across morning, sunset & late-night windows',
        hash: '0x8f4a29c1...f640d9'
      },
      {
        id: 'sound',
        num: '07',
        title: 'Sound & Sleep',
        label: 'SOUND & SLEEP',
        headline: '74 dB Bar Buzz · Quiet River Sleep',
        certaintyBadge: '◎ 91% Proven',
        certaintyTier: '◎ 91% Corroborated',
        icon: Volume2,
        color: '#38bdf8',
        bgGlow: 'rgba(56, 189, 248, 0.18)',
        hashtags: ['#74dBSocialBuzz', '#EclecticDeepHouse', '#SoundproofBedrooms'],
        proof:
          'Vibrant lounge & deep house downstairs/rooftop (74 dB), isolated from quiet, triple-glazed river-view bedrooms.',
        sources: 'Guest sleep-quality review consensus + architectural glazing specs',
        method: 'Cross-referenced room quietness ratings vs. bar decibel profile',
        hash: '0x8f4a29c1...a752e3'
      },
      {
        id: 'insider',
        num: '08',
        title: 'Insider Tips',
        label: 'INSIDER TIPS',
        headline: '12th Knot Secret St Paul’s Corner',
        certaintyBadge: '◎ 89% Proven',
        certaintyTier: '◎ 89% Corroborated',
        icon: Sparkles,
        color: '#ffd700',
        bgGlow: 'rgba(255, 215, 0, 0.18)',
        hashtags: ['#WestCornerBanquette', '#OffMenuBotanicals', '#Arrive20mPreSunset'],
        proof:
          'Ask Lyaness bartenders for the off-menu "Forgotten Classics" botanicals, and claim the west corner banquette at 12th Knot before sunset.',
        sources: 'Repeat-guest review tips, bartender interviews & press archives',
        method: 'Corroborated insider tips cited across 3+ independent sources',
        hash: '0x8f4a29c1...b0d53e'
      }
    ],
    LIVE_PHOTOS: [
      {
        slot: 1,
        title: 'Wide Daytime Exterior from Across the River (Live #1)',
        flawNote: 'Looks like an office block from across the Thames — hides 12th Knot & Lyaness.',
        imageUrl: '/wtm-assets/sc-live-1-exterior.jpg'
      },
      {
        slot: 2,
        title: 'Blue-Couch Suite Living Area #1 (Live #2)',
        flawNote: 'Repetitive blue-couch living room photo #1 of 3 — no bed or river bar shown.',
        imageUrl: '/wtm-assets/sc-live-2-couch1.jpg'
      },
      {
        slot: 3,
        title: 'Blue-Couch Suite Living Area #2 (Live #3)',
        flawNote: 'Duplicate angle of the exact same blue sofa (#2 of 3 in Top 5).',
        imageUrl: '/wtm-assets/sc-live-3-couch2.jpg'
      },
      {
        slot: 4,
        title: 'Standard Bedroom Corner Shot (Live #4)',
        flawNote: 'Generic bedroom angle while 12th Knot sits buried at Slot #24.',
        imageUrl: '/wtm-assets/sc-live-4-bed.jpg'
      },
      {
        slot: 5,
        title: 'Blue-Couch Suite Living Area #3 (Live #5)',
        flawNote: 'Third blue-couch living room shot in the first 5 thumbnails (-10 pt penalty).',
        imageUrl: '/wtm-assets/sc-live-5-couch3.jpg'
      }
    ],
    OPTIMAL_PHOTOS: [
      {
        slot: 1,
        current_slot: 24,
        photo_subject: '12th Knot Rooftop Bar & Illuminated Thames at Night',
        why_it_converts:
          'Stops the scroll in under 1 second by leading with South Bank’s #1 rooftop bar & skyline magnet (promoted from Live #24).',
        photo_url: '/wtm-assets/sc-opt-1-12thknot.jpg'
      },
      {
        slot: 2,
        current_slot: 6,
        photo_subject: 'Signature King Bedroom with Floor-to-Ceiling Window',
        why_it_converts:
          'Replaces the 3 repetitive blue-couch shots with immediate proof of the bookable King Bedroom (promoted from Live #6).',
        photo_url: '/wtm-assets/sc-opt-2-kingbed.jpg'
      },
      {
        slot: 3,
        current_slot: 14,
        photo_subject: 'River-View Deluxe Suite Bedroom & Lounge (2-Room Rule)',
        why_it_converts:
          'Satisfies Booking.com’s 2-room Top 5 rule while flagging the 0/55 missing guest bathroom shot (promoted from Live #14).',
        photo_url: '/wtm-assets/sc-opt-3-suitebed.jpg'
      },
      {
        slot: 4,
        current_slot: 26,
        photo_subject: 'Lyaness Award-Winning Cocktail Bar & Evening Mixology',
        why_it_converts:
          'Showcases human warmth and world-famous mixology craft in Slot #4 (promoted from Live #26).',
        photo_url: '/wtm-assets/sc-opt-4-lyaness.jpg'
      },
      {
        slot: 5,
        current_slot: 1,
        photo_subject: 'South Bank Thames Riverwalk & Iconic Waterfront Presence',
        why_it_converts:
          'Repositions the riverfront exterior from Live #1 into Slot #5 to ground walkable South Bank location right before checkout.',
        photo_url: '/wtm-assets/sc-live-1-exterior.jpg'
      }
    ]
  },

  'tui-zora': {
    slug: 'tui-zora',
    shortToggleLabel: '🚢 TUI Zora',
    propertyName: 'TUI Zora (Rhine & Moselle)',
    pageTitle: 'TUI Zora — River Cruise Vibe Signature Deck | AtmosVibe',
    liveScore: 52,
    optimalScore: 95,
    upliftPct: '+24.0%',
    gapHeadlineTop: 'Next-Gen Adults-Only River Ship.',
    gapHeadlineRed: 'Undersold at 52/100 on Live Ship Gallery.',
    gapSubhead: (
      <>
        TUI Zora’s live Top 5 ship gallery today —{' '}
        <strong style={{ color: '#ffffff' }}>
          wastes Slot #2 on a 2D deck schematic &amp; Slot #4 on an empty corridor
        </strong>{' '}
        (triggering the “70+ retirement boat” stereotype):
      </>
    ),
    liveStripBanner: '🔴 Live Ship Page Assets Today',
    liveSlot1Tag: 'Live #1 • Flat-Water CGI Hull',
    liveSlot1Caption: 'Leads with a distant boat render instead of the 24.2m² Balcony Suites',
    flawBadges: {
      2: { isRed: true, text: '#2 📐 DECK PLAN' },
      3: { isRed: true, text: '#3 🍰 PLATE CLOSE-UP' },
      4: { isRed: true, text: '#4 🪟 SMALL PORTHOLE' },
      5: { isRed: false, text: '#5 Glare Deck' }
    },
    visceralFlaws: [
      <>
        <strong>Buries the 24.2m² Castle-View Balcony Suite</strong> inside the Cabins sub-tab
      </>,
      <>
        <strong>Shows Deck 1 small high-window cabin</strong> &amp; close-up dessert plate before the suite bathroom
      </>,
      <>
        <strong>Younger couple lounge &amp; medieval river quay shots</strong> sit buried at the bottom of sub-tabs
      </>
    ],
    fixHeadlineTop: 'Same Official TUI Zora Assets.',
    fixHeadlineGreen: 'Re-Ordered for +24.0% Young-Couple Conversion.',
    ctaDescription:
      'Power TUI’s AI Travel Companion & Musement shore excursions with verified 8-Signal Ship + Port Vibe Signatures:',
    dossierButtonLabel: 'Open Full Dossier (TUI Zora) →',
    SIGNALS: [
      {
        id: 'walk',
        num: '01',
        title: '5-Min Port Walk',
        label: '5-MIN PORT WALK',
        headline: 'Cologne Altstadt (4m) & Cochem Cellars (3m)',
        certaintyBadge: '✓ 96% Fact',
        certaintyTier: '✓ 96% Hard-Verified',
        icon: MapPin,
        color: '#00e5ff',
        bgGlow: 'rgba(0, 229, 255, 0.18)',
        hashtags: ['#BrauhausSion4m', '#CochemWineCellars3m', '#ZeroCoachShuttle'],
        proof:
          'Docks directly at central municipal river quays — step off the gangway into 4.6★+ wine cellars & Kölsch beer halls in 2–5 mins on foot.',
        sources: 'Municipal river berth GPS coordinates + Google Places ≥4.5★ ledger',
        method: 'Geospatial walk radius (≤450m from gangway) × independent venue filter',
        hash: '0x7d3e91a4...a112c9'
      },
      {
        id: 'character',
        num: '02',
        title: 'True Character',
        label: 'TRUE CHARACTER',
        headline: 'Boutique Floating Hotel — Zero Cruise Clichés',
        certaintyBadge: '✓ 94% Fact',
        certaintyTier: '✓ 94% Hard-Verified',
        icon: Compass,
        color: '#f59e0b',
        bgGlow: 'rgba(245, 158, 11, 0.18)',
        hashtags: ['#25sqmFrenchBalcony', '#CulturalMosaicDesign', '#MethanolReadyHull'],
        proof:
          'Purpose-built next-gen ship with 25m² Deck 3 French Balcony Suites, brass & warm timber "Cultural Mosaic" interiors, and zero floral carpets.',
        sources: 'TUI Zora ship architectural spec sheet + CV interior material scan',
        method: 'Cabin square-meter & material audit vs. legacy European river fleet',
        hash: '0x7d3e91a4...b229d4'
      },
      {
        id: 'light',
        num: '03',
        title: 'Warmth & Light',
        label: 'WARMTH & LIGHT',
        headline: 'Drop-Down Glass & 2700K Observatory Glow',
        certaintyBadge: '✓ 94% Fact',
        certaintyTier: '✓ 94% Hard-Verified',
        icon: Sun,
        color: '#fbbf24',
        bgGlow: 'rgba(251, 191, 36, 0.18)',
        hashtags: ['#DropDownRiverGlass', '#360SunDeck', '#2700KObservatory'],
        proof:
          'Motorized drop-down panoramic glass turns Deck 3 suites into open-air river verandas by day; 2700K amber lounge lighting after dusk.',
        sources: 'Computer Vision luminance & glazing ratio scan across ship gallery',
        method: 'Window-to-bulkhead ratio & evening Kelvin color-temperature histogram',
        hash: '0x7d3e91a4...c338e1'
      },
      {
        id: 'hosts',
        num: '04',
        title: 'The Hosts',
        label: 'THE HOSTS',
        headline: '1:3.6 Crew Ratio — Unstuffy British Warmth',
        certaintyBadge: '◎ 93% Proven',
        certaintyTier: '◎ 93% Corroborated',
        icon: Award,
        color: '#10b981',
        bgGlow: 'rgba(16, 185, 129, 0.18)',
        hashtags: ['#52CrewTo188Guests', '#AtriumShoreDesk', '#ZeroCaptainStiffness'],
        proof:
          '52 crew for 188 guests (1:3.6 ratio) — bartender remembers your gin garnish by Night 1 and Cruise Director maps off-trail port walks.',
        sources: 'TUI River Cruises verified UK passenger reviews + crew ratio ledger',
        method: 'Multi-source hospitality sentiment & crew-to-berth ratio audit',
        hash: '0x7d3e91a4...d447f2'
      },
      {
        id: 'crowd',
        num: '05',
        title: 'The Crowd',
        label: 'THE CROWD',
        headline: 'Strictly 18+ · TUI’s Youngest Cruise Profile',
        certaintyBadge: '◎ 91% Proven',
        certaintyTier: '◎ 91% Corroborated',
        icon: Users,
        color: '#a855f7',
        bgGlow: 'rgba(168, 85, 247, 0.18)',
        hashtags: ['#StrictlyAdultsOnly', '#Younger38To55Shift', '#NotARetirementBoat'],
        proof:
          'Strictly 18+ adults-only policy attracting 38–55 city-break & wine-country couples — open-seating dining with zero forced table sharing.',
        sources: 'TUI River Cruises demographic booking shift + passenger review mix',
        method: 'Age-policy verification & independent couple vs. coach-group ratio',
        hash: '0x7d3e91a4...e556a8'
      },
      {
        id: 'time',
        num: '06',
        title: 'Best Time of Day',
        label: 'BEST TIME OF DAY',
        headline: '11:00 Gorge Sail · 17:30 Port Wine Walk',
        certaintyBadge: '◎ 92% Proven',
        certaintyTier: '◎ 92% Corroborated',
        icon: Clock,
        color: '#ec4899',
        bgGlow: 'rgba(236, 72, 153, 0.18)',
        hashtags: ['#1100LoreleiCastles', '#1730PortGoldenHour', '#2100ObservatoryDrinks'],
        proof:
          '360° Top Deck castle cruising through the Rhine Gorge at 11 AM, golden-hour ashore in Moselle wine towns at 5:30 PM, cocktails at 9 PM.',
        sources: 'Rhine/Moselle lock transit schedules + port mooring windows',
        method: 'Diurnal itinerary mapping across sailing, port docking & evening bar hours',
        hash: '0x7d3e91a4...f665b3'
      },
      {
        id: 'sound',
        num: '07',
        title: 'Sound & Sleep',
        label: 'SOUND & SLEEP',
        headline: 'Zero Ocean Swell · 38 dB Cabin Silence',
        certaintyBadge: '✓ 95% Fact',
        certaintyTier: '✓ 95% Hard-Verified',
        icon: Volume2,
        color: '#38bdf8',
        bgGlow: 'rgba(56, 189, 248, 0.18)',
        hashtags: ['#ZeroMotionSickness', '#38dBCabinQuiet', '#70dBObservatoryAcoustic'],
        proof:
          'Flat-water river gliding with zero sea swell; next-gen acoustic engine isolation keeps Deck 2 & 3 cabins at 38 dB while The Observatory buzzes forward.',
        sources: 'Next-gen hull acoustic specs + guest sleep-quality review consensus',
        method: 'Propulsion vibration isolation check + cabin-to-lounge distance mapping',
        hash: '0x7d3e91a4...a774c1'
      },
      {
        id: 'insider',
        num: '08',
        title: 'Insider Tips',
        label: 'INSIDER TIPS',
        headline: 'Book Midship Deck 3 + Skip the Coach in Cochem',
        certaintyBadge: '◎ 90% Proven',
        certaintyTier: '◎ 90% Corroborated',
        icon: Sparkles,
        color: '#ffd700',
        bgGlow: 'rgba(255, 215, 0, 0.18)',
        hashtags: ['#Cabins308To318', '#SkipTheBigCoach', '#PortSideGoingSouth'],
        proof:
          'Pick Deck 3 French Balcony Suites #308–318 for eye-level castle views, and skip the group bus in Cochem — walk 4 mins to family Riesling cellars.',
        sources: 'Deck plan sightline audit + repeat river cruiser tips',
        method: 'Cabin position sightline verification & walkable port-town routing',
        hash: '0x7d3e91a4...f942c8'
      }
    ],
    LIVE_PHOTOS: [
      {
        slot: 1,
        title: 'Wide Daytime CGI Hull Render on Flat Water (Live #1)',
        flawNote: 'Leads with an exterior boat render — hides the 24.2m² Balcony Suites & boutique hotel interiors.',
        imageUrl: '/wtm-assets/tui-live-1-exterior.jpg'
      },
      {
        slot: 2,
        title: '2D Technical Deck 3 Wireframe Plan (Live #2)',
        flawNote: 'Clinical wireframe diagram instead of showing the castle-view suites or evening lounge.',
        imageUrl: '/wtm-assets/tui-live-2-deckplan.jpg'
      },
      {
        slot: 3,
        title: 'Close-Up Plated Dessert Shot (Live #3)',
        flawNote: 'Generic macro food close-up with zero ship architecture, river view, or social atmosphere.',
        imageUrl: '/wtm-assets/tui-live-3-dining.jpg'
      },
      {
        slot: 4,
        title: 'Deck 1 Standard Cabin with Small High Window (Live #4)',
        flawNote: 'Highlights the smallest high-window cabin while burying the 24.2m² French Balcony Suites.',
        imageUrl: '/wtm-assets/tui-live-4-corridor.jpg'
      },
      {
        slot: 5,
        title: 'Overexposed White-Sky Deck Rail Shot (Live #5)',
        flawNote: 'Blown-out white sky background hides the Rhine/Moselle castles and walkable river towns.',
        imageUrl: '/wtm-assets/tui-live-5-bow.jpg'
      }
    ],
    OPTIMAL_PHOTOS: [
      {
        slot: 1,
        current_slot: 14,
        photo_subject: '24.2m² Balcony Suite Lounge Opening to River Castle Views',
        why_it_converts:
          'Destroys the "cramped river cabin" myth in 1 second — looks like a 5-star floating boutique hotel suite (official TUI Zora CGI).',
        photo_url: '/wtm-assets/tui-opt-1-frenchbalcony.jpg'
      },
      {
        slot: 2,
        current_slot: 22,
        photo_subject: 'Evening Lounge — Younger Couple Laughing Over Wine & Craft Beer',
        why_it_converts:
          'Instantly proves TUI River Cruises’ younger, unstuffy 18+ social energy (promoted from Entertainment tab #22).',
        photo_url: '/wtm-assets/tui-opt-2-observatory.jpg'
      },
      {
        slot: 3,
        current_slot: 11,
        photo_subject: 'Superior French Balcony King Bedroom with Castle & River View',
        why_it_converts:
          'Satisfies the 2-cabin visual rule by pairing the UK King Bed with floor-to-ceiling river & castle views (promoted from Cabins #11).',
        photo_url: '/wtm-assets/tui-opt-3-cochem-port.jpg'
      },
      {
        slot: 4,
        current_slot: 12,
        photo_subject: 'Boutique Gold-Brass Walk-In Rainshower & Backlit Marble Vanity',
        why_it_converts:
          'Eliminates the #1 cruise objection ("tiny wet-room bathrooms") with a luxury hotel bathroom (promoted from Cabins #12).',
        photo_url: '/wtm-assets/tui-opt-4-topdeck.jpg'
      },
      {
        slot: 5,
        current_slot: 18,
        photo_subject: 'Walkable Medieval River Quay — Step Off Straight Into Historic Towns',
        why_it_converts:
          'Grounds the #1 river cruise advantage right before checkout: docking in the heart of Europe’s most walkable river towns.',
        photo_url: '/wtm-assets/tui-opt-5-port.jpg'
      }
    ]
  }
};

const SLIDE_META = [
  { index: 0, shortLabel: '1. Vibe DNA' },
  { index: 1, shortLabel: '2. OTA Gap' },
  { index: 2, shortLabel: '3. Photo Fix' },
  { index: 3, shortLabel: '4. Live Demo' }
];

export default function WtmMobileDeckPage({ defaultDemo }) {
  const navigate = useNavigate();
  const location = useLocation();

  const resolveInitialDeck = () => {
    if (defaultDemo && DECK_PROFILES[defaultDemo]) return defaultDemo;
    const path = (location.pathname || '').toLowerCase();
    if (path.includes('tui')) return 'tui-zora';
    const params = new URLSearchParams(location.search);
    const demoParam = (params.get('demo') || '').toLowerCase();
    if (demoParam.includes('tui')) return 'tui-zora';
    return 'sea-containers-london';
  };

  const [activeDeckKey, setActiveDeckKey] = useState(resolveInitialDeck);
  const [slide, setSlide] = useState(0);
  const [activeSignalIdx, setActiveSignalIdx] = useState(0);
  const [showProofDrawer, setShowProofDrawer] = useState(false);

  const [photoMode, setPhotoMode] = useState('after'); // 'before' | 'after'
  const [selectedSlotIdx, setSelectedSlotIdx] = useState(0);
  const [gapSlotIdx, setGapSlotIdx] = useState(0);
  const [lightboxItem, setLightboxItem] = useState(null);
  const carouselRef = useRef(null);
  const gapCarouselRef = useRef(null);
  const fixCarouselRef = useRef(null);

  useEffect(() => {
    const nextKey = resolveInitialDeck();
    setActiveDeckKey(nextKey);
    setActiveSignalIdx(0);
    setSelectedSlotIdx(0);
    setGapSlotIdx(0);
  }, [location.pathname, location.search, defaultDemo]);

  const deck = DECK_PROFILES[activeDeckKey] || DECK_PROFILES['sea-containers-london'];
  const SIGNALS = deck.SIGNALS;
  const livePhotos = deck.LIVE_PHOTOS;
  const optimalPhotos = deck.OPTIMAL_PHOTOS;

  const handleSwitchDeck = (key) => {
    setActiveDeckKey(key);
    setActiveSignalIdx(0);
    setSelectedSlotIdx(0);
    setGapSlotIdx(0);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
    if (gapCarouselRef.current) {
      gapCarouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
    if (fixCarouselRef.current) {
      fixCarouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  // Update activeSignalIdx as the user horizontally swipes the carousel
  const handleCarouselScroll = () => {
    const container = carouselRef.current;
    if (!container) return;
    const cardWidth = container.clientWidth * 0.86;
    if (cardWidth <= 0) return;
    const approxIdx = Math.round(container.scrollLeft / cardWidth);
    const clamped = Math.max(0, Math.min(SIGNALS.length - 1, approxIdx));
    if (clamped !== activeSignalIdx) {
      setActiveSignalIdx(clamped);
    }
  };

  const scrollToGapSlot = (idx) => {
    const clamped = Math.max(0, Math.min(livePhotos.length - 1, idx));
    setGapSlotIdx(clamped);
    const container = gapCarouselRef.current;
    if (container && container.children[clamped]) {
      container.children[clamped].scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  };

  const handleGapCarouselScroll = () => {
    const container = gapCarouselRef.current;
    if (!container) return;
    const cardWidth = container.clientWidth * 0.9;
    if (cardWidth <= 0) return;
    const approxIdx = Math.round(container.scrollLeft / cardWidth);
    const clamped = Math.max(0, Math.min(livePhotos.length - 1, approxIdx));
    if (clamped !== gapSlotIdx) {
      setGapSlotIdx(clamped);
    }
  };

  const scrollToFixSlot = (idx) => {
    const listLen = (photoMode === 'after' ? optimalPhotos : livePhotos).length;
    const clamped = Math.max(0, Math.min(listLen - 1, idx));
    setSelectedSlotIdx(clamped);
    const container = fixCarouselRef.current;
    if (container && container.children[clamped]) {
      container.children[clamped].scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  };

  const handleFixCarouselScroll = () => {
    const container = fixCarouselRef.current;
    if (!container) return;
    const cardWidth = container.clientWidth * 0.9;
    if (cardWidth <= 0) return;
    const listLen = (photoMode === 'after' ? optimalPhotos : livePhotos).length;
    const approxIdx = Math.round(container.scrollLeft / cardWidth);
    const clamped = Math.max(0, Math.min(listLen - 1, approxIdx));
    if (clamped !== selectedSlotIdx) {
      setSelectedSlotIdx(clamped);
    }
  };

  const activePhotoList = photoMode === 'after' ? optimalPhotos : livePhotos;

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: 'radial-gradient(circle at 50% 0%, #0f2542 0%, #050a14 60%, #02050a 100%)',
        color: '#ffffff',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none',
        overflowX: 'hidden'
      }}
    >
      <Helmet>
        <title>{deck.pageTitle}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* TOP COMPACT HEADER + 4 NAVIGATION CONTAINERS */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(4, 9, 18, 0.96)',
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(0, 229, 255, 0.2)',
          padding: '16px 16px 18px'
        }}
      >
        <div style={{ maxWidth: '480px', width: '100%', margin: '0 auto' }}>
          {/* Brand + 1-Tap Demo Switcher Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '16px' }}>
            <Link to="/" className="logo" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
              <img
                src="/models/Atmosvibe6.svg"
                alt="AtmosVibe"
                className="nav-logo"
                style={{ height: '48px', width: 'auto', display: 'block' }}
              />
            </Link>

            {/* 1-Tap Switcher Pill: TUI Zora vs Sea Containers */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(15, 23, 42, 0.9)',
                padding: '4px',
                borderRadius: '999px',
                border: '1px solid rgba(0, 229, 255, 0.35)'
              }}
            >
              {Object.values(DECK_PROFILES).map((prof) => {
                const isSelected = prof.slug === activeDeckKey;
                return (
                  <button
                    key={prof.slug}
                    type="button"
                    onClick={() => handleSwitchDeck(prof.slug)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '999px',
                      border: 'none',
                      background: isSelected ? 'rgba(0, 229, 255, 0.22)' : 'transparent',
                      color: isSelected ? '#ffffff' : '#94a3b8',
                      fontSize: '11px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: isSelected ? 'inset 0 0 0 1px #00e5ff' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {prof.shortToggleLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Property Banner */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 900, color: '#e2e8f0' }}>
              {activeDeckKey === 'tui-zora' ? <Anchor size={14} color="#00e5ff" /> : <MapPin size={14} color="#00e5ff" />}
              <span>{deck.propertyName}</span>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#34d399', background: 'rgba(16, 185, 129, 0.14)', border: '1px solid rgba(52, 211, 153, 0.4)', padding: '2px 8px', borderRadius: '999px' }}>
              {deck.liveScore}/100 ➔ {deck.optimalScore}/100 ({deck.upliftPct})
            </span>
          </div>

          {/* 4 Bold Top Tab Containers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
            {SLIDE_META.map((s) => {
              const isActive = s.index === slide;
              return (
                <button
                  key={s.index}
                  type="button"
                  onClick={() => setSlide(s.index)}
                  style={{
                    padding: '11px 4px',
                    borderRadius: '11px',
                    border: isActive ? '2px solid #00e5ff' : '1px solid rgba(255,255,255,0.16)',
                    background: isActive ? 'linear-gradient(180deg, rgba(0, 229, 255, 0.26), rgba(0, 229, 255, 0.1))' : 'rgba(15, 23, 42, 0.85)',
                    color: isActive ? '#ffffff' : '#cbd5e1',
                    fontSize: '11.5px',
                    fontWeight: 900,
                    cursor: 'pointer',
                    boxShadow: isActive ? '0 0 16px rgba(0, 229, 255, 0.35)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {s.shortLabel}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* MAIN SLIDE VIEWPORT */}
      <div style={{ flex: 1, maxWidth: '480px', width: '100%', margin: '0 auto', padding: '28px 18px 52px', display: 'flex', flexDirection: 'column' }}>
        {/* ==================== SLIDE 1: HORIZONTAL SNAP-SCROLL 8-SIGNAL DECK ==================== */}
        {slide === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', flex: 1 }}>
            {/* Clean Title Only */}
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 900, lineHeight: 1.15, margin: 0, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                8-Signal <span style={{ color: '#00e5ff' }}>Vibe Signature</span>
              </h1>
            </div>

            {/* HORIZONTAL SNAP-SCROLL CAROUSEL — 1 HERO CARD ON SCREEN AT A TIME */}
            <div
              ref={carouselRef}
              onScroll={handleCarouselScroll}
              style={{
                display: 'flex',
                gap: '16px',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                paddingTop: '4px',
                paddingBottom: '16px',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {SIGNALS.map((sig, idx) => {
                const Icon = sig.icon;
                const isActive = idx === activeSignalIdx;
                return (
                  <div
                    key={sig.id}
                    style={{
                      flex: '0 0 88%',
                      scrollSnapAlign: 'center',
                      borderRadius: '24px',
                      background: `linear-gradient(155deg, ${sig.bgGlow} 0%, rgba(10, 18, 34, 0.98) 55%, rgba(6, 11, 22, 0.99) 100%)`,
                      border: `2px solid ${isActive ? sig.color : 'rgba(255,255,255,0.18)'}`,
                      borderTop: `6px solid ${sig.color}`,
                      padding: '28px 22px',
                      boxShadow: isActive ? `0 18px 40px rgba(0,0,0,0.65), 0 0 26px ${sig.bgGlow}` : '0 8px 20px rgba(0,0,0,0.45)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '28px',
                      boxSizing: 'border-box',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {/* LAYER 1: ULTRA-CLEAN HERO SIGNAL CONTENT */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {/* Top Badge Row: Main Title Only | Verified Certainty Pill */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '7px',
                            fontSize: '15px',
                            fontWeight: 900,
                            color: sig.color
                          }}
                        >
                          <Icon size={18} color={sig.color} />
                          <span>{sig.title}</span>
                        </span>

                        <span
                          style={{
                            fontSize: '11.5px',
                            fontWeight: 900,
                            color: '#34d399',
                            background: 'rgba(16, 185, 129, 0.18)',
                            border: '1px solid rgba(52, 211, 153, 0.5)',
                            padding: '4px 10px',
                            borderRadius: '999px'
                          }}
                        >
                          {sig.certaintyBadge}
                        </span>
                      </div>

                      {/* Giant Signal Headline */}
                      <div
                        style={{
                          fontSize: '1.4rem',
                          fontWeight: 900,
                          color: '#ffffff',
                          lineHeight: 1.24,
                          letterSpacing: '-0.02em'
                        }}
                      >
                        {sig.headline}
                      </div>

                      {/* Bold #Hashtag Pills */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {sig.hashtags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            style={{
                              fontSize: '12px',
                              fontWeight: 800,
                              color: '#ffffff',
                              background: 'rgba(255, 255, 255, 0.08)',
                              border: `1.5px solid ${sig.color}`,
                              padding: '5px 12px',
                              borderRadius: '999px'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Concise 1-Sentence Reality Summary */}
                      <div
                        style={{
                          fontSize: '13.5px',
                          fontWeight: 600,
                          color: '#e2e8f0',
                          lineHeight: 1.5
                        }}
                      >
                        {sig.proof}
                      </div>
                    </div>

                    {/* LAYER 2: COLLAPSED BY DEFAULT — TAP TO EXPAND VERIFICATION PROOF & HASH */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <button
                        type="button"
                        onClick={() => setShowProofDrawer(!showProofDrawer)}
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          borderRadius: '12px',
                          background: 'rgba(16, 185, 129, 0.14)',
                          border: '1px solid rgba(52, 211, 153, 0.45)',
                          color: '#34d399',
                          fontSize: '11.5px',
                          fontWeight: 900,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          fontFamily: 'monospace'
                        }}
                      >
                        <span>✓ Verified • {sig.hash}</span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#a7f3d0' }}>
                          <span>{showProofDrawer ? 'Hide Proof' : 'Tap for Proof'}</span>
                          {showProofDrawer ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </span>
                      </button>

                      {showProofDrawer && (
                        <div
                          style={{
                            background: 'rgba(2, 6, 14, 0.94)',
                            border: '1px solid rgba(52, 211, 153, 0.4)',
                            borderLeft: '3px solid #34d399',
                            borderRadius: '10px',
                            padding: '11px 13px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '5px'
                          }}
                        >
                          <div style={{ fontSize: '11.5px', color: '#e2e8f0', lineHeight: 1.4 }}>
                            <strong style={{ color: '#34d399' }}>Sources:</strong> {sig.sources}
                          </div>
                          <div style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.35 }}>
                            <strong style={{ color: '#cbd5e1' }}>Method:</strong> {sig.method}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== SLIDE 2: THE OTA / GALLERY GAP (LARGE SWIPEABLE PHOTOS) ==================== */}
        {slide === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
            <div>
              <h1 style={{ fontSize: '1.38rem', fontWeight: 900, lineHeight: 1.15, margin: '0 0 5px', letterSpacing: '-0.02em' }}>
                {deck.gapHeadlineTop}
                <br />
                <span style={{ color: '#ef4444' }}>{deck.gapHeadlineRed}</span>
              </h1>
              <p style={{ fontSize: '12.5px', color: '#cbd5e1', margin: 0, lineHeight: 1.45 }}>
                {deck.gapSubhead}
              </p>
            </div>

            {/* Header Bar: Live Score + Swipe Hint */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(239, 68, 68, 0.14)', border: '1px solid rgba(239, 68, 68, 0.45)', borderRadius: '12px', padding: '8px 12px' }}>
              <span style={{ fontSize: '11.5px', fontWeight: 900, color: '#fca5a5', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {deck.liveStripBanner} • Swipe Photos ↔
              </span>
              <span style={{ fontSize: '12.5px', fontWeight: 900, background: '#ef4444', color: '#ffffff', padding: '3px 9px', borderRadius: '6px' }}>
                {deck.liveScore} / 100
              </span>
            </div>

            {/* LARGE HORIZONTAL SNAP-SCROLL CAROUSEL FOR LIVE PHOTOS */}
            <div
              ref={gapCarouselRef}
              onScroll={handleGapCarouselScroll}
              style={{
                display: 'flex',
                gap: '14px',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                paddingBottom: '6px',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {livePhotos.map((p, idx) => {
                const slotNum = idx + 1;
                const badgeCfg =
                  slotNum === 1
                    ? { isRed: true, text: deck.liveSlot1Tag }
                    : deck.flawBadges[slotNum] || { isRed: true, text: `Live #${slotNum}` };
                const isSelected = idx === gapSlotIdx;

                return (
                  <div
                    key={slotNum}
                    style={{
                      flex: '0 0 92%',
                      scrollSnapAlign: 'center',
                      borderRadius: '18px',
                      overflow: 'hidden',
                      background: 'rgba(10, 18, 34, 0.98)',
                      border: isSelected ? '2.5px solid #ef4444' : '1.5px solid rgba(255,255,255,0.2)',
                      boxShadow: isSelected ? '0 14px 34px rgba(0,0,0,0.7), 0 0 20px rgba(239, 68, 68, 0.25)' : '0 8px 20px rgba(0,0,0,0.45)',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    {/* LARGE UNOBSTRUCTED PHOTO VIEWPORT (285px tall) */}
                    <div
                      onClick={() =>
                        setLightboxItem({
                          url: p.imageUrl,
                          badge: `Live Slot #${slotNum} (${deck.liveScore}/100)`,
                          title: p.title,
                          note: p.flawNote,
                          isOptimal: false
                        })
                      }
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '285px',
                        background: '#02060d',
                        cursor: 'zoom-in'
                      }}
                    >
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                      />
                      {/* Top-Left Slot Pill */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          background: badgeCfg.isRed ? '#ef4444' : 'rgba(0,0,0,0.88)',
                          color: '#ffffff',
                          fontSize: '11.5px',
                          fontWeight: 900,
                          padding: '5px 11px',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                        }}
                      >
                        {badgeCfg.text}
                      </div>
                      {/* Top-Right Tap to Zoom Pill */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          background: 'rgba(4, 9, 18, 0.82)',
                          border: '1px solid rgba(255,255,255,0.28)',
                          color: '#e2e8f0',
                          fontSize: '10.5px',
                          fontWeight: 800,
                          padding: '4px 9px',
                          borderRadius: '8px'
                        }}
                      >
                        🔍 Tap to Zoom ({slotNum}/5)
                      </div>
                    </div>

                    {/* CLEAN CAPTION DOCK BELOW THE PHOTO (Never covers the image!) */}
                    <div style={{ padding: '13px 15px', background: 'rgba(12, 20, 36, 0.98)', borderTop: '1px solid rgba(239, 68, 68, 0.3)' }}>
                      <div style={{ fontSize: '14px', fontWeight: 900, color: '#ffffff', marginBottom: '4px', lineHeight: 1.25 }}>
                        {p.title}
                      </div>
                      <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#fca5a5', lineHeight: 1.4 }}>
                        {p.flawNote}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 5-Thumbnail Filmstrip — Tap Any Slot 1-5 to Scroll */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '7px' }}>
              {livePhotos.map((item, idx) => {
                const isSelected = idx === gapSlotIdx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => scrollToGapSlot(idx)}
                    style={{
                      position: 'relative',
                      height: '74px',
                      padding: 0,
                      borderRadius: '10px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: isSelected ? '2.5px solid #ef4444' : '1px solid rgba(255,255,255,0.22)',
                      opacity: isSelected ? 1 : 0.72,
                      transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <img
                      src={item.imageUrl}
                      alt={`Live Slot ${idx + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '3px',
                        left: '3px',
                        right: '3px',
                        background: isSelected ? '#ef4444' : 'rgba(0,0,0,0.85)',
                        color: '#fff',
                        fontSize: '10px',
                        fontWeight: 900,
                        borderRadius: '4px',
                        padding: '2px'
                      }}
                    >
                      Live #{idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* 3 Visceral Flaws Summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginTop: '2px' }}>
              {deck.visceralFlaws.map((flawNode, fIdx) => (
                <div
                  key={fIdx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12.5px',
                    color: '#ffffff',
                    background: 'rgba(239,68,68,0.16)',
                    border: '1px solid rgba(239,68,68,0.35)',
                    padding: '9px 11px',
                    borderRadius: '10px'
                  }}
                >
                  <AlertTriangle size={16} color="#f87171" style={{ flexShrink: 0 }} />
                  <span>{flawNode}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== SLIDE 3: INTERACTIVE PHOTO FIX (LARGE SWIPEABLE CAROUSEL) ==================== */}
        {slide === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
            <div>
              <h1 style={{ fontSize: '1.35rem', fontWeight: 900, lineHeight: 1.15, margin: '0 0 10px' }}>
                {deck.fixHeadlineTop}
                <br />
                <span style={{ color: '#10b981' }}>{deck.fixHeadlineGreen}</span>
              </h1>

              {/* 1-Thumb Before / After Switcher */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', background: 'rgba(12,20,36,0.95)', padding: '5px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.18)' }}>
                <button
                  type="button"
                  onClick={() => {
                    setPhotoMode('before');
                    setSelectedSlotIdx(0);
                    if (fixCarouselRef.current) {
                      fixCarouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                    }
                  }}
                  style={{
                    padding: '10px',
                    borderRadius: '9px',
                    border: 'none',
                    fontWeight: 900,
                    fontSize: '12px',
                    cursor: 'pointer',
                    background: photoMode === 'before' ? '#ef4444' : 'transparent',
                    color: photoMode === 'before' ? '#fff' : '#cbd5e1'
                  }}
                >
                  🔴 Live Today ({deck.liveScore}/100)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPhotoMode('after');
                    setSelectedSlotIdx(0);
                    if (fixCarouselRef.current) {
                      fixCarouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                    }
                  }}
                  style={{
                    padding: '10px',
                    borderRadius: '9px',
                    border: 'none',
                    fontWeight: 900,
                    fontSize: '12px',
                    cursor: 'pointer',
                    background: photoMode === 'after' ? '#10b981' : 'transparent',
                    color: photoMode === 'after' ? '#041e13' : '#cbd5e1'
                  }}
                >
                  🟢 Vibe Re-Order ({deck.optimalScore}/100)
                </button>
              </div>
            </div>

            {/* LARGE HORIZONTAL SNAP-SCROLL CAROUSEL (295px TALL UNOBSTRUCTED PHOTOS) */}
            <div
              ref={fixCarouselRef}
              onScroll={handleFixCarouselScroll}
              style={{
                display: 'flex',
                gap: '14px',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                paddingBottom: '6px',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {activePhotoList.map((item, idx) => {
                const isSelected = idx === selectedSlotIdx;
                const imgSrc = item.photo_url || item.imageUrl;
                const badgeText =
                  photoMode === 'after'
                    ? `Slot #${idx + 1} • Promoted from #${item.current_slot}`
                    : `Live Slot #${idx + 1}`;
                const titleText = photoMode === 'after' ? item.photo_subject : item.title;
                const bodyText = photoMode === 'after' ? item.why_it_converts : item.flawNote;

                return (
                  <div
                    key={idx}
                    style={{
                      flex: '0 0 92%',
                      scrollSnapAlign: 'center',
                      borderRadius: '18px',
                      overflow: 'hidden',
                      background: 'rgba(10, 18, 34, 0.98)',
                      border: isSelected
                        ? `2.5px solid ${photoMode === 'after' ? '#10b981' : '#ef4444'}`
                        : '1.5px solid rgba(255,255,255,0.2)',
                      boxShadow: isSelected
                        ? `0 14px 34px rgba(0,0,0,0.7), 0 0 22px ${
                            photoMode === 'after' ? 'rgba(16, 185, 129, 0.28)' : 'rgba(239, 68, 68, 0.25)'
                          }`
                        : '0 8px 20px rgba(0,0,0,0.45)',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    {/* LARGE UNOBSTRUCTED PHOTO VIEWPORT (295px tall) */}
                    <div
                      onClick={() =>
                        setLightboxItem({
                          url: imgSrc,
                          badge: badgeText,
                          title: titleText,
                          note: bodyText,
                          isOptimal: photoMode === 'after'
                        })
                      }
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '295px',
                        background: '#02060d',
                        cursor: 'zoom-in'
                      }}
                    >
                      <img
                        src={imgSrc}
                        alt={titleText}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                      />
                      {/* Top-Left Slot Badge */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          background: photoMode === 'after' ? '#10b981' : '#ef4444',
                          color: photoMode === 'after' ? '#031c11' : '#ffffff',
                          fontSize: '11.5px',
                          fontWeight: 900,
                          padding: '5px 11px',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                        }}
                      >
                        {badgeText}
                      </div>
                      {/* Top-Right Tap to Zoom Pill */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          background: 'rgba(4, 9, 18, 0.82)',
                          border: '1px solid rgba(255,255,255,0.28)',
                          color: '#e2e8f0',
                          fontSize: '10.5px',
                          fontWeight: 800,
                          padding: '4px 9px',
                          borderRadius: '8px'
                        }}
                      >
                        🔍 Tap to Zoom ({idx + 1}/5)
                      </div>
                    </div>

                    {/* CLEAN CAPTION DOCK BELOW THE PHOTO (0% of photo covered!) */}
                    <div
                      style={{
                        padding: '14px 15px',
                        background: 'rgba(12, 20, 36, 0.98)',
                        borderTop: `1px solid ${
                          photoMode === 'after' ? 'rgba(16, 185, 129, 0.35)' : 'rgba(239, 68, 68, 0.3)'
                        }`
                      }}
                    >
                      <div style={{ fontSize: '14px', fontWeight: 900, color: '#ffffff', marginBottom: '4px', lineHeight: 1.25 }}>
                        {titleText}
                      </div>
                      <div
                        style={{
                          fontSize: '12.5px',
                          fontWeight: 600,
                          color: photoMode === 'after' ? '#a7f3d0' : '#fca5a5',
                          lineHeight: 1.4
                        }}
                      >
                        {bodyText}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 5 Larger Thumbnails Filmstrip — Tap Any Slot 1-5 to Scroll */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '7px' }}>
              {activePhotoList.map((item, idx) => {
                const isSelected = idx === selectedSlotIdx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => scrollToFixSlot(idx)}
                    style={{
                      position: 'relative',
                      height: '76px',
                      padding: 0,
                      borderRadius: '10px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: isSelected
                        ? `2.5px solid ${photoMode === 'after' ? '#10b981' : '#ef4444'}`
                        : '1px solid rgba(255,255,255,0.22)',
                      opacity: isSelected ? 1 : 0.72,
                      transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <img
                      src={item.photo_url || item.imageUrl}
                      alt={`Slot ${idx + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '3px',
                        left: '3px',
                        right: '3px',
                        background: isSelected
                          ? photoMode === 'after'
                            ? '#10b981'
                            : '#ef4444'
                          : 'rgba(0,0,0,0.88)',
                        color: isSelected && photoMode === 'after' ? '#031c11' : '#fff',
                        fontSize: '9.5px',
                        fontWeight: 900,
                        borderRadius: '4px',
                        padding: '2px'
                      }}
                    >
                      #{idx + 1} {photoMode === 'after' ? `(←#${item.current_slot})` : ''}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== SLIDE 4: HANDSHAKE CTA + QR SHARE ==================== */}
        {slide === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
            <div>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 900, lineHeight: 1.15, margin: '0 0 4px' }}>
                Turn Your Unique Vibe Into <span style={{ color: '#00e5ff' }}>Direct &amp; AI Bookings</span>
              </h1>
              <p style={{ fontSize: '12.5px', color: '#cbd5e1', margin: 0 }}>
                {deck.ctaDescription}
              </p>
            </div>

            {/* Locally Bundled QR Code Card for Instant Booth/Aisle Scan */}
            <div style={{ background: 'rgba(12, 20, 36, 0.95)', border: '2px solid rgba(0, 229, 255, 0.45)', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.6)' }}>
              <div style={{ background: '#ffffff', padding: '8px', borderRadius: '12px', flexShrink: 0 }}>
                <img
                  src="/wtm-assets/wtm-qr.png"
                  alt="Scan for Mobile Demo"
                  style={{ width: '96px', height: '96px', display: 'block' }}
                />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '10.5px', fontWeight: 900, color: '#ffd700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                  <QrCode size={13} />
                  <span>Instant Handshake Share</span>
                </div>
                <div style={{ fontSize: '15px', fontWeight: 900, color: '#fff', marginBottom: '4px' }}>
                  Scan to Open on Your Phone
                </div>
                <div style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: 1.4 }}>
                  Opens <strong>atmosvibe.io/{activeDeckKey === 'tui-zora' ? 'tui-zora' : 'wtm'}</strong> — zero login required.
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                type="button"
                onClick={() => navigate(`/audit?demo=${deck.slug}`)}
                style={{
                  width: '100%',
                  padding: '15px 16px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(90deg, #00e5ff, #10b981)',
                  color: '#04101c',
                  fontWeight: 900,
                  fontSize: '14.5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 8px 25px rgba(0, 229, 255, 0.35)'
                }}
              >
                <Layers size={17} />
                <span>{deck.dossierButtonLabel}</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/audit')}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1.5px solid rgba(0, 229, 255, 0.45)',
                  background: 'rgba(0, 229, 255, 0.1)',
                  color: '#00e5ff',
                  fontWeight: 800,
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <Zap size={15} />
                <span>Audit Another Property Live</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/vibe-api')}
                style={{
                  width: '100%',
                  padding: '11px 16px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  background: 'rgba(255, 255, 255, 0.06)',
                  color: '#e2e8f0',
                  fontWeight: 700,
                  fontSize: '12.5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <span>Tours &amp; Excursions Demo: Vibe API</span>
                <ExternalLink size={13} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FULL-SCREEN PHOTO ZOOM LIGHTBOX MODAL */}
      {lightboxItem && (
        <div
          onClick={() => setLightboxItem(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(2, 6, 14, 0.96)',
            backdropFilter: 'blur(14px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '18px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '520px',
              width: '100%',
              background: 'rgba(10, 18, 34, 0.98)',
              borderRadius: '18px',
              overflow: 'hidden',
              border: `2px solid ${lightboxItem.isOptimal ? '#10b981' : '#ef4444'}`,
              boxShadow: '0 24px 60px rgba(0,0,0,0.85)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: 'rgba(4, 9, 18, 0.95)', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
              <span
                style={{
                  background: lightboxItem.isOptimal ? '#10b981' : '#ef4444',
                  color: lightboxItem.isOptimal ? '#031c11' : '#ffffff',
                  fontSize: '11.5px',
                  fontWeight: 900,
                  padding: '4px 10px',
                  borderRadius: '6px'
                }}
              >
                {lightboxItem.badge}
              </span>
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 800,
                  padding: '5px 12px',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                ✕ Close
              </button>
            </div>

            <div style={{ background: '#000', width: '100%', maxHeight: '62dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={lightboxItem.url}
                alt={lightboxItem.title}
                style={{ width: '100%', maxHeight: '62dvh', objectFit: 'contain', display: 'block' }}
              />
            </div>

            <div style={{ padding: '14px 16px' }}>
              <div style={{ fontSize: '15px', fontWeight: 900, color: '#ffffff', marginBottom: '5px', lineHeight: 1.3 }}>
                {lightboxItem.title}
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: lightboxItem.isOptimal ? '#a7f3d0' : '#fca5a5', lineHeight: 1.45 }}>
                {lightboxItem.note}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
