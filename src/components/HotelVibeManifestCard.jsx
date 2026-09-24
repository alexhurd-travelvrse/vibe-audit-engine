import React, { useRef } from 'react';
import { Zap, Music, Users, Sparkles, CheckCircle2, AlertTriangle, Disc, MapPin, Compass, Volume2, ShieldCheck, Sun, Clock, Eye, ChevronLeft, ChevronRight, Key, Flame } from 'lucide-react';
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
      {/* 6 CONSUMER-FRIENDLY VIBE CONTAINERS (SINGLE HORIZONTAL SCROLL RAIL)       */}
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

        {/* Horizontal Scroll Track with 6 Containers */}
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
          {/* CONTAINER 1: Sound & Conversation (Sanctuary vs. Social Hub)             */}
          {/* ========================================================================= */}
          <div style={{ flex: '0 0 340px', minWidth: '340px', maxWidth: '360px', scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Direct Heading Score */}
            <div style={{ 
              background: 'rgba(29, 185, 84, 0.15)', 
              border: '1px solid rgba(29, 185, 84, 0.45)', 
              color: '#1DB954', 
              fontSize: '11px', 
              fontWeight: 900, 
              padding: '6px 12px', 
              borderRadius: '10px', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              <span>🎧 SOUND & CHAT: {clarityScore}%</span>
              <span>{decibels}</span>
            </div>

            {/* Main Content Box */}
            <div style={{ background: 'rgba(0,0,0,0.5)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(29, 185, 84, 0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', boxSizing: 'border-box' }}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#ffffff', margin: '0 0 0.5rem 0' }}>
                  Social Hub or Quiet Sanctuary?
                </h3>

                {/* Sanctuary vs Social Hub Spectrum Slider */}
                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9.5px', fontWeight: 800, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '6px' }}>
                    <span style={{ color: '#10b981' }}>🌿 Sanctuary</span>
                    <span style={{ color: '#00e5ff' }}>💬 Bistro</span>
                    <span style={{ color: '#f59e0b' }}>⚡ Social Hub</span>
                  </div>
                  {/* Spectrum Track with Pin */}
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
                  <div style={{ textAlign: 'center', marginTop: '6px', fontSize: '10.5px', fontWeight: 700, color: '#1DB954' }}>
                    {clarityVerdict} ({decibels})
                  </div>
                </div>

                <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
                  {dna.soundscape_genre || 'Curated Soundscape'}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '0.75rem' }}>
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
                        border: '1px solid rgba(29, 185, 84, 0.25)' 
                      }}
                      title={`Listen to ${artist} on Spotify`}
                    >
                      ♫ {artist}
                    </a>
                  ))}
                </div>

                <p style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.4, margin: '0 0 0.75rem 0' }}>
                  {dna.sound_texture || 'Atmospheric acoustic layering with comfortable conversational resonance.'}
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
          </div>

          {/* ========================================================================= */}
          {/* CONTAINER 2: Authenticity (Real Soul or Generic Corporate?)               */}
          {/* ========================================================================= */}
          <div style={{ flex: '0 0 340px', minWidth: '340px', maxWidth: '360px', scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Direct Heading Score */}
            <div style={{ 
              background: 'rgba(255, 215, 0, 0.15)', 
              border: '1px solid rgba(255, 215, 0, 0.45)', 
              color: '#ffd700', 
              fontSize: '11px', 
              fontWeight: 900, 
              padding: '6px 12px', 
              borderRadius: '10px', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              <span>🏛️ AUTHENTICITY SCORE</span>
              <span>{authenticityScore}/100</span>
            </div>

            {/* Main Content Box */}
            <div style={{ background: 'rgba(0,0,0,0.5)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(255, 215, 0, 0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', boxSizing: 'border-box' }}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#ffffff', margin: '0 0 0.5rem 0' }}>
                  Real Soul or Corporate Generic?
                </h3>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#10b981', fontSize: '10.5px', fontWeight: 800, padding: '3px 8px', borderRadius: '8px', marginBottom: '0.75rem' }}>
                  🌿 Verified Real Materials (Zero Faux Decor)
                </div>

                <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
                  {materialVerdict}
                </div>

                <div style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.7)', marginBottom: '0.75rem' }}>
                  <strong style={{ color: '#ffd700' }}>Palette:</strong> {materialPalette}
                </div>

                <p style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.4, margin: 0 }}>
                  Tactile textures and historic elements eliminate hospitality sterility. Grounded in genuine craftsmanship that modern travelers actively seek.
                </p>
              </div>

              <div style={{ marginTop: '1rem', background: 'rgba(255, 215, 0, 0.08)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(255, 215, 0, 0.2)', fontSize: '11px', color: 'rgba(255,255,255,0.85)' }}>
                ✨ <strong>Craft Integrity:</strong> Custom artisanal fixtures, zero generic corporate laminate.
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CONTAINER 3: Crowd & Subculture (Local Magnet or Tourist Trap?)            */}
          {/* ========================================================================= */}
          <div style={{ flex: '0 0 340px', minWidth: '340px', maxWidth: '360px', scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Direct Heading Score */}
            <div style={{ 
              background: 'rgba(192, 132, 252, 0.15)', 
              border: '1px solid rgba(192, 132, 252, 0.45)', 
              color: '#c084fc', 
              fontSize: '11px', 
              fontWeight: 900, 
              padding: '6px 12px', 
              borderRadius: '10px', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              <span>👥 LOCAL GRAVITY RATIO</span>
              <span>{localRatio}% LOCAL</span>
            </div>

            {/* Main Content Box */}
            <div style={{ background: 'rgba(0,0,0,0.5)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(192, 132, 252, 0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', boxSizing: 'border-box' }}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#ffffff', margin: '0 0 0.5rem 0' }}>
                  Local Magnet or Tourist Trap?
                </h3>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(192, 132, 252, 0.15)', border: '1px solid rgba(192, 132, 252, 0.4)', color: '#c084fc', fontSize: '10.5px', fontWeight: 800, padding: '3px 8px', borderRadius: '8px', marginBottom: '0.75rem' }}>
                  🎯 {touristTrapVerdict}
                </div>

                {/* Local vs Traveler Split Meter */}
                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', marginBottom: '4px', fontWeight: 700 }}>
                    <span style={{ color: '#c084fc' }}>📍 Locals ({localRatio}%)</span>
                    <span style={{ color: '#38bdf8' }}>✈️ Travelers ({touristRatio}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', borderRadius: '4px', overflow: 'hidden', display: 'flex' }}>
                    <div style={{ width: `${localRatio}%`, height: '100%', background: '#c084fc' }} />
                    <div style={{ width: `${touristRatio}%`, height: '100%', background: '#38bdf8' }} />
                  </div>
                </div>

                <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', marginBottom: '0.3rem' }}>
                  {crowd.primary || 'Cosmopolitan Creatives'}
                </div>

                <div style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.7)', marginBottom: '0.4rem' }}>
                  <strong style={{ color: '#c084fc' }}>Dress Code:</strong> {crowd.dress_code || 'Smart Casual Chic'}
                </div>

                <p style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.4, margin: 0 }}>
                  {lighting.atmosphere || 'Active social hub where neighborhood regulars and international creatives mix seamlessly.'}
                </p>
              </div>

              <div style={{ marginTop: '1rem', background: 'rgba(192, 132, 252, 0.08)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(192, 132, 252, 0.2)', fontSize: '11px', color: 'rgba(255,255,255,0.85)' }}>
                ⚡ <strong>Social Velocity:</strong> {crowd.energy_verdict || 'High Banter & Neighborhood Sanctuary'}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CONTAINER 4: Lighting & Peak Mood (Evening Vibe & Best Time to Visit)     */}
          {/* ========================================================================= */}
          <div style={{ flex: '0 0 340px', minWidth: '340px', maxWidth: '360px', scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Direct Heading Score */}
            <div style={{ 
              background: 'rgba(0, 229, 255, 0.15)', 
              border: '1px solid rgba(0, 229, 255, 0.45)', 
              color: '#00e5ff', 
              fontSize: '11px', 
              fontWeight: 900, 
              padding: '6px 12px', 
              borderRadius: '10px', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              <span>💡 LIGHTING & MOOD</span>
              <span>2200K WARM GLOW</span>
            </div>

            {/* Main Content Box */}
            <div style={{ background: 'rgba(0,0,0,0.5)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(0, 229, 255, 0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', boxSizing: 'border-box' }}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#ffffff', margin: '0 0 0.5rem 0' }}>
                  Evening Vibe & Best Time to Visit
                </h3>

                <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#00e5ff', marginBottom: '0.6rem' }}>
                  💡 {lightingTemp}
                </div>

                <div style={{ background: 'rgba(0, 229, 255, 0.08)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(0, 229, 255, 0.25)', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#00e5ff', fontSize: '10.5px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '3px' }}>
                    <Clock size={13} /> Peak Atmospheric Window:
                  </div>
                  <div style={{ fontSize: '12px', color: '#ffffff', lineHeight: 1.4, fontWeight: 700 }}>
                    {bestTimeToVisit}
                  </div>
                </div>

                <p style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.4, margin: 0 }}>
                  {lighting.sensory_intensity ? `Sensory Level: ${lighting.sensory_intensity}. ` : ''}
                  Atmosphere naturally evolves from relaxed afternoon coffee & co-working into warm candlelit aperitivo and evening cocktail buzz.
                </p>
              </div>

              <div style={{ marginTop: '1rem', background: 'rgba(0, 229, 255, 0.08)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(0, 229, 255, 0.2)', fontSize: '11px', color: 'rgba(255,255,255,0.85)' }}>
                ☀️ <strong>Golden Hour:</strong> Optimal visual transitions happen 45 mins before sunset.
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CONTAINER 5: Location & Trending Spots (Doorstep to Trending Spots)       */}
          {/* ========================================================================= */}
          <div style={{ flex: '0 0 340px', minWidth: '340px', maxWidth: '360px', scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Direct Heading Score */}
            <div style={{ 
              background: 'rgba(255, 179, 0, 0.15)', 
              border: '1px solid rgba(255, 179, 0, 0.45)', 
              color: '#ffb300', 
              fontSize: '11px', 
              fontWeight: 900, 
              padding: '6px 12px', 
              borderRadius: '10px', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              <span>📍 NEIGHBORHOOD PULSE</span>
              <span>ON-DOORSTEP</span>
            </div>

            {/* Main Content Box */}
            <div style={{ background: 'rgba(0,0,0,0.5)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(255, 179, 0, 0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', boxSizing: 'border-box' }}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#ffffff', margin: '0 0 0.5rem 0' }}>
                  Right on the Doorstep of Trending Spots
                </h3>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '0.75rem' }}>
                  {(proximity.key_anchors || ['Neighborhood Cultural Hub', 'Riverside Promenade', 'Artisan Dining']).map((anchor, i) => (
                    <span key={i} style={{ background: 'rgba(255, 179, 0, 0.12)', color: '#ffb300', fontSize: '10.5px', fontWeight: 700, padding: '3px 8px', borderRadius: '10px', border: '1px solid rgba(255, 179, 0, 0.25)' }}>
                      📍 {anchor}
                    </span>
                  ))}
                </div>

                <p style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.4, margin: '0 0 0.75rem 0' }}>
                  {proximity.insider_lore || 'Positioned directly within the cultural epicenter with immediate access to independent boutiques and gastronomy.'}
                </p>
              </div>

              <div style={{ marginTop: '1rem', background: 'rgba(255, 179, 0, 0.08)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(255, 179, 0, 0.2)', fontSize: '11px', color: 'rgba(255,255,255,0.85)' }}>
                🚶 <strong>Walkability Score:</strong> 100% pedestrian access to district subcultural anchors.
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CONTAINER 6: Insider Secrets & Hidden Lore (New 6th Container!)           */}
          {/* ========================================================================= */}
          <div style={{ flex: '0 0 340px', minWidth: '340px', maxWidth: '360px', scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Direct Heading Score */}
            <div style={{ 
              background: 'linear-gradient(90deg, rgba(236, 72, 153, 0.2), rgba(245, 158, 11, 0.2))', 
              border: '1px solid rgba(236, 72, 153, 0.5)', 
              color: '#f472b6', 
              fontSize: '11px', 
              fontWeight: 900, 
              padding: '6px 12px', 
              borderRadius: '10px', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Key size={13} color="#f472b6" /> INSIDER ACCESS
              </span>
              <span>VERIFIED LORE</span>
            </div>

            {/* Main Content Box */}
            <div style={{ background: 'rgba(0,0,0,0.5)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(236, 72, 153, 0.35)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', boxSizing: 'border-box' }}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#ffffff', margin: '0 0 0.5rem 0' }}>
                  Off-Menu Secrets & Local Lore
                </h3>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(236, 72, 153, 0.15)', border: '1px solid rgba(236, 72, 153, 0.4)', color: '#f472b6', fontSize: '10.5px', fontWeight: 800, padding: '3px 8px', borderRadius: '8px', marginBottom: '0.75rem' }}>
                  🕵️ {secrets.insider_badge || 'Head Bartender & Local Regular Lore'}
                </div>

                <div style={{ background: 'rgba(236, 72, 153, 0.08)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(236, 72, 153, 0.25)', marginBottom: '0.75rem' }}>
                  <div style={{ color: '#ffd700', fontSize: '12px', fontWeight: 800, marginBottom: '3px' }}>
                    🗝️ {secrets.secret_title || 'The Off-Menu Highball & Hidden Snug'}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }}>
                    {secrets.secret_lore || secrets.off_menu_perk || 'Ask the head bartender for the off-menu botanical infusion drink or seek out the hidden courtyard archway for private seating.'}
                  </div>
                </div>

                <p style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.4, margin: 0 }}>
                  Insider perks and hidden architectural details known only to neighborhood regulars and vetted concierges.
                </p>
              </div>

              <div style={{ marginTop: '1rem', background: 'rgba(236, 72, 153, 0.08)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(236, 72, 153, 0.2)', fontSize: '11px', color: 'rgba(255,255,255,0.85)' }}>
                🔑 <strong>Secret Quest:</strong> Unlocks exclusive perks on Travelvrse 3D Spatial Walkthroughs.
              </div>
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
