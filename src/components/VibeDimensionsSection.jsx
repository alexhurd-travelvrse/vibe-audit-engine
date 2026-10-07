import React from 'react';
import { Volume2, Users, Palette, Zap, MapPin, Sparkles } from 'lucide-react';
import './VibeDimensionsSection.css';

const DIMENSIONS = [
  {
    icon: Volume2,
    tag: 'SOUND',
    title: 'Acoustic Soul',
    description: 'Vinyl lounge hum, riverside breeze, evening acoustic sets',
    accentColor: '#00e5ff'
  },
  {
    icon: Users,
    tag: 'PEOPLE',
    title: 'The Social Mix',
    description: 'Design nomads, stylish locals mingling at the cocktail bar',
    accentColor: '#38bdf8'
  },
  {
    icon: Palette,
    tag: 'COLOURS',
    title: 'Visual Warmth',
    description: 'Warm amber lighting, deep velvet navy, weathered brass accents',
    accentColor: '#fbbf24'
  },
  {
    icon: Zap,
    tag: 'ENERGY',
    title: 'Day-to-Night Pulse',
    description: 'High-vibration sunset terrace shifting to calm morning sanctuary',
    accentColor: '#f59e0b'
  },
  {
    icon: MapPin,
    tag: 'INSIDER TIPS',
    title: 'Local Gateway Secrets',
    description: 'Hidden speakeasy 3 doors down, neighbourhood’s best artisan flat white',
    accentColor: '#10b981'
  }
];

export default function VibeDimensionsSection() {
  return (
    <section className="vibe-dimensions-section" id="vibe-signatures">
      <div className="container">
        
        {/* Section Header */}
        <div className="vibe-dimensions-header animate-fade-up">
          <h2 className="vibe-dimensions-title">
            <span className="text-gold-gradient">VIBE SIGNATURES</span>
          </h2>
          <p className="vibe-dimensions-subtitle">
            Next-Gen travelers don’t book square footage—they book an atmosphere. We map the 5 sensory dimensions that define your property as the natural gateway to your neighbourhood
          </p>
        </div>

        {/* 5 Sensory Dimensions Grid */}
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
                <p className="dim-desc">{dim.description}</p>
              </div>
            );
          })}
        </div>

        {/* Synthesis Anchor Bar */}
        <div className="vibe-synthesis-bar animate-fade-up">
          <div className="synthesis-badge">
            <Sparkles size={14} className="synthesis-sparkle" />
            <span>SYNTHESIS</span>
          </div>
          <div className="synthesis-content">
            <span className="synthesis-quote">“Maritime Glamour &amp; Thameside Buzz”</span>
            <span className="synthesis-note">The defining identity that proves your property is the natural gateway to the neighbourhood</span>
          </div>
        </div>

      </div>
    </section>
  );
}
