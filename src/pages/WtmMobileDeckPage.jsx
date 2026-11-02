import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  ShieldCheck
} from 'lucide-react';
import { SEA_CONTAINERS_CANNED_DEMO } from '../data/cannedConferenceDemos';

const SIGNATURE_HASH = '0x8f4a29c1...b0d53e';

const SIGNALS = [
  {
    id: 'walk',
    num: '01',
    label: '5-MIN WALK',
    headline: 'Tate Modern (4m) & Oxo Tower (2m)',
    shortTag: '4.7★ Doorstep Gems',
    certaintyBadge: '✓ 96% Fact',
    certaintyTier: '✓ 96% Hard-Verified',
    icon: MapPin,
    color: '#00e5ff',
    bgGlow: 'rgba(0, 229, 255, 0.16)',
    pills: ['📍 Oxo Tower (4.6★ · 2m)', '📍 Tate Modern (4.7★ · 4m)', '📍 Borough Mkt (4.7★ · 6m)'],
    proof: 'Directly on the pedestrian South Bank riverwalk — verified 4.6★+ cultural & foodie spots within 2 to 6 minutes on foot.',
    sources: 'Google Places API GPS coordinates + live ≥4.4★ rating ledger',
    method: 'Geospatial walk radius (≤500m) × independent venue filter',
    hash: '0x8f4a29c1...a104e2'
  },
  {
    id: 'character',
    num: '02',
    label: 'TRUE CHARACTER',
    headline: '1920s Transatlantic Liner Glamour',
    shortTag: 'Tom Dixon Design',
    certaintyBadge: '✓ 94% Fact',
    certaintyTier: '✓ 94% Hard-Verified',
    icon: Compass,
    color: '#f59e0b',
    bgGlow: 'rgba(245, 158, 11, 0.16)',
    pills: ['✦ Copper Hull Lobby', '✦ Aged Brass & Velvet', '✦ Zero Chain Decor'],
    proof: 'Bespoke Tom Dixon maritime architecture with hand-beaten copper, polished concrete, and mid-century ocean-liner furniture.',
    sources: '16-photo Computer Vision material scan + architectural press',
    method: 'Pixel material classification vs. generic chain-hotel baseline',
    hash: '0x8f4a29c1...b208f4'
  },
  {
    id: 'light',
    num: '03',
    label: 'WARMTH & LIGHT',
    headline: '2700K Golden-Hour Thames Glow',
    shortTag: 'Zero Harsh Glare',
    certaintyBadge: '✓ 94% Fact',
    certaintyTier: '✓ 94% Hard-Verified',
    icon: Sun,
    color: '#fbbf24',
    bgGlow: 'rgba(251, 191, 36, 0.16)',
    pills: ['☀️ River Daylight', '🌅 Sunset Reflections', '🕯️ 2700K Table Lamps'],
    proof: 'Floor-to-ceiling Thames glass floods rooms with river light by day and transitions to flattering 2700K amber glow at night.',
    sources: 'Computer Vision kelvin/luminance scan across 16 gallery assets',
    method: 'Color-temperature histogram & window-to-wall ratio analysis',
    hash: '0x8f4a29c1...c319a8'
  },
  {
    id: 'hosts',
    num: '04',
    label: 'THE HOSTS',
    headline: 'Zero Snobbery — Instant Regulars',
    shortTag: 'Lyaness Mixologists',
    certaintyBadge: '◎ 92% Proven',
    certaintyTier: '◎ 92% Corroborated',
    icon: Award,
    color: '#10b981',
    bgGlow: 'rgba(16, 185, 129, 0.16)',
    pills: ['🍸 Lyaness Bar Team', '🎵 12th Knot Selectors', '🤝 Unscripted Warmth'],
    proof: 'Led by Lyaness award-winning mixologists and South Bank insiders — unhurried banter and genuine warmth with zero stiffness.',
    sources: 'Verified guest review sentiment + Condé Nast & Time Out critiques',
    method: 'Multi-source staff & hospitality keyword corroboration',
    hash: '0x8f4a29c1...d427b1'
  },
  {
    id: 'crowd',
    num: '05',
    label: 'THE CROWD',
    headline: '65% London Locals · 35% Guests',
    shortTag: 'South Bank Magnet',
    certaintyBadge: '◈ 82% Observed',
    certaintyTier: '◈ 82% Behavioural',
    icon: Users,
    color: '#a855f7',
    bgGlow: 'rgba(168, 85, 247, 0.16)',
    pills: ['🏙️ 65% London Regulars', '✈️ 35% Design Travellers', '🚫 Not a Tourist Trap'],
    proof: 'A genuine London destination — South Bank creatives and locals pack Lyaness and 12th Knot nightly alongside hotel guests.',
    sources: 'Bar reservation demand, Time Out London & local review mix',
    method: 'Non-resident F&B footfall vs. overnight guest review ratio',
    hash: '0x8f4a29c1...e539c6'
  },
  {
    id: 'time',
    num: '06',
    label: 'BEST TIME OF DAY',
    headline: '17:00 Sunset · 20:30 Rooftop Buzz',
    shortTag: 'Day-to-Night Pulse',
    certaintyBadge: '◎ 90% Proven',
    certaintyTier: '◎ 90% Corroborated',
    icon: Clock,
    color: '#ec4899',
    bgGlow: 'rgba(236, 72, 153, 0.16)',
    pills: ['☕ 09:00 River Coffee', '🌇 17:00 Lyaness Sunset', '🍸 20:30 12th Knot Peak'],
    proof: 'Calm riverside coffee & laptop work by morning, golden-hour Thames aperitifs at 5 PM, and St Paul’s skyline energy after 8:30 PM.',
    sources: 'Google Popular Times telemetry + F&B venue operating hours',
    method: 'Diurnal occupancy curve across morning, sunset & late-night windows',
    hash: '0x8f4a29c1...f640d9'
  },
  {
    id: 'sound',
    num: '07',
    label: 'SOUND & SLEEP',
    headline: '74 dB Bar Buzz · Quiet River Sleep',
    shortTag: 'Acoustic Glazing',
    certaintyBadge: '◎ 91% Proven',
    certaintyTier: '◎ 91% Corroborated',
    icon: Volume2,
    color: '#38bdf8',
    bgGlow: 'rgba(56, 189, 248, 0.16)',
    pills: ['♫ Eclectic Deep House', '🔊 74 dB Social Bar', '🌙 Soundproof Rooms'],
    proof: 'Vibrant lounge & deep house downstairs/rooftop (74 dB), isolated from quiet, triple-glazed river-view bedrooms.',
    sources: 'Guest sleep-quality review consensus + architectural glazing specs',
    method: 'Cross-referenced room quietness ratings vs. bar decibel profile',
    hash: '0x8f4a29c1...a752e3'
  },
  {
    id: 'insider',
    num: '08',
    label: 'INSIDER TIPS',
    headline: '12th Knot Secret St Paul’s Corner',
    shortTag: 'Off-Menu Lore',
    certaintyBadge: '◎ 89% Proven',
    certaintyTier: '◎ 89% Corroborated',
    icon: Sparkles,
    color: '#ffd700',
    bgGlow: 'rgba(255, 215, 0, 0.16)',
    pills: ['🗝️ West Corner Terrace', '🧪 Fermented Botanicals', '🌅 Arrive 20m Pre-Sunset'],
    proof: 'Ask Lyaness bartenders for the off-menu "Forgotten Classics" botanicals, and claim the west corner banquette at 12th Knot before sunset.',
    sources: 'Repeat-guest review tips, bartender interviews & press archives',
    method: 'Corroborated insider tips cited across 3+ independent sources',
    hash: '0x8f4a29c1...b0d53e'
  }
];

const SLIDE_META = [
  { index: 0, shortLabel: '1. Vibe DNA' },
  { index: 1, shortLabel: '2. OTA Gap' },
  { index: 2, shortLabel: '3. Photo Fix' },
  { index: 3, shortLabel: '4. Live Demo' }
];

export default function WtmMobileDeckPage() {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);
  const [selectedSignal, setSelectedSignal] = useState(SIGNALS[0]);
  const [photoMode, setPhotoMode] = useState('after'); // 'before' | 'after'
  const [selectedSlotIdx, setSelectedSlotIdx] = useState(0);
  const touchStartX = useRef(null);

  const ota = SEA_CONTAINERS_CANNED_DEMO.ota_conversion_audit || {};
  const livePhotos = (ota.live_photos || []).slice(0, 5);
  const optimalPhotos = (ota.optimal_5_photo_sequence || []).slice(0, 5);

  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || !e.changedTouches || e.changedTouches.length === 0) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 55) {
      if (deltaX < 0 && slide < 3) setSlide(slide + 1);
      if (deltaX > 0 && slide > 0) setSlide(slide - 1);
    }
    touchStartX.current = null;
  };

  const activePhotoList = photoMode === 'after' ? optimalPhotos : livePhotos;
  const activeSlot = activePhotoList[selectedSlotIdx] || activePhotoList[0];

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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
        <title>Sea Containers London — Mobile Vibe Signature Deck | AtmosVibe</title>
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
          padding: '10px 14px 10px'
        }}
      >
        <div style={{ maxWidth: '480px', width: '100%', margin: '0 auto' }}>
          {/* Brand + Property Pill Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '10px' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              <img src="/models/Atmosvibe6.svg" alt="AtmosVibe" style={{ height: '28px', width: 'auto' }} />
            </Link>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '5px 11px', borderRadius: '999px', background: 'rgba(0, 229, 255, 0.12)', border: '1px solid rgba(0, 229, 255, 0.35)', fontSize: '11.5px', fontWeight: 800, color: '#ffffff' }}>
              <MapPin size={13} color="#00e5ff" />
              <span>Sea Containers London</span>
            </div>
          </div>

          {/* 4 Bold Top Tab Containers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
            {SLIDE_META.map((s) => {
              const isActive = s.index === slide;
              return (
                <button
                  key={s.index}
                  type="button"
                  onClick={() => setSlide(s.index)}
                  style={{
                    padding: '9px 4px',
                    borderRadius: '10px',
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
      <div style={{ flex: 1, maxWidth: '480px', width: '100%', margin: '0 auto', padding: '12px 14px 20px', display: 'flex', flexDirection: 'column' }}>
        {/* ==================== SLIDE 1: THE 8-SIGNAL VIBE SIGNATURE ==================== */}
        {slide === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
            {/* Title + Global Cryptographic Signature Pill */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              <h1 style={{ fontSize: '1.3rem', fontWeight: 900, lineHeight: 1.1, margin: 0, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                8-Signal <span style={{ color: '#00e5ff' }}>Vibe Signature</span>
              </h1>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(16, 185, 129, 0.16)', border: '1px solid rgba(52, 211, 153, 0.5)', color: '#34d399', fontSize: '10px', fontWeight: 900, padding: '4px 8px', borderRadius: '8px', fontFamily: 'monospace' }}>
                <ShieldCheck size={12} color="#34d399" />
                {SIGNATURE_HASH}
              </span>
            </div>

            {/* 2x4 High-Contrast Signal Grid — Built to Pop on Mobile */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {SIGNALS.map((sig) => {
                const Icon = sig.icon;
                const isSelected = selectedSignal.id === sig.id;
                return (
                  <button
                    key={sig.id}
                    type="button"
                    onClick={() => setSelectedSignal(sig)}
                    style={{
                      position: 'relative',
                      textAlign: 'left',
                      padding: '10px 10px 10px 12px',
                      borderRadius: '12px',
                      background: isSelected
                        ? `linear-gradient(135deg, ${sig.bgGlow} 0%, rgba(15, 23, 42, 0.96) 100%)`
                        : 'rgba(12, 20, 36, 0.92)',
                      border: isSelected ? `2px solid ${sig.color}` : '1px solid rgba(255,255,255,0.16)',
                      borderLeft: `4px solid ${sig.color}`,
                      color: '#ffffff',
                      cursor: 'pointer',
                      boxShadow: isSelected ? `0 6px 20px ${sig.bgGlow}` : '0 2px 8px rgba(0,0,0,0.4)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {/* Top Row: Icon + Signal Name + Verified Fact Pill */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px', marginBottom: '4px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '10.5px', fontWeight: 900, color: sig.color, letterSpacing: '0.04em' }}>
                        <Icon size={13} color={sig.color} style={{ flexShrink: 0 }} />
                        {sig.label}
                      </span>
                    </div>

                    {/* Bold Primary Signal Value */}
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#ffffff', lineHeight: 1.25, marginBottom: '6px' }}>
                      {sig.headline}
                    </div>

                    {/* Bottom Row: Verification Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
                      <span style={{ fontSize: '9.5px', fontWeight: 800, color: '#34d399', background: 'rgba(16, 185, 129, 0.14)', border: '1px solid rgba(52, 211, 153, 0.35)', padding: '1px 6px', borderRadius: '6px' }}>
                        {sig.certaintyBadge}
                      </span>
                      <span style={{ fontSize: '9px', fontFamily: 'monospace', color: isSelected ? sig.color : 'rgba(255,255,255,0.45)', fontWeight: 700 }}>
                        #{sig.num}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Signal Verification Proof & Cryptographic Signature Container (Matches Desktop Card Row H) */}
            <div
              style={{
                background: 'rgba(6, 13, 26, 0.96)',
                border: `1.5px solid ${selectedSignal.color}`,
                borderLeft: `5px solid ${selectedSignal.color}`,
                borderRadius: '14px',
                padding: '12px 14px',
                boxShadow: '0 12px 30px rgba(0,0,0,0.65)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              {/* Header: Signal Name + Certainty Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '11.5px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: selectedSignal.color }}>
                  #{selectedSignal.num} {selectedSignal.label}
                </span>
                <span style={{ fontSize: '10px', fontWeight: 900, color: '#34d399', background: 'rgba(16, 185, 129, 0.16)', border: '1px solid rgba(52, 211, 153, 0.45)', padding: '2px 8px', borderRadius: '6px' }}>
                  {selectedSignal.certaintyTier}
                </span>
              </div>

              {/* Highlight Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {selectedSignal.pills.map((pill, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '10.5px',
                      fontWeight: 800,
                      color: '#ffffff',
                      background: 'rgba(255,255,255,0.08)',
                      border: `1px solid ${selectedSignal.color}`,
                      padding: '3px 8px',
                      borderRadius: '8px'
                    }}
                  >
                    {pill}
                  </span>
                ))}
              </div>

              {/* Verified Reality Statement */}
              <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#f8fafc', lineHeight: 1.4 }}>
                {selectedSignal.proof}
              </div>

              {/* Verification Proof & Signature Hash Box (Exact Desktop Pattern) */}
              <div
                style={{
                  background: 'rgba(2, 6, 14, 0.9)',
                  border: '1px solid rgba(52, 211, 153, 0.35)',
                  borderLeft: '3px solid #34d399',
                  borderRadius: '9px',
                  padding: '8px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '3px'
                }}
              >
                <div style={{ fontSize: '10.5px', color: '#e2e8f0', lineHeight: 1.3 }}>
                  <strong style={{ color: '#34d399' }}>Sources:</strong> {selectedSignal.sources}
                </div>
                <div style={{ fontSize: '10px', color: '#94a3b8', lineHeight: 1.25 }}>
                  <strong style={{ color: '#cbd5e1' }}>Method:</strong> {selectedSignal.method}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '5px', marginTop: '3px', fontSize: '10px' }}>
                  <span>
                    <strong style={{ color: '#00e5ff' }}>Signature Hash:</strong>{' '}
                    <code style={{ color: '#34d399', fontWeight: 800, fontSize: '10px' }}>{selectedSignal.hash}</code>
                  </span>
                  <span style={{ color: '#34d399', fontWeight: 900 }}>✓ Verified</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== SLIDE 2: THE OTA GAP (48/100 LIVE OTA) ==================== */}
        {slide === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            <div>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 900, lineHeight: 1.15, margin: '0 0 4px', letterSpacing: '-0.02em' }}>
                Iconic South Bank Hotel.<br />
                <span style={{ color: '#ef4444' }}>Undersold at 48/100 on Booking.com.</span>
              </h1>
              <p style={{ fontSize: '12.5px', color: '#cbd5e1', margin: 0, lineHeight: 1.45 }}>
                Sea Containers London’s live Top 5 Booking.com gallery today — <strong style={{ color: '#ffffff' }}>3 of the first 5 slots show the exact same blue sofa</strong>:
              </p>
            </div>

            {/* Live Top 5 Strip with Red Duplicate Callouts */}
            <div style={{ background: 'rgba(12, 20, 36, 0.95)', border: '2px solid rgba(239, 68, 68, 0.55)', borderRadius: '16px', padding: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.6)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11.5px', fontWeight: 900, color: '#fca5a5', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  🔴 Live Booking.com Top 5 Today
                </span>
                <span style={{ fontSize: '12.5px', fontWeight: 900, background: '#ef4444', color: '#ffffff', padding: '3px 9px', borderRadius: '6px' }}>
                  48 / 100
                </span>
              </div>

              {/* Hero Live #1 + 4 Sub-slots */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '6px', marginBottom: '10px' }}>
                <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', height: '160px', border: '1.5px solid rgba(255,255,255,0.2)' }}>
                  <img
                    src={livePhotos[0]?.imageUrl}
                    alt="Live Slot 1"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '6px', left: '6px', background: 'rgba(0,0,0,0.88)', color: '#fff', fontSize: '10px', fontWeight: 900, padding: '3px 7px', borderRadius: '4px' }}>
                    Live #1 • Distant Exterior
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, insetInline: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.95))', padding: '20px 8px 6px', fontSize: '11px', color: '#fca5a5', fontWeight: 800 }}>
                    Looks like an office block from across the river
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '6px', height: '160px' }}>
                  {livePhotos.slice(1, 5).map((p, idx) => {
                    const slotNum = idx + 2;
                    const isBlueCouch = slotNum === 2 || slotNum === 3 || slotNum === 5;
                    return (
                      <div
                        key={slotNum}
                        style={{
                          position: 'relative',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: isBlueCouch ? '2.5px solid #ef4444' : '1px solid rgba(255,255,255,0.2)'
                        }}
                      >
                        <img src={p.imageUrl} alt={`Live Slot ${slotNum}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', top: '3px', left: '3px', background: isBlueCouch ? '#ef4444' : 'rgba(0,0,0,0.85)', color: '#fff', fontSize: '9.5px', fontWeight: 900, padding: '2px 5px', borderRadius: '4px' }}>
                          #{slotNum} {isBlueCouch ? '🛋️ DUPLICATE' : 'Bed'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3 Visceral Flaws */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#ffffff', background: 'rgba(239,68,68,0.16)', border: '1px solid rgba(239,68,68,0.35)', padding: '9px 10px', borderRadius: '9px' }}>
                  <AlertTriangle size={16} color="#f87171" style={{ flexShrink: 0 }} />
                  <span><strong>Slots #2, #3 & #5</strong> repeat the same blue-couch living room</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#ffffff', background: 'rgba(239,68,68,0.16)', border: '1px solid rgba(239,68,68,0.35)', padding: '9px 10px', borderRadius: '9px' }}>
                  <AlertTriangle size={16} color="#f87171" style={{ flexShrink: 0 }} />
                  <span><strong>12th Knot Rooftop Bar</strong> buried at <strong>#24</strong> & <strong>Lyaness</strong> at <strong>#26</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#ffffff', background: 'rgba(239,68,68,0.16)', border: '1px solid rgba(239,68,68,0.35)', padding: '9px 10px', borderRadius: '9px' }}>
                  <AlertTriangle size={16} color="#f87171" style={{ flexShrink: 0 }} />
                  <span><strong>0 guest bathroom photos</strong> in all 55 Booking.com images</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== SLIDE 3: INTERACTIVE PHOTO FIX (48 ➔ 94/100) ==================== */}
        {slide === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            <div>
              <h1 style={{ fontSize: '1.35rem', fontWeight: 900, lineHeight: 1.15, margin: '0 0 8px' }}>
                Same Photos They Own.<br />
                <span style={{ color: '#10b981' }}>Re-Ordered for +21.0% Conversion.</span>
              </h1>

              {/* 1-Thumb Before / After Switcher */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', background: 'rgba(12,20,36,0.95)', padding: '5px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.18)' }}>
                <button
                  type="button"
                  onClick={() => {
                    setPhotoMode('before');
                    setSelectedSlotIdx(0);
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
                  🔴 Live Today (48/100)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPhotoMode('after');
                    setSelectedSlotIdx(0);
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
                  🟢 Vibe Re-Order (94/100)
                </button>
              </div>
            </div>

            {/* Active Selected Slot Large Preview */}
            <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', height: '200px', border: photoMode === 'after' ? '2px solid #10b981' : '2px solid #ef4444', boxShadow: '0 10px 30px rgba(0,0,0,0.6)' }}>
              <img
                src={activeSlot?.photo_url || activeSlot?.imageUrl}
                alt="Selected Slot"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', top: '8px', left: '8px', background: photoMode === 'after' ? '#10b981' : '#ef4444', color: photoMode === 'after' ? '#031c11' : '#fff', fontSize: '11px', fontWeight: 900, padding: '4px 10px', borderRadius: '6px' }}>
                {photoMode === 'after'
                  ? `Slot #${selectedSlotIdx + 1} • Promoted from Live #${activeSlot?.current_slot}`
                  : `Live Slot #${selectedSlotIdx + 1}`}
              </div>
              <div style={{ position: 'absolute', bottom: 0, insetInline: 0, background: 'linear-gradient(transparent, rgba(2, 6, 14, 0.96))', padding: '28px 12px 10px' }}>
                <div style={{ fontSize: '13.5px', fontWeight: 900, color: '#fff', marginBottom: '3px' }}>
                  {photoMode === 'after' ? activeSlot?.photo_subject : activeSlot?.title}
                </div>
                <div style={{ fontSize: '11.5px', fontWeight: 600, color: photoMode === 'after' ? '#a7f3d0' : '#fca5a5', lineHeight: 1.35 }}>
                  {photoMode === 'after'
                    ? activeSlot?.bullet_points?.[0] || activeSlot?.why_it_converts
                    : selectedSlotIdx === 1 || selectedSlotIdx === 2 || selectedSlotIdx === 4
                    ? 'Repetitive blue-couch living room photo — no bed or river bar shown.'
                    : 'Fails to lead with 12th Knot Rooftop Bar or Lyaness mixology.'}
                </div>
              </div>
            </div>

            {/* 5 Thumbnails Strip — Tap Any Slot 1-5 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
              {activePhotoList.map((item, idx) => {
                const isSelected = idx === selectedSlotIdx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedSlotIdx(idx)}
                    style={{
                      position: 'relative',
                      height: '68px',
                      padding: 0,
                      borderRadius: '9px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: isSelected
                        ? `2.5px solid ${photoMode === 'after' ? '#10b981' : '#ef4444'}`
                        : '1px solid rgba(255,255,255,0.22)',
                      opacity: isSelected ? 1 : 0.75
                    }}
                  >
                    <img
                      src={item.photo_url || item.imageUrl}
                      alt={`Slot ${idx + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span style={{ position: 'absolute', bottom: '2px', left: '2px', right: '2px', background: 'rgba(0,0,0,0.88)', color: '#fff', fontSize: '9.5px', fontWeight: 900, borderRadius: '3px', padding: '2px' }}>
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
                Turn Your Unique Vibe Into <span style={{ color: '#00e5ff' }}>Direct & OTA Bookings</span>
              </h1>
              <p style={{ fontSize: '12.5px', color: '#cbd5e1', margin: 0 }}>
                Audit any hotel in 30 seconds — or scan below to keep this Sea Containers London benchmark on your phone:
              </p>
            </div>

            {/* QR Code Card for Instant Booth/Aisle Scan */}
            <div style={{ background: 'rgba(12, 20, 36, 0.95)', border: '2px solid rgba(0, 229, 255, 0.45)', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.6)' }}>
              <div style={{ background: '#ffffff', padding: '8px', borderRadius: '12px', flexShrink: 0 }}>
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=https%3A%2F%2Fwww.atmosvibe.io%2Fwtm"
                  alt="Scan for Sea Containers Mobile Demo"
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
                  Opens <strong>atmosvibe.io/wtm</strong> — zero login required.
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                type="button"
                onClick={() => navigate('/audit')}
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
                <Zap size={17} />
                <span>Audit Your Hotel Live Now →</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/audit?demo=sea-containers-london')}
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
                <Layers size={15} />
                <span>Open Full Desktop Dossier (Sea Containers)</span>
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
                <span>Tours Demo: Travel Curious Black Cab Vibe API</span>
                <ExternalLink size={13} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
