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
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  QrCode,
  ExternalLink,
  Layers
} from 'lucide-react';
import { SEA_CONTAINERS_CANNED_DEMO } from '../data/cannedConferenceDemos';

const SIGNALS = [
  {
    id: 'walk',
    num: '01',
    label: '5-Min Walk',
    short: 'Tate Modern (4m) · Oxo (2m) · Borough Mkt (6m)',
    score: '96/100',
    icon: MapPin,
    color: '#00e5ff',
    proof: 'Directly on the South Bank riverwalk: Oxo Tower (2m), Tate Modern (4m), Shakespeare’s Globe (5m), and Borough Market (6m) — all rated 4.6★+.'
  },
  {
    id: 'character',
    num: '02',
    label: 'True Character',
    short: '1920s Transatlantic Liner Glamour',
    score: '88/100',
    icon: Compass,
    color: '#f59e0b',
    proof: 'Tom Dixon copper hull reception, polished concrete, aged brass, velvet banquettes & bespoke maritime tailoring — zero cookie-cutter chain feel.'
  },
  {
    id: 'light',
    num: '03',
    label: 'Warmth & Light',
    short: '2700K Golden-Hour Thames Reflections',
    score: '94/100',
    icon: Sun,
    color: '#fbbf24',
    proof: 'Floor-to-ceiling Thames glass captures golden-hour river light; evening spaces glow at warm 2700K with zero harsh overhead glare.'
  },
  {
    id: 'hosts',
    num: '04',
    label: 'The Hosts',
    short: 'Zero Snobbery — Storytelling Mixologists',
    score: '94/100',
    icon: Award,
    color: '#10b981',
    proof: 'Led by Lyaness lab-craft mixologists and South Bank insiders. Unhurried banter, intuitive service, and instant-regular warmth.'
  },
  {
    id: 'crowd',
    num: '05',
    label: 'The Crowd',
    short: '65% London Locals · 35% Creative Travellers',
    score: '91/100',
    icon: Users,
    color: '#a855f7',
    proof: 'A true South Bank social magnet — locals pack Lyaness and 12th Knot nightly alongside design-forward international guests.'
  },
  {
    id: 'time',
    num: '06',
    label: 'Best Time of Day',
    short: '17:00 Lyaness Sunset · 20:30 12th Knot Buzz',
    score: '98/100',
    icon: Clock,
    color: '#ec4899',
    proof: '9:00 AM riverside coffee & co-working (89) ➔ 5:00 PM golden-hour cocktails (96) ➔ 8:30 PM St Paul’s skyline buzz at 12th Knot (98).'
  },
  {
    id: 'sound',
    num: '07',
    label: 'Sound & Sleep',
    short: '74 dB Social Bar Pulse · Quiet River Rooms',
    score: '90/100',
    icon: Volume2,
    color: '#38bdf8',
    proof: 'Eclectic lounge & deep house energy in 12th Knot/Lyaness (74 dB), paired with acoustic-glazed river-view sleep sanctuaries upstairs.'
  },
  {
    id: 'insider',
    num: '08',
    label: 'Insider Tips',
    short: '12th Knot Secret St Paul’s Corner Terrace',
    score: '95/100',
    icon: Sparkles,
    color: '#ffd700',
    proof: 'Ask Lyaness bartenders for the off-menu "Forgotten Classics" fermented botanicals, and grab the intimate west corner terrace at 12th Knot before sunset.'
  }
];

const SLIDE_META = [
  { index: 0, shortLabel: '1. OTA Gap', badge: 'SLIDE 1/4 • THE DROP-OFF PROBLEM' },
  { index: 1, shortLabel: '2. Vibe DNA', badge: 'SLIDE 2/4 • 8-SIGNAL VIBE SIGNATURE' },
  { index: 2, shortLabel: '3. Photo Fix', badge: 'SLIDE 3/4 • 48 ➔ 94 PHOTO RE-ORDER' },
  { index: 3, shortLabel: '4. Live Demo', badge: 'SLIDE 4/4 • RUN YOUR HOTEL' }
];

export default function WtmMobileDeckPage() {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);
  const [selectedSignal, setSelectedSignal] = useState(SIGNALS[0]);
  const [showAiPrompt, setShowAiPrompt] = useState(false);
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
        background: 'radial-gradient(circle at 50% 0%, #0d1f38 0%, #050a14 65%, #03060c 100%)',
        color: '#f8fafc',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        userSelect: 'none',
        overflowX: 'hidden'
      }}
    >
      <Helmet>
        <title>Sea Containers London — Mobile Vibe Signature Deck | AtmosVibe</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* TOP STORY PROGRESS BAR & COMPACT HEADER */}
      <div style={{ padding: '12px 16px 8px', maxWidth: '480px', width: '100%', margin: '0 auto' }}>
        {/* 4 Story Progress Segments */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '12px' }}>
          {SLIDE_META.map((s) => {
            const isPassed = s.index < slide;
            const isCurrent = s.index === slide;
            return (
              <button
                key={s.index}
                type="button"
                onClick={() => setSlide(s.index)}
                aria-label={s.shortLabel}
                style={{
                  height: '5px',
                  borderRadius: '999px',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  background: isCurrent
                    ? 'linear-gradient(90deg, #00e5ff, #ffd700)'
                    : isPassed
                    ? '#00e5ff'
                    : 'rgba(255,255,255,0.16)',
                  boxShadow: isCurrent ? '0 0 10px rgba(0, 229, 255, 0.6)' : 'none',
                  transition: 'all 0.25s ease'
                }}
              />
            );
          })}
        </div>

        {/* Brand + Property Pill Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <img src="/models/Atmosvibe6.svg" alt="AtmosVibe" style={{ height: '28px', width: 'auto' }} />
          </Link>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '999px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', fontSize: '11px', fontWeight: 700, color: '#e2e8f0' }}>
            <MapPin size={12} color="#00e5ff" />
            <span>Sea Containers • South Bank</span>
          </div>
        </div>
      </div>

      {/* MAIN SLIDE VIEWPORT */}
      <div style={{ flex: 1, maxWidth: '480px', width: '100%', margin: '0 auto', padding: '6px 16px 16px', display: 'flex', flexDirection: 'column' }}>
        {/* Slide Eyebrow */}
        <div style={{ marginBottom: '8px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '10px', fontWeight: 900, letterSpacing: '0.12em', color: '#00e5ff', background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.28)', padding: '3px 10px', borderRadius: '999px' }}>
            <Zap size={11} />
            {SLIDE_META[slide].badge}
          </span>
        </div>

        {/* ==================== SLIDE 1: THE CRIME SCENE (48/100 LIVE OTA) ==================== */}
        {slide === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            <div>
              <h1 style={{ fontSize: '1.45rem', fontWeight: 900, lineHeight: 1.15, margin: '0 0 4px', letterSpacing: '-0.02em' }}>
                Iconic 92/100 Hotel.<br />
                <span style={{ color: '#ef4444' }}>Undersold at 48/100 on Booking.com.</span>
              </h1>
              <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.72)', margin: 0, lineHeight: 1.45 }}>
                Look at Sea Containers London’s live Top 5 Booking.com photos today — <strong>3 of the first 5 slots show the exact same blue sofa</strong>:
              </p>
            </div>

            {/* Live Top 5 Strip with Red Duplicate Callouts */}
            <div style={{ background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '16px', padding: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#fca5a5', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  🔴 Live Booking.com Top 5 Today
                </span>
                <span style={{ fontSize: '12px', fontWeight: 900, background: 'rgba(239,68,68,0.2)', color: '#f87171', padding: '2px 8px', borderRadius: '6px', border: '1px solid rgba(239,68,68,0.4)' }}>
                  48 / 100
                </span>
              </div>

              {/* Hero Live #1 + 4 Sub-slots */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '6px', marginBottom: '8px' }}>
                <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', height: '148px', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <img
                    src={livePhotos[0]?.imageUrl}
                    alt="Live Slot 1"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '6px', left: '6px', background: 'rgba(0,0,0,0.8)', color: '#fff', fontSize: '10px', fontWeight: 800, padding: '2px 7px', borderRadius: '4px' }}>
                    Live #1 • Distant Exterior
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, insetInline: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.9))', padding: '18px 8px 6px', fontSize: '10.5px', color: '#fca5a5', fontWeight: 700 }}>
                    Looks like an office block from across the river
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '6px', height: '148px' }}>
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
                          border: isBlueCouch ? '2px solid #ef4444' : '1px solid rgba(255,255,255,0.15)'
                        }}
                      >
                        <img src={p.imageUrl} alt={`Live Slot ${slotNum}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', top: '3px', left: '3px', background: isBlueCouch ? '#ef4444' : 'rgba(0,0,0,0.75)', color: '#fff', fontSize: '9px', fontWeight: 900, padding: '1px 5px', borderRadius: '4px' }}>
                          #{slotNum} {isBlueCouch ? '🛋️ DUPLICATE' : 'Bed'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3 Visceral Flaws */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#e2e8f0', background: 'rgba(239,68,68,0.1)', padding: '7px 10px', borderRadius: '8px' }}>
                  <AlertTriangle size={15} color="#f87171" style={{ flexShrink: 0 }} />
                  <span><strong>Slots #2, #3 & #5</strong> repeat the same blue-couch living room (-10 pt penalty)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#e2e8f0', background: 'rgba(239,68,68,0.1)', padding: '7px 10px', borderRadius: '8px' }}>
                  <AlertTriangle size={15} color="#f87171" style={{ flexShrink: 0 }} />
                  <span><strong>12th Knot Rooftop Bar</strong> buried at <strong>#24</strong> & <strong>Lyaness</strong> buried at <strong>#26</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#e2e8f0', background: 'rgba(239,68,68,0.1)', padding: '7px 10px', borderRadius: '8px' }}>
                  <AlertTriangle size={15} color="#f87171" style={{ flexShrink: 0 }} />
                  <span><strong>0 guest bathroom photos</strong> in all 55 Booking.com images</span>
                </div>
              </div>
            </div>

            {/* Next Step Prompt */}
            <button
              type="button"
              onClick={() => setSlide(1)}
              style={{
                marginTop: 'auto',
                width: '100%',
                padding: '13px 16px',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(90deg, #00e5ff, #38bdf8)',
                color: '#04101c',
                fontWeight: 900,
                fontSize: '13.5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(0, 229, 255, 0.3)'
              }}
            >
              <span>See What Guests Actually Love (92/100 Vibe Signature)</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* ==================== SLIDE 2: THE 8-SIGNAL VIBE SIGNATURE (92/100) ==================== */}
        {slide === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
              <div>
                <h1 style={{ fontSize: '1.35rem', fontWeight: 900, lineHeight: 1.15, margin: '0 0 3px' }}>
                  The 8-Signal <span style={{ color: '#00e5ff' }}>Vibe Signature</span>
                </h1>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.68)', margin: 0 }}>
                  Tap any signal below to see the verified South Bank reality:
                </p>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0, background: 'rgba(16, 185, 129, 0.14)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '10px', padding: '4px 9px' }}>
                <div style={{ fontSize: '15px', fontWeight: 900, color: '#10b981', lineHeight: 1 }}>92/100</div>
                <div style={{ fontSize: '9px', fontWeight: 800, color: '#a7f3d0', textTransform: 'uppercase' }}>Reality Match</div>
              </div>
            </div>

            {/* 2x4 Interactive Signal Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px' }}>
              {SIGNALS.map((sig) => {
                const Icon = sig.icon;
                const isSelected = selectedSignal.id === sig.id && !showAiPrompt;
                return (
                  <button
                    key={sig.id}
                    type="button"
                    onClick={() => {
                      setShowAiPrompt(false);
                      setSelectedSignal(sig);
                    }}
                    style={{
                      textAlign: 'left',
                      padding: '9px 10px',
                      borderRadius: '11px',
                      background: isSelected ? 'rgba(0, 229, 255, 0.13)' : 'rgba(15, 23, 42, 0.8)',
                      border: isSelected ? `1.5px solid ${sig.color}` : '1px solid rgba(255,255,255,0.09)',
                      color: '#f8fafc',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: 800, color: sig.color }}>
                        <Icon size={13} />
                        {sig.label}
                      </span>
                      <span style={{ fontSize: '9.5px', fontWeight: 800, color: 'rgba(255,255,255,0.55)' }}>{sig.score}</span>
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#e2e8f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {sig.short}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Signal Proof Card OR AI Search Shortlist Preview */}
            <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(0, 229, 255, 0.35)', borderRadius: '14px', padding: '12px 14px', minHeight: '108px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '10.5px', fontWeight: 900, color: showAiPrompt ? '#ffd700' : selectedSignal.color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {showAiPrompt
                    ? '🤖 AI Search Shortlist Proof (ChatGPT / Gemini)'
                    : `Signal #${selectedSignal.num} • ${selectedSignal.label} (${selectedSignal.score})`}
                </span>
                <button
                  type="button"
                  onClick={() => setShowAiPrompt(!showAiPrompt)}
                  style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '999px',
                    border: '1px solid rgba(255, 215, 0, 0.45)',
                    background: showAiPrompt ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 215, 0, 0.08)',
                    color: '#ffd700',
                    cursor: 'pointer'
                  }}
                >
                  {showAiPrompt ? '← Back to Signal' : '🤖 AI Search View'}
                </button>
              </div>

              {showAiPrompt ? (
                <div style={{ fontSize: '12px', color: '#e2e8f0', lineHeight: 1.45 }}>
                  <div style={{ color: '#94a3b8', fontSize: '11px', marginBottom: '4px' }}>
                    Traveller asks ChatGPT: <em>“London hotel with buzzing riverside rooftop bar, craft cocktails & walkable to Tate Modern?”</em>
                  </div>
                  <div style={{ color: '#a7f3d0', fontWeight: 700 }}>
                    ✅ Shortlisted #1 when structured with AtmosVibe’s 8 verified signals (Lyaness + 12th Knot + 4m walk to Tate Modern).
                  </div>
                </div>
              ) : (
                <p style={{ fontSize: '12.5px', color: '#f1f5f9', margin: 0, lineHeight: 1.45 }}>
                  {selectedSignal.proof}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => setSlide(2)}
              style={{
                marginTop: 'auto',
                width: '100%',
                padding: '13px 16px',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(90deg, #10b981, #00e5ff)',
                color: '#04101c',
                fontWeight: 900,
                fontSize: '13.5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <span>See How We Fix the Photos (48 ➔ 94/100)</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* ==================== SLIDE 3: INTERACTIVE PHOTO FIX (48 ➔ 94/100) ==================== */}
        {slide === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
            <div>
              <h1 style={{ fontSize: '1.35rem', fontWeight: 900, lineHeight: 1.15, margin: '0 0 6px' }}>
                Same Photos They Own.<br />
                <span style={{ color: '#10b981' }}>Re-Ordered for +21.0% Conversion.</span>
              </h1>

              {/* 1-Thumb Before / After Switcher */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', background: 'rgba(15,23,42,0.9)', padding: '4px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)' }}>
                <button
                  type="button"
                  onClick={() => {
                    setPhotoMode('before');
                    setSelectedSlotIdx(0);
                  }}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '9px',
                    border: 'none',
                    fontWeight: 900,
                    fontSize: '12px',
                    cursor: 'pointer',
                    background: photoMode === 'before' ? '#ef4444' : 'transparent',
                    color: photoMode === 'before' ? '#fff' : '#94a3b8'
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
                    padding: '8px 10px',
                    borderRadius: '9px',
                    border: 'none',
                    fontWeight: 900,
                    fontSize: '12px',
                    cursor: 'pointer',
                    background: photoMode === 'after' ? '#10b981' : 'transparent',
                    color: photoMode === 'after' ? '#041e13' : '#94a3b8'
                  }}
                >
                  🟢 Vibe Re-Order (94/100)
                </button>
              </div>
            </div>

            {/* Active Selected Slot Large Preview */}
            <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', height: '165px', border: photoMode === 'after' ? '1.5px solid #10b981' : '1.5px solid #ef4444' }}>
              <img
                src={activeSlot?.photo_url || activeSlot?.imageUrl}
                alt="Selected Slot"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', top: '8px', left: '8px', background: photoMode === 'after' ? '#10b981' : '#ef4444', color: photoMode === 'after' ? '#031c11' : '#fff', fontSize: '10.5px', fontWeight: 900, padding: '3px 9px', borderRadius: '6px' }}>
                {photoMode === 'after'
                  ? `Slot #${selectedSlotIdx + 1} • Was Live #${activeSlot?.current_slot}`
                  : `Live Slot #${selectedSlotIdx + 1}`}
              </div>
              <div style={{ position: 'absolute', bottom: 0, insetInline: 0, background: 'linear-gradient(transparent, rgba(3, 6, 12, 0.95))', padding: '24px 12px 10px' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff', marginBottom: '2px' }}>
                  {photoMode === 'after' ? activeSlot?.photo_subject : activeSlot?.title}
                </div>
                <div style={{ fontSize: '11px', color: photoMode === 'after' ? '#a7f3d0' : '#fca5a5', lineHeight: 1.35 }}>
                  {photoMode === 'after'
                    ? activeSlot?.bullet_points?.[0] || activeSlot?.why_it_converts
                    : selectedSlotIdx === 1 || selectedSlotIdx === 2 || selectedSlotIdx === 4
                    ? 'Repetitive blue-couch living room photo — no bed or river bar shown.'
                    : 'Fails to lead with 12th Knot Rooftop Bar or Lyaness mixology.'}
                </div>
              </div>
            </div>

            {/* 5 Thumbnails Strip — Tap Any Slot 1-5 */}
            <div>
              <div style={{ fontSize: '10.5px', fontWeight: 800, color: '#94a3b8', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Tap Slot #1–#5 to Inspect ({photoMode === 'after' ? 'AtmosVibe Optimal Sequence' : 'Current Booking.com Sequence'}):
              </div>
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
                        height: '58px',
                        padding: 0,
                        borderRadius: '8px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: isSelected
                          ? `2.5px solid ${photoMode === 'after' ? '#10b981' : '#ef4444'}`
                          : '1px solid rgba(255,255,255,0.18)',
                        opacity: isSelected ? 1 : 0.72
                      }}
                    >
                      <img
                        src={item.photo_url || item.imageUrl}
                        alt={`Slot ${idx + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span style={{ position: 'absolute', bottom: '2px', left: '2px', right: '2px', background: 'rgba(0,0,0,0.82)', color: '#fff', fontSize: '9px', fontWeight: 900, borderRadius: '3px', padding: '1px 2px' }}>
                        #{idx + 1} {photoMode === 'after' ? `(←#${item.current_slot})` : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSlide(3)}
              style={{
                marginTop: 'auto',
                width: '100%',
                padding: '13px 16px',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(90deg, #ffd700, #00e5ff)',
                color: '#04101c',
                fontWeight: 900,
                fontSize: '13.5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <span>Run Your Property Live or Scan QR</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* ==================== SLIDE 4: HANDSHAKE CTA + QR SHARE ==================== */}
        {slide === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 900, lineHeight: 1.15, margin: '0 0 4px' }}>
                Turn Your Unique Vibe Into <span style={{ color: '#00e5ff' }}>Direct & OTA Bookings</span>
              </h1>
              <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.72)', margin: 0 }}>
                Audit any hotel in 30 seconds — or scan below to keep this Sea Containers London benchmark on your phone:
              </p>
            </div>

            {/* QR Code Card for Instant Booth/Aisle Scan */}
            <div style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(0, 229, 255, 0.35)', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ background: '#ffffff', padding: '8px', borderRadius: '12px', flexShrink: 0 }}>
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=https%3A%2F%2Fwww.atmosvibe.io%2Fwtm"
                  alt="Scan for Sea Containers Mobile Demo"
                  style={{ width: '96px', height: '96px', display: 'block' }}
                />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '10px', fontWeight: 900, color: '#ffd700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                  <QrCode size={12} />
                  <span>Instant Handshake Share</span>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
                  Scan to Open on Your Phone
                </div>
                <div style={{ fontSize: '11.5px', color: '#94a3b8', lineHeight: 1.4 }}>
                  Opens <strong>atmosvibe.io/wtm</strong> — zero login required.
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <button
                type="button"
                onClick={() => navigate('/audit')}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(90deg, #00e5ff, #10b981)',
                  color: '#04101c',
                  fontWeight: 900,
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 8px 25px rgba(0, 229, 255, 0.3)'
                }}
              >
                <Zap size={16} />
                <span>Audit Your Hotel Live Now →</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/audit?demo=sea-containers-london')}
                style={{
                  width: '100%',
                  padding: '11px 16px',
                  borderRadius: '12px',
                  border: '1px solid rgba(0, 229, 255, 0.35)',
                  background: 'rgba(0, 229, 255, 0.08)',
                  color: '#00e5ff',
                  fontWeight: 800,
                  fontSize: '12.5px',
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
                  padding: '10px 16px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  background: 'rgba(255, 255, 255, 0.04)',
                  color: '#cbd5e1',
                  fontWeight: 700,
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <span> Tours Demo: Travel Curious Black Cab Vibe API</span>
                <ExternalLink size={13} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* STICKY BOTTOM 4-PILL THUMB BAR */}
      <div style={{
        position: 'sticky',
        bottom: 0,
        background: 'rgba(5, 10, 20, 0.95)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '8px 12px 12px'
      }}>
        <div style={{ maxWidth: '480px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
          {SLIDE_META.map((s) => {
            const isActive = s.index === slide;
            return (
              <button
                key={s.index}
                type="button"
                onClick={() => setSlide(s.index)}
                style={{
                  padding: '8px 4px',
                  borderRadius: '9px',
                  border: isActive ? '1px solid #00e5ff' : '1px solid rgba(255,255,255,0.08)',
                  background: isActive ? 'rgba(0, 229, 255, 0.16)' : 'rgba(255,255,255,0.03)',
                  color: isActive ? '#00e5ff' : '#94a3b8',
                  fontSize: '11px',
                  fontWeight: isActive ? 900 : 700,
                  cursor: 'pointer',
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
  );
}
