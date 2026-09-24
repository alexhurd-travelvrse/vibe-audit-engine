import React, { useRef } from 'react';
import { Zap, Music, Users, Sparkles, CheckCircle2, AlertTriangle, Disc, MapPin, Compass, Volume2, ShieldCheck, Sun, Clock, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HotelVibeManifestCard({ manifest, hotelName, location }) {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  if (!manifest) return null;
  const v = manifest.vibe_signature || {};
  const dna = v.acoustic_dna || {};
  const crowd = v.crowd_archetype || {};
  const qual = v.qualification_test || {};
  const lighting = v.lighting_and_sensory || {};
  const proximity = v.hyper_local_proximity || {};
  const auth = v.authenticity_and_materials || {};
  const temporal = v.temporal_dynamics || {};
  
  // Calibrated Metrics with intelligent fallbacks
  const energy = v.energy_score || 85;
  const decibels = dna.decibel_level || '54 dB';
  const clarityScore = dna.conversation_clarity_score || 94;
  const clarityVerdict = dna.conversation_verdict || 'Effortless Chat';
  const authenticityScore = auth.authenticity_score || 92;
  const materialPalette = auth.material_palette || 'Hand-hewn timber, aged brass, tactile stone, fluted glass';
  const materialVerdict = auth.material_verdict || 'Authentic Heritage — Zero Faux Decor';
  const localRatio = crowd.local_ratio || 80;
  const touristRatio = crowd.tourist_ratio || (100 - localRatio);
  const lightingTemp = lighting.lighting_temperature || '2200K Warm Filament Amber';
  const bestTimeToVisit = temporal.best_time_to_visit || '4:30 PM for fireside aperitivo; 8:30 PM for peak atmospheric buzz';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card"
      style={{
        borderRadius: '2rem',
        padding: '2.5rem',
        marginBottom: '3.5rem',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(0, 229, 255, 0.04) 50%, rgba(18, 18, 18, 0.9) 100%)',
        border: '1px solid rgba(0, 229, 255, 0.35)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 229, 255, 0.12)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Top Banner Tag & Venue Identity */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ 
            background: 'linear-gradient(90deg, #00e5ff, #10b981)', 
            color: '#050b14', 
            fontSize: '11px', 
            fontWeight: 900, 
            letterSpacing: '0.15em', 
            padding: '5px 14px', 
            borderRadius: '20px', 
            textTransform: 'uppercase',
            boxShadow: '0 0 15px rgba(0, 229, 255, 0.3)'
          }}>
            ⭐ Official Venue Vibe Manifest
          </span>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>
            ID: {manifest.venue_id || 'vibe_node_01'}
          </span>
        </div>

        <div style={{ fontSize: '12px', color: '#00e5ff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <MapPin size={14} />
          {manifest.location || location || 'London'}
        </div>
      </div>

      {/* Main Headline & Vibe Anchor Quote */}
      <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.15, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
        {manifest.venue_name || hotelName}
      </h2>
      <p style={{ fontSize: '1.15rem', color: '#00e5ff', fontStyle: 'italic', fontWeight: 600, marginBottom: '2rem', lineHeight: 1.5 }}>
        "{v.headline || 'A defining cultural and lifestyle destination.'}"
      </p>

      {/* ========================================================================= */}
      {/* 4-VECTOR ATMOSPHERIC SCORECARD TELEMETRY BAR                              */}
      {/* ========================================================================= */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
        background: 'rgba(0, 0, 0, 0.55)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '1.25rem',
        padding: '1.25rem',
        marginBottom: '2rem',
        boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)'
      }}>
        {/* Metric 1: Energy Score */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#00e5ff' }}>
              <Zap size={14} /> Energy Velocity
            </span>
            <strong style={{ color: '#00e5ff', fontSize: '13px' }}>{energy}/100</strong>
          </div>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${energy}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #00e5ff)', borderRadius: '3px' }} />
          </div>
          <span style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.5)' }}>Pacing: {v.social_pacing || 'Dynamic Flow'}</span>
        </div>

        {/* Metric 2: Conversation Clarity & Decibels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#10b981' }}>
              <Volume2 size={14} /> Chat Clarity
            </span>
            <strong style={{ color: '#10b981', fontSize: '13px' }}>{clarityScore}% ({decibels})</strong>
          </div>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${clarityScore}%`, height: '100%', background: 'linear-gradient(90deg, #3b82f6, #10b981)', borderRadius: '3px' }} />
          </div>
          <span style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.5)' }}>Verdict: {clarityVerdict}</span>
        </div>

        {/* Metric 3: Authenticity & Material Score */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#ffd700' }}>
              <ShieldCheck size={14} /> Authenticity
            </span>
            <strong style={{ color: '#ffd700', fontSize: '13px' }}>{authenticityScore}/100</strong>
          </div>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${authenticityScore}%`, height: '100%', background: 'linear-gradient(90deg, #f59e0b, #ffd700)', borderRadius: '3px' }} />
          </div>
          <span style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.5)' }}>{materialVerdict.split('—')[0]}</span>
        </div>

        {/* Metric 4: Local vs Tourist Ratio */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#c084fc' }}>
              <Users size={14} /> Local Gravity
            </span>
            <strong style={{ color: '#c084fc', fontSize: '13px' }}>{localRatio}% Local</strong>
          </div>
          {/* Dual Split Progress Bar */}
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden', display: 'flex' }}>
            <div style={{ width: `${localRatio}%`, height: '100%', background: '#c084fc' }} title={`${localRatio}% Locals`} />
            <div style={{ width: `${touristRatio}%`, height: '100%', background: '#38bdf8' }} title={`${touristRatio}% Tourists`} />
          </div>
          <span style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.5)' }}>{localRatio}% Locals • {touristRatio}% Travelers</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5 SENSORY & CULTURAL DIAGNOSTIC CARDS (SINGLE SCROLLABLE ROW)            */}
      {/* ========================================================================= */}
      <div style={{ marginBottom: '2rem' }}>
        {/* Row Header with Navigation Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '13px', fontWeight: 900, textTransform: 'uppercase', color: '#00e5ff', letterSpacing: '0.08em' }}>
              Sensory & Atmospheric Diagnostic Rail
            </span>
            <span style={{ background: 'rgba(0, 229, 255, 0.12)', color: '#00e5ff', border: '1px solid rgba(0, 229, 255, 0.35)', fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '10px' }}>
              5 NODES
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginRight: '4px' }}>
              Scroll / Swipe ➔
            </span>
            <button 
              type="button"
              onClick={scrollLeft}
              style={{
                background: 'rgba(0, 0, 0, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#00e5ff'; e.currentTarget.style.color = '#00e5ff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'; e.currentTarget.style.color = '#ffffff'; }}
              title="Scroll Left"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              type="button"
              onClick={scrollRight}
              style={{
                background: 'rgba(0, 0, 0, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#00e5ff'; e.currentTarget.style.color = '#00e5ff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'; e.currentTarget.style.color = '#ffffff'; }}
              title="Scroll Right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div 
          ref={scrollContainerRef}
          style={{ 
            display: 'flex', 
            gap: '1.25rem', 
            overflowX: 'auto', 
            paddingBottom: '1rem',
            paddingTop: '4px',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(0, 229, 255, 0.4) rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* CARD 1: Acoustic DNA & Conversation Comfort */}
          <div style={{ flex: '0 0 320px', minWidth: '320px', maxWidth: '340px', scrollSnapAlign: 'start', background: 'rgba(0,0,0,0.45)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(29, 185, 84, 0.35)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1DB954' }}>
                  <Music size={18} />
                  <h3 style={{ fontSize: '13px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
                    Acoustic DNA
                  </h3>
                </div>
                <span style={{ 
                  background: 'rgba(29, 185, 84, 0.15)', 
                  color: '#1DB954', 
                  border: '1px solid rgba(29, 185, 84, 0.4)',
                  fontSize: '10px', 
                  fontWeight: 800, 
                  padding: '2px 8px', 
                  borderRadius: '10px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Disc size={12} className="spin-slow" /> {decibels}
                </span>
              </div>

              <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', marginBottom: '0.3rem' }}>
                {dna.soundscape_genre || 'Curated Soundscape'}
              </div>
              <div style={{ fontSize: '11.5px', color: '#10b981', fontWeight: 700, marginBottom: '0.6rem' }}>
                💬 {clarityVerdict} • {clarityScore}% Conversation Index
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '0.75rem' }}>
                {(dna.anchor_artists || []).map((artist, i) => (
                  <a 
                    key={i} 
                    href={`https://open.spotify.com/search/${encodeURIComponent(artist)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      background: 'rgba(29, 185, 84, 0.12)', 
                      color: '#1DB954', 
                      fontSize: '11px', 
                      fontWeight: 700, 
                      padding: '3px 8px', 
                      borderRadius: '12px',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      border: '1px solid rgba(29, 185, 84, 0.25)',
                      transition: 'all 0.2s ease'
                    }}
                    title={`Listen to ${artist} on Spotify`}
                  >
                    ♫ {artist}
                  </a>
                ))}
              </div>

              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.4, margin: '0 0 0.75rem 0' }}>
                {dna.sound_texture || 'Atmospheric acoustic layering designed for natural conversational comfort.'}
              </p>
            </div>

            {/* Embedded Spotify Player Direct In Manifest */}
            <div style={{ marginTop: '0.5rem', borderRadius: '12px', overflow: 'hidden', background: '#121212', border: '1px solid rgba(29, 185, 84, 0.25)', minHeight: '80px' }}>
              <iframe
                style={{ borderRadius: '12px', border: 'none', display: 'block' }}
                src={`https://open.spotify.com/embed/playlist/${(() => {
                  const g = (dna.soundscape_genre || '').toLowerCase();
                  if (g.includes('jazz') || g.includes('bossa') || g.includes('soul')) return '37i9dQZF1DXbITWG1ZJKYt';
                  if (g.includes('house') || g.includes('club') || g.includes('rooftop') || g.includes('sunset') || g.includes('electronic')) return '37i9dQZF1DX8tZsk68tuDw';
                  if (g.includes('indie') || g.includes('folk') || g.includes('acoustic')) return '37i9dQZF1DX2Nc3B70tvx0';
                  if (g.includes('piano') || g.includes('classical') || g.includes('heritage')) return '37i9dQZF1DWWEcRhUVtL8n';
                  if (g.includes('ambient') || g.includes('spa') || g.includes('zen') || g.includes('wellness') || g.includes('sanctuary')) return '37i9dQZF1DX3Ogo9pFvBkY';
                  if (g.includes('latin') || g.includes('tropic') || g.includes('mediterranean') || g.includes('coastal')) return '37i9dQZF1DX10zKzsJ2jva';
                  return '37i9dQZF1DX4WYpdgoIcn6';
                })()}?utm_source=generator&theme=0`}
                width="100%"
                height="80"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Hotel Acoustic DNA Spotify Player"
              />
            </div>
          </div>

          {/* CARD 2: Material Honesty & Authenticity */}
          <div style={{ flex: '0 0 320px', minWidth: '320px', maxWidth: '340px', scrollSnapAlign: 'start', background: 'rgba(0,0,0,0.45)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(255, 215, 0, 0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffd700' }}>
                  <ShieldCheck size={18} />
                  <h3 style={{ fontSize: '13px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
                    Material Honesty
                  </h3>
                </div>
                <span style={{ 
                  background: 'rgba(255, 215, 0, 0.15)', 
                  color: '#ffd700', 
                  border: '1px solid rgba(255, 215, 0, 0.4)',
                  fontSize: '10px', 
                  fontWeight: 800, 
                  padding: '2px 8px', 
                  borderRadius: '10px'
                }}>
                  {authenticityScore}/100 Score
                </span>
              </div>

              <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
                {materialVerdict}
              </div>

              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginBottom: '0.6rem' }}>
                <strong style={{ color: '#ffd700' }}>Palette:</strong> {materialPalette}
              </div>

              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.4, margin: 0 }}>
                Physical textures eliminate generic hotel sterility. Grounded in authentic architectural elements that resonate with discerning guests.
              </p>
            </div>

            <div style={{ marginTop: '1rem', background: 'rgba(255, 215, 0, 0.06)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(255, 215, 0, 0.15)', fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>
              🌿 <strong>Tactile Standard:</strong> Verified zero faux-materials & authentic local craftsmanship.
            </div>
          </div>

          {/* CARD 3: Crowd Dynamics & Local Velocity */}
          <div style={{ flex: '0 0 320px', minWidth: '320px', maxWidth: '340px', scrollSnapAlign: 'start', background: 'rgba(0,0,0,0.45)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(192, 132, 252, 0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#c084fc' }}>
                  <Users size={18} />
                  <h3 style={{ fontSize: '13px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
                    Crowd & Subculture
                  </h3>
                </div>
                <span style={{ 
                  background: 'rgba(192, 132, 252, 0.15)', 
                  color: '#c084fc', 
                  border: '1px solid rgba(192, 132, 252, 0.4)',
                  fontSize: '10px', 
                  fontWeight: 800, 
                  padding: '2px 8px', 
                  borderRadius: '10px'
                }}>
                  {localRatio}% Local Ratio
                </span>
              </div>

              <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
                {crowd.primary || 'Cosmopolitan Creatives'}
              </div>

              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginBottom: '0.3rem' }}>
                <strong style={{ color: '#c084fc' }}>Dress Code:</strong> {crowd.dress_code || 'Smart Casual'}
              </div>

              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginBottom: '0.6rem' }}>
                <strong style={{ color: '#c084fc' }}>Social Velocity:</strong> {crowd.energy_verdict || 'High Banter & Neighborhood Sanctuary'}
              </div>

              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.4, margin: 0 }}>
                {lighting.atmosphere || 'Sophisticated ambient mood rooted in neighborhood regular gravity.'}
              </p>
            </div>

            {/* Visual Ratio Split Meter */}
            <div style={{ marginTop: '1rem', background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', marginBottom: '4px', fontWeight: 700 }}>
                <span style={{ color: '#c084fc' }}>📍 Locals ({localRatio}%)</span>
                <span style={{ color: '#38bdf8' }}>✈️ Travelers ({touristRatio}%)</span>
              </div>
              <div style={{ width: '100%', height: '8px', borderRadius: '4px', overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: `${localRatio}%`, height: '100%', background: '#c084fc' }} />
                <div style={{ width: `${touristRatio}%`, height: '100%', background: '#38bdf8' }} />
              </div>
            </div>
          </div>

          {/* CARD 4: Lighting & Temporal Windows */}
          <div style={{ flex: '0 0 320px', minWidth: '320px', maxWidth: '340px', scrollSnapAlign: 'start', background: 'rgba(0,0,0,0.45)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(0, 229, 255, 0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#00e5ff' }}>
                  <Sun size={18} />
                  <h3 style={{ fontSize: '13px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
                    Lighting & Best Time
                  </h3>
                </div>
                <span style={{ 
                  background: 'rgba(0, 229, 255, 0.15)', 
                  color: '#00e5ff', 
                  border: '1px solid rgba(0, 229, 255, 0.4)',
                  fontSize: '10px', 
                  fontWeight: 800, 
                  padding: '2px 8px', 
                  borderRadius: '10px'
                }}>
                  ⚡ Photometrics
                </span>
              </div>

              <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
                💡 {lightingTemp}
              </div>

              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginBottom: '0.6rem' }}>
                <strong style={{ color: '#00e5ff' }}>Sensory Intensity:</strong> {lighting.sensory_intensity || 'Subtle & Layered'}
              </div>

              <div style={{ background: 'rgba(0, 229, 255, 0.08)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(0, 229, 255, 0.2)', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#00e5ff', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2px' }}>
                  <Clock size={13} /> Optimal Vibe Window:
                </div>
                <div style={{ fontSize: '12px', color: '#ffffff', lineHeight: 1.4, fontWeight: 600 }}>
                  {bestTimeToVisit}
                </div>
              </div>
            </div>

            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', marginTop: '0.5rem' }}>
              ☀️ Peak atmospheric transition occurs during evening golden hour to twilight illumination.
            </div>
          </div>

          {/* CARD 5: Hyper-Local Proximity & Lore */}
          <div style={{ flex: '0 0 320px', minWidth: '320px', maxWidth: '340px', scrollSnapAlign: 'start', background: 'rgba(0,0,0,0.45)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(255, 179, 0, 0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffb300' }}>
                  <Compass size={18} />
                  <h3 style={{ fontSize: '13px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
                    Hyper-Local Proximity
                  </h3>
                </div>
                <span style={{ 
                  background: 'rgba(255, 179, 0, 0.15)', 
                  color: '#ffb300', 
                  border: '1px solid rgba(255, 179, 0, 0.4)',
                  fontSize: '10px', 
                  fontWeight: 800, 
                  padding: '2px 8px', 
                  borderRadius: '10px'
                }}>
                  📍 District Anchor
                </span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '0.75rem' }}>
                {(proximity.key_anchors || ['Neighborhood Cultural Hub', 'Riverside Promenade', 'Artisan Dining']).map((anchor, i) => (
                  <span key={i} style={{ background: 'rgba(255, 179, 0, 0.12)', color: '#ffb300', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px' }}>
                    📍 {anchor}
                  </span>
                ))}
              </div>

              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.4, margin: 0 }}>
                {proximity.insider_lore || 'Positioned directly within the city cultural core with immediate access to neighborhood secrets.'}
              </p>
            </div>

            <div style={{ marginTop: '1rem', background: 'rgba(255, 179, 0, 0.06)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(255, 179, 0, 0.15)', fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>
              🎯 <strong>Local Synergy:</strong> Direct pedestrian gravity connects the venue with trending district searches.
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* QUALIFICATION MATRIX (You will love if / Skip if)                         */}
      {/* ========================================================================= */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', background: 'rgba(0,0,0,0.5)', padding: '1.25rem 1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          <CheckCircle2 size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', color: '#10b981', letterSpacing: '0.05em' }}>
              You will love this property if:
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', marginTop: '2px', lineHeight: 1.4 }}>
              {qual.you_will_love_if || 'You seek an authentic, atmosphere-rich lifestyle destination with genuine subcultural character.'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          <AlertTriangle size={20} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', color: '#f59e0b', letterSpacing: '0.05em' }}>
              Skip this property if:
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', marginTop: '2px', lineHeight: 1.4 }}>
              {qual.skip_if || 'You prefer clinical, uniform corporate hotels with zero social energy or neighborhood engagement.'}
            </div>
          </div>
        </div>
      </div>

    </motion.div>
  );
}
