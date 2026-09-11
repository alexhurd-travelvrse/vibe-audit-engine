import React from 'react';
import { Zap, Music, Users, Sparkles, CheckCircle2, AlertTriangle, Disc, MapPin, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HotelVibeManifestCard({ manifest, hotelName, location }) {
  if (!manifest) return null;
  const v = manifest.vibe_signature || {};
  const dna = v.acoustic_dna || {};
  const crowd = v.crowd_archetype || {};
  const qual = v.qualification_test || {};
  const lighting = v.lighting_and_sensory || {};
  const proximity = v.hyper_local_proximity || {};
  const energy = v.energy_score || 80;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card"
      style={{
        borderRadius: '2rem',
        padding: '2.5rem',
        marginBottom: '3.5rem',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(0, 229, 255, 0.04) 50%, rgba(18, 18, 18, 0.8) 100%)',
        border: '1px solid rgba(0, 229, 255, 0.3)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 229, 255, 0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Top Banner Tag */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ 
            background: 'linear-gradient(90deg, #00e5ff, #10b981)', 
            color: '#000', 
            fontSize: '11px', 
            fontWeight: 900, 
            letterSpacing: '0.15em', 
            padding: '4px 12px', 
            borderRadius: '20px', 
            textTransform: 'uppercase' 
          }}>
            ⭐ Official Venue Vibe Manifest
          </span>
        </div>

        {/* Energy Meter Gauge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(0,0,0,0.4)', padding: '6px 14px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <Zap size={16} color="#00e5ff" />
          <span style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Energy Score:
          </span>
          <span style={{ fontSize: '14px', fontWeight: 900, color: '#00e5ff' }}>
            {energy}/100
          </span>
          <div style={{ width: '60px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${energy}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #00e5ff)' }} />
          </div>
        </div>
      </div>

      {/* Main Headline */}
      <h2 style={{ fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.2, marginBottom: '0.75rem' }}>
        {manifest.venue_name || hotelName}
      </h2>
      <p style={{ fontSize: '1.15rem', color: '#00e5ff', fontStyle: 'italic', fontWeight: 600, marginBottom: '2rem', lineHeight: 1.5 }}>
        "{v.headline || 'A defining cultural and lifestyle destination.'}"
      </p>

      {/* 4-Grid Diagnostic Telemetry */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Card 1: Acoustic DNA */}
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#00e5ff' }}>
            <Music size={18} />
            <h3 style={{ fontSize: '13px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
              Acoustic DNA
            </h3>
          </div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
            {dna.soundscape_genre || 'Curated Soundscape'}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '0.75rem' }}>
            {(dna.anchor_artists || []).map((artist, i) => (
              <span key={i} style={{ background: 'rgba(0, 229, 255, 0.12)', color: '#00e5ff', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px' }}>
                {artist}
              </span>
            ))}
          </div>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.4, margin: 0 }}>
            {dna.sound_texture || 'Atmospheric acoustic layering.'}
          </p>
        </div>

        {/* Card 2: Crowd Archetype & Pacing */}
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#10b981' }}>
            <Users size={18} />
            <h3 style={{ fontSize: '13px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
              Crowd & Atmosphere
            </h3>
          </div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
            {crowd.primary || 'Cosmopolitan Creatives'}
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginBottom: '0.4rem' }}>
            <strong style={{ color: 'rgba(255,255,255,0.9)' }}>Social Pacing:</strong> {v.social_pacing || 'Dynamic'}
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginBottom: '0.4rem' }}>
            <strong style={{ color: 'rgba(255,255,255,0.9)' }}>Dress Code:</strong> {crowd.dress_code || 'Smart Casual'}
          </div>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.4, margin: 0 }}>
            {lighting.atmosphere || 'Sophisticated ambient mood.'}
          </p>
        </div>

        {/* Card 3: Hyper-Local Lore */}
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#ffb300' }}>
            <Compass size={18} />
            <h3 style={{ fontSize: '13px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
              Hyper-Local Proximity
            </h3>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '0.75rem' }}>
            {(proximity.key_anchors || []).map((anchor, i) => (
              <span key={i} style={{ background: 'rgba(255, 179, 0, 0.12)', color: '#ffb300', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px' }}>
                📍 {anchor}
              </span>
            ))}
          </div>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4, margin: 0 }}>
            {proximity.insider_lore || 'Positioned directly within the city cultural core.'}
          </p>
        </div>

      </div>

      {/* Qualification Matrix (You will love if / Skip if) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', background: 'rgba(0,0,0,0.4)', padding: '1.25rem 1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          <CheckCircle2 size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', color: '#10b981', letterSpacing: '0.05em' }}>
              You will love this hotel if:
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', marginTop: '2px', lineHeight: 1.4 }}>
              {qual.you_will_love_if || 'You seek an immersive lifestyle destination.'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          <AlertTriangle size={20} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', color: '#f59e0b', letterSpacing: '0.05em' }}>
              Skip this hotel if:
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', marginTop: '2px', lineHeight: 1.4 }}>
              {qual.skip_if || 'You prefer total isolation or traditional quiet.'}
            </div>
          </div>
        </div>
      </div>

    </motion.div>
  );
}
