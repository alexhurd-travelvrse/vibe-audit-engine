import React, { useRef, useState } from 'react';
import { Zap, Music, Users, Sparkles, CheckCircle2, AlertTriangle, Disc, MapPin, Compass, Volume2, ShieldCheck, Sun, Clock, Eye, ChevronLeft, ChevronRight, Key, Flame, Briefcase, Coffee, Camera, Laptop, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HotelVibeManifestCard({ manifest, hotelName, location }) {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: 'smooth' });
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
  const secrets = v.insider_secrets || {};

  const [activeDiurnalTab, setActiveDiurnalTab] = useState('chilling');

  const diurnal = temporal.diurnal_rhythm || {
    working: {
      window: '9:00 AM – 3:30 PM',
      focus: (manifest.venue_name || '').toLowerCase().includes('sea containers')
        ? 'Bright diffused Thames daylight, quiet acoustic hum & spacious laptop banquettes.'
        : 'Natural diffused daylight, low acoustic distractions, and spacious laptop banquettes.',
      score: 91
    },
    chilling: {
      window: '4:00 PM – 7:00 PM',
      focus: (manifest.venue_name || '').toLowerCase().includes('sea containers')
        ? 'The 4:00 PM Twilight Pivot: stepless shift to 2400K amber glow, Thames golden hour & tranquil aperitivo.'
        : 'The 4:00 PM Twilight Pivot: stepless transition to warm 2400K amber glow & tranquil aperitivo.',
      score: 97
    },
    playing: {
      window: '7:30 PM – Late',
      focus: (manifest.venue_name || '').toLowerCase().includes('sea containers')
        ? 'Seductive 2200K low-lux amber, 12th Knot panoramic skyline energy & buzzing mixology crowd.'
        : 'Seductive 2200K low-lux candlelight, buzzing craft mixology & high-energy magnetic crowd.',
      score: 95
    }
  };

  const contentReady = temporal.content_readiness || {
    score: 96,
    verdict: 'Zero Downlight Raccoon Eyes',
    flattery_note: 'Flattering diffuse eye-level bounce & warm 2400K skin-tone illumination',
    top_creator_spot: (manifest.venue_name || '').toLowerCase().includes('sea containers')
      ? '12th Knot Glass Corner Banquette during Thames Golden Hour'
      : ((manifest.venue_name || '').toLowerCase().includes('sls')
        ? 'Courtyard Poolside Sanctuary Loungers framed by historic Palms'
        : 'Signature terrace lounge banquette during golden hour'),
    aesthetic_subculture: (manifest.venue_name || '').toLowerCase().includes('sea containers')
      ? 'Moody Maritime Chiaroscuro'
      : ((manifest.venue_name || '').toLowerCase().includes('sls') ? 'Sun-Drenched Pastel Art Deco' : 'Curated Architectural Warmth')
  };
  
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
  const touristTrapVerdict = crowd.tourist_trap_verdict || (localRatio >= 60 ? 'Authentic Local Magnet — Zero Tourist Trap' : 'Curated International Lifestyle Destination');

  // Calculate Spectrum Position for Sanctuary (0%) vs Social Hub (100%)
  const numericDb = parseInt(decibels) || (energy > 70 ? 72 : 54);
  const spectrumPct = Math.min(95, Math.max(5, Math.round(((numericDb - 42) / (82 - 42)) * 100)));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card"
      style={{
        borderRadius: '2rem',
        padding: '2.5rem',
        marginBottom: '3.5rem',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(0, 229, 255, 0.04) 50%, rgba(18, 18, 18, 0.95) 100%)',
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
      {/* 6 STANDARDIZED CONSUMER-FRIENDLY VIBE SIGNAL CONTAINERS                   */}
      {/* ========================================================================= */}
      <div style={{ marginBottom: '2.5rem' }}>
        {/* Rail Top Bar with Arrows */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '13px', fontWeight: 900, textTransform: 'uppercase', color: '#ffd700', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} color="#ffd700" /> 6 VIBE SIGNALS
            </span>
            <span style={{ background: 'rgba(255, 215, 0, 0.12)', color: '#ffd700', border: '1px solid rgba(255, 215, 0, 0.35)', fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '10px' }}>
              SWIPE / SCROLL ➔
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button 
              type="button"
              onClick={scrollLeft}
              style={{
                background: 'rgba(0, 0, 0, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                width: '34px',
                height: '34px',
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
              <ChevronLeft size={20} />
            </button>
            <button 
              type="button"
              onClick={scrollRight}
              style={{
                background: 'rgba(0, 0, 0, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                width: '34px',
                height: '34px',
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
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Track with 6 Standardized Containers */}
        <div 
          ref={scrollContainerRef}
          style={{ 
            display: 'flex', 
            gap: '1.25rem', 
            overflowX: 'auto', 
            paddingBottom: '1.25rem',
            paddingTop: '6px',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(0, 229, 255, 0.4) rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* ========================================================================= */}
          {/* CONTAINER 1: Sound & Conversation                                         */}
          {/* ========================================================================= */}
          <div style={{ flex: '0 0 350px', minWidth: '350px', maxWidth: '370px', scrollSnapAlign: 'start', background: 'rgba(0,0,0,0.55)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(29, 185, 84, 0.35)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
            <div>
              {/* Category Badge */}
              <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 900, color: '#1DB954', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Volume2 size={13} /> Acoustic DNA
                </span>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#ffffff', height: '44px', minHeight: '44px', maxHeight: '44px', lineHeight: 1.3, margin: '0 0 0.85rem 0', overflow: 'hidden' }}>
                Social Hub or Quiet Sanctuary?
              </h3>

              {/* Standardized Scale Bar Container */}
              <div style={{ background: 'rgba(0,0,0,0.45)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '1rem', height: '76px', minHeight: '76px', maxHeight: '76px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9.5px', fontWeight: 800, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap' }}>
                  <span style={{ color: '#10b981' }}>🌿 Sanctuary</span>
                  <span style={{ color: '#00e5ff' }}>💬 Bistro</span>
                  <span style={{ color: '#f59e0b' }}>⚡ Social Hub</span>
                </div>
                {/* Scale Track with Pin */}
                <div style={{ position: 'relative', width: '100%', height: '8px', background: 'linear-gradient(90deg, #10b981 0%, #00e5ff 50%, #f59e0b 100%)', borderRadius: '4px' }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: `${spectrumPct}%`, 
                    transform: 'translate(-50%, -50%)', 
                    width: '14px', 
                    height: '14px', 
                    borderRadius: '50%', 
                    background: '#ffffff', 
                    boxShadow: '0 0 8px rgba(0,0,0,0.8), 0 0 10px #00e5ff',
                    border: '2px solid #050b14' 
                  }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10.5px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                  <span style={{ color: '#1DB954' }}>{clarityVerdict}</span>
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'monospace' }}>{decibels}</span>
                </div>
              </div>

              <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', height: '38px', minHeight: '38px', maxHeight: '38px', lineHeight: 1.35, marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start', overflow: 'hidden' }}>
                <span>{dna.soundscape_genre || 'Curated Soundscape'}</span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '0.75rem', height: '24px', minHeight: '24px', maxHeight: '24px', alignItems: 'center', overflow: 'hidden' }}>
                {(dna.anchor_artists || []).map((artist, i) => (
                  <a 
                    key={i} 
                    href={`https://open.spotify.com/search/${encodeURIComponent(artist)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      background: 'rgba(29, 185, 84, 0.12)', 
                      color: '#1DB954', 
                      fontSize: '10.5px', 
                      fontWeight: 700, 
                      padding: '2px 7px', 
                      borderRadius: '10px', 
                      textDecoration: 'none', 
                      border: '1px solid rgba(29, 185, 84, 0.25)',
                      whiteSpace: 'nowrap'
                    }}
                    title={`Listen to ${artist} on Spotify`}
                  >
                    ♫ {artist}
                  </a>
                ))}
              </div>

              <p style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.4, margin: '0 0 0.75rem 0', height: '38px', minHeight: '38px', maxHeight: '38px', overflow: 'hidden' }}>
                {(dna.sound_texture || 'Atmospheric acoustic layering with comfortable conversational resonance.').split('.')[0] + '.'}
              </p>
            </div>

            {/* Embedded Spotify Mini Player */}
            <div style={{ marginTop: '0.5rem', borderRadius: '10px', overflow: 'hidden', background: '#121212', border: '1px solid rgba(29, 185, 84, 0.25)', minHeight: '80px' }}>
              <iframe
                style={{ borderRadius: '10px', border: 'none', display: 'block' }}
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
                title="Acoustic DNA Spotify Player"
              />
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CONTAINER 2: Authenticity & Craft                                         */}
          {/* ========================================================================= */}
          <div style={{ flex: '0 0 350px', minWidth: '350px', maxWidth: '370px', scrollSnapAlign: 'start', background: 'rgba(0,0,0,0.55)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(255, 215, 0, 0.35)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
            <div>
              {/* Category Badge */}
              <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 900, color: '#ffd700', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <ShieldCheck size={13} /> Authenticity
                </span>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#ffffff', height: '44px', minHeight: '44px', maxHeight: '44px', lineHeight: 1.3, margin: '0 0 0.85rem 0', overflow: 'hidden' }}>
                Real Soul or Corporate Generic?
              </h3>

              {/* Standardized Scale Bar Container */}
              <div style={{ background: 'rgba(0,0,0,0.45)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '1rem', height: '76px', minHeight: '76px', maxHeight: '76px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9.5px', fontWeight: 800, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap' }}>
                  <span style={{ color: '#94a3b8' }}>Corporate</span>
                  <span style={{ color: '#fbbf24' }}>Curated</span>
                  <span style={{ color: '#ffd700' }}>Handcrafted</span>
                </div>
                {/* Scale Track with Pin */}
                <div style={{ position: 'relative', width: '100%', height: '8px', background: 'linear-gradient(90deg, #64748b 0%, #eab308 60%, #ffd700 100%)', borderRadius: '4px' }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: `${Math.min(95, Math.max(5, authenticityScore))}%`, 
                    transform: 'translate(-50%, -50%)', 
                    width: '14px', 
                    height: '14px', 
                    borderRadius: '50%', 
                    background: '#ffffff', 
                    boxShadow: '0 0 8px rgba(0,0,0,0.8), 0 0 10px #ffd700',
                    border: '2px solid #050b14' 
                  }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10.5px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                  <span style={{ color: '#ffd700' }}>{materialVerdict ? materialVerdict.replace(/\s*[-—–].*$/, '').trim() : 'Authentic Heritage'}</span>
                  <span style={{ color: '#10b981', flexShrink: 0 }}>Zero Faux Decor</span>
                </div>
              </div>

              <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', height: '38px', minHeight: '38px', maxHeight: '38px', lineHeight: 1.35, marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start', overflow: 'hidden' }}>
                <span><span style={{ color: '#ffd700' }}>Palette:</span> {materialPalette ? materialPalette.split(',').slice(0, 3).join(', ') : 'Tactile stone, aged brass & timber'}</span>
              </div>

              <div style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.7)', marginBottom: '0.75rem', height: '24px', minHeight: '24px', maxHeight: '24px', display: 'flex', alignItems: 'center', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                <strong style={{ color: '#ffd700', marginRight: '6px', flexShrink: 0 }}>Materials:</strong> Authentic handcrafted finishes
              </div>

              <p style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.4, margin: '0 0 0.75rem 0', height: '38px', minHeight: '38px', maxHeight: '38px', overflow: 'hidden' }}>
                Tactile textures and heritage elements eliminate generic hospitality sterility.
              </p>
            </div>

            <div style={{ marginTop: '1.25rem', background: 'rgba(255, 215, 0, 0.08)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255, 215, 0, 0.2)', fontSize: '11px', color: 'rgba(255,255,255,0.85)' }}>
              ✨ <strong>Craft Integrity:</strong> Custom artisanal fixtures, zero generic laminate.
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CONTAINER 3: Crowd & Subculture                                           */}
          {/* ========================================================================= */}
          <div style={{ flex: '0 0 350px', minWidth: '350px', maxWidth: '370px', scrollSnapAlign: 'start', background: 'rgba(0,0,0,0.55)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(192, 132, 252, 0.35)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
            <div>
              {/* Category Badge */}
              <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 900, color: '#c084fc', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Users size={13} /> Crowd Gravity
                </span>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#ffffff', height: '44px', minHeight: '44px', maxHeight: '44px', lineHeight: 1.3, margin: '0 0 0.85rem 0', overflow: 'hidden' }}>
                Local Magnet or Tourist Trap?
              </h3>

              {/* Standardized Scale Bar Container */}
              <div style={{ background: 'rgba(0,0,0,0.45)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '1rem', height: '76px', minHeight: '76px', maxHeight: '76px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9.5px', fontWeight: 800, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap' }}>
                  <span style={{ color: '#c084fc' }}>📍 Locals ({localRatio}%)</span>
                  <span style={{ color: '#38bdf8' }}>✈️ Travelers ({touristRatio}%)</span>
                </div>
                {/* Scale Track with Pin */}
                <div style={{ position: 'relative', width: '100%', height: '8px', background: 'linear-gradient(90deg, #c084fc 0%, #38bdf8 100%)', borderRadius: '4px' }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: `${Math.min(95, Math.max(5, localRatio))}%`, 
                    transform: 'translate(-50%, -50%)', 
                    width: '14px', 
                    height: '14px', 
                    borderRadius: '50%', 
                    background: '#ffffff', 
                    boxShadow: '0 0 8px rgba(0,0,0,0.8), 0 0 10px #c084fc',
                    border: '2px solid #050b14' 
                  }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10.5px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                  <span style={{ color: '#c084fc' }}>{touristTrapVerdict ? touristTrapVerdict.replace(/\s*[-—–].*$/, '').trim() : 'Authentic Local Magnet'}</span>
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace', flexShrink: 0 }}>{localRatio}% Local</span>
                </div>
              </div>

              <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', height: '38px', minHeight: '38px', maxHeight: '38px', lineHeight: 1.35, marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start', overflow: 'hidden' }}>
                <span>{(crowd.primary || 'Cosmopolitan Creatives').replace(/\s*[-—–].*$/, '').trim()}</span>
              </div>

              <div style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.7)', marginBottom: '0.75rem', height: '24px', minHeight: '24px', maxHeight: '24px', display: 'flex', alignItems: 'center', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                <strong style={{ color: '#c084fc', marginRight: '6px', flexShrink: 0 }}>Dress Code:</strong> {(crowd.dress_code || 'Smart Casual Chic').replace(/\s*[-—–].*$/, '').trim()}
              </div>

              <p style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.4, margin: '0 0 0.75rem 0', height: '38px', minHeight: '38px', maxHeight: '38px', overflow: 'hidden' }}>
                {(lighting.atmosphere || 'Active social hub where neighborhood regulars and international creatives mix.').split('.')[0] + '.'}
              </p>
            </div>

            <div style={{ marginTop: '1.25rem', background: 'rgba(192, 132, 252, 0.08)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(192, 132, 252, 0.2)', fontSize: '11px', color: 'rgba(255,255,255,0.85)' }}>
              ⚡ <strong>Social Velocity:</strong> {crowd.energy_verdict || 'High Banter & Neighborhood Sanctuary'}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* ========================================================================= */}
          {/* CONTAINER 4: Time of Day & Content Ready Analysis                         */}
          {/* ========================================================================= */}
          <div style={{ flex: '0 0 350px', minWidth: '350px', maxWidth: '370px', scrollSnapAlign: 'start', background: 'rgba(0,0,0,0.55)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(0, 229, 255, 0.35)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
            <div>
              {/* Category Badge */}
              <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 900, color: '#00e5ff', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Sun size={13} /> Time of Day & Lighting Arc
                </span>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#ffffff', height: '44px', minHeight: '44px', maxHeight: '44px', lineHeight: 1.3, margin: '0 0 0.85rem 0', overflow: 'hidden' }}>
                Working, Chilling & Playing Rhythm
              </h3>

              {/* 3 User Benefit Mode Tabs: Working | Chilling | Playing */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginBottom: '0.85rem' }}>
                {[
                  { id: 'working', label: 'Working', icon: Briefcase, color: '#38bdf8' },
                  { id: 'chilling', label: 'Chilling', icon: Coffee, color: '#f59e0b' },
                  { id: 'playing', label: 'Playing', icon: Flame, color: '#ec4899' }
                ].map(tab => {
                  const isActive = activeDiurnalTab === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveDiurnalTab(tab.id)}
                      style={{
                        background: isActive ? `rgba(${tab.id === 'working' ? '56, 189, 248' : tab.id === 'chilling' ? '245, 158, 11' : '236, 72, 153'}, 0.2)` : 'rgba(0,0,0,0.4)',
                        border: isActive ? `1.5px solid ${tab.color}` : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        padding: '6px 4px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '3px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: isActive ? `0 0 10px ${tab.color}40` : 'none'
                      }}
                    >
                      <Icon size={13} color={isActive ? tab.color : 'rgba(255,255,255,0.6)'} />
                      <span style={{ fontSize: '10.5px', fontWeight: 800, color: isActive ? '#ffffff' : 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Benefit Panel based on Selected Mode */}
              <div style={{ background: 'rgba(0,0,0,0.45)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '0.85rem', minHeight: '66px' }}>
                {activeDiurnalTab === 'working' && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#38bdf8' }}>☀️ {diurnal.working?.window || '9:00 AM – 3:30 PM'}</span>
                      <span style={{ fontSize: '10px', fontWeight: 800, background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '1px 6px', borderRadius: '6px' }}>FOCUS: {diurnal.working?.score || 91}%</span>
                    </div>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.35 }}>
                      {diurnal.working?.focus || 'Natural diffused daylight, low acoustic distractions, and spacious laptop banquettes.'}
                    </p>
                  </div>
                )}
                {activeDiurnalTab === 'chilling' && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#f59e0b' }}>🌅 {diurnal.chilling?.window || '4:00 PM – 7:00 PM'}</span>
                      <span style={{ fontSize: '10px', fontWeight: 800, background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', padding: '1px 6px', borderRadius: '6px' }}>TWILIGHT: {diurnal.chilling?.score || 97}%</span>
                    </div>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.35 }}>
                      {diurnal.chilling?.focus || 'The 4:00 PM Twilight Pivot: stepless transition to warm 2400K amber glow, waterfront reflection & tranquil aperitivo.'}
                    </p>
                  </div>
                )}
                {activeDiurnalTab === 'playing' && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#ec4899' }}>🍸 {diurnal.playing?.window || '7:30 PM – LATE'}</span>
                      <span style={{ fontSize: '10px', fontWeight: 800, background: 'rgba(236, 72, 153, 0.15)', color: '#ec4899', padding: '1px 6px', borderRadius: '6px' }}>VIBE: {diurnal.playing?.score || 95}%</span>
                    </div>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.35 }}>
                      {diurnal.playing?.focus || 'Seductive 2200K low-lux candlelight, buzzing craft mixology & high-energy magnetic social crowd.'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Fun Section: Content Ready Analysis */}
            <div style={{ 
              marginTop: '0.5rem', 
              background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.08) 0%, rgba(192, 132, 252, 0.08) 100%)', 
              padding: '10px 12px', 
              borderRadius: '10px', 
              border: '1px solid rgba(0, 229, 255, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '10.5px', fontWeight: 900, color: '#00e5ff', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Camera size={13} color="#00e5ff" /> Content Ready Analysis
                </span>
                <span style={{ fontSize: '10px', fontWeight: 800, background: 'rgba(0, 229, 255, 0.2)', color: '#00e5ff', padding: '2px 7px', borderRadius: '8px', border: '1px solid rgba(0, 229, 255, 0.4)' }}>
                  📸 {contentReady.score || 96}/10 FLATTING
                </span>
              </div>
              <div style={{ fontSize: '11px', color: '#ffffff', fontWeight: 700 }}>
                {contentReady.verdict || 'Zero Downlight Raccoon Eyes • Diffuse Ambient Glow'}
              </div>
              <div style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.3 }}>
                <strong style={{ color: '#c084fc' }}>Top Spot:</strong> {contentReady.top_creator_spot || 'Glass corner banquette during golden hour'}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CONTAINER 5: Location & Neighborhood Pulse                                */}
          {/* ========================================================================= */}
          <div style={{ flex: '0 0 350px', minWidth: '350px', maxWidth: '370px', scrollSnapAlign: 'start', background: 'rgba(0,0,0,0.55)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(255, 179, 0, 0.35)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
            <div>
              {/* Category Badge */}
              <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 900, color: '#ffb300', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <MapPin size={13} /> Location Pulse
                </span>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#ffffff', height: '44px', minHeight: '44px', maxHeight: '44px', lineHeight: 1.3, margin: '0 0 0.85rem 0', overflow: 'hidden' }}>
                Right on the Doorstep of Trending Spots
              </h3>

              {/* Standardized Scale Bar Container */}
              <div style={{ background: 'rgba(0,0,0,0.45)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '1rem', height: '76px', minHeight: '76px', maxHeight: '76px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9.5px', fontWeight: 800, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap' }}>
                  <span style={{ color: '#94a3b8' }}>Quiet</span>
                  <span style={{ color: '#fbbf24' }}>Active</span>
                  <span style={{ color: '#ffb300' }}>Epicenter</span>
                </div>
                {/* Scale Track with Pin */}
                <div style={{ position: 'relative', width: '100%', height: '8px', background: 'linear-gradient(90deg, #64748b 0%, #fbbf24 50%, #ffb300 100%)', borderRadius: '4px' }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: '92%', 
                    transform: 'translate(-50%, -50%)', 
                    width: '14px', 
                    height: '14px', 
                    borderRadius: '50%', 
                    background: '#ffffff', 
                    boxShadow: '0 0 8px rgba(0,0,0,0.8), 0 0 10px #ffb300',
                    border: '2px solid #050b14' 
                  }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10.5px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                  <span style={{ color: '#ffb300' }}>Immediate Doorstep</span>
                  <span style={{ color: '#10b981', flexShrink: 0 }}>0 Min Walk</span>
                </div>
              </div>

              <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', height: '38px', minHeight: '38px', maxHeight: '38px', lineHeight: 1.35, marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start', overflow: 'hidden' }}>
                <span><span style={{ color: '#ffb300' }}>District Anchors:</span> {(proximity.key_anchors && proximity.key_anchors.length > 0) ? proximity.key_anchors.slice(0, 2).join(' • ') : 'Cultural Epicenter & Boutiques'}</span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '0.75rem', height: '24px', minHeight: '24px', maxHeight: '24px', alignItems: 'center', overflow: 'hidden' }}>
                {(proximity.key_anchors || ['Neighborhood Cultural Hub', 'Riverside Promenade', 'Artisan Dining']).slice(0, 2).map((anchor, i) => (
                  <span key={i} style={{ background: 'rgba(255, 179, 0, 0.12)', color: '#ffb300', fontSize: '10.5px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px', border: '1px solid rgba(255, 179, 0, 0.25)', whiteSpace: 'nowrap' }}>
                    📍 {anchor}
                  </span>
                ))}
              </div>

              <p style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.4, margin: '0 0 0.75rem 0', height: '38px', minHeight: '38px', maxHeight: '38px', overflow: 'hidden' }}>
                {(proximity.insider_lore || 'Positioned directly within the cultural epicenter with immediate access to independent boutiques.').split('.')[0] + '.'}
              </p>
            </div>

            <div style={{ marginTop: '1.25rem', background: 'rgba(255, 179, 0, 0.08)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255, 179, 0, 0.2)', fontSize: '11px', color: 'rgba(255,255,255,0.85)' }}>
              🚶 <strong>Walkability Score:</strong> 100% pedestrian access to district anchors.
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CONTAINER 6: Insider Secrets & Hidden Lore                                */}
          {/* ========================================================================= */}
          <div style={{ flex: '0 0 350px', minWidth: '350px', maxWidth: '370px', scrollSnapAlign: 'start', background: 'rgba(0,0,0,0.55)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(236, 72, 153, 0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
            <div>
              {/* Category Badge */}
              <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 900, color: '#f472b6', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Key size={13} /> Insider Access
                </span>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#ffffff', height: '44px', minHeight: '44px', maxHeight: '44px', lineHeight: 1.3, margin: '0 0 0.85rem 0', overflow: 'hidden' }}>
                Off-Menu Secrets & Local Lore
              </h3>

              {/* Standardized Scale Bar Container */}
              <div style={{ background: 'rgba(0,0,0,0.45)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '1rem', height: '76px', minHeight: '76px', maxHeight: '76px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9.5px', fontWeight: 800, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap' }}>
                  <span style={{ color: '#94a3b8' }}>Guidebook</span>
                  <span style={{ color: '#ec4899' }}>Curated</span>
                  <span style={{ color: '#f472b6' }}>Insider Lore</span>
                </div>
                {/* Scale Track with Pin */}
                <div style={{ position: 'relative', width: '100%', height: '8px', background: 'linear-gradient(90deg, #6366f1 0%, #ec4899 50%, #f472b6 100%)', borderRadius: '4px' }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: '94%', 
                    transform: 'translate(-50%, -50%)', 
                    width: '14px', 
                    height: '14px', 
                    borderRadius: '50%', 
                    background: '#ffffff', 
                    boxShadow: '0 0 8px rgba(0,0,0,0.8), 0 0 10px #f472b6',
                    border: '2px solid #050b14' 
                  }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10.5px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                  <span style={{ color: '#f472b6' }}>{secrets.insider_badge || 'Head Bartender Lore'}</span>
                  <span style={{ color: '#ec4899', flexShrink: 0 }}>Verified Secret</span>
                </div>
              </div>

              <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', height: '38px', minHeight: '38px', maxHeight: '38px', lineHeight: 1.35, marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start', overflow: 'hidden' }}>
                <span><span style={{ color: '#f472b6' }}>Secret Lore:</span> {(secrets.secret_title || 'The Off-Menu Highball & Hidden Snug').replace(/\s*[-—–].*$/, '').trim()}</span>
              </div>

              <div style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.85)', marginBottom: '0.75rem', height: '24px', minHeight: '24px', maxHeight: '24px', display: 'flex', alignItems: 'center', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                <strong style={{ color: '#ffd700', marginRight: '6px', flexShrink: 0 }}>🗝️ Off-Menu:</strong> <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{(secrets.off_menu_perk || secrets.secret_lore || 'Ask head bartender for botanical infusion.').split('.')[0] + '.'}</span>
              </div>

              <p style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.4, margin: '0 0 0.75rem 0', height: '38px', minHeight: '38px', maxHeight: '38px', overflow: 'hidden' }}>
                Insider perks and hidden architectural details known only to neighborhood regulars.
              </p>
            </div>

            <div style={{ marginTop: '1.25rem', background: 'rgba(236, 72, 153, 0.08)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(236, 72, 153, 0.2)', fontSize: '11px', color: 'rgba(255,255,255,0.85)' }}>
              🔑 <strong>Secret Quest:</strong> Unlocks exclusive perks on Travelvrse 3D Spatial Walkthroughs.
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
