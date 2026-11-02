import React, { useState, useMemo } from 'react';
import {
  Lock,
  Sparkles,
  ExternalLink,
  Clock,
  ShieldCheck,
  CheckCircle2,
  X,
  Footprints,
  Mic,
  SunMedium
} from 'lucide-react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import {
  TRAVEL_CURIOUS_BLACK_CAB_TOURS
} from '../data/travelCuriousBlackCabVibes';
import './VibeApiDemoPage.css';

const STORAGE_KEY = 'atmosvibe_tc_vibe_api_unlocked';

// LAYER 1: Pure Emotional Atmosphere & Vibe Filters (How you want it to FEEL, not just descriptive topics)
const ATMOSPHERE_CHIPS = [
  {
    id: 'rock-beatles',
    icon: '⚡',
    vibeTitle: 'Rebellious & Electric',
    subLabel: '60s counterculture & vinyl nostalgia',
    color: '#f43f5e'
  },
  {
    id: 'gothic-noir',
    icon: '🕯️',
    vibeTitle: 'Moody & Spine-Tingling',
    subLabel: 'Gaslit shadows & dark Victorian noir',
    color: '#10b981'
  },
  {
    id: 'cinematic-magic',
    icon: '✨',
    vibeTitle: 'Spellbinding & Playful',
    subLabel: 'Enchanted story-worlds & film wonder',
    color: '#a855f7'
  },
  {
    id: 'royal-power',
    icon: '👑',
    vibeTitle: 'Majestic & Ceremonial',
    subLabel: 'Regal pageantry & grand power corridors',
    color: '#ffd700'
  },
  {
    id: 'wartime-grit',
    icon: '🔥',
    vibeTitle: 'Gripping & High-Drama',
    subLabel: 'High-stakes intrigue & 1940s Blitz grit',
    color: '#f59e0b'
  },
  {
    id: 'nocturnal-lights',
    icon: '🌃',
    vibeTitle: 'Romantic & Nocturnal',
    subLabel: 'Blue-hour river glow & neon reflections',
    color: '#00e5ff'
  },
  {
    id: 'bespoke-knowledge',
    icon: '🧭',
    vibeTitle: 'Off-Radar & Unscripted',
    subLabel: 'Hushed secret courts & cabbie lore',
    color: '#38bdf8'
  },
  {
    id: 'countryside-regency',
    icon: '🌿',
    vibeTitle: 'Serene & Slow-Luxury',
    subLabel: 'Pastoral honey-stone & Regency calm',
    color: '#34d399'
  }
];

// LAYER 2: Tour Pacing & Rhythm Filters (Solving the #1 Tour Drop-Off Trigger: "Windscreen Trap vs. Hop-Out Cadence")
const PACING_FILTERS = [
  {
    id: 'hop-out-alleys',
    icon: '🚶',
    label: 'Hop-In / Hop-Out Alley Walks',
    shortDesc: '60% cab leaps + 40% secret cobbled courts & foot exploration',
    color: '#00e5ff'
  },
  {
    id: 'panoramic-glide',
    icon: '🚖',
    label: 'Effortless Cab Glide',
    shortDesc: 'High-impact panoramic sweep · Kerbside photo stops · Zero walking fatigue',
    color: '#ffd700'
  },
  {
    id: 'unhurried-graze',
    icon: '🍷',
    label: 'Unhurried & Tavern Pause',
    shortDesc: 'Lingering multi-neighbourhood flow · Historic pub or market stop',
    color: '#f59e0b'
  },
  {
    id: 'sanctuary-escape',
    icon: '🌄',
    label: 'Day-Long Sanctuary Escape',
    shortDesc: 'Door-to-door out-of-town cocoon + unhurried heritage strolls',
    color: '#34d399'
  }
];

// Per-tour Anti-Drop-Off Pacing, Guide Vibe, and Pure Atmospheric Hashtags
const TOUR_DROP_OFF_PROFILES = {
  TR04SC: {
    pacingIds: ['hop-out-alleys'],
    pacingBadge: 'Hop-In / Hop-Out · 8+ Studio & Alley Walks',
    guideVibeBadge: 'Passionate 60s Music Raconteur',
    peakVibeBadge: 'Late Morning / Golden Afternoon',
    vibeHashtags: ['#Electric60sNostalgia', '#RebelliousSohoVibe', '#HopOutStudioWalks']
  },
  TR2VLZ: {
    pacingIds: ['hop-out-alleys'],
    pacingBadge: 'Hop-In / Hop-Out · Soho Vinyl & Mews Stops',
    guideVibeBadge: 'Witty Backstage Rock Insider',
    peakVibeBadge: 'Afternoon into Early Evening Buzz',
    vibeHashtags: ['#EdgyBohemianGrit', '#HighVoltageRockLore', '#SecretSohoCobbles']
  },
  TVX23G: {
    pacingIds: ['hop-out-alleys'],
    pacingBadge: 'Warm Cab Cocoon + Gaslit Alley Footsteps',
    guideVibeBadge: 'Suspenseful Noir Storyteller',
    peakVibeBadge: 'Dusk & Long Shadows',
    vibeHashtags: ['#Moody1888Noir', '#SpineTinglingSuspense', '#ShadowyCobbleWalks']
  },
  T77QC0: {
    pacingIds: ['hop-out-alleys', 'panoramic-glide'],
    pacingBadge: 'After-Dark Cab Glide + Cloister Hop-Outs',
    guideVibeBadge: 'Theatrical Folklore & Dark Wit',
    peakVibeBadge: 'Twilight & After-Dark',
    vibeHashtags: ['#EerieSpectralMood', '#HushedMedievalSquares', '#TheatricalChills']
  },
  T1AKAJ: {
    pacingIds: ['hop-out-alleys'],
    pacingBadge: 'Interactive Hop-Out · Wand-Ready Arcade Walks',
    guideVibeBadge: 'Playful & Spellbinding Film Insider',
    peakVibeBadge: 'Mid-Morning Arcade Light',
    vibeHashtags: ['#SpellbindingWonder', '#PlayfulFamilyMagic', '#HiddenArcadeHopOuts']
  },
  TSNPZ3: {
    pacingIds: ['sanctuary-escape', 'unhurried-graze'],
    pacingBadge: 'Countryside Cab Cocoon + Cloister Strolls',
    guideVibeBadge: 'Cultured Oxford & Fantasy Storyteller',
    peakVibeBadge: 'Full-Day Golden Stone Arc',
    vibeHashtags: ['#TimelessScholarlyAwe', '#StorybookCloisters', '#UnhurriedDaySanctuary']
  },
  T26KP8: {
    pacingIds: ['sanctuary-escape', 'unhurried-graze'],
    pacingBadge: 'Door-to-Door Sanctuary + Regency Promenades',
    guideVibeBadge: 'Charming Society & Period-Drama Host',
    peakVibeBadge: 'Sunlit Countryside & Afternoon Crescents',
    vibeHashtags: ['#OpulentRegencyRomance', '#SlowLuxuryPromenade', '#SunlitGeorgianGlamour']
  },
  TOIN97: {
    pacingIds: ['sanctuary-escape', 'unhurried-graze'],
    pacingBadge: 'Slow-Luxury Escape + Village & Inn Pause',
    guideVibeBadge: 'Unhurried Country-Heritage Raconteur',
    peakVibeBadge: 'Full-Day Pastoral Calm',
    vibeHashtags: ['#TimeFrozenSerenity', '#RestorativeCountryPace', '#FiresideTavernPause']
  },
  TGTYRO: {
    pacingIds: ['panoramic-glide'],
    pacingBadge: 'Effortless Panoramic Glide · Kerbside Reflections',
    guideVibeBadge: 'Smooth, Intimate Evening Chauffeur-Host',
    peakVibeBadge: 'Blue Hour & After-Dark (19:30+)',
    vibeHashtags: ['#NocturnalRiverGlamour', '#EffortlessNightGlide', '#RomanticBlueHourGlow']
  },
  T5C76S: {
    pacingIds: ['hop-out-alleys'],
    pacingBadge: 'Rhythmic Whitehall Glide + Mayfair Walk Stops',
    guideVibeBadge: 'Gripping Wartime & Political Historian',
    peakVibeBadge: 'Crisp Morning or Late Afternoon Shadows',
    vibeHashtags: ['#HighStakes1940Tension', '#StoicWartimeDrama', '#InsiderWhitehallAccess']
  },
  TPHRI8: {
    pacingIds: ['panoramic-glide'],
    pacingBadge: 'High-Impact 2h Sweep · Zero Walking Fatigue',
    guideVibeBadge: 'Polished Royal & Westminster Insider',
    peakVibeBadge: 'Crisp Morning Pageantry or Golden Hour',
    vibeHashtags: ['#EffortlessVIPMajesty', '#WhistleStopGrandeur', '#ZeroCrowdVantagePoints']
  },
  TJI8RE: {
    pacingIds: ['hop-out-alleys', 'panoramic-glide'],
    pacingBadge: 'Balanced 60% Cab Sweep / 40% Hidden Court Walks',
    guideVibeBadge: 'Charismatic Master of "The Knowledge"',
    peakVibeBadge: 'Morning or Afternoon Half-Day Arc',
    vibeHashtags: ['#GrandToGrittyContrast', '#BusProhibitedBackstreets', '#EffortlessHalfDayFlow']
  },
  TNA63G: {
    pacingIds: ['unhurried-graze', 'hop-out-alleys'],
    pacingBadge: 'Unhurried 6h Immersion + Historic Tavern Pause',
    guideVibeBadge: 'Convivial, Encyclopedic London Host',
    peakVibeBadge: 'Full Day with Riverside Pub / Market Stop',
    vibeHashtags: ['#UnhurriedTavernRhythm', '#ConvivialStorytelling', '#GrandToSecretWharves']
  },
  TTBDTB: {
    pacingIds: ['hop-out-alleys'],
    pacingBadge: 'Nimble Backstreet Pivots + Secret Mews Walks',
    guideVibeBadge: 'Unscripted "Knowledge" Secret-Hunter',
    peakVibeBadge: 'Quiet Morning or Afternoon Backstreets',
    vibeHashtags: ['#100PercentOffRadar', '#SerendipitousDiscovery', '#HushedMewsAndRuins']
  },
  TYE4O3: {
    pacingIds: ['unhurried-graze', 'hop-out-alleys'],
    pacingBadge: '5-Village Flow + Spontaneous Coffee / Pub Stops',
    guideVibeBadge: 'Culturally Plugged-In Local Aesthetic Host',
    peakVibeBadge: 'Full-Day Neighbourhood Hopping',
    vibeHashtags: ['#EclecticVillageRhythm', '#UnscriptedLocalFlow', '#StylishSlowDiscovery']
  },
  T0IE5Y: {
    pacingIds: ['unhurried-graze', 'sanctuary-escape'],
    pacingBadge: 'Carte Blanche All-Day Standby · Your Own Pace',
    guideVibeBadge: 'Dedicated Private Historian & Chauffeur',
    peakVibeBadge: 'Full Morning-to-Night Circadian Arc',
    vibeHashtags: ['#TotalCarteBlancheFreedom', '#DaylightToNeonShift', '#ZeroRushVIPSanctuary']
  },
  TGH0DN: {
    pacingIds: ['sanctuary-escape', 'panoramic-glide'],
    pacingBadge: 'Door-to-Door Cab Sanctuary + Monolith Walk',
    guideVibeBadge: 'Engaging Ancient-Wessex Storyteller',
    peakVibeBadge: 'Open Morning Countryside Skies',
    vibeHashtags: ['#ElementalAncientAwe', '#EffortlessCoastalGlide', '#WindsweptSolsticeMood']
  },
  TO3TAR: {
    pacingIds: ['sanctuary-escape', 'panoramic-glide'],
    pacingBadge: 'Door-to-Door Royal Glide + Castle Stroll',
    guideVibeBadge: 'Regal Chivalry & Heritage Raconteur',
    peakVibeBadge: 'Morning Royal Battlement Arrival',
    vibeHashtags: ['#ChivalricFortressMajesty', '#UnhurriedRoyalJourney', '#AristocraticCalm']
  }
};

function getTourProfile(tour) {
  return (
    TOUR_DROP_OFF_PROFILES[tour.id] || {
      pacingIds: ['hop-out-alleys'],
      pacingBadge: 'Balanced Cab Glide + Curated Hop-Out Walks',
      guideVibeBadge: 'Charismatic "Knowledge" Raconteur',
      peakVibeBadge: tour.fiveSignalSignature?.peakWindow || 'Golden Afternoon',
      vibeHashtags: ['#AuthenticCabbieVibe', '#HopOutDiscovery', '#ZeroCrowdAccess']
    }
  );
}

// Format "You'll love this tour if..." sentence cleanly from each tour's shortlistHook
function formatYouWillLoveIf(tour) {
  const raw = (tour.shortlistHook || '').trim();
  if (!raw) {
    return `You want ${tour.vibeArchetype?.toLowerCase() || 'an authentic private London Black Cab experience'}.`;
  }
  const lowerFirst = raw.charAt(0).toLowerCase() + raw.slice(1);
  if (/^(puts you|takes you|immerses you)/i.test(raw)) {
    return raw.replace(/^(Puts|Takes|Immerses) you/i, 'You want to be');
  }
  if (/^(trades|swaps)/i.test(raw)) {
    return raw.replace(/^(Trades|Swaps)/i, 'You want to trade');
  }
  if (/^(turns|transforms|uses|delivers|bridges|weaves|solves|connects|recreates|unlocks|pairs|lets)/i.test(raw)) {
    return `You want a tour that ${lowerFirst}`;
  }
  return raw;
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

  // Layer 1: Atmosphere / Emotional Mood filter
  const [selectedMood, setSelectedMood] = useState(null);
  // Layer 2: Tour Pacing & Rhythm filter (works alone OR in conjunction with selectedMood)
  const [selectedPacing, setSelectedPacing] = useState(null);
  // Optional 1-tap proof toggle per tour card
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

  const matchesTour = (tour, moodId, pacingId) => {
    const moodMatch = !moodId || (tour.vibeTags || []).includes(moodId);
    const profile = getTourProfile(tour);
    const pacingMatch = !pacingId || (profile.pacingIds || []).includes(pacingId);
    return moodMatch && pacingMatch;
  };

  const filteredTours = useMemo(() => {
    return TRAVEL_CURIOUS_BLACK_CAB_TOURS.filter((tour) =>
      matchesTour(tour, selectedMood, selectedPacing)
    );
  }, [selectedMood, selectedPacing]);

  const activeMoodChip = useMemo(
    () => ATMOSPHERE_CHIPS.find((c) => c.id === selectedMood) || null,
    [selectedMood]
  );

  const activePacingChip = useMemo(
    () => PACING_FILTERS.find((p) => p.id === selectedPacing) || null,
    [selectedPacing]
  );

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

  // ---------------- UNLOCKED MOBILE-FIRST VIBE + PACING DEMO ----------------
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
              <span>London Black Cab Heritage Tours</span>
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

          {/* ==================== TWO-LAYER ATMOSPHERE + PACING FILTER BOX ==================== */}
          <div
            style={{
              background: 'rgba(10, 18, 34, 0.95)',
              border: '1.5px solid rgba(0, 229, 255, 0.32)',
              borderRadius: '16px',
              padding: '13px',
              marginBottom: '16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.55)'
            }}
          >
            {/* Filter Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h1 style={{ fontSize: '1.08rem', fontWeight: 900, margin: 0, letterSpacing: '-0.01em' }}>
                Search by <span style={{ color: '#00e5ff' }}>Atmosphere</span> &amp; <span style={{ color: '#ffd700' }}>Pacing</span>
              </h1>
              {(selectedMood || selectedPacing) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMood(null);
                    setSelectedPacing(null);
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
                  <span>Reset All</span>
                </button>
              )}
            </div>

            {/* STEP 1: EMOTIONAL ATMOSPHERE & MOOD */}
            <div style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#00e5ff', marginBottom: '6px' }}>
              1. How do you want it to feel? (Emotional Atmosphere)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '12px' }}>
              {ATMOSPHERE_CHIPS.map((chip) => {
                const isSelected = selectedMood === chip.id;
                const count = TRAVEL_CURIOUS_BLACK_CAB_TOURS.filter((t) =>
                  matchesTour(t, chip.id, selectedPacing)
                ).length;
                const isDimmed = count === 0 && !isSelected;

                return (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => setSelectedMood(isSelected ? null : chip.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '6px',
                      padding: '8px 9px',
                      borderRadius: '10px',
                      border: isSelected ? `2px solid ${chip.color}` : '1px solid rgba(255,255,255,0.13)',
                      background: isSelected
                        ? 'rgba(0, 229, 255, 0.16)'
                        : 'rgba(15, 23, 42, 0.88)',
                      color: '#ffffff',
                      cursor: 'pointer',
                      textAlign: 'left',
                      opacity: isDimmed ? 0.42 : 1,
                      boxShadow: isSelected ? `0 0 14px ${chip.color}44` : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11.5px', fontWeight: 900, color: isSelected ? chip.color : '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <span style={{ fontSize: '13px' }}>{chip.icon}</span>
                        <span>{chip.vibeTitle}</span>
                      </div>
                      <div style={{ fontSize: '9.5px', color: '#94a3b8', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '1px' }}>
                        {chip.subLabel}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 900,
                        color: isSelected ? '#04101c' : '#94a3b8',
                        background: isSelected ? chip.color : 'rgba(255,255,255,0.07)',
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

            {/* STEP 2: TOUR PACING & RHYTHM (Anti-Drop-Off Layer) */}
            <div style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#ffd700', marginBottom: '6px' }}>
              2. How do you want it paced? (De-Risking Drop-Off)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              {PACING_FILTERS.map((pace) => {
                const isSelected = selectedPacing === pace.id;
                const count = TRAVEL_CURIOUS_BLACK_CAB_TOURS.filter((t) =>
                  matchesTour(t, selectedMood, pace.id)
                ).length;
                const isDimmed = count === 0 && !isSelected;

                return (
                  <button
                    key={pace.id}
                    type="button"
                    onClick={() => setSelectedPacing(isSelected ? null : pace.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '6px',
                      padding: '8px 9px',
                      borderRadius: '10px',
                      border: isSelected ? `2px solid ${pace.color}` : '1px solid rgba(255, 215, 0, 0.22)',
                      background: isSelected
                        ? 'rgba(255, 215, 0, 0.14)'
                        : 'rgba(20, 27, 45, 0.85)',
                      color: '#ffffff',
                      cursor: 'pointer',
                      textAlign: 'left',
                      opacity: isDimmed ? 0.42 : 1,
                      boxShadow: isSelected ? `0 0 14px ${pace.color}44` : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: 900, color: isSelected ? pace.color : '#f8fafc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <span style={{ fontSize: '13px' }}>{pace.icon}</span>
                        <span>{pace.label}</span>
                      </div>
                      <div style={{ fontSize: '9.5px', color: '#94a3b8', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '1px' }}>
                        {pace.shortDesc}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 900,
                        color: isSelected ? '#04101c' : '#cbd5e1',
                        background: isSelected ? pace.color : 'rgba(255,255,255,0.08)',
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

            {/* Active Combined Filter Summary Banner */}
            {(activeMoodChip || activePacingChip) && (
              <div
                style={{
                  marginTop: '10px',
                  padding: '8px 10px',
                  borderRadius: '10px',
                  background: 'rgba(0, 229, 255, 0.08)',
                  border: '1px solid rgba(0, 229, 255, 0.35)',
                  fontSize: '11px',
                  color: '#f8fafc',
                  lineHeight: 1.35
                }}
              >
                {activeMoodChip && (
                  <div>
                    <strong style={{ color: activeMoodChip.color }}>
                      {activeMoodChip.icon} {activeMoodChip.vibeTitle}:
                    </strong>{' '}
                    {activeMoodChip.subLabel}
                  </div>
                )}
                {activePacingChip && (
                  <div style={{ marginTop: activeMoodChip ? '3px' : 0 }}>
                    <strong style={{ color: activePacingChip.color }}>
                      {activePacingChip.icon} {activePacingChip.label}:
                    </strong>{' '}
                    {activePacingChip.shortDesc}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RESULTS COUNT STRIP */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', padding: '0 2px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {selectedMood || selectedPacing
                ? `${filteredTours.length} Matching ${filteredTours.length === 1 ? 'Tour' : 'Tours'}`
                : `All ${filteredTours.length} Black Cab Tours`}
            </span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#34d399', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={13} color="#34d399" />
              <span>Anti-Drop-Off Vibe Layer Active</span>
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
                No single tour matches both of those exact filters.
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '12px' }}>
                Try clearing the pacing filter or selecting another emotional atmosphere.
              </div>
              <button
                type="button"
                onClick={() => setSelectedPacing(null)}
                style={{
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
                Show All Pacing Styles for This Vibe
              </button>
            </div>
          )}

          {/* TOUR CARDS LIST (Normal Tour Card + "You'll love this tour if..." Top Badge with Pacing & Guide Vibe) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {filteredTours.map((tour) => {
              const primaryMood =
                ATMOSPHERE_CHIPS.find((m) => (tour.vibeTags || []).includes(m.id)) || ATMOSPHERE_CHIPS[0];
              const accentColor = primaryMood.color;
              const sigHash = getTourHash(tour.id);
              const isProofOpen = openProofId === tour.id;
              const profile = getTourProfile(tour);

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
                  {/* ==================== 1. ATMOSVIBE TOP BADGE ("YOU'LL LOVE THIS TOUR IF..." + PACING & GUIDE VIBE) ==================== */}
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
                        title="Tap to view verification proof & signature hash"
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

                    {/* The "You'll love this tour if..." Hook */}
                    <div
                      style={{
                        fontSize: '13.5px',
                        fontWeight: 800,
                        color: '#ffffff',
                        lineHeight: 1.38,
                        marginBottom: '9px'
                      }}
                    >
                      “{formatYouWillLoveIf(tour)}”
                    </div>

                    {/* ANTI-DROP-OFF PACING & GUIDE VIBE STRIP (De-risking the Windscreen Trap & Guide Roulette) */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr',
                        gap: '5px',
                        padding: '8px 10px',
                        borderRadius: '10px',
                        background: 'rgba(4, 10, 22, 0.78)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        marginBottom: '9px',
                        fontSize: '11px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f8fafc' }}>
                        <Footprints size={12} color="#00e5ff" style={{ flexShrink: 0 }} />
                        <span>
                          <strong style={{ color: '#00e5ff' }}>Pacing:</strong> {profile.pacingBadge}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f8fafc' }}>
                        <Mic size={12} color="#ffd700" style={{ flexShrink: 0 }} />
                        <span>
                          <strong style={{ color: '#ffd700' }}>Guide Vibe:</strong> {profile.guideVibeBadge}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f8fafc' }}>
                        <SunMedium size={12} color="#34d399" style={{ flexShrink: 0 }} />
                        <span>
                          <strong style={{ color: '#34d399' }}>Best Mood Window:</strong> {profile.peakVibeBadge}
                        </span>
                      </div>
                    </div>

                    {/* Pure Atmospheric Hashtags Row */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {(profile.vibeHashtags || []).map((tag, idx) => (
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

                    {/* Optional 1-Tap Verification Proof Box */}
                    {isProofOpen && (
                      <div
                        style={{
                          marginTop: '10px',
                          padding: '8px 10px',
                          borderRadius: '8px',
                          background: 'rgba(2, 6, 14, 0.92)',
                          border: '1px solid rgba(52, 211, 153, 0.35)',
                          borderLeft: '3px solid #34d399',
                          fontSize: '10.5px',
                          color: '#cbd5e1',
                          lineHeight: 1.35
                        }}
                      >
                        <div>
                          <strong style={{ color: '#34d399' }}>Emotional Mood:</strong> {tour.fiveSignalSignature?.emotionalMood}
                        </div>
                        <div style={{ marginTop: '3px' }}>
                          <strong style={{ color: '#00e5ff' }}>Visual Aura:</strong> {tour.fiveSignalSignature?.visualAura}
                        </div>
                        <div style={{ marginTop: '4px', paddingTop: '4px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', fontSize: '9.5px' }}>
                          <span><strong>Sources:</strong> Verified guest reviews &amp; Knowledge route ledger</span>
                          <span style={{ color: '#34d399', fontWeight: 800 }}>Hash: {sigHash}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ==================== 2. STANDARD TOUR CARD DATA ==================== */}
                  {/* Hero Image with Standard Duration & Price Badges */}
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
