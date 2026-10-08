import React from 'react';
import { Volume2, Users, Palette, Zap, MapPin, ShieldCheck, Compass, Sparkles } from 'lucide-react';
import './VibeDimensionsSection.css';

const DIMENSIONS = [
  {
    icon: Volume2,
    tag: 'SOUND',
    title: 'Acoustic Soul',
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
          <span className="widget-metric">58 dB</span>
          <span className="widget-caption">Intimate Lounge Hum</span>
        </div>
      </div>
    )
  },
  {
    icon: Users,
    tag: 'PEOPLE',
    title: 'The Social Mix',
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
          <span className="widget-metric">Local Magnet</span>
          <span className="widget-caption">Zero Tourist Trap</span>
        </div>
      </div>
    )
  },
  {
    icon: Palette,
    tag: 'COLOURS',
    title: 'Visual Warmth',
    accentColor: '#fbbf24',
    renderVisual: () => (
      <div className="vibe-visual-widget palette-widget">
        <div className="swatch-strip">
          <span className="swatch swatch-amber" title="2200K Amber"></span>
          <span className="swatch swatch-navy" title="Velvet Navy"></span>
          <span className="swatch swatch-brass" title="Aged Brass"></span>
          <span className="swatch swatch-stone" title="Raw Limestone"></span>
        </div>
        <div className="widget-label-row">
          <span className="widget-metric">2200K Ambient</span>
          <span className="widget-caption">Warm Twilight Glow</span>
        </div>
      </div>
    )
  },
  {
    icon: Zap,
    tag: 'ENERGY',
    title: 'Day-to-Night Pulse',
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
          <span className="widget-metric">Sunset Peak</span>
          <span className="widget-caption">4 PM Calm ➔ 9 PM Buzz</span>
        </div>
      </div>
    )
  },
  {
    icon: MapPin,
    tag: 'INSIDER TIPS',
    title: 'Gateway Secrets',
    accentColor: '#10b981',
    renderVisual: () => (
      <div className="vibe-visual-widget tips-widget">
        <div className="secret-pill">
          <MapPin size={11} className="pin-icon" />
          <span>Speakeasy 3 doors down</span>
        </div>
        <div className="widget-label-row">
          <span className="widget-metric">2 min walk</span>
          <span className="widget-caption">Artisan Flat White</span>
        </div>
      </div>
    )
  },
  {
    icon: ShieldCheck,
    tag: 'AUTHENTICITY',
    title: 'Material Honesty',
    accentColor: '#a855f7',
    renderVisual: () => (
      <div className="vibe-visual-widget auth-widget">
        <div className="auth-score-bar">
          <div className="auth-fill" style={{ width: '94%' }}></div>
          <span className="auth-num">94%</span>
        </div>
        <div className="widget-label-row">
          <span className="widget-metric">Honest Materials</span>
          <span className="widget-caption">Zero Faux Decor</span>
        </div>
      </div>
    )
  },
  {
    icon: Compass,
    tag: 'PROXIMITY',
    title: 'Proximity to Hotspots',
    accentColor: '#ec4899',
    renderVisual: () => (
      <div className="vibe-visual-widget proximity-widget">
        <div className="proximity-pills">
          <span className="prox-pill">3m South Bank</span>
          <span className="prox-pill">5m Tate Modern</span>
        </div>
        <div className="widget-label-row">
          <span className="widget-metric">98 WalkScore</span>
          <span className="widget-caption">Local Epicentre</span>
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
            <span>VIBE SIGNATURES</span>
          </div>
          <h2 className="vibe-dimensions-title">
            <span className="text-gold-gradient">Mapping Your Atmosphere</span>
          </h2>
          <p className="vibe-dimensions-subtitle">
            AtmosVibe maps the 7 key dimensions that make your property unique
          </p>
        </div>

        {/* 7 Sensory Dimensions Grid with Micro-Visuals */}
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
