import React from 'react';
import { Volume2, Users, Palette, Zap, MapPin, ShieldCheck, Compass, Sparkles } from 'lucide-react';
import './VibeDimensionsSection.css';

const DIMENSIONS = [
  {
    icon: Compass,
    tag: '5-MIN WALK',
    title: 'Walkable Local Gems',
    accentColor: '#ec4899',
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
          <span className="widget-metric">Neighbourhood Favourite</span>
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
            We capture the 8 real-world signals that make people choose you—and match them to what guests are searching for locally
          </p>
        </div>

        {/* 8 Sensory Dimensions Grid with Micro-Visuals */}
        <div className="dimensions-grid animate-fade-up">
          {DIMENSIONS.map((dim, index) => {
            const IconComponent = dim.icon;
            return (
              <div key={index} className="dimension-card">
                <div className="dim-card-header">
                  <div className="dim-icon-wrap" style={{ color: dim.accentColor, borderColor: `${dim.accentColor}33`, backgroundColor: `${dim.accentColor}12` }}>
                    <IconComponent size={18} />
                  </div>
                  <span className="dim-tag" style={{ color: dim.accentColor }}>{dim.tag}</span>
                </div>
                <h4 className="dim-title">{dim.title}</h4>
                <div className="dim-visual-container">
                  {dim.renderVisual()}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
