import React, { useState, useEffect } from 'react';
import { Volume2, Users, Palette, Zap, MapPin, ShieldCheck, Compass, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import './VibeDimensionsSection.css';

const DIMENSIONS = [
  {
    icon: Compass,
    tag: '5-MIN WALK',
    title: 'Walkable Local Gems',
    accentColor: '#ec4899',
    certaintyBadge: '✓ 96% Verified Fact',
    certaintyColor: '#34d399',
    description: 'Connects your front door to verified 4.4★+ local wine bars, bakeries, and markets within a 2 to 6 minute walk—zero tourist traps',
    proofBasis: 'Google Places walk-time radius (≤500m) × ≥4.4★ rating filter',
    renderVisual: () => (
      <div className="vibe-visual-widget proximity-widget">
        <div className="proximity-pills">
          <span className="prox-pill">★ 4.6 Local Wine Bar (2m)</span>
          <span className="prox-pill">★ 4.5 Artisan Bakery (4m)</span>
        </div>
        <div className="widget-label-row">
          <span className="widget-metric">Verified Spots</span>
          <span className="widget-caption">Steps From Your Door</span>
        </div>
      </div>
    )
  },
  {
    icon: Volume2,
    tag: 'SOUND & SLEEP',
    title: 'Easy Chat & Quiet Sleep',
    accentColor: '#00e5ff',
    certaintyBadge: '◎ 90% Corroborated',
    certaintyColor: '#00e5ff',
    description: 'Reassures guests they can enjoy warm music and easy conversation downstairs while sleeping soundly in quiet rooms upstairs',
    proofBasis: 'Guest sleep-quality review consensus + bar operating hours',
    renderVisual: () => (
      <div className="vibe-visual-widget sound-widget">
        <div className="audio-spectrum-bars">
          <span className="bar bar-1"></span>
          <span className="bar bar-2"></span>
          <span className="bar bar-3"></span>
          <span className="bar bar-4"></span>
          <span className="bar bar-5"></span>
          <span className="bar bar-6"></span>
        </div>
        <div className="widget-label-row">
          <span className="widget-metric">No Shouting</span>
          <span className="widget-caption">Buzz Downstairs · Quiet Rooms</span>
        </div>
      </div>
    )
  },
  {
    icon: Palette,
    tag: 'WARMTH & LIGHT',
    title: 'Candlelit & Golden Glow',
    accentColor: '#fbbf24',
    certaintyBadge: '✓ 94% Verified Fact',
    certaintyColor: '#34d399',
    description: 'Showcases flattering evening table lamps, natural daylight, and warm textures instead of harsh overhead lighting',
    proofBasis: 'Computer-vision pixel scan of 16 live gallery photos',
    renderVisual: () => (
      <div className="vibe-visual-widget palette-widget">
        <div className="swatch-strip">
          <span className="swatch swatch-amber" title="Candlelit Amber"></span>
          <span className="swatch swatch-navy" title="Velvet Navy"></span>
          <span className="swatch swatch-brass" title="Aged Brass"></span>
          <span className="swatch swatch-stone" title="Warm Stone"></span>
        </div>
        <div className="widget-label-row">
          <span className="widget-metric">Cosy & Flattering</span>
          <span className="widget-caption">Zero Harsh Glare</span>
        </div>
      </div>
    )
  },
  {
    icon: Sparkles,
    tag: 'THE HOSTS',
    title: 'Warm Local Insiders',
    accentColor: '#34d399',
    certaintyBadge: '◎ 89% Corroborated',
    certaintyColor: '#00e5ff',
    description: 'Highlights unscripted, welcoming hosts who know the destination inside out and make guests feel like instant regulars',
    proofBasis: 'Cross-referenced staff & service mentions across guest reviews',
    renderVisual: () => (
      <div className="vibe-visual-widget host-widget">
        <div className="host-alchemy-pills">
          <span className="host-pill">✦ Like a Local Friend</span>
          <span className="host-pill">✦ Zero Snobbery</span>
        </div>
        <div className="widget-label-row">
          <span className="widget-metric">Genuine Welcome</span>
          <span className="widget-caption">Unscripted Hospitality</span>
        </div>
      </div>
    )
  },
  {
    icon: Users,
    tag: 'THE CROWD',
    title: 'Where Locals Hang Out',
    accentColor: '#38bdf8',
    certaintyBadge: '◈ 78% Observed Estimate',
    certaintyColor: '#fbbf24',
    description: 'Shows whether the social spaces attract genuine local regulars, couples, or solo explorers—so guests know they will fit right in',
    proofBasis: 'Behavioural estimate from dining mix & guest review profiles',
    renderVisual: () => (
      <div className="vibe-visual-widget dial-widget">
        <div className="split-dial-bar">
          <div className="dial-segment locals-seg" style={{ width: '74%' }}>
            <span>74% Locals</span>
          </div>
          <div className="dial-segment travelers-seg" style={{ width: '26%' }}>
            <span>26%</span>
          </div>
        </div>
        <div className="widget-label-row">
          <span className="widget-metric">Destination Favourite</span>
          <span className="widget-caption">Not a Tourist Trap</span>
        </div>
      </div>
    )
  },
  {
    icon: Zap,
    tag: 'BEST TIME OF DAY',
    title: 'Calm Days, Lively Nights',
    accentColor: '#f59e0b',
    certaintyBadge: '◎ 88% Corroborated',
    certaintyColor: '#00e5ff',
    description: 'Maps how the mood shifts from bright morning coffee and remote work to golden-hour sunset drinks and evening buzz',
    proofBasis: 'Venue operating windows + golden-hour review consensus',
    renderVisual: () => (
      <div className="vibe-visual-widget energy-widget">
        <div className="pulse-sparkline">
          <svg viewBox="0 0 100 24" className="sparkline-svg">
            <path d="M 0,18 Q 25,18 45,7 T 80,4 T 100,14" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
            <circle cx="45" cy="7" r="3" fill="#f59e0b" />
            <circle cx="80" cy="4" r="3.5" fill="#ffd700" />
          </svg>
        </div>
        <div className="widget-label-row">
          <span className="widget-metric">Best at 6:30 PM</span>
          <span className="widget-caption">Morning Coffee ➔ Sunset Drinks</span>
        </div>
      </div>
    )
  },
  {
    icon: ShieldCheck,
    tag: 'TRUE CHARACTER',
    title: 'Real Craft, Not Chain',
    accentColor: '#a855f7',
    certaintyBadge: '✓ 94% Verified Fact',
    certaintyColor: '#34d399',
    description: 'Proves authentic architecture, natural stone, aged timber, and handcrafted details that set you apart from cookie-cutter chains',
    proofBasis: 'Computer-vision material scan + architectural press features',
    renderVisual: () => (
      <div className="vibe-visual-widget auth-widget">
        <div className="auth-score-bar">
          <div className="auth-fill" style={{ width: '94%' }}></div>
          <span className="auth-num">94%</span>
        </div>
        <div className="widget-label-row">
          <span className="widget-metric">Real Wood & Stone</span>
          <span className="widget-caption">True Local Architecture</span>
        </div>
      </div>
    )
  },
  {
    icon: MapPin,
    tag: 'INSIDER TIPS',
    title: 'The Secret Local Order',
    accentColor: '#10b981',
    certaintyBadge: '◎ 86% Corroborated',
    certaintyColor: '#00e5ff',
    description: 'Captures the off-menu orders, best sunset table, and hidden local favourites that turn first-time guests into regulars',
    proofBasis: 'Curated from repeat-guest tips, menu archives & press',
    renderVisual: () => (
      <div className="vibe-visual-widget tips-widget">
        <div className="secret-pill">
          <MapPin size={11} className="pin-icon" />
          <span>Hidden Wine Bar 2 Doors Down</span>
        </div>
        <div className="widget-label-row">
          <span className="widget-metric">Regulars' Tip</span>
          <span className="widget-caption">What Locals Ask For</span>
        </div>
      </div>
    )
  }
];

export default function VibeDimensionsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DIMENSIONS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeDim = DIMENSIONS[activeIndex];
  const ActiveIcon = activeDim.icon;

  return (
    <section className="vibe-dimensions-section" id="vibe-signatures">
      <div className="container">
        
        {/* Section Header */}
        <div className="vibe-dimensions-header animate-fade-up">
          <div className="vibe-dimensions-eyebrow">
            <Sparkles size={14} />
            <span>THE VIBE SIGNATURE™</span>
          </div>
          <h2 className="vibe-dimensions-title">
            Your Destination Creates <span className="vibe-title-accent">Desire.</span> Your Vibe Closes the <span className="vibe-title-accent">Booking</span>
          </h2>
          <p className="vibe-dimensions-subtitle">
            74% of travellers choose a destination and vibe first. Vibe Signatures verify the 8 real-world signals that match your unique experiences to demand
          </p>
        </div>

        {/* Interactive 8-Signal Pill Selector + Single Spotlight Showcase */}
        <div
          className="dimensions-spotlight-wrapper animate-fade-up"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* 8 Signal Selector Pills */}
          <div className="dimensions-pill-nav" role="tablist" aria-label="8 Vibe Signature Signals">
            {DIMENSIONS.map((dim, idx) => {
              const PillIcon = dim.icon;
              const isActive = idx === activeIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`dim-selector-pill ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                  style={{
                    '--pill-accent': dim.accentColor
                  }}
                >
                  <PillIcon size={14} style={{ color: isActive ? dim.accentColor : 'rgba(255,255,255,0.55)' }} />
                  <span className="dim-pill-label">{dim.tag}</span>
                  {isActive && !isPaused && <span className="dim-pill-progress" style={{ background: dim.accentColor }} />}
                </button>
              );
            })}
          </div>

          {/* Active Signal Spotlight Card */}
          <div
            key={activeIndex}
            className="dimension-spotlight-card"
            style={{ borderColor: `${activeDim.accentColor}44` }}
          >
            {/* Left Side: Narrative + Verification Proof */}
            <div className="spotlight-info-col">
              <div className="spotlight-top-meta">
                <span className="spotlight-index-badge">
                  SIGNAL 0{activeIndex + 1} / 0{DIMENSIONS.length}
                </span>
                <span
                  className="spotlight-certainty-pill"
                  style={{
                    color: activeDim.certaintyColor,
                    borderColor: `${activeDim.certaintyColor}44`,
                    background: `${activeDim.certaintyColor}14`
                  }}
                >
                  {activeDim.certaintyBadge}
                </span>
              </div>

              <div className="spotlight-title-row">
                <div
                  className="dim-icon-wrap spotlight-icon-lg"
                  style={{
                    color: activeDim.accentColor,
                    borderColor: `${activeDim.accentColor}44`,
                    backgroundColor: `${activeDim.accentColor}15`
                  }}
                >
                  <ActiveIcon size={22} />
                </div>
                <div>
                  <div className="dim-tag" style={{ color: activeDim.accentColor }}>{activeDim.tag}</div>
                  <h3 className="spotlight-main-title">{activeDim.title}</h3>
                </div>
              </div>

              <p className="spotlight-description">
                {activeDim.description}
              </p>

              <div className="spotlight-proof-bar">
                <span className="proof-label">📊 Proof Basis:</span>
                <span className="proof-text">{activeDim.proofBasis}</span>
              </div>
            </div>

            {/* Right Side: Live Interactive Signal Widget + Controls */}
            <div className="spotlight-visual-col">
              <div className="spotlight-widget-stage">
                {activeDim.renderVisual()}
              </div>

              <div className="spotlight-controls-row">
                <span className="spotlight-status-hint">
                  {isPaused ? '⏸ Paused — click any signal above' : '▶ Auto-cycling signals (hover to pause)'}
                </span>
                <div className="spotlight-arrow-group">
                  <button
                    type="button"
                    className="spotlight-nav-btn"
                    onClick={() => setActiveIndex((prev) => (prev - 1 + DIMENSIONS.length) % DIMENSIONS.length)}
                    aria-label="Previous Signal"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    className="spotlight-nav-btn"
                    onClick={() => setActiveIndex((prev) => (prev + 1) % DIMENSIONS.length)}
                    aria-label="Next Signal"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
