import React, { useState, useEffect } from 'react';
import { Volume2, Users, Palette, Zap, MapPin, ShieldCheck, Compass, Sparkles } from 'lucide-react';
import './VibeDimensionsSection.css';

const DIMENSIONS = [
  {
    icon: Compass,
    tag: '5-MIN WALK',
    title: 'Walkable Local Gems',
    accentColor: '#ec4899',
    certaintyBadge: '✓ 96% Fact',
    certaintyColor: '#34d399',
    description: 'Verified 4.4★+ local wine bars, bakeries & markets within a 2–6 min walk',
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
    certaintyBadge: '◎ 90% Proven',
    certaintyColor: '#00e5ff',
    description: 'Warm music & easy chat downstairs, sound-mitigated quiet sleep upstairs',
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
    certaintyBadge: '✓ 94% Fact',
    certaintyColor: '#34d399',
    description: 'Flattering table lamps, natural daylight & warm textures—zero harsh glare',
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
    certaintyBadge: '◎ 89% Proven',
    certaintyColor: '#00e5ff',
    description: 'Unscripted hosts who know the destination inside out & make you feel at home',
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
    certaintyBadge: '◈ 78% Estimate',
    certaintyColor: '#fbbf24',
    description: 'Shows whether spaces attract genuine local regulars, couples or solo explorers',
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
    certaintyBadge: '◎ 88% Proven',
    certaintyColor: '#00e5ff',
    description: 'Maps how the mood shifts from bright morning coffee to sunset drinks',
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
    certaintyBadge: '✓ 94% Fact',
    certaintyColor: '#34d399',
    description: 'Authentic architecture, natural stone & handcrafted finishes—not chain decor',
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
    certaintyBadge: '◎ 86% Proven',
    certaintyColor: '#00e5ff',
    description: 'Off-menu orders, best sunset tables & hidden spots regulars ask for',
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
    }, 2600);
    return () => clearInterval(timer);
  }, [isPaused]);

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

        {/* Staggered Cascade Grid with Cycling Active Pulse Highlight */}
        <div
          className="dimensions-cascade-grid"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {DIMENSIONS.map((dim, idx) => {
            const IconComponent = dim.icon;
            const isHighlighted = idx === activeIndex;
            return (
              <div
                key={idx}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                className={`dimension-card cascade-card ${isHighlighted ? 'cascade-active' : ''}`}
                style={{
                  animationDelay: `${idx * 120}ms`,
                  '--card-accent': dim.accentColor
                }}
              >
                <div className="dim-card-header" style={{ justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="dim-icon-wrap" style={{ color: dim.accentColor, borderColor: `${dim.accentColor}33`, backgroundColor: `${dim.accentColor}12` }}>
                      <IconComponent size={18} />
                    </div>
                    <span className="dim-tag" style={{ color: dim.accentColor }}>{dim.tag}</span>
                  </div>
                  <span
                    className="card-mini-certainty"
                    style={{
                      color: dim.certaintyColor,
                      borderColor: `${dim.certaintyColor}40`,
                      background: `${dim.certaintyColor}12`
                    }}
                  >
                    {dim.certaintyBadge}
                  </span>
                </div>
                <h4 className="dim-title">{dim.title}</h4>
                <p className={`cascade-card-desc ${isHighlighted ? 'desc-highlighted' : ''}`}>
                  {dim.description}
                </p>
                <div className="dim-visual-container">
                  {dim.renderVisual()}
                </div>
                {isHighlighted && !isPaused && (
                  <span className="cascade-progress-bar" style={{ background: dim.accentColor }} />
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
