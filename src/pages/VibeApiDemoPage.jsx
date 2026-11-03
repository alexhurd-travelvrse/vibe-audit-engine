import React, { useState, useMemo } from 'react';
import {
  Lock,
  Sparkles,
  ExternalLink,
  Clock,
  ShieldCheck,
  CheckCircle2,
  X,
  Users,
  Compass,
  Zap,
  MapPin
} from 'lucide-react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import {
  TRAVEL_CURIOUS_BLACK_CAB_TOURS
} from '../data/travelCuriousBlackCabVibes';
import './VibeApiDemoPage.css';

const STORAGE_KEY = 'atmosvibe_tc_vibe_api_unlocked';

// 1. TOUR PACE & RHYTHM (Literal, zero generic marketing words)
const TOUR_PACE_FILTERS = [
  {
    id: 'fast-paced',
    icon: '⚡',
    title: 'Fast-Paced',
    sub: 'Quick stops · Cover lots of ground',
    color: '#f43f5e'
  },
  {
    id: 'hop-out-walks',
    icon: '🚶',
    title: 'Lots of Hop-Out Walks',
    sub: 'Step out into alleys & courtyards',
    color: '#a855f7'
  },
  {
    id: 'slow-unhurried',
    icon: '☕',
    title: 'Slow & Unhurried',
    sub: 'Relaxed pace · Time for a pub or cafe',
    color: '#34d399'
  },
  {
    id: 'easy-ride',
    icon: '🚖',
    title: 'Easy Ride · Minimal Walking',
    sub: 'Stay in the cab · Kerbside stops',
    color: '#00e5ff'
  }
];

// 2. DESTINATION VIBE SIGNATURES (Matches AtmosVibe 8-Signal Signatures: Crowd, Tourist Trap vs Local, Character)
const DESTINATION_VIBE_FILTERS = [
  {
    id: 'where-locals-hang-out',
    icon: '🍻',
    title: 'Where Locals Hang Out',
    sub: 'Not a tourist trap · Real pubs & markets',
    color: '#f59e0b'
  },
  {
    id: 'zero-tour-buses',
    icon: '🤫',
    title: 'Quiet · Zero Tour Buses',
    sub: 'Hidden backstreets & silent courts',
    color: '#38bdf8'
  },
  {
    id: 'major-hotspots',
    icon: '📸',
    title: 'Famous Sightseeing Hotspots',
    sub: 'Big landmarks (skip crowds by cab)',
    color: '#ec4899'
  },
  {
    id: 'country-towns',
    icon: '🌿',
    title: 'Quiet Country & Old Towns',
    sub: 'Out of London · Zero city traffic',
    color: '#ffd700'
  }
];

// AtmosVibe Tour + Destination Signatures using the exact Vibe Category Signature language
const TOUR_VIBE_SIGNATURES = {
  TR04SC: {
    paceIds: ['fast-paced', 'hop-out-walks'],
    destIds: ['where-locals-hang-out', 'zero-tour-buses'],
    youLoveIf: 'You want a fast-paced 60s music tour hitting Abbey Road, Savile Row, and Soho with a Beatles obsessive.',
    tourPace: 'Fast-Paced · 8 hop-out stops (short 5–10 min walks)',
    theCrowd: 'Not a Tourist Trap (75% Local) — Quiet Marylebone mews & local Soho lanes; only Abbey Road crossing is busy',
    trueCharacter: 'Real 1960s recording studios, brick Soho music alleys & Georgian townhouses (zero chain venues)',
    theHost: 'Like a Local Friend — Unscripted 60s music obsessive, studio stories instead of dry dates',
    bestTime: '10:00 AM or 3:00 PM (Best street light at Abbey Road)',
    hashtags: ['#FastPaced', '#NotATouristTrap', '#8HopOutWalks']
  },
  TR2VLZ: {
    paceIds: ['fast-paced', 'hop-out-walks'],
    destIds: ['where-locals-hang-out'],
    youLoveIf: 'You want to explore Soho’s real vinyl shops, old music pubs, and basement club streets.',
    tourPace: 'Fast-Paced · Frequent hop-out walks in Soho & Camden',
    theCrowd: 'Where Locals Hang Out (80% Local) — Buzzing Soho & Camden music streets, not tourist coach stops',
    trueCharacter: 'Gritty Soho alleyways, independent record shops & historic rock pubs',
    theHost: 'Warm Local Insider — Witty rock-history cabbie with backstage stories',
    bestTime: '2:00 PM – 6:00 PM (When Soho & Camden streets come alive)',
    hashtags: ['#FastPaced', '#WhereLocalsHangOut', '#RealSohoPubs']
  },
  TVX23G: {
    paceIds: ['hop-out-walks'],
    destIds: ['zero-tour-buses', 'where-locals-hang-out'],
    youLoveIf: 'You want a dark, true-crime tour walking through quiet 1888 East End alleys and old Victorian pubs.',
    tourPace: 'Steady Pace · Warm cab ride between 6 short alley walks',
    theCrowd: 'Quiet · Zero Tour Buses — Deserted Spitalfields brick lanes after dusk + traditional local East End pubs',
    trueCharacter: 'Original 1888 cobbled courts, Victorian pub tilework & Hawksmoor church spires',
    theHost: 'Unscripted Storyteller — Serious crime-history insider, zero cheesy gimmicks',
    bestTime: 'After 5:30 PM (Dusk & streetlamp shadows)',
    hashtags: ['#QuietBackstreets', '#ZeroTourBuses', '#DarkCrimeHistory']
  },
  T77QC0: {
    paceIds: ['easy-ride', 'hop-out-walks'],
    destIds: ['zero-tour-buses'],
    youLoveIf: 'You want spooky ghost stories in silent, crowd-free medieval squares after dark.',
    tourPace: 'Easy Pace · Mostly cab ride + short 5-min courtyard stops',
    theCrowd: '100% Crowd-Free at Night — Financial District & Smithfield squares are completely empty after 7:00 PM',
    trueCharacter: 'Medieval stone cloisters, gaslit alleys & 500-year-old timber pubs',
    theHost: 'Entertaining Local Host — Dark London humour & ghost lore',
    bestTime: '7:00 PM onwards (After dark)',
    hashtags: ['#100PercentCrowdFree', '#QuietAtNight', '#EasyCabRide']
  },
  T1AKAJ: {
    paceIds: ['hop-out-walks', 'fast-paced'],
    destIds: ['zero-tour-buses', 'major-hotspots'],
    youLoveIf: 'You want an active family tour stepping into real Harry Potter filming alleys without walking for miles.',
    tourPace: 'Active · 7 hop-out walks into narrow arcades & bridges',
    theCrowd: 'Mix of Hidden & Busy — Tiny gaslit alleys with zero tour buses, plus busy King’s Cross for Platform 9¾',
    trueCharacter: 'Ornate Victorian wrought-iron markets & crooked 17th-century lanes',
    theHost: 'Great with Kids & Teens — Playful film-trivia insider, zero boredom',
    bestTime: '9:30 AM (Beats the midday queue at Platform 9¾)',
    hashtags: ['#ActiveHopOutWalks', '#HiddenAlleys', '#GreatForKids']
  },
  TSNPZ3: {
    paceIds: ['slow-unhurried', 'hop-out-walks'],
    destIds: ['country-towns'],
    youLoveIf: 'You want a relaxed door-to-door day trip to Oxford’s medieval colleges and libraries.',
    tourPace: 'Slow & Unhurried · Comfortable 90-min drive + flat college strolls',
    theCrowd: 'Calm University Town — Quiet college quads & cobbled lanes away from London traffic',
    trueCharacter: 'Real 13th-century honey-stone quadrangles, timber halls & old bookshops',
    theHost: 'Knowledgeable Local Host — Relaxed storyteller covering both Oxford history & film locations',
    bestTime: '9:00 AM departure (Arrives in Oxford before afternoon tour groups)',
    hashtags: ['#SlowAndUnhurried', '#QuietCollegeQuads', '#DoorToDoorDrive']
  },
  T26KP8: {
    paceIds: ['slow-unhurried'],
    destIds: ['country-towns'],
    youLoveIf: 'You want a slow, easygoing day in Georgian Bath seeing real Bridgerton filming streets and tearooms.',
    tourPace: 'Slow & Unhurried · Easy flat walks + time for lunch or tea',
    theCrowd: 'Relaxed Local Spa Town — Sophisticated, unhurried streets with independent cafes & boutiques',
    trueCharacter: '100% Authentic Georgian honey-stone crescents, colonnades & Roman baths',
    theHost: 'Warm Unscripted Host — Period-drama & architecture insider',
    bestTime: 'Full Day (Best light on the Royal Crescent between 11:00 AM – 3:00 PM)',
    hashtags: ['#SlowAndUnhurried', '#NotATouristTrap', '#GeorgianBath']
  },
  TOIN97: {
    paceIds: ['slow-unhurried'],
    destIds: ['country-towns', 'zero-tour-buses'],
    youLoveIf: 'You want to escape London traffic for a quiet 13th-century country village, Bath, and a country pub lunch.',
    tourPace: 'Slow & Unhurried · Includes time for a historic country pub lunch',
    theCrowd: 'Zero Tour Crowds in Lacock — Quiet, car-free medieval village lanes & country air',
    trueCharacter: 'Untouched 13th-century stone cottages, medieval abbey & real fireside country inns',
    theHost: 'Like a Local Friend — Easygoing countryside & heritage driver-guide',
    bestTime: 'Full Day (Lunch stop at 1:00 PM in a village inn)',
    hashtags: ['#SlowAndUnhurried', '#CountryPubLunch', '#ZeroCityTraffic']
  },
  TGTYRO: {
    paceIds: ['easy-ride', 'fast-paced'],
    destIds: ['major-hotspots'],
    youLoveIf: 'You want to see London’s big landmarks lit up at night from a warm cab with zero walking.',
    tourPace: 'Easy Ride · 2-hour sweep with quick kerbside photo stops (Zero walking)',
    theCrowd: 'Beat the Crowds — Stay in your private glass-roof cab while viewing busy Soho & Thames hotspots',
    trueCharacter: 'Floodlit Tower Bridge, Big Ben river reflections & Piccadilly neon',
    theHost: 'Smooth Evening Chauffeur — Relaxed commentary, great photo-stop timing',
    bestTime: '7:30 PM – 9:30 PM (Blue hour into full night lights)',
    hashtags: ['#EasyRideZeroWalking', '#NightLights', '#PrivateCabComfort']
  },
  T5C76S: {
    paceIds: ['hop-out-walks'],
    destIds: ['major-hotspots', 'zero-tour-buses'],
    youLoveIf: 'You want a serious WWII & Churchill history tour through Whitehall and quiet St James’s backstreets.',
    tourPace: 'Steady Pace · Cab ride along Whitehall + short walks in St James’s & Mayfair',
    theCrowd: '50% Busy Whitehall / 50% Quiet Backstreets — Ducks out of Westminster crowds into silent St James’s courts',
    trueCharacter: '1940s government buildings, historic cigar shops & traditional gentlemen’s club streets',
    theHost: 'Deep History Insider — Gripping WWII & political storyteller',
    bestTime: '10:00 AM or 3:00 PM',
    hashtags: ['#SteadyPace', '#WWIIHistory', '#QuietStJamesCourts']
  },
  TPHRI8: {
    paceIds: ['fast-paced', 'easy-ride'],
    destIds: ['major-hotspots'],
    youLoveIf: 'You’re short on time and want to hit every major royal landmark in 2 hours without walking.',
    tourPace: 'Fast-Paced 2-Hr Sweep · Kerbside photo stops, minimal walking',
    theCrowd: 'Famous Sightseeing Hotspot — High-crowd royal zone, but your cab uses taxi-only lanes to skip the queues',
    trueCharacter: 'Buckingham Palace, Westminster Abbey, Big Ben & Trafalgar Square',
    theHost: 'Sharp London Insider — Fast, punchy royal & Westminster stories',
    bestTime: '9:30 AM or 4:00 PM',
    hashtags: ['#FastPaced2Hrs', '#MinimalWalking', '#SkipCrowdsByCab']
  },
  TJI8RE: {
    paceIds: ['fast-paced', 'hop-out-walks'],
    destIds: ['major-hotspots', 'zero-tour-buses'],
    youLoveIf: 'You want half a day that combines the big famous sights with hidden Roman ruins and secret alleys.',
    tourPace: 'Fast-Paced · 60% cab ride / 40% short walks into hidden courts',
    theCrowd: 'Best of Both — Hits the big Westminster hotspots, then escapes into bus-free City alleys',
    trueCharacter: 'Royal palaces contrasted with 2,000-year-old Roman walls & medieval guildhalls',
    theHost: 'Master of "The Knowledge" — Shows you the secret corners right behind the tourist traps',
    bestTime: 'Morning (9:30 AM) or Afternoon (2:00 PM)',
    hashtags: ['#FastPaced', '#BigSightsPlusSecrets', '#ZeroTourBusAlleys']
  },
  TNA63G: {
    paceIds: ['slow-unhurried', 'hop-out-walks'],
    destIds: ['where-locals-hang-out', 'major-hotspots', 'zero-tour-buses'],
    youLoveIf: 'You want a full 6-hour day mixing big sights with Borough Market food and an old riverside pub.',
    tourPace: 'Slow & Unhurried · 6 hours with a proper pub lunch or food-market stop',
    theCrowd: 'Tourist Sights + Local Hangouts — Pairs major landmarks with local Wapping river pubs & artisan food stalls',
    trueCharacter: 'UNESCO palaces, cobbled Southwark wharves & 17th-century timbered taverns',
    theHost: 'Sociable All-Day Host — Unhurried storyteller who knows the best pub tables',
    bestTime: '10:00 AM – 4:00 PM (Includes lunch stop)',
    hashtags: ['#SlowAndUnhurried', '#WhereLocalsHangOut', '#RiversidePubStop']
  },
  TTBDTB: {
    paceIds: ['hop-out-walks', 'slow-unhurried'],
    destIds: ['zero-tour-buses', 'where-locals-hang-out'],
    youLoveIf: 'You want to avoid tourist traps completely and spend 4 hours in secret alleys, ruins, and quiet mews.',
    tourPace: 'Flexible · Frequent hop-out walks in traffic-free courts & gardens',
    theCrowd: '100% Not a Tourist Trap — Pin-drop quiet mews, bombed church gardens & gaslit legal inns',
    trueCharacter: 'Real hidden London: wisteria mews, Roman fragments & 17th-century taverns',
    theHost: 'Unscripted "Hidden London" Cabbie — Tailors the route live to what you like',
    bestTime: '10:00 AM or 2:00 PM',
    hashtags: ['#NotATouristTrap', '#ZeroTourBuses', '#100PercentHidden']
  },
  TYE4O3: {
    paceIds: ['slow-unhurried', 'hop-out-walks'],
    destIds: ['where-locals-hang-out'],
    youLoveIf: 'You want to hang out in London’s coolest local neighbourhoods—Notting Hill, Soho, and Shoreditch.',
    tourPace: 'Slow & Flexible 6-Hr Flow · Time for coffee, indie shops & pub stops',
    theCrowd: 'Where Locals Hang Out (85% Local) — Real neighbourhood high streets, street-art lanes & local cafes',
    trueCharacter: 'Pastel townhouses, Savile Row tailors, Soho record shops & East End warehouse murals',
    theHost: 'Plugged-In Local Insider — Knows the best independent coffee, food & design spots',
    bestTime: '10:30 AM – 4:30 PM',
    hashtags: ['#WhereLocalsHangOut', '#NotATouristTrap', '#CoolNeighbourhoods']
  },
  T0IE5Y: {
    paceIds: ['slow-unhurried', 'easy-ride'],
    destIds: ['where-locals-hang-out', 'zero-tour-buses', 'major-hotspots'],
    youLoveIf: 'You want a private cab on standby all day to go wherever you want at your own pace.',
    tourPace: '100% Your Own Pace · All-day private cab (8–10 hrs)',
    theCrowd: 'Avoids Tourist Traps Live — Your driver pivots around busy crowds in real time',
    trueCharacter: 'Custom mix of royal parks, hidden backstreets, local markets & floodlit night views',
    theHost: 'Dedicated Private Chauffeur-Host — Completely unscripted around your day',
    bestTime: 'Morning through Evening',
    hashtags: ['#YourOwnPace', '#SkipTouristTraps', '#AllDayPrivateCab']
  },
  TGH0DN: {
    paceIds: ['slow-unhurried', 'easy-ride'],
    destIds: ['country-towns'],
    youLoveIf: 'You want a comfortable door-to-door drive to Stonehenge without being herded onto a 50-seat tour bus.',
    tourPace: 'Slow & Easy · Private countryside drive + walk around the stone circle',
    theCrowd: 'Beats the Coach Crowds — Private cab timing lets you arrive outside peak tour-bus waves',
    trueCharacter: 'Open Salisbury Plain grassland & 4,500-year-old prehistoric stone circle',
    theHost: 'Relaxed Countryside & History Host — Makes the drive out as interesting as the stones',
    bestTime: '8:30 AM departure',
    hashtags: ['#EasyCountryDrive', '#NoTourBuses', '#Stonehenge']
  },
  TO3TAR: {
    paceIds: ['slow-unhurried', 'easy-ride'],
    destIds: ['country-towns', 'major-hotspots'],
    youLoveIf: 'You want an easy door-to-door trip to Windsor Castle and the quiet river town of Eton.',
    tourPace: 'Slow & Unhurried · Easy 1-hr drive from London + castle & river stroll',
    theCrowd: 'Busy at Castle Gates / Quiet in Eton — Cross the bridge into Eton for local high-street pubs & zero crowds',
    trueCharacter: '900-year-old royal fortress paired with traditional Eton riverside streets',
    theHost: 'Warm Royal & Local Insider — Drops you right at the castle entrance',
    bestTime: '9:30 AM departure',
    hashtags: ['#SlowAndUnhurried', '#EasyDoorToDoor', '#WindsorAndEton']
  }
};

function getTourSig(tour) {
  return (
    TOUR_VIBE_SIGNATURES[tour.id] || {
      paceIds: ['hop-out-walks'],
      destIds: ['zero-tour-buses'],
      youLoveIf: 'You want a private London Black Cab tour tailored around your pace.',
      tourPace: 'Balanced Pace · Cab ride + short walks',
      theCrowd: 'Not a Tourist Trap — Uses quiet cab-only backstreets',
      trueCharacter: 'Authentic London streets & historic architecture',
      theHost: 'Warm Local Insider — Accredited Knowledge cabbie',
      bestTime: 'Morning or Afternoon',
      hashtags: ['#BalancedPace', '#NotATouristTrap', '#QuietBackstreets']
    }
  );
}

function getTourHash(tourId) {
  let acc = 0x811c9dc5;
  const str = String(tourId || 'TC');
  for (let i = 0; i < str.length; i++) {
    acc = Math.imul(acc ^ str.charCodeAt(i), 0x01000193) >>> 0;
  }
  return `0x${acc.toString(16).padStart(8, '0').slice(0, 6)}...${str.toLowerCase()}`;
}

export default function VibeApiDemoPage() {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(STORAGE_KEY) === 'true';
    }
    return false;
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Row 1: Tour Pace filter
  const [selectedPace, setSelectedPace] = useState(null);
  // Row 2: Destination Vibe Signature filter (Tourist trap vs Where locals hang out, etc.)
  const [selectedDest, setSelectedDest] = useState(null);
  // Optional 1-tap proof drawer per tour card
  const [openProofId, setOpenProofId] = useState(null);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const cleaned = passwordInput.trim().toLowerCase();
    if (cleaned === 'travelvcurious' || cleaned === 'travelcurious' || cleaned === 'atmosvibe') {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      setIsUnlocked(true);
      setPasswordError('');
      setPasswordInput('');
    } else {
      setPasswordError('Incorrect access password. Please try again.');
    }
  };

  const handleLock = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setIsUnlocked(false);
    setPasswordInput('');
    setPasswordError('');
  };

  const matchesTour = (tour, paceId, destId) => {
    const sig = getTourSig(tour);
    const paceMatch = !paceId || (sig.paceIds || []).includes(paceId);
    const destMatch = !destId || (sig.destIds || []).includes(destId);
    return paceMatch && destMatch;
  };

  const filteredTours = useMemo(() => {
    return TRAVEL_CURIOUS_BLACK_CAB_TOURS.filter((tour) =>
      matchesTour(tour, selectedPace, selectedDest)
    );
  }, [selectedPace, selectedDest]);

  // ---------------- PASSWORD GATE ----------------
  if (!isUnlocked) {
    return (
      <Layout>
        <div className="tc-gate-wrapper">
          <div className="tc-gate-card">
            <div className="tc-gate-lock-icon">
              <Lock size={28} />
            </div>
            <div className="tc-gate-badge">
              <Sparkles size={12} /> PARTNER SANDBOX · PASSWORD PROTECTED
            </div>
            <form onSubmit={handlePasswordSubmit} className="tc-gate-form">
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordError('');
                  setPasswordInput(e.target.value);
                }}
                placeholder="Enter access password"
                className="tc-gate-input"
                autoFocus
              />
              {passwordError && <p className="tc-gate-error">{passwordError}</p>}
              <button type="submit" className="tc-gate-btn">
                <ShieldCheck size={18} />
                <span>Unlock Vibe API Demo</span>
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </Layout>
    );
  }

  // ---------------- UNLOCKED DIRECT VIBE SIGNATURE DEMO ----------------
  return (
    <Layout>
      <div
        style={{
          minHeight: '100vh',
          background: 'radial-gradient(circle at 50% 0%, #0f2542 0%, #050a14 60%, #02050a 100%)',
          color: '#ffffff',
          padding: '14px 12px 64px',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
        }}
      >
        <div style={{ maxWidth: '540px', margin: '0 auto' }}>
          {/* Compact Top Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '10px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '999px', background: 'rgba(0, 229, 255, 0.12)', border: '1px solid rgba(0, 229, 255, 0.35)', fontSize: '11px', fontWeight: 800, color: '#00e5ff' }}>
              <Sparkles size={12} />
              <span>London Black Cab Tours · Vibe Signatures</span>
            </div>
            <button
              type="button"
              onClick={handleLock}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#94a3b8',
                borderRadius: '8px',
                padding: '4px 9px',
                fontSize: '11px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer'
              }}
            >
              <Lock size={11} />
              <span>Lock</span>
            </button>
          </div>

          {/* ==================== DIRECT 2-ROW FILTER BOX ==================== */}
          <div
            style={{
              background: 'rgba(10, 18, 34, 0.95)',
              border: '1.5px solid rgba(0, 229, 255, 0.32)',
              borderRadius: '16px',
              padding: '14px',
              marginBottom: '16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.55)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <h1 style={{ fontSize: '1.05rem', fontWeight: 900, margin: 0, letterSpacing: '-0.01em' }}>
                Filter by <span style={{ color: '#00e5ff' }}>Tour Pace</span> &amp; <span style={{ color: '#ffd700' }}>Destination Crowd</span>
              </h1>
              {(selectedPace || selectedDest) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPace(null);
                    setSelectedDest(null);
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    color: '#ffffff',
                    fontSize: '10.5px',
                    fontWeight: 800,
                    padding: '4px 8px',
                    borderRadius: '999px',
                    cursor: 'pointer'
                  }}
                >
                  <X size={11} />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* 1. TOUR PACE & RHYTHM */}
            <div style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#00e5ff', marginBottom: '6px' }}>
              1. Tour Pace (How It Runs)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px', marginBottom: '12px' }}>
              {TOUR_PACE_FILTERS.map((item) => {
                const isSelected = selectedPace === item.id;
                const count = TRAVEL_CURIOUS_BLACK_CAB_TOURS.filter((t) =>
                  matchesTour(t, item.id, selectedDest)
                ).length;
                const isDimmed = count === 0 && !isSelected;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedPace(isSelected ? null : item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '6px',
                      padding: '8px 10px',
                      borderRadius: '10px',
                      border: isSelected ? `2px solid ${item.color}` : '1px solid rgba(255,255,255,0.13)',
                      background: isSelected ? 'rgba(0, 229, 255, 0.14)' : 'rgba(15, 23, 42, 0.9)',
                      color: '#ffffff',
                      cursor: 'pointer',
                      textAlign: 'left',
                      opacity: isDimmed ? 0.4 : 1,
                      boxShadow: isSelected ? `0 0 14px ${item.color}44` : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11.5px', fontWeight: 900, color: isSelected ? item.color : '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <span>{item.icon}</span>
                        <span>{item.title}</span>
                      </div>
                      <div style={{ fontSize: '9.5px', color: '#94a3b8', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '1px' }}>
                        {item.sub}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 900,
                        color: isSelected ? '#04101c' : '#94a3b8',
                        background: isSelected ? item.color : 'rgba(255,255,255,0.08)',
                        padding: '1px 6px',
                        borderRadius: '999px',
                        flexShrink: 0
                      }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* 2. DESTINATION VIBE SIGNATURE (THE CROWD / TOURIST TRAP VS LOCAL) */}
            <div style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#ffd700', marginBottom: '6px' }}>
              2. Destination Vibe (The Crowd &amp; Streets)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px' }}>
              {DESTINATION_VIBE_FILTERS.map((dest) => {
                const isSelected = selectedDest === dest.id;
                const count = TRAVEL_CURIOUS_BLACK_CAB_TOURS.filter((t) =>
                  matchesTour(t, selectedPace, dest.id)
                ).length;
                const isDimmed = count === 0 && !isSelected;

                return (
                  <button
                    key={dest.id}
                    type="button"
                    onClick={() => setSelectedDest(isSelected ? null : dest.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '6px',
                      padding: '8px 10px',
                      borderRadius: '10px',
                      border: isSelected ? `2px solid ${dest.color}` : '1px solid rgba(255, 215, 0, 0.22)',
                      background: isSelected ? 'rgba(255, 215, 0, 0.14)' : 'rgba(20, 27, 45, 0.88)',
                      color: '#ffffff',
                      cursor: 'pointer',
                      textAlign: 'left',
                      opacity: isDimmed ? 0.4 : 1,
                      boxShadow: isSelected ? `0 0 14px ${dest.color}44` : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11.5px', fontWeight: 900, color: isSelected ? dest.color : '#f8fafc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <span>{dest.icon}</span>
                        <span>{dest.title}</span>
                      </div>
                      <div style={{ fontSize: '9.5px', color: '#94a3b8', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '1px' }}>
                        {dest.sub}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 900,
                        color: isSelected ? '#04101c' : '#cbd5e1',
                        background: isSelected ? dest.color : 'rgba(255,255,255,0.08)',
                        padding: '1px 6px',
                        borderRadius: '999px',
                        flexShrink: 0
                      }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RESULTS COUNT STRIP */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', padding: '0 2px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {selectedPace || selectedDest
                ? `${filteredTours.length} Matching ${filteredTours.length === 1 ? 'Tour' : 'Tours'}`
                : `All ${filteredTours.length} Black Cab Tours`}
            </span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#34d399', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={13} color="#34d399" />
              <span>Verified Vibe Signatures</span>
            </span>
          </div>

          {/* EMPTY STATE IF COMBINATION HAS 0 TOURS */}
          {filteredTours.length === 0 && (
            <div
              style={{
                padding: '24px 16px',
                borderRadius: '16px',
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(255,255,255,0.14)',
                textAlign: 'center',
                marginBottom: '18px'
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
                No tour matches both of those exact filters.
              </div>
              <button
                type="button"
                onClick={() => setSelectedDest(null)}
                style={{
                  marginTop: '8px',
                  padding: '8px 14px',
                  borderRadius: '999px',
                  background: '#00e5ff',
                  color: '#04101c',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: 900,
                  cursor: 'pointer'
                }}
              >
                Show All Destination Vibes for This Pace
              </button>
            </div>
          )}

          {/* TOUR CARDS LIST */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {filteredTours.map((tour) => {
              const sig = getTourSig(tour);
              const primaryPace =
                TOUR_PACE_FILTERS.find((p) => sig.paceIds.includes(p.id)) || TOUR_PACE_FILTERS[0];
              const accentColor = primaryPace.color;
              const sigHash = getTourHash(tour.id);
              const isProofOpen = openProofId === tour.id;

              return (
                <article
                  key={tour.id}
                  style={{
                    borderRadius: '18px',
                    overflow: 'hidden',
                    background: 'rgba(12, 20, 36, 0.95)',
                    border: '1.5px solid rgba(255, 255, 255, 0.14)',
                    boxShadow: '0 14px 34px rgba(0, 0, 0, 0.55)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {/* ==================== 1. ATMOSVIBE TOP BADGE (STANDARD VIBE SIGNATURE CATEGORIES) ==================== */}
                  <div
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.14) 0%, rgba(6, 13, 26, 0.98) 100%)',
                      borderBottom: `1.5px solid ${accentColor}`,
                      borderLeft: `5px solid ${accentColor}`,
                      padding: '13px 14px'
                    }}
                  >
                    {/* Eyebrow + Verified Vibe Hash Pill */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', marginBottom: '6px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '10.5px',
                          fontWeight: 900,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: accentColor
                        }}
                      >
                        <CheckCircle2 size={13} color={accentColor} />
                        <span>You’ll Love This Tour If:</span>
                      </span>

                      <button
                        type="button"
                        onClick={() => setOpenProofId(isProofOpen ? null : tour.id)}
                        title="Tap to see True Character, The Host & Best Time"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          background: 'rgba(16, 185, 129, 0.16)',
                          border: '1px solid rgba(52, 211, 153, 0.45)',
                          color: '#34d399',
                          fontSize: '9.5px',
                          fontWeight: 900,
                          padding: '2px 7px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontFamily: 'monospace'
                        }}
                      >
                        <span>✓ Verified • {sigHash}</span>
                      </button>
                    </div>

                    {/* Plain-English "You'll love this tour if..." */}
                    <div
                      style={{
                        fontSize: '13.5px',
                        fontWeight: 800,
                        color: '#ffffff',
                        lineHeight: 1.35,
                        marginBottom: '9px'
                      }}
                    >
                      “{sig.youLoveIf}”
                    </div>

                    {/* VIBE SIGNATURE SIGNALS: TOUR PACE + THE CROWD (TOURIST TRAP VS LOCAL) */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr',
                        gap: '6px',
                        padding: '8px 10px',
                        borderRadius: '10px',
                        background: 'rgba(4, 10, 22, 0.82)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        marginBottom: '9px',
                        fontSize: '11.5px',
                        lineHeight: 1.35
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', color: '#f8fafc' }}>
                        <Zap size={13} color="#00e5ff" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div>
                          <strong style={{ color: '#00e5ff', textTransform: 'uppercase', fontSize: '10.5px', letterSpacing: '0.04em' }}>Tour Pace:</strong>{' '}
                          <span style={{ fontWeight: 700, color: '#ffffff' }}>{sig.tourPace}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', color: '#f8fafc' }}>
                        <Users size={13} color="#ffd700" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div>
                          <strong style={{ color: '#ffd700', textTransform: 'uppercase', fontSize: '10.5px', letterSpacing: '0.04em' }}>The Crowd:</strong>{' '}
                          <span style={{ color: '#e2e8f0' }}>{sig.theCrowd}</span>
                        </div>
                      </div>
                    </div>

                    {/* Direct Hashtags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {(sig.hashtags || []).map((tag, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: '11px',
                            fontWeight: 800,
                            color: '#00e5ff',
                            background: 'rgba(0, 229, 255, 0.1)',
                            border: '1px solid rgba(0, 229, 255, 0.3)',
                            padding: '2px 8px',
                            borderRadius: '999px'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* 1-Tap Expandable Vibe Signature Signals: TRUE CHARACTER, THE HOST, BEST TIME */}
                    {isProofOpen && (
                      <div
                        style={{
                          marginTop: '10px',
                          padding: '9px 10px',
                          borderRadius: '8px',
                          background: 'rgba(2, 6, 14, 0.94)',
                          border: '1px solid rgba(52, 211, 153, 0.35)',
                          borderLeft: '3px solid #34d399',
                          fontSize: '11px',
                          color: '#cbd5e1',
                          lineHeight: 1.4
                        }}
                      >
                        <div>
                          <strong style={{ color: '#a855f7' }}>True Character:</strong> {sig.trueCharacter}
                        </div>
                        <div style={{ marginTop: '4px' }}>
                          <strong style={{ color: '#34d399' }}>The Host:</strong> {sig.theHost}
                        </div>
                        <div style={{ marginTop: '4px' }}>
                          <strong style={{ color: '#00e5ff' }}>Best Time of Day:</strong> {sig.bestTime}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ==================== 2. STANDARD TOUR CARD DATA ==================== */}
                  <div style={{ position: 'relative', height: '185px', overflow: 'hidden' }}>
                    <img
                      src={tour.imageUrl}
                      alt={tour.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      loading="lazy"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        right: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          background: 'rgba(4, 9, 18, 0.88)',
                          backdropFilter: 'blur(6px)',
                          color: '#f8fafc',
                          fontSize: '11px',
                          fontWeight: 800,
                          padding: '4px 10px',
                          borderRadius: '8px',
                          border: '1px solid rgba(255,255,255,0.15)'
                        }}
                      >
                        <Clock size={12} color="#00e5ff" />
                        <span>{tour.durationLabel}</span>
                      </span>

                      <span
                        style={{
                          background: 'rgba(4, 9, 18, 0.9)',
                          backdropFilter: 'blur(6px)',
                          color: '#ffd700',
                          fontSize: '11.5px',
                          fontWeight: 900,
                          padding: '4px 10px',
                          borderRadius: '8px',
                          border: '1px solid rgba(255, 215, 0, 0.35)'
                        }}
                      >
                        {tour.priceLabel}
                      </span>
                    </div>
                  </div>

                  {/* Standard Title, Original Description & CTA */}
                  <div style={{ padding: '14px' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#ffffff', margin: '0 0 6px', lineHeight: 1.25 }}>
                      {tour.title}
                    </h2>
                    <p style={{ fontSize: '12.5px', color: '#cbd5e1', lineHeight: 1.5, margin: '0 0 12px' }}>
                      {tour.originalCatalogueCopy}
                    </p>

                    <a
                      href={tour.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.16)',
                        color: '#ffffff',
                        fontSize: '12px',
                        fontWeight: 800,
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        boxSizing: 'border-box'
                      }}
                    >
                      <span>View Standard Listing on Travel Curious</span>
                      <ExternalLink size={13} color="#00e5ff" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
